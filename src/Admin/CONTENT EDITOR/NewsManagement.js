import React, { useState } from 'react';
import {
  Newspaper, Clock, Calendar, Eye, ArrowUpRight,
  History, Globe, Edit, Trash2, Plus, Search,
  Filter, Image as ImageIcon, Send, CheckCircle,
  LanguagesIcon, Users, RefreshCw, Tag, Share2,
  ThumbsUp, MessageSquare, BookmarkIcon
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const NewsManagement = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample articles data
  const articles = [
    {
      id: 1,
      title: "Platform Update: New Features Released",
      category: "Product Updates",
      status: "published",
      author: "Admin Team",
      publishDate: "2024-02-10",
      featuredImage: "/placeholder.jpg",
      excerpt: "Exciting new features have been added to enhance user experience...",
      content: "Full article content here...",
      tags: ["Features", "Updates", "Platform"],
      visibility: "public",
      translations: ["French", "Spanish"],
      engagement: {
        views: 1245,
        likes: 89,
        comments: 32,
        shares: 45
      },
      settings: {
        featured: true,
        commentsEnabled: true,
        sharingEnabled: true,
        notificationsEnabled: true
      }
    },
    {
      id: 2,
      title: "Important Service Maintenance Notice",
      category: "Announcements",
      status: "scheduled",
      author: "System Admin",
      publishDate: "2024-02-15",
      featuredImage: "/placeholder.jpg",
      excerpt: "Scheduled maintenance window for system upgrades...",
      content: "Full notice content here...",
      tags: ["Maintenance", "System"],
      visibility: "all-users",
      translations: [],
      engagement: {
        views: 0,
        likes: 0,
        comments: 0,
        shares: 0
      },
      settings: {
        featured: false,
        commentsEnabled: false,
        sharingEnabled: true,
        notificationsEnabled: true
      }
    }
  ];

  const ArticleCard = ({ article }) => (
    <Card className="p-6">
      <div className="flex justify-between items-start"   style={{ textAlign: 'left' }}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{article.title}</h3>
            <Badge className={
              article.status === 'published' ? 'bg-green-100 text-green-700' :
              article.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }>
              {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            {article.author}
            <span className="text-gray-400">|</span>
            <Calendar className="h-4 w-4" />
            {article.publishDate}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedArticle(article)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Article Preview */}
      <div className="mt-4">
        <div className="aspect-video bg-gray-100 rounded-lg mb-4">
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <p className="text-gray-600">{article.excerpt}</p>
      </div>

      {/* Tags */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Views</span>
          </div>
          <p className="font-semibold mt-1">{article.engagement.views}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm">Likes</span>
          </div>
          <p className="font-semibold mt-1">{article.engagement.likes}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">Comments</span>
          </div>
          <p className="font-semibold mt-1">{article.engagement.comments}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-gray-500">
            <Share2 className="h-4 w-4" />
            <span className="text-sm">Shares</span>
          </div>
          <p className="font-semibold mt-1">{article.engagement.shares}</p>
        </div>
      </div>

      {/* Settings & Translations */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex justify-between">
          <div className="space-x-2">
            <Badge className={article.settings.featured ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}>
              {article.settings.featured ? 'Featured' : 'Not Featured'}
            </Badge>
            <Badge className={article.settings.commentsEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
              Comments {article.settings.commentsEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {article.translations.length} translations
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
              <div className="text-left">
                <h1 className="text-2xl font-bold text-gray-900">News Management</h1>
                <p className="text-gray-600 mt-1">Create and manage platform news and announcements</p>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={() => setSelectedArticle({})}
              >
                <Plus className="h-4 w-4" />
                Create Article
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Articles</p>
                    <p className="text-2xl font-semibold mt-1">24</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Newspaper className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Published</p>
                    <p className="text-2xl font-semibold mt-1">18</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-2xl font-semibold mt-1">12.5k</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Eye className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="text-2xl font-semibold mt-1">8.2%</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <ArrowUpRight className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Filters */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1 sm:min-w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                  </div>
                  <Button
                    variant="outline"
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
                  <option value="updates">Product Updates</option>
                  <option value="announcements">Announcements</option>
                  <option value="guides">Guides & Tutorials</option>
                </select>
              </div>
            </Card>

            {/* Articles List */}
            <div className="grid grid-cols-1 gap-6">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsManagement;