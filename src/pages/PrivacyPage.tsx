import { useTranslation } from 'react-i18next';

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-8">
          {t('footer.privacy')}
        </h1>
        <div className="bg-white rounded-xl p-8 shadow-card max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">1. Общие положения</h2>
            <p className="text-gray-700 mb-6">
              Настоящая Политика конфиденциальности описывает, как Express Travel собирает, использует и защищает информацию, которую вы предоставляете при использовании нашего сайта.
            </p>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">2. Сбор информации</h2>
            <p className="text-gray-700 mb-4">Мы собираем следующую информацию:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Имя и контактные данные (телефон, email)</li>
              <li>Информация о запрашиваемых услугах</li>
              <li>Технические данные (IP-адрес, тип браузера)</li>
              <li>Cookie-файлы для улучшения работы сайта</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">3. Использование информации</h2>
            <p className="text-gray-700 mb-4">Собранная информация используется для:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Обработки ваших заявок и запросов</li>
              <li>Связи с вами по интересующим вопросам</li>
              <li>Улучшения качества наших услуг</li>
              <li>Отправки информационных материалов (с вашего согласия)</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">4. Защита информации</h2>
            <p className="text-gray-700 mb-6">
              Мы применяем современные методы защиты данных для предотвращения несанкционированного доступа, изменения, раскрытия или уничтожения вашей информации.
            </p>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">5. Передача данных третьим лицам</h2>
            <p className="text-gray-700 mb-6">
              Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством, или для выполнения ваших запросов (например, передача данных застройщику для бронирования объекта).
            </p>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">6. Cookie-файлы</h2>
            <p className="text-gray-700 mb-6">
              Наш сайт использует cookie-файлы для улучшения пользовательского опыта. Вы можете отключить cookie в настройках браузера, но это может повлиять на функциональность сайта.
            </p>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">7. Ваши права</h2>
            <p className="text-gray-700 mb-4">Вы имеете право:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
              <li>Получить информацию о хранящихся данных</li>
              <li>Требовать исправления неточных данных</li>
              <li>Требовать удаления ваших данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>

            <h2 className="text-2xl font-bold text-cyprus-navy mb-4">8. Контакты</h2>
            <p className="text-gray-700 mb-6">
              По вопросам обработки персональных данных обращайтесь: info@express-travel.com
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Последнее обновление: Ноябрь 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
