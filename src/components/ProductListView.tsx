import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductListViewProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
}

const ProductListView: React.FC<ProductListViewProps> = ({ product, onAddToCart, onProductClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex gap-4">
        {/* 商品画像 */}
        <div 
          className="w-32 h-32 flex-shrink-0 cursor-pointer"
          onClick={() => onProductClick && onProductClick(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
          />
        </div>

        {/* 商品情報 */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 
              className="text-lg font-semibold text-good-blue-brown cursor-pointer hover:text-good-blue-gold transition-colors"
              onClick={() => onProductClick && onProductClick(product)}
            >
              {product.name}
            </h3>
            <button className="p-2 hover:bg-good-blue-light rounded-full transition-colors">
              <Heart className="h-4 w-4 text-good-blue-brown" />
            </button>
          </div>

          <p className="text-sm text-good-blue-brown/70 mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-bold text-good-blue-brown">
                ¥{product.price.toLocaleString()}
              </span>
              {product.organic && (
                <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  オーガニック
                </span>
              )}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                product.inStock
                  ? 'bg-good-blue-gold text-white hover:bg-good-blue-gold/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? 'カートに追加' : '在庫切れ'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;