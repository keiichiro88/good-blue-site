import React from 'react';
import { Sprout, Coffee, Dog } from 'lucide-react';

interface HeroContentProps {
  onCategoryChange: (category: string) => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCategoryChange }) => {
  return (
    <div className="relative bg-white py-12 md:py-16 px-4 overflow-hidden">
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* ロゴ */}
        <div className="mb-8">
          <img 
            src="/images/logo.png" 
            alt="GOOD BLUE FLOWER & CAFE" 
            className="h-24 md:h-32 w-auto mx-auto"
          />
        </div>
        
        {/* WELCOME with decorations */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            <img 
              src="/images/header_deco_l.png" 
              alt="" 
              className="h-12 md:h-16 w-auto opacity-50"
            />
            <h2 className="text-good-blue-gold text-lg md:text-xl tracking-[0.3em] font-light">
              WELCOME
            </h2>
            <img 
              src="/images/header_deco_r.png" 
              alt="" 
              className="h-12 md:h-16 w-auto opacity-50"
            />
          </div>
        </div>
        
        {/* メインメッセージ */}
        <h1 className="text-2xl md:text-3xl font-bold text-good-blue-brown mb-6">
          九重夢大吊橋の近く
        </h1>
        
        {/* サブメッセージ */}
        <div className="relative mb-8 md:mb-12">
          <span className="inline-block bg-good-blue-light/50 px-8 py-3 text-xl md:text-2xl font-bold text-good-blue-brown">
            ドッグランのある花屋＆カフェ
          </span>
        </div>
        
        <p className="text-sm md:text-base text-good-blue-brown/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          九重の大自然で育った希少な山野草を、オンラインで全国へお届けします。<br />
          遠方の方にも、特別な花との出会いをお楽しみいただけます。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 md:mb-12 px-4">
          <button
            onClick={() => onCategoryChange('seedlings')}
            className="flex items-center justify-center space-x-2 bg-good-blue-gold text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-good-blue-gold/90 transition-all duration-200 hover:scale-105 shadow-md text-sm sm:text-base"
          >
            <Sprout className="h-4 sm:h-5 w-4 sm:w-5" />
            <span>花苗を見る</span>
          </button>
          <button
            onClick={() => onCategoryChange('coffee')}
            className="flex items-center justify-center space-x-2 bg-white text-good-blue-gold border-2 border-good-blue-gold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-good-blue-gold hover:text-white transition-all duration-200 hover:scale-105 shadow-md text-sm sm:text-base"
          >
            <Coffee className="h-4 sm:h-5 w-4 sm:w-5" />
            <span>カフェメニュー</span>
          </button>
        </div>

        {/* 3つの特徴 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-good-blue-gold/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Sprout className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">希少な山野草</h3>
            <p className="text-sm text-good-blue-brown/70">九重の大自然で育った上品な草花</p>
          </div>
          <div className="text-center">
            <div className="bg-good-blue-gold/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Coffee className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">こだわりのカフェ</h3>
            <p className="text-sm text-good-blue-brown/70">手作りスイーツとコーヒー</p>
          </div>
          <div className="text-center">
            <div className="bg-good-blue-gold/10 rounded-full p-4 w-16 h-16 mx-auto mb-4">
              <Dog className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">ドッグラン完備</h3>
            <p className="text-sm text-good-blue-brown/70">愛犬と楽しむ青空の時間</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;