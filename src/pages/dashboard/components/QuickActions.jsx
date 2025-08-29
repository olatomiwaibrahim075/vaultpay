import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleSend = () => {
    navigate('/send');
  };

  const handleReceive = () => {
    navigate('/receive');
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <Button
        variant="default"
        size="lg"
        iconName="Send"
        iconPosition="left"
        onClick={handleSend}
        className="h-14 gradient-primary hover:scale-105 transition-transform"
      >
        Send Crypto
      </Button>
      <Button
        variant="success"
        size="lg"
        iconName="Download"
        iconPosition="left"
        onClick={handleReceive}
        className="h-14 hover:scale-105 transition-transform"
      >
        Receive
      </Button>
    </div>
  );
};

export default QuickActions;