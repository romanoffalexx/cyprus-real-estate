import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function CookieBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50 p-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-700 text-sm">
          {t('cookie.message')}
        </p>
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="bg-cyprus-orange text-white px-6 py-2 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium text-sm"
          >
            {t('cookie.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
