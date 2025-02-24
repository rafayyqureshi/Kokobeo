import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical,
  HelpCircle, Edit, Trash2, Eye, X, 
  Plus, PlusCircle, Settings, Layout,
  ThumbsUp, Globe, FolderPlus, MessageSquare,
  AlertCircle, Check, FileText, Users, ArrowUpRight
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const HelpCenter = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFaqDetails, setShowFaqDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock data for help categories
  const categories = [
    {
      id: 1,
      name: 'Getting Started',
      icon: HelpCircle,
      faqs: 8,
      lastUpdated: '2024-02-07'
    },
    {
      id: 2,
      name: 'Account & Profile',
      icon: Users,
      faqs: 12,
      lastUpdated: '2024-02-06'
    },
    {
      id: 3,
      name: 'Payments & Billing',
      icon: FileText,
      faqs: 10,
      lastUpdated: '2024-02-05'
    },
    {
      id: 4,
      name: 'Services & Booking',
      icon: MessageSquare,
      faqs: 15,
      lastUpdated: '2024-02-04'
    }
  ];

  // Mock FAQs data
  const faqs = [
    {
      id: 1,
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking the "Forgot Password" link on the login page. Follow the instructions sent to your email to create a new password.',
      category: 'Account & Profile',
      lastUpdated: '2024-02-07',
      languages: ['English', 'Spanish'],
      helpful: 156,
      views: 789
    },
    {
      id: 2,
      question: 'How do I book a service?',
      answer: '1. Search for your desired service\n2. Select a service provider\n3. Choose your preferred date and time\n4. Confirm your booking\n5. Make payment\n\nYou\'ll receive a confirmation email with the booking details.',
      category: 'Services & Booking',
      lastUpdated: '2024-02-06',
      languages: ['English', 'French'],
      helpful: 234,
      views: 1023
    }
  ];

  // Add/Edit FAQ Modal Component
  const FaqModal = ({ faq = null, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
      faq || {
        question: '',
        answer: '',
        category: '',
        languages: ['English']
      }
    );

    if (!isOpen) return null;

    return (
      <AnimatePresence>
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
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {faq ? 'Edit FAQ' : 'Add New FAQ'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6"  style={{ textAlign: 'left' }}>
              {/* Question & Answer */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Question</label>
                  <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    placeholder="Enter FAQ question"
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Answer</label>
                  <textarea
                    value={formData.answer}
                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                    placeholder="Enter FAQ answer"
                    rows={6}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              {/* Category & Languages */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Languages</label>
                  <div className="mt-2 space-y-2">
                    {['English', 'Spanish', 'French'].map(lang => (
                      <label key={lang} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.languages.includes(lang)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({
                                ...formData,
                                languages: [...formData.languages, lang]
                              });
                            } else {
                              setFormData({
                                ...formData,
                                languages: formData.languages.filter(l => l !== lang)
                              });
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span>{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button>
                  {faq ? 'Save Changes' : 'Add FAQ'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // FAQ Card Component
  const FaqCard = ({ faq }) => (
    <Card className="hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline">{faq.category}</Badge>
            <h3 className="font-medium mt-2">{faq.question}</h3>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddModal(true)}
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

        {/* Answer */}
        <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{faq.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-4 w-4" />
            <span>{faq.helpful}</span>
          </div>
        </div>

        {/* Languages */}
        <div className="pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {faq.languages.map((lang, index) => (
              <Badge key={index} variant="secondary">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
                <p className="text-gray-600 mt-1">Manage FAQs and support information</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setShowAddModal(true)}
                >
                  <Plus className="h-4 w-4" />
                  Add FAQ
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FolderPlus className="h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total FAQs</p>
                    <p className="text-2xl font-semibold">{faqs.length}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Categories</p>
                    <p className="text-2xl font-semibold">{categories.length}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Layout className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-2xl font-semibold">2.5k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Helpful Rate</p>
                    <p className="text-2xl font-semibold">92%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ThumbsUp className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search and Filters */}
            <Card className="p-4">
  <div className="flex flex-col lg:flex-row justify-between gap-4">
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative flex-1 w-full sm:min-w-[300px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
        />
      </div>
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 w-full sm:w-auto"
      >
        <Filter className="h-5 w-5" />
        Filters
      </Button>
    </div>
    
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Languages</option>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="views">Most Viewed</option>
        <option value="helpful">Most Helpful</option>
      </select>
    </div>
  </div>
</Card>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(category => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <div className="p-6 flex flex-col h-full">
                    <div className="p-2 bg-blue-50 rounded-lg w-fit">
                      <category.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="font-medium mt-4">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{category.faqs} FAQs</p>
                    <p className="text-xs text-gray-400 mt-auto pt-4">
                      Updated {new Date(category.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* FAQs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {currentFaqs.map(faq => (
                <FaqCard key={faq.id} faq={faq} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, faqs.length)} of {faqs.length} FAQs
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={indexOfLastItem >= faqs.length}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit FAQ Modal */}
      <FaqModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/* <SharedFooter2 /> */}
    </div>
  );
};
export default HelpCenter;