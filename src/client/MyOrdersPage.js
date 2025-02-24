import React, { useState } from 'react';
import {
  FileText, Clock, Calendar, DollarSign,
  Search, X, Shield, MessageCircle,
  CheckCircle, AlertCircle, Filter,
  List, Grid, Star, User, Package,
  MoreHorizontal, ChevronDown, Receipt,
  FileCheck, Timer, Briefcase, MapPin
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const MyOrdersPage = () => {
  // State management
  const [selectedTab, setSelectedTab] = useState('active');
  const [viewMode, setViewMode] = useState('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    orderType: 'all',
    status: 'all',
    timeframe: 'all',
  });

  // Mock data for active orders
  const activeOrders = [
    {
      id: 'ORD-2024-001',
      type: 'local',
      serviceType: 'Plumbing',
      description: 'Kitchen sink repair and pipe replacement',
      amount: 250,
      currency: 'USD',
      status: 'scheduled',
      scheduledDate: '2024-01-22',
      timeSlot: '14:00-16:00',
      location: 'Home Address',
      professional: {
        name: 'Mike Wilson',
        rating: 4.9,
        reviews: 89,
        verified: true
      },
      emergency: false,
      lastUpdate: '2 hours ago',
      unreadMessages: 2
    },
    {
      id: 'ORD-2024-002',
      type: 'international',
      serviceType: 'Web Development',
      description: 'E-commerce website development with React and Node.js',
      amount: 3500,
      currency: 'USD',
      status: 'in-progress',
      startDate: '2024-01-15',
      endDate: '2024-02-28',
      progress: 45,
      deliverables: [
        { name: 'Design Phase', completed: true },
        { name: 'Frontend Development', completed: false },
        { name: 'Backend Development', completed: false }
      ],
      professional: {
        name: 'Sarah Chen',
        rating: 4.95,
        reviews: 156,
        verified: true
      },
      lastUpdate: '1 day ago'
    }
  ];

  // Mock data for past orders
  const pastOrders = [
    {
      id: 'ORD-2023-120',
      type: 'local',
      serviceType: 'Electrical',
      description: 'Electrical wiring and outlet installation',
      amount: 450,
      currency: 'USD',
      status: 'completed',
      completionDate: '2023-12-28',
      professional: {
        name: 'David Brown',
        rating: 5.0,
        reviews: 203
      },
      feedback: {
        given: true,
        rating: 5,
        comment: 'Excellent service, very professional and clean work'
      }
    }
  ];

  // Order Card Component
  const OrderCard = ({ order }) => {
    const isInternational = order.type === 'international';
    const isEmergency = order.emergency;

    return (
      <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow" style={{ textAlign: 'left' }}>
        <div className="flex flex-col gap-4">
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  {order.serviceType}
                </h3>
                {isEmergency && (
                  <Badge variant="destructive" className="bg-red-100 text-red-800">
                    Emergency
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800">
                  {order.type === 'international' ? 'International' : 'Local'}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span>Order {order.id}</span>
                <span className="hidden sm:inline">•</span>
                <span>
                  {isInternational 
                    ? `Due ${new Date(order.endDate).toLocaleDateString()}`
                    : `Scheduled for ${new Date(order.scheduledDate).toLocaleDateString()}`
                  }
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="self-start">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Description */}
          <p className="text-gray-600">
            {order.description}
          </p>

          {/* Progress Bar */}
          {order.status === 'in-progress' && order.progress && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{order.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${order.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Professional Info */}
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <div className="font-medium">{order.professional.name}</div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{order.professional.rating}</span>
                <span>({order.professional.reviews} reviews)</span>
                {order.professional.verified && (
                  <Badge className="bg-green-50 text-green-700">Verified</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Order Details for Mobile */}
          <div className="sm:hidden space-y-4 border-t border-b py-4">
            <div>
              <div className="text-sm text-gray-600">Amount</div>
              <div className="text-lg font-semibold">
                {order.currency} {order.amount.toLocaleString()}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600">
                {isInternational ? 'Timeline' : 'Appointment'}
              </div>
              <div className="font-medium">
                {isInternational ? (
                  <>
                    Start: {new Date(order.startDate).toLocaleDateString()}
                    <br />
                    End: {new Date(order.endDate).toLocaleDateString()}
                  </>
                ) : (
                  <>
                    {new Date(order.scheduledDate).toLocaleDateString()}
                    <br />
                    {order.timeSlot}
                  </>
                )}
              </div>
            </div>

            <div>
              <Badge 
                className={`
                  ${order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'}
                `}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            {!isInternational && (
              <div>
                <div className="text-sm text-gray-600">Location</div>
                <div className="font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {order.location}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">
                {order.unreadMessages ? `Messages (${order.unreadMessages})` : 'Message'}
              </span>
              <span className="sm:hidden">
                {order.unreadMessages ? order.unreadMessages : ''}
              </span>
            </Button>
            
            {isInternational ? (
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">View Deliverables</span>
                <span className="sm:hidden">Deliverables</span>
              </Button>
            ) : (
              <Button variant="outline" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">View Appointment</span>
                <span className="sm:hidden">Appointment</span>
              </Button>
            )}

            {order.status === 'completed' && !order.feedback?.given && (
              <Button variant="outline" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span className="hidden sm:inline">Leave Review</span>
                <span className="sm:hidden">Review</span>
              </Button>
            )}
          </div>

          {/* Desktop Order Details */}
          {viewMode === 'list' && (
            <div className="hidden sm:block border-t pt-4 mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Amount</div>
                  <div className="text-lg font-semibold">
                    {order.currency} {order.amount.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">
                    {isInternational ? 'Timeline' : 'Appointment'}
                  </div>
                  <div className="font-medium">
                    {isInternational ? (
                      <>
                        Start: {new Date(order.startDate).toLocaleDateString()}
                        <br />
                        End: {new Date(order.endDate).toLocaleDateString()}
                      </>
                    ) : (
                      <>
                        {new Date(order.scheduledDate).toLocaleDateString()}
                        <br />
                        {order.timeSlot}
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600">Status</div>
                  <Badge 
                    className={`
                      ${order.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'}
                    `}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                {!isInternational && (
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-medium flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {order.location}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-600">View and manage your service orders</p>
          </div>
          
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
            <Package className="h-4 w-4" />
            <span>Browse Services</span>
          </Button>
        </div>

        {/* Filters and Views */}
        <div className="bg-white border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
            {/* Tabs */}
            <div className="flex items-center gap-4 overflow-x-auto">
              <button
                onClick={() => setSelectedTab('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedTab === 'active'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                onClick={() => setSelectedTab('past')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  selectedTab === 'past'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Past Orders ({pastOrders.length})
              </button>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Search */}
              <div className="relative flex-grow sm:max-w-xs">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* View Toggle */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 flex-1 sm:flex-none ${
                    viewMode === 'list'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4 mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 flex-1 sm:flex-none ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Order Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Type
                  </label>
                  <select
                    value={filters.orderType}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      orderType: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Types</option>
                    <option value="local">Local Services</option>
                    <option value="international">International Services</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      status: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Timeframe Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeframe
                  </label>
                  <select
                    value={filters.timeframe}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      timeframe: e.target.value
                    }))}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="this-week">This Week</option>
                    <option value="this-month">This Month</option>
                    <option value="last-3-months">Last 3 Months</option>
                    <option value="last-6-months">Last 6 Months</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    setFilters({
                      orderType: 'all',
                      status: 'all',
                      timeframe: 'all'
                    });
                  }}
                >
                  Clear Filters
                </Button>
                <Button className="w-full sm:w-auto">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Orders Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
            : 'space-y-4 sm:space-y-6'
        }>
          {selectedTab === 'active' ? (
            activeOrders.length > 0 ? (
              activeOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="mb-4">
                  <Package className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Active Orders
                </h3>
                <p className="text-gray-600 mb-4">
                  You don't have any active orders at the moment.
                </p>
                <Button className="w-full sm:w-auto">Browse Services</Button>
              </div>
            )
          ) : (
            pastOrders.length > 0 ? (
              pastOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="mb-4">
                  <Receipt className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Past Orders
                </h3>
                <p className="text-gray-600">
                  You haven't completed any orders yet.
                </p>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {(selectedTab === 'active' ? activeOrders : pastOrders).length > 0 && (
          <div className="mt-6 sm:mt-8">
            <nav className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <Button variant="outline" className="w-full sm:w-24">Previous</Button>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? 'default' : 'ghost'}
                    className="w-8 h-8 sm:w-10 sm:h-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline" className="w-full sm:w-24">Next</Button>
            </nav>
          </div>
        )}
      </main>

      {/* Spacer for fixed footer */}
      <div className="h-24 sm:h-32"></div>

      <SharedFooter2 />
    </div>
  );
};

export default MyOrdersPage;