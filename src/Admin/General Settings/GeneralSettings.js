import React, { useState } from 'react';
import {
  Settings, Globe, Bell, Mail, Clock, Monitor,
  Smartphone, Save, Upload, AlertCircle, CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/switch';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/Textarea';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter3 from '../../Footer/SharedFooter3';
import SharedFooter2 from '../../Footer/SharedFooter2';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    platformName: 'Kokobeo',
    supportEmail: 'support@kokobeo.com',
    timezone: 'America/Toronto',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      userRegistrations: true,
      newOrders: true,
      systemUpdates: true
    },
    maintenance: {
      enabled: false,
      message: 'System is under maintenance. Please try again later.'
    },
    appearance: {
      darkMode: false,
      compactView: false
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
              <p className="text-gray-600 mt-1">Configure basic platform settings and preferences</p>
            </div>

            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform Name
                  </label>
                  <Input
                    value={settings.platformName}
                    onChange={(e) => setSettings({
                      ...settings,
                      platformName: e.target.value
                    })}
                    placeholder="Enter platform name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <Input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      supportEmail: e.target.value
                    })}
                    placeholder="Enter support email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time Zone
                    </label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({
                        ...settings,
                        timezone: e.target.value
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="America/Toronto">Eastern Time (ET)</option>
                      <option value="America/Vancouver">Pacific Time (PT)</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Language
                    </label>
                    <select
                      value={settings.language}
                      onChange={(e) => setSettings({
                        ...settings,
                        language: e.target.value
                      })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive important updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        email: checked
                      }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-gray-500">Get instant alerts on your devices</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.notifications.push}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        push: checked
                      }
                    })}
                  />
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-medium">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">New User Registrations</span>
                      <Switch
                        checked={settings.notifications.userRegistrations}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            userRegistrations: checked
                          }
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">New Orders</span>
                      <Switch
                        checked={settings.notifications.newOrders}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            newOrders: checked
                          }
                        })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">System Updates</span>
                      <Switch
                        checked={settings.notifications.systemUpdates}
                        onCheckedChange={(checked) => setSettings({
                          ...settings,
                          notifications: {
                            ...settings.notifications,
                            systemUpdates: checked
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Maintenance Mode */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Maintenance Mode</h2>
                  <p className="text-sm text-gray-500">Enable when performing system updates</p>
                </div>
                <Switch
                  checked={settings.maintenance.enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    maintenance: {
                      ...settings.maintenance,
                      enabled: checked
                    }
                  })}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maintenance Message
                </label>
                <Textarea
                  value={settings.maintenance.message}
                  onChange={(e) => setSettings({
                    ...settings,
                    maintenance: {
                      ...settings.maintenance,
                      message: e.target.value
                    }
                  })}
                  rows={3}
                  placeholder="Enter maintenance message"
                />
              </div>
            </Card>

            




            {/* Save Changes */}
            <div className="flex items-center justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

            {/* Status Messages */}
            {saveStatus === 'success' && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Settings saved successfully!
                </AlertDescription>
              </Alert>
            )}

            {saveStatus === 'error' && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Failed to save settings. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
      <br></br>
      <br></br>
      <br></br>
      {/* <SharedFooter2/> */}
    </div>
  );
};

export default GeneralSettings;