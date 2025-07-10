import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Product } from '../types';
import ProductTag from './ProductTag';

interface NewProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
}

const NewProductCard: React.FC<NewProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onProductClick, 
  onToggleFavorite, 
  isFavorite = false 
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite && onToggleFavorite(product);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer"
      onClick={() => onProductClick && onProductClick(product)}
    >
      <div className="bg-white border border-gray-100 hover:border-gray-200 transition-colors duration-200">
        {/* 画像部分 */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* バッジ */}
          {product.tags && product.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <ProductTag key={index} tag={tag} discount={product.discount} />
              ))}
            </div>
          )}
          {!product.tags && product.organic && (
            <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              オーガニック
            </span>
          )}
          
          {/* お気に入りボタン */}
          <button
            onClick={handleToggleFavorite}
            className={clsx(
              "absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300",
              isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              "hover:bg-white hover:scale-110"
            )}
          >
            <Heart 
              className={clsx(
                "h-4 w-4 transition-colors",
                isFavorite ? "text-red-500 fill-red-500" : "text-gray-600"
              )} 
            />
          </button>

          {/* 在庫切れオーバーレイ */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-gray-600 font-medium">在庫切れ</span>
            </div>
          )}
        </div>

        {/* コンテンツ部分 */}
        <div className="p-4">
          {/* 商品名 */}
          <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 group-hover:text-good-blue-gold transition-colors">
            {product.name}
          </h3>
          
          {/* 説明 - 省略 */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* 評価 */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={clsx(
                      "h-3.5 w-3.5",
                      star <= Math.round(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                {product.rating.toFixed(1)} ({product.reviews})
              </span>
            </div>
          )}

          {/* 価格とカートボタン */}
          <div className="flex items-center justify-between mt-4">
            <div>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  ¥{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-display font-semibold text-gray-900">
                ¥{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 ml-1">税込</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
                product.inStock
                  ? "bg-good-blue-gold text-white hover:bg-good-blue-brown hover:shadow-medium"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">カートへ</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewProductCard;