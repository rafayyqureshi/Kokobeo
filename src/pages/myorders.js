import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, ChevronDown, Calendar, Clock,
  DollarSign, FileText, AlertCircle, CheckCircle,
  XCircle, Loader, MessageCircle, Star, Download,
  ArrowUpRight, ArrowDownLeft, ExternalLink, Menu
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const OrdersDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-001',
      title: 'Plumbing Service',
      client: 'John Smith',
      amount: 150.00,
      status: 'in_progress',
      date: '2024-01-15',
      dueDate: '2024-01-20',
      description: 'Bathroom pipe repair and maintenance',
      location: 'Toronto, ON',
      messages: 3,
      attachments: 2,
      clientRating: 4.8,
      isPriority: true,
      paymentStatus: 'paid',
      timeline: [
        { date: '2024-01-15', event: 'Order created', status: 'completed' },
        { date: '2024-01-16', event: 'Payment received', status: 'completed' },
        { date: '2024-01-17', event: 'Work in progress', status: 'current' },
        { date: '2024-01-20', event: 'Expected completion', status: 'pending' }
      ]
    },
    {
      id: 'ORD-2024-002',
      title: 'Emergency Leak Repair',
      client: 'Sarah Johnson',
      amount: 300.00,
      status: 'completed',
      date: '2024-01-14',
      dueDate: '2024-01-14',
      description: 'Emergency water leak repair in kitchen',
      location: 'Vancouver, BC',
      messages: 5,
      attachments: 3,
      clientRating: 5.0,
      isPriority: false,
      paymentStatus: 'paid',
      timeline: [
        { date: '2024-01-14', event: 'Order created', status: 'completed' },
        { date: '2024-01-14', event: 'Payment received', status: 'completed' },
        { date: '2024-01-14', event: 'Work completed', status: 'completed' }
      ]
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const statusText = {
      completed: 'Completed',
      in_progress: 'In Progress',
      pending: 'Pending',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Mobile menu tabs
  const MobileTabMenu = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t lg:hidden z-40">
      <div className="grid grid-cols-4 gap-1 p-2">
        {[
          { id: 'all', label: 'All', icon: FileText },
          { id: 'active', label: 'Active', icon: Clock },
          { id: 'completed', label: 'Done', icon: CheckCircle },
          { id: 'cancelled', label: 'Cancelled', icon: XCircle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              activeTab === tab.id
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600'
            }`}
          >
            <tab.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  // Order details modal
  const OrderDetailsModal = ({ order, onClose }) => {
    if (!order) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-4 md:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-start mb-6">
            <div className="pr-8">
              <h2 className="text-xl font-bold text-gray-900">{order.title}</h2>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
            >
              <XCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-medium">${order.amount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Due Date</span>
                  <span>{new Date(order.dueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span>{order.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Client Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Client Name</span>
                  <span>{order.client}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{order.clientRating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Messages</span>
                  <span className="text-blue-600">{order.messages} messages</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Attachments</span>
                  <span>{order.attachments} files</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Order Timeline</h3>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    event.status === 'completed' ? 'bg-green-500' :
                    event.status === 'current' ? 'bg-blue-500' :
                    'bg-gray-300'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.event}</p>
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 w-full sm:w-auto">
              Download Details
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto">
              Contact Client
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">View and manage all your orders</p>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">All Orders</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">156</h3>
              <p className="text-sm text-gray-600">Total orders</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Completed</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">132</h3>
              <p className="text-sm text-gray-600">Completed orders</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">In Progress</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">18</h3>
              <p className="text-sm text-gray-600">Active orders</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Revenue</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">$15,890</h3>
              <p className="text-sm text-gray-600">Total earnings</p>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <div className="p-4 border-b">
            <div className="flex flex-col lg:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2 border rounded-lg"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 pt-4 border-t overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <option value="in_progress">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Payment Status
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
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

          {/* Order Tabs - Desktop */}
          <div className="hidden lg:block px-4 border-b">
            <div className="flex space-x-6">
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'active', label: 'Active' },
                { id: 'completed', label: 'Completed' },
                { id: 'cancelled', label: 'Cancelled' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 relative ${
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

          {/* Orders List */}
          <div className="divide-y">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {order.title}
                      </h3>
                      {order.isPriority && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Order ID: {order.id} • {order.location}
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.description}
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col lg:items-end justify-between lg:justify-start gap-2">
                    <StatusBadge status={order.status} />
                    <p className="text-lg font-medium text-gray-900">
                      ${order.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Due: {new Date(order.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">{order.messages} Messages</span>
                    <span className="sm:hidden">{order.messages}</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">{order.attachments} Files</span>
                    <span className="sm:hidden">{order.attachments}</span>
                  </button>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    {order.clientRating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Order Details Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Tab Menu */}
      <MobileTabMenu />

      {/* Add padding to prevent content from being hidden behind mobile menu */}
      <div className="h-20 lg:hidden" />

      <SharedFooter2 />
    </div>
  );
};

export default OrdersDashboard;