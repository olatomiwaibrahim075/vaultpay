import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionCard = ({ transaction, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'failed':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getTransactionIcon = (type, asset) => {
    if (type === 'sent') return 'ArrowUpRight';
    if (type === 'received') return 'ArrowDownLeft';
    return 'ArrowRightLeft';
  };

  const getAssetIcon = (asset) => {
    const icons = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'USDT': 'DollarSign',
      'BNB': 'Coins'
    };
    return icons?.[asset] || 'Coins';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div 
      className="glass-card p-4 rounded-xl border cursor-pointer hover:bg-white/5 transition-all duration-150"
      onClick={() => onClick(transaction)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Asset Icon */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name={getAssetIcon(transaction?.asset)} size={20} className="text-primary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-background border-2 border-background flex items-center justify-center">
              <Icon 
                name={getTransactionIcon(transaction?.type)} 
                size={12} 
                className={transaction?.type === 'sent' ? 'text-error' : 'text-success'} 
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium text-foreground capitalize">
                {transaction?.type} {transaction?.asset}
              </h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(transaction?.status)}`}>
                {transaction?.status}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(transaction?.date)}
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="text-right">
          <p className={`text-sm font-semibold font-mono ${
            transaction?.type === 'sent' ? 'text-error' : 'text-success'
          }`}>
            {transaction?.type === 'sent' ? '-' : '+'}{transaction?.amount} {transaction?.asset}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            ${transaction?.usdValue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;