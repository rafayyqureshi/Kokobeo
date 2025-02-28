import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from '../../components/ui/mobile_menu';
import {
  Search, Globe, X, MessageSquare, Mail,
  HelpCircle, AlertCircle, Users, Star,
  Shield, Heart, Info, ChevronDown,
  Languages, Filter, MapPin, MessageCircle,
  Scale, Building, FileText, ThumbsUp,
  Briefcase, Check, User, BadgeCheck,
  Clock, Calendar, Zap
} from 'lucide-react';
import PolicyModals from './Policy';
import SharedFooter2 from '../../Footer/SharedFooter2';
import ChatModal from '../../components/ui/ContactNow';

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    proId: 1,
    author: "Alex M.",
    date: "2024-01-15",
    rating: 5,
    text: "Sarah provided excellent legal counsel for our international expansion. Very knowledgeable and thorough.",
    project: "Business Expansion",
    authorCompany: "Tech Solutions Inc.",
    authorImage: null,
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    proId: 1,
    author: "Maria R.",
    date: "2024-01-10",
    rating: 4,
    text: "Great expertise in international contract law. Would definitely recommend.",
    project: "Contract Review",
    authorCompany: "Global Trade Co.",
    authorImage: null,
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    proId: 2,
    author: "David L.",
    date: "2024-01-05",
    rating: 5,
    text: "Michael's business consulting services helped us successfully enter the Asian market.",
    project: "Market Entry Strategy",
    authorCompany: "Innovation Labs",
    authorImage: null,
    verified: true,
    helpful: 15,
  }
];

// Review Modal Component
const ReviewModal = ({ isOpen, onClose, professional }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [projectType, setProjectType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      onClose();
      // Reset form
      setRating(0);
      setReviewText('');
      setProjectType('');
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

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
          className="bg-white rounded-xl max-w-lg w-full"
        >
          <div className="p-6 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">Write a Review</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            {/* Rating Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl focus:outline-none"
                  >
                    <Star 
                      className={`h-8 w-8 ${
                        star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Project Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Type</label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                placeholder="e.g., Business Consulting, Legal Services"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Your company name"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !rating || !reviewText.trim()}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Reviews List Modal Component
const ReviewsListModal = ({ isOpen, onClose, professional }) => {
  const relevantReviews = professional 
    ? mockReviews.filter(review => review.proId === professional.id)
    : mockReviews;

  const averageRating = relevantReviews.reduce((acc, curr) => acc + curr.rating, 0) / relevantReviews.length;

  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'rating', 'helpful'
  const [filterRating, setFilterRating] = useState(0); // 0 means all ratings

  const sortedReviews = [...relevantReviews].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default: // recent
        return new Date(b.date) - new Date(a.date);
    }
  }).filter(review => filterRating === 0 || review.rating === filterRating);

  if (!isOpen) return null;

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
        className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6 border-b sticky top-0 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold">Reviews</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating.toFixed(1)} ({relevantReviews.length} reviews)
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters and Sort */}
          <div className="flex gap-4 mt-4">
            {/* Rating Filter */}
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>All Ratings</option>
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="rating">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {sortedReviews.map((review) => (
            <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    {review.authorImage ? (
                      <img 
                        src={review.authorImage} 
                        alt={review.author} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{review.author}</h4>
                      {review.verified && (
                        <div className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{review.authorCompany}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-gray-700">{review.text}</p>
                <p className="mt-2 text-sm text-gray-500">Project: {review.project}</p>
                
                {/* Helpful Button */}
                <div className="mt-3 flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          ))}

          {sortedReviews.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews match your filters.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Professional Card Component
const ProfessionalCard = ({ pro, selectedType }) => {
  const [showChatModal, setShowChatModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const proReviews = mockReviews.filter(review => review.proId === pro.id);

  return (
    <div className="border rounded-xl p-6 hover:shadow-lg transition-shadow">
      {/* Header with Image and Review Info */}
      <div className="flex gap-4">
        {/* Profile Image Section */}
        <div className="flex-shrink-0">
          {pro.photo ? (
            <img 
              src={pro.photo}
              alt={`${pro.name}'s profile`}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Name, Service, and Review Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{pro.name}</h3>
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-medium">{pro.rating}</span>
            <span className="text-gray-500">({pro.reviews})</span>
          </div>
          <p className="text-blue-600">{pro.service}</p>
          <button
            onClick={() => setShowReviewsList(true)}
            className="mt-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200 w-fit"
          >
            See all reviews
          </button>
        </div>
      </div>

      {/* Profile Details Section */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          {pro.location}
        </div>
        <div className="flex items-center text-gray-600">
          <Globe className="h-4 w-4 mr-2" />
          {pro.languages.join(', ')}
        </div>
        <p className="text-gray-600">{pro.description}</p>

        {/* Verification Badges */}
        <div className="flex gap-3 mb-4">
          {pro.verified && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <Shield className="w-3 h-3 mr-1" />
              Background Checked
            </span>
          )}
        </div>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2">
          {pro.expertise.map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Availability and Price */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm mt-4">
          <div>
            <span className="text-gray-500">Price:</span>
            <span className="ml-2 font-medium">{pro.price}</span>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <span className="ml-2 font-medium">{pro.availability}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <button 
            onClick={() => setShowChatModal(true)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {selectedType === 'hire' ? 'Contact Now' : 'Request Quote'}
          </button>
          <button 
            onClick={() => setShowChatModal(true)}
            className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50"
          >
            <MessageCircle className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
          professional={pro}
          selectedType={selectedType}
        />
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          professional={pro}
        />
        <ReviewsListModal
          isOpen={showReviewsList}
          onClose={() => setShowReviewsList(false)}
          professional={pro}
        />
      </AnimatePresence>
    </div>
  );
};

// Service Page Component
const ServicePage = ({ service, onClose }) => {
  const [selectedType, setSelectedType] = useState('hire');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  // Enhanced professionals array with review data
  const professionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: "https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg",
      service: "International Business Law",
      rating: 4.9,
      reviews: 156,
      location: "Toronto, Canada",
      languages: ["English", "French", "Spanish"],
      description: "Specialized in international business law and cross-border transactions.",
      price: "$200/hour",
      expertise: ["Corporate Law", "International Trade", "Contract Law"],
      availability: "Mon-Fri",
      verified: true,
      reviewsData: mockReviews.filter(review => review.proId === 1)
    },
    {
      id: 2,
      name: "Michael Chen",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrfgUpKcOu00_3lf6EpEV8oTHIhOiRo5vfmg&s",
      service: "Business Consulting",
      rating: 4.8,
      reviews: 203,
      location: "Vancouver, Canada",
      languages: ["English", "Mandarin", "Cantonese"],
      description: "Expert business consultant with focus on international market entry.",
      price: "$180/hour",
      expertise: ["Market Entry", "Strategic Planning", "Business Development"],
      availability: "Flexible",
      verified: true,
      reviewsData: mockReviews.filter(review => review.proId === 2)
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      photo: "https://i.pinimg.com/236x/fb/8d/2b/fb8d2be23fb260b3564a3d837e279fef.jpg",
      service: "Tax Advisory",
      rating: 4.9,
      reviews: 178,
      location: "Montreal, Canada",
      languages: ["English", "French", "Portuguese"],
      description: "Specialized in international tax planning and compliance for businesses.",
      price: "$190/hour",
      expertise: ["International Tax", "Corporate Tax", "Tax Planning"],
      availability: "Mon-Sat",
      verified: true,
      reviewsData: mockReviews.filter(review => review.proId === 3)
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 py-8" style={{ textAlign: 'left' }}>
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl">
            <div>
              <h2 className="text-2xl font-semibold">{service}</h2>
              <p className="text-sm text-blue-100">Find verified international experts</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters Toggle (Mobile) */}
          <div className="md:hidden p-4 border-b">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 py-2 px-4 rounded-lg text-gray-700"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Section */}
          <div className={`p-4 sm:p-6 border-b bg-gray-50 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Service Type Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedType('hire')}
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      selectedType === 'hire'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    Direct Hire
                  </button>
                  <button
                    onClick={() => setSelectedType('quote')}
                    className={`flex-1 py-2 px-4 rounded-lg border ${
                      selectedType === 'quote'
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    Get Quote
                  </button>
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">$0 - $100/hr</option>
                  <option value="101-200">$101 - $200/hr</option>
                  <option value="201-300">$201 - $300/hr</option>
                  <option value="301+">$301+/hr</option>
                </select>
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm"
                >
                  <option value="rating">Highest Rating</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-b bg-blue-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{professionals.length}</div>
                <div className="text-sm text-gray-600">Available Professionals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.8</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">30min</div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Verified Professionals</div>
              </div>
            </div>
          </div>

          {/* Professionals Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6">
              {professionals.map((pro) => (
                <ProfessionalCard
                  key={pro.id}
                  pro={pro}
                  selectedType={selectedType}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 text-sm disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-medium border-blue-200 border">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">
                  3
                </button>
                <span className="mx-1 text-gray-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 text-gray-600">
                  10
                </button>
              </div>

              <button
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReviewModal && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            professional={selectedProfessional}
          />
        )}
        {showReviewsList && (
          <ReviewsListModal
            isOpen={showReviewsList}
            onClose={() => setShowReviewsList(false)}
            professional={selectedProfessional}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ServiceOptionsModal Component
const ServiceOptionsModal = ({ isOpen, onClose, service }) => {
  const [activeTab, setActiveTab] = useState('emergency');
  const [requestType, setRequestType] = useState('direct'); // 'direct' or 'quote'

  if (!isOpen) return null;

  const tabs = [
    { id: 'emergency', label: 'Emergency', className: 'text-red-600 bg-red-50' },
    { id: 'hiring', label: 'Available for Hiring', className: 'text-green-600 bg-green-50' },
    { id: 'info', label: 'Customer Choice: Information Only', className: 'text-purple-600 bg-purple-50' }
  ];

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
        className="bg-white rounded-xl w-full max-w-2xl"
      >
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">{service}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-sm ${tab.className} ${
                activeTab === tab.id ? 'ring-2 ring-offset-2' : ''
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Emergency Notice */}
        {activeTab === 'emergency' && (
          <div className="mx-4 p-4 bg-red-50 rounded-lg border border-red-100 mb-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>Emergency Service: Client agreed to pay $80 outgoing fee</p>
            </div>
          </div>
        )}

        {/* Request Type */}
        <div className="p-4">
          <h3 className="text-base font-semibold mb-4">Request Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setRequestType('quote')}
              className={`p-3 rounded-lg border text-center ${
                requestType === 'quote' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'
              }`}
            >
              Request Quote
            </button>
            <button
              onClick={() => setRequestType('direct')}
              className={`p-3 rounded-lg border text-center ${
                requestType === 'direct' ? 'bg-blue-600 text-white' : 'border-gray-200'
              }`}
            >
              Direct Hiring
            </button>
          </div>
        </div>

        {/* Direct Hiring Features */}
        <div className="px-4 pb-4">
          <h3 className="text-base font-semibold mb-3">Direct hiring includes:</h3>
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-gray-700">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span>Immediate chat with Customer</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="h-5 w-5 text-blue-500" />
              <span>Real-time service coordination</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span>Direct scheduling</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Zap className="h-5 w-5 text-blue-500" />
              <span>Instant professional assistance</span>
            </div>
          </div>
        </div>

        {/* Service Location */}
        <div className="px-4 pb-4">
          <h3 className="text-base font-semibold mb-3">Service Location</h3>
          <div className="bg-gray-50 p-4 rounded-lg space-y-4">
            {/* Floor Level */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Floor Level</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Ground Floor</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">No Elevator</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">No Stairs</span>
                </label>
              </div>
            </div>

            {/* Address & Building Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Address</label>
                <input 
                  type="text" 
                  value="*** Queen Street"
                  readOnly
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Building Type</label>
                <input 
                  type="text" 
                  value="Residential"
                  readOnly
                  className="w-full p-2 border rounded-lg bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Request Details */}
        <div className="px-4 pb-6">
          <h3 className="text-base font-semibold mb-3">Request Details</h3>
          <textarea
            className="w-full p-3 border rounded-lg h-24"
            defaultValue="Major water leak in master bathroom requiring immediate attention."
            readOnly
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// InfoPopup Component
const InfoPopup = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

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
        className="bg-white rounded-xl max-w-lg w-full p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <div className="prose max-w-none">
          {content}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Welcome Popup Component
const WelcomePopup = ({ isOpen, onClose }) => {
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenInternationalWelcomePopup');
    if (!hasSeenPopup && isOpen) {
      const timer = setTimeout(() => {
        onClose();
        localStorage.setItem('hasSeenInternationalWelcomePopup', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    } else if (hasSeenPopup) {
      onClose();
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-[15%] left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md bg-white p-4 sm:p-6 rounded-xl shadow-lg z-50"
    >
      <h3 className="text-xl font-semibold mb-2">Welcome to Kokobeo International!</h3>
      <p className="text-gray-600">
        Connect with verified international professionals worldwide.
      </p>
    </motion.div>
  );
};

// Main Component
const ProHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(!localStorage.getItem('hasSeenInternationalWelcomePopup'));
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);

  // Service categories for international services
  const serviceCategories = [
    { 
      icon: Scale,
      label: "Legal Services",
      id: "legal",
      description: "International legal consultation"
    },
    { 
      icon: Briefcase,
      label: "Business Consulting",
      id: "business",
      description: "Global business advisory"
    },
    {
      icon: FileText,
      label: "Documentation",
      id: "documentation",
      description: "International documentation"
    },
    {
      icon: Languages,
      label: "Translation",
      id: "translation",
      description: "Professional translation services"
    },
    {
      icon: Globe,
      label: "Market Entry",
      id: "market-entry",
      description: "Global market entry services"
    },
    {
      icon: Building,
      label: "Corporate Services",
      id: "corporate",
      description: "International corporate services"
    }
  ];

  // Menu items
  const menuItems = [
    { icon: Globe, text: "About Kokobeo", href: "/about" },
    { icon: Info, text: "How it Works", href: "/homepage2" },
    { icon: MessageSquare, text: "Messages", href: "/messages", badge: "3" },
    { icon: Mail, text: "Contact Us", href: "/menu/contact" },
    { icon: HelpCircle, text: "Help Center", href: "/help" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <a href="/internationalhomepage" className="flex items-center no-underline">
              <img 
                src="https://assests.netlify.app/assets/images/logo.png" 
                alt="Kokobeo"
                className="h-6 sm:h-8 w-auto"
              />
              <span className="ml-2 text-blue-600 text-lg sm:text-xl font-bold">
                Kokobeo
              </span>
            </a>

            {/* Right side controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <a 
                href="/international-professionals"
                className="bg-blue-600 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition-colors no-underline text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="block sm:hidden">Join as Pro</span>
                <span className="hidden sm:block">Are you a Professional?</span>
              </a>

              <button
                onClick={() => setShowMobileMenu(true)}
                className="flex items-center text-gray-700"
              >
                <span className="hidden sm:inline mr-2">Menu</span>
                <span className="w-5 h-5 sm:w-6 sm:h-6">☰</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={showMobileMenu} 
        onClose={() => setShowMobileMenu(false)} 
      />

      {/* Main Content */}
      <main className="min-h-screen pt-20 sm:pt-24 pb-24 flex flex-col items-center justify-center px-3 sm:px-4">
        <div className="w-full max-w-[800px] mx-auto">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
            Find International Professionals
          </h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Connect with verified professionals worldwide
          </p>

          {/* Search Bar */}
          <div className="relative w-full mb-12">
            <input
              type="text"
              placeholder="What service do you need?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 rounded-full border border-gray-200 
                focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm"
            />
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={24}
            />
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {serviceCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedService(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-white rounded-xl hover:shadow-md transition-shadow"
              >
                <category.icon className="h-8 w-8 text-blue-600 mb-3" />
                <p className="text-sm font-medium text-gray-900 text-center">
                  {category.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      <SharedFooter2 />

      {/* Modals */}
      <AnimatePresence>
        {selectedService && (
          <ServicePage
            service={serviceCategories.find(cat => cat.id === selectedService)?.label}
            onClose={() => setSelectedService(null)}
          />
        )}
        
        {showReviewModal && (
          <ReviewModal
            isOpen={showReviewModal}
            onClose={() => setShowReviewModal(false)}
            professional={selectedProfessional}
          />
        )}
        
        {showReviewsList && (
          <ReviewsListModal
            isOpen={showReviewsList}
            onClose={() => setShowReviewsList(false)}
            professional={selectedProfessional}
          />
        )}

        {/* Info Popups */}
        <InfoPopup
          isOpen={showHowItWorks}
          onClose={() => setShowHowItWorks(false)}
          title="How it Works"
          content={
            <div className="space-y-4" style={{ textAlign: 'left' }}>
              <p>Find the perfect international professional:</p>
              <ul className="list-disc pl-4">
                <li>Search for experts in your required field</li>
                <li>Compare multiple service offerings</li>
                <li>Read verified reviews from clients worldwide</li>
                <li>Choose your preferred professional and get started</li>
              </ul>
            </div>
          }
        />

        <InfoPopup
          isOpen={showHiring}
          onClose={() => setShowHiring(false)}
          title="Hire International Professional"
          content={
            <div className="space-y-4" style={{ textAlign: 'left' }}>
              <p>Direct hiring process:</p>
              <ul className="list-disc pl-4">
                <li>Browse professional profiles</li>
                <li>View certifications and expertise</li>
                <li>Contact professionals directly</li>
                <li>Discuss your requirements</li>
                <li> Agree on terms and begin collaboration</li>
              </ul>
            </div>
          }
        />

        <InfoPopup
          isOpen={showQuotes}
          onClose={() => setShowQuotes(false)}
          title="Get International Service Quotes"
          content={
            <div className="space-y-4" style={{ textAlign: 'left' }}>
              <p>Receive quotes from international professionals:</p>
              <ul className="list-disc pl-4">
                <li>Submit your project details</li>
                <li>Receive multiple quotes</li>
                <li>Compare services and pricing</li>
                <li>Choose the best offer for your needs</li>
                <li>Get anonymous feedback options</li>
              </ul>
            </div>
          }
        />

        <InfoPopup
          isOpen={showReviews}
          onClose={() => setShowReviews(false)}
          title="International Service Reviews"
          content={
            <div className="space-y-4" style={{ textAlign: 'left' }}>
              <p>Share your experience with international professionals:</p>
              <ul className="list-disc pl-4">
                <li>Rate your experience</li>
                <li>Provide detailed feedback</li>
                <li>Help others make informed decisions</li>
                <li>Build our global professional community</li>
              </ul>
            </div>
          }
        />
      </AnimatePresence>

      {/* Welcome Popup */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />

      {/* Policy Modals */}
      <PolicyModals 
        showPrivacyModal={showPrivacyModal}
        showTermsModal={showTermsModal}
        onClosePrivacy={() => setShowPrivacyModal(false)}
        onCloseTerms={() => setShowTermsModal(false)}
      />
    </div>
  );
};

export default ProHomepage;