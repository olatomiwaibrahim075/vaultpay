import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = ({ className = '' }) => {
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  const tabItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/transactions', label: 'History', icon: 'Receipt' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
  ];

  return (
    <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t ${className}`}>
      <div className="flex items-center justify-around px-4 py-2 safe-area-pb">
        {tabItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`flex flex-col items-center space-y-1 px-4 py-3 rounded-xl transition-all duration-150 ease-smooth min-w-[48px] ${
              isActive(item?.path)
                ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-white/5'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={22} 
              className={`transition-transform duration-150 ${
                isActive(item?.path) ? 'scale-110' : 'hover:scale-105'
              }`}
            />
            <span className="text-xs font-medium">{item?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomTabNavigation;