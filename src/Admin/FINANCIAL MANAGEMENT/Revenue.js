import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, ArrowRight,
  ArrowUpRight, Calendar, Download, Filter, ChevronDown,
  PieChart, BarChart2, LineChart as LineChartIcon,
  Users, Building2, Wallet, Percent, Clock, Search
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';
import SharedFooter2 from '../../Footer/SharedFooter2';

const RevenuePage = () => {
  // State management
  const [dateRange, setDateRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('gross');
  const [chartView, setChartView] = useState('line');

  // Mock revenue data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, transactions: 320, platformFees: 2250, netRevenue: 42750 },
    { month: 'Feb', revenue: 52000, transactions: 375, platformFees: 2600, netRevenue: 49400 },
    { month: 'Mar', revenue: 48000, transactions: 340, platformFees: 2400, netRevenue: 45600 },
    { month: 'Apr', revenue: 58000, transactions: 410, platformFees: 2900, netRevenue: 55100 },
    { month: 'May', revenue: 63000, transactions: 445, platformFees: 3150, netRevenue: 59850 },
    { month: 'Jun', revenue: 57000, transactions: 395, platformFees: 2850, netRevenue: 54150 },
    { month: 'Jul', revenue: 65000, transactions: 460, platformFees: 3250, netRevenue: 61750 }
  ];

  // Revenue breakdown data
  const revenueBreakdown = [
    { name: 'Local Professionals', value: 65, color: '#4F46E5' },
    { name: 'International Professionals', value: 35, color: '#10B981' }
  ];

  // Revenue by service type
  const revenueByService = [
    { service: 'Plumbing', revenue: 28000 },
    { service: 'Electrical', revenue: 22000 },
    { service: 'Legal', revenue: 18000 },
    { service: 'Consulting', revenue: 15000 },
    { service: 'Translation', revenue: 12000 }
  ];

  // Recent revenue activities
  const recentActivities = [
    {
      id: 1,
      type: 'payment',
      amount: 1250.00,
      service: 'Plumbing Service',
      provider: 'Wilson Plumbing Co.',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'refund',
      amount: 450.00,
      service: 'Legal Consultation',
      provider: 'Johnson Legal Services',
      time: '5 hours ago',
      status: 'completed'
    }
  ];

  // Calculate total revenue metrics
  const totalRevenue = monthlyRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalTransactions = monthlyRevenue.reduce((acc, curr) => acc + curr.transactions, 0);
  const averageTransactionValue = totalRevenue / totalTransactions;
  const revenueGrowth = ((monthlyRevenue[monthlyRevenue.length - 1].revenue - monthlyRevenue[0].revenue) / monthlyRevenue[0].revenue * 100).toFixed(1);

  // Revenue Overview Section
  const RevenueOverview = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-lg font-semibold">Revenue Overview</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChartView('line')}
            className={chartView === 'line' ? 'bg-blue-50' : ''}
          >
            <LineChartIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setChartView('bar')}
            className={chartView === 'bar' ? 'bg-blue-50' : ''}
          >
            <BarChart2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="h-[300px]"  style={{ textAlign: 'left' }}>
        <ResponsiveContainer width="100%" height="100%">
          {chartView === 'line' ? (
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={selectedMetric === 'gross' ? 'revenue' : 'netRevenue'}
                stroke="#4F46E5"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey={selectedMetric === 'gross' ? 'revenue' : 'netRevenue'}
                fill="#4F46E5"
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );

  // Revenue Breakdown Chart
  const RevenueBreakdownChart = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <h2 className="text-lg font-semibold mb-6">Revenue Distribution</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie
              data={revenueBreakdown}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {revenueBreakdown.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RePieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-2">
        {revenueBreakdown.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600">{item.name}</span>
            </div>
            <span className="font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );

  // Top Services by Revenue
  const TopServices = () => (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Top Services by Revenue</h2>
      <div className="space-y-4">
        {revenueByService.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">{index + 1}</span>
              </div>
              <span className="font-medium">{service.service}</span>
            </div>
            <span className="text-gray-600">${service.revenue.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </Card>
  );

  // Recent Activities
  const RecentActivities = () => (
    <Card className="p-6"  style={{ textAlign: 'left' }}>
      <h2 className="text-lg font-semibold mb-6">Recent Activities</h2>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                activity.type === 'payment' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <DollarSign className={`h-5 w-5 ${
                  activity.type === 'payment' ? 'text-green-600' : 'text-red-600'
                }`} />
              </div>
              <div>
                <p className="font-medium">{activity.service}</p>
                <p className="text-sm text-gray-500">{activity.provider}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                activity.type === 'payment' ? 'text-green-600' : 'text-red-600'
              }`}>
                {activity.type === 'payment' ? '+' : '-'}${activity.amount.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Revenue</h1>
                <p className="text-gray-600 mt-1">Track and analyze your revenue streams</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold">${totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{revenueGrowth}%</span>
                  <span className="text-gray-500 ml-1">vs. last period</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Transactions</p>
                    <p className="text-2xl font-semibold">{totalTransactions.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Wallet className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-gray-500">Last updated 5m ago</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Avg. Transaction</p>
                    <p className="text-2xl font-semibold">${averageTransactionValue.toFixed(2)}</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ArrowUpRight className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">8.2%</span>
                  <span className="text-gray-500 ml-1">vs. last period</span>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Platform Fees</p>
                    <p className="text-2xl font-semibold">$12,450</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Percent className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">12.5%</span>
                  <span className="text-gray-500 ml-1">vs. last period</span>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              <Button
                variant={selectedMetric === 'gross' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('gross')}
              >
                Gross Revenue
              </Button>
              <Button
                variant={selectedMetric === 'net' ? 'default' : 'outline'}
                onClick={() => setSelectedMetric('net')}
              >
                Net Revenue
              </Button>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <RevenueOverview />
              <RevenueBreakdownChart />
            </div>

            {/* Services and Activities Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              <TopServices />
              <RecentActivities />
            </div>

            {/* Revenue Trends */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold">Revenue Trends</h2>
                  <p className="text-sm text-gray-500 mt-1">Monthly revenue growth and patterns</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>

              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                    <tr>
                      <th className="px-6 py-3">Month</th>
                      <th className="px-6 py-3">Revenue</th>
                      <th className="px-6 py-3">Transactions</th>
                      <th className="px-6 py-3">Platform Fees</th>
                      <th className="px-6 py-3">Net Revenue</th>
                      <th className="px-6 py-3">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyRevenue.map((month, index) => {
                      const growth = index > 0
                        ? ((month.revenue - monthlyRevenue[index - 1].revenue) / monthlyRevenue[index - 1].revenue * 100).toFixed(1)
                        : 0;
                      
                      return (
                        <tr key={month.month} className="border-b">
                          <td className="px-6 py-4 font-medium">{month.month}</td>
                          <td className="px-6 py-4">${month.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4">{month.transactions}</td>
                          <td className="px-6 py-4">${month.platformFees.toLocaleString()}</td>
                          <td className="px-6 py-4">${month.netRevenue.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {growth > 0 ? (
                                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                              ) : growth < 0 ? (
                                <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                              ) : (
                                <ArrowRight className="h-4 w-4 text-gray-500 mr-1" />
                              )}
                              <span className={`${
                                growth > 0 ? 'text-green-500' :
                                growth < 0 ? 'text-red-500' :
                                'text-gray-500'
                              }`}>
                                {growth}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
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

export default RevenuePage;