import React, { useState, useMemo } from 'react';
import { Grid, List, SortAsc } from 'lucide-react';
import ProductCard from './ProductCard';
import ProductListView from './ProductListView';
import { Product, FilterOptions } from '../types';

interface ProductGridProps {
  products: Product[];
  filters: FilterOptions;
  onAddToCart: (product: Product) => void;
  onProductClick?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: (productId: string) => boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, filters, onAddToCart, onProductClick, onToggleFavorite, isFavorite }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
      );
    }

    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0) {
      filtered = filtered.filter(product => 
        product.difficulty && filters.difficulty!.includes(product.difficulty)
      );
    }

    // Roast level filter
    if (filters.roastLevel && filters.roastLevel.length > 0) {
      filtered = filtered.filter(product => 
        product.roastLevel && filters.roastLevel!.includes(product.roastLevel)
      );
    }

    // Organic filter
    if (filters.organic) {
      filtered = filtered.filter(product => product.organic);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Sort products
    filtered.sort((a, b) => {
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

    return filtered;
  }, [products, filters, sortBy, sortOrder]);

  return (
    <div className="flex-1">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {filteredProducts.length}件の商品
          </span>
          
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

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">条件に一致する商品が見つかりませんでした。</p>
          <p className="text-gray-400 text-sm mt-2">フィルターや検索条件を調整してみてください。</p>
        </div>
      ) : (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredProducts.map(product => (
            viewMode === 'grid' ? (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite ? isFavorite(product.id) : false}
              />
            ) : (
              <ProductListView
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onProductClick={onProductClick}
                onToggleFavorite={onToggleFavorite}
                isFavorite={isFavorite ? isFavorite(product.id) : false}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;