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
          理想の庭と
          <span className="text-good-blue-gold block">コーヒーを育てよう</span>
        </h1>
        <p className="text-xl text-good-blue-brown/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          品質と持続可能性を重視する愛好家のために厳選された、
          プレミアムな苗木と職人のコーヒー豆をお届けします。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => onCategoryChange('seedlings')}
            className="flex items-center justify-center space-x-2 bg-good-blue-gold text-white px-8 py-3 rounded-lg hover:bg-good-blue-gold/90 transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Sprout className="h-5 w-5" />
            <span>苗木を見る</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => onCategoryChange('coffee')}
            className="flex items-center justify-center space-x-2 bg-white text-good-blue-gold border-2 border-good-blue-gold px-8 py-3 rounded-lg hover:bg-good-blue-gold hover:text-white transition-all duration-200 hover:scale-105 shadow-md"
          >
            <Coffee className="h-5 w-5" />
            <span>コーヒーを見る</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <Sprout className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">Premium Quality</h3>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">プレミアム品質</h3>
            <p className="text-good-blue-brown/70">厳選された苗木と倫理的に調達されたコーヒー豆</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <Coffee className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">持続可能な調達</h3>
            <p className="text-good-blue-brown/70">種から一杯まで環境に配慮した取り組み</p>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-4 shadow-md">
              <ArrowRight className="h-8 w-8 text-good-blue-gold" />
            </div>
            <h3 className="text-lg font-semibold text-good-blue-brown mb-2">専門家のガイダンス</h3>
            <p className="text-good-blue-brown/70">初心者向けの包括的な栽培・抽出ガイド</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;