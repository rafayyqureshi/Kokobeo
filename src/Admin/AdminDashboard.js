import React, { useState, useEffect } from 'react';
import {
  BarChart2, Users, Building2, Globe, Tool, ShoppingBag,
  Wallet, MessageSquare, Settings, Shield, Star, BadgeCheck,
  HelpCircle, PieChart, ArrowUpRight, FileText, X, Award,
  CheckCircleIcon, MapPinIcon, DownloadIcon, AlertCircle,
  Clock, Menu, Search,
  BellIcon,
  PenToolIcon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import AdminHeader from '../Headers/AdminHeader';



// Sample data for statistics
const stats = [
  {
    label: 'Total Users',
    value: '12,000',
    change: '+12.5%',
    changeType: 'positive',
    icon: Users,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    label: 'Active Services',
    value: '1,432',
    change: '+8.2%',
    changeType: 'positive',
    icon: PenToolIcon,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    label: 'Revenue',
    value: '$42,900',
    change: '-2.4%',
    changeType: 'negative',
    icon: Wallet,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    label: 'Support Tickets',
    value: '95',
    change: '+28.4%',
    changeType: 'positive',
    icon: MessageSquare,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  }
];

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    title: 'Emergency Service Request',
    description: 'New emergency plumbing service request in downtown area',
    time: '5 minutes ago',
    status: 'urgent'
  },
  {
    id: 2,
    title: 'New Professional Verification',
    description: 'Electrician verification documents submitted',
    time: '25 minutes ago',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Payment Processed',
    description: 'Monthly payout to service providers completed',
    time: '1 hour ago',
    status: 'completed'
  },
  {
    id: 4,
    title: 'System Update',
    description: 'Platform maintenance completed successfully',
    time: '2 hours ago',
    status: 'completed'
  }
];

// Sample data for the graph
const graphData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 }
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Navigation link component
  const NavLink = ({ item }) => (
    <Link
      to={item.href}
      className={`flex items-center justify-between px-4 py-2 rounded-lg text-sm transition-colors ${
        location.pathname === item.href
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </div>
      {item.badge && (
        <Badge variant="secondary">{item.badge}</Badge>
      )}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
        <AdminHeader/>
      {/* Sidebar */}
      

      {/* Main Content */}
      <main className="lg:pl-64">
        {/* Top Header */}
        <header className="h-16 bg-white border-b px-4 flex items-center justify-between">
          {/* <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <BellIcon className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                A
              </div>
              <span className="font-medium">Admin</span>
            </div>
          </div> */}
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, Admin!</h1>
                <p className="text-gray-600 mt-1">Here's what's happening across your platform today.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <DownloadIcon className="h-4 w-4" />
                  Export Report
                </Button>
                <Button className="flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4" />
                  View Analytics
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600 mt-1">{stat.label}</p>
                </Card>
              ))}
            </div>

            {/* Chart and Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart */}
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">Revenue Overview</h2>
                  <p className="text-sm text-gray-600">Monthly revenue statistics</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Recent Activities */}
              <Card>
                <div className="p-6 border-b">
                  <h2 className="text-lg font-semibold">Recent Activities</h2>
                </div>
                <div className="divide-y">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          activity.status === 'urgent' ? 'bg-red-100' :
                          activity.status === 'pending' ? 'bg-yellow-100' :
                          'bg-green-100'
                        }`}>
                          {activity.status === 'urgent' ? 
                            <AlertCircle className="h-5 w-5 text-red-600" /> :
                           activity.status === 'pending' ?
                            <Clock className="h-5 w-5 text-yellow-600" /> :
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          }
                        </div>
                        <div>
                          <h3 className="font-medium">{activity.title}</h3>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <p className="text-sm text-gray-600 mt-1">Common administrative tasks</p>
              </div>
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link 
                  to="/admin/verification"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BadgeCheck className="h-6 w-6 text-blue-600 mb-3" />
                  <h3 className="font-medium">Verification Requests</h3>
                  <p className="text-sm text-gray-600 mt-1">25 pending</p>
                </Link>

                <Link 
                  to="/admin/support"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MessageSquare className="h-6 w-6 text-purple-600 mb-3" />
                  <h3 className="font-medium">Support Tickets</h3>
                  <p className="text-sm text-gray-600 mt-1">12 unresolved</p>
                </Link>

                <Link 
                  to="/admin/emergency"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <AlertCircle className="h-6 w-6 text-red-600 mb-3" />
                  <h3 className="font-medium">Emergency Services</h3>
                  <p className="text-sm text-gray-600 mt-1">8 active</p>
                </Link>

                <Link 
                  to="/admin/payouts"
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Wallet className="h-6 w-6 text-green-600 mb-3" />
                  <h3 className="font-medium">Pending Payouts</h3>
                  <p className="text-sm text-gray-600 mt-1">15 pending</p>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;