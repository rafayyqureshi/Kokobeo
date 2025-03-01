import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical,
  HelpCircle, Edit, Trash2, Eye, X, 
  Plus, PlusCircle, Settings, Layout,
  ThumbsUp, Globe, FolderPlus, MessageSquare,
  AlertCircle, Check, FileText, Users, ArrowUpRight,
  Bell, Camera, Ban, ExternalLink, Lock, Unlock,
  Facebook, Twitter, Instagram, Youtube
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

// Note: lucide-react does not have a TikTok icon by default.
// We'll use a placeholder (Globe) and note this for potential custom implementation.
const Tiktok = Globe; // Placeholder; replace with custom TikTok icon if available.

const HelpCenter = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFaqDetails, setShowFaqDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('faqs');
  const itemsPerPage = 5;
  
  // Social Media URLs state (Updated: Removed LinkedIn, Added TikTok)
  const [socialMediaUrls, setSocialMediaUrls] = useState({
    facebook: "https://facebook.com/kokobeo",
    twitter: "https://twitter.com/kokobeo",
    instagram: "https://instagram.com/kokobeo",
    tiktok: "https://tiktok.com/@kokobeo", // Added TikTok
    youtube: "https://youtube.com/c/kokobeo"
  });

  // Mock users for notifications and permissions
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      type: "professional",
      category: "Plumber",
      status: "active",
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      type: "professional",
      category: "Electrician",
      status: "active",
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael@example.com",
      type: "customer",
      status: "active",
      permissions: {
        camera: true,
        notifications: true
      }
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      type: "customer",
      status: "active",
      permissions: {
        camera: false,
        notifications: false
      }
    }
  ];

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

            <div className="p-6 space-y-6" style={{ textAlign: 'left' }}>
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

  // Social Media URLs Modal (Updated: Replaced LinkedIn with TikTok)
  const SocialMediaModal = ({ isOpen, onClose }) => {
    const [urls, setUrls] = useState({...socialMediaUrls});

    if (!isOpen) return null;

    const handleSave = () => {
      setSocialMediaUrls(urls);
      onClose();
    };

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
                <h2 className="text-xl font-semibold">Edit Social Media URLs</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4" style={{ textAlign: 'left' }}>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Facebook className="h-5 w-5 mr-2 text-blue-600" />
                  Facebook URL
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg" 
                  value={urls.facebook}
                  onChange={(e) => setUrls({...urls, facebook: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Twitter className="h-5 w-5 mr-2 text-blue-400" />
                  Twitter URL
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg" 
                  value={urls.twitter}
                  onChange={(e) => setUrls({...urls, twitter: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Instagram className="h-5 w-5 mr-2 text-pink-600" />
                  Instagram URL
                </label>
                <input 
                 type="text" 
                  className="w-full px-3 py-2 border rounded-lg" 
                  value={urls.instagram}
                  onChange={(e) => setUrls({...urls, instagram: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Tiktok className="h-5 w-5 mr-2 text-black" /> {/* Using placeholder Globe icon */}
                  TikTok URL
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg" 
                  value={urls.tiktok}
                  onChange={(e) => setUrls({...urls, tiktok: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                  <Youtube className="h-5 w-5 mr-2 text-red-600" />
                  YouTube URL
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-lg" 
                  value={urls.youtube}
                  onChange={(e) => setUrls({...urls, youtube: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 mt-4 border-t">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Notification Modal
  const NotificationModal = ({ isOpen, onClose, user }) => {
    const [notificationType, setNotificationType] = useState('banner');
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationPriority, setNotificationPriority] = useState('normal');
    const [notificationAction, setNotificationAction] = useState('');
    const [notificationExpiry, setNotificationExpiry] = useState('');

    if (!isOpen || !user) return null;

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
                <h2 className="text-xl font-semibold">Send Notification to {user.name}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4" style={{ textAlign: 'left' }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg"
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                >
                  <option value="banner">Banner</option>
                  <option value="popup">Popup</option>
                  <option value="message">In-app Message</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter notification title"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={4}
                  placeholder="Enter notification message"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  className="w-full px-3 py-2 border rounded-lg"
                  value={notificationPriority}
                  onChange={(e) => setNotificationPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter URL for notification action"
                  value={notificationAction}
                  onChange={(e) => setNotificationAction(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry (Optional)</label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={notificationExpiry}
                  onChange={(e) => setNotificationExpiry(e.target.value)}
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>
                  Send Notification
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Permission Modal
  const PermissionModal = ({ isOpen, onClose, user }) => {
    const [cameraAccess, setCameraAccess] = useState(user?.permissions.camera || false);
    const [notificationAccess, setNotificationAccess] = useState(user?.permissions.notifications || false);
    
    if (!isOpen || !user) return null;

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
                <h2 className="text-xl font-semibold">Manage Permissions for {user.name}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4" style={{ textAlign: 'left' }}>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-700">
                    Changing permissions will affect this user's ability to interact with certain features of the platform.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-gray-700" />
                    <div>
                      <p className="font-medium">Camera Access</p>
                      <p className="text-sm text-gray-500">Allow the user to use video call features</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={cameraAccess}
                      onChange={() => setCameraAccess(!cameraAccess)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-gray-700" />
                    <div>
                      <p className="font-medium">Notification Access</p>
                      <p className="text-sm text-gray-500">Allow the user to receive notifications</p>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      checked={notificationAccess}
                      onChange={() => setNotificationAccess(!notificationAccess)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button>
                  Save Changes
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
    <Card className="hover:shadow-md transition-shadow" style={{ textAlign: 'left' }}>
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

  // User Card Component
  const UserCard = ({ user }) => (
    <Card className="hover:shadow-md transition-shadow" style={{ textAlign: 'left' }}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{user.name}</h3>
              <Badge className={user.type === 'professional' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mt-1">{user.email}</p>
            {user.category && <p className="text-sm text-gray-600">{user.category}</p>}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedUser(user);
                setShowNotificationModal(true);
              }}
            >
              <Bell className="h-4 w-4" />
              Notify
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedUser(user);
                setShowPermissionModal(true);
              }}
            >
              <Settings className="h-4 w-4" />
              Permissions
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Camera Access</span>
              </div>
              <Badge className={user.permissions.camera ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {user.permissions.camera ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Notifications</span>
              </div>
              <Badge className={user.permissions.notifications ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                {user.permissions.notifications ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = faqs.slice(indexOfFirstItem, indexOfLastItem);

  // Social Media Section (Updated: Replaced LinkedIn with TikTok)
  const SocialMediaSection = () => (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-lg font-medium">Social Media Settings</h3>
        <Button 
          variant="outline"
          onClick={() => setShowSocialModal(true)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit URLs
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Facebook className="h-5 w-5 text-blue-600" />
          <div className="flex-grow">
            <div className="font-medium">Facebook</div>
            <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">
              <a 
                href={socialMediaUrls.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />{socialMediaUrls.facebook}
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Twitter className="h-5 w-5 text-blue-400" />
          <div className="flex-grow">
            <div className="font-medium">Twitter</div>
            <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">
              <a 
                href={socialMediaUrls.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />{socialMediaUrls.twitter}
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Instagram className="h-5 w-5 text-pink-600" />
          <div className="flex-grow">
            <div className="font-medium">Instagram</div>
            <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">
              <a 
                href={socialMediaUrls.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />{socialMediaUrls.instagram}
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Tiktok className="h-5 w-5 text-black" /> {/* Placeholder icon */}
          <div className="flex-grow">
            <div className="font-medium">TikTok</div>
            <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">
              <a 
                href={socialMediaUrls.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />{socialMediaUrls.tiktok}
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Youtube className="h-5 w-5 text-red-600" />
          <div className="flex-grow">
            <div className="font-medium">YouTube</div>
            <div className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis">
              <a 
                href={socialMediaUrls.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 flex items-center gap-1"
              >
                <ExternalLink className="h-3 w-3" />{socialMediaUrls.youtube}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t">
        <p className="text-sm text-gray-500">
          These URLs are displayed on the customer and professional dashboards, and in the Kokobeo menu.
          Changes will be reflected immediately across all platforms.
        </p>
      </div>
    </Card>
  );

  // User Management Section
  const UserManagementSection = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h3 className="text-lg font-medium">User Permissions</h3>
        <div className="mt-2 sm:mt-0">
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => {
              setSelectedUser(users[0]);
              setShowNotificationModal(true);
            }}
          >
            <Bell className="h-4 w-4" />
            Send Notification
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );

  // Main render section
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
                <p className="text-gray-600 mt-1">Manage FAQs, social media, and user permissions</p>
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

            {/* Content Tabs */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="flex overflow-x-auto">
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'faqs' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveTab('faqs')}
                >
                  FAQs
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'social' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveTab('social')}
                >
                  Social Media
                </button>
                <button 
                  className={`px-4 py-3 font-medium text-sm ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  onClick={() => setActiveTab('users')}
                >
                  User Permissions
                </button>
              </div>
            </div>

            {/* Search and Filters - Only show for FAQs */}
            {activeTab === 'faqs' && (
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
            )}

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === 'faqs' && (
                <>
                  {/* Categories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                  <div className="flex justify-between items-center mt-6">
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
                </>
              )}

              {activeTab === 'social' && <SocialMediaSection />}
              
              {activeTab === 'users' && <UserManagementSection />}
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit FAQ Modal */}
      <FaqModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      {/* Social Media Modal */}
      <SocialMediaModal
        isOpen={showSocialModal}
        onClose={() => setShowSocialModal(false)}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
        user={selectedUser}
      />

      {/* Permission Modal */}
      <PermissionModal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        user={selectedUser}
      />

      <SharedFooter2 />
    </div>
  );
};

export default HelpCenter;