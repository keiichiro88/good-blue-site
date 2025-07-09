import React from 'react';
import { Search, X } from 'lucide-react';
import ProductCard from './ProductCard';
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
  // 検索クエリに基づいて商品をフィルタリング
  const searchResults = products.filter(product => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(query))
    );
  });

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
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