import React, { useState } from 'react';
import { 
  CreditCard, Check, Zap, Clock, Star, AlertTriangle,
  ChevronDown, ChevronRight, Info, Shield 
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import SharedHeader from '../Headers/SharedHeader';

const PlanCard = ({ 
  title, 
  price, 
  credits,
  features, 
  isPopular,
  isEmergency = false,
  onSelect 
}) => {
  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-lg ${
      isPopular ? 'border-blue-200 shadow-md' : 'border-gray-200'
    }`}>
      {isPopular && (
        <div className="absolute top-5 right-5">
          <Badge className="bg-blue-100 text-blue-700">Popular Choice</Badge>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {isEmergency ? (
            <div className="p-2 bg-red-50 rounded-lg">
              <Zap className="h-5 w-5 text-red-500" />
            </div>
          ) : (
            <div className="p-2 bg-blue-50 rounded-lg">
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500">
              {credits} credits
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-500 mb-1">/month</span>
          </div>
        </div>

        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-1">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        <Button 
          onClick={onSelect}
          className={`w-full ${
            isEmergency 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Select Plan
        </Button>
      </div>
    </Card>
  );
};

const SubscriptionPlans = () => {
  const [selectedPlanType, setSelectedPlanType] = useState('normal');
  
  const normalPlans = [
    {
      title: "Basic",
      price: 49,
      credits: 50,
      features: [
        "Purchase individual quotes",
        "Basic profile features",
        "Standard support",
        "Credits valid for 30 days"
      ]
    },
    {
      title: "Professional",
      price: 99,
      credits: 120,
      isPopular: true,
      features: [
        "All Basic features",
        "Priority quote access",
        "Enhanced profile visibility",
        "Credits valid for 60 days",
        "Priority support"
      ]
    },
    {
      title: "Business",
      price: 199,
      credits: 300,
      features: [
        "All Professional features",
        "Dedicated account manager",
        "Advanced analytics",
        "Credits valid for 90 days",
        "24/7 premium support"
      ]
    }
  ];

  const emergencyPlans = [
    {
      title: "Emergency Basic",
      price: 99,
      credits: 50,
      isEmergency: true,
      features: [
        "24/7 emergency quote access",
        "Instant WhatsApp notifications",
        "Priority placement",
        "Basic area coverage"
      ]
    },
    {
      title: "Emergency Pro",
      price: 199,
      credits: 120,
      isEmergency: true,
      isPopular: true,
      features: [
        "All Emergency Basic features",
        "Extended area coverage",
        "Priority emergency notifications",
        "Dedicated emergency line",
        "Advanced scheduling options"
      ]
    },
    {
      title: "Emergency Premium",
      price: 299,
      credits: 300,
      isEmergency: true,
      features: [
        "All Emergency Pro features",
        "Multiple area coverage",
        "VIP emergency support",
        "Custom availability settings",
        "Guaranteed response time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader/>
      <br></br>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Subscription Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include the ability to purchase individual quotes without credits.
          </p>
        </div>

        {/* Plan Type Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border p-1 bg-white">
            <button
              onClick={() => setSelectedPlanType('normal')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlanType === 'normal'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Regular Services
            </button>
            <button
              onClick={() => setSelectedPlanType('emergency')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedPlanType === 'emergency'
                  ? 'bg-red-100 text-red-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Emergency Services
            </button>
          </div>
        </div>

        {/* Info Alert */}
        <Alert className="max-w-3xl mx-auto mb-8 bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="ml-2 text-blue-700">
            You can purchase individual quotes without a subscription. Subscriptions offer discounted rates and additional benefits.
          </AlertDescription>
        </Alert>

        {/* Plan Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {(selectedPlanType === 'normal' ? normalPlans : emergencyPlans)
            .map((plan, index) => (
              <PlanCard
                key={index}
                {...plan}
                onSelect={() => console.log('Selected plan:', plan.title)}
              />
            ))}
        </div>

        {/* Additional Info */}
<div style={{ marginTop: "48px", maxWidth: "768px", marginLeft: "auto", marginRight: "auto" }}>
  <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "24px", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}>
    <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#1f2937", marginBottom: "16px", textAlign: "left" }}>
      Additional Information
    </h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <Shield style={{ height: "20px", width: "20px", color: "#3b82f6", flexShrink: 0, marginTop: "4px" }} />
        <div>
          <h4 style={{ fontWeight: "500", color: "#1f2937", margin: "0", textAlign: "left" }}>Secure Payments</h4>
          <p style={{ fontSize: "14px", color: "#4b5563", margin: "0", textAlign: "left" }}>
            All transactions are secure and encrypted. Credits are automatically added to your account.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <Clock style={{ height: "20px", width: "20px", color: "#3b82f6", flexShrink: 0, marginTop: "4px" }} />
        <div>
          <h4 style={{ fontWeight: "500", color: "#1f2937", margin: "0", textAlign: "left" }}>Credit Validity</h4>
          <p style={{ fontSize: "14px", color: "#4b5563", margin: "0", textAlign: "left" }}>
            Credits are valid based on your subscription plan. Unused credits roll over with active subscriptions.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        <Star style={{ height: "20px", width: "20px", color: "#3b82f6", flexShrink: 0, marginTop: "4px" }} />
        <div>
          <h4 style={{ fontWeight: "500", color: "#1f2937", margin: "0", textAlign: "left" }}>Premium Features</h4>
          <p style={{ fontSize: "14px", color: "#4b5563", margin: "0", textAlign: "left" }}>
            Higher tier plans include additional features like priority access and extended support.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* FAQ Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <button className="w-full bg-white p-4 rounded-lg border hover:bg-gray-50 text-left transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  Can I purchase quotes without a subscription?
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </button>
            <button className="w-full bg-white p-4 rounded-lg border hover:bg-gray-50 text-left transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  How do emergency service plans work?
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </button>
            <button className="w-full bg-white p-4 rounded-lg border hover:bg-gray-50 text-left transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-900">
                  What happens to unused credits?
                </span>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Need help choosing a plan?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our team <ChevronRight className="inline h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;