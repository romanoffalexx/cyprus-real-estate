import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Trash2, Upload, X } from 'lucide-react';
import PropertyCard from '../PropertyCard';
import { CURRENCIES, type Currency, type Property } from '../../lib/properties';
import { MAX_UPLOAD_MB, ApiError, uploadImage } from '../../lib/api';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toNumberOrNull(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const num = Number(trimmed.replace(',', '.'));
  return Number.isFinite(num) ? num : null;
}

function Field({
  id,
  label,
  children,
  hint,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy text-sm';

export default function PropertyEditor({
  initial,
  isNew,
  takenSlugs,
  onCancel,
  onSaved,
}: {
  initial: Property;
  isNew: boolean;
  takenSlugs: string[];
  onCancel: () => void;
  onSaved: (property: Property) => Promise<void>;
}) {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<Property>(initial);
  const [sizeValues, setSizeValues] = useState<string[]>(
    initial.areas.map((area) => (area.size === null ? '' : String(area.size))),
  );
  const [saleTypesText, setSaleTypesText] = useState(initial.saleTypes.join('\n'));
  const [error, setError] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [busy, setBusy] = useState<'idle' | 'saving' | 'uploading'>('idle');

  const set = <K extends keyof Property>(key: K, value: Property[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));

  const slugTaken =
    isNew && takenSlugs.includes(draft.slug) ? t('admin.slugTaken') : '';

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft.slug) return setError(t('admin.required'));
    if (!SLUG_RE.test(draft.slug)) return setError(t('admin.slugFormat'));
    if (slugTaken) return setError(slugTaken);
    if (!draft.name.trim()) return setError(t('admin.required'));

    setError('');
    setBusy('saving');
    const property: Property = {
      ...draft,
      saleTypes: saleTypesText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      areas: draft.areas
        .map((area, index) => ({ label: area.label.trim(), size: toNumberOrNull(sizeValues[index] ?? '') }))
        .filter((area) => area.label),
    };
    try {
      await onSaved(property);
    } catch (error) {
      setError(error instanceof Error ? error.message : t('admin.savedError'));
    } finally {
      setBusy('idle');
    }
  };

  const uploadTo = async (key: 'images' | 'floorPlans', file: File) => {
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setUploadError(t('admin.imageError', { max: MAX_UPLOAD_MB }));
      return;
    }
    setUploadError('');
    setBusy('uploading');
    try {
      const url = await uploadImage(file);
      set(key, [...draft[key], url]);
    } catch (error) {
      setUploadError(
        error instanceof ApiError ? error.message : t('admin.imageError', { max: MAX_UPLOAD_MB }),
      );
    } finally {
      setBusy('idle');
    }
  };

  const imageLists: Array<{ key: 'images' | 'floorPlans'; label: string }> = [
    { key: 'images', label: t('admin.images') },
    { key: 'floorPlans', label: t('admin.floorPlans') },
  ];

  return (
    <form
      onSubmit={save}
      className="bg-white rounded-xl shadow-card p-4 sm:p-6 space-y-6"
      aria-label={isNew ? t('admin.newProperty') : t('admin.editProperty')}
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-cyprus-navy">
          {isNew ? t('admin.newProperty') : t('admin.editProperty')}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:outline-none"
          aria-label={t('admin.cancel')}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          id="admin-slug"
          label={t('admin.slug')}
          hint={draft.slug ? t('admin.slugHint', { slug: draft.slug }) : undefined}
        >
          <input
            id="admin-slug"
            type="text"
            required
            readOnly={!isNew}
            value={draft.slug}
            onChange={(event) => set('slug', event.target.value)}
            className={`${inputClass} ${isNew ? '' : 'bg-gray-100'}`}
          />
        </Field>
        <Field id="admin-name" label={t('admin.name')}>
          <input
            id="admin-name"
            type="text"
            required
            value={draft.name}
            onChange={(event) => set('name', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-type" label={t('catalog.type')}>
          <input
            id="admin-type"
            type="text"
            value={draft.type}
            onChange={(event) => set('type', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-developer" label={t('catalog.developer')}>
          <input
            id="admin-developer"
            type="text"
            value={draft.developer}
            onChange={(event) => set('developer', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-district" label={t('catalog.district')}>
          <input
            id="admin-district"
            type="text"
            value={draft.district}
            onChange={(event) => set('district', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-completion" label={t('catalog.completion')}>
          <input
            id="admin-completion"
            type="text"
            value={draft.completionYear}
            onChange={(event) => set('completionYear', event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field id="admin-badge" label={t('admin.badge')}>
          <input
            id="admin-badge"
            type="text"
            value={draft.badge}
            onChange={(event) => set('badge', event.target.value)}
            className={inputClass}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field id="admin-price" label={t('admin.priceFrom')}>
            <input
              id="admin-price"
              type="text"
              inputMode="numeric"
              value={draft.priceFrom ?? ''}
              onChange={(event) => set('priceFrom', toNumberOrNull(event.target.value))}
              className={inputClass}
            />
          </Field>
          <Field id="admin-currency" label={t('admin.currency')}>
            <select
              id="admin-currency"
              value={draft.currency}
              onChange={(event) => set('currency', event.target.value as Currency)}
              className={inputClass}
            >
              {CURRENCIES.map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </div>

      <Field id="admin-short" label={t('admin.shortDescription')}>
        <input
          id="admin-short"
          type="text"
          value={draft.shortDescription}
          onChange={(event) => set('shortDescription', event.target.value)}
          className={inputClass}
        />
      </Field>

      <Field id="admin-description" label={t('admin.description')}>
        <textarea
          id="admin-description"
          rows={6}
          value={draft.description}
          onChange={(event) => set('description', event.target.value)}
          className={inputClass}
        />
      </Field>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-700">{t('admin.areas')}</h3>
          <button
            type="button"
            onClick={() => {
              setSizeValues([...sizeValues, '']);
              set('areas', [...draft.areas, { label: '', size: null }]);
            }}
            className="text-sm text-cyprus-orange hover:text-cyprus-orange/80 font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:outline-none rounded"
          >
            {t('admin.addArea')}
          </button>
        </div>
        <div className="space-y-2">
          {draft.areas.map((area, index) => (
            <div key={index} className="flex gap-2 items-start">
              <input
                type="text"
                aria-label={t('admin.areaLabel')}
                placeholder={t('admin.areaLabel')}
                value={area.label}
                onChange={(event) =>
                  set(
                    'areas',
                    draft.areas.map((item, position) =>
                      position === index ? { ...item, label: event.target.value } : item,
                    ),
                  )
                }
                className={`${inputClass} flex-1`}
              />
              <input
                type="text"
                inputMode="decimal"
                aria-label={t('admin.areaSize')}
                placeholder={t('admin.areaSize')}
                value={sizeValues[index] ?? ''}
                onChange={(event) =>
                  setSizeValues((current) =>
                    current.map((item, position) => (position === index ? event.target.value : item)),
                  )
                }
                className={`${inputClass} w-32`}
              />
              <button
                type="button"
                aria-label={t('admin.delete')}
                onClick={() => {
                  set(
                    'areas',
                    draft.areas.filter((_, position) => position !== index),
                  );
                  setSizeValues((current) => current.filter((_, position) => position !== index));
                }}
                className="p-2 mt-1 text-red-600 hover:bg-red-50 rounded-lg focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Field id="admin-saletypes" label={t('admin.saleTypes')}>
        <textarea
          id="admin-saletypes"
          rows={4}
          value={saleTypesText}
          onChange={(event) => setSaleTypesText(event.target.value)}
          className={inputClass}
        />
      </Field>

      {imageLists.map(({ key, label }) => (
        <div key={key}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="text-sm font-medium text-gray-700">{label}</h3>
            <label className="inline-flex items-center gap-2 text-sm text-cyprus-orange hover:text-cyprus-orange/80 font-medium cursor-pointer focus-within:ring-2 focus-within:ring-cyprus-orange rounded">
              <Upload className="w-4 h-4" aria-hidden="true" />
              {busy === 'uploading' ? t('admin.uploading') : t('admin.uploadImage')}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="sr-only"
                disabled={busy === 'uploading'}
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  event.target.value = '';
                  if (file) void uploadTo(key, file);
                }}
              />
            </label>
          </div>
          {key === 'images' && <p className="text-xs text-gray-500 mb-2">{t('admin.imagesHint')}</p>}
          {draft[key].length > 0 && (
            <div className="flex flex-wrap gap-2">
              {draft[key].map((url) => (
                <div key={url} className="relative">
                  <img
                    src={url}
                    alt=""
                    className="w-24 h-20 object-cover rounded-lg border border-gray-200"
                    width="96"
                    height="80"
                  />
                  <button
                    type="button"
                    aria-label={t('admin.removeImage')}
                    onClick={() => set(key, draft[key].filter((item) => item !== url))}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center text-red-600 hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                  >
                    <X className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {uploadError && (
        <p role="alert" className="text-sm text-red-700">
          {uploadError}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field id="admin-lat" label={`${t('admin.mapCoords')} · ${t('admin.lat')}`}>
          <input
            id="admin-lat"
            type="text"
            inputMode="decimal"
            value={draft.lat ?? ''}
            onChange={(event) => set('lat', toNumberOrNull(event.target.value))}
            className={inputClass}
          />
        </Field>
        <Field id="admin-lng" label={t('admin.lng')}>
          <input
            id="admin-lng"
            type="text"
            inputMode="decimal"
            value={draft.lng ?? ''}
            onChange={(event) => set('lng', toNumberOrNull(event.target.value))}
            className={inputClass}
          />
        </Field>
        <Field id="admin-pdf" label={t('admin.pdfUrl')}>
          <input
            id="admin-pdf"
            type="text"
            value={draft.pdfUrl}
            onChange={(event) => set('pdfUrl', event.target.value)}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
          <input
            type="checkbox"
            checked={draft.published}
            onChange={(event) => set('published', event.target.checked)}
            className="w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
          />
          {t('admin.published')}
        </label>
        {draft.slug && SLUG_RE.test(draft.slug) && (
          <Link
            to={`/real-estate/${draft.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyprus-navy underline focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:outline-none rounded"
          >
            {t('admin.preview')}
          </Link>
        )}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">{t('admin.preview')}</h3>
        <div className="max-w-xs">
          <PropertyCard property={{ ...draft, name: draft.name || '—' }} />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={busy !== 'idle'}
          className="bg-cyprus-orange text-white px-6 py-2.5 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {busy === 'saving' ? t('admin.saving') : t('admin.save')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-cyprus-navy text-cyprus-navy px-6 py-2.5 rounded-lg hover:bg-cyprus-navy hover:text-white transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t('admin.cancel')}
        </button>
      </div>
    </form>
  );
}
