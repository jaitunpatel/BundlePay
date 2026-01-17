'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  userAvatarAlt: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
}

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewSection = ({ reviews, averageRating, totalReviews }: ReviewSectionProps) => {
  const [filter, setFilter] = useState<'all' | 'verified'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

  const filteredReviews = reviews.filter((review) =>
    filter === 'verified' ? review.verified : true
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-data font-bold text-primary mb-1">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center gap-1 mb-1">
              {[...Array(5)].map((_, idx) => (
                <Icon
                  key={idx}
                  name="StarIcon"
                  size={16}
                  variant={idx < Math.round(averageRating) ? 'solid' : 'outline'}
                  className={idx < Math.round(averageRating) ? 'text-accent' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <div className="text-xs text-text-secondary">{totalReviews} reviews</div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'verified')}
            className="px-4 py-2 bg-input border border-border rounded-md text-text-primary text-sm focus:ring-2 focus:ring-ring outline-none"
          >
            <option value="all">All Reviews</option>
            <option value="verified">Verified Only</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'helpful')}
            className="px-4 py-2 bg-input border border-border rounded-md text-text-primary text-sm focus:ring-2 focus:ring-ring outline-none"
          >
            <option value="recent">Most Recent</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-muted rounded-lg p-5">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary flex-shrink-0">
                <AppImage
                  src={review.userAvatar}
                  alt={review.userAvatarAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-text-primary">{review.userName}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-success/20 text-success rounded">
                      <Icon name="CheckBadgeIcon" size={12} variant="solid" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, idx) => (
                      <Icon
                        key={idx}
                        name="StarIcon"
                        size={14}
                        variant={idx < review.rating ? 'solid' : 'outline'}
                        className={idx < review.rating ? 'text-accent' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-text-primary mb-3">{review.comment}</p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-smooth">
                <Icon name="HandThumbUpIcon" size={16} variant="outline" />
                <span>Helpful ({review.helpful})</span>
              </button>
              <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-smooth">
                <Icon name="FlagIcon" size={16} variant="outline" />
                <span>Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;