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
      title: 'ちいさな芽から、大きな喜びへ',
      description: '「あ、今日も新しい葉っぱが！」そんな小さな発見が、毎朝の楽しみになります。九重の風を感じながら育った花苗たちが、あなたの日常に優しい変化をお届けします。',
      action: () => onCategoryChange('seedlings'),
      color: 'text-green-600'
    },
    {
      icon: Coffee,
      title: '今日もおつかれさま、の一杯',
      description: '朝の目覚めに、午後のひとやすみに。goodblueのコーヒーは、あなたの「ほっ」とする瞬間に寄り添います。豆の香りに包まれて、ゆっくり深呼吸してみませんか。',
      action: () => onCategoryChange('coffee'),
      color: 'text-good-blue-brown'
    },
    {
      icon: Heart,
      title: 'はじめてでも、だいじょうぶ',
      description: '「この子、うちで育つかな？」そんな不安も一緒に受け止めます。育て方のコツから季節のお手入れまで、まるで隣にいるようにサポート。あなたの「育てたい」気持ちを応援します。',
      action: () => onCategoryChange('guide'),
      color: 'text-red-500'
    },
    {
      icon: Truck,
      title: '九重から、まごころ便',
      description: '一つひとつ丁寧に、「元気に育ってね」の願いを込めて梱包しています。箱を開けた瞬間、九重の爽やかな風を感じていただけるよう、新鮮な状態でお届けします。',
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
              あなたの毎日に、小さな幸せを
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              植物を育てること、美味しいコーヒーを飲むこと。<br className="hidden md:inline" />
              それは特別なことじゃなくて、毎日のちょっとした楽しみ。<br className="hidden md:inline" />
              goodblueは、そんな「いつもの幸せ」をお手伝いします。
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