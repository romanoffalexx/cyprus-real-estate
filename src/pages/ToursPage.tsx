import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Euro } from 'lucide-react';

export default function ToursPage() {
  const { t } = useTranslation();

  const tours = [
    {
      id: 1,
      title: t('toursList.tour1.title'),
      duration: 5,
      price: 1500,
      description: t('toursList.tour1.description'),
      image: '/images/cyprus-tour.jpg',
    },
    {
      id: 2,
      title: t('toursList.tour2.title'),
      duration: 7,
      price: 2200,
      description: t('toursList.tour2.description'),
      image: '/images/cyprus-coast.jpg',
    },
    {
      id: 3,
      title: t('toursList.tour3.title'),
      duration: 4,
      price: 3000,
      description: t('toursList.tour3.description'),
      image: '/images/villa-limassol.jpg',
    },
  ];

  return (
    <div className="py-8 md:py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy mb-3 md:mb-4">
          {t('tours.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12">
          {t('tours.subtitle')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1 group">
              <img src={tour.image} alt={tour.title} className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" width="400" height="300" />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-cyprus-navy mb-2 sm:mb-3">{tour.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{tour.description}</p>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" /> {tour.duration} {t('tours.duration')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Euro className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" /> {t('tours.price')} €{tour.price}
                  </span>
                </div>
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
