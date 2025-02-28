import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, ThumbsUp, Edit, Trash, Filter, Calendar, User, Shield,
  BarChart2, TrendingUp, Award, MessageCircle, ChevronDown,
  ThumbsDown, Share2, Flag, Download, CheckCircle
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import SharedFooter3 from '../../Footer/SharedFooter3';
import SharedHeader4 from '../../Headers/SharedHeader4';
import SharedHeader5 from '../../Headers/SharedHeader5';

// Mock data for professional reviews
const professionalMockReviews = [
  {
    id: 1,
    author: "John Smith",
    date: "2024-01-20",
    rating: 5,
    text: "Working with this client was a pleasure. Clear requirements and excellent communication throughout.",
    project: "E-commerce Platform",
    clientCompany: "Retail Giant Corp",
    verified: true,
    helpful: 78,
    notHelpful: 2,
    payment: "Verified Payment",
    amount: "$5,000",
    category: "Development",
    tags: ["E-commerce", "Large Project", "Success"],
    status: "Completed",
    engagement: {
      views: 980,
      shares: 45,
      comments: 15
    }
  },
  {
    id: 2,
    author: "Emma Wilson",
    date: "2024-01-18",
    rating: 4,
    text: "Great client who knows what they want. Looking forward to future collaborations.",
    project: "Brand Identity",
    clientCompany: "Startup Innovators",
    verified: true,
    helpful: 45,
    notHelpful: 1,
    payment: "Verified Payment",
    amount: "$2,500",
    category: "Design",
    tags: ["Branding", "Creative", "Startup"],
    status: "In Progress",
    engagement: {
      views: 650,
      shares: 28,
      comments: 9
    }
  }
];

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <Card className="p-6 h-full">
    <div className="flex items-start justify-between">
      <div className={`rounded-full p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      {trend && (
        <Badge className={trend > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}>
          {trend > 0 ? "+" : ""}{trend}%
        </Badge>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold">{value}</h3>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
    </div>
  </Card>
);

const ProfessionalReviewsSection = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);

  const professionalStats = [
    {
      icon: Star,
      label: "Average Rating",
      value: "4.9/5",
      trend: 15,
      color: "bg-blue-600"
    },
    {
      icon: CheckCircle,
      label: "Completed Projects",
      value: "142",
      trend: 12,
      color: "bg-green-600"
    },
    {
      icon: MessageCircle,
      label: "Client Responses",
      value: "98%",
      trend: 5,
      color: "bg-purple-600"
    },
    {
      icon: Award,
      label: "Client Satisfaction",
      value: "96%",
      trend: 8,
      color: "bg-yellow-600"
    }
  ];

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = professionalMockReviews.filter(review => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'completed') return review.status === 'Completed';
      if (filterStatus === 'inProgress') return review.status === 'In Progress';
      if (selectedCategory !== 'all' && review.category !== selectedCategory) return false;
      return true;
    });

    // Sorting logic for "rating" and "most recent"
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating); // Highest rating first
    } else if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
    } else if (sortBy === 'amount') {
      filtered.sort((a, b) => {
        const amountA = parseFloat(a.amount.replace('$', '').replace(',', ''));
        const amountB = parseFloat(b.amount.replace('$', '').replace(',', ''));
        return amountB - amountA; // Highest amount first
      });
    }

    return filtered;
  }, [filterStatus, selectedCategory, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <div className="flex-grow px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Professional Reviews</h2>
              <p className="text-gray-600 mt-1">Monitor and manage client feedback and ratings</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2 flex-1 justify-center">
                <Download className="h-4 w-4" />
                Export Reviews
              </Button>
              <Button className="flex items-center gap-2 flex-1 justify-center">
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>

          {showAnalytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {professionalStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          )}

          <Card className="overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 sm:p-6 border-b">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full lg:w-auto">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm w-full sm:w-auto"
                  >
                    <option value="all">All Reviews</option>
                    <option value="completed">Completed Projects</option>
                    <option value="inProgress">In Progress</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm w-full sm:w-auto"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rating</option>
                    <option value="amount">Highest Amount</option>
                  </select>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm w-full sm:w-auto"
                  >
                    <option value="all">All Categories</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 w-full lg:w-auto justify-center"
                  onClick={() => setShowAnalytics(!showAnalytics)}
                >
                  <BarChart2 className="h-4 w-4" />
                  {showAnalytics ? 'Hide Analytics' : 'Show Analytics'}
                </Button>
              </div>
            </div>

            <div className="divide-y">
              <AnimatePresence>
                {filteredAndSortedReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 sm:p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                          {review.author.charAt(0)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold text-lg">{review.author}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="bg-green-50 text-green-700">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified Payment
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 font-medium">{review.clientCompany}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {review.date}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {review.engagement.comments} Comments
                            </span>
                            <span className="text-sm font-medium text-green-600">
                              {review.amount}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start md:items-end gap-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-5 w-5 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-50 text-blue-700">
                            {review.category}
                          </Badge>
                          <Badge className={review.status === 'Completed' ? 
                            'bg-green-50 text-green-700' : 
                            'bg-yellow-50 text-yellow-700'
                          }>
                            {review.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-gray-700 leading-relaxed">{review.text}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {review.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-50">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          <ThumbsUp className="h-4 w-4" />
                          {review.helpful}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          <ThumbsDown className="h-4 w-4" />
                          {review.notHelpful}
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                        <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                          <Flag className="h-4 w-4" />
                          Report
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                          <Edit className="h-4 w-4 mr-1" />
                          Respond
                        </Button>
                        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 flex-1 sm:flex-none">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message Client
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </div>
      </div>

      <footer className="mt-auto bg-white border-t w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SharedFooter3 />
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalReviewsSection;