import React, { useState } from 'react';
import { 
  User, Shield, CreditCard, Bell, Lock, Clock, 
  AlertCircle, Camera, Check, X, Upload, Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [availability, setAvailability] = useState({
    days: 'weekdays',
    hours: '9am-5pm',
    emergencyService: true
  });
  const [certificates, setCertificates] = useState({
    insurance: { verified: true, expiry: '2025-01-01' },
    vatNumber: { number: 'IT5028573958', verified: true },
    license: { verified: true, expiry: '2024-12-31' }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'availability', label: 'Availability', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const renderTabContent = () => {
    const contentVariants = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative group">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <User className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 group-hover:border-blue-500 transition-all">
                  <Camera className="h-4 w-4 text-gray-600 group-hover:text-blue-500" />
                </button>
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="font-medium text-lg text-gray-900">John Smith</div>
                <div className="text-sm text-gray-500">Master Plumber</div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                    Update Photo
                  </button>
                  <button className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                defaultValue="John Smith"
                placeholder="Enter your full name"
              />
              <InputField
                label="Business Name"
                defaultValue="Smith Plumbing Services"
                placeholder="Enter business name"
              />
              <InputField
                label="Email"
                defaultValue="john@example.com"
                type="email"
                className="col-span-1 sm:col-span-2"
              />
              <InputField
                label="Professional Title"
                defaultValue="Master Plumber"
                className="col-span-1 sm:col-span-2"
              />
            </div>
          </motion.div>
        );

      case 'verification':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6">
              <VerificationCard
                title="VAT Number"
                subtitle={certificates.vatNumber.number}
                isVerified={certificates.vatNumber.verified}
                buttonText="Update VAT Number"
              />
              
              <VerificationCard
                title="Insurance Certificate"
                subtitle="Professional Liability Insurance"
                expiryDate={certificates.insurance.expiry}
                isVerified={certificates.insurance.verified}
                buttonText="Upload New Certificate"
              />
              
              <VerificationCard
                title="Professional License"
                subtitle="Master Plumber License"
                expiryDate={certificates.license.expiry}
                isVerified={certificates.license.verified}
                buttonText="Update License"
              />
            </div>
          </motion.div>
        );

      case 'availability':
        return (
          <motion.div
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6"
          >
            <div className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Emergency Services</h4>
                    <p className="text-sm text-gray-500">Available for urgent calls</p>
                  </div>
                </div>
                <Switch
                  enabled={availability.emergencyService}
                  onChange={() => setAvailability(prev => ({
                    ...prev,
                    emergencyService: !prev.emergencyService
                  }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Available Days"
                  value={availability.days}
                  onChange={(e) => setAvailability(prev => ({
                    ...prev,
                    days: e.target.value
                  }))}
                  options={[
                    { value: 'weekdays', label: 'Weekdays Only' },
                    { value: 'all', label: 'All Days' },
                    { value: 'weekends', label: 'Weekends Only' },
                    { value: 'custom', label: 'Custom Schedule' }
                  ]}
                />
                <SelectField
                  label="Available Hours"
                  value={availability.hours}
                  onChange={(e) => setAvailability(prev => ({
                    ...prev,
                    hours: e.target.value
                  }))}
                  options={[
                    { value: '9am-5pm', label: '9:00 AM - 5:00 PM' },
                    { value: '24h', label: '24 Hours' },
                    { value: 'custom', label: 'Custom Hours' }
                  ]}
                />
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gray-50 rounded-xl space-y-4">
              <h4 className="font-medium text-gray-900">Regular Service Hours</h4>
              <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                  <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded-lg shadow-sm space-y-2 sm:space-y-0">
                    <span className="font-medium text-gray-700">{day}</span>
                    <div className="flex items-center space-x-3 w-full sm:w-auto">
                      <TimeSelect defaultValue="9:00 AM" className="flex-1 sm:flex-none" />
                      <span className="text-gray-400">to</span>
                      <TimeSelect defaultValue="5:00 PM" className="flex-1 sm:flex-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
          <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-73px)]">
            <AnimatePresence>
              {(showMobileMenu || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  className="absolute lg:relative w-64 h-full bg-gray-50 border-r z-10"
                >
                  <nav className="p-4 space-y-1">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => {
                          setActiveTab(tab.id);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                          ${activeTab === tab.id 
                            ? 'bg-white text-blue-600 shadow-sm border border-gray-100' 
                            : 'text-gray-600 hover:bg-white hover:text-blue-600'
                          }`}
                      >
                        <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {renderTabContent()}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Reusable Components
const InputField = ({ label, className = "", ...props }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      {...props}
    />
  </div>
);

const SelectField = ({ label, options, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select 
      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      {...props}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const TimeSelect = ({ defaultValue, className = "" }) => (
  <select className={`px-3 py-2 border border-gray-200 rounded-lg text-sm ${className}`}>
    <option>{defaultValue}</option>
    {/* Add more time options */}
  </select>
);

const Switch = ({ enabled, onChange }) => (
  <button
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
      ${enabled ? 'bg-red-500' : 'bg-gray-200'}`}
    onClick={onChange}
  >
    <span 
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
        ${enabled ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const VerificationCard = ({ title, subtitle, expiryDate, isVerified, buttonText }) => (
  <div className="p-4 sm:p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        {expiryDate && (
          <p className="text-sm text-gray-400 mt-1">Expires: {expiryDate}</p>
        )}
      </div>
      {isVerified && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-600">
          <Check className="h-3 w-3 mr-1" />
          Verified
        </span>
      )}
    </div>
    <button className="w-full px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2">
      <Upload className="h-4 w-4" />
      <span>{buttonText}</span>
    </button>
  </div>
);

export default SettingsModal;