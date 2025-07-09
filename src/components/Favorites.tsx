import React from 'react';
import { Heart, ArrowLeft, ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface FavoritesProps {
  favorites: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFavorite: (productId: string) => void;
  onContinueShopping: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onProductClick,
  onAddToCart,
  onRemoveFavorite,
  onContinueShopping
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onContinueShopping}
            className="flex items-center gap-2 text-good-blue-brown hover:text-good-blue-gold transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>買い物を続ける</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Heart className="h-8 w-8 text-good-blue-gold fill-current" />
          <h1 className="text-2xl md:text-3xl font-bold text-good-blue-brown">
            お気に入り
          </h1>
        </div>
        <p className="text-good-blue-brown/60 mt-2">
          {favorites.length}件の商品
        </p>
      </div>

      {/* お気に入り商品 */}
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <Heart className="h-16 w-16 text-good-blue-brown/20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-good-blue-brown mb-2">
            お気に入りに商品がありません
          </h2>
          <p className="text-good-blue-brown/60 mb-8">
            気になる商品をハートマークで保存しましょう
          </p>
          <button
            onClick={onContinueShopping}
            className="bg-good-blue-gold text-white px-6 py-2 rounded-lg hover:bg-good-blue-gold/90 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            商品を探す
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map(product => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onAddToCart={onAddToCart}
                  onProductClick={onProductClick}
                />
                {/* お気に入り削除ボタン（オーバーレイ） */}
                <button
                  onClick={() => onRemoveFavorite(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group z-10"
                  title="お気に入りから削除"
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current group-hover:scale-110 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          {/* お気に入りの使い方ヒント */}
          <div className="mt-12 p-6 bg-good-blue-light/50 rounded-lg">
            <h3 className="font-semibold text-good-blue-brown mb-3">お気に入りの活用方法</h3>
            <ul className="space-y-2 text-sm text-good-blue-brown/80">
              <li>• 後で購入を検討したい商品を保存できます</li>
              <li>• 在庫切れの商品も保存しておけば、入荷時にすぐ購入できます</li>
              <li>• 季節の商品を保存して、シーズンになったらチェックしましょう</li>
              <li>• プレゼント候補の商品をリストアップするのにも便利です</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;