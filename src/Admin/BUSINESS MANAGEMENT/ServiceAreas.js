import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  MapPin, Globe, Building2, Tool, Settings, Check,
  Plus, X, Edit, Trash2, Eye, User, FileText,
  Users, ArrowUpDown, UserCheck, Home, Info,
  Map, PinIcon, Navigation, ArrowUpRight, BadgeCheck,
  GridIcon, Layers, GlobeIcon, Clock, CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const ServiceAreas = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAreaDetails, setShowAreaDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for service areas
  const serviceAreas = [
    {
      id: 1,
      name: "Greater Toronto Area",
      type: "metropolitan",
      country: "Canada",
      province: "Ontario",
      coverage: {
        cities: ["Toronto", "Mississauga", "Brampton", "Vaughan", "Markham"],
        postalCodes: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"],
        radius: "50km"
      },
      status: "active",
      totalProviders: 245,
      activeProviders: 180,
      serviceTypes: [
        "Plumbing",
        "Electrical",
        "HVAC",
        "Cleaning",
        "Moving"
      ],
      emergencyServices: true,
      restrictions: [],
      metrics: {
        monthlyRequests: 1250,
        avgResponseTime: "15 minutes",
        satisfaction: 4.8,
        coverage: "92%"
      }
    },
    {
      id: 2,
      name: "Vancouver Metropolitan Area",
      type: "metropolitan",
      country: "Canada",
      province: "British Columbia",
      coverage: {
        cities: ["Vancouver", "Burnaby", "Richmond", "Surrey", "North Vancouver"],
        postalCodes: ["V5", "V6", "V7"],
        radius: "40km"
      },
      status: "active",
      totalProviders: 156,
      activeProviders: 120,
      serviceTypes: [
        "Plumbing",
        "Electrical",
        "Landscaping",
        "Home Repair"
      ],
      emergencyServices: true,
      restrictions: [],
      metrics: {
        monthlyRequests: 980,
        avgResponseTime: "18 minutes",
        satisfaction: 4.7,
        coverage: "88%"
      }
    }
  ];

  // Service Area Modal Component (Add/Edit)
  const ServiceAreaModal = ({ area = null, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
      area || {
        name: '',
        type: 'metropolitan',
        country: 'Canada',
        province: '',
        coverage: {
          cities: [],
          postalCodes: [],
          radius: ''
        },
        serviceTypes: [],
        emergencyServices: true,
        restrictions: []
      }
    );

    const [newCity, setNewCity] = useState('');
    const [newPostalCode, setNewPostalCode] = useState('');
    const [newServiceType, setNewServiceType] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      onClose();
    };

    const addCity = () => {
      if (newCity.trim()) {
        setFormData({
          ...formData,
          coverage: {
            ...formData.coverage,
            cities: [...formData.coverage.cities, newCity.trim()]
          }
        });
        setNewCity('');
      }
    };

    const addPostalCode = () => {
      if (newPostalCode.trim()) {
        setFormData({
          ...formData,
          coverage: {
            ...formData.coverage,
            postalCodes: [...formData.coverage.postalCodes, newPostalCode.trim()]
          }
        });
        setNewPostalCode('');
      }
    };

    const addServiceType = () => {
      if (newServiceType.trim()) {
        setFormData({
          ...formData,
          serviceTypes: [...formData.serviceTypes, newServiceType.trim()]
        });
        setNewServiceType('');
      }
    };

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
                {area ? 'Edit Service Area' : 'Add New Service Area'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6" style={{ textAlign: 'left' }}>
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Area Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter area name"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="metropolitan">Metropolitan Area</option>
                    <option value="city">City</option>
                    <option value="region">Region</option>
                    <option value="province">Province</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Province</label>
                <select
                  value={formData.province}
                  onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Province</option>
                  <option value="Ontario">Ontario</option>
                  <option value="British Columbia">British Columbia</option>
                  <option value="Quebec">Quebec</option>
                  <option value="Alberta">Alberta</option>
                </select>
              </div>
            </div>

            {/* Coverage */}
            <div className="space-y-4">
              <h3 className="font-medium">Coverage Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Coverage Radius</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    type="number"
                    value={formData.coverage.radius}
                    onChange={(e) => setFormData({
                      ...formData,
                      coverage: { ...formData.coverage, radius: e.target.value }
                    })}
                    placeholder="Enter radius"
                  />
                  <span className="px-3 py-2 bg-gray-100 rounded-lg">km</span>
                </div>
              </div>

              {/* Cities */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Cities</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Add city"
                  />
                  <Button 
                    type="button"
                    onClick={addCity}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.coverage.cities.map((city, index) => (
                    <Badge 
                      key={index}
                      className="bg-blue-100 text-blue-700 flex items-center gap-1"
                    >
                      {city}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          coverage: {
                            ...formData.coverage,
                            cities: formData.coverage.cities.filter((_, i) => i !== index)
                          }
                        })}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Postal Codes */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Codes</label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={newPostalCode}
                    onChange={(e) => setNewPostalCode(e.target.value)}
                    placeholder="Add postal code"
                  />
                  <Button 
                    type="button"
                    onClick={addPostalCode}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.coverage.postalCodes.map((code, index) => (
                    <Badge 
                      key={index}
                      className="bg-purple-100 text-purple-700 flex items-center gap-1"
                    >
                      {code}
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          coverage: {
                            ...formData.coverage,
                            postalCodes: formData.coverage.postalCodes.filter((_, i) => i !== index)
                          }
                        })}
                        className="ml-1 hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Types */}
            <div className="space-y-4">
              <h3 className="font-medium">Available Services</h3>
              <div className="flex gap-2">
                <Input
                  value={newServiceType}
                  onChange={(e) => setNewServiceType(e.target.value)}
                  placeholder="Add service type"
                />
                <Button 
                  type="button"
                  onClick={addServiceType}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.serviceTypes.map((service, index) => (
                  <Badge 
                    key={index}
                    className="bg-green-100 text-green-700 flex items-center gap-1"
                  >
                    {service}
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        serviceTypes: formData.serviceTypes.filter((_, i) => i !== index)
                      })}
                      className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Area Settings</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.emergencyServices}
                    onChange={(e) => setFormData({ ...formData, emergencyServices: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Enable Emergency Services</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit">
                {area ? 'Save Changes' : 'Create Area'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  // Service Area Card Component
  const ServiceAreaCard = ({ area }) => (<Card className="hover:shadow-md transition-shadow">
    <div className="p-6 space-y-4"  style={{ textAlign: 'left' }}>
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {area.type.charAt(0).toUpperCase() + area.type.slice(1)}
            </Badge>
            <Badge className={area.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
              {area.status.toUpperCase()}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold mt-2">{area.name}</h3>
          <p className="text-sm text-gray-500">{area.province}, {area.country}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAreaDetails(area)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Coverage Info */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Coverage Area</h4>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span>Radius: {area.coverage.radius}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {area.coverage.cities.slice(0, 3).map((city, index) => (
            <Badge key={index} variant="outline">
              {city}
            </Badge>
          ))}
          {area.coverage.cities.length > 3 && (
            <Badge variant="outline">
              +{area.coverage.cities.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Service Types */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Available Services</h4>
        <div className="flex flex-wrap gap-2">
          {area.serviceTypes.map((service, index) => (
            <Badge key={index} className="bg-green-100 text-green-700">
              {service}
            </Badge>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500">Total Providers</div>
          <div className="mt-1 font-semibold">{area.totalProviders}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-sm text-gray-500">Active Providers</div>
          <div className="mt-1 font-semibold">{area.activeProviders}</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="pt-4 border-t">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {area.metrics.avgResponseTime} response
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {area.metrics.coverage} coverage
            </span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

return (
  <div className="min-h-screen bg-gray-50 flex flex-col" style={{ textAlign: 'left' }}>
    <AdminHeader />
    
    <main className="flex-1 lg:pl-64 pt-16"  style={{ textAlign: 'left' }}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Areas</h1>
              <p className="text-gray-600 mt-1">Manage and monitor service coverage areas</p>
            </div>
            <Button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Area
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Areas</p>
                  <p className="text-2xl font-semibold">8</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Map className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Active Areas</p>
                  <p className="text-2xl font-semibold">6</p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Total Coverage</p>
                  <p className="text-2xl font-semibold">85%</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Active Providers</p>
                  <p className="text-2xl font-semibold">450</p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-600" />
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
                    placeholder="Search areas..."
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
              
              <div className="flex items-center gap-4">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="metropolitan">Metropolitan</option>
                  <option value="city">City</option>
                  <option value="region">Region</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="name">Sort by Name</option>
                  <option value="providers">Most Providers</option>
                  <option value="coverage">Highest Coverage</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Service Areas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {serviceAreas.map(area => (
              <ServiceAreaCard key={area.id} area={area} />
            ))}
          </div>
        </div>
      </div>
    </main>

    {/* Modal */}
    <ServiceAreaModal
      area={showAreaDetails}
      isOpen={!!showAreaDetails || showAddModal}
      onClose={() => {
        setShowAreaDetails(null);
        setShowAddModal(false);
      }}
    />

    {/* <SharedFooter2 /> */}
  </div>
);
};

export default ServiceAreas;