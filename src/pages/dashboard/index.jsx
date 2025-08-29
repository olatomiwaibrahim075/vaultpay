import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import TransactionModal from '../../components/ui/TransactionModal';
import PortfolioSummary from './components/PortfolioSummary';
import AssetCard from './components/AssetCard';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import MarketOverview from './components/MarketOverview';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('send');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock cryptocurrency assets data
  const cryptoAssets = [
    {
      id: 'btc',
      name: 'Bitcoin',
      symbol: 'BTC',
      balance: 0.00234567,
      price: 67234.56,
      value: 157.68,
      change24h: 2.34
    },
    {
      id: 'eth',
      name: 'Ethereum',
      symbol: 'ETH',
      balance: 1.25678,
      price: 2469.00,
      value: 3102.45,
      change24h: -1.23
    },
    {
      id: 'usdt',
      name: 'Tether',
      symbol: 'USDT',
      balance: 5000.00,
      price: 1.00,
      value: 5000.00,
      change24h: 0.01
    }
  ];

  // Handle transaction modal for send/receive routes
  useEffect(() => {
    if (location?.pathname === '/send') {
      setTransactionType('send');
      setIsTransactionModalOpen(true);
    } else if (location?.pathname === '/receive') {
      setTransactionType('receive');
      setIsTransactionModalOpen(true);
    } else {
      setIsTransactionModalOpen(false);
    }
  }, [location?.pathname]);

  const handleCloseModal = () => {
    setIsTransactionModalOpen(false);
    navigate('/dashboard');
  };

  // Pull to refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Touch event handlers for pull-to-refresh
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    const threshold = 100;

    const handleTouchStart = (e) => {
      if (window.scrollY === 0) {
        startY = e?.touches?.[0]?.clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (window.scrollY === 0 && startY > 0) {
        currentY = e?.touches?.[0]?.clientY;
        pullDistance = currentY - startY;
        
        if (pullDistance > 0 && pullDistance < threshold * 2) {
          e?.preventDefault();
        }
      }
    };

    const handleTouchEnd = () => {
      if (pullDistance > threshold) {
        handleRefresh();
      }
      startY = 0;
      currentY = 0;
      pullDistance = 0;
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - VaultPay</title>
        <meta name="description" content="Monitor your cryptocurrency portfolio with real-time balances and market data" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Navigation */}
        <HeaderNavigation />

        {/* Main Content */}
        <main className="pt-16 pb-20 lg:pb-8">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            {/* Refresh Indicator */}
            {isRefreshing && (
              <div className="fixed top-16 left-0 right-0 z-40 bg-primary/10 border-b border-primary/20 p-2">
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm font-medium">Refreshing...</span>
                </div>
              </div>
            )}

            <div className="py-6">
              {/* Welcome Section */}
              <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Welcome back, John
                </h1>
                <p className="text-muted-foreground">
                  Here's your portfolio overview for today
                </p>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
                {/* Left Column - Portfolio & Actions */}
                <div className="lg:col-span-8 space-y-6">
                  <PortfolioSummary />
                  <QuickActions />
                  
                  {/* Assets Grid */}
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Your Assets</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {cryptoAssets?.map((asset) => (
                        <AssetCard key={asset?.id} asset={asset} />
                      ))}
                    </div>
                  </div>

                  <RecentTransactions />
                </div>

                {/* Right Column - Market Overview */}
                <div className="lg:col-span-4">
                  <MarketOverview />
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden space-y-6">
                <PortfolioSummary />
                <QuickActions />
                
                {/* Assets Grid */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Your Assets</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cryptoAssets?.map((asset) => (
                      <AssetCard key={asset?.id} asset={asset} />
                    ))}
                  </div>
                </div>

                <MarketOverview />
                <RecentTransactions />
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Tab Navigation */}
        <BottomTabNavigation />

        {/* Transaction Modal */}
        <TransactionModal
          isOpen={isTransactionModalOpen}
          onClose={handleCloseModal}
          type={transactionType}
        />
      </div>
    </>
  );
};

export default Dashboard;