export type LegalLanguage = 'ru' | 'en';

export interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface LegalDocument {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const PRIVACY_POLICY_VERSION = '2026-11-24';
export const PRIVACY_EMAIL = 'info@express-travel.com';
export const OPERATOR_ADDRESS = 'Česká Republika, Praha, Stodulky, Radounova 2681/24, 155 00';

export function legalLanguage(language: string | undefined): LegalLanguage {
  return language?.toLowerCase().startsWith('en') ? 'en' : 'ru';
}

const privacyPolicy: Record<LegalLanguage, LegalDocument> = {
  ru: {
    title: 'Политика конфиденциальности',
    updated: '24 ноября 2026',
    intro:
      'Настоящая политика объясняет, какие данные обрабатывает Express Travel при использовании сайта, для чего они нужны, на каких правовых основаниях и как реализовать ваши права. Для посетителей из Европейской экономической зоны применяются Общий регламент защиты данных (GDPR) и национальное законодательство.',
    sections: [
      {
        title: '1. Оператор и контакты',
        paragraphs: [
          `Оператор сайта — Express Travel. Почтовый адрес: ${OPERATOR_ADDRESS}.`,
          `По вопросам обработки персональных данных и реализации прав: ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: '2. Какие данные мы обрабатываем и откуда они поступают',
        bullets: [
          'Имя, телефон, адрес электронной почты, текст сообщения и выбранный объект недвижимости — из форм заявки, которые вы заполняете добровольно.',
          'Версия политики и дата и время принятия согласия — фиксируются при отправке формы, чтобы подтвердить ваше решение.',
          'Ваш выбор в отношении необязательного внешнего содержимого — сохраняется в localStorage браузера вместе с версией политики cookie и датой изменения.',
          'IP-адрес и служебные сведения запроса — временно обрабатываются сервером для ограничения частоты запросов и защиты от автоматического спама. Они не записываются в файл заявок.',
          'Технический токен админской сессии — сохраняется в sessionStorage только после входа администратора.',
          'Если вы включаете карту OpenStreetMap, браузер обращается к серверам этого независимого поставщика. Поставщик может обрабатывать IP-адрес, сведения запроса и собственные cookie согласно своим правилам.',
        ],
      },
      {
        title: '3. Цели и правовые основания',
        bullets: [
          'Ответ на вашу заявку и коммуникация по выбранной услуге — ваше согласие, статья 6(1)(a) GDPR.',
          'Защита форм и админского раздела от злоупотреблений — законные интересы оператора, статья 6(1)(f) GDPR.',
          'Хранение доказательства выбора cookie и внешнего содержимого — необходимость соблюдения требований GDPR и правил электронной конфиденциальности.',
          'Мы не используем эти данные для рекламных рассылок, профилирования или передачи застройщикам без отдельного законного основания.',
        ],
      },
      {
        title: '4. Обязательность данных и последствия непредоставления',
        paragraphs: [
          'Для отправки заявки необходимы имя, телефон и согласие на обработку. Email, сообщение и выбор объекта необязательны. Если обязательные данные не предоставлены, мы не сможем обработать обращение.',
          'Вы можете пользоваться каталогом без отправки формы. Отказ от необязательной карты не мешает просмотру описания, фотографий, планировок и контактной информации.',
        ],
      },
      {
        title: '5. Получатели данных',
        bullets: [
          'Уполномоченные администраторы Express Travel, которые просматривают и удаляют заявки через защищённый раздел сайта.',
          'Поставщики инфраструктуры, обрабатывающие запросы исключительно для работы и защиты сайта. Конкретные поставщики и договорные условия должны быть зафиксированы во внутреннем реестре оператора.',
          'OpenStreetMap — только если вы разрешили загрузку интерактивной карты.',
          'Государственные органы — если раскрытие данных требуется по закону.',
        ],
      },
      {
        title: '6. Передача данных за пределы Европейской экономической зоны',
        paragraphs: [
          'В коде сайта не настроена самостоятельная экспортная передача ваших данных за пределы ЕЭЗ. Обращения к инфраструктурным поставщикам и загрузка карты OpenStreetMap могут означать обработку в других странах; место обработки и применимые гарантии определяет соответствующий поставщик.',
          'Оператор должен проверить и документально оформить такие передачи до их использования, если они выходят за пределы ЕЭЗ.',
        ],
      },
      {
        title: '7. Сроки хранения и критерии',
        bullets: [
          'Заявки хранятся, пока они нужны для ответа на обращение и связанной с ним коммуникации. После достижения цели они удаляются, если закон или другая правовая обязанность не требуют продолжать хранение. Ограничение количества записей само по себе не является сроком хранения.',
          'Запись о выборе cookie остаётся в браузере до изменения настроек или очистки хранилища браузером.',
          'Админский токен действует до выхода, закрытия вкладки или истечения серверного срока сессии; по умолчанию серверный срок составляет 12 часов.',
          'Счётчики ограничения частоты запросов находятся в оперативной памяти сервера и удаляются не позднее часа после последней активности по соответствующему ключу.',
        ],
      },
      {
        title: '8. Защита данных',
        paragraphs: [
          'Доступ к заявкам защищён паролем администратора и проверяемым токеном сессии. Заявки хранятся в файловом хранилище сервера, а не в localStorage посетителя. Формы имеют серверную проверку обязательных полей и ограничение частоты отправки.',
          'Для защиты данных при передаче сайт должен использоваться по HTTPS. Не отправляйте через формы сведения, которые не нужны для ответа на ваше обращение.',
        ],
      },
      {
        title: '9. Ваши права',
        bullets: [
          'Получить доступ к вашим персональным данным и информацию об их обработке.',
          'Потребовать исправления неточных или неполных данных.',
          'Потребовать удаления данных при отсутствии законных оснований для их хранения.',
          'Потребовать ограничения обработки в предусмотренных GDPR случаях.',
          'Получить перенос предоставленных вами данных в машиночитаемом формате, когда это применимо.',
          'Возразить против обработки на основании законных интересов.',
          'Отозвать согласие в любое время; отзыв не влияет на законность обработки до его получения.',
          'Подать жалобу в надзорный орган по защите данных по месту жительства, работы или предполагаемого нарушения.',
        ],
      },
      {
        title: '10. Как отправить запрос',
        paragraphs: [
          'Используйте форму реализации прав на сайте или напишите на указанный адрес оператора. Для защиты от раскрытия данных другому лицу мы можем запросить подтверждение личности и дополнительные сведения, необходимые для поиска ваших данных.',
          'Ответ обычно предоставляется в течение одного месяца с момента получения запроса. В предусмотренных GDPR случаях срок может быть продлён ещё на два месяца, о чём вы будете уведомлены.',
        ],
      },
      {
        title: '11. Автоматизированные решения',
        paragraphs: [
          'Сайт не принимает автоматизированные решения с юридическими или аналогичными существенными последствиями и не использует профилирование посетителей.',
        ],
      },
      {
        title: '12. Изменения политики',
        paragraphs: [
          `Текущая версия политики: ${PRIVACY_POLICY_VERSION}. Если появятся новые цели обработки или категории необязательных технологий, мы обновим документы и, когда требуется, сначала запросим новое согласие.`,
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: '24 November 2026',
    intro:
      'This policy explains what data Express Travel processes when you use the website, why it is needed, the legal bases used, and how to exercise your rights. For visitors in the European Economic Area, the General Data Protection Regulation (GDPR) and national law apply.',
    sections: [
      {
        title: '1. Controller and contact details',
        paragraphs: [
          `The website operator is Express Travel. Postal address: ${OPERATOR_ADDRESS}.`,
          `For data-processing questions and rights requests: ${PRIVACY_EMAIL}.`,
        ],
      },
      {
        title: '2. Data we process and its source',
        bullets: [
          'Name, phone number, email address, message and selected property — from enquiry forms that you complete voluntarily.',
          'Policy version and the date and time of consent — recorded when a form is submitted to evidence your decision.',
          'Your choice for optional external content — stored in browser localStorage with the cookie-policy version and change date.',
          'IP address and service request information — processed transiently by the server to limit request frequency and prevent automated spam. They are not written to the enquiries file.',
          'An administrative session token — stored in sessionStorage only after an administrator signs in.',
          'If you enable the OpenStreetMap embed, your browser contacts this independent provider. The provider may process the IP address, request information and its own cookies under its own rules.',
        ],
      },
      {
        title: '3. Purposes and legal bases',
        bullets: [
          'Responding to your enquiry and communicating about the selected service — your consent, Article 6(1)(a) GDPR.',
          'Protecting forms and the administrative area against abuse — the operator’s legitimate interests, Article 6(1)(f) GDPR.',
          'Keeping evidence of cookie and external-content choices — compliance with GDPR and electronic-privacy requirements.',
          'We do not use this data for marketing mailings, profiling or disclosure to developers without a separate lawful basis.',
        ],
      },
      {
        title: '4. Whether providing data is required',
        paragraphs: [
          'Name, phone number and consent are required to submit an enquiry. Email, message and property selection are optional. Without the required data, we cannot process your request.',
          'You can browse the catalogue without submitting a form. Refusing the optional map does not prevent you from viewing descriptions, photos, plans and contact details.',
        ],
      },
      {
        title: '5. Recipients',
        bullets: [
          'Authorised Express Travel administrators who review and delete enquiries through the protected website area.',
          'Infrastructure providers processing requests solely to operate and protect the website. The operator must record specific providers and contractual terms internally.',
          'OpenStreetMap — only if you enable the interactive map.',
          'Public authorities — where disclosure is required by law.',
        ],
      },
      {
        title: '6. Transfers outside the European Economic Area',
        paragraphs: [
          'The website code does not configure a direct export of your data outside the EEA. Requests to infrastructure providers and loading the OpenStreetMap embed may involve processing in other countries; the relevant provider determines the processing location and applicable safeguards.',
          'The operator must verify and document such transfers before using them where they take place outside the EEA.',
        ],
      },
      {
        title: '7. Retention periods and criteria',
        bullets: [
          'Enquiries are kept while needed to respond and communicate about the request. They are deleted once that purpose is achieved unless law or another legal duty requires continued storage. A record-count limit is not a retention period.',
          'The cookie-choice record remains in the browser until settings change or browser storage is cleared.',
          'The administrative token remains valid until sign-out, tab closure or server session expiry; the default server session is 12 hours.',
          'Request-rate counters are held in server memory and removed no later than one hour after the last activity for the relevant key.',
        ],
      },
      {
        title: '8. Data security',
        paragraphs: [
          'Access to enquiries is protected by an administrator password and a verified session token. Enquiries are kept in server file storage, not in a visitor’s localStorage. Forms include server-side required-field checks and submission-rate limits.',
          'The website must be used over HTTPS to protect data in transit. Do not submit information through the forms that is not needed to answer your request.',
        ],
      },
      {
        title: '9. Your rights',
        bullets: [
          'Access your personal data and information about its processing.',
          'Correct inaccurate or incomplete data.',
          'Request erasure where there is no lawful basis for continued storage.',
          'Request restriction of processing in the cases provided by the GDPR.',
          'Receive data you provided in a portable, machine-readable format where applicable.',
          'Object to processing based on legitimate interests.',
          'Withdraw consent at any time; withdrawal does not affect the lawfulness of processing before it was received.',
          'Lodge a complaint with a supervisory authority in your country of residence, work or the place of the alleged infringement.',
        ],
      },
      {
        title: '10. Submitting a request',
        paragraphs: [
          'Use the data-rights form on the website or email the operator. To prevent disclosure to another person, we may ask you to verify your identity and provide information needed to locate your data.',
          'A response is normally provided within one month of receipt. Where permitted by the GDPR, this may be extended by a further two months and you will be notified.',
        ],
      },
      {
        title: '11. Automated decision-making',
        paragraphs: [
          'The website does not make automated decisions with legal or similarly significant effects and does not profile visitors.',
        ],
      },
      {
        title: '12. Policy changes',
        paragraphs: [
          `Current policy version: ${PRIVACY_POLICY_VERSION}. If new processing purposes or optional technology categories are introduced, we will update the documents and obtain new consent first where required.`,
        ],
      },
    ],
  },
};

const cookiePolicy: Record<LegalLanguage, LegalDocument> = {
  ru: {
    title: 'Политика использования cookie и локального хранилища',
    updated: '24 ноября 2026',
    intro:
      'Сайт использует локальное хранилище браузера для запоминания вашего выбора и для защищённой админской сессии. На сайте нет рекламных пикселей, систем веб-аналитики и маркетинговых cookie.',
    sections: [
      {
        title: '1. Что означает эта политика',
        paragraphs: [
          'Cookie — небольшие файлы, которые сайт или внешний поставщик может сохранить в браузере. localStorage и sessionStorage — другие хранилища браузера. Внешняя карта — отдельная технология: она загружает содержимое с серверов OpenStreetMap и может использовать их собственные cookie или хранилище.',
          'Необходимые технологии нужны для работы выбранной функции. Необязательные технологии не загружаются и не сохраняются до вашего отдельного разрешения.',
        ],
      },
      {
        title: '2. Категории',
        bullets: [
          'Необходимые: запись вашего выбора, ограничение частоты запросов и админская сессия. Их нельзя отключить, сохранив одновременно эти функции.',
          'Функциональные внешние ресурсы: интерактивная карта OpenStreetMap. Эту категорию можно разрешить или отклонить.',
          'Аналитика и маркетинг: сейчас не используются. Если они появятся, политика и таблица будут обновлены до включения, а для необязательных технологий будет запрошено согласие.',
        ],
      },
      {
        title: '3. Как работает согласие',
        paragraphs: [
          'До первого решения необязательная карта не загружается. «Принять все» разрешает функциональную категорию, «Отклонить все» оставляет её выключенной. В настройках можно выбрать категории отдельно и сохранить решение.',
          'Мы сохраняем версию политики, дату и время решения, выбранные категории и способ изменения. Запись хранится в ключе cookie-consent в localStorage. Старое значение принятого решения без версии и категорий не считается согласием на новые технологии.',
        ],
      },
      {
        title: '4. Изменение или отзыв согласия',
        paragraphs: [
          'Используйте постоянную ссылку «Настройки cookie» в подвале сайта. Отключение функциональной категории и сохранение настроек прекращает новые загрузки карты. Уже загруженное браузером содержимое нельзя вернуть назад, но повторные обращения к поставщику прекращаются.',
          'Вы также можете удалить данные сайта в настройках браузера. После этого баннер появится снова, а необязательные технологии останутся выключенными до нового решения.',
        ],
      },
      {
        title: '5. Внешняя карта',
        paragraphs: [
          'Карта встроена с openstreetmap.org. Express Travel не управляет cookie и обработкой данных этого поставщика. Перед включением карты учитывайте правила OpenStreetMap; отказ от карты не ограничивает доступ к остальной информации об объекте.',
        ],
      },
      {
        title: '6. Обновления',
        paragraphs: [
          'Если набор технологий изменится, мы обновим таблицу и версию политики. Для новых необязательных категорий согласие будет запрошено до их активации.',
        ],
      },
    ],
  },
  en: {
    title: 'Cookie and Local Storage Policy',
    updated: '24 November 2026',
    intro:
      'The website uses browser local storage to remember your choice and to maintain a protected administrative session. The website has no advertising pixels, web analytics or marketing cookies.',
    sections: [
      {
        title: '1. What this policy covers',
        paragraphs: [
          'Cookies are small files that a website or external provider may store in a browser. localStorage and sessionStorage are other browser storage mechanisms. The external map is a separate technology: it loads content from OpenStreetMap servers and may use their own cookies or storage.',
          'Necessary technologies support a selected feature. Optional technologies are not loaded or stored before you give separate permission.',
        ],
      },
      {
        title: '2. Categories',
        bullets: [
          'Necessary: your choice record, request-rate limiting and the administrative session. These cannot be disabled while retaining those features.',
          'Functional external resources: the OpenStreetMap interactive map. You may enable or reject this category.',
          'Analytics and marketing: not currently used. If introduced, this policy and table will be updated before activation and consent will be requested for optional technologies.',
        ],
      },
      {
        title: '3. How consent works',
        paragraphs: [
          'The optional map is not loaded before your first decision. “Accept all” enables the functional category; “Reject all” leaves it disabled. Settings let you choose categories separately and save your decision.',
          'We store the policy version, decision date and time, selected categories and change method in the cookie-consent localStorage key. An old accepted value without a version and categories is not treated as consent to new technologies.',
        ],
      },
      {
        title: '4. Changing or withdrawing consent',
        paragraphs: [
          'Use the permanent “Cookie settings” link in the website footer. Disabling the functional category and saving stops new map loads. Content already downloaded by the browser cannot be recalled, but further requests to the provider stop.',
          'You can also clear site data in browser settings. The banner will then reappear and optional technologies will remain disabled until a new decision is made.',
        ],
      },
      {
        title: '5. External map',
        paragraphs: [
          'The map is embedded from openstreetmap.org. Express Travel does not control that provider’s cookies or data processing. Consider the OpenStreetMap rules before enabling the map; refusing it does not restrict access to other property information.',
        ],
      },
      {
        title: '6. Updates',
        paragraphs: [
          'If the technology set changes, we will update the table and policy version. Consent for new optional categories will be requested before activation.',
        ],
      },
    ],
  },
};

export function getPrivacyPolicy(language: string | undefined): LegalDocument {
  return privacyPolicy[legalLanguage(language)];
}

export function getCookiePolicy(language: string | undefined): LegalDocument {
  return cookiePolicy[legalLanguage(language)];
}
