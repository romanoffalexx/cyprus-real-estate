import { createServer } from 'node:http';
import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');

const PORT = Number(process.env.PORT) || 3000;
const DIST_DIR = path.resolve(process.env.DIST_DIR || path.join(root, 'dist'));
const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(root, 'storage'));
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const SEED_FILE = path.resolve(process.env.SEED_FILE || path.join(root, 'data', 'properties.seed.json'));
const PROPERTIES_FILE = path.join(DATA_DIR, 'properties.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const SESSION_HOURS = Number(process.env.ADMIN_SESSION_HOURS) || 12;
const MAX_UPLOAD_MB = Number(process.env.MAX_UPLOAD_MB) || 8;
const MAX_BODY_MB = Number(process.env.MAX_BODY_MB) || 2;
const MAX_LEADS = Number(process.env.MAX_LEADS) || 1000;
const retentionSetting = process.env.LEAD_RETENTION_DAYS?.trim();
const LEAD_RETENTION_DAYS = retentionSetting ? Number(retentionSetting) : null;
if (LEAD_RETENTION_DAYS !== null && (!Number.isInteger(LEAD_RETENTION_DAYS) || LEAD_RETENTION_DAYS < 1)) {
  throw new Error('LEAD_RETENTION_DAYS должен быть целым числом больше нуля или пустым');
}

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CURRENCIES = ['EUR', 'GBP', 'USD'];
const UPLOAD_NAME_RE = /^[a-f0-9-]{36}\.(jpg|png|webp)$/;
const ASSET_URL_RE = /^(?:\/[\w./-]*|https:\/\/[^\s]+)$/;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/* ---------- storage ---------- */

let writeChain = Promise.resolve();

function saveJson(file, value) {
  const task = writeChain.then(async () => {
    await mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.tmp`;
    await writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
    await rename(tmp, file);
  });
  writeChain = task.catch(() => {});
  return task;
}

async function loadJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return fallback;
    throw new HttpError(500, 'Данные повреждены и не читаются');
  }
}

async function loadProperties() {
  const existing = await loadJson(PROPERTIES_FILE, null);
  if (Array.isArray(existing)) return existing;
  const seed = await loadJson(SEED_FILE, []);
  if (Array.isArray(seed) && seed.length) await saveJson(PROPERTIES_FILE, seed);
  return Array.isArray(seed) ? seed : [];
}

const loadLeads = () => loadJson(LEADS_FILE, []);

async function loadActiveLeads() {
  const leads = await loadLeads();
  if (LEAD_RETENTION_DAYS === null) return leads;
  const cutoff = Date.now() - LEAD_RETENTION_DAYS * 86_400_000;
  const active = leads.filter((lead) => {
    const createdAt = Date.parse(lead.createdAt);
    return !Number.isFinite(createdAt) || createdAt >= cutoff;
  });
  if (active.length !== leads.length) await saveJson(LEADS_FILE, active);
  return active;
}

/* ---------- auth ---------- */

function sign(payload) {
  return createHmac('sha256', ADMIN_PASSWORD).update(payload).digest('base64url');
}

function createToken() {
  const expiresAt = Date.now() + SESSION_HOURS * 3600_000;
  return `${expiresAt}.${sign(String(expiresAt))}`;
}

function verifyToken(token) {
  if (!ADMIN_PASSWORD || !token) return false;
  const [expiresAt, signature] = token.split('.');
  if (!expiresAt || !signature) return false;
  if (!Number.isFinite(Number(expiresAt)) || Number(expiresAt) < Date.now()) return false;
  const expected = Buffer.from(sign(expiresAt));
  const received = Buffer.from(signature);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

function requireAdmin(req) {
  if (!ADMIN_PASSWORD) throw new HttpError(503, 'ADMIN_PASSWORD не задан в окружении');
  const header = req.headers.authorization || '';
  if (!verifyToken(header.startsWith('Bearer ') ? header.slice(7) : '')) {
    throw new HttpError(401, 'Нужен вход в админку');
  }
}

/* ---------- rate limit ---------- */

const buckets = new Map();

function takeQuota(key, capacity, windowMs) {
  const now = Date.now();
  const bucket = buckets.get(key) || { tokens: capacity, updated: now };
  bucket.tokens = Math.min(capacity, bucket.tokens - ((now - bucket.updated) / windowMs) * capacity);
  bucket.updated = now;
  if (bucket.tokens < 1) {
    buckets.set(key, bucket);
    return false;
  }
  bucket.tokens -= 1;
  buckets.set(key, bucket);
  return true;
}

setInterval(() => {
  const cutoff = Date.now() - 3600_000;
  for (const [key, bucket] of buckets) if (bucket.updated < cutoff) buckets.delete(key);
}, 600_000).unref();

/* ---------- request helpers ---------- */

function readBody(req, res, limitBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limitBytes) {
        if (!res.headersSent) json(res, 413, { error: 'Слишком большой запрос' });
        const error = new HttpError(413, 'Слишком большой запрос');
        error.responded = true;
        req.destroy();
        reject(error);
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function readJson(req, res, limitMb) {
  const raw = await readBody(req, res, limitMb * 1024 * 1024);
  if (!raw.length) return {};
  try {
    return JSON.parse(raw.toString('utf8'));
  } catch {
    throw new HttpError(400, 'Не корректный JSON');
  }
}

// За реверс-прокси (Traefik в Dokploy) сокет всегда один и тот же адрес, поэтому адрес
// клиента берём из X-Forwarded-For — но только когда соединение идёт с локальной сети,
// иначе заголовок можно подделать и обойти лимитер.
const LOCAL_IP_RE = /^(?:::1|127\.|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|169\.254\.)/;

function clientIp(req) {
  const peer = (req.socket.remoteAddress || 'unknown').replace(/^::ffff:/, '');
  if (LOCAL_IP_RE.test(peer)) {
    const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
    if (forwarded && forwarded.length <= 45) return forwarded;
  }
  return peer;
}

function text(value, max, field, required = false) {
  const out = typeof value === 'string' ? value.trim().slice(0, max) : '';
  if (required && !out) throw new HttpError(400, `Поле «${field}» обязательно`);
  return out;
}

function numberOrNull(value, max) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0 || num > max) throw new HttpError(400, 'Числовое поле вне диапазона');
  return num;
}

function coordinate(value, limit) {
  if (value === null || value === undefined || value === '') return null;
  const num = Number(value);
  if (!Number.isFinite(num) || num < -limit || num > limit) throw new HttpError(400, 'Координата вне диапазона');
  return num;
}

function stringList(value, max, limit) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, limit)
    .map((item) => text(item, max))
    .filter(Boolean);
}

function assetList(value, limit) {
  if (!Array.isArray(value)) return [];
  return value
    .slice(0, limit)
    .map((item) => text(item, 500))
    .filter((item) => ASSET_URL_RE.test(item));
}

function sanitizeProperty(raw, slugFromUrl) {
  const name = text(raw.name, 120, 'Название', true);
  const slug = (text(raw.slug, 80) || slugFromUrl || '').toLowerCase();
  if (!SLUG_RE.test(slug) || slug.length < 2) {
    throw new HttpError(400, 'URL-имя должно быть из строчных букв, цифр и дефисов');
  }
  if (slugFromUrl && slug !== slugFromUrl) {
    throw new HttpError(400, 'URL-имя в форме не совпадает с адресом записи');
  }
  const currency = CURRENCIES.includes(raw.currency) ? raw.currency : 'EUR';

  return {
    slug,
    name,
    type: text(raw.type, 80),
    developer: text(raw.developer, 120),
    district: text(raw.district, 120),
    completionYear: text(raw.completionYear, 20),
    priceFrom: numberOrNull(raw.priceFrom, 1_000_000_000_000),
    currency,
    badge: text(raw.badge, 40),
    shortDescription: text(raw.shortDescription, 300),
    description: text(raw.description, 6000),
    areas: (Array.isArray(raw.areas) ? raw.areas : []).slice(0, 40).map((area) => ({
      label: text(area?.label, 80),
      size: numberOrNull(area?.size, 10_000_000),
    })).filter((area) => area.label || area.size !== null),
    saleTypes: stringList(raw.saleTypes, 120, 40),
    images: assetList(raw.images, 40),
    floorPlans: assetList(raw.floorPlans, 40),
    lat: coordinate(raw.lat, 90),
    lng: coordinate(raw.lng, 180),
    pdfUrl: assetList([raw.pdfUrl], 1)[0] || '',
    published: Boolean(raw.published),
  };
}

/* ---------- image upload ---------- */

const IMAGE_SIGNATURES = [
  { ext: 'jpg', test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { ext: 'png', test: (b) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: 'webp', test: (b) => b.subarray(0, 4).toString('ascii') === 'RIFF' && b.subarray(8, 12).toString('ascii') === 'WEBP' },
];

async function handleUpload(req, res) {
  // data URL раздувает тело в ~4/3 раза, поэтому лимит тела считается от размера файла.
  const { dataUrl } = await readJson(req, res, Math.ceil((MAX_UPLOAD_MB * 4) / 3) + 1);
  const base64 = String(dataUrl || '').replace(/^data:image\/[a-z+]+;base64,/i, '');
  if (!base64) throw new HttpError(400, 'Нет данных изображения');

  const buffer = Buffer.from(base64, 'base64');
  if (!buffer.length) throw new HttpError(400, 'Не удалось декодировать изображение');
  if (buffer.length > MAX_UPLOAD_MB * 1024 * 1024) {
    throw new HttpError(413, `Файл больше ${MAX_UPLOAD_MB} МиБ`);
  }

  const signature = IMAGE_SIGNATURES.find((item) => item.test(buffer));
  if (!signature) throw new HttpError(415, 'Можно загрузить только JPG, PNG или WebP');

  await mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${randomUUID()}.${signature.ext}`;
  await writeFile(path.join(UPLOADS_DIR, filename), buffer);
  json(res, 201, { url: `/uploads/${filename}`, bytes: buffer.length });
}

/* ---------- leads ---------- */

async function handleLeadCreate(req, res) {
  if (!takeQuota(`lead:${clientIp(req)}`, 10, 15 * 60_000)) {
    throw new HttpError(429, 'Слишком много заявок с одного адреса, попробуйте позже');
  }
  const body = await readJson(req, res, 1);

  if (text(body.website, 10)) {
    json(res, 201, { ok: true });
    return;
  }

  const name = text(body.name, 120, 'Имя', true);
  const phone = text(body.phone, 40, 'Телефон', true);
  if (body.consent !== true) throw new HttpError(400, 'Нужно согласие на обработку данных');
  const policyVersion = text(body.consentPolicyVersion, 40, 'Версия политики', true);
  const createdAt = new Date().toISOString();

  const lead = {
    id: randomUUID(),
    name,
    phone,
    email: text(body.email, 160),
    propertySlug: text(body.propertySlug, 80),
    message: text(body.message, 2000),
    createdAt,
    consent: { policyVersion, acceptedAt: createdAt },
  };

  const leads = await loadActiveLeads();
  leads.push(lead);
  await saveJson(LEADS_FILE, leads.slice(-MAX_LEADS));
  json(res, 201, { ok: true, id: lead.id });
}

/* ---------- http ---------- */

function json(res, status, payload) {
  // После sendFile заголовки уже могли уйти клиенту, а second-write кидает
  // ERR_HTTP_HEADERS_SENT и роняет процесс целиком.
  if (res.headersSent) {
    res.end();
    return;
  }
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(body);
}

// Каталог — не файл: stat проходит, а readFile падает на EISDIR уже после заголовков.
const NOT_FILE_CODES = new Set(['ENOENT', 'ENOTDIR', 'EISDIR']);
const isMissingFile = (error) =>
  error instanceof HttpError ? error.status === 404 : NOT_FILE_CODES.has(error.code);

async function sendFile(res, absolutePath, cacheControl, isHead) {
  const info = await stat(absolutePath);
  if (!info.isFile()) throw new HttpError(404, 'Файл не найден');
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[path.extname(absolutePath)] || 'application/octet-stream',
    'Content-Length': info.size,
    'Cache-Control': cacheControl,
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(isHead ? undefined : await readFile(absolutePath));
}

function withinDir(baseDir, requestPath) {
  const target = path.resolve(baseDir, `.${path.posix.normalize(`/${requestPath}`)}`);
  return target === baseDir || target.startsWith(baseDir + path.sep) ? target : null;
}

async function handleApi(req, res, url) {
  const parts = url.pathname.split('/').filter(Boolean).slice(1);

  if (req.method === 'POST' && parts.length === 2 && parts[0] === 'admin' && parts[1] === 'login') {
    if (!ADMIN_PASSWORD) throw new HttpError(503, 'ADMIN_PASSWORD не задан в окружении');
    if (!takeQuota(`login:${clientIp(req)}`, 10, 15 * 60_000)) {
      throw new HttpError(429, 'Слишком много попыток входа');
    }
    const body = await readJson(req, res, 1);
    const provided = Buffer.from(String(body.password || ''));
    const expected = Buffer.from(ADMIN_PASSWORD);
    if (provided.length !== expected.length || !timingSafeEqual(provided, expected)) {
      throw new HttpError(401, 'Неверный пароль');
    }
    json(res, 200, { token: createToken(), expiresInSeconds: SESSION_HOURS * 3600 });
    return;
  }

  if (req.method === 'POST' && parts.length === 1 && parts[0] === 'leads') {
    await handleLeadCreate(req, res);
    return;
  }

  if (parts.length >= 1 && parts[0] === 'properties' && req.method === 'GET') {
    const published = (await loadProperties()).filter((item) => item.published);
    if (parts.length === 1) {
      json(res, 200, published);
      return;
    }
    const found = published.find((item) => item.slug === parts[1]);
    if (!found) throw new HttpError(404, 'Объект не найден');
    json(res, 200, found);
    return;
  }

  requireAdmin(req);

  if (parts[0] === 'admin') {
    if (parts[1] === 'properties') {
      if (parts.length === 2 && req.method === 'GET') {
        json(res, 200, await loadProperties());
        return;
      }
      if (parts.length === 3 && req.method === 'PUT') {
        const property = sanitizeProperty(await readJson(req, res, MAX_BODY_MB), parts[2]);
        const all = await loadProperties();
        const index = all.findIndex((item) => item.slug === property.slug);
        if (index === -1) all.push(property);
        else all[index] = property;
        await saveJson(PROPERTIES_FILE, all);
        json(res, index === -1 ? 201 : 200, property);
        return;
      }
      if (parts.length === 3 && req.method === 'DELETE') {
        const all = await loadProperties();
        const next = all.filter((item) => item.slug !== parts[2]);
        if (next.length === all.length) throw new HttpError(404, 'Объект не найден');
        await saveJson(PROPERTIES_FILE, next);
        json(res, 200, { ok: true, removed: parts[2] });
        return;
      }
    }
    if (parts[1] === 'upload' && parts.length === 2 && req.method === 'POST') {
      await handleUpload(req, res);
      return;
    }
    if (parts[1] === 'leads') {
      if (parts.length === 2 && req.method === 'GET') {
        json(res, 200, (await loadActiveLeads()).slice().reverse());
        return;
      }
      if (parts.length === 3 && req.method === 'DELETE') {
        const leads = await loadActiveLeads();
        const next = leads.filter((item) => item.id !== parts[2]);
        if (next.length === leads.length) throw new HttpError(404, 'Заявка не найдена');
        await saveJson(LEADS_FILE, next);
        json(res, 200, { ok: true });
        return;
      }
    }
  }

  throw new HttpError(404, 'Такого API-метода нет');
}

async function handleUploads(req, res, url) {
  if (req.method !== 'GET' && req.method !== 'HEAD') throw new HttpError(405, 'Метод не поддерживается');
  const filename = path.posix.basename(url.pathname.slice('/uploads/'.length));
  if (!UPLOAD_NAME_RE.test(filename)) throw new HttpError(404, 'Файл не найден');
  const target = path.join(UPLOADS_DIR, filename);
  try {
    await sendFile(res, target, 'public, max-age=31536000, immutable', req.method === 'HEAD');
  } catch (error) {
    if (isMissingFile(error)) throw new HttpError(404, 'Файл не найден');
    throw error;
  }
}

async function handleStatic(req, res, url) {
  const isHead = req.method === 'HEAD';
  const target = withinDir(DIST_DIR, url.pathname);
  if (target) {
    try {
      await sendFile(res, target, 'public, max-age=3600', isHead);
      return;
    } catch (error) {
      if (!isMissingFile(error)) throw error;
    }
  }
  const entry = path.join(DIST_DIR, 'index.html');
  try {
    await sendFile(res, entry, 'no-cache', isHead);
  } catch (error) {
    if (isMissingFile(error)) throw new HttpError(503, 'Сайт не собран: нет dist/index.html');
    throw error;
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  try {
    if (url.pathname.startsWith('/api/')) await handleApi(req, res, url);
    else if (url.pathname.startsWith('/uploads/')) await handleUploads(req, res, url);
    else if (req.method === 'GET' || req.method === 'HEAD') await handleStatic(req, res, url);
    else throw new HttpError(405, 'Метод не поддерживается');
  } catch (error) {
    const status = error instanceof HttpError ? error.status : 500;
    if (status === 500) console.error('[api]', error);
    if (!error.responded) json(res, status, { error: status === 500 ? 'Внутренняя ошибка сервера' : error.message });
  }
});

await mkdir(DATA_DIR, { recursive: true });
await loadProperties();
await loadActiveLeads();

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT} · данные: ${DATA_DIR} · сайт: ${DIST_DIR}`);
  if (!ADMIN_PASSWORD) {
    console.warn('ВНИМАНИЕ: ADMIN_PASSWORD не задан — /api/admin/* и страница /admin недоступны.');
  }
});
