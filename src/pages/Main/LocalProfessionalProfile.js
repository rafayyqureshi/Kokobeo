import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Edit, MapPin, Globe, Star, Shield, Link as LinkIcon,
  Award, FileText, Clock, DollarSign, Briefcase, Calendar,
  Languages, Mail, Phone, MessageCircle, Upload, X, Plus,
  Settings, Check, Camera, Building, PenToolIcon, Home,
  CheckCircle, Heart, RefreshCw, Download, Search, ChevronRight,
  AlertCircle, CheckSquare, BriefcaseIcon, Users, Wrench,
  Timer, AlertTriangle, PhoneCall, BellRing, Tool, Zap,
  TowerControlIcon
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import SharedHeader5 from '../../Headers/SharedHeader5';
import SharedFooter2 from '../../Footer/SharedFooter2';

const LocalProfessionalProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [editedBio, setEditedBio] = useState('');

  // Initial profile data state with emergency service information
  const [profileData, setProfileData] = useState({
    personal: {
      name: "John Smith",
      title: "Master Plumber",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      coverPhoto: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece",
      location: "Toronto, Canada",
      bio: "Licensed master plumber with over 15 years of experience in residential and commercial plumbing services. Specializing in emergency repairs, installations, and maintenance. Available 24/7 for urgent plumbing needs.",
      email: "john.smith@example.com",
      phone: "+1 (416) 555-0123",
      whatsapp: "+1 (416) 555-0124",
      emergencyPhone: "+1 (416) 555-0125",
      joined: "January 2020",
      lastActive: "5 minutes ago",
      verified: true,
      backgroundChecked: true,
      insurance: {
        provider: "SafeGuard Insurance",
        coverage: "$2,000,000",
        verified: true
      }
    },

    businessInfo: {
      companyName: "Smith's Professional Plumbing",
      registrationNumber: "PLB123456",
      serviceAreas: [
        "North York",
        "Downtown Toronto",
        "Scarborough",
        "Etobicoke"
      ],
      operatingHours: {
        regular: {
          weekdays: "8:00 AM - 6:00 PM",
          weekends: "9:00 AM - 5:00 PM"
        },
        emergency: "24/7"
      }
    },

    services: {
      regular: [
        {
          name: "Pipe Repair & Installation",
          basePrice: "From $150",
          description: "Complete pipe services including repair, replacement, and new installations"
        },
        {
          name: "Water Heater Services",
          basePrice: "From $200",
          description: "Installation, repair, and maintenance of water heaters"
        },
        {
          name: "Drain Cleaning",
          basePrice: "From $120",
          description: "Professional drain cleaning and unclogging services"
        }
      ],
      emergency: {
        available: true,
        responseTime: "Under 30 minutes",
        calloutFee: "$85",
        hourlyRate: "$150",
        coverage: "24/7",
        services: [
          "Burst Pipes",
          "Severe Leaks",
          "Blocked Drains",
          "Water Heater Failures"
        ]
      }
    },

    qualifications: {
      licenses: [
        {
          name: "Master Plumber License",
          issuer: "Toronto Plumbing Board",
          number: "MPL-2024-123",
          verified: true
        }
      ],
      certifications: [
        {
          name: "Emergency Response Certified",
          issuer: "Emergency Services Institute",
          year: "2023"
        },
        {
          name: "Green Plumbing Certified",
          issuer: "Environmental Plumbing Association",
          year: "2023"
        }
      ]
    },

    stats: {
      completedJobs: 1250,
      emergencyResponses: 180,
      averageResponse: "22 mins",
      rating: 4.9,
      totalReviews: 450,
      repeatClients: 178,
      successRate: 98
    },

    reviews: [
      {
        id: 1,
        client: {
          name: "Sarah Johnson",
          photo: "https://randomuser.me/api/portraits/women/1.jpg",
          location: "North York"
        },
        type: "Emergency Service",
        rating: 5,
        date: "2024-01-20",
        response: "20 minutes",
        service: "Burst Pipe Repair",
        comment: "John arrived quickly and fixed our burst pipe efficiently. Excellent emergency service!"
      },
      {
        id: 2,
        client: {
          name: "Michael Chen",
          photo: "https://randomuser.me/api/portraits/men/2.jpg",
          location: "Downtown Toronto"
        },
        type: "Regular Service",
        rating: 5,
        date: "2024-01-18",
        service: "Water Heater Installation",
        comment: "Very professional and thorough with the installation. Great value for money."
      }
    ],

    activeJobs: [
      {
        id: "JOB-2024-001",
        type: "Emergency",
        status: "In Progress",
        client: "David Wilson",
        location: "Scarborough",
        service: "Major Leak Repair",
        startTime: "2024-01-26 14:30",
        estimatedDuration: "2 hours"
      }
    ],

    safetyMeasures: [
      "COVID-19 Safety Protocols",
      "Personal Protective Equipment",
      "Sanitized Tools",
      "Social Distancing Practices"
    ],

    equipmentTools: [
      "Advanced Leak Detection Equipment",
      "CCTV Drain Camera",
      "Hydro Jetting Machine",
      "Emergency Response Vehicle"
    ]
  });

  // Handler for saving edited bio
  const handleSaveChanges = () => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: editedBio
      }
    }));
    setIsEditing(false);
  };

  // Start editing handler
  const startEditing = () => {
    setEditedBio(profileData.personal.bio);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      {/* Hero Section */}
      <div className="relative h-[480px] sm:h-[400px]">
        {/* Cover Photo with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${profileData.personal.coverPhoto})`,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backgroundBlend: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />

        {/* Profile Content */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center sm:items-start">
              {/* Profile Image */}
              <div className="absolute left-1/2 sm:left-4 top-0 sm:relative transform -translate-x-1/2 sm:translate-x-0 sm:top-auto">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img 
                    src={profileData.personal.photo}
                    alt={profileData.personal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {profileData.personal.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full">
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>
              <br></br>

              {/* Profile Info */}
              <div className="text-center sm:text-left text-white mt-4 sm:mt-0">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-bold">{profileData.personal.name}</h1>
                  <p className="text-xl text-gray-200">{profileData.personal.title}</p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    {profileData.personal.verified && (
                      <Badge variant="secondary" className="bg-green-500/20">
                        Verified Professional
                      </Badge>
                    )}
                    {profileData.personal.backgroundChecked && (
                      <Badge variant="secondary" className="bg-blue-500/20">
                        Background Checked
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.personal.location}
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {profileData.businessInfo.companyName}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Button 
                onClick={() => window.location.href = '/local/settings'}
                variant="outline"
                className="w-full sm:w-auto bg-black/20 border-white/20 hover:bg-black/40 text-black"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button 
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Emergency Contact
              </Button>
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-16 sm:mt-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                Completed Jobs
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.completedJobs}
              </p>
              <p className="text-sm text-gray-600">
                Total jobs completed
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Timer className="h-6 w-6 text-red-600" />
              </div>
              <Badge className="bg-red-100 text-red-700">
                Response Time
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.averageResponse}
              </p>
              <p className="text-sm text-gray-600">
                Average response time
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-100 text-yellow-700">
                Rating
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.rating}
              </p>
              <p className="text-sm text-gray-600">
                {profileData.stats.totalReviews} reviews
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-700">
                Repeat Clients
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.repeatClients}
              </p>
              <p className="text-sm text-gray-600">
                Returning customers
              </p>
            </div>
          </Card>
        </div>

        {/* Emergency Services Alert */}
        {profileData.services.emergency.available && (
          <Card className="mb-8 bg-red-50 border-red-200">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">24/7 Emergency Services Available</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-red-700">
                        <Clock className="h-5 w-5" />
                        <span>Response Time: {profileData.services.emergency.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-700">
                        <DollarSign className="h-5 w-5" />
                        <span>Callout Fee: {profileData.services.emergency.calloutFee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-700">
                        <PhoneCall className="h-5 w-5" />
                        <span>Emergency Line: {profileData.personal.emergencyPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-red-700">
                        <MapPin className="h-5 w-5" />
                        <span>All Service Areas Covered</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-800 mb-2">Emergency Services Include:</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.services.emergency.services.map((service, index) => (
                          <Badge key={index} className="bg-red-100 text-red-800">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Tabs Navigation */}
        <div className="mb-8 border-b overflow-x-auto">
          <div className="flex whitespace-nowrap gap-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'services', label: 'Services & Pricing' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'qualifications', label: 'Qualifications' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 relative ${
                  selectedTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-6">
            {selectedTab === 'overview' && (
              <>
                {/* About Section */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  {isEditing ? (
                    <div className="space-y-4">
                      <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full p-3 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your business and services..."
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleSaveChanges}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.personal.bio}
                    </p>
                  )}
                </Card>

                {/* Service Areas */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    Service Areas
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {profileData.businessInfo.serviceAreas.map((area, index) => (
                      <Badge key={index} className="bg-blue-50 text-blue-700">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Operating Hours */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Operating Hours
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Regular Hours</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Weekdays</p>
                          <p className="font-medium">{profileData.businessInfo.operatingHours.regular.weekdays}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Weekends</p>
                          <p className="font-medium">{profileData.businessInfo.operatingHours.regular.weekends}</p>
                        </div>
                      </div>
                    </div>
                    {profileData.services.emergency.available && (
                      <div>
                        <h3 className="font-medium mb-2">Emergency Services</h3>
                        <p className="text-red-600 font-medium">{profileData.businessInfo.operatingHours.emergency}</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Safety & Equipment */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Safety & Equipment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        Safety Measures
                      </h3>
                      <ul className="space-y-2">
                        {profileData.safetyMeasures.map((measure, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <Check className="h-4 w-4 text-green-500" />
                            {measure}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <TowerControlIcon className="h-5 w-5 text-blue-600" />
                        Professional Equipment
                      </h3>
                      <ul className="space-y-2">
                        {profileData.equipmentTools.map((tool, index) => (
                          <li key={index} className="flex items-center gap-2 text-gray-600">
                            <Check className="h-4 w-4 text-blue-500" />
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {selectedTab === 'services' && (
              <>
                {/* Regular Services */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Regular Services</h2>
                  <div className="space-y-6">
                    {profileData.services.regular.map((service, index) => (
                      <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <Badge className="bg-blue-50 text-blue-700">
                            {service.basePrice}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{service.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Emergency Services */}
                {profileData.services.emergency.available && (
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      Emergency Services
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h3 className="font-medium text-red-800 mb-2">Response Time</h3>
                          <p className="text-red-600">{profileData.services.emergency.responseTime}</p>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h3 className="font-medium text-red-800 mb-2">Callout Fee</h3>
                          <p className="text-red-600">{profileData.services.emergency.calloutFee}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Emergency Services Include:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {profileData.services.emergency.services.map((service, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </>
            )}

            {selectedTab === 'reviews' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Client Reviews</h2>
                <div className="space-y-6">
                  {profileData.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={review.client.photo}
                            alt={review.client.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900">{review.client.name}</h3>
                            <p className="text-sm text-gray-500">{review.client.location}</p>
                          </div>
                        </div>
                        <Badge className={review.type === 'Emergency Service' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                          {review.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">• {review.date}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{review.comment}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Service: {review.service}</span>
                        {review.response && (
                          <>
                            <span>•</span>
                            <span>Response Time: {review.response}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {selectedTab === 'qualifications' && (
              <>
                {/* Licenses */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Professional Licenses</h2>
                  <div className="space-y-4">
                    {profileData.qualifications.licenses.map((license, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">{license.name}</h3>
                            {license.verified && (
                              <Badge className="bg-green-100 text-green-800">Verified</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {license.issuer} • License #{license.number}
                          </p>
                        </div>
                        <Shield className="h-5 w-5 text-green-600" />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Certifications */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibolHere's the remaining code for the Local Professional Profile that continues from where it left off:

```jsx
d mb-6">Professional Certifications</h2>
                  <div className="space-y-4">
                    {profileData.qualifications.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{cert.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                        <Award className="h-5 w-5 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.location}</span>
                </div>
                {profileData.personal.whatsapp && (
                  <div className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>{profileData.personal.whatsapp}</span>
                  </div>
                )}
              </div>
            </Card>

            {/* Insurance Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Insurance Coverage</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Provider</span>
                  <span className="font-medium">{profileData.personal.insurance.provider}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Coverage Amount</span>
                  <span className="font-medium">{profileData.personal.insurance.coverage}</span>
                </div>
                {profileData.personal.insurance.verified && (
                  <Badge className="w-full justify-center bg-green-50 text-green-700">
                    <Shield className="w-4 h-4 mr-1" />
                    Verified Coverage
                  </Badge>
                )}
              </div>
            </Card>

            {/* Active Jobs */}
            {profileData.activeJobs.length > 0 && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Active Jobs</h2>
                <div className="space-y-4">
                  {profileData.activeJobs.map((job) => (
                    <div key={job.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{job.service}</h3>
                        <Badge className={job.type === 'Emergency' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                          {job.type}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>Started: {job.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      <SharedFooter2 />
    </div>
  );
};

export default LocalProfessionalProfile;