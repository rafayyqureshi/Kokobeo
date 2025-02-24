import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Upload, Camera, Building, MapPin, Globe, Mail,
  Phone, Link as LinkIcon, Shield, AlertCircle, Check,
  Plus, X, ChevronRight, Info
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';
import { VatNumberInput } from '../pages/Main/VatNumberInput';

const ClientRegistration = () => {
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isCompany, setIsCompany] = useState(null);
  
  const [formData, setFormData] = useState({
    accountType: '', // 'personal' or 'company'
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      title: '',
      bio: '',
      languages: []
    },
    company: {
      name: '',
      vatNumber: '',
      size: '',
      industry: '',
      website: '',
      description: '',
      address: {
        street: '',
        city: '',
        postcode: '',
        country: ''
      }
    },
    preferences: {
      localServices: false,
      professionalServices: false,
      emergencyServices: false,
      preferredLanguages: [],
      serviceAreas: []
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      website: ''
    }
  });

  // Available languages for selection
  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' }
  ];

  // Company sizes
  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  // Industries
  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Manufacturing',
    'Retail',
    'Construction',
    'Other'
  ];

  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfileImage(reader.result);
        } else {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep1 = () => (
    <Card className="p-6" style={{ textAlign: 'left' }}>
      <h2 className="text-xl font-semibold mb-6">Account Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ textAlign: 'left' }}>
        <button
          onClick={() => {
            setIsCompany(false);
            setFormData(prev => ({ ...prev, accountType: 'personal' }));
          }}
          className={`p-6 rounded-lg border-2 transition-colors ${
            formData.accountType === 'personal'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <User className="h-8 w-8 mb-2 text-blue-600" />
          <h3 className="font-medium text-lg mb-2">Individual Account</h3>
          <p className="text-sm text-gray-600">
            For personal use and hiring professionals for your needs
          </p>
        </button>

        <button
          onClick={() => {
            setIsCompany(true);
            setFormData(prev => ({ ...prev, accountType: 'company' }));
          }}
          className={`p-6 rounded-lg border-2 transition-colors ${
            formData.accountType === 'company'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <Building className="h-8 w-8 mb-2 text-blue-600" />
          <h3 className="font-medium text-lg mb-2">Company Account</h3>
          <p className="text-sm text-gray-600">
            For businesses looking to hire professionals and manage projects
          </p>
        </button>
      </div>
    </Card>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Profile & Cover Images */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Profile Images</h2>
        <div className="space-y-6">
          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e, 'profile')}
                    accept="image/*"
                  />
                </label>
              </div>
              <div className="text-sm text-gray-600">
                <p className="font-medium">Profile photo</p>
                <p>PNG or JPG, max 2MB</p>
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Cover Photo</label>
            <div className="relative">
              <div className="aspect-[3/1] rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">Click to upload cover image</p>
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageUpload(e, 'cover')}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isCompany ? (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <input
                  type="text"
                  value={formData.company.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    company: { ...prev.company, name: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <VatNumberInput
                  value={formData.company.vatNumber}
                  onChange={(value) => setFormData(prev => ({
                    ...prev,
                    company: { ...prev.company, vatNumber: value }
                  }))}
                  country="IT"
                  required={true}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company Size</label>
                <select
                  value={formData.company.size}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    company: { ...prev.company, size: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Industry</label>
                <select
                  value={formData.company.industry}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    company: { ...prev.company, industry: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.personal.firstName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, firstName: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.personal.lastName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, lastName: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Professional Title</label>
                <input
                  type="text"
                  value={formData.personal.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    personal: { ...prev.personal, title: e.target.value }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Project Manager"
                />
              </div>
            </>
          )}

          {/* Common fields for both types */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={isCompany ? formData.company.email : formData.personal.email}
              onChange={(e) => {
                const newValue = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  [isCompany ? 'company' : 'personal']: {
                    ...prev[isCompany ? 'company' : 'personal'],
                    email: newValue
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              value={isCompany ? formData.company.phone : formData.personal.phone}
              onChange={(e) => {
                const newValue = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  [isCompany ? 'company' : 'personal']: {
                    ...prev[isCompany ? 'company' : 'personal'],
                    phone: newValue
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>
        </div>
      </Card>

      {/* Description */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Description</h2>
        <div>
          <textarea
            value={isCompany ? formData.company.description : formData.personal.bio}
            onChange={(e) => {
              const newValue = e.target.value;
              setFormData(prev => ({
                ...prev,
                [isCompany ? 'company' : 'personal']: {
                  ...prev[isCompany ? 'company' : 'personal'],
                  [isCompany ? 'description' : 'bio']: newValue
                }
              }));
            }}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            placeholder={isCompany ? 
              "Describe your company and what kind of services you're looking for..." :
              "Tell us about yourself and what kind of services you're interested in..."
            }
          />
        </div>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Location Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Location & Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
          <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
              type="text"
              value={formData.company.address.street}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                company: {
                  ...prev.company,
                  address: { ...prev.company.address, street: e.target.value }
                }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              value={formData.company.address.city}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                company: {
                  ...prev.company,
                  address: { ...prev.company.address, city: e.target.value }
                }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              value={formData.company.address.postcode}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                company: {
                  ...prev.company,
                  address: { ...prev.company.address, postcode: e.target.value }
                }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter postal code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              value={formData.company.address.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                company: {
                  ...prev.company,
                  address: { ...prev.company.address, country: e.target.value }
                }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country"
            />
          </div>
        </div>
      </Card>

      {/* Service Preferences */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Service Preferences</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.preferences.localServices}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  localServices: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Local Services (Plumbing, Electrical, etc.)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.preferences.professionalServices}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  professionalServices: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Professional Services (Development, Design, etc.)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.preferences.emergencyServices}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: {
                  ...prev.preferences,
                  emergencyServices: e.target.checked
                }
              }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Emergency Services</span>
          </label>

          {/* Preferred Languages */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Preferred Languages</label>
            <div className="flex flex-wrap gap-2">
              {availableLanguages.map((language) => (
                <label
                  key={language.code}
                  className={`px-3 py-1.5 rounded-full border cursor-pointer ${
                    formData.preferences.preferredLanguages.includes(language.code)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={formData.preferences.preferredLanguages.includes(language.code)}
                    onChange={(e) => {
                      const updatedLanguages = e.target.checked
                        ? [...formData.preferences.preferredLanguages, language.code]
                        : formData.preferences.preferredLanguages.filter(code => code !== language.code);
                      setFormData(prev => ({
                        ...prev,
                        preferences: {
                          ...prev.preferences,
                          preferredLanguages: updatedLanguages
                        }
                      }));
                    }}
                  />
                  <span>{language.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Social Links */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Social Links</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input
              type="url"
              value={formData.socialLinks.linkedin}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Twitter Profile</label>
            <input
              type="url"
              value={formData.socialLinks.twitter}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: e.target.value }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://twitter.com/username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Website</label>
            <input
              type="url"
              value={formData.socialLinks.website}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, website: e.target.value }
              }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="https://your-website.com"
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      default:
        return null;
    }
  };

  const handleSubmit = async () => {
    // Handle form submission
    console.log('Form submitted:', formData);
    // Add your API call here
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Set up your profile to start hiring professionals</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>

            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                  stepNumber <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Account Type</span>
            <span className="text-sm font-medium">Profile Details</span>
            <span className="text-sm font-medium">Additional Info</span>
          </div>
        </div>

        {/* Form Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
            >
              Previous
            </Button>
          )}

          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="ml-auto"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              Complete Registration
            </Button>
          )}
        </div>
      </main>

      <br />
      <br />
      <br />
      <br />

      <SharedFooter2 />
    </div>
  );
};

export default ClientRegistration;