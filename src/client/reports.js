import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart2, PieChart, TrendingUp, FileText, Download, Filter,
  ChevronDown, X, User, Briefcase, DollarSign, Clock, Calendar,
  Search, Globe, MessageSquare, Mail, HelpCircle, Bell, Shield,
  CreditCard, LogOut, Star, Home, MessageCircle, Ticket, Wallet, Settings
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader11 from '../Headers/SharedHeader11'; // Reusing a consistent header

// Mock user data
const mockUserData = {
  name: "Jane Doe",
  email: "jane.doe@example.com",
  profileImage: null,
  company: "Global Solutions Inc.",
  location: "Toronto, ON",
  isVerified: true,
  credits: 150,
  hasSubscription: true
};

// Mock report data
const mockReports = {
  serviceHistory: [
    { id: 1, service: "Legal Consultation", date: "2024-02-15", professional: "Sarah Johnson", status: "Completed", cost: 200 },
    { id: 2, service: "Business Strategy", date: "2024-02-10", professional: "Michael Chen", status: "Completed", cost: 250 },
    { id: 3, service: "Translation Services", date: "2024-02-05", professional: "Elena Rodriguez", status: "In Progress", cost: 180 }
  ],
  financialOverview: {
    totalSpent: 630,
    monthlyBreakdown: [
      { month: "January 2024", amount: 430 },
      { month: "February 2024", amount: 200 }
    ]
  },
  performanceMetrics: {
    completedServices: 10,
    avgRating: 4.8,
    responseTime: "24 hours"
  }
};

// Sidebar menu items based on the image
const sidebarItems = [
  { icon: Home, label: 'Dashboard', href: '/client/dashboard' },
  { icon: MessageCircle, label: 'Messages', href: '/client/messages', badge: '3' },
  { icon: Briefcase, label: 'My Orders', href: '/client/myorders', badge: '2 Active' },
  { icon: Clock, label: 'Progress', href: '/client/progress' },
  { icon: Ticket, label: 'Support Tickets', href: '/client/support' },
  { icon: Wallet, label: 'Wallet', href: '/client/wallet' },
  { icon: Bell, label: 'Notifications', href: '/client/notifications', badge: '2' },
  { icon: User, label: 'Profile', href: '/client/profile' },
  { icon: FileText, label: 'Report', href: '/client/reports', active: true }, // Active page
  { icon: Settings, label: 'Settings', href: '/client/settings' }
];

// Define menuItems for the header (same as sidebar for consistency)
const menuItems = [
  { icon: Globe, label: 'About Kokobeo', href: '/international/about' },
  { icon: HelpCircle, label: 'How it Works', href: '/how-it-works' },
  { icon: MessageSquare, label: 'Messages', href: '/client/messages', badge: '3' },
  { icon: Bell, label: 'Notifications', href: '/client/notifications', badge: '2' },
  { icon: Mail, label: 'Contact Us', href: '/client/support' },
  { icon: FileText, label: 'Help Center', href: '/client/help' },
  { icon: User, label: 'My Profile', href: '/client/profile' },
  { icon: Shield, label: 'Verify Account', href: '/client/verify' },
  { icon: Star, label: 'Subscription Plans', href: '/client/plans' },
  { icon: CreditCard, label: 'My Credits', href: '/client/credits', badge: mockUserData.credits },
  { icon: Briefcase, label: 'My Projects', href: '/client/myorders', badge: '2 Active' }
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('serviceHistory');
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [selectedServiceType, setSelectedServiceType] = useState('all');

  // Filter logic for service history
  const filteredServiceHistory = mockReports.serviceHistory.filter(report => {
    if (dateRange === 'all') return true;
    const reportDate = new Date(report.date);
    const now = new Date();
    if (dateRange === '30days') return (now - reportDate) / (1000 * 60 * 60 * 24) <= 30;
    if (dateRange === '90days') return (now - reportDate) / (1000 * 60 * 60 * 24) <= 90;
    return true;
  }).filter(report => 
    selectedServiceType === 'all' || report.service === selectedServiceType
  );

  // Tab content components
  const ServiceHistoryTab = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Service History</h3>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Time</option>
                <option value="30days">Last 30 Days</option>
                <option value="90days">Last 90 Days</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                value={selectedServiceType}
                onChange={(e) => setSelectedServiceType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Services</option>
                <option value="Legal Consultation">Legal Consultation</option>
                <option value="Business Strategy">Business Strategy</option>
                <option value="Translation Services">Translation Services</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Service</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Date</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Professional</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Status</th>
              <th className="py-2 px-4 text-sm font-medium text-gray-700">Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredServiceHistory.map((report) => (
              <tr key={report.id} className="border-b last:border-0">
                <td className="py-3 px-4 text-sm text-gray-900">{report.service}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{report.date}</td>
                <td className="py-3 px-4 text-sm text-gray-600">{report.professional}</td>
                <td className="py-3 px-4 text-sm">
                  <Badge
                    variant={report.status === 'Completed' ? 'success' : 'warning'}
                    className={report.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}
                  >
                    {report.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-sm text-gray-900">${report.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button className="mt-4" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Report
      </Button>
    </Card>
  );

  const FinancialOverviewTab = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <h3 className="text-xl font-semibold mb-4">Financial Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">${mockReports.financialOverview.totalSpent}</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">Monthly Breakdown</p>
          {mockReports.financialOverview.monthlyBreakdown.map((item, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{item.month}</span>
              <span className="text-sm font-medium text-gray-900">${item.amount}</span>
            </div>
          ))}
        </div>
      </div>
      <Button className="mt-6" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Financial Report
      </Button>
    </Card>
  );

  const PerformanceMetricsTab = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <BarChart2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{mockReports.performanceMetrics.completedServices}</p>
          <p className="text-sm text-gray-500">Completed Services</p>
        </div>
        <div className="text-center">
          <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{mockReports.performanceMetrics.avgRating}</p>
          <p className="text-sm text-gray-500">Average Rating</p>
        </div>
        <div className="text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{mockReports.performanceMetrics.responseTime}</p>
          <p className="text-sm text-gray-500">Avg. Response Time</p>
        </div>
      </div>
      <Button className="mt-6" variant="outline">
        <Download className="h-4 w-4 mr-2" />
        Download Performance Report
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex"  style={{ textAlign: 'left' }}>
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-screen p-4">
        <div className="flex items-center mb-8">
          <img 
            src="https://assests.netlify.app/assets/images/logo.png" 
            alt="Kokobeo Logo" 
            className="h-8 w-auto mr-2"
          />
          <span className="text-xl font-bold text-blue-600">Kokobeo</span>
        </div>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 ${
                item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-blue-100 text-blue-600 text-xs">
                  {item.badge}
                </Badge>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content with Margin for Sidebar */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <SharedHeader11 menuItems={menuItems} mockUserData={mockUserData} />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-2">View and download your service, financial, and performance reports.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              onClick={() => setActiveTab('serviceHistory')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'serviceHistory' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Service History
            </button>
            <button
              onClick={() => setActiveTab('financialOverview')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'financialOverview' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <DollarSign className="h-4 w-4 inline mr-2" />
              Financial Overview
            </button>
            <button
              onClick={() => setActiveTab('performanceMetrics')}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'performanceMetrics'
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <TrendingUp className="h-4 w-4 inline mr-2" />
              Performance Metrics
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'serviceHistory' && (
              <motion.div
                key="serviceHistory"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ServiceHistoryTab />
              </motion.div>
            )}
            {activeTab === 'financialOverview' && (
              <motion.div
                key="financialOverview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FinancialOverviewTab />
              </motion.div>
            )}
            {activeTab === 'performanceMetrics' && (
              <motion.div
                key="performanceMetrics"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PerformanceMetricsTab />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <div className="mt-20">
          <SharedFooter2 />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;