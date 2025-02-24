import React, { useState } from 'react';
import {
  Wallet, ArrowUpRight, Clock, DollarSign, Calendar,
  Download, FileText, Filter, Search, Building2, Plus,
  CheckCircle, AlertCircle, X, ArrowRight, User, Mail,
  CreditCard, ChevronDown, MoreVertical, Bank,
  BanknoteIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const PayoutsPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showPayoutDetails, setShowPayoutDetails] = useState(null);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [dateRange, setDateRange] = useState('week');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock payouts data
  const payouts = [
    {
      id: 'PO-2024-001',
      type: 'local',
      amount: 1250.00,
      status: 'pending',
      professional: {
        name: 'Mike Wilson',
        email: 'mike@example.com',
        company: 'Wilson Plumbing Co.',
        type: 'Local Professional'
      },
      bankInfo: {
        bankName: 'Royal Bank',
        accountType: 'Business',
        accountNumber: '****5678',
        routingNumber: '****4321'
      },
      scheduleDate: '2024-02-15',
      currency: 'CAD',
      paymentMethod: 'bank_transfer',
      earnings: {
        totalEarnings: 1315.00,
        platformFee: 65.75,
        payoutAmount: 1250.00
      },
      transactionIds: ['TRX-2024-001', 'TRX-2024-002'],
      created: '2024-02-07T10:30:00'
    },
    {
      id: 'PO-2024-002',
      type: 'international',
      amount: 2800.00,
      status: 'processing',
      professional: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        company: 'Johnson Legal Services',
        type: 'International Professional'
      },
      bankInfo: {
        bankName: 'Chase Bank',
        accountType: 'Business',
        accountNumber: '****9012',
        routingNumber: '****6789',
        swiftCode: 'CHAS****'
      },
      scheduleDate: '2024-02-15',
      currency: 'USD',
      paymentMethod: 'wire_transfer',
      earnings: {
        totalEarnings: 2940.00,
        platformFee: 140.00,
        payoutAmount: 2800.00
      },
      transactionIds: ['TRX-2024-003', 'TRX-2024-004'],
      created: '2024-02-07T11:00:00'
    }
  ];

  // Calculate total metrics
  const totalPendingPayouts = payouts.filter(p => p.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalProcessingPayouts = payouts.filter(p => p.status === 'processing')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalCompletedPayouts = 45800.00; // Mock total for completed payouts

  // Payout Details Modal Component
  const PayoutDetailsModal = ({ payout, isOpen, onClose }) => {
    if (!payout || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        processing: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
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
                    <Badge className={getStatusBadge(payout.status)}>
                      {payout.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={
                      payout.type === 'local' 
                        ? 'border-blue-200 text-blue-700'
                        : 'border-purple-200 text-purple-700'
                    }>
                      {payout.type === 'local' ? 'LOCAL' : 'INTERNATIONAL'}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{payout.id}</h2>
                  <p className="text-sm text-gray-500">Created on {new Date(payout.created).toLocaleString()}</p>
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
            <div className="p-6 space-y-6">
              {/* Amount Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Payout Amount</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Total Amount</span>
                      <p className="text-2xl font-bold text-gray-900">
                        {payout.currency} ${payout.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Scheduled Date</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{payout.scheduleDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Professional Details</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{payout.professional.name}</p>
                      <p className="text-sm text-gray-500">{payout.professional.company}</p>
                    </div>
                    <Badge className="ml-auto">
                      {payout.professional.type}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{payout.professional.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Bank Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <BanknoteIcon className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">{payout.bankInfo.bankName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Account Type</span>
                      <p className="font-medium">{payout.bankInfo.accountType}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Account Number</span>
                      <p className="font-medium">{payout.bankInfo.accountNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Routing Number</span>
                      <p className="font-medium">{payout.bankInfo.routingNumber}</p>
                    </div>
                    {payout.bankInfo.swiftCode && (
                      <div>
                        <span className="text-sm text-gray-500">SWIFT Code</span>
                        <p className="font-medium">{payout.bankInfo.swiftCode}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div className="space-y-4">
                <h3 className="font-medium">Earnings Breakdown</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earnings</span>
                      <span className="font-medium">${payout.earnings.totalEarnings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fee</span>
                      <span className="font-medium">-${payout.earnings.platformFee.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 mt-2 border-t flex justify-between">
                      <span className="font-medium">Net Payout Amount</span>
                      <span className="font-medium">${payout.earnings.payoutAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Transactions */}
              <div className="space-y-4">
                <h3 className="font-medium">Related Transactions</h3>
                <div className="space-y-2">
                  {payout.transactionIds.map((txId, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{txId}</span>
                      <Button variant="ghost" size="sm" className="text-blue-600">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline">Download Receipt</Button>
                {payout.status === 'pending' && (
                  <Button onClick={() => setShowProcessModal(true)}>
                    Process Payout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Process Payout Modal
  const ProcessPayoutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

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
            className="bg-white rounded-xl max-w-md w-full p-6"
          >
            <div className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <ArrowUpRight className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Process Payout</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to process this payout? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    // Handle payout processing
                    onClose();
                  }}
                >
                  Confirm
                </Button>
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
              <h1 className="text-2xl font-bold text-gray-900">Payouts</h1>
                <p className="text-gray-600 mt-1">Manage and process professional payouts</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Payout
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Payouts</p>
                    <p className="text-2xl font-semibold">${totalPendingPayouts.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Processing</p>
                    <p className="text-2xl font-semibold">${totalProcessingPayouts.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ArrowUpRight className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Completed</p>
                    <p className="text-2xl font-semibold">${totalCompletedPayouts.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Next Payout Date</p>
                    <p className="text-2xl font-semibold">Feb 15</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
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
          placeholder="Search payouts..."
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
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="quarter">This Quarter</option>
        <option value="year">This Year</option>
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
            Professional Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="all">All Types</option>
            <option value="local">Local Professionals</option>
            <option value="international">International Professionals</option>
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
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
            <option value="bank_transfer">Bank Transfer</option>
            <option value="wire_transfer">Wire Transfer</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Payouts Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payout ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Professional
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payouts.map((payout) => (
                      <tr key={payout.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{payout.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">{payout.professional.name}</div>
                              <div className="text-sm text-gray-500">{payout.professional.company}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payout.currency} ${payout.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            payout.status === 'completed' ? 'bg-green-100 text-green-700' :
                            payout.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                            payout.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {payout.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payout.scheduleDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className={
                            payout.type === 'local' 
                              ? 'border-blue-200 text-blue-700'
                              : 'border-purple-200 text-purple-700'
                          }>
                            {payout.type === 'local' ? 'LOCAL' : 'INTERNATIONAL'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPayoutDetails(payout)}
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

      {/* Modals */}
      <PayoutDetailsModal
        payout={showPayoutDetails}
        isOpen={!!showPayoutDetails}
        onClose={() => setShowPayoutDetails(null)}
      />

      <ProcessPayoutModal
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default PayoutsPage;