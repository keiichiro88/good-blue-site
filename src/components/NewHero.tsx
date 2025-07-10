import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface NewHeroProps {
  onCategoryChange: (category: string) => void;
}

const NewHero: React.FC<NewHeroProps> = ({ onCategoryChange }) => {
  const slides = [
    {
      image: '/images/hero/20240521-362-1536x1024.jpg',
      title: '自然と共に育む',
      subtitle: '大分の豊かな土地で育った花苗たち',
      buttonText: '花苗を見る',
      action: () => onCategoryChange('seedlings')
    },
    {
      image: '/images/hero/20240521-272-rendered-1536x1024.jpg',
      title: '特別な一杯を',
      subtitle: '厳選されたコーヒー豆で至福のひととき',
      buttonText: 'カフェメニューを見る',
      action: () => onCategoryChange('coffee')
    },
    {
      image: '/images/hero/20240521-154-1536x1024.jpg',
      title: '季節の花々',
      subtitle: '四季折々の美しい花をお届けします',
      buttonText: '今月のおすすめ',
      action: () => {
        const element = document.querySelector('.seasonal-section');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  ];

  return (
    <section className="relative h-screen">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-white/60 hover:!bg-white"></span>`;
          }
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              {/* 背景画像 */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
              </div>

              {/* コンテンツ */}
              <div className="relative h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center text-white px-4"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 text-shadow-strong">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 font-medium text-shadow">
                    {slide.subtitle}
                  </p>
                  <button
                    onClick={slide.action}
                    className="bg-white text-good-blue-brown px-8 py-4 rounded-lg font-medium hover:bg-good-blue-light transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {slide.buttonText}
                  </button>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* スクロールインジケーター */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
      >
        <ChevronDown className="h-8 w-8" />
      </motion.div>

    </section>
  );
};

export default NewHero;