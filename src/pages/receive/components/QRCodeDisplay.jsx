import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRCodeDisplay = ({ address, amount, asset, onCopyAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard?.writeText(address);
      setCopied(true);
      onCopyAddress();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}${amount ? `?amount=${amount}` : ''}`;

  return (
    <div className="space-y-6">
      {/* QR Code */}
      <div className="flex flex-col items-center">
        <div className="p-6 bg-white rounded-2xl shadow-glass-lg">
          <div className="w-48 h-48 lg:w-56 lg:h-56 bg-white rounded-xl flex items-center justify-center">
            <img 
              src={qrCodeUrl}
              alt={`QR code for ${asset} address`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTAwIDUwQzEyNy42MTQgNTAgMTUwIDcyLjM4NTggMTUwIDEwMEMxNTAgMTI3LjYxNCAxMjcuNjE0IDE1MCAxMDAgMTUwQzcyLjM4NTggMTUwIDUwIDEyNy42MTQgNTAgMTAwQzUwIDcyLjM4NTggNzIuMzg1OCA1MCAxMDAgNTBaIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
              }}
            />
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4 max-w-xs">
          Scan this QR code to send {asset} to your wallet
        </p>
      </div>

      {/* Address Display */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Your {asset} Address</label>
        <div className="glass-card p-4 rounded-xl border">
          <div className="flex items-center justify-between space-x-3">
            <span className="font-mono text-sm text-foreground break-all flex-1">
              {address}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopyAddress}
              className="flex-shrink-0 hover:bg-white/10"
            >
              <Icon name={copied ? "Check" : "Copy"} size={16} />
            </Button>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={handleCopyAddress}
          iconName={copied ? "Check" : "Copy"}
          iconPosition="left"
          className="w-full"
        >
          {copied ? "Address Copied!" : "Copy Address"}
        </Button>
      </div>

      {/* Security Notice */}
      <div className="glass-card p-4 rounded-xl border border-warning/20 bg-warning/5">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">Security Notice</h4>
            <p className="text-xs text-muted-foreground">
              Always verify the address before sharing. Never share your private keys or seed phrase with anyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;