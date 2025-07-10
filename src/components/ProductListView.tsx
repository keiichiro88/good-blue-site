import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import ProductTag from './ProductTag';

interface ProductListViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
}

const ProductListView: React.FC<ProductListViewProps> = ({ product, onAddToCart, onProductClick, onToggleFavorite, isFavorite = false }) => {
  return (
    <div className="bg-white border border-gray-100 p-4 hover:border-gray-200 transition-colors duration-200">
      <div className="flex gap-4">
        {/* 商品画像 */}
        <div 
          className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0 cursor-pointer"
          onClick={() => onProductClick && onProductClick(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:opacity-90 transition-opacity"
          />
        </div>

        {/* 商品情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-1">
            <div className="flex-1">
              <h3 
                className="text-sm md:text-base font-medium text-gray-800 cursor-pointer hover:text-good-blue-gold transition-colors mb-1"
                onClick={() => onProductClick && onProductClick(product)}
              >
                {product.name}
              </h3>
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1">
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <ProductTag key={index} tag={tag} discount={product.discount} />
                  ))}
                </div>
              )}
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite && onToggleFavorite(product);
              }}
              className="p-1.5 hover:bg-gray-50 rounded-full transition-colors md:hidden ml-2"
            >
              <Heart className={`h-4 w-4 ${
                isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'
              }`} />
            </button>
          </div>

          <p className="text-xs md:text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>

          {/* Rating - hidden on mobile */}
          {product.rating > 0 && (
            <div className="hidden md:flex items-center gap-1 mb-2">
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
              <span className="text-xs text-gray-600">
                ({product.reviews}件のレビュー)
              </span>
            </div>
          )}

          <div className="flex items-end justify-between mt-auto">
            <div>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-base md:text-lg font-bold text-gray-900">
                ¥{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">(税込)</span>
              {product.organic && (
                <span className="ml-2 bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium hidden md:inline-block">
                  オーガニック
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-md font-medium text-xs md:text-sm transition-all duration-200 ${
                product.inStock
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden md:inline">{product.inStock ? 'カートに追加' : '在庫切れ'}</span>
              <span className="md:hidden">{product.inStock ? '追加' : '在庫切れ'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;