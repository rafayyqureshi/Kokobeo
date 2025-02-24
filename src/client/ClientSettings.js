import React, { useState, useRef } from 'react';
import {
  Bell, Lock, CreditCard, Globe, Mail, Phone,
  User, Shield, Settings, Eye, EyeOff, Smartphone,
  Moon, Sun, DollarSign, BellOff, Zap, Languages,
  Key, LogOut, Trash2, AlertCircle, Laptop, Building,
  MapPin, ChevronRight, Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const ClientSettings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);
  
  // Settings state
  const [settings, setSettings] = useState({
    notifications: {
      email: {
        newMessages: true,
        serviceUpdates: true,
        emergencyAlerts: true,
        marketing: false,
        pricing: true
      },
      push: {
        newMessages: true,
        serviceUpdates: true,
        emergencyAlerts: true,
        marketing: false
      },
      emergency: {
        sms: true,
        whatsapp: true,
        call: false
      }
    },
    privacy: {
      profileVisibility: 'public',
      showContactInfo: false,
      showLocation: true,
      showSpending: false
    },
    security: {
      twoFactorEnabled: true,
      loginNotifications: true,
      devices: [
        {
          id: 1,
          name: 'MacBook Pro',
          lastActive: '2 hours ago',
          location: 'London, UK',
          current: true
        },
        {
          id: 2,
          name: 'iPhone 13',
          lastActive: '5 mins ago',
          location: 'London, UK',
          current: true
        }
      ]
    },
    billing: {
      defaultPayment: {
        type: 'credit_card',
        last4: '4242',
        expiryDate: '12/24'
      },
      billingAddress: {
        street: '123 Main St',
        city: 'London',
        postcode: 'SW1A 1AA',
        country: 'United Kingdom'
      },
      autoRecharge: {
        enabled: true,
        threshold: 100,
        amount: 500
      }
    },
    preferences: {
      language: 'English',
      currency: 'GBP',
      timezone: 'Europe/London'
    },
    profile: {
      coverPhoto: '/api/placeholder/1200/300'
    }
  });

  // Navigation items for settings
  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const handleCoverPhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSettings(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            coverPhoto: e.target.result
          }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Render the General Settings section
  const renderGeneral = () => (
    <>
      <Card className="p-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
        
        {/* Cover Photo Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Cover Photo</h3>
          <div className="relative">
            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={settings.profile.coverPhoto} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 right-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleCoverPhotoChange}
                accept="image/*"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                className="bg-white shadow-md"
              >
                <Camera className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Language Preference */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Language
            </label>
            <select
              value={settings.preferences.language}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, language: e.target.value }
              }))}
              className="w-full md:w-64 p-2 border rounded-lg"
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Currency
            </label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, currency: e.target.value }
              }))}
              className="w-full md:w-64 p-2 border rounded-lg"
            >
              <option value="GBP">British Pound (£)</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Timezone
            </label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, timezone: e.target.value }
              }))}
              className="w-full md:w-64 p-2 border rounded-lg"
            >
              <option value="Europe/London">London (GMT+0)</option>
              <option value="Europe/Paris">Paris (GMT+1)</option>
              <option value="America/New_York">New York (GMT-5)</option>
            </select>
          </div>
        </div>
      </Card>

      <Card className="p-6 mt-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Profile Visibility</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Public Profile</h3>
              <p className="text-sm text-gray-500">Make your profile visible to professionals</p>
            </div>
            <Switch
              checked={settings.privacy.profileVisibility === 'public'}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                privacy: {
                  ...prev.privacy,
                  profileVisibility: checked ? 'public' : 'private'
                }
              }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Show Contact Info</h3>
              <p className="text-sm text-gray-500">Display your contact information on your profile</p>
            </div>
            <Switch
              checked={settings.privacy.showContactInfo}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                privacy: { ...prev.privacy, showContactInfo: checked }
              }))}
            />
          </div>
        </div>
      </Card>
    </>
  );

  // Render the Notifications section
  const renderNotifications = () => (
    <>
      <Card className="p-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-gray-500">
                  Receive email notifications about {key.toLowerCase()}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    email: {
                      ...prev.notifications.email,
                      [key]: checked
                    }
                  }
                }))}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mt-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Push Notifications</h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <p className="text-sm text-gray-500">
                  Receive push notifications about {key.toLowerCase()}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    push: {
                      ...prev.notifications.push,
                      [key]: checked
                    }
                  }
                }))}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 mt-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Emergency Notifications</h2>
        <div className="space-y-4">
          {Object.entries(settings.notifications.emergency).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h3 className="font-medium capitalize">{key.toUpperCase()} Alerts</h3>
                <p className="text-sm text-gray-500">
                  Receive emergency alerts via {key}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  notifications: {
                    ...prev.notifications,
                    emergency: {
                      ...prev.notifications.emergency,
                      [key]: checked
                    }
                  }
                }))}
              />
            </div>
          ))}
        </div>
      </Card>
    </>
  );

  // Render the Security section
  const renderSecurity = () => (
    <>
      <Card className="p-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
        <div className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch
              checked={settings.security.twoFactorEnabled}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, twoFactorEnabled: checked }
              }))}
            />
          </div>

          {/* Login Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Login Notifications</h3>
              <p className="text-sm text-gray-500">
                Get notified of new sign-ins to your account
              </p>
            </div>
            <Switch
              checked={settings.security.loginNotifications}
              onCheckedChange={(checked) => setSettings(prev => ({
                ...prev,
                security: { ...prev.security, loginNotifications: checked }
              }))}
            />
          </div>

          {/* Active Sessions */}
          <div className="border-t pt-6" style={{ textAlign: 'left' }}>
            <h3 className="font-medium mb-4">Active Sessions</h3>
            <div className="space-y-4">
              {settings.security.devices.map(device => (
                <div key={device.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    {device.name.includes('iPhone') ? (
                      <Smartphone className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Laptop className="h-5 w-5 text-gray-500" />
                    )}
                    <div>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-gray-500">
                        {device.location} • {device.lastActive}
                      </div>
                    </div>
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
        </div>
      </Card>
    </>
  );

  // Render the Billing section
  const renderBilling = () => (
    <>
      <Card className="p-6" style={{ textAlign: 'left' }}>
        <h2 className="text-xl font-semibold mb-6">Billing Settings</h2>
        
        {/* Payment Method */}
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">Default Payment Method</h3>
            <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="font-medium">
                    •••• •••• •••• {settings.billing.defaultPayment.last4}
                  </div>
                  <div className="text-sm text-gray-500">
                    Expires {settings.billing.defaultPayment.expiryDate}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>

          {/* Billing Address */}
          <div>
            <h3 className="font-medium mb-4">Billing Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-1">
                <div>{settings.billing.billingAddress.street}</div>
                <div>{settings.billing.billingAddress.city}</div>
                <div>{settings.billing.billingAddress.postcode}</div>
                <div>{settings.billing.billingAddress.country}</div>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Edit Address
              </Button>
            </div>
          </div>

          {/* Auto-Recharge */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Auto-Recharge</h3>
                <p className="text-sm text-gray-500">
                  Automatically add funds when balance is low
                </p>
              </div>
              <Switch
                checked={settings.billing.autoRecharge.enabled}
                onCheckedChange={(checked) => setSettings(prev => ({
                  ...prev,
                  billing: {
                    ...prev.billing,
                    autoRecharge: {
                      ...prev.billing.autoRecharge,
                      enabled: checked
                    }
                  }
                }))}
              />
            </div>

            {settings.billing.autoRecharge.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Threshold
                  </label>
                  <select
                    value={settings.billing.autoRecharge.threshold}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      billing: {
                        ...prev.billing,
                        autoRecharge: {
                          ...prev.billing.autoRecharge,
                          threshold: parseInt(e.target.value)
                        }
                      }
                    }))}
                    className="w-full rounded-lg border-gray-300"
                  >
                    <option value="50">£50</option>
                    <option value="100">£100</option>
                    <option value="200">£200</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Recharge Amount
                  </label>
                  <select
                    value={settings.billing.autoRecharge.amount}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      billing: {
                        ...prev.billing,
                        autoRecharge: {
                          ...prev.billing.autoRecharge,
                          amount: parseInt(e.target.value)
                        }
                      }
                    }))}
                    className="w-full rounded-lg border-gray-300"
                  >
                    <option value="100">£100</option>
                    <option value="500">£500</option>
                    <option value="1000">£1,000</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );

  // Main content renderer based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneral();
      case 'notifications':
        return renderNotifications();
      case 'security':
        return renderSecurity();
      case 'billing':
        return renderBilling();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
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
                        : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </Card>
          </aside>

          {/* Settings Content */}
          <div className="flex-1">
            {renderContent()}
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

      <br/>
      <br/>
      <br/>
      <br/>

      <SharedFooter2 />
    </div>
  );
};

export default ClientSettings;