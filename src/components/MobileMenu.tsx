import React, { useState } from 'react';
import { X, Home, Flower2, Coffee, MapPin, Phone, Search } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onCategoryChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleNavigate = (category: string) => {
    onCategoryChange(category);
    onClose();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
      onClose();
    }
  };

  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* スライドメニュー */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-good-blue-gold/20">
          <h2 className="text-lg font-semibold text-good-blue-brown">メニュー</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-good-blue-light rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-good-blue-brown" />
          </button>
        </div>

        {/* 検索バー */}
        <div className="p-4 border-b border-good-blue-gold/20">
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="商品を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-good-blue-gold focus:border-transparent"
              />
            </div>
          </form>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handleNavigate('all')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-good-blue-brown hover:bg-good-blue-light rounded-lg transition-colors"
              >
                <Home className="h-5 w-5" />
                <span>ホーム</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('seedlings')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-good-blue-brown hover:bg-good-blue-light rounded-lg transition-colors"
              >
                <Flower2 className="h-5 w-5" />
                <span>花苗</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('coffee')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-good-blue-brown hover:bg-good-blue-light rounded-lg transition-colors"
              >
                <Coffee className="h-5 w-5" />
                <span>カフェ</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('guide')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-good-blue-brown hover:bg-good-blue-light rounded-lg transition-colors"
              >
                <MapPin className="h-5 w-5" />
                <span>アクセス</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigate('care')}
                className="w-full flex items-center space-x-3 px-4 py-3 text-good-blue-brown hover:bg-good-blue-light rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>お問い合わせ</span>
              </button>
            </li>
          </ul>
        </nav>

        {/* 店舗情報 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-good-blue-gold/20">
          <p className="text-sm text-good-blue-brown/70">
            営業時間: 10:00 - 16:00<br />
            TEL: 090-3013-7032
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;