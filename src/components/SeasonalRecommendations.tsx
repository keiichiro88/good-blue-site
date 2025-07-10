import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Sparkles } from 'lucide-react';
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

          {/* 特別企画バナー - 店主からのメッセージ風 */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-good-blue-brown text-center mb-8">店主おすすめ！夏の特別セット</h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-6xl mx-auto">
              <div className="md:flex">
                <div className="md:w-2/5">
                  <div className="relative h-full min-h-[300px]">
                    <img 
                      src="/images/products/20240521-224-768x512.jpg" 
                      alt="夏の特別セット" 
                      className="w-full h-full object-cover"
                    />
                    {/* 期間限定バッジ */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      期間限定
                    </div>
                  </div>
                </div>
                <div className="p-8 md:w-3/5 bg-gradient-to-br from-good-blue-light/30 to-white">
                  <h4 className="text-xl md:text-2xl font-display font-bold text-good-blue-brown mb-4">
                    夏の特別セット販売中
                  </h4>
                  <p className="text-good-blue-brown/80 leading-relaxed mb-4">
                    こんにちは、店主の的場です。<br />
                    この夏、特におすすめしたい植物を厳選してセットにしました。九重の涼しい環境で育った夏の植物は、暑さに強く、初心者の方でも育てやすいのが特徴です。
                  </p>
                  <p className="text-good-blue-brown/80 leading-relaxed mb-6">
                    セット内容：人気の夏植物3点 + オリジナル培養土<br />
                    通常価格¥7,500のところ、期間限定で<span className="font-bold text-good-blue-gold">¥5,980（20%OFF）</span>でご提供いたします。
                  </p>
                  
                  {/* 特典 */}
                  <div className="bg-white/80 rounded-lg p-4 mb-6">
                    <p className="font-medium text-good-blue-brown mb-2">セット購入特典：</p>
                    <ul className="text-sm text-good-blue-brown/80 space-y-1">
                      <li>✓ 送料無料でお届け（通常¥600〜）</li>
                      <li>✓ 私が作成した育て方ガイドブック付き</li>
                      <li>✓ 30日間の枯れ保証付き</li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-sm text-gray-600 line-through">¥7,500</span>
                      <span className="text-3xl font-bold text-good-blue-gold">¥5,980</span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        20%OFF
                      </span>
                    </div>
                    <div className="text-right">
                      <button className="bg-good-blue-gold text-white px-8 py-3 rounded-lg font-medium hover:bg-good-blue-brown transition-colors shadow-md mb-2">
                        詳細を見る
                      </button>
                      <p className="text-sm text-red-600 font-medium">
                        残り5セット限り
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-right text-good-blue-brown/60 text-sm mt-4">
                    goodblue 店主　的場達郎
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default SeasonalRecommendations;