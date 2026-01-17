'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
  id: string;
  name: string;
  type: 'bundle' | 'platform';
  platforms?: string[];
}

interface SearchInterfaceProps {
  className?: string;
}

const SearchInterface = ({ className = '' }: SearchInterfaceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions] = useState<SearchSuggestion[]>([
    { id: '1', name: 'Entertainment Plus Bundle', type: 'bundle', platforms: ['Netflix', 'Disney+', 'Hulu'] },
    { id: '2', name: 'Sports Fanatic Package', type: 'bundle', platforms: ['ESPN+', 'DAZN'] },
    { id: '3', name: 'Netflix', type: 'platform' },
    { id: '4', name: 'Disney+', type: 'platform' },
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchQuery('');
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = suggestions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchQuery, suggestions]);

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/bundle-catalog?search=${encodeURIComponent(searchQuery)}`);
      setIsExpanded(false);
      setSearchQuery('');
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'bundle') {
      router.push(`/bundle-details?id=${suggestion.id}`);
    } else {
      router.push(`/bundle-catalog?platform=${encodeURIComponent(suggestion.name)}`);
    }
    setIsExpanded(false);
    setSearchQuery('');
    setFilteredSuggestions([]);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {!isExpanded ? (
        <button
          onClick={handleExpand}
          className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-smooth"
          aria-label="Open search"
        >
          <Icon name="MagnifyingGlassIcon" size={24} variant="outline" />
        </button>
      ) : (
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center gap-2 px-4 py-2 bg-input border border-border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background transition-smooth">
            <Icon name="MagnifyingGlassIcon" size={20} variant="outline" className="text-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bundles or platforms..."
              className="flex-1 bg-transparent text-text-primary placeholder:text-text-secondary outline-none min-w-[200px] lg:min-w-[300px]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilteredSuggestions([]);
                }}
                className="text-text-secondary hover:text-text-primary transition-smooth"
                aria-label="Clear search"
              >
                <Icon name="XMarkIcon" size={18} variant="outline" />
              </button>
            )}
          </div>

          {filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover rounded-md shadow-cinematic-lg z-120 overflow-hidden max-h-80 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      name={suggestion.type === 'bundle' ? 'RectangleStackIcon' : 'PlayIcon'}
                      size={20}
                      variant="outline"
                      className="text-primary"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{suggestion.name}</p>
                      {suggestion.platforms && (
                        <div className="flex items-center gap-2 mt-1">
                          {suggestion.platforms.slice(0, 3).map((platform, idx) => (
                            <span key={idx} className="text-xs px-2 py-0.5 bg-muted rounded text-text-secondary">
                              {platform}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded capitalize">
                      {suggestion.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SearchInterface;