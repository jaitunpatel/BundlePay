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

  const handleSortChange = (sortValue: string) => {
    const newFilters = { ...filters, sortBy: sortValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const resetFilters: FilterState = {
      categories: [],        // keep but unused
      priceRange: [0, 100],  // keep but unused
      platforms: [],
      contentTypes: [],
      sortBy: 'popularity',
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFilterCount =
    filters.platforms.length +
    filters.contentTypes.length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Content Types */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">
          Content Types
        </h3>

        <div className="flex flex-wrap gap-2">
          {contentTypes.map(type => (
            <button
              key={type.id}
              type="button"
              onClick={() => handleContentTypeToggle(type.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                filters.contentTypes.includes(type.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-text-secondary hover:bg-muted/80'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Divider line */}
      <div className="h-px bg-border" />

      {/* Sort By (moved into the same card) */}
      <div className="flex items-center gap-3 mt-6 mb-6">
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
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block bg-card rounded-lg p-6 shadow-cinematic">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-heading font-semibold text-text-primary">Filters</h4>
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