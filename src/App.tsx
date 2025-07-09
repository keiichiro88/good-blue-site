import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import FilterPanel from './components/FilterPanel';
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
          <h2 className="text-3xl font-bold text-dark-brown mb-8 text-center">初心者ガイド</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-dark-brown mb-4">植物の基本的なお手入れ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 適切な照明条件の場所を選ぶ</li>
                <li>• 一定の水やりを心がけ、水のやりすぎに注意</li>
                <li>• 植物に適した水はけの良い土を使用</li>
                <li>• 害虫や病気を定期的にチェック</li>
                <li>• 成長を促すために必要に応じて剪定</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-dark-brown mb-4">コーヒー抽出のコツ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 焙煎から2-4週間以内の新鮮な豆を使用</li>
                <li>• 抽出直前に豆を挽く</li>
                <li>• 適切な水温（90-96℃）を保つ</li>
                <li>• 正しいコーヒーと水の比率を守る</li>
                <li>• 密閉容器で豆を保存</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {currentCategory === 'care' && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-dark-brown mb-8 text-center">ケア用品</h2>
          <div className="text-center">
            <p className="text-gray-600 text-lg">
              プレミアムなケア用品を近日公開予定！オーガニック肥料から専門的なコーヒーアクセサリーまで。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;