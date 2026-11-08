import { useTranslation } from 'react-i18next';
import { Heart, ArrowRight } from 'lucide-react';

interface PropertyCardProps {
  id: number;
  title: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  badge?: string;
}

export default function PropertyCard({ title, price, beds, baths, area, image, badge }: PropertyCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {badge && (
          <div className="absolute top-4 left-4 bg-cyprus-navy text-white px-3 py-1 rounded-full text-sm font-medium">
            {badge}
          </div>
        )}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-cyprus-navy">
            {t('common.euro')} {price.toLocaleString()}
          </span>
        </div>
        <h3 className="font-medium text-gray-800 mb-4">{title}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span>🛏️</span> {beds}
            </span>
            <span className="flex items-center gap-1">
              <span>🛁</span> {baths}
            </span>
            <span className="flex items-center gap-1">
              <span>📐</span> {area} {t('featured.area')}
            </span>
          </div>
          <button className="w-8 h-8 bg-cyprus-sand rounded-full flex items-center justify-center hover:bg-cyprus-orange hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
