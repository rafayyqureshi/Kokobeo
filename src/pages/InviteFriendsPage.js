import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { 
  Mail, 
  Copy, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import SharedHeader from '../Headers/SharedHeader';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader11 from '../Headers/SharedHeader11';

const InviteFriends = () => {
  const [copied, setCopied] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  
  const referralCode = 'KOKOBEO2025';
  const referralLink = `https://kokobeo.com/register?ref=${referralCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleEmailInvite = async (e) => {
    e.preventDefault();
    try {
      setIsSharing(true);
      // Email sending logic would go here
      setEmailSent(true);
      setEmail('');
      setTimeout(() => setEmailSent(false), 2000);
    } catch (err) {
      console.error('Failed to send email:', err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleShare = async (platform) => {
    const text = "Join Kokobeo - The professional services marketplace!";
    const shareData = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + referralLink)}`
    };

    try {
      if (platform === 'native' && navigator.share) {
        await navigator.share({
          title: 'Join Kokobeo',
          text,
          url: referralLink
        });
      } else {
        window.open(shareData[platform], '_blank', 'noopener,noreferrer');
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50"  style={{ textAlign: 'left' }}>
      <SharedHeader11 />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Invite Friends</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Share Kokobeo with your friends and help them find trusted professionals</p>
        </div>

        <div className="space-y-6">
          {/* Referral Link Card */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Share Your Referral Link</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-gray-50 p-3 rounded-lg border text-gray-600 truncate text-sm sm:text-base">
                {referralLink}
              </div>
              <Button 
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-2"
                disabled={copied}
              >
                <Copy className="h-4 w-4" />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
          </Card>

          {/* Email Invite Card */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Invite via Email</h2>
            <form onSubmit={handleEmailInvite} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter friend's email"
                className="flex-1 p-2 border rounded-lg text-sm sm:text-base"
                required
              />
              <Button 
                type="submit" 
                className="w-full sm:w-auto flex items-center justify-center gap-2"
                disabled={isSharing}
              >
                <Mail className="h-4 w-4" />
                {isSharing ? 'Sending...' : 'Send Invite'}
              </Button>
            </form>
            {emailSent && (
              <Alert className="mt-4 bg-green-50 border-green-200">
                <AlertDescription className="text-green-700 text-sm">
                  Invitation sent successfully!
                </AlertDescription>
              </Alert>
            )}
          </Card>

          {/* Social Share Card */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Share on Social Media</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Button 
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm"
                onClick={() => handleShare('facebook')}
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm"
                onClick={() => handleShare('twitter')}
              >
                <Twitter className="h-4 w-4 text-blue-400" />
                Twitter
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm"
                onClick={() => handleShare('linkedin')}
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </Button>
              <Button 
                variant="outline"
                className="flex items-center gap-2 justify-center text-sm"
                onClick={() => handleShare('whatsapp')}
              >
                <MessageCircle className="h-4 w-4 text-green-500" />
                WhatsApp
              </Button>
            </div>
          </Card>

          {/* Benefits Card */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Why Invite Friends?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Share2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Help Friends Find Professionals</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Share trusted professionals with your network</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Share2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Grow the Community</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Build a stronger network of trusted professionals</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <div className="mt-12">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <SharedFooter2 />
      </div>
    </div>
  );
};

export default InviteFriends;