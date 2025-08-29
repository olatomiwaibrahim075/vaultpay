import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentTransactions = () => {
  const recentTransactions = [
    {
      id: 'tx1',
      type: 'received',
      asset: 'BTC',
      amount: 0.00234,
      value: 156.78,
      status: 'completed',
      timestamp: new Date(Date.now() - 3600000),
      from: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
    },
    {
      id: 'tx2',
      type: 'sent',
      asset: 'ETH',
      amount: 0.5,
      value: 1234.50,
      status: 'pending',
      timestamp: new Date(Date.now() - 7200000),
      to: '0x742d35Cc6634C0532925a3b8D4C9db4C4C4C4C4C'
    },
    {
      id: 'tx3',
      type: 'received',
      asset: 'USDT',
      amount: 500.00,
      value: 500.00,
      status: 'completed',
      timestamp: new Date(Date.now() - 14400000),
      from: 'TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7'
    },
    {
      id: 'tx4',
      type: 'sent',
      asset: 'BTC',
      amount: 0.001,
      value: 67.89,
      status: 'failed',
      timestamp: new Date(Date.now() - 21600000),
      to: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq'
    },
    {
      id: 'tx5',
      type: 'received',
      asset: 'ETH',
      amount: 0.25,
      value: 617.25,
      status: 'completed',
      timestamp: new Date(Date.now() - 28800000),
      from: '0x8ba1f109551bD432803012645Hac136c22C501e'
    }
  ];

  const getTransactionIcon = (type, status) => {
    if (status === 'pending') return 'Clock';
    if (status === 'failed') return 'X';
    return type === 'sent' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const getTransactionColor = (type, status) => {
    if (status === 'pending') return 'text-warning';
    if (status === 'failed') return 'text-error';
    return type === 'sent' ? 'text-error' : 'text-success';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-success/10', text: 'text-success', label: 'Completed' },
      pending: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending' },
      failed: { bg: 'bg-error/10', text: 'text-error', label: 'Failed' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.completed;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.bg} ${config?.text}`}>
        {config?.label}
      </span>
    );
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
        <Link 
          to="/transactions"
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center space-x-1"
        >
          <span>View All</span>
          <Icon name="ArrowRight" size={14} />
        </Link>
      </div>
      <div className="space-y-3">
        {recentTransactions?.map((transaction) => (
          <div 
            key={transaction?.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${getTransactionColor(transaction?.type, transaction?.status)}`}>
                <Icon name={getTransactionIcon(transaction?.type, transaction?.status)} size={18} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground capitalize">
                    {transaction?.type} {transaction?.asset}
                  </span>
                  {getStatusBadge(transaction?.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatTime(transaction?.timestamp)}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className={`font-mono font-medium ${getTransactionColor(transaction?.type, transaction?.status)}`}>
                {transaction?.type === 'sent' ? '-' : '+'}
                {transaction?.amount} {transaction?.asset}
              </div>
              <div className="text-sm text-muted-foreground">
                ${transaction?.value?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        ))}
      </div>
      {recentTransactions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Receipt" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No recent transactions</p>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;