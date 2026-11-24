import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { submitLead } from '../lib/api';
import { PRIVACY_POLICY_VERSION } from '../lib/legal';

const EMPTY_FORM = { name: '', phone: '', email: '', message: '', consent: false, website: '' };

export default function ContactsPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.consent) return;
    setSending(true);
    setSendError('');
    try {
      await submitLead({
        ...formData,
        propertySlug: '',
        consentPolicyVersion: PRIVACY_POLICY_VERSION,
      });
      setSent(true);
      setFormData(EMPTY_FORM);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : t('contact.sendError'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          {t('contact.title')}
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-card">
          {sent ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-cyprus-navy mb-2">{t('contact.sent')}</h2>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.name')} *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.phone')} *
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  onChange={(event) => setFormData({ ...formData, message: event.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(event) => setFormData({ ...formData, website: event.target.value })}
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="contact-consent"
                  required
                  checked={formData.consent}
                  onChange={(event) => setFormData({ ...formData, consent: event.target.checked })}
                  className="mt-1 w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
                />
                <span className="text-sm text-gray-600">
                  <label htmlFor="contact-consent" className="cursor-pointer">
                    {t('contact.consentStart')}{' '}
                  </label>
                  <Link
                    to="/privacy"
                    className="text-cyprus-navy underline decoration-cyprus-navy/40 underline-offset-2 hover:decoration-cyprus-navy focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none rounded"
                  >
                    {t('contact.consentLink')}
                  </Link>{' '}
                  *
                </span>
              </div>
              {sendError && (
                <p role="alert" className="text-red-700 text-sm">{sendError}</p>
              )}
              <button
                type="submit"
                disabled={sending || !formData.consent}
                className="w-full bg-cyprus-orange text-white py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                {sending ? t('contact.sending') : t('contact.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
