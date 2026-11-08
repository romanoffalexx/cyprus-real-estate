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
        brokerTour: 'Брокерский тур',
        cyprusExcursions: 'Экскурсии',
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
        title: 'Брокерский тур на Кипр',
        subtitle: 'Посетите Кипр и выберите свой идеальный объект с нашим брокером',
        duration: 'дней',
        price: 'от',
        book: 'Забронировать',
      },
      trips: {
        title: 'Экскурсии на Кипр',
        subtitle: 'Откройте для себя красоты Кипра с нашими экскурсиями',
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
      banners: {
        excursionTours: {
          title: 'Экскурсионные туры на Кипр',
          subtitle: 'Откройте для себя историю и культуру острова',
          description: 'Древние города, живописные монастыри, традиционные деревни',
          cta: 'Выбрать тур',
        },
        brokerTour: {
          title: 'Брокерский тур на Кипр',
          subtitle: 'Подбор недвижимости с экспертом',
          description: '5 дней просмотра объектов с личным брокером',
          cta: 'Забронировать тур',
        },
      },
      propertyCards: {
        villaLimassol: 'Вилла в Лимассоле',
        apartmentPaphos: 'Апартаменты в Пафосе',
        villaPolis: 'Вилла в Полисе',
        apartmentLarnaca: 'Апартаменты в Ларнаке',
      },
      toursList: {
        tour1: {
          title: 'Тур "Знакомство с Кипром"',
          description: 'Посещение Лимассола, Пафоса и Ларнаки. Просмотр 10-15 объектов недвижимости.',
        },
        tour2: {
          title: 'Тур "Инвестиции в недвижимость"',
          description: 'Глубокое изучение инвестиционных возможностей. Встречи с застройщиками и юристами.',
        },
        tour3: {
          title: 'Тур "Премиум виллы"',
          description: 'Эксклюзивный показ премиальных вилл в Лимассоле и Пафосе.',
        },
      },
      tripsList: {
        trip1: {
          title: 'Кипр: отдых + недвижимость',
          description: 'Комбинированный тур: 7 дней отдыха на море + 3 дня просмотра недвижимости.',
          locations: ['Лимассол', 'Пафос', 'Ларнака'],
        },
        trip2: {
          title: 'Семейный Кипр',
          description: 'Идеально для семей с детьми. Пляжный отдых и знакомство с рынком недвижимости.',
          locations: ['Айя-Напа', 'Протарас', 'Лимассол'],
        },
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
        brokerTour: 'Broker Tour',
        cyprusExcursions: 'Excursions',
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
        title: 'Broker Tour to Cyprus',
        subtitle: 'Visit Cyprus and choose your perfect property with our broker',
        duration: 'days',
        price: 'from',
        book: 'Book',
      },
      trips: {
        title: 'Cyprus Excursions',
        subtitle: 'Discover the beauty of Cyprus with our excursions',
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
      banners: {
        excursionTours: {
          title: 'Excursion Tours in Cyprus',
          subtitle: 'Discover the history and culture of the island',
          description: 'Ancient cities, picturesque monasteries, traditional villages',
          cta: 'Choose tour',
        },
        brokerTour: {
          title: 'Broker Tour to Cyprus',
          subtitle: 'Property selection with an expert',
          description: '5 days of property viewing with a personal broker',
          cta: 'Book tour',
        },
      },
      propertyCards: {
        villaLimassol: 'Villa in Limassol',
        apartmentPaphos: 'Apartment in Paphos',
        villaPolis: 'Villa in Polis',
        apartmentLarnaca: 'Apartment in Larnaca',
      },
      toursList: {
        tour1: {
          title: 'Tour "Discover Cyprus"',
          description: 'Visit Limassol, Paphos and Larnaca. View 10-15 properties.',
        },
        tour2: {
          title: 'Tour "Real Estate Investments"',
          description: 'Deep dive into investment opportunities. Meetings with developers and lawyers.',
        },
        tour3: {
          title: 'Tour "Premium Villas"',
          description: 'Exclusive showing of premium villas in Limassol and Paphos.',
        },
      },
      tripsList: {
        trip1: {
          title: 'Cyprus: Vacation + Real Estate',
          description: 'Combined tour: 7 days beach vacation + 3 days property viewing.',
          locations: ['Limassol', 'Paphos', 'Larnaca'],
        },
        trip2: {
          title: 'Family Cyprus',
          description: 'Perfect for families with children. Beach vacation and real estate market introduction.',
          locations: ['Ayia Napa', 'Protaras', 'Limassol'],
        },
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
