import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Edit, MapPin, Globe, Star, Shield, Link as LinkIcon,
  Award, FileText, Clock, DollarSign, Briefcase, Calendar,
  Languages, Mail, Phone, MessageCircle, Upload, X, Plus,
  Settings, Check, Camera, Building, PenToolIcon, Home,
  CheckCircle, Heart, RefreshCw, Download, Search, ChevronRight,
  AlertCircle, CheckSquare, BriefcaseIcon, Users, Wrench
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';
import PreviousPage from '../components/ui/prviouspage';
import ProfileImageSection from '../components/ui/ProfileImageSection'; 

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [reviewType, setReviewType] = useState('professional');
  const [editedBio, setEditedBio] = useState('');

  const [profileData, setProfileData] = useState({
    personal: {
      name: "Emma Thompson",
      title: "Senior Project Manager",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3",
      coverPhoto: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      location: "London, United Kingdom",
      bio: "Experienced project manager with 10+ years specializing in digital transformation and innovation initiatives. Track record of successfully delivering complex projects in technology and software development. Looking for skilled professionals to bring cutting-edge projects to life.",
      email: "emma.thompson@email.com",
      phone: "+44 20 1234 5678",
      joined: "September 2023",
      lastActive: "2 hours ago",
      verified: true,
      projectsPosted: 15,
      hiredProfessionals: 12,
      successRate: 95,
      totalSpent: 125000,
      responseTime: "2 hours",
      preferredLanguages: ["English (Native)", "French (Professional)", "German (Basic)"],
      socialLinks: {
        linkedin: "https://linkedin.com/in/emmathompson",
        twitter: "https://twitter.com/emmathompson",
        website: "https://emmathompson.com"
      },
      company: {
        name: "TechVision Solutions Ltd",
        industry: "Technology & Software",
        size: "50-100 employees",
        founded: "2018",
        website: "https://techvision.com",
        description: "Leading digital transformation consultancy specializing in enterprise solutions"
      }
    },
  
    // Professional Services Stats
    stats: {
      totalInvested: "£250,000+",
      avgProjectValue: "£15,000",
      completionRate: 98,
      repeatHireRate: 85,
      avgRating: 4.9,
      totalReviews: 45
    },
  
    // Local Services Stats
    localServicesStats: {
      totalLocalHires: 45,
      emergencyCallouts: 12,
      avgResponseTime: "< 30 mins",
      preferredProviders: 8,
      totalLocalSpent: "£15,000+",
      localCompletionRate: 96
    },
  
    // Project Preferences for Professional Services
    projectPreferences: {
      projectTypes: [
        "Web Development",
        "Mobile Apps",
        "UI/UX Design",
        "Cloud Infrastructure",
        "AI/ML Integration"
      ],
      expertise: [
        "Digital Transformation",
        "Enterprise Solutions",
        "E-commerce Platforms",
        "FinTech Applications",
        "Mobile Applications"
      ],
      industries: [
        "Technology",
        "Finance",
        "E-commerce",
        "Healthcare",
        "Education"
      ]
    },

    
  
    // Local Services Preferences
    localServices: {
      activeRequests: 3,
      emergencyContacts: true,
      preferredAreas: ["North London", "Central London", "West London"],
      regularProviders: [
        {
          name: "John's Plumbing Services",
          service: "Plumbing",
          rating: 4.9,
          completedJobs: 8,
          emergency: true,
          responseTime: "< 30 mins",
          photo: "https://randomuser.me/api/portraits/men/2.jpg"
        },
        {
          name: "Elite Electrical Solutions",
          service: "Electrical",
          rating: 4.8,
          completedJobs: 6,
          emergency: true,
          responseTime: "< 1 hour",
          photo: "https://randomuser.me/api/portraits/men/3.jpg"
        }
      ],
      serviceCategories: [
        {
          category: "Plumbing",
          totalHires: 15,
          emergency: true,
          lastService: "2024-01-15",
          averageCost: "£120",
          preferredProviders: 2,
          commonIssues: [
            "Leak Repair",
            "Boiler Service",
            "Pipe Installation",
            "Emergency Repairs"
          ]
        },
        {
          category: "Electrical",
          totalHires: 12,
          emergency: true,
          lastService: "2024-01-10",
          averageCost: "£95",
          preferredProviders: 2,
          commonIssues: [
            "Wiring Installation",
            "Emergency Repairs",
            "Light Fixtures",
            "Circuit Testing"
          ]
        },
        {
          category: "Cleaning",
          totalHires: 24,
          emergency: false,
          lastService: "2024-01-18",
          averageCost: "£65",
          preferredProviders: 1,
          commonIssues: [
            "Regular Cleaning",
            "Deep Cleaning",
            "Window Cleaning",
            "Carpet Cleaning"
          ]
        },
        {
          category: "Home Repair",
          totalHires: 8,
          emergency: true,
          lastService: "2024-01-05",
          averageCost: "£150",
          preferredProviders: 1,
          commonIssues: [
            "Wall Repairs",
            "Door Installation",
            "Furniture Assembly",
            "Emergency Fixes"
          ]
        }
      ],
      emergencyServices: {
        activeProviders: [
          {
            service: "Plumbing",
            provider: "John's Emergency Plumbing",
            phone: "+44 20 7123 4567",
            rating: 4.9,
            responseTime: "< 30 mins",
            availableNow: true,
            lastUsed: "2024-01-10",
            coverage: ["All London Areas"],
            pricing: {
              calloutFee: "£85",
              hourlyRate: "£65"
            }
          },
          {
            service: "Electrical",
            provider: "Quick Electric Solutions",
            phone: "+44 20 7123 4568",
            rating: 4.8,
            responseTime: "< 1 hour",
            availableNow: true,
            lastUsed: "2024-01-15",
            coverage: ["North London", "Central London"],
            pricing: {
              calloutFee: "£75",
              hourlyRate: "£60"
            }
          }
        ],
        recentEmergencies: [
          {
            date: "2024-01-15",
            service: "Plumbing",
            issue: "Burst Pipe",
            responseTime: "25 mins",
            resolved: true,
            cost: "£195"
          },
          {
            date: "2024-01-10",
            service: "Electrical",
            issue: "Power Outage",
            responseTime: "45 mins",
            resolved: true,
            cost: "£150"
          }
        ]
      }
    },
  
    // Professional Hiring Section
    hiring: {
      activeJobs: 3,
      totalHires: 25,
      successfulProjects: 22,
      preferredSkills: [
        "React.js",
        "Node.js",
        "Python",
        "AWS",
        "UI/UX Design",
        "Mobile Development"
      ],
      hiringProcess: [
        "Initial Assessment",
        "Technical Interview",
        "Portfolio Review",
        "Trial Project",
        "Contract Discussion"
      ]
    },
  
    // Achievements
    achievements: [
      {
        icon: "award",
        title: "Top Client 2023",
        description: "Recognized for exceptional project management and professional relationships"
      },
      {
        icon: "star",
        title: "95% Success Rate",
        description: "Maintained high project success rate across all engagements"
      },
      {
        icon: "users",
        title: "Team Builder",
        description: "Successfully built and managed diverse remote teams"
      }
    ],
  
    // Reviews Section (Combined Professional and Local)
    reviews: {
      professional: [
        {
          id: 1,
          freelancer: {
            name: "John Doe",
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
            title: "Senior Full Stack Developer"
          },
          rating: 5,
          date: "2024-01-15",
          project: "E-commerce Platform Development",
          comment: "Emma is an exceptional client to work with. Clear communication, well-defined requirements, and timely feedback made the project a great success."
        }
      ],
      local: [
        {
          id: 1,
          provider: {
            name: "Mike Johnson",
            photo: "https://randomuser.me/api/portraits/men/4.jpg",
            title: "Master Plumber",
            company: "John's Plumbing Services"
          },
          rating: 5,
          date: "2024-01-18",
          service: "Emergency Plumbing",
          comment: "Great client! Clear about the emergency situation and provided easy access to the property. Prompt payment and excellent communication."
        }
      ]
    },
  
    // Active Projects (Professional)
    activeProjects: [
      {
        id: "PRJ-2024-001",
        title: "E-commerce Platform Development",
        status: "in_progress",
        completion: 75,
        budget: 25000,
        timeline: "3 months",
        startDate: "2024-01-01",
        dueDate: "2024-03-31",
        team: [
          {
            name: "John Doe",
            role: "Lead Developer",
            photo: "https://randomuser.me/api/portraits/men/1.jpg"
          },
          {
            name: "Sarah Wilson",
            role: "UI/UX Designer",
            photo: "https://randomuser.me/api/portraits/women/1.jpg"
          }
        ],
        milestones: [
          { title: "Requirements Analysis", completed: true },
          { title: "Design Phase", completed: true },
          { title: "Development", completed: false },
          { title: "Testing", completed: false },
          { title: "Deployment", completed: false }
        ],
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        nextMilestone: "Development Phase Completion"
      }
    ],
  
    // Active Local Service Requests
    activeLocalRequests: [
      {
        id: "SRV-2024-001",
        service: "Regular Cleaning",
        provider: "CleanPro Services",
        status: "scheduled",
        date: "2024-01-25",
        time: "09:00 - 12:00",
        location: "Home",
        requirements: "Deep cleaning of 3-bedroom house",
        recurring: "bi-weekly",
        cost: "£85"
      }
    ]
  });

  // Handle save changes
  const handleSaveChanges = () => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: editedBio
      }
    }));
    setIsEditing(false);
  };

  const handleProfileImageChange = (imageUrl, file) => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        photo: imageUrl
      }
    }));
    // Here you would typically handle the file upload to your backend
    console.log('File to upload:', file);
  };

  // Handle cancel changes
  const handleCancelEdit = () => {
    setEditedBio(profileData.personal.bio);
    setIsEditing(false);
  };

  // Initialize editedBio when starting to edit
  const startEditing = () => {
    setEditedBio(profileData.personal.bio);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />      
      {/* Hero Section */}
      <div className="relative h-[480px] sm:h-[400px]">
        {/* ... cover photo and gradient overlays ... */}
          {/* Cover Photo */}
  <div 
    className="absolute inset-0 bg-cover bg-center"
    style={{ 
      backgroundImage: `url(${profileData.personal.coverPhoto})`,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      backgroundBlend: 'overlay'
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
  
  {/* Profile Content */}
  <div className="absolute inset-x-0 bottom-0 px-4 pb-6 pt-20"> {/* Added padding top for mobile image */}
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center sm:items-start">
        {/* Profile Image */}
        <ProfileImageSection 
  profileData={profileData}
  onImageChange={handleProfileImageChange}
/>

        {/* Profile Info */}
        <div className="text-center sm:text-left text-white mt-4 sm:mt-0">
          <div className="space-y-1">
            <br></br>
            <h1 className="text-2xl sm:text-3xl font-bold">{profileData.personal.name}</h1>
            {/* <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <Badge variant="secondary" className="bg-green-500/20">
                Verified Client
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/20">
                Top Rated
              </Badge>
            </div> */}
            <p className="text-xl text-gray-200">{profileData.personal.title}</p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-300 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profileData.personal.location}
              </div>
              <div className="hidden sm:block">•</div>
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                {profileData.personal.company.name}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-4">
 <Button 
   onClick={() => window.location.href = 'https://kokobeo.com/client/profilesettings'}
   variant="outline" 
   className="w-full bg-black/20 border-white/20 hover:bg-black/40 text-black"
 >
   <Edit className="w-4 h-4 mr-2" />
   Edit Profile
 </Button>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <MessageCircle className="w-4 h-4 mr-2" />
          Contact
        </Button>
      </div>
    </div>
  </div>
  </div>

  

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-16 sm:mt-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                Total Investment
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.totalInvested}
              </p>
              <p className="text-sm text-gray-600">
                Across {profileData.stats.totalReviews} projects
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Success Rate
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.stats.completionRate}%
              </p>
              <p className="text-sm text-gray-600">
                Project completion rate
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BriefcaseIcon className="h-6 w-6 text-purple-600" />
              </div>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                Active Projects
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.hiring.activeJobs}
              </p>
              <p className="text-sm text-gray-600">
                Currently in progress
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                Total Hires
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900">
                {profileData.hiring.totalHires}
              </p>
              <p className="text-sm text-gray-600">
                Professionals hired
              </p>
            </div>
          </Card>
        </div>

        {/* Mobile-Optimized Tabs */}
        <div className="mb-8 border-b overflow-x-auto">
          <div className="flex whitespace-nowrap gap-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'local-services', label: 'Local Services' },
              { id: 'projects', label: 'Professional Projects' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'hiring', label: 'Hiring' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 relative ${
                  selectedTab === tab.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
                {selectedTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="lg:w-2/3 space-y-6">
            {selectedTab === 'overview' && (
              <>
                {/* About Section with Edit Functionality */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About</h2>
                  {isEditing ? (
                    <div className="space-y-4">
                      <textarea
                        value={editedBio}
                        onChange={(e) => setEditedBio(e.target.value)}
                        className="w-full p-3 border rounded-lg min-h-[150px] focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell professionals about your project needs and preferences..."
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={handleCancelEdit}
                          className="w-24"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveChanges}
                          className="w-24"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">
                      {profileData.personal.bio}
                    </p>
                  )}
                </Card>
                {/* Company Information */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Building className="h-5 w-5 text-blue-600" />
                    Company Information
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {profileData.personal.company.name}
                      </h3>
                      <p className="text-gray-600">
                        {profileData.personal.company.description}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Industry:</span>
                        <span className="font-medium">{profileData.personal.company.industry}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Company Size:</span>
                        <span className="font-medium">{profileData.personal.company.size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Founded:</span>
                        <span className="font-medium">{profileData.personal.company.founded}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Expertise & Requirements */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Project Preferences
                  </h2>
                  <div className="space-y-6">
                    {/* Project Types */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Project Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.projectPreferences.projectTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="bg-blue-50 text-blue-700">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Industry Focus */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Industry Focus</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.projectPreferences.industries.map((industry) => (
                          <Badge key={industry} variant="secondary" className="bg-purple-50 text-purple-700">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Required Expertise */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Required Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.hiring.preferredSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="bg-green-50 text-green-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Achievements */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-blue-600" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {profileData.achievements.map((achievement, index) => (
                      <div key={index} className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-2">
                          {achievement.icon === 'award' && <Award className="h-5 w-5 text-blue-600" />}
                          {achievement.icon === 'star' && <Star className="h-5 w-5 text-yellow-600" />}
                          {achievement.icon === 'users' && <Users className="h-5 w-5 text-green-600" />}
                          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {selectedTab === 'projects' && (
              <Card className="p-6">
                {/* Active Projects Content */}
                {profileData.activeProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-6 mb-6 last:mb-0">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-500">Started {project.startDate}</p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        In Progress
                      </Badge>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Project Progress</span>
                        <span>{project.completion}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${project.completion}%` }}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Budget</p>
                        <p className="font-medium">${project.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Timeline</p>
                        <p className="font-medium">{project.timeline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Due Date</p>
                        <p className="font-medium">{project.dueDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Next Milestone</p>
                        <p className="font-medium">{project.nextMilestone}</p>
                      </div>
                    </div>

                    {/* Team */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Project Team</h4>
                      <div className="flex gap-4">
                        {project.team.map((member) => (
                          <div key={member.name} className="flex items-center gap-2">
                            <img 
                              src={member.photo} 
                              alt={member.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-gray-500">{member.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium mb-2">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </Card>
            )}

{selectedTab === 'local-services' && (
  <>
    {/* Emergency Services Section */}
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-red-600" />
        Emergency Services
      </h2>
      <div className="space-y-4">
        {profileData.localServices.emergencyServices.activeProviders.map((provider, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{provider.service}</h3>
                <p className="text-sm text-gray-600">{provider.provider}</p>
              </div>
              <Badge className={`${provider.availableNow ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {provider.responseTime}
              </Badge>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{provider.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{provider.phone}</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <div className="flex justify-between mt-2">
                <span>Callout Fee:</span>
                <span>{provider.pricing.calloutFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Hourly Rate:</span>
                <span>{provider.pricing.hourlyRate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Local Services Overview */}
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Local Service Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {profileData.localServices.serviceCategories.map((service, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{service.category}</h3>
              {service.emergency && (
                <Badge className="bg-red-100 text-red-800">
                  Emergency Available
                </Badge>
              )}
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Hires:</span>
                <span className="font-medium">{service.totalHires}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Cost:</span>
                <span className="font-medium">{service.averageCost}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Service:</span>
                <span className="font-medium">{service.lastService}</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Common Services:</p>
              <div className="flex flex-wrap gap-2">
                {service.commonIssues.map((issue, issueIndex) => (
                  <Badge key={issueIndex} variant="outline" className="bg-gray-50">
                    {issue}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>

    {/* Recent Emergency Callouts */}
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Recent Emergency Callouts</h2>
      <div className="space-y-4">
        {profileData.localServices.emergencyServices.recentEmergencies.map((emergency, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{emergency.service}</h3>
                <p className="text-sm text-gray-600">{emergency.issue}</p>
              </div>
              <Badge className={`${emergency.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {emergency.resolved ? 'Resolved' : 'Pending'}
              </Badge>
            </div>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
              <div>Date: {emergency.date}</div>
              <div>Response Time: {emergency.responseTime}</div>
              <div>Cost: {emergency.cost}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  </>
)}

{selectedTab === 'reviews' && (
  <Card className="p-6">
    {/* Reviews Type Selector */}
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-semibold">Reviews</h2>
      <div className="flex gap-2">
        <Button 
          variant={reviewType === 'professional' ? 'default' : 'outline'}
          onClick={() => setReviewType('professional')}
          className="text-sm"
        >
          Professional
        </Button>
        <Button 
          variant={reviewType === 'local' ? 'default' : 'outline'}
          onClick={() => setReviewType('local')}
          className="text-sm"
        >
          Local Services
        </Button>
      </div>
    </div>

    <div className="space-y-6">
      {/* Professional Reviews */}
      {reviewType === 'professional' && profileData.reviews.professional.map((review) => (
        <div key={review.id} className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={review.freelancer.photo}
                alt={review.freelancer.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {review.freelancer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {review.freelancer.title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{review.rating}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>Project: {review.project}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{review.date}</span>
            </div>
          </div>

          <p className="text-gray-600">
            {review.comment}
          </p>
        </div>
      ))}

      {/* Local Service Reviews */}
      {reviewType === 'local' && profileData.reviews.local.map((review) => (
        <div key={review.id} className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src={review.provider.photo}
                alt={review.provider.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-medium text-gray-900">
                  {review.provider.name}
                </h3>
                <div className="text-sm text-gray-500">
                  <p>{review.provider.title}</p>
                  <p>{review.provider.company}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{review.rating}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Wrench className="w-4 h-4" />
              <span>Service: {review.service}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{review.date}</span>
            </div>
          </div>

          <p className="text-gray-600">
            {review.comment}
          </p>
        </div>
      ))}

      {((reviewType === 'professional' && profileData.reviews.professional.length === 0) ||
        (reviewType === 'local' && profileData.reviews.local.length === 0)) && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet.</p>
        </div>
      )}
    </div>
  </Card>
)}

            {selectedTab === 'hiring' && (
              <Card className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Hiring Process</h2>
                  <p className="text-gray-600">
                    Understanding our hiring process helps ensure a smooth collaboration
                  </p>
                </div>

                <div className="space-y-6">
                  {profileData.hiring.hiringProcess.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{step}</h3>
                        <p className="text-sm text-gray-600">
                          {/* Add descriptions for each step */}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Side Column */}
          <div className="lg:w-1/3 space-y-6">
            {/* Contact Information */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>{profileData.personal.company.website}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Social Profiles</h3>
                <div className="space-y-2">
                  {Object.entries(profileData.personal.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <LinkIcon className="w-4 h-4" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <SharedFooter2 />
    </div>
  );
};

export default ClientProfile;