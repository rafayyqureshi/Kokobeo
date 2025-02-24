import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, Clock, CheckCircle, XCircle,
  DollarSign, MessageCircle, Calendar, ChevronDown,
  FileText, Star, ExternalLink, AlertCircle, X,
  Send, Eye, Edit, ArrowRight, Briefcase
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const ProposalsDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('active');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedProposal, setSelectedProposal] = useState(null);

  // Mock data for proposals
  const proposals = [
    {
      id: 'PROP-2024-001',
      projectTitle: 'Commercial Plumbing Maintenance',
      client: {
        name: 'Office Park Solutions',
        rating: 4.9,
        location: 'Toronto, ON',
        totalProjects: 15
      },
      amount: {
        proposed: 2500.00,
        clientBudget: 3000.00
      },
      status: 'pending',
      submittedDate: '2024-01-15',
      expectedDuration: '5 days',
      description: 'Complete plumbing maintenance for 3-story office building',
      coverLetter: 'I have over 10 years of experience in commercial plumbing maintenance...',
      highlights: [
        'Licensed commercial plumber',
        'Previous experience with similar buildings',
        'Available to start immediately',
        'Emergency service included'
      ],
      attachments: [
        { name: 'Professional_License.pdf', size: '2.4 MB' },
        { name: 'Previous_Work.pdf', size: '3.1 MB' }
      ],
      messages: 2,
      competingProposals: 4,
      viewed: true,
      lastUpdated: '2024-01-16'
    },
    {
      id: 'PROP-2024-002',
      projectTitle: 'Residential Bathroom Renovation',
      client: {
        name: 'Emma Thompson',
        rating: 4.7,
        location: 'Vancouver, BC',
        totalProjects: 8
      },
      amount: {
        proposed: 1800.00,
        clientBudget: 2000.00
      },
      status: 'accepted',
      submittedDate: '2024-01-14',
      expectedDuration: '3 days',
      description: 'Complete bathroom renovation including fixture replacement',
      coverLetter: 'Specialized in modern bathroom renovations with attention to detail...',
      highlights: [
        'Specialized in bathroom renovations',
        'High-quality materials provided',
        'Clean and efficient work process',
        'Warranty included'
      ],
      attachments: [
        { name: 'Portfolio.pdf', size: '4.2 MB' },
        { name: 'Quote_Details.pdf', size: '1.8 MB' }
      ],
      messages: 5,
      competingProposals: 6,
      viewed: true,
      lastUpdated: '2024-01-15'
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800',
      expired: 'bg-purple-100 text-purple-800'
    };

    const statusText = {
      pending: 'Pending Review',
      accepted: 'Accepted',
      rejected: 'Not Selected',
      draft: 'Draft',
      expired: 'Expired'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}  style={{ textAlign: 'left' }}>
        {statusText[status]}
      </span>
    );
  };

  // Proposal details modal
  const ProposalDetailsModal = ({ proposal, onClose }) => {
    if (!proposal) return null;

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
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6"
        >
          <div className="flex justify-between items-start mb-6"  style={{ textAlign: 'left' }}>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{proposal.projectTitle}</h2>
              <p className="text-sm text-gray-600">Proposal ID: {proposal.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"  style={{ textAlign: 'left' }}>
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {proposal.coverLetter}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {proposal.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Attachments</h3>
                <div className="space-y-2">
                  {proposal.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-600">{file.name}</span>
                      </div>
                      <span className="text-sm text-gray-500">{file.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6"  style={{ textAlign: 'left' }}>
              <Card className="p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Proposal Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <StatusBadge status={proposal.status} />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Your Bid</label>
                    <p className="font-medium text-gray-900">
                      ${proposal.amount.proposed.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Client's Budget</label>
                    <p className="font-medium text-gray-900">
                      ${proposal.amount.clientBudget.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Expected Duration</label>
                    <p className="font-medium text-gray-900">{proposal.expectedDuration}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Competing Proposals</label>
                    <p className="font-medium text-gray-900">{proposal.competingProposals}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4"  style={{ textAlign: 'left' }}>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Client Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Client Name</label>
                    <p className="font-medium text-gray-900">{proposal.client.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium text-gray-900">{proposal.client.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Rating</label>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium text-gray-900">
                        {proposal.client.rating}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Projects</label>
                    <p className="font-medium text-gray-900">
                      {proposal.client.totalProjects} completed
                    </p>
                  </div>
                </div>
              </Card>

              {proposal.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => {/* Handle withdraw */}}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700"
                  >
                    Withdraw
                  </button>
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
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
          <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
          <p className="text-gray-600 mt-1">Track and manage your project proposals</p>
        </div>

        {/* Proposal Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Sent</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">45</h3>
              <p className="text-sm text-gray-600">Proposals sent</p>
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
              <h3 className="text-2xl font-bold text-gray-900">28</h3>
              <p className="text-sm text-gray-600">Successful proposals</p>
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
              <h3 className="text-2xl font-bold text-gray-900">12</h3>
              <p className="text-sm text-gray-600">Awaiting response</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Success Rate</span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900">62%</h3>
              <p className="text-sm text-gray-600">Acceptance rate</p>
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
                    placeholder="Search proposals..."
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
                        <option value="pending">Pending Review</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Not Selected</option>
                        <option value="draft">Draft</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount Range
                      </label>
                      <select
                        className="w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Amounts</option>
                        <option value="0-500">$0 - $500</option>
                        <option value="501-1000">$501 - $1,000</option>
                        <option value="1001-5000">$1,001 - $5,000</option>
                        <option value="5000+">$5,000+</option>
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

          {/* Proposal Status Tabs */}
          <div className="px-4 border-b">
            <div className="flex space-x-6">
              {[
                { id: 'active', label: 'Active Proposals' },
                { id: 'accepted', label: 'Accepted' },
                { id: 'rejected', label: 'Not Selected' },
                { id: 'draft', label: 'Drafts' }
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

          {/* Proposals List */}
          <div className="divide-y">
            {proposals.map((proposal) => (
              <div
                key={proposal.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-medium text-gray-900">
                      {proposal.projectTitle}
                    </h3>
                    {proposal.viewed && (
                      <Eye className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <StatusBadge status={proposal.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Client Info</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">{proposal.client.name}</p>
                      <p className="text-sm text-gray-600">{proposal.client.location}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{proposal.client.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Proposal Details</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-900">
                        Bid Amount: ${proposal.amount.proposed.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: {proposal.expectedDuration}
                      </p>
                      <p className="text-sm text-gray-600">
                        {proposal.competingProposals} competing proposals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-end gap-3">
                    <button
                      onClick={() => setSelectedProposal(proposal)}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                    >
                      View Details
                    </button>
                    {proposal.status === 'pending' && (
                      <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                        Edit
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <MessageCircle className="h-4 w-4" />
                    {proposal.messages} Messages
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                    <FileText className="h-4 w-4" />
                    {proposal.attachments.length} Files
                  </button>
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(proposal.lastUpdated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Proposal Details Modal */}
        <AnimatePresence>
          {selectedProposal && (
            <ProposalDetailsModal
              proposal={selectedProposal}
              onClose={() => setSelectedProposal(null)}
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

export default ProposalsDashboard;