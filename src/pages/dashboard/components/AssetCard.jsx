import React from 'react';
import Icon from '../../../components/AppIcon';

const AssetCard = ({ asset }) => {
  const getAssetIcon = (symbol) => {
    const iconMap = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum', 
      'USDT': 'DollarSign'
    };
    return iconMap?.[symbol] || 'Coins';
  };

  const getAssetColor = (symbol) => {
    const colorMap = {
      'BTC': 'text-orange-500',
      'ETH': 'text-blue-500',
      'USDT': 'text-green-500'
    };
    return colorMap?.[symbol] || 'text-primary';
  };

  return (
    <div className="glass-card rounded-xl p-4 hover:bg-white/10 transition-all duration-200 cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${getAssetColor(asset?.symbol)}`}>
            <Icon name={getAssetIcon(asset?.symbol)} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{asset?.name}</h3>
            <p className="text-sm text-muted-foreground">{asset?.symbol}</p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
          asset?.change24h >= 0 
            ? 'bg-success/10 text-success' :'bg-error/10 text-error'
        }`}>
          <Icon 
            name={asset?.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
            size={12} 
          />
          <span className="text-xs font-medium">
            {asset?.change24h >= 0 ? '+' : ''}{asset?.change24h}%
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Balance</span>
          <span className="font-mono text-sm text-foreground">
            {asset?.balance} {asset?.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Value</span>
          <span className="font-semibold text-foreground">
            ${asset?.value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="font-mono text-sm text-foreground">
            ${asset?.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-2">
          <button className="flex-1 py-2 px-3 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors">
            Buy
          </button>
          <button className="flex-1 py-2 px-3 bg-white/5 text-foreground rounded-lg text-sm font-medium hover:bg-white/10 transition-colors">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;