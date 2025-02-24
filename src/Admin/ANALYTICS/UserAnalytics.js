import React, { useState } from 'react';
import {
  Users, TrendingUp, UserPlus, UserCheck, UserMinus,
  Activity, Calendar, Map, Filter, ArrowUp, ArrowDown,
  Globe, MapPin, PieChart, BarChart2, LineChart as LineChartIcon
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell
} from 'recharts';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter3 from '../../Footer/SharedFooter3';
import SharedFooter2 from '../../Footer/SharedFooter2';

// Mock data for visualizations
const userTrends = [
  { month: 'Jan', total: 1200, active: 950, new: 250 },
  { month: 'Feb', total: 1500, active: 1200, new: 300 },
  { month: 'Mar', total: 1800, active: 1400, new: 400 },
  { month: 'Apr', total: 2200, active: 1800, new: 450 },
  { month: 'May', total: 2800, active: 2200, new: 600 },
  { month: 'Jun', total: 3200, active: 2600, new: 550 }
];

const userSegmentation = [
  { name: 'Clients', value: 60, color: '#2563eb' },
  { name: 'Local Professionals', value: 25, color: '#16a34a' },
  { name: 'International Professionals', value: 15, color: '#9333ea' }
];

const retentionData = [
  { month: 'Jan', value: 85 },
  { month: 'Feb', value: 82 },
  { month: 'Mar', value: 88 },
  { month: 'Apr', value: 86 },
  { month: 'May', value: 89 },
  { month: 'Jun', value: 92 }
];

const UserAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);

  // Stats cards data
  const stats = [
    {
      title: 'Total Users',
      value: '12,456',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: '8,245',
      change: '+8.2%',
      trend: 'up',
      icon: UserCheck,
      color: 'green'
    },
    {
      title: 'New Users',
      value: '1,245',
      change: '+15.3%',
      trend: 'up',
      icon: UserPlus,
      color: 'purple'
    },
    {
      title: 'Churn Rate',
      value: '2.4%',
      change: '-0.8%',
      trend: 'down',
      icon: UserMinus,
      color: 'red'
    }
  ];

  // Regional distribution
  const regions = [
    { name: 'Ontario', users: 4500, change: '+12%' },
    { name: 'Quebec', users: 3200, change: '+8%' },
    { name: 'British Columbia', users: 2800, change: '+15%' },
    { name: 'Alberta', users: 1950, change: '+10%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Analytics</h1>
                <p className="text-gray-600 mt-1">Monitor and analyze user behavior and growth</p>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="day">Last 24 Hours</option>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                      <div className={`flex items-center mt-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        <span className="ml-1">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Trends */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">User Growth Trends</h2>
                    <p className="text-sm text-gray-600">Monthly user acquisition and activity</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#2563eb" 
                        strokeWidth={2}
                        name="Total Users"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="active" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        name="Active Users"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="new" 
                        stroke="#9333ea" 
                        strokeWidth={2}
                        name="New Users"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* User Segmentation */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">User Segmentation</h2>
                    <p className="text-sm text-gray-600">Distribution of user types</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartPieChart>
                      <Pie
                        data={userSegmentation}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {userSegmentation.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* User Retention */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">User Retention</h2>
                    <p className="text-sm text-gray-600">Monthly retention rates</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retentionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#2563eb" name="Retention Rate" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Regional Distribution */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Regional Distribution</h2>
                    <p className="text-sm text-gray-600">User distribution by region</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>
                <div className="space-y-4">
                  {regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{region.name}</p>
                          <p className="text-sm text-gray-500">{region.users.toLocaleString()} users</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-700">
                        {region.change}
                      </Badge>
                    </div>
                  ))}
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
      {/* <SharedFooter2/> */}
    </div>
  );
};

export default UserAnalytics;