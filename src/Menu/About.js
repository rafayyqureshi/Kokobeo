import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Globe, Star, Shield, Award, Briefcase,
  Heart, Map, ChevronRight, Leaf, Tool, Check,
  PenToolIcon
} from 'lucide-react';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader from '../Headers/SharedHeader';

const AboutPage2 = () => {
  const stats = [
    { icon: <Users />, value: '500K+', label: 'Active Professionals' },
    { icon: <Globe />, value: '50+', label: 'Countries' },
    { icon: <Star />, value: '4.8', label: 'Average Rating' },
    { icon: <Shield />, value: '98%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: <Shield className="text-blue-600" />,
      title: 'Trust & Safety',
      description: 'Verified professionals and secure transactions'
    },
    {
      icon: <Heart className="text-red-600" />,
      title: 'Customer First',
      description: 'Focused on exceptional service quality'
    },
    {
      icon: <Leaf className="text-green-600" />,
      title: 'Sustainability',
      description: 'Promoting eco-friendly practices'
    },
    {
      icon: <PenToolIcon className="text-purple-600" />,
      title: 'Innovation',
      description: 'Cutting-edge solutions for service delivery'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader />
      
      {/* Hero Section */}
      <div className="relative bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              Connecting People with Professional Services
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Kokobeo is a global platform connecting skilled professionals with clients, 
              making service booking simple, reliable, and efficient.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-3 bg-blue-50 rounded-lg mb-4">
                {React.cloneElement(stat.icon, { className: "w-6 h-6 text-blue-600" })}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're on a mission to transform how people access professional services. 
              By combining technology with human expertise, we create opportunities for 
              professionals while making service booking seamless for clients.
            </p>
            <div className="space-y-4">
              {[
                'Empower professionals to grow their business',
                'Ensure quality and reliability in service delivery',
                'Make professional services accessible to everyone',
                'Build trust through transparency and verification'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Global Impact Section */}
      <div className="bg-gradient-to-b from-blue-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Global Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're making a difference in communities worldwide by connecting skilled 
              professionals with clients who need their services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Economic Growth',
                description: 'Supporting local economies by creating opportunities for professionals',
                icon: <Briefcase className="text-blue-600" />
              },
              {
                title: 'Community Building',
                description: 'Fostering strong local service networks and professional communities',
                icon: <Users className="text-green-600" />
              },
              {
                title: 'Service Excellence',
                description: 'Setting new standards for professional service delivery',
                icon: <Award className="text-purple-600" />
              }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="inline-block p-3 bg-gray-50 rounded-lg mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Whether you're a professional looking to grow your business or a client 
            seeking quality services, Kokobeo is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Find a Professional
            </button>
            <button className="px-8 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Become a Professional
            </button>
          </div>
        </div>
      </div>

      <SharedFooter2 />
    </div>
  );
};

export default AboutPage2;