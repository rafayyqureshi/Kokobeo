import React, { useState } from 'react';
import {
  PercentIcon, DollarSign, Settings, Plus, Edit,
  Trash2, ArrowUpRight, Users, Star, Clock, Shield,
  Filter, Search, AlertCircle, X, Award, Check,
  Building2, MapPin, Calculator, ChevronDown
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const CommissionSettings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample commission rules
  const commissionRules = [
    {
      id: 1,
      name: "Standard Commission",
      category: "Local Services",
      status: "active",
      baseRate: 10,
      tiers: [
        {
          name: "Standard",
          threshold: "$0",
          rate: 10,
          conditions: []
        },
        {
          name: "Silver",
          threshold: "$5,000",
          rate: 8,
          conditions: ["Minimum 50 completed jobs", "4.5+ rating"]
        },
        {
          name: "Gold",
          threshold: "$10,000",
          rate: 6,
          conditions: ["Minimum 100 completed jobs", "4.8+ rating"]
        }
      ],
      modifiers: [
        {
          name: "Emergency Service",
          adjustment: "+2%",
          condition: "For emergency service calls"
        },
        {
          name: "Weekend Rate",
          adjustment: "+1.5%",
          condition: "For services on weekends"
        },
        {
          name: "Holiday Rate",
          adjustment: "+3%",
          condition: "For services on holidays"
        }
      ],
      settings: {
        billingCycle: "Monthly",
        minimumPayout: "$100",
        payoutMethod: "Direct Deposit",
        autoAdjustment: true
      }
    },
    {
      id: 2,
      name: "Premium Commission",
      category: "Professional Services",
      status: "active",
      baseRate: 15,
      tiers: [
        {
          name: "Standard",
          threshold: "$0",
          rate: 15,
          conditions: []
        },
        {
          name: "Elite",
          threshold: "$20,000",
          rate: 12,
          conditions: ["Minimum 200 completed jobs", "4.9+ rating"]
        }
      ],
      modifiers: [
        {
          name: "International Service",
          adjustment: "+3%",
          condition: "For international clients"
        },
        {
          name: "Premium Service",
          adjustment: "+2%",
          condition: "For premium service packages"
        }
      ],
      settings: {
        billingCycle: "Monthly",
        minimumPayout: "$200",
        payoutMethod: "Direct Deposit",
        autoAdjustment: true
      }
    }
  ];

  const CommissionCard = ({ rule }) => (
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

      {/* Base Rate */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <PercentIcon className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium">Base Commission Rate</h4>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-semibold text-blue-700">{rule.baseRate}%</div>
          <p className="text-sm text-blue-600 mt-1">Standard commission rate</p>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="mt-6">
        <h4 className="font-medium mb-4">Commission Tiers</h4>
        <div className="space-y-4">
          {rule.tiers.map((tier, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge className={
                    tier.name === 'Standard' ? 'bg-gray-100 text-gray-700' :
                    tier.name === 'Silver' ? 'bg-blue-100 text-blue-700' :
                    tier.name === 'Gold' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-purple-100 text-purple-700'
                  }>
                    {tier.name}
                  </Badge>
                  <span className="text-sm text-gray-500">From {tier.threshold}</span>
                </div>
                <Badge className="bg-green-100 text-green-700">{tier.rate}%</Badge>
              </div>
              {tier.conditions.length > 0 && (
                <div className="mt-2 space-y-1">
                  {tier.conditions.map((condition, condIndex) => (
                    <div key={condIndex} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="h-4 w-4 text-green-600" />
                      {condition}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rate Modifiers */}
      <div className="mt-6"   style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-4">Rate Modifiers</h4>
        <div className="grid grid-cols-2 gap-4">
          {rule.modifiers.map((modifier, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">{modifier.name}</h5>
                  <p className="text-sm text-gray-500 mt-1">{modifier.condition}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-700">
                  {modifier.adjustment}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium mb-4">Payout Settings</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Billing Cycle</div>
            <Badge variant="outline">{rule.settings.billingCycle}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Minimum Payout</div>
            <Badge variant="outline">{rule.settings.minimumPayout}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Payout Method</div>
            <Badge variant="outline">{rule.settings.payoutMethod}</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="text-sm">Auto-Adjustment</div>
            <Badge className={rule.settings.autoAdjustment ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              {rule.settings.autoAdjustment ? 'Enabled' : 'Disabled'}
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
                <h1 className="text-2xl font-bold text-gray-900">Commission Settings</h1>
                <p className="text-gray-600 mt-1">Manage commission rates and payout rules</p>
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
                    <Settings className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg Commission</p>
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
                    <p className="text-sm text-gray-500">Total Categories</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Modifiers</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-yellow-600" />
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
                      placeholder="Search commission rules..."
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

            {/* Commission Rules */}
            <div className="grid grid-cols-1 gap-6">
              {commissionRules.map(rule => (
                <CommissionCard key={rule.id} rule={rule} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommissionSettings;