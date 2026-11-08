import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Home, MapPin, Coins } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
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
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Cyprus villa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyprus-navy/80 to-cyprus-navy/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌴</span>
                <span className="text-sm">{t('hero.experience')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">✓</span>
                <span className="text-sm">{t('hero.legal')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤝</span>
                <span className="text-sm">{t('hero.support')}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/real-estate"
                className="bg-cyprus-orange text-white px-8 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center gap-2"
              >
                {t('hero.findProperty')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="bg-white/20 backdrop-blur text-white px-8 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium inline-flex items-center gap-2 border border-white/30"
              >
                <Play className="w-5 h-5" />
                {t('hero.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy">
                <option>{t('filter.type')}: {t('filter.any')}</option>
                <option>{t('propertyTypes.villa')}</option>
                <option>{t('propertyTypes.apartment')}</option>
                <option>{t('propertyTypes.house')}</option>
              </select>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy">
                <option>{t('filter.region')}: {t('filter.allRegions')}</option>
                <option>{t('regions.limassol')}</option>
                <option>{t('regions.paphos')}</option>
                <option>{t('regions.larnaca')}</option>
                <option>{t('regions.polis')}</option>
              </select>
            </div>
            <div className="relative">
              <Coins className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-cyprus-navy">
                <option>{t('filter.priceFrom')}: {t('filter.any_price')}</option>
                <option>€200,000</option>
                <option>€400,000</option>
                <option>€600,000</option>
              </select>
            </div>
            <button className="bg-cyprus-navy text-white px-6 py-3 rounded-lg hover:bg-cyprus-navy/90 transition-colors font-medium inline-flex items-center justify-center gap-2">
              <span>🔍</span>
              {t('filter.search')}
            </button>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-cyprus-sand">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-cyprus-navy">
              {t('featured.title')}
            </h2>
            <Link to="/real-estate" className="text-cyprus-orange hover:text-cyprus-orange/80 transition-colors font-medium inline-flex items-center gap-2">
              {t('featured.viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-4xl">{benefit.icon}</span>
                <span className="font-medium text-cyprus-navy">{benefit.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Cyprus */}
      <section className="py-16 bg-cyprus-cream">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/images/cyprus-coast.jpg"
                alt="Cyprus coast"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-cyprus-navy mb-4">
                {t('about.title')}
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-cyprus-orange mb-6">
                {t('about.subtitle')}
              </h3>
              <p className="text-gray-700 mb-8 text-lg">
                {t('about.description')}
              </p>
              <Link
                to="/about"
                className="bg-cyprus-orange text-white px-8 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center gap-2"
              >
                {t('about.learnMore')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
