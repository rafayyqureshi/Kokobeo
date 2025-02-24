import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  UserCheck, UserX, Mail, Phone, MapPin, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle, AlertTriangle,
  Users, ArrowUpDown, Ban, Lock, Unlock, AlertCircle, Briefcase,
  User, MessageSquare, Star, Building2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const LocalProfessionalsPage2 = () => {
  const [selectedProfessionals, setSelectedProfessionals] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [professionalType, setProfessionalType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showProfessionalDetails, setShowProfessionalDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for professionals
  const professionals = [
    {
      id: 1,
      name: "David Wilson",
      email: "david@example.com",
      phone: "+1 234 567 8901",
      profession: "Plumber",
      location: "Toronto, ON",
      registeredDate: "2024-01-15",
      status: "active",
      verified: true,
      completedJobs: 45,
      rating: 4.8,
      totalEarnings: "$12,450",
      lastActive: "2 hours ago",
      profileCompletion: 95,
      expertise: ["Emergency Plumbing", "Installation", "Maintenance"],
      availability: "24/7",
      serviceArea: "Greater Toronto Area"
    },
    {
      id: 2,
      name: "Emily Brown",
      email: "emily@example.com",
      phone: "+1 234 567 8902",
      profession: "Electrician",
      location: "Vancouver, BC",
      registeredDate: "2024-01-10",
      status: "pending",
      verified: false,
      completedJobs: 0,
      rating: 0,
      totalEarnings: "$0",
      lastActive: "1 day ago",
      profileCompletion: 60,
      expertise: ["Residential", "Commercial"],
      availability: "Weekdays",
      serviceArea: "Vancouver Metro"
    }
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
                  <span className="text-sm text-gray-500">Registration Date</span>
                  <p className="font-medium">{professional.registeredDate}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Service Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Profession</span>
                  <p className="text-xl font-semibold">{professional.profession}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Service Area</span>
                  <p className="text-xl font-semibold">{professional.serviceArea}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Completed Jobs</span>
                  <p className="text-xl font-semibold">{professional.completedJobs}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Total Earnings</span>
                  <p className="text-xl font-semibold">{professional.totalEarnings}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {professional.expertise.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Verification Status</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {professional.verified ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    )}
                    <div>
                      <p className="font-medium">
                        {professional.verified ? 'Verified Professional' : 'Verification Pending'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {professional.verified 
                          ? 'All required verifications completed'
                          : 'Background check and documentation pending'
                        }
                      </p>
                    </div>
                  </div>
                  {!professional.verified && (
                    <Button size="sm">Review Documents</Button>
                  )}
                </div>
              </div>
            </div>

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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Local Professionals</h1>
                <p className="text-gray-600 mt-1">Manage and monitor local service professionals</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export List
                </Button>
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1 sm:min-w-[300px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search professionals..."
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
                            Professional Type
                          </label>
                          <select
                            value={professionalType}
                            onChange={(e) => setProfessionalType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All Types</option>
                            <option value="plumber">Plumber</option>
                            <option value="electrician">Electrician</option>
                            <option value="carpenter">Carpenter</option>
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
                          <select className="w-full px-4 py-2 border rounded-lg">
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
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jobs
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
                          {professional.completedJobs}
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

export default LocalProfessionalsPage2;