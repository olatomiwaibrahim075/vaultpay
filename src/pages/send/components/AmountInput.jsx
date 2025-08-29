import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const AmountInput = ({ 
  amount, 
  onAmountChange, 
  selectedAsset, 
  assets, 
  error 
}) => {
  const [inputMode, setInputMode] = useState('crypto'); // 'crypto' or 'usd'
  const [usdAmount, setUsdAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');

  const selectedAssetData = assets?.find(asset => asset?.symbol === selectedAsset);
  const mockPrice = selectedAssetData?.price || 50000; // Mock price per unit

  useEffect(() => {
    if (amount) {
      setCryptoAmount(amount);
      const usdValue = (parseFloat(amount) * mockPrice)?.toFixed(2);
      setUsdAmount(usdValue);
    } else {
      setCryptoAmount('');
      setUsdAmount('');
    }
  }, [amount, mockPrice]);

  const handleCryptoAmountChange = (value) => {
    setCryptoAmount(value);
    onAmountChange(value);
    
    if (value && !isNaN(value)) {
      const usdValue = (parseFloat(value) * mockPrice)?.toFixed(2);
      setUsdAmount(usdValue);
    } else {
      setUsdAmount('');
    }
  };

  const handleUsdAmountChange = (value) => {
    setUsdAmount(value);
    
    if (value && !isNaN(value)) {
      const cryptoValue = (parseFloat(value) / mockPrice)?.toFixed(8);
      setCryptoAmount(cryptoValue);
      onAmountChange(cryptoValue);
    } else {
      setCryptoAmount('');
      onAmountChange('');
    }
  };

  const handleMaxClick = () => {
    if (selectedAssetData) {
      const maxAmount = selectedAssetData?.balance?.toString();
      handleCryptoAmountChange(maxAmount);
    }
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === 'crypto' ? 'usd' : 'crypto');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Amount</label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleInputMode}
          iconName="ArrowUpDown"
          iconPosition="left"
          iconSize={16}
        >
          {inputMode === 'crypto' ? 'USD' : selectedAsset}
        </Button>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 z-10">
          {inputMode === 'crypto' ? (
            <>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name={selectedAssetData?.icon || 'Coins'} size={12} color="white" />
              </div>
              <span className="text-sm font-medium text-foreground">{selectedAsset}</span>
            </>
          ) : (
            <>
              <span className="text-lg font-medium text-foreground">$</span>
              <span className="text-sm font-medium text-foreground">USD</span>
            </>
          )}
        </div>

        <Input
          type="number"
          placeholder="0.00"
          value={inputMode === 'crypto' ? cryptoAmount : usdAmount}
          onChange={(e) => {
            if (inputMode === 'crypto') {
              handleCryptoAmountChange(e?.target?.value);
            } else {
              handleUsdAmountChange(e?.target?.value);
            }
          }}
          error={error}
          className="pl-24 pr-16 text-lg font-mono text-center"
          step="any"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleMaxClick}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          MAX
        </Button>
      </div>
      {/* Conversion Display */}
      {(cryptoAmount || usdAmount) && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {inputMode === 'crypto' ? 'USD Equivalent' : 'Crypto Equivalent'}
            </span>
            <span className="text-foreground font-mono">
              {inputMode === 'crypto' 
                ? `$${usdAmount || '0.00'}` 
                : `${cryptoAmount || '0.00000000'} ${selectedAsset}`
              }
            </span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="text-muted-foreground font-mono">
              1 {selectedAsset} = ${mockPrice?.toLocaleString()}
            </span>
          </div>
        </div>
      )}
      {/* Balance Check */}
      {selectedAssetData && cryptoAmount && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Available Balance</span>
          <div className="flex items-center space-x-2">
            <span className="text-foreground font-mono">
              {selectedAssetData?.balance} {selectedAsset}
            </span>
            {parseFloat(cryptoAmount) > selectedAssetData?.balance && (
              <div className="flex items-center space-x-1 text-error">
                <Icon name="AlertTriangle" size={14} />
                <span className="text-xs">Insufficient</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Quick Amount Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {['25%', '50%', '75%', '100%']?.map((percentage) => (
          <Button
            key={percentage}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              if (selectedAssetData) {
                const percent = parseInt(percentage) / 100;
                const amount = (selectedAssetData?.balance * percent)?.toFixed(8);
                handleCryptoAmountChange(amount);
              }
            }}
            className="text-xs"
          >
            {percentage}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default AmountInput;