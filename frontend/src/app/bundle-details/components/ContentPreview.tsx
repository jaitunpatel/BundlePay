'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  thumbnail: string;
  thumbnailAlt: string;
  type: 'movie' | 'series' | 'sports' | 'documentary';
}

interface ContentPreviewProps {
  items: ContentItem[];
}

const ContentPreview = ({ items }: ContentPreviewProps) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = ['all', 'movie', 'series', 'sports', 'documentary'];
  const filteredItems = selectedType === 'all' 
    ? items 
    : items.filter(item => item.type === selectedType);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-md font-medium capitalize transition-smooth ${
              selectedType === type
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:text-text-primary hover:bg-input'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative bg-muted rounded-lg overflow-hidden hover:shadow-cinematic transition-smooth cursor-pointer"
          >
            <div className="aspect-[2/3] overflow-hidden">
              <AppImage
                src={item.thumbnail}
                alt={item.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-4">
              <div className="w-full">
                <h4 className="font-medium text-text-primary mb-1 line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">{item.platform}</span>
                  <Icon name="PlayIcon" size={20} variant="solid" className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPreview;