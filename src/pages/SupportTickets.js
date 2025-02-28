import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Filter, Search, Clock, CheckCircle, XCircle,
  MessageCircle, Calendar, ChevronDown, FileText,
  AlertCircle, X, Send, Flag, Paperclip, Plus,
  RefreshCcw, MoreVertical, ArrowUpRight, MessageSquare,
  Home, User, Settings, Shield, ChartAreaIcon, Menu
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const SupportTickets = () => {
  // State management
  const [activeTab, setActiveTab] = useState('open');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [dateRange, setDateRange] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar items (added for professional support view)
  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/professionals" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "Messages", href: "/MessageAndVideoCall" },
    { icon: <FileText className="h-5 w-5" />, label: "My Orders", href: "/myorders" },
    { icon: <ChartAreaIcon className="h-5 w-5" />, label: "Progress", href: "/Progress" }, // Added as per request
    { icon: <Shield className="h-5 w-5" />, label: "Support Tickets", href: "/support", active: true },
    { icon: <User className="h-5 w-5" />, label: "My Profile", href: "/myprofile" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/Settings" }
  ];

  // Mock data for tickets
  const tickets = [
    {
      id: 'TKT-2024-001',
      subject: 'Payment Issue with Project',
      status: 'open',
      priority: 'high',
      category: 'Payment',
      createdDate: '2024-01-15',
      lastUpdated: '2024-01-16',
      user: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        avatar: 'JS'
      },
      messages: [
        {
          id: 1,
          sender: 'John Smith',
          senderType: 'user',
          message: 'I have not received payment for the completed project.',
          timestamp: '2024-01-15T10:30:00',
          attachments: []
        },
        {
          id: 2,
          sender: 'Support Team',
          senderType: 'support',
          message: 'Thank you for reporting this. Let me check the payment status.',
          timestamp: '2024-01-15T10:45:00',
          attachments: []
        }
      ],
      assignedTo: 'Sarah Wilson',
      department: 'Billing',
      tags: ['payment', 'urgent']
    },
    {
      id: 'TKT-2024-002',
      subject: 'Account Verification Required',
      status: 'pending',
      priority: 'medium',
      category: 'Account',
      createdDate: '2024-01-14',
      lastUpdated: '2024-01-15',
      user: {
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        avatar: 'ED'
      },
      messages: [
        {
          id: 1,
          sender: 'Emma Davis',
          senderType: 'user',
          message: 'Need help with account verification process.',
          timestamp: '2024-01-14T15:20:00',
          attachments: [
            { name: 'ID_Document.pdf', size: '2.4 MB' }
          ]
        }
      ],
      assignedTo: 'Mike Johnson',
      department: 'Account Security',
      tags: ['verification', 'documentation']
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusStyles = {
      open: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-gray-100 text-gray-800',
      resolved: 'bg-blue-100 text-blue-800'
    };

    const statusText = {
      open: 'Open',
      pending: 'Pending',
      closed: 'Closed',
      resolved: 'Resolved'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge = ({ priority }) => {
    const priorityStyles = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityStyles[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  // Ticket details modal
  const TicketDetailsModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    const formatTimestamp = (timestamp) => {
      return new Date(timestamp).toLocaleString();
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
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{ticket.subject}</h2>
                <div className="flex items-center gap-3 mt-2">
                  <p className="text-sm text-gray-600">Ticket #{ticket.id}</p>
                  <StatusBadge status={ticket.status} />
                  <PriorityBadge priority={ticket.priority} />
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex" style={{ textAlign: 'left' }}>
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {ticket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${
                        message.senderType === 'support' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {message.sender.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`flex-1 ${
                        message.senderType === 'support' ? 'text-right' : ''
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {message.sender}
                          </span>
                          <span className="text-sm text-gray-500">
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        <div className={`inline-block p-4 rounded-lg ${
                          message.senderType === 'support'
                            ? 'bg-blue-50 text-blue-900'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p>{message.message}</p>
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Paperclip className="h-4 w-4" />
                                  <span>{file.name}</span>
                                  <span className="text-gray-500">
                                    ({file.size})
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full p-3 border rounded-lg resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </button>
                    <button
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-80 border-l bg-gray-50 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Ticket Details */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Ticket Details
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Created</dt>
                      <dd className="text-sm text-gray-900">
                        {new Date(ticket.createdDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="text-sm text-gray-900">{ticket.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Department</dt>
                      <dd className="text-sm text-gray-900">{ticket.department}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Assigned To</dt>
                      <dd className="text-sm text-gray-900">{ticket.assignedTo}</dd>
                    </div>
                  </dl>
                </div>

                {/* User Details */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    User Details
                  </h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-500">Name</dt>
                      <dd className="text-sm text-gray-900">{ticket.user.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{ticket.user.email}</dd>
                    </div>
                  </dl>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {ticket.status !== 'closed' && (
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      {ticket.status === 'resolved' ? 'Reopen Ticket' : 'Mark as Resolved'}
                    </button>
                    <button className="w-full px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50">
                      Close Ticket
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      {/* Fixed Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white border-b h-16">
        <SharedHeader4 />
      </div>

      <div className="flex min-h-[calc(100vh-64px)] pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r shadow-sm overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  item.active
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img src="https://assests.netlify.app/assets/images/logo.png" alt="Logo" className="h-8 w-8" />
                      <span className="text-blue-600 text-lg font-bold">Kokobeo</span>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          item.active
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 px-6 py-8 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and respond to support requests</p>
          </div>

          {/* Ticket Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-500">Total Tickets</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">126</h3>
                <p className="text-sm text-gray-600">All tickets</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-500">Open</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">28</h3>
                <p className="text-sm text-gray-600">Active tickets</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Flag className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm text-gray-500">High Priority</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
                <p className="text-sm text-gray-600">Need attention</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">Resolved</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">90</h3>
                <p className="text-sm text-gray-600">This month</p>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-5 w-5" />
              Create Ticket
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border text-gray-700 rounded-lg hover:bg-gray-50">
              <RefreshCcw className="h-5 w-5" />
              Refresh List
            </button>
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
                      placeholder="Search tickets..."
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
                    <option value="priority">Priority</option>
                    <option value="updated">Last Updated</option>
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
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                          <option value="open">Open</option>
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Priority
                        </label>
                        <select
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="all">All Priority</option>
                          <option value="high">High</option>
                          <option value="medium">Medium</option>
                          <option value="low">Low</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          className="w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="all">All Categories</option>
                          <option value="account">Account</option>
                          <option value="billing">Billing</option>
                          <option value="technical">Technical</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

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

            {/* Tickets List */}
            <div className="divide-y">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {ticket.user.avatar}
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {ticket.subject}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {ticket.user.name} • #{ticket.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={ticket.status} />
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {ticket.messages.length} messages
                    </div>
                    <div>
                      <span className="font-medium">Category:</span> {ticket.category}
                    </div>
                    <div>
                      <span className="font-medium">Assigned to:</span> {ticket.assignedTo}
                    </div>
                    <div>
                      <span className="font-medium">Last updated:</span> {new Date(ticket.lastUpdated).toLocaleDateString()}
                    </div>
                  </div>

                  {ticket.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4">
                      {ticket.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {/* Ticket Details Modal */}
          <AnimatePresence>
            {selectedTicket && (
              <TicketDetailsModal
                ticket={selectedTicket}
                onClose={() => setSelectedTicket(null)}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      <br /><br /><br /><br />

      <SharedFooter2 />
    </div>
  );
};

export default SupportTickets;