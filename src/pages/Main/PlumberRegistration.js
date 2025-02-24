import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SharedFooter from '../../Footer/SharedFooter';
import SharedHeader from '../../Headers/SharedHeader';
import { VatNumberInput } from './VatNumberInput';
import {
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  Camera,
  Upload,
  AlertCircle,
  Plus,
  X,
  DollarSign,
  Award,
  Search,
  Wrench,
  Settings
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import ServiceAreasCard from './ServiceAreasCard';

const PlumberRegistration = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    basicInfo: {
      companyName: '',
      companyAddress: '',
      streetNumber: '',
      postcode: '',
      vatNumber: '',
      ownerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      logo: null
    },
    businessDescription: '',
    serviceAreas: [],
    customAreas: [],
    servicesOffered: [],
    customServices: [],
    pricing: {
      hourlyRate: '',
      callOutFee: '',
      acceptsFixedPrice: false
    },
    regularHours: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: {
        start: '09:00',
        end: '17:00'
      }
    },
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
    },
    certifications: [],
    brands: {
      boiler: [],
      airConditioning: []
    },
    licenses: [],
    insurance: {
      hasInsurance: false,
      insuranceDoc: null
    }
  });

  // Predefined services list
  const defaultServices = [
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

  const handleAreaSearch = (searchTerm) => {
    // Mock data for demonstration
    return [
      'Toronto Central',
      'Toronto East',
      'Toronto West',
      'North York',
      'Scarborough',
      'Etobicoke'
    ].filter(area => 
      area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader />
      <div className="max-w-4xl mx-auto pt-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Professional Plumber Registration</h1>
          <p className="mt-2 text-gray-600">Complete your profile to start receiving service requests</p>
        </div>

        {/* Profile Image Upload */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="h-32 w-32 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Building className="h-12 w-12 text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                <Camera className="h-4 w-4" />
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Company Logo</h2>
              <p className="text-sm text-gray-500">Upload your company logo or professional photo</p>
            </div>
          </div>
        </Card>
{/* Basic Information */}
<Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
    <Building className="h-5 w-5 text-blue-600" />
    Basic Information
  </h2>
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Company Name</label>
        <input
          type="text"
          value={formData.basicInfo.companyName}
          onChange={(e) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              companyName: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company name"
        />
      </div>

      <div>
        <VatNumberInput
          value={formData.basicInfo.vatNumber}
          onChange={(value) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              vatNumber: value
            }
          })}
          country="IT"
          required={true}
        />
      </div>
    </div>

    {/* Company Location Information */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Street Number</label>
        <input
          type="text"
          value={formData.basicInfo.streetNumber}
          onChange={(e) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              streetNumber: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., 112 E industrial zone"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Postcode</label>
        <input
          type="text"
          value={formData.basicInfo.postcode}
          onChange={(e) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              postcode: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter postcode"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Province</label>
        <input
          type="text"
          value={formData.basicInfo.province}
          onChange={(e) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              province: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter company province"
        />
        {!formData.basicInfo.province && formData.basicInfo.streetNumber && (
          <p className="text-red-500 text-sm mt-1">Please enter the company province</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Municipality/District</label>
        <input
          type="text"
          value={formData.basicInfo.municipality}
          onChange={(e) => setFormData({
            ...formData,
            basicInfo: {
              ...formData.basicInfo,
              municipality: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Enter municipality or district"
        />
        {!formData.basicInfo.municipality && formData.basicInfo.streetNumber && (
          <p className="text-red-500 text-sm mt-1">Please enter the municipality/district</p>
        )}
      </div>
    </div>

    {/* Legal Representative Information */}
    <div className="border-t pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Legal Representative</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isOwner"
            checked={formData.basicInfo.ownerInfo.isOwner}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  isOwner: e.target.checked
                }
              }
            })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="isOwner" className="text-sm font-medium">Is also the owner</label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">First Name</label>
          <input
            type="text"
            value={formData.basicInfo.ownerInfo.firstName}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  firstName: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Last Name</label>
          <input
            type="text"
            value={formData.basicInfo.ownerInfo.lastName}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  lastName: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={formData.basicInfo.ownerInfo.email}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  email: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            value={formData.basicInfo.ownerInfo.phone}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  phone: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            type="text"
            value={formData.basicInfo.ownerInfo.city}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  city: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city"
          />
          {!formData.basicInfo.ownerInfo.city && formData.basicInfo.ownerInfo.street && (
            <p className="text-red-500 text-sm mt-1">Please enter the city</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Province/State</label>
          <input
            type="text"
            value={formData.basicInfo.ownerInfo.province}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  province: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter province or state"
          />
          {!formData.basicInfo.ownerInfo.province && formData.basicInfo.ownerInfo.street && (
            <p className="text-red-500 text-sm mt-1">Please enter the province/state</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">ZIP Code</label>
          <input
            type="text"
            value={formData.basicInfo.ownerInfo.zipCode}
            onChange={(e) => setFormData({
              ...formData,
              basicInfo: {
                ...formData.basicInfo,
                ownerInfo: {
                  ...formData.basicInfo.ownerInfo,
                  zipCode: e.target.value
                }
              }
            })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter ZIP code"
          />
          {!formData.basicInfo.ownerInfo.zipCode && formData.basicInfo.ownerInfo.street && (
            <p className="text-red-500 text-sm mt-1">Please enter the ZIP code</p>
          )}
        </div>
      </div>
    </div>
  </div>
</Card>

        {/* Service Hours */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Service Hours
          </h2>

          {/* Regular Service Hours */}
          <div className="space-y-6">
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium mb-4">Regular Service Hours</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Available Days</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label
                        key={day}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.regularHours?.days?.includes(day) || false}
                          onChange={(e) => {
                            const days = e.target.checked
                              ? [...(formData.regularHours?.days || []), day]
                              : (formData.regularHours?.days || []).filter(d => d !== day);
                            setFormData({
                              ...formData,
                              regularHours: {
                                ...formData.regularHours,
                                days
                              }
                            });
                          }}
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time</label>
                    <input
                      type="time"
                      value={formData.regularHours?.hours?.start || '09:00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        regularHours: {
                          ...formData.regularHours,
                          hours: {
                            ...(formData.regularHours?.hours || {}),
                            start: e.target.value
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Time</label>
                    <input
                      type="time"
                      value={formData.regularHours?.hours?.end || '17:00'}
                      onChange={(e) => setFormData({
                        ...formData,
                        regularHours: {
                          ...formData.regularHours,
                          hours: {
                            ...(formData.regularHours?.hours || {}),
                            end: e.target.value
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Service Hours */}
            {/* Emergency Service Hours */}
<div>
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-medium">Emergency Service Hours</h3>
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Offer emergency services</span>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={formData.emergencyServices?.available || false}
          onChange={(e) => setFormData({
            ...formData,
            emergencyServices: {
              ...formData.emergencyServices,
              available: e.target.checked
            }
          })}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  </div>

  {formData.emergencyServices?.available && (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium mb-2">Emergency Available Days</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <label
              key={day}
              className="flex items-center p-3 border border-red-100 rounded-lg hover:bg-red-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.emergencyServices?.availability?.days?.includes(day) || false}
                onChange={(e) => {
                  const days = e.target.checked
                    ? [...(formData.emergencyServices?.availability?.days || []), day]
                    : (formData.emergencyServices?.availability?.days || []).filter(d => d !== day);
                  setFormData({
                    ...formData,
                    emergencyServices: {
                      ...formData.emergencyServices,
                      availability: {
                        ...formData.emergencyServices?.availability,
                        days
                      }
                    }
                  });
                }}
                className="h-4 w-4 text-red-600 rounded"
              />
              <span className="ml-2 text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Emergency Start Time</label>
          <input
            type="time"
            value={formData.emergencyServices?.availability?.hours?.start || ''}
            onChange={(e) => setFormData({
              ...formData,
              emergencyServices: {
                ...formData.emergencyServices,
                availability: {
                  ...formData.emergencyServices?.availability,
                  hours: {
                    ...(formData.emergencyServices?.availability?.hours || {}),
                    start: e.target.value
                  }
                }
              }
            })}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Emergency End Time</label>
          <input
            type="time"
            value={formData.emergencyServices?.availability?.hours?.end || ''}
            onChange={(e) => setFormData({
              ...formData,
              emergencyServices: {
                ...formData.emergencyServices,
                availability: {
                  ...formData.emergencyServices?.availability,
                  hours: {
                    ...(formData.emergencyServices?.availability?.hours || {}),
                    end: e.target.value
                  }
                }
              }
            })}
            className="w-full p-3 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Response Time</label>
        <select
          value={formData.emergencyServices?.responseTime || '30'}
          onChange={(e) => setFormData({
            ...formData,
            emergencyServices: {
              ...formData.emergencyServices,
              responseTime: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg"
        >
          <option value="immediate">Immediate (Within 5 minutes)</option>
          <option value="15">Within 15 minutes</option>
          <option value="30">Within 30 minutes</option>
          <option value="60">Within 1 hour</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Emergency WhatsApp Number</label>
        <input
          type="tel"
          value={formData.emergencyServices?.whatsAppNumber || ''}
          onChange={(e) => setFormData({
            ...formData,
            emergencyServices: {
              ...formData.emergencyServices,
              whatsAppNumber: e.target.value
            }
          })}
          className="w-full p-3 border rounded-lg"
          placeholder="+1 (XXX) XXX-XXXX"
          required
        />
        <p className="mt-1 text-sm text-gray-500">Required for emergency service coordination</p>
      </div>

      {/* Emergency Service Terms */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-medium mb-2">Emergency Service Terms</h3>
        <div className="text-sm text-gray-600 space-y-2 mb-4">
          <p>Rates for Emergency Services:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Daytime (6am-15pm): 20% plus VAT if applicable and bank charges (approximately 1.52%)</li>
            <li>Nighttime (15pm-6am) and Holidays: 30% plus VAT if applicable plus bank charges (approximately 1.52%)</li>
          </ul>
        </div>
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={formData.emergencyServices?.termsAccepted || false}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              emergencyServices: {
                ...prev.emergencyServices,
                termsAccepted: e.target.checked
              }
            }))}
            className="h-4 w-4 text-red-600 rounded mt-1"
          />
          <label className="text-sm text-gray-700">
            I have read and accept the emergency service terms and conditions, including the additional charges and coordination requirements.
          </label>
        </div>
      </div>
    </div>
  )}
</div>
          </div>
        </Card>

        {/* Service Areas */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Service Areas
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search and add service areas..."
                className="w-full p-3 pl-10 border rounded-lg"
                onChange={(e) => {
                  const areas = handleAreaSearch(e.target.value);
                  // Handle area suggestions display
                }}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.serviceAreas.map((area, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                >
                  {area}
                  <button
                    onClick={() => {
                      const areas = formData.serviceAreas.filter((_, i) => i !== index);
                      setFormData({
                        ...formData,
                        serviceAreas: areas
                      });
                    }}
                    className="hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* Services Offered */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wrench className="h-5 w-5 text-blue-600" />
            Services Offered
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {defaultServices.map((service) => (
                <label
                  key={service}
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.servicesOffered.includes(service)}
                    onChange={(e) => {
                      const services = e.target.checked
                        ? [...formData.servicesOffered, service]
                        : formData.servicesOffered.filter(s => s !== service);
                      setFormData({
                        ...formData,
                        servicesOffered: services
                      });
                    }}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="ml-2 text-sm">{service}</span>
                </label>
              ))}
            </div>

            {/* Custom Services */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Additional Services</h3>
              <div className="space-y-3">
                {formData.customServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => {
                        const services = [...formData.customServices];
                        services[index] = e.target.value;
                        setFormData({
                          ...formData,
                          customServices: services
                        });
                      }}
                      className="flex-1 p-3 border rounded-lg"
                      placeholder="Enter custom service"
                    />
                    <button
                      onClick={() => {
                        const services = formData.customServices.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          customServices: services
                        });
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      customServices: [...formData.customServices, '']
                    });
                  }}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Custom Service</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing Information */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-blue-600" />
            Pricing Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Hourly Rate (+ VAT)</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.pricing.hourlyRate}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricing: {
                      ...formData.pricing,
                      hourlyRate: e.target.value
                    }
                  })}
                  className="w-full p-3 pl-8 border rounded-lg"
                  placeholder="Enter hourly rate"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Call-Out Fee</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.pricing.callOutFee}
                  onChange={(e) => setFormData({
                    ...formData,
                    pricing: {
                      ...formData.pricing,
                      callOutFee: e.target.value
                    }
                  })}
                  className="w-full p-3 pl-8 border rounded-lg"
                  placeholder="Enter call-out fee"
                />
              </div>
            </div>
          </div>
        </Card>
        <ServiceAreasCard/>

        {/* Emergency Services */}
        {/* <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            Emergency Services
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.emergencyServices.available}
                onChange={(e) => setFormData({
                  ...formData,
                  emergencyServices: {
                    ...formData.emergencyServices,
                    available: e.target.checked
                  }
                })}
                className="h-4 w-4 text-red-600 rounded"
              />
              <span>I offer emergency services</span>
            </div>

            {formData.emergencyServices.available && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    WhatsApp Number (Required for emergency services)
                  </label>
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
                    className="w-full p-3 border rounded-lg"
                    placeholder="+1 (XXX) XXX-XXXX"
                    required
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Availability</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label
                        key={day}
                        className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
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
                          className="h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="ml-2 text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Time</label>
                    <input
                      type="time"
                      value={formData.emergencyServices.availability.hours.start}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyServices: {
                          ...formData.emergencyServices,
                          availability: {
                            ...formData.emergencyServices.availability,
                            hours: {
                              ...formData.emergencyServices.availability.hours,
                              start: e.target.value
                            }
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">End Time</label>
                    <input
                      type="time"
                      value={formData.emergencyServices.availability.hours.end}
                      onChange={(e) => setFormData({
                        ...formData,
                        emergencyServices: {
                          ...formData.emergencyServices,
                          availability: {
                            ...formData.emergencyServices.availability,
                            hours: {
                              ...formData.emergencyServices.availability.hours,
                              end: e.target.value
                            }
                          }
                        }
                      })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </Card> */}

        {/* Insurance Information */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Insurance Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.insurance.hasInsurance}
                onChange={(e) => setFormData({
                  ...formData,
                  insurance: {
                    ...formData.insurance,
                    hasInsurance: e.target.checked
                  }
                })}
                className="h-4 w-4 text-blue-600 rounded"
              />
              <span>I have damage insurance coverage</span>
            </div>

            {formData.insurance.hasInsurance && (
              <div>
                <label className="block text-sm font-medium mb-2">Upload Insurance Document</label>
                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                    <Upload className="h-8 w-4 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">Click to upload insurance document</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setFormData({
                        ...formData,
                        insurance: {
                          ...formData.insurance,
                          insuranceDoc: e.target.files?.[0] || null
                        }
                      })}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Certifications & Brands */}
        <Card className="p-6 mb-6" style={{ textAlign: 'left' }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" />
            Certifications & Brand Authorizations
          </h2>
          <div className="space-y-6">
            {/* Boiler Brands */}
            <div>
              <h3 className="text-lg font-medium mb-3">Authorized Boiler Brands</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add boiler brand..."
                  className="w-full p-3 border rounded-lg"
                />
                <button
                  className="absolute right-2 top-2 text-blue-600 hover:text-blue-700"
                  onClick={() => {/* Handle adding boiler brand */}}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.brands.boiler.map((brand, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full"
                  >
                    {brand}
                    <button
                      onClick={() => {
                        const brands = formData.brands.boiler.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          brands: {
                            ...formData.brands,
                            boiler: brands
                          }
                        });
                      }}
                      className="hover:text-orange-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* AC Brands */}
            <div>
              <h3 className="text-lg font-medium mb-3">Authorized AC Brands</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Add AC brand..."
                  className="w-full p-3 border rounded-lg"
                />
                <button
                  className="absolute right-2 top-2 text-blue-600 hover:text-blue-700"
                  onClick={() => {/* Handle adding AC brand */}}
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.brands.airConditioning.map((brand, index) => (
                  <span
                    key={index}
                                          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                  >
                    {brand}
                    <button
                      onClick={() => {
                        const brands = formData.brands.airConditioning.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          brands: {
                            ...formData.brands,
                            airConditioning: brands
                          }
                        });
                      }}
                      className="hover:text-blue-800"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Other Certifications */}
            <div>
              <h3 className="text-lg font-medium mb-3">Additional Certifications</h3>
              <div className="space-y-3">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1 space-y-4">
                      <input
                        type="text"
                        value={cert.name}
                        onChange={(e) => {
                          const certs = [...formData.certifications];
                          certs[index].name = e.target.value;
                          setFormData({
                            ...formData,
                            certifications: certs
                          });
                        }}
                        className="w-full p-3 border rounded-lg"
                        placeholder="Certification name"
                      />
                      <div className="flex items-center justify-center w-full">
                        <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                          <Upload className="h-8 w-8 text-gray-400" />
                          <span className="mt-2 text-sm text-gray-500">
                            {cert.document ? cert.document.name : 'Upload certification document'}
                          </span>
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const certs = [...formData.certifications];
                              certs[index].document = e.target.files?.[0] || null;
                              setFormData({
                                ...formData,
                                certifications: certs
                              });
                            }}
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const certs = formData.certifications.filter((_, i) => i !== index);
                        setFormData({
                          ...formData,
                          certifications: certs
                        });
                      }}
                      className="p-2 h-fit text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      certifications: [...formData.certifications, { name: '', document: null }]
                    });
                  }}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Certification</span>
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Verification Notice */}
        <Card className="p-6 mb-6 bg-yellow-50 border-yellow-200" style={{ textAlign: 'left' }}>
          <div className="flex items-start gap-4">
            <Shield className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-yellow-800">Account Verification Notice</h3>
              <p className="text-sm text-yellow-700 mt-2">
                To maintain quality standards and ensure the best service for our customers, we may request additional verification documents such as:
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                <li>Phone number verification</li>
                <li>Proof of residence</li>
                <li>Chamber of Commerce certificate</li>
                <li>Professional licenses or certifications</li>
                <li>Insurance documentation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end mb-8">
          <Button 
            onClick={() => {
              // Handle form submission
              console.log('Form submitted:', formData);
            }}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Complete Registration
          </Button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <SharedFooter />
    </div>
  );
};

export default PlumberRegistration;