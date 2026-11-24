import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LegalPage from '../components/legal/LegalPage';
import StorageTable from '../components/legal/StorageTable';
import { getCookiePolicy } from '../lib/legal';
import { openCookieSettings } from '../lib/consent';

export default function CookiePolicyPage() {
  const { i18n, t } = useTranslation();
  const document = getCookiePolicy(i18n.resolvedLanguage);

  return (
    <LegalPage document={document}>
      <section className="mt-10">
        <h2 className="text-xl sm:text-2xl font-bold text-cyprus-navy mb-4">
          {t('cookie.tableTitle')}
        </h2>
        <StorageTable />
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={openCookieSettings}
            className="bg-cyprus-orange text-white px-5 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t('cookie.settings')}
          </button>
          <Link
            to="/data-rights"
            className="border border-cyprus-navy text-cyprus-navy px-5 py-3 rounded-lg hover:bg-cyprus-navy/5 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t('footer.dataRights')}
          </Link>
        </div>
      </section>
    </LegalPage>
  );
}
