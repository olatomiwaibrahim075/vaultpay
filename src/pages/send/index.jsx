import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AssetSelector from './components/AssetSelector';
import RecipientInput from './components/RecipientInput';
import AmountInput from './components/AmountInput';
import NetworkFeeSelector from './components/NetworkFeeSelector';
import TransactionPreview from './components/TransactionPreview';
import ConfirmationModal from './components/ConfirmationModal';

const Send = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selectedAsset: 'BTC',
    recipientAddress: '',
    amount: '',
    feeSpeed: 'standard'
  });
  const [errors, setErrors] = useState({});
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Mock assets data
  const assets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      balance: 0.12345678,
      usdValue: 6172.84,
      price: 50000,
      icon: 'Bitcoin'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      balance: 2.45678901,
      usdValue: 4913.58,
      price: 2000,
      icon: 'Zap'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      balance: 1500.00,
      usdValue: 1500.00,
      price: 1,
      icon: 'DollarSign'
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      balance: 5.12345,
      usdValue: 1537.04,
      price: 300,
      icon: 'Coins'
    }
  ];

  const feeRates = {
    slow: 0.00001,
    standard: 0.00005,
    fast: 0.0001
  };

  const networkFee = feeRates?.[formData?.feeSpeed] || feeRates?.standard;

  // Form validation
  useEffect(() => {
    const newErrors = {};
    
    if (!formData?.recipientAddress?.trim()) {
      newErrors.recipientAddress = 'Recipient address is required';
    } else if (formData?.recipientAddress?.length < 26) {
      newErrors.recipientAddress = 'Invalid address format';
    }

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    } else {
      const selectedAssetData = assets?.find(asset => asset?.symbol === formData?.selectedAsset);
      const totalAmount = parseFloat(formData?.amount) + networkFee;
      
      if (selectedAssetData && totalAmount > selectedAssetData?.balance) {
        newErrors.amount = 'Insufficient balance including network fee';
      }
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors)?.length === 0 && formData?.recipientAddress && formData?.amount);
  }, [formData, networkFee]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendTransaction = () => {
    if (!isFormValid) return;
    
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTransaction = (transactionData) => {
    // Here you would typically send the transaction to your backend/blockchain
    console.log('Transaction confirmed:', transactionData);
    setIsConfirmModalOpen(false);
    
    // Navigate to transactions page after successful send
    setTimeout(() => {
      navigate('/transactions');
    }, 1000);
  };

  const transactionData = {
    asset: formData?.selectedAsset,
    amount: formData?.amount,
    recipient: formData?.recipientAddress,
    fee: networkFee?.toFixed(8),
    total: formData?.amount ? (parseFloat(formData?.amount) + networkFee)?.toFixed(8) : '0.00000000'
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-white/5"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Send Crypto</h1>
              <p className="text-muted-foreground">Transfer cryptocurrency to another wallet</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/receive')}
              iconName="Download"
              iconPosition="left"
            >
              Receive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/transactions')}
              iconName="Receipt"
              iconPosition="left"
            >
              History
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Send Form */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-white/10">
                <Icon name="Send" size={20} className="text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Transaction Details</h2>
              </div>

              {/* Asset Selection */}
              <AssetSelector
                selectedAsset={formData?.selectedAsset}
                onAssetChange={(asset) => handleInputChange('selectedAsset', asset)}
                assets={assets}
              />

              {/* Recipient Address */}
              <RecipientInput
                address={formData?.recipientAddress}
                onAddressChange={(address) => handleInputChange('recipientAddress', address)}
                error={errors?.recipientAddress}
              />

              {/* Amount Input */}
              <AmountInput
                amount={formData?.amount}
                onAmountChange={(amount) => handleInputChange('amount', amount)}
                selectedAsset={formData?.selectedAsset}
                assets={assets}
                error={errors?.amount}
              />

              {/* Network Fee */}
              <NetworkFeeSelector
                selectedSpeed={formData?.feeSpeed}
                onSpeedChange={(speed) => handleInputChange('feeSpeed', speed)}
                selectedAsset={formData?.selectedAsset}
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendTransaction}
              disabled={!isFormValid}
              loading={false}
              fullWidth
              size="lg"
              iconName="Send"
              iconPosition="left"
              className="lg:hidden"
            >
              {!isFormValid ? 'Complete Form to Send' : `Send ${formData?.selectedAsset}`}
            </Button>
          </div>

          {/* Transaction Preview */}
          <div className="space-y-6">
            <TransactionPreview
              selectedAsset={formData?.selectedAsset}
              recipientAddress={formData?.recipientAddress}
              amount={formData?.amount}
              networkFee={networkFee}
              assets={assets}
              feeSpeed={formData?.feeSpeed}
            />

            {/* Desktop Send Button */}
            <Button
              onClick={handleSendTransaction}
              disabled={!isFormValid}
              loading={false}
              fullWidth
              size="lg"
              iconName="Send"
              iconPosition="left"
              className="hidden lg:flex"
            >
              {!isFormValid ? 'Complete Form to Send' : `Send ${formData?.selectedAsset}`}
            </Button>

            {/* Security Notice */}
            <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-warning mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-warning">Security Reminder</h3>
                  <p className="text-xs text-warning/80 mt-1">
                    Double-check the recipient address. Cryptocurrency transactions are irreversible.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="glass-card rounded-xl p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">Recent Sends</h3>
              <div className="space-y-2">
                {[
                  { asset: 'BTC', amount: '0.001', time: '2 hours ago', status: 'confirmed' },
                  { asset: 'ETH', amount: '0.5', time: '1 day ago', status: 'confirmed' },
                  { asset: 'USDT', amount: '100', time: '3 days ago', status: 'confirmed' }
                ]?.map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center">
                        <Icon name="ArrowUpRight" size={12} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-foreground">{tx?.amount} {tx?.asset}</p>
                        <p className="text-xs text-muted-foreground">{tx?.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-success"></div>
                      <span className="text-xs text-success capitalize">{tx?.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        transactionData={transactionData}
        onConfirm={handleConfirmTransaction}
      />
    </div>
  );
};

export default Send;