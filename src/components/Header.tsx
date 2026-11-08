import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
    { path: '/tours', label: t('nav.brokerTour') },
    { path: '/trips', label: t('nav.cyprusExcursions') },
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
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `transition-colors font-medium px-3 py-2 rounded-lg text-sm whitespace-nowrap ${
                    isActive
                      ? 'text-cyprus-orange bg-cyprus-sand'
                      : 'text-gray-700 hover:text-cyprus-navy hover:bg-cyprus-sand'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+35799123456" className="flex items-center gap-2 text-cyprus-navy hover:text-cyprus-orange transition-colors whitespace-nowrap" aria-label="Call us">
              <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-sm">+357 99 123 456</span>
            </a>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-cyprus-navy text-cyprus-navy rounded hover:bg-cyprus-navy hover:text-white transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label={`Switch language to ${i18n.language === 'ru' ? 'English' : 'Русский'}`}
            >
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </button>
            <Link
              to="/contacts"
              className="bg-cyprus-orange text-white px-5 py-2 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium text-sm whitespace-nowrap"
            >
              {t('nav.request')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none rounded"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `transition-colors font-medium px-3 py-2 rounded-lg ${
                      isActive
                        ? 'text-cyprus-orange bg-cyprus-sand'
                        : 'text-gray-700 hover:text-cyprus-navy hover:bg-cyprus-sand'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 border border-cyprus-navy text-cyprus-navy rounded hover:bg-cyprus-navy hover:text-white transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
                  aria-label={`Switch language to ${i18n.language === 'ru' ? 'English' : 'Русский'}`}
                >
                  {i18n.language === 'ru' ? 'EN' : 'RU'}
                </button>
                <a href="tel:+35799123456" className="flex items-center gap-2 text-cyprus-navy hover:text-cyprus-orange transition-colors" aria-label="Call us">
                  <Phone className="w-4 h-4" aria-hidden="true" />
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
