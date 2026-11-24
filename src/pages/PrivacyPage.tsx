import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LegalPage from '../components/legal/LegalPage';
import { getPrivacyPolicy } from '../lib/legal';

export default function PrivacyPage() {
  const { i18n, t } = useTranslation();
  const document = getPrivacyPolicy(i18n.resolvedLanguage);

  return (
    <LegalPage document={document}>
      <nav className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
        <Link to="/cookies" className="text-cyprus-navy underline underline-offset-4">
          {t('footer.cookies')}
        </Link>
        <Link to="/data-rights" className="text-cyprus-navy underline underline-offset-4">
          {t('footer.dataRights')}
        </Link>
      </nav>
    </LegalPage>
  );
}
