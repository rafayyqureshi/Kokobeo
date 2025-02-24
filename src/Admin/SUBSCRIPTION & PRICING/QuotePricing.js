import React, { useState } from 'react';
import {
  Shield, Plus, Edit, Trash2, ArrowUpRight,
  DollarSign, Settings, Filter, Search, Star,
  AlertCircle, X, Award, Check, Building2,
  Calculator, ChevronDown, LockIcon, UnlockIcon,
  Clock, FileText, PercentIcon, MapPin, Globe,
  Tag, ChevronRight, Zap, Calendar
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const QuotePricing = () => {
  const [activeTab, setActiveTab] = useState('pricing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  // Mock data for pricing rules
  const pricingRules = [
    {
      id: 1,
      category: "Plumbing",
      subcategories: [
        {
          name: "Emergency Repairs",
          regions: [
            {
              name: "Vancouver",
              country: "Canada",
              currency: "CAD",
              quotePrice: {
                base: 5,
                emergency: 12
              },
              commission: {
                regular: "10%",
                emergency: {
                  day: "25%",
                  night: "35%",
                  holiday: "40%"
                }
              }
            },
            {
              name: "Toronto",
              country: "Canada",
              currency: "CAD",
              quotePrice: {
                base: 6,
                emergency: 15
              },
              commission: {
                regular: "12%",
                emergency: {
                  day: "28%",
                  night: "38%",
                  holiday: "42%"
                }
              }
            }
          ],
          modifiers: {
            emergency: true,
            holiday: true,
            nightTime: true,
            distance: true
          }
        },
        {
          name: "Installation Services",
          regions: [
            {
              name: "Vancouver",
              country: "Canada",
              currency: "CAD",
              quotePrice: {
                base: 4,
                emergency: 10
              },
              commission: {
                regular: "8%",
                emergency: {
                  day: "20%",
                  night: "30%",
                  holiday: "35%"
                }
              }
            }
          ],
          modifiers: {
            emergency: false,
            holiday: true,
            nightTime: false,
            distance: true
          }
        }
      ],
      settings: {
        minimumFee: true,
        autoAdjustment: true,
        allowNegotiation: false,
        requireDeposit: true
      },
      status: "active",
      lastUpdated: "2024-02-18"
    },
    {
      id: 2,
      category: "Electrical",
      subcategories: [
        {
          name: "Emergency Services",
          regions: [
            {
              name: "Vancouver",
              country: "Canada",
              currency: "CAD",
              quotePrice: {
                base: 6,
                emergency: 15
              },
              commission: {
                regular: "12%",
                emergency: {
                  day: "28%",
                  night: "38%",
                  holiday: "42%"
                }
              }
            }
          ],
          modifiers: {
            emergency: true,
            holiday: true,
            nightTime: true,
            distance: true
          }
        }
      ],
      settings: {
        minimumFee: true,
        autoAdjustment: true,
        allowNegotiation: false,
        requireDeposit: true
      },
      status: "active",
      lastUpdated: "2024-02-17"
    }
  ];

  const PricingRuleCard = ({ rule }) => (
    <Card className="p-6"   style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{rule.category}</h3>
            <Badge className={
              rule.status === 'active' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {rule.status.charAt(0).toUpperCase() + rule.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            Last updated: {rule.lastUpdated}
          </div>
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

      {/* Subcategories */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Subcategories</h4>
        <div className="space-y-4"   style={{ textAlign: 'left' }}>
          {rule.subcategories.map((subcategory, index) => (
            <Card key={index} className="p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium">{subcategory.name}</h5>
                <div className="flex gap-2">
                  {subcategory.modifiers.emergency && (
                    <Badge className="bg-red-100 text-red-700">Emergency</Badge>
                  )}
                  {subcategory.modifiers.holiday && (
                    <Badge className="bg-blue-100 text-blue-700">Holiday</Badge>
                  )}
                  {subcategory.modifiers.nightTime && (
                    <Badge className="bg-purple-100 text-purple-700">Night</Badge>
                  )}
                </div>
              </div>

              {/* Regional Pricing */}
              <div className="mt-4 space-y-3">
                {subcategory.regions.map((region, regionIndex) => (
                  <div key={regionIndex} className="p-3 bg-white rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{region.name}, {region.country}</span>
                        <Badge variant="outline">{region.currency}</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <h6 className="text-sm text-gray-500 mb-2">Quote Pricing</h6>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Base Price</span>
                            <Badge variant="outline">{region.currency} {region.quotePrice.base}</Badge>
                          </div>
                          {region.quotePrice.emergency && (
                            <div className="flex justify-between">
                              <span className="text-sm">Emergency Price</span>
                              <Badge variant="outline">{region.currency} {region.quotePrice.emergency}</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="text-sm text-gray-500 mb-2">Commission Rates</h6>
                        <div className="space-y-1">
                          <div className="flex justify-between">
                            <span className="text-sm">Regular</span>
                            <Badge variant="outline">{region.commission.regular}</Badge>
                          </div>
                          {region.commission.emergency && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-sm">Emergency (Day)</span>
                                <Badge variant="outline">{region.commission.emergency.day}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Emergency (Night)</span>
                                <Badge variant="outline">{region.commission.emergency.night}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm">Emergency (Holiday)</span>
                                <Badge variant="outline">{region.commission.emergency.holiday}</Badge>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mt-6 pt-6 border-t"   style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-3">Rule Settings</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Minimum Fee</span>
              <Badge className={rule.settings.minimumFee ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {rule.settings.minimumFee ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-adjustment</span>
              <Badge className={rule.settings.autoAdjustment ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {rule.settings.autoAdjustment ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Negotiation</span>
              <Badge className={rule.settings.allowNegotiation ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {rule.settings.allowNegotiation ? 'Allowed' : 'Not Allowed'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm">Deposit Required</span>
              <Badge className={rule.settings.requireDeposit ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                {rule.settings.requireDeposit ? 'Yes' : 'No'}
              </Badge>
            </div>
          </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Quote Pricing</h1>
                <p className="text-gray-600 mt-1">Manage quote pricing rules and commissions</p>
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
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calculator className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Tag className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Regions</p>
                    <p className="text-2xl font-semibold mt-1">15</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Globe className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold mt-1">$45.2k</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
              <TabButton
                active={activeTab === 'pricing'}
                label="Pricing Rules"
                icon={Calculator}
                onClick={() => setActiveTab('pricing')}
              />
              <TabButton
                active={activeTab === 'regions'}
                label="Regions"
                icon={Globe}
                onClick={() => setActiveTab('regions')}
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
                    placeholder="Search pricing rules..."
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
              
              <div className="flex gap-2">
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
                
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Regions</option>
                  <option value="vancouver">Vancouver</option>
                  <option value="toronto">Toronto</option>
                  <option value="montreal">Montreal</option>
                </select>
              </div>
            </div>

            {/* Pricing Rules */}
            <div className="grid grid-cols-1 gap-6">
              {pricingRules.map(rule => (
                <PricingRuleCard key={rule.id} rule={rule} />
              ))}
            </div>

            {/* Settings Panel - Hidden by default */}
            {activeTab === 'settings' && (
              <Card className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Global Pricing Settings</h3>
                  <p className="text-gray-600 mt-1">Configure default settings for all pricing rules</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Commission Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Default Regular Commission</label>
                        <input type="text" defaultValue="10%" className="mt-1 w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Default Emergency Commission</label>
                        <input type="text" defaultValue="25%" className="mt-1 w-full px-4 py-2 border rounded-lg" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-4">Quote Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Min Quote Price</label>
                        <input type="number" defaultValue={5} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Max Quotes Per Request</label>
                        <input type="number" defaultValue={5} className="mt-1 w-full px-4 py-2 border rounded-lg" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuotePricing;