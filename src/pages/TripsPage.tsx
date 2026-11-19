import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Check, X, ChevronDown, Info } from 'lucide-react';

export default function TripsPage() {
  const { t } = useTranslation();
  const [showProgram, setShowProgram] = useState(false);

  const trip1Locations = t('tripsList.trip1.locations', { returnObjects: true }) as string[];
  const pearlLocations = t('pearl.locations', { returnObjects: true }) as string[];
  const days = t('pearl.days', { returnObjects: true }) as string[];
  const included = t('pearl.included', { returnObjects: true }) as string[];
  const notIncluded = t('pearl.notIncluded', { returnObjects: true }) as string[];

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
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {pearlLocations.map((location) => (
                  <span
                    key={location}
                    className="flex items-center gap-1 bg-cyprus-sand px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm"
                  >
                    <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" /> {location}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row md:flex-col lg:flex-row">
                <Link
                  to="/contacts"
                  className="flex-1 bg-cyprus-orange text-white text-center py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-transform hover:scale-105 font-medium text-sm sm:text-base focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  {t('trips.book')}
                </Link>
                <button
                  onClick={() => setShowProgram((value) => !value)}
                  aria-expanded={showProgram}
                  aria-controls="pearl-program"
                  className="flex-1 border border-cyprus-navy text-cyprus-navy text-center px-2 py-2.5 sm:py-3 rounded-lg hover:bg-cyprus-navy hover:text-white transition-colors font-medium text-sm sm:text-base inline-flex items-center justify-center gap-1.5 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showProgram ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                  {showProgram ? t('pearl.detailsHide') : t('pearl.details')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Программа тура по дням */}
        {showProgram && (
          <section
            id="pearl-program"
            className="mt-8 md:mt-12 bg-white rounded-2xl shadow-card p-5 sm:p-8 animate-fade-in-up"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyprus-navy mb-1">
              {t('pearl.title')}
            </h2>
            <p className="text-sm sm:text-base text-cyprus-orange font-medium mb-6">
              {t('pearl.duration')} · {t('pearl.datesNote')}
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-cyprus-navy mb-4">
              {t('pearl.programTitle')}
            </h3>
            <ol className="space-y-4 mb-8">
              {days.map((day, index) => (
                <li key={index} className="flex gap-3 sm:gap-4">
                  <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyprus-sand text-cyprus-navy font-bold flex items-center justify-center text-sm sm:text-base">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 text-sm sm:text-base pt-1 sm:pt-2">{day}</p>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-cyprus-navy mb-3 flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" aria-hidden="true" />
                  {t('pearl.includedTitle')}
                </h3>
                <ul className="space-y-2">
                  {included.map((item) => (
                    <li key={item} className="flex gap-2 text-sm sm:text-base text-gray-700">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-green-600" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-cyprus-navy mb-3 flex items-center gap-2">
                  <X className="w-5 h-5 text-cyprus-orange" aria-hidden="true" />
                  {t('pearl.notIncludedTitle')}
                </h3>
                <ul className="space-y-2">
                  {notIncluded.map((item) => (
                    <li key={item} className="flex gap-2 text-sm sm:text-base text-gray-700">
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5 text-cyprus-orange" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-cyprus-sand rounded-xl p-4 sm:p-5 mb-4 flex gap-3">
              <Info className="w-5 h-5 flex-shrink-0 text-cyprus-navy mt-0.5" aria-hidden="true" />
              <div className="space-y-2 text-sm sm:text-base text-gray-700">
                <p>{t('pearl.hotelNote')}</p>
                <p className="font-medium text-cyprus-navy">{t('pearl.priceTitle')}: {t('pearl.priceNote')}</p>
                <p>
                  <span className="font-medium text-cyprus-navy">{t('pearl.individualTitle')}:</span>{' '}
                  {t('pearl.individualNote')}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">{t('pearl.disclaimer')}</p>
          </section>
        )}
      </div>
    </div>
  );
}
