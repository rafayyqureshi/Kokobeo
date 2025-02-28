import React, { useState } from 'react';
import { 
  User, Edit, MapPin, Globe, Star, Shield, Settings,
  Award, FileText, Clock, DollarSign, Briefcase,
  Languages, Mail, Phone, Link as LinkIcon, Heart,
  MessageSquare, Upload, X, Plus, Camera, Building,
  Bell, Lock, Sun, Moon, CheckCircle, AlertCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const ClientProfileSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [settings, setSettings] = useState({
    profile: {
      name: "Emma Thompson",
      title: "Senior Project Manager",
      company: "TechVision Solutions Ltd",
      email: "emma.thompson@email.com",
      phone: "+44 20 1234 5678",
      location: "London, United Kingdom",
      bio: "Experienced project manager with 10+ years specializing in digital transformation and innovation initiatives.",
      website: "https://techvision.com",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
      socialLinks: {
        linkedin: "https://linkedin.com/in/emmathompson",
        twitter: "https://twitter.com/emmathompson",
        github: "https://github.com/emmathompson"
      }
    },
    company: {
      name: "TechVision Solutions Ltd",
      tradingName: "", // Added new field as per request
      size: "50-100 employees",
      industry: "Technology & Software",
      description: "Leading digital transformation consultancy specializing in enterprise solutions",
      address: "123 Tech Street, London",
      registrationNumber: "UK12345678",
      foundedYear: "2018",
      website: "https://techvision.com"
    },
    preferences: {
      projectTypes: ["Web Development", "Mobile Apps", "UI/UX Design"],
      expertise: ["React", "Node.js", "AWS", "UI/UX"],
      industries: ["Technology", "Finance", "Healthcare"],
      budget: {
        minimum: 5000,
        maximum: 50000,
        currency: "USD"
      },
      availabilityHours: {
        start: "09:00",
        end: "18:00",
        timezone: "GMT+0"
      }
    },
    notifications: {
      email: {
        projectUpdates: true,
        messages: true,
        proposals: true,
        marketing: false
      },
      push: {
        projectUpdates: true,
        messages: true,
        proposals: true,
        marketing: false
      }
    },
    privacy: {
      profileVisibility: "public",
      showBudget: true,
      showContact: false,
      showLocation: true
    },
    security: {
      twoFactorEnabled: true,
      loginNotifications: true,
      devices: [
        {
          name: "MacBook Pro",
          lastActive: "2 hours ago",
          location: "London, UK",
          current: true
        },
        {
          name: "iPhone 13",
          lastActive: "5 mins ago",
          location: "London, UK",
          current: false
        }
      ]
    }
  });

  // Navigation items for settings
  const navItems = [
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'company', label: 'Company Details', icon: Building },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setSettings(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            photo: URL.createObjectURL(file)
          }
        }));
        setIsUploading(false);
      }, 1500);
    }
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Navigation */}
          <aside className="md:w-64">
            <Card className="p-2">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                      ${activeSection === item.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Card>

            {/* Danger Zone (Commented out as per original code) */}
            {/* <Card className="p-4 mt-6 border-red-200">
              <h3 className="text-sm font-medium text-red-700 mb-4">Danger Zone</h3>
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete Account
              </Button>
            </Card> */}
          </aside>

          {/* Settings Content */}
          <div className="flex-1">
            {activeSection === 'profile' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>

                {/* Profile Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Profile Photo</label>
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={settings.profile.photo}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size <= 2 * 1024 * 1024) { // 2MB limit
                              handlePhotoUpload(e);
                            } else {
                              alert('Photo must be less than 2MB');
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Recommended: Square image, at least 400x400px</p>
                      <p>Maximum size: 2MB</p>
                    </div>
                  </div>
                </div>

                {/* Cover Photo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Cover Photo</label>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={settings.profile.coverPhoto}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <label className="absolute bottom-4 right-4 p-2 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                        <Camera className="w-4 h-4" />
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setSettings(prev => ({
                                  ...prev,
                                  profile: {
                                    ...prev.profile,
                                    coverPhoto: reader.result
                                  }
                                }));
                              };
                              reader.readAsDataURL(file);
                            } else {
                              alert('Cover photo must be less than 5MB');
                            }
                          }}
                        />
                      </label>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Recommended: 1500x500px for best display</p>
                      <p>Maximum size: 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={settings.profile.title}
                        onChange={(e) => handleInputChange('profile', 'title', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        value={settings.profile.phone}
                        onChange={(e) => handleInputChange('profile', 'phone', e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea
                      value={settings.profile.bio}
                      onChange={(e) => handleInputChange('profile', 'bio', e.target.value)}
                      rows={4}
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>

                  {/* Social Links */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Social Links</label>
                    <div className="space-y-2">
                      {Object.entries(settings.profile.socialLinks).map(([platform, url]) => (
                        <div key={platform} className="flex gap-2">
                          <input
                            type="url"
                            value={url}
                            onChange={(e) => {
                              setSettings(prev => ({
                                ...prev,
                                profile: {
                                  ...prev.profile,
                                  socialLinks: {
                                    ...prev.profile.socialLinks,
                                    [platform]: e.target.value
                                  }
                                }
                              }));
                            }}
                            placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                            className="flex-1 p-2 border rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const { [platform]: _, ...rest } = settings.profile.socialLinks;
                              setSettings(prev => ({
                                ...prev,
                                profile: {
                                  ...prev.profile,
                                  socialLinks: rest
                                }
                              }));
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          setSettings(prev => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              socialLinks: {
                                ...prev.profile.socialLinks,
                                newPlatform: ''
                              }
                            }
                          }));
                        }}
                      >
                        Add Social Link
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'preferences' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Preferences</h2>
                
                {/* Project Types */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project Types</label>
                    <div className="space-y-2">
                      {settings.preferences.projectTypes.map((type, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={type}
                            onChange={(e) => {
                              const newTypes = [...settings.preferences.projectTypes];
                              newTypes[index] = e.target.value;
                              handleInputChange('preferences', 'projectTypes', newTypes);
                            }}
                            className="flex-1 p-2 border rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newTypes = settings.preferences.projectTypes.filter((_, i) => i !== index);
                              handleInputChange('preferences', 'projectTypes', newTypes);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleInputChange('preferences', 'projectTypes', [...settings.preferences.projectTypes, '']);
                        }}
                      >
                        Add Project Type
                      </Button>
                    </div>
                  </div>

                  {/* Required Expertise */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Expertise</label>
                    <div className="space-y-2">
                      {settings.preferences.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newSkills = [...settings.preferences.expertise];
                              newSkills[index] = e.target.value;
                              handleInputChange('preferences', 'expertise', newSkills);
                            }}
                            className="flex-1 p-2 border rounded-lg"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const newSkills = settings.preferences.expertise.filter((_, i) => i !== index);
                              handleInputChange('preferences', 'expertise', newSkills);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleInputChange('preferences', 'expertise', [...settings.preferences.expertise, '']);
                        }}
                      >
                        Add Expertise
                      </Button>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                        <input
                          type="number"
                          value={settings.preferences.budget.minimum}
                          onChange={(e) => {
                            handleInputChange('preferences', 'budget', {
                              ...settings.preferences.budget,
                              minimum: parseInt(e.target.value)
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                        <input
                          type="number"
                          value={settings.preferences.budget.maximum}
                          onChange={(e) => {
                            handleInputChange('preferences', 'budget', {
                              ...settings.preferences.budget,
                              maximum: parseInt(e.target.value)
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Currency</label>
                        <select
                          value={settings.preferences.budget.currency}
                          onChange={(e) => {
                            handleInputChange('preferences', 'budget', {
                              ...settings.preferences.budget,
                              currency: e.target.value
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Availability Hours */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Availability Hours</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                        <input
                          type="time"
                          value={settings.preferences.availabilityHours.start}
                          onChange={(e) => {
                            handleInputChange('preferences', 'availabilityHours', {
                              ...settings.preferences.availabilityHours,
                              start: e.target.value
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">End Time</label>
                        <input
                          type="time"
                          value={settings.preferences.availabilityHours.end}
                          onChange={(e) => {
                            handleInputChange('preferences', 'availabilityHours', {
                              ...settings.preferences.availabilityHours,
                              end: e.target.value
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Timezone</label>
                        <select
                          value={settings.preferences.availabilityHours.timezone}
                          onChange={(e) => {
                            handleInputChange('preferences', 'availabilityHours', {
                              ...settings.preferences.availabilityHours,
                              timezone: e.target.value
                            });
                          }}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="GMT+0">GMT+0</option>
                          <option value="GMT+1">GMT+1</option>
                          <option value="GMT-5">GMT-5</option>
                          {/* Add more timezone options */}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
                
                {/* Email Notifications */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      {Object.entries(settings.notifications.email).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            <p className="text-sm text-gray-600">Receive email notifications for {key}</p>
                          </div>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => {
                              handleInputChange('notifications', 'email', {
                                ...settings.notifications.email,
                                [key]: checked
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Push Notifications */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      {Object.entries(settings.notifications.push).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</p>
                            <p className="text-sm text-gray-600">Receive push notifications for {key}</p>
                          </div>
                          <Switch
                            checked={value}
                            onCheckedChange={(checked) => {
                              handleInputChange('notifications', 'push', {
                                ...settings.notifications.push,
                                [key]: checked
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'privacy' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Visibility</label>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handleInputChange('privacy', 'profileVisibility', e.target.value)}
                      className="w-full p-2 border rounded-lg"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>

                  {/* Privacy Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Budget</p>
                        <p className="text-sm text-gray-600">Display your budget range on your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showBudget}
                        onCheckedChange={(checked) => handleInputChange('privacy', 'showBudget', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Contact Information</p>
                        <p className="text-sm text-gray-600">Display your contact details on your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showContact}
                        onCheckedChange={(checked) => handleInputChange('privacy', 'showContact', checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Location</p>
                        <p className="text-sm text-gray-600">Display your location on your profile</p>
                      </div>
                      <Switch
                        checked={settings.privacy.showLocation}
                        onCheckedChange={(checked) => handleInputChange('privacy', 'showLocation', checked)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeSection === 'company' && (
              <div className="space-y-6">
                {/* Basic Company Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Company Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <input
                          type="text"
                          value={settings.company.name}
                          onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Trading Name (if different)</label>
                        <input
                          type="text"
                          value={settings.company.tradingName}
                          onChange={(e) => handleInputChange('company', 'tradingName', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter trading name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Company Description</label>
                      <textarea
                        value={settings.company.description}
                        onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                        rows={4}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Describe your company's mission, values, and expertise..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Industry</label>
                        <select
                          value={settings.company.industry}
                          onChange={(e) => handleInputChange('company', 'industry', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="retail">Retail</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="services">Professional Services</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Company Size</label>
                        <select
                          value={settings.company.size}
                          onChange={(e) => handleInputChange('company', 'size', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="501-1000">501-1000 employees</option>
                          <option value="1000+">1000+ employees</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Founded Year</label>
                        <input
                          type="number"
                          value={settings.company.foundedYear}
                          onChange={(e) => handleInputChange('company', 'foundedYear', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="YYYY"
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Registration & Legal Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Registration & Legal Information</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Company Registration Number</label>
                        <input
                          type="text"
                          value={settings.company.registrationNumber}
                          onChange={(e) => handleInputChange('company', 'registrationNumber', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter registration number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">VAT Number</label>
                        <input
                          type="text"
                          value={settings.company.vatNumber}
                          onChange={(e) => handleInputChange('company', 'vatNumber', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter VAT number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Tax ID</label>
                        <input
                          type="text"
                          value={settings.company.taxId}
                          onChange={(e) => handleInputChange('company', 'taxId', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                          placeholder="Enter tax ID"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Legal Status</label>
                        <select
                          value={settings.company.legalStatus}
                          onChange={(e) => handleInputChange('company', 'legalStatus', e.target.value)}
                          className="w-full p-2 border rounded-lg"
                        >
                          <option value="">Select Legal Status</option>
                          <option value="limited">Limited Company</option>
                          <option value="llp">Limited Liability Partnership</option>
                          <option value="partnership">Partnership</option>
                          <option value="soleTrader">Sole Trader</option>
                          <option value="plc">Public Limited Company</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Contact Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    {/* Business Address */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Business Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Street Address</label>
                          <input
                            type="text"
                            value={settings.company.address.street}
                            onChange={(e) => handleInputChange('company', 'address', {
                              ...settings.company.address,
                              street: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter street address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">City</label>
                          <input
                            type="text"
                            value={settings.company.address.city}
                            onChange={(e) => handleInputChange('company', 'address', {
                              ...settings.company.address,
                              city: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter city"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">State/Province</label>
                          <input
                            type="text"
                            value={settings.company.address.state}
                            onChange={(e) => handleInputChange('company', 'address', {
                              ...settings.company.address,
                              state: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter state/province"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Postal Code</label>
                          <input
                            type="text"
                            value={settings.company.address.postalCode}
                            onChange={(e) => handleInputChange('company', 'address', {
                              ...settings.company.address,
                              postalCode: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter postal code"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Country</label>
                          <select
                            value={settings.company.address.country}
                            onChange={(e) => handleInputChange('company', 'address', {
                              ...settings.company.address,
                              country: e.target.value
                            })}
                            className="w-full p-2 border rounded-lg"
                          >
                            <option value="">Select Country</option>
                            <option value="UK">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="AU">Australia</option>
                            {/* Add more countries as needed */}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Contact Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Business Phone</label>
                          <input
                            type="tel"
                            value={settings.company.phone}
                            onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter business phone"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Business Email</label>
                          <input
                            type="email"
                            value={settings.company.email}
                            onChange={(e) => handleInputChange('company', 'email', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter business email"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Website</label>
                          <input
                            type="url"
                            value={settings.company.website}
                            onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            placeholder="Enter website URL"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Save Changes Button */}
                {/* <div className="flex justify-end">
                  <Button className="w-32">
                    Save Changes
                  </Button>
                </div> */}
              </div>
            )}

            {activeSection === 'security' && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  {/* Two-Factor Authentication */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorEnabled}
                      onCheckedChange={(checked) => handleInputChange('security', 'twoFactorEnabled', checked)}
                    />
                  </div>

                  {/* Login Notifications */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-gray-600">Get notified of new sign-ins to your account</p>
                    </div>
                    <Switch
                      checked={settings.security.loginNotifications}
                      onCheckedChange={(checked) => handleInputChange('security', 'loginNotifications', checked)}
                    />
                  </div>

                  {/* Active Sessions */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                    <div className="space-y-4">
                      {settings.security.devices.map((device, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{device.name}</p>
                            <p className="text-sm text-gray-600">{device.location} • {device.lastActive}</p>
                          </div>
                          {!device.current && (
                            <Button variant="outline" size="sm">
                              Revoke Access
                            </Button>
                          )}
                          {device.current && (
                            <Badge className="bg-green-50 text-green-700">
                              Current Device
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Change Password */}
                  <div>
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              Delete Account
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
            </p>
            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // Handle account deletion
                  setShowDeleteConfirm(false);
                }}
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Save Button */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-end">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg shadow-lg flex items-center gap-2"
            onClick={() => {
              // Add your save logic here
              console.log('Saving settings...', settings);
              // You could add a toast notification here
            }}
          >
            <CheckCircle className="h-5 w-5" />
            Save Changes
          </Button>
        </div>
      </div>
      <br /><br /><br /><br /><br />

      <SharedFooter2 />
    </div>
  );
};

export default ClientProfileSettings;