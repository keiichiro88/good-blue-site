import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Coffee, Flower2, Gift } from 'lucide-react';

interface CategoryShowcaseProps {
  onCategoryChange: (category: string) => void;
}

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onCategoryChange }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categories = [
    {
      id: 'coffee',
      title: 'オリジナルコーヒー（ドリップバッグ）',
      description: '【人気No.1】見た目も可愛い！こだわりのパッケージデザインが大好評。goodblue自家焙煎の特別なブレンドで、お客様に愛される理由がここに。［※オーナーのこだわりポイントをここに追加予定］ギフトにも最適です♪',
      image: '/images/products/20240521-356-768x512.jpg',
      icon: Coffee,
      buttonText: '今すぐ購入する'
    },
    {
      id: 'seedlings',
      title: '花苗・植物',
      description: '大分の豊かな自然で育った花苗や植物をお届けします。季節の花苗、山野草、希少植物まで幅広く取り揃えており、育て方のアドバイスも行っています。',
      image: '/images/products/20240521-270-1536x1024.jpg',
      icon: Flower2,
      buttonText: '花苗を見る'
    },
    {
      id: 'gift',
      title: 'ギフトセット',
      description: '【販促アイデア：期間限定・数量限定で訴求】［※オーナー様へ：セット内容案→季節の花苗3点＋ドリップバッグ5個＋オリジナル鉢など］「母の日限定50セット」「クリスマス限定30セット」など季節に合わせた展開も◎',
      image: '/images/products/20240521-296-1536x1024.jpg',
      icon: Gift,
      buttonText: '限定セットを見る'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="section-padding bg-gray-50 py-20">
      <div className="container-base max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* セクションタイトル */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-gray-700 tracking-wide mb-3">
              Online Store
            </h2>
            <div className="w-20 h-px bg-gray-400 mx-auto"></div>
          </div>

          {/* カテゴリーグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => onCategoryChange(category.id)}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-large transition-all duration-300">
                  {/* 画像部分 - 高さを調整 */}
                  <div className="relative h-64 md:h-72 bg-gray-200 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        // 画像が読み込めない場合は代替表示
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center');
                          const Icon = category.icon;
                          const iconWrapper = document.createElement('div');
                          iconWrapper.className = 'text-gray-400';
                          parent.appendChild(iconWrapper);
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* コンテンツ部分 - パディングとテキストサイズを調整 */}
                  <div className="p-4 md:p-5">
                    <h3 className="text-base md:text-lg font-display font-semibold text-gray-900 mb-2 group-hover:text-good-blue-gold transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">
                      {category.description}
                    </p>
                    <button className="text-xs md:text-sm text-good-blue-gold font-medium hover:text-good-blue-brown transition-colors inline-flex items-center gap-2">
                      {category.buttonText}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryShowcase;