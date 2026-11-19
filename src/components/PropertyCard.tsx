import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { formatPrice, propertyImage, type Property } from '../lib/properties';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t } = useTranslation();

  const facts = [
    { label: t('catalog.type'), value: property.type },
    { label: t('catalog.developer'), value: property.developer },
    { label: t('catalog.district'), value: property.district },
    { label: t('catalog.completion'), value: property.completionYear },
  ].filter((fact) => fact.value);

  return (
    <article className="relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1">
      <Link
        to={`/real-estate/${property.slug}`}
        className="block group focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <div className="relative h-44 sm:h-52">
          <img
            src={propertyImage(property)}
            alt={property.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width="400"
            height="300"
            loading="lazy"
          />
          {property.badge && (
            <span className="absolute top-3 left-3 bg-cyprus-navy text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
              {property.badge}
            </span>
          )}
        </div>
        <div className="p-4 sm:p-6 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-3 sm:mb-4 text-balance">
            {property.name}
          </h3>
          {facts.length > 0 && (
            <dl className="space-y-1 text-sm sm:text-base text-cyprus-navy">
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="inline">{fact.label}:</dt>{' '}
                  <dd className="inline">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          {property.priceFrom !== null && (
            <div className="mt-4 sm:mt-6">
              <p className="text-sm sm:text-base text-cyprus-navy">{t('catalog.priceFrom')}</p>
              <p className="mt-1 text-lg sm:text-xl font-bold text-cyprus-navy whitespace-nowrap">
                {formatPrice(property.priceFrom, property.currency)}
              </p>
            </div>
          )}
        </div>
      </Link>
      <button
        type="button"
        className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:outline-none"
        aria-label={t('catalog.favorite')}
      >
        <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-gray-600" aria-hidden="true" />
      </button>
    </article>
  );
}
