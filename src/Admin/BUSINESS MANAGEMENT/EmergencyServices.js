import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  AlertCircle, Clock, Phone, MapPin, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle,
  User, MessageSquare, Star, Building2, Tool,
  Siren, DollarSign, UserCheck, FileText, Timer,
  Zap, Bell, Settings, ArrowUpDown, InfoIcon
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const EmergencyServices = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for emergency service requests
  const emergencyRequests = [
    {
      id: 'ER-2024-001',
      category: 'Plumbing',
      subcategory: 'Water Leak',
      status: 'pending',
      priority: 'high',
      customer: {
        name: 'John Smith',
        phone: '+1 234 567 8900',
        address: '123 Main St, Toronto, ON',
        location: {
          city: 'Toronto',
          province: 'Ontario',
          coordinates: { lat: 43.6532, lng: -79.3832 }
        }
      },
      description: 'Major water leak in basement, risk of flooding',
      submittedAt: '2024-02-07T10:30:00',
      responseTime: '10 minutes',
      assignedProvider: {
        id: 'PRO-123',
        name: 'Mike Wilson',
        rating: 4.8,
        responseTime: '15min avg',
        verified: true,
        phone: '+1 234 567 8901',
        currentLocation: 'Toronto East'
      },
      estimatedArrival: '30 minutes',
      outingFee: 80,
      photos: true,
      videos: true,
      notes: [
        {
          time: '2024-02-07T10:35:00',
          type: 'system',
          text: 'Emergency request received'
        },
        {
          time: '2024-02-07T10:40:00',
          type: 'admin',
          text: 'Provider assigned - Mike Wilson'
        }
      ]
    },
    {
      id: 'ER-2024-002',
      category: 'Electrical',
      subcategory: 'Power Outage',
      status: 'in_progress',
      priority: 'critical',
      customer: {
        name: 'Sarah Johnson',
        phone: '+1 234 567 8902',
        address: '456 Oak St, Vancouver, BC',
        location: {
          city: 'Vancouver',
          province: 'British Columbia',
          coordinates: { lat: 49.2827, lng: -123.1207 }
        }
      },
      description: 'Complete power outage affecting entire building',
      submittedAt: '2024-02-07T11:00:00',
      responseTime: '5 minutes',
      assignedProvider: {
        id: 'PRO-124',
        name: 'David Brown',
        rating: 4.9,
        responseTime: '12min avg',
        verified: true,
        phone: '+1 234 567 8903',
        currentLocation: 'Vancouver Downtown'
      },
      estimatedArrival: '15 minutes',
      outingFee: 95,
      photos: true,
      videos: false,
      notes: [
        {
          time: '2024-02-07T11:05:00',
          type: 'system',
          text: 'Emergency request received'
        },
        {
          time: '2024-02-07T11:10:00',
          type: 'provider',
          text: 'En route to location'
        }
      ]
    }
  ];

  // Emergency Request Details Modal Component
  const RequestDetailsModal = ({ request, isOpen, onClose }) => {
    if (!request) return null;

    const getStatusColor = (status) => {
      switch (status) {
        case 'pending':
          return 'bg-yellow-100 text-yellow-700';
        case 'in_progress':
          return 'bg-blue-100 text-blue-700';
        case 'completed':
          return 'bg-green-100 text-green-700';
        case 'cancelled':
          return 'bg-red-100 text-red-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };

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
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b sticky top-0 bg-white"  style={{ textAlign: 'left' }}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="border-red-200 text-red-700">
                      {request.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-semibold mt-2">{request.category} Emergency</h2>
                  <p className="text-sm text-gray-500">ID: {request.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6"  style={{ textAlign: 'left' }}>
              {/* Emergency Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Emergency Details</h3>
                <Alert className="bg-red-50 border-red-200">
                  <Siren className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {request.description}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Submitted</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>{new Date(request.submittedAt).toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Response Time</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Timer className="h-4 w-4 text-gray-400" />
                      <span>{request.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Name</span>
                      <p className="font-medium">{request.customer.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone</span>
                      <p className="font-medium">{request.customer.phone}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Address</span>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="font-medium">{request.customer.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Provider */}
              {request.assignedProvider && (
                <div className="space-y-4">
                  <h3 className="font-medium">Assigned Provider</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{request.assignedProvider.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span>{request.assignedProvider.rating}</span>
                            <span>•</span>
                            <span>{request.assignedProvider.responseTime}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Verified Provider
                      </Badge>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Current Location</span>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{request.assignedProvider.currentLocation}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">ETA</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{request.estimatedArrival}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Log */}
              <div className="space-y-4">
                <h3 className="font-medium">Activity Log</h3>
                <div className="space-y-4">
                  {request.notes.map((note, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`p-2 rounded-lg ${
                        note.type === 'system' ? 'bg-gray-100' :
                        note.type === 'admin' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        {note.type === 'system' ? (
                          <Settings className="h-4 w-4 text-gray-600" />
                        ) : note.type === 'admin' ? (
                          <Shield className="h-4 w-4 text-blue-600" />
                        ) : (
                          <User className="h-4 w-4 text-green-600" />
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
                    <Phone className="h-4 w-4" />
                    Contact Customer
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Reassign Provider
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="h-4 w-4" />
                    Flag as Priority
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 text-red-600">
                    <X className="h-4 w-4" />
                    Cancel Request
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Emergency Request Card Component
  const EmergencyRequestCard = ({ request }) => (
    <Card className="hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="p-6 space-y-4"  style={{ textAlign: 'left' }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Badge className={
                request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                request.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                request.status === 'completed' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }>
                {request.status.replace('_', ' ').toUpperCase()}
              </Badge>
              <Badge variant="outline" className="border-red-200 text-red-700">
                {request.priority.toUpperCase()}
              </Badge>
            </div>
            <h3 className="font-semibold mt-2">{request.category} - {request.subcategory}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRequestDetails(request)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        <Alert className="bg-red-50 border-red-200">
          <Siren className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {request.description}
          </AlertDescription>
        </Alert>

        {/* Location and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Location</span>
            <div className="flex items-center gap-2 mt-1">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{request.customer.location.city}, {request.customer.location.province}</span>
            </div>
          </div>
          <div>
            <span className="text-sm text-gray-500">Submitted</span>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4 text-gray-400" />
              <span>{new Date(request.submittedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Customer</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="font-medium">{request.customer.name}</p>
                <p className="text-sm text-gray-500">{request.customer.phone}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact
            </Button>
          </div>
        </div>

        {/* Provider Info */}
        {request.assignedProvider && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Assigned Provider</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{request.assignedProvider.name}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>{request.assignedProvider.rating}</span>
                    <span>•</span>
                    <span>{request.assignedProvider.responseTime}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Verified
              </Badge>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Outing Fee: ${request.outingFee}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Reassign
            </Button>
            <Button size="sm">
              View Details
            </Button>
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
                <h1 className="text-2xl font-bold text-gray-900">Emergency Services</h1>
                <p className="text-gray-600 mt-1">Manage and monitor emergency service requests</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Emergencies</p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Siren className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg Response Time</p>
                    <p className="text-2xl font-semibold">8 min</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Timer className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Available Providers</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="text-2xl font-semibold">98%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Star className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search emergency requests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                </div>
                
                <div className="flex items-center gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Emergency Requests Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {emergencyRequests.map(request => (
                <EmergencyRequestCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Request Details Modal */}
      <RequestDetailsModal
        request={showRequestDetails}
        isOpen={!!showRequestDetails}
        onClose={() => setShowRequestDetails(null)}
      />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default EmergencyServices;