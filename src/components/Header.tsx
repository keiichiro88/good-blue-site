import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

interface HeaderProps {
  onCategoryChange: (category: string) => void;
  cartItemCount: number;
}

const Header: React.FC<HeaderProps> = ({ onCategoryChange, cartItemCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = {
    seedlings: [
      { id: 'houseplants', name: '鉢花・観葉植物' },
      { id: 'flowering-trees', name: 'アレンジメント' },
      { id: 'preserved', name: 'プリザーブドフラワー' }
    ],
    coffee: [
      { id: 'single-origin', name: 'コーヒー' },
      { id: 'blends', name: 'ケーキ・スイーツ' },
      { id: 'organic', name: 'ハーブティー' }
    ]
  };

  return (
    <header className="bg-good-blue-cream shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/images/logo.png" alt="GOOD BLUE FLOWER & CAFE" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button
                className="text-good-blue-brown hover:text-good-blue-gold transition-colors duration-200 font-medium"
                onClick={() => onCategoryChange('seedlings')}
              >
                フラワー
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.seedlings.map((cat) => (
                  <button
                    key={cat.id}
                    className="block w-full text-left px-4 py-2 text-sm text-good-blue-brown hover:bg-good-blue-light hover:text-good-blue-gold transition-colors duration-200"
                    onClick={() => onCategoryChange(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group">
              <button
                className="text-good-blue-brown hover:text-good-blue-gold transition-colors duration-200 font-medium"
                onClick={() => onCategoryChange('coffee')}
              >
                カフェ
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.coffee.map((cat) => (
                  <button
                    key={cat.id}
                    className="block w-full text-left px-4 py-2 text-sm text-good-blue-brown hover:bg-good-blue-light hover:text-good-blue-gold transition-colors duration-200"
                    onClick={() => onCategoryChange(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
              onClick={() => onCategoryChange('guide')}
            >
              アクセス
            </button>
            <button
              className="text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
              onClick={() => onCategoryChange('care')}
            >
              お問い合わせ
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="植物・コーヒーを検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-good-blue-brown hover:text-good-blue-gold transition-colors duration-200">
              <User className="h-6 w-6" />
            </button>
            <button className="p-2 text-good-blue-brown hover:text-good-blue-gold transition-colors duration-200 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-good-blue-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 text-good-blue-brown hover:text-good-blue-gold transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="花・カフェメニューを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <button
                  className="block w-full text-left text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
                  onClick={() => { onCategoryChange('seedlings'); setIsMenuOpen(false); }}
                >
                  フラワー
                </button>
                <button
                  className="block w-full text-left text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
                  onClick={() => { onCategoryChange('coffee'); setIsMenuOpen(false); }}
                >
                  カフェ
                </button>
                <button
                  className="block w-full text-left text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
                  onClick={() => { onCategoryChange('guide'); setIsMenuOpen(false); }}
                >
                  アクセス
                </button>
                <button
                  className="block w-full text-left text-dark-brown hover:text-sage-green transition-colors duration-200 font-medium"
                  onClick={() => { onCategoryChange('care'); setIsMenuOpen(false); }}
                >
                  お問い合わせ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;