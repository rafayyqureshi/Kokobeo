import React, { useState } from 'react';
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Globe,
  Clock,
  Shield,
  Star,
  AlertCircle,
  Check,
  X,
  FileText,
  Download,
  Phone,
  Mail,
  Calendar,
  Tool,
  Users,
  DollarSign,
  PlusIcon,
  MapPinIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const BusinessManagement = () => {
  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);

  // Mock business data
  const businesses = [
    {
      id: 1,
      name: "Smith's Professional Plumbing",
      owner: "John Smith",
      type: "international",
      category: "Technology",
      status: "active",
      verified: true,
      location: "London, UK",
      operatingRegions: ["Europe", "North America", "Asia"],
      registrationDate: "2024-01-20",
      lastActive: "2024-02-03",
      completedProjects: 28,
      rating: 4.9,
      revenue: {
        total: "$125,000",
        lastMonth: "$15,000"
      },
      contactInfo: {
        email: "sarah@techsolutions.com",
        phone: "+44 20 7123 4567"
      },
      documents: [
        { name: "Company Registration", status: "verified", expiryDate: null },
        { name: "Professional Insurance", status: "verified", expiryDate: "2025-02-20" }
      ],
      services: [
        { name: "Web Development", rate: "$75/hour" },
        { name: "Mobile App Development", rate: "$85/hour" },
        { name: "Cloud Solutions", rate: "$95/hour" }
      ],
      expertise: ["Web Development", "Mobile Apps", "Cloud Architecture"],
      languages: ["English", "French", "Spanish"]
    }
  ];

  // Filter options
  const filterOptions = {
    status: ['all', 'active', 'pending', 'suspended'],
    type: ['all', 'local', 'international'],
    categories: [
      'All Categories',
      'Plumbing',
      'Technology',
      'Construction',
      'Electrical',
      'Design',
      'Consulting'
    ]
  };

  // Business Detail Modal
  const BusinessDetailModal = ({ business, onClose }) => {
    if (!business) return null;

    const isLocal = business.type === 'local';

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
          className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">{business.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={
                    business.status === 'active' ? 'bg-green-100 text-green-700' :
                    'bg-yellow-100 text-yellow-700'
                  }>
                    {business.status.toUpperCase()}
                  </Badge>
                  {business.verified && (
                    <Badge className="bg-blue-100 text-blue-700">
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Business Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Owner</label>
                    <p className="font-medium">{business.owner}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Category</label>
                    <p className="font-medium">{business.category}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium">{business.location}</p>
                  </div>
                  {isLocal ? (
                    <div>
                      <label className="text-sm text-gray-500">Service Areas</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {business.coverage.map((area, index) => (
                          <Badge key={index} className="bg-gray-100">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="text-sm text-gray-500">Operating Regions</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {business.operatingRegions.map((region, index) => (
                          <Badge key={index} className="bg-gray-100">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Completed Jobs</label>
                    <p className="font-medium">{isLocal ? business.completedJobs : business.completedProjects}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Rating</label>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{business.rating}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Revenue</label>
                    <p className="font-medium">{business.revenue.total}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Month Revenue</label>
                    <p className="font-medium">{business.revenue.lastMonth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-medium mb-4">Contact Information</h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm text-gray-500">Email</label>
                  <p className="font-medium">{business.contactInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Phone</label>
                  <p className="font-medium">{business.contactInfo.phone}</p>
                </div>
                {business.contactInfo.emergency && (
                  <div>
                    <label className="text-sm text-gray-500">Emergency Contact</label>
                    <p className="font-medium">{business.contactInfo.emergency}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-medium mb-4">Services Offered</h4>
              <div className="grid grid-cols-2 gap-4">
                {business.services.map((service, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {service.price || service.rate}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Verification Documents</h4>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDocumentsModal(true)}
                >
                  View All Documents
                </Button>
              </div>
              <div className="space-y-3">
                {business.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        {doc.expiryDate && (
                          <p className="text-sm text-gray-500">
                            Expires: {doc.expiryDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <Badge className={
                      doc.status === 'verified' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }>
                      {doc.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* International Specific */}
            {!isLocal && (
              <div>
                <h4 className="font-medium mb-4">Additional Information</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Expertise</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {business.expertise.map((skill, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Languages</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {business.languages.map((lang, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                Suspend Business
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit Details
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered businesses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
          <Button className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Business
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
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

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {filterOptions.status.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {filterOptions.type.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-lg"
              >
                {filterOptions.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Card>

      {/* Businesses Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr 
                  key={business.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedBusiness(business)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500">{business.owner}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {business.type}
                    </div>
                    <div className="text-sm text-gray-500">
                      {business.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Badge className={
                        business.status === 'active' ? 'bg-green-100 text-green-700' :
                        business.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }>
                        {business.status.toUpperCase()}
                      </Badge>
                      {business.verified && (
                        <Badge className="bg-blue-100 text-blue-700">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {business.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{business.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modals */}
      <AnimatePresence>
        {selectedBusiness && (
          <BusinessDetailModal
            business={selectedBusiness}
            onClose={() => setSelectedBusiness(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BusinessManagement;