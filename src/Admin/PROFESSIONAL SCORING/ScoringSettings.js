import React, { useState } from 'react';
import {
  Settings, Save, Sliders, Star, Clock, Shield,
  AlertCircle, MessageSquare, DollarSign, Users,
  Award, CheckCircle, ArrowUpRight, Info, Plus,
  Edit, Trash2, X, Filter, Search, VideoIcon,
  Zap, BarChart2, TrendingUp, Database, FileCheck,
  UserCheck, Store, PhoneCall, Calendar, ThumbsUp,
  Video, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/badge';
import AdminHeader from '../../Headers/AdminHeader';

const ScoringSettings = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Sample scoring categories with enhanced evaluation metrics
  const scoringCategories = [
    {
      id: 1,
      name: "Platform Activity",
      icon: Star,
      weight: 25,
      metrics: [
        {
          name: "Video Chat Usage",
          type: "activity",
          points: {
            base: 5,
            perSession: 2,
            maxMonthly: 50
          },
          conditions: [
            "Points awarded per completed video consultation",
            "Bonus for converting video chats to contracts",
            "Penalty for excessive unsuccessful video chats"
          ],
          thresholds: {
            warning: "20+ video chats without conversion",
            penalty: "30+ video chats without conversion"
          }
        },
        {
          name: "Message Response Time",
          type: "response",
          points: {
            within15min: 10,
            within1hour: 5,
            within24hours: 2
          }
        }
      ],
      bonuses: [
        {
          name: "High Conversion Rate",
          points: 15,
          condition: "70%+ video chat to contract conversion"
        }
      ],
      penalties: [
        {
          name: "Low Engagement",
          points: -10,
          condition: "Less than 10 responses per month"
        }
      ]
    },
    {
      id: 2,
      name: "Financial Performance",
      icon: DollarSign,
      weight: 30,
      metrics: [
        {
          name: "Platform Revenue",
          type: "revenue",
          points: {
            tier1: { threshold: 5000, points: 20 },
            tier2: { threshold: 10000, points: 35 },
            tier3: { threshold: 20000, points: 50 }
          },
          categoryMultipliers: {
            "Bathroom Renovation": 0.8,
            "Emergency Plumbing": 1.2,
            "Home Massage": 1.5
          }
        },
        {
          name: "Payment Compliance",
          type: "compliance",
          points: {
            platformPayments: 10,
            onTimePayment: 5
          },
          penalties: {
            offPlatformPayment: -20,
            latePayment: -5
          }
        }
      ],
      bonuses: [
        {
          name: "Consistent Growth",
          points: 20,
          condition: "3 consecutive months of revenue increase"
        }
      ]
    },
    {
      id: 3,
      name: "Contract Performance",
      icon: FileCheck,
      weight: 25,
      metrics: [
        {
          name: "Contract Completion",
          type: "completion",
          points: {
            successful: 15,
            onTime: 5,
            earlyDelivery: 8
          },
          penalties: {
            cancellation: -20,
            delay: -10
          }
        },
        {
          name: "Client Satisfaction",
          type: "satisfaction",
          points: {
            fiveStars: 10,
            fourStars: 5,
            repeatClient: 15
          }
        }
      ],
      bonuses: [
        {
          name: "Perfect Month",
          points: 30,
          condition: "All contracts completed successfully"
        }
      ]
    },
    {
      id: 4,
      name: "Platform Integrity",
      icon: Shield,
      weight: 20,
      metrics: [
        {
          name: "Terms Compliance",
          type: "compliance",
          points: {
            base: 20,
            maintained: 5
          },
          penalties: {
            termViolation: -30,
            contactSharing: -50
          }
        },
        {
          name: "Documentation",
          type: "documentation",
          points: {
            complete: 10,
            verified: 5
          }
        }
      ],
      penalties: [
        {
          name: "Serious Violation",
          points: -100,
          condition: "Proven off-platform transaction"
        }
      ]
    }
  ];

  // Mock video access settings data
  const [videoAccessSettings, setVideoAccessSettings] = useState({
    minimumTurnover: [
      { category: "Emergency Plumbing", threshold: 1000, enabled: true },
      { category: "Lawyer", threshold: 5000, enabled: false }
    ],
    mandatoryRecording: [
      { category: "Electrician", enabled: true, autoTrigger: false },
      { professionalId: "PROF123", name: "John Doe", enabled: true, autoTrigger: true }
    ],
    autoTurnoverRule: { enabled: true, defaultThreshold: 1000 },
    autoRecordingRule: { enabled: true, callsWithoutContract: 15 }
  });

  const CategoryCard = ({ category }) => (
    <Card className="p-6" style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <category.icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            <Badge className="mt-1">Weight: {category.weight}%</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            <Edit className="h-4 w-4" />
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

      {/* Metrics */}
      <div className="mt-6 space-y-6" style={{ textAlign: 'left' }}>
        {category.metrics.map((metric, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{metric.name}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMetric(metric)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            {/* Points Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(metric.points).map(([key, value]) => (
                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <Badge className="bg-green-100 text-green-700">
                      {typeof value === 'object' ? `+${value.points}` : `+${value}`} points
                    </Badge>
                  </div>
                  {value.threshold && (
                    <p className="text-xs text-gray-500 mt-1">
                      Threshold: ${value.threshold}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Conditions */}
            {metric.conditions && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Conditions:</h5>
                {metric.conditions.map((condition, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Thresholds */}
            {metric.thresholds && (
              <div className="space-y-2">
                <h5 className="text-sm font-medium text-gray-700">Thresholds:</h5>
                {Object.entries(metric.thresholds).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <AlertCircle className={`h-4 w-4 ${
                      key === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`} />
                    <span className="capitalize">{key}:</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Bonuses */}
        {category.bonuses && category.bonuses.length > 0 && (
          <div className="pt-4">
            <h4 className="font-medium mb-3">Bonus Points</h4>
            <div className="space-y-2">
              {category.bonuses.map((bonus, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{bonus.name}</span>
                    <Badge className="bg-green-100 text-green-700">
                      +{bonus.points} points
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{bonus.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Penalties */}
        {category.penalties && category.penalties.length > 0 && (
          <div className="pt-4">
            <h4 className="font-medium mb-3">Penalties</h4>
            <div className="space-y-2">
              {category.penalties.map((penalty, index) => (
                <div key={index} className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{penalty.name}</span>
                    <Badge className="bg-red-100 text-red-700">
                      {penalty.points} points
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{penalty.condition}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  // Video Access Modal Component
  const VideoAccessModal = ({ isOpen, onClose }) => {
    const [minimumTurnover, setMinimumTurnover] = useState(videoAccessSettings.minimumTurnover);
    const [mandatoryRecording, setMandatoryRecording] = useState(videoAccessSettings.mandatoryRecording);
    const [autoTurnoverRule, setAutoTurnoverRule] = useState(videoAccessSettings.autoTurnoverRule);
    const [autoRecordingRule, setAutoRecordingRule] = useState(videoAccessSettings.autoRecordingRule);

    if (!isOpen) return null;

    const handleSave = () => {
      setVideoAccessSettings({
        minimumTurnover,
        mandatoryRecording,
        autoTurnoverRule,
        autoRecordingRule
      });
      onClose();
    };

    const addTurnoverRule = () => {
      setMinimumTurnover([...minimumTurnover, { category: "", threshold: 0, enabled: false }]);
    };

    const addRecordingRule = () => {
      setMandatoryRecording([...mandatoryRecording, { category: "", enabled: false, autoTrigger: false }]);
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Video Access Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6" style={{ textAlign: 'left' }}>
            {/* Minimum Turnover for Video Access */}
            <div>
              <h3 className="font-medium mb-3">Minimum Turnover for Video Access</h3>
              <div className="space-y-4">
                {minimumTurnover.map((rule, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Category/Professional"
                      value={rule.category || rule.name || ""}
                      onChange={(e) => {
                        const newRules = [...minimumTurnover];
                        newRules[index] = { ...newRules[index], category: e.target.value };
                        setMinimumTurnover(newRules);
                      }}
                      className="px-3 py-2 border rounded-lg flex-1"
                    />
                    <input
                      type="number"
                      placeholder="Threshold ($)"
                      value={rule.threshold}
                      onChange={(e) => {
                        const newRules = [...minimumTurnover];
                        newRules[index] = { ...newRules[index], threshold: parseInt(e.target.value) || 0 };
                        setMinimumTurnover(newRules);
                      }}
                      className="px-3 py-2 border rounded-lg w-32"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => {
                          const newRules = [...minimumTurnover];
                          newRules[index] = { ...newRules[index], enabled: e.target.checked };
                          setMinimumTurnover(newRules);
                        }}
                      />
                      Enabled
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => setMinimumTurnover(minimumTurnover.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addTurnoverRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Automatic Turnover Rule</h4>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={autoTurnoverRule.enabled}
                      onChange={(e) => setAutoTurnoverRule({ ...autoTurnoverRule, enabled: e.target.checked })}
                    />
                    Enabled
                  </label>
                  <input
                    type="number"
                    value={autoTurnoverRule.defaultThreshold}
                    onChange={(e) => setAutoTurnoverRule({ ...autoTurnoverRule, defaultThreshold: parseInt(e.target.value) || 0 })}
                    className="px-3 py-2 border rounded-lg w-32"
                    placeholder="Default ($)"
                  />
                  <p className="text-sm text-gray-600">Default threshold for all categories</p>
                </div>
              </div>
            </div>

            {/* Mandatory Video Call Recording */}
            <div>
              <h3 className="font-medium mb-3">Mandatory Video Call Recording</h3>
              <div className="space-y-4">
                {mandatoryRecording.map((rule, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                    <input
                      type="text"
                      placeholder="Category/Professional ID"
                      value={rule.category || rule.professionalId || ""}
                      onChange={(e) => {
                        const newRules = [...mandatoryRecording];
                        newRules[index] = { ...newRules[index], [rule.professionalId ? 'professionalId' : 'category']: e.target.value };
                        setMandatoryRecording(newRules);
                      }}
                      className="px-3 py-2 border rounded-lg flex-1"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rule.enabled}
                        onChange={(e) => {
                          const newRules = [...mandatoryRecording];
                          newRules[index] = { ...newRules[index], enabled: e.target.checked };
                          setMandatoryRecording(newRules);
                        }}
                      />
                      Mandatory
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={rule.autoTrigger}
                        onChange={(e) => {
                          const newRules = [...mandatoryRecording];
                          newRules[index] = { ...newRules[index], autoTrigger: e.target.checked };
                          setMandatoryRecording(newRules);
                        }}
                      />
                      Auto-Trigger
                    </label>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => setMandatoryRecording(mandatoryRecording.filter((_, i) => i !== index))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addRecordingRule}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Automatic Recording Rule</h4>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={autoRecordingRule.enabled}
                      onChange={(e) => setAutoRecordingRule({ ...autoRecordingRule, enabled: e.target.checked })}
                    />
                    Enabled
                  </label>
                  <input
                    type="number"
                    value={autoRecordingRule.callsWithoutContract}
                    onChange={(e) => setAutoRecordingRule({ ...autoRecordingRule, callsWithoutContract: parseInt(e.target.value) || 0 })}
                    className="px-3 py-2 border rounded-lg w-32"
                    placeholder="Calls"
                  />
                  <p className="text-sm text-gray-600">Calls without contract before mandatory recording</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave}>Save Settings</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <AdminHeader />
      
      <main className="lg:pl-64 pt-16">
        <div className="p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Scoring Settings</h1>
                <p className="text-gray-600 mt-1">Configure professional evaluation and scoring rules</p>
              </div>
              <Button
                onClick={() => setShowCategoryModal(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>

            {/* Overview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Scoring Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Categories</div>
                  <div className="text-2xl font-semibold">4</div>
                  <div className="text-sm text-gray-600">Active scoring criteria</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Total Weight</div>
                  <div className="text-2xl font-semibold">100%</div>
                  <div className="text-sm text-gray-600">Combined category weights</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Update Frequency</div>
                  <div className="text-2xl font-semibold">Real-time</div>
                  <div className="text-sm text-gray-600">Score calculation frequency</div>
                </div>
              </div>
            </Card>

            {/* Performance Tiers */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Performance Tiers</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <h3 className="font-medium">Elite</h3>
                  </div>
                  <p className="text-sm text-gray-600">Score: 90-100</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">Advanced</h3>
                  </div>
                  <p className="text-sm text-gray-600">Score: 80-89</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h3 className="font-medium">Standard</h3>
                  </div>
                  <p className="text-sm text-gray-600">Score: 70-79</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-gray-600" />
                    <h3 className="font-medium">Basic</h3>
                  </div>
                  <p className="text-sm text-gray-600">Score: Below 70</p>
                </div>
              </div>
            </Card>

            {/* Scoring Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Scoring Categories</h2>
                <Badge variant="outline" className="bg-blue-50">
                  Total Weight: 100%
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {scoringCategories.map(category => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>

            {/* Video Access Settings */}
            <Card className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">Video Access Settings</h2>
                <Button
                  variant="outline"
                  onClick={() => setShowVideoModal(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Configure
                </Button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-gray-700" />
                      <div>
                        <h3 className="font-medium">Minimum Turnover for Video Access</h3>
                        <p className="text-sm text-gray-500">Set turnover thresholds to enable video camera</p>
                      </div>
                    </div>
                    <Badge className={videoAccessSettings.autoTurnoverRule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      Auto: {videoAccessSettings.autoTurnoverRule.enabled ? `$${videoAccessSettings.autoTurnoverRule.defaultThreshold}` : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    {videoAccessSettings.minimumTurnover.map((rule, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {rule.category || `Professional ${index + 1}`}: ${rule.threshold} {rule.enabled ? '(Enabled)' : '(Disabled)'}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-gray-700" />
                      <div>
                        <h3 className="font-medium">Mandatory Video Call Recording</h3>
                        <p className="text-sm text-gray-500">Require recording for specific categories or professionals</p>
                      </div>
                    </div>
                    <Badge className={videoAccessSettings.autoRecordingRule.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                      Auto: {videoAccessSettings.autoRecordingRule.enabled ? `${videoAccessSettings.autoRecordingRule.callsWithoutContract} calls` : 'Disabled'}
                    </Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    {videoAccessSettings.mandatoryRecording.map((rule, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        {rule.category || rule.professionalId || `Rule ${index + 1}`}: {rule.enabled ? 'Mandatory' : 'Not Mandatory'} {rule.autoTrigger ? '(Auto-Trigger)' : ''}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Settings */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Additional Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Auto-Adjustment</h3>
                    <p className="text-sm text-gray-500">Automatically adjust scores based on performance trends</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Score Decay</h3>
                    <p className="text-sm text-gray-500">Gradually decrease scores for inactive professionals</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-700">Configuring</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Performance Alerts</h3>
                    <p className="text-sm text-gray-500">Send notifications for significant score changes</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-700">Enabled</Badge>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Add Scoring Category</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Category Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1 block w-full px-3 py-2 border rounded-lg"
                    placeholder="Enter weight percentage"
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Metrics</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metric
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        className="px-3 py-2 border rounded-lg"
                        placeholder="Metric name"
                      />
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Point Value</label>
                        <input
                          type="number"
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          placeholder="Enter points"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Conditions</label>
                        <textarea
                          className="mt-1 block w-full px-3 py-2 border rounded-lg"
                          rows={3}
                          placeholder="Enter conditions"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bonuses & Penalties */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-3">Bonuses</h3>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Bonus
                  </Button>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Penalties</h3>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Penalty
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCategoryModal(false)}
                >
                  Cancel
                </Button>
                <Button>Save Category</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Access Modal */}
      <VideoAccessModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  );
};

export default ScoringSettings;