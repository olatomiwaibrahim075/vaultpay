import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange, onApply }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const assetOptions = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'USDT', label: 'Tether (USDT)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' }
  ];

  const statusOptions = [
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' }
  ];

  const typeOptions = [
    { value: 'sent', label: 'Sent' },
    { value: 'received', label: 'Received' }
  ];

  const handleFilterChange = (key, value) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApply();
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      assets: [],
      status: [],
      types: [],
      dateFrom: '',
      dateTo: '',
      amountMin: '',
      amountMax: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Backdrop */}
      <div 
        className="lg:hidden absolute inset-0 bg-black/50 glass"
        onClick={onClose}
      />
      {/* Filter Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm glass-card border-l lg:relative lg:w-80 lg:border lg:rounded-xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/5"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-24">
          {/* Assets */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Assets</h3>
            <div className="space-y-2">
              {assetOptions?.map((asset) => (
                <Checkbox
                  key={asset?.value}
                  label={asset?.label}
                  checked={localFilters?.assets?.includes(asset?.value)}
                  onChange={(e) => {
                    const newAssets = e?.target?.checked
                      ? [...localFilters?.assets, asset?.value]
                      : localFilters?.assets?.filter(a => a !== asset?.value);
                    handleFilterChange('assets', newAssets);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Transaction Type</h3>
            <div className="space-y-2">
              {typeOptions?.map((type) => (
                <Checkbox
                  key={type?.value}
                  label={type?.label}
                  checked={localFilters?.types?.includes(type?.value)}
                  onChange={(e) => {
                    const newTypes = e?.target?.checked
                      ? [...localFilters?.types, type?.value]
                      : localFilters?.types?.filter(t => t !== type?.value);
                    handleFilterChange('types', newTypes);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
            <div className="space-y-2">
              {statusOptions?.map((status) => (
                <Checkbox
                  key={status?.value}
                  label={status?.label}
                  checked={localFilters?.status?.includes(status?.value)}
                  onChange={(e) => {
                    const newStatus = e?.target?.checked
                      ? [...localFilters?.status, status?.value]
                      : localFilters?.status?.filter(s => s !== status?.value);
                    handleFilterChange('status', newStatus);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Date Range</h3>
            <div className="space-y-3">
              <Input
                label="From"
                type="date"
                value={localFilters?.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
              />
              <Input
                label="To"
                type="date"
                value={localFilters?.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
              />
            </div>
          </div>

          {/* Amount Range */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Amount Range (USD)</h3>
            <div className="space-y-3">
              <Input
                label="Minimum"
                type="number"
                placeholder="0.00"
                value={localFilters?.amountMin}
                onChange={(e) => handleFilterChange('amountMin', e?.target?.value)}
              />
              <Input
                label="Maximum"
                type="number"
                placeholder="10,000.00"
                value={localFilters?.amountMax}
                onChange={(e) => handleFilterChange('amountMax', e?.target?.value)}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-background/80 glass">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;