import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

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

  const getAssetIcon = (asset) => {
    const icons = {
      'BTC': 'Bitcoin',
      'ETH': 'Ethereum',
      'USDT': 'DollarSign',
      'BNB': 'Coins'
    };
    return icons?.[asset] || 'Coins';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const mockTransactionDetails = {
    hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
    blockHeight: 789456,
    confirmations: 12,
    networkFee: 0.0001,
    gasUsed: transaction?.asset === 'ETH' ? 21000 : null,
    fromAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    toAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    blockExplorerUrl: `https://blockexplorer.com/tx/${transaction?.id}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 glass"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-lg glass-card rounded-2xl shadow-glass-xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name={getAssetIcon(transaction?.asset)} size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Transaction Details</h2>
              <p className="text-sm text-muted-foreground capitalize">
                {transaction?.type} {transaction?.asset}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/5"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Amount & Status */}
          <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
            <p className={`text-2xl font-bold font-mono mb-2 ${
              transaction?.type === 'sent' ? 'text-error' : 'text-success'
            }`}>
              {transaction?.type === 'sent' ? '-' : '+'}{transaction?.amount} {transaction?.asset}
            </p>
            <p className="text-lg text-muted-foreground font-mono mb-3">
              ${transaction?.usdValue?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(transaction?.status)}`}>
              {transaction?.status}
            </span>
          </div>

          {/* Transaction Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* Date */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Date</span>
                <span className="text-sm text-foreground">{formatDate(transaction?.date)}</span>
              </div>

              {/* Transaction Hash */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Transaction Hash</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground font-mono">
                    {mockTransactionDetails?.hash?.slice(0, 10)}...{mockTransactionDetails?.hash?.slice(-10)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(mockTransactionDetails?.hash)}
                    className="h-6 w-6"
                  >
                    <Icon name="Copy" size={12} />
                  </Button>
                </div>
              </div>

              {/* Block Height */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Block Height</span>
                <span className="text-sm text-foreground font-mono">{mockTransactionDetails?.blockHeight?.toLocaleString()}</span>
              </div>

              {/* Confirmations */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Confirmations</span>
                <span className="text-sm text-foreground">{mockTransactionDetails?.confirmations}</span>
              </div>

              {/* Network Fee */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">Network Fee</span>
                <span className="text-sm text-foreground font-mono">
                  {mockTransactionDetails?.networkFee} {transaction?.asset}
                </span>
              </div>

              {/* Gas Used (for ETH) */}
              {mockTransactionDetails?.gasUsed && (
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-sm text-muted-foreground">Gas Used</span>
                  <span className="text-sm text-foreground font-mono">{mockTransactionDetails?.gasUsed?.toLocaleString()}</span>
                </div>
              )}

              {/* From Address */}
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-sm text-muted-foreground">From</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground font-mono">
                    {mockTransactionDetails?.fromAddress?.slice(0, 8)}...{mockTransactionDetails?.fromAddress?.slice(-8)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(mockTransactionDetails?.fromAddress)}
                    className="h-6 w-6"
                  >
                    <Icon name="Copy" size={12} />
                  </Button>
                </div>
              </div>

              {/* To Address */}
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">To</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground font-mono">
                    {mockTransactionDetails?.toAddress?.slice(0, 8)}...{mockTransactionDetails?.toAddress?.slice(-8)}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(mockTransactionDetails?.toAddress)}
                    className="h-6 w-6"
                  >
                    <Icon name="Copy" size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => window.open(mockTransactionDetails?.blockExplorerUrl, '_blank')}
              className="flex-1"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View on Explorer
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(mockTransactionDetails?.hash)}
              className="flex-1"
              iconName="Copy"
              iconPosition="left"
            >
              Copy Hash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;