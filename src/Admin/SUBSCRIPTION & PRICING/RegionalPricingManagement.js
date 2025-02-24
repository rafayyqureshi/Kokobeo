import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Globe, Plus, Edit, Trash2, X, CheckCircle,
  ArrowUpRight, Filter, Search, Building2, Settings,
  DollarSign, FileText, Flag, AlertCircle, Check, Users
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const RegionalPricing = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);

  // Mock data for regional pricing
  const regions = [
    {
      id: 1,
      name: 'Greater Toronto Area',
      country: 'Canada',
      type: 'metropolitan',
      status: 'active',
      currency: 'CAD',
      adjustments: {
        subscriptionPlans: {
          basic: '+0%',
          professional: '+5%',
          enterprise: '+10%'
        },
        serviceCharges: {
          platformFee: '+2%',
          transactionFee: '3.5%',
          emergencyFee: '+15%'
        }
      },
      modifiers: {
        weekendRates: true,
        holidayRates: true,
        peakHours: true,
        seasonalPricing: false
      },
      activeProviders: 245,
      averageOrderValue: 180
    },
    {
      id: 2,
      name: 'Vancouver Metropolitan',
      country: 'Canada',
      type: 'metropolitan',
      status: 'active',
      currency: 'CAD',
      adjustments: {
        subscriptionPlans: {
          basic: '+0%',
          professional: '+5%',
          enterprise: '+8%'
        },
        serviceCharges: {
          platformFee: '+2%',
          transactionFee: '3.5%',
          emergencyFee: '+12%'
        }
      },
      modifiers: {
        weekendRates: true,
        holidayRates: true,
        peakHours: true,
        seasonalPricing: true
      },
      activeProviders: 180,
      averageOrderValue: 165
    }
  ];

  const RegionCard = ({ region }) => (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start"  style={{ textAlign: 'left' }}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{region.name}</h3>
            <Badge className="bg-blue-100 text-blue-700">
              {region.type.charAt(0).toUpperCase() + region.type.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Flag className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{region.country}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditModal(region)}
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

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Subscription Adjustments</h4>
          <div className="space-y-2">
            {Object.entries(region.adjustments.subscriptionPlans).map(([plan, adjustment]) => (
              <div key={plan} className="flex items-center justify-between text-sm">
                <span className="capitalize">{plan}</span>
                <Badge className={
                  adjustment === '+0%' ? 'bg-gray-100 text-gray-700' :
                  'bg-blue-100 text-blue-700'
                }>
                  {adjustment}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Service Charges</h4>
          <div className="space-y-2">
            {Object.entries(region.adjustments.serviceCharges).map(([charge, rate]) => (
              <div key={charge} className="flex items-center justify-between text-sm">
                <span className="capitalize">{charge.replace(/([A-Z])/g, ' $1').trim()}</span>
                <Badge className="bg-purple-100 text-purple-700">
                  {rate}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Price Modifiers</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(region.modifiers).map(([modifier, enabled]) => (
            <div key={modifier} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="capitalize">{modifier.replace(/([A-Z])/g, ' $1').trim()}</span>
              <Badge className={enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t grid grid-cols-2 gap-4"  style={{ textAlign: 'left' }}>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {region.activeProviders} active providers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Avg. order ${region.averageOrderValue}
          </span>
        </div>
      </div>
    </Card>
  );

  // Modal for adding/editing regional pricing
  const PricingModal = ({ region = null, isOpen, onClose }) => {
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
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 border-b sticky top-0 bg-white"  style={{ textAlign: 'left' }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {region ? 'Edit Regional Pricing' : 'Add Regional Pricing'}
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
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Region Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border rounded-lg px-3 py-2"
                  placeholder="Enter region name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <select className="mt-1 block w-full border rounded-lg px-3 py-2">
                    <option value="">Select Country</option>
                    <option value="canada">Canada</option>
                    <option value="usa">United States</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Currency</label>
                  <select className="mt-1 block w-full border rounded-lg px-3 py-2">
                    <option value="cad">CAD</option>
                    <option value="usd">USD</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subscription Plan Adjustments */}
            <div className="space-y-4">
              <h3 className="font-medium">Subscription Plan Adjustments</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Basic', 'Professional', 'Enterprise'].map((plan) => (
                  <div key={plan}>
                    <label className="block text-sm font-medium text-gray-700">{plan}</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border rounded-lg px-3 py-2"
                      placeholder="e.g. +5%"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Service Charges */}
            <div className="space-y-4">
              <h3 className="font-medium">Service Charges</h3>
              <div className="grid grid-cols-3 gap-4">
                {['Platform Fee', 'Transaction Fee', 'Emergency Fee'].map((fee) => (
                  <div key={fee}>
                    <label className="block text-sm font-medium text-gray-700">{fee}</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border rounded-lg px-3 py-2"
                      placeholder="e.g. 3.5%"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Modifiers */}
            <div className="space-y-4">
              <h3 className="font-medium">Price Modifiers</h3>
              <div className="space-y-3">
                {['Weekend Rates', 'Holiday Rates', 'Peak Hours', 'Seasonal Pricing'].map((modifier) => (
                  <label key={modifier} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>{modifier}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button>{region ? 'Save Changes' : 'Add Region'}</Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Regional Pricing</h1>
                <p className="text-gray-600 mt-1">Manage pricing variations across different regions</p>
              </div>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Region
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Regions</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Regions</p>
                    <p className="text-2xl font-semibold mt-1">6</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Price Variations</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg. Adjustment</p>
                    <p className="text-2xl font-semibold mt-1">+5.2%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ArrowUpRight className="h-5 w-5 text-yellow-600" />
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
                      placeholder="Search regions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                </div>
                
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Countries</option>
                  <option value="canada">Canada</option>
                  <option value="usa">United States</option>
                </select>
              </div>
            </Card>

            {/* Regions Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {regions.map(region => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        <PricingModal
          region={showEditModal}
          isOpen={!!showEditModal || showAddModal}
          onClose={() => {
            setShowEditModal(null);
            setShowAddModal(false);
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default RegionalPricing;