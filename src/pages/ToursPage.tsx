import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Euro } from 'lucide-react';

export default function ToursPage() {
  const { t } = useTranslation();

  const tours = [
    {
      id: 1,
      title: 'Тур "Знакомство с Кипром"',
      duration: 5,
      price: 1500,
      description: 'Посещение Лимассола, Пафоса и Ларнаки. Просмотр 10-15 объектов недвижимости.',
      image: '/images/cyprus-tour.jpg',
    },
    {
      id: 2,
      title: 'Тур "Инвестиции в недвижимость"',
      duration: 7,
      price: 2200,
      description: 'Глубокое изучение инвестиционных возможностей. Встречи с застройщиками и юристами.',
      image: '/images/cyprus-coast.jpg',
    },
    {
      id: 3,
      title: 'Тур "Премиум виллы"',
      duration: 4,
      price: 3000,
      description: 'Эксклюзивный показ премиальных вилл в Лимассоле и Пафосе.',
      image: '/images/villa-limassol.jpg',
    },
  ];

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-4">
          {t('tours.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {t('tours.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
              <img src={tour.image} alt={tour.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-cyprus-navy mb-3">{tour.title}</h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {tour.duration} {t('tours.duration')}
                  </span>
                  <span className="flex items-center gap-1">
                    <Euro className="w-4 h-4" /> {t('tours.price')} €{tour.price}
                  </span>
                </div>
                <Link
                  to="/contacts"
                  className="block w-full bg-cyprus-orange text-white text-center py-3 rounded-lg hover:bg-cyprus-orange/90 transition-colors font-medium"
                >
                  {t('tours.book')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
