import React, { useState } from 'react';
import {
  TrendingUp, DollarSign, Users, ShoppingBag,
  ArrowUp, ArrowDown, Activity, Globe, Calendar,
  ChevronDown, Filter, Download, Map, PieChart
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, BarChart, Bar, AreaChart,
  Area
} from 'recharts';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

// Mock data for charts
const monthlyGrowth = [
  { month: 'Jan', revenue: 45000, users: 1200, services: 850 },
  { month: 'Feb', revenue: 52000, users: 1500, services: 920 },
  { month: 'Mar', revenue: 61000, users: 1800, services: 1100 },
  { month: 'Apr', revenue: 75000, users: 2200, services: 1400 },
  { month: 'May', revenue: 85000, users: 2800, services: 1650 },
  { month: 'Jun', revenue: 98000, users: 3200, services: 1900 }
];

const serviceGrowth = [
  { month: 'Jan', local: 650, international: 200 },
  { month: 'Feb', local: 720, international: 240 },
  { month: 'Mar', local: 850, international: 280 },
  { month: 'Apr', local: 1100, international: 340 },
  { month: 'May', local: 1300, international: 390 },
  { month: 'Jun', local: 1500, international: 450 }
];

const marketExpansion = [
  { month: 'Jan', cities: 12, providers: 450 },
  { month: 'Feb', cities: 15, providers: 580 },
  { month: 'Mar', cities: 18, providers: 720 },
  { month: 'Apr', cities: 22, providers: 890 },
  { month: 'May', cities: 25, providers: 1100 },
  { month: 'Jun', cities: 28, providers: 1300 }
];

const GrowthMetrics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);

  // Key metrics data
  const keyMetrics = [
    {
      title: 'Revenue Growth',
      value: '$98,000',
      change: '+28.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'User Growth',
      value: '3,200',
      change: '+22.3%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Service Growth',
      value: '1,900',
      change: '+15.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'purple'
    },
    {
      title: 'Market Expansion',
      value: '28 Cities',
      change: '+12.0%',
      trend: 'up',
      icon: Globe,
      color: 'indigo'
    }
  ];

  // Growth indicators
  const growthIndicators = [
    { name: 'Ontario', growth: 32, target: 30 },
    { name: 'Quebec', growth: 28, target: 25 },
    { name: 'British Columbia', growth: 35, target: 28 },
    { name: 'Alberta', growth: 25, target: 22 }
  ];

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Growth Metrics</h1>
                <p className="text-gray-600 mt-1">Monitor key growth indicators and trends</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
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

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {keyMetrics.map((metric, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                      <h3 className="text-lg sm:text-2xl font-semibold mt-1">{metric.value}</h3>
                      <div className={`flex items-center mt-1 ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                        <span className="ml-1">{metric.change}</span>
                      </div>
                    </div>
                    <div className={`p-2 bg-${metric.color}-100 rounded-lg`}>
                      <metric.icon className={`h-5 w-5 text-${metric.color}-600`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overall Growth Trends */}
              <Card className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Overall Growth Trends</h2>
                    <p className="text-sm text-gray-600">Revenue, users, and services growth</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="h-64 sm:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#16a34a" 
                        name="Revenue ($)"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="users" 
                        stroke="#2563eb" 
                        name="Users"
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="services" 
                        stroke="#9333ea" 
                        name="Services"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Service Type Growth */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Service Type Growth</h2>
                    <p className="text-sm text-gray-600">Local vs International services</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={serviceGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="local" 
                        stackId="1"
                        stroke="#2563eb"
                        fill="#2563eb"
                        name="Local Services"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="international" 
                        stackId="1"
                        stroke="#9333ea"
                        fill="#9333ea"
                        name="International Services"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Market Expansion */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Market Expansion</h2>
                    <p className="text-sm text-gray-600">Cities and providers growth</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={marketExpansion}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        yAxisId="left"
                        dataKey="cities" 
                        fill="#2563eb" 
                        name="Cities" 
                      />
                      <Bar 
                        yAxisId="right"
                        dataKey="providers" 
                        fill="#16a34a" 
                        name="Providers" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Regional Growth Indicators */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Regional Growth</h2>
                    <p className="text-sm text-gray-600">Growth vs targets by region</p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
                <div className="space-y-8">
                  {growthIndicators.map((region, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Map className="h-5 w-5 text-gray-400" />
                          <span className="font-semibold text-gray-900">{region.name}</span>
                        </div>
                        <Badge className="bg-green-50 text-green-700 px-3 py-1">
                          {region.growth}% Growth
                        </Badge>
                      </div>
                      <div className="relative pt-1">
                        <div className="w-full bg-green-500 rounded h-2" />
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-600">Target: {region.target}%</span>
                        <span className="text-sm text-gray-600">Current: {region.growth}%</span>
                      </div>
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
      <br></br>
      {/* <SharedFooter2/> */}
    </div>
  );
};

export default GrowthMetrics;