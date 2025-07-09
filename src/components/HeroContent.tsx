import React from 'react';
import { Sprout, Coffee } from 'lucide-react';

interface HeroContentProps {
  onCategoryChange: (category: string) => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCategoryChange }) => {
  return (
    <div className="bg-gradient-to-b from-good-blue-cream to-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-good-blue-brown mb-6 leading-tight">
          青空の下で過ごす
          <span className="text-good-blue-gold block mt-2">良い時間をあなたに</span>
        </h1>
        <p className="text-lg md:text-xl text-good-blue-brown/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          九重・くじゅうの希少な山野草と出会える唯一のフラワーショップ。<br />
          つつましくて上品な草花と、こだわりのカフェで特別な時間を。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onCategoryChange('seedlings')}
            className="flex items-center justify-center space-x-2 bg-good-blue-gold text-white px-8 py-3 rounded-lg hover:bg-good-blue-gold/90 transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Sprout className="h-5 w-5" />
            <span>花苗を見る</span>
          </button>
          <button
            onClick={() => onCategoryChange('coffee')}
            className="flex items-center justify-center space-x-2 bg-white text-good-blue-gold border-2 border-good-blue-gold px-8 py-3 rounded-lg hover:bg-good-blue-gold hover:text-white transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Coffee className="h-5 w-5" />
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
              <svg className="h-8 w-8 text-good-blue-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
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