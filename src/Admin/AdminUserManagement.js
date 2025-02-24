import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Shield,
  AlertCircle,
  Check,
  X,
  UserX,
  UserCheck,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Star,
  Download,
  Upload,
  FileText,
  UserIcon,
  EyeIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';

const UserManagement = () => {
  // State management
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "professional",
      professionalType: "local",
      status: "active",
      verified: true,
      location: "Toronto, ON",
      joinDate: "2024-01-15",
      lastActive: "2024-02-03",
      completedJobs: 45,
      rating: 4.8,
      emergencyService: true,
      documents: [
        { name: "Business License", verified: true },
        { name: "Insurance Document", verified: true },
        { name: "Professional Certificate", verified: false }
      ],
      verificationStatus: "verified",
      serviceAreas: ["North York", "Downtown Toronto", "Scarborough"],
      specialties: ["Plumbing", "Emergency Repairs", "Installation"]
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      type: "professional",
      professionalType: "international",
      status: "pending_verification",
      verified: false,
      location: "London, UK",
      joinDate: "2024-01-20",
      lastActive: "2024-02-03",
      completedJobs: 12,
      rating: 4.9,
      emergencyService: false,
      documents: [
        { name: "Professional License", verified: false },
        { name: "Identification", verified: true }
      ],
      verificationStatus: "pending",
      expertise: ["Web Development", "Mobile Apps", "UI/UX Design"],
      languages: ["English", "French", "Spanish"]
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      type: "client",
      status: "active",
      verified: true,
      location: "Vancouver, BC",
      joinDate: "2024-01-10",
      lastActive: "2024-02-02",
      postedJobs: 8,
      totalSpent: "$2,450",
      paymentVerified: true
    }
  ];

  // Tabs configuration
  const tabs = [
    { id: 'all', label: 'All Users' },
    { id: 'professionals', label: 'Professionals' },
    { id: 'clients', label: 'Clients' },
    { id: 'pending', label: 'Pending Verification' },
    { id: 'suspended', label: 'Suspended' }
  ];

  // Filter options
  const filterOptions = {
    status: ['all', 'active', 'pending', 'suspended'],
    userType: ['all', 'professional', 'client'],
    professionalType: ['all', 'local', 'international']
  };

  // Verification modal component
  const VerificationModal = ({ user, onClose }) => {
    if (!user) return null;

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
          className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Verification Details</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Professional Type</label>
                <p className="mt-1 capitalize">{user.professionalType}</p>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-medium mb-4">Submitted Documents</h4>
              <div className="space-y-4">
                {user.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">Submitted on Jan 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <EyeIcon className="h-4 w-4" />
                        View
                      </Button>
                      {doc.verified ? (
                        <Badge className="bg-green-100 text-green-700">Verified</Badge>
                      ) : (
                        <Button size="sm" className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Verify
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            {user.type === 'professional' && (
              <>
                {user.professionalType === 'local' && (
                  <div>
                    <h4 className="font-medium mb-4">Service Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.serviceAreas.map((area, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-700">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {user.professionalType === 'international' && (
                  <div>
                    <h4 className="font-medium mb-4">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.languages.map((lang, index) => (
                        <Badge key={index} className="bg-purple-100 text-purple-700">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  // Handle verification approval
                  onClose();
                }}
              >
                Approve Verification
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // User detail view component
  const UserDetailView = ({ user, onClose }) => {
    if (!user) return null;

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
          className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">User Details</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Basic Information</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Name</label>
                    <p className="font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Location</label>
                    <p className="font-medium">{user.location}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Join Date</label>
                    <p className="font-medium">{user.joinDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Account Status</h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <Badge className={
                      user.status === 'active' ? 'bg-green-100 text-green-700' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {user.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Verification</label>
                    <Badge className={user.verified ? 'bg-green-100 text-green-700' : 'bg-gray-100'}>
                      {user.verified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Last Active</label>
                    <p className="font-medium">{user.lastActive}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Specific Info */}
            {user.type === 'professional' && (
              <div>
                <h4 className="font-medium mb-4">Professional Details</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Professional Type</label>
                    <p className="font-medium capitalize">{user.professionalType}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Completed Jobs</label>
                    <p className="font-medium">{user.completedJobs}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Rating</label>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{user.rating}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Emergency Service</label>
                    <Badge className={user.emergencyService ? 'bg-red-100 text-red-700' : 'bg-gray-100'}>
                      {user.emergencyService ? 'Available' : 'Not Available'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Client Specific Info */}
            {user.type === 'client' && (
              <div>
                <h4 className="font-medium mb-4">Client Activity</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Posted Jobs</label>
                    <p className="font-medium">{user.postedJobs}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Spent</label>
                    <p className="font-medium">{user.totalSpent}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Payment Status</label>
                    <Badge className={user.paymentVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100'}>
                      {user.paymentVerified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Section */}
            {user.documents && (
              <div>
                <h4 className="font-medium mb-4">Verification Documents</h4>
                <div className="space-y-3">
                  {user.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span>{doc.name}</span>
                      </div>
                      <Badge className={doc.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {doc.verified ? 'Verified' : 'Pending'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => setShowSuspendModal(true)}
              >
                Suspend Account
              </Button>
              {!user.verified && (
                <Button
                  onClick={() => setShowVerificationModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Review Verification
                </Button>
              )}
              <Button
                onClick={onClose}
                variant="outline"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Main render
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all users on the platform</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Users
          </Button>
          <Button className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Add User
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
              placeholder="Search users..."
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
              <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
              <select
                value={selectedUserType}
                onChange={(e) => setSelectedUserType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                {filterOptions.userType.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {selectedUserType === 'professional' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Type</label>
                <select
                  className="w-full p-2 border rounded-lg"
                >
                  {filterOptions.professionalType.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                selectedTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
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
                  Join Date
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr 
                  key={user.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{user.type}</div>
                    {user.type === 'professional' && (
                      <div className="text-xs text-gray-500 capitalize">{user.professionalType}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge className={
                      user.status === 'active' ? 'bg-green-100 text-green-700' :
                      user.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }>
                      {user.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.joinDate}
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
        {selectedUser && (
          <UserDetailView
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
        {showVerificationModal && selectedUser && (
          <VerificationModal
            user={selectedUser}
            onClose={() => setShowVerificationModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserManagement;