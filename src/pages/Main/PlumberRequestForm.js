import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Upload, Clock, MapPin, Wrench, Camera,
  AlertCircle, Calendar, Building, Home,
  Phone, Mail, X, Video, Info, Tool,
  DollarSign, Settings, Zap
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import SharedFooter from '../../Footer/SharedFooter';
import SharedHeader from '../../Headers/SharedHeader';

const PlumberRequestForm = () => {
  // Initial state with specific request types and cost calculation
  const [formData, setFormData, serviceType] = useState({
    workDecision: '', // New field for work decision
    requestType: '', // assistance, repair, or replacement
    serviceType: '', // quote, hire, or both
    projectTimeline: '',
    contactInfo: {
      name: '',
      phone: '',
      email: '',
      whatsApp: '', // Required for emergency
      address: {
        street: '',
        number: '',
        area: '',
        neighborhood: '',
        postcode: '',
        additionalInfo: '',
        floor: '',
        hasElevator: false,
        hasStairs: false,
        propertyType: '' // civil, commercial, industrial
      }
    },
    emergency: {
      isEmergency: false,
      calculatedCost: 0,
      baseRate: 0,
      timeMultiplier: 1,
      dayMultiplier: 1,
      specialDateMultiplier: 1
    },
    equipment: {
      type: '', // boiler, AC, etc.
      brand: '',
      model: '',
      power: '',
      year: ''
    },
    media: {
      photos: [],
      videos: [],
      liveCaptures: []
    }
  });

  // Add this function inside your PlumberRequestForm component, before the return statement
const calculateEmergencyRate = (area, timeOfDay, dayType) => {
    let baseRate = 0;
    
    // Base rates by area
    switch (area) {
      case 'toronto-central':
        baseRate = 80;
        break;
      case 'toronto-east':
      case 'toronto-west':
        baseRate = 60;
        break;
      default:
        baseRate = 50;
    }
  
    // Time multiplier
    const timeMultiplier = {
      'day': 1,      // 6 AM - 6 PM
      'evening': 1.5, // 6 PM - 10 PM
      'night': 2     // 10 PM - 6 AM
    }[timeOfDay] || 1;
  
    // Day type multiplier
    const dayMultiplier = {
      'weekday': 1,
      'weekend': 1.5,
      'holiday': 2
    }[dayType] || 1;
  
    // Calculate final rate
    const finalRate = baseRate * timeMultiplier * dayMultiplier;
  
    setFormData(prev => ({
      ...prev,
      emergency: {
        ...prev.emergency,
        calculatedCost: finalRate
      }
    }));
  };

  // State for emergency cost calculation
  const [timeOfDay, setTimeOfDay] = useState('day');
  const [dayType, setDayType] = useState('weekday');
  const [selectedArea, setSelectedArea] = useState('');

  // Function to calculate emergency service cost
  const calculateEmergencyCost = () => {
    const baseRates = {
      'Toronto Central': 80,
      'Toronto East': 60,
      'Toronto West': 60,
      // Add more areas with their base rates
    };

    const timeMultipliers = {
      day: 1,      // 6 AM - 6 PM
      evening: 1.5, // 6 PM - 10 PM
      night: 2     // 10 PM - 6 AM
    };

    const dayMultipliers = {
      weekday: 1,
      weekend: 1.5,
      holiday: 2
    };

    // Special dates like Christmas, Easter etc.
    const specialDates = {
      '12-25': 2.5, // Christmas
      '12-31': 2,   // New Year's Eve
      // Add more special dates
    };

    let cost = baseRates[selectedArea] || 60; // Default base rate
    cost *= timeMultipliers[timeOfDay];
    cost *= dayMultipliers[dayType];

    // Check for special dates
    const today = new Date();
    const dateKey = `${today.getMonth() + 1}-${today.getDate()}`;
    if (specialDates[dateKey]) {
      cost *= specialDates[dateKey];
    }

    return cost;
  };

  // Emergency cost effect
  useEffect(() => {
    if (formData.emergency.isEmergency) {
      const cost = calculateEmergencyCost();
      setFormData(prev => ({
        ...prev,
        emergency: {
          ...prev.emergency,
          calculatedCost: cost
        }
      }));
    }
  }, [timeOfDay, dayType, selectedArea, formData.emergency.isEmergency]);

  // Media capture refs and state
  const videoRef = useRef(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Media capture functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const photo = canvas.toDataURL('image/jpeg');
      setFormData(prev => ({
        ...prev,
        media: {
          ...prev.media,
          liveCaptures: [...prev.media.liveCaptures, photo]
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader />
      <div className="max-w-4xl mx-auto pt-6">
        <h1 className="text-3xl font-bold text-center mb-8">Request Plumbing Service</h1>


        {/* New Work Decision Section */}
        {/* <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Work Decision</h2>
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2">
              Please describe the work that needs to be done
            </label>
            <textarea
              value={formData.workDecision}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                workDecision: e.target.value
              }))}
              className="w-full px-4 py-3 border rounded-lg min-h-[100px] resize-y"
              placeholder="Describe in detail what work needs to be done..."
              required
            />
            <p className="text-sm text-gray-500">
              Your detailed description helps us understand your needs better and provide more accurate service.
            </p>
          </div>
        </Card> */}

<Card className="p-6">
  <h2 className="text-xl font-semibold mb-4">Work Details</h2>
  <div className="space-y-6">
    {/* Work Category Dropdown */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Select Work Category
      </label>
      <select
        value={formData.workCategory}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          workCategory: e.target.value
        }))}
        className="w-full px-4 py-2 border rounded-lg"
        required
      >
        <option value="">Select a category</option>
        <option value="leak_repair">Leak Repair</option>
        <option value="pipe_installation">Pipe Installation/Replacement</option>
        <option value="drain_cleaning">Drain Cleaning</option>
        <option value="fixture_installation">Fixture Installation</option>
        <option value="water_heater">Water Heater Services</option>
        <option value="bathroom_remodel">Bathroom Remodeling</option>
        <option value="sewer_repair">Sewer Line Repair</option>
        <option value="backflow">Backflow Prevention</option>
        <option value="sump_pump">Sump Pump Services</option>
        <option value="gas_line">Gas Line Services</option>
        <option value="hydro_jetting">Hydro Jetting</option>
        <option value="maintenance">Routine Maintenance</option>
        <option value="inspection">Plumbing Inspection</option>
        <option value="other">Other (Please specify)</option>
      </select>
    </div>

    {/* Detailed Description */}
    <div>
      <label className="block text-sm font-medium mb-2">
        Detailed Description of Work Needed
      </label>
      <textarea
        value={formData.workDecision}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          workDecision: e.target.value
        }))}
        className="w-full px-4 py-3 border rounded-lg min-h-[100px] resize-y"
        placeholder="Please provide additional details about the work needed..."
        required
      />
      <p className="text-sm text-gray-500">
        Your detailed description helps us understand your needs better and provide more accurate service.
        Include any specific issues, symptoms, or requirements.
      </p>
    </div>
  </div>
</Card>
<br></br>

        {/* Request Type Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">What type of service do you need?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setFormData(prev => ({ ...prev, requestType: 'assistance' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.requestType === 'assistance' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Request Assistance</h3>
              <p className="text-sm text-gray-500">Professional consultation</p>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, requestType: 'repair' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.requestType === 'repair' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Request Repair</h3>
              <p className="text-sm text-gray-500">Fix existing issues</p>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, requestType: 'replacement' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.requestType === 'replacement' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Request Replacement</h3>
              <p className="text-sm text-gray-500">Install new equipment</p>
            </button>
          </div>
        </Card>
<br></br>
        {/* Service Type Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">How would you like to proceed?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ textAlign: 'left' }}>
            <button
              onClick={() => setFormData(prev => ({ ...prev, serviceType: 'quote' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.serviceType === 'quote' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Get Quote</h3>
              <p className="text-sm text-gray-500">Receive professional quotes</p>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, serviceType: 'hire' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.serviceType === 'hire' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Hire Direct</h3>
              <p className="text-sm text-gray-500">Book a professional</p>
            </button>

            <button
              onClick={() => setFormData(prev => ({ ...prev, serviceType: 'both' }))}
              className={`p-4 rounded-lg border-2 transition-colors ${
                formData.serviceType === 'both' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <h3 className="font-medium">Both Options</h3>
              <p className="text-sm text-gray-500">Quote and hire option</p>
            </button>
          </div>
        </Card>

        <br></br>
 

        {/* Property Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Property Information</h2>
          <div className="space-y-4" style={{ textAlign: 'left' }}>
            <div>
              <label className="block text-sm font-medium mb-1">Property Type</label>
              <select
                value={formData.contactInfo.address.propertyType}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    address: {
                      ...prev.contactInfo.address,
                      propertyType: e.target.value
                    }
                  }
                }))}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="">Select property type</option>
                <option value="civil">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ textAlign: 'left' }}>
              <div>
                <label className="block text-sm font-medium mb-1">Street Name</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.street}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        street: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter street name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">House/Building Number</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.number}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        number: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="e.g., 112 E"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.city}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        city: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter city name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">District/Municipality</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.district}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        district: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter district or municipality"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Floor</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.floor}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        floor: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Postcode</label>
                <input
                  type="text"
                  value={formData.contactInfo.address.postcode}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        postcode: e.target.value
                      }
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.contactInfo.address.hasElevator}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        hasElevator: e.target.checked
                      }
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span>Elevator Available</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.contactInfo.address.hasStairs}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    contactInfo: {
                      ...prev.contactInfo,
                      address: {
                        ...prev.contactInfo.address,
                        hasStairs: e.target.checked
                      }
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span>Stairs Required</span>
              </label>
            </div>
          </div>
        </Card>
        <br></br>

        {/* Equipment Details */}
        {(formData.requestType === 'repair' || formData.requestType === 'replacement') && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
            <div className="space-y-4" style={{ textAlign: 'left' }}>
              <div>
                <label className="block text-sm font-medium mb-1">Equipment Type</label>
                <select
                  value={formData.equipment.type}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    equipment: { ...prev.equipment, type: e.target.value }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select equipment type</option>
                  <option value="boiler">Boiler</option>
                  <option value="ac">Air Conditioning</option>
                  <option value="water_heater">Water Heater</option>
                  <option value="pump">Water Pump</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.equipment.brand}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      equipment: { ...prev.equipment, brand: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Model</label>
                  <input
                    type="text"
                    value={formData.equipment.model}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      equipment: { ...prev.equipment, model: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="Enter model number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Power Rating</label>
                  <input
                    type="text"
                    value={formData.equipment.power}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      equipment: { ...prev.equipment, power: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., 24kW"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Year of Installation</label>
                  <input
                    type="text"
                    value={formData.equipment.year}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      equipment: { ...prev.equipment, year: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., 2020"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}
<br></br>

        {/* Timeline Selection */}
        <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">When do you need this done?</h2>
      <div className="space-y-4" style={{ textAlign: 'left' }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              projectTimeline: 'other' 
            }))}
            className={`p-4 rounded-lg border-2 transition-colors ${
              formData.projectTimeline === 'other'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium">Information Only</h3>
            <p className="text-sm text-gray-500">Request Information</p>
          </button>
          
          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              projectTimeline: 'week' 
            }))}
            className={`p-4 rounded-lg border-2 transition-colors ${
              formData.projectTimeline === 'week'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium">Within a Week</h3>
            <p className="text-sm text-gray-500">Urgent but not emergency</p>
          </button>

          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              projectTimeline: 'month' 
            }))}
            className={`p-4 rounded-lg border-2 transition-colors ${
              formData.projectTimeline === 'month'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium">Within a Month</h3>
            <p className="text-sm text-gray-500">Flexible timeline</p>
          </button>

          <button
            onClick={() => setFormData(prev => ({ 
              ...prev, 
              projectTimeline: 'future' 
            }))}
            className={`p-4 rounded-lg border-2 transition-colors ${
              formData.projectTimeline === 'future'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <h3 className="font-medium">Future Months</h3>
            <p className="text-sm text-gray-500">Planning ahead</p>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.emergency.isEmergency}
            onChange={(e) => {
              setFormData(prev => ({
                ...prev,
                emergency: {
                  ...prev.emergency,
                  isEmergency: e.target.checked
                }
              }));
              if (e.target.checked) {
                setFormData(prev => ({
                  ...prev,
                  projectTimeline: ''
                }));
              }
            }}
            className="h-4 w-4 text-red-600 rounded"
          />
          <span className="text-red-600 font-medium">This is an emergency</span>
        </div>

        {formData.emergency.isEmergency && (
          <div className="mt-4 space-y-4" style={{ textAlign: 'left' }}>
            <div className="p-4 bg-red-50 rounded-lg space-y-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <span className="text-red-700 font-medium">
                  Emergency Service Request
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service Area</label>
                <select
                  value={formData.emergency.area}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      emergency: { ...prev.emergency, area: e.target.value }
                    }));
                    calculateEmergencyRate(
                      e.target.value,
                      formData.emergency.timeOfDay,
                      formData.emergency.dayType
                    );
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select area</option>
                  <option value="toronto-central">Toronto Central</option>
                  <option value="toronto-east">Toronto East</option>
                  <option value="toronto-west">Toronto West</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Indicate which time slot you are in or wish to receive the service
                </label>
                <select
                  value={formData.emergency.timeOfDay}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      emergency: { ...prev.emergency, timeOfDay: e.target.value }
                    }));
                    calculateEmergencyRate(
                      formData.emergency.area,
                      e.target.value,
                      formData.emergency.dayType
                    );
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select time</option>
                  <option value="day">Day (6 AM - 6 PM)</option>
                  <option value="evening">Evening (6 PM - 10 PM)</option>
                  <option value="night">Night (10 PM - 6 AM)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Indicate the day you are in
                </label>
                <select
                  value={formData.emergency.dayType}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      emergency: { ...prev.emergency, dayType: e.target.value }
                    }));
                    calculateEmergencyRate(
                      formData.emergency.area,
                      formData.emergency.timeOfDay,
                      e.target.value
                    );
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select day</option>
                  <option value="weekday">Weekday</option>
                  <option value="weekend">Weekend</option>
                  <option value="holiday">Holiday</option>
                </select>
              </div>

              {formData.emergency.area && formData.emergency.timeOfDay && formData.emergency.dayType ? (
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-red-200">
                  <div>
                    <span className="text-gray-600">Emergency Service Terms:</span>
                    <p className="text-base text-gray-700">
                      You will be contacted within a few minutes; You will pay for the call-out only if you agree with the technician,
                      Now you do not have to pay anything.
                    </p>
                    <p className="text-sm text-red-600 mt-1">{formData.emergency.calculatedCost}$ exit cost</p>
                  </div>
                  <Info className="h-5 w-5 text-gray-400" />
                </div>
              ) : null}

              <div>
                <label className="block text-sm font-medium mb-2">
                  WhatsApp Number (Required for Emergency Service)
                </label>
                <input
                  type="tel"
                  value={formData.emergency.whatsappNumber}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emergency: {
                      ...prev.emergency,
                      whatsappNumber: e.target.value
                    }
                  }))}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  placeholder="+1 (XXX) XXX-XXXX"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
        <br></br>

        {/* Image/Video Upload */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Photos & Videos</h2>
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Photos or Videos
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">
                    Click to upload or drag and drop
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setFormData(prev => ({
                        ...prev,
                        media: {
                          ...prev.media,
                          photos: [
                            ...prev.media.photos,
                            ...files.filter(f => f.type.startsWith('image/'))
                          ],
                          videos: [
                            ...prev.media.videos,
                            ...files.filter(f => f.type.startsWith('video/'))
                          ]
                        }
                      }));
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Live Capture */}
            <div>
              <h3 className="text-lg font-medium mb-4">Take Photo/Video</h3>
              <div className="space-y-4">
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`w-full h-full object-cover ${isCapturing ? 'block' : 'hidden'}`}
                  />
                  {!isCapturing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button onClick={startCamera}>
                        <Camera className="h-5 w-5 mr-2" />
                        Start Camera
                      </Button>
                    </div>
                  )}
                  {isCapturing && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                      <Button onClick={capturePhoto}>
                        <Camera className="h-5 w-5 mr-2" />
                        Take Photo
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (videoRef.current?.srcObject) {
                            const tracks = videoRef.current.srcObject.getTracks();
                            tracks.forEach(track => track.stop());
                            setIsCapturing(false);
                          }
                        }}
                      >
                        Stop Camera
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Display Uploaded/Captured Media */}
            {(formData.media.photos.length > 0 || 
              formData.media.videos.length > 0 || 
              formData.media.liveCaptures.length > 0) && (
              <div>
                <h3 className="text-lg font-medium mb-4">Uploaded Media</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.media.photos.map((photo, index) => (
                    <div key={`photo-${index}`} className="relative aspect-square">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            media: {
                              ...prev.media,
                              photos: prev.media.photos.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  {formData.media.liveCaptures.map((photo, index) => (
                    <div key={`capture-${index}`} className="relative aspect-square">
                      <img
                        src={photo}
                        alt={`Capture ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            media: {
                              ...prev.media,
                              liveCaptures: prev.media.liveCaptures.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {formData.media.videos.map((video, index) => (
                    <div key={`video-${index}`} className="relative aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-gray-400" />
                      <button
                        onClick={() => {
                          setFormData(prev => ({
                            ...prev,
                            media: {
                              ...prev.media,
                              videos: prev.media.videos.filter((_, i) => i !== index)
                            }
                          }));
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
        <br></br>

{/* Contact Information */}
<Card className="p-6" style={{ textAlign: 'left' }}>
  <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Full Name</label>
      <input
        type="text"
        value={formData.contactInfo.name}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          contactInfo: { ...prev.contactInfo, name: e.target.value }
        }))}
        className="w-full px-4 py-2 border rounded-lg"
        placeholder="Enter your full name"
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.contactInfo.email}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            contactInfo: { ...prev.contactInfo, email: e.target.value }
          }))}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter your email"
        />
        <p className="mt-1 text-sm text-gray-500">
          (Only visible after quote purchase or hiring)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          value={formData.contactInfo.phone}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            contactInfo: { ...prev.contactInfo, phone: e.target.value }
          }))}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="Enter your phone number"
        />
        <p className="mt-1 text-sm text-gray-500">
          (Only visible after quote purchase or hiring)
        </p>
      </div>
    </div>

    {/* WhatsApp Section */}
    {!formData.emergency.isEmergency && (
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.contactInfo.enableWhatsApp}
              onChange={(e) => {
                setFormData(prev => ({
                  ...prev,
                  contactInfo: { 
                    ...prev.contactInfo, 
                    enableWhatsApp: e.target.checked,
                    whatsApp: e.target.checked ? prev.contactInfo.whatsApp : ''
                  }
                }));
              }}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span>I want to be contacted via WhatsApp</span>
          </label>
          {formData.contactInfo.enableWhatsApp && (
            <button
              type="button"
              onClick={() => {
                // Auto-fill with phone number if available
                setFormData(prev => ({
                  ...prev,
                  contactInfo: {
                    ...prev.contactInfo,
                    whatsApp: prev.contactInfo.phone
                  }
                }));
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Use phone number
            </button>
          )}
        </div>

        {formData.contactInfo.enableWhatsApp && (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="tel"
                value={formData.contactInfo.whatsApp}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  contactInfo: { ...prev.contactInfo, whatsApp: e.target.value }
                }))}
                className="w-full px-4 py-2 pl-12 border rounded-lg"
                placeholder="+1 (XXX) XXX-XXXX"
              />
              <svg 
                className="absolute left-3 top-2.5 h-5 w-5 text-green-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <p className="text-sm text-gray-500">
              Enter your WhatsApp number with country code
            </p>
          </div>
        )}
      </div>
    )}
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
            disabled={
              !formData.requestType ||
              !formData.serviceType ||
              !formData.contactInfo.name ||
              !formData.contactInfo.phone ||
              !formData.contactInfo.email ||
              (formData.emergency.isEmergency && !formData.contactInfo.whatsApp)
            }
            className="px-8 py-3"
          >
            {formData.emergency.isEmergency ? 'Request Emergency Service' : 'Submit Request'}
          </Button>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
      <SharedFooter />
    </div>
  );
};

export default PlumberRequestForm;