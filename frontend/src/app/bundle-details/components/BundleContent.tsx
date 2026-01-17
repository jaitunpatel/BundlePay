'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TabContent {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

interface BundleContentProps {
  tabs: TabContent[];
}

const BundleContent = ({ tabs }: BundleContentProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="bg-card rounded-lg overflow-hidden mb-6">
      <div className="border-b border-border overflow-x-auto">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab.icon as any} size={20} variant="outline" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">{tabs.find((tab) => tab.id === activeTab)?.content}</div>
    </div>
  );
};

export default BundleContent;