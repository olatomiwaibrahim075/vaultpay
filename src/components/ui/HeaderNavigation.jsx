import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const HeaderNavigation = ({ className = '' }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [notifications] = useState(3); // Mock notification count

  const isActive = (path) => location?.pathname === path;

  const primaryNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/transactions', label: 'Transactions', icon: 'Receipt' },
    { path: '/send', label: 'Send', icon: 'Send' },
    { path: '/receive', label: 'Receive', icon: 'Download' },
  ];

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
        <Icon name="Wallet" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">VaultPay</span>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 glass-card border-b ${className}`}>
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ease-smooth hover:scale-102 ${
                  isActive(item?.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-white/5"
              >
                <Icon name="Bell" size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </Button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="hover:bg-white/5"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
              </Button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-48 glass-card border rounded-lg shadow-glass-lg animate-scale-in">
                  <div className="p-3 border-b border-white/10">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  <div className="p-1">
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <button
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md transition-colors"
                      onClick={() => {
                        setIsProfileOpen(false);
                        // Handle logout
                      }}
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden border-t border-white/10">
        <nav className="flex items-center justify-around px-4 py-2">
          {primaryNavItems?.slice(0, 4)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-150 ease-smooth ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={20} />
              <span className="text-xs font-medium">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      {/* Backdrop for profile dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </header>
  );
};

export default HeaderNavigation;