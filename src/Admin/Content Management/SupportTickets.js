import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MoreVertical, Shield,
  MessageSquare, Mail, Phone, Clock, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle, AlertTriangle,
  User, FileText, ChevronDown, ChevronUp, AlertCircle,
  ArrowUpRight, ExternalLink, BadgeCheck, Paperclip,
  Send, Reply, Archive, CornerUpRight, RotateCcw,
  Bell, Check, Tag, Flag, History
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const SupportTickets2 = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showTicketDetails, setShowTicketDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock tickets data
  const tickets = [
    {
      id: 'TICK-2024-001',
      user: {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        type: 'Client',
        verified: true
      },
      category: 'Technical Issue',
      subcategory: 'Account Access',
      priority: 'high',
      status: 'open',
      subject: 'Unable to access service provider dashboard',
      description: 'Getting error message when trying to log into the provider dashboard.',
      createdAt: '2024-02-07T10:30:00',
      updatedAt: '2024-02-07T11:00:00',
      assignedTo: {
        name: 'Support Team A',
        email: 'support-a@kokobeo.com'
      },
      responses: [
        {
          id: 1,
          type: 'user',
          content: 'I have tried clearing cache and cookies but still having the same issue.',
          timestamp: '2024-02-07T10:45:00',
          attachments: []
        },
        {
          id: 2,
          type: 'admin',
          author: 'Support Team A',
          content: 'We are investigating this issue. Could you please provide your browser version?',
          timestamp: '2024-02-07T11:00:00',
          internal: false
        }
      ],
      internalNotes: [
        {
          id: 1,
          author: 'Admin1',
          content: 'Checking server logs for authentication errors',
          timestamp: '2024-02-07T11:05:00'
        }
      ],
      attachments: [
        {
          id: 1,
          name: 'error-screenshot.png',
          type: 'image/png',
          size: '245 KB'
        }
      ],
      tags: ['Dashboard', 'Login Issue'],
      history: [
        {
          action: 'Ticket Created',
          timestamp: '2024-02-07T10:30:00',
          by: 'John Smith'
        },
        {
          action: 'Assigned to Support Team A',
          timestamp: '2024-02-07T10:35:00',
          by: 'System'
        }
      ]
    },
    {
      id: 'TICK-2024-002',
      user: {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        type: 'Service Provider',
        verified: true
      },
      category: 'Billing',
      subcategory: 'Payment Issue',
      priority: 'medium',
      status: 'in_progress',
      subject: 'Payment not received for completed service',
      description: 'Completed service on Feb 1st but payment not showing in dashboard.',
      createdAt: '2024-02-06T15:45:00',
      updatedAt: '2024-02-07T09:15:00',
      assignedTo: {
        name: 'Billing Support',
        email: 'billing@kokobeo.com'
      },
      responses: [
        {
          id: 1,
          type: 'admin',
          author: 'Billing Support',
          content: 'We are reviewing the transaction records. Could you provide the order ID?',
          timestamp: '2024-02-06T16:00:00',
          internal: false
        }
      ],
      internalNotes: [
        {
          id: 1,
          author: 'Admin2',
          content: 'Payment stuck in processing state. Escalating to payment gateway team.',
          timestamp: '2024-02-06T16:30:00'
        }
      ],
      attachments: [],
      tags: ['Payment', 'Provider'],
      history: [
        {
          action: 'Ticket Created',
          timestamp: '2024-02-06T15:45:00',
          by: 'Sarah Wilson'
        },
        {
          action: 'Priority Changed to Medium',
          timestamp: '2024-02-06T16:00:00',
          by: 'Admin2'
        }
      ]
    }
  ];

  // Priority levels and their corresponding styles
  const priorityConfig = {
    low: {
      color: 'bg-blue-100 text-blue-700',
      icon: <Clock className="h-4 w-4" />
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-700',
      icon: <AlertCircle className="h-4 w-4" />
    },
    high: {
      color: 'bg-red-100 text-red-700',
      icon: <AlertTriangle className="h-4 w-4" />
    }
  };

  // Status configurations
  const statusConfig = {
    open: {
      color: 'bg-green-100 text-green-700',
      label: 'Open'
    },
    in_progress: {
      color: 'bg-blue-100 text-blue-700',
      label: 'In Progress'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-700',
      label: 'Pending'
    },
    resolved: {
      color: 'bg-gray-100 text-gray-700',
      label: 'Resolved'
    },
    closed: {
      color: 'bg-gray-100 text-gray-700',
      label: 'Closed'
    }
  };

  // Ticket Details Modal Component
  const TicketDetailsModal = ({ ticket, isOpen, onClose }) => {
    const [response, setResponse] = useState('');
    const [internalNote, setInternalNote] = useState('');
    const [showHistory, setShowHistory] = useState(false);

    if (!ticket) return null;

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
            className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"  style={{ textAlign: 'left' }}
          >
            <div className="p-6 border-b sticky top-0 bg-white"  style={{ textAlign: 'left' }}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold">Ticket #{ticket.id}</h2>
                    <Badge className={priorityConfig[ticket.priority].color}>
                      {priorityConfig[ticket.priority].icon}
                      <span className="ml-1 capitalize">{ticket.priority} Priority</span>
                    </Badge>
                    <Badge className={statusConfig[ticket.status].color}>
                      {statusConfig[ticket.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Created {new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="flex divide-x">
              {/* Main Content */}
              <div className="flex-1 p-6">
                {/* Ticket Information */}
                <div className="space-y-6">
                  {/* Subject and Category */}
                  <div>
                    <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">
                        {ticket.category}
                      </Badge>
                      <Badge variant="outline">
                        {ticket.subcategory}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{ticket.description}</p>
                    {ticket.attachments.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium text-gray-500 mb-2">Attachments:</div>
                        <div className="flex flex-wrap gap-2">
                          {ticket.attachments.map(attachment => (
                            <div
                              key={attachment.id}
                              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border"
                            >
                              <Paperclip className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conversation Thread */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Conversation</h3>
                    <div className="space-y-4">
                      {ticket.responses.map(response => (
                        <div
                          key={response.id}
                          className={`flex gap-4 ${
                            response.type === 'admin' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className={`flex-1 space-y-2 ${
                            response.type === 'admin' ? 'text-right' : ''
                          }`}>
                            <div className="inline-block max-w-[80%] bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">
                                  {response.type === 'admin' ? response.author : ticket.user.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {new Date(response.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="text-gray-700">{response.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Response Input */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-4">
                        <textarea
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                          placeholder="Type your response..."
                          rows={4}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-between items-center">
                          <Button variant="outline" size="sm">
                            <Paperclip className="h-4 w-4 mr-2" />
                            Attach Files
                          </Button>
                          <Button disabled={!response.trim()}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Response
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 p-6 space-y-6">
                {/* User Information */}
                <div className="space-y-4">
                  <h3 className="font-medium">User Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Name</span>
                      <p className="font-medium">{ticket.user.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email</span>
                      <p className="font-medium">{ticket.user.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone</span>
                      <p className="font-medium">{ticket.user.phone}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">User Type</span>
                      <Badge className="mt-1">
                        {ticket.user.type}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Assignment */}
                <div className="space-y-4">
                  <h3 className="font-medium">Assignment</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{ticket.
                        assignedTo.name}</p>
                        <p className="text-sm text-gray-500">{ticket.assignedTo.email}</p>
                        </div>
                        <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                        </Button>
                        </div>
                        </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="space-y-4">
              <h3 className="font-medium">Internal Notes</h3>
              <div className="space-y-3">
                {ticket.internalNotes.map((note, index) => (
                  <div key={index} className="bg-yellow-50 rounded-lg p-3">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{note.author}</span>
                      <span>{new Date(note.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="mt-1">{note.content}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Add internal note..."
                  className="flex-1 px-3 py-2 border rounded-lg"
                />
                <Button disabled={!internalNote.trim()}>
                  Add
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {ticket.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">History</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {showHistory && (
                <div className="space-y-3">
                  {ticket.history.map((event, index) => (
                    <div key={index} className="text-sm space-y-1">
                      <p className="text-gray-700">{event.action}</p>
                      <div className="flex justify-between text-gray-500">
                        <span>{event.by}</span>
                        <span>{new Date(event.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t">
              <Button className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
              <Button variant="outline" className="w-full">
                <CornerUpRight className="h-4 w-4 mr-2" />
                Escalate Ticket
              </Button>
              <Button variant="outline" className="w-full text-yellow-600">
                <Archive className="h-4 w-4 mr-2" />
                Archive Ticket
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
);
};
// Ticket Card Component
const TicketCard = ({ ticket }) => (
<Card className="hover:shadow-md transition-shadow">
<div className="p-6 space-y-4">
{/* Header */}
<div className="flex justify-between items-start">
<div>
<div className="flex items-center gap-2">
<Badge className={statusConfig[ticket.status].color}>
{statusConfig[ticket.status].label}
</Badge>
<Badge className={priorityConfig[ticket.priority].color}>
{priorityConfig[ticket.priority].icon}
<span className="ml-1 capitalize">{ticket.priority}</span>
</Badge>
</div>
<h3 className="font-medium mt-2">{ticket.subject}</h3>
</div>
<Button
variant="ghost"
size="sm"
onClick={() => setShowTicketDetails(ticket)}
>
<Eye className="h-4 w-4" />
</Button>
</div>
{/* Info Grid */}
<div className="grid grid-cols-2 gap-4"  style={{ textAlign: 'left' }}>
      <div>
        <span className="text-sm text-gray-500">Category</span>
        <p className="font-medium">{ticket.category}</p>
      </div>
      <div>
        <span className="text-sm text-gray-500">Created</span>
        <p className="font-medium">{new Date(ticket.createdAt).toLocaleDateString()}</p>
      </div>
    </div>

    {/* User Info */}
    <div className="flex items-center justify-between pt-4 border-t">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
          <User className="h-4 w-4 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">{ticket.user.name}</p>
          <p className="text-sm text-gray-500">{ticket.user.type}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium">{ticket.assignedTo.name}</p>
        <p className="text-sm text-gray-500">Assigned To</p>
      </div>
    </div>
  </div>
</Card>
);
return (
<div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
<AdminHeader />
<main className="flex-1 lg:pl-64 pt-16">
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
            <p className="text-gray-600 mt-1">Manage and respond to customer support tickets</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Tickets
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Open Tickets</p>
                <p className="text-2xl font-semibold">45</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Response Time</p>
                <p className="text-2xl font-semibold">2.5h</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Resolution Rate</p>
                <p className="text-2xl font-semibold">94%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
  <div className="flex flex-col lg:flex-row justify-between gap-4">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-1 w-full sm:min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 w-full sm:w-auto"
      >
        <Filter className="h-5 w-5" />
        Filters
      </Button>
    </div>
    
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Categories</option>
        <option value="technical">Technical Issue</option>
        <option value="billing">Billing</option>
        <option value="account">Account</option>
      </select>

      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">Priority</option>
        <option value="updated">Last Updated</option>
      </select>
    </div>
  </div>
</Card>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tickets.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {tickets.length} of 45 tickets
          </p>
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
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>

  {/* Ticket Details Modal */}
  <TicketDetailsModal
    ticket={showTicketDetails}
    isOpen={!!showTicketDetails}
    onClose={() => setShowTicketDetails(null)}
  />

  {/* <SharedFooter2 /> */}
</div>
);
};
export default SupportTickets2;