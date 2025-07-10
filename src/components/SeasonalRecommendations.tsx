import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Sparkles } from 'lucide-react';
import NewProductCard from './NewProductCard';
import ProductListView from './ProductListView';
import { Product } from '../types';

interface SeasonalRecommendationsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  onCategoryChange?: (category: string) => void;
}

const SeasonalRecommendations: React.FC<SeasonalRecommendationsProps> = ({
  products,
  onAddToCart,
  onProductClick,
  onToggleFavorite,
  isFavorite,
  onCategoryChange
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    <section className="py-24 bg-white seasonal-section">
      <div className="container-base max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* セクションヘッダー */}
          <div className="text-left mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-medium text-gray-800 mb-3">
              Recommended おすすめ商品
            </h2>
          </div>

          {/* おすすめ商品グリッド */}
          <div className={`${
            isMobile
              ? 'space-y-4 px-4' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8'
          }`}>
            {seasonalProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
              >
                {/* 商品カード */}
                {isMobile ? (
                  <ProductListView
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite(product.id)}
                  />
                ) : (
                  <NewProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onProductClick={onProductClick}
                    onToggleFavorite={onToggleFavorite}
                    isFavorite={isFavorite(product.id)}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* 特別企画バナー - 店主からのメッセージ風 */}
          <motion.div
            variants={itemVariants}
            className="mt-12 md:mt-24 px-4 md:px-8"
          >
            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-6 md:mb-12">店主おすすめ！夏の特別セット</h3>
            <div className="bg-white max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 md:gap-12">
                {/* 左側：画像 */}
                <div className="relative">
                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-red-500 text-white px-2 py-0.5 md:px-3 md:py-1 rounded text-xs md:text-sm font-medium z-10">
                    期間限定
                  </div>
                  <img 
                    src="/images/products/20240521-224-768x512.jpg" 
                    alt="夏の特別セット" 
                    className="w-full h-56 md:h-auto object-cover rounded-lg"
                  />
                </div>
                
                {/* 右側：テキスト */}
                <div className="flex flex-col justify-center">
                  <h4 className="text-lg md:text-2xl font-display font-medium text-gray-900 mb-3 md:mb-6">
                    夏の特別セット販売中
                  </h4>
                  
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-2 md:mb-4 hidden md:block">
                    こんにちは、店主の的場です。
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4">
                    この夏、特におすすめしたい植物を厳選してセットにしました。九重の涼しい環境で育った夏の植物は、暑さに強く、初心者の方でも育てやすいのが特徴です。
                  </p>
                  
                  <div className="mb-3 md:mb-6">
                    <p className="text-xs md:text-sm text-gray-700 font-medium mb-1 md:mb-2">セット内容特典：</p>
                    <ul className="text-xs md:text-sm text-gray-600 space-y-0.5 md:space-y-1">
                      <li>・送料無料でお届け（通常¥600〜）</li>
                      <li>・私が作成した育て方ガイドブック付き</li>
                      <li>・30日間の枯れ保証付き</li>
                    </ul>
                  </div>
                  
                  <div className="border-t pt-3 md:pt-6">
                    <div className="flex items-baseline gap-2 md:gap-3 mb-2 md:mb-4">
                      <span className="text-xs md:text-sm text-gray-500 line-through">¥7,500</span>
                      <span className="text-lg md:text-2xl font-bold text-gray-900">¥5,980</span>
                      <span className="bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded text-xs">
                        20%OFF
                      </span>
                    </div>
                    <button 
                      onClick={() => onCategoryChange && onCategoryChange('special-set')}
                      className="w-full bg-gray-900 text-white py-2 md:py-3 rounded text-sm md:text-base font-medium hover:bg-gray-800 transition-colors mb-1 md:mb-2"
                    >
                      詳細を見る
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                      残り5セット限り
                    </p>
                  </div>
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