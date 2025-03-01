import React, { useState } from 'react';
import {
  Search, Phone, Video, Mic, MicOff, VideoOff,
  Send, Image as ImageIcon, Paperclip, MoreVertical,
  User, Check, CheckCheck, MessageSquare,
  PhoneOff, ArrowLeft, Menu, Home, Wallet,
  Shield, Bell, ChartAreaIcon, FileText, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const CMessagesAndVideoCall = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sidebar items (added for client view)
  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "/clients" },
    { icon: <MessageSquare className="h-5 w-5" />, label: "Messages", href: "/client/messageandvideocall", active: true },
    { icon: <FileText className="h-5 w-5" />, label: "My Orders", href: "/client/myorders" },
    { icon: <ChartAreaIcon className="h-5 w-5" />, label: "Progress", href: "/client/progress" },
    { icon: <Shield className="h-5 w-5" />, label: "Support Tickets", href: "/client/support" },
    { icon: <Wallet className="h-5 w-5" />, label: "Wallet", href: "/client/Wallet" },
    { icon: <Bell className="h-5 w-5" />, label: "Notifications", href: "/client/myoffers" },
    { icon: <User className="h-5 w-5" />, label: "Profile Settings", href: "/client/profilesettings" }
  ];

  // Mock data
  const chats = [
    {
      id: 1,
      name: "David Miller",
      avatar: null,
      lastMessage: "Great, I'll send you the details soon.",
      timestamp: "10:30 AM",
      unread: 2,
      status: "online",
      pinned: true,
    },
    {
      id: 2,
      name: "Sarah Thompson",
      avatar: null,
      lastMessage: "When can we schedule a call?",
      timestamp: "Yesterday",
      unread: 0,
      status: "offline",
      pinned: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "David Miller",
      content: "Hi, are you available for a quick call?",
      timestamp: "10:00 AM",
      status: "read",
      isMine: false,
    },
    {
      id: 2,
      sender: "Me",
      content: "Yes, I can talk now. What's up?",
      timestamp: "10:05 AM",
      status: "read",
      isMine: true,
    },
  ];

  // Handlers
  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleStartCall = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setIsMuted(false);
    setIsVideoOff(false);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      {/* Fixed Header */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white border-b h-16">
        <SharedHeader5 />
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
        <main className="flex-1 lg:pl-72 px-6 py-8 max-w-6xl mx-auto">
          <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm overflow-hidden flex">
            {/* Chat Sidebar */}
            <AnimatePresence>
              {(!selectedChat || window.innerWidth >= 768) && (
                <motion.div 
                  initial={{ x: -320 }}
                  animate={{ x: 0 }}
                  exit={{ x: -320 }}
                  transition={{ type: 'tween' }}
                  className={`${
                    window.innerWidth < 768 ? 'absolute z-10 bg-white h-full' : 'relative'
                  } w-full md:w-80 flex-shrink-0 border-r`}
                >
                  {/* Search */}
                  <div className="p-4 border-b">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  {/* Chat List */}
                  <div className="h-[calc(100%-4rem)] overflow-y-auto">
                    {chats.map((chat) => (
                      <button
                        key={chat.id}
                        onClick={() => handleChatSelect(chat)}
                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors ${
                          selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="relative flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                            chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">{chat.name}</div>
                            <div className="text-xs text-gray-500">{chat.timestamp}</div>
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {chat.lastMessage}
                          </div>
                        </div>

                        {chat.unread > 0 && (
                          <Badge className="bg-blue-500 text-white">
                            {chat.unread}
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat/Call Area */}
            <div className="flex-1 flex flex-col relative">
              {selectedChat ? (
                <>
                  {/* Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {window.innerWidth < 768 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedChat(null)}
                          className="mr-2"
                        >
                          <ArrowLeft className="h-5 w-5" />
                        </Button>
                      )}
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          selectedChat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="font-medium">{selectedChat.name}</div>
                        <div className="text-sm text-gray-500">
                          {selectedChat.status === 'online' ? 'Online' : 'Offline'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleStartCall}
                      >
                        <Phone className="h-5 w-5" />
                      </Button>
                      {window.innerWidth >= 768 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleStartCall}
                        >
                          <Video className="h-5 w-5" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {isInCall ? (
                    // Video Call UI
                    <div className="flex-1 bg-gray-900 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-700 flex items-center justify-center">
                          <User className="h-12 w-12 md:h-16 md:w-16 text-gray-400" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4 w-32 h-24 md:w-48 md:h-36 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-8 w-8 md:h-12 md:w-12 text-gray-400" />
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 md:py-3 bg-gray-800 rounded-full">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className={isMuted ? 'text-red-500' : 'text-white'}
                        >
                          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        {window.innerWidth >= 768 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsVideoOff(!isVideoOff)}
                            className={isVideoOff ? 'text-red-500' : 'text-white'}
                          >
                            {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                          </Button>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleEndCall}
                        >
                          <PhoneOff className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Chat UI
                    <>
                      <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[85%] md:max-w-[70%] ${
                              msg.isMine 
                                ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg' 
                                : 'bg-gray-100 rounded-r-lg rounded-bl-lg'
                            } p-3`}>
                              <div className="text-sm break-words">{msg.content}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <span className={`text-xs ${
                                  msg.isMine ? 'text-blue-200' : 'text-gray-500'
                                }`}>
                                  {msg.timestamp}
                                </span>
                                {msg.isMine && (
                                  msg.status === 'read' ? (
                                    <CheckCheck className="h-3 w-3 text-blue-200" />
                                  ) : (
                                    <Check className="h-3 w-3 text-blue-200" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-2 md:p-4 border-t">
                        <div className="flex items-center gap-2">
                          {window.innerWidth >= 768 && (
                            <>
                              <Button variant="ghost" size="sm">
                                <ImageIcon className="h-5 w-5" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Paperclip className="h-5 w-5" />
                              </Button>
                            </>
                          )}
                          <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // No Chat Selected State
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No conversation selected</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Choose a conversation from the list to start chatting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          {/* <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="fixed bottom-6 right-6 lg:hidden z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button> */}
        </main>
      </div>

      <br /><br /><br /><br /><br />

      <SharedFooter2 />
    </div>
  );
};

export default CMessagesAndVideoCall;