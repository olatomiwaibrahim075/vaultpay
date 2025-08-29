import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';

const TransactionModal = ({ isOpen, onClose, type = 'send' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    amount: '',
    address: '',
    currency: 'BTC',
    note: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const currencies = [
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'USDT', label: 'Tether (USDT)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' },
  ];

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    navigate('/dashboard');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (type === 'send' && !formData?.address?.trim()) {
      newErrors.address = 'Please enter a recipient address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    handleClose();
  };

  const generateAddress = () => {
    const mockAddress = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
    setFormData(prev => ({ ...prev, address: mockAddress }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 glass"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              type === 'send' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
            }`}>
              <Icon name={type === 'send' ? 'Send' : 'Download'} size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {type === 'send' ? 'Send Crypto' : 'Receive Crypto'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {type === 'send' ? 'Transfer to another wallet' : 'Get crypto from others'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="hover:bg-white/5"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Currency Selection */}
          <Select
            label="Currency"
            options={currencies}
            value={formData?.currency}
            onChange={(value) => handleInputChange('currency', value)}
            className="mb-4"
          />

          {/* Amount */}
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            value={formData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            error={errors?.amount}
            required
            className="font-mono"
          />

          {type === 'send' ? (
            /* Send Form */
            (<>
              <Input
                label="Recipient Address"
                type="text"
                placeholder="Enter wallet address"
                value={formData?.address}
                onChange={(e) => handleInputChange('address', e?.target?.value)}
                error={errors?.address}
                required
                className="font-mono text-sm"
              />
              <Input
                label="Note (Optional)"
                type="text"
                placeholder="Add a note for this transaction"
                value={formData?.note}
                onChange={(e) => handleInputChange('note', e?.target?.value)}
              />
              {/* Transaction Summary */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-sm font-medium text-foreground mb-3">Transaction Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="text-foreground font-mono">
                      {formData?.amount || '0.00'} {formData?.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="text-foreground font-mono">0.0001 {formData?.currency}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-foreground font-medium">Total</span>
                    <span className="text-foreground font-mono font-medium">
                      {formData?.amount ? (parseFloat(formData?.amount) + 0.0001)?.toFixed(4) : '0.0001'} {formData?.currency}
                    </span>
                  </div>
                </div>
              </div>
            </>)
          ) : (
            /* Receive Form */
            (<>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Your Address</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAddress}
                  >
                    Generate New
                  </Button>
                </div>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-foreground break-all">
                      {formData?.address || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        navigator.clipboard?.writeText(formData?.address || 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
                      }}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon name="QrCode" size={64} color="#000" />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Scan this QR code to send {formData?.currency} to your wallet
                  </p>
                </div>
              </div>
            </>)
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              className="flex-1"
              variant={type === 'send' ? 'default' : 'success'}
            >
              {type === 'send' ? 'Send' : 'Share Address'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;