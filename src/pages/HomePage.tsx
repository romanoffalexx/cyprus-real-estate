import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Home, MapPin, Coins, Compass, UserCheck } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  const { t } = useTranslation();

  const properties = [
    {
      id: 1,
      title: t('propertyCards.villaLimassol'),
      price: 850000,
      beds: 4,
      baths: 3,
      area: 280,
      image: '/images/villa-limassol.jpg',
      badge: t('featured.premium'),
    },
    {
      id: 2,
      title: t('propertyCards.apartmentPaphos'),
      price: 420000,
      beds: 2,
      baths: 2,
      area: 95,
      image: '/images/apartments-paphos.jpg',
      badge: t('featured.top'),
    },
    {
      id: 3,
      title: t('propertyCards.villaPolis'),
      price: 530000,
      beds: 3,
      baths: 2,
      area: 180,
      image: '/images/villa-polis.jpg',
    },
    {
      id: 4,
      title: t('propertyCards.apartmentLarnaca'),
      price: 360000,
      beds: 2,
      baths: 2,
      area: 87,
      image: '/images/apartments-larnaca.jpg',
    },
  ];

  const benefits = [
    { icon: '⚖️', title: t('benefits.transparent') },
    { icon: '🗺️', title: t('benefits.residency') },
    { icon: '📈', title: t('benefits.investment') },
    { icon: '💎', title: t('benefits.premium') },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Cyprus villa"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyprus-navy/85 to-cyprus-navy/50" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-balance animate-fade-in-up">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-100 animate-fade-in-up animation-delay-200">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6 mb-6 md:mb-8 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">🌴</span>
                <span className="text-xs md:text-sm">{t('hero.experience')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">✓</span>
                <span className="text-xs md:text-sm">{t('hero.legal')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl">🤝</span>
                <span className="text-xs md:text-sm">{t('hero.support')}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-4 animate-fade-in-up animation-delay-600">
              <Link
                to="/real-estate"
                className="bg-cyprus-orange text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-all hover:scale-105 font-medium inline-flex items-center gap-2 shadow-lg"
              >
                {t('hero.findProperty')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/20 backdrop-blur text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-white/30 transition-all hover:scale-105 font-medium inline-flex items-center gap-2 border border-white/30"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5" />
                {t('hero.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-6 md:py-8 shadow-sm sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy text-sm md:text-base">
                <option>{t('filter.type')}: {t('filter.any')}</option>
                <option>{t('propertyTypes.villa')}</option>
                <option>{t('propertyTypes.apartment')}</option>
                <option>{t('propertyTypes.house')}</option>
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy text-sm md:text-base">
                <option>{t('filter.region')}: {t('filter.allRegions')}</option>
                <option>{t('regions.limassol')}</option>
                <option>{t('regions.paphos')}</option>
                <option>{t('regions.larnaca')}</option>
                <option>{t('regions.polis')}</option>
              </select>
            </div>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy text-sm md:text-base">
                <option>{t('filter.priceFrom')}: {t('filter.any_price')}</option>
                <option>€200,000</option>
                <option>€400,000</option>
                <option>€600,000</option>
              </select>
            </div>
            <button className="bg-cyprus-navy text-white px-6 py-2.5 md:py-3 rounded-lg hover:bg-cyprus-navy/90 transition-all hover:scale-105 font-medium inline-flex items-center justify-center gap-2 text-sm md:text-base">
              <span>🔍</span>
              {t('filter.search')}
            </button>
          </div>
        </div>
      </section>

      {/* Banners Section */}
      <section className="py-8 md:py-12 bg-gradient-to-br from-cyprus-sand to-cyprus-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Excursion Tours Banner */}
            <Link to="/trips" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0">
                <img
                  src="/images/cyprus-coast.jpg"
                  alt="Cyprus excursions"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyprus-navy/90 via-cyprus-navy/50 to-transparent" />
              </div>
              <div className="relative p-6 md:p-8 h-64 md:h-72 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-6 h-6 text-cyprus-orange" />
                  <span className="text-xs md:text-sm font-medium text-cyprus-orange uppercase tracking-wider">
                    {t('trips.title')}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {t('banners.excursionTours.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-200 mb-4">
                  {t('banners.excursionTours.description')}
                </p>
                <div className="inline-flex items-center gap-2 text-cyprus-orange font-medium group-hover:gap-3 transition-all">
                  {t('banners.excursionTours.cta')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Broker Tour Banner */}
            <Link to="/tours" className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0">
                <img
                  src="/images/cyprus-tour.jpg"
                  alt="Broker tour"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyprus-navy/90 via-cyprus-navy/50 to-transparent" />
              </div>
              <div className="relative p-6 md:p-8 h-64 md:h-72 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-3">
                  <UserCheck className="w-6 h-6 text-cyprus-orange" />
                  <span className="text-xs md:text-sm font-medium text-cyprus-orange uppercase tracking-wider">
                    {t('tours.title')}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  {t('banners.brokerTour.title')}
                </h3>
                <p className="text-sm md:text-base text-gray-200 mb-4">
                  {t('banners.brokerTour.description')}
                </p>
                <div className="inline-flex items-center gap-2 text-cyprus-orange font-medium group-hover:gap-3 transition-all">
                  {t('banners.brokerTour.cta')}
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-16 bg-cyprus-sand">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy">
              {t('featured.title')}
            </h2>
            <Link to="/real-estate" className="text-cyprus-orange hover:text-cyprus-orange/80 transition-colors font-medium inline-flex items-center gap-2">
              {t('featured.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-cyprus-sand transition-colors">
                <span className="text-3xl md:text-4xl">{benefit.icon}</span>
                <span className="font-medium text-cyprus-navy text-sm md:text-base">{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Cyprus */}
      <section className="py-12 md:py-16 bg-cyprus-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="relative group">
              <img
                src="/images/cyprus-coast.jpg"
                alt="Cyprus coast"
                className="rounded-2xl shadow-lg w-full group-hover:shadow-2xl transition-shadow duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cyprus-navy/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyprus-navy mb-4">
                {t('about.title')}
              </h2>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-cyprus-orange mb-6">
                {t('about.subtitle')}
              </h3>
              <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg">
                {t('about.description')}
              </p>
              <Link
                to="/about"
                className="bg-cyprus-orange text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg hover:bg-cyprus-orange/90 transition-all hover:scale-105 font-medium inline-flex items-center gap-2 shadow-lg"
              >
                {t('about.learnMore')}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
