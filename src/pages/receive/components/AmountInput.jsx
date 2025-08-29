import React from 'react';
import Input from '../../../components/ui/Input';

const AmountInput = ({ amount, onAmountChange, asset }) => {
  const handleAmountChange = (e) => {
    const value = e?.target?.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/?.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <div className="space-y-2">
      <Input
        label={`Request Amount (Optional)`}
        type="text"
        placeholder={`0.00 ${asset}`}
        value={amount}
        onChange={handleAmountChange}
        description="Specify the amount you want to receive. This will be included in the QR code."
        className="font-mono"
      />
    </div>
  );
};

export default AmountInput;