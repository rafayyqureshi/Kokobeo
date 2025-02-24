import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Shield,
    MapPin,
    Phone,
    Mail,
    Award,  // Changed from Certificate to Award
    Upload,
    WhatsappIcon,
    Building,
    User,
    Info,
    AlertCircle,
  } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import SharedHeader from '../../Headers/SharedHeader';
import SharedFooter from '../../Footer/SharedFooter';

const PlumberProfile = () => {
  const [formData, setFormData] = useState({
    companyInfo: {
      name: '',
      address: '',
      streetNumber: '',
      industrialZone: '',
      postcode: '',
    },
    ownerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      whatsApp: '', // Mandatory for emergency services
    },
    businessDescription: '',
    serviceAreas: [],
    customAreas: [], // For manually added areas
    emergencyServices: false,
    licenses: [],
    certifications: [],
    documentsVerified: false
  });

  const [newArea, setNewArea] = useState('');
  const [newLicense, setNewLicense] = useState({
    name: '',
    number: '',
    expiryDate: '',
    document: null
  });

  // Area selection component
  const AreaSelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleAreaSearch = (term) => {
      // This would be connected to a proper location API
      // For now using mock data
      const mockSuggestions = [
        'North Toronto',
        'East Toronto',
        'Downtown Toronto',
        'Scarborough',
        'Etobicoke'
      ].filter(area => 
        area.toLowerCase().includes(term.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    };

    return (
      <div className="space-y-4" >
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleAreaSearch(e.target.value);
            }}
            placeholder="Search areas..."
            className="w-full px-4 py-2 border rounded-lg"
          />
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
              {suggestions.map((area) => (
                <button
                  key={area}
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      serviceAreas: [...prev.serviceAreas, area]
                    }));
                    setSearchTerm('');
                    setSuggestions([]);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                >
                  {area}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Custom area tag input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Add custom area..."
            className="flex-1 px-4 py-2 border rounded-lg"
          />
          <Button
            onClick={() => {
              if (newArea.trim()) {
                setFormData(prev => ({
                  ...prev,
                  customAreas: [...prev.customAreas, newArea.trim()]
                }));
                setNewArea('');
              }
            }}
          >
            Add
          </Button>
        </div>

        {/* Selected Areas Display */}
        <div className="flex flex-wrap gap-2">
          {formData.serviceAreas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full"
            >
              <span>{area}</span>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    serviceAreas: prev.serviceAreas.filter(a => a !== area)
                  }));
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                ×
              </button>
            </div>
          ))}
          {formData.customAreas.map((area) => (
            <div
              key={area}
              className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
            >
              <span>{area}</span>
              <button
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    customAreas: prev.customAreas.filter(a => a !== area)
                  }));
                }}
                className="text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader />
      <div className="max-w-4xl mx-auto pt-6">
        <h1 className="text-3xl font-bold text-center mb-8">Professional Profile Setup</h1>

        {/* Company Information */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                value={formData.companyInfo.name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  companyInfo: { ...prev.companyInfo, name: e.target.value }
                }))}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street Number</label>
                <input
                  type="text"
                  placeholder="e.g., 112 E"
                  value={formData.companyInfo.streetNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, streetNumber: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Industrial Zone</label>
                <input
                  type="text"
                  placeholder="Industrial Zone (if applicable)"
                  value={formData.companyInfo.industrialZone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, industrialZone: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  value={formData.companyInfo.address}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, address: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  (Only visible after quote purchase or hiring)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Postcode</label>
                <input
                  type="text"
                  value={formData.companyInfo.postcode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, postcode: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Owner Information */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5" />
            Owner Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.ownerInfo.firstName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ownerInfo: { ...prev.ownerInfo, firstName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.ownerInfo.lastName}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ownerInfo: { ...prev.ownerInfo, lastName: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.ownerInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ownerInfo: { ...prev.ownerInfo, email: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  (Only visible after quote purchase or hiring)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.ownerInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ownerInfo: { ...prev.ownerInfo, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <p className="mt-1 text-sm text-gray-500">
                  (Only visible after quote purchase or hiring)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Description */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5" />
            Business Description
          </h2>
          <div>
            <textarea
              value={formData.businessDescription}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                businessDescription: e.target.value
              }))}
              rows={4}
              placeholder="Describe your services and expertise in detail..."
              className="w-full px-4 py-2 border rounded-lg"
            />
            <p className="mt-1 text-sm text-gray-500">
              This description will be visible on your profile and to customers
            </p>
          </div>
        </Card>

        {/* Service Areas */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Service Areas
          </h2>
          <AreaSelector />
        </Card>

        {/* Emergency Services */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Emergency Services
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.emergencyServices}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  emergencyServices: e.target.checked
                }))}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>Offer emergency services</span>
            </label>

            {formData.emergencyServices && (
              <div>
                <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.ownerInfo.whatsApp}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    ownerInfo: { ...prev.ownerInfo, whatsApp: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  Required for receiving emergency service requests
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Licenses & Certifications */}
        <Card className="p-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5" />
            Licenses & Certifications
          </h2>
          
          {/* Add new license form */}
          <div className="space-y-4 mb-6">
            <input
              type="text"
              placeholder="License/Certification Name"
              value={newLicense.name}
              onChange={(e) => setNewLicense(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="w-full px-4 py-2 border rounded-lg"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="License Number"
                value={newLicense.number}
                onChange={(e) => setNewLicense(prev => ({
                    ...prev,
                    number: e.target.value
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                
                <input
                  type="date"
                  value={newLicense.expiryDate}
                  onChange={(e) => setNewLicense(prev => ({
                    ...prev,
                    expiryDate: e.target.value
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
  
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Upload license/certification document
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setNewLicense(prev => ({
                      ...prev,
                      document: e.target.files?.[0] || null
                    }))}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              </div>
  
              <Button
                onClick={() => {
                  if (newLicense.name && newLicense.document) {
                    setFormData(prev => ({
                      ...prev,
                      licenses: [...prev.licenses, newLicense]
                    }));
                    setNewLicense({
                      name: '',
                      number: '',
                      expiryDate: '',
                      document: null
                    });
                  }
                }}
                className="w-full"
                disabled={!newLicense.name || !newLicense.document}
              >
                Add License/Certification
              </Button>
            </div>
  
            {/* Display added licenses */}
            <div className="space-y-4">
              {formData.licenses.map((license, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{license.name}</h3>
                    <p className="text-sm text-gray-500">
                      {license.number} • Expires: {license.expiryDate}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        licenses: prev.licenses.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </Card>
  
          {/* Verification Notice */}
          <Card className="p-6 bg-yellow-50" style={{ textAlign: 'left' }}>
            <div className="flex items-start gap-4">
              <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-yellow-800">Verification Notice</h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Please note that we may require additional verification in the future, including:
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                  <li>Phone number verification</li>
                  <li>Proof of residence</li>
                  <li>Chamber of Commerce certificate</li>
                  <li>Other relevant documentation</li>
                </ul>
              </div>
            </div>
          </Card>
          <br></br>
  
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              onClick={() => {
                // Handle form submission
                console.log('Form submitted:', formData);
              }}
              className="px-8 py-3"
            >
              Complete Profile
            </Button>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <SharedFooter/>
      </div>
    );
  };
  
  export default PlumberProfile;