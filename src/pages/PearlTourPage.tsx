import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Check, ChevronRight, Info, MapPin, X } from 'lucide-react';

export default function PearlTourPage() {
  const { t } = useTranslation();

  const days = t('pearl.days', { returnObjects: true }) as string[];
  const included = t('pearl.included', { returnObjects: true }) as string[];
  const notIncluded = t('pearl.notIncluded', { returnObjects: true }) as string[];
  const locations = t('pearl.locations', { returnObjects: true }) as string[];

  return (
    <div className="py-8 md:py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <nav aria-label={t('trips.title')} className="mb-4 md:mb-6">
          <Link
            to="/trips"
            className="inline-flex items-center gap-1 min-h-[44px] text-sm sm:text-base text-cyprus-navy underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none rounded"
          >
            <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            {t('trips.title')}
          </Link>
        </nav>

        <div className="bg-white rounded-2xl overflow-hidden shadow-card mb-6 md:mb-8">
          <div className="relative">
            <img
              src="/images/tour-northern-cyprus.jpg"
              alt={t('pearl.title')}
              className="w-full h-56 sm:h-72 md:h-96 object-cover"
              width="1200"
              height="800"
            />
            <span className="absolute top-3 left-3 bg-cyprus-navy text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
              {t('pearl.badge')}
            </span>
          </div>
          <div className="p-5 sm:p-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy mb-3">
              {t('pearl.title')}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4 md:mb-6">
              {t('pearl.description')}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-5 text-sm sm:text-base text-gray-700">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyprus-navy" aria-hidden="true" />
                {t('pearl.duration')}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-cyprus-navy" aria-hidden="true" />
                {t('pearl.datesNote')}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
              {locations.map((location) => (
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
              className="block w-full sm:w-auto sm:inline-block bg-cyprus-orange text-white text-center px-8 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-transform hover:scale-105 font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('trips.book')}
            </Link>
          </div>
        </div>

        <section className="bg-white rounded-2xl shadow-card p-5 sm:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyprus-navy mb-6">
            {t('pearl.programTitle')}
          </h2>
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
              <p className="font-medium text-cyprus-navy">
                {t('pearl.priceTitle')}: {t('pearl.priceNote')}
              </p>
              <p>
                <span className="font-medium text-cyprus-navy">{t('pearl.individualTitle')}:</span>{' '}
                {t('pearl.individualNote')}
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-500">{t('pearl.disclaimer')}</p>
        </section>
      </div>
    </div>
  );
}
