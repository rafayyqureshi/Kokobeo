import React, { useState } from 'react';
import { 
  Shield, Upload, Check, X, AlertCircle, ChevronRight,
  FileText, Camera, Mail, Building, MapPin, Info
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Alert, AlertDescription } from '../components/ui/alert';
import SharedHeader from '../Headers/SharedHeader';

const VerificationStep = ({ 
  icon: Icon, 
  title, 
  description, 
  status = 'pending',
  onUpload,
  documents = []
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${
          status === 'verified' ? 'bg-green-50' :
          status === 'pending' ? 'bg-blue-50' :
          status === 'rejected' ? 'bg-red-50' : 'bg-gray-50'
        }`}>
          <Icon className={`h-6 w-6 ${
            status === 'verified' ? 'text-green-500' :
            status === 'pending' ? 'text-blue-500' :
            status === 'rejected' ? 'text-red-500' : 'text-gray-500'
          }`} />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
            {status === 'verified' ? (
              <span className="flex items-center text-sm font-medium text-green-600">
                <Check className="h-4 w-4 mr-1" />
                Verified
              </span>
            ) : status === 'rejected' ? (
              <span className="flex items-center text-sm font-medium text-red-600">
                <X className="h-4 w-4 mr-1" />
                Rejected
              </span>
            ) : null}
          </div>

          {documents.length > 0 && (
            <div className="space-y-2">
              {documents.map((doc, index) => (
                <div 
                  key={index}
                  className="flex items-center p-2 bg-gray-50 rounded-lg"
                >
                  <FileText className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 flex-1">{doc.name}</span>
                  <Check className="h-4 w-4 text-green-500" />
                </div>
              ))}
            </div>
          )}

          {status !== 'verified' && (
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={onUpload}
                className="inline-flex items-center text-sm"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
              {status === 'rejected' && (
                <Button
                  variant="outline"
                  className="inline-flex items-center text-sm text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Info className="h-4 w-4 mr-2" />
                  View Issue
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const VerifyAccount = () => {
  const [verificationSteps] = useState([
    {
      icon: Camera,
      title: "Identity Verification",
      description: "Upload a clear photo of your government-issued ID (front and back)",
      status: 'pending',
      documents: []
    },
    {
      icon: Building,
      title: "Business Registration",
      description: "Upload your business registration or Chamber of Commerce certificate",
      status: 'verified',
      documents: [
        { name: "business_registration.pdf", verified: true }
      ]
    },
    {
      icon: MapPin,
      title: "Proof of Address",
      description: "Upload a recent utility bill or bank statement showing your address",
      status: 'rejected',
      documents: [
        { name: "utility_bill.pdf", verified: false }
      ]
    },
    {
      icon: Mail,
      title: "Email Verification",
      description: "Verify your email address to receive important notifications",
      status: 'verified',
      documents: []
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleUpload = (stepIndex) => {
    // Handle document upload
    console.log('Uploading document for step:', stepIndex);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader/>
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Account Verification</h1>
          <p className="mt-2 text-gray-600">
            Complete the verification steps below to unlock all features
          </p>
        </div>

        {/* Verification Progress */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-700">50% Complete</span>
            </div>
          </div>
        </div>

        {/* Alert for Rejected Documents */}
        {verificationSteps.some(step => step.status === 'rejected') && (
          <Alert className="mb-8 bg-red-50 text-red-800 border-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="ml-2">
              One or more documents were rejected. Please review the issues and resubmit.
            </AlertDescription>
          </Alert>
        )}

        {/* Verification Steps */}
        <div className="space-y-4">
          {verificationSteps.map((step, index) => (
            <VerificationStep
              key={index}
              {...step}
              onUpload={() => handleUpload(index)}
            />
          ))}
        </div>

        {/* Next Steps */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
          <h3 className="font-medium text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Our team will review your submitted documents within 24-48 hours
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  You'll receive an email notification once the verification is complete
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Once verified, you'll have full access to all platform features
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help with verification?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support <ChevronRight className="inline h-4 w-4" />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;