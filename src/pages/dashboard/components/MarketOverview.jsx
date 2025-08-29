import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketOverview = () => {
  const marketData = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 67234.56,
      change24h: 2.34,
      volume: '28.5B',
      marketCap: '1.32T'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2469.00,
      change24h: -1.23,
      volume: '15.2B',
      marketCap: '296.8B'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      price: 1.00,
      change24h: 0.01,
      volume: '45.1B',
      marketCap: '118.4B'
    }
  ];

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
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Market Overview</h2>
        <div className="flex items-center space-x-1 text-success">
          <Icon name="TrendingUp" size={16} />
          <span className="text-sm font-medium">Markets Up</span>
        </div>
      </div>
      <div className="space-y-3">
        {marketData?.map((asset) => (
          <div key={asset?.symbol} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${getAssetColor(asset?.symbol)}`}>
                <Icon name={getAssetIcon(asset?.symbol)} size={16} />
              </div>
              <div>
                <div className="font-medium text-foreground">{asset?.name}</div>
                <div className="text-sm text-muted-foreground">{asset?.symbol}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-mono font-medium text-foreground">
                ${asset?.price?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div className={`text-sm flex items-center justify-end space-x-1 ${
                asset?.change24h >= 0 ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={asset?.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
                  size={12} 
                />
                <span>
                  {asset?.change24h >= 0 ? '+' : ''}{asset?.change24h}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm text-muted-foreground">Total Volume</div>
            <div className="font-semibold text-foreground">$88.8B</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-semibold text-foreground">$1.74T</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;