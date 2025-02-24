import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, Globe, Settings, 
  Bell, Shield, Trash2, Camera, Languages, Calendar,
  DollarSign, Clock, MapPin, Link as LinkIcon
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter from '../Footer/SharedFooter';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    timezone: 'UTC-5',
    languages: ['English', 'Spanish'],
    
    // Notifications
    emailNotifications: {
      newMessages: true,
      projectUpdates: true,
      newsletters: false,
      marketing: false
    },
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    
    // Availability
    availability: {
      status: 'available',
      hours: {
        start: '09:00',
        end: '17:00'
      },
      daysAvailable: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    
    // Professional Info
    hourlyRate: '75',
    skills: ['Web Development', 'React', 'Node.js'],
    yearsOfExperience: '8',
    profileCompleteness: 85
  });

  const [imageFile, setImageFile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="mt-1 text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {/* Profile Completeness */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-600" />
              Profile Completeness
            </h2>
            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${formData.profileCompleteness}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Your profile is {formData.profileCompleteness}% complete
              </p>
            </div>
          </Card>

          {/* Profile Picture */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                  {imageFile ? (
                    <img 
                      src={imageFile} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-full w-full p-4 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                  <Camera className="h-4 w-4" />
                  <input 
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div>
                <h3 className="font-medium">Profile Photo</h3>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, GIF or PNG. Max size of 800K
                </p>
              </div>
            </div>
          </Card>

          {/* Basic Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Basic Information
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                    className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTC-8">Pacific Time (PT)</option>
                    <option value="UTC-5">Eastern Time (ET)</option>
                    <option value="UTC+0">Greenwich Mean Time (GMT)</option>
                    <option value="UTC+1">Central European Time (CET)</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Availability Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Availability Settings
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Days
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <label
                      key={day}
                      className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.availability.daysAvailable.includes(day)}
                        onChange={(e) => {
                          const days = e.target.checked
                            ? [...formData.availability.daysAvailable, day]
                            : formData.availability.daysAvailable.filter(d => d !== day);
                          setFormData({
                            ...formData,
                            availability: {
                              ...formData.availability,
                              daysAvailable: days
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
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={formData.availability.hours.start}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {
                        ...formData.availability,
                        hours: {
                          ...formData.availability.hours,
                          start: e.target.value
                        }
                      }
                    })}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <input
                    type="time"
                    value={formData.availability.hours.end}
                    onChange={(e) => setFormData({
                      ...formData,
                      availability: {
                        ...formData.availability,
                        hours: {
                          ...formData.availability.hours,
                          end: e.target.value
                        }
                      }
                    })}
                    className="mt-1 w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Professional Information */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              Professional Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Hourly Rate (USD)
                </label>
                <div className="relative mt-1 w-full sm:w-64">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData({...formData, hourlyRate: e.target.value})}
                    className="w-full pl-10 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => {
                          const newSkills = formData.skills.filter((_, i) => i !== index);
                          setFormData({...formData, skills: newSkills});
                        }}
                        className="hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Add skill..."
                    className="inline-flex items-center px-3 py-1 border rounded-full text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value) {
                        setFormData({
                          ...formData,
                          skills: [...formData.skills, e.target.value]
                        });
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              Privacy Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={formData.profileVisibility}
                  onChange={(e) => setFormData({...formData, profileVisibility: e.target.value})}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="connections">Connections Only</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Show Email Address</h3>
                  <p className="text-sm text-gray-500">Display your email to potential clients</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showEmail}
                    onChange={(e) => setFormData({...formData, showEmail: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Show Phone Number</h3>
                  <p className="text-sm text-gray-500">Display your phone number to potential clients</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.showPhone}
                    onChange={(e) => setFormData({...formData, showPhone: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">New Messages</h3>
                  <p className="text-sm text-gray-500">Get notified when you receive new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications.newMessages}
                    onChange={(e) => setFormData({
                      ...formData,
                      emailNotifications: {
                        ...formData.emailNotifications,
                        newMessages: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Project Updates</h3>
                  <p className="text-sm text-gray-500">Get notified about your project status changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications.projectUpdates}
                    onChange={(e) => setFormData({
                      ...formData,
                      emailNotifications: {
                        ...formData.emailNotifications,
                        projectUpdates: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-4 border-t">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications.marketing}
                    onChange={(e) => setFormData({
                      ...formData,
                      emailNotifications: {
                        ...formData.emailNotifications,
                        marketing: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Delete Account */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete Account
            </h2>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={() => console.log('Settings saved:', formData)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? All of your data will be permanently removed.
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log('Account deleted');
                  setShowDeleteConfirm(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <SharedFooter />
    </div>
  );
};

export default ProfileSettings;