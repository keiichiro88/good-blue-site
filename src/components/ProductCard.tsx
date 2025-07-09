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
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoastColor = (roastLevel?: string) => {
    switch (roastLevel) {
      case 'light': return 'bg-amber-100 text-amber-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'dark': return 'bg-stone-100 text-stone-800';
      default: return 'bg-gray-100 text-gray-800';
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-good-blue-gold/20">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-good-blue-brown truncate">{product.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-good-blue-brown/70 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {product.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(product.difficulty)}`}>
              {getDifficultyLabel(product.difficulty)}
            </span>
          )}
          {product.roastLevel && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoastColor(product.roastLevel)}`}>
              {getRoastLabel(product.roastLevel)}
            </span>
          )}
          {product.origin && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {product.origin}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-good-blue-brown">¥{Math.round(product.price * 100)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">¥{Math.round(product.originalPrice * 100)}</span>
            )}
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              product.inStock
                ? 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">
              {product.inStock ? 'カートに追加' : '在庫切れ'}
            </span>
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500">
          {product.reviews}件のレビュー
        </div>
      </div>
    </div>
  );
};

export default ProductCard;