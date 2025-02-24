import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet, DollarSign, CreditCard, ArrowUpRight, ArrowDownLeft,
  Clock, Shield, AlertCircle, FileText, ChevronDown, Search,
  Filter, Eye, EyeOff, Lock, Briefcase, Bank, Plus, X,
  ArrowRight, RefreshCw, Download, Upload
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const WalletDashboard = () => {
  // State management
  const [showBalance, setShowBalance] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [activeTab, setActiveTab] = useState('transactions');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock wallet data
  const walletData = {
    balance: 2450.75,
    escrowHeld: 850.00,
    pendingPayments: 320.00,
    availableBalance: 1280.75,
    currency: 'USD',
    paymentMethods: [
      {
        id: 1,
        type: 'credit_card',
        name: 'Visa ending in 4242',
        expiryDate: '12/25',
        isDefault: true
      },
      {
        id: 2,
        type: 'bank_account',
        name: 'Bank Account ending in 1234',
        bankName: 'Chase',
        isDefault: false
      }
    ],
    transactions: [
      {
        id: 'TXN-2024-001',
        type: 'deposit',
        amount: 500.00,
        status: 'completed',
        date: '2024-01-15T10:30:00',
        description: 'Deposit via Credit Card',
        reference: 'DEP-12345',
        fees: 15.00,
        paymentMethod: 'Visa ending in 4242'
      },
      {
        id: 'TXN-2024-002',
        type: 'withdrawal',
        amount: 300.00,
        status: 'pending',
        date: '2024-01-14T15:45:00',
        description: 'Withdrawal to Bank Account',
        reference: 'WIT-67890',
        fees: 5.00,
        paymentMethod: 'Bank Account ending in 1234'
      },
      {
        id: 'TXN-2024-003',
        type: 'escrow',
        amount: 850.00,
        status: 'held',
        date: '2024-01-13T09:15:00',
        description: 'Project Payment Hold',
        reference: 'ESC-11223',
        projectId: 'PRJ-001',
        releaseDate: '2024-01-20T09:15:00'
      }
    ]
  };

  // Helper function for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Transaction modal component
  const TransactionModal = ({ transaction, onClose }) => {
    if (!transaction) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-lg w-full p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
              <p className="text-sm text-gray-600">Reference: {transaction.reference}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600">Amount</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(transaction.amount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Fees</span>
                <span className="text-gray-900">
                  {transaction.fees ? formatCurrency(transaction.fees) : 'N/A'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-medium capitalize">{transaction.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${
                  transaction.status === 'completed' ? 'text-green-600' :
                  transaction.status === 'pending' ? 'text-yellow-600' :
                  'text-blue-600'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">
                  {new Date(transaction.date).toLocaleString()}
                </span>
              </div>
              {transaction.releaseDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Release Date</span>
                  <span className="font-medium">
                    {new Date(transaction.releaseDate).toLocaleString()}
                  </span>
                </div>
              )}
              {transaction.paymentMethod && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium">{transaction.paymentMethod}</span>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600">{transaction.description}</p>
            </div>

            {transaction.type === 'escrow' && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-600">Funds are held in escrow</p>
                    <p className="text-sm text-blue-500">
                      Will be released on {new Date(transaction.releaseDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                Download Receipt
              </button>
              {transaction.status === 'held' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Project
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Add funds modal
  const AddFundsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-lg w-full p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Funds</h2>
              <p className="text-sm text-gray-600">Choose payment method and amount</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount to Add
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="space-y-2">
                {walletData.paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4 text-blue-600"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{method.name}</p>
                      {method.type === 'credit_card' && (
                        <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Transaction Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee (3%)</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Funds
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Withdraw funds modal
  const WithdrawModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-lg w-full p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Withdraw Funds</h2>
              <p className="text-sm text-gray-600">Available balance: {formatCurrency(walletData.availableBalance)}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  max={walletData.availableBalance}
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Withdrawal Method
              </label>
              <div className="space-y-2">
                {walletData.paymentMethods
                  .filter(method => method.type === 'bank_account')
                  .map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input type="radio"
                        name="withdrawalMethod"
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.bankName}</p>
                      </div>
                    </label>
                  ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Withdrawal Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total to Receive</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-600">
                  Withdrawals typically process within 1-3 business days
                </p>
              </div>
            </div>

            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Withdraw Funds
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your funds and transactions</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Balance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="text-gray-400 hover:text-gray-500"
              >
                {showBalance ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Balance</h3>
            <div className="mt-2">
              {showBalance ? (
                <span className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(walletData.balance)}
                </span>
              ) : (
                <span className="text-2xl font-semibold text-gray-900">••••••</span>
              )}
            </div>
          </Card>

          {/* Available Balance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
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
          </Card>

          {/* Escrow Balance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
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
          </Card>

          {/* Pending Balance */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
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
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setShowAddFunds(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="h-5 w-5" />
            Add Funds
          </button>
          <button
            onClick={() => setShowWithdraw(true)}
            className="flex items-center gap-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <Download className="h-5 w-5" />
            Withdraw
          </button>
        </div>

        {/* Main Content Tabs */}
        <Card className="mb-8">
          <div className="border-b">
            <div className="flex gap-6 px-6">
              {[
                { id: 'transactions', label: 'Transactions' },
                { id: 'payment_methods', label: 'Payment Methods' },
                { id: 'invoices', label: 'Invoices' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 relative ${
                    activeTab === tab.id
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'transactions' && (
            <>
              {/* Filters */}
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 sm:flex-none sm:min-w-[300px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      <Filter className="h-5 w-5" />
                      <span>Filters</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 pt-4 border-t"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="all">All Status</option>
                          <option value="completed">Completed</option>
                          <option value="pending">Pending</option>
                          <option value="failed">Failed</option>
                        </select>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Transactions List */}
              <div className="divide-y">
                {walletData.transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'deposit' ? 'bg-green-100' :
                          transaction.type === 'withdrawal' ? 'bg-red-100' :
                          'bg-blue-100'
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownLeft className={`h-5 w-5 ${
                              transaction.type === 'deposit' ? 'text-green-600' :
                              transaction.type === 'withdrawal' ? 'text-red-600' :
                              'text-blue-600'
                            }`} />
                          ) : transaction.type === 'withdrawal' ? (
                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                          ) : (
                            <Lock className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {transaction.reference} • {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'withdrawal' ? 'text-red-600' :
                          transaction.type === 'deposit' ? 'text-green-600' :
                          'text-blue-600'
                        }`}>
                          {transaction.type === 'withdrawal' ? '-' : '+'}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <span className={`text-sm ${
                          transaction.status === 'completed' ? 'text-green-600' :
                          transaction.status === 'pending' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        {/* Modals */}
        <AnimatePresence>
          {selectedTransaction && (
            <TransactionModal
              transaction={selectedTransaction}
              onClose={() => setSelectedTransaction(null)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddFunds && (
            <AddFundsModal
              isOpen={showAddFunds}
              onClose={() => setShowAddFunds(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showWithdraw && (
            <WithdrawModal
              isOpen={showWithdraw}
              onClose={() => setShowWithdraw(false)}
            />
          )}
        </AnimatePresence>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Footer Actions - Mobile Only */}
      <SharedFooter2/>
    </div>
  );
};

export default WalletDashboard;