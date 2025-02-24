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

// Mock data for client reviews
const clientMockReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    date: "2024-01-15",
    rating: 5,
    text: "Excellent service! The team demonstrated exceptional professionalism and attention to detail throughout the project.",
    project: "Website Redesign",
    authorCompany: "Tech Solutions Inc",
    verified: true,
    helpful: 145,
    notHelpful: 3,
    response: "Thank you for your kind feedback, Sarah!",
    category: "Design",
    tags: ["Professional", "On-time", "Creative"],
    engagement: {
      views: 1240,
      shares: 28,
      comments: 12
    }
  },
  {
    id: 2,
    author: "Michael Chen",
    date: "2024-01-10",
    rating: 4,
    text: "Good work on our mobile app development project. Some minor delays but overall satisfied.",
    project: "Mobile App Development",
    authorCompany: "StartUp Labs",
    verified: true,
    helpful: 89,
    notHelpful: 5,
    category: "Development",
    tags: ["Mobile", "Technical", "Innovative"],
    engagement: {
      views: 890,
      shares: 15,
      comments: 8
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

const ClientReviewsSection = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAnalytics, setShowAnalytics] = useState(true);

  const clientStats = [
    {
      icon: Star,
      label: "Reviews Given",
      value: "24",
      trend: 12,
      color: "bg-blue-600"
    },
    {
      icon: MessageCircle,
      label: "Active Discussions",
      value: "8",
      trend: 8,
      color: "bg-green-600"
    },
    {
      icon: TrendingUp,
      label: "Response Rate",
      value: "98%",
      trend: 5,
      color: "bg-purple-600"
    },
    {
      icon: Award,
      label: "Satisfaction Given",
      value: "4.8/5",
      trend: 3,
      color: "bg-yellow-600"
    }
  ];

  const filteredReviews = useMemo(() => {
    return clientMockReviews.filter(review => {
      if (filterStatus === 'all') return true;
      if (selectedCategory !== 'all' && review.category !== selectedCategory) return false;
      return true;
    });
  }, [filterStatus, selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <div className="flex-grow px-4 md:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
              <p className="text-gray-600 mt-1">Manage your reviews and feedback for services</p>
            </div>
            <Button className="flex items-center gap-2 w-full md:w-auto justify-center">
              <Edit className="h-4 w-4" />
              Write New Review
            </Button>
          </div>

          {showAnalytics && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clientStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
          )}

          <Card className="overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 md:p-6 border-b">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div className="flex flex-wrap gap-4 w-full lg:w-auto">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm flex-1 md:flex-none"
                  >
                    <option value="all">All Reviews</option>
                    <option value="given">Reviews Given</option>
                    <option value="received">Reviews Received</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm flex-1 md:flex-none"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="rating">Highest Rating</option>
                    <option value="engagement">Most Engaged</option>
                  </select>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border rounded-lg bg-white shadow-sm flex-1 md:flex-none"
                  >
                    <option value="all">All Categories</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
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
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
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
                              Verified Enterprise
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{review.authorCompany}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {review.date}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {review.engagement.comments} Comments
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
                      <Badge className="bg-blue-50 text-blue-700">
                        {review.category}
                      </Badge>
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
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 flex-1 sm:flex-none">
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  {review.response && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-sm font-medium text-blue-900">Official Response:</p>
                      <p className="mt-1 text-sm text-blue-800">{review.response}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs text-blue-600">Was this response helpful?</span>
                        <button className="text-xs text-blue-600 hover:text-blue-700">Yes</button>
                        <button className="text-xs text-blue-600 hover:text-blue-700">No</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <footer className="mt-auto bg-white border-t">
        <SharedFooter3 />
      </footer>
    </div>
  );
};

export default ClientReviewsSection;