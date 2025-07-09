import React from 'react';
import { Filter, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const handlePriceChange = (min: number, max: number) => {
    onFiltersChange({
      ...filters,
      priceRange: [min, max]
    });
  };

  const handleDifficultyChange = (difficulty: string) => {
    const currentDifficulties = filters.difficulty || [];
    const newDifficulties = currentDifficulties.includes(difficulty)
      ? currentDifficulties.filter(d => d !== difficulty)
      : [...currentDifficulties, difficulty];
    
    onFiltersChange({
      ...filters,
      difficulty: newDifficulties
    });
  };

  const handleRoastLevelChange = (roastLevel: string) => {
    const currentRoastLevels = filters.roastLevel || [];
    const newRoastLevels = currentRoastLevels.includes(roastLevel)
      ? currentRoastLevels.filter(r => r !== roastLevel)
      : [...currentRoastLevels, roastLevel];
    
    onFiltersChange({
      ...filters,
      roastLevel: newRoastLevels
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'all'
    });
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={onToggle}
        className="md:hidden flex items-center space-x-2 px-4 py-2 bg-white border border-good-blue-gold/30 rounded-lg hover:bg-good-blue-light transition-colors duration-200"
      >
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </button>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block bg-white rounded-lg shadow-md p-6 h-fit sticky top-20 border border-good-blue-gold/20`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-good-blue-brown">フィルター</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearFilters}
              className="text-sm text-good-blue-gold hover:text-good-blue-gold/80 transition-colors duration-200"
            >
              すべてクリア
            </button>
            <button
              onClick={onToggle}
              className="md:hidden text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-good-blue-brown mb-3">価格帯</h4>
          <div className="space-y-2">
            {[
              { label: '2,000円未満', min: 0, max: 20 },
              { label: '2,000円 - 4,000円', min: 20, max: 40 },
              { label: '4,000円 - 6,000円', min: 40, max: 60 },
              { label: '6,000円 - 8,000円', min: 60, max: 80 },
              { label: '8,000円以上', min: 80, max: 1000 }
            ].map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange?.[0] === range.min && filters.priceRange?.[1] === range.max}
                  onChange={() => handlePriceChange(range.min, range.max)}
                  className="mr-2 text-good-blue-gold focus:ring-good-blue-gold"
                />
                <span className="text-sm text-good-blue-brown/80">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty (for seedlings) */}
        {filters.category === 'seedlings' && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-good-blue-brown mb-3">栽培難易度</h4>
            <div className="space-y-2">
              {[
                { value: 'easy', label: '簡単' },
                { value: 'medium', label: '普通' },
                { value: 'hard', label: '難しい' }
              ].map((difficulty) => (
                <label key={difficulty.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.difficulty?.includes(difficulty.value) || false}
                    onChange={() => handleDifficultyChange(difficulty.value)}
                    className="mr-2 text-good-blue-gold focus:ring-good-blue-gold rounded"
                  />
                  <span className="text-sm text-good-blue-brown/80">{difficulty.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Roast Level (for coffee) */}
        {filters.category === 'coffee' && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-good-blue-brown mb-3">焙煎度</h4>
            <div className="space-y-2">
              {[
                { value: 'light', label: '浅煎り' },
                { value: 'medium', label: '中煎り' },
                { value: 'dark', label: '深煎り' }
              ].map((roastLevel) => (
                <label key={roastLevel.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.roastLevel?.includes(roastLevel.value) || false}
                    onChange={() => handleRoastLevelChange(roastLevel.value)}
                    className="mr-2 text-good-blue-gold focus:ring-good-blue-gold rounded"
                  />
                  <span className="text-sm text-good-blue-brown/80">{roastLevel.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Organic */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-good-blue-brown mb-3">認証</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.organic || false}
              onChange={(e) => onFiltersChange({ ...filters, organic: e.target.checked })}
              className="mr-2 text-sage-green focus:ring-sage-green rounded"
            />
            <span className="text-sm text-good-blue-brown/80">オーガニック認証</span>
          </label>
        </div>

        {/* In Stock */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-good-blue-brown mb-3">在庫状況</h4>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock || false}
              onChange={(e) => onFiltersChange({ ...filters, inStock: e.target.checked })}
              className="mr-2 text-sage-green focus:ring-sage-green rounded"
            />
            <span className="text-sm text-good-blue-brown/80">在庫ありのみ</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;