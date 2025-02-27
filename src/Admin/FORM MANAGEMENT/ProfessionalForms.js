import React, { useState } from 'react';
import {
  FormInput, Plus, Edit, Trash2, Eye, Settings,
  Search, Filter, FileText, Calendar, CheckSquare,
  Save, Copy, User, Shield, FileCheck, BadgeCheck,
  Clock, Star, MapPin, DollarSign, Briefcase,
  Award, Building2, Video, Share2, Lock, Globe,
  X, Camera, Bell, UserCheck, FileEdit, AlertCircle,
  ChevronDown, ArrowUpRight, Link
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

const ProfessionalForms = () => {
  const [activeTab, setActiveTab] = useState('forms');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [formView, setFormView] = useState('list'); // 'list' or 'edit'
  const [editMode, setEditMode] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Mock data for professional registration forms
  const forms = [
    {
      id: 1,
      name: "Emergency Plumber Registration",
      category: "Plumbing",
      type: "emergency_service",
      status: "active",
      lastModified: "2024-02-18",
      sections: [
        {
          title: "Basic Information",
          fields: [
            {
              id: "name",
              label: "Full Name",
              type: "text",
              required: true
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              required: true
            },
            {
              id: "phone",
              label: "Phone Number",
              type: "tel",
              required: true
            },
            {
              id: "address",
              label: "Business Address",
              type: "address",
              required: true
            }
          ]
        },
        {
          title: "Professional Qualifications",
          fields: [
            {
              id: "license",
              label: "License Number",
              type: "text",
              required: true,
              validation: "plumbing_license"
            },
            {
              id: "experience",
              label: "Years of Experience",
              type: "number",
              required: true,
              min: 1
            },
            {
              id: "certifications",
              label: "Certifications",
              type: "file",
              multiple: true,
              required: true,
              accept: ".pdf,.jpg,.png"
            }
          ]
        },
        {
          title: "Service Details",
          fields: [
            {
              id: "service_areas",
              label: "Service Areas",
              type: "multiselect",
              required: true,
              options: ["Downtown", "North End", "South Side", "West Region"]
            },
            {
              id: "services",
              label: "Services Offered",
              type: "checklist",
              required: true,
              options: [
                "Emergency Repairs",
                "Pipe Installation",
                "Drain Cleaning",
                "Water Heater Service"
              ]
            },
            {
              id: "availability",
              label: "Availability Hours",
              type: "schedule",
              required: true
            }
          ]
        },
        {
          title: "Verification",
          fields: [
            {
              id: "insurance",
              label: "Insurance Documents",
              type: "file",
              required: true,
              accept: ".pdf"
            },
            {
              id: "background_check",
              label: "Background Check Consent",
              type: "checkbox",
              required: true
            },
            {
              id: "terms",
              label: "Terms & Conditions",
              type: "checkbox",
              required: true
            }
          ]
        }
      ],
      requirements: {
        insurance: {
          required: true,
          minimumCoverage: "$1,000,000",
          types: ["Liability", "Professional"]
        },
        verification: {
          identity: true,
          license: true,
          background: true,
          address: true
        },
        response: {
          maxTime: 30,
          availability: "24/7"
        }
      },
      settings: {
        autoApproval: false,
        requireInterview: true,
        documentVerification: true,
        probationPeriod: 30
      },
      stats: {
        totalApplications: 156,
        approvalRate: "72%",
        averageCompletionTime: "45 minutes",
        activeProviders: 112
      }
    },
    {
      id: 2,
      name: "Professional Electrician Registration",
      category: "Electrical",
      type: "skilled_trade",
      status: "active",
      lastModified: "2024-02-17",
      sections: [
        {
          title: "Basic Information",
          fields: [
            {
              id: "name",
              label: "Full Name",
              type: "text",
              required: true
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              required: true
            },
            {
              id: "phone",
              label: "Phone Number",
              type: "tel",
              required: true
            }
          ]
        },
        {
          title: "Professional Details",
          fields: [
            {
              id: "license_type",
              label: "License Type",
              type: "select",
              required: true,
              options: ["Master", "Journeyman", "Apprentice"]
            },
            {
              id: "specializations",
              label: "Specializations",
              type: "multiselect",
              required: true,
              options: [
                "Residential",
                "Commercial",
                "Industrial",
                "Emergency Services"
              ]
            }
          ]
        }
      ],
      requirements: {
        insurance: {
          required: true,
          minimumCoverage: "$2,000,000"
        },
        verification: {
          identity: true,
          license: true,
          background: true
        }
      },
      settings: {
        autoApproval: false,
        requireInterview: true,
        documentVerification: true
      },
      stats: {
        totalApplications: 89,
        approvalRate: "68%",
        averageCompletionTime: "55 minutes",
        activeProviders: 78
      }
    },
    {
      id: 3,
      name: "General Contractor Registration",
      category: "Construction",
      type: "general_service",
      status: "active",
      lastModified: "2024-02-15",
      sections: [
        {
          title: "Basic Information",
          fields: [
            {
              id: "name",
              label: "Full Name",
              type: "text",
              required: true
            },
            {
              id: "email",
              label: "Email Address",
              type: "email", 
              required: true
            }
          ]
        }
      ],
      requirements: {
        insurance: {
          required: true,
          minimumCoverage: "$3,000,000"
        },
        verification: {
          identity: true,
          license: true,
          background: true
        }
      },
      settings: {
        autoApproval: false,
        requireInterview: true,
        documentVerification: true
      },
      stats: {
        totalApplications: 64,
        approvalRate: "62%",
        averageCompletionTime: "60 minutes",
        activeProviders: 40
      }
    }
  ];

  // Mock professionals data
  const professionals = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      category: "Plumbing",
      status: "active",
      joinDate: "2024-01-15",
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      category: "Electrical",
      status: "active",
      joinDate: "2024-01-20",
      permissions: {
        camera: true,
        notifications: false
      }
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      category: "Construction",
      status: "pending",
      joinDate: "2024-02-10",
      permissions: {
        camera: false,
        notifications: true
      }
    }
  ];

  const FormCard = ({ form }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow"   style={{ textAlign: 'left' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{form.name}</h3>
            <Badge className={
              form.status === 'active' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
            </Badge>
            <Badge variant="outline">{form.category}</Badge>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Last modified: {form.lastModified}
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {form.sections.reduce((acc, section) => acc + section.fields.length, 0)} fields
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedForm(form);
              setFormView('edit');
              setEditMode(true);
            }}
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

      {/* Form Sections */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Form Sections</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.sections.map((section, index) => (
            <Card key={index} className="p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{section.title}</h5>
                <Badge variant="outline">{section.fields.length} fields</Badge>
              </div>
              <div className="space-y-2">
                {section.fields.slice(0, 3).map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{field.label}</span>
                    {field.required && (
                      <Badge className="bg-red-50 text-red-700">Required</Badge>
                    )}
                  </div>
                ))}
                {section.fields.length > 3 && (
                  <div className="text-sm text-blue-600">
                    +{section.fields.length - 3} more fields
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Requirements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h5 className="font-medium">Insurance</h5>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Required</span>
                <Badge className={form.requirements.insurance.required ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                  {form.requirements.insurance.required ? 'Yes' : 'No'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Min Coverage</span>
                <Badge variant="outline">{form.requirements.insurance.minimumCoverage}</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-purple-50">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="h-4 w-4 text-purple-600" />
              <h5 className="font-medium">Verification</h5>
            </div>
            <div className="space-y-1 text-sm">
              {Object.entries(form.requirements.verification).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="capitalize">{key}</span>
                  <Badge className={value ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {value ? 'Required' : 'Optional'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-yellow-50">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <h5 className="font-medium">Response Time</h5>
            </div>
            <div className="space-y-1 text-sm">
              {form.requirements.response && (
                <>
                  <div className="flex justify-between">
                    <span>Max Response</span>
                    <Badge variant="outline">{form.requirements.response.maxTime} min</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Availability</span>
                    <Badge variant="outline">{form.requirements.response.availability}</Badge>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Form Settings</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto Approval</span>
              <Badge className={form.settings.autoApproval ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {form.settings.autoApproval ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Interview Required</span>
              <Badge className={form.settings.requireInterview ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {form.settings.requireInterview ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Doc Verification</span>
              <Badge className={form.settings.documentVerification ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {form.settings.documentVerification ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
          {form.settings.probationPeriod && (
            <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Probation Period</span>
              <Badge variant="outline">{form.settings.probationPeriod} days</Badge>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Stats */}
    <div className="mt-6 pt-6 border-t">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Applications</div>
          <div className="font-semibold mt-1">{form.stats.totalApplications}</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Approval Rate</div>
          <div className="font-semibold mt-1">{form.stats.approvalRate}</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-500">Avg. Completion</div>
          <div className="font-semibold mt-1">{form.stats.averageCompletionTime}</div>
        </div>
        {form.stats.activeProviders && (
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Active Providers</div>
            <div className="font-semibold mt-1">{form.stats.activeProviders}</div>
          </div>
        )}
      </div>
    </div>
  </Card>
);

// Form Editor Component
const FormEditor = ({ form, onSave, onCancel }) => {
  const [formData, setFormData] = useState(form || {
    name: "",
    category: "",
    type: "general_service",
    status: "draft",
    sections: [
      {
        title: "Basic Information",
        fields: [
          {
            id: "name",
            label: "Full Name",
            type: "text",
            required: true
          }
        ]
      }
    ],
    requirements: {
      insurance: {
        required: true,
        minimumCoverage: "$1,000,000"
      },
      verification: {
        identity: true,
        license: true,
        background: true,
        address: false
      }
    },
    settings: {
      autoApproval: false,
      requireInterview: true,
      documentVerification: true,
      probationPeriod: 30
    }
  });

  const [activeSection, setActiveSection] = useState(0);
  const [activeTab, setActiveTab] = useState('fields');

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value
    });
  };

  const handleTypeChange = (e) => {
    setFormData({
      ...formData,
      type: e.target.value
    });
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value
    });
  };

  const handleSectionTitleChange = (index, title) => {
    const newSections = [...formData.sections];
    newSections[index].title = title;
    setFormData({
      ...formData,
      sections: newSections
    });
  };

  const handleAddSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          title: `New Section ${formData.sections.length + 1}`,
          fields: []
        }
      ]
    });
    setActiveSection(formData.sections.length);
  };

  const handleDeleteSection = (index) => {
    if (formData.sections.length <= 1) return;
    
    const newSections = formData.sections.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      sections: newSections
    });
    
    if (activeSection >= newSections.length) {
      setActiveSection(newSections.length - 1);
    }
  };

  const handleAddField = (sectionIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].fields.push({
      id: `field_${Date.now()}`,
      label: "New Field",
      type: "text",
      required: false
    });
    
    setFormData({
      ...formData,
      sections: newSections
    });
  };

  const handleFieldChange = (sectionIndex, fieldIndex, key, value) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].fields[fieldIndex][key] = value;
    
    setFormData({
      ...formData,
      sections: newSections
    });
  };

  const handleDeleteField = (sectionIndex, fieldIndex) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].fields.splice(fieldIndex, 1);
    
    setFormData({
      ...formData,
      sections: newSections
    });
  };

  const handleRequirementChange = (category, key, value) => {
    setFormData({
      ...formData,
      requirements: {
        ...formData.requirements,
        [category]: {
          ...formData.requirements[category],
          [key]: value
        }
      }
    });
  };

  const handleSettingChange = (key, value) => {
    setFormData({
      ...formData,
      settings: {
        ...formData.settings,
        [key]: value
      }
    });
  };

  const renderFieldsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Form Sections</h2>
        <Button 
          size="sm" 
          onClick={handleAddSection}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> Add Section
        </Button>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2">
        {formData.sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              activeSection === index 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={formData.sections[activeSection].title}
              onChange={(e) => handleSectionTitleChange(activeSection, e.target.value)}
              className="font-semibold border-b border-dashed border-gray-300 bg-transparent focus:outline-none focus:border-blue-500 px-1"
            />
            <Badge>{formData.sections[activeSection].fields.length} fields</Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => handleDeleteSection(activeSection)}
            className="text-red-600"
            disabled={formData.sections.length <= 1}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {formData.sections[activeSection].fields.map((field, fieldIndex) => (
            <div key={fieldIndex} className="p-4 border rounded-lg bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">Field {fieldIndex + 1}</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteField(activeSection, fieldIndex)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                  <input
                    type="text"
                    value={field.label}
                    onChange={(e) => handleFieldChange(activeSection, fieldIndex, 'label', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                  <select
                    value={field.type}
                    onChange={(e) => handleFieldChange(activeSection, fieldIndex, 'type', e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="number">Number</option>
                    <option value="select">Dropdown</option>
                    <option value="multiselect">Multi-select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="file">File Upload</option>
                    <option value="address">Address</option>
                    <option value="date">Date</option>
                    <option value="checklist">Checklist</option>
                    <option value="schedule">Schedule</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => handleFieldChange(activeSection, fieldIndex, 'required', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  Required Field
                </label>

                {(field.type === 'select' || field.type === 'multiselect' || field.type === 'radio' || field.type === 'checklist') && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // Open options editor (simplified for this example)
                      alert("Options editor would open here");
                    }}
                  >
                    Edit Options
                  </Button>
                )}

                {field.type === 'file' && (
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={field.multiple}
                      onChange={(e) => handleFieldChange(activeSection, fieldIndex, 'multiple', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    Allow Multiple Files
                  </label>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => handleAddField(activeSection)}
              className="w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Field
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderRequirementsTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Requirements</h2>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-medium mb-4">Insurance Requirements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={formData.requirements.insurance.required}
                  onChange={(e) => handleRequirementChange('insurance', 'required', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Require Insurance</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Coverage</label>
              <input
                type="text"
                value={formData.requirements.insurance.minimumCoverage}
                onChange={(e) => handleRequirementChange('insurance', 'minimumCoverage', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Verification Requirements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requirements.verification.identity}
                  onChange={(e) => handleRequirementChange('verification', 'identity', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Identity Verification</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requirements.verification.license}
                  onChange={(e) => handleRequirementChange('verification', 'license', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>License Verification</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requirements.verification.background}
                  onChange={(e) => handleRequirementChange('verification', 'background', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Background Check</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requirements.verification.address}
                  onChange={(e) => handleRequirementChange('verification', 'address', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Address Verification</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Response Requirements</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Response Time (minutes)</label>
              <input
                type="number"
                value={formData.requirements.response?.maxTime || 30}
                onChange={(e) => {
                  const response = formData.requirements.response || {};
                  handleRequirementChange('response', 'maxTime', parseInt(e.target.value));
                }}
                className="w-full px-3 py-2 border rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
              <select
                value={formData.requirements.response?.availability || '24/7'}
                onChange={(e) => {
                  const response = formData.requirements.response || {};
                  handleRequirementChange('response', 'availability', e.target.value);
                }}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="24/7">24/7 Availability</option>
                <option value="business_hours">Business Hours Only</option>
                <option value="custom">Custom Schedule</option>
              </select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Form Settings</h2>

      <Card className="p-6 space-y-6">
        <div>
          <h3 className="font-medium mb-4">Approval Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.settings.autoApproval}
                  onChange={(e) => handleSettingChange('autoApproval', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Auto Approval</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Automatically approve professionals after document verification
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.settings.requireInterview}
                  onChange={(e) => handleSettingChange('requireInterview', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Require Interview</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Require a video interview before approval
              </p>
            </div>
            <div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.settings.documentVerification}
                  onChange={(e) => handleSettingChange('documentVerification', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Document Verification</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">
                Manually verify submitted documents
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Probation Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probation Period (days)</label>
              <input
                type="number"
                value={formData.settings.probationPeriod || 30}
                onChange={(e) => handleSettingChange('probationPeriod', parseInt(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                Period of limited access and enhanced monitoring
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{form ? 'Edit Form' : 'Create New Form'}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(formData)}>Save Form</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter form name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Form Type</label>
            <select
              value={formData.type}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="general_service">General Service</option>
              <option value="emergency_service">Emergency Service</option>
              <option value="skilled_trade">Skilled Trade</option>
              <option value="professional_service">Professional Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('fields')}
          className={`pb-2 px-4 ${activeTab === 'fields' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Form Fields
        </button>
        <button
          onClick={() => setActiveTab('requirements')}
          className={`pb-2 px-4 ${activeTab === 'requirements' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Requirements
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-2 px-4 ${activeTab === 'settings' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'fields' && renderFieldsTab()}
      {activeTab === 'requirements' && renderRequirementsTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </div>
  );
};

// Form Preview Component
const FormPreview = ({ form, onClose }) => {
  const [activeSection, setActiveSection] = useState(0);

  if (!form) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Form Preview: {form.name}</h2>
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
          <div className="flex gap-2 mb-6">
            {form.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  activeSection === index 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4">{form.sections[activeSection].title}</h3>
          
          <div className="space-y-6">
            {form.sections[activeSection].fields.map((field, index) => (
              <div key={index} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                
                {field.type === 'text' && (
                  <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder={`Enter ${field.label.toLowerCase()}`} />
                )}
                
                {field.type === 'email' && (
                  <input type="email" className="w-full px-3 py-2 border rounded-lg" placeholder="example@email.com" />
                )}
                
                {field.type === 'tel' && (
                  <input type="tel" className="w-full px-3 py-2 border rounded-lg" placeholder="(123) 456-7890" />
                )}
                
                {field.type === 'number' && (
                  <input type="number" className="w-full px-3 py-2 border rounded-lg" min={field.min} />
                )}
                
                {field.type === 'select' && (
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option value="">Select an option</option>
                    {field.options?.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                
                {field.type === 'multiselect' && (
                  <div className="space-y-2">
                    {field.options?.map((option, i) => (
                      <label key={i} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                
                {field.type === 'checkbox' && (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>I agree</span>
                  </label>
                )}
                
                {field.type === 'file' && (
                  <div className="flex flex-col gap-2">
                    <Button variant="outline">
                      Upload {field.multiple ? 'Files' : 'File'}
                    </Button>
                    <p className="text-xs text-gray-500">
                      Accepted formats: {field.accept || '*'}
                    </p>
                  </div>
                )}
                
                {field.type === 'address' && (
                  <div className="space-y-2">
                    <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Street Address" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="City" />
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="State/Province" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Postal Code" />
                      <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Country" />
                    </div>
                  </div>
                )}
                
                {field.type === 'schedule' && (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Select your availability hours</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs font-medium">Weekdays</p>
                        <select className="w-full px-3 py-2 border rounded-lg mt-1">
                          <option value="all_day">All Day</option>
                          <option value="business_hours">Business Hours (9-5)</option>
                          <option value="evening">Evening Hours</option>
                          <option value="custom">Custom Hours</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-xs font-medium">Weekends</p>
                        <select className="w-full px-3 py-2 border rounded-lg mt-1">
                          <option value="all_day">All Day</option>
                          <option value="business_hours">Business Hours (9-5)</option>
                          <option value="evening">Evening Hours</option>
                          <option value="custom">Custom Hours</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          {activeSection > 0 && (
            <Button
              variant="outline"
              onClick={() => setActiveSection(prev => prev - 1)}
            >
              Previous
            </Button>
          )}
          
          {activeSection < form.sections.length - 1 ? (
            <Button
              onClick={() => setActiveSection(prev => prev + 1)}
            >
              Next
            </Button>
          ) : (
            <Button>
              Submit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Notification Modal Component
const NotificationModal = ({ isOpen, onClose, professional }) => {
  const [notificationType, setNotificationType] = useState('banner');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationPriority, setNotificationPriority] = useState('normal');
  const [notificationAction, setNotificationAction] = useState('');
  const [expiryTime, setExpiryTime] = useState('');

  if (!isOpen || !professional) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Send Notification to {professional.name}</h2>
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
              className="w-full px-3 py-2 border rounded-lg resize-none"
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
            <input
              type="text"
              value={notificationAction}
              onChange={(e) => setNotificationAction(e.target.value)}
              placeholder="Enter URL for notification action"
              className="w-full px-3 py-2 border rounded-lg"
            />
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

// Permission Modal Component
const PermissionModal = ({ isOpen, onClose, professional }) => {
  const [cameraAccess, setCameraAccess] = useState(professional?.permissions.camera || false);
  const [notificationAccess, setNotificationAccess] = useState(professional?.permissions.notifications || false);

  if (!isOpen || !professional) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Manage Permissions for {professional.name}</h2>
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
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Changing permissions will affect this professional's ability to interact with certain features of the platform.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Camera Access</h3>
                <p className="text-sm text-gray-500 mt-1">Allow the professional to use video call features</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cameraAccess}
                  onChange={() => setCameraAccess(!cameraAccess)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Notification Access</h3>
                <p className="text-sm text-gray-500 mt-1">Allow the professional to receive notifications</p>
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationAccess}
                  onChange={() => setNotificationAccess(!notificationAccess)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

// Professionals Tab Content
const ProfessionalsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const filteredProfessionals = professionals.filter(prof => 
    (selectedCategory === 'all' || prof.category === selectedCategory) &&
    (prof.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     prof.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search professionals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">All Categories</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Construction">Construction</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredProfessionals.map(professional => (
          <Card key={professional.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">{professional.name}</h3>
                  <Badge className={professional.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {professional.status.charAt(0).toUpperCase() + professional.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-1">{professional.email}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {professional.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined: {professional.joinDate}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => {
                    setSelectedProfessional(professional);
                    setShowNotificationModal(true);
                  }}
                >
                  <Bell className="h-4 w-4" />
                  Notify
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => {
                    setSelectedProfessional(professional);
                    setShowPermissionModal(true);
                  }}
                >
                  <Settings className="h-4 w-4" />
                  Permissions
                </Button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                  <h4 className="font-medium mb-2">Permissions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-centergap-2">
<Camera className="h-4 w-4 text-gray-500" />
<span className="text-sm">Camera Access</span>
</div>
<Badge className={professional.permissions.camera ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
{professional.permissions.camera ? 'Enabled' : 'Disabled'}
</Badge>
</div>
<div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
<div className="flex items-center gap-2">
<Bell className="h-4 w-4 text-gray-500" />
<span className="text-sm">Notifications</span>
</div>
<Badge className={professional.permissions.notifications ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
{professional.permissions.notifications ? 'Enabled' : 'Disabled'}
</Badge>
</div>
</div>
</div>
<div className="sm:w-1/2">
<h4 className="font-medium mb-2">Status</h4>
<div className="p-2 bg-gray-50 rounded-lg">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<UserCheck className="h-4 w-4 text-gray-500" />
<span className="text-sm">Account Status</span>
</div>
<Badge className={professional.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
{professional.status.charAt(0).toUpperCase() + professional.status.slice(1)}
</Badge>
</div>
</div>
</div>
</div>
</div>
</Card>
))}
</div>{/* Notification Modal */}
  {selectedProfessional && (
    <NotificationModal
      isOpen={showNotificationModal}
      onClose={() => setShowNotificationModal(false)}
      professional={selectedProfessional}
    />
  )}

  {/* Permission Modal */}
  {selectedProfessional && (
    <PermissionModal
      isOpen={showPermissionModal}
      onClose={() => setShowPermissionModal(false)}
      professional={selectedProfessional}
    />
  )}
</div>);
};
// Settings Tab Content
const SettingsTab = () => {
return (
<Card className="p-6 space-y-6">
<div>
<h2 className="text-lg font-semibold mb-4">Professional Form Settings</h2>
<div className="space-y-4">
<div className="bg-blue-50 p-4 rounded-lg">
<div className="flex items-start gap-3">
<AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
<p className="text-sm text-blue-700">
These settings affect all professional registration forms across the platform.
</p>
</div>
</div><div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-3">Registration Requirements</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>Email Verification</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>Phone Verification</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>Identity Verification</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>License Verification</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Approval Process</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" />
              <span>Auto-approve with verified documents</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>Manual review required</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-gray-300" defaultChecked />
              <span>Background check required</span>
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Probation Period (days)</label>
              <input type="number" className="w-20 px-3 py-2 border rounded-lg" defaultValue={30} min={0} />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <h3 className="font-medium mb-3">Default Form Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Basic Information</h4>
            <div className="space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Full Name</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Phone</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Business Address</span>
              </label>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Qualifications</h4>
            <div className="space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>License/Certification</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Experience</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Specializations</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Service Offerings</span>
              </label>
            </div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Service Details</h4>
            <div className="space-y-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Service Areas</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Availability</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Rates/Pricing</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                <span>Response Time</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="pt-4 border-t flex justify-end gap-3">
    <Button variant="outline">Cancel Changes</Button>
    <Button>Save Settings</Button>
  </div>
</Card>);
};
return (
  <div className="min-h-screen bg-gray-50"   style={{ textAlign: 'left' }}>
    <AdminHeader />
    <main className="lg:pl-64 pt-16">
  <div className="p-6">
    <div className="max-w-7xl mx-auto space-y-6">
      {formView === 'list' ? (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Professional Forms</h1>
              <p className="text-gray-600 mt-1">Manage professional registration and verification forms</p>
            </div>
            <Button 
              className="flex items-center gap-2" 
              onClick={() => {
                setFormView('edit');
                setSelectedForm(null);
                setEditMode(true);
              }}
            >
              <Plus className="h-4 w-4" />
              Add Form
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Forms</p>
                  <p className="text-2xl font-semibold mt-1">8</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FormInput className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Active Providers</p>
                  <p className="text-2xl font-semibold mt-1">245</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Categories</p>
                  <p className="text-2xl font-semibold mt-1">12</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Approval Rate</p>
                  <p className="text-2xl font-semibold mt-1">76%</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-yellow-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 border-b overflow-x-auto">
            <TabButton
              active={activeTab === 'forms'}
              label="Forms"
              icon={FormInput}
              onClick={() => setActiveTab('forms')}
            />
            <TabButton
              active={activeTab === 'professionals'}
              label="Professionals"
              icon={User}
              onClick={() => setActiveTab('professionals')}
            />
            <TabButton
              active={activeTab === 'settings'}
              label="Settings"
              icon={Settings}
              onClick={() => setActiveTab('settings')}
            />
          </div>

          {activeTab === 'forms' && (
            <>
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search forms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Categories</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              {/* Forms List */}
              <div className="grid grid-cols-1 gap-6">
                {forms
                  .filter(form => 
                    (selectedCategory === 'all' || form.category === selectedCategory) &&
                    (form.name.toLowerCase().includes(searchQuery.toLowerCase()) || form.category.toLowerCase().includes(searchQuery.toLowerCase()))
                  )
                  .map(form => (
                    <FormCard key={form.id} form={form} />
                  ))}
              </div>
            </>
          )}

          {activeTab === 'professionals' && <ProfessionalsTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </>
      ) : (
        <FormEditor 
          form={selectedForm} 
          onSave={() => setFormView('list')} 
          onCancel={() => setFormView('list')} 
        />
      )}
    </div>
  </div>
</main>

{/* Form Preview Modal */}
{showPreview && selectedForm && (
  <FormPreview 
    form={selectedForm}
    onClose={() => setShowPreview(false)}
  />
)}</div>
);
};
export default ProfessionalForms;