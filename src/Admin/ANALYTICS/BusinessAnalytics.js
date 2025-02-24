import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card } from '../../components/ui/card';
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  ArrowRight,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

// Mock data for charts
const revenueData = [
    { month: 'Jan', revenue: 45000, growth: 12 },
    { month: 'Feb', revenue: 52000, growth: 15 },
    { month: 'Mar', revenue: 49000, growth: -5 },
    { month: 'Apr', revenue: 58000, growth: 18 },
    { month: 'May', revenue: 63000, growth: 8 },
    { month: 'Jun', revenue: 72000, growth: 14 },
    { month: 'Jul', revenue: 68000, growth: -5 }
  ];
  
  const businessGrowthData = [
    { month: 'Jan', newBusinesses: 120, activeBusinesses: 1100 },
    { month: 'Feb', newBusinesses: 140, activeBusinesses: 1200 },
    { month: 'Mar', newBusinesses: 135, activeBusinesses: 1250 },
    { month: 'Apr', newBusinesses: 160, activeBusinesses: 1350 },
    { month: 'May', newBusinesses: 180, activeBusinesses: 1450 },
    { month: 'Jun', newBusinesses: 190, activeBusinesses: 1550 },
    { month: 'Jul', newBusinesses: 210, activeBusinesses: 1650 }
  ];
  
  const categoryData = [
    { name: 'Plumbing', value: 30 },
    { name: 'Electrical', value: 25 },
    { name: 'Legal', value: 20 },
    { name: 'Cleaning', value: 15 },
    { name: 'Others', value: 10 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BusinessAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Business Analytics</h1>
            <p className="text-gray-600 mt-1">Monitor and analyze business performance metrics</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d', 'All'].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? 'default' : 'outline'}
              onClick={() => setTimeRange(range)}
              className="px-4"
            >
              {range}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold mt-1">$72,000</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+14.5%</span>
                </div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Active Businesses</p>
                <p className="text-2xl font-semibold mt-1">1,650</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+6.4%</span>
                </div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Building2 className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Service Categories</p>
                <p className="text-2xl font-semibold mt-1">24</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+2</span>
                </div>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Average Rating</p>
                <p className="text-2xl font-semibold mt-1">4.8</p>
                <div className="flex items-center mt-2 text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  <span className="text-sm">+0.2</span>
                </div>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Revenue Growth</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    fill="#93c5fd"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Business Growth Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Business Growth</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={businessGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newBusinesses"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="activeBusinesses"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Category Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Monthly Growth Rate */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Monthly Growth Rate</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="growth" fill="#2563eb">
                    {revenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.growth >= 0 ? '#16a34a' : '#dc2626'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Categories</h3>
            <div className="space-y-4">
              {categoryData.slice(0, 3).map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: COLORS[index] }} />
                    <span>{category.name}</span>
                  </div>
                  <span className="font-medium">{category.value}%</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Growth Indicators</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">New Business Rate</span>
                <Badge className="bg-green-100 text-green-700">+15.2%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Retention Rate</span>
                <Badge className="bg-blue-100 text-blue-700">92%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Market Expansion</span>
                <Badge className="bg-purple-100 text-purple-700">+8.5%</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Milestones</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>1500+ Active Businesses</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>$1M Monthly Revenue</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>20+ Service Categories</span>
              </div>
            </div>
          </Card>
        </div>
          </div>
        </div>
      </main>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* <SharedFooter2 /> */}
    </div>
  );
};

export default BusinessAnalytics;