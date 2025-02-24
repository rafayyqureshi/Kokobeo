import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  UserCheck, UserX, Mail, Phone, MapPin, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle, AlertTriangle,
  Users, ArrowUpDown, Ban, Lock, Unlock, AlertCircle,
  User, Globe, Clock, Languages, Star, Briefcase, DollarSign,
  CreditCard, Building2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const InternationalProfessionalsPage2 = () => {
  // State management
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [professionalType, setProfessionalType] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [showProfessionalDetails, setShowProfessionalDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for international professionals
  const professionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 234 567 8901",
      profession: "Business Consultant",
      location: "Toronto, Canada",
      timeZone: "EST (UTC-5)",
      languages: ["English", "French", "Spanish"],
      registeredDate: "2024-01-15",
      status: "active",
      verified: true,
      internationalVerification: {
        businessLicense: true,
        taxCompliance: true,
        backgroundCheck: true,
        insuranceCoverage: true
      },
      completedJobs: 78,
      rating: 4.9,
      totalEarnings: "$45,750",
      lastActive: "1 hour ago",
      profileCompletion: 98,
      expertise: ["International Business", "Market Entry", "Strategic Planning"],
      availability: "Flexible",
      serviceRegions: ["North America", "Europe", "Asia"],
      currencies: ["USD", "EUR", "GBP"],
      clientCountries: ["USA", "UK", "Germany", "Japan"]
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "+1 234 567 8902",
      profession: "Legal Advisor",
      location: "Vancouver, Canada",
      timeZone: "PST (UTC-8)",
      languages: ["English", "Mandarin", "Cantonese"],
      registeredDate: "2024-01-10",
      status: "pending",
      verified: false,
      internationalVerification: {
        businessLicense: true,
        taxCompliance: false,
        backgroundCheck: true,
        insuranceCoverage: false
      },
      completedJobs: 0,
      rating: 0,
      totalEarnings: "$0",
      lastActive: "2 days ago",
      profileCompletion: 65,
      expertise: ["International Law", "Contract Law", "Corporate Law"],
      availability: "Weekdays",
      serviceRegions: ["North America", "Asia"],
      currencies: ["USD", "CNY"],
      clientCountries: []
    }
  ];

  // Available languages for filter
  const availableLanguages = [
    "English", "French", "Spanish", "Mandarin", "Arabic",
    "German", "Japanese", "Portuguese", "Russian", "Hindi"
  ];

  // Available regions for filter
  const availableRegions = [
    "North America", "South America", "Europe", "Asia",
    "Africa", "Middle East", "Australia/Oceania"
  ];

  // Professional types
  const professionalTypes = [
    "Business Consultant", "Legal Advisor", "Financial Analyst",
    "Marketing Specialist", "International Trade Expert",
    "Language Specialist", "Cross-Cultural Trainer"
  ];

  // Professional Details Modal Component
  const ProfessionalDetailsModal = ({ professional, onClose }) => {
    if (!professional) return null;

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
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{professional.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>ID: {professional.id}</span>
                    <span>•</span>
                    <Badge className={professional.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {professional.status.charAt(0).toUpperCase() + professional.status.slice(1)}
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
              <h3 className="font-medium">Professional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Email</span>
                  <p className="font-medium">{professional.email}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Phone</span>
                  <p className="font-medium">{professional.phone}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Location</span>
                  <p className="font-medium">{professional.location}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Time Zone</span>
                  <p className="font-medium">{professional.timeZone}</p>
                </div>
              </div>
            </div>

            {/* Languages and Service Regions */}
            <div className="space-y-4">
              <h3 className="font-medium">Languages & Service Areas</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <div>
                  <span className="text-sm text-gray-500">Languages</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {professional.languages.map((language, index) => (
                      <Badge key={index} className="bg-purple-100 text-purple-700">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Service Regions</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {professional.serviceRegions.map((region, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-700">
                        {region}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Service Performance */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Completed Jobs</span>
                  <p className="text-xl font-semibold">{professional.completedJobs}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Total Earnings</span>
                  <p className="text-xl font-semibold">{professional.totalEarnings}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Rating</span>
                  <div className="flex items-center">
                    <p className="text-xl font-semibold mr-2">{professional.rating}</p>
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Profile Completion</span>
                  <p className="text-xl font-semibold">{professional.profileCompletion}%</p>
                </div>
              </div>
            </div>

            {/* International Verification Status */}
            <div className="space-y-4">
              <h3 className="font-medium">International Verification Status</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-5 w-5 ${professional.internationalVerification.businessLicense ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>Business License</span>
                  </div>
                  <Badge className={professional.internationalVerification.businessLicense ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {professional.internationalVerification.businessLicense ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-5 w-5 ${professional.internationalVerification.taxCompliance ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>Tax Compliance</span>
                  </div>
                  <Badge className={professional.internationalVerification.taxCompliance ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {professional.internationalVerification.taxCompliance ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-5 w-5 ${professional.internationalVerification.backgroundCheck ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>Background Check</span>
                  </div>
                  <Badge className={professional.internationalVerification.backgroundCheck ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {professional.internationalVerification.backgroundCheck ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className={`h-5 w-5 ${professional.internationalVerification.insuranceCoverage ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>Insurance Coverage</span>
                  </div>
                  <Badge className={professional.internationalVerification.insuranceCoverage ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {professional.internationalVerification.insuranceCoverage ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="space-y-4">
              <h3 className="font-medium">Admin Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Details
                </Button>
                {professional.status === 'active' ? (
                  <Button variant="outline" className="flex items-center gap-2 text-yellow-600">
                    <Ban className="h-4 w-4" />
                    Suspend Account
                  </Button>
                ) : (
                  <Button variant="outline" className="flex items-center gap-2 text-green-600">
                    <UserCheck className="h-4 w-4" />
                    Activate Account
                  </Button>
                )}
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
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
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">International Professionals</h1>
                <p className="text-gray-600 mt-1">Manage and monitor international service professionals</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export List
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden">
              {/* Search and Filters */}
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search international professionals..."
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
                      <option value="rating">Highest Rated</option>
                      <option value="jobs">Most Jobs</option>
                      <option value="earnings">Highest Earnings</option>
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
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Service Type Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Professional Type
                          </label>
                          <select
                            value={professionalType}
                            onChange={(e) => setProfessionalType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All Types</option>
                            {professionalTypes.map((type) => (
                              <option key={type} value={type.toLowerCase()}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Languages Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Languages
                          </label>
                          <select
                            value={selectedLanguages}
                            onChange={(e) => setSelectedLanguages(Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full px-4 py-2 border rounded-lg"
                            multiple
                          >
                            {availableLanguages.map((language) => (
                              <option key={language} value={language}>
                                {language}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Region Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Service Regions
                          </label>
                          <select
                            value={selectedRegions}
                            onChange={(e) => setSelectedRegions(Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full px-4 py-2 border rounded-lg"
                            multiple
                          >
                            {availableRegions.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Status Filter */}
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

                        {/* Verification Filter */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Verification
                          </label>
                          <select className="w-full px-4 py-2 border rounded-lg">
                            <option value="all">All</option>
                            <option value="fully-verified">Fully Verified</option>
                            <option value="partially-verified">Partially Verified</option>
                            <option value="unverified">Unverified</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Professionals Table */}
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
                              setSelectedProfessionals(professionals.map(pro => pro.id));
                            } else {
                              setSelectedProfessionals([]);
                            }
                          }}
                        />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Professional
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Languages
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Earnings
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {professionals.map((professional) => (
                      <tr key={professional.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedProfessionals.includes(professional.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProfessionals([...selectedProfessionals, professional.id]);
                              } else {
                                setSelectedProfessionals(selectedProfessionals.filter(id => id !== professional.id));
                              }
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{professional.name}</div>
                              <div className="text-sm text-gray-500">{professional.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">{professional.profession}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {professional.languages.map((language, index) => (
                              <Badge key={index} className="bg-purple-100 text-purple-700">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                              professional.status === 'active' ? 'bg-green-500' :
                              professional.status === 'pending' ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} />
                            <span className="capitalize">{professional.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span>{professional.rating}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {professional.totalEarnings}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowProfessionalDetails(professional)}
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Modals */}
      <AnimatePresence>
        {showProfessionalDetails && (
          <ProfessionalDetailsModal
            professional={showProfessionalDetails}
            onClose={() => setShowProfessionalDetails(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default InternationalProfessionalsPage2;