import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = () => {
  const [showChart, setShowChart] = useState(false);

  const portfolioData = {
    totalValue: 45678.92,
    change24h: 5.67,
    changeAmount: 2456.78
  };

  const chartData = [
    { time: '00:00', value: 43000 },
    { time: '04:00', value: 44200 },
    { time: '08:00', value: 43800 },
    { time: '12:00', value: 45200 },
    { time: '16:00', value: 44900 },
    { time: '20:00', value: 45678 },
  ];

  return (
    <div className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Portfolio Value</h2>
          <p className="text-sm text-muted-foreground">Total balance across all assets</p>
        </div>
        <button
          onClick={() => setShowChart(!showChart)}
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <Icon name={showChart ? "TrendingDown" : "TrendingUp"} size={20} />
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold text-foreground">
            ${portfolioData?.totalValue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg ${
            portfolioData?.change24h >= 0 
              ? 'bg-success/10 text-success' :'bg-error/10 text-error'
          }`}>
            <Icon 
              name={portfolioData?.change24h >= 0 ? "TrendingUp" : "TrendingDown"} 
              size={14} 
            />
            <span className="text-sm font-medium">
              {portfolioData?.change24h >= 0 ? '+' : ''}{portfolioData?.change24h}%
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {portfolioData?.change24h >= 0 ? '+' : ''}${portfolioData?.changeAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })} (24h)
        </p>
      </div>
      {showChart && (
        <div className="h-32 bg-white/5 rounded-xl p-4 animate-scale-in">
          <div className="flex items-end justify-between h-full space-x-2">
            {chartData?.map((point, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-sm transition-all duration-300 hover:opacity-80"
                  style={{ 
                    height: `${(point?.value / Math.max(...chartData?.map(p => p?.value))) * 100}%`,
                    minHeight: '4px'
                  }}
                />
                <span className="text-xs text-muted-foreground mt-2">{point?.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioSummary;