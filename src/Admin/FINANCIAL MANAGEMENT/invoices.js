import React, { useState } from 'react';
import {
  FileText, Download, Search, Filter, Plus, Building2,
  ArrowUpRight, Clock, Calendar, DollarSign, ChevronDown,
  MoreVertical, File, ArrowRight, X, User, Mail, Calendar as CalendarIcon,
  Printer, Eye, CheckCircle, PaperclipIcon, ClipboardList,
  AlertCircleIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const InvoicesPage = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(null);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [dateRange, setDateRange] = useState('month');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock invoices data
  const invoices = [
    {
      id: 'INV-2024-001',
      type: 'local',
      amount: 1250.00,
      status: 'paid',
      professional: {
        name: 'Mike Wilson',
        email: 'mike@example.com',
        company: 'Wilson Plumbing Co.',
        type: 'Local Professional'
      },
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        address: '123 Main St, Toronto, ON'
      },
      createdDate: '2024-02-07',
      dueDate: '2024-02-21',
      currency: 'CAD',
      items: [
        {
          description: 'Emergency Plumbing Service',
          hours: 3,
          rate: 350.00,
          amount: 1050.00
        },
        {
          description: 'Parts and Materials',
          amount: 200.00
        }
      ],
      taxes: {
        gst: 62.50,
        hst: 162.50
      },
      total: 1475.00,
      paid: 1475.00,
      paymentDate: '2024-02-08',
      paymentMethod: 'credit_card'
    },
    {
      id: 'INV-2024-002',
      type: 'international',
      amount: 2800.00,
      status: 'pending',
      professional: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        company: 'Johnson Legal Services',
        type: 'International Professional'
      },
      customer: {
        name: 'Tech Global Inc.',
        email: 'accounting@techglobal.com',
        address: '456 Business Ave, Vancouver, BC'
      },
      createdDate: '2024-02-07',
      dueDate: '2024-02-21',
      currency: 'USD',
      items: [
        {
          description: 'International Legal Consultation',
          hours: 8,
          rate: 350.00,
          amount: 2800.00
        }
      ],
      taxes: {
        gst: 140.00,
        hst: 364.00
      },
      total: 3304.00,
      paid: 0,
      notes: 'International business contract review and consultation'
    }
  ];

  // Calculate total metrics
  const totalPendingAmount = invoices.filter(i => i.status === 'pending')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaidAmount = invoices.filter(i => i.status === 'paid')
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalOverdueAmount = 0; // Mock data

  // Invoice Details Modal Component
  const InvoiceDetailsModal = ({ invoice, isOpen, onClose }) => {
    if (!invoice || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        paid: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        overdue: 'bg-red-100 text-red-700'
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
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b"  style={{ textAlign: 'left' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusBadge(invoice.status)}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={
                      invoice.type === 'local' 
                        ? 'border-blue-200 text-blue-700'
                        : 'border-purple-200 text-purple-700'
                    }>
                      {invoice.type === 'local' ? 'LOCAL' : 'INTERNATIONAL'}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{invoice.id}</h2>
                  <p className="text-sm text-gray-500">Created on {invoice.createdDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Print
                  </Button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Invoice Preview */}
            <div className="p-6"  style={{ textAlign: 'left' }}>
              {/* Professional and Customer Info */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">From</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{invoice.professional.company}</p>
                    <p>{invoice.professional.name}</p>
                    <p>{invoice.professional.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Bill To</h3>
                  <div className="space-y-2">
                    <p className="font-medium">{invoice.customer.name}</p>
                    <p>{invoice.customer.email}</p>
                    <p>{invoice.customer.address}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Invoice Number</h3>
                  <p>{invoice.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Issue Date</h3>
                  <p>{invoice.createdDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Due Date</h3>
                  <p>{invoice.dueDate}</p>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full mb-8">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hours</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Rate</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.hours || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {item.rate ? `$${item.rate.toFixed(2)}` : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        ${item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary */}
              <div className="w-1/2 ml-auto space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">${invoice.amount.toFixed(2)}</span>
                </div>
                {Object.entries(invoice.taxes).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-gray-500">{key.toUpperCase()}</span>
                    <span className="font-medium">${value.toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-base font-medium pt-3 border-t">
                  <span>Total</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
                {invoice.status === 'paid' && (
                  <div className="flex justify-between text-sm text-green-600 pt-3 border-t">
                    <span>Paid on {invoice.paymentDate}</span>
                    <span>${invoice.paid.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {invoice.notes && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600">{invoice.notes}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {invoice.status === 'pending' && (
                    <Badge variant="outline" className="border-yellow-200 text-yellow-700">
                      Payment Due: {invoice.dueDate}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">Send Reminder</Button>
                  <Button>Mark as Paid</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Generate Invoice Modal
  const GenerateInvoiceModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-start mb-6"  style={{ textAlign: 'left' }}>
              <div>
                <h3 className="text-lg font-semibold">Generate New Invoice</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new invoice for a professional
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Form fields would go here */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional
                </label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option value="">Select Professional</option>
                  {/* Options would be populated dynamically */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Date
                </label>
                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button>Generate Invoice</Button>
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
                <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
                <p className="text-gray-600 mt-1">Manage and generate professional invoices</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export All
                </Button>
                <Button className="flex items-center gap-2" onClick={() => setShowGenerateModal(true)}>
                  <Plus className="h-4 w-4" />
                  Generate Invoice
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Invoiced</p>
                    <p className="text-2xl font-semibold">${(totalPendingAmount + totalPaidAmount).toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Payment</p>
                    <p className="text-2xl font-semibold">${totalPendingAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Paid</p>
                    <p className="text-2xl font-semibold">${totalPaidAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Overdue</p>
                    <p className="text-2xl font-semibold">${totalOverdueAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircleIcon className="h-5 w-5 text-red-600" />
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
          placeholder="Search invoices..."
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
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Currencies</option>
            <option value="CAD">CAD</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Invoices Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Professional
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
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
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-2" />
                            <div className="font-medium text-gray-900">{invoice.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium">{invoice.professional.name}</div>
                            <div className="text-sm text-gray-500">{invoice.professional.company}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium">{invoice.customer.name}</div>
                          <div className="text-sm text-gray-500">{invoice.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.currency} ${invoice.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            invoice.status === 'paid' ? 'bg-green-100 text-green-700' :
                            invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {invoice.status.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {invoice.createdDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className={
                            invoice.type === 'local' 
                              ? 'border-blue-200 text-blue-700'
                              : 'border-purple-200 text-purple-700'
                          }>
                            {invoice.type === 'local' ? 'LOCAL' : 'INTERNATIONAL'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowInvoiceDetails(invoice)}
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
      <InvoiceDetailsModal
        invoice={showInvoiceDetails}
        isOpen={!!showInvoiceDetails}
        onClose={() => setShowInvoiceDetails(null)}
      />

      <GenerateInvoiceModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default InvoicesPage;