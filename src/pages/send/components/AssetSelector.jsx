import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AssetSelector = ({ selectedAsset, onAssetChange, assets }) => {
  const [isOpen, setIsOpen] = useState(false);

  const assetOptions = assets?.map(asset => ({
    value: asset?.symbol,
    label: `${asset?.name} (${asset?.symbol})`,
    balance: asset?.balance,
    usdValue: asset?.usdValue,
    icon: asset?.icon
  }));

  const selectedAssetData = assets?.find(asset => asset?.symbol === selectedAsset);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">Select Asset</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 rounded-xl bg-card border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name={selectedAssetData?.icon || 'Coins'} size={20} color="white" />
            </div>
            <div className="text-left">
              <p className="text-foreground font-medium">{selectedAssetData?.name || 'Select Asset'}</p>
              <p className="text-sm text-muted-foreground">
                {selectedAssetData ? `${selectedAssetData?.balance} ${selectedAssetData?.symbol}` : 'Choose cryptocurrency'}
              </p>
            </div>
          </div>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 glass-card border rounded-xl shadow-glass-lg z-10 max-h-64 overflow-y-auto">
            {assets?.map((asset) => (
              <button
                key={asset?.symbol}
                type="button"
                onClick={() => {
                  onAssetChange(asset?.symbol);
                  setIsOpen(false);
                }}
                className={`w-full p-4 flex items-center space-x-3 hover:bg-white/5 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                  selectedAsset === asset?.symbol ? 'bg-primary/10 border-l-2 border-primary' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name={asset?.icon} size={20} color="white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <p className="text-foreground font-medium">{asset?.name}</p>
                    <p className="text-sm text-muted-foreground">{asset?.balance} {asset?.symbol}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{asset?.symbol}</p>
                    <p className="text-sm text-success">${asset?.usdValue?.toLocaleString()}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {selectedAssetData && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available Balance</span>
            <span className="text-foreground font-mono">
              {selectedAssetData?.balance} {selectedAssetData?.symbol}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted-foreground">USD Value</span>
            <span className="text-success font-mono">${selectedAssetData?.usdValue?.toLocaleString()}</span>
          </div>
        </div>
      )}
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[5]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AssetSelector;