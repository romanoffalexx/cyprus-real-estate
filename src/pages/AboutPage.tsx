import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          {t('nav.aboutCompany')}
        </h1>
        <div className="bg-white rounded-xl p-8 shadow-card">
          <h2 className="text-2xl font-bold text-cyprus-navy mb-4">Express Travel</h2>
          <p className="text-gray-700 mb-6 text-lg">
            {t('hero.experience')}. Мы специализируемся на недвижимости Кипра и организуем туры для выбора объектов.
          </p>
          <h3 className="text-xl font-bold text-cyprus-navy mb-4">Наши направления:</h3>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>• School Trip — образовательные поездки для школьников</li>
            <li>• Cyprus — туры для выбора недвижимости на Кипре</li>
            <li>• Excursions — экскурсии по Европе (Dresden, Berlin, Paris, Wien, Budapest, Bratislava, оз. Гарда)</li>
          </ul>
          <h3 className="text-xl font-bold text-cyprus-navy mb-4">Наши преимущества:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ {t('hero.legal')}</li>
            <li>✓ {t('hero.support')}</li>
            <li>✓ {t('benefits.transparent')}</li>
            <li>✓ {t('benefits.residency')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
