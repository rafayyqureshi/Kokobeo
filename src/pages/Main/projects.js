import React, { useState } from 'react';
import { 
  Briefcase, Clock, Calendar, Filter, Search, ChevronDown,
  MessageSquare, FileText, CheckCircle, AlertCircle, XCircle,
  Zap, DollarSign, Star, MoreVertical, ArrowUpRight
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-gray-100 text-gray-700',
    emergency: 'bg-red-100 text-red-700'
  };

  const icons = {
    active: CheckCircle,
    pending: Clock,
    completed: CheckCircle,
    cancelled: XCircle,
    emergency: Zap
  };

  const Icon = icons[status];

  return (
    <Badge className={`${styles[status]} inline-flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      <span className="capitalize">{status}</span>
    </Badge>
  );
};

const ProjectCard = ({ project }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              project.type === 'emergency' ? 'bg-red-50' : 'bg-blue-50'
            }`}>
              {project.type === 'emergency' ? (
                <Zap className="h-5 w-5 text-red-500" />
              ) : (
                <Briefcase className="h-5 w-5 text-blue-500" />
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.client}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <StatusBadge status={project.status} />
            <span className="text-gray-500">{project.date}</span>
          </div>

          <p className="text-sm text-gray-600">
            {project.description}
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            {project.amount && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>${project.amount}</span>
              </div>
            )}
            {project.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>{project.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600">
            <FileText className="h-4 w-4 mr-2" />
            Details
          </Button>
        </div>
        <Button size="sm">
          View Project
          <ArrowUpRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

const ProjectsPage = () => {
  const [selectedView, setSelectedView] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock data
  const projects = [
    {
      id: 1,
      title: "Emergency Plumbing Repair",
      client: "John Anderson",
      status: "active",
      type: "emergency",
      date: "Today, 2:30 PM",
      description: "Water leak repair in master bathroom requiring immediate attention",
      amount: "150.00"
    },
    {
      id: 2,
      title: "Kitchen Renovation Quote",
      client: "Sarah Williams",
      status: "pending",
      type: "quote",
      date: "Yesterday",
      description: "Complete kitchen renovation including appliances and fixtures",
      amount: "5,000.00"
    },
    {
      id: 3,
      title: "Electrical Installation",
      client: "Michael Brown",
      status: "completed",
      type: "regular",
      date: "Dec 24, 2024",
      description: "Full house electrical wiring and installation",
      amount: "2,500.00",
      rating: 4.8
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600">Manage your quotes, ongoing work, and project history</p>
          </div>
          
          <div className="flex gap-4">
            <Button>
              <FileText className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Quotes</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-gray-900">45</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Emergency</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select 
              className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="emergency">Emergency</option>
            </select>

            <select
              className="border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="quotes">Quotes</option>
              <option value="hired">Direct Hire</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 3 of 24 projects
          </p>
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;