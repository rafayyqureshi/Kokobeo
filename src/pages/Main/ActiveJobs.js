import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, MapPin, DollarSign, MessageSquare, ChevronRight,
  Calendar, AlertCircle, CheckCircle, User, Phone, Star,
  FileText, Tool, X
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import Button from '../../components/ui/Button';

const ActiveJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for active jobs
  const activeJobs = [
    {
      id: 1,
      title: "Emergency Plumbing Repair",
      customer: {
        name: "Sarah Wilson",
        rating: 4.8,
        phone: "+1 416-555-0123"
      },
      location: "123 Main St, Toronto",
      startDate: "2024-12-27",
      expectedEnd: "2024-12-27",
      status: "in-progress",
      type: "emergency",
      budget: "$350",
      escrow: true,
      description: "Water leak repair in master bathroom. Emergency service requested.",
      progress: 75,
      milestones: [
        { title: "Initial Assessment", completed: true },
        { title: "Parts Purchase", completed: true },
        { title: "Repair Work", completed: true },
        { title: "Final Testing", completed: false }
      ]
    },
    {
      id: 2,
      title: "Full House Rewiring",
      customer: {
        name: "Michael Brown",
        rating: 4.6,
        phone: "+1 416-555-0124"
      },
      location: "456 Oak Ave, Toronto",
      startDate: "2024-12-25",
      expectedEnd: "2024-12-30",
      status: "scheduled",
      type: "standard",
      budget: "$2,800",
      escrow: true,
      description: "Complete electrical system upgrade including new panel installation.",
      progress: 30,
      milestones: [
        { title: "Initial Inspection", completed: true },
        { title: "Material Procurement", completed: true },
        { title: "Wiring Installation", completed: false },
        { title: "System Testing", completed: false },
        { title: "Final Inspection", completed: false }
      ]
    }
  ];

  // Filter jobs based on status
  const filteredJobs = filterStatus === 'all' 
    ? activeJobs 
    : activeJobs.filter(job => job.status === filterStatus);

  // Job Status Badge Component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      'in-progress': { color: 'bg-blue-500', text: 'In Progress' },
      'scheduled': { color: 'bg-yellow-500', text: 'Scheduled' },
      'completed': { color: 'bg-green-500', text: 'Completed' },
      'emergency': { color: 'bg-red-500', text: 'Emergency' }
    };

    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.text}
      </Badge>
    );
  };

  // Progress Bar Component
  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className="bg-blue-600 h-2 rounded-full" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  // Job Details Modal
  const JobDetailsModal = ({ job, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Job Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="flex justify-between items-start">
            <div>
              <StatusBadge status={job.status} />
              <h2 className="text-xl font-semibold mt-2">{job.title}</h2>
              <p className="text-gray-500 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {job.location}
              </p>
            </div>
            <div className="text-right">
              <div className="text-green-600 font-medium">{job.budget}</div>
              <div className="text-sm text-gray-500 mt-1">Escrow Protected</div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-blue-900">Overall Progress</h4>
              <span className="text-blue-900">{job.progress}%</span>
            </div>
            <ProgressBar progress={job.progress} />
          </div>

          {/* Customer Info */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-3">Customer Information</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{job.customer.name}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1">{job.customer.rating}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span>{job.customer.phone}</span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            <h4 className="font-medium">Milestones</h4>
            {job.milestones.map((milestone, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <div className={`p-1 rounded-full ${
                  milestone.completed ? 'bg-green-100' : 'bg-gray-200'
                }`}>
                  <CheckCircle className={`h-4 w-4 ${
                    milestone.completed ? 'text-green-600' : 'text-gray-400'
                  }`} />
                </div>
                <span className={milestone.completed ? 'text-gray-900' : 'text-gray-500'}>
                  {milestone.title}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Customer
            </Button>
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              View Contract
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <Button
          variant={filterStatus === 'all' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('all')}
          className="text-sm"
        >
          All Jobs
        </Button>
        <Button
          variant={filterStatus === 'in-progress' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('in-progress')}
          className="text-sm"
        >
          In Progress
        </Button>
        <Button
          variant={filterStatus === 'scheduled' ? 'default' : 'outline'}
          onClick={() => setFilterStatus('scheduled')}
          className="text-sm"
        >
          Scheduled
        </Button>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <StatusBadge status={job.status} />
                  <h3 className="text-lg font-semibold mt-2">{job.title}</h3>
                  <p className="text-gray-500 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {job.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-green-600 font-medium">{job.budget}</div>
                  {job.escrow && (
                    <Badge variant="outline" className="mt-1">Escrow Protected</Badge>
                  )}
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Progress</span>
                  <span className="text-sm font-medium">{job.progress}%</span>
                </div>
                <ProgressBar progress={job.progress} />
              </div>

              {/* Customer Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{job.customer.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  {job.customer.rating}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Start: {job.startDate}
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  End: {job.expectedEnd}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4 pt-4 border-t">
                <Button 
                  className="flex-1"
                  onClick={() => setSelectedJob(job)}
                >
                  View Details
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default ActiveJobs;