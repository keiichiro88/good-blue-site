import React from 'react';
import { Truck, Sparkles, Clock, TrendingUp, Tag, Heart, Leaf } from 'lucide-react';

type TagType = 'new' | 'sale' | 'limited' | 'recommended' | 'free-shipping' | 'popular' | 'organic';

interface ProductTagProps {
  tag: TagType;
  discount?: number;
}

const tagConfig: Record<TagType, { label: string; bgColor: string; textColor: string; Icon: React.FC<{ className?: string }> }> = {
  new: {
    label: 'NEW',
    bgColor: 'bg-emerald-500',
    textColor: 'text-white',
    Icon: Sparkles
  },
  sale: {
    label: 'SALE',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    Icon: Tag
  },
  limited: {
    label: '限定',
    bgColor: 'bg-purple-500',
    textColor: 'text-white',
    Icon: Clock
  },
  recommended: {
    label: 'オススメ',
    bgColor: 'bg-good-blue-gold',
    textColor: 'text-white',
    Icon: Heart
  },
  'free-shipping': {
    label: '送料無料',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    Icon: Truck
  },
  popular: {
    label: '人気',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    Icon: TrendingUp
  },
  organic: {
    label: 'オーガニック',
    bgColor: 'bg-green-600',
    textColor: 'text-white',
    Icon: Leaf
  }
};

const ProductTag: React.FC<ProductTagProps> = ({ tag, discount }) => {
  if (!tag || !tagConfig[tag]) {
    console.warn(`Invalid tag: ${tag}`);
    return null;
  }
  
  const config = tagConfig[tag];
  const IconComponent = config.Icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor}`}>
      <IconComponent className="h-3 w-3" />
      <span>
        {config.label}
        {tag === 'sale' && discount && ` ${discount}%OFF`}
      </span>
    </span>
  );
};

export default ProductTag;