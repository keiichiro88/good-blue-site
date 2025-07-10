import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Award, Leaf, Package } from 'lucide-react';
import ProductGrid from './ProductGrid';
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
  onCategoryChange: (category: string) => void;
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
  isFavorite,
  onCategoryChange
}) => {
  return (
    <div className="min-h-screen bg-good-blue-cream">
      {/* カテゴリー説明 */}
      <div className="container-base py-8">
        {/* パンくずリスト */}
        <div className="text-sm text-gray-600 mb-4">
          <span 
            className="hover:text-good-blue-gold cursor-pointer"
            onClick={() => onCategoryChange('all')}
          >
            ホーム
          </span>
          <span className="mx-2">＞</span>
          <span 
            className="hover:text-good-blue-gold cursor-pointer"
            onClick={() => onCategoryChange('store')}
          >
            オンラインストア
          </span>
          <span className="mx-2">＞</span>
          <span className="text-gray-900">コーヒー</span>
        </div>
        
        {/* カテゴリータイトル */}
        <h1 className="text-xl md:text-2xl font-display font-bold text-gray-700 mb-2 sm:mb-8">
          カテゴリー「コーヒー」
        </h1>

        {/* 商品グリッド */}
        <div>
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