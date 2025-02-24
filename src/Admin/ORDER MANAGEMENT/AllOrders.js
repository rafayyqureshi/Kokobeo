import React, { useState } from 'react';
import {
  Search, Filter, X, AlertTriangle,
  Users, Ban, Clock, Settings, 
  FileText, Calendar, DollarSign, ShoppingBag,
  Phone, Mail, MapPin, User, Star, MessageSquare,
  Download, Trash2, Edit, Eye
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const AllOrdersPage = () => {
  // State management
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderType, setOrderType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for orders
  const orders = [
    {
      id: 'ORD-2024-001',
      type: 'standard',
      service: 'Plumbing Service',
      status: 'in_progress',
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
      orderDate: '2024-02-07T10:30:00',
      scheduledDate: '2024-02-08T14:00:00',
      amount: 150.00,
      paymentStatus: 'paid',
      priority: 'normal',
      description: 'Leaky faucet repair and pipe inspection',
      notes: [
        {
          time: '2024-02-07T10:35:00',
          author: 'System',
          text: 'Order received'
        },
        {
          time: '2024-02-07T10:40:00',
          author: 'Provider',
          text: 'Appointment confirmed'
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      type: 'emergency',
      service: 'Electrical Service',
      status: 'pending',
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
      orderDate: '2024-02-07T11:00:00',
      amount: 250.00,
      paymentStatus: 'pending',
      priority: 'high',
      description: 'Complete power outage, requires immediate attention',
      notes: [
        {
          time: '2024-02-07T11:05:00',
          author: 'System',
          text: 'Emergency order received'
        }
      ]
    }
  ];

  // Order Details Modal Component
  const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!order || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        pending: 'bg-yellow-100 text-yellow-700',
        in_progress: 'bg-blue-100 text-blue-700',
        completed: 'bg-green-100 text-green-700',
        cancelled: 'bg-red-100 text-red-700'
      };
      return styles[status] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusBadge(order.status)}>
                    {order.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {order.type === 'emergency' && (
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      EMERGENCY
                    </Badge>
                  )}
                </div>
                <h2 className="text-xl font-semibold mt-2">Order {order.id}</h2>
                <p className="text-sm text-gray-500">{order.service}</p>
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
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Customer Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Name</span>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <p className="font-medium">{order.customer.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{order.customer.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Address</span>
                    <p className="font-medium">{order.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            {order.provider && (
              <div className="space-y-4">
                <h3 className="font-medium">Service Provider</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{order.provider.name}</h4>
                        <p className="text-sm text-gray-500">{order.provider.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{order.provider.rating}</span>
                      {order.provider.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Order Details</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Order Date</span>
                    <p className="font-medium">
                      {new Date(order.orderDate).toLocaleString()}
                    </p>
                  </div>
                  {order.scheduledDate && (
                    <div>
                      <span className="text-sm text-gray-500">Scheduled Date</span>
                      <p className="font-medium">
                        {new Date(order.scheduledDate).toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-500">Amount</span>
                    <p className="font-medium">${order.amount.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Payment Status</span>
                    <Badge className={
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }>
                      {order.paymentStatus.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Description</span>
                  <p className="mt-1">{order.description}</p>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="space-y-4">
              <h3 className="font-medium">Activity Log</h3>
              <div className="space-y-4">
                {order.notes.map((note, index) => (
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
              <h3 className="font-medium">Admin Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Customer
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Order
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-4 w-4" />
                  Flag Issue
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <Ban className="h-4 w-4" />
                  Cancel Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Calculate pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Orders</h1>
                <p className="text-gray-600 mt-1">Manage and monitor all service orders</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Orders
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold">1,234</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShoppingBag className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Orders</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div></Card>

<Card className="p-6">
  <div className="flex justify-between items-start">
    <div className="space-y-1">
      <p className="text-sm text-gray-500">Total Revenue</p>
      <p className="text-2xl font-semibold">$45,250</p>
    </div>
    <div className="p-2 bg-green-100 rounded-lg">
      <DollarSign className="h-5 w-5 text-green-600" />
    </div>
  </div>
</Card>

<Card className="p-6">
  <div className="flex justify-between items-start">
    <div className="space-y-1">
      <p className="text-sm text-gray-500">Active Providers</p>
      <p className="text-2xl font-semibold">89</p>
    </div>
    <div className="p-2 bg-purple-100 rounded-lg">
      <Users className="h-5 w-5 text-purple-600" />
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
          placeholder="Search orders..."
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
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Types</option>
        <option value="standard">Standard</option>
        <option value="emergency">Emergency</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
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
            Payment Status
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service Type
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Services</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="cleaning">Cleaning</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

{/* Orders Table */}
<Card className="overflow-hidden">
<div className="overflow-x-auto"  style={{ textAlign: 'left' }}>
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedOrders(orders.map(order => order.id));
              } else {
                setSelectedOrders([]);
              }
            }}
          />
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order Info
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Customer
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Status
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Date
        </th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {currentOrders.map((order) => (
        <tr key={order.id} className="hover:bg-gray-50">
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={selectedOrders.includes(order.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedOrders([...selectedOrders, order.id]);
                } else {
                  setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                }
              }}
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                <div className="font-medium text-gray-900">{order.id}</div>
                <div className="text-sm text-gray-500">{order.service}</div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
            <div className="text-sm text-gray-500">{order.customer.email}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge className={
              order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
              order.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              order.status === 'completed' ? 'bg-green-100 text-green-700' :
              'bg-red-100 text-red-700'
            }>
              {order.status.replace('_', ' ').toUpperCase()}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            ${order.amount.toFixed(2)}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(order.orderDate).toLocaleDateString()}
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOrderDetails(order)}
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
<div className="px-6 py-4 border-t flex items-center justify-between"  style={{ textAlign: 'left' }}>
  <div className="flex items-center gap-2">
    <span className="text-sm text-gray-700">
      Showing page {currentPage} of {totalPages}
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
      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      disabled={currentPage === totalPages}
    >
      Next
    </Button>
  </div>
</div>
</Card>
</div>
</div>
</main>

{/* Order Details Modal */}
<OrderDetailsModal
order={showOrderDetails}
isOpen={!!showOrderDetails}
onClose={() => setShowOrderDetails(null)}
/>

{/* <SharedFooter2 /> */}
</div>
);
};

export default AllOrdersPage;