import React, { useState } from 'react';
import {
  Bell, Settings, AlertCircle, Search, Filter,
  Plus, Trash2, Edit, CheckCircle, User, Clock,
  Users, Globe, Target, Send, Eye, Copy, Play,
  Pause, Calendar, MessageSquare, BellRing
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const CustomNotifications = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data remains the same
  const notifications = [/* ... your notifications data ... */];
  const templates = [/* ... your templates data ... */];

  const NotificationCard = ({ notification }) => (
    <Card className="p-4 hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="font-medium">{notification.title}</h3>
            <Badge className={`w-fit ${
              notification.status === 'active' ? 'bg-green-100 text-green-700' :
              notification.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-gray-600">{notification.message}</p>
          
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Target:</span>
              <div className="flex items-center gap-2 mt-1">
                <Target className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="truncate">{notification.target.type} ({notification.target.filter})</span>
              </div>
            </div>
            <div>
              <span className="text-gray-500">Schedule:</span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="truncate">{notification.schedule.start} to {notification.schedule.end}</span>
              </div>
            </div>
          </div>

          {notification.status === 'active' && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="text-gray-500 text-sm">Views</span>
                <p className="font-medium">{notification.metrics.views}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Clicks</span>
                <p className="font-medium">{notification.metrics.clicks}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-gray-500 text-sm">Conversion</span>
                <p className="font-medium">{notification.metrics.conversion}%</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full lg:w-auto justify-end">
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Edit className="h-4 w-4" />
          </Button>
          {notification.status === 'active' ? (
            <Button variant="ghost" size="sm" className="text-red-600 sm:px-2">
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="text-green-600 sm:px-2">
              <Play className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" className="text-red-600 sm:px-2">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const TemplateCard = ({ template }) => (
    <Card className="p-4"  style={{ textAlign: 'left' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h3 className="font-medium">{template.name}</h3>
            <Badge variant="outline" className="w-fit">
              {template.type}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-gray-600">{template.content}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {template.variables.map(variable => (
              <Badge key={variable} className="bg-blue-50 text-blue-700">
                {variable}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="sm:px-2">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-red-600 sm:px-2">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search notifications..."
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
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                New Notification
              </Button>
            </div>

            <div className="space-y-4">
              {notifications.map(notification => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          </div>
        );

      case 'templates':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h2 className="text-lg font-semibold">Notification Templates</h2>
                <p className="text-gray-600 mt-1">Manage reusable notification templates</p>
              </div>
              <Button className="flex items-center gap-2 w-full sm:w-auto">
                <Plus className="h-4 w-4" />
                Add Template
              </Button>
            </div>

            <div className="space-y-4">
              {templates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6"  style={{ textAlign: 'left' }}>
            <div>
              <h2 className="text-lg font-semibold">Notification Settings</h2>
              <p className="text-gray-600 mt-1">Configure notification preferences and defaults</p>
            </div>

            <Card className="p-4 sm:p-6 space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Display Settings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Default Display Duration (days)</label>
                    <input
                      type="number"
                      className="mt-1 w-full px-4 py-2 border rounded-lg"
                      defaultValue={7}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Maximum Active Notifications</label>
                    <input
                      type="number"
                      className="mt-1 w-full px-4 py-2 border rounded-lg"
                      defaultValue={5}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Targeting Settings</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Allow multiple notifications per user</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Enable geographic targeting</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Enable role-based targeting</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
                <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pb-16 pt-16">
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="py-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Custom Notifications</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Create and manage custom notifications and banners
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Active Notifications</p>
                    <p className="text-xl sm:text-2xl font-semibold">8</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <Bell className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-xl sm:text-2xl font-semibold">15.2k</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg shrink-0">
                    <Eye className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg. Conversion</p>
                    <p className="text-xl sm:text-2xl font-semibold">68%</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg shrink-0">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b overflow-x-auto pb-1">
              <TabButton
                active={activeTab === 'notifications'}
                label="Notifications"
                icon={Bell}
                onClick={() => setActiveTab('notifications')}
              />
              <TabButton
                active={activeTab === 'templates'}
                label="Templates"
                icon={Copy}
                onClick={() => setActiveTab('templates')}
              />
              <TabButton
                active={activeTab === 'settings'}
                label="Settings"icon={Settings}
                onClick={() => setActiveTab('settings')}
              />
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomNotifications;