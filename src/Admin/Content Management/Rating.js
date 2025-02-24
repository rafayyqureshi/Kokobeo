import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Star, MoreVertical, Shield,
  ThumbsUp, Mail, MessageSquare, Flag, AlertTriangle,
  User, Check, X, Edit, Trash2, Eye, FileText,
  ChevronDown, ChevronUp, Download, Save
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const ReviewsAndRatings = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showReviewDetails, setShowReviewDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: 'John Smith',
        avatar: null,
        verified: true,
        totalReviews: 12
      },
      provider: {
        name: 'Mike Wilson',
        service: 'Plumbing Services',
        type: 'Local Service'
      },
      rating: 5,
      title: 'Excellent service and professionalism',
      content: 'Mike did an outstanding job fixing our plumbing issue. Very professional and thorough.',
      date: '2024-02-07T10:30:00',
      status: 'published',
      helpful: 15,
      reported: false,
      attachments: {
        images: 2,
        videos: 0
      },
      serviceDetails: {
        date: '2024-02-05',
        orderId: 'ORD-2024-001',
        cost: '$150'
      },
      adminNotes: [
        {
          date: '2024-02-07T11:00:00',
          admin: 'Admin1',
          note: 'Verified purchase and service completion'
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Sarah Wilson',
        avatar: null,
        verified: true,
        totalReviews: 5
      },
      provider: {
        name: 'Legal Consulting LLC',
        service: 'Legal Services',
        type: 'International Service'
      },
      rating: 2,
      title: 'Poor communication and delays',
      content: 'Experienced significant delays and lack of communication throughout the service.',
      date: '2024-02-06T15:45:00',
      status: 'flagged',
      helpful: 3,
      reported: true,
      reportReason: 'Inappropriate content',
      attachments: {
        images: 0,
        videos: 0
      },
      serviceDetails: {
        date: '2024-02-01',
        orderId: 'ORD-2024-002',
        cost: '$500'
      },
      adminNotes: [
        {
          date: '2024-02-06T16:00:00',
          admin: 'Admin2',
          note: 'Review flagged for investigation'
        }
      ]
    }
  ];

  // Review Details Modal Component
  const ReviewDetailsModal = ({ review, isOpen, onClose }) => {
    const [adminNote, setAdminNote] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(review?.status || 'published');

    if (!review) return null;

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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Review Details</h2>
                  <p className="text-sm text-gray-500">ID: {review.id}</p>
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
              {/* Review Status */}
              <div className="flex items-center justify-between">
                <Badge className={
                  review.status === 'published' ? 'bg-green-100 text-green-700' :
                  review.status === 'flagged' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }>
                  {review.status.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact User
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Provider
                  </Button>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h3 className="font-medium">User Information</h3>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{review.user.name}</p>
                      {review.user.verified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Verified User
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.user.totalReviews} total reviews</p>
                  </div>
                </div>
              </div>

              {/* Service Provider Information */}
              <div className="space-y-4">
                <h3 className="font-medium">Service Provider</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{review.provider.name}</p>
                      <p className="text-sm text-gray-500">{review.provider.service}</p>
                    </div>
                    <Badge className={
                      review.provider.type === 'Local Service' 
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }>
                      {review.provider.type}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-4">
                <h3 className="font-medium">Review</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-gray-600">{review.content}</p>
                  
                  {(review.attachments.images > 0 || review.attachments.videos > 0) && (
                    <div className="flex gap-4 mt-4">
                      {review.attachments.images > 0 && (
                        <Badge variant="outline">
                          {review.attachments.images} Images
                        </Badge>
                      )}
                      {review.attachments.videos > 0 && (
                        <Badge variant="outline">
                          {review.attachments.videos} Videos
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <h3 className="font-medium">Service Details</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">Service Date</span>
                    <p className="font-medium">{review.serviceDetails.date}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">Order ID</span>
                    <p className="font-medium">{review.serviceDetails.orderId}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-500">Service Cost</span>
                    <p className="font-medium">{review.serviceDetails.cost}</p>
                  </div>
                </div>
              </div>

              {/* Review Status */}
              {review.reported && (
                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    This review has been reported: {review.reportReason}
                  </AlertDescription>
                </Alert>
              )}

              {/* Admin Notes */}
              <div className="space-y-4">
                <h3 className="font-medium">Admin Notes</h3>
                <div className="space-y-3">
                  {review.adminNotes.map((note, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{note.admin}</span>
                        <span>{new Date(note.date).toLocaleString()}</span>
                      </div>
                      <p className="mt-1">{note.note}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <Button disabled={!adminNote.trim()}>
                    Add Note
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <div className="flex gap-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    <option value="published">Published</option>
                    <option value="hidden">Hidden</option>
                    <option value="flagged">Flagged</option>
                  </select>
                  <Button variant="outline" className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Review
                  </Button>
                </div>
                <Button onClick={onClose}>
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Review Card Component
  const ReviewCard = ({ review }) => (
    <Card className="hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium">{review.user.name}</span>
                {review.user.verified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Check className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <Badge className={
            review.status === 'published' ? 'bg-green-100 text-green-700' :
            review.status === 'flagged' ? 'bg-red-100 text-red-700' :
            'bg-yellow-100 text-yellow-700'
          }>
            {review.status.toUpperCase()}</Badge>
    </div>

    {/* Service Provider */}
    <div className="flex justify-between items-center"  style={{ textAlign: 'left' }}>
      <div>
        <span className="text-sm text-gray-500">Service Provider</span>
        <p className="font-medium">{review.provider.name}</p>
        <p className="text-sm text-gray-600">{review.provider.service}</p>
      </div>
      <Badge className={
        review.provider.type === 'Local Service' 
          ? 'bg-blue-100 text-blue-700'
          : 'bg-purple-100 text-purple-700'
      }>
        {review.provider.type}
      </Badge>
    </div>

    {/* Review Content */}
    <div>
      <h4 className="font-medium mb-2">{review.title}</h4>
      <p className="text-gray-600">{review.content}</p>
    </div>

    {/* Attachments & Date */}
    <div className="flex justify-between items-center text-sm text-gray-500">
      <div className="flex gap-3">
        {review.attachments.images > 0 && (
          <Badge variant="outline">
            {review.attachments.images} Images
          </Badge>
        )}
        {review.attachments.videos > 0 && (
          <Badge variant="outline">
            {review.attachments.videos} Videos
          </Badge>
        )}
      </div>
      <span>{new Date(review.date).toLocaleDateString()}</span>
    </div>

    {/* Actions */}
    <div className="pt-4 border-t flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-gray-600">
          <ThumbsUp className="h-4 w-4" />
          <span>{review.helpful}</span>
        </div>
        {review.reported && (
          <Badge variant="outline" className="text-red-600 border-red-200">
            <Flag className="h-3 w-3 mr-1" />
            Reported
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReviewDetails(review)}
          className="text-blue-600"
        >
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
<main className="flex-1 lg:pl-64 pt-16"  style={{ textAlign: 'left' }}>
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
            <p className="text-gray-600 mt-1">Manage and monitor user reviews across all services</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Reviews
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Reviews</p>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="text-2xl font-semibold">4.8</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Flagged Reviews</p>
                <p className="text-2xl font-semibold">23</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Flag className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">New Reviews</p>
                <p className="text-2xl font-semibold">45</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-5 w-5 text-green-600" />
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
          placeholder="Search reviews..."
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
        value={selectedRating}
        onChange={(e) => setSelectedRating(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Ratings</option>
        <option value="5">5 Stars</option>
        <option value="4">4 Stars</option>
        <option value="3">3 Stars</option>
        <option value="2">2 Stars</option>
        <option value="1">1 Star</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="flagged">Flagged</option>
        <option value="hidden">Hidden</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="rating-high">Highest Rating</option>
        <option value="rating-low">Lowest Rating</option>
        <option value="most-helpful">Most Helpful</option>
      </select>
    </div>
  </div>
</Card>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {reviews.length} of 1,234 reviews
          </p>
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
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>

  {/* Review Details Modal */}
  <ReviewDetailsModal
    review={showReviewDetails}
    isOpen={!!showReviewDetails}
    onClose={() => setShowReviewDetails(null)}
  />

  {/* <SharedFooter2 /> */}
</div>
);
};
export default ReviewsAndRatings;