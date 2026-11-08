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
    <div className="py-8 md:py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy mb-3 md:mb-4">
          {t('excursions.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12">
          {t('excursions.subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {excursions.map((excursion) => (
            <div key={excursion.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1 group">
              <img src={excursion.image} alt={excursion.name} className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" width="400" height="300" />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-cyprus-navy mb-3 sm:mb-4">{excursion.name}</h3>
                <Link
                  to="/contacts"
                  className="block w-full bg-cyprus-orange text-white text-center py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-transform hover:scale-105 font-medium text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
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
