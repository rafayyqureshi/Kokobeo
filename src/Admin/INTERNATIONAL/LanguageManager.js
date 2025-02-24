import React, { useState } from 'react';
import {
  Languages, Search, Filter, Plus, Edit, Trash2, Check,
  X, ChevronDown, Globe, Flag, Clock, Settings,
  FileText, ExternalLink, AlertCircle, Monitor,
  Upload, Download, BookOpen, FileCheck, MessageSquare, CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const LanguageManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample languages data remains the same as before
  const languages = [
    {
      id: 1,
      name: "English",
      code: "en",
      status: "active",
      isDefault: true,
      direction: "ltr",
      regions: ["North America", "Europe", "Asia Pacific"],
      translationProgress: 100,
      activeUsers: 125000,
      lastUpdated: "2024-02-10",
      contentTypes: [
        { type: "Interface", status: "complete", count: 2500 },
        { type: "Help Articles", status: "complete", count: 450 },
        { type: "Emails", status: "complete", count: 75 },
        { type: "Legal", status: "complete", count: 25 }
      ],
      serviceCategories: [
        {
          name: "Plumbing",
          progress: 100,
          terms: 150
        },
        {
          name: "Electrical",
          progress: 100,
          terms: 180
        }
      ],
      metrics: {
        dailyUsers: 12500,
        contentItems: 3050,
        missingTranslations: 0,
        lastSync: "2 hours ago"
      }
    },
    // Second language object remains the same
  ];

  const LanguageCard = ({ language }) => (
    <Card className="p-4 md:p-6" style={{ textAlign: 'left' }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
          <div className="p-2 rounded-lg bg-purple-100">
            <Languages className="h-6 w-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <h3 className="font-semibold text-lg">{language.name}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge className={
                  language.status === 'active' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }>
                  {language.status.toUpperCase()}
                </Badge>
                {language.isDefault && (
                  <Badge className="bg-blue-100 text-blue-700">Default</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {language.code.toUpperCase()}
              </div>
              <span className="hidden md:inline text-gray-400">|</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Last updated: {language.lastUpdated}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 self-end md:self-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLanguage(language)}
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

      {/* Translation Progress */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">Translation Progress</span>
          <span className="text-sm font-medium">{language.translationProgress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-600 rounded-full transition-all duration-300"
            style={{ width: `${language.translationProgress}%` }}
          />
        </div>
      </div>

      {/* Content Types */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Content Status</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {language.contentTypes.map((content, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-sm">{content.type}</span>
                <Badge className={
                  content.status === 'complete' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }>
                  {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">{content.count} items</p>
            </div>
          ))}
        </div>
      </div>

      {/* Service Categories */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Service Categories</h4>
        <div className="space-y-3">
          {language.serviceCategories.map((category, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <span className="font-medium">{category.name}</span>
                <Badge className="bg-blue-100 text-blue-700">
                  {category.terms} terms
                </Badge>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${category.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Regions */}
      <div className="mt-6">
        <h4 className="font-medium mb-3">Active Regions</h4>
        <div className="flex flex-wrap gap-2">
          {language.regions.map((region, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {region}
            </Badge>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <span className="text-sm text-gray-500">Daily Users</span>
            <p className="font-medium mt-1">{language.metrics.dailyUsers.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Content Items</span>
            <p className="font-medium mt-1">{language.metrics.contentItems.toLocaleString()}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Missing Translations</span>
            <p className="font-medium mt-1">{language.metrics.missingTranslations}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Last Sync</span>
            <p className="font-medium mt-1">{language.metrics.lastSync}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row justify-end gap-3">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          className="flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Upload className="h-4 w-4" />
          Import Translations
        </Button>
      </div>
    </Card>
  );

  const LanguageModal = ({ language = null, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('general');

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-4 md:p-6 border-b sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {language ? `Edit ${language.name}` : 'Add New Language'}
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
            <div className="flex overflow-x-auto hide-scrollbar space-x-4 border-b mb-6">
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
                onClick={() => setActiveTab('regions')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'regions'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Regions
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'content'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`pb-4 px-2 whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Language Name</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. English"
                        defaultValue={language?.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Language Code</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. en"
                        defaultValue={language?.code}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Direction</label>
                    <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                      <option value="ltr">Left to Right (LTR)</option>
                      <option value="rtl">Right to Left (RTL)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span>Set as default language</span>
                    </label>
                    <p className="text-sm text-gray-500 ml-6">
                      This will be the fallback language when a translation is not available
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'regions' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Active Regions
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {[
                        'North America',
                        'Europe',
                        'Asia Pacific',
                        'South America',
                        'Africa',
                        'Middle East'
                      ].map(region => (
                        <label key={region} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>{region}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Categories
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {[
                        'Plumbing',
                        'Electrical',
                        'HVAC',
                        'Cleaning',
                        'Moving',
                        'Renovation'
                      ].map(category => (
                        <label key={category} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span>{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Content Types</h3>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Interface Elements</h4>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Buttons & Labels</span>
                            <Badge className="bg-green-100 text-green-700">Complete</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Navigation</span>
                            <Badge className="bg-green-100 text-green-700">Complete</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Forms</span>
                            <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Documentation</h4>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Help Articles</span>
                            <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">FAQs</span>
                            <Badge className="bg-green-100 text-green-700">Complete</Badge>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">Legal Documents</h4>
                        <div className="space-y-2">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Terms & Conditions</span>
                            <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <span className="text-sm text-gray-600">Privacy Policy</span>
                            <Badge className="bg-yellow-100 text-yellow-700">In Progress</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Translation Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Translation Memory
                          </label>
                          <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                            <option value="enabled">Enabled</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Auto-Translation
                          </label>
                          <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                            <option value="enabled">Enabled</option>
                            <option value="disabled">Disabled</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>Enable machine translation suggestions</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>Automatically sync translations</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>Notify translators of new content</span>
                          </label>
                        </div>
                      </div>
                    </div>
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
                <h1 className="text-2xl font-bold text-gray-900">Language Manager</h1>
                <p className="text-gray-600 mt-1">Manage platform languages and translations</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Add Language
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Languages</p>
                    <p className="text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Languages className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Regions</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Globe className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Content Items</p>
                    <p className="text-2xl font-semibold mt-1">3,050</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 md:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-semibold mt-1">96%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-yellow-600" />
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
                      placeholder="Search languages..."
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
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg w-full sm:w-auto"
                >
                  <option value="all">All Categories</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">All Regions</option>
                      <option value="na">North America</option>
                      <option value="eu">Europe</option>
                      <option value="asia">Asia Pacific</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="">All Progress</option>
                      <option value="complete">Complete</option>
                      <option value="in-progress">In Progress</option>
                      <option value="not-started">Not Started</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option value="updated">Last Updated</option>
                      <option value="progress">Progress</option>
                      <option value="users">Active Users</option>
                    </select>
                  </div>
                </div>
              )}
            </Card>

            {/* Languages List */}
            <div className="grid grid-cols-1 gap-6">
              {languages.map(language => (
                <LanguageCard key={language.id} language={language} />
              ))}
            </div>

            {/* Add/Edit Modal */}
            {(showAddModal || selectedLanguage) && (
              <LanguageModal
                language={selectedLanguage}
                isOpen={true}
                onClose={() => {
                  setShowAddModal(false);
                  setSelectedLanguage(null);
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LanguageManager;