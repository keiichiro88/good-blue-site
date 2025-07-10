import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Menu, User, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface EnhancedHeaderProps {
  onCategoryChange: (category: string) => void;
  cartItemCount: number;
  onSearch: (query: string) => void;
  favoritesCount: number;
}

const EnhancedHeader: React.FC<EnhancedHeaderProps> = ({
  onCategoryChange,
  cartItemCount,
  onSearch,
  favoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const categories = {
    coffee: {
      title: 'コーヒー',
      subcategories: [
        { id: 'single-origin', name: 'シングルオリジン' },
        { id: 'blends', name: 'ブレンド' },
        { id: 'organic', name: 'オーガニック' },
        { id: 'drip-bags', name: 'ドリップバッグ' },
        { id: 'gift-sets', name: 'ギフトセット' }
      ]
    },
    seedlings: {
      title: '花苗・植物',
      subcategories: [
        { id: 'houseplants', name: '観葉植物' },
        { id: 'flowering-trees', name: '花木' },
        { id: 'fruit-trees', name: '果樹' },
        { id: 'seasonal', name: '季節の苗' },
        { id: 'rare-plants', name: '希少植物' }
      ]
    }
  };

  return (
    <>
      {/* トップバー - より情報豊富に */}
      <div className="bg-good-blue-brown text-white">
        <div className="container-base">
          <div className="flex justify-between items-center py-2 text-xs">
            {/* 左側：基本情報 */}
            <div className="flex items-center divide-x divide-white/30">
              <span className="pr-3">花とカフェ goodblue (グッドブルー）</span>
              <span className="px-3">〒879-4911 大分県玖珠郡九重町田野1672-18</span>
              <span className="px-3">営業時間：10:00~16:00（不定休）</span>
              <span className="pl-3">TEL: 090-3013-7032</span>
            </div>
            
            {/* 右側：クイックリンク */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="hover:text-good-blue-light transition-colors">お問い合わせ</button>
              <button className="hover:text-good-blue-light transition-colors">定期購入について</button>
              <button className="hover:text-good-blue-light transition-colors">送料・お支払いについて</button>
            </div>
          </div>
        </div>
      </div>

      {/* メインヘッダー */}
      <header className="bg-white shadow-soft sticky top-0 z-50">
        <div className="container-base">
          {/* 上段：ロゴと検索、アカウント */}
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            {/* ロゴエリア */}
            <div 
              className="cursor-pointer flex items-center space-x-4"
              onClick={() => onCategoryChange('all')}
            >
              <img 
                src="/images/logo.png" 
                alt="GOOD BLUE" 
                className="h-12 md:h-14"
              />
              <div className="hidden md:block">
                <h1 className="text-lg font-display font-semibold text-gray-800">花とカフェ goodblue</h1>
                <p className="text-xs text-gray-600">大分の自然で育った花苗とこだわりのコーヒー</p>
              </div>
            </div>

            {/* 検索バー（常時表示） */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="何をお探しですか？"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-good-blue-gold"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* アカウント・カート */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-good-blue-gold transition-colors">
                <User className="h-5 w-5" />
                <span className="text-sm">マイページ</span>
              </button>
              
              <button
                onClick={() => onCategoryChange('favorites')}
                className="p-2 text-gray-700 hover:text-good-blue-gold transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onCategoryChange('cart')}
                className="flex items-center space-x-2 bg-good-blue-gold text-white px-4 py-2 rounded-full hover:bg-good-blue-brown transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="text-sm font-medium">カートを見る</span>
                {cartItemCount > 0 && (
                  <span className="bg-white text-good-blue-gold text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-good-blue-gold transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* 下段：カテゴリーナビゲーション */}
          <nav className="hidden md:block">
            <div className="flex items-center justify-center space-x-8 py-3">
              {/* オンラインストア ドロップダウン */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('store')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => onCategoryChange('store')}
                  className="flex items-center space-x-1 text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
                >
                  <span>オンラインストア</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <AnimatePresence>
                  {activeDropdown === 'store' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-large py-2 z-50"
                    >
                      <div className="grid grid-cols-2 gap-4 p-4">
                        {/* コーヒーカテゴリー */}
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">コーヒー</h3>
                          <div className="space-y-2">
                            {categories.coffee.subcategories.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  onCategoryChange(sub.id);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left text-sm text-gray-600 hover:text-good-blue-gold hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        {/* 花苗・植物カテゴリー */}
                        <div>
                          <h3 className="font-semibold text-gray-700 mb-3 pb-2 border-b border-gray-200">花苗・植物</h3>
                          <div className="space-y-2">
                            {categories.seedlings.subcategories.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  onCategoryChange(sub.id);
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left text-sm text-gray-600 hover:text-good-blue-gold hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* 全商品を見るボタン */}
                      <div className="border-t border-gray-100 px-4 pt-3 pb-2">
                        <button
                          onClick={() => {
                            onCategoryChange('all');
                            setActiveDropdown(null);
                          }}
                          className="w-full text-center text-sm text-good-blue-gold hover:text-good-blue-brown font-medium transition-colors"
                        >
                          すべての商品を見る →
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => onCategoryChange('guide')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                店舗案内
              </button>

              <button
                onClick={() => onCategoryChange('care')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                育て方・お手入れ
              </button>

              <button className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors">
                ブログ
              </button>

              <button className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors">
                インタビュー
              </button>

              <button className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors">
                業務用卸売販売
              </button>
            </div>
          </nav>
        </div>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="container-base py-4 space-y-2">
                <button
                  onClick={() => {
                    onCategoryChange('store');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  オンラインストア
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('coffee');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  コーヒーについて
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('seedlings');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  花苗・植物
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('guide');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  店舗案内
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* お知らせバー */}
      <div 
        className="bg-gradient-to-r from-good-blue-light to-good-blue-gold/20 py-3 text-center cursor-pointer hover:from-good-blue-gold/30 hover:to-good-blue-light transition-all"
        onClick={() => {
          const element = document.querySelector('.seasonal-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <p className="text-sm text-gray-800 font-medium flex items-center justify-center gap-2">
          <span className="text-lg">🌻</span>
          <span>夏の新作苗入荷しました！季節限定の夏野草もご用意しております</span>
          <span className="inline-block ml-1 animate-pulse">→</span>
        </p>
      </div>
    </>
  );
};

export default EnhancedHeader;