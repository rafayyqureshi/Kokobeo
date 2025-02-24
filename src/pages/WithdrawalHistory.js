import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Search, Filter, ArrowUpRight, Clock,
  CheckCircle, XCircle, AlertCircle, Bank, DollarSign,
  FileText, Calendar, ChevronDown, X, ArrowRight,
  ExternalLink,
  BanknoteIcon
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const WithdrawHistory = () => {
  // State management
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  // Mock withdrawal data
  const withdrawals = [
    {
      id: 'WD-2024-001',
      amount: 1500.00,
      fees: 15.00,
      netAmount: 1485.00,
      status: 'completed',
      date: '2024-01-15T10:30:00',
      completedDate: '2024-01-17T14:20:00',
      method: {
        type: 'bank_account',
        name: 'Bank of America',
        accountNumber: '****1234',
        accountType: 'Checking'
      },
      reference: 'TRF-123456',
      notes: 'Regular monthly withdrawal',
      timeline: [
        { 
          status: 'initiated',
          date: '2024-01-15T10:30:00',
          description: 'Withdrawal request initiated'
        },
        {
          status: 'processing',
          date: '2024-01-16T09:15:00',
          description: 'Processing with bank'
        },
        {
          status: 'completed',
          date: '2024-01-17T14:20:00',
          description: 'Funds transferred successfully'
        }
      ]
    },
    {
      id: 'WD-2024-002',
      amount: 2000.00,
      fees: 20.00,
      netAmount: 1980.00,
      status: 'processing',
      date: '2024-01-14T15:45:00',
      method: {
        type: 'bank_account',
        name: 'Chase Bank',
        accountNumber: '****5678',
        accountType: 'Savings'
      },
      reference: 'TRF-123457',
      notes: 'Project payment withdrawal',
      timeline: [
        {
          status: 'initiated',
          date: '2024-01-14T15:45:00',
          description: 'Withdrawal request initiated'
        },
        {
          status: 'processing',
          date: '2024-01-15T10:00:00',
          description: 'Processing with bank'
        }
      ]
    }
  ];

  // Helper function for currency formatting
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      processing: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      initiated: 'bg-blue-100 text-blue-800'
    };

    const statusText = {
      completed: 'Completed',
      processing: 'Processing',
      failed: 'Failed',
      cancelled: 'Cancelled',
      initiated: 'Initiated'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Withdrawal details modal
  const WithdrawalDetailsModal = ({ withdrawal, onClose }) => {
    if (!withdrawal) return null;

    const formatDate = (date) => {
      return new Date(date).toLocaleString();
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'completed':
          return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'processing':
          return <Clock className="h-5 w-5 text-yellow-500" />;
        case 'failed':
          return <XCircle className="h-5 w-5 text-red-500" />;
        default:
          return <AlertCircle className="h-5 w-5 text-gray-500" />;
      }
    };

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
          className="bg-white rounded-xl max-w-2xl w-full p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Withdrawal Details</h2>
              <p className="text-sm text-gray-600">Reference: {withdrawal.reference}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Amount Details</h3>
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Withdrawal Amount</span>
                  <span className="font-medium">{formatCurrency(withdrawal.amount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fees</span>
                  <span className="font-medium">{formatCurrency(withdrawal.fees)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Net Amount</span>
                  <span className="font-medium">{formatCurrency(withdrawal.netAmount)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Bank Details</h3>
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name</span>
                  <span className="font-medium">{withdrawal.method.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number</span>
                  <span className="font-medium">{withdrawal.method.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Type</span>
                  <span className="font-medium">{withdrawal.method.accountType}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Transaction Timeline</h3>
            <div className="relative">
              {withdrawal.timeline.map((event, index) => (
                <div key={index} className="flex items-start mb-4 last:mb-0">
                  <div className="flex items-center">
                    <div className="relative">
                      {getStatusIcon(event.status)}
                      {index !== withdrawal.timeline.length - 1 && (
                        <div className="absolute top-5 left-2.5 bottom-0 w-0.5 bg-gray-200" />
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{event.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(event.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            {withdrawal.status === 'processing' && (
              <button
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel Withdrawal
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Download Receipt
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
          <h1 className="text-2xl font-bold text-gray-900">Withdrawal History</h1>
          <p className="text-gray-600 mt-1">Track all your withdrawal transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Download className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Withdrawn</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">$12,485.00</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">18</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Processing</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">2</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BanknoteIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Bank Accounts</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">3</span>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 sm:flex-none sm:min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search withdrawals..."
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date Range
                      </label>
                      <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Time</option>
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="processing">Processing</option>
                        <option value="failed">Failed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bank Account
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Accounts</option>
                        <option value="boa">Bank of America</option>
                        <option value="chase">Chase Bank</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => {
                        setDateRange('all');
                        setStatusFilter('all');
                        setShowFilters(false);
                      }}
                      className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      Reset Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Withdrawals List */}
          <div className="divide-y">
            {withdrawals.map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedWithdrawal(withdrawal)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ArrowUpRight className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {formatCurrency(withdrawal.amount)}
                        </h3>
                        <StatusBadge status={withdrawal.status} />
                      </div>
                      <p className="text-sm text-gray-600">
                        Reference: {withdrawal.reference}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(withdrawal.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end gap-1">
                    <div className="flex items-center gap-2">
                      <BanknoteIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {withdrawal.method.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      Account ending in {withdrawal.method.accountNumber.slice(-4)}
                    </span>
                    {withdrawal.status === 'completed' && withdrawal.completedDate && (
                      <span className="text-sm text-gray-500">
                        Completed on {new Date(withdrawal.completedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                {/* Timeline Preview */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative flex items-center">
                      {withdrawal.timeline.map((event, index) => (
                        <React.Fragment key={index}>
                          <div className={`h-2 w-2 rounded-full ${
                            event.status === 'completed' ? 'bg-green-500' :
                            event.status === 'processing' ? 'bg-yellow-500' :
                            'bg-gray-300'
                          }`} />
                          {index < withdrawal.timeline.length - 1 && (
                            <div className={`h-0.5 flex-1 ${
                              event.status === 'completed' ? 'bg-green-500' :
                              'bg-gray-200'
                            }`} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWithdrawal(withdrawal);
                    }}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    View Details
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Withdrawal Details Modal */}
        <AnimatePresence>
          {selectedWithdrawal && (
            <WithdrawalDetailsModal
              withdrawal={selectedWithdrawal}
              onClose={() => setSelectedWithdrawal(null)}
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

export default WithdrawHistory;