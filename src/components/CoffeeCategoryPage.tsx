import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Leaf, Package } from 'lucide-react';
import ProductGrid from './ProductGrid';
import FilterPanel from './FilterPanel';
import { Product, FilterOptions } from '../types';

interface CoffeeCategoryPageProps {
  products: Product[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const CoffeeCategoryPage: React.FC<CoffeeCategoryPageProps> = ({
  products,
  filters,
  onFiltersChange,
  isFilterOpen,
  onToggleFilter,
  onAddToCart,
  onProductClick,
  onToggleFavorite,
  isFavorite
}) => {
  const coffeeFeatures = [
    {
      icon: Coffee,
      title: '自家焙煎',
      description: '毎日少量ずつ丁寧に焙煎'
    },
    {
      icon: Award,
      title: '厳選豆',
      description: '世界各地から選りすぐり'
    },
    {
      icon: Leaf,
      title: 'オーガニック',
      description: '有機栽培の豆も取り扱い'
    },
    {
      icon: Package,
      title: 'ドリップバッグ',
      description: 'ギフトに最適なパッケージ'
    }
  ];

  return (
    <div className="min-h-screen bg-good-blue-cream">
      {/* コーヒーカテゴリーヒーロー */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="/images/hero/20240521-272-rendered-1536x1024.jpg"
          alt="コーヒー"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Coffee Collection</h1>
            <p className="text-lg md:text-xl">goodblue自家焙煎の特別なコーヒー</p>
          </motion.div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="bg-white py-12">
        <div className="container-base">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coffeeFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 rounded-full bg-good-blue-light/50 text-good-blue-gold mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* カテゴリー説明 */}
      <div className="container-base py-8">
        <div className="bg-white rounded-lg shadow-soft p-8 mb-8">
          <h2 className="text-2xl font-display font-semibold text-good-blue-brown mb-4">
            こだわりのコーヒー
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            goodblueでは、世界各地から厳選したコーヒー豆を自家焙煎でお届けしています。
            毎日少量ずつ丁寧に焙煎することで、豆本来の香りと味わいを最大限に引き出しています。
          </p>
          <p className="text-gray-700 leading-relaxed">
            人気のドリップバッグは、可愛いパッケージデザインでギフトにも最適。
            お店の味をご自宅でも手軽にお楽しみいただけます。
          </p>
        </div>

        {/* サブカテゴリーナビゲーション */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => onFiltersChange({ category: 'coffee' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              !filters.subcategory 
                ? 'bg-good-blue-gold text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'single-origin' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'single-origin'
                ? 'bg-good-blue-gold text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            シングルオリジン
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'blends' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'blends'
                ? 'bg-good-blue-gold text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ブレンド
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'organic' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'organic'
                ? 'bg-good-blue-gold text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            オーガニック
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'drip-bags' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'drip-bags'
                ? 'bg-good-blue-gold text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ドリップバッグ
          </button>
        </div>

        {/* 商品グリッド */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-64 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFiltersChange={onFiltersChange}
              isOpen={isFilterOpen}
              onToggle={onToggleFilter}
            />
          </div>
          
          <ProductGrid
            products={products.filter(p => p.category === 'coffee')}
            filters={filters}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default CoffeeCategoryPage;