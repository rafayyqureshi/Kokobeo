import React, { useState } from 'react';
import { 
  AlertTriangle, Trash2, Info, X, Lock, Shield, 
  CheckCircle2, AlertCircle, Eye, EyeOff 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/card';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';

const DeleteAccount = () => {
  // Form state
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // List of reasons for deletion
  const reasons = [
    "No longer need the service",
    "Found a better alternative",
    "Privacy concerns",
    "Too expensive",
    "Technical issues",
    "Other (please specify)"
  ];

  // Items that will be deleted
  const deletionItems = [
    "Account profile and personal information",
    "All projects and work history",
    "Messages and communication history",
    "Payment information",
    "Reviews and ratings",
    "Portfolio items and uploaded files"
  ];

  // Handle reason selection
  const handleReasonChange = (selectedReason) => {
    setReason(selectedReason);
    if (selectedReason !== 'Other (please specify)') {
      setCustomReason('');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      // Validate confirmation text
      if (confirmation.toLowerCase() !== 'delete my account') {
        throw new Error('Please type the confirmation text exactly as shown');
      }

      // Validate password
      if (!password) {
        throw new Error('Please enter your password');
      }

      // Validate reason
      if (!reason) {
        throw new Error('Please select a reason for deletion');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle successful deletion
      // In a real application, you would handle the logout and redirect here
      window.location.href = '/'; // Redirect to homepage after deletion

    } catch (err) {
      setError(err.message || 'Failed to delete account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader4 />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Delete Account</h1>
          </div>

          {/* Warning Message */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">Warning: This action cannot be undone</h3>
                <p className="mt-1 text-sm text-red-700">
                  Deleting your account will permanently remove all your data from our system.
                  This action cannot be reversed.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 1: Items to be Deleted */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">The following items will be deleted:</h2>
                <div className="space-y-3">
                  {deletionItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <X className="h-4 w-4 text-red-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="w-full"
              >
                I understand, continue to deletion
              </Button>
            </div>
          )}

          {/* Step 2: Reason for Deletion */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">Why are you deleting your account?</h2>
                <div className="space-y-3">
                  {reasons.map((r) => (
                    <label
                      key={r}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                        reason === r ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r}
                        checked={reason === r}
                        onChange={() => handleReasonChange(r)}
                        className="sr-only"
                      />
                      <span>{r}</span>
                    </label>
                  ))}
                </div>

                {reason === 'Other (please specify)' && (
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="Please tell us more..."
                    className="mt-4 w-full p-3 border rounded-lg"
                    rows={3}
                  />
                )}
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!reason || (reason === 'Other (please specify)' && !customReason)}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Final Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              {/* Password Verification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verify Your Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 pr-10 border rounded-lg"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirmation Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type "delete my account" to confirm
                </label>
                <input
                  type="text"
                  value={confirmation}
                  onChange={(e) => setConfirmation(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="delete my account"
                />
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={() => setStep(2)}
                  variant="outline"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isSubmitting || 
                    !password || 
                    confirmation.toLowerCase() !== 'delete my account'
                  }
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isSubmitting ? 'Deleting Account...' : 'Delete Account'}
                </Button>
              </div>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Need Help?</h3>
                <p className="mt-1 text-sm text-gray-600">
                  If you're experiencing issues with our service, our support team is here to help.
                  Consider reaching out to us before deleting your account.
                </p>
                <Button
                  variant="link"
                  className="mt-2 text-blue-600 hover:text-blue-700 p-0"
                  onClick={() => window.location.href = '/support'}
                >
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <div className="mt-auto">
        <SharedFooter2 />
      </div>
    </div>
  );
};

export default DeleteAccount;