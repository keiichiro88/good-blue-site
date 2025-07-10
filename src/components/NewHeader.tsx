import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, Menu, Phone, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface NewHeaderProps {
  onCategoryChange: (category: string) => void;
  cartItemCount: number;
  onSearch: (query: string) => void;
  favoritesCount: number;
}

const NewHeader: React.FC<NewHeaderProps> = ({
  onCategoryChange,
  cartItemCount,
  onSearch,
  favoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      {/* トップバー */}
      <div className="bg-good-blue-brown text-white py-2 text-sm">
        <div className="container-base flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:090-3013-7032" className="flex items-center hover:text-good-blue-light transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              090-3013-7032
            </a>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              10:00~16:00（不定休）
            </div>
          </div>
          <div className="hidden md:block text-xs">
            大分県玖珠郡九重町田野1672-18
          </div>
        </div>
      </div>

      {/* メインヘッダー */}
      <header 
        className={clsx(
          "bg-white sticky top-0 z-50 transition-all duration-300",
          isScrolled ? "shadow-medium py-2" : "shadow-soft py-4"
        )}
      >
        <div className="container-base">
          <div className="flex justify-between items-center">
            {/* ロゴ */}
            <div 
              className="cursor-pointer flex items-center"
              onClick={() => onCategoryChange('all')}
            >
              <img 
                src="/images/logo.png" 
                alt="GOOD BLUE FLOWER & CAFE" 
                className={clsx(
                  "transition-all duration-300",
                  isScrolled ? "h-10" : "h-12 md:h-14"
                )}
              />
            </div>

            {/* デスクトップナビゲーション */}
            <nav className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => onCategoryChange('seedlings')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                花苗・植物
              </button>
              <button
                onClick={() => onCategoryChange('coffee')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                カフェメニュー
              </button>
              <button
                onClick={() => onCategoryChange('guide')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                店舗情報
              </button>
              <button
                onClick={() => onCategoryChange('care')}
                className="text-gray-700 hover:text-good-blue-gold font-medium transition-colors"
              >
                お問い合わせ
              </button>
            </nav>

            {/* アイコン群 */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-good-blue-gold transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onCategoryChange('favorites')}
                className="p-2 text-gray-700 hover:text-good-blue-gold transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onCategoryChange('cart')}
                className="p-2 text-gray-700 hover:text-good-blue-gold transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-good-blue-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-good-blue-gold transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* 検索バー（展開式） */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearch} className="py-3 px-4 md:py-4 md:px-0">
                  <div className="relative max-w-xl mx-auto">
                    <input
                      type="text"
                      placeholder="植物名やコーヒーを検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 pr-10 md:px-4 md:py-3 md:pr-12 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 text-gray-600 hover:text-good-blue-gold"
                    >
                      <Search className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* モバイルメニュー */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white shadow-large"
            >
              <nav className="container-base py-4 space-y-4">
                <button
                  onClick={() => {
                    onCategoryChange('seedlings');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-good-blue-gold transition-colors"
                >
                  花苗・植物
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('coffee');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-good-blue-gold transition-colors"
                >
                  カフェメニュー
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('guide');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-good-blue-gold transition-colors"
                >
                  店舗情報
                </button>
                <button
                  onClick={() => {
                    onCategoryChange('care');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-good-blue-gold transition-colors"
                >
                  お問い合わせ
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* お知らせバー */}
      <div 
        className="bg-good-blue-light py-3 text-center cursor-pointer hover:bg-good-blue-gold/20 transition-colors"
        onClick={() => {
          // 季節のおすすめセクションへスクロール
          const element = document.querySelector('.seasonal-section');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <p className="text-sm text-gray-700 flex items-center justify-center gap-2">
          🌻 夏の新作苗入荷しました！季節限定の夏野草もご用意しております
          <span className="text-good-blue-gold">→</span>
        </p>
      </div>
    </>
  );
};

export default NewHeader;