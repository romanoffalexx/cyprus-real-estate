import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

export default function TripsPage() {
  const { t } = useTranslation();

  const trips = [
    {
      id: 1,
      title: t('tripsList.trip1.title'),
      duration: 10,
      locations: t('tripsList.trip1.locations', { returnObjects: true }) as string[],
      description: t('tripsList.trip1.description'),
      image: '/images/cyprus-coast.jpg',
    },
    {
      id: 2,
      title: t('tripsList.trip2.title'),
      duration: 14,
      locations: t('tripsList.trip2.locations', { returnObjects: true }) as string[],
      description: t('tripsList.trip2.description'),
      image: '/images/cyprus-tour.jpg',
    },
  ];

  return (
    <div className="py-8 md:py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy mb-3 md:mb-4">
          {t('trips.title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12">
          {t('trips.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1 group">
              <img src={trip.image} alt={trip.title} className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500" width="400" height="300" />
              <div className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-2 sm:mb-3">{trip.title}</h3>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">{trip.description}</p>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" /> {trip.duration} {t('tours.duration')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {trip.locations.map((location) => (
                    <span key={location} className="flex items-center gap-1 bg-cyprus-sand px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" /> {location}
                    </span>
                  ))}
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
