import React, { useState } from 'react';
import {
  DollarSign, Search, Filter, Plus, Edit, Trash2,
  ArrowUpRight, Globe, AlertCircle, Settings,
  Calendar, Clock, CheckCircle, RefreshCw, X,
  ChevronDown, Building2, MapPin, Calculator,
  CreditCard, Percent, Lock, ChevronRight,
  FileText, BarChart2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const CurrencySettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  // Sample currency data
  const currencies = [
    {
      id: 1,
      name: "Canadian Dollar",
      code: "CAD",
      symbol: "$",
      isDefault: false,
      exchangeRate: 0.74,
      regions: ["Canada"],
      status: "active",
      settings: {
        symbolPosition: "before",
        decimalSeparator: ".",
        thousandsSeparator: ",",
        decimalPlaces: 2
      },
      fees: {
        transaction: 2.9,
        platformFee: 1.5,
        emergencyFee: 5
      },
      commissions: {
        regular: 10,
        emergency: {
          daytime: 25,
          nighttime: 35,
          holiday: 40
        }
      },
      limits: {
        minimum: 5,
        maximum: 10000
      }
    },
    {
      id: 2,
      name: "US Dollar",
      code: "USD",
      symbol: "$",
      isDefault: true,
      exchangeRate: 1,
      regions: ["USA"],
      status: "active",
      settings: {
        symbolPosition: "before",
        decimalSeparator: ".",
        thousandsSeparator: ",",
        decimalPlaces: 2
      },
      fees: {
        transaction: 2.9,
        platformFee: 1.5,
        emergencyFee: 5
      },
      commissions: {
        regular: 10,
        emergency: {
          daytime: 25,
          nighttime: 35,
          holiday: 40
        }
      },
      limits: {
        minimum: 5,
        maximum: 10000
      }
    }
  ];

  const regions = [
    { id: 'ca', name: 'Canada', currency: 'CAD' },
    { id: 'us', name: 'USA', currency: 'USD' },
    { id: 'uk', name: 'United Kingdom', currency: 'GBP' },
    { id: 'ie', name: 'Ireland', currency: 'EUR' },
    { id: 'au', name: 'Australia', currency: 'AUD' },
    { id: 'nz', name: 'New Zealand', currency: 'NZD' },
    { id: 'it', name: 'Italy', currency: 'EUR' },
    { id: 'es', name: 'Spain', currency: 'EUR' },
    { id: 'de', name: 'Germany', currency: 'EUR' },
    { id: 'cz', name: 'Czech Republic', currency: 'CZK' },
    { id: 'at', name: 'Austria', currency: 'EUR' },
    { id: 'fr', name: 'France', currency: 'EUR' },
    { id: 'pt', name: 'Portugal', currency: 'EUR' },
    { id: 'nl', name: 'Netherlands', currency: 'EUR' }
  ];

  const CurrencyCard = ({ currency }) => (
    <Card className="p-6">
      <div className="flex justify-between items-start"   style={{ textAlign: 'left' }}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <DollarSign className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{currency.name}</h3>
              {currency.isDefault && (
                <Badge className="bg-blue-100 text-blue-700">Default</Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">{currency.code}</Badge>
              <Badge className={currency.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                {currency.status.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Exchange Rate Section */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Exchange Rate (USD)</span>
            <p className="text-xl font-semibold text-blue-700">{currency.exchangeRate}</p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Update Rate
          </Button>
        </div>
      </div>

      {/* Commission Settings */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Regular Commission</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Base Rate</span>
              <span className="font-medium">{currency.commissions.regular}%</span>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Emergency Commission</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Daytime</span>
              <span className="font-medium">{currency.commissions.emergency.daytime}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Nighttime</span>
              <span className="font-medium">{currency.commissions.emergency.nighttime}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Holiday</span>
              <span className="font-medium">{currency.commissions.emergency.holiday}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Fee Structure</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500">Transaction Fee</span>
            <p className="font-medium mt-1">{currency.fees.transaction}%</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500">Platform Fee</span>
            <p className="font-medium mt-1">{currency.fees.platformFee}%</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-500">Emergency Fee</span>
            <p className="font-medium mt-1">{currency.fees.emergencyFee}%</p>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Regions</h4>
        <div className="flex flex-wrap gap-2">
          {currency.regions.map((region) => (
            <Badge key={region} className="bg-purple-100 text-purple-700">
              {region}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t flex justify-end gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Format Settings
        </Button>
        <Button className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          View Details
        </Button>
      </div>
    </Card>
  );

  const EditCurrencyModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"   style={{ textAlign: 'left' }}>
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Edit Currency Settings</h2>
            <Button variant="ghost" size="sm" onClick={() => setShowEditModal(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Currency name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Code</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  placeholder="Currency code"
                />
              </div>
            </div>
          </div>

          {/* Commission Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Commission Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Regular Rate (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Rate (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Fee Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Fee Settings</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Transaction Fee (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Platform Fee (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Emergency Fee (%)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Regional Settings */}
          <div>
            <h3 className="text-lg font-medium mb-4">Regional Settings</h3>
            <div className="grid grid-cols-3 gap-2">
              {regions.map((region) => (
                <label key={region.id} className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">{region.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button>Save Changes</Button>
        </div>
      </Card>
    </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Currency Settings</h1>
                <p className="text-gray-600 mt-1">Manage currencies, exchange rates, and payment settings</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Currency
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Currencies</p>
                    <p className="text-2xl font-semibold mt-1">{currencies.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Regions</p>
                    <p className="text-2xl font-semibold mt-1">{regions.length}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Last Rate Update</p>
                    <p className="text-2xl font-semibold mt-1">2h ago</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Transactions</p>
                    <p className="text-2xl font-semibold mt-1">15.2k</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Regions</option>
                  {regions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Currency Cards */}
            <div className="grid grid-cols-1 gap-6">
              {currencies.map((currency) => (
                <CurrencyCard key={currency.id} currency={currency} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {showEditModal && <EditCurrencyModal />}
    </div>
  );
};

export default CurrencySettings;