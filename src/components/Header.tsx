import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { path: '/real-estate', label: t('nav.realEstate') },
    { path: '/tours', label: t('tours.title') },
    { path: '/trips', label: t('trips.title') },
    { path: '/about', label: t('nav.aboutCompany') },
    { path: '/contacts', label: t('nav.contacts') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-cyprus-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <div className="flex flex-col">
              <span className="text-cyprus-navy font-bold text-lg leading-tight">Express</span>
              <span className="text-cyprus-orange font-semibold text-sm leading-tight">Travel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-cyprus-navy transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+35799123456" className="flex items-center gap-2 text-cyprus-navy">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+357 99 123 456</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-cyprus-navy text-cyprus-navy rounded hover:bg-cyprus-navy hover:text-white transition-colors font-medium"
            >
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </button>
            <Link
              to="/contacts"
              className="bg-cyprus-orange text-white px-6 py-2 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium"
            >
              {t('nav.request')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-cyprus-navy transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 border border-cyprus-navy text-cyprus-navy rounded hover:bg-cyprus-navy hover:text-white transition-colors font-medium"
                >
                  {i18n.language === 'ru' ? 'EN' : 'RU'}
                </button>
                <a href="tel:+35799123456" className="flex items-center gap-2 text-cyprus-navy">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+357 99 123 456</span>
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
