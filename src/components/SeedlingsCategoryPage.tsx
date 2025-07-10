import React from 'react';
import { motion } from 'framer-motion';
import { Flower2, TreePine, Cherry, Sprout } from 'lucide-react';
import ProductGrid from './ProductGrid';
import FilterPanel from './FilterPanel';
import { Product, FilterOptions } from '../types';

interface SeedlingsCategoryPageProps {
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

const SeedlingsCategoryPage: React.FC<SeedlingsCategoryPageProps> = ({
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
  const seedlingsFeatures = [
    {
      icon: Flower2,
      title: '季節の花苗',
      description: '四季折々の美しい花々'
    },
    {
      icon: TreePine,
      title: '観葉植物',
      description: 'インテリアに最適'
    },
    {
      icon: Cherry,
      title: '花木・果樹',
      description: '庭を彩る樹木たち'
    },
    {
      icon: Sprout,
      title: '希少植物',
      description: '九重の特別な山野草'
    }
  ];

  return (
    <div className="min-h-screen bg-good-blue-cream">
      {/* 花苗カテゴリーヒーロー */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="/images/hero/20240521-362-1536x1024.jpg"
          alt="花苗・植物"
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
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">花苗・植物</h1>
            <p className="text-lg md:text-xl">大分の自然で育った健康な苗をお届け</p>
          </motion.div>
        </div>
      </div>

      {/* 特徴セクション */}
      <div className="bg-white py-12">
        <div className="container-base">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {seedlingsFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex p-3 rounded-full bg-green-100 text-green-600 mb-3">
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
            九重の自然が育んだ花苗たち
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            標高700mの九重の清涼な環境で育った花苗や植物をお届けしています。
            大分の豊かな自然の中で、一つ一つ丁寧に育てた健康な苗は、
            お客様のお庭でも元気に育つことでしょう。
          </p>
          <p className="text-gray-700 leading-relaxed">
            季節の花苗から希少な山野草まで、幅広い品種を取り揃えています。
            育て方のアドバイスも承っておりますので、初心者の方も安心してお買い求めください。
          </p>
        </div>

        {/* サブカテゴリーナビゲーション */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => onFiltersChange({ category: 'seedlings' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              !filters.subcategory 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            すべて
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'houseplants' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'houseplants'
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            観葉植物
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'flowering-trees' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'flowering-trees'
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            花木
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'fruit-trees' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'fruit-trees'
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            果樹
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'seasonal' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'seasonal'
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            季節の苗
          </button>
          <button
            onClick={() => onFiltersChange({ ...filters, subcategory: 'rare-plants' })}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filters.subcategory === 'rare-plants'
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            希少植物
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
            products={products.filter(p => p.category === 'seedlings')}
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

export default SeedlingsCategoryPage;