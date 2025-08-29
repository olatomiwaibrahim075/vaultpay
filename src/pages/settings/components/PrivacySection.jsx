import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySection = ({ isExpanded, onToggle }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [dataUsageConsent, setDataUsageConsent] = useState(true);

  const handleExportData = () => {
    // Mock export functionality
    const mockData = {
      profile: {
        name: "John Doe",
        email: "john.doe@example.com",
        createdAt: "2024-01-15T10:30:00Z"
      },
      transactions: [
        {
          id: "tx_001",
          type: "send",
          amount: "0.0025",
          currency: "BTC",
          date: "2024-08-20T14:30:00Z"
        }
      ]
    };

    const dataStr = JSON.stringify(mockData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vaultpay-data-export.json';
    link?.click();
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      // Mock account deletion
      alert('Account deletion request submitted. You will receive a confirmation email.');
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    }
  };

  return (
    <div className="glass-card rounded-xl border border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors rounded-xl"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <Icon name="Eye" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Privacy</h3>
            <p className="text-sm text-muted-foreground">Control your data and privacy</p>
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
          {/* Export Data */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Download" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground">Download your transaction history</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExportModal(true)}
            >
              Export
            </Button>
          </div>

          {/* Data Usage Consent */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Database" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Data Usage Analytics</p>
                <p className="text-xs text-muted-foreground">Help improve our services</p>
              </div>
            </div>
            <button
              onClick={() => setDataUsageConsent(!dataUsageConsent)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                dataUsageConsent ? 'bg-primary' : 'bg-white/20'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  dataUsageConsent ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={18} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                <p className="text-xs text-muted-foreground">Read our privacy policy</p>
              </div>
            </div>
            <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              <Icon name="Trash2" size={18} className="text-error" />
              <div>
                <p className="text-sm font-medium text-error">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account</p>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </Button>
          </div>
        </div>
      )}
      {/* Export Data Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowExportModal(false)} />
          <div className="relative w-full max-w-sm glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowExportModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                This will download a JSON file containing your profile information and transaction history.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowExportModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleExportData}
                  className="flex-1"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 glass" onClick={() => setShowDeleteModal(false)} />
          <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-error">Delete Account</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
              
              <div className="bg-error/10 border border-error/20 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-error">Warning</p>
                    <p className="text-xs text-error/80 mt-1">
                      This action cannot be undone. All your data will be permanently deleted.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                To confirm deletion, please type <strong>DELETE</strong> in the field below:
              </p>

              <input
                type="text"
                placeholder="Type DELETE to confirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-error mb-6"
              />

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="flex-1"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;