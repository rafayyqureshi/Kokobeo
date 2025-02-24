import React, { useState } from 'react';
import {
  FormInput, Plus, Edit, Trash2, Eye, Settings,
  Search, Filter, FileText, Calendar, CheckSquare,
  Save, Copy, User, Shield, FileCheck, BadgeCheck,
  Clock, Star, MapPin, DollarSign, Briefcase,
  Award, Building2, Video, Share2, Lock, Globe
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
        requireInterview: true
      },
      stats: {
        totalApplications: 89,
        approvalRate: "68%",
        averageCompletionTime: "55 minutes"
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
            onClick={() => setSelectedForm(form)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(true)}
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
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{field.label}</span>
                    {field.required && (
                      <Badge className="bg-red-50 text-red-700">Required</Badge>
                    )}
                  </div>
                ))}
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

return (
  <div className="min-h-screen bg-gray-50"   style={{ textAlign: 'left' }}>
    <AdminHeader />
    
    <main className="lg:pl-64 pt-16">
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Professional Forms</h1>
              <p className="text-gray-600 mt-1">Manage professional registration and verification forms</p>
            </div>
            <Button className="flex items-center gap-2" onClick={() => setShowAddModal(true)}>
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
              active={activeTab === 'templates'}
              label="Templates"
              icon={Copy}
              onClick={() => setActiveTab('templates')}
            />
            <TabButton
              active={activeTab === 'settings'}
              label="Settings"
              icon={Settings}
              onClick={() => setActiveTab('settings')}
            />
          </div>

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
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
            </select>
          </div>

          {/* Forms List */}
          <div className="grid grid-cols-1 gap-6">
            {forms.map(form => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        </div>
      </div>
    </main>
  </div>
);
};

export default ProfessionalForms;