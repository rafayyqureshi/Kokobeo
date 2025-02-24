import React, { useState } from 'react';
import {
  CheckSquare, Sliders, Shield, Plus, Edit, Trash2,
  ArrowUpRight, DollarSign, Settings, Calendar, Clock,
  Filter, Search, Star, AlertCircle, X, Users,
  ChevronDown, ArrowRight, FileText, PercentIcon,
  LockIcon, UnlockIcon, Check
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const PaymentMilestones = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample milestone templates
  const milestoneTemplates = [
    {
      id: 1,
      name: "Standard Service",
      category: "Local Services",
      status: "active",
      stages: [
        {
          name: "Booking Confirmation",
          percentage: 10,
          releaseCondition: "Upon booking confirmation",
          holdingPeriod: "24 hours",
          refundable: true
        },
        {
          name: "Service Initiation",
          percentage: 40,
          releaseCondition: "On service start",
          holdingPeriod: "48 hours",
          refundable: true
        },
        {
          name: "Completion",
          percentage: 50,
          releaseCondition: "After service completion and client approval",
          holdingPeriod: "72 hours",
          refundable: false
        }
      ],
      settings: {
        autoRelease: true,
        clientApproval: true,
        disputePeriod: "7 days",
        escrowEnabled: true
      }
    },
    {
      id: 2,
      name: "Emergency Service",
      category: "Emergency",
      status: "active",
      stages: [
        {
          name: "Emergency Booking",
          percentage: 20,
          releaseCondition: "Immediate on booking",
          holdingPeriod: "12 hours",
          refundable: true
        },
        {
          name: "Service Completion",
          percentage: 80,
          releaseCondition: "Upon completion",
          holdingPeriod: "24 hours",
          refundable: false
        }
      ],
      settings: {
        autoRelease: true,
        clientApproval: true,
        disputePeriod: "48 hours",
        escrowEnabled: true
      }
    }
  ];

  const MilestoneCard = ({ template }) => (
    <Card className="p-6">
      <div className="flex justify-between items-start"   style={{ textAlign: 'left' }}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <Badge className={
              template.status === 'active' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">{template.category}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMilestone(template)}
          >
            <Edit className="h-4 w-4" />
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

      {/* Payment Stages */}
      <div className="mt-6"   style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-4">Payment Stages</h4>
        <div className="space-y-4">
          {template.stages.map((stage, index) => (
            <div key={index} className="flex items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center text-sm text-blue-600 font-medium">
                    {index + 1}
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                  <span className="font-medium">{stage.name}</span>
                  <Badge className="bg-blue-100 text-blue-700">
                    {stage.percentage}%
                  </Badge>
                </div>
                <div className="ml-8 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Release Condition</div>
                    <div className="text-sm">{stage.releaseCondition}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Holding Period</div>
                    <div className="text-sm">{stage.holdingPeriod}</div>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className={
                stage.refundable ? 'border-green-200 text-green-700' : 'border-red-200 text-red-700'
              }>
                {stage.refundable ? 'Refundable' : 'Non-refundable'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium mb-4">Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Auto-Release</div>
            <Badge className={template.settings.autoRelease ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {template.settings.autoRelease ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Client Approval</div>
            <Badge className={template.settings.clientApproval ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {template.settings.clientApproval ? 'Required' : 'Optional'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Dispute Period</div>
            <Badge variant="outline">{template.settings.disputePeriod}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Escrow</div>
            <Badge className={template.settings.escrowEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {template.settings.escrowEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"   style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">Payment Milestones</h1>
                <p className="text-gray-600 mt-1">Manage payment stages and release conditions</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Template
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Templates</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Stages</p>
                    <p className="text-2xl font-semibold mt-1">24</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckSquare className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Release Time</p>
                    <p className="text-2xl font-semibold mt-1">48h</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Success Rate</p>
                    <p className="text-2xl font-semibold mt-1">95%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
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
                  <option value="local">Local Services</option>
                  <option value="emergency">Emergency Services</option>
                  <option value="professional">Professional Services</option>
                </select>
              </div>
            </Card>

            {/* Milestone Templates */}
            <div className="grid grid-cols-1 gap-6">
              {milestoneTemplates.map(template => (
                <MilestoneCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentMilestones;