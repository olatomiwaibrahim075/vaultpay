import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Storage',
      description: 'Cold wallet protection'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified',
      description: 'Blockchain verified'
    }
  ];

  return (
    <div className="mt-12 pt-8 border-t border-white/10">
      <div className="text-center mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">
          Your security is our priority
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Protected by industry-leading security standards
        </p>
      </div>
    </div>
  );
};

export default SecurityBadges;