import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, Settings2, Plus, Edit, Trash2, X, CheckCircle,
  ArrowUpRight, Shield, Star, Clock, AlertCircle, Settings,
  DollarSign, FileText, Users, Crown, Zap, Check, MapPin,
  Globe, Building2, Calendar, Save
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const SubscriptionPlansadmin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [activeTab, setActiveTab] = useState('regular');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Sample subscription plans data
  const plans = [
    {
      id: 1,
      name: "Basic Professional Plan",
      type: "regular",
      status: "active",
      regions: ["Canada", "USA"],
      features: [
        "Basic Profile Listing",
        "10 Quote Credits/month",
        "Standard Support",
        "Basic Analytics"
      ],
      quoteLimits: {
        monthly: 10,
        rollover: false,
        extraCost: 5
      },
      availability: {
        provinces: ["Ontario", "Quebec"],
        timeSlots: ["business-hours"]
      },
      pricing: {
        CAD: {
          monthly: 49.99,
          yearly: 539.89
        },
        USD: {
          monthly: 39.99,
          yearly: 431.89
        }
      },
      serviceTypes: ["regular"],
      activeSubscribers: 245,
      metrics: {
        conversionRate: "68%",
        renewalRate: "72%",
        avgRevenue: "$450"
      }
    },
    {
      id: 2,
      name: "Emergency Services Pro",
      type: "emergency",
      status: "active",
      regions: ["Canada"],
      features: [
        "Priority Emergency Listings",
        "Unlimited Emergency Quotes",
        "24/7 Support Access",
        "Real-time Analytics",
        "Priority Dispatch"
      ],
      quoteLimits: {
        monthly: "unlimited",
        emergencyPriority: true
      },
      availability: {
        provinces: ["All"],
        timeSlots: ["24-7"]
      },
      pricing: {
        CAD: {
          monthly: 199.99,
          yearly: 2159.89
        }
      },
      serviceTypes: ["emergency"],
      activeSubscribers: 89,
      metrics: {
        conversionRate: "75%",
        renewalRate: "85%",
        avgRevenue: "$2,100"
      }
    }
  ];

  const PlanCard = ({ plan }) => (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <Badge className={
              plan.type === 'emergency' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }>
              {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
            </Badge>
            <Badge className={plan.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{plan.activeSubscribers} active subscribers</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditModal(plan)}
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

      {/* Regions and Availability */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Regions</h4>
          <div className="flex flex-wrap gap-2">
            {plan.regions.map((region, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {region}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {plan.availability.provinces.length === 1 && plan.availability.provinces[0] === 'All' 
                  ? 'All Provinces' 
                  : `${plan.availability.provinces.length} Provinces`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm">
                {plan.availability.timeSlots.includes('24-7') ? '24/7 Availability' : 'Business Hours'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div>
        <h4 className="font-medium mb-3">Plan Features</h4>
        <div className="space-y-2">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote Limits */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Quote Allocation</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">Monthly Quotes</span>
            <p className="font-medium">{plan.quoteLimits.monthly}</p>
          </div>
          {plan.quoteLimits.extraCost && (
            <div>
              <span className="text-sm text-gray-500">Extra Quote Cost</span>
              <p className="font-medium">${plan.quoteLimits.extraCost}</p>
            </div>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <h4 className="font-medium mb-3">Regional Pricing</h4>
        <div className="space-y-4">
          {Object.entries(plan.pricing).map(([currency, prices]) => (
            <div key={currency} className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">{currency} Monthly</span>
                <p className="font-medium">${prices.monthly}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-500">{currency} Yearly</span>
                <p className="font-medium">${prices.yearly}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-500">Conversion Rate</span>
            <p className="font-medium text-green-600">{plan.metrics.conversionRate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Renewal Rate</span>
            <p className="font-medium text-blue-600">{plan.metrics.renewalRate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Avg Revenue</span>
            <p className="font-medium">{plan.metrics.avgRevenue}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  const PlanModal = ({ plan = null, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {plan ? 'Edit Subscription Plan' : 'Create New Plan'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter plan name"
                  defaultValue={plan?.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plan Type</label>
                <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                  <option value="regular">Regular Service</option>
                  <option value="emergency">Emergency Service</option>
                </select>
              </div>
            </div>

            {/* Regions and Availability */}
            <div className="space-y-4">
              <h3 className="font-medium">Regions & Availability</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Available Regions</label>
                  <select multiple className="mt-1 block w-full px-3 py-2 border rounded-lg">
                    <option value="canada">Canada</option>
                    <option value="usa">United States</option>
                    <option value="uk">United Kingdom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Availability</label>
                  <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                    <option value="business">Business Hours</option>
                    <option value="24-7">24/7 Availability</option>
                    <option value="custom">Custom Hours</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quote Limits */}
            <div className="space-y-4">
              <h3 className="font-medium">Quote Allocation</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monthly Quote Limit</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter quote limit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Extra Quote Cost</label>
                  <input
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    placeholder="Cost per additional quote"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="font-medium">Pricing</h3>
              {['CAD', 'USD'].map(currency => (
                <div key={currency} className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currency} Monthly Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      placeholder={`Monthly price in ${currency}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {currency} Yearly Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      placeholder={`Yearly price in ${currency}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              <h3 className="font-medium">Plan Features</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <label className="text-sm">Basic Profile Listing</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <label className="text-sm">Standard Support</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <label className="text-sm">Analytics Dashboard</label>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button>Save Plan</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Subscription Plans</h1>
                <p className="text-gray-600 mt-1">Manage subscription plans and pricing for professionals</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Plan
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Plans</p>
                    <p className="text-2xl font-semibold mt-1">4</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Subscribers</p>
                    <p className="text-2xl font-semibold mt-1">1.2k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Monthly Revenue</p>
                    <p className="text-2xl font-semibold mt-1">$45.8k</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Retention</p>
                    <p className="text-2xl font-semibold mt-1">85%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ArrowUpRight className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                  <option value="all">All Plans</option>
                  <option value="regular">Regular Service Plans</option>
                  <option value="emergency">Emergency Service Plans</option>
                </select>
              </div>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border rounded-lg w-full sm:w-auto"
              >
                <option value="all">All Regions</option>
                <option value="canada">Canada</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
              </select>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 gap-6">
              {plans
                .filter(plan => activeTab === 'all' || plan.type === activeTab)
                .filter(plan => selectedRegion === 'all' || plan.regions.includes(selectedRegion))
                .map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))
              }
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
              {(showAddModal || showEditModal) && (
                <PlanModal
                  plan={showEditModal}
                  isOpen={true}
                  onClose={() => {
                    setShowAddModal(false);
                    setShowEditModal(null);
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SubscriptionPlansadmin;