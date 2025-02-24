import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  Building2, Mail, Phone, MapPin, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle, AlertTriangle,
  Users, ArrowUpDown, Ban, Lock, Unlock, AlertCircle,
  User, Globe, Clock, Languages, Star, Briefcase, DollarSign,
  CreditCard, FileText, BadgeCheck, Tool
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const BusinessDirectory = () => {
  // State management
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessType, setBusinessType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showBusinessDetails, setShowBusinessDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for businesses
  const businesses = [
    {
      id: 1,
      name: "Smith Plumbing Services",
      email: "smith@example.com",
      phone: "+1 234 567 8900",
      type: "Local Service",
      category: "Plumbing",
      location: "Toronto, ON",
      registeredDate: "2024-01-15",
      status: "active",
      verified: true,
      completedJobs: 145,
      rating: 4.8,
      totalRevenue: "$52,450",
      lastActive: "2 hours ago",
      owner: "John Smith",
      employeeCount: 5,
      serviceAreas: ["Toronto", "North York", "Scarborough"],
      businessHours: "Mon-Fri: 8AM-6PM",
      emergencyService: true,
      licenses: ["Master Plumber License", "Business Operation Permit"],
      insurance: {
        provider: "SafeGuard Insurance",
        coverage: "$2M",
        expiryDate: "2024-12-31"
      }
    },
    {
      id: 2,
      name: "Global Legal Consultants",
      email: "legal@example.com",
      phone: "+1 234 567 8901",
      type: "International Service",
      category: "Legal Services",
      location: "Vancouver, BC",
      registeredDate: "2024-01-10",
      status: "pending",
      verified: false,
      completedJobs: 32,
      rating: 4.9,
      totalRevenue: "$128,900",
      lastActive: "1 day ago",
      owner: "Sarah Wilson",
      employeeCount: 12,
      serviceAreas: ["Global"],
      businessHours: "24/7",
      emergencyService: false,
      licenses: ["Bar Association License", "International Practice Permit"],
      insurance: {
        provider: "LegalShield Insurance",
        coverage: "$5M",
        expiryDate: "2024-12-31"
      }
    }
  ];

  // Business Details Modal Component
  const BusinessDetailsModal = ({ business, onClose }) => {
    if (!business) return null;

    return (
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{business.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>ID: {business.id}</span>
                    <span>•</span>
                    <Badge className={business.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {business.status.charAt(0).toUpperCase() + business.status.slice(1)}
                    </Badge>
                  </div>
                </div>
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
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Business Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Email</span>
                  <p className="font-medium">{business.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Phone</span>
                  <p className="font-medium">{business.phone}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-medium">{business.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Registration Date</span>
                  <p className="font-medium">{business.registeredDate}</p>
                </div>
              </div>
            </div>

            {/* Business Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Detailed Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Business Type</span>
                  <p className="text-xl font-semibold">{business.type}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Category</span>
                  <p className="text-xl font-semibold">{business.category}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Owner</span>
                  <p className="text-xl font-semibold">{business.owner}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Employees</span>
                  <p className="text-xl font-semibold">{business.employeeCount}</p>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="space-y-4">
              <h3 className="font-medium">Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Completed Jobs</span>
                  <p className="text-xl font-semibold">{business.completedJobs}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <p className="text-xl font-semibold">{business.totalRevenue}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold mr-2">{business.rating}</p>
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Last Active</span>
                  <p className="text-xl font-semibold">{business.lastActive}</p>
                </div>
              </div>
            </div>

            {/* Service Areas */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Areas</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {business.serviceAreas.map((area, index) => (
                    <Badge key={index} className="bg-blue-100 text-blue-700">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Licenses and Insurance */}
            <div className="space-y-4">
              <h3 className="font-medium">Licenses & Insurance</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Business Licenses</h4>
                  <ul className="space-y-2">
                    {business.licenses.map((license, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <BadgeCheck className="h-5 w-5 text-green-600" />
                        <span>{license}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Insurance Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Provider</span>
                      <p className="font-medium">{business.insurance.provider}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Coverage</span>
                      <p className="font-medium">{business.insurance.coverage}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Expiry Date</span>
                      <p className="font-medium">{business.insurance.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="space-y-4">
              <h3 className="font-medium">Admin Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Business
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
                {business.status === 'active' ? (
                  <Button variant="outline" className="flex items-center gap-2 text-yellow-600">
                    <Ban className="h-4 w-4" />
                    Suspend Business
                  </Button>
                ) : (
                  <Button variant="outline" className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Activate Business
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Remove Business
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
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
                <h1 className="text-2xl font-bold text-gray-900">Business Directory</h1>
                <p className="text-gray-600 mt-1">Manage and monitor all registered businesses</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Directory
                </Button>
                <Button className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Add Business
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Businesses</p>
                    <p className="text-2xl font-semibold">1,234</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Businesses</p>
                    <p className="text-2xl font-semibold">892</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Pending Verification</p>
                    <p className="text-2xl font-semibold">45</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold">$1.2M</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content Card */}
            <Card className="overflow-hidden">
              {/* Search and Filters */}
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search businesses..."
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
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border rounded-lg"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="revenue">Highest Revenue</option>
                      <option value="rating">Highest Rated</option>
                      <option value="jobs">Most Jobs</option>
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
                            Business Type
                          </label>
                          <select
                            value={businessType}
                            onChange={(e) => setBusinessType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All Types</option>
                            <option value="local">Local Service</option>
                            <option value="international">International Service</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="suspended">Suspended</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Verification
                          </label>
                          <select
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All</option>
                            <option value="verified">Verified</option>
                            <option value="unverified">Unverified</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Businesses Table */}
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
                              setSelectedBusinesses(businesses.map(business => business.id));
                            } else {
                              setSelectedBusinesses([]);
                            }
                          }}
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Business
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {businesses.map((business) => (
                      <tr key={business.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedBusinesses.includes(business.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedBusinesses([...selectedBusinesses, business.id]);
                              } else {
                                setSelectedBusinesses(selectedBusinesses.filter(id => id !== business.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{business.name}</div>
                              <div className="text-sm text-gray-500">{business.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            business.type === 'Local Service' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }>
                            {business.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                              business.status === 'active' ? 'bg-green-500' :
                              business.status === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <span className="capitalize">{business.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {business.totalRevenue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{business.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowBusinessDetails(business)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              View Details
                            </Button>
                            <div className="relative inline-block text-left">
                              <Button
                                variant="ghost"
                                size="sm"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
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

      {/* Modals */}
      <AnimatePresence>
        {showBusinessDetails && (
          <BusinessDetailsModal
            business={showBusinessDetails}
            onClose={() => setShowBusinessDetails(null)}
          />
        )}
      </AnimatePresence>

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default BusinessDirectory;