import React from 'react';
import { Sprout, Coffee } from 'lucide-react';

interface HeroContentProps {
  onCategoryChange: (category: string) => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onCategoryChange }) => {
  return (
    <div className="relative bg-gradient-to-b from-good-blue-cream to-white py-16 px-4 overflow-hidden">
      {/* 右上に小さな装飾 */}
      <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M40.7,-69.8C52.3,-62.5,60.9,-50.2,67.6,-36.8C74.3,-23.4,79.1,-8.9,78.7,5.7C78.3,20.3,72.7,35,63.1,46.9C53.5,58.8,40,67.9,24.8,73.2C9.7,78.5,-7.1,80,-23.1,76.3C-39.1,72.6,-54.3,63.7,-65.3,51.2C-76.3,38.7,-83.1,22.6,-84.5,5.8C-85.9,-11,-81.9,-28.5,-73.3,-43.3C-64.7,-58.1,-51.5,-70.2,-36.8,-75.8C-22.1,-81.4,-5.9,-80.5,8.8,-74.9C23.5,-69.3,29.1,-77.1,40.7,-69.8Z" 
            transform="translate(100 100)" 
            className="fill-good-blue-gold"
          />
        </svg>
      </div>
      {/* 左下に小さな装飾 */}
      <div className="absolute bottom-4 left-4 w-20 h-20 opacity-10">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M43.5,-76.7C55.8,-68.5,65,-55.7,71.8,-41.8C78.5,-27.9,82.8,-12.9,82.3,2.3C81.8,17.5,76.5,33.5,68.1,47.2C59.7,60.9,48.2,72.3,34.1,78.8C20,85.3,3.3,86.9,-13.5,84.4C-30.3,81.9,-47.2,75.3,-60.7,64.5C-74.2,53.7,-84.3,38.7,-88.6,21.8C-92.9,4.9,-91.4,-13.9,-85.3,-30.8C-79.2,-47.7,-68.5,-62.7,-54.5,-70C-40.5,-77.3,-23.2,-76.9,-7.2,-71.6C8.8,-66.3,31.2,-84.9,43.5,-76.7Z" 
            transform="translate(100 100)" 
            className="fill-good-blue-brown"
          />
        </svg>
      </div>
      <div className="relative max-w-7xl mx-auto text-center z-10">
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