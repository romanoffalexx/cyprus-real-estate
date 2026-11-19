import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, Download, MapPin, Send } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import {
  fetchProperties,
  fetchProperty,
  formatPrice,
  propertyImage,
  type Property,
} from '../lib/properties';
import { submitLead } from '../lib/api';

type Status = 'loading' | 'ready' | 'not-found' | 'error';

const EMPTY_FORM = { name: '', phone: '', email: '', message: '', consent: false, website: '' };

export default function PropertyPage() {
  const { slug = '' } = useParams();
  return <PropertyView key={slug} slug={slug} />;
}

function PropertyView({ slug }: { slug: string }) {
  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState<Status>('loading');
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState('');

  useEffect(() => {
    let active = true;
    fetchProperty(slug)
      .then(async (found) => {
        if (!active) return;
        if (!found) {
          setStatus('not-found');
          return;
        }
        setProperty(found);
        setStatus('ready');
        const all = await fetchProperties();
        if (!active) return;
        setSimilar(
          all
            .filter((item) => item.slug !== found.slug)
            .filter((item) => item.district === found.district || item.type === found.type)
            .slice(0, 3),
        );
      })
      .catch(() => {
        if (active) setStatus('error');
      });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (status !== 'ready' || !property) return;
    document.title = `${property.name} — ${t('nav.realEstate')}`;
    const description = property.shortDescription || property.description;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', 'description');
      document.head.appendChild(tag);
    }
    if (description) tag.setAttribute('content', description);
  }, [status, property, t]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!property) return;
    setSendError('');
    try {
      await submitLead({ ...form, propertySlug: property.slug });
      setSent(true);
      setForm(EMPTY_FORM);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : t('property.sendError'));
    }
  };

  if (status === 'loading') {
    return <p className="py-12 container mx-auto px-4 text-cyprus-navy/70">{t('property.loading')}</p>;
  }

  if (status === 'error') {
    return (
      <p className="py-12 container mx-auto px-4 text-cyprus-navy/70">{t('property.loadError')}</p>
    );
  }

  if (status === 'not-found' || !property) {
    return (
      <div className="py-12 bg-cyprus-sand min-h-screen">
        <div className="container mx-auto px-4 max-w-xl">
          <h1 className="text-3xl font-bold text-cyprus-navy mb-3">{t('property.notFound')}</h1>
          <p className="text-gray-600 mb-6">{t('property.notFoundText')}</p>
          <Link
            to="/real-estate"
            className="bg-cyprus-orange text-white px-6 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t('property.backToCatalog')}
          </Link>
        </div>
      </div>
    );
  }

  const facts = [
    { label: t('catalog.type'), value: property.type },
    { label: t('catalog.developer'), value: property.developer },
    { label: t('catalog.district'), value: property.district },
    { label: t('catalog.completion'), value: property.completionYear },
  ].filter((fact) => fact.value);

  const images = property.images.length ? property.images : [propertyImage(property)];
  const mainImage = images[Math.min(activeImage, images.length - 1)];
  const hasCoords = property.lat !== null && property.lng !== null;
  const bbox = hasCoords
    ? [
        (property.lng! - 0.02).toFixed(6),
        (property.lat! - 0.01).toFixed(6),
        (property.lng! + 0.02).toFixed(6),
        (property.lat! + 0.01).toFixed(6),
      ].join('%2C')
    : '';
  const mapSrc = hasCoords
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${property.lat}%2C${property.lng}`
    : '';

  return (
    <div className="bg-cyprus-sand pb-16">
      <div className="container mx-auto px-4">
        <nav aria-label="breadcrumb" className="py-4 text-sm text-cyprus-navy/70">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="hover:text-cyprus-navy">
                {t('property.home')}
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <li>
              <Link to="/real-estate" className="hover:text-cyprus-navy">
                {t('nav.realEstate')}
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <li className="text-cyprus-navy font-medium" aria-current="page">
              {property.name}
            </li>
          </ol>
        </nav>

        <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 items-start mb-10">
          <div>
            <img
              src={mainImage}
              alt={`${t('property.photoOf')} — ${property.name}`}
              className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover rounded-2xl shadow-card"
              width="1200"
              height="700"
            />
            {images.length > 1 && (
              <div
                className="mt-3 flex gap-2 overflow-x-auto pb-1"
                role="group"
                aria-label={t('property.gallery')}
              >
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-current={index === activeImage}
                    className={`shrink-0 rounded-lg overflow-hidden ring-2 transition-shadow focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:outline-none ${
                      index === activeImage ? 'ring-cyprus-orange' : 'ring-transparent hover:ring-cyprus-navy/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-20 h-14 sm:w-24 sm:h-16 object-cover"
                      width="96"
                      height="72"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
            <h1 className="text-2xl sm:text-3xl font-bold text-cyprus-navy text-balance">
              {property.name}
            </h1>
            {facts.length > 0 && (
              <dl className="mt-5 space-y-2 text-sm sm:text-base">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-wrap justify-between gap-x-4">
                    <dt className="text-cyprus-navy/60">{fact.label}</dt>
                    <dd className="font-medium text-cyprus-navy text-right">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {property.priceFrom !== null && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-cyprus-navy/60">{t('property.priceFrom')}</p>
                <p className="mt-1 text-2xl sm:text-3xl font-bold text-cyprus-navy whitespace-nowrap">
                  {formatPrice(property.priceFrom, property.currency)}
                </p>
              </div>
            )}
            {property.pdfUrl && (
              <a
                href={property.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-cyprus-orange hover:text-cyprus-orange/80 font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none rounded"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                {t('property.pdf')}
              </a>
            )}
          </div>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyprus-navy mb-4">
            {t('property.about')}
          </h2>
          <p className="text-gray-700 whitespace-pre-line text-base sm:text-lg max-w-4xl">
            {property.description}
          </p>
          {property.areas.length > 0 && (
            <div className="mt-6 max-w-2xl">
              <h3 className="font-semibold text-cyprus-navy mb-3">{t('property.areas')}</h3>
              <ul className="divide-y divide-gray-200 rounded-xl bg-white shadow-card">
                {property.areas.map((area, index) => (
                  <li key={`${area.label}-${index}`} className="flex justify-between gap-4 px-4 py-3">
                    <span className="text-gray-700">{area.label}</span>
                    <span className="font-medium text-cyprus-navy whitespace-nowrap">
                      {area.size === null
                        ? '—'
                        : `${new Intl.NumberFormat(i18n.language).format(area.size)} ${t('property.m2')}`}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {property.saleTypes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-cyprus-navy mb-3">{t('property.saleTypes')}</h3>
              <ul className="flex flex-wrap gap-2">
                {property.saleTypes.map((item) => (
                  <li
                    key={item}
                    className="bg-white border border-cyprus-navy/10 rounded-full px-4 py-2 text-sm text-cyprus-navy"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {property.floorPlans.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyprus-navy mb-4">
              {t('property.plans')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {property.floorPlans.map((plan) => (
                <img
                  key={plan}
                  src={plan}
                  alt={`${t('property.planOf')} — ${property.name}`}
                  className="w-full h-56 object-contain bg-white rounded-xl shadow-card p-2"
                  width="600"
                  height="400"
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        {hasCoords && (
          <section className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyprus-navy mb-4">
              {t('property.location')}
            </h2>
            <div className="rounded-2xl overflow-hidden shadow-card bg-white">
              <iframe
                title={t('property.location')}
                src={mapSrc}
                className="w-full h-[300px] sm:h-[420px] border-0"
                loading="lazy"
              />
              <div className="p-4">
                <a
                  href={`https://www.openstreetmap.org/?mlat=${property.lat}&mlon=${property.lng}#map=16/${property.lat}/${property.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyprus-orange hover:text-cyprus-orange/80 font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none rounded"
                >
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                  {t('property.openMap')}
                </a>
              </div>
            </div>
          </section>
        )}

        <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-card mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-cyprus-navy">
            {t('property.request')}
          </h2>
          <p className="mt-2 text-gray-600 mb-6">{t('property.requestSubtitle')}</p>
          {sent ? (
            <p className="text-green-700 font-medium">{t('property.sent')}</p>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.name')} *
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.phone')} *
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => setForm({ ...form, phone: event.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.email')}
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="lead-message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.message')}
                </label>
                <textarea
                  id="lead-message"
                  rows={3}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div className="sm:col-span-2 flex items-start gap-3">
                <input
                  id="lead-consent"
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(event) => setForm({ ...form, consent: event.target.checked })}
                  className="mt-1 w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
                />
                <span className="text-sm text-gray-600">
                  <label htmlFor="lead-consent" className="cursor-pointer">
                    {t('contact.consentStart')}{' '}
                  </label>
                  <Link
                    to="/privacy"
                    className="text-cyprus-navy underline decoration-cyprus-navy/40 underline-offset-2 hover:decoration-cyprus-navy focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none rounded"
                  >
                    {t('contact.consentLink')}
                  </Link>{' '}
                  *
                </span>
              </div>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="lead-website">Website</label>
                <input
                  id="lead-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(event) => setForm({ ...form, website: event.target.value })}
                />
              </div>
              {sendError && (
                <p role="alert" className="sm:col-span-2 text-red-700 text-sm">
                  {sendError}
                </p>
              )}
              <button
                type="submit"
                className="sm:col-span-2 bg-cyprus-orange text-white py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                {t('contact.send')}
              </button>
            </form>
          )}
        </section>

        {similar.length > 0 && (
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-cyprus-navy mb-6">
              {t('property.similar')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((item) => (
                <PropertyCard key={item.slug} property={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
