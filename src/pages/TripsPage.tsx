import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';

export default function TripsPage() {
  const { t } = useTranslation();

  const trip1Locations = t('tripsList.trip1.locations', { returnObjects: true }) as string[];
  const pearlLocations = t('pearl.locations', { returnObjects: true }) as string[];

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
          {/* Тур по недвижимости */}
          <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1 group">
            <img
              src="/images/cyprus-tour.jpg"
              alt={t('tripsList.trip1.title')}
              className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              width="800"
              height="600"
            />
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-2 sm:mb-3">
                {t('tripsList.trip1.title')}
              </h2>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                {t('tripsList.trip1.description')}
              </p>
              <div className="flex items-center gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" /> 10 {t('trips.days')}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {trip1Locations.map((location) => (
                  <span
                    key={location}
                    className="flex items-center gap-1 bg-cyprus-sand px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
                  >
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" /> {location}
                  </span>
                ))}
              </div>
              <Link
                to="/contacts"
                className="block w-full bg-cyprus-orange text-white text-center py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-transform hover:scale-105 font-medium text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('trips.book')}
              </Link>
            </div>
          </div>

          {/* Жемчужина Средиземноморья */}
          <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow transform hover:-translate-y-1 group">
            <Link
              to="/trips/pearl"
              className="block focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <div className="relative">
                <img
                  src="/images/tour-northern-cyprus.jpg"
                  alt={t('pearl.title')}
                  className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  width="800"
                  height="600"
                />
                <span className="absolute top-3 left-3 bg-cyprus-navy text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {t('pearl.badge')}
                </span>
              </div>
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-2 sm:mb-3">
                  {t('pearl.title')}
                </h2>
                <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                  {t('pearl.description')}
                </p>
                <div className="flex items-center gap-3 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" /> {t('pearl.duration')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {pearlLocations.map((location) => (
                    <span
                      key={location}
                      className="flex items-center gap-1 bg-cyprus-sand px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
                    >
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" /> {location}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
            <div className="px-4 pb-4 sm:px-6 sm:pb-6 flex flex-col gap-2 sm:gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Link
                to="/contacts"
                className="flex-1 bg-cyprus-orange text-white text-center py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-transform hover:scale-105 font-medium text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('trips.book')}
              </Link>
              <Link
                to="/trips/pearl"
                className="flex-1 border border-cyprus-navy text-cyprus-navy text-center px-2 py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-navy hover:text-white transition-colors font-medium text-sm sm:text-base inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                {t('pearl.details')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
