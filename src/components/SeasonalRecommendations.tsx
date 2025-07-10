import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Sparkles, TrendingUp } from 'lucide-react';
import NewProductCard from './NewProductCard';
import { Product } from '../types';

interface SeasonalRecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

const SeasonalRecommendations: React.FC<SeasonalRecommendationsProps> = ({
  products,
  onAddToCart,
  onProductClick,
  onToggleFavorite,
  isFavorite
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // 7月のおすすめ商品を選定
  const getSeasonalProducts = () => {
    if (!products || products.length === 0) return [];
    
    const seasonalIds = ['p1', 'p2', 'p11', 'p12'];
    const badges = ['夏の定番', '期間限定', 'スタッフ推薦', '人気No.1'];
    const reasons = [
      '暑さに強く、初心者でも育てやすい',
      '7月限定入荷の希少品種',
      '爽やかな香りで夏にぴったり',
      '今月最も売れている商品'
    ];
    
    return seasonalIds.map((id, index) => {
      const product = products.find(p => p.id === id) || products[Math.min(index, products.length - 1)];
      return {
        ...product,
        badge: badges[index],
        reason: reasons[index]
      };
    }).filter(p => p && p.id);
  };
  
  const seasonalProducts = getSeasonalProducts();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="section-padding bg-good-blue-light seasonal-section">
      <div className="container-base">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* セクションヘッダー */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="h-6 w-6 text-good-blue-gold" />
              <h2 className="heading-secondary text-good-blue-brown">
                7月のおすすめ
              </h2>
              <Sparkles className="h-6 w-6 text-good-blue-gold" />
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              夏本番！暑さに強い植物や、爽やかな夏のコーヒーをご紹介します
            </p>
          </div>

          {/* おすすめ商品グリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {seasonalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="relative"
              >
                {/* バッジ */}
                <div className="absolute -top-3 left-4 z-10">
                  <span className="bg-good-blue-gold text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
                    {product.badge}
                  </span>
                </div>
                
                {/* 商品カード */}
                <div className="pt-2">
                  <NewProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite(product.id)}
                  />
                </div>
                
                {/* おすすめ理由 */}
                <div className="mt-3 p-3 bg-white rounded-lg shadow-soft">
                  <p className="text-sm text-gray-600">
                    {product.reason}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 特別企画バナー */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-good-blue-gold to-good-blue-brown rounded-lg p-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-display font-semibold mb-2">
                  夏の特別セット販売中
                </h3>
                <p className="text-white/90 mb-4">
                  人気の夏植物3点セット + オリジナル培養土付き
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold">¥5,980</span>
                  <span className="text-lg line-through opacity-70">¥7,500</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    20%OFF
                  </span>
                </div>
              </div>
              <button className="bg-white text-good-blue-brown px-6 py-3 rounded-lg font-medium hover:bg-good-blue-light transition-colors">
                詳細を見る
              </button>
            </div>
          </motion.div>

          {/* 今月のトレンド */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-soft text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">多肉植物</h4>
              <p className="text-sm text-gray-600">
                水やり少なめで夏も安心
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">アイスコーヒー</h4>
              <p className="text-sm text-gray-600">
                専用豆で本格的な味わい
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft text-center">
              <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
              <h4 className="font-medium text-gray-900 mb-2">ハーブ苗</h4>
              <p className="text-sm text-gray-600">
                料理に使えて実用的
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalRecommendations;