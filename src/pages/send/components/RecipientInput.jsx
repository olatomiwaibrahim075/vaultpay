import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const RecipientInput = ({ address, onAddressChange, error }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationStatus, setValidationStatus] = useState(null);

  useEffect(() => {
    if (address && address?.length > 10) {
      setIsValidating(true);
      
      // Simulate address validation
      const timer = setTimeout(() => {
        const isValid = address?.length >= 26 && address?.length <= 62;
        setValidationStatus(isValid ? 'valid' : 'invalid');
        setIsValidating(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setValidationStatus(null);
      setIsValidating(false);
    }
  }, [address]);

  const handleScanQR = () => {
    // Mock QR scan result
    const mockAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    onAddressChange(mockAddress);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard?.readText();
      onAddressChange(text?.trim());
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Recipient Address</label>
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handlePaste}
            iconName="Clipboard"
            iconPosition="left"
            iconSize={16}
          >
            Paste
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleScanQR}
            iconName="QrCode"
            iconPosition="left"
            iconSize={16}
          >
            Scan
          </Button>
        </div>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Enter wallet address or scan QR code"
          value={address}
          onChange={(e) => onAddressChange(e?.target?.value)}
          error={error}
          className="font-mono text-sm pr-12"
        />
        
        {/* Validation Status */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isValidating && (
            <div className="animate-spin">
              <Icon name="Loader2" size={16} className="text-muted-foreground" />
            </div>
          )}
          {validationStatus === 'valid' && (
            <Icon name="CheckCircle" size={16} className="text-success" />
          )}
          {validationStatus === 'invalid' && (
            <Icon name="XCircle" size={16} className="text-error" />
          )}
        </div>
      </div>
      {/* Address Format Helper */}
      {address && address?.length > 0 && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-start space-x-2">
            <Icon 
              name={validationStatus === 'valid' ? 'Shield' : 'AlertTriangle'} 
              size={16} 
              className={validationStatus === 'valid' ? 'text-success mt-0.5' : 'text-warning mt-0.5'} 
            />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium">
                {validationStatus === 'valid' ? 'Valid Address Format' : 'Address Validation'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {validationStatus === 'valid' ?'This address format is supported and appears valid' :'Please ensure the address is correct and complete'
                }
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Recent Addresses */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground">Recent Recipients</p>
        <div className="space-y-1">
          {[
            { address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', label: 'Personal Wallet' },
            { address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', label: 'Exchange Deposit' }
          ]?.map((recent, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onAddressChange(recent?.address)}
              className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{recent?.label}</p>
                  <p className="text-xs text-muted-foreground font-mono truncate">
                    {recent?.address}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground ml-2" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipientInput;