import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import SecuritySection from './components/SecuritySection';
import ProfileSection from './components/ProfileSection';
import PreferencesSection from './components/PreferencesSection';
import PrivacySection from './components/PrivacySection';
import SupportSection from './components/SupportSection';
import Icon from '../../components/AppIcon';

const Settings = () => {
  const [expandedSections, setExpandedSections] = useState({
    security: false,
    profile: false,
    preferences: false,
    privacy: false,
    support: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Settings - VaultPay</title>
        <meta name="description" content="Manage your VaultPay account settings, security, and preferences" />
      </Helmet>
      <HeaderNavigation />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Icon name="Settings" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account and preferences</p>
              </div>
            </div>
          </div>

          {/* Settings Sections */}
          <div className="space-y-4">
            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              <div className="space-y-4">
                <SecuritySection
                  isExpanded={expandedSections?.security}
                  onToggle={() => toggleSection('security')}
                />
                <PreferencesSection
                  isExpanded={expandedSections?.preferences}
                  onToggle={() => toggleSection('preferences')}
                />
                <SupportSection
                  isExpanded={expandedSections?.support}
                  onToggle={() => toggleSection('support')}
                />
              </div>
              <div className="space-y-4">
                <ProfileSection
                  isExpanded={expandedSections?.profile}
                  onToggle={() => toggleSection('profile')}
                />
                <PrivacySection
                  isExpanded={expandedSections?.privacy}
                  onToggle={() => toggleSection('privacy')}
                />
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              <SecuritySection
                isExpanded={expandedSections?.security}
                onToggle={() => toggleSection('security')}
              />
              <ProfileSection
                isExpanded={expandedSections?.profile}
                onToggle={() => toggleSection('profile')}
              />
              <PreferencesSection
                isExpanded={expandedSections?.preferences}
                onToggle={() => toggleSection('preferences')}
              />
              <PrivacySection
                isExpanded={expandedSections?.privacy}
                onToggle={() => toggleSection('privacy')}
              />
              <SupportSection
                isExpanded={expandedSections?.support}
                onToggle={() => toggleSection('support')}
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                VaultPay - Secure Cryptocurrency Wallet
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} VaultPay. All rights reserved.
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors">Terms of Service</button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">Privacy Policy</button>
                <span>•</span>
                <button className="hover:text-foreground transition-colors">Support</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomTabNavigation />
    </div>
  );
};

export default Settings;