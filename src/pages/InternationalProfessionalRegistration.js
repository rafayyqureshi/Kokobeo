import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building, User, Globe, Languages, Mail, Phone,
  MapPin, Shield, Star, FileText, Upload, Link,
  Clock, Calendar, DollarSign, Book,
  Smartphone, Check, AlertCircle, Plus, X, Camera, Award,
  BriefcaseBusinessIcon
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import SharedHeader from '../Headers/SharedHeader';
import SharedFooter from '../Footer/SharedFooter';
import { VatNumberInput } from './Main/VatNumberInput';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const InternationalProfessionalRegistration = () => {
  // State management
  const [formData, setFormData] = useState({
    basicInfo: {
      // Company/Individual Info
      companyName: '',
      vatNumber: '',
      individualName: '',
      surname: '',
      email: '',
      phone: '',
      whatsapp: '',
      website: '',

      // Location Info
      country: '',
      city: '',
      timezone: '',

      // Professional Details
      professionalTitle: '', // e.g., "Senior Full Stack Developer"
      yearsOfExperience: '',
      languages: [], // Professional languages
      description: '', // Limited to 500 chars
      hourlyRate: '',
      availability: 'full-time', // full-time, part-time, contract
    },

    expertise: {
      primarySkills: [], // Main professional skills
      secondarySkills: [], // Additional skills
      certifications: [], // Professional certifications
      specializations: [], // Areas of specialization
    },

    workPreferences: {
      serviceTypes: [], // e.g., "Development", "Consulting"
      workingHours: {
        timezone: '',
        availability: {
          monday: { start: '09:00', end: '17:00', available: true },
          tuesday: { start: '09:00', end: '17:00', available: true },
          wednesday: { start: '09:00', end: '17:00', available: true },
          thursday: { start: '09:00', end: '17:00', available: true },
          friday: { start: '09:00', end: '17:00', available: true },
          saturday: { start: '', end: '', available: false },
          sunday: { start: '', end: '', available: false }
        }
      },
      preferredProjectLength: [], // short-term, long-term
      remoteWork: true,
    },

    portfolio: {
      projects: [], // Past projects
      githubProfile: '',
      linkedinProfile: '',
      portfolioWebsite: '',
      samples: [] // Work samples
    },

    verification: {
      identityVerified: false,
      documentsSubmitted: false,
      professionalCertificates: [],
      backgroundCheck: false
    }
  });

  // Available service categories for international professionals
  const serviceCategories = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'DevOps Engineering',
    'Cloud Architecture',
    'Data Science',
    'AI/Machine Learning',
    'Blockchain Development',
    'Technical Writing',
    'Software Architecture',
    'Database Administration',
    'Legal Consulting',
    'Financial Advisory',
    'Business Consulting',
    'Digital Marketing',
    'Translation Services',
    'Content Writing',
    'Market Research',
    'Tax Consulting',
    'Business Analysis'
  ];

  // Primary skills based on service category
  const skillsByCategory = {
    'Web Development': [
      'React', 'Angular', 'Vue.js', 'Node.js', 'Python',
      'PHP', 'Ruby on Rails', 'ASP.NET', 'Java Spring',
      'GraphQL', 'REST API', 'MongoDB', 'PostgreSQL'
    ],
    'Mobile Development': [
      'React Native', 'Flutter', 'iOS Swift', 'Android Kotlin',
      'Xamarin', 'Mobile UI Design', 'App Performance',
      'Mobile Security', 'Cross-Platform Development'
    ],
    // Add more categories as needed
  };

  // Available languages
  const availableLanguages = [
    { code: 'en', name: 'English', levels: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'] },
    { code: 'es', name: 'Spanish', levels: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'] },
    { code: 'fr', name: 'French', levels: ['Native', 'Fluent', 'Professional', 'Intermediate', 'Basic'] },
    // Add more languages as needed
  ];

  // Project length options
  const projectLengths = [
    { value: 'short', label: 'Short Term (< 3 months)' },
    { value: 'medium', label: 'Medium Term (3-6 months)' },
    { value: 'long', label: 'Long Term (6+ months)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader4 />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">International Professional Registration</h1>
          <p className="mt-2 text-gray-600">Register as an international professional to offer your services globally</p>
        </div>

        {/* Basic Information */}
        <Card className="p-6 mb-6" >
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Basic Information
          </h2>

          <div className="space-y-6" >
            {/* Business Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Are you registering as a company or individual?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      registrationType: 'company'
                    }
                  }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.basicInfo.registrationType === 'company'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <Building className="h-5 w-5 mb-2" />
                  <h3 className="font-medium">Company</h3>
                  <p className="text-sm text-gray-500">Register as a business entity</p>
                </button>

                <button
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      registrationType: 'individual'
                    }
                  }))}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    formData.basicInfo.registrationType === 'individual'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <User className="h-5 w-5 mb-2" />
                  <h3 className="font-medium">Individual</h3>
                  <p className="text-sm text-gray-500">Register as a professional</p>
                </button>
              </div>
            </div>

            {/* Company/Individual Information */}
            {formData.basicInfo.registrationType === 'company' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.basicInfo.companyName}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          companyName: e.target.value
                        }
                      }))}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <VatNumberInput
                      value={formData.basicInfo.vatNumber}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        basicInfo: {
                          ...prev.basicInfo,
                          vatNumber: value
                        }
                      }))}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.individualName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      basicInfo: {
                        ...prev.basicInfo,
                        individualName: e.target.value
                      }
                    }))}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.basicInfo.surname}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      basicInfo: {
                        ...prev.basicInfo,
                        surname: e.target.value
                      }
                    }))}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.basicInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      email: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      phone: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.basicInfo.whatsapp}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      whatsapp: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.basicInfo.website}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      website: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Professional Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BriefcaseBusinessIcon className="h-5 w-5 text-blue-600" />
            Professional Information
          </h2>

          <div className="space-y-6">
            {/* Professional Title & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={formData.basicInfo.professionalTitle}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      professionalTitle: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Full Stack Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <select
                  value={formData.basicInfo.yearsOfExperience}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    basicInfo: {
                      ...prev.basicInfo,
                      yearsOfExperience: e.target.value
                    }
                  }))}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select experience</option>
                  <option value="1-2">1-2 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
                </div>
                </div>

{/* Service Categories */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Service Categories
  </label>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
    {serviceCategories.map((category) => (
      <label
        key={category}
        className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
          formData.expertise.serviceCategories?.includes(category)
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200'
        }`}
      >
        <input
          type="checkbox"
          checked={formData.expertise.serviceCategories?.includes(category)}
          onChange={(e) => {
            const updatedCategories = e.target.checked
              ? [...(formData.expertise.serviceCategories || []), category]
              : formData.expertise.serviceCategories?.filter(c => c !== category) || [];
            setFormData(prev => ({
              ...prev,
              expertise: {
                ...prev.expertise,
                serviceCategories: updatedCategories
              }
            }));
          }}
          className="sr-only"
        />
        <span className="text-sm">{category}</span>
      </label>
    ))}
  </div>
</div>

{/* Skills */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Primary Skills
  </label>
  <div className="space-y-2">
    <div className="flex flex-wrap gap-2">
      {formData.expertise.primarySkills?.map((skill, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
        >
          {skill}
          <button
            onClick={() => {
              const updatedSkills = formData.expertise.primarySkills?.filter((_, i) => i !== index);
              setFormData(prev => ({
                ...prev,
                expertise: {
                  ...prev.expertise,
                  primarySkills: updatedSkills
                }
              }));
            }}
            className="hover:text-blue-800"
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}
    </div>
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Add a skill"
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        onKeyPress={(e) => {
          if (e.key === 'Enter' && e.target.value) {
            setFormData(prev => ({
              ...prev,
              expertise: {
                ...prev.expertise,
                primarySkills: [...(prev.expertise.primarySkills || []), e.target.value]
              }
            }));
            e.target.value = '';
          }
        }}
      />
      <Button
        onClick={() => {
          const input = document.querySelector('input[placeholder="Add a skill"]');
          if (input.value) {
            setFormData(prev => ({
              ...prev,
              expertise: {
                ...prev.expertise,
                primarySkills: [...(prev.expertise.primarySkills || []), input.value]
              }
            }));
            input.value = '';
          }
        }}
      >
        Add
      </Button>
    </div>
  </div>
</div>

{/* Languages */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Languages
  </label>
  <div className="space-y-4">
    {formData.basicInfo.languages.map((lang, index) => (
      <div key={index} className="flex items-center gap-4">
        <select
          value={lang.language}
          onChange={(e) => {
            const updatedLanguages = [...formData.basicInfo.languages];
            updatedLanguages[index].language = e.target.value;
            setFormData(prev => ({
              ...prev,
              basicInfo: {
                ...prev.basicInfo,
                languages: updatedLanguages
              }
            }));
          }}
          className="flex-1 p-2 border rounded-lg"
        >
          <option value="">Select language</option>
          {availableLanguages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.name}
            </option>
          ))}
        </select>
        <select
          value={lang.level}
          onChange={(e) => {
            const updatedLanguages = [...formData.basicInfo.languages];
            updatedLanguages[index].level = e.target.value;
            setFormData(prev => ({
              ...prev,
              basicInfo: {
                ...prev.basicInfo,
                languages: updatedLanguages
              }
            }));
          }}
          className="flex-1 p-2 border rounded-lg"
        >
          <option value="">Select level</option>
          {availableLanguages[0].levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            const updatedLanguages = formData.basicInfo.languages.filter((_, i) => i !== index);
            setFormData(prev => ({
              ...prev,
              basicInfo: {
                ...prev.basicInfo,
                languages: updatedLanguages
              }
            }));
          }}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          basicInfo: {
            ...prev.basicInfo,
            languages: [
              ...(prev.basicInfo.languages || []),
              { language: '', level: '' }
            ]
          }
        }));
      }}
      variant="outline"
    >
      Add Language
    </Button>
  </div>
</div>

{/* Professional Description */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Professional Description
    <span className="text-sm text-gray-500 ml-2">
      (Max 500 characters)
    </span>
  </label>
  <textarea
    value={formData.basicInfo.description}
    onChange={(e) => {
      if (e.target.value.length <= 500) {
        setFormData(prev => ({
          ...prev,
          basicInfo: {
            ...prev.basicInfo,
            description: e.target.value
          }
        }));
      }
    }}
    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[150px]"
    placeholder="Describe your professional experience, expertise, and what makes you unique..."
  />
  <div className="text-sm text-gray-500 mt-1">
    {formData.basicInfo.description.length}/500 characters
  </div>
</div>
</div>
</Card>

{/* Availability & Rates */}
<Card className="p-6 mb-6">
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <Clock className="h-5 w-5 text-blue-600" />
    Availability & Rates
  </h2>

  <div className="space-y-8">
    {/* Working Hours */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Working Hours
      </label>
      <div className="space-y-4">
        {Object.entries(formData.workPreferences.workingHours.availability).map(([day, hours]) => (
          <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 border-b last:border-0">
            <div className="min-w-[120px]">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={hours.available}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      workPreferences: {
                        ...prev.workPreferences,
                        workingHours: {
                          ...prev.workPreferences.workingHours,
                          availability: {
                            ...prev.workPreferences.workingHours.availability,
                            [day]: {
                              ...hours,
                              available: e.target.checked
                            }
                          }
                        }
                      }
                    }));
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 capitalize font-medium">{day}</span>
              </label>
            </div>
            {hours.available && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
                <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative">
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      value={hours.start}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          workPreferences: {
                            ...prev.workPreferences,
                            workingHours: {
                              ...prev.workPreferences.workingHours,
                              availability: {
                                ...prev.workPreferences.workingHours.availability,
                                [day]: {
                                  ...hours,
                                  start: e.target.value
                                }
                              }
                            }
                          }
                        }));
                      }}
                      className="w-full pl-8 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <span className="flex items-center justify-center text-gray-500">to</span>
                  <div className="relative">
                    <Clock className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="time"
                      value={hours.end}
                      onChange={(e) => {
                        setFormData(prev => ({
                          ...prev,
                          workPreferences: {
                            ...prev.workPreferences,
                            workingHours: {
                              ...prev.workPreferences.workingHours,
                              availability: {
                                ...prev.workPreferences.workingHours.availability,
                                [day]: {
                                  ...hours,
                                  end: e.target.value
                                }
                              }
                            }
                          }
                        }));
                      }}
                      className="w-full pl-8 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Hourly Rate */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Hourly Rate (USD)
      </label>
      <div className="relative w-full sm:w-64">
        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="number"
          value={formData.basicInfo.hourlyRate}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            basicInfo: {
              ...prev.basicInfo,
              hourlyRate: e.target.value
            }
          }))}
          className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your hourly rate"
          min="0"
          step="0.01"
        />
      </div>
      <p className="mt-1 text-sm text-gray-500">Set your competitive hourly rate</p>
    </div>

    {/* Project Length Preferences */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Preferred Project Length
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projectLengths.map((length) => (
          <label
            key={length.value}
            className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
              formData.workPreferences.preferredProjectLength.includes(length.value)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <input
              type="checkbox"
              checked={formData.workPreferences.preferredProjectLength.includes(length.value)}
              onChange={(e) => {
                const updatedLengths = e.target.checked
                  ? [...formData.workPreferences.preferredProjectLength, length.value]
                  : formData.workPreferences.preferredProjectLength.filter(l => l !== length.value);
                setFormData(prev => ({
                  ...prev,
                  workPreferences: {
                    ...prev.workPreferences,
                    preferredProjectLength: updatedLengths
                  }
                }));
              }}
              className="sr-only"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{length.label}</span>
              <span className="text-xs text-gray-500 mt-1">
                {length.value === 'short' && 'Perfect for quick projects'}
                {length.value === 'medium' && 'Ideal for medium-sized projects'}
                {length.value === 'long' && 'Best for complex projects'}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Timezone Selection */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Timezone
      </label>
      <div className="relative w-full sm:w-96">
        <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <select
          value={formData.workPreferences.workingHours.timezone}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            workPreferences: {
              ...prev.workPreferences,
              workingHours: {
                ...prev.workPreferences.workingHours,
                timezone: e.target.value
              }
            }
          }))}
          className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
        >
          <option value="">Select timezone</option>
          <option value="UTC-8">Pacific Time (PT)</option>
          <option value="UTC-5">Eastern Time (ET)</option>
          <option value="UTC+0">Greenwich Mean Time (GMT)</option>
          <option value="UTC+1">Central European Time (CET)</option>
          {/* Add more timezone options as needed */}
        </select>
      </div>
    </div>
  </div>
</Card>

{/* Portfolio & Work Samples */}
<Card className="p-6 mb-6">
<h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
<FileText className="h-5 w-5 text-blue-600" />
Portfolio & Work Samples
</h2>

<div className="space-y-6">
{/* Social/Professional Links */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      GitHub Profile
    </label>
    <input
      type="url"
      value={formData.portfolio.githubProfile}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          githubProfile: e.target.value
        }
      }))}
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="https://github.com/username"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      LinkedIn Profile
    </label>
    <input
      type="url"
      value={formData.portfolio.linkedinProfile}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          linkedinProfile: e.target.value
        }
      }))}
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="https://linkedin.com/in/username"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Portfolio Website
    </label>
    <input
      type="url"
      value={formData.portfolio.portfolioWebsite}
      onChange={(e) => setFormData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          portfolioWebsite: e.target.value
        }
      }))}
      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      placeholder="https://your-portfolio.com"
    />
  </div>
</div>

{/* Work Samples */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Work Samples
  </label>
  <div className="space-y-4">
    {formData.portfolio.samples.map((sample, index) => (
      <div key={index} className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <input
              type="text"
              value={sample.title}
              onChange={(e) => {
                const updatedSamples = [...formData.portfolio.samples];
                updatedSamples[index].title = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  portfolio: {
                    ...prev.portfolio,
                    samples: updatedSamples
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="Project title"
            />
            <textarea
              value={sample.description}
              onChange={(e) => {
                const updatedSamples = [...formData.portfolio.samples];
                updatedSamples[index].description = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  portfolio: {
                    ...prev.portfolio,
                    samples: updatedSamples
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="Project description"
            />
            <input
              type="url"
              value={sample.link}
              onChange={(e) => {
                const updatedSamples = [...formData.portfolio.samples];
                updatedSamples[index].link = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  portfolio: {
                    ...prev.portfolio,
                    samples: updatedSamples
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="Project link"
            />
          </div>
          <button
            onClick={() => {
              const updatedSamples = formData.portfolio.samples.filter((_, i) => i !== index);
              setFormData(prev => ({
                ...prev,
                portfolio: {
                  ...prev.portfolio,
                  samples: updatedSamples
                }
              }));
            }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            samples: [
              ...prev.portfolio.samples,
              { title: '', description: '', link: '' }
            ]
          }
        }));
      }}
      variant="outline"
      className="w-full"
    >
      Add Work Sample
    </Button>
  </div>
</div>
</div>
</Card>


{/* Portfolio Projects */}
<Card className="p-6 mb-6">
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <BriefcaseBusinessIcon className="h-5 w-5 text-blue-600" />
    Portfolio Projects
  </h2>

  <div className="space-y-6">
    {formData.portfolio.projects.map((project, index) => (
      <div key={index} className="border rounded-lg p-6">
        <div className="space-y-4">
          {/* Project Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
              <div className="space-y-2 text-center">
                {project.imageUrl ? (
                  <div className="relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title || 'Project preview'}
                      className="mx-auto h-48 w-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        const updatedProjects = [...formData.portfolio.projects];
                        updatedProjects[index].imageUrl = null;
                        updatedProjects[index].imageFile = null;
                        setFormData(prev => ({
                          ...prev,
                          portfolio: {
                            ...prev.portfolio,
                            projects: updatedProjects
                          }
                        }));
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="relative cursor-pointer rounded-md font-medium focus-within:outline-none">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-blue-600 hover:text-blue-500">Upload project image</span>
                      <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const updatedProjects = [...formData.portfolio.projects];
                            updatedProjects[index].imageUrl = event.target.result;
                            updatedProjects[index].imageFile = file;
                            setFormData(prev => ({
                              ...prev,
                              portfolio: {
                                ...prev.portfolio,
                                projects: updatedProjects
                              }
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...formData.portfolio.projects];
                  updatedProjects[index].title = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    portfolio: {
                      ...prev.portfolio,
                      projects: updatedProjects
                    }
                  }));
                }}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project URL
              </label>
              <input
                type="url"
                value={project.link}
                onChange={(e) => {
                  const updatedProjects = [...formData.portfolio.projects];
                  updatedProjects[index].link = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    portfolio: {
                      ...prev.portfolio,
                      projects: updatedProjects
                    }
                  }));
                }}
                className="w-full p-2 border rounded-lg"
                placeholder="https://"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => {
                const updatedProjects = [...formData.portfolio.projects];
                updatedProjects[index].description = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  portfolio: {
                    ...prev.portfolio,
                    projects: updatedProjects
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg min-h-[100px]"
              placeholder="Describe your project..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technologies Used
            </label>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tech}
                  <button
                    onClick={() => {
                      const updatedProjects = [...formData.portfolio.projects];
                      updatedProjects[index].technologies = project.technologies.filter((_, i) => i !== techIndex);
                      setFormData(prev => ({
                        ...prev,
                        portfolio: {
                          ...prev.portfolio,
                          projects: updatedProjects
                        }
                      }));
                    }}
                    className="hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add technology"
                className="inline-flex items-center px-3 py-1 border rounded-full text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    const updatedProjects = [...formData.portfolio.projects];
                    updatedProjects[index].technologies = [...(project.technologies || []), e.target.value];
                    setFormData(prev => ({
                      ...prev,
                      portfolio: {
                        ...prev.portfolio,
                        projects: updatedProjects
                      }
                    }));
                    e.target.value = '';
                  }
                }}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            const updatedProjects = formData.portfolio.projects.filter((_, i) => i !== index);
            setFormData(prev => ({
              ...prev,
              portfolio: {
                ...prev.portfolio,
                projects: updatedProjects
              }
            }));
          }}
          variant="outline"
          className="mt-4"
        >
          Remove Project
        </Button>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          portfolio: {
            ...prev.portfolio,
            projects: [
              ...(prev.portfolio.projects || []),
              {
                title: '',
                description: '',
                link: '',
                technologies: [],
                imageUrl: null,
                imageFile: null
              }
            ]
          }
        }));
      }}
      variant="outline"
      className="w-full"
    >
      Add Project
    </Button>
  </div>
</Card>

{/* Education */}
<Card className="p-6 mb-6">
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <Book className="h-5 w-5 text-blue-600" />
    Education
  </h2>

  <div className="space-y-6">
    {formData.education?.map((edu, index) => (
      <div key={index} className="border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Degree
            </label>
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => {
                const updatedEducation = [...formData.education];
                updatedEducation[index].degree = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  education: updatedEducation
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., Bachelor of Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School
            </label>
            <input
              type="text"
              value={edu.school}
              onChange={(e) => {
                const updatedEducation = [...formData.education];
                updatedEducation[index].school = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  education: updatedEducation
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., University of Toronto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year
            </label>
            <input
              type="text"
              value={edu.year}
              onChange={(e) => {
                const updatedEducation = [...formData.education];
                updatedEducation[index].year = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  education: updatedEducation
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="e.g., 2020"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            const updatedEducation = formData.education.filter((_, i) => i !== index);
            setFormData(prev => ({
              ...prev,
              education: updatedEducation
            }));
          }}
          variant="outline"
          className="mt-4"
        >
          Remove
        </Button>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          education: [
            ...(prev.education || []),
            { degree: '', school: '', year: '' }
          ]
        }));
      }}
      variant="outline"
      className="w-full"
    >
      Add Education
    </Button>
  </div>
</Card>

{/* Work Experience */}
<Card className="p-6 mb-6">
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <BriefcaseBusinessIcon className="h-5 w-5 text-blue-600" />
    Work Experience
  </h2>

  <div className="space-y-6">
    {formData.experience?.map((exp, index) => (
      <div key={index} className="border rounded-lg p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={exp.title}
                onChange={(e) => {
                  const updatedExperience = [...formData.experience];
                  updatedExperience[index].title = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    experience: updatedExperience
                  }));
                }}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => {
                  const updatedExperience = [...formData.experience];
                  updatedExperience[index].company = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    experience: updatedExperience
                  }));
                }}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Period
              </label>
              <input
                type="text"
                value={exp.period}
                onChange={(e) => {
                  const updatedExperience = [...formData.experience];
                  updatedExperience[index].period = e.target.value;
                  setFormData(prev => ({
                    ...prev,
                    experience: updatedExperience
                  }));
                }}
                className="w-full p-2 border rounded-lg"
                placeholder="e.g., 2020 - Present"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={exp.description}
              onChange={(e) => {
                const updatedExperience = [...formData.experience];
                updatedExperience[index].description = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  experience: updatedExperience
                }));
              }}
              className="w-full p-2 border rounded-lg min-h-[100px]"
            />
          </div>
        </div>
        <Button
          onClick={() => {
            const updatedExperience = formData.experience.filter((_, i) => i !== index);
            setFormData(prev => ({
              ...prev,
              experience: updatedExperience
            }));
          }}
          variant="outline"
          className="mt-4"
        >
          Remove
        </Button>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          experience: [
            ...(prev.experience || []),
            {
              title: '',
              company: '',
              period: '',
              description: ''
            }
          ]
        }));
      }}
      variant="outline"
      className="w-full"
    >
      Add Work Experience
    </Button>
  </div>
</Card>




{/* Verification */}
<Card className="p-6 mb-6">
<h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
<Shield className="h-5 w-5 text-blue-600" />
Professional Verification
</h2>

<div className="space-y-6">
{/* Document Upload */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Professional Certificates
  </label>
  <div className="space-y-4">
    {formData.verification.professionalCertificates.map((cert, index) => (
      <div key={index} className="border rounded-lg p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <input
              type="text"
              value={cert.name}
              onChange={(e) => {
                const updatedCerts = [...formData.verification.professionalCertificates];
                updatedCerts[index].name = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  verification: {
                    ...prev.verification,
                    professionalCertificates: updatedCerts
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="Certificate name"
            />
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => {
                const updatedCerts = [...formData.verification.professionalCertificates];
                updatedCerts[index].issuer = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  verification: {
                    ...prev.verification,
                    professionalCertificates: updatedCerts
                  }
                }));
              }}
              className="w-full p-2 border rounded-lg"
              placeholder="Issuing organization"
            />
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                <Upload className="h-8 w-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  {cert.document ? cert.document.name : 'Upload certificate document'}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const updatedCerts = [...formData.verification.professionalCertificates];
                    updatedCerts[index].document = e.target.files[0];
                    setFormData(prev => ({
                      ...prev,
                      verification: {
                        ...prev.verification,
                        professionalCertificates: updatedCerts
                      }
                    }));
                  }}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
          </div>
          <button
            onClick={() => {
              const updatedCerts = formData.verification.professionalCertificates.filter((_, i) => i !== index);
              setFormData(prev => ({
                ...prev,
                verification: {
                  ...prev.verification,
                  professionalCertificates: updatedCerts
                }
              }));
            }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    ))}
    <Button
      onClick={() => {
        setFormData(prev => ({
          ...prev,
          verification: {
            ...prev.verification,
            professionalCertificates: [
              ...prev.verification.professionalCertificates,
              { name: '', issuer: '', document: null }
            ]
          }
        }));
      }}
      variant="outline"
      className="w-full"
    >
      Add Certificate
    </Button>
  </div>
</div>





{/* Identity Verification Notice */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  <div className="flex items-start gap-3">
    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
    <div>
      <h3 className="font-medium text-blue-900">Identity Verification</h3>
      <p className="mt-1 text-sm text-blue-700">
        To maintain platform quality and trust, we may request additional verification documents, including:
      </p>
      <ul className="mt-2 text-sm text-blue-700 space-y-1">
        <li>• Government-issued ID</li>
        <li>• Proof of address</li>
        <li>• Professional credentials</li>
        <li>• Business registration (if applicable)</li>
      </ul>
    </div>
  </div>
</div>
</div>
</Card>

{/* Submit Button */}
<div className="flex justify-end">
<Button
  onClick={() => {
    // Handle form submission
    console.log('Form submitted:', formData);
  }}
  className="px-8 py-3"
>
  Complete Registration
</Button>
</div>
</main>

<br></br>
<br></br>
<br></br>
<br></br>

<SharedFooter2 />
</div>
);
};

export default InternationalProfessionalRegistration;