import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PRIVACY_EMAIL } from '../lib/legal';

const RIGHT_KEYS = ['access', 'rectification', 'erasure', 'restriction', 'portability', 'objection', 'withdrawal'] as const;
type RightKey = (typeof RIGHT_KEYS)[number];

export default function DataRightsPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [rights, setRights] = useState<RightKey[]>([]);
  const [error, setError] = useState('');
  const [mailto, setMailto] = useState('');

  const toggleRight = (right: RightKey) => {
    setRights((current) => current.includes(right) ? current.filter((item) => item !== right) : [...current, right]);
    setError('');
  };

  const prepareRequest = (event: React.FormEvent) => {
    event.preventDefault();
    if (!rights.length) {
      setError(t('dataRights.selectRight'));
      return;
    }
    const selectedRights = RIGHT_KEYS.filter((right) => rights.includes(right)).map((right) => t(`dataRights.rights.${right}`));
    const subject = t('dataRights.emailSubject');
    const body = [
      `${t('dataRights.name')}: ${name}`,
      `${t('dataRights.email')}: ${email}`,
      '',
      `${t('dataRights.requested')}: ${selectedRights.join(', ')}`,
      '',
      `${t('dataRights.details')}: ${details || '—'}`,
    ].join('\n');
    setMailto(`mailto:${PRIVACY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setError('');
  };

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-cyprus-navy mb-4">{t('dataRights.title')}</h1>
        <p className="text-gray-700 mb-8">{t('dataRights.intro')}</p>

        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-card">
          {mailto ? (
            <div>
              <h2 className="text-2xl font-bold text-cyprus-navy mb-3">{t('dataRights.prepared')}</h2>
              <p className="text-gray-700 mb-6">{t('dataRights.preparedHint')}</p>
              <a
                href={mailto}
                className="inline-flex bg-cyprus-orange text-white px-6 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('dataRights.openEmail')}
              </a>
              <button
                type="button"
                onClick={() => setMailto('')}
                className="ml-3 text-cyprus-navy underline underline-offset-4"
              >
                {t('dataRights.edit')}
              </button>
            </div>
          ) : (
            <form onSubmit={prepareRequest} className="space-y-6">
              <div>
                <label htmlFor="dsar-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dataRights.name')} *
                </label>
                <input
                  id="dsar-name"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label htmlFor="dsar-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dataRights.email')} *
                </label>
                <input
                  id="dsar-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
                <p className="mt-2 text-sm text-gray-500">{t('dataRights.emailHint')}</p>
              </div>
              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-3">{t('dataRights.requested')} *</legend>
                <div className="space-y-3">
                  {RIGHT_KEYS.map((right) => (
                    <label key={right} className="flex items-start gap-3 text-gray-700">
                      <input
                        type="checkbox"
                        checked={rights.includes(right)}
                        onChange={() => toggleRight(right)}
                        className="mt-1 w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
                      />
                      <span>{t(`dataRights.rights.${right}`)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="dsar-details" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('dataRights.details')}
                </label>
                <textarea
                  id="dsar-details"
                  rows={5}
                  value={details}
                  onChange={(event) => setDetails(event.target.value)}
                  placeholder={t('dataRights.detailsPlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
              <button
                type="submit"
                className="w-full sm:w-auto bg-cyprus-orange text-white px-6 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('dataRights.prepare')}
              </button>
              <p className="text-sm text-gray-500">{t('dataRights.privacyNote')}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
