import React, { useState } from 'react';
import {
  Search, Filter, X, AlertTriangle,
  Users, Ban, Clock, Settings, 
  FileText, Calendar, DollarSign, ShoppingBag,
  Phone, Mail, MapPin, User, Star, MessageSquare,
  Download, Trash2, Edit, Eye, CheckCircle, AlarmClock,
  ArrowRight, Timer, AlertOctagon
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const PendingOrdersPage = () => {
  // State management
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPriority, setOrderPriority] = useState('all');
  const [timeFrame, setTimeFrame] = useState('all');
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [sortBy, setSortBy] = useState('oldest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for pending orders
  const pendingOrders = [
    {
      id: 'ORD-2024-001',
      type: 'standard',
      service: 'Plumbing Service',
      status: 'pending_approval',
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
      paymentStatus: 'pending',
      priority: 'normal',
      waitTime: '2 hours',
      description: 'Leaky faucet repair and pipe inspection',
      notes: [
        {
          time: '2024-02-07T10:35:00',
          author: 'System',
          text: 'Order received, awaiting approval'
        }
      ]
    },
    {
      id: 'ORD-2024-002',
      type: 'emergency',
      service: 'Electrical Service',
      status: 'pending_assignment',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        address: '456 Oak St, Vancouver, BC'
      },
      orderDate: '2024-02-07T11:00:00',
      amount: 250.00,
      paymentStatus: 'authorized',
      priority: 'high',
      waitTime: '15 minutes',
      description: 'Complete power outage, requires immediate attention',
      notes: [
        {
          time: '2024-02-07T11:05:00',
          author: 'System',
          text: 'Emergency order received, searching for available provider'
        }
      ]
    }
  ];

  // Order Details Modal Component
  const OrderDetailsModal = ({ order, isOpen, onClose }) => {
    if (!order || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        pending_approval: 'bg-yellow-100 text-yellow-700',
        pending_assignment: 'bg-orange-100 text-orange-700',
        pending_payment: 'bg-blue-100 text-blue-700'
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
            {/* Wait Time Alert */}
            <Alert className="bg-yellow-50 border-yellow-200">
              <Timer className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Waiting for {order.waitTime}
              </AlertDescription>
            </Alert>

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
                <h3 className="font-medium">Assigned Provider</h3>
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
                      order.paymentStatus === 'authorized' 
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
                {order.status === 'pending_approval' && (
                  <>
                    <Button className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Approve Order
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Details
                    </Button>
                  </>
                )}
                {order.status === 'pending_assignment' && (
                  <Button className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Assign Provider
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contact Customer
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pending Orders</h1>
                <p className="text-gray-600 mt-1">Manage and process pending service orders</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export List
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Pending</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
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
                    <AlertOctagon className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg. Wait Time</p>
                    <p className="text-2xl font-semibold">35m</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Timer className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Value</p>
                    <p className="text-2xl font-semibold">$12.5k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
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
          placeholder="Search pending orders..."
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
        value={orderPriority}
        onChange={(e) => setOrderPriority(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Priorities</option>
        <option value="high">High Priority</option>
        <option value="normal">Normal Priority</option>
        <option value="low">Low Priority</option>
      </select>

      <select
        value={timeFrame}
        onChange={(e) => setTimeFrame(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  </div>

  {/* Advanced Filters */}
  {showFilters && (
    <div className="mt-4 pt-4 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status Type
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Status Types</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="pending_assignment">Pending Assignment</option>
            <option value="pending_payment">Pending Payment</option>
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
            Wait Time
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Times</option>
            <option value="15min">Under 15 minutes</option>
            <option value="30min">Under 30 minutes</option>
            <option value="1hour">Under 1 hour</option>
            <option value="over1hour">Over 1 hour</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Pending Orders Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedOrders(pendingOrders.map(order => order.id));
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
                        Wait Time
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
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingOrders.map((order) => (
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
                          <div className="flex items-center text-yellow-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{order.waitTime}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-sm text-gray-500">{order.customer.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            order.status === 'pending_approval' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'pending_assignment' ? 'bg-orange-100 text-orange-700' :
                            'bg-blue-100 text-blue-700'
                          }>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowOrderDetails(order)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Process Order
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

export default PendingOrdersPage;