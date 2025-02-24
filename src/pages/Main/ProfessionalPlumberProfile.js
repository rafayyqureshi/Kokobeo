import React, { useState } from 'react';
import { 
  Upload, Camera, Check, X, Shield, Clock, MapPin, Search, 
  DollarSign, Building, Wrench, Tool, Star, Award, Zap,
  PlusCircle, Phone, Mail, Lock, AlertTriangle,
  FileText, Home, Wallet, MessageCircle, User, 
  Bell, Bookmark, LogOut, Settings,
  AlertCircle, Briefcase, FileCheck, Menu, ChevronRight,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import PolicyModals from './PolicyModals';
import SharedFooter from '../../Footer/SharedFooter';
import SharedHeader from '../../Headers/SharedHeader';
import { VatNumberInput } from './VatNumberInput';

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

const ProfessionalPlumberProfile = () => {
  // State Management
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    // Basic Information
    companyName: '',
    companyAddress: '',
    streetNumber: '',
    email: '',
    phone: '',
    whatsapp: '',
    postcode: '',
    vatNumber: '',
    description: '',
    hourlyRate: '',
    
    // Service Areas
    provinces: [],
    districts: [],
    neighborhoods: [],
    
    // Service Types and Availability
    serviceType: 'regular',
    showCustomTime: false,
    
    // Regular Services
    regularServices: {
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        hours: {
          start: '08:00',
          end: '18:00'
        }
      }
    },
    
    // Emergency Services
    emergencyServices: {
      available: false,
      whatsAppNumber: '',
      responseTime: '30',
      availability: {
        days: [],
        hours: {
          start: '',
          end: ''
        }
      }
    }
  });

  const [certifications, setCertifications] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customServices, setCustomServices] = useState([]);
  const [boilerBrands, setBoilerBrands] = useState([]);
  const [acBrands, setAcBrands] = useState([]);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showHiring, setShowHiring] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Available plumbing services
  const plumbingServices = [
    'Diagnosis of plumbing problems',
    'Water leak repair',
    'Drain unblocking',
    'Water pipe installation',
    'Broken pipe repair',
    'Shower/bath installation',
    'Toilet installation/repair',
    'Sink installation/repair',
    'Tap installation/repair',
    'Valve/pipe/float/drain replacement',
    'Water pressure check',
    'AC installation/maintenance',
    'Pump/siphon repair',
    'Heating system installation',
    'Boiler installation/repair',
    'Water heater maintenance',
    'Irrigation system management',
    'Under-floor leak detection',
    'Gas leak detection/certification'
  ];

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader />
      <br />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg" style={{ textAlign: 'left' }}>
        {/* Profile Header */}
        <div className="mb-8 flex items-center gap-6">
          <div className="relative group">
            <div className="h-32 w-32 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <Building className="h-12 w-12 text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700 transition-colors">
              <Camera className="h-4 w-4" />
              <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Professional Profile</h1>
            <p className="text-gray-500">Complete your profile to start receiving service requests</p>
            {!formData.companyName && (
              <div className="mt-2 flex items-center gap-2 text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Please complete your profile</span>
              </div>
            )}
          </div>
        </div>

        {/* Basic Information Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building className="h-5 w-5 text-blue-600" />
            Basic Information
          </h2>
          <div>
            <VatNumberInput
              value={formData.vatNumber}
              onChange={(value) => setFormData({
                ...formData,
                vatNumber: value
              })}
              country="IT"
              required={true}
            />
          </div>
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                Company Address
                <Lock className="h-4 w-4 text-gray-400" title="Only visible after hire/quote purchase" />
              </label>
              <input
                type="text"
                value={formData.companyAddress}
                onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Number</label>
              <input
                type="text"
                value={formData.streetNumber}
                onChange={(e) => setFormData({...formData, streetNumber: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. 112 E industrial zone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter postcode"
              />
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                Phone Number
                <Lock className="h-4 w-4 text-gray-400" title="Only visible after hire/quote purchase" />
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (XXX) XXX-XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                Email Address
                <Lock className="h-4 w-4 text-gray-400" title="Only visible after hire/quote purchase" />
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number (Required for Emergency Services)
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (XXX) XXX-XXXX"
              />
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Service Areas
          </h2>
          <div className="space-y-4">
            {/* Province Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Provinces</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search and select provinces"
                  className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.provinces.map((province, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {province}
                    <button onClick={() => {
                      setFormData({
                        ...formData,
                        provinces: formData.provinces.filter((_, i) => i !== index)
                      });
                    }}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* District Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Districts</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search and select districts"
                  className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.districts.map((district, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {district}
                    <button onClick={() => {
                      setFormData({
                        ...formData,
                        districts: formData.districts.filter((_, i) => i !== index)
                      });
                    }}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Neighborhood Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Neighborhoods</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search and select neighborhoods"
                  className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.neighborhoods.map((neighborhood, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                  >
                    {neighborhood}
                    <button onClick={() => {
                      setFormData({
                        ...formData,
                        neighborhoods: formData.neighborhoods.filter((_, i) => i !== index)
                      });
                    }}>
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services & Pricing Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            Services & Pricing
          </h2>
          <div className="space-y-6">
            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                  className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your hourly rate"
                />
              </div>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Services</label>
              <div className="space-y-2">
                {plumbingServices.map((service, index) => (
                  <label 
                    key={index} 
                    className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded-lg cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedServices([...selectedServices, service]);
                        } else {
                          setSelectedServices(selectedServices.filter(s => s !== service));
                        }
                      }}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{service}</span>
                  </label>
                ))}
              </div>

              {/* Custom Service Addition */}
              <div className="mt-6">
                <button 
                  onClick={() => setCustomServices([...customServices, ''])}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Custom Service</span>
                </button>
                {customServices.map((service, index) => (
                  <div key={index} className="mt-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const newServices = [...customServices];
                        newServices[index] = e.target.value;
                        setCustomServices(newServices);
                      }}
                      className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter custom service"
                    />
                    <button
                      onClick={() => setCustomServices(customServices.filter((_, i) => i !== index))}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Certifications */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Certifications</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Boiler Brands */}
                <div>
                  <h4 className="text-sm text-gray-600 mb-2">Boiler Brands</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add boiler brand certification"
                      className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      className="absolute right-2 top-2 text-blue-600 hover:text-blue-700"
                      onClick={() => {/* Add boiler brand */}}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {boilerBrands.map((brand, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm"
                      >
                        {brand}
                        <button onClick={() => setBoilerBrands(boilerBrands.filter((_, i) => i !== index))}>
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* AC Brands */}
                <div>
                  <h4 className="text-sm text-gray-600 mb-2">Air Conditioning Brands</h4>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Add AC brand certification"
                      className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                      className="absolute right-2 top-2 text-blue-600 hover:text-blue-700"
                      onClick={() => {/* Add AC brand */}}
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {acBrands.map((brand, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {brand}
                        <button onClick={() => setAcBrands(acBrands.filter((_, i) => i !== index))}>
                          <X className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Schedule Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Service Schedule
          </h2>
          <div className="bg-white border rounded-xl p-6 space-y-4">
            {/* Service Type Selection */}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">Service Type</h3>
                <p className="text-sm text-gray-600">Select your service availability type</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFormData({
                    ...formData,
                    serviceType: 'regular'
                  })}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    formData.serviceType === 'regular'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 border'
                  }`}
                >
                  Regular
                </button>
                <button
                  onClick={() => setFormData({
                    ...formData,
                    serviceType: 'emergency'
                  })}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    formData.serviceType === 'emergency'
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-gray-50 text-gray-700 border'
                  }`}
                >
                  Emergency
                </button>
              </div>
            </div>

            {/* Schedule Content based on service type */}
            {formData.serviceType === 'regular' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label
                        key={day}
                        className="flex items-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.regularServices.availability.days.includes(day)}
                          onChange={(e) => {
                            const days = e.target.checked
                              ? [...formData.regularServices.availability.days, day]
                              : formData.regularServices.availability.days.filter(d => d !== day);
                            setFormData({
                              ...formData,
                              regularServices: {
                                ...formData.regularServices,
                                availability: {
                                  ...formData.regularServices.availability,
                                  days
                                }
                              }
                            });
                          }}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Regular Service Time Inputs */}
<div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-medium text-gray-700">Start Time</label>
    <input
      type="time"
      value={formData?.regularServices?.availability?.hours?.start || '08:00'}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        regularServices: {
          ...prev.regularServices,
          availability: {
            ...prev.regularServices?.availability,
            hours: {
              ...prev.regularServices?.availability?.hours,
              start: e.target.value
            }
          }
        }
      }))}
      className="mt-1 w-full p-2 border rounded-lg"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700">End Time</label>
    <input
      type="time"
      value={formData?.regularServices?.availability?.hours?.end || '18:00'}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        regularServices: {
          ...prev.regularServices,
          availability: {
            ...prev.regularServices?.availability,
            hours: {
              ...prev.regularServices?.availability?.hours,
              end: e.target.value
            }
          }
        }
      }))}
      className="mt-1 w-full p-2 border rounded-lg"
    />
  </div>
</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-red-700 mb-1">Response Time</label>
                    <select 
                      value={formData.emergencyServices.responseTime}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyServices: {
                          ...formData.emergencyServices,
                          responseTime: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                    >
                      <option value="immediate">Immediate (Within 5 minutes)</option>
                      <option value="15">Within 15 minutes</option>
                      <option value="30">Within 30 minutes</option>
                      <option value="60">Within 1 hour</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-red-700 mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.emergencyServices.whatsAppNumber}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyServices: {
                          ...formData.emergencyServices,
                          whatsAppNumber: e.target.value
                        }
                      })}
                      className="w-full p-2 border rounded-lg"
                      placeholder="+1 (XXX) XXX-XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-red-700 mb-1">Emergency Available Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label
                        key={day}
                        className="flex items-center p-2 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.emergencyServices.availability.days.includes(day)}
                          onChange={(e) => {
                            const days = e.target.checked
                              ? [...formData.emergencyServices.availability.days, day]
                              : formData.emergencyServices.availability.days.filter(d => d !== day);
                            setFormData({
                              ...formData,
                              emergencyServices: {
                                ...formData.emergencyServices,
                                availability: {
                                  ...formData.emergencyServices.availability,
                                  days
                                }
                              }
                            });
                          }}
                          className="h-4 w-4 text-red-600 rounded"
                        />
                        <span className="ml-2 text-sm text-red-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Business Description */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Business Description
          </h2>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Describe your business, experience, and specialties..."
          />
        </section>

        {/* Account Verification Notice */}
        <section className="mb-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Shield className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium text-amber-800 mb-2">Account Verification</h3>
                <p className="text-sm text-amber-700 mb-4">
                  To maintain quality standards, we may request additional verification documents:
                </p>
                <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                  <li>Business registration or Chamber of Commerce certificate</li>
                  <li>Proof of address</li>
                  <li>Professional licenses and certifications</li>
                  <li>Insurance documentation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Profile
          </button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <SharedFooter />
    </div>
  );
};

export default ProfessionalPlumberProfile;