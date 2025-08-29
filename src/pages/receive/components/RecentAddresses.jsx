import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentAddresses = ({ addresses, onSelectAddress }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(date);
  };

  if (!addresses || addresses?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">Recent Addresses</h3>
      <div className="space-y-3">
        {addresses?.map((addressData, index) => (
          <div key={index} className="glass-card p-4 rounded-xl border">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(addressData?.createdAt)}
                  </span>
                  {addressData?.used && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                      <Icon name="Check" size={12} className="mr-1" />
                      Used
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm text-foreground truncate">
                  {addressData?.address}
                </p>
                {addressData?.amount && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Requested: {addressData?.amount} {addressData?.asset}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2 ml-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigator.clipboard?.writeText(addressData?.address)}
                  className="hover:bg-white/10"
                >
                  <Icon name="Copy" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSelectAddress(addressData)}
                  className="hover:bg-white/10"
                >
                  <Icon name="RotateCcw" size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentAddresses;