import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Star, MapPin, Calendar, Clock, Shield, Award,
  CheckCircle, X, Camera, FileText, MessageSquare, Phone,
  Mail, ChevronRight, Heart, ThumbsUp, Zap
} from 'lucide-react';

const ProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLiked, setIsLiked] = useState(false);

  const profileData = {
    name: "John Smith",
    title: "Professional Plumber",
    company: "Smith Plumbing Services",
    rating: 4.8,
    reviews: 127,
    memberSince: "January 2024",
    location: "Toronto, ON",
    completedJobs: 156,
    verifications: {
      insurance: true,
      background: true,
      license: true,
      vatNumber: true
    },
    skills: ["Emergency Plumbing", "Pipe Installation", "Leak Detection", "Boiler Repair"],
    languages: ["English", "French"],
    emergencyService: true,
    responseTime: "< 30 minutes",
    availability: "Mon-Fri, 8AM-6PM"
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'portfolio', label: 'Portfolio', icon: FileText },
    { id: 'schedule', label: 'Schedule', icon: Calendar }
  ];

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`bg-${color}-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center border border-${color}-100`}
    >
      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 text-${color}-500 mx-auto mb-1 sm:mb-2`} />
      <div className={`text-lg sm:text-2xl font-bold text-${color}-700`}>{value}</div>
      <div className={`text-xs sm:text-sm text-${color}-600`}>{label}</div>
    </motion.div>
  );

  const renderTabContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            {/* Profile Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <StatCard 
                icon={Star} 
                value={profileData.rating} 
                label="Rating" 
                color="yellow"
              />
              <StatCard 
                icon={FileText} 
                value={profileData.reviews} 
                label="Reviews" 
                color="blue"
              />
              <StatCard 
                icon={CheckCircle} 
                value={profileData.completedJobs} 
                label="Completed" 
                color="green"
              />
            </div>

            {/* Verified Status */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
              <h3 className="text-sm font-medium text-blue-900 mb-3 sm:mb-4 flex items-center">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-500" />
                Verified Professional
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                {Object.entries(profileData.verifications).map(([key, value]) => (
                  <motion.div
                    key={key}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-2 bg-white/60 p-2 rounded-lg"
                  >
                    <CheckCircle className={`h-4 w-4 ${value ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-xs sm:text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-purple-500" />
                Professional Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-2 sm:px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Emergency Service */}
            {profileData.emergencyService && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-red-100"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-red-900">Emergency Service</h3>
                      <p className="text-xs sm:text-sm text-red-600">24/7 Availability</p>
                    </div>
                  </div>
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-medium">
                    Active Now
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 bg-white/60 p-2 sm:p-3 rounded-lg">
                    <Clock className="h-4 w-4 text-red-500" />
                    <span className="text-xs sm:text-sm text-red-700">Response: {profileData.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 p-2 sm:p-3 rounded-lg">
                    <Calendar className="h-4 w-4 text-red-500" />
                    <span className="text-xs sm:text-sm text-red-700">{profileData.availability}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Recent Work */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3 sm:mb-4 flex items-center">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-teal-500" />
                Recent Projects
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-gray-100 aspect-square"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <h4 className="text-white text-sm sm:text-base font-medium mb-1">Project Title</h4>
                        <p className="text-white/80 text-xs sm:text-sm">Brief description</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm sm:text-base">Send Message</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-gray-50"
              >
                <Phone className="h-4 w-4" />
                <span className="text-sm sm:text-base">Request Call</span>
              </motion.button>
            </div>
          </motion.div>
        );

      // ... rest of the component code for other tabs
      default:
        return null;
    }
  };

  // Early return if modal is not open
  if (!isOpen) return null;

  // Simple backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl sm:shadow-2xl"
        >
          {/* Header with Profile Info */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-8 pb-20 sm:pb-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10"></div>
            <button
          onClick={onClose}
          className="absolute right-4 top-2 p-2 text-white/80 hover:text-white rounded-full hover:bg-white/10 z-50"
        >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex items-center">
              <div className="mr-4 sm:mr-6">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="relative"
                >
                  <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-xl sm:rounded-2xl bg-gradient-to-br from-white/20 to-white/10 p-1">
                    <div className="h-full w-full rounded-lg sm:rounded-xl bg-white flex items-center justify-center overflow-hidden">
                      <User className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-1.5 sm:p-2 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                  </button>
                </motion.div>
              </div>
              <div className="text-white flex-1 min-w-0">
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg sm:text-2xl font-semibold truncate"
                >
                  {profileData.name}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-white/80 text-sm sm:text-base truncate"
                >
                  {profileData.title}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center mt-2 sm:mt-3 text-xs sm:text-sm"
                >
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-white/60" />
                  <span className="text-white/80">{profileData.location}</span>
                  <span className="mx-2 text-white/40 hidden sm:inline">•</span>
                  <span className="text-white/80 hidden sm:inline">Member since {profileData.memberSince}</span>
                </motion.div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/10 hover:bg-white/20 transition-colors ml-2 sm:ml-4"
              >
                <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
              </motion.button>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative -mt-16 sm:-mt-20">
            <div className="mx-4 sm:mx-6 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[100px] py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm font-medium text-center border-b-2 transition-colors flex items-center justify-center space-x-1 sm:space-x-2
                      ${activeTab === tab.id 
                        ? 'border-blue-500 text-blue-600 bg-blue-50' 
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <tab.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>
              </div>

              {/* Reviews Section */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {/* Reviews Summary */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-yellow-100">
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="text-3xl sm:text-5xl font-bold text-yellow-700">{profileData.rating}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 sm:h-5 sm:w-5 ${star <= Math.floor(profileData.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-yellow-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-yellow-800 mt-1">
                          Based on {profileData.reviews} verified reviews
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Review List */}
                  <div className="space-y-3 sm:space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ x: 4 }}
                        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-100 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-xs sm:text-sm font-medium">
                              SM
                            </div>
                            <div>
                              <h4 className="text-sm sm:text-base font-medium">Sarah M.</h4>
                              <div className="flex items-center text-xs sm:text-sm text-gray-500">
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current mr-1" />
                                5.0
                              </div>
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          Excellent service! Very professional and completed the work quickly.
                          Would definitely recommend to others.
                        </p>
                        <div className="flex items-center space-x-4 mt-3 sm:mt-4">
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                            <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">Helpful</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600">
                            <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="text-xs sm:text-sm">Comment</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileModal;