import React from 'react';
import { MapPin, Phone, Clock, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-good-blue-brown text-good-blue-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 店舗情報 */}
          <div>
            <img src="/images/logo.png" alt="GOOD BLUE FLOWER & CAFE" className="h-16 w-auto mb-4 filter brightness-0 invert" />
            <p className="text-sm text-good-blue-cream/80 mb-4">
              花とカフェ goodblue (グッドブルー)<br />
              花とコーヒーの香りに包まれた、特別な時間をお届けします。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* アクセス情報 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">アクセス</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-good-blue-gold mt-0.5" />
                <div>
                  <p className="text-sm text-good-blue-cream/80">
                    〒879-4911<br />
                    大分県玖珠郡九重町田野1672-18<br />
                    <span className="text-xs">※お食事処「くじゅう野の花の郷」に隣接</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-good-blue-gold" />
                <p className="text-sm text-good-blue-cream/80">090-3013-7032</p>
              </div>
            </div>
          </div>

          {/* 営業時間 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">営業時間</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-good-blue-gold mt-0.5" />
                <div className="text-sm text-good-blue-cream/80">
                  <p><span className="font-medium">営業時間</span> 10:00 - 16:00</p>
                  <p><span className="font-medium">店休日</span> 不定休</p>
                  <p className="mt-2 text-good-blue-cream/60">
                    ※詳しくはお問い合わせください
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* リンク */}
          <div>
            <h3 className="text-lg font-semibold mb-4">インフォメーション</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  はじめての方へ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  配送について
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  返品・交換について
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  よくあるご質問
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  お問い合わせ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-good-blue-cream/80 hover:text-good-blue-cream transition-colors">
                  会社概要
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="mt-8 pt-8 border-t border-good-blue-cream/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-good-blue-cream/60">
              © 2025 GOOD BLUE FLOWER & CAFE. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="text-sm text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                利用規約
              </a>
              <a href="#" className="text-sm text-good-blue-cream/60 hover:text-good-blue-cream transition-colors">
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;