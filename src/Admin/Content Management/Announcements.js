import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ChevronDown, MoreVertical,
  BellRing, Edit, Trash2, Eye, X, Plus,
  Calendar, Clock, Users, Globe, Settings,
  MessageCircle, AlertCircle, CheckCircle, 
  Bell, Radio, Target, Send, UserCheck,
  ArrowUpRight, FileText, PinIcon
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const Announcements = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showAnnouncementDetails, setShowAnnouncementDetails] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'Platform Maintenance Update',
      content: 'Scheduled maintenance will be performed on February 10th, 2024, from 2 AM to 4 AM EST. Some services may be temporarily unavailable.',
      type: 'maintenance',
      status: 'scheduled',
      priority: 'high',
      target: {
        userTypes: ['all'],
        regions: ['all']
      },
      schedule: {
        publishAt: '2024-02-08T10:00:00',
        expiresAt: '2024-02-11T00:00:00'
      },
      visibility: 'public',
      author: {
        name: 'System Admin',
        id: 'admin1'
      },
      stats: {
        views: 1245,
        acknowledged: 856
      },
      createdAt: '2024-02-07T15:30:00',
      updatedAt: '2024-02-07T15:30:00',
      channels: ['web', 'email', 'mobile']
    },
    {
      id: 2,
      title: 'New Feature: Enhanced Service Provider Profiles',
      content: 'We\'re excited to announce enhanced service provider profiles with portfolio showcase and improved scheduling features.',
      type: 'feature',
      status: 'active',
      priority: 'medium',
      target: {
        userTypes: ['service_provider'],
        regions: ['all']
      },
      schedule: {
        publishAt: '2024-02-07T09:00:00',
        expiresAt: '2024-02-21T00:00:00'
      },
      visibility: 'targeted',
      author: {
        name: 'Product Team',
        id: 'admin2'
      },
      stats: {
        views: 567,
        acknowledged: 423
      },
      createdAt: '2024-02-06T16:45:00',
      updatedAt: '2024-02-06T16:45:00',
      channels: ['web', 'mobile']
    }
  ];

  // Add/Edit Announcement Modal Component
  const AnnouncementModal = ({ announcement = null, isOpen, onClose }) => {
    const [formData, setFormData] = useState(
      announcement || {
        title: '',
        content: '',
        type: 'general',
        priority: 'medium',
        target: {
          userTypes: ['all'],
          regions: ['all']
        },
        schedule: {
          publishAt: '',
          expiresAt: ''
        },
        visibility: 'public',
        channels: ['web']
      }
    );

    const [activeTab, setActiveTab] = useState('content');

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
                  {announcement ? 'Edit Announcement' : 'Create Announcement'}
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
              {/* Tabs */}
              <div className="border-b">
                <div className="flex gap-4">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-2 border-b-2 ${
                      activeTab === 'content'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('targeting')}
                    className={`px-4 py-2 border-b-2 ${
                      activeTab === 'targeting'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Targeting
                  </button>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className={`px-4 py-2 border-b-2 ${
                      activeTab === 'schedule'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Schedule
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter announcement title"
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Content</label>
                      <textarea
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Enter announcement content"
                        rows={6}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    {/* Type & Priority */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="mt-1 w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="general">General</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="feature">Feature Update</option>
                          <option value="alert">Alert</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                          className="mt-1 w-full px-4 py-2 border rounded-lg"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'targeting' && (
                  <div className="space-y-6">
                    {/* Visibility */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Visibility</label>
                      <select
                        value={formData.visibility}
                        onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="public">Public (All Users)</option>
                        <option value="targeted">Targeted Users</option>
                      </select>
                    </div>

                    {/* User Types */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">User Types</label>
                      <div className="space-y-2">
                        {['all', 'client', 'service_provider'].map(type => (
                          <label key={type} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.target.userTypes.includes(type)}
                              onChange={(e) => {
                                const newTypes = e.target.checked
                                  ? [...formData.target.userTypes, type]
                                  : formData.target.userTypes.filter(t => t !== type);
                                setFormData({
                                  ...formData,
                                  target: { ...formData.target, userTypes: newTypes }
                                });
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="capitalize">{type.replace('_', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Regions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Regions</label>
                      <select
                        value={formData.target.regions[0]}
                        onChange={(e) => setFormData({
                          ...formData,
                          target: { ...formData.target, regions: [e.target.value] }
                        })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      >
                        <option value="all">All Regions</option>
                        <option value="na">North America</option>
                        <option value="eu">Europe</option>
                        <option value="asia">Asia</option>
                      </select>
                    </div>

                    {/* Channels */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Distribution Channels
                      </label>
                      <div className="space-y-2">
                        {['web', 'email', 'mobile'].map(channel => (
                          <label key={channel} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.channels.includes(channel)}
                              onChange={(e) => {
                                const newChannels = e.target.checked
                                  ? [...formData.channels, channel]
                                  : formData.channels.filter(c => c !== channel);
                                setFormData({ ...formData, channels: newChannels });
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="capitalize">{channel}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    {/* Publish Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                      <input
                        type="datetime-local"
                        value={formData.schedule.publishAt}
                        onChange={(e) => setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, publishAt: e.target.value }
                        })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      />
                    </div>

                    {/* Expiry Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                      <input
                        type="datetime-local"
                        value={formData.schedule.expiresAt}
                        onChange={(e) => setFormData({
                          ...formData,
                          schedule: { ...formData.schedule, expiresAt: e.target.value }
                        })}
                        className="mt-1 w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                )}
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
                  {announcement ? 'Update Announcement' : 'Create Announcement'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Announcement Card Component
  const AnnouncementCard = ({ announcement }) => {
    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high':
          return 'bg-red-100 text-red-700';
        case 'medium':
          return 'bg-yellow-100 text-yellow-700';
          default:
      return 'bg-blue-100 text-blue-700';
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case 'maintenance':
      return <Settings className="h-4 w-4" />;
    case 'feature':
      return <Radio className="h-4 w-4" />;
    case 'alert':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

return (
  <Card className="hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{announcement.type}</Badge>
            <Badge className={getPriorityColor(announcement.priority)}>
              {announcement.priority} Priority
            </Badge>
          </div>
          <h3 className="font-medium mt-2">{announcement.title}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnnouncementDetails(announcement)}
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

      {/* Content */}
      <p className="text-gray-600">{announcement.content}</p>

      {/* Stats & Info */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{announcement.stats.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            <span>{announcement.stats.acknowledged}</span>
          </div>
        </div>
        <span>
          {new Date(announcement.schedule.publishAt).toLocaleDateString()}
        </span>
      </div>

      {/* Targeting Info */}
      <div className="pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          {announcement.target.userTypes.map((type, index) => (
            <Badge key={index} variant="secondary">
              {type === 'all' ? 'All Users' : type.replace('_', ' ')}
            </Badge>
          ))}
          {announcement.channels.map((channel, index) => (
            <Badge key={index} variant="outline">
              {channel}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  </Card>
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
            <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">Create and manage platform announcements</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Announcement
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-semibold">12</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Radio className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Scheduled</p>
                <p className="text-2xl font-semibold">5</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-semibold">8.2k</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Response Rate</p>
                <p className="text-2xl font-semibold">76%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-yellow-600" />
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
          placeholder="Search announcements..."
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
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Types</option>
        <option value="general">General</option>
        <option value="maintenance">Maintenance</option>
        <option value="feature">Feature Update</option>
        <option value="alert">Alert</option>
      </select>

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="scheduled">Scheduled</option>
        <option value="expired">Expired</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-4 py-2 border rounded-lg w-full sm:w-auto"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">Priority</option>
        <option value="views">Most Viewed</option>
      </select>
    </div>
  </div>
</Card>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {announcements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {announcements.length} of {announcements.length} announcements
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
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  </main>

  {/* Modals */}
  <AnnouncementModal
    isOpen={showAddModal}
    onClose={() => setShowAddModal(false)}
  />

  <AnnouncementModal
    announcement={showAnnouncementDetails}
    isOpen={!!showAnnouncementDetails}
    onClose={() => setShowAnnouncementDetails(null)}
  />

  {/* <SharedFooter2 /> */}
</div>
);
};
export default Announcements;