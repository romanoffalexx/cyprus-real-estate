import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-cyprus-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-cyprus-navy font-bold text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Express</span>
                <span className="text-cyprus-orange font-semibold text-sm leading-tight">Travel</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              {t('hero.experience')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/real-estate" className="hover:text-white transition-colors">{t('nav.realEstate')}</Link></li>
              <li><Link to="/tours" className="hover:text-white transition-colors">{t('tours.title')}</Link></li>
              <li><Link to="/trips" className="hover:text-white transition-colors">{t('trips.title')}</Link></li>
              <li><Link to="/excursions" className="hover:text-white transition-colors">{t('excursions.title')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('nav.aboutCompany')}</Link></li>
              <li><Link to="/contacts" className="hover:text-white transition-colors">{t('nav.contacts')}</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contacts')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>+357 99 123 456</li>
              <li>info@express-travel.com</li>
              <li>Cyprus, Limassol</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-300">
            © 2024 Express Travel. {t('footer.rights')}.
          </p>
          <Link to="/privacy" className="text-sm text-gray-300 hover:text-white transition-colors">
            {t('footer.privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
