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
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-all hover:-translate-y-1 group">
      <div className="relative h-40 sm:h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <div className="absolute top-3 left-3 bg-cyprus-navy text-white px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium">
            {badge}
          </div>
        )}
        <button className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-xl sm:text-2xl font-bold text-cyprus-navy">
            {t('common.euro')} {price.toLocaleString()}
          </span>
        </div>
        <h3 className="font-medium text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">{title}</h3>
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
          <div className="flex items-center gap-2 sm:gap-3">
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
          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-cyprus-sand rounded-full flex items-center justify-center hover:bg-cyprus-orange hover:text-white transition-colors">
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
