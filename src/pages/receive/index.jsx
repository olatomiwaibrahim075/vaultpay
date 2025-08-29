import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import AssetSelector from './components/AssetSelector';
import QRCodeDisplay from './components/QRCodeDisplay';
import AmountInput from './components/AmountInput';
import ShareOptions from './components/ShareOptions';
import RecentAddresses from './components/RecentAddresses';

const ReceivePage = () => {
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [requestAmount, setRequestAmount] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const [recentAddresses, setRecentAddresses] = useState([]);

  // Mock cryptocurrency assets data
  const assets = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      icon: 'Bitcoin',
      balance: '0.00234567',
      usdValue: '156.78',
      bgColor: 'bg-orange-500'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      icon: 'Zap',
      balance: '1.45678901',
      usdValue: '4,234.56',
      bgColor: 'bg-blue-500'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      icon: 'DollarSign',
      balance: '1,250.00',
      usdValue: '1,250.00',
      bgColor: 'bg-green-500'
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      icon: 'Coins',
      balance: '5.67890123',
      usdValue: '2,890.45',
      bgColor: 'bg-yellow-500'
    }
  ];

  // Mock addresses for different assets
  const mockAddresses = {
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742d35Cc6634C0532925a3b8D4C2F8b4C2F8b4C2',
    USDT: '0x742d35Cc6634C0532925a3b8D4C2F8b4C2F8b4C2',
    BNB: 'bnb1xy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  };

  // Mock recent addresses data
  const mockRecentAddresses = {
    BTC: [
      {
        address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
        createdAt: new Date(Date.now() - 3600000),
        used: true,
        amount: '0.001',
        asset: 'BTC'
      },
      {
        address: 'bc1qab3kgdygjrsqtzq2n0yrf2493p83kkfjhx0abc',
        createdAt: new Date(Date.now() - 7200000),
        used: false,
        amount: '',
        asset: 'BTC'
      }
    ],
    ETH: [
      {
        address: '0x742d35Cc6634C0532925a3b8D4C2F8b4C2F8b4C2',
        createdAt: new Date(Date.now() - 1800000),
        used: false,
        amount: '0.5',
        asset: 'ETH'
      }
    ]
  };

  // Update current address when asset changes
  useEffect(() => {
    setCurrentAddress(mockAddresses?.[selectedAsset] || '');
    setRecentAddresses(mockRecentAddresses?.[selectedAsset] || []);
  }, [selectedAsset]);

  const handleAssetChange = (asset) => {
    setSelectedAsset(asset);
    setRequestAmount('');
  };

  const handleGenerateNewAddress = () => {
    // Simulate generating a new address
    const newAddress = mockAddresses?.[selectedAsset] + Math.random()?.toString(36)?.substr(2, 5);
    setCurrentAddress(newAddress);
    
    // Add to recent addresses
    const newAddressData = {
      address: newAddress,
      createdAt: new Date(),
      used: false,
      amount: requestAmount,
      asset: selectedAsset
    };
    
    setRecentAddresses(prev => [newAddressData, ...prev?.slice(0, 4)]);
  };

  const handleSelectRecentAddress = (addressData) => {
    setCurrentAddress(addressData?.address);
    setRequestAmount(addressData?.amount || '');
  };

  const handleCopyAddress = () => {
    // This is handled in the QRCodeDisplay component
  };

  const selectedAssetData = assets?.find(asset => asset?.symbol === selectedAsset);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-2xl mx-auto px-4 lg:px-6 py-6">
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
                <h1 className="text-2xl font-semibold text-foreground">Receive Crypto</h1>
                <p className="text-sm text-muted-foreground">
                  Generate QR code and share your wallet address
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleGenerateNewAddress}
              iconName="RefreshCw"
              iconPosition="left"
              size="sm"
            >
              New Address
            </Button>
          </div>

          <div className="space-y-8">
            {/* Asset Selection */}
            <AssetSelector
              selectedAsset={selectedAsset}
              onAssetChange={handleAssetChange}
              assets={assets}
            />

            {/* Amount Input */}
            <AmountInput
              amount={requestAmount}
              onAmountChange={setRequestAmount}
              asset={selectedAsset}
            />

            {/* QR Code Display */}
            <QRCodeDisplay
              address={currentAddress}
              amount={requestAmount}
              asset={selectedAsset}
              onCopyAddress={handleCopyAddress}
            />

            {/* Share Options */}
            <ShareOptions
              address={currentAddress}
              amount={requestAmount}
              asset={selectedAsset}
            />

            {/* Recent Addresses */}
            <RecentAddresses
              addresses={recentAddresses}
              onSelectAddress={handleSelectRecentAddress}
            />

            {/* Quick Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="flex-1"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="default"
                onClick={() => navigate('/transactions')}
                iconName="Receipt"
                iconPosition="left"
                className="flex-1"
              >
                View Transactions
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default ReceivePage;