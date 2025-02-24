import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical, Shield,
  Folder, FolderPlus, FileText, Plus, X, Edit, Trash2,
  Globe, Home, Building2, Tool, Settings, AlertCircle,
  Check, ArrowUpDown, Eye, InfoIcon, Languages, MapPin, Star
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const ServiceCategories = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for service categories
  const categories = [
    {
      id: 1,
      name: "Plumbing Services",
      type: "local",
      description: "Professional plumbing and pipe-related services",
      status: "active",
      totalProviders: 245,
      activeProviders: 180,
      subcategories: [
        "Emergency Plumbing",
        "Pipe Installation",
        "Drain Cleaning",
        "Water Heater Services"
      ],
      requirements: [
        "Plumbing License",
        "Insurance Coverage",
        "Background Check"
      ],
      verificationRequired: true,
      emergencyService: true,
      averageRating: 4.8,
      totalJobs: 1520,
      icon: "plumbing"
    },
    {
      id: 2,
      name: "Legal Consulting",
      type: "international",
      description: "International legal services and consultation",
      status: "active",
      totalProviders: 156,
      activeProviders: 120,
      subcategories: [
        "Corporate Law",
        "International Trade",
        "Contract Law",
        "Immigration Law"
      ],
      requirements: [
        "Bar License",
        "Professional Insurance",
        "International Practice Permit"
      ],
      verificationRequired: true,
      emergencyService: false,
      averageRating: 4.9,
      totalJobs: 890,
      icon: "legal"
    }
  ];

  // Category Modal Component (Add/Edit)
  const CategoryModal = ({ category = null, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
      category || {
        name: '',
        type: 'local',
        description: '',
        subcategories: [],
        requirements: [],
        verificationRequired: true,
        emergencyService: false
      }
    );

    const [newSubcategory, setNewSubcategory] = useState('');
    const [newRequirement, setNewRequirement] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      onClose();
    };

    const addSubcategory = () => {
      if (newSubcategory.trim()) {
        setFormData({
          ...formData,
          subcategories: [...formData.subcategories, newSubcategory.trim()]
        });
        setNewSubcategory('');
      }
    };

    const addRequirement = () => {
      if (newRequirement.trim()) {
        setFormData({
          ...formData,
          requirements: [...formData.requirements, newRequirement.trim()]
        });
        setNewRequirement('');
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
                {category ? 'Edit Category' : 'Add New Category'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                  className="mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="local">Local Service</option>
                  <option value="international">International Service</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description"
                  rows={3}
                  className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Subcategories */}
            <div className="space-y-4">
              <h3 className="font-medium">Subcategories</h3>
              <div className="flex gap-2">
                <Input
                  value={newSubcategory}
                  onChange={(e) => setNewSubcategory(e.target.value)}
                  placeholder="Add subcategory"
                />
                <Button 
                  type="button"
                  onClick={addSubcategory}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.subcategories.map((sub, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-700 flex items-center gap-1">
                    {sub}
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        subcategories: formData.subcategories.filter((_, i) => i !== index)
                      })}
                      className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="font-medium">Requirements</h3>
              <div className="flex gap-2">
                <Input
                  value={newRequirement}
                  onChange={(e) => setNewRequirement(e.target.value)}
                  placeholder="Add requirement"
                />
                <Button 
                  type="button"
                  onClick={addRequirement}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.requirements.map((req, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-700 flex items-center gap-1">
                    {req}
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        requirements: formData.requirements.filter((_, i) => i !== index)
                      })}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-4">
              <h3 className="font-medium">Settings</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.verificationRequired}
                    onChange={(e) => setFormData({ ...formData, verificationRequired: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Require Verification</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.emergencyService}
                    onChange={(e) => setFormData({ ...formData, emergencyService: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>Emergency Service Available</span>
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
                {category ? 'Save Changes' : 'Create Category'}
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    );
  };

  // Category Details Card Component
  const CategoryDetailsCard = ({ category }) => (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-6 space-y-4"  style={{ textAlign: 'left' }}>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              category.type === 'local' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              {category.type === 'local' ? (
                <Home className={`h-5 w-5 ${
                  category.type === 'local' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              ) : (
                <Globe className="h-5 w-5 text-purple-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <Badge className={`${
                category.type === 'local' 
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {category.type === 'local' ? 'Local Service' : 'International Service'}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEditModal(category)}
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

        {/* Description */}
        <p className="text-gray-600">{category.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Providers</div>
            <div className="mt-1 font-semibold">{category.totalProviders}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Active Providers</div>
            <div className="mt-1 font-semibold">{category.activeProviders}</div>
          </div>
        </div>

        {/* Subcategories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Subcategories</h4>
          <div className="flex flex-wrap gap-2">
            {category.subcategories.map((sub, index) => (
              <Badge key={index} variant="secondary">
                {sub}
              </Badge>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
          <div className="space-y-2">
            {category.requirements.map((req, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 text-green-500" />
                {req}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-gray-600">
              {category.averageRating} Rating
            </span>
          </div>
          <div className="flexitems-center gap-2">
            <FileText className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-600">
              {category.totalJobs} Total Jobs
            </span>
          </div>
          {category.verificationRequired && (
            <Badge variant="outline" className="border-green-200 text-green-700">
              Verification Required
            </Badge>
          )}
          {category.emergencyService && (
            <Badge variant="outline" className="border-red-200 text-red-700">
              Emergency Service
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
                <p className="text-gray-600 mt-1">Manage and organize service categories</p>
              </div>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="local">Local Services</option>
                  <option value="international">International Services</option>
                </select>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-5 w-5" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categories.map(category => (
                <CategoryDetailsCard key={category.id} category={category} />
              ))}
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
              <div className="text-center py-12">
                <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500 mb-4">Get started by creating a new service category.</p>
                <Button onClick={() => setShowAddModal(true)}>
                  Add Category
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showAddModal && (
          <CategoryModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
          />
        )}
        {showEditModal && (
          <CategoryModal
            category={showEditModal}
            isOpen={true}
            onClose={() => setShowEditModal(null)}
          />
        )}
      </AnimatePresence>

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default ServiceCategories;