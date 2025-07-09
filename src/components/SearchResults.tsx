import React, { useState, useMemo } from 'react';
import { Search, X, Grid, List, SortAsc } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductListView from './ProductListView';
import { Product } from '../types';

interface SearchResultsProps {
  searchQuery: string;
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClearSearch: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  searchQuery,
  products,
  onProductClick,
  onAddToCart,
  onClearSearch
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 検索クエリに基づいて商品をフィルタリングとソート
  const searchResults = useMemo(() => {
    const filtered = products.filter(product => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.subcategory && product.subcategory.toLowerCase().includes(query))
      );
    });

    // ソート処理
    return filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];
      
      if (sortBy === 'name') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [products, searchQuery, sortBy, sortOrder]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 検索ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Search className="h-6 w-6 text-good-blue-gold" />
            <h1 className="text-2xl font-bold text-good-blue-brown">
              「{searchQuery}」の検索結果
            </h1>
          </div>
          <button
            onClick={onClearSearch}
            className="flex items-center gap-2 text-good-blue-brown hover:text-good-blue-gold transition-colors"
          >
            <X className="h-4 w-4" />
            <span>検索をクリア</span>
          </button>
        </div>
        
        <p className="text-good-blue-brown/60">
          {searchResults.length}件の商品が見つかりました
        </p>
      </div>

      {/* ソートとビューモード切替 */}
      {searchResults.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <SortAsc className="h-4 w-4 text-gray-500 hidden sm:block" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as 'name' | 'price' | 'rating');
                setSortOrder(order as 'asc' | 'desc');
              }}
              className="text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:ring-2 focus:ring-good-blue-gold focus:border-transparent w-full sm:w-auto"
            >
              <option value="name-asc">名前順（あ-ん）</option>
              <option value="name-desc">名前順（ん-あ）</option>
              <option value="price-asc">価格の安い順</option>
              <option value="price-desc">価格の高い順</option>
              <option value="rating-desc">評価の高い順</option>
              <option value="rating-asc">評価の低い順</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' 
                  ? 'bg-good-blue-gold text-white' 
                  : 'text-gray-600 hover:text-good-blue-brown'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' 
                  ? 'bg-good-blue-gold text-white' 
                  : 'text-gray-600 hover:text-good-blue-brown'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 検索結果 */}
      {searchResults.length === 0 ? (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-good-blue-brown/20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-good-blue-brown mb-2">
            該当する商品が見つかりませんでした
          </h2>
          <p className="text-good-blue-brown/60 mb-8">
            別のキーワードで検索してみてください
          </p>
          <button
            onClick={onClearSearch}
            className="bg-good-blue-gold text-white px-6 py-2 rounded-lg hover:bg-good-blue-gold/90 transition-colors"
          >
            トップページに戻る
          </button>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {searchResults.map(product => (
            viewMode === 'grid' ? (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            ) : (
              <ProductListView
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
              />
            )
          ))}
        </div>
      )}

      {/* 検索のヒント */}
      <div className="mt-12 p-6 bg-good-blue-light/50 rounded-lg">
        <h3 className="font-semibold text-good-blue-brown mb-3">検索のヒント</h3>
        <ul className="space-y-2 text-sm text-good-blue-brown/80">
          <li>• 商品名の一部でも検索できます（例：「シャクヤク」「コーヒー」）</li>
          <li>• カテゴリー名でも検索可能です（例：「山野草」「カフェ」）</li>
          <li>• 特徴で検索してみてください（例：「希少」「オーガニック」）</li>
          <li>• ひらがな・カタカナ・漢字どれでも検索できます</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;