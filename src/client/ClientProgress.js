import React from 'react';
import {
  Trophy,
  Star,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Award,
  Briefcase,
  Heart,
  ThumbsUp
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const ProgressPage = () => {
  // Mock data for user progress
  const progressData = {
    level: 3,
    totalSpent: 12500,
    completedProjects: 15,
    activeProjects: 2,
    totalReviews: 12,
    averageRating: 4.8,
    memberSince: '2023-06-15',
    achievements: [
      {
        id: 1,
        title: 'Early Adopter',
        description: 'Joined in the first year',
        icon: <Star className="h-6 w-6 text-yellow-500" />,
        achieved: true
      },
      {
        id: 2,
        title: 'Power Client',
        description: 'Completed 10+ projects',
        icon: <Trophy className="h-6 w-6 text-yellow-500" />,
        achieved: true
      },
      {
        id: 3,
        title: 'Top Spender',
        description: 'Spent over $10,000',
        icon: <Award className="h-6 w-6 text-yellow-500" />,
        achieved: true
      },
      {
        id: 4,
        title: 'Trusted Reviewer',
        description: 'Left 10+ reviews',
        icon: <ThumbsUp className="h-6 w-6 text-gray-400" />,
        achieved: false,
        progress: 8
      }
    ],
    recentMilestones: [
      {
        date: '2024-01-15',
        title: 'Completed 15th Project',
        description: 'Successfully finished mobile app development project'
      },
      {
        date: '2024-01-10',
        title: 'Reached Level 3',
        description: 'Unlocked new platform benefits'
      },
      {
        date: '2023-12-28',
        title: '$10,000 Spent',
        description: 'Achieved Power Client status'
      }
    ]
  };

  // Calculate level progress
  const levelProgress = 75; // Example progress percentage
  const nextLevelRequirements = [
    'Complete 5 more projects',
    'Maintain 4.8+ rating',
    'Spend $2,500 more'
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Progress</h1>
          <p className="text-gray-600 mt-1">Track your journey and achievements</p>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 p-6 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">L{progressData.level}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Level {progressData.level} Client</h2>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
              <p className="text-gray-600 mb-4">
                {levelProgress}% progress to Level {progressData.level + 1}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {nextLevelRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Projects Completed</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">
                {progressData.completedProjects}
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">
                ${progressData.totalSpent.toLocaleString()}
              </span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-semibold text-gray-900">
                  {progressData.averageRating}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(progressData.averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Reviews Given</h3>
            <div className="mt-2">
              <span className="text-2xl font-semibold text-gray-900">
                {progressData.totalReviews}
              </span>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <Card className="mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Achievements</h2>
            <p className="text-sm text-gray-600">Unlock badges as you reach milestones</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            {progressData.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.achieved ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    {!achievement.achieved && achievement.progress && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(achievement.progress / 10) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {achievement.progress}/10 completed
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Milestones */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Recent Milestones</h2>
            <p className="text-sm text-gray-600">Your latest achievements</p>
          </div>
          
          <div className="divide-y">
            {progressData.recentMilestones.map((milestone, index) => (
              <div key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <div className="h-32"></div>
      <SharedFooter2 />
    </div>
  );
};

export default ProgressPage;