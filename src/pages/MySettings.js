import React, { useState } from 'react';
import {
  Bell, Lock, CreditCard, Globe, Mail, Phone,
  User, Shield, Settings, Eye, EyeOff, Smartphone,
  Moon, Sun, DollarSign, BellOff, Zap, Languages,
  Key, LogOut, Trash2, AlertCircle, Laptop, GitBranchPlusIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Switch } from '../components/ui/switch';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const MySettings = () => {
  // State for various settings
  const [settings, setSettings] = useState({
    notifications: {
      email: {
        newMessages: true,
        projectInvites: true,
        projectUpdates: true,
        marketing: false
      },
      push: {
        newMessages: true,
        projectInvites: true,
        projectUpdates: false,
        marketing: false
      },
      desktop: {
        enabled: true,
        soundEnabled: true
      }
    },
    privacy: {
      profileVisibility: 'public',
      showEarnings: true,
      showLastSeen: true,
      showAvailability: true
    },
    communication: {
      preferredLanguage: 'English',
      timezone: 'America/New_York',
      currency: 'USD'
    },
    security: {
      twoFactorEnabled: true,
      loginNotifications: true,
      devices: [
        {
          id: 1,
          name: 'MacBook Pro',
          lastActive: '2 hours ago',
          location: 'Toronto, Canada',
          current: true
        },
        {
          id: 2,
          name: 'iPhone 13',
          lastActive: '5 mins ago',
          location: 'Toronto, Canada',
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
        city: 'Toronto',
        state: 'ON',
        zip: 'M5V 2T6',
        country: 'Canada'
      },
      taxId: 'TAX123456',
      autoRecharge: true,
      rechargeThreshold: 100,
      rechargeAmount: 500
    }
  });

  const [activeSection, setActiveSection] = useState('general');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Navigation items for settings
  const navItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'connected', label: 'Connected Accounts', icon: Globe }
  ];

  // Languages available
  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'
  ];

  // Timezones (simplified list)
  const timezones = [
    'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'
  ];

  // Handler for notification toggle
  const handleNotificationToggle = (category, type) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [category]: {
          ...prev.notifications[category],
          [type]: !prev.notifications[category][type]
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
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

            {/* Danger Zone */}
            {/* <Card className="p-4 mt-6 border-red-200">
              <h3 className="text-sm font-medium text-red-700 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </Card> */}
          </aside>

          {/* Settings Content */}
          <div className="flex-1 space-y-6">
            {activeSection === 'general' && (
              <>
                {/* General Settings */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">General Settings</h2>
                  
                  {/* Language Preferences */}
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Language
                      </label>
                      <select
                        value={settings.communication.preferredLanguage}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          communication: {
                            ...prev.communication,
                            preferredLanguage: e.target.value
                          }
                        }))}
                        className="w-full md:w-64 rounded-lg border-gray-300"
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>

                    {/* Timezone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.communication.timezone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          communication: {
                            ...prev.communication,
                            timezone: e.target.value
                          }
                        }))}
                        className="w-full md:w-64 rounded-lg border-gray-300"
                      >
                        {timezones.map((timezone) => (
                          <option key={timezone} value={timezone}>{timezone}</option>
                        ))}
                      </select>
                    </div>

                    {/* Currency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Currency
                      </label>
                      <select
                        value={settings.communication.currency}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          communication: {
                            ...prev.communication,
                            currency: e.target.value
                          }
                        }))}
                        className="w-full md:w-64 rounded-lg border-gray-300"
                      >
                        <option value="USD">USD - US Dollar</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - British Pound</option>
                        <option value="CAD">CAD - Canadian Dollar</option>
                      </select>
                    </div>
                  </div>

                  {/* Danger Zone */}
           


                </Card>
              </>
            )}

            {activeSection === 'notifications' && (
              <>
                {/* Email Notifications */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Email Notifications</h2>
                  <div className="space-y-4">
                    {Object.entries(settings.notifications.email).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Receive notifications about {key.toLowerCase()}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={() => handleNotificationToggle('email', key)}
                        />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Push Notifications */}
                <Card className="p-6">
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
                          onCheckedChange={() => handleNotificationToggle('push', key)}
                        />
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Desktop Notifications */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Desktop Notifications</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Enable Desktop Notifications</h3>
                        <p className="text-sm text-gray-500">
                          Show notifications on your desktop
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.desktop.enabled}
                        onCheckedChange={() => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            desktop: {
                              ...prev.notifications.desktop,
                              enabled: !prev.notifications.desktop.enabled
                            }
                          }
                        }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Notification Sounds</h3>
                        <p className="text-sm text-gray-500">
                          Play sounds for notifications
                        </p>
                      </div>
                      <Switch
                        checked={settings.notifications.desktop.soundEnabled}
                        onCheckedChange={() => setSettings(prev => ({
                          ...prev,
                          notifications: {
                            ...prev.notifications,
                            desktop: {
                              ...prev.notifications.desktop,
                              soundEnabled: !prev.notifications.desktop.soundEnabled
                            }
                          }
                        }))}
                      />
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeSection === 'privacy' && (
              <>
                {/* Privacy Settings */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <select
                        value={settings.privacy.profileVisibility}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          privacy: {
                            ...prev.privacy,
                            profileVisibility: e.target.value
                          }
                        }))}
                        className="w-full rounded-lg border-gray-300"
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
                          <h3 className="font-medium">Show Earnings</h3>
                          <p className="text-sm text-gray-500">
                            Display your earnings on your profile
                          </p>
                        </div>
                        <Switch
                          checked={settings.privacy.showEarnings}
                          onCheckedChange={() => setSettings(prev => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              showEarnings: !prev.privacy.showEarnings
                            }
                          }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Show Availability</h3>
                          <p className="text-sm text-gray-500">
                            Display your availability status
                          </p>
                        </div>
                        <Switch
                          checked={settings.privacy.showAvailability}
                          onCheckedChange={() => setSettings(prev => ({
                            ...prev,
                            privacy: {
                              ...prev.privacy,
                              showAvailability: !prev.privacy.showAvailability
                            }
                          }))}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeSection === 'security' && (
              <>
                {/* Security Settings */}
                <Card className="p-6">
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
                        onCheckedChange={() => setSettings(prev => ({
                          ...prev,
                          security: {
                            ...prev.security,
                            twoFactorEnabled: !prev.security.twoFactorEnabled
                          }
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
                        onCheckedChange={() => setSettings(prev => ({
                          ...prev,
                          security: {
                            ...prev.security,
                            loginNotifications: !prev.security.loginNotifications
                          }
                        }))}
                      />
                    </div>

                    {/* Active Sessions */}
                    <div className="border-t pt-6">
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
            )}

            {activeSection === 'billing' && (
              <>
                {/* Billing Settings */}
                <Card className="p-6">
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
                          <div>
                            {settings.billing.billingAddress.city}, {settings.billing.billingAddress.state}
                          </div>
                          <div>{settings.billing.billingAddress.zip}</div>
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
                          checked={settings.billing.autoRecharge}
                          onCheckedChange={() => setSettings(prev => ({
                            ...prev,
                            billing: {
                              ...prev.billing,
                              autoRecharge: !prev.billing.autoRecharge
                            }
                          }))}
                        />
                      </div>

                      {settings.billing.autoRecharge && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Threshold
                            </label>
                            <select
                              value={settings.billing.rechargeThreshold}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                billing: {
                                  ...prev.billing,
                                  rechargeThreshold: parseInt(e.target.value)
                                }
                              }))}
                              className="w-full rounded-lg border-gray-300"
                            >
                              <option value="50">$50</option>
                              <option value="100">$100</option>
                              <option value="200">$200</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Recharge Amount
                            </label>
                            <select
                              value={settings.billing.rechargeAmount}
                              onChange={(e) => setSettings(prev => ({
                                ...prev,
                                billing: {
                                  ...prev.billing,
                                  rechargeAmount: parseInt(e.target.value)
                                }
                              }))}
                              className="w-full rounded-lg border-gray-300"
                            >
                              <option value="100">$100</option>
                              <option value="500">$500</option>
                              <option value="1000">$1,000</option>
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </>
            )}

            {activeSection === 'connected' && (
              <>
                {/* Connected Accounts */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Connected Accounts</h2>
                  <div className="space-y-4">
                    {/* GitHub */}
                    {/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Github className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">GitHub</h3>
                          <p className="text-sm text-gray-500">
                            Connect your GitHub account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div> */}

                    {/* LinkedIn */}
                    {/* <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Linkedin className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">LinkedIn</h3>
                          <p className="text-sm text-gray-500">
                            Connect your LinkedIn account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div> */}

                    {/* StackOverflow */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Globe className="h-6 w-6" />
                        <div>
                          <h3 className="font-medium">StackOverflow</h3>
                          <p className="text-sm text-gray-500">
                            Connect your StackOverflow account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                </Card>
              </>
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

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Footer Actions - Mobile Only */}
      <SharedFooter2/>
    </div>
  );
};

export default MySettings;