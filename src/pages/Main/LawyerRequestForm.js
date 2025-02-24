import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Clock, Calendar, DollarSign, 
  Scale, Users, Flag, Globe, Upload, X,
  Languages, User, Shield, MessageSquare,
  Bell, ChevronDown, Home, Menu
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import SharedFooter from '../../Footer/SharedFooter';
import SharedHeader from '../../Headers/SharedHeader';

const LawyerRequestForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [customService, setCustomService] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Project Info
    requestType: '', // quote, hire, both, information
    projectTitle: '',
    practiceArea: [],
    expertise: [],
    location: {
      country: '',
      language: []
    },

    // Step 2: Project Details
    projectScope: {
      description: '',
      timeline: '',
      budget: {
        type: 'fixed', // or 'hourly'
        amount: '',
        currency: 'USD'
      }
    },

    // Step 3: Requirements & Documents
    requirements: {
      experience: '',
      qualifications: [],
      languages: [],
      documents: []
    }
  });

  // List of practice areas
  const practiceAreas = [
    'Corporate Law',
    'International Business Law',
    'Intellectual Property',
    'Contract Law',
    'Tax Law',
    'Immigration Law',
    'Employment Law',
    'Commercial Law',
    'International Trade Law',
    'Mergers & Acquisitions',
    'Real Estate Law',
    'Banking & Finance Law'
  ];

  // List of languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'nl', name: 'Dutch', flag: '🇳🇱' }
  ];

  // Step validation
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return (
          formData.requestType &&
          formData.projectTitle &&
          formData.practiceArea.length > 0
        );
      case 2:
        return (
          formData.projectScope.description &&
          formData.projectScope.timeline &&
          formData.projectScope.budget.amount
        );
      case 3:
        return (
          formData.requirements.experience &&
          formData.requirements.languages.length > 0
        );
      default:
        return false;
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 3 && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">What do you need?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Get Quotes', 'Hire Directly', 'Both Options', 'Information Only'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ 
                      ...formData, 
                      requestType: type.toLowerCase() 
                    })}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      formData.requestType === type.toLowerCase()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <h3 className="font-medium">{type}</h3>
                    <p className="text-sm text-gray-500">
                      {type === 'Get Quotes' 
                        ? 'Receive up to 5 quotes' 
                        : type === 'Hire Directly'
                        ? 'Browse and hire lawyers'
                        : type === 'Both Options'
                        ? 'Get quotes and hire'
                        : 'Request information'
                      }
                    </p>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Title</h2>
              <input
                type="text"
                value={formData.projectTitle}
                onChange={(e) => setFormData({
                  ...formData,
                  projectTitle: e.target.value
                })}
                placeholder="E.g., International Contract Review & Negotiation"
                className="w-full p-3 border rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-500">
                This will be displayed to lawyers searching for work
              </p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Practice Area</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {practiceAreas.map((area) => (
                  <label
                    key={area}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.practiceArea.includes(area)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.practiceArea.includes(area)}
                      onChange={(e) => {
                        const areas = e.target.checked
                          ? [...formData.practiceArea, area]
                          : formData.practiceArea.filter(a => a !== area);
                        setFormData({
                          ...formData,
                          practiceArea: areas
                        });
                      }}
                      className="sr-only"
                    />
                    <span className="text-sm">{area}</span>
                  </label>
                ))}
                
                <button
                  onClick={() => setShowCustomInput(true)}
                  className="flex items-center p-3 rounded-lg border border-dashed border-gray-300 hover:border-blue-300 text-blue-500 cursor-pointer"
                >
                  <span className="text-sm">+ Add Custom Service</span>
                </button>

                {showCustomInput && (
                  <div className="col-span-full flex items-center gap-2 p-3 rounded-lg border border-gray-200">
                    <input
                      type="text"
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      placeholder="Enter custom service"
                      className="flex-1 p-2 border rounded"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        if (customService.trim()) {
                          setFormData({
                            ...formData,
                            practiceArea: [...formData.practiceArea, customService.trim()]
                          });
                          setCustomService('');
                          setShowCustomInput(false);
                        }
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => {
                        setShowCustomInput(false);
                        setCustomService('');
                      }}
                      className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Description</h2>
              <textarea
                value={formData.projectScope.description}
                onChange={(e) => setFormData({
                  ...formData,
                  projectScope: {
                    ...formData.projectScope,
                    description: e.target.value
                  }
                })}
                rows={6}
                className="w-full p-3 border rounded-lg"
                placeholder="Describe your legal needs in detail..."
              />
              <div className="mt-4 bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Tips for a great description:</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Specify the type of legal assistance needed</li>
                  <li>• Mention any specific jurisdictions involved</li>
                  <li>• Include relevant deadlines or timelines</li>
                  <li>• List any specific requirements or qualifications</li>
                  <li>• Mention language requirements if any</li>
                </ul>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Budget</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Budget Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        projectScope: {
                          ...formData.projectScope,
                          budget: { ...formData.projectScope.budget, type: 'fixed' }
                        }
                      })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.projectScope.budget.type === 'fixed'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <h3 className="font-medium">Fixed Price</h3>
                      <p className="text-sm text-gray-500">Pay a fixed amount</p>
                    </button>
                    <button
                      onClick={() => setFormData({
                        ...formData,
                        projectScope: {
                          ...formData.projectScope,
                          budget: { ...formData.projectScope.budget, type: 'hourly' }
                        }
                      })}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        formData.projectScope.budget.type === 'hourly'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <h3 className="font-medium">Hourly Rate</h3>
                      <p className="text-sm text-gray-500">Pay by the hour</p>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.projectScope.budget.amount}
                        onChange={(e) => setFormData({
                          ...formData,
                          projectScope: {
                            ...formData.projectScope,
                            budget: { 
                              ...formData.projectScope.budget, 
                              amount: e.target.value 
                            }
                          }
                        })}
                        className="w-full pl-8 pr-4 py-2 border rounded-lg"
                        placeholder={formData.projectScope.budget.type === 'hourly' ? "Hourly rate" : "Total budget"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Currency</label>
                    <select
                      value={formData.projectScope.budget.currency}
                      onChange={(e) => setFormData({
                        ...formData,
                        projectScope: {
                          ...formData.projectScope,
                          budget: { 
                            ...formData.projectScope.budget, 
                            currency: e.target.value 
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Timeline</h2>
              <div>
                <select
                  value={formData.projectScope.timeline}
                  onChange={(e) => setFormData({
                    ...formData,
                    projectScope: {
                      ...formData.projectScope,
                      timeline: e.target.value
                    }
                  })}
                  className="w-full p-3 border rounded-lg"
                >
                  <option value="">Select project duration</option>
                  <option value="less_than_1_month">Less than 1 month</option>
                  <option value="1_to_3_months">1 to 3 months</option>
                  <option value="3_to_6_months">3 to 6 months</option>
                  <option value="more_than_6_months">More than 6 months</option>
                </select>
              </div>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Required Experience</h2>
              <select
                value={formData.requirements.experience}onChange={(e) => setFormData({
                  ...formData,
                  requirements: {
                    ...formData.requirements,
                    experience: e.target.value
                  }
                })}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select required experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="intermediate">Intermediate (3-5 years)</option>
                <option value="expert">Expert (5-10 years)</option>
                <option value="specialist">Specialist (10+ years)</option>
              </select>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Language Requirements</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {languages.map((lang) => (
                  <label
                    key={lang.code}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.requirements.languages.includes(lang.code)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.requirements.languages.includes(lang.code)}
                      onChange={(e) => {
                        const langs = e.target.checked
                          ? [...formData.requirements.languages, lang.code]
                          : formData.requirements.languages.filter(code => code !== lang.code);
                        setFormData({
                          ...formData,
                          requirements: {
                            ...formData.requirements,
                            languages: langs
                          }
                        });
                      }}
                      className="sr-only"
                    />
                    <span className="mr-2">{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </label>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Documents</h2>
              <div className="space-y-4">
                <input
                  type="file"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData({
                      ...formData,
                      requirements: {
                        ...formData.requirements,
                        documents: [...formData.requirements.documents, ...files]
                      }
                    });
                  }}
                  multiple
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Click to upload supporting documents
                  </span>
                </label>

                {formData.requirements.documents.length > 0 && (
                  <div className="space-y-2">
                    {formData.requirements.documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-600">{file.name}</span>
                        <button
                          onClick={() => {
                            const newDocs = formData.requirements.documents.filter((_, i) => i !== index);
                            setFormData({
                              ...formData,
                              requirements: {
                                ...formData.requirements,
                                documents: newDocs
                              }
                            });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader />

      <div className="max-w-4xl mx-auto pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Request a Lawyer</h1>
          <p className="mt-2 text-gray-600">Fill in the details below to find the right legal professional for your needs</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>

            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
                  step <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-sm font-medium">Basics</span>
            <span className="text-sm font-medium">Details</span>
            <span className="text-sm font-medium">Requirements</span>
          </div>
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            variant="outline"
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => {
                console.log('Form submitted:', formData);
              }}
              disabled={!isStepValid(currentStep)}
            >
              Post Project
            </Button>
          )}
        </div>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <SharedFooter />
    </div>
  );
};

export default LawyerRequestForm;