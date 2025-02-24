import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Medal, Crown, Search, Filter,
  ArrowUpRight, ChevronUp, ChevronDown, Download,
  Award, Shield, Clock, DollarSign, ThumbsUp, MapPin,
  Users, BarChart2, Calendar, ArrowUp, ArrowDown
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const Rankingsadmin = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Sample rankings data
  const rankings = [
    {
      id: 1,
      name: "John Smith",
      profession: "Plumber",
      region: "Toronto",
      rank: {
        overall: 1,
        category: 1,
        region: 1,
        trend: "up"
      },
      metrics: {
        rating: 4.9,
        totalJobs: 145,
        completionRate: 98,
        responseTime: "15 min",
        revenue: "$25,450",
        customerSatisfaction: 96
      },
      badges: ["Top Rated", "Fast Responder", "Emergency Pro"],
      achievements: [
        { type: "crown", label: "#1 in Plumbing" },
        { type: "star", label: "100+ 5-Star Reviews" },
        { type: "shield", label: "95%+ Success Rate" }
      ],
      performance: {
        thisMonth: {
          jobs: 28,
          revenue: "$5,890",
          rating: 4.95
        },
        trend: {
          jobs: "+12%",
          revenue: "+15%",
          rating: "+0.2"
        }
      }
    },
    {
      id: 2,
      name: "Sarah Wilson",
      profession: "Electrician",
      region: "Vancouver",
      rank: {
        overall: 2,
        category: 1,
        region: 1,
        trend: "up"
      },
      metrics: {
        rating: 4.8,
        totalJobs: 132,
        completionRate: 97,
        responseTime: "18 min",
        revenue: "$22,890",
        customerSatisfaction: 94
      },
      badges: ["Top Rated", "Quality Service"],
      achievements: [
        { type: "crown", label: "#1 in Electrical" },
        { type: "star", label: "90+ 5-Star Reviews" }
      ],
      performance: {
        thisMonth: {
          jobs: 24,
          revenue: "$4,980",
          rating: 4.85
        },
        trend: {
          jobs: "+8%",
          revenue: "+10%",
          rating: "+0.1"
        }
      }
    }
  ];

  const RankingCard = ({ professional }) => (
    <Card className="p-4 sm:p-6 hover:shadow-md transition-shadow"   style={{ textAlign: 'left' }}>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`h-10 sm:h-12 w-10 sm:w-12 rounded-full flex items-center justify-center ${
            professional.rank.overall === 1 ? 'bg-yellow-100' :
            professional.rank.overall === 2 ? 'bg-gray-100' :
            'bg-orange-100'
          }`}>
            {professional.rank.overall === 1 ? (
              <Trophy className="h-5 sm:h-6 w-5 sm:w-6 text-yellow-600" />
            ) : professional.rank.overall === 2 ? (
              <Medal className="h-5 sm:h-6 w-5 sm:w-6 text-gray-600" />
            ) : (
              <Medal className="h-5 sm:h-6 w-5 sm:w-6 text-orange-600" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-base sm:text-lg">{professional.name}</h3>
              <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm">
                #{professional.rank.overall}
              </Badge>
              {professional.rank.trend === 'up' ? (
                <Badge className="bg-green-100 text-green-700">
                  <ArrowUp className="h-3 w-3" />
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-700">
                  <ArrowDown className="h-3 w-3" />
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600 mt-1">
              <span>{professional.profession}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 sm:h-4 w-3 sm:w-4" />
                {professional.region}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <div className="text-xs sm:text-sm text-gray-500">Rating</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-base sm:text-xl font-semibold">{professional.metrics.rating}</div>
            <Star className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400 fill-current" />
          </div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500">Total Jobs</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-base sm:text-xl font-semibold">{professional.metrics.totalJobs}</div>
            <Badge className="bg-green-100 text-green-700 text-xs">
              {professional.performance.trend.jobs}
            </Badge>
          </div>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <div className="text-xs sm:text-sm text-gray-500">Revenue</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="text-base sm:text-xl font-semibold">{professional.metrics.revenue}</div>
            <Badge className="bg-green-100 text-green-700 text-xs">
              {professional.performance.trend.revenue}
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <div className="text-xs sm:text-sm text-gray-500 mb-2">Achievements</div>
        <div className="flex flex-wrap gap-2">
          {professional.achievements.map((achievement, index) => (
            <Badge 
              key={index}
              className={`flex items-center gap-1 text-xs ${
                achievement.type === 'crown' ? 'bg-yellow-100 text-yellow-700' :
                achievement.type === 'star' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}
            >
              {achievement.type === 'crown' ? <Crown className="h-3 w-3" /> :
               achievement.type === 'star' ? <Star className="h-3 w-3" /> :
               <Shield className="h-3 w-3" />}
              {achievement.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
        <div className="text-xs sm:text-sm text-gray-500 mb-2">This Month's Performance</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Jobs</div>
            <div className="mt-1 text-sm sm:text-base font-semibold">
              {professional.performance.thisMonth.jobs}
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Revenue</div>
            <div className="mt-1 text-sm sm:text-base font-semibold">
              {professional.performance.thisMonth.revenue}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="text-xs sm:text-sm text-gray-500">Rating</div>
            <div className="mt-1 text-sm sm:text-base font-semibold">
              {professional.performance.thisMonth.rating}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col"   style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="flex-1 lg:pl-64 pt-16">
        <div className="p-3 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Rankings</h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">View and analyze professional rankings</p>
              </div>
              <Button 
                variant="outline"
                className="flex items-center gap-2 text-sm w-full sm:w-auto"
              >
                <Download className="h-4 w-4" />
                Export Rankings
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Top Performers</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">85</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Trophy className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Rising Stars</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">32</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ArrowUpRight className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Categories</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">12</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart2 className="h-4 sm:h-5 w-4 sm:w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Regions</p>
                    <p className="text-lg sm:text-2xl font-semibold mt-1">8</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-green-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search professionals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-sm w-full sm:w-auto"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {showFilters ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="hvac">HVAC</option>
                  </select>

                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm bg-white"
                  >
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>

              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Rating
                          </label>
                          <select className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                            <option>All Ratings</option>
                            <option>4.5+ Stars</option>
                            <option>4.0+ Stars</option>
                            <option>3.5+ Stars</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Region
                          </label>
                          <select 
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg text-sm bg-white"
                          >
                            <option value="all">All Regions</option>
                            <option value="toronto">Toronto</option>
                            <option value="vancouver">Vancouver</option>
                            <option value="montreal">Montreal</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Achievement Level
                          </label>
                          <select className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                            <option>All Levels</option>
                            <option>Top Performers</option>
                            <option>Rising Stars</option>
                            <option>New Professionals</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>

            {/* Rankings Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {rankings.map(professional => (
                <RankingCard key={professional.id} professional={professional} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rankingsadmin;