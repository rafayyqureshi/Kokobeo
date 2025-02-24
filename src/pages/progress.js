import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Award, Star, Users, Clock, DollarSign, 
  ChevronUp, ChevronDown, Calendar, CheckCircle,
  BarChart2, PieChart, Activity, Target
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const ProgressDashboard = () => {
  // Mock data - In production, this would come from your API
  const [timeframe, setTimeframe] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('earnings');

  const performanceData = {
    earnings: {
      current: 3250,
      previous: 2800,
      percentageChange: 16
    },
    jobSuccess: {
      current: 98,
      previous: 95,
      percentageChange: 3
    },
    completionRate: {
      current: 95,
      previous: 92,
      percentageChange: 3
    },
    responseRate: {
      current: 99,
      previous: 97,
      percentageChange: 2
    }
  };

  const recentMilestones = [
    { title: "100 Jobs Completed", date: "2024-01-15", icon: CheckCircle },
    { title: "Top Rated Status Achieved", date: "2024-01-10", icon: Star },
    { title: "1 Year Active Member", date: "2024-01-05", icon: Award }
  ];

  const skillProgress = [
    { skill: "Communication", progress: 95 },
    { skill: "Quality of Work", progress: 92 },
    { skill: "Deadline Adherence", progress: 98 },
    { skill: "Professionalism", progress: 96 }
  ];

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Professional Progress</h1>
          <p className="text-gray-600 mt-1">Track your performance and growth</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-6">
          {['week', 'month', 'quarter', 'year'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === period
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Earnings Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all ${
              selectedMetric === 'earnings' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric('earnings')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className={`flex items-center ${
                  performanceData.earnings.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {performanceData.earnings.percentageChange >= 0 ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                  {Math.abs(performanceData.earnings.percentageChange)}%
                </span>
                <span className="text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              ${performanceData.earnings.current}
            </h3>
            <p className="text-sm text-gray-600 mt-1">Total Earnings</p>
          </Card>

          {/* Job Success Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all ${
              selectedMetric === 'jobSuccess' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric('jobSuccess')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ChevronUp className="h-4 w-4" />
                  {performanceData.jobSuccess.percentageChange}%
                </span>
                <span className="text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {performanceData.jobSuccess.current}%
            </h3>
            <p className="text-sm text-gray-600 mt-1">Job Success Rate</p>
          </Card>

          {/* Completion Rate Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all ${
              selectedMetric === 'completionRate' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric('completionRate')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ChevronUp className="h-4 w-4" />
                  {performanceData.completionRate.percentageChange}%
                </span>
                <span className="text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {performanceData.completionRate.current}%
            </h3>
            <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
          </Card>

          {/* Response Rate Card */}
          <Card 
            className={`p-6 cursor-pointer transition-all ${
              selectedMetric === 'responseRate' ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setSelectedMetric('responseRate')}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-green-600 flex items-center">
                  <ChevronUp className="h-4 w-4" />
                  {performanceData.responseRate.percentageChange}%
                </span>
                <span className="text-gray-500">vs last {timeframe}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {performanceData.responseRate.current}%
            </h3>
            <p className="text-sm text-gray-600 mt-1">Response Rate</p>
          </Card>
        </div>

        {/* Skill Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Progress</h3>
            <div className="space-y-4">
              {skillProgress.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                    <span className="text-sm text-gray-600">{skill.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${skill.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Milestones */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Milestones</h3>
            <div className="space-y-4">
              {recentMilestones.map((milestone, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <milestone.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{milestone.title}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Goals Section */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Current Goals</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All Goals
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Monthly Earnings</span>
                <span className="text-sm text-gray-600">$3,250 / $5,000</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: '65%' }} />
              </div>
              <p className="text-sm text-gray-600">65% achieved</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Client Satisfaction</span>
                <span className="text-sm text-gray-600">4.8 / 5.0</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '96%' }} />
              </div>
              <p className="text-sm text-gray-600">96% achieved</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Projects Completed</span>
                <span className="text-sm text-gray-600">18 / 20</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '90%' }} />
              </div>
              <p className="text-sm text-gray-600">90% achieved</p>
            </div>
          </div>
        </Card>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Footer Actions - Mobile Only */}
      <SharedFooter2/>
    </div>
  );
};

export default ProgressDashboard;