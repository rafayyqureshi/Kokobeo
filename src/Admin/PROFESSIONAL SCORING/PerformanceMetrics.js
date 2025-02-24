import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Award, TrendingUp, Clock, Shield, Users,
  ThumbsUp, Zap, AlertTriangle, Search, Filter, Edit,
  BarChart2, ArrowUpRight, Eye, X, Calendar, Download
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import AdminHeader from '../../Headers/AdminHeader';

const PerformanceMetrics = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showProfessionalDetails, setShowProfessionalDetails] = useState(null);

  // Sample trend data
  const trendData = [
    { month: 'Jan', rating: 4.5, completion: 92, response: 95 },
    { month: 'Feb', rating: 4.6, completion: 94, response: 93 },
    { month: 'Mar', rating: 4.7, completion: 95, response: 96 },
    { month: 'Apr', rating: 4.8, completion: 96, response: 97 },
    { month: 'May', rating: 4.7, completion: 93, response: 94 },
    { month: 'Jun', rating: 4.9, completion: 97, response: 98 }
  ];

  // Sample professionals data
  const professionals = [
    {
      id: 1,
      name: "John Smith",
      profession: "Plumber",
      metrics: {
        rating: 4.9,
        completionRate: 98,
        responseTime: "15 min",
        totalJobs: 145,
        emergencyJobs: 28,
        onTimeRate: 97,
        satisfactionScore: 96,
        revenueGenerated: "$25,450"
      },
      trends: {
        rating: "↑ 0.2",
        jobs: "↑ 12%",
        revenue: "↑ 15%"
      },
      badges: ["Top Rated", "Fast Responder", "Emergency Pro"],
      status: "excellent"
    },
    {
      id: 2,
      name: "Sarah Wilson",
      profession: "Electrician",
      metrics: {
        rating: 4.7,
        completionRate: 95,
        responseTime: "22 min",
        totalJobs: 98,
        emergencyJobs: 15,
        onTimeRate: 94,
        satisfactionScore: 92,
        revenueGenerated: "$18,720"
      },
      trends: {
        rating: "↑ 0.1",
        jobs: "↑ 8%",
        revenue: "↑ 10%"
      },
      badges: ["Reliable Pro", "Quality Service"],
      status: "good"
    }
  ];

  const ProfessionalCard = ({ professional }) => (
    <Card className="p-6 hover:shadow-md transition-shadow"   style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{professional.name}</h3>
            <Badge className={
              professional.status === 'excellent' ? 'bg-green-100 text-green-700' :
              professional.status === 'good' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {professional.status.charAt(0).toUpperCase() + professional.status.slice(1)}
            </Badge>
          </div>
          <p className="text-gray-600">{professional.profession}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowProfessionalDetails(professional)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="h-4 w-4" />
              Rating
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-semibold">
                {professional.metrics.rating}
              </span>
              <Badge className="bg-green-100 text-green-700">
                {professional.trends.rating}
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Response Time
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">
                {professional.metrics.responseTime}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ThumbsUp className="h-4 w-4" />
              Satisfaction
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">
                {professional.metrics.satisfactionScore}%
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Shield className="h-4 w-4" />
              Completion Rate
            </div>
            <div className="mt-1">
              <span className="text-2xl font-semibold">
                {professional.metrics.completionRate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Award className="h-4 w-4" />
          Achievements
        </div>
        <div className="flex flex-wrap gap-2">
          {professional.badges.map((badge, index) => (
            <Badge key={index} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-500">Total Jobs</div>
          <div className="font-semibold mt-1">
            {professional.metrics.totalJobs}
            <span className="text-green-600 text-sm ml-2">
              {professional.trends.jobs}
            </span>
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Emergency Jobs</div>
          <div className="font-semibold mt-1">
            {professional.metrics.emergencyJobs}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Revenue</div>
          <div className="font-semibold mt-1">
            {professional.metrics.revenueGenerated}
            <span className="text-green-600 text-sm ml-2">
              {professional.trends.revenue}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"   style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Performance Metrics</h1>
                <p className="text-gray-600 mt-1">Monitor and analyze professional performance</p>
              </div>
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Avg Rating</p>
                    <p className="text-2xl font-semibold mt-1">4.8</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Response Rate</p>
                    <p className="text-2xl font-semibold mt-1">95%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-semibold mt-1">97%</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Top Performers</p>
                    <p className="text-2xl font-semibold mt-1">85</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Trend Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Performance Trends</h2>
                <select className="border rounded-lg px-3 py-2">
                  <option value="6">Last 6 months</option>
                  <option value="12">Last 12 months</option>
                </select>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rating" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      name="Rating"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="#16a34a"
                      strokeWidth={2}
                      name="Completion Rate"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="response" 
                      stroke="#db2777"
                      strokeWidth={2}
                      name="Response Rate"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Search and Filters */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search professionals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-5 w-5" />
                    Filters
                  </Button>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="all">All Categories</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="hvac">HVAC</option>
                </select>
              </div>
            </Card>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {professionals.map(professional => (
                <ProfessionalCard key={professional.id} professional={professional} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PerformanceMetrics;