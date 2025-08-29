import React from 'react';
import { Helmet } from 'react-helmet';
import AppLogo from './components/AppLogo';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - VaultPay | Secure Crypto Wallet</title>
        <meta name="description" content="Sign in to your VaultPay crypto wallet. Secure, fast, and reliable cryptocurrency management platform." />
        <meta name="keywords" content="crypto wallet, bitcoin, ethereum, login, secure, blockchain" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
              {/* App Logo */}
              <AppLogo />
              
              {/* Login Form */}
              <LoginForm />
              
              {/* Security Badges */}
              <SecurityBadges />
            </div>
          </div>

          {/* Footer */}
          <footer className="relative z-10 py-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} VaultPay. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <span className="text-muted-foreground">•</span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
              <span className="text-muted-foreground">•</span>
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Support
              </button>
            </div>
          </footer>
        </div>

        {/* Mobile Safe Area */}
        <div className="fixed bottom-0 left-0 right-0 h-safe-area-inset-bottom bg-transparent pointer-events-none lg:hidden"></div>
      </div>
    </>
  );
};

export default LoginPage;