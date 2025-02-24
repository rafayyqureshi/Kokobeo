import React, { useState } from 'react';
import {
  FileText, Clock, Calendar, DollarSign,
  Scale, Users, Flag, Globe, Search, X,
  Languages, Shield, MessageCircle, Tool,
  CheckCircle, AlertCircle, Info, Filter,
  MapPin, List, Grid, Star, ArrowUpRight,
  MoreHorizontal, ChevronDown, User, Menu
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const MyJobsPage = () => {
  const [selectedTab, setSelectedTab] = useState('active');
  const [viewMode, setViewMode] = useState('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState({
    jobType: 'all',
    status: 'all',
    timeframe: 'all',
    priceRange: 'all',
  });

  // Mock data for active jobs
  const activeJobs = [
    {
      id: 'JOB123',
      title: 'Full Stack Web Application',
      type: 'international',
      category: 'Development',
      description: 'Development of a web application using React and Node.js...',
      budget: 5000,
      currency: 'USD',
      status: 'in-progress',
      progress: 65,
      postedDate: '2024-01-15',
      dueDate: '2024-02-28',
      professional: {
        name: 'John Doe',
        rating: 4.8,
        reviews: 127,
        location: 'Toronto, Canada'
      },
      lastUpdate: '2 hours ago',
      unreadMessages: 3,
      milestones: [
        { name: 'Design Phase', completed: true },
        { name: 'Frontend Development', completed: true },
        { name: 'Backend Development', completed: false },
        { name: 'Testing', completed: false }
      ]
    },
    {
      id: 'JOB124',
      title: 'Emergency Plumbing Repair',
      type: 'local',
      category: 'Plumbing',
      description: 'Urgent repair needed for water leak in basement...',
      budget: 300,
      currency: 'USD',
      status: 'scheduled',
      progress: 0,
      postedDate: '2024-01-19',
      appointmentDate: '2024-01-20',
      appointmentTime: '14:00-16:00',
      professional: {
        name: 'Mike Wilson',
        rating: 4.9,
        reviews: 89,
        location: 'Local Service'
      },
      lastUpdate: '30 minutes ago',
      emergency: true
    }
  ];

  // Mock data for completed jobs
  const completedJobs = [
    {
      id: 'JOB120',
      title: 'Website Redesign Project',
      type: 'international',
      category: 'Design',
      description: 'Complete redesign of company website...',
      budget: 3500,
      currency: 'USD',
      status: 'completed',
      completionDate: '2024-01-10',
      professional: {
        name: 'Sarah Johnson',
        rating: 5.0,
        reviews: 156,
        location: 'New York, USA'
      },
      feedback: {
        given: true,
        rating: 5,
        comment: 'Excellent work and great communication'
      }
    }
  ];

  const JobCard = ({ job }) => {
    const isInternational = job.type === 'international';
    const isEmergency = job.emergency;

    return (
      <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow" style={{ textAlign: 'left' }}>
        <div className="flex flex-col gap-4">
          {/* Header Section */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 flex-wrap">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 break-words">{job.title}</h3>
                {isEmergency && (
                  <Badge variant="destructive" className="bg-red-100 text-red-800 text-xs">
                    Emergency
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs md:text-sm text-gray-600 flex-wrap mt-1">
                <span>#{job.id}</span>
                <span>•</span>
                <span>{job.category}</span>
                <span>•</span>
                <span className="whitespace-nowrap">Posted {new Date(job.postedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="shrink-0">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Progress Section */}
          {job.status !== 'completed' && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Professional Info */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <User className="h-6 w-6 text-gray-600" />
            </div>
            <div className="min-w-0">
              <div className="font-medium truncate">{job.professional.name}</div>
              <div className="flex items-center gap-1 text-sm text-gray-600 flex-wrap">
                <Star className="h-4 w-4 text-yellow-400 fill-current shrink-0" />
                <span>{job.professional.rating}</span>
                <span>({job.professional.reviews} reviews)</span>
                {job.professional.location && (
                  <>
                    <span>•</span>
                    <span className="truncate">{job.professional.location}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Job Details */}
          <div className="md:hidden grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-gray-600">Budget</div>
              <div className="font-semibold">{job.currency} {job.budget.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-gray-600">{isInternational ? 'Due Date' : 'Appointment'}</div>
              <div className="font-medium">
                {isInternational 
                  ? new Date(job.dueDate).toLocaleDateString()
                  : (
                    <>
                      {new Date(job.appointmentDate).toLocaleDateString()}
                      <div>{job.appointmentTime}</div>
                    </>
                  )
                }
              </div>
            </div>
            <div className="col-span-2">
              <Badge 
                className={`
                  ${job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'}
                `}
              >
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button className="flex items-center gap-2 text-sm w-full sm:w-auto">
              <MessageCircle className="h-4 w-4" />
              <span>{job.unreadMessages ? `Messages (${job.unreadMessages})` : 'Message'}</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-sm w-full sm:w-auto"
            >
              {isInternational ? (
                <>
                  <FileText className="h-4 w-4" />
                  <span>View Milestones</span>
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4" />
                  <span>View Schedule</span>
                </>
              )}
            </Button>
          </div>

          {/* Desktop Right Side Info */}
          {viewMode === 'list' && (
            <div className="hidden md:block border-l pl-6 w-64">
              <div className="space-y-4">
                {/* Budget */}
                <div>
                  <div className="text-sm text-gray-600">Budget</div>
                  <div className="text-lg font-semibold">
                    {job.currency} {job.budget.toLocaleString()}
                  </div>
                </div>

                {/* Due Date or Appointment */}
                <div>
                  <div className="text-sm text-gray-600">
                    {isInternational ? 'Due Date' : 'Appointment'}
                  </div>
                  <div className="font-medium">
                    {isInternational 
                      ? new Date(job.dueDate).toLocaleDateString()
                      : (
                        <>
                          {new Date(job.appointmentDate).toLocaleDateString()}
                          <br />
                          {job.appointmentTime}
                        </>
                      )
                    }
                  </div>
                </div>

                {/* Status Badge */}
                <Badge 
                  className={`
                    ${job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'completed' ? 'bg-green-100 text-green-800' :
                      job.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'}
                  `}
                >
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  const SearchInput = () => (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search jobs..."
        className="w-full pl-9 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );

  const FilterControls = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Job Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Type
        </label>
        <select
          value={filters.jobType}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            jobType: e.target.value
          }))}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="international">International</option>
          <option value="local">Local Service</option>
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            status: e.target.value
          }))}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
          <option value="pending">Pending</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* Timeframe Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timeframe
        </label>
        <select
          value={filters.timeframe}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            timeframe: e.target.value
          }))}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Time</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="last-3-months">Last 3 Months</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => setFilters(prev => ({
            ...prev,
            priceRange: e.target.value
          }))}
          className="w-full p-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Prices</option>
          <option value="under-100">Under $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1,000</option>
          <option value="over-1000">Over $1,000</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your ongoing and completed jobs</p>
          </div>
          
          <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
            <span>Post New Job</span>
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Filters Dropdown */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span>Filters & View Options</span>
            <ChevronDown className={`h-4 w-4 transform transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </Button>

          {mobileMenuOpen && (
            <div className="mt-2 p-4 bg-white rounded-lg border shadow-lg">
              {/* Mobile Tabs */}
              <div className="flex flex-col gap-2 mb-4">
                <button
                  onClick={() => setSelectedTab('active')}
                  className={`p-2 rounded-lg text-sm font-medium ${
                    selectedTab === 'active'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Active Jobs ({activeJobs.length})
                </button>
                <button
                  onClick={() => setSelectedTab('completed')}
                  className={`p-2 rounded-lg text-sm font-medium ${
                    selectedTab === 'completed'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Completed ({completedJobs.length})
                </button>
              </div>

              {/* Mobile Search */}
              <div className="mb-4">
                <SearchInput />
              </div>

              {/* Mobile View Toggle */}
              <div className="flex gap-2 mb-4">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                  <span>List</span>
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  className="flex-1 flex items-center justify-center gap-2"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                  <span>Grid</span>
                </Button>
              </div>

              {/* Mobile Filters */}
              <FilterControls />
            </div>
          )}
        </div>

        {/* Desktop Filters and Views */}
        <div className="hidden md:block bg-white border rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left side - Tabs */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedTab('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === 'active'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Active Jobs ({activeJobs.length})
              </button>
              <button
                onClick={() => setSelectedTab('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === 'completed'
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Completed ({completedJobs.length})
              </button>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Search */}
              <div className="flex-1 sm:w-64">
                <SearchInput />
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown className={`h-4 w-4 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
              </Button>

              {/* View Toggle */}
              <div className="hidden sm:flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${
                    viewMode === 'list'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${
                    viewMode === 'grid'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Grid className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Filter Panel */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t">
              <FilterControls />

              {/* Filter Actions */}
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setFilters({
                      jobType: 'all',
                      status: 'all',
                      timeframe: 'all',
                      priceRange: 'all'
                    });
                  }}
                >
                  Clear Filters
                </Button>
                <Button>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Jobs Grid/List */}
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'
            : 'space-y-4 md:space-y-6'
        }>
          {selectedTab === 'active' ? (
            activeJobs.length > 0 ? (
              activeJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Active Jobs
                </h3>
                <p className="text-gray-600 mb-4">
                  You don't have any active jobs at the moment.
                </p>
                <Button>Post a New Job</Button>
              </div>
            )
          ) : (
            completedJobs.length > 0 ? (
              completedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="mb-4">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Completed Jobs
                </h3>
                <p className="text-gray-600">
                  You haven't completed any jobs yet.
                </p>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {(selectedTab === 'active' ? activeJobs : completedJobs).length > 0 && (
          <div className="mt-6 md:mt-8 flex justify-center">
            <nav className="flex items-center gap-1 md:gap-2">
              <Button variant="outline" className="w-20 md:w-24">Previous</Button>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? 'default' : 'ghost'}
                    className="w-8 h-8 md:w-10 md:h-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button variant="outline" className="w-20 md:w-24">Next</Button>
            </nav>
          </div>
        )}
      </main>

      <div className="h-20 md:h-32"></div>

      <SharedFooter2 />
    </div>
  );
};

export default MyJobsPage;