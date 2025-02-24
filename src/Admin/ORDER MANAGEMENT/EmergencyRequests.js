import React, { useState } from 'react';
import {
  Search, Filter, X, AlertTriangle,
  Users, Ban, Clock, Settings, Siren,
  FileText, Calendar, DollarSign, ShoppingBag,
  Phone, Mail, MapPin, User, Star, MessageSquare,
  Download, Trash2, Edit, Eye, CheckCircle, AlertOctagon,
  Timer, ArrowRight, Bell, Zap, CheckCircle2, UserCheck,
  Map, PhoneCall, HelpCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const EmergencyRequestsPage = () => {
  // State management
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [serviceType, setServiceType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [sortBy, setSortBy] = useState('priority');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for emergency requests
  const emergencyRequests = [
    {
      id: 'EMG-2024-001',
      type: 'plumbing',
      service: 'Emergency Plumbing',
      status: 'unassigned',
      severity: 'critical',
      responseTime: 'IMMEDIATE',
      customer: {
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main St, Toronto, ON',
        location: {
          coordinates: { lat: 43.6532, lng: -79.3832 },
          area: 'Downtown Toronto'
        }
      },
      description: 'Major water leak in basement, risk of flooding',
      requestedAt: '2024-02-07T10:30:00',
      waitTime: '5 minutes',
      estimatedArrival: 'Searching Provider',
      nearbyProviders: 3,
      callAttempts: 2,
      priority: 'high',
      hazardLevel: 'severe',
      notes: [
        {
          time: '2024-02-07T10:35:00',
          author: 'System',
          text: 'Emergency request received, initiating provider search'
        }
      ]
    },
    {
      id: 'EMG-2024-002',
      type: 'electrical',
      service: 'Emergency Electrical',
      status: 'provider_assigned',
      severity: 'high',
      responseTime: '15 MINUTES',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        address: '456 Oak St, Vancouver, BC',
        location: {
          coordinates: { lat: 49.2827, lng: -123.1207 },
          area: 'Downtown Vancouver'
        }
      },
      description: 'Complete power outage, critical medical equipment affected',
      requestedAt: '2024-02-07T11:00:00',
      waitTime: '3 minutes',
      estimatedArrival: '12 minutes',
      provider: {
        name: 'Mike Wilson',
        phone: '+1 234 567 8902',
        rating: 4.9,
        currentLocation: 'Vancouver West',
        eta: '12 minutes',
        verified: true
      },
      nearbyProviders: 2,
      callAttempts: 1,
      priority: 'critical',
      hazardLevel: 'moderate',
      notes: [
        {
          time: '2024-02-07T11:02:00',
          author: 'System',
          text: 'Provider Mike Wilson accepted the request'
        },
        {
          time: '2024-02-07T11:03:00',
          author: 'Provider',
          text: 'En route to location, ETA 12 minutes'
        }
      ]
    }
  ];

  // Emergency Request Modal Component
  const RequestDetailsModal = ({ request, isOpen, onClose }) => {
    if (!request || !isOpen) return null;

    const getStatusBadge = (status) => {
      const styles = {
        unassigned: 'bg-red-100 text-red-700',
        provider_assigned: 'bg-yellow-100 text-yellow-700',
        en_route: 'bg-blue-100 text-blue-700',
        on_site: 'bg-green-100 text-green-700'
      };
      return styles[status] || 'bg-gray-100 text-gray-700';
    };

    const getSeverityBadge = (severity) => {
      const styles = {
        critical: 'bg-red-100 text-red-700 border-red-200',
        high: 'bg-orange-100 text-orange-700 border-orange-200',
        moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200'
      };
      return styles[severity] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusBadge(request.status)}>
                    {request.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={getSeverityBadge(request.severity)}>
                    {request.severity.toUpperCase()}
                  </Badge>
                </div>
                <h2 className="text-xl font-semibold mt-2">Emergency {request.type}</h2>
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

          <div className="p-6 space-y-6">
            {/* Emergency Alert */}
            <Alert className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                <span className="font-medium">Emergency Request - </span>
                {request.description}
              </AlertDescription>
            </Alert>

            {/* Response Time */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Timer className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Required Response: {request.responseTime}</span>
                </div>
                <Badge className="bg-orange-100 text-orange-700">
                  Wait Time: {request.waitTime}
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
                    <p className="font-medium">{request.customer.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{request.customer.phone}</p>
                      <Button size="sm" variant="outline" className="h-8">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{request.customer.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Address</span>
                    <p className="font-medium">{request.customer.address}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Location Area</span>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{request.customer.location.area}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Information */}
            {request.provider ? (
              <div className="space-y-4">
                <h3 className="font-medium">Assigned Provider</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{request.provider.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{request.provider.rating}</span>
                          {request.provider.verified && (
                            <Badge className="bg-green-100 text-green-700">Verified</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <PhoneCall className="h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Current Location</span>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{request.provider.currentLocation}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">ETA</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Timer className="h-4 w-4 text-gray-400" />
                        <span>{request.provider.eta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-medium">Provider Assignment</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">
                        {request.nearbyProviders} providers available nearby
                      </span>
                    </div>
                    <Button size="sm">
                      Assign Provider
                    </Button>
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
              <h3 className="font-medium">Emergency Actions</h3>
              <div className="flex flex-wrap gap-3">
                {!request.provider && (
                  <Button className="flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    Assign Emergency Provider
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Call Customer
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Send Emergency Alert
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-4 w-4" />
                  Escalate Emergency
                </Button>
              </div>
            </div>
          </div></div>
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
                <h1 className="text-2xl font-bold text-gray-900">Emergency Requests</h1>
                <p className="text-gray-600 mt-1">Monitor and manage urgent service requests</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Emergency Stats */}
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
                    <p className="text-2xl font-semibold">8m</p>
                  </div>
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Timer className="h-5 w-5 text-orange-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Available Providers</p>
                    <p className="text-2xl font-semibold">15</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Critical Cases</p>
                    <p className="text-2xl font-semibold">4</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <AlertOctagon className="h-5 w-5 text-purple-600" />
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
          placeholder="Search emergency requests..."
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
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Services</option>
        <option value="plumbing">Plumbing</option>
        <option value="electrical">Electrical</option>
        <option value="hvac">HVAC</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="unassigned">Unassigned</option>
        <option value="provider_assigned">Provider Assigned</option>
        <option value="en_route">En Route</option>
        <option value="on_site">On Site</option>
      </select>
    </div>
  </div>

  {/* Advanced Filters */}
  {showFilters && (
    <div className="mt-4 pt-4 border-t">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Levels</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Response Time
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Times</option>
            <option value="immediate">Immediate</option>
            <option value="15min">Within 15 min</option>
            <option value="30min">Within 30 min</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Area
          </label>
          <select className="w-full px-4 py-2 border rounded-lg">
            <option value="all">All Areas</option>
            <option value="downtown">Downtown</option>
            <option value="north">North Region</option>
            <option value="south">South Region</option>
          </select>
        </div>
      </div>
    </div>
  )}
</Card>

            {/* Emergency Requests Table */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Emergency Info
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {emergencyRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              <Siren className={`h-5 w-5 ${
                                request.severity === 'critical' ? 'text-red-500' :
                                request.severity === 'high' ? 'text-orange-500' :
                                'text-yellow-500'
                              }`} />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{request.id}</div>
                              <div className="text-sm text-gray-500">{request.service}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Timer className="h-4 w-4 text-gray-400 mr-2" />
                            <span className={`${
                              request.waitTime.includes('5') ? 'text-red-600 font-medium' :
                              'text-gray-500'
                            }`}>
                              {request.waitTime}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{request.customer.name}</div>
                          <div className="text-sm text-gray-500">{request.customer.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            request.status === 'unassigned' ? 'bg-red-100 text-red-700' :
                            request.status === 'provider_assigned' ? 'bg-yellow-100 text-yellow-700' :
                            request.status === 'en_route' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }>
                            {request.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            {request.customer.location.area}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowRequestDetails(request)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Emergency
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

      {/* Request Details Modal */}
      <RequestDetailsModal
        request={showRequestDetails}
        isOpen={!!showRequestDetails}
        onClose={() => setShowRequestDetails(null)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default EmergencyRequestsPage;