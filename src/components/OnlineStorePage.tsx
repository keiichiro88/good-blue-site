import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface OnlineStorePageProps {
  onCategoryChange: (category: string) => void;
}

const OnlineStorePage: React.FC<OnlineStorePageProps> = ({ onCategoryChange }) => {
  const categories = [
    {
      id: 'coffee',
      title: 'コーヒー',
      description: 'goodblue自家焙煎のコーヒー豆。九重の澄んだ空気と共にお届けします。',
      image: '/images/products/20240521-356-768x512.jpg',
      items: [
        { name: 'シングルオリジン', count: 8 },
        { name: 'ブレンド', count: 5 },
        { name: 'オーガニック', count: 4 },
        { name: 'ドリップバッグ', count: 6 }
      ]
    },
    {
      id: 'seedlings',
      title: '花苗・植物',
      description: '大分の自然で育った健康な苗をお届けします。',
      image: '/images/products/20240521-82-1-1536x1024.jpg',
      items: [
        { name: '観葉植物', count: 12 },
        { name: '花木', count: 8 },
        { name: '果樹', count: 6 },
        { name: '季節の苗', count: 15 }
      ]
    }
  ];

  const recommendedItems = [
    {
      title: '夏の特別セット',
      subtitle: '季節限定',
      image: '/images/products/20240521-224-768x512.jpg',
      price: '¥5,980',
      originalPrice: '¥7,500'
    },
    {
      title: 'オリジナルドリップバッグ',
      subtitle: 'ギフトにも最適',
      image: '/images/products/20240521-356-768x512.jpg',
      price: '¥2,500',
      originalPrice: null
    },
    {
      title: '観葉植物セット',
      subtitle: '初心者向け',
      image: '/images/products/20240521-270-1536x1024.jpg',
      price: '¥3,800',
      originalPrice: null
    },
    {
      title: '季節の花苗詰め合わせ',
      subtitle: '数量限定',
      image: '/images/products/20240521-296-1536x1024.jpg',
      price: '¥4,200',
      originalPrice: null
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ヒーローセクション */}
      <div className="container-base py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 md:h-80 overflow-hidden rounded-2xl mb-8">
            <img
              src="/images/hero/20240521-362-1536x1024.jpg"
              alt="オンラインストア"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">オンラインストア</h1>
            <p className="text-base md:text-lg text-gray-600">
              朝のコーヒーで、ほっと一息。窓辺の花に、にっこり笑顔。<br />
              goodblueがお届けする、毎日の小さな幸せのかたち。
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-base pb-16">
        {/* カテゴリーセクション */}
        <div className="mb-20">
          <h2 className="text-2xl font-display font-medium text-gray-800 mb-12">
            Category <span className="text-sm font-normal text-gray-600 ml-2">カテゴリー</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => onCategoryChange(category.id)}
              >
                <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>
                
                <h3 className="text-xl font-medium text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => (
                    <div key={item.name} className="text-sm text-gray-500">
                      {item.name} ({item.count})
                    </div>
                  ))}
                </div>
                
                <button className="mt-4 text-sm text-good-blue-gold font-medium inline-flex items-center group-hover:text-good-blue-brown transition-colors">
                  カテゴリーを見る
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* おすすめ商品セクション */}
        <div>
          <h2 className="text-2xl font-display font-medium text-gray-800 mb-12">
            Recommended <span className="text-sm font-normal text-gray-600 ml-2">おすすめ商品</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendedItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative mb-3">
                  <div className="aspect-square overflow-hidden rounded bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  {item.subtitle && (
                    <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs">
                      {item.subtitle}
                    </div>
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-gray-900 mb-1">{item.title}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-gray-500 line-through">{item.originalPrice}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineStorePage;