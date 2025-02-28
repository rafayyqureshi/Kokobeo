import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, ArrowUpRight, ArrowDownLeft,
  Clock, CheckCircle, XCircle, DollarSign,
  MessageCircle, Calendar, ChevronDown, ChevronRight,
  FileText, Star, ExternalLink, AlertCircle, X,
  Receipt
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const OffersDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('received');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Mock data for offers
  const offers = [
    {
      id: 'OFF-2024-001',
      type: 'received',
      projectTitle: 'Emergency Plumbing Service',
      client: {
        name: 'John Smith',
        rating: 4.8,
        totalJobs: 25,
        location: 'Toronto, ON'
      },
      amount: 250.00,
      status: 'pending',
      createdDate: '2024-01-15',
      expiryDate: '2024-01-18',
      description: 'Emergency repair needed for burst pipe in bathroom',
      expectedDuration: '1-2 hours',
      requirements: [
        'Licensed plumber',
        'Available immediately',
        'Emergency service experience'
      ],
      messages: 2,
      attachments: 1,
      isPriority: true
    },
    {
      id: 'OFF-2024-002',
      type: 'sent',
      projectTitle: 'Kitchen Sink Installation',
      client: {
        name: 'Sarah Wilson',
        rating: 5.0,
        totalJobs: 12,
        location: 'Vancouver, BC'
      },
      amount: 180.00,
      status: 'accepted',
      createdDate: '2024-01-14',
      expiryDate: '2024-01-17',
      description: 'New sink installation in renovated kitchen',
      expectedDuration: '3 hours',
      requirements: [
        'Experience with modern fixtures',
        'Tools provided by professional'
      ],
      messages: 3,
      attachments: 2,
      isPriority: false
    }
  ];

  // Mock data for purchased quotes
  const purchasedQuotes = [
    {
      id: 'QUO-2024-001',
      type: 'purchased',
      projectTitle: 'Bathroom Renovation',
      client: {
        name: 'Emily Davis',
        rating: 4.7,
        totalJobs: 18,
        location: 'Calgary, AB'
      },
      purchaseAmount: 20.00,
      purchaseCurrency: 'USD',
      purchaseDate: '2024-02-20',
      status: 'active',
      description: 'Complete bathroom renovation including tiling and plumbing',
      expectedDuration: '5 days',
      requirements: [
        'Experience with full renovations',
        'Portfolio of previous work',
        'Available next month'
      ],
      messages: 1,
      attachments: 0,
      isPriority: false
    },
    {
      id: 'QUO-2024-002',
      type: 'purchased',
      projectTitle: 'Website Redesign',
      client: {
        name: 'Mark Johnson',
        rating: 4.9,
        totalJobs: 30,
        location: 'Remote'
      },
      purchaseAmount: 15,
      purchaseCurrency: 'Credits',
      purchaseDate: '2024-02-22',
      status: 'responded',
      description: 'Redesign of corporate website with modern UI/UX',
      expectedDuration: '3 weeks',
      requirements: [
        'UI/UX design expertise',
        'Experience with WordPress',
        'Portfolio required'
      ],
      messages: 4,
      attachments: 2,
      isPriority: false
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      expired: 'bg-gray-100 text-gray-800',
      completed: 'bg-blue-100 text-blue-800',
      active: 'bg-purple-100 text-purple-800', // Added for purchased quotes
      responded: 'bg-teal-100 text-teal-800'   // Added for purchased quotes
    };

    const statusText = {
      pending: 'Pending',
      accepted: 'Accepted',
      rejected: 'Rejected',
      expired: 'Expired',
      completed: 'Completed',
      active: 'Active',
      responded: 'Responded'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Offer details modal (used for all offer types including purchased quotes)
  const OfferDetailsModal = ({ offer, onClose }) => {
    if (!offer) return null;

    const isPurchasedQuote = offer.type === 'purchased';

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
          className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{offer.projectTitle}</h2>
              <p className="text-sm text-gray-600">Offer ID: {offer.id}</p>
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">{isPurchasedQuote ? 'Quote Details' : 'Offer Details'}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <StatusBadge status={offer.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{isPurchasedQuote ? 'Purchase Amount' : 'Amount'}</span>
                  <span className="font-medium">
                    {isPurchasedQuote 
                      ? `${offer.purchaseCurrency === 'USD' ? '$' : '💎'}${offer.purchaseAmount.toFixed(2)}`
                      : `$${offer.amount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{isPurchasedQuote ? 'Purchase Date' : 'Expiry Date'}</span>
                  <span>{new Date(isPurchasedQuote ? offer.purchaseDate : offer.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Expected Duration</span>
                  <span>{offer.expectedDuration}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Client Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Client Name</span>
                  <span>{offer.client.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{offer.client.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Jobs</span>
                  <span>{offer.client.totalJobs} jobs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span>{offer.client.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Project Description</h3>
            <p className="text-gray-600">{offer.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {offer.requirements.map((req, index) => (
                <li key={index} className="text-gray-600">{req}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-3">
            {offer.type === 'received' && offer.status === 'pending' ? (
              <>
                <button 
                  onClick={() => {/* Handle rejection */}}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-red-600"
                >
                  Decline Offer
                </button>
                <button 
                  onClick={() => {/* Handle acceptance */}}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Accept Offer
                </button>
              </>
            ) : offer.type === 'sent' && offer.status === 'accepted' ? (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Project
              </button>
            ) : offer.type === 'purchased' ? (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                View Quote Details
              </button>
            ) : null}
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
          <h1 className="text-2xl font-bold text-gray-900">My Offers</h1>
          <p className="text-gray-600 mt-1">View and manage your job offers</p>
        </div>

        {/* Offers Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Offers</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {offers.length + purchasedQuotes.length}
              </h3>
              <p className="text-sm text-gray-600">All time offers</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Accepted</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {offers.filter(o => o.status === 'accepted').length}
              </h3>
              <p className="text-sm text-gray-600">Accepted offers</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="text-sm text-gray-500">Pending</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {offers.filter(o => o.status === 'pending').length}
              </h3>
              <p className="text-sm text-gray-600">Awaiting response</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Average Value</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">$215</h3>
              <p className="text-sm text-gray-600">Per offer</p>
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
                    placeholder="Search offers..."
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
              
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
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
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="expired">Expired</option>
                        <option value="active">Active (Purchased)</option>
                        <option value="responded">Responded (Purchased)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Offer Type
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Types</option>
                        <option value="sent">Sent</option>
                        <option value="received">Received</option>
                        <option value="purchased">Purchased</option>
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

          {/* Offer Type Tabs */}
          <div className="px-4 border-b">
            <div className="flex space-x-6 overflow-x-auto">
              <button
                onClick={() => setActiveTab('received')}
                className={`py-4 px-2 relative ${
                  activeTab === 'received'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Received Offers
                {activeTab === 'received' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`py-4 px-2 relative ${
                  activeTab === 'sent'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Sent Offers
                {activeTab === 'sent' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('purchased')}
                className={`py-4 px-2 relative ${
                  activeTab === 'purchased'
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Purchased Quotes
                {activeTab === 'purchased' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Offers List */}
          <div className="divide-y">
            {(activeTab === 'purchased' ? purchasedQuotes : offers)
              .filter(offer => activeTab !== 'purchased' ? offer.type === activeTab : true)
              .map((offer) => (
                <div
                  key={offer.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOffer(offer)}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">
                          {offer.projectTitle}
                        </h3>
                        {offer.isPriority && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {activeTab === 'purchased' ? `Quote ID: ${offer.id}` : `Offer ID: ${offer.id}`} • {offer.client.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        {offer.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <StatusBadge status={offer.status} />
                      <p className="text-lg font-medium text-gray-900">
                        {activeTab === 'purchased'
                          ? `${offer.purchaseCurrency === 'USD' ? '$' : '💎'}${offer.purchaseAmount.toFixed(2)}`
                          : `$${offer.amount.toFixed(2)}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activeTab === 'purchased'
                          ? `Purchased: ${new Date(offer.purchaseDate).toLocaleDateString()}`
                          : `Expires: ${new Date(offer.expiryDate).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <MessageCircle className="h-4 w-4" />
                      {offer.messages} Messages
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                      <FileText className="h-4 w-4" />
                      {offer.attachments} Files
                    </button>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      {offer.client.rating}
                    </div>
                  </div>

                  {offer.type === 'received' && offer.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle reject
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-red-600"
                      >
                        Decline
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle accept
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Accept
                      </button>
                    </div>
                  )}
                  {offer.type === 'purchased' && (
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle view quote details
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        View Quote Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Card>

        {/* Offer Details Modal */}
        <AnimatePresence>
          {selectedOffer && (
            <OfferDetailsModal
              offer={selectedOffer}
              onClose={() => setSelectedOffer(null)}
            />
          )}
        </AnimatePresence>
      </main>
      <br /><br /><br /><br />

      {/* Footer Actions - Mobile Only */}
      <SharedFooter2 />
    </div>
  );
};

export default OffersDashboard;