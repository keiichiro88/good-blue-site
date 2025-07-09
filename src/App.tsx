import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
import Footer from './components/Footer';
import { Phone } from 'lucide-react';
import { products } from './data/products';
import { Product, FilterOptions, CartItem } from './types';

function App() {
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({ category: 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
    setFilters({ 
      category: category === 'all' ? 'all' : category.includes('seedlings') || ['houseplants', 'fruit-trees', 'flowering-trees'].includes(category) ? 'seedlings' : category.includes('coffee') || ['single-origin', 'blends', 'organic'].includes(category) ? 'coffee' : 'all' 
    });
  };

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const showHero = currentCategory === 'all';
  const showProducts = ['all', 'seedlings', 'coffee', 'houseplants', 'fruit-trees', 'flowering-trees', 'single-origin', 'blends', 'organic'].includes(currentCategory);

  return (
    <div className="min-h-screen bg-good-blue-cream">
      <Header 
        onCategoryChange={handleCategoryChange} 
        cartItemCount={cartItemCount}
      />
      
      {showHero && (
        <Hero onCategoryChange={handleCategoryChange} />
      )}

      {showProducts && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
            
            <ProductGrid
              products={products}
              filters={filters}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      )}

      {currentCategory === 'guide' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-good-blue-brown mb-8 text-center">アクセス</h2>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-good-blue-brown mb-4">店舗情報</h3>
                <p className="text-good-blue-brown/80 mb-4">
                  花とカフェ goodblue (グッドブルー)<br />
                  〒879-4911<br />
                  大分県玖珠郡九重町田野1672-18<br />
                  TEL: 090-3013-7032
                </p>
                <p className="text-sm text-good-blue-brown/60">
                  ※お食事処「くじゅう野の花の郷」に隣接
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-good-blue-brown mb-4">営業時間</h3>
                <p className="text-good-blue-brown/80 mb-4">
                  10:00 - 16:00<br />
                  店休日：不定休
                </p>
                <p className="text-sm text-good-blue-brown/60">
                  ※季節や天候により営業時間が変更になる場合がございます。<br />
                  お越しの際は事前にお電話でご確認ください。
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-good-blue-gold/20">
              <h3 className="text-xl font-semibold text-good-blue-brown mb-4">交通アクセス</h3>
              <p className="text-good-blue-brown/80">
                九重の大自然に囲まれた素晴らしい環境でお待ちしております。<br />
                お車でお越しの際は、「くじゅう野の花の郷」を目印にお越しください。
              </p>
            </div>
          </div>
        </div>
      )}

      {currentCategory === 'care' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-good-blue-brown mb-8 text-center">お問い合わせ</h2>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <p className="text-good-blue-brown/80 mb-6">
              お花のご注文、カフェのご予約、その他ご不明な点がございましたら、<br />
              お気軽にお問い合わせください。
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-good-blue-gold" />
                <div>
                  <p className="font-semibold text-good-blue-brown">090-3013-7032</p>
                  <p className="text-sm text-good-blue-brown/60">受付時間: 10:00 - 16:00</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-good-blue-light rounded-lg">
                <p className="text-sm text-good-blue-brown/80">
                  <strong>ご注文について</strong><br />
                  ・ブーケやアレンジメントは、ご希望をお伺いしてお作りいたします<br />
                  ・季節の花の入荷状況により、ご希望に添えない場合がございます<br />
                  ・カフェのご予約も承っております
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;