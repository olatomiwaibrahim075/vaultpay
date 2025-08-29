import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = "Search transactions..." }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <Icon name="Search" size={18} />
      </div>
      <Input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e?.target?.value)}
        className="pl-10 bg-white/5 border-white/10 focus:border-primary/50"
      />
    </div>
  );
};

export default SearchBar;