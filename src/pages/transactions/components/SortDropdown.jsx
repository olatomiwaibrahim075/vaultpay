import React from 'react';
import Select from '../../../components/ui/Select';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'date-desc', label: 'Date (Newest First)' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'amount-desc', label: 'Amount (High to Low)' },
    { value: 'amount-asc', label: 'Amount (Low to High)' },
    { value: 'asset', label: 'Asset (A-Z)' }
  ];

  return (
    <Select
      options={sortOptions}
      value={sortBy}
      onChange={onSortChange}
      placeholder="Sort by..."
      className="w-48"
    />
  );
};

export default SortDropdown;