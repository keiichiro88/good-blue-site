import React from 'react';
import { ArrowRight, Sprout, Coffee } from 'lucide-react';

interface HeroProps {
  onCategoryChange: (category: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onCategoryChange }) => {
  return (
    <div className="bg-gradient-to-r from-good-blue-gold/20 to-good-blue-gold/10 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-good-blue-brown mb-6 leading-tight">
          九重の大自然に囲まれた
          <span className="text-good-blue-gold block">花とカフェの空間</span>
        </h1>
        <p className="text-xl text-good-blue-brown/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          くじゅう野の花の郷に隣接する、花とコーヒーの香りに包まれた癒しの空間。<br />
          季節の花々と、こだわりのコーヒーで特別なひとときをお過ごしください。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onCategoryChange('seedlings')}
            className="flex items-center justify-center space-x-2 bg-good-blue-gold text-white px-8 py-3 rounded-lg hover:bg-good-blue-gold/90 transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Sprout className="h-5 w-5" />
            <span>フラワーショップ</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCategoryChange('coffee')}
            className="flex items-center justify-center space-x-2 bg-white text-good-blue-gold border-2 border-good-blue-gold px-8 py-3 rounded-lg hover:bg-good-blue-gold hover:text-white transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Coffee className="h-5 w-5" />
            <span>カフェメニュー</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <Sprout className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">季節の花々</h3>
            <p className="text-good-blue-brown/70">九重の大自然で育った新鮮な花と観葉植物</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <Coffee className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">こだわりのカフェ</h3>
            <p className="text-good-blue-brown/70">厳選したコーヒー豆と手作りスイーツ</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <ArrowRight className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">癒しの空間</h3>
            <p className="text-good-blue-brown/70">くじゅうの自然に囲まれた特別な時間</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;