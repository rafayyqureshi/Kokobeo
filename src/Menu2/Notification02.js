import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Briefcase,
  MessageCircle,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  User,
  X,
  Check,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/Button';
import SharedHeader4 from '../Headers/SharedHeader';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader from '../Headers/SharedHeader';
import SharedHeader7 from '../Headers/SharedHeader7';

const NotificationsPage02 = () => {
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'project',
      title: 'New Project Invitation',
      message: 'You have been invited to submit a proposal for "Website Development Project"',
      timestamp: '10 minutes ago',
      read: false,
      priority: 'high',
      action: 'View Project',
      link: '/projects/123'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message',
      message: 'John Smith sent you a message regarding the ongoing project',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium',
      action: 'Reply',
      link: '/messages/456'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'Payment of $500 has been processed for Project #789',
      timestamp: '2 hours ago',
      read: true,
      priority: 'low',
      action: 'View Details',
      link: '/payments/789'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Profile Verification Required',
      message: 'Please complete your profile verification to unlock all features',
      timestamp: '1 day ago',
      read: true,
      priority: 'high',
      action: 'Verify Now',
      link: '/verify'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Filter options
  const filters = [
    { value: 'all', label: 'Notifications' },
    { value: 'project', label: 'Projects' },
    { value: 'message', label: 'Messages' },
    { value: 'payment', label: 'Payments' },
    { value: 'alert', label: 'Alerts' }
  ];

  // Get icon based on notification type
  const getIcon = (type) => {
    switch (type) {
      case 'project':
        return <Briefcase className="h-5 w-5 text-blue-600" />;
      case 'message':
        return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-purple-600" />;
      case 'alert':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    if (showUnreadOnly && notification.read) return false;
    if (selectedFilter === 'all') return true;
    return notification.type === selectedFilter;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader7 />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section - Made Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">Stay updated with your latest activities</p>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 flex-1 sm:flex-initial"
            >
              <Check className="h-4 w-4" />
              <span className="hidden sm:inline">Mark All Read</span>
              <span className="sm:hidden">Read All</span>
            </Button>
            <Button
              variant="outline"
              onClick={clearAllNotifications}
              className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700 flex-1 sm:flex-initial"
            >
              <X className="h-4 w-4" />
              <span className="hidden sm:inline">Clear All</span>
              <span className="sm:hidden">Clear</span>
            </Button>
          </div>
        </div>

        {/* Filters Section - Made Responsive */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {filters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={selectedFilter === filter.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(filter.value)}
                  className="flex-1 sm:flex-initial"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
              <input
                type="checkbox"
                id="unreadOnly"
                checked={showUnreadOnly}
                onChange={(e) => setShowUnreadOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="unreadOnly" className="text-sm text-gray-600">
                Show unread only
              </label>
            </div>
          </div>
        </Card>

        {/* Notifications List - Made Responsive */}
        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 hover:shadow-md transition-shadow ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {notification.message}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:flex-shrink-0">
                        <Badge
                          variant={notification.read ? 'outline' : 'default'}
                          className={notification.read ? 'text-gray-600' : ''}
                        >
                          {notification.read ? 'Read' : 'New'}
                        </Badge>
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {notification.timestamp}
                      </div>

                      <a
                        href={notification.link}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        {notification.action}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                No notifications
              </h3>
              <p className="text-gray-600 mt-1">
                You're all caught up! Check back later for new updates.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={() => {/* Load more notifications */}}
            >
              <RefreshCw className="h-4 w-4" />
              Load More
            </Button>
          </div>
        )}
      </div>

      <SharedFooter2 />
    </div>
  );
};

export default NotificationsPage02;