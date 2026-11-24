import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import StorageTable from './legal/StorageTable';
import {
  COOKIE_SETTINGS_EVENT,
  saveCookieConsent,
  useCookieConsent,
  type ConsentSource,
} from '../lib/consent';

export default function CookieBanner() {
  const { t } = useTranslation();
  const consent = useCookieConsent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [functional, setFunctional] = useState(false);
  const [storageError, setStorageError] = useState(false);

  const showSettings = useCallback(() => {
    setFunctional(consent?.categories.functional ?? false);
    setStorageError(false);
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
  }, [consent]);

  useEffect(() => {
    window.addEventListener(COOKIE_SETTINGS_EVENT, showSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, showSettings);
  }, [showSettings]);

  const save = (enabled: boolean, source: ConsentSource) => {
    if (!saveCookieConsent(enabled, source)) {
      setStorageError(true);
      return;
    }
    dialogRef.current?.close();
  };

  return (
    <>
      {!consent && (
        <section
          aria-labelledby="cookie-title"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white shadow-lg"
        >
          <div className="container mx-auto max-h-[calc(100dvh-2rem)] overflow-y-auto px-4 py-5">
            <h2 id="cookie-title" className="font-semibold text-cyprus-navy mb-2">
              {t('cookie.title')}
            </h2>
            <p className="text-sm text-gray-700 mb-4">{t('cookie.message')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-3xl">
              <button
                type="button"
                onClick={() => save(true, 'accept-all')}
                className="bg-cyprus-orange text-white px-4 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('cookie.acceptAll')}
              </button>
              <button
                type="button"
                onClick={() => save(false, 'reject-all')}
                className="bg-cyprus-navy text-white px-4 py-3 rounded-lg hover:bg-cyprus-navy/90 transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('cookie.rejectAll')}
              </button>
              <button
                type="button"
                onClick={showSettings}
                className="border border-cyprus-navy text-cyprus-navy px-4 py-3 rounded-lg hover:bg-cyprus-navy/5 transition-colors font-medium text-sm focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {t('cookie.settings')}
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              <Link to="/cookies" className="underline underline-offset-2">{t('footer.cookies')}</Link>
              {' · '}
              <Link to="/privacy" className="underline underline-offset-2">{t('footer.privacy')}</Link>
            </p>
            {storageError && (
              <p role="alert" className="mt-3 text-sm text-red-700">{t('cookie.storageError')}</p>
            )}
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        className="w-[calc(100%-2rem)] max-w-4xl max-h-[85dvh] rounded-2xl border border-gray-200 p-0 text-cyprus-navy shadow-xl"
        onCancel={() => setStorageError(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            save(functional, 'custom');
          }}
          className="max-h-[85dvh] overflow-y-auto p-5 sm:p-7"
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h2 id="cookie-settings-title" className="text-2xl font-bold">{t('cookie.settingsTitle')}</h2>
              <p className="mt-2 text-sm text-gray-600">{t('cookie.settingsHint')}</p>
            </div>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={t('cookie.close')}
              className="p-2 rounded-lg hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:outline-none"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-3 mb-6">
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
              <input type="checkbox" checked disabled className="mt-1 w-4 h-4" />
              <span>
                <span className="block font-medium">{t('cookie.categoryNecessary')}</span>
                <span className="block text-sm text-gray-600 mt-1">{t('cookie.necessaryHint')}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
              <input
                type="checkbox"
                checked={functional}
                onChange={(event) => setFunctional(event.target.checked)}
                className="mt-1 w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
              />
              <span>
                <span className="block font-medium">{t('cookie.categoryFunctional')}</span>
                <span className="block text-sm text-gray-600 mt-1">{t('cookie.functionalHint')}</span>
              </span>
            </label>
          </div>

          <StorageTable />
          {storageError && (
            <p role="alert" className="mt-4 text-sm text-red-700">{t('cookie.storageError')}</p>
          )}
          <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="border border-cyprus-navy text-cyprus-navy px-5 py-3 rounded-lg hover:bg-cyprus-navy/5 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('cookie.cancel')}
            </button>
            <button
              type="submit"
              className="bg-cyprus-orange text-white px-5 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('cookie.save')}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
