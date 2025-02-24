import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  UserCheck, UserX, Mail, Phone, MapPin, Calendar,
  Download, Trash2, Edit, Eye, X, CheckCircle, AlertTriangle,
  Users, ArrowUpDown, Ban, Lock, Unlock, AlertCircle, Clock,
  User, FileText, BadgeCheck, FileCheck, ExternalLink
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const VerificationRequestsPage = () => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestType, setRequestType] = useState('all');
  const [status, setStatus] = useState('all');
  const [showRequestDetails, setShowRequestDetails] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock verification requests data
  const verificationRequests = [
    {
      id: 'VR-2024-001',
      professional: {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1 234 567 8900',
        profession: 'Electrician',
        location: 'Toronto, ON',
        type: 'local'
      },
      submittedDate: '2024-01-15',
      status: 'pending',
      type: 'identity',
      documents: [
        { name: 'ID Document.pdf', type: 'identification', status: 'pending' },
        { name: 'License.pdf', type: 'professional_license', status: 'pending' },
        { name: 'Insurance.pdf', type: 'insurance', status: 'pending' }
      ],
      verificationSteps: [
        { step: 'Document Submission', status: 'completed', date: '2024-01-15' },
        { step: 'Initial Review', status: 'completed', date: '2024-01-16' },
        { step: 'Background Check', status: 'pending', date: null },
        { step: 'Final Approval', status: 'pending', date: null }
      ],
      notes: [
        {
          date: '2024-01-16',
          author: 'Admin',
          text: 'Documents received, proceeding with verification'
        }
      ],
      priority: 'high',
      completionDeadline: '2024-01-22'
    },
    {
      id: 'VR-2024-002',
      professional: {
        id: 2,
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '+1 234 567 8901',
        profession: 'Business Consultant',
        location: 'Vancouver, BC',
        type: 'international'
      },
      submittedDate: '2024-01-14',
      status: 'in_review',
      type: 'business',
      documents: [
        { name: 'Business License.pdf', type: 'business_license', status: 'approved' },
        { name: 'Tax Certification.pdf', type: 'tax_documents', status: 'in_review' },
        { name: 'Professional Certification.pdf', type: 'certifications', status: 'pending' }
      ],
      verificationSteps: [
        { step: 'Document Submission', status: 'completed', date: '2024-01-14' },
        { step: 'Initial Review', status: 'completed', date: '2024-01-15' },
        { step: 'Business Verification', status: 'in_progress', date: '2024-01-16' },
        { step: 'Final Approval', status: 'pending', date: null }
      ],
      notes: [
        {
          date: '2024-01-15',
          author: 'Admin',
          text: 'Business license verified, awaiting tax document verification'
        }
      ],
      priority: 'medium',
      completionDeadline: '2024-01-21'
    }
  ];

  // Request Details Modal Component
  const RequestDetailsModal = ({ request, onClose }) => {
    const [newNote, setNewNote] = useState('');
    const [selectedDocument, setSelectedDocument] = useState(null);

    if (!request) return null;

    const getStatusColor = (status) => {
      switch (status) {
        case 'completed':
          return 'text-green-600';
        case 'in_progress':
          return 'text-blue-600';
        case 'pending':
          return 'text-yellow-600';
        default:
          return 'text-gray-600';
      }
    };

    const getDocumentStatusBadge = (status) => {
      switch (status) {
        case 'approved':
          return <Badge className="bg-green-100 text-green-700">Approved</Badge>;
        case 'in_review':
          return <Badge className="bg-blue-100 text-blue-700">In Review</Badge>;
        case 'pending':
          return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>;
        case 'rejected':
          return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
        default:
          return null;
      }
    };

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
          {/* Header */}
          <div className="p-6 border-b sticky top-0 bg-white  style={{ textAlign: 'left' }}">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Verification Request Details</h2>
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

          {/* Content */}
          <div className="p-6 space-y-6"  style={{ textAlign: 'left' }}>
            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Professional Information</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Name</span>
                    <p className="font-medium">{request.professional.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{request.professional.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Phone</span>
                    <p className="font-medium">{request.professional.phone}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Profession</span>
                    <p className="font-medium">{request.professional.profession}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="font-medium">{request.professional.location}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Type</span>
                    <Badge className={request.professional.type === 'international' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}>
                      {request.professional.type.charAt(0).toUpperCase() + request.professional.type.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h3 className="font-medium">Submitted Documents</h3>
              <div className="space-y-3">
                {request.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500 capitalize">
                          {doc.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getDocumentStatusBadge(doc.status)}
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Progress */}
            <div className="space-y-4">
              <h3 className="font-medium">Verification Progress</h3>
              <div className="relative flex flex-col gap-4">
                {request.verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`mt-1.5 h-4 w-4 rounded-full border-2 ${
                      step.status === 'completed' ? 'bg-green-600 border-green-600' :
                      step.status === 'in_progress' ? 'bg-blue-600 border-blue-600' :
                      'bg-gray-200 border-gray-200'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${getStatusColor(step.status)}`}>
                          {step.step}
                        </p>
                        {step.date && (
                          <p className="text-sm text-gray-500">
                            {step.date}
                          </p>
                        )}
                      </div>
                      {index < request.verificationSteps.length - 1 && (
                        <div className="absolute left-2 ml-[-1px] w-0.5 h-8 bg-gray-200" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <h3 className="font-medium">Notes</h3>
              <div className="space-y-3">
                {request.notes.map((note, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{note.author}</span>
                        <span className="text-sm text-gray-500">{note.date}</span>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{note.text}</p>
                  </div>
                ))}
              </div>
              
              {/* Add Note Form */}
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <Button
                  disabled={!newNote.trim()}
                  className="flex-shrink-0"
                >
                  Add Note
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <h3 className="font-medium">Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Request Additional Info
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Approve Request
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-600">
                  <X className="h-4 w-4" />
                  Reject Request
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Extend Deadline
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
                <h1 className="text-2xl font-bold text-gray-900">Verification Requests</h1>
                <p className="text-gray-600 mt-1">Review and manage verification requests from professionals</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export List
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge>Past 30 days</Badge>
                </div>
                <h3 className="text-2xl font-semibold mt-4">25</h3>
                <p className="text-gray-600">Total Requests</p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                  <Badge>Past 30 days</Badge>
                </div>
                <h3 className="text-2xl font-semibold mt-4">12</h3>
                <p className="text-gray-600">Pending Review</p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge>Past 30 days</Badge>
                </div>
                <h3 className="text-2xl font-semibold mt-4">8</h3>
                <p className="text-gray-600">Approved</p>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <Badge>Past 30 days</Badge>
                </div>
                <h3 className="text-2xl font-semibold mt-4">5</h3>
                <p className="text-gray-600">Rejected</p>
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
                        placeholder="Search requests..."
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
                      <option value="priority">Priority</option>
                      <option value="deadline">Deadline</option>
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
                            Request Type
                          </label>
                          <select
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg"
                          >
                            <option value="all">All Types</option>
                            <option value="identity">Identity Verification</option>
                            <option value="business">Business Verification</option>
                            <option value="professional">Professional License</option>
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
                            <option value="pending">Pending</option>
                            <option value="in_review">In Review</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Professional Type
                          </label>
                          <select className="w-full px-4 py-2 border rounded-lg">
                            <option value="all">All Types</option>
                            <option value="local">Local Professional</option>
                            <option value="international">International Professional</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Requests Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Request ID
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
                        Priority
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deadline
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {verificationRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">{request.id}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{request.professional.name}</div>
                              <div className="text-sm text-gray-500">{request.professional.profession}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="capitalize">
                            {request.type}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            request.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            request.status === 'in_review' ? 'bg-blue-100 text-blue-700' :
                            request.status === 'approved' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={
                            request.priority === 'high' ? 'bg-red-100 text-red-700' :
                            request.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }>
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.completionDeadline}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowRequestDetails(request)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              View Details
                            </Button>
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
        {showRequestDetails && (
          <RequestDetailsModal
            request={showRequestDetails}
            onClose={() => setShowRequestDetails(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default VerificationRequestsPage;