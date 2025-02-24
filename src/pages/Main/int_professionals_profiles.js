import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Globe, Star, ChevronDown, Briefcase,
  Languages, Clock, Shield, CheckCircle, MessageSquare,
  Heart, User, Mail, X, DollarSign
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/Button';
import SharedFooter2 from '../../Footer/SharedFooter2';
import SharedHeader2 from '../../Headers/SharedHeader2';

// Review Modal Component
const ReviewModal = ({ isOpen, onClose, professional }) => {
  if (!isOpen) return null;

  // Mock reviews data for each professional
  const reviews = [
    {
      id: 1,
      author: "Robert M.",
      rating: 5,
      date: "2024-01-15",
      comment: "Outstanding work on our international project. Deep expertise in web development.",
      project: "E-commerce Platform"
    },
    {
      id: 2,
      author: "Elena K.",
      rating: 4,
      date: "2024-01-10",
      comment: "Great communication despite time zone differences. Very professional.",
      project: "API Development"
    },
    {
      id: 3,
      author: "James W.",
      rating: 5,
      date: "2024-01-05",
      comment: "Excellent technical skills and project management. Highly recommended.",
      project: "Cloud Migration"
    }
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">{professional.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{professional.rating}</span>
              <span className="text-gray-500 text-sm ml-1">
                ({professional.reviews} reviews)
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
              <div className="text-gray-700 mt-2">{review.comment}</div>
              <div className="mt-2 text-sm text-gray-500">Project: {review.project}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const InternationalProfessionalsProfile = () => {
  // Categories data
  const categories = [
    'All Categories',
    'Web Development',
    'Mobile Development',
    'Digital Marketing',
    'Design',
    'Writing',
    'Business Consulting',
    'Legal Services',
    'Web Developer',
    'Mobile App Developer',
    'Financial Advisor',
    'Language Tutor',
    'Translator',
    'Advertising Marketing',
    'Google Specialist',
    'Google Adwords Specialist',
    'Social Marketing Specialist',
    'Business Consultant',
    'IT Support Specialist',
    'Social Media Manager',
    'Wedding Planner',
    'Event Organizer',
    'Graphic Designer',
    'Content Writer',
    'Lawyer',
    'Other'
  ];

  // Professionals data
  const professionals = [
    {
      id: 1,
      name: 'David Miller',
      title: 'Senior Web Developer',
      rating: 4.9,
      reviews: 183,
      hourlyRate: 85,
      country: 'United States',
      timeZone: 'UTC-5',
      responseTime: '< 2 hours',
      completedJobs: 245,
      description: 'Full-stack developer specializing in React, Node.js, and cloud architecture. 8+ years of remote work experience.',
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      verified: true,
      languages: ['English', 'Spanish'],
      onlineStatus: 'online',
      currency: 'USD'
    },
    {
      id: 2,
      name: 'Maria Garcia',
      title: 'Digital Marketing Specialist',
      rating: 4.8,
      reviews: 156,
      hourlyRate: 65,
      country: 'Spain',
      timeZone: 'UTC+1',
      responseTime: '< 1 hour',
      completedJobs: 178,
      description: 'Expert in SEO, content marketing, and social media strategy. Proven track record of international campaign success.',
      skills: ['SEO', 'Content Strategy', 'Social Media', 'Analytics'],
      verified: true,
      languages: ['English', 'Spanish', 'Portuguese'],
      onlineStatus: 'away',
      currency: 'EUR'
    },
    {
      id: 3,
      name: 'John Chen',
      title: 'Mobile App Developer',
      rating: 4.9,
      reviews: 142,
      hourlyRate: 95,
      country: 'Canada',
      timeZone: 'UTC-4',
      responseTime: '< 3 hours',
      completedJobs: 167,
      description: 'iOS and Android developer with expertise in React Native and Flutter. Specialized in creating cross-platform applications.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      verified: true,
      languages: ['English', 'Mandarin'],
      onlineStatus: 'online',
      currency: 'CAD'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hourlyRange, setHourlyRange] = useState([0, 150]);
  const [rating, setRating] = useState(0);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [timeZone, setTimeZone] = useState('UTC-5');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);

  const ProfessionalCard = ({ professional }) => {
    const getOnlineStatusColor = (status) => {
      return status === 'online' ? 'bg-green-500' : 'bg-yellow-500';
    };

    return (
      <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row items-start gap-4" style={{ textAlign: 'left' }}>
          {/* Profile Image & Online Status */}
          <div className="flex-shrink-0 relative w-full sm:w-auto flex justify-center sm:block">
            <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <User className="w-10 h-10 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <div className={`absolute bottom-0 right-1/2 sm:right-0 translate-x-8 sm:translate-x-0 w-4 h-4 rounded-full border-2 border-white ${getOnlineStatusColor(professional.onlineStatus)}`} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 w-full"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {professional.name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Globe className="w-4 h-4" />
                  <span>{professional.country}</span>
                  <span className="text-gray-400 hidden sm:inline">•</span>
                  <span>{professional.timeZone}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-full hover:bg-gray-100 absolute sm:relative top-0 right-0"
              >
                <Heart className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            <p className="text-sm text-gray-600 mb-2">{professional.title}</p>

            <div className="flex flex-wrap items-center gap-2 mb-3">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium">{professional.rating}</span>
              </div>
              <button
                onClick={() => {
                  setSelectedProfessional(professional);
                  setShowReviewModal(true);
                }}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                {professional.reviews} reviews
              </button>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-sm text-gray-600">{professional.completedJobs} jobs</span>
            </div>

            <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-none">
              {professional.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {professional.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="bg-blue-50 text-blue-700 border-blue-200 text-xs whitespace-nowrap"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {professional.responseTime}
              </div>
              <div className="flex items-center">
                <Languages className="w-4 h-4 mr-1" />
                {professional.languages.join(', ')}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {professional.verified && (
                  <Badge className="bg-green-50 text-green-700 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
                <Badge className="bg-blue-50 text-blue-700">
                  {professional.completedJobs}+ Jobs
                </Badge>
              </div>
              <div className="flex items-center order-first sm:order-last">
                <span className="text-lg font-semibold text-gray-900">
                  ${professional.hourlyRate}
                </span>
                <span className="text-sm text-gray-500">/hr</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Contact
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const FiltersPanel = ({ isMobile = false }) => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => {
                  setSelectedCategory(category);
                  if (isMobile) setShowMobileFilters(false);
                }}
                className="w-4 h-4text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <Button 
        variant="ghost"
        className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        onClick={() => {
          setSelectedCategory('all');
          setHourlyRange([0, 150]);
          setRating(0);
          setSelectedLanguages([]);
          setTimeZone('UTC-5');
          if (isMobile) setShowMobileFilters(false);
        }}
      >
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader2/>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search international professionals..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <FiltersPanel />
            </Card>
          </div>

          <AnimatePresence>
            {showMobileFilters && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
                  onClick={() => setShowMobileFilters(false)}
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                  className="fixed right-0 top-0 h-full w-full max-w-xs bg-white z-50 lg:hidden overflow-y-auto"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Filters</h2>
                      <button
                        onClick={() => setShowMobileFilters(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <FiltersPanel isMobile={true} />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <div className="flex-1" style={{ textAlign: 'left' }}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {professionals.length} International Professionals Found
                </h2>
              </div>
              <div className="flex items-center">
                <select
                  className="px-2 sm:px-3 py-2 border rounded-lg text-xs sm:text-sm text-gray-600 focus:ring-2 focus:ring-blue-500"
                  defaultValue="recommended"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rating</option>
                  <option value="price_low">Lowest Price</option>
                  <option value="price_high">Highest Price</option>
                  <option value="jobs">Most Jobs</option>
                </select>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {professionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-sm ${
                    page === 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showReviewModal && selectedProfessional && (
            <ReviewModal
              isOpen={showReviewModal}
              onClose={() => setShowReviewModal(false)}
              professional={selectedProfessional}
            />
          )}
        </AnimatePresence>
      </main>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <SharedFooter2/>
    </div>
  );
};

export default InternationalProfessionalsProfile;