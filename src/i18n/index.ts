import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      nav: {
        realEstate: 'Недвижимость',
        aboutCyprus: 'О Кипре',
        services: 'Услуги',
        aboutCompany: 'О компании',
        contacts: 'Контакты',
        request: 'Оставить заявку',
      },
      hero: {
        title: 'Недвижимость на Кипре',
        subtitle: 'Ваш дом у моря — комфорт, инвестиции и новый уровень жизни',
        experience: 'Более 15 лет на рынке',
        legal: 'Юридическая чистота сделок',
        support: 'Полное сопровождение',
        findProperty: 'Подобрать объект',
        learnMore: 'Узнать больше о Кипре',
      },
      filter: {
        type: 'Тип недвижимости',
        any: 'Любой',
        region: 'Регион',
        allRegions: 'Все регионы',
        priceFrom: 'Цена от',
        priceTo: 'Цена до',
        any_price: 'Любая',
        search: 'Найти',
      },
      propertyTypes: {
        villa: 'Вилла',
        apartment: 'Апартаменты',
        house: 'Дом',
        land: 'Участок',
      },
      regions: {
        limassol: 'Лимассол',
        paphos: 'Пафос',
        larnaca: 'Ларнака',
        polis: 'Полис',
        ayiaNapa: 'Айя-Напа',
      },
      featured: {
        title: 'Лучшие предложения',
        viewAll: 'Все объекты',
        premium: 'Премиум',
        top: 'Топлист',
        beds: 'спальни',
        baths: 'ванные',
        area: 'м²',
      },
      benefits: {
        transparent: 'Прозрачные сделки',
        residency: 'ВНЖ при покупке недвижимости',
        investment: 'Высокий инвестиционный потенциал',
        premium: 'Премиальная недвижимость',
      },
      about: {
        title: 'Кипр — идеальное место',
        subtitle: 'для жизни и инвестиций',
        description: 'Солнце, море, стабильность и высокий уровень жизни. Откройте для себя все преимущества недвижимости на Кипре вместе с нами.',
        learnMore: 'Узнать больше',
      },
      tours: {
        title: 'Туры для выбора недвижимости',
        subtitle: 'Посетите Кипр и выберите свой идеальный объект',
        duration: 'дней',
        price: 'от',
        book: 'Забронировать',
      },
      trips: {
        title: 'Поездки на Кипр',
        subtitle: 'Комбинированные туры: отдых + просмотр недвижимости',
      },
      excursions: {
        title: 'Экскурсии',
        subtitle: 'Откройте для себя Европу с Express Travel',
      },
      schoolTrip: {
        title: 'School Trip',
        subtitle: 'Образовательные поездки для школьников',
      },
      footer: {
        company: 'О компании',
        services: 'Услуги',
        contacts: 'Контакты',
        privacy: 'Политика конфиденциальности',
        rights: 'Все права защищены',
      },
      contact: {
        title: 'Свяжитесь с нами',
        name: 'Ваше имя',
        phone: 'Телефон',
        email: 'Email',
        message: 'Сообщение',
        send: 'Отправить',
        consent: 'Я согласен на обработку персональных данных',
      },
      cookie: {
        message: 'Мы используем файлы cookie для улучшения работы сайта',
        accept: 'Принять',
        settings: 'Настройки',
      },
      common: {
        euro: '€',
        readMore: 'Читать далее',
        back: 'Назад',
      },
    },
  },
  en: {
    translation: {
      nav: {
        realEstate: 'Real Estate',
        aboutCyprus: 'About Cyprus',
        services: 'Services',
        aboutCompany: 'About Us',
        contacts: 'Contacts',
        request: 'Request',
      },
      hero: {
        title: 'Real Estate in Cyprus',
        subtitle: 'Your home by the sea — comfort, investments and a new level of life',
        experience: 'Over 15 years in the market',
        legal: 'Legal purity of transactions',
        support: 'Full support',
        findProperty: 'Find property',
        learnMore: 'Learn more about Cyprus',
      },
      filter: {
        type: 'Property type',
        any: 'Any',
        region: 'Region',
        allRegions: 'All regions',
        priceFrom: 'Price from',
        priceTo: 'Price to',
        any_price: 'Any',
        search: 'Search',
      },
      propertyTypes: {
        villa: 'Villa',
        apartment: 'Apartment',
        house: 'House',
        land: 'Land',
      },
      regions: {
        limassol: 'Limassol',
        paphos: 'Paphos',
        larnaca: 'Larnaca',
        polis: 'Polis',
        ayiaNapa: 'Ayia Napa',
      },
      featured: {
        title: 'Featured Properties',
        viewAll: 'View all',
        premium: 'Premium',
        top: 'Top',
        beds: 'beds',
        baths: 'baths',
        area: 'm²',
      },
      benefits: {
        transparent: 'Transparent deals',
        residency: 'Residency permit with property purchase',
        investment: 'High investment potential',
        premium: 'Premium real estate',
      },
      about: {
        title: 'Cyprus is the perfect place',
        subtitle: 'for living and investing',
        description: 'Sun, sea, stability and high quality of life. Discover all the advantages of real estate in Cyprus with us.',
        learnMore: 'Learn more',
      },
      tours: {
        title: 'Property Selection Tours',
        subtitle: 'Visit Cyprus and choose your perfect property',
        duration: 'days',
        price: 'from',
        book: 'Book',
      },
      trips: {
        title: 'Trips to Cyprus',
        subtitle: 'Combined tours: vacation + property viewing',
      },
      excursions: {
        title: 'Excursions',
        subtitle: 'Discover Europe with Express Travel',
      },
      schoolTrip: {
        title: 'School Trip',
        subtitle: 'Educational trips for schoolchildren',
      },
      footer: {
        company: 'About',
        services: 'Services',
        contacts: 'Contacts',
        privacy: 'Privacy Policy',
        rights: 'All rights reserved',
      },
      contact: {
        title: 'Contact us',
        name: 'Your name',
        phone: 'Phone',
        email: 'Email',
        message: 'Message',
        send: 'Send',
        consent: 'I agree to the processing of personal data',
      },
      cookie: {
        message: 'We use cookies to improve site performance',
        accept: 'Accept',
        settings: 'Settings',
      },
      common: {
        euro: '€',
        readMore: 'Read more',
        back: 'Back',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
