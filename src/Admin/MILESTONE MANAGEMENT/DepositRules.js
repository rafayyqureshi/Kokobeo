import React, { useState } from 'react';
import {
  Shield, Plus, Edit, Trash2, ArrowUpRight,
  DollarSign, Settings, Filter, Search, Star,
  AlertCircle, X, Award, Check, Building2,
  Calculator, ChevronDown, LockIcon, UnlockIcon,
  Clock, FileText, PercentIcon, RefreshCcw
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const DepositRules = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample deposit rules
  const depositRules = [
    {
      id: 1,
      name: "Standard Service Deposit",
      category: "Local Services",
      status: "active",
      rules: [
        {
          type: "Fixed Amount",
          amount: "$50",
          threshold: "Orders under $500",
          refundPolicy: "Fully refundable within 24 hours",
          conditions: [
            "First-time customers only",
            "Non-emergency services"
          ]
        },
        {
          type: "Percentage",
          amount: "10%",
          threshold: "Orders $500 - $2000",
          refundPolicy: "Refundable with 48 hours notice",
          conditions: [
            "All customers",
            "Standard booking"
          ]
        }
      ],
      holdingPeriod: "48 hours",
      releaseConditions: [
        "Service confirmation by professional",
        "No disputes filed",
        "Within holding period"
      ],
      exceptions: [
        {
          type: "Emergency Service",
          policy: "No deposit required",
          conditions: ["Verified emergency status"]
        },
        {
          type: "VIP Customer",
          policy: "Reduced deposit (5%)",
          conditions: ["Minimum 10 completed services", "4.5+ rating"]
        }
      ],
      settings: {
        autoRelease: true,
        disputeWindow: "24 hours",
        instantRelease: false,
        requireApproval: true
      }
    },
    {
      id: 2,
      name: "Professional Service Deposit",
      category: "Professional Services",
      status: "active",
      rules: [
        {
          type: "Percentage",
          amount: "15%",
          threshold: "All orders",
          refundPolicy: "Refundable with 72 hours notice",
          conditions: [
            "All customers",
            "Professional services"
          ]
        }
      ],
      holdingPeriod: "72 hours",
      releaseConditions: [
        "Service scheduling confirmed",
        "No cancellation request",
        "Within holding period"
      ],
      exceptions: [
        {
          type: "Corporate Client",
          policy: "Deposit waived",
          conditions: ["Verified corporate account", "Good payment history"]
        }
      ],
      settings: {
        autoRelease: true,
        disputeWindow: "48 hours",
        instantRelease: false,
        requireApproval: true
      }
    }
  ];

  const DepositRuleCard = ({ rule }) => (
    <Card className="p-6"   style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{rule.name}</h3>
            <Badge className={
              rule.status === 'active' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">{rule.category}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedRule(rule)}
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

      {/* Deposit Rules */}
      <div className="mt-6"   style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-4">Deposit Requirements</h4>
        <div className="space-y-4">
          {rule.rules.map((depositRule, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={
                    depositRule.type === 'Fixed Amount' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }>
                    {depositRule.type}
                  </Badge>
                  <span className="font-medium">{depositRule.amount}</span>
                </div>
                <Badge variant="outline">
                  {depositRule.threshold}
                </Badge>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCcw className="h-4 w-4 text-gray-400" />
                  {depositRule.refundPolicy}
                </div>
                {depositRule.conditions.map((condition, condIndex) => (
                  <div key={condIndex} className="flex items-center gap-2 ml-1 mt-1">
                    <Check className="h-4 w-4 text-green-600" />
                    {condition}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Release Conditions */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Release Conditions</h4>
          <Badge variant="outline">Holding Period: {rule.holdingPeriod}</Badge>
        </div>
        <div className="space-y-2">
          {rule.releaseConditions.map((condition, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-green-600" />
              {condition}
            </div>
          ))}
        </div>
      </div>

      {/* Exceptions */}
      <div className="mt-6">
        <h4 className="font-medium mb-4">Special Exceptions</h4>
        <div className="grid grid-cols-2 gap-4">
          {rule.exceptions.map((exception, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-yellow-100 text-yellow-700">
                  {exception.type}
                </Badge>
              </div>
              <p className="text-sm font-medium mb-2">{exception.policy}</p>
              <div className="space-y-1">
                {exception.conditions.map((condition, condIndex) => (
                  <div key={condIndex} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-600" />
                    {condition}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium mb-4">Rule Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Auto Release</div>
            <Badge className={rule.settings.autoRelease ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {rule.settings.autoRelease ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Dispute Window</div>
            <Badge variant="outline">{rule.settings.disputeWindow}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Instant Release</div>
            <Badge className={rule.settings.instantRelease ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {rule.settings.instantRelease ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Approval Required</div>
            <Badge className={rule.settings.requireApproval ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}>
              {rule.settings.requireApproval ? 'Yes' : 'No'}
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
                <h1 className="text-2xl font-bold text-gray-900">Deposit Rules</h1>
                <p className="text-gray-600 mt-1">Manage service deposit requirements and policies</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Rule
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Rules</p>
                    <p className="text-2xl font-semibold mt-1">6</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg Deposit</p>
                    <p className="text-2xl font-semibold mt-1">12%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <PercentIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Hold Time</p>
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
                    <p className="text-2xl font-semibold mt-1">98%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Check className="h-5 w-5 text-yellow-600" />
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
                      placeholder="Search deposit rules..."
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
                  <option value="professional">Professional Services</option>
                  <option value="emergency">Emergency Services</option>
                </select>
              </div>
            </Card>

            {/* Deposit Rules */}
            <div className="grid grid-cols-1 gap-6">
              {depositRules.map(rule => (
                <DepositRuleCard key={rule.id} rule={rule} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositRules;