import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import {
  FileText, DollarSign, MapPin, Globe,
  Shield, Clock, Building, Upload, PenToolIcon,
  Search, Briefcase, AlertCircle,
  TextSelectionIcon
} from 'lucide-react';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const PostJobPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    requestType: '', // 'quote' or 'hire'
    serviceLocation: '', // 'local' or 'international'
    urgency: 'normal', // 'normal' or 'emergency'
    category: '',
    title: '',
    description: '',
    budget: '',
    timeline: '',
    location: {
      address: '',
      city: '',
      province: '',
      postcode: ''
    }
  });

  const localCategories = [
    { id: 'plumbing', icon: TextSelectionIcon, label: 'Plumbing Services' },
    { id: 'electrical', icon: TextSelectionIcon, label: 'Electrical Work' },
    { id: 'cleaning', icon: TextSelectionIcon, label: 'Cleaning Services' },
    { id: 'accounting', icon: FileText, label: 'Local Accounting' },
    { id: 'legal', icon: FileText, label: 'Legal Services' },
    { id: 'gardening', icon: TextSelectionIcon, label: 'Gardening & Landscaping' }
  ];

  const internationalCategories = [
    { id: 'dev', icon: Globe, label: 'Software Development' },
    { id: 'design', icon: TextSelectionIcon, label: 'Design Services' },
    { id: 'consulting', icon: Briefcase, label: 'Business Consulting' },
    { id: 'legal', icon: FileText, label: 'International Legal' },
    { id: 'marketing', icon: Globe, label: 'Digital Marketing' },
    { id: 'finance', icon: DollarSign, label: 'Financial Services' }
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">What would you like to do?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-6 cursor-pointer transition-all ${
            formData.requestType === 'quote' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => {
            setFormData({...formData, requestType: 'quote'});
            setStep(2);
          }}
        >
          <div className="space-y-3">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-lg">Get Quotes</h3>
            <p className="text-sm text-gray-600">
              Receive competitive quotes from multiple professionals
            </p>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${
            formData.requestType === 'hire' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => {
            setFormData({...formData, requestType: 'hire'});
            setStep(2);
          }}
        >
          <div className="space-y-3">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-lg">Hire Professional</h3>
            <p className="text-sm text-gray-600">
              Directly hire your preferred professional
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Where do you need the service?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-6 cursor-pointer transition-all ${
            formData.serviceLocation === 'local' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => {
            setFormData({...formData, serviceLocation: 'local'});
            setStep(3);
          }}
        >
          <div className="space-y-3">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-lg">Local Service</h3>
            <p className="text-sm text-gray-600">
              Find professionals in your area for in-person services
            </p>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer transition-all ${
            formData.serviceLocation === 'international' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
          }`}
          onClick={() => {
            setFormData({...formData, serviceLocation: 'international'});
            setStep(3);
          }}
        >
          <div className="space-y-3">
            <Globe className="h-8 w-8 text-blue-600" />
            <h3 className="font-semibold text-lg">International Service</h3>
            <p className="text-sm text-gray-600">
              Access global expertise and remote services
            </p>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Service Type & Urgency</h2>
      
      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Select Category</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(formData.serviceLocation === 'local' ? localCategories : internationalCategories)
            .map(category => (
              <Card 
                key={category.id}
                className={`p-4 cursor-pointer transition-all ${
                  formData.category === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setFormData({...formData, category: category.id})}
              >
                <div className="flex items-center gap-3">
                  <category.icon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">{category.label}</span>
                </div>
              </Card>
          ))}
        </div>
      </div>

      {/* Urgency Selection */}
      <div>
        <label className="block text-sm font-medium mb-2">Service Urgency</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card 
            className={`p-4 cursor-pointer transition-all ${
              formData.urgency === 'normal' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFormData({...formData, urgency: 'normal'})}
          >
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Normal Service</p>
                <p className="text-sm text-gray-600">Standard response time</p>
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer transition-all ${
              formData.urgency === 'emergency' ? 'ring-2 ring-red-500 bg-red-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFormData({...formData, urgency: 'emergency'})}
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium">Emergency Service</p>
                <p className="text-sm text-gray-600">Immediate assistance needed</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {formData.category && (
        <div className="flex justify-end">
          <Button onClick={() => setStep(4)}>Continue</Button>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Service Details</h2>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full p-3 border rounded-lg"
          placeholder="Brief title for your request"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          className="w-full p-3 border rounded-lg"
          placeholder="Describe what you need..."
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium mb-2">Budget</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
            className="w-full pl-10 p-3 border rounded-lg"
            placeholder="Enter your budget"
          />
        </div>
      </div>

      {formData.serviceLocation === 'local' && (
        <div>
          <label className="block text-sm font-medium mb-2">Location Details</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.location.address}
              onChange={(e) => setFormData({
                ...formData,
                location: {...formData.location, address: e.target.value}
              })}
              className="p-3 border rounded-lg"
              placeholder="Street Address"
            />
            <input
              type="text"
              value={formData.location.city}
              onChange={(e) => setFormData({
                ...formData,
                location: {...formData.location, city: e.target.value}
              })}
              className="p-3 border rounded-lg"
              placeholder="City"
            />
            <input
              type="text"
              value={formData.location.province}
              onChange={(e) => setFormData({
                ...formData,
                location: {...formData.location, province: e.target.value}
              })}
              className="p-3 border rounded-lg"
              placeholder="Province"
            />
            <input
              type="text"
              value={formData.location.postcode}
              onChange={(e) => setFormData({
                ...formData,
                location: {...formData.location, postcode: e.target.value}
              })}
              className="p-3 border rounded-lg"
              placeholder="Postal Code"
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <Button>
          {formData.requestType === 'quote' 
            ? 'Request Quotes' 
            : formData.urgency === 'emergency'
            ? 'Request Emergency Service'
            : 'Continue to Hiring'}
        </Button>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((stepNumber) => (
        <React.Fragment key={stepNumber}>
          <div 
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              stepNumber === step 
                ? 'bg-blue-600 text-white'
                : stepNumber < step
                ? 'bg-green-100 text-green-600'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {stepNumber < step ? '✓' : stepNumber}
          </div>
          {stepNumber < 4 && (
            <div 
              className={`w-12 h-1 ${
                stepNumber < step ? 'bg-green-100' : 'bg-gray-100'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader5 />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {renderStepIndicator()}
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </main>

      <SharedFooter2 />
    </div>
  );
};

export default PostJobPage;