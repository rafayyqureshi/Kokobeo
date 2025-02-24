import React, { useState } from 'react';
import {
  Search, Filter, X, AlertTriangle,
  Users, Ban, Clock, Settings, 
  FileText, Calendar, DollarSign, ShoppingBag,
  Phone, Mail, MapPin, User, Star, MessageSquare,
  Download, Trash2, Edit, Eye, CheckCircle, AlertOctagon,
  Timer, ArrowRight, Bell, Calculator, CheckSquare, FileCheck,
  PlusCircle, Archive, Send, Receipt, CircleDollarSign, ClipboardCheck
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const QuotesPage = () => {
  // State management
  const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quoteStatus, setQuoteStatus] = useState('all');
  const [serviceType, setServiceType] = useState('all');
  const [showQuoteDetails, setShowQuoteDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for quotes
  const quotes = [
    {
      id: 'QT-2024-001',
      type: 'standard',
      service: 'Plumbing Service',
      status: 'pending_review',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, Toronto, ON'
      },
      provider: {
        name: 'Mike Wilson',
        company: 'Wilson Plumbing Co.',
        rating: 4.8,
        verified: true
      },
      requestDate: '2024-02-07T10:30:00',
      dueDate: '2024-02-09T10:30:00',
      proposedPrice: 150.00,
      finalPrice: null,
      description: 'Full bathroom plumbing inspection and maintenance',
      requirements: [
        'Pipe inspection',
        'Leak detection',
        'Pressure testing'
      ],
      attachments: 2,
      priority: 'normal',
      notes: [
        {
          time: '2024-02-07T10:35:00',
          author: 'System',
          text: 'Quote request received'
        },
        {
          time: '2024-02-07T10:40:00',
          author: 'Provider',
          text: 'Initial assessment completed'
        }
      ]
    },
    {
      id: 'QT-2024-002',
      type: 'custom',
      service: 'Electrical Installation',
      status: 'under_negotiation',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        address: '456 Oak St, Vancouver, BC'
      },
      provider: {
        name: 'David Brown',
        company: 'Brown Electric',
        rating: 4.9,
        verified: true
      },
      requestDate: '2024-02-07T11:00:00',
      dueDate: '2024-02-08T11:00:00',
      proposedPrice: 350.00,
      finalPrice: 300.00,
      description: 'Complete house rewiring with smart home integration',
      requirements: [
        'Full house rewiring',
        'Smart switch installation',
        'Safety inspection'
      ],
      attachments: 4,
      priority: 'high',
      notes: [
        {
          time: '2024-02-07T11:05:00',
          author: 'System',
          text: 'Quote under review'
        },
        {
          time: '2024-02-07T11:15:00',
          author: 'Provider',
          text: 'Counter offer proposed'
        }
      ]
    }
  ];

  // Quote Details Modal Component
  const QuoteDetailsModal = ({ quote, isOpen, onClose }) => {
    if (!quote || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        pending_review: 'bg-yellow-100 text-yellow-700',
        under_negotiation: 'bg-blue-100 text-blue-700',
        approved: 'bg-green-100 text-green-700',
        rejected: 'bg-red-100 text-red-700'
      };
      return styles[status] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusBadge(quote.status)}>
                    {quote.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {quote.type === 'custom' && (
                    <Badge variant="outline" className="border-purple-200 text-purple-700">
                      CUSTOM QUOTE
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2">{quote.service}</h2>
                <p className="text-sm text-gray-500">Quote ID: {quote.id}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Price Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="font-medium text-blue-800">Proposed Price: ${quote.proposedPrice}</span>
                    {quote.finalPrice && (
                      <span className="ml-2 text-sm text-blue-600">
                        (Final: ${quote.finalPrice})
                      </span>
                    )}
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  Due: {new Date(quote.dueDate).toLocaleDateString()}
                </Badge>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Name</span>
                    <p className="font-medium">{quote.customer.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{quote.customer.phone}</p>
                      <Button size="sm" variant="outline" className="h-8">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{quote.customer.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Address</span>
                    <p className="font-medium">{quote.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Provider</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{quote.provider.name}</h4>
                      <p className="text-sm text-gray-500">{quote.provider.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{quote.provider.rating}</span>
                    {quote.provider.verified && (
                      <Badge className="bg-green-100 text-green-700">Verified</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="mt-1">{quote.description}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Requirements</span>
                  <ul className="mt-2 space-y-2">
                    {quote.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-green-500" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {quote.attachments} attachments
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-4">
              <h3 className="font-medium">Activity Log</h3>
              <div className="space-y-4">
                {quote.notes.map((note, index) => (
                  <div key={index} className="flex gap-3">
                    <div className={`p-2 rounded-lg ${
                      note.author === 'System' ? 'bg-gray-100' :
                      note.author === 'Provider' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {note.author === 'System' ? (
                        <Settings className="h-4 w-4 text-gray-600" />
                      ) : (
                        <User className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        {new Date(note.time).toLocaleString()}
                      </div>
                      <p className="mt-1">{note.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Actions */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">Quote Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve Quote
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Price
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Request Changes
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <Ban className="h-4 w-4" />
                  Reject Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quotes Management</h1>
                <p className="text-gray-600 mt-1">Review and manage service quotes</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Quotes
                </Button>
                <Button className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Quote
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Quotes</p>
                    <p className="text-2xl font-semibold">24</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Under Negotiation</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Value</p>
                    <p className="text-2xl font-semibold">$15.2k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Approved Today</p>
                    <p className="text-2xl font-semibold">8</p>
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full lg:w-auto">
      <div className="relative flex-1 w-full sm:w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search quotes..."
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
        value={quoteStatus}
        onChange={(e) => setQuoteStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="pending_review">Pending Review</option>
        <option value="under_negotiation">Under Negotiation</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="price_high">Highest Price</option>
        <option value="price_low">Lowest Price</option>
      </select>
    </div>
  </div>

  {/* Advanced Filters */}
  {showFilters && (
    <div className="mt-4 pt-4 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quote Type
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Types</option>
            <option value="standard">Standard</option>
            <option value="custom">Custom</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="all">All Services</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="hvac">HVAC</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Ranges</option>
            <option value="0-100">$0 - $100</option>
            <option value="101-500">$101 - $500</option>
            <option value="501-1000">$501 - $1000</option>
            <option value="1000+">$1000+</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Quotes Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quote Info
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              <Receipt className={`h-5 w-5 ${
                                quote.type === 'custom' ? 'text-purple-500' : 'text-blue-500'
                              }`} />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{quote.id}</div>
                              <div className="text-sm text-gray-500">{quote.service}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{quote.customer.name}</div>
                          <div className="text-sm text-gray-500">{quote.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{quote.provider.name}</div>
                          <div className="text-sm text-gray-500">{quote.provider.company}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            quote.status === 'pending_review' ? 'bg-yellow-100 text-yellow-700' :
                            quote.status === 'under_negotiation' ? 'bg-blue-100 text-blue-700' :
                            quote.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {quote.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${quote.proposedPrice.toFixed(2)}
                          {quote.finalPrice && (
                            <span className="text-green-600 ml-1">
                              (${quote.finalPrice.toFixed(2)})
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowQuoteDetails(quote)}
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

      {/* Quote Details Modal */}
      <QuoteDetailsModal
        quote={showQuoteDetails}
        isOpen={!!showQuoteDetails}
        onClose={() => setShowQuoteDetails(null)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default QuotesPage;