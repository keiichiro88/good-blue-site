import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sprout, Coffee } from 'lucide-react';

interface HeroProps {
  onCategoryChange: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/hero/20240521-2-1024x682.jpg',
      alt: 'GOOD BLUE 外観'
    },
    {
      image: '/images/hero/20240521-122-1536x1024.jpg',
      alt: 'お店の外観'
    },
    {
      image: '/images/hero/20240521-154-1536x1024.jpg',
      alt: '店内の様子'
    },
    {
      image: '/images/hero/20240521-272-rendered-1536x1024.jpg',
      alt: '花と緑に囲まれた空間'
    },
    {
      image: '/images/hero/20240521-345-1536x1024.jpg',
      alt: '自然豊かな環境'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5秒ごとに自動スライド

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden">
      {/* スライド画像 */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* オーバーレイコンテンツ */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            青空の下で過ごす
            <span className="text-good-blue-gold block mt-2">良い時間をあなたに</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            九重・くじゅうの希少な山野草と出会える唯一のフラワーショップ。<br />
            つつましくて上品な草花と、こだわりのカフェで特別な時間を。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onCategoryChange('seedlings')}
              className="flex items-center justify-center space-x-2 bg-good-blue-gold text-white px-8 py-3 rounded-lg hover:bg-good-blue-gold/90 transition-all duration-200 hover:scale-105 shadow-md backdrop-blur-sm bg-opacity-90"
            >
              <Sprout className="h-5 w-5" />
              <span>花苗を見る</span>
            </button>
            <button
              onClick={() => onCategoryChange('coffee')}
              className="flex items-center justify-center space-x-2 bg-white/90 text-good-blue-gold border-2 border-good-blue-gold px-8 py-3 rounded-lg hover:bg-good-blue-gold hover:text-white transition-all duration-200 hover:scale-105 shadow-md backdrop-blur-sm"
            >
              <Coffee className="h-5 w-5" />
              <span>カフェメニュー</span>
            </button>
          </div>
        </div>
      </div>

      {/* 矢印ボタン */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
        aria-label="前のスライド"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-colors duration-200"
        aria-label="次のスライド"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* インジケーター */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;