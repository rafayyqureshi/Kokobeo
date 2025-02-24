import React, { useState } from 'react';
import {
  Globe, Search, Filter, Plus, Edit, Trash2, Check,
  X, ChevronDown, MapPin, Languages, Clock, Settings,
  Building2, FileText, Flag, CreditCard, ArrowRight,
  ArrowUpRight, Money, ArrowDown, DollarSign, Briefcase,
  Phone, AlertCircle, Mail, Calendar, Store
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const RegionSettings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample regions data with expanded settings
  const regions = [
    {
      id: 1,
      name: "Canada",
      code: "CA",
      status: "active",
      defaultLanguage: "English",
      supportedLanguages: ["English", "French"],
      defaultCurrency: "CAD",
      supportedCurrencies: ["CAD", "USD"],
      provinces: [
        {
          name: "Ontario",
          cities: ["Toronto", "Ottawa", "Mississauga"],
          serviceAreas: ["GTA", "Ottawa Region"],
          defaultTimezone: "EST"
        },
        {
          name: "Quebec",
          cities: ["Montreal", "Quebec City", "Laval"],
          serviceAreas: ["Greater Montreal", "Quebec Region"],
          defaultTimezone: "EST"
        }
      ],
      serviceCategories: [
        {
          name: "Plumbing",
          subCategories: ["Emergency", "Installation", "Repair"],
          pricing: {
            quoteCredit: {
              amount: 4,
              currency: "CAD"
            },
            commissionRates: {
              regular: 10,
              emergency: {
                day: 25,
                night: 35,
                weekend: 30,
                holiday: 40
              }
            }
          }
        },
        {
          name: "Electrical",
          subCategories: ["Emergency", "Installation", "Maintenance"],
          pricing: {
            quoteCredit: {
              amount: 5,
              currency: "CAD"
            },
            commissionRates: {
              regular: 12,
              emergency: {
                day: 28,
                night: 38,
                weekend: 33,
                holiday: 43
              }
            }
          }
        }
      ],
      businessHours: {
        weekday: {
          start: "09:00",
          end: "18:00"
        },
        weekend: {
          start: "10:00",
          end: "16:00"
        }
      },
      emergencyHours: "24/7",
      taxes: {
        GST: 5,
        PST: {
          "Ontario": 13,
          "Quebec": 14.975
        }
      },
      supportContact: {
        email: "support@kokobeo.ca",
        phone: "+1-800-123-4567",
        hours: "9 AM - 5 PM EST"
      },
      metrics: {
        activeBusinesses: 1250,
        monthlyTransactions: 8500,
        averageOrderValue: 180
      }
    },
    {
      id: 2,
      name: "United States",
      code: "US",
      status: "planned",
      defaultLanguage: "English",
      supportedLanguages: ["English", "Spanish"],
      defaultCurrency: "USD",
      supportedCurrencies: ["USD"],
      provinces: [
        {
          name: "New York",
          cities: ["New York City", "Buffalo", "Albany"],
          serviceAreas: ["NYC Metro", "Upstate"],
          defaultTimezone: "EST"
        }
      ],
      serviceCategories: [
        {
          name: "Plumbing",
          subCategories: ["Emergency", "Installation", "Repair"],
          pricing: {
            quoteCredit: {
              amount: 5,
              currency: "USD"
            },
            commissionRates: {
              regular: 10,
              emergency: {
                day: 25,
                night: 35,
                weekend: 30,
                holiday: 40
              }
            }
          }
        }
      ],
      businessHours: {
        weekday: {
          start: "09:00",
          end: "18:00"
        },
        weekend: {
          start: "10:00",
          end: "16:00"
        }
      },
      emergencyHours: "24/7",
      taxes: {
        state: {
          "New York": 8.875
        }
      },
      supportContact: {
        email: "support@kokobeo.com",
        phone: "+1-888-123-4567",
        hours: "9 AM - 5 PM EST"
      },
      metrics: {
        activeBusinesses: 0,
        monthlyTransactions: 0,
        averageOrderValue: 0
      }
    }
  ];

  const RegionCard = ({ region }) => (
    <Card className="p-4 md:p-6" style={{ textAlign: 'left' }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="p-2 rounded-lg bg-blue-100">
            <Globe className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <h3 className="font-semibold text-lg">{region.name}</h3>
              <Badge className={
                region.status === 'active' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }>
                {region.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Flag className="h-4 w-4" />
                {region.code}
              </div>
              <span className="hidden md:inline text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <Languages className="h-4 w-4" />
                {region.defaultLanguage}
              </div>
              <span className="hidden md:inline text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {region.defaultCurrency}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-start">
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

      {/* Provinces & Service Areas */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Provinces & Areas</h4>
          <div className="space-y-3">
            {region.provinces.map((province, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <span className="font-medium">{province.name}</span>
                  <Badge variant="outline">{province.defaultTimezone}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {province.serviceAreas.map((area, areaIndex) => (
                    <Badge key={areaIndex} className="bg-blue-50">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Languages & Currencies</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium mb-2">Supported Languages</div>
              <div className="flex flex-wrap gap-2">
                {region.supportedLanguages.map((lang, index) => (
                  <Badge key={index} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="font-medium mb-2">Supported Currencies</div>
              <div className="flex flex-wrap gap-2">
                {region.supportedCurrencies.map((currency, index) => (
                  <Badge key={index} variant="outline">
                    {currency}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Service Categories & Pricing</h4>
        <div className="space-y-4">
          {region.serviceCategories.map((category, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                <span className="font-medium">{category.name}</span>
                <Badge className="bg-purple-100 text-purple-700">
                  {category.pricing.quoteCredit.amount} {category.pricing.quoteCredit.currency}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Sub-Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {category.subCategories.map((sub, subIndex) => (
                      <Badge key={subIndex} variant="outline">
                        {sub}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-2">Commission Rates</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Regular</span>
                      <span>{category.pricing.commissionRates.regular}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Emergency (Day)</span>
                      <span>{category.pricing.commissionRates.emergency.day}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Emergency (Night)</span>
                      <span>{category.pricing.commissionRates.emergency.night}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Hours & Support */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Operating Hours</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">Weekdays</span>
                <Badge variant="outline">
                  {region.businessHours.weekday.start} - {region.businessHours.weekday.end}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm text-gray-600">Weekends</span>
                <Badge variant="outline">
                  {region.businessHours.weekend.start} - {region.businessHours.weekend.end}
                </Badge>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm text-gray-600">Emergency Hours</span>
                <Badge className="bg-red-100 text-red-700">
                  {region.emergencyHours}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Support Contact</h4>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {region.supportContact.phone}
                </div>
                <div className="flex items-center gap-2 text-sm break-all">
                  <Mail className="h-4 w-4 text-gray-400" />
                  {region.supportContact.email}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {region.supportContact.hours}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <span className="text-sm text-gray-500">Active Businesses</span>
            <p className="font-medium mt-1">{region.metrics.activeBusinesses.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Monthly Transactions</span>
            <p className="font-medium mt-1">{region.metrics.monthlyTransactions.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Avg. Order Value</span>
            <p className="font-medium mt-1">${region.metrics.averageOrderValue.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );

  const RegionModal = ({ region = null, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('general');
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 md:p-6 border-b sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {region ? `Edit ${region.name}` : 'Add New Region'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4 md:p-6">
            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-6 border-b hide-scrollbar">
              <button
                onClick={() => setActiveTab('general')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'general'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                General
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Pricing
              </button>
              <button
                onClick={() => setActiveTab('areas')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'areas'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Areas
              </button>
              <button
                onClick={() => setActiveTab('hours')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'hours'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Hours
              </button>
              <button
                onClick={() => setActiveTab('support')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'support'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Support
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Region Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. Canada"
                        defaultValue={region?.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Region Code</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. CA"
                        defaultValue={region?.code}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Default Language</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Default Currency</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="CAD">Canadian Dollar (CAD)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Supported Languages
                    </label>
                    <div className="space-y-2">
                      {['English', 'French', 'Spanish'].map(lang => (
                        <label key={lang} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>{lang}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Quote Credits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Amount</label>
                        <input
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Currency</label>
                        <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                          <option value="CAD">CAD</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Commission Rates</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Regular Service</label>
                          <input
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter percentage"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Emergency Service (Day)</label>
                          <input
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter percentage"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Emergency Service (Night)</label>
                          <input
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter percentage"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Emergency Service (Weekend)</label>
                          <input
                            type="number"
                            className="mt-1 block w-full px-3 py-2 border rounded-lg"
                            placeholder="Enter percentage"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Emergency Service (Holiday)</label>
                        <input
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="Enter percentage"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'areas' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <h3 className="text-lg font-medium">Provinces & Areas</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Province
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {region?.provinces.map((province, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                            <input
                              type="text"
                              className="flex-1 px-3 py-2 border rounded-lg"
                              placeholder="Province name"
                              defaultValue={province.name}
                            />
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Cities</label>
                              <textarea
                                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                                rows={3}
                                placeholder="Enter cities (one per line)"
                                defaultValue={province.cities.join('\n')}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Service Areas</label>
                              <textarea
                                className="mt-1 block w-full px-3 py-2 border rounded-lg"
                                rows={3}
                                placeholder="Enter service areas (one per line)"
                                defaultValue={province.serviceAreas.join('\n')}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hours' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Hours</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Weekday Start</label>
                        <input
                          type="time"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={region?.businessHours.weekday.start}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Weekday End</label>
                        <input
                          type="time"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={region?.businessHours.weekday.end}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Weekend Start</label>
                        <input
                          type="time"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={region?.businessHours.weekend.start}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Weekend End</label>
                        <input
                          type="time"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={region?.businessHours.weekend.end}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Emergency Hours</h3>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="emergency-hours"
                          value="24/7"
                          defaultChecked={region?.emergencyHours === "24/7"}
                        />
                        <span>24/7</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="emergency-hours"
                          value="custom"
                          defaultChecked={region?.emergencyHours !== "24/7"}
                        />
                        <span>Custom Hours</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Support Email</label>
                      <input
                        type="email"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter support email"
                        defaultValue={region?.supportContact.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Support Phone</label>
                      <input
                        type="tel"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="Enter support phone"
                        defaultValue={region?.supportContact.phone}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Support Hours</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      placeholder="e.g. 9 AM - 5 PM EST"
                      defaultValue={region?.supportContact.hours}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">Cancel</Button>
              <Button className="w-full sm:w-auto">Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Region Settings</h1>
                <p className="text-gray-600 mt-1">Manage region-specific settings and configurations</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Add Region
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 md:p-6">
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

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Countries</p>
                    <p className="text-2xl font-semibold mt-1">45</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Flag className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Services</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Currencies</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                  <div className="relative flex-1">
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
                    className="flex items-center justify-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                  <option value="businesses">Most Businesses</option>
                </select>
              </div>
              
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">All Statuses</option>
                      <option value="active">Active</option>
                      <option value="planned">Planned</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">All Currencies</option>
                      <option value="CAD">CAD</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">All Languages</option>
                      <option value="en">English</option>
                      <option value="fr">French</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                </div>
              )}
            </Card>

            {/* Regions List */}
            <div className="grid grid-cols-1 gap-6">
              {regions.map(region => (
                <RegionCard key={region.id} region={region} />
              ))}
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || showEditModal) && (
              <RegionModal
                region={showEditModal}
                isOpen={true}
                onClose={() => {
                  setShowAddModal(false);
                  setShowEditModal(null);
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegionSettings;