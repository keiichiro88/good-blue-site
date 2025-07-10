import React, { useState } from 'react';
import { ChevronLeft, ShoppingCart, Heart, Minus, Plus, Truck, Shield, RefreshCw, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product, Review } from '../types';
import NewProductCard from './NewProductCard';

interface NewProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onGoBack: () => void;
  relatedProducts: Product[];
  onProductClick: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: boolean;
  reviews: Review[];
  onReviewSubmit: (review: { productId: string; userName: string; rating: number; comment: string }) => void;
  onReviewHelpful: (reviewId: string) => void;
}

const NewProductDetail: React.FC<NewProductDetailProps> = ({
  product,
  onAddToCart,
  onGoBack,
  relatedProducts,
  onProductClick,
  onToggleFavorite,
  isFavorite,
  reviews,
  onReviewSubmit,
  onReviewHelpful
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);

  // 複数画像のサンプル（実際の実装では商品データに含める）
  const productImages = [
    product.image,
    product.image, // 実際は異なる画像
    product.image, // 実際は異なる画像
  ];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 99)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* パンくずリスト */}
      <div className="bg-gray-50 py-4">
        <div className="container-base">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <button onClick={onGoBack} className="hover:text-good-blue-gold transition-colors">
              ホーム
            </button>
            <span>/</span>
            <button onClick={onGoBack} className="hover:text-good-blue-gold transition-colors">
              {product.category === 'seedlings' ? '花苗・植物' : 'カフェメニュー'}
            </button>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="container-base py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 画像セクション */}
          <div>
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {productImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: selectedImageIndex === index ? 1 : 0,
                    scale: selectedImageIndex === index ? 1 : 1.05
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                  style={{ pointerEvents: selectedImageIndex === index ? 'auto' : 'none' }}
                />
              ))}
              {!product.inStock && (
                <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center z-10">
                  <span className="text-2xl font-medium text-gray-600">在庫切れ</span>
                </div>
              )}
            </div>
            
            {/* サムネイル画像 */}
            <div className="flex gap-4 mt-4">
              {productImages.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    if (selectedImageIndex !== index && !isImageTransitioning) {
                      setIsImageTransitioning(true);
                      setSelectedImageIndex(index);
                      setTimeout(() => setIsImageTransitioning(false), 500);
                    }
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index ? 'border-good-blue-gold' : 'border-gray-200 hover:border-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  {selectedImageIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-good-blue-gold/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 商品情報セクション */}
          <div>
            <h1 className="text-3xl font-display font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* 評価 */}
            {product.rating > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviews}件のレビュー)
                </span>
              </div>
            )}

            {/* 価格 */}
            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-display font-semibold text-gray-900">
                  ¥{product.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">税込</span>
              </div>
            </div>

            {/* 簡単な説明 */}
            <p className="text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* 購入オプション */}
            <div className="space-y-6 mb-8">
              {/* 数量選択 */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">数量</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= (product.stock || 99)}
                      className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {product.stock && product.stock < 10 && (
                    <span className="text-sm text-red-600">残り{product.stock}個</span>
                  )}
                </div>
              </div>

              {/* ボタン */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-good-blue-gold text-white py-4 px-8 rounded-lg font-medium hover:bg-good-blue-brown transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  カートに追加
                </button>
                <button
                  onClick={() => onToggleFavorite(product)}
                  className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* 特徴アイコン */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">全国配送対応</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">品質保証</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600">返品・交換可能</p>
              </div>
            </div>
          </div>
        </div>

        {/* タブセクション */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'border-good-blue-gold text-good-blue-gold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                商品説明
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'details'
                    ? 'border-good-blue-gold text-good-blue-gold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                詳細情報
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'reviews'
                    ? 'border-good-blue-gold text-good-blue-gold'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                レビュー ({reviews.length})
              </button>
            </div>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">商品について</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.description}
                </p>
                {product.category === 'seedlings' && (
                  <>
                    <h4 className="text-lg font-semibold mb-3 mt-6">育て方のポイント</h4>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>日当たりの良い場所で管理してください</li>
                      <li>水やりは土の表面が乾いたらたっぷりと</li>
                      <li>定期的に肥料を与えると良く育ちます</li>
                    </ul>
                  </>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">詳細情報</h3>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <dt className="text-sm font-medium text-gray-600">カテゴリー</dt>
                    <dd className="mt-1 text-gray-900">
                      {product.category === 'seedlings' ? '花苗・植物' : 'カフェメニュー'}
                    </dd>
                  </div>
                  {product.organic && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-600">栽培方法</dt>
                      <dd className="mt-1 text-gray-900">オーガニック</dd>
                    </div>
                  )}
                  {product.roastLevel && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-600">焙煎度</dt>
                      <dd className="mt-1 text-gray-900">
                        {product.roastLevel === 'light' ? '浅煎り' : 
                         product.roastLevel === 'medium' ? '中煎り' : '深煎り'}
                      </dd>
                    </div>
                  )}
                  {product.difficulty && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <dt className="text-sm font-medium text-gray-600">育てやすさ</dt>
                      <dd className="mt-1 text-gray-900">
                        {product.difficulty === 'easy' ? '簡単' : 
                         product.difficulty === 'medium' ? '普通' : '難しい'}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-6">カスタマーレビュー</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{review.userName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= review.rating
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600">{review.date}</span>
                            </div>
                          </div>
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              購入済み
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 mt-3">{review.comment}</p>
                        <button
                          onClick={() => onReviewHelpful(review.id)}
                          className="text-sm text-gray-600 hover:text-good-blue-gold mt-3"
                        >
                          参考になった ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">まだレビューはありません。</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 関連商品 */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-8">
              関連商品
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <NewProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(p) => onAddToCart(p, 1)}
                  onProductClick={onProductClick}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewProductDetail;