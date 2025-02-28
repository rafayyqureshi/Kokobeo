import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MapPin, Star, ChevronDown, Briefcase,
  Languages, Clock, Shield, CheckCircle, MessageSquare,
  Heart, User, Mail, X
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/Button';
import SharedHeader2 from '../../Headers/SharedHeader2';
import SharedFooter from '../../Footer/SharedFooter';
import { useNavigate } from 'react-router-dom'; // Added for navigation

const LocalProfessionalsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [rating, setRating] = useState(0);
  const [availability, setAvailability] = useState('all');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Toronto, ON');

  const navigate = useNavigate(); // Hook for navigation

  // Same data as before...
  const locations = [
    'Toronto, ON',
    'Vancouver, BC',
    'Montreal, QC',
    'Calgary, AB',
    'Ottawa, ON'
  ];

  // Mock professionals data
  const professionals = [
    {
      id: 1,
      name: 'John Smith',
      title: 'Professional Plumber',
      rating: 4.8,
      reviews: 127,
      hourlyRate: '$45',
      location: 'Toronto, ON',
      responseTime: '< 30 minutes',
      completedJobs: 156,
      description: 'Experienced plumber specializing in emergency repairs and installations. Available 24/7 for urgent calls.',
      skills: ['Emergency Plumbing', 'Pipe Installation', 'Leak Detection'],
      verified: true,
      insured: true,
      languages: ['English', 'French']
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      title: 'Master Electrician',
      rating: 4.9,
      reviews: 89,
      hourlyRate: '$55',
      location: 'Toronto, ON',
      responseTime: '< 1 hour',
      completedJobs: 203,
      description: 'Licensed master electrician with over 10 years of experience in residential and commercial projects.',
      skills: ['Electrical Repairs', 'Installation', 'Safety Inspection'],
      verified: true,
      insured: true,
      languages: ['English']
    }
    // Add more professionals as needed
  ];

  const categories = [
    'All Categories',
    'Plumbing',
    'Electrical',
    'Cleaning',
    'Painting',
    'Moving',
    'Gardening',
    'Home Repair'
  ];

  const ProfessionalCard = ({ professional }) => (
    <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0 w-full sm:w-auto flex justify-center sm:block">
          <div className="w-20 h-20 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <User className="w-10 h-10 sm:w-8 sm:h-8 text-blue-600" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {professional.name}
            </h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-gray-100"
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
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-sm text-gray-600">{professional.reviews} reviews</span>
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
              <MapPin className="w-4 h-4 mr-1" />
              {professional.location}
            </div>
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
              {professional.insured && (
                <Badge className="bg-blue-50 text-blue-700 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Insured
                </Badge>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-900">
                {professional.hourlyRate}
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

  const FiltersPanel = ({ isMobile = false }) => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Hourly Rate</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((stars) => (
            <label key={stars} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={rating === stars}
                onChange={() => setRating(stars)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 flex items-center text-sm text-gray-600">
                {stars}+ <Star className="w-4 h-4 text-yellow-400 fill-current ml-1" />
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Availability</h3>
        <div className="space-y-2">
          {['all', 'today', 'this_week'].map((period) => (
            <label key={period} className="flex items-center">
              <input
                type="radio"
                name="availability"
                checked={availability === period}
                onChange={() => setAvailability(period)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">
                {period === 'all' ? 'Any Time' : 
                 period === 'today' ? 'Today' : 
                 'This Week'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Verification</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Verified Profile</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Insured</span>
          </label>
        </div>
      </div>

      {/* Reset Filters Button */}
      <button 
        className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
        onClick={() => {
          setSelectedCategory('all');
          setPriceRange([0, 100]);
          setRating(0);
          setAvailability('all');
          if (isMobile) setShowMobileFilters(false);
        }}
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SharedHeader2 navigateBack={() => navigate(-1)} /> {/* Updated to handle back navigation */}
  
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8" style={{ textAlign: 'left' }}>
        {/* Enhanced Search Section */}
        <div className="mb-8 space-y-4">
          {/* Main Search Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
  
            {/* Location Search */}
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={() => setShowLocationDropdown(true)}
              />
              
              {/* Location Dropdown */}
              <AnimatePresence>
                {showLocationDropdown && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-10"
                      onClick={() => setShowLocationDropdown(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg py-1"
                    >
                      <div className="max-h-60 overflow-y-auto">
                        {locations.map((location, index) => (
                          <button
                            key={index}
                            className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm text-gray-700"
                            onClick={() => {
                              setSelectedLocation(location);
                              setShowLocationDropdown(false);
                              setSearchQuery(location);
                            }}
                          >
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                              {location}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
  
          {/* Search Button */}
          <div className="flex justify-center">
            <Button 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto"
              onClick={() => {
                // Handle search with both category and location
                console.log('Searching with:', {
                  category: selectedCategory,
                  location: selectedLocation
                });
              }}
            >
              Search Professionals
            </Button>
          </div>
  
          {/* Active Filters Display */}
          {(selectedCategory !== 'all' || selectedLocation) && (
            <div className="flex flex-wrap gap-2 pt-4">
              {selectedCategory !== 'all' && (
                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedLocation && (
                <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedLocation}</span>
                  <button
                    onClick={() => setSelectedLocation('')}
                    className="ml-1 hover:text-blue-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
  
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <FiltersPanel />
            </Card>
          </div>
  
          {/* Mobile Filters Dialog */}
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
  
          {/* Professionals List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {professionals.length} Professionals Found
                </h2>
              </div>
              <div className="flex items-center">
                <select
                  className="px-3 py-2 border rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
  
            {/* Professionals Grid */}
            <div className="space-y-4 sm:space-y-6">
              {professionals.map((professional) => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
  
            {/* Pagination */}
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
      </main>
      <br /><br /><br /><br />
  
      {/* Footer */}
      <SharedFooter />
    </div>
  );
};

export default LocalProfessionalsPage;