'use client';


import AppImage from '@/components/ui/AppImage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface PlatformUsage {
  platform: string;
  logo: string;
  alt: string;
  hoursWatched: number;
  lastAccessed: string;
}

interface UsageAnalyticsProps {
  platformUsage: PlatformUsage[];
}

export default function UsageAnalytics({ platformUsage }: UsageAnalyticsProps) {
  const chartData = platformUsage.map(item => ({
    name: item.platform,
    hours: item.hoursWatched,
  }));

  const colors = ['#6366F1', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'];

  const totalHours = platformUsage.reduce((sum, item) => sum + item.hoursWatched, 0);

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-2">
          Usage Analytics
        </h2>
        <p className="text-sm text-text-secondary">
          Track your streaming activity across platforms
        </p>
      </div>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-data font-bold text-primary">{totalHours}</span>
            <span className="text-text-secondary">hours watched this month</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Platform Activity
          </h3>
          <div className="w-full h-64" aria-label="Platform Usage Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2E2E5F" />
                <XAxis dataKey="name" stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
                <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E1E3F',
                    border: '1px solid #2E2E5F',
                    borderRadius: '8px',
                    color: '#F8FAFC',
                  }}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
            Platform Details
          </h3>
          {platformUsage.map((platform, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-input transition-smooth">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <AppImage
                  src={platform.logo}
                  alt={platform.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary mb-1">{platform.platform}</h4>
                <p className="text-sm text-text-secondary">Last accessed: {platform.lastAccessed}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-data font-bold text-primary">{platform.hoursWatched}</div>
                <div className="text-xs text-text-secondary">hours</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}