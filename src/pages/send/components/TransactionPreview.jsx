import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionPreview = ({ 
  selectedAsset, 
  recipientAddress, 
  amount, 
  networkFee, 
  assets,
  feeSpeed 
}) => {
  const selectedAssetData = assets?.find(asset => asset?.symbol === selectedAsset);
  const mockPrice = selectedAssetData?.price || 50000;
  
  const totalAmount = amount ? parseFloat(amount) + networkFee : 0;
  const usdAmount = amount ? (parseFloat(amount) * mockPrice)?.toFixed(2) : '0.00';
  const usdFee = (networkFee * mockPrice)?.toFixed(2);
  const usdTotal = (totalAmount * mockPrice)?.toFixed(2);

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address?.slice(0, 6)}...${address?.slice(-6)}`;
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
  };

  const feeSpeedLabels = {
    slow: { label: 'Slow', time: '30-60 min', icon: 'Turtle' },
    standard: { label: 'Standard', time: '10-30 min', icon: 'Zap' },
    fast: { label: 'Fast', time: '1-10 min', icon: 'Rocket' }
  };

  const currentFeeSpeed = feeSpeedLabels?.[feeSpeed] || feeSpeedLabels?.standard;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Receipt" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Transaction Preview</h3>
      </div>
      <div className="glass-card rounded-xl p-4 space-y-4">
        {/* Asset Info */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name={selectedAssetData?.icon || 'Coins'} size={20} color="white" />
            </div>
            <div>
              <p className="text-foreground font-medium">{selectedAssetData?.name || 'Select Asset'}</p>
              <p className="text-sm text-muted-foreground">{selectedAsset}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-foreground font-mono">${mockPrice?.toLocaleString()}</p>
            <p className="text-xs text-success">+2.4%</p>
          </div>
        </div>

        {/* Recipient */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Recipient</span>
            {recipientAddress && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(recipientAddress)}
                iconName="Copy"
                iconSize={14}
              >
                Copy
              </Button>
            )}
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm font-mono text-foreground">
              {recipientAddress ? truncateAddress(recipientAddress) : 'Enter recipient address'}
            </p>
          </div>
        </div>

        {/* Amount Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Send Amount</span>
            <div className="text-right">
              <p className="text-foreground font-mono">
                {amount || '0.00000000'} {selectedAsset}
              </p>
              <p className="text-xs text-muted-foreground">${usdAmount}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Network Fee</span>
              <div className="flex items-center space-x-1">
                <Icon name={currentFeeSpeed?.icon} size={12} className="text-primary" />
                <span className="text-xs text-primary">{currentFeeSpeed?.label}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground font-mono">
                {networkFee?.toFixed(8)} {selectedAsset}
              </p>
              <p className="text-xs text-muted-foreground">${usdFee}</p>
            </div>
          </div>

          <div className="h-px bg-white/10"></div>

          <div className="flex items-center justify-between">
            <span className="text-foreground font-medium">Total Deduction</span>
            <div className="text-right">
              <p className="text-foreground font-mono font-medium">
                {totalAmount?.toFixed(8)} {selectedAsset}
              </p>
              <p className="text-sm text-muted-foreground">${usdTotal}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated Time</span>
            <span className="text-foreground">{currentFeeSpeed?.time}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Network</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <span className="text-foreground">
                {selectedAsset === 'BTC' ? 'Bitcoin' : selectedAsset === 'ETH' ? 'Ethereum' : 'Mainnet'}
              </span>
            </div>
          </div>
        </div>

        {/* Balance Check */}
        {selectedAssetData && amount && (
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Remaining Balance</span>
              <span className="text-foreground font-mono">
                {(selectedAssetData?.balance - totalAmount)?.toFixed(8)} {selectedAsset}
              </span>
            </div>
            {totalAmount > selectedAssetData?.balance && (
              <div className="flex items-center space-x-2 mt-2 text-error">
                <Icon name="AlertTriangle" size={14} />
                <span className="text-xs">Insufficient balance for this transaction</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionPreview;