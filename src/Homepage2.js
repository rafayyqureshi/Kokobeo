import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './components/ui/mobile_menu';  // Adjust path as needed
import {
  Search, Globe, X, MessageSquare, Mail,
  HelpCircle, AlertCircle, Users, Star,
  Shield, Heart, Info, ChevronDown,
  Languages, Filter, MapPin, MessageCircle,
  Check, Calendar, Clock, Zap, Package,
  Phone, User, FileText, ThumbsUp
} from 'lucide-react';
import PolicyModals from './pages/Main/Policy';


// Review Modal Component
const ReviewModal = ({ isOpen, onClose, reviews }) => {
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Reviews</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b pb-4 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-sm text-gray-500">{review.date}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{review.rating}</span>
                </div>
              </div>
              <div className="text-gray-700">{review.comment}</div>
              <div className="mt-2 text-sm text-gray-500">Project: {review.project}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};



// Info Popup Component
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
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
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
      <h3 className="text-xl font-semibold mb-2">Welcome to Kokobeo!</h3>
      <p className="text-gray-600">
        Find the best professionals for your needs. Get quotes or hire directly from verified experts.
      </p>
    </motion.div>
  );
};

// Service Card Component
const ServiceCard = ({ professional, selectedType, onMessage, onContact }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Alex M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent service! Very professional and thorough.",
      project: "Pipe Repair"
    },
    {
      id: 2,
      author: "Sarah K.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great work, arrived on time and fixed the issue quickly.",
      project: "Boiler Installation"
    },
    {
      id: 3,
      author: "Mike R.",
      rating: 5,
      date: "2024-01-05",
      comment: "Very knowledgeable and professional. Would hire again.",
      project: "Emergency Plumbing"
    }
  ];


return (
    <div className="border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <img 
          src={professional.avatar || "/default-avatar.png"}
          alt={professional.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{professional.name}</h3>
              <p className="text-blue-600">{professional.service}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{professional.rating}</span>
                <span className="text-gray-500 text-sm ml-1">
                  ({professional.reviews})
                </span>
              </div>
              <button
                onClick={() => setShowReviewModal(true)}
                className="mt-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md text-sm hover:bg-blue-200"
              >
                 See all reviews
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Badges */}
      <div className="flex gap-3 mb-4">
        {professional.backgroundChecked && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Shield className="w-3 h-3 mr-1" />
            Background Checked
          </span>
        )}
        {professional.insuranceVerified && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Check className="w-3 h-3 mr-1" />
            Insurance Verified
          </span>
        )}
      </div>

      {/* Professional Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <span className="text-gray-500">Location:</span>
          <span className="ml-2">{professional.location}</span>
        </div>
        <p className="text-gray-600">{professional.description}</p>

        {/* Specializations */}
        {professional.specializations && (
          <div className="flex flex-wrap gap-2">
            {professional.specializations.map((spec, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Price:</span>
            <span className="ml-2 font-medium">{professional.price}</span>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <span className="ml-2 font-medium">{professional.availability}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button 
          onClick={() => onContact(professional)}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Contact Now
        </button>
        <button 
          onClick={() => onMessage(professional)}
          className="flex items-center justify-center p-2 border rounded-lg hover:bg-gray-50"
        >
          <MessageCircle className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          reviews={reviews}
        />
      </AnimatePresence>
    </div>
  );
};
// Service Page Component
const ServicePage = ({ service, onClose }) => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');
  const [selectedType, setSelectedType] = useState('hire');
  const [priceRange, setPriceRange] = useState('all');
  const [availability, setAvailability] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);

  // Enhanced professionals data with outing cost where applicable
  const professionals = [
    {
      id: 1,
      name: "John Smith",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZHvxVgtGqrVGGf2LV8KrkfdEMmudzlVXH_7oxnIvkpy_6y0vdrjPE8wjUYUfQkIM_Q1g&usqp=CAU",
      service: "Emergency Plumbing",
      rating: 4.8,
      reviews: 156,
      location: "Toronto Central",
      description: "Professional plumber with 15 years of experience in emergency services.",
      price: "$80/hour",
      outingCost: "$30",
      availability: "24/7",
      certifications: ["Master Plumber", "Emergency Response"],
      completedJobs: 450,
      responseTime: "Under 30 mins",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["Emergency Repairs", "Installation", "Maintenance"],
      nextAvailable: "Today"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320,q_50/lsci/db/PICTURES/CMS/388000/388038.5.png",
      service: "Legal Consultation",
      rating: 4.9,
      reviews: 203,
      location: "Toronto East",
      description: "Specialized in corporate and real estate law with 10+ years experience.",
      price: "$150/hour",
      availability: "Mon-Fri",
      certifications: ["Bar Certified", "Corporate Law Specialist"],
      completedJobs: 320,
      responseTime: "2-4 hours",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["Corporate Law", "Real Estate", "Contract Law"],
      nextAvailable: "Tomorrow"
    },
    {
      id: 3,
      name: "Michael Chen",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS47KyAZpTlAnuN32YNdJ4Uve7R3gF1yNplQw&s",
      service: "Electrical Services",
      rating: 4.7,
      reviews: 178,
      location: "Toronto West",
      description: "Licensed electrician specializing in residential and commercial installations.",
      price: "$95/hour",
      outingCost: "$40",
      availability: "Mon-Sun, 6am-10pm",
      certifications: ["Master Electrician", "Safety Certified"],
      completedJobs: 385,
      responseTime: "1-2 hours",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["Electrical Repairs", "New Installations", "Safety Inspections"],
      nextAvailable: "Today"
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtYwhB40gELwI8DEG-V1qJQWamsyKgEKBhqw&s",
      service: "Interior Design",
      rating: 4.9,
      reviews: 142,
      location: "Toronto North",
      description: "Creative interior designer with expertise in modern and contemporary styles.",
      price: "$120/hour",
      outingCost: "$75",
      availability: "Tue-Sat",
      certifications: ["NCIDQ Certified", "Sustainable Design Specialist"],
      completedJobs: 275,
      responseTime: "Within 24 hours",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["Residential Design", "Space Planning", "Color Consultation"],
      nextAvailable: "Next Week"
    },
    {
      id: 5,
      name: "David Thompson",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdTeyMONzAit55g60RzRxEDyTFU3XB91LrKg&s",
      service: "HVAC Services",
      rating: 4.8,
      reviews: 189,
      location: "Toronto Central",
      description: "Expert in heating, ventilation, and air conditioning systems.",
      price: "$90/hour",
      outingCost: "$45",
      availability: "24/7",
      certifications: ["HVAC Licensed", "Energy Efficiency Expert"],
      completedJobs: 412,
      responseTime: "1 hour",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["AC Repair", "Heating Systems", "Ventilation"],
      nextAvailable: "Today"
    },
    {
      id: 6,
      name: "Sophia",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmnzjsBFhlcqtjvcvhM4GPZ8m7oyISlz_CmqqSlfESvq-kCrxoovBIM5_MbI8749m5P34&usqp=CAU",
      service: "Home Renovation",
      rating: 4.9,
      reviews: 167,
      location: "Toronto East",
      description: "Full-service home renovation expert with architectural background.",
      price: "$110/hour",
      outingCost: "$50",
      availability: "Mon-Sat",
      certifications: ["General Contractor", "Project Management Professional"],
      completedJobs: 298,
      responseTime: "Same Day",
      insuranceVerified: true,
      backgroundChecked: true,
      specializations: ["Kitchen Remodeling", "Bathroom Renovation", "Custom Carpentry"],
      nextAvailable: "Next Week"
    }
  ];

  const handleMessage = (professional) => {
    console.log('Message', professional);
    // Implement message functionality
  };

  const handleContact = (professional) => {
    console.log('Contact', professional);
    // Implement contact functionality
  };

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
          <div className="p-4 sm:p-6 border-b flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-xl">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{service} Professionals</h2>
              <p className="text-blue-100 text-sm mt-1">Find verified experts in your area</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filters Toggle Button (Mobile) */}
          <div className="md:hidden p-4 border-b">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 py-2 px-4 rounded-lg text-gray-700"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters */}
          <div className={`p-4 sm:p-6 border-b bg-gray-50 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Location Filters */}
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Province
                  </label>
                  <select
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm"
                  >
                    <option value="">All Provinces</option>
                    <option value="ontario">Ontario</option>
                    <option value="quebec">Quebec</option>
                    <option value="bc">British Columbia</option>
                    <option value="alberta">Alberta</option>
                  </select>
                </div>
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Municipality
                  </label>
                  <select
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm"
                  >
                    <option value="">All Municipalities</option>
                    <option value="toronto">Toronto</option>
                    <option value="mississauga">Mississauga</option>
                    <option value="brampton">Brampton</option>
                    <option value="vaughan">Vaughan</option>
                  </select>
                </div>
              </div>

              {/* Service Type & Price Range */}
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedType('hire')}
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        selectedType === 'hire'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-white border-gray-300 text-gray-700'
                      }`}
                    >
                      Hire
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
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50">$0 - $50/hr</option>
                    <option value="51-100">$51 - $100/hr</option>
                    <option value="101-150">$101 - $150/hr</option>
                    <option value="151+">$151+/hr</option>
                  </select>
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm"
                  >
                    <option value="all">Any Time</option>
                    <option value="today">Available Today</option>
                    <option value="24-7">24/7 Service</option>
                    <option value="weekend">Weekend Available</option>
                  </select>
                </div>
              </div>

              {/* Sort & Apply Button */}
              <div className="space-y-4">
                <div className="text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-lg border-gray-300 shadow-sm"
                  >
                    <option value="rating">Highest Rating</option>
                    <option value="reviews">Most Reviews</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="experience">Most Experienced</option>
                  </select>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Filters
                </button>
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
          {/* Professionals Grid */}
<div className="p-4 sm:p-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {professionals.map((professional) => (
      <ServiceCard
        key={professional.id}
        professional={professional}
        selectedType={selectedType}
        onMessage={handleMessage}
        onContact={handleContact}
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

  {/* Results Count */}
  {/* <div className="mt-4 text-center text-sm text-gray-500">
    Showing 1-6 of 48 professionals
  </div> */}
</div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Homepage Component
const KokobeoHomepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  const languages = [
    'English',
    'Español',
    'Français',
    'Deutsch',
    'Italiano',
    'Nederlands',
    'Čeština'
  ];

  const serviceCategories = [
    { 
      icon: AlertCircle, 
      label: "Emergency Services", 
      id: "emergency",
      description: "24/7 emergency support for urgent needs"
    },
    { 
      icon: Shield, 
      label: "Plumbing Services", 
      id: "plumbing",
      description: "Professional plumbing solutions"
    },
    { 
      icon: FileText, 
      label: "Legal Services", 
      id: "legal",
      description: "Expert legal consultation and support"
    },
    { 
      icon: Heart, 
      label: "Cleaning Services", 
      id: "cleaning",
      description: "Professional cleaning and sanitization"
    },
    { 
      icon: Users, 
      label: "Renovation", 
      id: "renovation",
      description: "Complete home renovation services"
    },
    { 
      icon: Star, 
      label: "Well Being", 
      id: "wellbeing",
      description: "Health and wellness services"
    }
  ];

  // Menu items configuration
  const menuItems = [
    { icon: Globe, text: "About Kokobeo", href: "/about" },
    { icon: Info, text: "How it Works", href: "/how-it-works" },
    { icon: MessageSquare, text: "Messages", href: "/messages", badge: "3" },
    { icon: Mail, text: "Contact Us", href: "/menu/contact" },
    { icon: HelpCircle, text: "Help Center", href: "/help" },
    { icon: Users, text: "Invite Friends", href: "/invite" }
  ];

  const features = [
    {
      icon: Users,
      title: "Wide Selection",
      description: "Access to thousands of verified professionals"
    },
    {
      icon: Shield,
      title: "Verified Experts",
      description: "Background-checked and certified professionals"
    },
    {
      icon: MessageCircle,
      title: "Easy Communication",
      description: "Direct messaging with service providers"
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "Satisfaction guarantee on all services"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <a href="/" className="flex items-center no-underline">
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
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm text-gray-700">{selectedLanguage}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                <AnimatePresence>
                  {showLanguageDropdown && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowLanguageDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          {languages.map((language) => (
                            <button
                              key={language}
                              onClick={() => {
                                setSelectedLanguage(language);
                                setShowLanguageDropdown(false);
                              }}
                              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                            >
                              {language}
                              {selectedLanguage === language && (
                                <span className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <a 
                href="/professional"
                className="bg-blue-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base rounded-md hover:bg-blue-700 transition-colors no-underline"
              >
                Professional?
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
            Find Professional Services
          </h1>

          {/* Search Bar Container */}
          <div className=" w-full mx-auto mb-8 sm:mb-12 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="What service do you need?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-4 rounded-full 
                  border border-gray-200 focus:border-blue-500 
                  focus:ring-2 focus:ring-blue-100
                  shadow-[0_2px_8px_rgba(0,0,0,0.08)]
                  placeholder-gray-400 text-gray-700
                  text-base sm:text-lg"
              />
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
            </div>
          </div>

          {/* Service Categories */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {serviceCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedService(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center justify-center 
                  bg-white rounded-lg h-24 sm:h-[120px] 
                  shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                  hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] 
                  transition-all cursor-pointer
                  hover:bg-gray-50"
              >
                <category.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2" />
                <p className="text-xs sm:text-sm text-center text-gray-700 px-2 line-clamp-2">
                  {category.label}
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      {/* New Footer */}
      <div className="fixed bottom-0 w-full bg-white border-t z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          {/* Mobile Footer */}
          <div className="flex flex-col sm:hidden">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center">
                <Globe className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-xs text-gray-600">Loading location...</span>
              </div>
              <div className="text-xs text-gray-600">
                Kokobeo Inc.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                How it works
              </button>
              <button 
                onClick={() => setShowHiring(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Hire Pro
              </button>
              <button 
                onClick={() => setShowQuotes(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Get quotes
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <button 
                onClick={() => setShowReviews(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Reviews
              </button>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Privacy
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-xs text-gray-600 hover:text-gray-900"
              >
                Terms
              </button>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden sm:flex items-center justify-between text-sm">
            {/* Left Side */}
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-gray-600">Loading location...</span>
            </div>
            
            {/* Center */}
            <div className="flex items-center min-w-0">
              <button 
                onClick={() => setShowHowItWorks(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                How does it work?
              </button>
              <button 
                onClick={() => setShowHiring(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Hire your professional
              </button>
              <button 
                onClick={() => setShowQuotes(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Get quotes
              </button>
              <button 
                onClick={() => setShowReviews(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Reviews
              </button>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Privacy
              </button>
              <button 
                onClick={() => setShowTermsModal(true)}
                className="text-gray-600 hover:text-gray-900 whitespace-nowrap ml-4"
              >
                Terms
              </button>
            </div>

            {/* Right Side */}
            <div className="flex whitespace-nowrap text-gray-600">
              Kokobeo - Goldman services INC - Register Number 12345
            </div>
          </div>
        </div>
      </div>

      {/* Footer Popups */}
      <InfoPopup
        isOpen={showHowItWorks}
        onClose={() => setShowHowItWorks(false)}
        title="How does it work?"
        content={
          <div className="space-y-4 text-left">
            <p>Find the perfect professional for your needs:</p>
            <ul className="list-disc pl-4">
              <li>Search for professionals in your area</li>
              <li>Compare multiple quotes</li>
              <li>Read verified reviews from other customers</li>
              <li>Choose your preferred professional and get started</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showHiring}
        onClose={() => setShowHiring(false)}
        title="Hire your professional"
        content={
          <div className="space-y-4 text-left">
            <p>Direct hiring process:</p>
            <ul className="list-disc pl-4">
              <li>Browse professional profiles</li>
              <li>View their experience and certifications</li>
              <li>Contact them directly</li>
              <li>Discuss your project details</li>
              <li>Agree on terms and get started</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showQuotes}
        onClose={() => setShowQuotes(false)}
        title="Get quotes"
        content={
          <div className="space-y-4 text-left">
            <p>Receive up to 5 quotes from different professionals:</p>
            <ul className="list-disc pl-4">
              <li>Submit your request</li>
              <li>Get multiple quotes</li>
              <li>Compare prices and services</li>
              <li>Choose the best offer</li>
              <li>Provide anonymous feedback to get better offers</li>
            </ul>
          </div>
        }
      />

      <InfoPopup
        isOpen={showReviews}
        onClose={() => setShowReviews(false)}
        title="Reviews"
        content={
          <div className="space-y-4 text-left">
            <p>Once you've completed work with your chosen professional, let other customers know about your experience:</p>
            <ul className="list-disc pl-4">
              <li>Rate your experience</li>
              <li>Share detailed feedback</li>
              <li>Help others make informed decisions</li>
              <li>Build trust in our community</li>
            </ul>
          </div>
        }
      />

      {/* Welcome Popup */}
      <WelcomePopup 
        isOpen={showWelcomePopup} 
        onClose={() => setShowWelcomePopup(false)} 
      />

      {/* Service Pages */}
      <AnimatePresence>
        {selectedService && (
          <ServicePage
            service={serviceCategories.find(cat => cat.id === selectedService)?.label}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>

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

export default KokobeoHomepage;