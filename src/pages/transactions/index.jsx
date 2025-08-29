import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HeaderNavigation from '../../components/ui/HeaderNavigation';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import TransactionCard from './components/TransactionCard';
import FilterChip from './components/FilterChip';
import FilterPanel from './components/FilterPanel';
import TransactionDetailModal from './components/TransactionDetailModal';
import TransactionSkeleton from './components/TransactionSkeleton';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';

const TransactionsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('date-desc');
  const [filters, setFilters] = useState({
    assets: [],
    status: [],
    types: [],
    dateFrom: '',
    dateTo: '',
    amountMin: '',
    amountMax: ''
  });

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'tx1',
      type: 'received',
      asset: 'BTC',
      amount: 0.5,
      usdValue: 21500.00,
      status: 'success',
      date: new Date('2024-08-24T14:30:00'),
      hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z'
    },
    {
      id: 'tx2',
      type: 'sent',
      asset: 'ETH',
      amount: 2.5,
      usdValue: 6250.00,
      status: 'success',
      date: new Date('2024-08-24T10:15:00'),
      hash: '0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a'
    },
    {
      id: 'tx3',
      type: 'received',
      asset: 'USDT',
      amount: 1000,
      usdValue: 1000.00,
      status: 'pending',
      date: new Date('2024-08-24T08:45:00'),
      hash: '0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b'
    },
    {
      id: 'tx4',
      type: 'sent',
      asset: 'BNB',
      amount: 10,
      usdValue: 2400.00,
      status: 'failed',
      date: new Date('2024-08-23T16:20:00'),
      hash: '0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c'
    },
    {
      id: 'tx5',
      type: 'received',
      asset: 'BTC',
      amount: 0.25,
      usdValue: 10750.00,
      status: 'success',
      date: new Date('2024-08-23T12:10:00'),
      hash: '0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d'
    },
    {
      id: 'tx6',
      type: 'sent',
      asset: 'ETH',
      amount: 1.0,
      usdValue: 2500.00,
      status: 'success',
      date: new Date('2024-08-22T20:30:00'),
      hash: '0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e'
    },
    {
      id: 'tx7',
      type: 'received',
      asset: 'USDT',
      amount: 500,
      usdValue: 500.00,
      status: 'success',
      date: new Date('2024-08-22T14:15:00'),
      hash: '0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e6f'
    },
    {
      id: 'tx8',
      type: 'sent',
      asset: 'BTC',
      amount: 0.1,
      usdValue: 4300.00,
      status: 'pending',
      date: new Date('2024-08-21T11:45:00'),
      hash: '0x8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z1a2b3c4d5e6f7g'
    }
  ];

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = mockTransactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered?.filter(tx => 
        tx?.asset?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        tx?.type?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        tx?.status?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Apply filters
    if (filters?.assets?.length > 0) {
      filtered = filtered?.filter(tx => filters?.assets?.includes(tx?.asset));
    }

    if (filters?.status?.length > 0) {
      filtered = filtered?.filter(tx => filters?.status?.includes(tx?.status));
    }

    if (filters?.types?.length > 0) {
      filtered = filtered?.filter(tx => filters?.types?.includes(tx?.type));
    }

    if (filters?.dateFrom) {
      filtered = filtered?.filter(tx => new Date(tx.date) >= new Date(filters.dateFrom));
    }

    if (filters?.dateTo) {
      filtered = filtered?.filter(tx => new Date(tx.date) <= new Date(filters.dateTo));
    }

    if (filters?.amountMin) {
      filtered = filtered?.filter(tx => tx?.usdValue >= parseFloat(filters?.amountMin));
    }

    if (filters?.amountMax) {
      filtered = filtered?.filter(tx => tx?.usdValue <= parseFloat(filters?.amountMax));
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'amount-desc':
          return b?.usdValue - a?.usdValue;
        case 'amount-asc':
          return a?.usdValue - b?.usdValue;
        case 'asset':
          return a?.asset?.localeCompare(b?.asset);
        default:
          return 0;
      }
    });

    return filtered;
  }, [mockTransactions, searchTerm, filters, sortBy]);

  // Get active filter chips
  const getActiveFilterChips = () => {
    const chips = [];
    
    if (filters?.assets?.length > 0) {
      chips?.push({
        key: 'assets',
        label: 'Assets',
        count: filters?.assets?.length,
        onRemove: () => setFilters(prev => ({ ...prev, assets: [] }))
      });
    }

    if (filters?.status?.length > 0) {
      chips?.push({
        key: 'status',
        label: 'Status',
        count: filters?.status?.length,
        onRemove: () => setFilters(prev => ({ ...prev, status: [] }))
      });
    }

    if (filters?.types?.length > 0) {
      chips?.push({
        key: 'types',
        label: 'Type',
        count: filters?.types?.length,
        onRemove: () => setFilters(prev => ({ ...prev, types: [] }))
      });
    }

    if (filters?.dateFrom || filters?.dateTo) {
      chips?.push({
        key: 'date',
        label: 'Date Range',
        count: null,
        onRemove: () => setFilters(prev => ({ ...prev, dateFrom: '', dateTo: '' }))
      });
    }

    return chips;
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleExport = () => {
    // Mock CSV export functionality
    const csvContent = "data:text/csv;charset=utf-8," +"Date,Type,Asset,Amount,USD Value,Status\n"
      + filteredAndSortedTransactions?.map(tx => 
          `${tx?.date?.toISOString()},${tx?.type},${tx?.asset},${tx?.amount},${tx?.usdValue},${tx?.status}`
        )?.join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link?.setAttribute("href", encodedUri);
    link?.setAttribute("download", "transactions.csv");
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const loadMoreTransactions = () => {
    setIsLoading(true);
    // Simulate loading more transactions
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // Simulate initial loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeaderNavigation />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
              <p className="text-muted-foreground">
                {filteredAndSortedTransactions?.length} transactions found
              </p>
            </div>
            
            <div className="hidden lg:flex items-center space-x-3">
              <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
              <Button
                variant="outline"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Export
              </Button>
            </div>
          </div>

          <div className="lg:flex lg:space-x-6">
            {/* Main Content */}
            <div className="lg:flex-1">
              {/* Search and Filters */}
              <div className="space-y-4 mb-6">
                <SearchBar 
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search by asset, type, or status..."
                />

                {/* Filter Chips */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterPanelOpen(true)}
                    iconName="Filter"
                    iconPosition="left"
                    className="flex-shrink-0"
                  >
                    Filters
                  </Button>

                  {getActiveFilterChips()?.map((chip) => (
                    <FilterChip
                      key={chip?.key}
                      label={chip?.label}
                      count={chip?.count}
                      isActive={true}
                      onClick={() => {}}
                      onRemove={chip?.onRemove}
                    />
                  ))}

                  {getActiveFilterChips()?.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFilters({
                        assets: [],
                        status: [],
                        types: [],
                        dateFrom: '',
                        dateTo: '',
                        amountMin: '',
                        amountMax: ''
                      })}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Mobile Sort and Export */}
                <div className="lg:hidden flex items-center justify-between">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExport}
                    iconName="Download"
                  >
                    Export
                  </Button>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-3">
                {filteredAndSortedTransactions?.length === 0 && !isLoading ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/10 flex items-center justify-center">
                      <Icon name="Receipt" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setFilters({
                          assets: [],
                          status: [],
                          types: [],
                          dateFrom: '',
                          dateTo: '',
                          amountMin: '',
                          amountMax: ''
                        });
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <>
                    {filteredAndSortedTransactions?.map((transaction) => (
                      <TransactionCard
                        key={transaction?.id}
                        transaction={transaction}
                        onClick={handleTransactionClick}
                      />
                    ))}

                    {/* Loading Skeletons */}
                    {isLoading && (
                      <>
                        {[...Array(3)]?.map((_, index) => (
                          <TransactionSkeleton key={`skeleton-${index}`} />
                        ))}
                      </>
                    )}

                    {/* Load More Button */}
                    {filteredAndSortedTransactions?.length > 0 && !isLoading && (
                      <div className="text-center pt-6">
                        <Button
                          variant="outline"
                          onClick={loadMoreTransactions}
                          iconName="ChevronDown"
                          iconPosition="right"
                        >
                          Load More Transactions
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Desktop Filter Panel */}
            <div className="hidden lg:block">
              <FilterPanel
                isOpen={true}
                onClose={() => {}}
                filters={filters}
                onFiltersChange={setFilters}
                onApply={() => {}}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={() => setIsFilterPanelOpen(false)}
      />
      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
      <BottomTabNavigation />
    </div>
  );
};

export default TransactionsPage;