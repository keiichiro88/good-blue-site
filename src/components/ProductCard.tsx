import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick, onToggleFavorite, isFavorite = false }) => {
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
      <div 
        className="relative aspect-video cursor-pointer"
        onClick={() => onProductClick && onProductClick(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.organic && (
          <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-green-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium">
            オーガニック
          </span>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(product);
          }}
          className={`absolute top-1 right-1 sm:top-2 sm:right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-md transition-all duration-300 ${
            isFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          } hover:bg-good-blue-light`}
        >
          <Heart className={`h-3 sm:h-4 w-3 sm:w-4 ${
            isFavorite ? 'text-red-500 fill-current' : 'text-good-blue-brown'
          }`} />
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        {/* Product name */}
        <h3 
          className="text-sm font-semibold text-good-blue-brown mb-1.5 line-clamp-1 cursor-pointer hover:text-good-blue-gold transition-colors"
          onClick={() => onProductClick && onProductClick(product)}
        >
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="text-xs text-good-blue-brown/70 mb-2 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.round(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-good-blue-brown/60">
              ({product.reviews})
            </span>
          </div>
        )}
        
        {/* Price and Cart Button */}
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-good-blue-brown">¥{product.price.toLocaleString()}</span>
            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 ${
                product.inStock
                  ? 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90 active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-3 w-3" />
              <span className="hidden sm:inline">カートに</span>
              <span>追加</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;