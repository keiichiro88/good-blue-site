import React from 'react';
import { Phone, MapPin, Clock, Instagram } from 'lucide-react';

interface NewFooterProps {
  onCategoryChange?: (category: string) => void;
}

const NewFooter: React.FC<NewFooterProps> = ({ onCategoryChange }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-good-blue-brown text-good-blue-cream">
      {/* メインフッター */}
      <div className="container-base py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* ショップ情報 */}
          <div>
            <img src="/images/logo.png" alt="goodblue" className="h-16 w-auto mb-3 filter brightness-0 invert" />
            <h3 className="text-lg font-display font-semibold mb-3">花とカフェ goodblue</h3>
            <p className="text-good-blue-cream/80 text-sm mb-4 leading-relaxed">
              大分の自然豊かな環境で育った花苗と、
              こだわりのコーヒーをお届けする
              花とカフェのお店です。
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/good_blue77" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-good-blue-cream hover:text-good-blue-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* 営業情報 */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">営業時間</h3>
            <div className="space-y-3 text-sm text-good-blue-cream/80">
              <div className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-good-blue-cream" />
                <div>
                  <p>10:00 - 16:00</p>
                  <p className="text-xs mt-1">店休日：不定休</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-good-blue-cream" />
                <p>090-3013-7032</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-good-blue-cream" />
                <p>大分県玖珠郡九重町田野1672-18</p>
              </div>
            </div>
          </div>

          {/* ショップメニュー */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">ショップ</h3>
            <ul className="space-y-2 text-sm text-good-blue-cream/80">
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">花苗・植物</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">カフェメニュー</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">季節のおすすめ</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">ギフトセット</a>
              </li>
            </ul>
          </div>

          {/* お客様サポート */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">サポート</h3>
            <ul className="space-y-2 text-sm text-good-blue-cream/80">
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">ご利用ガイド</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">送料について</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">お支払い方法</a>
              </li>
              <li>
                <a href="#" className="hover:text-good-blue-cream transition-colors">よくあるご質問</a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); onCategoryChange?.('privacy'); }}
                  className="hover:text-good-blue-cream transition-colors cursor-pointer"
                >
                  プライバシーポリシー
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); onCategoryChange?.('terms'); }}
                  className="hover:text-good-blue-cream transition-colors cursor-pointer"
                >
                  利用規約
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); onCategoryChange?.('legal'); }}
                  className="hover:text-good-blue-cream transition-colors cursor-pointer"
                >
                  特定商取引法に基づく表記
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ボトムフッター */}
      <div className="border-t border-good-blue-cream/20">
        <div className="container-base py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-good-blue-cream/60">
            <p>&copy; {currentYear} 花とカフェ goodblue (グッドブルー）. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Made with ❤️ in Oita, Japan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;