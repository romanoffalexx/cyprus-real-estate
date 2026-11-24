import { useTranslation } from 'react-i18next';

export default function StorageTable() {
  const { t } = useTranslation();
  const rows = [
    {
      name: 'cookie-consent',
      location: 'localStorage',
      category: t('cookie.categoryNecessary'),
      purpose: t('cookie.storageConsent'),
      duration: t('cookie.storageConsentDuration'),
    },
    {
      name: 'cyprus.admin.token',
      location: 'sessionStorage',
      category: t('cookie.categoryNecessary'),
      purpose: t('cookie.storageAdmin'),
      duration: t('cookie.storageAdminDuration'),
    },
    {
      name: t('cookie.storageRateName'),
      location: t('cookie.storageServerMemory'),
      category: t('cookie.categoryNecessary'),
      purpose: t('cookie.storageRate'),
      duration: t('cookie.storageRateDuration'),
    },
    {
      name: 'OpenStreetMap embed',
      location: t('cookie.storageExternal'),
      category: t('cookie.categoryFunctional'),
      purpose: t('cookie.storageMap'),
      duration: t('cookie.storageMapDuration'),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[760px] text-left text-sm">
        <caption className="sr-only">{t('cookie.tableCaption')}</caption>
        <thead className="bg-gray-50 text-cyprus-navy">
          <tr>
            <th scope="col" className="px-4 py-3 font-semibold">{t('cookie.tableName')}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{t('cookie.tableLocation')}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{t('cookie.tableCategory')}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{t('cookie.tablePurpose')}</th>
            <th scope="col" className="px-4 py-3 font-semibold">{t('cookie.tableDuration')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" className="px-4 py-3 font-medium text-cyprus-navy break-words">
                {row.name}
              </th>
              <td className="px-4 py-3 text-gray-700">{row.location}</td>
              <td className="px-4 py-3 text-gray-700">{row.category}</td>
              <td className="px-4 py-3 text-gray-700">{row.purpose}</td>
              <td className="px-4 py-3 text-gray-700">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
