import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import {
  developerOptions,
  fetchProperties,
  filterByDeveloper,
  type Property,
} from '../lib/properties';

export default function RealEstatePage() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const developer = searchParams.get('developer') ?? '';

  useEffect(() => {
    let active = true;
    fetchProperties()
      .then((items) => {
        if (active) setProperties(items);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const developers = useMemo(() => developerOptions(properties ?? []), [properties]);
  const shown = useMemo(() => filterByDeveloper(properties ?? [], developer), [properties, developer]);

  const changeDeveloper = (value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('developer', value);
    else next.delete('developer');
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyprus-navy mb-8">
          {t('nav.realEstate')}
        </h1>

        {developers.length > 1 && (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="relative">
              <label htmlFor="developer" className="sr-only">
                {t('filter.developer')}
              </label>
              <Building2
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
              <select
                id="developer"
                value={developer}
                onChange={(event) => changeDeveloper(event.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg appearance-none bg-white text-sm md:text-base text-cyprus-navy focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
              >
                <option value="">{t('filter.anyDeveloper')}</option>
                {developers.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {developer && (
              <button
                type="button"
                onClick={() => changeDeveloper('')}
                className="text-sm text-cyprus-navy underline hover:no-underline focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none rounded"
              >
                {t('filter.reset')}
              </button>
            )}
          </div>
        )}

        {failed ? (
          <p className="text-cyprus-navy/70">{t('property.loadError')}</p>
        ) : properties === null ? (
          <p className="text-cyprus-navy/70">{t('property.loading')}</p>
        ) : properties.length === 0 ? (
          <p className="text-cyprus-navy/70">{t('catalog.empty')}</p>
        ) : shown.length === 0 ? (
          <p className="text-cyprus-navy/70">{t('filter.noMatches')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shown.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
