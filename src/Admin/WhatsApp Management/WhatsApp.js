import React, { useState } from 'react';
import {
  MessageSquare, Settings, Bell, UserCog, Users,
  Save, Plus, Trash2, Edit, CheckCircle, AlertCircle, FileText,
  Clock, Shield, Calendar, Send, PlayCircle, PauseCircle,
  Database, Filter, Search, ChevronDown, AlertTriangle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import AdminHeader from '../../Headers/AdminHeader';

const TabButton = ({ active, label, icon: Icon, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}
  >
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </button>
);

const WhatsAppIntegration = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data for templates
  const templates = [
    {
      id: 1,
      name: "Emergency Service Professional Notification",
      type: "Professional",
      category: "Emergency",
      status: "active",
      triggers: ["new_emergency_request", "service_accepted"],
      content: {
        text: "Hello {{provider_name}}, New emergency service request:\nService: {{service_type}}\nLocation: {{location}}\nDescription: {{description}}\nResponse required within {{response_time}} minutes.",
        variables: ["provider_name", "service_type", "location", "description", "response_time"],
        buttons: ["Accept", "Decline"]
      },
      rules: {
        retryCount: 3,
        retryInterval: 5,
        fallbackAction: "notify_admin",
        responseTimeout: 15
      },
      schedule: {
        activeHours: "24/7",
        timezone: "UTC"
      },
      performance: {
        deliveryRate: 98,
        responseRate: 85,
        avgResponseTime: "8 minutes"
      }
    },
    {
      id: 2,
      name: "Customer Emergency Booking Confirmation",
      type: "Customer",
      category: "Emergency",
      status: "active",
      triggers: ["booking_confirmed", "professional_assigned"],
      content: {
        text: "Hello {{customer_name}},\nYour emergency service request has been confirmed.\nService: {{service_type}}\nProfessional: {{provider_name}}\nETA: {{eta}} minutes\nEmergency Contact: {{emergency_contact}}",
        variables: ["customer_name", "service_type", "provider_name", "eta", "emergency_contact"],
        buttons: ["Track Professional", "Cancel Request"]
      },
      rules: {
        retryCount: 2,
        retryInterval: 3,
        fallbackAction: "sms",
        responseTimeout: 10
      },
      schedule: {
        activeHours: "24/7",
        timezone: "UTC"
      },
      performance: {
        deliveryRate: 99,
        responseRate: 92,
        avgResponseTime: "5 minutes"
      }
    },
    {
      id: 3,
      name: "Service Status Update",
      type: "Both",
      category: "All",
      status: "active",
      triggers: ["status_change", "delay_notification"],
      content: {
        text: "Status Update for {{service_type}}:\nCurrent Status: {{status}}\n{{status_description}}\nNext Update In: {{next_update_time}}",
        variables: ["service_type", "status", "status_description", "next_update_time"],
        buttons: ["Acknowledge", "Request Call"]
      },
      rules: {
        retryCount: 2,
        retryInterval: 5,
        fallbackAction: "in_app_notification",
        responseTimeout: 30
      },
      schedule: {
        activeHours: "24/7",
        timezone: "UTC"
      },
      performance: {
        deliveryRate: 97,
        responseRate: 88,
        avgResponseTime: "12 minutes"
      }
    }
  ];

  const TemplateCard = ({ template }) => (
    <Card className="p-6">
      <div className="flex justify-between items-start" style={{ textAlign: 'left' }}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">{template.name}</h3>
            <Badge className={
              template.status === 'active' ? 'bg-green-100 text-green-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{template.type}</Badge>
            <Badge variant="outline">{template.category}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedTemplate(template)}
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

      {/* Triggers */}
      <div className="mt-6" style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-3">Triggers</h4>
        <div className="flex flex-wrap gap-2">
          {template.triggers.map((trigger, index) => (
            <Badge key={index} className="bg-blue-50 text-blue-700">
              {trigger.split('_').join(' ')}
            </Badge>
          ))}
        </div>
      </div>

      {/* Message Content */}
      <div className="mt-6" style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-3">Message Template</h4>
        <div className="p-4 bg-gray-50 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap">{template.content.text}</pre>
          <div className="mt-4 flex flex-wrap gap-2">
            {template.content.buttons?.map((button, index) => (
              <Button key={index} variant="outline" size="sm">{button}</Button>
            ))}
          </div>
        </div>
      </div>

      {/* Rules & Schedule */}
      <div className="mt-6 grid grid-cols-2 gap-4" style={{ textAlign: 'left' }}>
        <div>
          <h4 className="font-medium mb-3">Delivery Rules</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Retry Count</span>
              <Badge variant="outline">{template.rules.retryCount}</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Retry Interval</span>
              <Badge variant="outline">{template.rules.retryInterval} min</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Response Timeout</span>
              <Badge variant="outline">{template.rules.responseTimeout} min</Badge>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-3">Schedule</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Active Hours</span>
              <Badge variant="outline">{template.schedule.activeHours}</Badge>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Timezone</span>
              <Badge variant="outline">{template.schedule.timezone}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-6 border-t" style={{ textAlign: 'left' }}>
        <h4 className="font-medium mb-3">Performance</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="text-sm text-gray-500">Delivery Rate</div>
            <div className="font-semibold mt-1">{template.performance.deliveryRate}%</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="text-sm text-gray-500">Response Rate</div>
            <div className="font-semibold mt-1">{template.performance.responseRate}%</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg text-center">
            <div className="text-sm text-gray-500">Avg Response</div>
            <div className="font-semibold mt-1">{template.performance.avgResponseTime}</div>
          </div>
        </div>
      </div>
    </Card>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'templates':
        return (
          <div className="space-y-6" style={{ textAlign: 'left' }}>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">Message Templates</h2>
                <p className="text-gray-600 mt-1">Manage automated WhatsApp message templates</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Template
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {templates.map(template => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="space-y-6" style={{ textAlign: 'left' }}>
            <div>
              <h2 className="text-lg font-semibold">WhatsApp Settings</h2>
              <p className="text-gray-600 mt-1">Configure WhatsApp integration settings</p>
            </div>
            
            <Card className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Professional Response Delay (minutes)</label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Response Delay (minutes)</label>
                  <input
                    type="number"
                    defaultValue={2}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Retry Attempts</label>
                  <input
                    type="number"
                    defaultValue={3}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Retry Interval (minutes)</label>
                  <input
                    type="number"
                    defaultValue={5}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Response Timeout (minutes)</label>
                  <input
                    type="number"
                    defaultValue={15}
                    className="mt-1 w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Default Language</label>
                  <select className="mt-1 w-full px-4 py-2 border rounded-lg">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Automated Messaging Rules</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable emergency service notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable status update notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable service completion notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span>Enable payment notifications</span>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-end gap-3">
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
              </div>
            </Card>
          </div>
        );
        
      case 'logs':
        return (
          <div className="space-y-6" style={{ textAlign: 'left' }}>
            <div>
              <h2 className="text-lg font-semibold">Message Logs</h2>
              <p className="text-gray-600 mt-1">View WhatsApp message delivery logs</p>
            </div>
            
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Template</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...Array(5)].map((_, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          2024-02-18 15:30:00
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">Emergency</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          +1 234 567 8900
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Emergency Service Notification
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-green-100 text-green-700">Delivered</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="py-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">WhatsApp Integration</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Manage automated WhatsApp messaging for emergency services
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Active Templates</p>
                    <p className="text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Delivery Rate</p>
                    <p className="text-2xl font-semibold mt-1">98.5%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="text-2xl font-semibold mt-1">2.5m</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Daily Messages</p>
                    <p className="text-2xl font-semibold mt-1">2.4k</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Send className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
              <TabButton
                active={activeTab === 'templates'}
                label="Templates"
                icon={MessageSquare}
                onClick={() => setActiveTab('templates')}
              />
              <TabButton
                active={activeTab === 'settings'}
                label="Settings"
                icon={Settings}
                onClick={() => setActiveTab('settings')}
              />
              <TabButton
                active={activeTab === 'logs'}
                label="Logs"
                icon={FileText}
                onClick={() => setActiveTab('logs')}
              />
            </div>

            {/* Tab Content */}
            <div>
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WhatsAppIntegration;