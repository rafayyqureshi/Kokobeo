import React, { useState } from 'react';
import {
  Search, Filter, Download, ArrowUpDown, ChevronDown,
  DollarSign, ArrowUp, ArrowDown, FileText, Calendar,
  CreditCard, User, Building2, Plus, X, Eye, MoreVertical,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const TransactionsPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showTransactionDetails, setShowTransactionDetails] = useState(null);
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock transactions data
  const transactions = [
    {
      id: 'TRX-2024-001',
      type: 'payment',
      amount: 150.00,
      status: 'completed',
      date: '2024-02-07T10:30:00',
      description: 'Payment for Plumbing Service',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        type: 'individual'
      },
      provider: {
        name: 'Mike Wilson',
        company: 'Wilson Plumbing Co.',
        type: 'business'
      },
      paymentMethod: {
        type: 'credit_card',
        brand: 'Visa',
        last4: '4242'
      },
      fees: {
        platform: 7.50,
        payment: 4.35,
        total: 11.85
      },
      metadata: {
        orderId: 'ORD-2024-001',
        serviceType: 'plumbing',
        location: 'Toronto, ON'
      }
    },
    {
      id: 'TRX-2024-002',
      type: 'payout',
      amount: 450.00,
      status: 'pending',
      date: '2024-02-07T11:00:00',
      description: 'Weekly payout to service provider',
      provider: {
        name: 'Sarah Johnson',
        company: 'Johnson Legal Services',
        type: 'business'
      },
      paymentMethod: {
        type: 'bank_transfer',
        bankName: 'Royal Bank',
        accountLast4: '5678'
      },
      fees: {
        transfer: 2.25,
        total: 2.25
      },
      metadata: {
        payoutBatch: 'PO-2024-W6',
        region: 'Ontario'
      }
    }
  ];

  // Transaction Details Modal Component
  const TransactionDetailsModal = ({ transaction, isOpen, onClose }) => {
    if (!transaction || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        completed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        failed: 'bg-red-100 text-red-700'
      };
      return styles[status] || 'bg-gray-100 text-gray-700';
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b"  style={{ textAlign: 'left' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(transaction.status)}>
                      {transaction.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={
                      transaction.type === 'payment' 
                        ? 'border-green-200 text-green-700'
                        : 'border-blue-200 text-blue-700'
                    }>
                      {transaction.type === 'payment' ? 'PAYMENT' : 'PAYOUT'}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{transaction.id}</h2>
                  <p className="text-sm text-gray-500">{transaction.description}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6"  style={{ textAlign: 'left' }}>
              {/* Amount Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Amount Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Total Amount</span>
                      <p className="text-2xl font-bold text-gray-900">
                        ${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Status</span>
                      <div className="flex items-center gap-2 mt-1">
                        {transaction.status === 'completed' ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : transaction.status === 'pending' ? (
                          <Clock className="h-5 w-5 text-yellow-500" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="capitalize">{transaction.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parties Involved */}
              {transaction.type === 'payment' ? (
                <div className="space-y-4">
                  <h3 className="font-medium">Transaction Parties</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Customer</h4>
                      <div className="space-y-2">
                        <p className="font-medium">{transaction.customer.name}</p>
                        <p className="text-sm text-gray-500">{transaction.customer.email}</p>
                        <Badge variant="secondary">
                          {transaction.customer.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Provider</h4>
                      <div className="space-y-2">
                        <p className="font-medium">{transaction.provider.name}</p>
                        <p className="text-sm text-gray-500">{transaction.provider.company}</p>
                        <Badge variant="secondary">
                          {transaction.provider.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">Payout Details</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Provider</h4>
                    <div className="space-y-2">
                      <p className="font-medium">{transaction.provider.name}</p>
                      <p className="text-sm text-gray-500">{transaction.provider.company}</p>
                      <Badge variant="secondary">
                        {transaction.provider.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-medium">Payment Method</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  {transaction.paymentMethod.type === 'credit_card' ? (
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium capitalize">
                          {transaction.paymentMethod.brand} card ending in {transaction.paymentMethod.last4}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">
                          {transaction.paymentMethod.bankName} account ending in {transaction.paymentMethod.accountLast4}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Fees Breakdown */}
              <div className="space-y-4">
                <h3 className="font-medium">Fees Breakdown</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {transaction.fees.platform && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Platform Fee</span>
                        <span className="font-medium">${transaction.fees.platform.toFixed(2)}</span>
                      </div>
                    )}
                    {transaction.fees.payment && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Processing</span>
                        <span className="font-medium">${transaction.fees.payment.toFixed(2)}</span>
                      </div>
                    )}
                    {transaction.fees.transfer && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transfer Fee</span>
                        <span className="font-medium">${transaction.fees.transfer.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="pt-2 mt-2 border-t flex justify-between">
                      <span className="font-medium">Total Fees</span>
                      <span className="font-medium">${transaction.fees.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Additional Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Date</span>
                      <p className="font-medium">
                        {new Date(transaction.date).toLocaleString()}
                      </p>
                    </div>
                    {transaction.metadata.orderId && (
                      <div>
                        <span className="text-sm text-gray-500">Order ID</span>
                        <p className="font-medium">{transaction.metadata.orderId}</p>
                      </div>
                    )}
                    {transaction.metadata.serviceType && (
                      <div>
                        <span className="text-sm text-gray-500">Service Type</span>
                        <p className="font-medium capitalize">{transaction.metadata.serviceType}</p>
                      </div>
                    )}
                    {transaction.metadata.location && (
                      <div>
                        <span className="text-sm text-gray-500">Location</span>
                        <p className="font-medium">{transaction.metadata.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline">Download Receipt</Button>
                <Button>View Related Order</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 mt-1">Monitor and manage all financial transactions</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Transaction
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6"><div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Volume</p>
                    <p className="text-2xl font-semibold">$24,500</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Payments</p>
                    <p className="text-2xl font-semibold">$18,750</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ArrowDown className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Payouts</p>
                    <p className="text-2xl font-semibold">$5,750</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ArrowUp className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Platform Fees</p>
                    <p className="text-2xl font-semibold">$980</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <FileText className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="p-4">
  <div className="flex flex-col lg:flex-row justify-between gap-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
      <div className="relative flex-1 w-full sm:w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 w-full sm:w-auto justify-center"
      >
        <Filter className="h-5 w-5" />
        Filters
      </Button>
    </div>
    
    <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full lg:w-auto">
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="amount_high">Highest Amount</option>
        <option value="amount_low">Lowest Amount</option>
      </select>
    </div>
  </div>

  {/* Advanced Filters */}
  {showFilters && (
    <div className="mt-4 pt-4 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="payment">Payments</option>
            <option value="payout">Payouts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="all">All Methods</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Transactions Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">{transaction.id}</div>
                              <div className="text-sm text-gray-500">{transaction.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            transaction.type === 'payment'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }>
                            {transaction.type.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            ${transaction.amount.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Fee: ${transaction.fees.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {transaction.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowTransactionDetails(transaction)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    Showing page {currentPage} of 10
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === 10}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        transaction={showTransactionDetails}
        isOpen={!!showTransactionDetails}
        onClose={() => setShowTransactionDetails(null)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default TransactionsPage;