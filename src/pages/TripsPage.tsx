import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

export default function TripsPage() {
  const { t } = useTranslation();

  const trips = [
    {
      id: 1,
      title: 'Кипр: отдых + недвижимость',
      duration: 10,
      locations: ['Лимассол', 'Пафос', 'Ларнака'],
      description: 'Комбинированный тур: 7 дней отдыха на море + 3 дня просмотра недвижимости.',
      image: '/images/cyprus-coast.jpg',
    },
    {
      id: 2,
      title: 'Семейный Кипр',
      duration: 14,
      locations: ['Айя-Напа', 'Протарас', 'Лимассол'],
      description: 'Идеально для семей с детьми. Пляжный отдых и знакомство с рынком недвижимости.',
      image: '/images/cyprus-tour.jpg',
    },
  ];

  return (
    <div className="py-12 bg-cyprus-sand min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-cyprus-navy mb-4">
          {t('trips.title')}
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          {t('trips.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
              <img src={trip.image} alt={trip.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-cyprus-navy mb-3">{trip.title}</h3>
                <p className="text-gray-600 mb-4">{trip.description}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {trip.duration} дней
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {trip.locations.map((location) => (
                    <span key={location} className="flex items-center gap-1 bg-cyprus-sand px-3 py-1 rounded-full text-sm">
                      <MapPin className="w-3 h-3" /> {location}
                    </span>
                  ))}
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
