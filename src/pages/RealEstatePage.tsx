import { useTranslation } from 'react-i18next';
import PropertyCard from '../components/PropertyCard';

export default function RealEstatePage() {
  const { t } = useTranslation();

  const properties = [
    {
      id: 1,
      title: t('propertyTypes.villa') + ' ' + t('regions.limassol'),
      price: 850000,
      beds: 4,
      baths: 3,
      area: 280,
      image: '/images/villa-limassol.jpg',
      badge: t('featured.premium'),
    },
    {
      id: 2,
      title: t('propertyTypes.apartment') + ' ' + t('regions.paphos'),
      price: 420000,
      beds: 2,
      baths: 2,
      area: 95,
      image: '/images/apartments-paphos.jpg',
      badge: t('featured.top'),
    },
    {
      id: 3,
      title: t('propertyTypes.villa') + ' ' + t('regions.polis'),
      price: 530000,
      beds: 3,
      baths: 2,
      area: 180,
      image: '/images/villa-polis.jpg',
    },
    {
      id: 4,
      title: t('propertyTypes.apartment') + ' ' + t('regions.larnaca'),
      price: 360000,
      beds: 2,
      baths: 2,
      area: 87,
      image: '/images/apartments-larnaca.jpg',
    },
    {
      id: 5,
      title: t('propertyTypes.villa') + ' ' + t('regions.ayiaNapa'),
      price: 720000,
      beds: 4,
      baths: 3,
      area: 250,
      image: '/images/villa-limassol.jpg',
    },
    {
      id: 6,
      title: t('propertyTypes.apartment') + ' ' + t('regions.limassol'),
      price: 290000,
      beds: 1,
      baths: 1,
      area: 65,
      image: '/images/apartments-paphos.jpg',
    },
  ];

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          {t('nav.realEstate')}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </div>
  );
}
