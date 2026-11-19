import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties, type Property } from '../lib/properties';

export default function RealEstatePage() {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<Property[] | null>(null);
  const [failed, setFailed] = useState(false);

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

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyprus-navy mb-8">
          {t('nav.realEstate')}
        </h1>
        {failed ? (
          <p className="text-cyprus-navy/70">{t('property.loadError')}</p>
        ) : properties === null ? (
          <p className="text-cyprus-navy/70">{t('property.loading')}</p>
        ) : properties.length === 0 ? (
          <p className="text-cyprus-navy/70">{t('catalog.empty')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.slug} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
