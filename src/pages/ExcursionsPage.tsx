import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function ExcursionsPage() {
  const { t } = useTranslation();

  const excursions = [
    { id: 1, name: 'Dresden', image: '/images/excursion-berlin.jpg' },
    { id: 2, name: 'Berlin', image: '/images/excursion-berlin.jpg' },
    { id: 3, name: 'Paris', image: '/images/excursion-paris.jpg' },
    { id: 4, name: 'Wien', image: '/images/excursion-budapest.jpg' },
    { id: 5, name: 'Budapest', image: '/images/excursion-budapest.jpg' },
    { id: 6, name: 'Bratislava', image: '/images/excursion-paris.jpg' },
    { id: 7, name: 'оз. Гарда', image: '/images/excursion-lake-garda.jpg' },
  ];

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-4">
          {t('excursions.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {t('excursions.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursions.map((excursion) => (
            <div key={excursion.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
              <img src={excursion.image} alt={excursion.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-cyprus-navy mb-4">{excursion.name}</h3>
                <Link
                  to="/contacts"
                  className="block w-full bg-cyprus-orange text-white text-center py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium"
                >
                  {t('tours.book')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
