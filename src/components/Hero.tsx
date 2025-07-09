import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onCategoryChange: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryChange }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: '/images/hero/20240521-362-1536x1024.jpg',
      alt: 'GOOD BLUE 店内の様子'
    },
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
    }, 4000); // 4秒ごとに自動スライド

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
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* スライド画像 - 元の比率3:2を維持 */}
      <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* 矢印ボタン */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 text-good-blue-brown p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-md"
        aria-label="前のスライド"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 text-good-blue-brown p-2 rounded-full hover:bg-white transition-colors duration-200 shadow-md"
        aria-label="次のスライド"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* インジケーター */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-good-blue-gold w-6'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;