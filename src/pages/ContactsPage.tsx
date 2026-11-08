import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

export default function ContactsPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    // TODO: Отправка в Telegram (токен будет позже)
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          {t('contact.title')}
        </h1>
        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow-card">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-cyprus-navy mb-2">Заявка отправлена!</h2>
              <p className="text-gray-600">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.phone')} *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  {t('contact.consent')} *
                </label>
              </div>
              <button
                type="submit"
                disabled={!formData.consent}
                className="w-full bg-cyprus-orange text-white py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {t('contact.send')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
