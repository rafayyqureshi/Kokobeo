import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Search, Filter, X, Plus, ChevronDown,
  AlertCircle, CheckCircle, Clock, FileText, Paperclip,
  Send, RefreshCw, Flag, Users, Calendar, MoreVertical,
  Download, ExternalLink, Mail, Phone, User, Home, Wallet,
  Shield, Bell, ChartAreaIcon, Menu
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const ClientSupportTickets = () => {
  // States
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showTicketDetails, setShowTicketDetails] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [newMessage, setNewMessage] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newReportModal, setNewReportModal] = useState(false); // New state for report modal

  // Sidebar items
  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/clients" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "Messages", href: "/client/MessageAndVideoCall" },
    { icon: <FileText className="h-5 w-5" />, label: "My Orders", href: "/client/myorders" },
    { icon: <ChartAreaIcon className="h-5 w-5" />, label: "Progress", href: "/client/progress" },
    { icon: <Shield className="h-5 w-5" />, label: "Support Tickets", href: "/client/support", active: true },
    { icon: <Wallet className="h-5 w-5" />, label: "Wallet", href: "/client/Wallet" },
    { icon: <Bell className="h-5 w-5" />, label: "Notifications", href: "/client/myoffers" },
    { icon: <User className="h-5 w-5" />, label: "Profile Settings", href: "/client/profilesettings" }
  ];

  // Mock tickets data (updated with report examples)
  const [tickets, setTickets] = useState([
    {
      id: "TKT-2024-001",
      subject: "Payment Processing Issue",
      description: "Unable to process payment for recent project completion",
      status: "open",
      priority: "high",
      category: "Billing",
      createdAt: "2024-01-20T10:30:00",
      updatedAt: "2024-01-20T14:45:00",
      messages: [
        {
          id: 1,
          sender: "Emma Thompson",
          role: "client",
          message: "I'm having issues processing the payment for project completion. The transaction keeps failing.",
          timestamp: "2024-01-20T10:30:00",
          attachments: []
        },
        {
          id: 2,
          sender: "Support Team",
          role: "support",
          message: "Thank you for reporting this issue. Could you please provide the transaction ID and any error messages you're seeing?",
          timestamp: "2024-01-20T10:45:00",
          attachments: []
        }
      ],
      assignee: "Sarah Wilson",
      department: "Billing Support"
    },
    {
      id: "RPT-2025-001",
      subject: "Professional Working Outside Platform",
      description: "A professional I hired tried to complete work outside the platform.",
      status: "open",
      priority: "medium",
      category: "Report",
      createdAt: "2025-02-28T09:15:00",
      updatedAt: "2025-02-28T09:15:00",
      messages: [
        {
          id: 1,
          sender: "Emma Thompson",
          role: "client",
          message: "The professional I hired for plumbing asked me to pay them directly instead of through the platform.",
          timestamp: "2025-02-28T09:15:00",
          attachments: []
        }
      ],
      assignee: "Unassigned",
      department: "Compliance"
    }
  ]);

  // New ticket/report form initial state
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: '',
    status: 'open',
    createdAt: new Date().toISOString(),
    messages: [],
    attachments: [],
    id: `TKT-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(3, '0')}`,
    department: 'General Support',
    assignee: 'Unassigned'
  });

  // Handle new ticket/report submission
  const handleSubmitNewTicket = (isReport = false) => {
    const ticketIdPrefix = isReport ? 'RPT' : 'TKT';
    const ticket = {
      ...newTicket,
      id: `${ticketIdPrefix}-${new Date().getFullYear()}-${String(tickets.length + 1).padStart(3, '0')}`,
      category: isReport ? 'Report' : newTicket.category,
      department: isReport ? 'Compliance' : newTicket.department,
      messages: [{
        id: 1,
        sender: "Emma Thompson",
        role: "client",
        message: newTicket.description,
        timestamp: new Date().toISOString(),
        attachments: []
      }]
    };
    setTickets([...tickets, ticket]);
    setShowNewTicketModal(false);
    setNewReportModal(false);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      category: '',
      status: 'open',
      createdAt: new Date().toISOString(),
      messages: [],
      attachments: [],
      id: `${ticketIdPrefix}-${new Date().getFullYear()}-${String(tickets.length + 2).padStart(3, '0')}`,
      department: isReport ? 'Compliance' : 'General Support',
      assignee: 'Unassigned'
    });
  };

  // Function to get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter tickets based on search and filters
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      {/* Fixed Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white border-b h-16">
        <SharedHeader5 />
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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                <p className="text-gray-600">Manage and track your support requests</p>
              </div>
              <Button
                onClick={() => setShowNewTicketModal(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Ticket
              </Button>
            </div>
          </div>

          {/* Reports Section (Highlighted) */}
          <Card className="p-6 mb-6 bg-blue-50 border-blue-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-blue-900">Reports</h2>
                <p className="text-blue-700">Report issues with professionals, disputes, or platform violations</p>
              </div>
              <Button
                onClick={() => setNewReportModal(true)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
              >
                <Flag className="w-4 h-4 mr-2" />
                File a Report
              </Button>
            </div>
          </Card>

          {/* Filters and Search */}
          <Card className="p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets and reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <Card
                key={ticket.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedTicket(ticket);
                  setShowTicketDetails(true);
                }}
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-gray-900">{ticket.subject}</h3>
                          <Badge className="text-xs">{ticket.id}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{ticket.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </Badge>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{ticket.assignee}</p>
                      <p className="text-xs text-gray-500">{ticket.department}</p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* New Ticket Modal */}
          <AnimatePresence>
            {showNewTicketModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl w-full max-w-2xl mx-4 overflow-hidden"
                >
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Create New Support Ticket</h2>
                    <button
                      onClick={() => setShowNewTicketModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitNewTicket(false);
                    }}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newTicket.description}
                            onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            rows={4}
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            value={newTicket.priority}
                            onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            value={newTicket.category}
                            onChange={(e) => setNewTicket({...newTicket, category: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            required
                          >
                            <option value="">Select a category</option>
                            <option value="Technical">Technical</option>
                            <option value="Billing">Billing</option>
                            <option value="General">General</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowNewTicketModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={!newTicket.subject || !newTicket.description || !newTicket.category}
                        >
                          Create Ticket
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* New Report Modal */}
          <AnimatePresence>
            {newReportModal && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl w-full max-w-2xl mx-4 overflow-hidden"
                >
                  <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">File a Report</h2>
                    <button
                      onClick={() => setNewReportModal(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-6">
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmitNewTicket(true);
                    }}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject
                          </label>
                          <input
                            type="text"
                            value={newTicket.subject}
                            onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newTicket.description}
                            onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                            rows={4}
                            required
                            placeholder="Describe the issue (e.g., professional working outside platform, dispute, etc.)"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                          </label>
                          <select
                            value={newTicket.priority}
                            onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setNewReportModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={!newTicket.subject || !newTicket.description}
                        >
                          Submit Report
                        </Button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Ticket Details Modal */}
          <AnimatePresence>
            {showTicketDetails && selectedTicket && (
              <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl w-full max-w-4xl mx-4 h-[90vh] flex flex-col overflow-hidden"
                >
                  {/* Modal Header */}
                  <div className="p-6 border-b flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-semibold">{selectedTicket.subject}</h2>
                        <Badge>{selectedTicket.id}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge className={getStatusColor(selectedTicket.status)}>
                          {selectedTicket.status.replace('_', ' ').charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                        </Badge>
                        <Badge className={getPriorityColor(selectedTicket.priority)}>
                          {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)} Priority
                        </Badge>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(selectedTicket.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTicketDetails(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Ticket Details */}
                  <div className="flex-1 overflow-auto">
                    {/* Ticket Information */}
                    <div className="p-6 bg-gray-50 border-b">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Department</h3>
                          <p className="text-gray-900">{selectedTicket.department}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Assignee</h3>
                          <p className="text-gray-900">{selectedTicket.assignee}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                          <p className="text-gray-900">{selectedTicket.category}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message History */}
                    <div className="p-6 space-y-6">
                      {selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-4 ${
                            message.role === 'client' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            {message.role === 'client' ? (
                              <User className="w-5 h-5 text-gray-600" />
                            ) : (
                              <MessageCircle className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                          <div className={`flex-1 max-w-2xl ${
                            message.role === 'client' ? 'text-right' : ''
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {message.sender}
                              </span>
                              <span className="text-sm text-gray-500">
                                {formatDate(message.timestamp)}
                              </span>
                            </div>
                            <div className={`p-4 rounded-lg ${
                              message.role === 'client' 
                                ? 'bg-blue-50 text-blue-900' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p>{message.message}</p>
                              {message.attachments.length > 0 && (
                                <div className="mt-3 space-y-2">
                                  {message.attachments.map((attachment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 text-sm p-2 bg-white rounded"
                                    >
                                      <Paperclip className="w-4 h-4 text-gray-400" />
                                      <span>{attachment.name}</span>
                                      <span className="text-gray-400">({attachment.size})</span>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-auto"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // Handle download
                                        }}
                                      >
                                        <Download className="w-4 h-4" />
                                      </Button>
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

                  {/* Reply Section */}
                  <div className="p-6 border-t bg-white">
                    <div className="flex gap-4">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 p-3 border rounded-lg resize-none"
                        rows={3}
                      />
                      <div className="space-y-2">
                        <Button
                          className="w-full"
                          disabled={!newMessage.trim()}
                          onClick={() => {
                            if (newMessage.trim()) {
                              const updatedTicket = {
                                ...selectedTicket,
                                messages: [
                                  ...selectedTicket.messages,
                                  {
                                    id: selectedTicket.messages.length + 1,
                                    sender: "Emma Thompson",
                                    role: "client",
                                    message: newMessage,
                                    timestamp: new Date().toISOString(),
                                    attachments: []
                                  }
                                ]
                              };
                              setTickets(tickets.map(t => 
                                t.id === selectedTicket.id ? updatedTicket : t
                              ));
                              setSelectedTicket(updatedTicket);
                              setNewMessage('');
                            }
                          }}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <br />
      <br />
      <br />
      <br />

      <SharedFooter2 />
    </div>
  );
};

export default ClientSupportTickets;