import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flower2, Coffee, Heart, Truck } from 'lucide-react';

interface FeatureSectionProps {
  onCategoryChange: (category: string) => void;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ onCategoryChange }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const features = [
    {
      icon: Flower2,
      title: '厳選された花苗',
      description: '地元大分で丁寧に育てられた、健康で美しい花苗を取り揃えています',
      action: () => onCategoryChange('seedlings'),
      color: 'text-green-600'
    },
    {
      icon: Coffee,
      title: 'こだわりのカフェ',
      description: '厳選されたコーヒー豆と手作りスイーツで、至福のひとときを',
      action: () => onCategoryChange('coffee'),
      color: 'text-good-blue-brown'
    },
    {
      icon: Heart,
      title: '心を込めたサービス',
      description: 'お客様一人ひとりに寄り添い、最適なご提案をいたします',
      action: () => onCategoryChange('guide'),
      color: 'text-red-500'
    },
    {
      icon: Truck,
      title: '安心の配送',
      description: '大切な商品を、確実にお届けします。配送料計算も簡単です',
      action: () => onCategoryChange('all'),
      color: 'text-blue-600'
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
    <section className="section-padding bg-white">
      <div className="container-base">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="text-center mb-12">
            <h2 className="heading-secondary text-good-blue-brown mb-4">
              GOOD BLUEの特徴
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              私たちは、花と緑、そして美味しいコーヒーを通じて
              お客様の日常に彩りと安らぎをお届けします
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center group cursor-pointer"
                  onClick={feature.action}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gray-50 group-hover:bg-good-blue-light transition-colors duration-300 mb-4 ${feature.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureSection;