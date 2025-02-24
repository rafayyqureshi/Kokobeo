import React, { useState } from 'react';
import {
  MessageSquare, Clock, Calendar, Eye, ArrowUpRight, 
  History, Globe, Edit, Trash2, Plus, Search,
  Filter, Image as ImageIcon, Users, CheckCircle,
  X, Target, Zap, Send, Palette, Layers,
  MousePointer, BarChart2, Settings, Maximize2, MoveIcon,
  FileText, ExternalLink, AlertCircle, Monitor,
  ArrowDown, ArrowUp, ChevronDown, ChevronRight,
  Link, Lock, LockIcon, UnlockIcon, Star,
  Save, Copy, Archive, Sun, Moon
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const MarketingPopups = () => {
  const [selectedPopup, setSelectedPopup] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [showDesignEditor, setShowDesignEditor] = useState(false);

  // Sample popups data with expanded structure
  const popups = [
    {
      id: 1,
      name: "Welcome Popup",
      type: "welcome",
      category: "general",
      status: "active",
      pageLocation: "homepage",
      displayLocation: "center",
      timing: {
        startDate: "2024-02-01",
        endDate: "2024-12-31",
        displayFrequency: "once-per-session",
        delay: "3 seconds",
        showTime: {
          start: "00:00",
          end: "23:59"
        }
      },
      content: {
        title: "Welcome to Kokobeo!",
        description: "Find the best professionals for your needs. Get quotes or hire directly from verified experts.",
        primaryButton: {
          text: "Get Started",
          link: "/services",
          style: "primary"
        },
        secondaryButton: {
          text: "Learn More",
          link: "/how-it-works",
          style: "outline"
        },
        image: "/welcome-banner.jpg",
        videoUrl: null
      },
      targeting: {
        audience: "new-visitors",
        devices: ["desktop", "mobile", "tablet"],
        locations: ["all"],
        language: ["en", "fr"],
        userType: ["guest", "customer"],
        urlPatterns: ["/*"]
      },
      design: {
        theme: "light",
        animation: "fade",
        overlay: true,
        width: "500px",
        height: "auto",
        cornerRadius: "8px",
        colors: {
          background: "#FFFFFF",
          text: "#1F2937",
          primary: "#2563EB",
          secondary: "#6B7280"
        },
        typography: {
          titleSize: "24px",
          descriptionSize: "16px",
          fontFamily: "Inter, sans-serif"
        },
        spacing: {
          padding: "24px",
          gap: "16px"
        }
      },
      behavior: {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        autoClose: null,
        scrollBehavior: "allow"
      },
      performance: {
        impressions: 15000,
        clicks: 3200,
        dismissals: 11800,
        conversionRate: "21.3%",
        avgViewTime: "45 seconds"
      }
    },
    {
      id: 2,
      name: "Terms & Conditions Update",
      type: "legal",
      category: "important",
      status: "scheduled",
      pageLocation: "all",
      displayLocation: "center",
      timing: {
        startDate: "2024-03-01",
        endDate: null,
        displayFrequency: "once-per-user",
        delay: "0 seconds",
        showTime: {
          start: "00:00",
          end: "23:59"
        }
      },
      content: {
        title: "Terms Update Notice",
        description: "We've updated our Terms & Conditions. Please review the changes.",
        primaryButton: {
          text: "Review Changes",
          link: "/terms",
          style: "primary"
        },
        secondaryButton: {
          text: "Later",
          link: null,
          style: "outline"
        },
        image: null,
        videoUrl: null
      },
      targeting: {
        audience: "all-users",
        devices: ["all"],
        locations: ["all"],
        language: ["all"],
        userType: ["registered"],
        urlPatterns: ["/*"]
      },
      design: {
        theme: "light",
        animation: "slide",
        overlay: true,
        width: "600px",
        height: "auto",
        cornerRadius: "8px",
        colors: {
          background: "#FFFFFF",
          text: "#1F2937",
          primary: "#2563EB",
          secondary: "#6B7280"
        },
        typography: {
          titleSize: "20px",
          descriptionSize: "14px",
          fontFamily: "Inter, sans-serif"
        },
        spacing: {
          padding: "24px",
          gap: "16px"
        }
      },
      behavior: {
        closeOnOverlayClick: false,
        closeOnEscape: false,
        showCloseButton: true,
        autoClose: null,
        scrollBehavior: "prevent"
      },
      performance: {
        impressions: 5000,
        clicks: 4200,
        dismissals: 800,
        conversionRate: "84%",
        avgViewTime: "120 seconds"
      }
    }
  ];

  const PopupCard = ({ popup }) => (
    <Card className="p-4 md:p-6 hover:shadow-md transition-shadow"  style={{ textAlign: 'left' }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold">{popup.name}</h3>
            <Badge className={
              popup.status === 'active' ? 'bg-green-100 text-green-700' :
              popup.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {popup.status.charAt(0).toUpperCase() + popup.status.slice(1)}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {popup.type}
            </Badge>
            {popup.category === 'important' && (
              <Badge className="bg-red-100 text-red-700">
                Important
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Monitor className="h-4 w-4" />
              {popup.pageLocation === 'all' ? 'All Pages' : popup.pageLocation}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {popup.timing.startDate} {popup.timing.endDate ? `- ${popup.timing.endDate}` : '(No End Date)'}
            </div>
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {popup.targeting.audience}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPopup(popup)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-4 w-4" />
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

      {/* Content Preview */}
      <div className="mt-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium">{popup.content.title}</h4>
            <p className="text-sm text-gray-600">{popup.content.description}</p>
            <div className="flex gap-2 mt-2">
              {popup.content.primaryButton && (
                <Button size="sm">{popup.content.primaryButton.text}</Button>
              )}
              {popup.content.secondaryButton && (
                <Button variant="outline" size="sm">{popup.content.secondaryButton.text}</Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Display Settings</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Location</span>
              <Badge variant="outline" className="capitalize">{popup.displayLocation}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Frequency</span>
              <Badge variant="outline">{popup.timing.displayFrequency}</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Display Delay</span>
              <Badge variant="outline">{popup.timing.delay}</Badge>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3">Targeting</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Devices</span>
              <div className="flex flex-wrap gap-1">
                {popup.targeting.devices.map((device, index) => (
                  <Badge key={index} variant="outline" className="capitalize">
                    {device}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-sm">Languages</span>
              <div className="flex flex-wrap gap-1">
                {popup.targeting.language.map((lang, index) => (
                  <Badge key={index} variant="outline" className="uppercase">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="font-medium mb-3">Performance</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Impressions</div>
            <div className="font-semibold mt-1">{popup.performance.impressions.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Clicks</div>
            <div className="font-semibold mt-1">{popup.performance.clicks.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Dismissals</div>
            <div className="font-semibold mt-1">{popup.performance.dismissals.toLocaleString()}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Conversion</div>
            <div className="font-semibold mt-1">{popup.performance.conversionRate}</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Avg. View Time</div>
            <div className="font-semibold mt-1">{popup.performance.avgViewTime}</div>
          </div>
        </div>
      </div>
    </Card>
  );

  const PopupModal = ({ popup = null, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('content');

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"  style={{ textAlign: 'left' }}>
        <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {popup ? 'Edit Marketing Popup' : 'Create New Popup'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b mb-6">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-3 px-1 ${
                  activeTab === 'content'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Content
              </button>
              <button
                onClick={() => setActiveTab('display')}
                className={`pb-3 px-1 ${
                  activeTab === 'display'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Display Settings
              </button>
              <button
                onClick={() => setActiveTab('targeting')}
                className={`pb-3 px-1 ${
                  activeTab === 'targeting'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Targeting
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`pb-3 px-1 ${
                  activeTab === 'design'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                Design
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Popup Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter popup name"
                      defaultValue={popup?.name}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="welcome">Welcome</option>
                        <option value="announcement">Announcement</option>
                        <option value="promotion">Promotion</option>
                        <option value="legal">Legal Notice</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="general">General</option>
                        <option value="important">Important</option>
                        <option value="marketing">Marketing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <div className="mt-1 space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600">Title</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="Enter title"
                          defaultValue={popup?.content?.title}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Description</label>
                        <textarea
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          rows={4}
                          placeholder="Enter description"
                          defaultValue={popup?.content?.description}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Primary Button</label>
                      <div className="mt-1 space-y-2">
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border rounded-lg"
                          placeholder="Button text"
                          defaultValue={popup?.content?.primaryButton?.text}
                        />
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border rounded-lg"
                          placeholder="Button link"
                          defaultValue={popup?.content?.primaryButton?.link}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Secondary Button</label>
                      <div className="mt-1 space-y-2">
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border rounded-lg"
                          placeholder="Button text"
                          defaultValue={popup?.content?.secondaryButton?.text}
                        />
                        <input
                          type="text"
                          className="block w-full px-3 py-2 border rounded-lg"
                          placeholder="Button link"
                          defaultValue={popup?.content?.secondaryButton?.link}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'display' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Page Location</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="all">All Pages</option>
                        <option value="homepage">Homepage</option>
                        <option value="services">Services Pages</option>
                        <option value="blog">Blog Pages</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Display Position</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="center">Center</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="sidebar">Sidebar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Timing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Start Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={popup?.timing?.startDate}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">End Date</label>
                        <input
                          type="date"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          defaultValue={popup?.timing?.endDate}
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm text-gray-600">Display Frequency</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="once">Once Only</option>
                        <option value="once-per-session">Once Per Session</option>
                        <option value="once-per-day">Once Per Day</option>
                        <option value="always">Always</option>
                      </select>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm text-gray-600">Display Delay</label>
                      <input
                        type="text"
                        className="mt-1 block w-full px-3 py-2 border rounded-lg"
                        placeholder="e.g. 3 seconds"
                        defaultValue={popup?.timing?.delay}
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Behavior</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Close on overlay click</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Close on escape key</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Show close button</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Prevent page scroll</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'targeting' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                    <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                      <option value="all">All Users</option>
                      <option value="new-visitors">New Visitors</option>
                      <option value="returning">Returning Users</option>
                      <option value="registered">Registered Users</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Devices</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Desktop</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Mobile</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Tablet</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Languages</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>English</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>French</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span>Spanish</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL Patterns</label>
                    <textarea
                      className="mt-1 block w-full px-3 py-2 border rounded-lg"
                      rows={3}
                      placeholder="Enter URL patterns (one per line)"
                    />
                    <p className="mt-1 text-sm text-gray-500">Use * for wildcards, e.g. /blog/*</p>
                  </div>
                </div>
              )}

              {activeTab === 'design' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Theme</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Animation</label>
                      <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                        <option value="none">None</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Dimensions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Width</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. 500px"
                          defaultValue={popup?.design?.width}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Height</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. auto"
                          defaultValue={popup?.design?.height}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Background</label>
                        <input
                          type="color"
                          className="mt-1 block w-full"
                          defaultValue={popup?.design?.colors?.background}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Text</label>
                        <input
                          type="color"
                          className="mt-1 block w-full"
                          defaultValue={popup?.design?.colors?.text}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Primary</label>
                        <input
                          type="color"
                          className="mt-1 block w-full"
                          defaultValue={popup?.design?.colors?.primary}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Secondary</label>
                        <input
                          type="color"
                          className="mt-1 block w-full"
                          defaultValue={popup?.design?.colors?.secondary}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Typography</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Title Size</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. 24px"
                          defaultValue={popup?.design?.typography?.titleSize}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Description Size</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. 16px"
                          defaultValue={popup?.design?.typography?.descriptionSize}
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-600">Font Family</label>
                        <select className="mt-1 block w-full px-3 py-2 border rounded-lg">
                          <option value="Inter, sans-serif">Inter</option>
                          <option value="Arial, sans-serif">Arial</option>
                          <option value="Helvetica, sans-serif">Helvetica</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Spacing</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600">Padding</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. 24px"
                          defaultValue={popup?.design?.spacing?.padding}
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Gap</label>
                        <input
                          type="text"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="e.g. 16px"
                          defaultValue={popup?.design?.spacing?.gap}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMainContent = () => {
    return (
      <div className="space-y-6"  style={{ textAlign: 'left' }}>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Active Popups</p>
                <p className="text-2xl font-semibold mt-1">6</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Impressions</p>
                <p className="text-2xl font-semibold mt-1">45.2k</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Avg. CTR</p>
                <p className="text-2xl font-semibold mt-1">12.8%</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <MousePointer className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 md:p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-semibold mt-1">3.2%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ArrowUpRight className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search popups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </Button>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="scheduled">Scheduled</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="welcome">Welcome</option>
                <option value="announcement">Announcement</option>
                <option value="promotion">Promotion</option>
                <option value="legal">Legal</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Popups List */}
        <div className="grid grid-cols-1 gap-6">
          {popups
            .filter(popup => selectedStatus === 'all' || popup.status === selectedStatus)
            .filter(popup => selectedType === 'all' || popup.type === selectedType)
            .map(popup => (
              <PopupCard key={popup.id} popup={popup} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Marketing Popups</h1>
                <p className="text-gray-600 mt-1">Manage promotional popups and banners across the platform</p>
              </div>
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Popup
              </Button>
            </div>

            {/* Main Content */}
            {renderMainContent()}

            {/* Add/Edit Modal */}
            {showAddModal && (
              <PopupModal
                isOpen={true}
                onClose={() => setShowAddModal(false)}
              />
            )}

            {/* Edit Modal */}
            {selectedPopup && (
              <PopupModal
                popup={selectedPopup}
                isOpen={true}
                onClose={() => setSelectedPopup(null)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketingPopups;