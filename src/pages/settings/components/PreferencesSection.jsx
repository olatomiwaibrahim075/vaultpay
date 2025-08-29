import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const PreferencesSection = ({ isExpanded, onToggle }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    transactions: true,
    priceAlerts: false,
    security: true,
    marketing: false
  });

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' }
  ];

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement?.classList?.add('dark');
    } else {
      document.documentElement?.classList?.remove('dark');
    }
  }, [darkMode]);

  const handleNotificationToggle = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev?.[type]
    }));
  };

  return (
    <div className="glass-card rounded-xl border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
            <p className="text-sm text-muted-foreground">Customize your app experience</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6 border-t border-white/10">
          {/* Dark Mode */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Moon" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-primary' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Currency */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Icon name="DollarSign" size={18} className="text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Primary Currency</p>
            </div>
            <Select
              options={currencyOptions}
              value={currency}
              onChange={setCurrency}
              className="ml-9"
            />
          </div>

          {/* Language */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <Icon name="Globe" size={18} className="text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Language</p>
            </div>
            <Select
              options={languageOptions}
              value={language}
              onChange={setLanguage}
              className="ml-9"
            />
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Icon name="Bell" size={18} className="text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">Notifications</p>
            </div>
            
            <div className="ml-9 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Transaction Alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified of all transactions</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('transactions')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications?.transactions ? 'bg-primary' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.transactions ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Price Alerts</p>
                  <p className="text-xs text-muted-foreground">Notify on significant price changes</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('priceAlerts')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications?.priceAlerts ? 'bg-primary' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.priceAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Security Alerts</p>
                  <p className="text-xs text-muted-foreground">Important security notifications</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('security')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications?.security ? 'bg-primary' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.security ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">Marketing</p>
                  <p className="text-xs text-muted-foreground">Product updates and promotions</p>
                </div>
                <button
                  onClick={() => handleNotificationToggle('marketing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications?.marketing ? 'bg-primary' : 'bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications?.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesSection;