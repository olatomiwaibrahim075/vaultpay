import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-glass-lg">
          <Icon name="Wallet" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">VaultPay</h1>
          <p className="text-sm text-muted-foreground">Secure Crypto Wallet</p>
        </div>
      </div>
      
      <div className="w-16 h-1 mx-auto rounded-full gradient-primary opacity-60"></div>
    </div>
  );
};

export default AppLogo;