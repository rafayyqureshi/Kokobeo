import React, { useState, useEffect } from 'react';
import {
  FormInput, Plus, Edit, Trash2, Eye, Settings,
  Search, Filter, FileText, Calendar, CheckSquare,
  Save, Copy, ArrowUp, ArrowDown, Building2,
  Globe, Link, AlertCircle, Users, CheckCircle,
  RefreshCw, Upload, Download, Share2, X, Gift,
  UserPlus, Bell, Camera, Star
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors whitespace-nowrap text-sm sm:text-base ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
    <span>{label}</span>
  </button>
);

const CategoryForms = () => {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFormEditor, setShowFormEditor] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [autoSync, setAutoSync] = useState(true);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [promotionCount, setPromotionCount] = useState(2);
  const [filterOptions, setFilterOptions] = useState({
    formType: 'all',
    status: 'all',
    region: 'all'
  });
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock users for notifications and permissions
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "professional",
      category: "Plumber",
      status: "active",
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      type: "professional",
      category: "Electrician",
      status: "active",
      permissions: {
        camera: true,
        notifications: false
      }
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      type: "customer",
      status: "active",
      permissions: {
        camera: true,
        notifications: true
      }
    }
  ];

  const forms = [
    {
      id: 1,
      name: "Plumbing Service Request",
      category: "Plumbing",
      type: "quote",
      status: "active",
      lastModified: "2024-02-18",
      region: "Canada",
      fields: [
        { id: "service_type", label: "Service Type", type: "select", required: true, options: ["Emergency Repair", "Installation", "Maintenance"] },
        { id: "description", label: "Problem Description", type: "textarea", required: true },
        { id: "location", label: "Service Location", type: "address", required: true },
        { id: "timeline", label: "Preferred Timeline", type: "radio", options: ["Emergency (ASAP)", "Within 24 hours", "Within a week"] },
        { id: "photos", label: "Photos of the Issue", type: "file", multiple: true, accept: "image/*" }
      ],
      pricing: { quotePrice: { standard: 10, emergency: 25 }, commission: { standard: "10%", emergency: "15%" } },
      settings: { autoAssign: true, requireVerification: true, allowMultipleQuotes: true, maxQuotes: 5, autoPromote: false, promotionCount: 0 },
      stats: { submissions: 245, conversionRate: "68%", avgResponseTime: "2.5 hours", purchasedCount: 142, hiredCount: 56 }
    },
    {
      id: 2,
      name: "Emergency Electrical Service",
      category: "Electrical",
      type: "emergency",
      status: "active",
      lastModified: "2024-02-17",
      region: "Canada",
      fields: [
        { id: "emergency_type", label: "Emergency Type", type: "select", required: true, options: ["Power Outage", "Electrical Fire Risk", "Circuit Issues"] },
        { id: "safety_status", label: "Safety Status", type: "radio", required: true, options: ["Safe Area", "Potentially Dangerous", "Immediate Danger"] }
      ],
      pricing: { quotePrice: { standard: 15, emergency: 35 }, commission: { standard: "12%", emergency: "20%" } },
      settings: { autoAssign: true, requireVerification: true, allowMultipleQuotes: false, maxQuotes: 1, autoPromote: true, promotionCount: 1 },
      stats: { submissions: 128, conversionRate: "82%", avgResponseTime: "35 minutes", purchasedCount: 94, hiredCount: 24 }
    },
    {
      id: 3,
      name: "Legal Consultation Request",
      category: "Legal",
      type: "quote",
      status: "active",
      lastModified: "2024-02-16",
      region: "Canada",
      fields: [
        { id: "legal_area", label: "Area of Law", type: "select", required: true, options: ["Family Law", "Real Estate", "Corporate", "Immigration", "Criminal Defense"] },
        { id: "description", label: "Brief Description of Legal Issue", type: "textarea", required: true }
      ],
      pricing: { quotePrice: { standard: 18, emergency: 40 }, commission: { standard: "15%", emergency: "22%" } },
      settings: { autoAssign: false, requireVerification: true, allowMultipleQuotes: true, maxQuotes: 3, autoPromote: true, promotionCount: 2 },
      stats: { submissions: 95, conversionRate: "65%", avgResponseTime: "4.5 hours", purchasedCount: 62, hiredCount: 35 }
    }
  ];

  // Notification Modal
  const NotificationModal = ({ isOpen, onClose, user }) => {
    const [notificationType, setNotificationType] = useState('banner');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationPriority, setNotificationPriority] = useState('normal');
    const [notificationAction, setNotificationAction] = useState('');
    const [notificationExpiry, setNotificationExpiry] = useState('');

    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Send Notification to {user.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
              <select 
                className="w-full px-3 py-2 border rounded-lg"
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
              >
                <option value="banner">Banner</option>
                <option value="popup">Popup</option>
                <option value="message">In-app Message</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter notification title"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
                placeholder="Enter notification message"
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select 
                className="w-full px-3 py-2 border rounded-lg"
                value={notificationPriority}
                onChange={(e) => setNotificationPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter URL for notification action"
                value={notificationAction}
                onChange={(e) => setNotificationAction(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (Optional)</label>
              <input
                type="datetime-local"
                className="w-full px-3 py-2 border rounded-lg"
                value={notificationExpiry}
                onChange={(e) => setNotificationExpiry(e.target.value)}
              />
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                Send Notification
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Permission Modal
  const PermissionModal = ({ isOpen, onClose, user }) => {
    const [cameraAccess, setCameraAccess] = useState(user?.permissions.camera || false);
    const [notificationAccess, setNotificationAccess] = useState(user?.permissions.notifications || false);
    
    if (!isOpen || !user) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Manage Permissions for {user.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Changing permissions will affect this user's ability to interact with certain features of the platform.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Camera className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="font-medium">Camera Access</p>
                    <p className="text-sm text-gray-500">Allow the user to use video call features</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={cameraAccess}
                    onChange={() => setCameraAccess(!cameraAccess)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="font-medium">Notification Access</p>
                    <p className="text-sm text-gray-500">Allow the user to receive notifications</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={notificationAccess}
                    onChange={() => setNotificationAccess(!notificationAccess)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FormEditorModal = ({ isOpen, onClose, form }) => {
    const [formData, setFormData] = useState(form ? { ...form } : {});
    const [activeTab, setActiveTab] = useState('fields');

    if (!isOpen || !form) return null;

    const handleFieldChange = (index, field, value) => {
      const updatedFields = [...formData.fields];
      updatedFields[index] = { ...updatedFields[index], [field]: value };
      setFormData({ ...formData, fields: updatedFields });
    };

    const handleAddField = () => {
      const newField = {
        id: `field_${formData.fields.length + 1}`,
        label: "New Field",
        type: "text",
        required: false
      };
      setFormData({ ...formData, fields: [...formData.fields, newField] });
    };

    const handleRemoveField = (index) => {
      const updatedFields = [...formData.fields];
      updatedFields.splice(index, 1);
      setFormData({ ...formData, fields: updatedFields });
    };

    const handleMoveField = (index, direction) => {
      if ((direction === 'up' && index === 0) || (direction === 'down' && index === formData.fields.length - 1)) return;
      const updatedFields = [...formData.fields];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      [updatedFields[index], updatedFields[newIndex]] = [updatedFields[newIndex], updatedFields[index]];
      setFormData({ ...formData, fields: updatedFields });
    };

    const updatePricing = (type, field, value) => {
      setFormData({
        ...formData,
        pricing: { ...formData.pricing, [type]: { ...formData.pricing[type], [field]: value } }
      });
    };

    const updateSettings = (field, value) => {
      setFormData({ ...formData, settings: { ...formData.settings, [field]: value } });
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-full sm:max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-semibold">Edit Form: {form.name}</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('fields')}
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === 'fields' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Form Fields
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === 'pricing' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Pricing & Commission
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 sm:px-6 sm:py-3 font-medium text-sm sm:text-base whitespace-nowrap ${activeTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              Settings
            </button>
          </div>
          <div className="p-4 sm:p-6">
            {activeTab === 'fields' && (
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="font-medium text-base sm:text-lg">Form Fields</h3>
                  <Button onClick={handleAddField} className="w-full sm:w-auto flex items-center gap-2 text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> Add Field
                  </Button>
                </div>
                <div className="space-y-4">
                  {formData.fields.map((field, index) => (
                    <div key={index} className="p-3 sm:p-4 border rounded-lg bg-gray-50">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col">
                            <Button variant="ghost" size="sm" onClick={() => handleMoveField(index, 'up')} disabled={index === 0}>
                              <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleMoveField(index, 'down')} disabled={index === formData.fields.length - 1}>
                              <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                          <span className="font-medium text-sm sm:text-base">Field {index + 1}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleRemoveField(index)}>
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700">Field Label</label>
                          <input
                            type="text"
                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm"
                            value={field.label}
                            onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700">Field Type</label>
                          <select
                            className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm"
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                          >
                            <option value="text">Text</option>
                            <option value="textarea">Text Area</option>
                            <option value="select">Select</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="file">File Upload</option>
                            <option value="address">Address</option>
                          </select>
                        </div>
                      </div>
                      {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
                        <div className="mb-3 sm:mb-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Options</label>
                          <div className="space-y-2">
                            {(field.options || []).map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center gap-2">
                                <input
                                  type="text"
                                  className="flex-1 px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm"
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = [...field.options];
                                    newOptions[optionIndex] = e.target.value;
                                    handleFieldChange(index, 'options', newOptions);
                                  }}
                                />
                                <Button variant="ghost" size="sm" className="text-red-600" onClick={() => {
                                  const newOptions = [...field.options];
                                  newOptions.splice(optionIndex, 1);
                                  handleFieldChange(index, 'options', newOptions);
                                }}>
                                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button variant="outline" size="sm" className="text-sm" onClick={() => {
                              const options = field.options || [];
                              handleFieldChange(index, 'options', [...options, `Option ${options.length + 1}`]);
                            }}>
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" /> Add Option
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={field.required}
                            onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                          />
                          <span className="text-xs sm:text-sm">Required Field</span>
                        </label>
                        {field.type === 'file' && (
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={field.multiple}
                              onChange={(e) => handleFieldChange(index, 'multiple', e.target.checked)}
                            />
                            <span className="text-xs sm:text-sm">Allow Multiple Files</span>
                          </label>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'pricing' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-medium text-base sm:text-lg mb-4">Quote Pricing</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Standard Quote Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm"
                          value={formData.pricing.quotePrice.standard}
                          onChange={(e) => updatePricing('quotePrice', 'standard', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Emergency Quote Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm"
                          value={formData.pricing.quotePrice.emergency}
                          onChange={(e) => updatePricing('quotePrice', 'emergency', parseFloat(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-base sm:text-lg mb-4">Commission Rates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Standard Commission Rate</label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm"
                          value={formData.pricing.commission.standard.replace('%', '')}
                          onChange={(e) => updatePricing('commission', 'standard', `${e.target.value}%`)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Emergency Commission Rate</label>
                      <div className="mt-1 relative">
                        <input
                          type="text"
                          className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm"value={formData.pricing.commission.emergency.replace('%', '')}
                          onChange={(e) => updatePricing('commission', 'emergency', `${e.target.value}%`)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-blue-700">
                        These settings determine how much professionals pay to purchase this form and how much commission your platform receives from completed jobs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <h3 className="font-medium text-base sm:text-lg mb-4">Form Settings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <label className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Auto-assign Professionals</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.settings.autoAssign}
                            onChange={(e) => updateSettings('autoAssign', e.target.checked)}
                          />
                          <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Automatically assign professionals to customer requests</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <label className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Require Verification</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.settings.requireVerification}
                            onChange={(e) => updateSettings('requireVerification', e.target.checked)}
                          />
                          <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Require professional verification before accepting</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <label className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Allow Multiple Quotes</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.settings.allowMultipleQuotes}
                            onChange={(e) => updateSettings('allowMultipleQuotes', e.target.checked)}
                          />
                          <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Allow customers to receive multiple quotes</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Maximum Quotes</span>
                        <input
                          type="number"
                          className="w-16 sm:w-20 px-2 py-1 sm:px-3 sm:py-1 border rounded-lg text-sm"
                          value={formData.settings.maxQuotes}
                          onChange={(e) => updateSettings('maxQuotes', parseInt(e.target.value))}
                          min={1}
                          disabled={!formData.settings.allowMultipleQuotes}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Maximum number of quotes per request</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <label className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Auto-Promote</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={formData.settings.autoPromote}
                            onChange={(e) => updateSettings('autoPromote', e.target.checked)}
                          />
                          <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">Automatically promote to new professionals</p>
                    </div>
                    <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm">Promotion Count</span>
                        <input
                          type="number"
                          className="w-16 sm:w-20 px-2 py-1 sm:px-3 sm:py-1 border rounded-lg text-sm"
                          value={formData.settings.promotionCount}
                          onChange={(e) => updateSettings('promotionCount', parseInt(e.target.value))}
                          min={0}
                          disabled={!formData.settings.autoPromote}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Number of forms to gift per professional</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto text-sm">Cancel</Button>
            <Button className="w-full sm:w-auto text-sm">Save Changes</Button>
          </div>
        </div>
      </div>
    );
  };

  const syncedCategories = [
    { id: 1, name: "Plumbing", status: "active", source: "manual", formCount: 3, lastSync: "2024-02-18 10:30 AM", region: "Canada" },
    { id: 2, name: "Electrical", status: "active", source: "auto", formCount: 2, lastSync: "2024-02-18 09:15 AM", region: "Canada" },
    { id: 3, name: "Legal", status: "active", source: "manual", formCount: 1, lastSync: "2024-02-16 11:45 AM", region: "Canada" }
  ];

  const regions = [
    { id: 'ca', name: 'Canada', active: true },
    { id: 'us', name: 'United States', active: true },
    { id: 'gb', name: 'United Kingdom', active: true },
    { id: 'it', name: 'Italy', active: true },
    { id: 'es', name: 'Spain', active: true },
    { id: 'au', name: 'Australia', active: false }
  ];

  // User Card Component for User Management Tab
  const UserCard = ({ user }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{user.name}</h3>
            <Badge className={user.type === 'professional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
              {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{user.email}</p>
          {user.category && <p className="text-sm text-gray-600">{user.category}</p>}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedUser(user);
              setShowNotificationModal(true);
            }}
          >
            <Bell className="h-4 w-4" />
            Notify
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedUser(user);
              setShowPermissionModal(true);
            }}
          >
            <Settings className="h-4 w-4" />
            Permissions
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Camera Access</span>
            </div>
            <Badge className={user.permissions.camera ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {user.permissions.camera ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Notifications</span>
            </div>
            <Badge className={user.permissions.notifications ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
              {user.permissions.notifications ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );

  const FormCard = ({ form }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base sm:text-lg font-semibold">{form.name}</h3>
            {form.settings.autoPromote && (
              <Badge className="bg-purple-100 text-purple-700 text-xs sm:text-sm">
                Auto-Promote ({form.settings.promotionCount})
              </Badge>
            )}
            <Badge className={`text-xs sm:text-sm ${form.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs sm:text-sm">{form.category}</Badge>
            <Badge className={`text-xs sm:text-sm ${form.type === 'emergency' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
              {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm text-gray-500">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" /> Last modified: {form.lastModified}
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 ml-2" /> Region: {form.region}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSelectedForm(form); setShowFormEditor(true); }}
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedForm(form)}
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600"
          >
            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <h4 className="font-medium mb-3 text-sm sm:text-base">Form Fields</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {form.fields.map((field, index) => (
            <div key={index} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-xs sm:text-sm">{field.label}</span>
                {field.required && <Badge className="bg-red-50 text-red-700 text-xs">Required</Badge>}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">Type: {field.type}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="font-medium mb-3 text-sm sm:text-base">Quote Pricing</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
              <span>Standard Quote</span>
              <Badge variant="outline">${form.pricing.quotePrice.standard}</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
              <span>Emergency Quote</span>
              <Badge variant="outline">${form.pricing.quotePrice.emergency}</Badge>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm sm:text-base">Commission Rates</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
              <span>Standard Rate</span>
              <Badge variant="outline">{form.pricing.commission.standard}</Badge>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
              <span>Emergency Rate</span>
              <Badge variant="outline">{form.pricing.commission.emergency}</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6">
        <h4 className="font-medium mb-3 text-sm sm:text-base">Form Settings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
            <span>Auto-assign Professionals</span>
            <Badge className={form.settings.autoAssign ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {form.settings.autoAssign ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
            <span>Require Verification</span>
            <Badge className={form.settings.requireVerification ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {form.settings.requireVerification ? 'Yes' : 'No'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
            <span>Multiple Quotes</span>
            <Badge className={form.settings.allowMultipleQuotes ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {form.settings.allowMultipleQuotes ? 'Allowed' : 'Not Allowed'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-xs sm:text-sm">
            <span>Max Quotes</span>
            <Badge variant="outline">{form.settings.maxQuotes}</Badge>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Total Submissions</div>
            <div className="font-semibold mt-1 text-sm sm:text-base">{form.stats.submissions}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Conversion Rate</div>
            <div className="font-semibold mt-1 text-sm sm:text-base">{form.stats.conversionRate}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Avg. Response Time</div>
            <div className="font-semibold mt-1 text-sm sm:text-base">{form.stats.avgResponseTime}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Purchased</div>
            <div className="font-semibold mt-1 text-sm sm:text-base">{form.stats.purchasedCount}</div>
          </div>
          <div className="text-center">
            <div className="text-xs sm:text-sm text-gray-500">Hired</div>
            <div className="font-semibold mt-1 text-sm sm:text-base">{form.stats.hiredCount}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-end gap-2">
        <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 text-sm" onClick={() => { setSelectedForm(form); setShowPromotionModal(true); }}>
          <Gift className="h-3 w-3 sm:h-4 sm:w-4" /> Configure Auto-Promotion
        </Button>
        <Button className="w-full sm:w-auto flex items-center gap-2 text-sm">
          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" /> Promote Forms
        </Button>
      </div>
    </Card>
  );

  const CategoryCard = ({ category }) => (
    <Card className="p-4 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-sm sm:text-base">{category.name}</h3>
            <Badge className={`text-xs sm:text-sm ${category.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={`text-xs sm:text-sm ${category.source === 'auto' ? 'border-blue-200 text-blue-700' : 'border-purple-200 text-purple-700'}`}>
              {category.source === 'auto' ? 'Auto-synced' : 'Manual'}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1"><FileText className="h-3 w-3 sm:h-4 sm:w-4" /> {category.formCount} forms</span>
            <span className="flex items-center gap-1"><Calendar className="h-3 w-3 sm:h-4 sm:w-4" /> Last sync: {category.lastSync}</span>
            <span className="flex items-center gap-1"><Globe className="h-3 w-3 sm:h-4 sm:w-4" /> Region: {category.region}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Edit className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
          <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="h-3 w-3 sm:h-4 sm:w-4" /></Button>
        </div>
      </div>
    </Card>
  );

  const PromotionModal = ({ isOpen, onClose, form }) => {
    const [localPromoCount, setLocalPromoCount] = useState(form ? form.settings.promotionCount : 0);
    const [localAutoPromote, setLocalAutoPromote] = useState(form ? form.settings.autoPromote : false);
    const [eligibleProfessionals, setEligibleProfessionals] = useState([
      { id: 1, name: "John Smith", profession: "Plumber", region: "Toronto", registrationDate: "2024-02-15", status: "active" },
      { id: 2, name: "Sarah Wilson", profession: "Electrician", region: "Vancouver", registrationDate: "2024-02-10", status: "active" },
      { id: 3, name: "James Brown", profession: "Plumber", region: "Montreal", registrationDate: "2024-02-05", status: "active" }
    ]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg w-full max-w-full sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-xl font-semibold">Form Promotion Settings</h2>
          </div>
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="flex items-start gap-2 sm:gap-3">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Form Auto-Promotion</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1">
                    Automatically gift this form to newly registered professionals in the matching category. This helps new professionals get started with the platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={localAutoPromote}
                    onChange={(e) => setLocalAutoPromote(e.target.checked)}
                  />
                  <span className="font-medium text-sm sm:text-base">Enable Auto-Promotion</span>
                </label>
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <span className="text-xs sm:text-sm text-gray-700">Forms to gift:</span>
                  <select
                    className="border rounded-lg p-1 sm:p-2 text-sm"
                    value={localPromoCount}
                    onChange={(e) => setLocalPromoCount(parseInt(e.target.value))}
                    disabled={!localAutoPromote}
                  >
                    <option value="1">1 Form</option>
                    <option value="2">2 Forms</option>
                    <option value="3">3 Forms</option>
                    <option value="5">5 Forms</option>
                    <option value="10">10 Forms</option>
                  </select>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2 text-sm sm:text-base">Target Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Professional Category</label>
                    <select className="mt-1 block w-full border rounded-lg p-1 sm:p-2 text-sm">
                      <option value="">All Categories</option>
                      <option value="plumber">Plumbers</option>
                      <option value="electrician">Electricians</option>
                      <option value="lawyer">Lawyers</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Region</label>
                    <select className="mt-1 block w-full border rounded-lg p-1 sm:p-2 text-sm">
                      <option value="">All Regions</option>
                      <option value="toronto">Toronto</option>
                      <option value="vancouver">Vancouver</option>
                      <option value="montreal">Montreal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-sm sm:text-base">Manual Promotion</h3>
              <p className="text-xs sm:text-sm text-gray-700 mb-3">Select professionals to manually gift this form to:</p>
              <div className="border rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
                      <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                      <th className="px-2 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {eligibleProfessionals.map(professional => (
                      <tr key={professional.id}>
                        <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap"><input type="checkbox" className="rounded border-gray-300" /></td>
                        <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{professional.name}</td>
                        <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{professional.profession}</td>
                        <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{professional.region}</td>
                        <td className="px-2 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{professional.registrationDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto text-sm">Cancel</Button>
            <Button className="w-full sm:w-auto text-sm">Save Settings</Button>
          </div>
        </div>
      </div>
    );
  };

  // User Management Section
  const UserManagementSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-lg font-medium">User Permissions</h3>
        <div className="mt-2 sm:mt-0">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedUser(users[0]);
              setShowNotificationModal(true);
            }}
          >
            <Bell className="h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Category Forms</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">Manage service category forms and registrations</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {activeTab === 'forms' ? (
                  <Button className="w-full sm:w-auto flex items-center gap-2 text-sm" onClick={() => setShowAddModal(true)}>
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> New Form
                  </Button>
                ) : (
                  <Button className="w-full sm:w-auto flex items-center gap-2 text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> Add Category
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Forms</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg"><FormInput className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" /></div>
                </div>
              </Card>
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Categories</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg"><Filter className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" /></div>
                </div>
              </Card>
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Auto-synced</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">5</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg"><Link className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" /></div>
                </div>
              </Card>
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Submissions</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">1.2k</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg"><FileText className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" /></div>
                </div>
              </Card>
            </div>
            <div className="flex gap-2 border-b overflow-x-auto snap-x pb-2">
              <TabButton active={activeTab === 'forms'} label="Forms" icon={FormInput} onClick={() => setActiveTab('forms')} />
              <TabButton active={activeTab === 'categories'} label="Categories" icon={Filter} onClick={() => setActiveTab('categories')} />
              <TabButton active={activeTab === 'promotions'} label="Promotions" icon={Gift} onClick={() => setActiveTab('promotions')} />
              <TabButton active={activeTab === 'settings'} label="Settings" icon={Settings} onClick={() => setActiveTab('settings')} />
              <TabButton active={activeTab === 'users'} label="User Permissions" icon={Users} onClick={() => setActiveTab('users')} />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-4 py-1 sm:pl-10 sm:py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2 text-sm">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5" /> Filters
                  </Button>
                </div>
                {activeTab === 'forms' && (
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-auto px-2 py-1 sm:px-4 sm:py-2 border rounded-lg text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="legal">Legal</option>
                  </select>
                )}
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {activeTab === 'forms' && (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                  {forms
                    .filter(form => selectedCategory === 'all' || form.category.toLowerCase() === selectedCategory)
                    .filter(form => form.name.toLowerCase().includes(searchQuery.toLowerCase()) || form.category.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(form => <FormCard key={form.id} form={form} />)}
                </div>
              )}
              {activeTab === 'categories' && (
                <>
                  <Card className="p-4 sm:p-4 bg-blue-50 border-blue-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Link className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                        <span className="font-medium text-sm sm:text-base">Auto-sync Categories</span>
                      </div>
                      <Button
                        variant={autoSync ? 'default' : 'outline'}
                        onClick={() => setAutoSync(!autoSync)}
                        className="w-full sm:w-auto flex items-center gap-2 text-sm"
                      >
                        {autoSync ? (
                          <>
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" /> Enabled
                          </>
                        ) : (
                          'Enable'
                        )}
                      </Button>
                    </div>
                  </Card>
                  <div className="grid grid-cols-1 gap-4 sm:gap-4">
                    {syncedCategories
                      .filter(category => category.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(category => <CategoryCard key={category.id} category={category} />)}
                  </div>
                </>
              )}
              {activeTab === 'users' && (
                <UserManagementSection />
              )}
              {activeTab === 'promotions' && (
                <Card className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold mb-4">Form Promotion Settings</h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    Configure promotional settings to automatically gift forms to new professionals
                  </p>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                      <div className="flex gap-2 sm:gap-3">
                        <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Form promotions help new professionals get started on the platform by automatically gifting them customer request forms. This feature can be configured globally or per category.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3 text-sm sm:text-base">Global Promotion Settings</h3>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2">
                          <div>
                            <span className="font-medium text-xs sm:text-sm">Auto-Promotion</span>
                            <p className="text-xs text-gray-500 mt-1">Automatically gift forms to new professionals</p>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className="text-xs sm:text-sm">Enabled</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" value="" className="sr-only peer" checked />
                              <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg gap-2">
                          <div>
                            <span className="font-medium text-xs sm:text-sm">Default Forms Per Category</span>
                            <p className="text-xs text-gray-500 mt-1">Number of forms to gift per category</p>
                          </div>
                          <select
                            className="mt-2 sm:mt-0 px-2 py-1 sm:px-3 sm:py-1 border rounded-lg text-sm"
                            value={promotionCount}
                            onChange={(e) => setPromotionCount(parseInt(e.target.value))}
                          >
                            <option value="1">1 Form</option>
                            <option value="2">2 Forms</option>
                            <option value="3">3 Forms</option>
                            <option value="5">5 Forms</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3 text-sm sm:text-base">Category-Specific Settings</h3>
                      <div className="space-y-3">
                        {syncedCategories.map(category => (
                          <div key={category.id} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                                <span className="font-medium text-xs sm:text-sm">{category.name}</span>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-xs sm:text-sm text-gray-600">Forms to gift:</span>
                                <select className="px-2 py-1 border rounded-lg text-sm">
                                  <option value="default">Default ({promotionCount})</option>
                                  <option value="1">1 Form</option>
                                  <option value="2">2 Forms</option>
                                  <option value="3">3 Forms</option>
                                  <option value="0">Disabled</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-3 text-sm sm:text-base">Targeting</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Target Professional Categories</label>
                          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg h-32 sm:h-40 overflow-y-auto">
                            <div className="space-y-2">
                              {syncedCategories.map(category => (
                                <label key={category.id} className="flex items-center gap-2 text-xs sm:text-sm">
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) setSelectedCategories([...selectedCategories, category.id]);
                                      else setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                                    }}
                                  />
                                  <span>{category.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Target Regions</label>
                          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg h-32 sm:h-40 overflow-y-auto">
                            <div className="space-y-2">
                              {regions.map(region => (
                                <label key={region.id} className="flex items-center gap-2 text-xs sm:text-sm">
                                  <input
                                    type="checkbox"
                                    className="rounded border-gray-300"
                                    checked={selectedRegions.includes(region.id)}
                                    onChange={(e) => {
                                      if (e.target.checked) setSelectedRegions([...selectedRegions, region.id]);
                                      else setSelectedRegions(selectedRegions.filter(id => id !== region.id));
                                    }}
                                  />
                                  <span>{region.name}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
                    <Button variant="outline" className="w-full sm:w-auto text-sm">Cancel</Button>
                    <Button className="w-full sm:w-auto text-sm">Save Promotion Settings</Button>
                  </div>
                </Card>
              )}
              {activeTab === 'settings' && (
                <Card className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">Form Settings</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">Configure global form settings and defaults</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Required Fields</label>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Contact Information</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Service Location</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Service Description</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700">Auto-sync Settings</label>
                      <div className="mt-2 space-y-2">
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Automatically sync new categories</span>
                        </label>
                        <label className="flex items-center gap-2 text-xs sm:text-sm">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span>Create default forms for new categories</span>
                        </label>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Quote Price (Standard)</label>
                        <div className="mt-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input type="number" className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm" defaultValue={10} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Quote Price (Emergency)</label>
                        <div className="mt-1 relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input type="number" className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm" defaultValue={25} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Commission (Standard)</label>
                        <div className="mt-1 relative">
                          <input type="number" className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm" defaultValue={10} />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Commission (Emergency)</label>
                        <div className="mt-1 relative">
                          <input type="number" className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm" defaultValue={15} />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 sm:pt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
                    <Button variant="outline" className="w-full sm:w-auto text-sm">Cancel</Button>
                    <Button className="w-full sm:w-auto text-sm">Save Settings</Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg sm:text-xl font-semibold">Create New Form</h2>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Form Name</label>
                  <input type="text" className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" placeholder="Enter form name" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Category</label>
                  <select className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">
                    <option value="">Select a category</option>
                    {syncedCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Form Type</label>
                  <select className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">
                    <option value="quote">Quote Request</option>
                    <option value="emergency">Emergency Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Region</label>
                  <select className="mt-1 block w-full px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">
                    <option value="">Select a region</option>
                    {regions.map(region => (
                      <option key={region.id} value={region.name}>{region.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Form Fields</label>
                <div className="space-y-3">
                  <div className="p-2 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                      <input type="text" className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" placeholder="Field Label" defaultValue="Service Type" />
                      <select className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">
                        <option value="select">Select</option>
                        <option value="text">Text</option>
                        <option value="textarea">Text Area</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="file">File Upload</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked /><input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-xs sm:text-sm">Required Field</span>
                      </label>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-2 sm:p-4 border rounded-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                      <input type="text" className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm" placeholder="Field Label" defaultValue="Description" />
                      <select className="w-full sm:w-auto px-2 py-1 sm:px-3 sm:py-2 border rounded-lg text-sm">
                        <option value="textarea">Text Area</option>
                        <option value="text">Text</option>
                        <option value="select">Select</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="file">File Upload</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-xs sm:text-sm">Required Field</span>
                      </label>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4"/>
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full flex items-center gap-2 text-sm" onClick={() => {}}>
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" /> Add Field
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                <div>
                  <h3 className="font-medium mb-3 text-sm sm:text-base">Pricing</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700">Standard Quote Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm"
                          defaultValue={10}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700">Emergency Quote Price</label>
                      <div className="mt-1 relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          className="w-full pl-6 pr-3 py-1 sm:pl-7 sm:pr-4 sm:py-2 border rounded-lg text-sm"
                          defaultValue={25}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3 text-sm sm:text-base">Commission</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700">Standard Commission</label>
                      <div className="mt-1 relative">
                        <input
                          type="number"
                          className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm"
                          defaultValue={10}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-700">Emergency Commission</label>
                      <div className="mt-1 relative">
                        <input
                          type="number"
                          className="w-full pr-6 pl-3 py-1 sm:pr-8 sm:pl-4 sm:py-2 border rounded-lg text-sm"
                          defaultValue={15}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3 text-sm sm:text-base">Form Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Auto-assign Professionals</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Require Verification</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Allow Multiple Quotes</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm">Max Quotes:</span>
                    <input
                      type="number"
                      className="w-16 sm:w-20 px-2 py-1 sm:px-3 sm:py-1 border rounded-lg text-sm"
                      defaultValue={5}
                      min={1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="w-full sm:w-auto text-sm">Cancel</Button>
              <Button className="w-full sm:w-auto text-sm">Create Form</Button>
            </div>
          </div>
        </div>
      )}
      {showFormEditor && selectedForm && (
        <FormEditorModal
          isOpen={showFormEditor}
          onClose={() => {
            setShowFormEditor(false);
            setSelectedForm(null);
          }}
          form={selectedForm}
        />
      )}
      {showPromotionModal && (
        <PromotionModal
          isOpen={showPromotionModal}
          onClose={() => setShowPromotionModal(false)}
          form={selectedForm}
        />
      )}
      {showNotificationModal && selectedUser && (
        <NotificationModal
          isOpen={showNotificationModal}
          onClose={() => setShowNotificationModal(false)}
          user={selectedUser}
        />
      )}
      {showPermissionModal && selectedUser && (
        <PermissionModal
          isOpen={showPermissionModal}
          onClose={() => setShowPermissionModal(false)}
          user={selectedUser}
        />
      )}
    </div>
  );
};

export default CategoryForms;