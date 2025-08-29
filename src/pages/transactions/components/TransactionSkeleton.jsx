import React from 'react';

const TransactionSkeleton = () => {
  return (
    <div className="glass-card p-4 rounded-xl border animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Asset Icon Skeleton */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white/10"></div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white/10"></div>
          </div>

          {/* Transaction Details Skeleton */}
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <div className="h-4 bg-white/10 rounded w-20"></div>
              <div className="h-5 bg-white/10 rounded-full w-16"></div>
            </div>
            <div className="h-3 bg-white/10 rounded w-24 mt-2"></div>
          </div>
        </div>

        {/* Amount Skeleton */}
        <div className="text-right">
          <div className="h-4 bg-white/10 rounded w-20 mb-1"></div>
          <div className="h-3 bg-white/10 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSkeleton;