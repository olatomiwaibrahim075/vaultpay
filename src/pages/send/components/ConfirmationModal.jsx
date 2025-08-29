import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  transactionData, 
  onConfirm 
}) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('auth'); // 'auth', 'processing', 'success', 'error'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep('auth');
      setPassword('');
      setError('');
      setTransactionHash('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && step === 'auth') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, step, onClose]);

  const handleAuthentication = async () => {
    if (!password) {
      setError('Please enter your password');
      return;
    }

    // Mock authentication - use 'wallet123' as correct password
    if (password !== 'wallet123') {
      setError('Incorrect password. Try: wallet123');
      return;
    }

    setIsLoading(true);
    setError('');
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStep('processing');
    setIsLoading(false);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate mock transaction hash
    const mockHash = '0x' + Math.random()?.toString(16)?.substr(2, 64);
    setTransactionHash(mockHash);
    setStep('success');
    
    // Call onConfirm callback
    if (onConfirm) {
      onConfirm({
        ...transactionData,
        hash: mockHash,
        status: 'pending',
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const handleClose = () => {
    if (step === 'success') {
      navigate('/transactions');
    }
    onClose();
  };

  const copyHash = () => {
    navigator.clipboard?.writeText(transactionHash);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 glass" />
      {/* Modal */}
      <div className="relative w-full max-w-md glass-card rounded-2xl shadow-glass-xl animate-scale-in">
        {step === 'auth' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 text-warning flex items-center justify-center">
                  <Icon name="Shield" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Confirm Transaction</h2>
                  <p className="text-sm text-muted-foreground">Authenticate to proceed</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/5"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Transaction Summary */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sending</span>
                    <span className="text-foreground font-mono">
                      {transactionData?.amount} {transactionData?.asset}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To</span>
                    <span className="text-foreground font-mono text-xs">
                      {transactionData?.recipient?.slice(0, 8)}...{transactionData?.recipient?.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fee</span>
                    <span className="text-foreground font-mono">
                      {transactionData?.fee} {transactionData?.asset}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-foreground font-medium">Total</span>
                    <span className="text-foreground font-mono font-medium">
                      {transactionData?.total} {transactionData?.asset}
                    </span>
                  </div>
                </div>
              </div>

              {/* Authentication */}
              <div className="space-y-4">
                <Input
                  label="Wallet Password"
                  type="password"
                  placeholder="Enter your wallet password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e?.target?.value);
                    setError('');
                  }}
                  error={error}
                  required
                />
                
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-blue-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-blue-400 font-medium">Demo Credentials</p>
                      <p className="text-blue-300 text-xs mt-1">Password: wallet123</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAuthentication}
                  loading={isLoading}
                  className="flex-1"
                >
                  Confirm & Send
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Processing Transaction</h2>
              <p className="text-muted-foreground">
                Broadcasting to the network...
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground">This may take a few moments</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <>
            <div className="p-8 text-center space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={32} className="text-success" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Transaction Sent!</h2>
                <p className="text-muted-foreground">
                  Your transaction has been broadcast to the network
                </p>
              </div>
              
              {/* Transaction Hash */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Transaction Hash</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={copyHash}
                    iconName="Copy"
                    iconSize={14}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs font-mono text-foreground break-all">{transactionHash}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  View Transactions
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;