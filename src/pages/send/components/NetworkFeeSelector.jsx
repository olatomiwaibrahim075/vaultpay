import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NetworkFeeSelector = ({ selectedSpeed, onSpeedChange, selectedAsset }) => {
  const feeOptions = [
    {
      speed: 'slow',
      label: 'Slow',
      time: '30-60 min',
      fee: 0.00001,
      description: 'Lower priority, takes longer',
      icon: 'Turtle'
    },
    {
      speed: 'standard',
      label: 'Standard',
      time: '10-30 min',
      fee: 0.00005,
      description: 'Recommended for most transactions',
      icon: 'Zap'
    },
    {
      speed: 'fast',
      label: 'Fast',
      time: '1-10 min',
      fee: 0.0001,
      description: 'Higher priority, faster confirmation',
      icon: 'Rocket'
    }
  ];

  const selectedOption = feeOptions?.find(option => option?.speed === selectedSpeed);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">Network Fee</label>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          <Icon name="Info" size={14} />
          <span>Fee affects confirmation time</span>
        </div>
      </div>
      <div className="space-y-2">
        {feeOptions?.map((option) => (
          <button
            key={option?.speed}
            type="button"
            onClick={() => onSpeedChange(option?.speed)}
            className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
              selectedSpeed === option?.speed
                ? 'bg-primary/10 border-primary/30 ring-1 ring-primary/20' :'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedSpeed === option?.speed
                    ? 'bg-primary/20 text-primary' :'bg-white/10 text-muted-foreground'
                }`}>
                  <Icon name={option?.icon} size={16} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium text-foreground">{option?.label}</p>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-muted-foreground">
                      {option?.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{option?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-foreground">
                  {option?.fee} {selectedAsset}
                </p>
                <p className="text-xs text-muted-foreground">
                  ~${(option?.fee * 50000)?.toFixed(2)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {/* Fee Summary */}
      {selectedOption && (
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Icon name={selectedOption?.icon} size={16} className="text-primary" />
              <span className="text-foreground font-medium">{selectedOption?.label} Fee</span>
            </div>
            <span className="text-foreground font-mono">
              {selectedOption?.fee} {selectedAsset}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs mt-1">
            <span className="text-muted-foreground">Estimated Time</span>
            <span className="text-muted-foreground">{selectedOption?.time}</span>
          </div>
        </div>
      )}
      {/* Advanced Fee Options */}
      <button
        type="button"
        className="w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 text-left"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">Custom Fee</span>
          </div>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-1 ml-6">
          Set your own fee rate for advanced users
        </p>
      </button>
    </div>
  );
};

export default NetworkFeeSelector;