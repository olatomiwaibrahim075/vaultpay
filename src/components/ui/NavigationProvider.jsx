import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

const NavigationProvider = ({ children }) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/dashboard');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('send');
  const [isMobile, setIsMobile] = useState(false);

  // Update active tab based on current route
  useEffect(() => {
    setActiveTab(location?.pathname);
  }, [location?.pathname]);

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const openTransactionModal = (type) => {
    setTransactionType(type);
    setIsTransactionModalOpen(true);
  };

  const closeTransactionModal = () => {
    setIsTransactionModalOpen(false);
  };

  const navigationItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      isPrimary: true,
    },
    {
      path: '/transactions',
      label: 'Transactions',
      icon: 'Receipt',
      isPrimary: true,
    },
    {
      path: '/send',
      label: 'Send',
      icon: 'Send',
      isPrimary: true,
      isModal: true,
    },
    {
      path: '/receive',
      label: 'Receive',
      icon: 'Download',
      isPrimary: true,
      isModal: true,
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: 'Settings',
      isPrimary: false,
    },
  ];

  const value = {
    activeTab,
    setActiveTab,
    isTransactionModalOpen,
    transactionType,
    openTransactionModal,
    closeTransactionModal,
    navigationItems,
    isMobile,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationProvider;