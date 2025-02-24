import React, { useState } from 'react';
import { 
  Search, Filter, MapPin, Clock, AlertCircle, Phone, Mail, Camera, Video, 
  ChevronLeft, ChevronRight, X, Check, Shield, Star, FileText, MessageSquare,
  DollarSign, UserCheck, Settings, Calendar, Bell, LogOut, User, Briefcase,
  Tool, Cog, CreditCard, HelpCircle, ChevronDown, Lock, BookOpen, FileCheck,
  AlertTriangle, Award, Building, Zap, Hammer, Plus, Clock3, Globe, Languages, 
  ArrowUpCircle, Building2, Stairs as StairsIcon, MoveUp, ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import SettingsModal from './SettingsModal';
import ProfileModal from './ProfileModal';
import Tooltip from '../../components/ui/Tooltips';
import SharedFooter from '../../Footer/SharedFooter';
import ChatPopup from './chat';
import SharedHeader9 from '../../Headers/SharedHeader9';
import SharedHeader10 from '../../Headers/SharedHeader10';

// Mock user data
const mockUserData = {
  hasSubscription: false,
  credits: 250,
  name: "John Smith",
  email: "john@example.com",
  profileImage: null,
  company: "Smith Plumbing Services",
  location: "Toronto, ON",
  isVerified: true,
  emergencyAvailable: true
};

// Language options (English first)
const languages = [
  { code: 'en', name: 'English', short: 'ENG' },
  { code: 'es', name: 'Español', short: 'ESP' },
  { code: 'fr', name: 'Français', short: 'FRA' },
  { code: 'de', name: 'Deutsch', short: 'DEU' },
  { code: 'it', name: 'Italiano', short: 'ITA' },
  { code: 'pt', name: 'Português', short: 'POR' },
  { code: 'nl', name: 'Nederlands', short: 'NLD' },
  { code: 'cs', name: 'Čeština', short: 'CES' }
];

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "Alex M.",
    date: "2024-01-15",
    rating: 5,
    text: "Excellent service! Very professional and thorough.",
    project: "Pipe Repair"
  },
  {
    id: 2,
    author: "Sarah K.",
    date: "2024-01-10",
    rating: 4,
    text: "Great work, arrived on time and fixed the issue quickly.",
    project: "Boiler Installation"
  },
  {
    id: 3,
    author: "Mike R.",
    date: "2024-01-05",
    rating: 5,
    text: "Very knowledgeable and professional. Would hire again.",
    project: "Emergency Plumbing"
  }
];

const ProfessionalDashboard = () => {
  // State management
  const [activeTab, setActiveTab] = useState('quotes');
  const [professionalSearch, setProfessionalSearch] = useState('');
  const [provinceSearch, setProvinceSearch] = useState('');
  const [municipalitySearch, setMunicipalitySearch] = useState('');
  const [showQuoteDetails, setShowQuoteDetails] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [requestType, setRequestType] = useState('quote');
  const [paymentMethod, setPaymentMethod] = useState('dollars');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showReviewsList, setShowReviewsList] = useState(false);

  // Menu items with notifications included
  const menuItems = [
    { icon: Globe, label: 'About Kokobeo', href: '/about' },
    { icon: HelpCircle, label: 'How it Works', href: '/how-it-works' },
    { icon: MessageSquare, label: 'Messages', href: 'menu/messages', badge: '3' },
    { icon: Bell, label: 'Notifications', href: '/notifications', badge: '2' },
    { icon: Mail, label: 'Contact Us', href: '/menu/contact' },
    { icon: FileText, label: 'Help Center', href: '/help' },
    { icon: User, label: 'My Profile', href: '/client/profile' },
    { icon: Shield, label: 'Verify Account', href: '/verify' },
    { icon: Star, label: 'Subscription Plans', href: '/plans' },
    { icon: CreditCard, label: 'My Credits', href: '/credits', badge: mockUserData.credits },
    { icon: Briefcase, label: 'My Projects', href: '/client/myorders', badge: '2 Active' }
  ];

  // Mock quotes data (6 quotes)
  const quotes = Array(6).fill(null).map((_, index) => ({
    id: index + 1,
    type: index % 2 === 0 ? 'emergency' : 'standard',
    category: index % 2 === 0 ? 'Plumbing' : 'Renovation',
    title: index % 2 === 0 ? 'Emergency Water Leak Repair' : 'Bathroom Renovation Quote',
    description: index % 2 === 0 
      ? 'Major water leak in master bathroom requiring immediate attention.'
      : 'Complete bathroom renovation needed, including tiling and fixtures.',
    location: 'Toronto East',
    municipality: 'East York',
    timePosted: index % 2 === 0 ? '10 minutes ago' : '1 hour ago',
    customer: {
      name: 'J*** S***',
      phone: '+1 4** *** **89',
      email: 'j***@****.com',
      address: '*** Queen Street'
    },
    hasPhotos: true,
    hasVideos: index % 2 === 0,
    price: 20,
    hiring: true,
    status: 'New',
    rating: 4.8,
    reviewCount: 15
  }));

  // Function to mask private information
  const maskPrivateInfo = (info, type) => {
    switch(type) {
      case 'name':
        return info.replace(/(?!^.).(?!$)/g, '*');
      case 'email':
        const [localPart, domain] = info.split('@');
        return `${localPart[0]}***@${domain[0]}***.${domain.split('.')[1]}`;
      case 'phone':
        return info.replace(/\d(?=\d{4})/g, '*');
      case 'address':
        return info.replace(/\d+|[a-zA-Z]+(?= )/g, '***');
      default:
        return info;
    }
  };

  // Review Modal Component
  const ReviewModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [projectType, setProjectType] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle review submission logic here
      onClose();
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
            {/* <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div> */}

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  placeholder="e.g., Pipe Repair, Boiler Installation"
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
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Submit Review
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Reviews List Modal Component
  const ReviewsListModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-semibold">Reviews</h3>
                <p className="text-sm text-gray-500 mt-1">Average Rating: 4.8 (15 reviews)</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {mockReviews.map((review) => (
                <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{review.author}</h4>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-gray-700">{review.text}</p>
                  <p className="mt-2 text-sm text-gray-500">Project: {review.project}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Quote card component with Reviews
  const renderQuoteCard = (quote) => (
    <Card 
      key={quote.id}
      className={`border ${
        quote.type === 'emergency' 
          ? 'border-red-200 hover:border-red-300' 
          : 'border-blue-200 hover:border-blue-300'
      } transition-all duration-300 hover:shadow-lg`}
    >
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge 
              variant={quote.type === 'emergency' ? 'destructive' : 'default'}
              className={quote.type === 'emergency' ? 'bg-red-50' : 'bg-blue-50'}
            >
              {quote.type === 'emergency' ? 'Emergency' : 'Normal'}
            </Badge>
            {quote.hiring && (
              <Badge variant="outline" className="border-green-200 text-green-700">
                Available for Hiring
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            {quote.hasPhotos && 
              <Tooltip content="Photos Available">
                <Camera className="h-5 w-5 text-gray-500" />
              </Tooltip>
            }
            {quote.hasVideos && 
              <Tooltip content="Videos Available">
                <Video className="h-5 w-5 text-gray-500" />
              </Tooltip>
            }
          </div>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {quote.category}
          </h3>
          <p className="text-gray-600 mt-1">
            {quote.description}
          </p>
          <div className="flex items-center mt-2 space-x-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(quote.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              ({quote.reviewCount} reviews)
            </span>
            <Button 
              variant="link" 
              className="text-blue-600 text-sm"
              onClick={() => setShowReviewsList(true)}
            >
              View All
            </Button>
          </div>
        </div>

        {/* Customer Details */}
        <div className="space-y-3 pt-3 border-t">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">Name:</span>
              <p className="font-medium">{maskPrivateInfo(quote.customer.name, 'name')}</p>
            </div>
            <div className="text-right">
              <Button 
                variant="link" 
                className="text-blue-600"
                onClick={() => setShowQuoteDetails(quote)}
              >
                See Details
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500 text-sm">Email:</span>
              <p className="text-blue-600">{maskPrivateInfo(quote.customer.email, 'email')}</p>
            </div>
            <div className="text-right">
              <Button 
                variant="link" 
                className="text-blue-600"
                onClick={() => setShowQuoteDetails(quote)}
              >
                See Details
              </Button>
            </div>
          </div>

          <div>
            <span className="text-gray-500 text-sm">Phone:</span>
            <p>{maskPrivateInfo(quote.customer.phone, 'phone')}</p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{quote.location} - {quote.municipality}</span>
            </div>
            <span className="text-gray-400">{quote.timePosted}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t space-y-3">
          {quote.type === 'emergency' ? (
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setShowQuoteDetails(quote)}
            >
              Respond Now
            </Button>
          ) : (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setShowQuoteDetails(quote)}
            >
              Purchase Quote (${quote.price})
            </Button>
          )}
          {/* <Button
            variant="outline"
            className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => setShowReviewModal(true)}
          >
            Write a Review
          </Button> */}
        </div>
        </div>
    </Card>
  );

  // Chat Modal Component
  const ChatModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-xl max-w-2xl w-full h-[600px] flex flex-col shadow-lg"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chat with Client</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">Hello! I'm interested in your services.</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg px-4 py-2"
                />
                <Button>Send</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const QuoteDetailsModal = ({ 
    quote, 
    isOpen, 
    onClose,
    mockUserData = { hasSubscription: false },
    showChat,
    setShowChat
  }) => {
    const [requestType, setRequestType] = useState('quote');
    const [paymentMethod, setPaymentMethod] = useState('dollars');
  
    if (!quote) return null;
  
    const handleHiringAction = () => {
      if (requestType === 'hiring') {
        setShowChat(true);
      } else {
        onClose();
      }
    };
  
    const getExitCost = () => {
      if (quote.type === 'emergency') {
        return quote.exitCost || 80;
      }
      return quote.exitCost || 0;
    };

    return (
      <AnimatePresence>
        {isOpen && (
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
              <div className="p-6 border-b" style={{ textAlign: 'left' }}>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{quote.category || 'Plumbing'}</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={quote.type === 'emergency' ? 'destructive' : 'default'}
                        className={quote.type === 'emergency' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}
                      >
                        {quote.type === 'emergency' ? 'Emergency' : 'Normal'}
                      </Badge>
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        Available for Hiring
                      </Badge>
                      <Badge variant="default" className="bg-purple-50 text-purple-700">
                        Customer Choice: Information Only
                      </Badge>
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
  
              {/* Content */}
              <div className="p-6 space-y-6" style={{ textAlign: 'left' }}>
                {/* Emergency Notice */}
                {quote.type === 'emergency' && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      Emergency Service: Client agreed to pay ${getExitCost()} outgoing fee
                    </AlertDescription>
                  </Alert>
                )}
  
                {/* Request Type Tabs */}
                <div className="space-y-4">
                  <h4 className="font-medium">Request Type</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={requestType === 'quote' ? 'default' : 'outline'}
                      onClick={() => setRequestType('quote')}
                      className="w-full p-3 text-center"
                    >
                      Request Quote
                    </Button>
                    <Button
                      variant={requestType === 'hiring' ? 'default' : 'outline'}
                      onClick={() => setRequestType('hiring')}
                      className="w-full p-3 text-center"
                    >
                      Direct Hiring
                    </Button>
                  </div>
                </div>

                {/* Direct Hiring Features */}
                {requestType === 'hiring' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Direct hiring includes:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <MessageSquare className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>Immediate chat with Customer</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Clock className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>Real-time service coordination</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>Direct scheduling</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-2">
                        <Zap className="h-4 w-4 text-blue-500 shrink-0" />
                        <span>Instant professional assistance</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Service Location */}
                <div className="space-y-4">
                  <h4 className="font-medium">Service Location</h4>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Floor Level</span>
                        <div className="flex items-center gap-2 mt-1">
                          <MoveUp className="h-4 w-4 text-gray-500" />
                          <p className="font-medium">Ground Floor</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-700">No Elevator</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowUpDown className="h-5 w-5 text-gray-500" />
                          <span className="text-sm text-gray-700">No Stairs</span>
                        </div>
                      </div>
                    </div>
  
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Address</span>
                        <p className="font-medium">*** Queen Street</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Building Type</span>
                        <p className="font-medium">Residential</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Request Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{quote.description || 'Major water leak in master bathroom requiring immediate attention.'}</p>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-4">
                  <h4 className="font-medium">Customer Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-500 text-sm">Name</span>
                        <p className="font-medium">J*** S***</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Phone</span>
                        <p className="font-medium">+1 4** *** **89</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Email</span>
                        <p className="font-medium">j***@****.com</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Preferred Contact</span>
                        <p className="font-medium">Anytime</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attachments */}
                <div className="space-y-4">
                  <h4 className="font-medium">Attachments</h4>
                  <div className="flex gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                      <Camera className="h-5 w-5 text-blue-500" />
                      <span>Photos Available</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                      <Video className="h-5 w-5 text-blue-500" />
                      <span>Videos Available</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                {requestType !== 'hiring' && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Payment Method</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setPaymentMethod('dollars')}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                          paymentMethod === 'dollars' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <span className="text-xl">$</span>
                        <span className="font-medium">Pay with Dollars</span>
                      </button>
                      <button
                        onClick={() => setPaymentMethod('credits')}
                        className={`flex items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                          paymentMethod === 'credits' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'border-gray-200 hover:border-blue-200'
                        }`}
                      >
                        <span className="text-xl">💎</span>
                        <span className="font-medium">Pay with Credits</span>
                        {mockUserData?.hasSubscription && (
                          <span className="ml-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                            Locked
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Footer */}
                <div className="pt-6 mt-6 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      {requestType === 'hiring' ? (
                        <p className="text-2xl font-bold">FREE CHAT</p>
                      ) : (
                        <>
                          <p className="text-2xl font-bold">
                            {paymentMethod === 'dollars' ? '$20.00 USD' : '20 Credits'}
                          </p>
                          <p className="text-sm text-gray-500">One-time quote fee</p>
                        </>
                      )}
                    </div>
                    
                    <Button 
                      onClick={handleHiringAction}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                    >
                      {requestType === 'hiring' ? 'Start Chat' : 'Purchase Quote'}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader10
        mockUserData={mockUserData}
        menuItems={menuItems}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search professional type..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={professionalSearch}
                onChange={(e) => setProfessionalSearch(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Province..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={provinceSearch}
                onChange={(e) => setProvinceSearch(e.target.value)}
              />
              <MapPin className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Municipality..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={municipalitySearch}
                onChange={(e) => setMunicipalitySearch(e.target.value)}
              />
              <Building className="absolute left-3 top-3.5 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map(quote => renderQuoteCard(quote))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            className="p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </main>

      <div className="mt-20">
        <SharedFooter />
      </div>

      {/* Modals */}
      <QuoteDetailsModal
        quote={showQuoteDetails}
        isOpen={!!showQuoteDetails}
        onClose={() => setShowQuoteDetails(null)}
        showChat={showChat}
        setShowChat={setShowChat}
      />
      
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
      />
      
      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      
      <ProfileModal 
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />

      {/* Review Modals */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
      />
      
      <ReviewsListModal
        isOpen={showReviewsList}
        onClose={() => setShowReviewsList(false)}
      />
    </div>
  );
};

export default ProfessionalDashboard;