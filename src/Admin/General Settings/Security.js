import React, { useState } from 'react';
import {
  Shield, Lock, Key, Smartphone, Mail, AlertTriangle,
  CheckCircle, X, Eye, EyeOff, RefreshCcw, Save, User,
  FileText, AlertCircle, LogIn
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/switch';
import { Input } from '../../components/ui/input';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactor: {
      enabled: true,
      method: 'app' // 'app' or 'sms'
    },
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireNumbers: true,
      requireSymbols: true,
      expiryDays: 90
    },
    loginSecurity: {
      maxAttempts: 5,
      lockoutDuration: 30,
      sessionTimeout: 60
    },
    ipWhitelist: {
      enabled: false,
      addresses: ['192.168.1.1']
    },
    adminAccess: {
      requireApproval: true,
      auditLogging: true,
      restrictedIPs: true
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Recent security events mock data
  const securityEvents = [
    {
      type: 'login_attempt',
      status: 'success',
      user: 'admin@kokobeo.com',
      ip: '192.168.1.1',
      location: 'Toronto, CA',
      timestamp: '2024-02-07 14:30:00'
    },
    {
      type: 'setting_change',
      status: 'success',
      user: 'admin@kokobeo.com',
      ip: '192.168.1.1',
      location: 'Toronto, CA',
      timestamp: '2024-02-07 14:25:00'
    },
    {
      type: 'login_attempt',
      status: 'failed',
      user: 'unknown',
      ip: '192.168.1.100',
      location: 'Unknown',
      timestamp: '2024-02-07 14:20:00'
    }
  ];

  const handleSave = async () => {
    setIsLoading(true);
    setSaveStatus(null);
    
    try {
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
              <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
              <p className="text-gray-600 mt-1">Configure security and authentication settings</p>
            </div>

            {/* Two-Factor Authentication */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.twoFactor.enabled}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      twoFactor: {
                        ...settings.twoFactor,
                        enabled: checked
                      }
                    })}
                  />
                </div>

                {settings.twoFactor.enabled && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Authentication Method
                      </label>
                      <select
                        value={settings.twoFactor.method}
                        onChange={(e) => setSettings({
                          ...settings,
                          twoFactor: {
                            ...settings.twoFactor,
                            method: e.target.value
                          }
                        })}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="app">Authenticator App</option>
                        <option value="sms">SMS Verification</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Password Policy */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Password Policy</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    value={settings.passwordPolicy.minLength}
                    onChange={(e) => setSettings({
                      ...settings,
                      passwordPolicy: {
                        ...settings.passwordPolicy,
                        minLength: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="8"
                    max="32"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Uppercase Letters</span>
                    <Switch
                      checked={settings.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          requireUppercase: checked
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Numbers</span>
                    <Switch
                      checked={settings.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          requireNumbers: checked
                        }
                      })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Require Special Characters</span>
                    <Switch
                      checked={settings.passwordPolicy.requireSymbols}
                      onCheckedChange={(checked) => setSettings({
                        ...settings,
                        passwordPolicy: {
                          ...settings.passwordPolicy,
                          requireSymbols: checked
                        }
                      })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password Expiry (Days)
                  </label>
                  <input
                    type="number"
                    value={settings.passwordPolicy.expiryDays}
                    onChange={(e) => setSettings({
                      ...settings,
                      passwordPolicy: {
                        ...settings.passwordPolicy,
                        expiryDays: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="0"
                  />
                </div>
              </div>
            </Card>

            {/* Login Security */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Login Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Login Attempts
                  </label>
                  <input
                    type="number"
                    value={settings.loginSecurity.maxAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      loginSecurity: {
                        ...settings.loginSecurity,
                        maxAttempts: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Lockout Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.loginSecurity.lockoutDuration}
                    onChange={(e) => setSettings({
                      ...settings,
                      loginSecurity: {
                        ...settings.loginSecurity,
                        lockoutDuration: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Session Timeout (Minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.loginSecurity.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      loginSecurity: {
                        ...settings.loginSecurity,
                        sessionTimeout: parseInt(e.target.value)
                      }
                    })}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1"
                  />
                </div>
              </div>
            </Card>

            {/* IP Whitelist */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">IP Whitelist</h2>
                  <p className="text-sm text-gray-500">Restrict access to specific IP addresses</p>
                </div>
                <Switch
                  checked={settings.ipWhitelist.enabled}
                  onCheckedChange={(checked) => setSettings({
                    ...settings,
                    ipWhitelist: {
                      ...settings.ipWhitelist,
                      enabled: checked
                    }
                  })}
                />
              </div>

              {settings.ipWhitelist.enabled && (
                <div className="space-y-4 pt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter IP address"
                      className="flex-1"
                    />
                    <Button>Add IP</Button>
                  </div>

                  <div className="space-y-2">
                    {settings.ipWhitelist.addresses.map((ip, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span>{ip}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Admin Access Controls */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Admin Access Controls</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Require Approval</p>
                      <p className="text-sm text-gray-500">New admin accounts need approval</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.adminAccess.requireApproval}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      adminAccess: {
                        ...settings.adminAccess,
                        requireApproval: checked
                      }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">Audit Logging</p>
                      <p className="text-sm text-gray-500">Log all admin actions</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.adminAccess.auditLogging}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      adminAccess: {
                        ...settings.adminAccess,
                        auditLogging: checked
                      }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">IP Restrictions</p>
                      <p className="text-sm text-gray-500">Restrict admin access by IP</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.adminAccess.restrictedIPs}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      adminAccess: {
                        ...settings.adminAccess,
                        restrictedIPs: checked
                      }
                    })}
                  />
                </div>
              </div>
            </Card>

            {/* Recent Security Events */}
            <Card className="p-6">
  <h2 className="text-lg font-semibold mb-4">Recent Security Events</h2>
  <div className="space-y-4">
    {securityEvents.map((event, index) => (
      <div
        key={index}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg gap-3"
      >
        <div className="flex items-start sm:items-center gap-3">
          {event.status === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-500 mt-1 sm:mt-0" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-red-500 mt-1 sm:mt-0" />
          )}
          <div>
            <p className="font-medium">
              {event.type === 'login_attempt' ? 'Login Attempt' : 'Setting Change'}
            </p>
            <div className="text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
              <span>{event.user}</span>
              <span className="hidden sm:inline mx-1">•</span>
              <span>{event.ip}</span>
              <span className="hidden sm:inline mx-1">•</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <span className="text-sm text-gray-500 ml-8 sm:ml-0">{event.timestamp}</span>
      </div>
    ))}
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
                  Security settings saved successfully!
                </AlertDescription>
              </Alert>
            )}

            {saveStatus === 'error' && (
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  Failed to save security settings. Please try again.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <SharedFooter2/> */}
    </div>
  );
};

export default SecuritySettings;