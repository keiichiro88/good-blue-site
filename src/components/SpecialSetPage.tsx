import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Truck, Shield, Gift, Sparkles, Star, Calendar } from 'lucide-react';
import { Product } from '../types';

interface SpecialSetPageProps {
  onGoBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  products: Product[];
}

const SpecialSetPage: React.FC<SpecialSetPageProps> = ({ onGoBack, onAddToCart, products }) => {
  // セット商品を作成
  const specialSet: Product = {
    id: 'special-summer-set',
    name: '店主おすすめ！夏の特別セット',
    price: 5980,
    originalPrice: 7500,
    category: 'special',
    subcategory: 'set',
    image: '/images/products/20240521-224-768x512.jpg',
    description: '九重の涼しい環境で育った夏の植物を厳選。暑さに強く、初心者の方でも育てやすい植物をセットにしました。',
    inStock: true,
    stock: 5,
    rating: 5.0,
    reviews: 0,
    tags: ['limited', 'recommended'],
    discount: 20
  };

  // セットに含まれる商品（実際の商品データから選択）
  const setItems = [
    products.find(p => p.id === 'p1'),
    products.find(p => p.id === 'p2'),
    products.find(p => p.id === 'p11')
  ].filter(Boolean) as Product[];

  const handleAddToCart = () => {
    onAddToCart(specialSet, 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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
    <div className="min-h-screen bg-good-blue-cream pb-20">
      {/* 戻るボタン */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onGoBack}
            className="flex items-center text-good-blue-brown hover:text-good-blue-gold transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            <span>トップページに戻る</span>
          </button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 左側：画像とギャラリー */}
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded text-sm font-medium z-10">
                期間限定 20%OFF
              </div>
              <img
                src={specialSet.image}
                alt={specialSet.name}
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
            
            {/* セット内容の画像 */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-good-blue-brown mb-4">セット内容</h3>
              <div className="grid grid-cols-3 gap-4">
                {setItems.map((item, index) => (
                  <div key={item.id} className="text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm text-good-blue-brown">{item.name}</p>
                    <p className="text-xs text-good-blue-brown/60">通常価格 ¥{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右側：商品情報 */}
          <motion.div variants={itemVariants}>
            <div className="mb-6">
              <h1 className="text-3xl font-display font-medium text-good-blue-brown mb-4">
                {specialSet.name}
              </h1>
              
              {/* 価格情報 */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-good-blue-brown">
                  ¥{specialSet.price.toLocaleString()}
                </span>
                <span className="text-xl text-good-blue-brown/60 line-through">
                  ¥{specialSet.originalPrice?.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                  20%OFF
                </span>
              </div>

              {/* 在庫情報 */}
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-good-blue-gold" />
                <span className="text-sm text-red-600 font-medium">
                  残り{specialSet.stock}セット限り
                </span>
              </div>

              {/* 店主からのメッセージ */}
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h3 className="text-lg font-medium text-good-blue-brown mb-3">
                  店主 的場からのメッセージ
                </h3>
                <p className="text-good-blue-brown/80 text-sm leading-relaxed mb-4">
                  こんにちは、店主の的場です。
                </p>
                <p className="text-good-blue-brown/80 text-sm leading-relaxed mb-4">
                  この夏、特におすすめしたい植物を厳選してセットにしました。九重の涼しい環境で育った夏の植物は、暑さに強く、初心者の方でも育てやすいのが特徴です。
                </p>
                <p className="text-good-blue-brown/80 text-sm leading-relaxed">
                  それぞれの植物の特性を活かした育て方ガイドブックもお付けしています。ぜひこの機会に、緑のある暮らしを始めてみませんか？
                </p>
              </div>

              {/* 特典情報 */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-good-blue-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-good-blue-brown">送料無料</p>
                    <p className="text-sm text-good-blue-brown/60">
                      セット購入特典として全国送料無料でお届けします
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-good-blue-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-good-blue-brown">育て方ガイドブック付き</p>
                    <p className="text-sm text-good-blue-brown/60">
                      店主が作成したオリジナルの育て方ガイドをプレゼント
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-good-blue-gold mt-0.5" />
                  <div>
                    <p className="font-medium text-good-blue-brown">30日間枯れ保証</p>
                    <p className="text-sm text-good-blue-brown/60">
                      万が一枯れてしまった場合は無償で交換いたします
                    </p>
                  </div>
                </div>
              </div>

              {/* カートに追加ボタン */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-good-blue-brown text-white py-4 rounded-lg font-medium hover:bg-good-blue-gold transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                カートに追加する
              </button>
              <p className="text-xs text-good-blue-brown/60 text-center mt-2">
                ※数量限定のため、お早めにご注文ください
              </p>
            </div>

            {/* セット内容詳細 */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-good-blue-brown mb-4">
                セット内容詳細
              </h3>
              <div className="space-y-4">
                {setItems.map((item, index) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-good-blue-brown mb-1">{item.name}</h4>
                      <p className="text-sm text-good-blue-brown/60 mb-2">{item.description}</p>
                      <p className="text-sm text-good-blue-brown">
                        通常価格: ¥{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 合計価格の表示 */}
              <div className="mt-6 p-4 bg-good-blue-light rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-good-blue-brown">セット内容合計</span>
                  <span className="text-good-blue-brown line-through">
                    ¥{setItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-good-blue-brown">特別セット価格</span>
                  <span className="text-red-600">¥{specialSet.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-good-blue-gold mt-2 text-right">
                  ¥{(setItems.reduce((sum, item) => sum + item.price, 0) - specialSet.price).toLocaleString()}お得！
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SpecialSetPage;