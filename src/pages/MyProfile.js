import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added AnimatePresence to import
import {
  User, Edit, MapPin, Globe, Star, Shield, Award, FileText, Clock, DollarSign, 
  Briefcase, Languages, Mail, Phone, Link as LinkIcon, GitHub, Linkedin, Calendar, 
  Check, AlertCircle, Plus, X, Camera, MessageSquare, Heart, Tool, Building,
  Lock, Bell, Settings, Trash2, PenTool, Home, ChartAreaIcon, Menu
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';
import { BsTools } from 'react-icons/bs';
import { GiSkills } from 'react-icons/gi';

const MyProfile = () => {
  const [activeView, setActiveView] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar items (added for professional view)
  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/professionals" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Messages", href: "/MessageAndVideoCall" },
    { icon: <FileText className="h-5 w-5" />, label: "My Orders", href: "/myorders" },
    { icon: <ChartAreaIcon className="h-5 w-5" />, label: "Progress", href: "/Progress" },
    { icon: <Shield className="h-5 w-5" />, label: "Support Tickets", href: "/support" },
    { icon: <User className="h-5 w-5" />, label: "My Profile", href: "/myprofile", active: true },
    { icon: <Clock className="h-5 w-5" />, label: "Availability", href: "/availability" }, // Added as per request
    { icon: <Settings className="h-5 w-5" />, label: "Settings", href: "/Settings" }
  ];

  // Initial profile data state
  const [profileData, setProfileData] = useState({
    serviceCategories: ['Web Development', 'Mobile Development', 'Cloud Architecture'],
    reviews: [
      {
        id: 1,
        clientName: "Sarah Johnson",
        clientImage: "https://i.pravatar.cc/150?img=1",
        clientCompany: "Tech Solutions Inc.",
        rating: 5,
        projectTitle: "Complete Website Redesign",
        date: "October 2023",
        projectBudget: "$5,000",
        projectDuration: "2 months",
        review: "Exceptional work! The attention to detail and commitment to quality was outstanding. Delivered the project ahead of schedule and exceeded all expectations.",
        skills: ["Web Design", "React", "UI/UX"],
        verifiedHire: true
      },
    ],
    badges: {
      topRatedPlus: true,
      topRated: true,
      risingTalent: false,
      expertVerified: true
    },
    stats: {
      totalJobs: 186,
      inProgress: 3,
      completionRate: 98,
      onBudget: 95,
      onTime: 97,
      rehireRate: 85
    },
    personal: {
      name: "John Anderson",
      title: "Senior Full Stack Developer",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      timezone: "UTC-5",
      photo: "https://media.licdn.com/dms/image/v2/C4E03AQHAXspId9P_MQ/profile-displayphoto-shrink_200_200/0/1578866749413?e=2147483647&v=beta&t=6rpTNpxm64xOJI803JTGiPGIuVINsgtiHpDl5TAOCk0",
      hourlyRate: 85,
      location: "Toronto, Canada",
      bio: "Full stack developer with 8+ years of experience specializing in React, Node.js, and cloud architecture. Proven track record of delivering scalable solutions for enterprise clients.",
      availability: {
        regularHours: {
          monday: { start: '09:00', end: '17:00', active: true },
          tuesday: { start: '09:00', end: '17:00', active: true },
          wednesday: { start: '09:00', end: '17:00', active: true },
          thursday: { start: '09:00', end: '17:00', active: true },
          friday: { start: '09:00', end: '17:00', active: true },
          saturday: { start: '', end: '', active: false },
          sunday: { start: '', end: '', active: false }
        },
        emergencyHours: {
          monday: { start: '00:00', end: '23:59', active: true },
          tuesday: { start: '00:00', end: '23:59', active: true },
          wednesday: { start: '00:00', end: '23:59', active: true },
          thursday: { start: '00:00', end: '23:59', active: true },
          friday: { start: '00:00', end: '23:59', active: true },
          saturday: { start: '00:00', end: '23:59', active: true },
          sunday: { start: '00:00', end: '23:59', active: true }
        }
      },
      languages: ["English (Native)", "French (Professional)", "Spanish (Conversational)"],
      joined: "January 2023",
      lastActive: "2 hours ago",
      verified: true,
      rating: 4.9,
      completedProjects: 156,
      totalEarned: "125K+",
      successRate: 98
    },
    skills: [
      { name: "React.js", level: "Expert", endorsements: 45 },
      { name: "Node.js", level: "Expert", endorsements: 38 },
      { name: "TypeScript", level: "Expert", endorsements: 32 },
      { name: "AWS", level: "Advanced", endorsements: 28 },
      { name: "PostgreSQL", level: "Advanced", endorsements: 25 },
      { name: "Docker", level: "Advanced", endorsements: 22 }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
        expires: "2026"
      },
      {
        name: "Google Cloud Professional Developer",
        issuer: "Google",
        date: "2022",
        expires: "2025"
      }
    ],
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "TechCorp Inc.",
        period: "2020 - Present",
        description: "Lead developer for enterprise-scale applications",
        achievements: [
          "Led a team of 5 developers in delivering major platform updates",
          "Reduced system response time by 40% through optimization",
          "Implemented CI/CD pipeline reducing deployment time by 60%"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "Innovation Labs",
        period: "2018 - 2020",
        description: "Developed and maintained multiple client projects",
        achievements: [
          "Developed 15+ client projects with 100% satisfaction rate",
          "Introduced automated testing improving code coverage to 95%",
          "Mentored 3 junior developers"
        ]
      }
    ],
    education: [
      {
        degree: "Master of Computer Science",
        school: "University of Toronto",
        year: "2018"
      },
      {
        degree: "Bachelor of Computer Science",
        school: "University of Waterloo",
        year: "2016"
      }
    ],
    portfolio: [
      {
        title: "E-commerce Platform",
        description: "Built a scalable e-commerce platform handling 100K+ daily users",
        link: "https://project1.com",
        technologies: ["React", "Node.js", "AWS"],
        image: "/api/placeholder/400/200"
      },
      {
        title: "AI-Powered Analytics Dashboard",
        description: "Developed a real-time analytics dashboard with ML capabilities",
        link: "https://project2.com",
        technologies: ["Python", "TensorFlow", "React"],
        image: "/api/placeholder/400/200"
      }
    ],
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    notifications: {
      newMessages: true,
      projectUpdates: true,
      newsletters: false,
      marketing: false
    },
    security: {
      twoFactorEnabled: false,
      lastPasswordChange: '2024-01-15'
    }
  });

  // New state for handling modal forms
  const [modalForm, setModalForm] = useState({
    personalInfo: {},
    availability: {},
    skills: {},
    education: {},
    experience: {},
    certifications: {},
    portfolio: {}
  });

  // Enhanced handler functions for editing
  const handlePersonalInfoEdit = () => {
    setModalForm({
      ...modalForm,
      personalInfo: { ...profileData.personal }
    });
    setModalContent('personalInfo');
    setShowEditModal(true);
  };

  const handleAvailabilityEdit = () => {
    setModalForm({
      ...modalForm,
      availability: { ...profileData.personal.availability }
    });
    setModalContent('availability');
    setShowEditModal(true);
  };

  const handleSkillsEdit = () => {
    setModalForm({
      ...modalForm,
      skills: { items: [...profileData.skills] }
    });
    setModalContent('skills');
    setShowEditModal(true);
  };

  const handleEducationEdit = () => {
    setModalForm({
      ...modalForm,
      education: { items: [...profileData.education] }
    });
    setModalContent('education');
    setShowEditModal(true);
  };

  const handleExperienceEdit = () => {
    setModalForm({
      ...modalForm,
      experience: { items: [...profileData.experience] }
    });
    setModalContent('experience');
    setShowEditModal(true);
  };

  const handleCertificationsEdit = () => {
    setModalForm({
      ...modalForm,
      certifications: { items: [...profileData.certifications] }
    });
    setModalContent('certifications');
    setShowEditModal(true);
  };

  const handlePortfolioEdit = () => {
    setModalForm({
      ...modalForm,
      portfolio: { items: [...profileData.portfolio] }
    });
    setModalContent('portfolio');
    setShowEditModal(true);
  };

  // Save handlers for different sections
  const handlePersonalInfoSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        ...formData
      }
    }));
    setShowEditModal(false);
  };

  const handleAvailabilitySave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        availability: formData
      }
    }));
    setShowEditModal(false);
  };

  const handleSkillsSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      skills: formData.items
    }));
    setShowEditModal(false);
  };

  const handleEducationSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      education: formData.items
    }));
    setShowEditModal(false);
  };

  const handleExperienceSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      experience: formData.items
    }));
    setShowEditModal(false);
  };

  const handleCertificationsSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      certifications: formData.items
    }));
    setShowEditModal(false);
  };

  const handlePortfolioSave = (formData) => {
    setProfileData(prev => ({
      ...prev,
      portfolio: formData.items
    }));
    setShowEditModal(false);
  };

  // Modal Components
  const PersonalInfoModal = () => {
    const [formData, setFormData] = useState(modalForm.personalInfo);

    const handleSubmit = (e) => {
      e.preventDefault();
      handlePersonalInfoSave(formData);
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Personal Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
            <input
              type="number"
              value={formData.hourlyRate || ''}
              onChange={(e) => setFormData({ ...formData, hourlyRate: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const AvailabilityModal = () => {
    const [formData, setFormData] = useState(modalForm.availability);
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAvailabilitySave(formData);
    };

    const handleHourChange = (day, type, field, value) => {
      setFormData({
        ...formData,
        [type]: {
          ...formData[type],
          [day]: {
            ...formData[type][day],
            [field]: value
          }
        }
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Availability</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Regular Hours</h4>
            {days.map(day => (
              <div key={day} className="flex items-center gap-4 py-2">
                <div className="w-24 capitalize">{day}</div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.regularHours[day].active}
                    onChange={(e) => handleHourChange(day, 'regularHours', 'active', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                </label>
                <input
                  type="time"
                  value={formData.regularHours[day].start}
                  onChange={(e) => handleHourChange(day, 'regularHours', 'start', e.target.value)}
                  disabled={!formData.regularHours[day].active}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <span>to</span>
                <input
                  type="time"
                  value={formData.regularHours[day].end}
                  onChange={(e) => handleHourChange(day, 'regularHours', 'end', e.target.value)}
                  disabled={!formData.regularHours[day].active}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const SkillsModal = () => {
    const [formData, setFormData] = useState(modalForm.skills);
    const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner' });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSkillsSave(formData);
    };

    const addSkill = () => {
      if (newSkill.name) {
        setFormData({
          items: [...formData.items, { ...newSkill, endorsements: 0 }]
        });
        setNewSkill({ name: '', level: 'Beginner' });
      }
    };

    const removeSkill = (index) => {
      setFormData({
        items: formData.items.filter((_, i) => i !== index)
      });
    };

    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Skills</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="New skill name"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <select
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
              <Button type="button" onClick={addSkill} className="w-full sm:w-auto">
                Add
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.items.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <span className="font-medium">{skill.name}</span>
                      <select
                        value={skill.level}
                        onChange={(e) => {
                          const updatedItems = [...formData.items];
                          updatedItems[index] = { ...skill, level: e.target.value };
                          setFormData({ items: updatedItems });
                        }}
                        className="w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    <div className="text-sm text-gray-500">{skill.endorsements} endorsements</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
    
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const ExperienceModal = () => {
    const [formData, setFormData] = useState(modalForm.experience);
    const [newAchievement, setNewAchievement] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handleExperienceSave(formData);
    };

    const addExperience = () => {
      setFormData({
        items: [
          ...formData.items,
          {
            title: '',
            company: '',
            period: '',
            description: '',
            achievements: []
          }
        ]
      });
    };

    const removeExperience = (index) => {
      setFormData({
        items: formData.items.filter((_, i) => i !== index)
      });
    };

    const addAchievement = (expIndex) => {
      if (newAchievement) {
        const updatedItems = [...formData.items];
        updatedItems[expIndex] = {
          ...updatedItems[expIndex],
          achievements: [...updatedItems[expIndex].achievements, newAchievement]
        };
        setFormData({ items: updatedItems });
        setNewAchievement('');
      }
    };

    const removeAchievement = (expIndex, achievementIndex) => {
      const updatedItems = [...formData.items];
      updatedItems[expIndex] = {
        ...updatedItems[expIndex],
        achievements: updatedItems[expIndex].achievements.filter((_, i) => i !== achievementIndex)
      };
      setFormData({ items: updatedItems });
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Experience</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Button type="button" onClick={addExperience} className="mb-4">
            Add New Experience
          </Button>

          {formData.items.map((exp, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Experience {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={exp.title}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[index] = { ...exp, title: e.target.value };
                      setFormData({ items: updatedItems });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[index] = { ...exp, company: e.target.value };
                      setFormData({ items: updatedItems });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Period</label>
                <input
                  type="text"
                  value={exp.period}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...exp, period: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...exp, description: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Achievements</label>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => {
                          const updatedItems = [...formData.items];
                          updatedItems[index].achievements[achievementIndex] = e.target.value;
                          setFormData({ items: updatedItems });
                        }}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(index, achievementIndex)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Add new achievement"
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button type="button" onClick={() => addAchievement(index)}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    );
  };

  const EducationModal = () => {
    const [formData, setFormData] = useState(modalForm.education);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleEducationSave(formData);
    };

    const addEducation = () => {
      setFormData({
        items: [
          ...formData.items,
          { degree: '', school: '', year: '' }
        ]
      });
    };

    const removeEducation = (index) => {
      setFormData({
        items: formData.items.filter((_, i) => i !== index)
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Education</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Button type="button" onClick={addEducation} className="mb-4">
            Add New Education
          </Button>

          {formData.items.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Education {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...edu, degree: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">School</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...edu, school: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...edu, year: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    );
  };

  const CertificationsModal = () => {
    const [formData, setFormData] = useState(modalForm.certifications);

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCertificationsSave(formData);
    };

    const addCertification = () => {
      setFormData({
        items: [
          ...formData.items,
          { name: '', issuer: '', date: '', expires: '' }
        ]
      });
    };

    const removeCertification = (index) => {
      setFormData({
        items: formData.items.filter((_, i) => i !== index)
      });
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Certifications</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Button type="button" onClick={addCertification} className="mb-4">
            Add New Certification
          </Button>

          {formData.items.map((cert, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Certification {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...cert, name: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Issuer</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...cert, issuer: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Issued</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[index] = { ...cert, date: e.target.value };
                      setFormData({ items: updatedItems });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input
                    type="text"
                    value={cert.expires}
                    onChange={(e) => {
                      const updatedItems = [...formData.items];
                      updatedItems[index] = { ...cert, expires: e.target.value };
                      setFormData({ items: updatedItems });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    );
  };

  const PortfolioModal = () => {
    const [formData, setFormData] = useState(modalForm.portfolio);
    const [newTechnology, setNewTechnology] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      handlePortfolioSave(formData);
    };

    const addPortfolioItem = () => {
      setFormData({
        items: [
          ...formData.items,
          {
            title: '',
            description: '',
            link: '',
            technologies: [],
            image: '/api/placeholder/400/200'
          }
        ]
      });
    };

    const removePortfolioItem = (index) => {
      setFormData({
        items: formData.items.filter((_, i) => i !== index)
      });
    };

    const addTechnology = (index) => {
      if (newTechnology) {
        const updatedItems = [...formData.items];
        updatedItems[index] = {
          ...updatedItems[index],
          technologies: [...updatedItems[index].technologies, newTechnology]
        };
        setFormData({ items: updatedItems });
        setNewTechnology('');
      }
    };

    const removeTechnology = (itemIndex, techIndex) => {
      const updatedItems = [...formData.items];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        technologies: updatedItems[itemIndex].technologies.filter((_, i) => i !== techIndex)
      };
      setFormData({ items: updatedItems });
    };

    return (
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h3 className="text-xl font-semibold mb-4">Edit Portfolio</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Button type="button" onClick={addPortfolioItem} className="mb-4">
            Add New Portfolio Item
          </Button>

          {formData.items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Portfolio Item {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removePortfolioItem(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...item, title: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...item, description: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  value={item.link}
                  onChange={(e) => {
                    const updatedItems = [...formData.items];
                    updatedItems[index] = { ...item, link: e.target.value };
                    setFormData({ items: updatedItems });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Technologies</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {item.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index, techIndex)}
                        className="hover:text-blue-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newTechnology}
                    onChange={(e) => setNewTechnology(e.target.value)}
                    placeholder="Add technology"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button type="button" onClick={() => addTechnology(index)}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    );
  };

  // Modal rendering logic
  const renderModalContent = () => {
    switch (modalContent) {
      case 'personalInfo':
        return <PersonalInfoModal />;
      case 'availability':
        return <AvailabilityModal />;
      case 'skills':
        return <SkillsModal />;
      case 'education':
        return <EducationModal />;
      case 'experience':
        return <ExperienceModal />;
      case 'certifications':
        return <CertificationsModal />;
      case 'portfolio':
        return <PortfolioModal />;
      default:
        return null;
    }
  };

  // Main component return
  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      {/* Fixed Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white border-b h-16">
        <SharedHeader4 />
      </div>

      <div className="flex min-h-[calc(100vh-64px)] pt-16">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-white border-r shadow-sm overflow-y-auto">
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  item.active
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img src="https://assests.netlify.app/assets/images/logo.png" alt="Logo" className="h-8 w-8" />
                      <span className="text-blue-600 text-lg font-bold">Kokobeo</span>
                    </div>
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                  <nav className="space-y-1">
                    {sidebarItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                          item.active
                            ? 'text-blue-600 bg-blue-50 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 px-6 py-8 max-w-6xl mx-auto" style={{ textAlign: 'left' }}>
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                    <img 
                      src={imageFile || profileData.personal.photo}
                      alt={profileData.personal.name}
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute bottom-2 right-2 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 cursor-pointer">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setImageFile(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                  {profileData.personal.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1.5 rounded-full">
                      <Shield className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        {profileData.personal.name}
                        {profileData.personal.verified && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                      </h1>
                      <p className="text-lg text-gray-600">{profileData.personal.title}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {profileData.personal.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          {profileData.personal.rating} ({profileData.personal.completedProjects} reviews)
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={handlePersonalInfoEdit}
                        variant="outline"
                        className="hidden md:flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </Button>
                      <Button className="hidden md:flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Contact
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        ${profileData.personal.totalEarned}
                      </div>
                      <div className="text-sm text-gray-600">Total Earned</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {profileData.personal.completedProjects}
                      </div>
                      <div className="text-sm text-gray-600">Projects Completed</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {profileData.personal.successRate}%
                      </div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        ${profileData.personal.hourlyRate}
                      </div>
                      <div className="text-sm text-gray-600">Hourly Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column */}
              <div className="lg:w-2/3 space-y-6">
                {/* About Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">About</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePersonalInfoEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600">{profileData.personal.bio}</p>
                </Card>

                {/* Availability Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Availability</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAvailabilityEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Regular Hours</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(profileData.personal.availability.regularHours).map(([day, hours]) => (
                          hours.active && (
                            <div key={day} className="flex items-center justify-between">
                              <span className="capitalize">{day}</span>
                              <span>{hours.start} - {hours.end}</span>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Skills Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Skills</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSkillsEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {profileData.skills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{skill.name}</span>
                            <span className="text-blue-600 text-sm font-medium">
                              {skill.endorsements} endorsements
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">{skill.level}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ 
                                  width: skill.level === 'Expert' ? '100%' : 
                                         skill.level === 'Advanced' ? '75%' : 
                                         skill.level === 'Intermediate' ? '50%' : '25%'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Experience Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Work Experience</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleExperienceEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-6">
                    {profileData.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">{exp.title}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">{exp.period}</p>
                        <p className="mt-2 text-gray-600">{exp.description}</p>
                        <ul className="mt-2 space-y-1">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                              <Check className="w-4 h-4 text-green-500 mt-1" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Portfolio Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">Portfolio</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handlePortfolioEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData.portfolio.map((project, index) => (
                      <div key={index} className="border rounded-xl overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium text-lg mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, i) => (
                              <Badge key={i} className="bg-blue-50 text-blue-700">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                            onClick={() => window.open(project.link, '_blank')}
                          >
                            <Globe className="w-4 h-4" />
                            View Project
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column */}
              <div className="lg:w-1/3 space-y-6">
                {/* Certifications Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Certifications</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleCertificationsEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {profileData.certifications.map((cert, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                          <span>Issued: {cert.date}</span>
                          <span>Expires: {cert.expires}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Education Section */}
                <Card className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-semibold">Education</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleEducationEdit}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {profileData.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4 py-2">
                        <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                        <p className="text-sm text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          {showEditModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="relative max-h-[90vh] overflow-y-auto">
                {renderModalContent()}
              </div>
            </div>
          )}

          {/* Delete Account Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Account</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete your account? All of your data will be permanently removed.
                  This action cannot be undone.
                </p>
                <div className="flex justify-end gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      // Handle account deletion
                      setShowDeleteConfirm(false);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <br /><br /><br /><br />

      <SharedFooter2 />
    </div>
  );
};

export default MyProfile;