'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface BillingRecord {
  id: string;
  date: string;
  bundleName: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
  paymentMethod: string;
}

interface BillingHistoryTableProps {
  records: BillingRecord[];
}

export default function BillingHistoryTable({ records }: BillingHistoryTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.bundleName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success/20 text-success';
      case 'pending':
        return 'bg-warning/20 text-warning';
      case 'failed':
        return 'bg-error/20 text-error';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const handleDownloadInvoice = (invoiceUrl: string) => {
    window.open(invoiceUrl, '_blank');
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-heading font-semibold text-text-primary mb-4">
          Billing History
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Icon name="MagnifyingGlassIcon" size={20} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bundle name..."
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-md text-text-primary placeholder:text-text-secondary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none transition-smooth"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-input border border-border rounded-md text-text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background outline-none transition-smooth"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Bundle</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Payment Method</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-text-secondary">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredRecords.map((record) => (
              <tr key={record.id} className="hover:bg-muted transition-smooth">
                <td className="px-6 py-4 text-sm text-text-primary">{record.date}</td>
                <td className="px-6 py-4 text-sm text-text-primary font-medium">{record.bundleName}</td>
                <td className="px-6 py-4 text-sm font-data font-semibold text-primary">${record.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{record.paymentMethod}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDownloadInvoice(record.invoiceUrl)}
                    className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-smooth"
                  >
                    <Icon name="ArrowDownTrayIcon" size={16} variant="outline" />
                    <span>Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-border">
        {filteredRecords.map((record) => (
          <div key={record.id} className="p-4 hover:bg-muted transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-medium text-text-primary mb-1">{record.bundleName}</h3>
                <p className="text-sm text-text-secondary">{record.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-data font-bold text-primary">${record.amount.toFixed(2)}</span>
              <span className="text-sm text-text-secondary">{record.paymentMethod}</span>
            </div>
            <button
              onClick={() => handleDownloadInvoice(record.invoiceUrl)}
              className="flex items-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground font-medium rounded-md hover:shadow-glow-primary transition-smooth"
            >
              <Icon name="ArrowDownTrayIcon" size={18} variant="outline" />
              <span>Download Invoice</span>
            </button>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="DocumentTextIcon" size={48} variant="outline" className="mx-auto mb-3 text-muted-foreground" />
          <p className="text-text-secondary">No billing records found</p>
        </div>
      )}
    </div>
  );
}