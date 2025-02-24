  // LocalProfessionalSettings.jsx
  import React, { useState, useCallback } from 'react';
  import {
    User, Save, ArrowLeft, Plus, X, Camera, DollarSign,
    Building, Tool, AlertCircle, Award, Shield, Wrench, CheckSquare,
    TowerControlIcon
  } from 'lucide-react';
  import { Button } from '../../components/ui/Button';
  import { Switch } from '../../components/ui/switch';
  import { Card } from '../../components/ui/card';
  import SharedHeader5 from '../../Headers/SharedHeader4';
  import SharedFooter2 from '../../Footer/SharedFooter2';
  import initialState from '../../pages/Main/initialstate';
  import SharedHeader4 from '../../Headers/SharedHeader4';

  // Add the initial state here
const defaultBusinessInfo = {
  operatingHours: {
    regular: {
      weekdays: { start: '', end: '', enabled: true },
      weekends: { start: '', end: '', enabled: true }
    },
    emergency: {
      weekdays: { start: '', end: '', enabled: true },
      weekends: { start: '', end: '', enabled: true }
    }
  }
};

// Initialize settings by merging with default business info
initialState.businessInfo = {
  ...initialState.businessInfo,
  ...defaultBusinessInfo
};
  
  const Header = ({ hasChanges, onSave }) => (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-gray-600"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Profile
            </Button>
            {/* <h1 className="text-xl font-semibold">Profile Settings</h1> */}
          </div>
          <Button 
            onClick={onSave}
            disabled={!hasChanges}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
  
  const SettingsNavigation = ({ activeTab, setActiveTab }) => {
    const navItems = [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'business', label: 'Business Info', icon: Building },
      { id: 'services', label: 'Services', icon: TowerControlIcon },
      { id: 'emergency', label: 'Emergency Services', icon: AlertCircle },
      { id: 'equipment', label: 'Equipment', icon: Wrench },
      { id: 'safety', label: 'Safety Protocols', icon: CheckSquare }
    ];
    
  
    return (
      <div className="lg:w-64 flex-shrink-0"  style={{ textAlign: 'left' }}>
        <Card className="p-2 sticky top-24">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                  activeTab === item.id
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
      </div>
    );
  };
  
  const ProfileSection = ({ settings, onInputChange, onPhotoUpload, uploadingPhoto, uploadingCover }) => (
    <>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Profile Photos</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-4">Profile Photo</label>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {settings.personal.photo ? (
                    <img
                      src={settings.personal.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-gray-400 m-6" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white cursor-pointer hover:bg-blue-700">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => onPhotoUpload('profile', e)}
                    disabled={uploadingPhoto}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </Card>
  
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Basic Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={settings.personal.name}
                onChange={(e) => onInputChange('personal', null, 'name', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Professional Title</label>
              <input
                type="text"
                value={settings.personal.title}
                onChange={(e) => onInputChange('personal', null, 'title', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-2">Professional Bio</label>
            <textarea
              value={settings.personal.bio}
              onChange={(e) => onInputChange('personal', null, 'bio', e.target.value)}
              rows={5}
              className="w-full p-2 border rounded-lg resize-none"
            />
          </div>
        </div>
      </Card>
    </>
  );
  
  const ServicesSection = ({ settings, onInputChange }) => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Services</h2>
      <div className="space-y-6">
        {settings.services.regular.map((service, index) => (
          <div key={service.id} className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="flex justify-between">
              <div className="flex-1 space-y-4">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => {
                    const updatedServices = [...settings.services.regular];
                    updatedServices[index].name = e.target.value;
                    onInputChange('services', null, 'regular', updatedServices);
                  }}
                  className="w-full p-2 border rounded-lg"
                />
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 text-gray-400" />
                      <input
                        type="number"
                        value={service.basePrice}
                        onChange={(e) => {
                          const updatedServices = [...settings.services.regular];
                          updatedServices[index].basePrice = Number(e.target.value);
                          onInputChange('services', null, 'regular', updatedServices);
                        }}
                        className="w-full pl-8 p-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <Switch
                    checked={service.enabled}
                    onCheckedChange={(checked) => {
                      const updatedServices = [...settings.services.regular];
                      updatedServices[index].enabled = checked;
                      onInputChange('services', null, 'regular', updatedServices);
                    }}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  const updatedServices = settings.services.regular.filter((_, i) => i !== index);
                  onInputChange('services', null, 'regular', updatedServices);
                }}
                className="p-1 text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={() => {
            const newService = {
              id: Date.now(),
              name: '',
              basePrice: 0,
              description: '',
              enabled: true
            };
            onInputChange('services', null, 'regular', [...settings.services.regular, newService]);
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>
    </Card>
  );

  // Add this before the LocalProfessionalSettings component

  const BusinessSection = ({ settings, onInputChange }) => (
    <>
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Business Information</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={settings.businessInfo.companyName}
                onChange={(e) => onInputChange('businessInfo', null, 'companyName', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registration Number</label>
              <input
                type="text"
                value={settings.businessInfo.registrationNumber}
                onChange={(e) => onInputChange('businessInfo', null, 'registrationNumber', e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
        </div>
      </Card>
  
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Service Areas</h2>
        <div className="space-y-4">
          {settings.businessInfo.serviceAreas.map((area, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={area}
                onChange={(e) => {
                  const updatedAreas = [...settings.businessInfo.serviceAreas];
                  updatedAreas[index] = e.target.value;
                  onInputChange('businessInfo', null, 'serviceAreas', updatedAreas);
                }}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                onClick={() => {
                  const updatedAreas = settings.businessInfo.serviceAreas.filter((_, i) => i !== index);
                  onInputChange('businessInfo', null, 'serviceAreas', updatedAreas);
                }}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              onInputChange('businessInfo', null, 'serviceAreas', [...settings.businessInfo.serviceAreas, '']);
            }}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service Area
          </Button>
        </div>
      </Card>
  
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Operating Hours</h2>
        <div className="space-y-8">
          {/* Regular Hours Section */}
          <div>
            <h3 className="text-md font-medium mb-4">Regular Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Weekdays</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.regular.weekdays.start}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                        ...settings.businessInfo.operatingHours.regular,
                        weekdays: {
                          ...settings.businessInfo.operatingHours.regular.weekdays,
                          start: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.regular.weekdays.end}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                        ...settings.businessInfo.operatingHours.regular,
                        weekdays: {
                          ...settings.businessInfo.operatingHours.regular.weekdays,
                          end: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <Switch
                  checked={settings.businessInfo.operatingHours.regular.weekdays.enabled}
                  onCheckedChange={(checked) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                    ...settings.businessInfo.operatingHours.regular,
                    weekdays: {
                      ...settings.businessInfo.operatingHours.regular.weekdays,
                      enabled: checked
                    }
                  })}
                />
              </div>
  
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Weekends</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.regular.weekends.start}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                        ...settings.businessInfo.operatingHours.regular,
                        weekends: {
                          ...settings.businessInfo.operatingHours.regular.weekends,
                          start: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.regular.weekends.end}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                        ...settings.businessInfo.operatingHours.regular,
                        weekends: {
                          ...settings.businessInfo.operatingHours.regular.weekends,
                          end: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <Switch
                  checked={settings.businessInfo.operatingHours.regular.weekends.enabled}
                  onCheckedChange={(checked) => onInputChange('businessInfo', 'operatingHours', 'regular', {
                    ...settings.businessInfo.operatingHours.regular,
                    weekends: {
                      ...settings.businessInfo.operatingHours.regular.weekends,
                      enabled: checked
                    }
                  })}
                />
              </div>
            </div>
          </div>
  
          {/* Emergency Hours Section */}
          <div>
            <h3 className="text-md font-medium mb-4">Emergency Hours</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Weekdays</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.emergency.weekdays.start}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                        ...settings.businessInfo.operatingHours.emergency,
                        weekdays: {
                          ...settings.businessInfo.operatingHours.emergency.weekdays,
                          start: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.emergency.weekdays.end}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                        ...settings.businessInfo.operatingHours.emergency,
                        weekdays: {
                          ...settings.businessInfo.operatingHours.emergency.weekdays,
                          end: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <Switch
                  checked={settings.businessInfo.operatingHours.emergency.weekdays.enabled}
                  onCheckedChange={(checked) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                    ...settings.businessInfo.operatingHours.emergency,
                    weekdays: {
                      ...settings.businessInfo.operatingHours.emergency.weekdays,
                      enabled: checked
                    }
                  })}
                />
              </div>
  
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Weekends</label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.emergency.weekends.start}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                        ...settings.businessInfo.operatingHours.emergency,
                        weekends: {
                          ...settings.businessInfo.operatingHours.emergency.weekends,
                          start: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                    <input
                      type="time"
                      value={settings.businessInfo.operatingHours.emergency.weekends.end}
                      onChange={(e) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                        ...settings.businessInfo.operatingHours.emergency,
                        weekends: {
                          ...settings.businessInfo.operatingHours.emergency.weekends,
                          end: e.target.value
                        }
                      })}
                      className="p-2 border rounded-lg"
                    />
                  </div>
                </div>
                <Switch
                  checked={settings.businessInfo.operatingHours.emergency.weekends.enabled}
                  onCheckedChange={(checked) => onInputChange('businessInfo', 'operatingHours', 'emergency', {
                    ...settings.businessInfo.operatingHours.emergency,
                    weekends: {
                      ...settings.businessInfo.operatingHours.emergency.weekends,
                      enabled: checked
                    }
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
  
  const EmergencySection = ({ settings, onInputChange }) => (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Emergency Services</h2>
        <Switch
          checked={settings.services.emergency.enabled}
          onCheckedChange={(checked) => onInputChange('services', 'emergency', 'enabled', checked)}
        />
      </div>
  
      {settings.services.emergency.enabled && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Response Time (minutes)</label>
              <input
                type="number"
                value={settings.services.emergency.responseTime}
                onChange={(e) => onInputChange('services', 'emergency', 'responseTime', Number(e.target.value))}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Callout Fee</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="number"
                  value={settings.services.emergency.calloutFee}
                  onChange={(e) => onInputChange('services', 'emergency', 'calloutFee', Number(e.target.value))}
                  className="w-full pl-8 p-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
  
          <div className="space-y-4">
            {settings.services.emergency.services.map((service, index) => (
              <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => {
                    const updatedServices = [...settings.services.emergency.services];
                    updatedServices[index].name = e.target.value;
                    onInputChange('services', 'emergency', 'services', updatedServices);
                  }}
                  className="flex-1 p-2 border rounded-lg mr-4"
                />
                <Switch
                  checked={service.enabled}
                  onCheckedChange={(checked) => {
                    const updatedServices = [...settings.services.emergency.services];
                    updatedServices[index].enabled = checked;
                    onInputChange('services', 'emergency', 'services', updatedServices);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
  
  const SafetySection = ({ settings, onInputChange }) => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Safety Protocols</h2>
      <div className="space-y-4">
        {settings.safetyProtocols.measures.map((measure, index) => (
          <div key={measure.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={measure.name}
              onChange={(e) => {
                const updatedMeasures = [...settings.safetyProtocols.measures];
                updatedMeasures[index].name = e.target.value;
                onInputChange('safetyProtocols', null, 'measures', updatedMeasures);
              }}
              className="flex-1 p-2 border rounded-lg mr-4"
            />
            <Switch
              checked={measure.enabled}
              onCheckedChange={(checked) => {
                const updatedMeasures = [...settings.safetyProtocols.measures];
                updatedMeasures[index].enabled = checked;
                onInputChange('safetyProtocols', null, 'measures', updatedMeasures);
              }}
            />
          </div>
        ))}
  
        <Button
          variant="outline"
          onClick={() => {
            const newMeasure = {
              id: Date.now(),
              name: '',
              enabled: true
            };
            onInputChange('safetyProtocols', null, 'measures', 
              [...settings.safetyProtocols.measures, newMeasure]
            );
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Safety Protocol
        </Button>
      </div>
    </Card>
  );
  
  const EquipmentSection = ({ settings, onInputChange }) => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Equipment</h2>
      <div className="space-y-4">
        {settings.equipment.items.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              value={item.name}
              onChange={(e) => {
                const updatedItems = [...settings.equipment.items];
                updatedItems[index].name = e.target.value;
                onInputChange('equipment', null, 'items', updatedItems);
              }}
              className="flex-1 p-2 border rounded-lg mr-4"
            />
            <Switch
              checked={item.enabled}
              onCheckedChange={(checked) => {
                const updatedItems = [...settings.equipment.items];
                updatedItems[index].enabled = checked;
                onInputChange('equipment', null, 'items', updatedItems);
              }}
            />
          </div>
        ))}
  
        <Button
          variant="outline"
          onClick={() => {
            const newItem = {
              id: Date.now(),
              name: '',
              enabled: true
            };
            onInputChange('equipment', null, 'items', 
              [...settings.equipment.items, newItem]
            );
          }}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Equipment
        </Button>
      </div>
    </Card>
  );
  
  // Helper function to read file as data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  // API mock function
  const saveSettings = async (settings) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  };
  
  const LocalProfessionalSettings = () => {
    const [hasChanges, setHasChanges] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [uploadingPhoto, setUploadingPhoto] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [settings, setSettings] = useState(initialState);
  
    const handleInputChange = useCallback((section, subsection, field, value) => {
      setSettings(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...(subsection 
            ? { [subsection]: { ...prev[section][subsection], [field]: value } }
            : { [field]: value }
          )
        }
      }));
      setHasChanges(true);
    }, []);
  
    const handlePhotoUpload = useCallback(async (type, event) => {
      const file = event.target.files?.[0];
      if (!file) return;
  
      const upload = type === 'profile' ? setUploadingPhoto : setUploadingCover;
      upload(true);
  
      try {
        const result = await readFileAsDataURL(file);
        setSettings(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            [type === 'profile' ? 'photo' : 'coverPhoto']: result
          }
        }));
        setHasChanges(true);
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        upload(false);
      }
    }, []);
  
    const handleSave = useCallback(async () => {
      try {
        await saveSettings(settings);
        setHasChanges(false);
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    }, [settings]);
  
    return (
      <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
        <SharedHeader4 />
        <Header hasChanges={hasChanges} onSave={handleSave} />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <SettingsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="flex-1 space-y-6">
              {activeTab === 'profile' && (
                <ProfileSection 
                  settings={settings}
                  onInputChange={handleInputChange}
                  onPhotoUpload={handlePhotoUpload}
                  uploadingPhoto={uploadingPhoto}
                  uploadingCover={uploadingCover}
                />
              )}
              
              {activeTab === 'business' && (
                <BusinessSection
                  settings={settings}
                  onInputChange={handleInputChange}
                />
              )}
              
              {activeTab === 'services' && (
                <ServicesSection 
                  settings={settings}
                  onInputChange={handleInputChange}
                />
              )}
              
              {activeTab === 'emergency' && (
                <EmergencySection 
                  settings={settings}
                  onInputChange={handleInputChange}
                />
              )}
              
              {activeTab === 'safety' && (
                <SafetySection 
                  settings={settings}
                  onInputChange={handleInputChange}
                />
              )}
              
              {activeTab === 'equipment' && (
                <EquipmentSection 
                  settings={settings}
                  onInputChange={handleInputChange}
                />
              )}
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
  
        <SharedFooter2 />
      </div>
    );
  };
  
  export default LocalProfessionalSettings;