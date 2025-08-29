import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'demo@vaultpay.com',
    password: 'VaultPay123!',
    twoFACode: '123456'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Check credentials
    if (formData?.email !== mockCredentials?.email || formData?.password !== mockCredentials?.password) {
      setErrors({ 
        general: `Invalid credentials. Use email: ${mockCredentials?.email} and password: ${mockCredentials?.password}` 
      });
      setIsLoading(false);
      return;
    }

    // Show 2FA modal
    setShowTwoFA(true);
    setIsLoading(false);
  };

  const handleTwoFAVerification = async (e) => {
    e?.preventDefault();
    
    if (!twoFACode?.trim()) {
      setErrors({ twoFA: 'Verification code is required' });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (twoFACode !== mockCredentials?.twoFACode) {
      setErrors({ twoFA: `Invalid code. Use: ${mockCredentials?.twoFACode}` });
      setIsLoading(false);
      return;
    }

    // Success - navigate to dashboard
    navigate('/dashboard');
  };

  const handleBiometricAuth = async () => {
    setIsLoading(true);
    
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock success
    navigate('/dashboard');
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    navigate('/dashboard');
  };

  if (showTwoFA) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="glass-card rounded-2xl p-8 shadow-glass-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Two-Factor Authentication</h2>
            <p className="text-muted-foreground">
              Enter the 6-digit code from your authenticator app
            </p>
          </div>

          <form onSubmit={handleTwoFAVerification} className="space-y-6">
            <Input
              label="Verification Code"
              type="text"
              placeholder="000000"
              value={twoFACode}
              onChange={(e) => {
                setTwoFACode(e?.target?.value);
                if (errors?.twoFA) setErrors(prev => ({ ...prev, twoFA: '' }));
              }}
              error={errors?.twoFA}
              required
              className="text-center font-mono text-lg tracking-widest"
              maxLength={6}
            />

            {errors?.general && (
              <div className="p-3 rounded-lg bg-error/10 border border-error/20">
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                type="submit"
                loading={isLoading}
                fullWidth
                className="h-12"
              >
                Verify & Sign In
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowTwoFA(false)}
                fullWidth
              >
                Back to Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-card rounded-2xl p-8 shadow-glass-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to access your crypto wallet
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData?.password}
              onChange={(e) => handleInputChange('password', e?.target?.value)}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
            </button>
          </div>

          {errors?.general && (
            <div className="p-3 rounded-lg bg-error/10 border border-error/20">
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              loading={isLoading}
              fullWidth
              className="h-12"
            >
              Sign In
            </Button>

            {/* Biometric Authentication */}
            <Button
              type="button"
              variant="outline"
              onClick={handleBiometricAuth}
              fullWidth
              iconName="Fingerprint"
              iconPosition="left"
              className="h-12"
            >
              Use Biometric Login
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
              onClick={() => {/* Handle forgot password */}}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              iconName="Chrome"
              iconPosition="left"
              className="h-11"
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin('apple')}
              iconName="Apple"
              iconPosition="left"
              className="h-11"
            >
              Apple
            </Button>
          </div>
        </div>

        {/* Create Account */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              type="button"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
              onClick={() => {/* Handle create account */}}
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;