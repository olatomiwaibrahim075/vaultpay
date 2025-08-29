import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SecuritySection = ({ isExpanded, onToggle }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const mockBackupPhrase = "abandon ability able about above absent absorb abstract absurd abuse access accident account accuse achieve acid acoustic acquire across act action actor actress actual";

  const handleBackupAccess = () => {
    if (authPassword === 'password123') {
      setShowBackupModal(true);
      setAuthPassword('');
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Use: password123');
    }
  };

  const copyBackupPhrase = () => {
    navigator.clipboard?.writeText(mockBackupPhrase);
  };

  return (
    <div className="glass-card rounded-xl border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security</h3>
            <p className="text-sm text-muted-foreground">Manage your account security</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-white/10">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Smartphone" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-primary' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Biometric Authentication */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Fingerprint" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Biometric Authentication</p>
                <p className="text-xs text-muted-foreground">Use fingerprint or face ID</p>
              </div>
            </div>
            <button
              onClick={() => setBiometricEnabled(!biometricEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                biometricEnabled ? 'bg-primary' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  biometricEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Backup Phrase */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Key" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Backup Phrase</p>
                <p className="text-xs text-muted-foreground">View your recovery phrase</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordModal(true)}
            >
              View
            </Button>
          </div>

          {/* Change Password */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Lock" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your account password</p>
              </div>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </div>
        </div>
      )}
      {/* Password Authentication Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowPasswordModal(false)} />
          <div className="relative w-full max-w-sm glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Enter Password</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPasswordModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Please enter your password to view the backup phrase
              </p>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e?.target?.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {authError && (
                  <p className="text-sm text-error">{authError}</p>
                )}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleBackupAccess}
                    className="flex-1"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Backup Phrase Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowBackupModal(false)} />
          <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Backup Phrase</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBackupModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <p className="text-sm text-warning">
                    Keep this phrase secure and never share it with anyone
                  </p>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                <p className="text-sm font-mono text-foreground leading-relaxed">
                  {mockBackupPhrase}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={copyBackupPhrase}
                  className="flex-1"
                  iconName="Copy"
                  iconPosition="left"
                >
                  Copy
                </Button>
                <Button
                  onClick={() => setShowBackupModal(false)}
                  className="flex-1"
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecuritySection;