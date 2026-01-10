'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  totalResults: number;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  platforms: string[];
  contentTypes: string[];
  sortBy: string;
}

const FilterPanel = ({ onFilterChange, totalResults }: FilterPanelProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 100],
    platforms: [],
    contentTypes: [],
    sortBy: 'popularity',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'entertainment', label: 'Entertainment', count: 24 },
    { id: 'sports', label: 'Sports', count: 12 },
    { id: 'news', label: 'News & Documentaries', count: 8 },
    { id: 'kids', label: 'Kids & Family', count: 15 },
    { id: 'premium', label: 'Premium', count: 10 },
  ];

  const platforms = [
    { id: 'netflix', label: 'Netflix' },
    { id: 'disney', label: 'Disney+' },
    { id: 'hulu', label: 'Hulu' },
    { id: 'prime', label: 'Amazon Prime' },
    { id: 'hbo', label: 'HBO Max' },
    { id: 'espn', label: 'ESPN+' },
    { id: 'paramount', label: 'Paramount+' },
    { id: 'peacock', label: 'Peacock' },
  ];

  const contentTypes = [
    { id: 'movies', label: 'Movies' },
    { id: 'series', label: 'TV Series' },
    { id: 'live', label: 'Live TV' },
    { id: 'sports', label: 'Sports' },
    { id: 'originals', label: 'Originals' },
  ];

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePlatformToggle = (platformId: string) => {
    const newPlatforms = filters.platforms.includes(platformId)
      ? filters.platforms.filter(p => p !== platformId)
      : [...filters.platforms, platformId];
    
    const newFilters = { ...filters, platforms: newPlatforms };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleContentTypeToggle = (typeId: string) => {
    const newContentTypes = filters.contentTypes.includes(typeId)
      ? filters.contentTypes.filter(t => t !== typeId)
      : [...filters.contentTypes, typeId];
    
    const newFilters = { ...filters, contentTypes: newContentTypes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (value: number, index: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    
    const newFilters = { ...filters, priceRange: newPriceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortValue: string) => {
    const newFilters = { ...filters, sortBy: sortValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      categories: [],
      priceRange: [0, 100],
      platforms: [],
      contentTypes: [],
      sortBy: 'popularity',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount = 
    filters.categories.length + 
    filters.platforms.length + 
    filters.contentTypes.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 100 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Categories</h3>
          {filters.categories.length > 0 && (
            <button
              onClick={() => {
                const newFilters = { ...filters, categories: [] };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="text-xs text-primary hover:text-primary/80 transition-smooth"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                filters.categories.includes(category.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-text-primary mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Min: ${filters.priceRange[0]}</span>
            <span className="text-text-secondary">Max: ${filters.priceRange[1]}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), 0)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(Number(e.target.value), 1)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Platforms</h3>
          {filters.platforms.length > 0 && (
            <button
              onClick={() => {
                const newFilters = { ...filters, platforms: [] };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="text-xs text-primary hover:text-primary/80 transition-smooth"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {platforms.map(platform => (
            <label
              key={platform.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-smooth"
            >
              <input
                type="checkbox"
                checked={filters.platforms.includes(platform.id)}
                onChange={() => handlePlatformToggle(platform.id)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              />
              <span className="text-sm text-text-primary">{platform.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Content Types */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-text-primary">Content Types</h3>
          {filters.contentTypes.length > 0 && (
            <button
              onClick={() => {
                const newFilters = { ...filters, contentTypes: [] };
                setFilters(newFilters);
                onFilterChange(newFilters);
              }}
              className="text-xs text-primary hover:text-primary/80 transition-smooth"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          {contentTypes.map(type => (
            <label
              key={type.id}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer transition-smooth"
            >
              <input
                type="checkbox"
                checked={filters.contentTypes.includes(type.id)}
                onChange={() => handleContentTypeToggle(type.id)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              />
              <span className="text-sm text-text-primary">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block bg-card rounded-lg p-6 shadow-cinematic">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-semibold text-text-primary">Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Clear All ({activeFilterCount})
            </button>
          )}
        </div>
        <FilterContent />
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-card text-text-primary rounded-md shadow-cinematic hover:bg-muted transition-smooth"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={20} variant="outline" />
          <span className="font-medium">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">{totalResults} results</span>
        </div>
      </div>

      {/* Sort Controls - Always Visible */}
      <div className="flex items-center gap-3 mb-6">
        <Icon name="BarsArrowDownIcon" size={20} variant="outline" className="text-text-secondary" />
        <select
          value={filters.sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="flex-1 lg:flex-none px-4 py-2 bg-card border border-border rounded-md text-text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background transition-smooth"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filter Slide-out */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 z-120 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full sm:w-80 bg-card z-130 lg:hidden overflow-hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-text-primary">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-smooth"
                >
                  <Icon name="XMarkIcon" size={24} variant="outline" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-border bg-muted">
                <div className="flex gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 py-3 px-4 bg-background text-text-primary font-medium rounded-md hover:bg-input transition-smooth"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="flex-1 py-3 px-4 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterPanel;