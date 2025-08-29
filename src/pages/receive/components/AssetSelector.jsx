import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AssetSelector = ({ selectedAsset, onAssetChange, assets }) => {
  const assetOptions = assets?.map(asset => ({
    value: asset?.symbol,
    label: (
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${asset?.bgColor}`}>
          <Icon name={asset?.icon} size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{asset?.name}</span>
            <span className="text-sm text-muted-foreground">{asset?.balance} {asset?.symbol}</span>
          </div>
          <div className="text-xs text-muted-foreground">${asset?.usdValue}</div>
        </div>
      </div>
    ),
    description: `Balance: ${asset?.balance} ${asset?.symbol} ($${asset?.usdValue})`
  }));

  return (
    <div className="space-y-2">
      <Select
        label="Select Asset"
        description="Choose the cryptocurrency you want to receive"
        options={assetOptions}
        value={selectedAsset}
        onChange={onAssetChange}
        searchable
        className="w-full"
      />
    </div>
  );
};

export default AssetSelector;