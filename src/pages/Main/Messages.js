import React, { useState } from 'react';
import { 
  MapPin, Paperclip, Send, Search, ChevronDown, Image, 
  Menu, X, Phone, Video, MoreHorizontal, ArrowLeft, Bell
} from 'lucide-react';

// Mock data
const conversations = [
  {
    id: 1,
    name: "John Anderson",
    lastMessage: "I need help with plumbing...",
    time: "12:30 PM",
    avatar: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
    unread: 2,
    online: true,
    type: 'professional' // Added type to determine redirect
  },
  {
    id: 2,
    name: "Sarah Williams",
    lastMessage: "When can you start the work?",
    time: "12:15 PM",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxoSju4EyjlxAeYKKhVLnYu4zf59syjFAyw&s",
    online: true,
    type: 'client'
  },
  {
    id: 3,
    name: "Michael Roberts",
    lastMessage: "Thanks for the quick response",
    time: "11:45 AM",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG2PuCpeMd1m6BDKuVwFSOA4QpaQWI5oA94g&s",
    unread: 1,
    type: 'professional'
  }
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showConversations, setShowConversations] = useState(true);
  const [userType, setUserType] = useState('client');

  // Handle logo click navigation
  const handleLogoClick = () => {
    const redirectPath = userType === 'professional' ? '/professional' : '/';
    window.location.href = redirectPath;
  };

  // Toggle mobile views
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setShowConversations(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Logo with click handler */}
              <div 
                className="flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={handleLogoClick}
              >
                <img 
                  src="https://assests.netlify.app/assets/images/logo.png"
                  alt="Kokobeo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="font-semibold text-blue-600 inline">Kokobeo</span>
              </div>

              <nav className="hidden lg:flex items-center gap-8">
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm text-left">All Requests</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm text-left">My Quotes</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm text-left">Contract History</a>
                <a href="#" className="text-gray-900 font-medium text-sm text-left">Messages</a>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm text-left">Balance</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
                  <Bell className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm">JD</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t bg-white">
            <div className="p-4 border-b">
              {/* <div 
                onClick={handleLogoClick}
                className="flex items-center gap-2 cursor-pointer mb-4"
              >
                <img 
                  src="https://assests.netlify.app/assets/images/logo.png"
                  alt="Kokobeo" 
                  className="h-8 w-8 object-contain"
                />
                <span className="font-semibold text-blue-600">Kokobeo</span>
              </div> */}
            </div>
            <nav style={{ padding: "8px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
  <a href="#" style={{ display: "block", padding: "8px 12px", color: "#6b7280", textAlign: "left", textDecoration: "none", borderRadius: "8px", backgroundColor: "transparent", hover: { color: "#111827", backgroundColor: "#f9fafb" } }}>
    All Requests
  </a>
  <a href="#" style={{ display: "block", padding: "8px 12px", color: "#6b7280", textAlign: "left", textDecoration: "none", borderRadius: "8px", backgroundColor: "transparent", hover: { color: "#111827", backgroundColor: "#f9fafb" } }}>
    My Quotes
  </a>
  <a href="#" style={{ display: "block", padding: "8px 12px", color: "#6b7280", textAlign: "left", textDecoration: "none", borderRadius: "8px", backgroundColor: "transparent", hover: { color: "#111827", backgroundColor: "#f9fafb" } }}>
    Contract History
  </a>
  <a href="#" style={{ display: "block", padding: "8px 12px", color: "#1d4ed8", backgroundColor: "#eff6ff", textAlign: "left", textDecoration: "none", borderRadius: "8px" }}>
    Messages
  </a>
  <a href="#" style={{ display: "block", padding: "8px 12px", color: "#6b7280", textAlign: "left", textDecoration: "none", borderRadius: "8px", backgroundColor: "transparent", hover: { color: "#111827", backgroundColor: "#f9fafb" } }}>
    Balance
  </a>
</nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          {!showConversations && (
            <button 
              className="lg:hidden flex items-center text-gray-600"
              onClick={() => setShowConversations(true)}
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
          )}
          <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
        </div>

        <div className="flex h-[calc(100vh-12rem)] bg-white border rounded-xl overflow-hidden shadow-sm">
          {/* Conversation List */}
          {(showConversations || window.innerWidth >= 1024) && (
            <div className="w-full lg:w-80 border-r flex flex-col">
              <div className="p-4 border-b bg-white sticky top-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedChat?.id === chat.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={chat.avatar} alt={chat.name} className="h-12 w-12 rounded-full object-cover" />
                        {chat.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{chat.name}</p>
                          <p className="text-xs text-gray-500">{chat.time}</p>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                      </div>
                      {chat.unread && (
                        <span className="h-5 w-5 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center flex-shrink-0">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Area */}
          {(!showConversations || window.innerWidth >= 1024) && (
            <div className="flex-1 flex flex-col bg-gray-50">
              {selectedChat ? (
                <>
                  <div className="p-4 bg-white border-b sticky top-0 z-10">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={selectedChat.avatar} alt={selectedChat.name} className="h-10 w-10 rounded-full object-cover" />
                          {selectedChat.online && (
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div>
                          <h2 className="text-sm font-medium text-gray-900">{selectedChat.name}</h2>
                          <p className="text-xs text-gray-500">{selectedChat.online ? 'Online' : 'Offline'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Phone className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Video className="h-5 w-5 text-gray-500" />
                        </button>
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
                          onClick={() => setShowDetails(!showDetails)}
                        >
                          <MoreHorizontal className="h-5 w-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-[70%] bg-white rounded-2xl p-3 shadow-sm">
                        <p className="text-sm text-gray-900">Hi! How can I help you today?</p>
                        <span className="text-xs text-gray-500 mt-1 block">12:25 PM</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="max-w-[70%] bg-blue-500 rounded-2xl p-3 shadow-sm">
                        <p className="text-sm text-white">I need help with my recent service request.</p>
                        <span className="text-xs text-blue-100 mt-1 block">12:28 PM</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-50 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                        <Send className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;