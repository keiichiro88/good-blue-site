import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700';
      case 'medium': return 'bg-yellow-50 text-yellow-700';
      case 'hard': return 'bg-red-50 text-red-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getRoastColor = (roastLevel?: string) => {
    switch (roastLevel) {
      case 'light': return 'bg-amber-50 text-amber-700';
      case 'medium': return 'bg-orange-50 text-orange-700';
      case 'dark': return 'bg-stone-50 text-stone-700';
      default: return 'bg-gray-50 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return '簡単';
      case 'medium': return '普通';
      case 'hard': return '難しい';
      default: return difficulty;
    }
  };

  const getRoastLabel = (roastLevel?: string) => {
    switch (roastLevel) {
      case 'light': return '浅煎り';
      case 'medium': return '中煎り';
      case 'dark': return '深煎り';
      default: return roastLevel;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-good-blue-gold/20 flex flex-col">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.organic && (
          <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            オーガニック
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-good-blue-light">
          <Heart className="h-4 w-4 text-good-blue-brown" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Header with name and rating */}
        <div className="mb-3">
          <h3 className="text-base font-semibold text-good-blue-brown mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-500">
              {product.reviews}件のレビュー
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-good-blue-brown/70 text-sm mb-3 line-clamp-2 flex-grow">{product.description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.difficulty && (
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getDifficultyColor(product.difficulty)}`}>
              {getDifficultyLabel(product.difficulty)}
            </span>
          )}
          {product.roastLevel && (
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-medium ${getRoastColor(product.roastLevel)}`}>
              {getRoastLabel(product.roastLevel)}
            </span>
          )}
          {product.origin && (
            <span className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700">
              {product.origin}
            </span>
          )}
        </div>
        
        {/* Price and Cart Button */}
        <div className="space-y-3 mt-auto">
          {/* Price */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-good-blue-brown">¥{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">¥{product.originalPrice.toLocaleString()}</span>
              )}
            </div>
          </div>
          
          {/* Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
              product.inStock
                ? 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90 hover:shadow-md active:scale-[0.98]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>
              {product.inStock ? 'カートに追加' : '在庫切れ'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;