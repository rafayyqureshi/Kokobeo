import React, { useState } from 'react';
import {
  FormInput, Plus, Edit, Trash2, Eye, Settings,
  Search, Filter, FileText, Calendar, CheckSquare,
  Save, Copy, DollarSign, Clock, AlertCircle,
  Calculator, Tag, MessageSquare, Send, Zap,
  PieChart, BarChart2, Building2, MapPin
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
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

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
    }
  ];

  const FormCard = ({ form }) => (
    <Card className="p-3 sm:p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-medium text-sm sm:text-base">{form.name}</h3>
            <Badge className={
              form.type === 'emergency' ? 'bg-red-100 text-red-700' :
              form.type === 'regular' ? 'bg-blue-100 text-blue-700' :
              'bg-purple-100 text-purple-700'
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
          <p className="mt-1 text-xs sm:text-sm text-gray-600">{form.description}</p>
          
          <div className="mt-3 sm:mt-4 flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500">
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

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">Required Information:</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {form.required.map((field, index) => (
                  <Badge key={index} variant="outline" className="text-xs">{field}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-700">Pricing Features:</p>
              <div className="mt-1 space-y-1 text-xs sm:text-sm">
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
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-1 sm:gap-2 self-start">
          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 sm:p-2">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1 sm:p-2 text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div className="space-y-3 sm:space-y-4">
            {forms.map(form => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        );
      
      case 'settings':
        return (
          <Card className="p-3 sm:p-6 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Quote Form Settings</h3>
              <p className="text-sm text-gray-600 mt-1">Configure quote request form settings and pricing rules</p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Emergency Quote Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Default Deposit Percentage</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
                      defaultValue={20}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Response Time Limit (minutes)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
                      defaultValue={30}
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable Urgency Multiplier</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Require Location Verification</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Regular Quote Settings</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Quote Validity Period (days)</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
                      defaultValue={7}
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700">Maximum Quote Requests</label>
                    <input
                      type="number"
                      className="mt-1 block w-full px-3 py-2 border rounded-md text-sm"
                      defaultValue={5}
                    />
                  </div>
                </div>
                <div className="mt-3 sm:mt-4 space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable Quote Comparison</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Allow Price Negotiation</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">Price Calculation Rules</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Include Travel Distance in Price</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Apply Peak Hour Rates</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs sm:text-sm">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable Milestone Payments</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" className="w-full sm:w-auto text-sm">Cancel</Button>
              <Button className="w-full sm:w-auto text-sm">Save Settings</Button>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Quote Forms</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Manage service quote request forms</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Forms</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">6</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FormInput className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Active Quotes</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">245</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MessageSquare className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Emergency Requests</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-4 sm:h-5 w-4 sm:w-5 text-red-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">68%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <PieChart className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search quote forms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                  />
                </div>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm bg-white"
                >
                  <option value="all">All Types</option>
                  <option value="emergency">Emergency</option>
                  <option value="regular">Regular</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <Button className="flex items-center gap-2 text-sm whitespace-nowrap">
                <Plus className="h-4 w-4" />
                New Quote Form
              </Button>
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
                active={activeTab === 'settings'}
                label="Settings"
                icon={Settings}
                onClick={() => setActiveTab('settings')}
              />
            </div>

            {/* Tab Content */}
            <div>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteForms;