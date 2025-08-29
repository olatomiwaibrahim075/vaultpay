import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChip = ({ label, count, isActive, onRemove, onClick }) => {
  if (isActive && onRemove) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
        <span>{label}</span>
        {count && (
          <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
        <button
          onClick={onRemove}
          className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
        >
          <Icon name="X" size={12} />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-150 whitespace-nowrap ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10'
      }`}
    >
      {label}
      {count && (
        <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default FilterChip;