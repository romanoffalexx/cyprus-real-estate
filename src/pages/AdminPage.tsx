import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Edit, Plus, Trash2 } from 'lucide-react';
import PropertyEditor from '../components/admin/PropertyEditor';
import { emptyProperty, type Lead, type Property } from '../lib/properties';
import {
  ApiError,
  deleteLead,
  deleteProperty,
  getToken,
  listLeads,
  listProperties,
  login,
  saveProperty,
  setToken,
} from '../lib/api';

export default function AdminPage() {
  const { t } = useTranslation();
  const [authed, setAuthed] = useState(Boolean(getToken()));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tab, setTab] = useState<'properties' | 'leads'>('properties');
  const [draft, setDraft] = useState<{ property: Property; isNew: boolean } | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const refresh = useCallback(async () => {
    const [items, applications] = await Promise.all([listProperties(), listLeads()]);
    setProperties(items);
    setLeads(applications);
  }, []);

  useEffect(() => {
    if (!authed) return;
    const load = async () => {
      try {
        await refresh();
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) setAuthed(false);
        else setError(err instanceof Error ? err.message : t('admin.loadError'));
      }
    };
    void load();
  }, [authed, refresh, t]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError('');
    try {
      const result = await login(password);
      setToken(result.token);
      setPassword('');
      setAuthed(true);
    } catch (err) {
      if (err instanceof ApiError && err.status === 503) setLoginError(t('admin.passwordNotSet'));
      else if (err instanceof ApiError && err.status === 429) setLoginError(err.message);
      else setLoginError(t('admin.badPassword'));
    }
  };

  const guard = async (action: () => Promise<void>) => {
    setError('');
    setNotice('');
    try {
      await action();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setAuthed(false);
        return;
      }
      setError(err instanceof Error ? err.message : t('admin.savedError'));
    }
  };

  const save = async (property: Property) => {
    await guard(async () => {
      await saveProperty(property);
      await refresh();
      setDraft(null);
      setNotice(t('admin.saved'));
    });
  };

  const togglePublished = (property: Property) =>
    guard(async () => {
      await saveProperty({ ...property, published: !property.published });
      await refresh();
    });

  const removeProperty = (property: Property) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    void guard(async () => {
      await deleteProperty(property.slug);
      await refresh();
    });
  };

  const removeLead = (lead: Lead) => {
    void guard(async () => {
      await deleteLead(lead.id);
      await refresh();
    });
  };

  if (!authed) {
    return (
      <div className="py-12 bg-cyprus-sand min-h-screen">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-xl shadow-card p-6 sm:p-8 max-w-sm mx-auto space-y-4"
          >
            <h1 className="text-2xl font-bold text-cyprus-navy">{t('admin.loginTitle')}</h1>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.password')}
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyprus-navy"
              />
            </div>
            {loginError && (
              <p role="alert" className="text-sm text-red-700">
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-cyprus-orange text-white py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('admin.signIn')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'properties' as const, label: t('admin.tabProperties') },
    { id: 'leads' as const, label: `${t('admin.tabLeads')} (${leads.length})` },
  ];

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-cyprus-navy">{t('admin.title')}</h1>
            <p className="text-gray-600">{t('admin.subtitle')}</p>
          </div>
          <button
            onClick={() => {
              setToken(null);
              setAuthed(false);
            }}
            className="border border-cyprus-navy text-cyprus-navy px-4 py-2 rounded-lg hover:bg-cyprus-navy hover:text-white transition-colors text-sm font-medium focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {t('admin.signOut')}
          </button>
        </div>

        <div className="flex gap-2 mb-6" role="tablist" aria-label={t('admin.subtitle')}>
          {tabs.map((item) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-cyprus-navy focus-visible:ring-offset-2 focus-visible:outline-none ${
                tab === item.id
                  ? 'bg-cyprus-navy text-white'
                  : 'bg-white text-cyprus-navy hover:bg-cyprus-navy/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {notice && (
          <p role="status" className="mb-4 text-green-700 font-medium">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="mb-4 text-red-700 font-medium">
            {error}
          </p>
        )}

        {tab === 'properties' &&
          (draft ? (
            <PropertyEditor
              initial={draft.property}
              isNew={draft.isNew}
              takenSlugs={properties.map((item) => item.slug)}
              onCancel={() => setDraft(null)}
              onSaved={save}
            />
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setDraft({ property: emptyProperty(), isNew: true })}
                className="bg-cyprus-orange text-white px-6 py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-cyprus-orange focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                {t('admin.addProperty')}
              </button>
              <ul className="space-y-2">
                {properties.map((property) => (
                  <li
                    key={property.slug}
                    className="flex flex-wrap items-center gap-3 bg-white rounded-lg shadow-card p-3 sm:p-4"
                  >
                    <img
                      src={property.images[0] ?? '/images/hero.jpg'}
                      alt=""
                      className="w-12 h-12 rounded object-cover shrink-0"
                      width="48"
                      height="48"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-cyprus-navy truncate">{property.name}</p>
                      <p className="text-xs text-gray-500 truncate">/real-estate/{property.slug}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        property.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {property.published ? t('admin.published') : t('admin.hidden')}
                    </span>
                    <input
                      type="checkbox"
                      checked={property.published}
                      onChange={() => togglePublished(property)}
                      aria-label={property.published ? t('admin.published') : t('admin.hidden')}
                      className="w-4 h-4 text-cyprus-navy border-gray-300 rounded focus:ring-cyprus-navy"
                    />
                    <button
                      onClick={() => setDraft({ property, isNew: false })}
                      aria-label={t('admin.editProperty')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                    >
                      <Edit className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => removeProperty(property)}
                      aria-label={t('admin.delete')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {tab === 'leads' &&
          (leads.length === 0 ? (
            <p className="text-cyprus-navy/70">{t('admin.leadsEmpty')}</p>
          ) : (
            <ul className="space-y-2">
              {leads.map((lead) => (
                <li key={lead.id} className="bg-white rounded-lg shadow-card p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <p className="font-medium text-cyprus-navy">
                        {lead.name} · {lead.phone}
                        {lead.email && ` · ${lead.email}`}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(lead.createdAt).toLocaleString()} — {t('admin.leadObject')}:{' '}
                        <a
                          href={`/real-estate/${lead.propertySlug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline decoration-gray-300"
                        >
                          {lead.propertySlug || '—'}
                        </a>
                      </p>
                      {lead.message && (
                        <p className="text-sm text-gray-700 whitespace-pre-line">
                          {lead.message}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeLead(lead)}
                      aria-label={t('admin.delete')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
                    >
                      <Trash2 className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>
    </div>
  );
}
