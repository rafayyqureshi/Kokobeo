import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Star, Filter, Clock, DollarSign, 
  Award, Building, Languages, X, ChevronDown, BadgeCheck,
  MessageCircle, Heart, ThumbsUp, Calendar, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const ProfessionalSearch = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    serviceType: 'all', // local, international
    professional: 'all', // lawyer, plumber, etc.
    location: '',
    priceRange: '',
    availability: '',
    languages: [],
    rating: '',
    verificationStatus: 'all',
    sortBy: 'recommended'
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentView, setCurrentView] = useState('grid'); // grid or map
  
  // Mock data for demonstration
  const locations = {
    provinces: ['Ontario', 'Quebec', 'British Columbia'],
    districts: {
      'Ontario': ['Toronto', 'Ottawa', 'Hamilton'],
      'Quebec': ['Montreal', 'Quebec City', 'Laval'],
      'British Columbia': ['Vancouver', 'Victoria', 'Surrey']
    },
    areas: {
      'Toronto': ['Downtown', 'North York', 'Scarborough'],
      'Montreal': ['Ville-Marie', 'Plateau', 'Mile End']
    }
  };

  const professionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "International Business Lawyer",
      rating: 4.9,
      reviews: 245,
      completedJobs: 189,
      hourlyRate: 150,
      location: "Toronto, Ontario",
      languages: ["English", "French", "Spanish"],
      responseTime: "< 2 hours",
      verificationStatus: "verified",
      type: "international",
      expertise: ["Corporate Law", "Contract Law", "IP Law"],
      photo: "/api/placeholder/400/400",
      availability: "Available now",
      joinDate: "2019",
      lastActive: "2 hours ago",
      description: "Specialized in international business law with expertise in cross-border transactions and intellectual property rights.",
      badges: ["Top Rated", "Enterprise Ready"],
      skills: ["Contract Negotiation", "IP Protection", "Corporate Governance"]
    },
    // Add more mock professionals...
  ];

  // Search and filter functionality
  const filteredProfessionals = professionals.filter(pro => {
    if (selectedFilters.serviceType !== 'all' && 
        pro.type !== selectedFilters.serviceType) return false;
    if (selectedFilters.verificationStatus !== 'all' && 
        pro.verificationStatus !== selectedFilters.verificationStatus) return false;
    if (searchQuery && !pro.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !pro.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Location selection component
  const LocationSelector = () => {
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');

    return (
      <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Province
            </label>
            <Select
              value={selectedProvince}
              onValueChange={(value) => {
                setSelectedProvince(value);
                setSelectedDistrict('');
                setSelectedArea('');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent>
                {locations.provinces.map((province) => (
                  <SelectItem key={province} value={province}>
                    {province}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedProvince && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <Select
                value={selectedDistrict}
                onValueChange={(value) => {
                  setSelectedDistrict(value);
                  setSelectedArea('');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {locations.districts[selectedProvince].map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedDistrict && locations.areas[selectedDistrict] && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <Select
                value={selectedArea}
                onValueChange={setSelectedArea}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {locations.areas[selectedDistrict].map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            className="w-full"
            onClick={() => {
              const location = [selectedArea, selectedDistrict, selectedProvince]
                .filter(Boolean)
                .join(', ');
              setSelectedLocation(location);
              setShowLocationDropdown(false);
            }}
          >
            Apply Location
          </Button>
        </div>
      </div>
    );
  };

  // Professional Card component
  const ProfessionalCard = ({ pro }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={pro.photo}
            alt={pro.name}
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {pro.name}
                {pro.verificationStatus === 'verified' && (
                  <BadgeCheck className="h-5 w-5 text-blue-500" />
                )}
              </h3>
              <p className="text-gray-600">{pro.title}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">{pro.rating}</span>
              <span className="text-gray-500 text-sm ml-1">
                ({pro.reviews})
              </span>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              {pro.location}
            </div>
            
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              ${pro.hourlyRate}/hr
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {pro.languages.map((lang, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {lang}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {pro.badges.map((badge, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Button className="flex-1">
              Contact
            </Button>
            <Button variant="outline" className="px-3">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search professionals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="px-4 py-2 border rounded-lg flex items-center gap-2 bg-white"
                >
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">
                    {selectedLocation || 'Location'}
                  </span>
                </button>
                
                <AnimatePresence>
                  {showLocationDropdown && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setShowLocationDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <LocationSelector />
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowMobileFilters(true)}
                className="sm:hidden"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <div className="hidden sm:block w-64 flex-shrink-0">
            <div className="space-y-6">
              {/* Service Type */}
              <div>
                <h3 className="font-medium mb-3">Service Type</h3>
                <div className="space-y-2">
                  {['all', 'local', 'international'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedFilters.serviceType === type}
                        onChange={() => setSelectedFilters({
                          ...selectedFilters,
                          serviceType: type
                        })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Professional Type */}
              <div>
                <h3 className="font-medium mb-3">Professional Type</h3>
                <Select
                  value={selectedFilters.professional}
                  onValueChange={(value) => setSelectedFilters({
                    ...selectedFilters,
                    professional: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="lawyer">Lawyer</SelectItem>
                    <SelectItem value="plumber">Plumber</SelectItem>
                    <SelectItem value="electrician">Electrician</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <Select
                  value={selectedFilters.priceRange}
                  onValueChange={(value) => setSelectedFilters({
                    ...selectedFilters,
                    priceRange: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="0-50">$0 - $50/hr</SelectItem>
                    <SelectItem value="51-100">$51 - $100/hr</SelectItem>
                    <SelectItem value="101-200">$101 - $200/hr</SelectItem>
                    <SelectItem value="200+">$200+/hr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Languages */}
              <div>
                <h3 className="font-medium mb-3">Languages</h3>
                <div className="space-y-2">
                  {['English', 'French', 'Spanish', 'German'].map((lang) => (
                    <label key={lang} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedFilters.languages.includes(lang)}
                        onChange={(e) => {
                          const newLanguages = e.target.checked
                            ? [...selectedFilters.languages, lang]
                            : selectedFilters.languages.filter(l => l !== lang);
                          setSelectedFilters({
                            ...selectedFilters,
                            languages: newLanguages
                          });
                        }}
                        className="h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="ml-2">{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="font-medium mb-3">Rating</h3>
                <Select
                  value={selectedFilters.rating}
                  onValueChange={(value) => setSelectedFilters({
                    ...selectedFilters,
                    rating: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5 & up</SelectItem>
                    <SelectItem value="4.0">4.0 & up</SelectItem>
                    <SelectItem value="3.5">3.5 & up</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="font-medium mb-3">Verification</h3>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'verified', label: 'Verified Only' },
                  ].map((status) => (
                    <label key={status.id} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedFilters.verificationStatus === status.id}
                        onChange={() => setSelectedFilters({
                          ...selectedFilters,
                          verificationStatus: status.id
                        })}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProfessionals.length} professionals found
              </p>

              <div className="flex gap-4">
                {/* View Toggle */}
                <div className="hidden sm:flex border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setCurrentView('grid')}
                    className={`px-4 py-2 ${
                      currentView === 'grid'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setCurrentView('map')}
                    className={`px-4 py-2 ${
                      currentView === 'map'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-white text-gray-600'
                    }`}
                  >
                    Map
                  </button>
                </div>

                {/* Sort Options */}
                <Select
                  value={selectedFilters.sortBy}
                  onValueChange={(value) => setSelectedFilters({
                    ...selectedFilters,
                    sortBy: value
                  })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Professional Cards */}
            {currentView === 'grid' ? (
              <div className="grid grid-cols-1 gap-6">
                {filteredProfessionals.map((pro) => (
                  <ProfessionalCard key={pro.id} pro={pro} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
                <p className="text-gray-500">Map view coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 bottom-0 w-[320px] bg-white z-50 overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile filter options - same as desktop */}
                <div className="space-y-6">
                  {/* Copy desktop filter content here */}
                </div>

                <div className="sticky bottom-0 bg-white pt-4 pb-2 mt-6">
                  <Button 
                    className="w-full"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalSearch;