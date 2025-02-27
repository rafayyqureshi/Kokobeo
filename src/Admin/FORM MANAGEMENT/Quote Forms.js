import React, { useState } from 'react';
import {
  FormInput, Plus, Edit, Trash2, Eye, Settings,
  Search, Filter, FileText, Calendar, CheckSquare,
  Save, Copy, DollarSign, Clock, AlertCircle,
  Calculator, Tag, MessageSquare, Send, Zap,
  PieChart, BarChart2, Building2, MapPin, X,
  Bell, Camera, UserCheck, FileEdit, ChevronDown,
  ArrowUpRight, Link, Mail, Phone, Share2, CheckCircle,
  ExternalLink, Briefcase, Users, Globe
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const QuoteForms = () => {
  // State management
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for quote forms
  const forms = [
    {
      id: 1,
      name: 'Emergency Service Quote',
      description: 'Quick quote request form for emergency services',
      type: 'emergency',
      status: 'active',
      fields: 10,
      submissions: 324,
      lastUpdated: '12 hours ago',
      required: [
        'Service Type',
        'Emergency Level',
        'Location',
        'Contact Details',
        'Issue Description'
      ],
      pricing: {
        depositRequired: true,
        depositPercentage: 20,
        urgencyMultiplier: true
      }
    },
    {
      id: 2,
      name: 'Regular Service Quote',
      description: 'Standard service quote request form',
      type: 'regular',
      status: 'active',
      fields: 14,
      submissions: 567,
      lastUpdated: '1 day ago',
      required: [
        'Service Category',
        'Project Details',
        'Timeline',
        'Budget Range',
        'Location Details'
      ],
      pricing: {
        depositRequired: false,
        compareQuotes: true,
        negotiable: true
      }
    },
    {
      id: 3,
      name: 'Custom Project Quote',
      description: 'Detailed quote form for custom projects',
      type: 'custom',
      status: 'active',
      fields: 18,
      submissions: 142,
      lastUpdated: '2 days ago',
      required: [
        'Project Scope',
        'Requirements',
        'Timeline',
        'Budget',
        'Additional Details'
      ],
      pricing: {
        depositRequired: true,
        depositPercentage: 15,
        milestonePayments: true
      }
    },
    {
      id: 4,
      name: 'International Project Quote',
      description: 'Quote form for international services',
      type: 'international',
      status: 'active',
      fields: 16,
      submissions: 78,
      lastUpdated: '3 days ago',
      required: [
        'Country',
        'Service Type',
        'Project Description',
        'Timeline',
        'Budget Range'
      ],
      pricing: {
        depositRequired: true,
        depositPercentage: 25,
        currencyOptions: true
      }
    }
  ];

  // Mock data for clients
  const clients = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      location: "Toronto, Canada",
      status: "active",
      joinDate: "2024-01-15",
      quotes: 5,
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      location: "Vancouver, Canada",
      status: "active",
      joinDate: "2024-01-20",
      quotes: 3,
      permissions: {
        camera: true,
        notifications: false
      }
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      location: "Montreal, Canada",
      status: "inactive",
      joinDate: "2024-02-10",
      quotes: 0,
      permissions: {
        camera: false,
        notifications: true
      }
    }
  ];

  // Form Card Component
  const FormCard = ({ form }) => (
    <Card className="hover:shadow-md transition-shadow" style={{ textAlign: 'left' }}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{form.name}</h3>
              <Badge className={
                form.type === 'emergency' ? 'bg-red-100 text-red-700' :
                form.type === 'regular' ? 'bg-blue-100 text-blue-700' :
                form.type === 'custom' ? 'bg-purple-100 text-purple-700' :
                'bg-green-100 text-green-700'
              }>
                {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
              </Badge>
              <Badge className={
                form.status === 'active' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }>
                {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-gray-600">{form.description}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedForm(form)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedForm(form);
                setShowPreview(true);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            {form.fields} fields
          </span>
          <span className="flex items-center gap-1">
            <CheckSquare className="h-4 w-4" />
            {form.submissions} submissions
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Updated {form.lastUpdated}
          </span>
        </div>

        {/* Required Info */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Required Information:</p>
          <div className="flex flex-wrap gap-2">
            {form.required.map((field, index) => (
              <Badge key={index} variant="outline" className="text-xs">{field}</Badge>
            ))}
          </div>
        </div>

        {/* Pricing Features */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Pricing Features:</p>
          <div className="space-y-1 text-xs sm:text-sm">
            {form.pricing.depositRequired && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span>{form.pricing.depositPercentage}% Deposit Required</span>
              </div>
            )}
            {form.pricing.urgencyMultiplier && (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span>Urgency Pricing</span>
              </div>
            )}
            {form.pricing.compareQuotes && (
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-blue-600" />
                <span>Quote Comparison</span>
              </div>
            )}
            {form.pricing.milestonePayments && (
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-purple-600" />
                <span>Milestone Payments</span>
              </div>
            )}
            {form.pricing.currencyOptions && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>Multiple Currency Options</span>
              </div>
            )}
            {form.pricing.negotiable && (
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                <span>Negotiable Pricing</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );

  // Add/Edit Form Modal Component
  const FormModal = ({ form = null, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
      form || {
        name: '',
        description: '',
        type: 'regular',
        status: 'active',
        fields: [],
        required: [],
        pricing: {
          depositRequired: false,
          depositPercentage: 15,
          urgencyMultiplier: false,
          compareQuotes: false,
          milestonePayments: false,
          currencyOptions: false,
          negotiable: false
        }
      }
    );

    const [activeTab, setActiveTab] = useState('general');

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {form ? 'Edit Quote Form' : 'Add New Quote Form'}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b mb-6">
              <button
                onClick={() => setActiveTab('general')}
                className={`pb-3 px-1 ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab('fields')}
                className={`pb-3 px-1 ${
                  activeTab === 'fields'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Form Fields
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`pb-3 px-1 ${
                  activeTab === 'pricing'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Pricing
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Form Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter form name"
                      className="mt-1 w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Enter form description"
                      rows={3}
                      className="mt-1 w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Form Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="regular">Regular Service</option>
                        <option value="emergency">Emergency Service</option>
                        <option value="custom">Custom Project</option>
                        <option value="international">International Project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="draft">Draft</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'fields' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Required Information</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Select which information is required for this quote form.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Service Type')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Service Type']
                                : formData.required.filter(item => item !== 'Service Type');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Service Type</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Emergency Level')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Emergency Level']
                                : formData.required.filter(item => item !== 'Emergency Level');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Emergency Level</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Project Details')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Project Details']
                                : formData.required.filter(item => item !== 'Project Details');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Project Details</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Timeline')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Timeline']
                                : formData.required.filter(item => item !== 'Timeline');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Timeline</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Location')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Location']
                                : formData.required.filter(item => item !== 'Location');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Location</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Contact Details')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Contact Details']
                                : formData.required.filter(item => item !== 'Contact Details');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Contact Details</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Budget')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Budget']
                                : formData.required.filter(item => item !== 'Budget');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Budget</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.required.includes('Additional Details')}
                            onChange={(e) => {
                              const newRequired = e.target.checked
                                ? [...formData.required, 'Additional Details']
                                : formData.required.filter(item => item !== 'Additional Details');
                              setFormData({ ...formData, required: newRequired });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Additional Details</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="font-medium mb-2">Custom Fields</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Add custom fields specific to this quote form.
                    </p>

                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Custom Field
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Pricing Settings</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Configure pricing options for this quote form.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.depositRequired}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  depositRequired: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Require Deposit</span>
                        </label>

                        {formData.pricing.depositRequired && (
                          <div className="pl-6 pt-2">
                            <label className="block text-sm text-gray-600 mb-1">Deposit Percentage</label>
                            <input
                              type="number"
                              value={formData.pricing.depositPercentage}
                              onChange={(e) => {
                                setFormData({
                                  ...formData,
                                  pricing: {
                                    ...formData.pricing,
                                    depositPercentage: parseInt(e.target.value)
                                  }
                                });
                              }}
                              className="w-20 px-3 py-1 border rounded-lg"
                              min="1"
                              max="100"
                            />
                            <span className="ml-2">%</span>
                          </div>
                        )}

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.urgencyMultiplier}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  urgencyMultiplier: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Urgency Pricing</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.compareQuotes}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  compareQuotes: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Quote Comparison</span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.milestonePayments}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  milestonePayments: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Milestone Payments</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.currencyOptions}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  currencyOptions: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Currency Options</span>
                        </label>

                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.pricing.negotiable}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                pricing: {
                                  ...formData.pricing,
                                  negotiable: e.target.checked
                                }
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <span>Negotiable Pricing</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>
                {form ? 'Save Changes' : 'Create Form'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Form Preview Component
  const FormPreview = ({ form, onClose }) => {
    if (!form) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Preview: {form.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="border-b pb-3">
              <p className="text-sm text-gray-500">Contact Information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            {form.required.includes('Service Type') && (
              <div>
                <div className="border-b pb-3 mt-6">
                  <p className="text-sm text-gray-500">Service Details</p>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Type *</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">Select a service type</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="hvac">HVAC</option>
                      <option value="landscaping">Landscaping</option>
                      <option value="cleaning">Cleaning</option>
                    </select>
                  </div>

                  {form.required.includes('Emergency Level') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Level *</label>
                      <select className="w-full px-3 py-2 border rounded-lg">
                        <option value="">Select emergency level</option>
                        <option value="critical">Critical - Need immediate assistance</option>
                        <option value="urgent">Urgent - Within 24 hours</option>
                        <option value="standard">Standard - Within a few days</option>
                        <option value="scheduled">Scheduled - Planned in advance</option>
                      </select>
                    </div>
                  )}

                  {form.required.includes('Project Details') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Details *</label>
                      <textarea
                        className="w-full px-3 py-2 border rounded-lg"
                        rows={4}
                        placeholder="Describe your project in detail"
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
            )}

            {form.required.includes('Location') && (
              <div>
                <div className="border-b pb-3 mt-6">
                  <p className="text-sm text-gray-500">Location Information</p>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Province/State *</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter province/state"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-6 border-t flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button>
                Submit Quote Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Client Notification Modal
  const NotificationModal = ({ isOpen, onClose, client }) => {
    const [notificationType, setNotificationType] = useState('banner');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationPriority, setNotificationPriority] = useState('normal');
    const [expiryTime, setExpiryTime] = useState('');

    if (!isOpen || !client) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-lg">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Send Notification to {client.name}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
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
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                placeholder="Enter notification title"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={notificationMessage}
                onChange={(e) => setNotificationMessage(e.target.value)}
                placeholder="Enter notification message"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={notificationPriority}
                onChange={(e) => setNotificationPriority(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Time (Optional)</label>
              <input
                type="datetime-local"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button>Send Notification</Button>
          </div>
        </div>
      </div>
    );
  };

  // Settings Modal Component
  const SettingsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Quote Form Settings</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-medium mb-4">Emergency Quote Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Deposit Percentage</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={20}
                    min={0}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Response Time Limit (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={30}
                    min={1}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Enable Urgency Multiplier</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Require Location Verification</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-medium mb-4">Regular Quote Settings</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote Validity Period (days)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={7}
                    min={1}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Quote Requests</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg"
                    defaultValue={5}
                    min={1}
                  />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Enable Quote Comparison</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Allow Price Negotiation</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="font-medium mb-4">Price Calculation Rules</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Include Travel Distance in Price</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Apply Peak Hour Rates</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span>Enable Milestone Payments</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button>Save Settings</Button>
          </div>
        </div>
      </div>
    );
  };

  // Client Card Component
  const ClientCard = ({ client }) => (
    <Card className="hover:shadow-md transition-shadow" style={{ textAlign: 'left' }}>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{client.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {client.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {client.location}
              </span>
            </div>
          </div>
          <Badge className={client.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </Badge>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Quote Requests</span>
              </div>
              <Badge variant="outline">{client.quotes}</Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Joined</span>
              </div>
              <span className="text-sm">{client.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Camera Access</span>
              </div>
              <Badge className={client.permissions.camera ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {client.permissions.camera ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Notifications</span>
              </div>
              <Badge className={client.permissions.notifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {client.permissions.notifications ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => {
              setSelectedClient(client);
              setShowNotificationModal(true);
            }}
          >
            <Bell className="h-4 w-4" />
            Notify
          </Button>
        </div>
      </div>
    </Card>
  );

  // Clients Tab Content
  const ClientsTab = () => {
    const [searchClientQuery, setSearchClientQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredClients = clients.filter(client => 
      (selectedStatus === 'all' || client.status === selectedStatus) &&
      (client.name.toLowerCase().includes(searchClientQuery.toLowerCase()) || 
       client.email.toLowerCase().includes(searchClientQuery.toLowerCase()))
    );

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients..."
                value={searchClientQuery}
                onChange={(e) => setSearchClientQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClients.map(client => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </div>
    );
  };

  // Settings Tab Content
  const SettingsContent = () => (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Quote Form Settings</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                These settings affect all quote request forms across the platform.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Emergency Quote Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Default Deposit Percentage</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  defaultValue={20}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Response Time Limit (minutes)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  defaultValue={30}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Urgency Multiplier</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Require Location Verification</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Regular Quote Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quote Validity Period (days)</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  defaultValue={7}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Quote Requests</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  defaultValue={5}
                />
              </div>
            </div>
            <div className="mt-3 sm:mt-4 space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Quote Comparison</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Allow Price Negotiation</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Price Calculation Rules</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Include Travel Distance in Price</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Apply Peak Hour Rates</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded" />
                <span>Enable Milestone Payments</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Settings</Button>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div className="space-y-6">
            {/* Filter and Search */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="emergency">Emergency</option>
                  <option value="regular">Regular</option>
                  <option value="custom">Custom</option>
                  <option value="international">International</option>
                </select>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4" />
                New Quote Form
              </Button>
            </div>
            {/* Forms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {forms
                .filter(form => selectedType === 'all' || form.type === selectedType)
                .filter(form => form.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(form => (
                  <FormCard key={form.id} form={form} />
                ))}
            </div>
          </div>
        );
      
      case 'clients':
        return <ClientsTab />;
      
      case 'settings':
        return <SettingsContent />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Quote Forms</h1>
              <p className="text-base text-gray-600 mt-1">Manage service quote request forms</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Forms</p>
                    <p className="text-2xl font-semibold mt-1">{forms.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FormInput className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Quotes</p>
                    <p className="text-2xl font-semibold mt-1">245</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Emergency Requests</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-2xl font-semibold mt-1">68%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChart className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b overflow-x-auto">
              <TabButton
                active={activeTab === 'all'}
                label="All Forms"
                icon={FormInput}
                onClick={() => setActiveTab('all')}
              />
              <TabButton
                active={activeTab === 'clients'}
                label="Clients"
                icon={Users}
                onClick={() => setActiveTab('clients')}
              />
              <TabButton
                active={activeTab === 'settings'}
                label="Settings"
                icon={Settings}
                onClick={() => setActiveTab('settings')}
              />
            </div>

            {/* Tab Content */}
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Modals */}
      <FormModal 
        form={selectedForm}
        isOpen={showAddModal || selectedForm !== null}
        onClose={() => {
          setShowAddModal(false);
          setSelectedForm(null);
        }}
      />

      <FormPreview
        form={showPreview ? selectedForm : null}
        onClose={() => setShowPreview(false)}
      />

      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        client={selectedClient}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
};

export default QuoteForms;