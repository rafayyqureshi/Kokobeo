import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft,
  Clock, Shield, AlertCircle, FileText, ChevronDown, Search,
  Filter, Eye, EyeOff, Lock, Briefcase, ChevronRight
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const WalletPage = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock wallet data
  const walletData = {
    balance: 2450.75,
    escrowHeld: 850.00,
    pendingPayments: 320.00,
    availableBalance: 1280.75,
    currency: 'USD'
  };

  // Mock transaction history
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: 500.00,
      status: 'completed',
      date: '2024-01-08T10:30:00',
      description: 'Deposit via Credit Card',
      reference: 'DEP-12345'
    },
    {
      id: 2,
      type: 'escrow',
      amount: 350.00,
      status: 'held',
      date: '2024-01-07T15:45:00',
      description: 'Project Payment Hold - Web Development',
      reference: 'ESC-67890',
      releaseDate: '2024-01-14T15:45:00'
    },
    {
      id: 3,
      type: 'withdrawal',
      amount: 200.00,
      status: 'completed',
      date: '2024-01-06T09:15:00',
      description: 'Withdrawal to Bank Account',
      reference: 'WIT-11223'
    }
  ];

  // Helper function for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-red-500" />;
      case 'escrow':
        return <Lock className="w-4 h-4 text-blue-500" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: 'bg-green-50 text-green-700',
      pending: 'bg-yellow-50 text-yellow-700',
      held: 'bg-blue-50 text-blue-700',
      failed: 'bg-red-50 text-red-700'
    };

    return (
      <Badge className={variants[status] || 'bg-gray-50 text-gray-700'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <img
                  src="https://assests.netlify.app/assets/images/logo.png"
                  alt="Kokobeo Logo"
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold text-blue-600">Kokobeo</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="/transactions" className="text-gray-600 hover:text-gray-900 text-sm">
                Transaction History
              </a>
              <a href="/payment-methods" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm">
                <CreditCard className="w-4 h-4" />
                Payment Methods
              </a>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div className={`absolute top-16 left-0 right-0 bg-white border-b shadow-lg md:hidden ${showMobileMenu ? 'block' : 'hidden'}`}>
              <div className="px-4 py-2 space-y-3">
                <a href="/transactions" className="block py-2 text-gray-600 hover:text-gray-900">
                  Transaction History
                </a>
                <a href="/payment-methods" className="block py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Payment Methods
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        {/* Balance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Balance Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
                <div className="mt-2 flex items-baseline">
                  {showBalance ? (
                    <span className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(walletData.balance)}
                    </span>
                  ) : (
                    <span className="text-2xl font-semibold text-gray-900">••••••</span>
                  )}
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="ml-2 text-gray-400 hover:text-gray-500"
                  >
                    {showBalance ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Available Balance Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Available Balance</h3>
                <div className="mt-2">
                  {showBalance ? (
                    <span className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(walletData.availableBalance)}
                    </span>
                  ) : (
                    <span className="text-2xl font-semibold text-gray-900">••••••</span>
                  )}
                </div>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>

          {/* Escrow Held Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">In Escrow</h3>
                <div className="mt-2">
                  {showBalance ? (
                    <span className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(walletData.escrowHeld)}
                    </span>
                  ) : (
                    <span className="text-2xl font-semibold text-gray-900">••••••</span>
                  )}
                </div>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Pending Payments Card */}
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pending Payments</h3>
                <div className="mt-2">
                  {showBalance ? (
                    <span className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(walletData.pendingPayments)}
                    </span>
                  ) : (
                    <span className="text-2xl font-semibold text-gray-900">••••••</span>
                  )}
                </div>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <ArrowDownLeft className="w-4 h-4" />
            Deposit Funds
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Withdraw Funds
          </button>
        </div>

        {/* Transaction History */}
        <Card className="overflow-hidden" style={{ textAlign: 'left' }}>
          <div className="border-b border-gray-200 p-4 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t"
                >
                  <div className="flex gap-4">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="held">Held in Escrow</option>
                      <option value="failed">Failed</option>
                    </select>
                    {/* Add more filters as needed */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Transactions List */}
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()} •{' '}
                        {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${
                        transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {transaction.type === 'withdrawal' ? '-' : '+'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      {getStatusBadge(transaction.status)}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-gray-500">
              <a href="/how-it-works" className="hover:text-gray-900">How it Works</a>
              <a href="/emergency" className="hover:text-gray-900">Emergency Services</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy</a>
              <a href="/terms" className="hover:text-gray-900">Terms</a>
            </div>
            <div className="text-sm text-gray-500 text-left sm:text-right">
              © {new Date().getFullYear()} Kokobeo - Goldman services INC
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WalletPage;