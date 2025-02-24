import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Import routing components
import Homepage from './Homepage2';  // Import Homepage component
import RegistrationPage from './pages/RegistrationPage';  // Import RegistrationPage component
import LoginPage from './pages/LoginPage';  // Import LoginPage component
import KokobeoHomepages from './Menu/Homepage';
import ProfessionalDashboard from './pages/Main/Professional';
import TermsPage from './pages/Main/Terms';
import PrivacyPolicyPage from './pages/Main/Policy';
import { Contact } from 'lucide-react';
import CookiesPolicyPage from './pages/Main/Cookies';
import Messages from './pages/Main/Messages';
import VerifyAccount from './Menu/Verify';
import SubscriptionPlans from './Menu/plans';
import CreditsPage from './Menu/credits';
import ProjectsPage from './pages/Main/projects';
import HelpCenter from './Menu/help';
import AboutPage from './pages/Main/About';
import InternationalHomepage from './pages/Main/InternationalHomepage';
import PlumberRegistration from './pages/Main/PlumberRegistration';
import PlumberRequestForm from './pages/Main/PlumberRequestForm';
import LawyerRequestForm from './pages/Main/LawyerRequestForm';
import PlumberProfile from './pages/Main/PlumberProfile';
import ProfessionalPlumberProfile from './pages/Main/ProfessionalPlumberProfile';
import ProfessionalSearch from './pages/Main/ProfessionalSearch';
import ClientDashboard from './pages/Main/client';
import FreelancerDashboard from './pages/Main/professionalDashboard';
import ProHomepage from './pages/Main/Professional_Homepage';
import InternationalProfessional from './pages/Main/professional-international';
import InternationalProfessionalsPage from './pages/Main/International_Professionals_Page';
import LocalProfessionalsPage from './pages/Main/local_professionals';
import InternationalProfessionalsProfile from './pages/Main/int_professionals_profiles';
import WalletPage from './pages/Main/Wallet_Page';
import MyProfile from './pages/MyProfile';
import MySettings from './pages/MySettings';
import InternationalProfessionalRegistration from './pages/InternationalProfessionalRegistration';
import ProgressDashboard from './pages/progress';
import OrdersDashboard from './pages/myorders';
import OffersDashboard from './pages/MyOffers';
import ProposalsDashboard from './pages/MyProposals';
import SupportTickets from './pages/SupportTickets';
import WalletDashboard from './pages/WalletDashboard';
import WithdrawHistory from './pages/WithdrawalHistory';
import ProfileSettings from './pages/ProfessionalProfileSettings';
import ChangePassword from './pages/ChangePassword';
import DeleteAccount from './pages/DeleteAccount';
import MessagesAndVideoCall from './Menu/MessagesAndVideoCall';
import CMyProfile from './client/ClientProfile';
import ClientProfile from './client/ClientProfile';
import ClientRegistration from './client/ClientRegistrationForm';
import ClientSettings from './client/ClientSettings';
import ProgressPage from './client/ClientProgress';
import PostJobPage from './client/PostaJob';
import MyJobsPage from './client/MyJobsPage';
import MyOrdersPage from './client/MyOrdersPage';
import MyOffersPage from './client/MyOffersPage';
import CMessagesAndVideoCall from './client/MessagesAndVideoCall';
import ClientWalletPage from './client/ClientWalletPage';
import ClientProfileSettings from './client/ClientProfileSettings';
import ClientSupportTickets from './client/Client_Support_Tickets';
import NotificationsPage from './Menu/Notification';
import ContactPage from './Menu/Contact';
import AboutPage2 from './Menu/About';
import MessagesAndVideoCall2 from './Menu/MessagesAndVideoCall';
import AboutPage02 from './Menu2/About02';
import MessagesAndVideoCall02 from './Menu2/MessageAndVideoCall02';
import NotificationsPage02 from './Menu2/Notification02';
import ContactPage02 from './Menu2/Contact02';
import HelpCenter02 from './Menu2/Help02';
import VerifyAccount02 from './Menu2/verify02';
import SubscriptionPlans02 from './Menu2/plans02';
import CreditsPage02 from './Menu2/Credits02';
import LocalProfessionalProfile from './pages/Main/LocalProfessionalProfile';
import LocalProfessionalSettings from './pages/Main/LocalSettings';
import InviteFriends from './pages/InviteFriendsPage';
import CategoriesAndLocation from './pages/categories';
import ClientReviewsSection from './components/ui/ClientReviewsSection';
import ProfessionalReviewsSection from './components/ui/ProfessionalReviewsSection';
import AdminDashboard from './Admin/AdminDashboard';
import UserManagement from './Admin/AdminUserManagement';
import BusinessManagement from './Admin/AdminBusinessManagement';
import AllUsersPage from './Admin/UserManagement/AllUsers';
import LocalProfessionalsPage2 from './Admin/UserManagement/LocalProfessionalsPage';
import InternationalProfessionalsPage2 from './Admin/UserManagement/InternationalProfessionalsPage';
import VerificationRequestsPage from './Admin/UserManagement/VerificationRequestsPage';
import BusinessDirectory from './Admin/BUSINESS MANAGEMENT/BusinessDirectory';
import ServiceCategories from './Admin/BUSINESS MANAGEMENT/ServiceCategories';
import EmergencyServices from './Admin/BUSINESS MANAGEMENT/EmergencyServices';
import ServiceAreas from './Admin/BUSINESS MANAGEMENT/ServiceAreas';
import AllOrdersPage from './Admin/ORDER MANAGEMENT/AllOrders';
import PendingOrdersPage from './Admin/ORDER MANAGEMENT/PendingOrders';
import EmergencyRequestsPage from './Admin/ORDER MANAGEMENT/EmergencyRequests';
import QuotesPage from './Admin/ORDER MANAGEMENT/QuotesPage';
import TransactionsPage from './Admin/FINANCIAL MANAGEMENT/Transactions';
import RevenuePage from './Admin/FINANCIAL MANAGEMENT/Revenue';
import PayoutsPage from './Admin/FINANCIAL MANAGEMENT/Payouts';
import InvoicesPage from './Admin/FINANCIAL MANAGEMENT/invoices';
import ReviewsAndRatings from './Admin/Content Management/Rating';
import SupportTickets2 from './Admin/Content Management/SupportTickets';
import HelpCenter22 from './Admin/Content Management/help';
import Announcements from './Admin/Content Management/Announcements';
import BusinessAnalytics from './Admin/ANALYTICS/BusinessAnalytics';
import UserAnalytics from './Admin/ANALYTICS/UserAnalytics';
import GrowthMetrics from './Admin/ANALYTICS/GrowthMetricsDashboard';
import GeneralSettings from './Admin/General Settings/GeneralSettings';
import SecuritySettings from './Admin/General Settings/Security';
import SystemLogs from './Admin/General Settings/SystemLogs';
import SystemLogs2 from './Admin/General Settings/SystemLogs';
import { BsWhatsapp } from 'react-icons/bs';
import WhatsAppIntegration from './Admin/WhatsApp Management/WhatsApp';
import ChatManagement from './Admin/WhatsApp Management/ChatManagement';
import CustomNotifications from './Admin/WhatsApp Management/CustomNotifications';
import ProfessionalForms from './Admin/FORM MANAGEMENT/ProfessionalForms';
import QuoteForms from './Admin/FORM MANAGEMENT/Quote Forms';
import QuotePricing from './Admin/SUBSCRIPTION & PRICING/QuotePricing';
import SubscriptionPlansadmin from './Admin/SUBSCRIPTION & PRICING/SubscriptionPlansManagement';
import RegionalPricing from './Admin/SUBSCRIPTION & PRICING/RegionalPricingManagement';
import PerformanceMetrics from './Admin/PROFESSIONAL SCORING/PerformanceMetrics';
import Rankings from './Admin/PROFESSIONAL SCORING/Rankings';
import Rankingsadmin from './Admin/PROFESSIONAL SCORING/Rankings';
import ScoringSettings from './Admin/PROFESSIONAL SCORING/ScoringSettings';
import PaymentMilestones from './Admin/MILESTONE MANAGEMENT/Milestones';
import CommissionSettings from './Admin/MILESTONE MANAGEMENT/CommissionSettings';
import DepositRules from './Admin/MILESTONE MANAGEMENT/DepositRules';
import TermsConditions from './Admin/CONTENT EDITOR/TermsEditor';
import NewsManagement from './Admin/CONTENT EDITOR/NewsManagement';
import MarketingPopups from './Admin/CONTENT EDITOR/MarketingPopups';
import RegionSettings from './Admin/INTERNATIONAL/RegionSettings';
import LanguageManager from './Admin/INTERNATIONAL/LanguageManager';
import CurrencySettings from './Admin/INTERNATIONAL/CurrencySettings';
import CategoryForms from './Admin/FORM MANAGEMENT/CategoryForms';



function App() {
  return (
    <Router> {/* Wrap everything in Router */}
      <div className="App">
        {/* Set up the routes */}
        <Routes>
          <Route path="/" element={<Homepage />} />  {/* Homepage route */}
          <Route path="/register" element={<RegistrationPage />} />  {/* RegistrationPage route */}
          <Route path="/login" element={<LoginPage />} />  {/* LoginPage route */}

          <Route path="/Homepage" element={<Homepage/>} />  {/* Homepage route */}
          <Route path="/professional" element={<ProfessionalDashboard/>} />  {/* professional route */}
          <Route path="/Terms" element={<TermsPage/>} />  {/* Terms route */}
          <Route path="/Policy" element={<PrivacyPolicyPage/>} />  {/* Privacy route */}
          <Route path="/Cookie" element={<CookiesPolicyPage/>} />  {/* cookies route */}


          <Route path="/projects"element={<ProjectsPage/>} />

          <Route path="/internationalhompage"element={<ProHomepage/>} />
          <Route path="/plumberregistration"element={<PlumberRegistration/>} />
          <Route path="/plumberrequestform"element={<PlumberRequestForm/>} />
          <Route path="/lawyerRequestForm"element={<LawyerRequestForm/>} />
          <Route path="/plumberprofile"element={<PlumberProfile/>} />
          <Route path="/professionalplumberprofile"element={<ProfessionalPlumberProfile/>} />
          {/* <Route path="/professionalSearch"element={<ProfessionalSearch/>} /> */}
          <Route path="/clients"element={<ClientDashboard/>} />
          <Route path="/Professionals"element={<FreelancerDashboard/>} />
          <Route path="/international-professionals"element={<InternationalProfessional/>} />
          <Route path="/jobs"element={<InternationalProfessionalsPage/>} />
          <Route path="/local-professionals"element={<LocalProfessionalsPage/>} />
          <Route path="/professional-international"element={<InternationalProfessionalsProfile/>} />
          <Route path="/walletd"element={<WalletPage/>} />

          {/* Professionals Menu */}

          <Route path="/local/myprofile"element={<LocalProfessionalProfile/>} />
          <Route path="/local/settings"element={<LocalProfessionalSettings/>} />
          <Route path="/invite"element={<InviteFriends/>} />
          <Route path="/categories"element={<CategoriesAndLocation/>} />



          <Route path="/myprofile"element={<MyProfile/>} />
          <Route path="/Settings"element={<MySettings/>} />
          <Route path="/international_professional_registration"element={<InternationalProfessionalRegistration/>} />
          <Route path="/progress"element={<ProgressDashboard/>} />
          <Route path="/myorders"element={<OrdersDashboard/>} />
          <Route path="/myoffers"element={<OffersDashboard/>} />
          <Route path="/myproposals"element={<ProposalsDashboard/>} />
          <Route path="/support"element={<SupportTickets/>} />
          <Route path="/wallet"element={<WalletDashboard/>} />
          <Route path="/withdrawalhistroy"element={<WithdrawHistory/>} />
          <Route path="/profilesettings"element={<ProfileSettings/>} />
          <Route path="/changepassword"element={<ChangePassword/>} />
          <Route path="/DeleteAccount"element={<DeleteAccount/>} />
          <Route path="/MessageAndVideoCall"element={<MessagesAndVideoCall/>} />

          {/* Client Menu */}

          {/* <Route path="/client/profile"element={<ClientProfile/>} /> */}
          <Route path="/client/registration"element={<ClientRegistration/>} />
          <Route path="/client/settings"element={<ClientSettings/>} />
          <Route path="/client/progress"element={<ProgressPage/>} />
          <Route path="/postajob"element={<PostJobPage/>} />
          <Route path="/myjobs"element={<MyJobsPage/>} />
          {/* <Route path="/client/myorders"element={<MyOrdersPage/>} /> */}
          <Route path="/client/myoffers"element={<MyOffersPage/>} />
          <Route path="/client/MessageAndVideoCall"element={<CMessagesAndVideoCall/>} />
          <Route path="/client/Wallet"element={<ClientWalletPage/>} />
          <Route path="/client/profilesettings"element={<ClientProfileSettings/>} />
          <Route path="/client/support"element={<ClientSupportTickets/>} />

          {/* Menu */}

          <Route path="/about"element={<AboutPage2/>} />
          <Route path="/how-it-works" element={<KokobeoHomepages/>} />  {/* Homepage2 route */}
          <Route path="/menu/messages"element={<MessagesAndVideoCall2/>} />
          <Route path="/notifications"element={<NotificationsPage/>} />
          <Route path="/menu/contact"element={<ContactPage/>} />
          <Route path="/help"element={<HelpCenter/>} />
          <Route path="/client/profile"element={<ClientProfile/>} />
          <Route path="/verify"element={<VerifyAccount/>} />
          <Route path="/plans"element={<SubscriptionPlans/>} />
          <Route path="/credits"element={<CreditsPage/>} />
          <Route path="/client/myorders"element={<MyOrdersPage/>} />


          {/* Menu2 */}

          <Route path="/international/about"element={<AboutPage02/>} />
          <Route path="/international/menu/messages"element={<MessagesAndVideoCall02/>} />
          <Route path="/international/notifications"element={<NotificationsPage02/>} />
          <Route path="/international/menu/contact"element={<ContactPage02/>} />
          <Route path="/international/help"element={<HelpCenter02/>} />
          <Route path="/international/verify"element={<VerifyAccount02/>} />
          <Route path="/international/plans"element={<SubscriptionPlans02/>} />
          <Route path="/international/credits"element={<CreditsPage02/>} />
          <Route path="/client/reviews"element={<ClientReviewsSection/>} />
          <Route path="/professional/reviews"element={<ProfessionalReviewsSection/>} />

          {/* Admin Dashboard */}

          <Route path="/admin/dashboard"element={<AdminDashboard/>} />
          <Route path="admin/usermanagement"element={<UserManagement/>} />
          <Route path="admin/businessmanagement"element={<BusinessManagement/>} />

                                {/* User Management */}
          
          <Route path="/admin/usermanagement/alluser"element={<AllUsersPage/>} />
          <Route path="/admin/usermanagement/localprofesionals"element={<LocalProfessionalsPage2/>} />
          <Route path="/admin/usermanagement/internationalprofesionals"element={<InternationalProfessionalsPage2/>} />
          <Route path="/admin/usermanagement/verificationrequests"element={<VerificationRequestsPage/>} />


          {/* Business Management */}

          <Route path="/admin/businesses"element={<BusinessDirectory/>} />
          <Route path="/admin/categories"element={<ServiceCategories/>} />
          <Route path="/admin/emergency-services"element={<EmergencyServices/>} />
          <Route path="/admin/service-areas"element={<ServiceAreas/>} />

          {/* ORDER MANAGEMENT */}

          <Route path="/admin/orders"element={<AllOrdersPage/>} />
          <Route path="/admin/orders/pending"element={<PendingOrdersPage/>} />
          <Route path="/admin/orders/emergency"element={<EmergencyRequestsPage/>} />
          <Route path="/admin/quotes"element={<QuotesPage/>} />

          {/* Financial Management */}

          <Route path="/admin/transactions"element={<TransactionsPage/>} />
          <Route path="/admin/revenue"element={<RevenuePage/>} />
          <Route path="/admin/payouts"element={<PayoutsPage/>} />
          <Route path="/admin/invoices"element={<InvoicesPage/>} />

          {/* Content Management */}

          

          <Route path="/admin/reviews"element={<ReviewsAndRatings/>} />
          <Route path="/admin/support"element={<SupportTickets2/>} />
          <Route path="/admin/help-center"element={<HelpCenter22/>} />
          <Route path="/admin/announcements"element={<Announcements/>} />

          {/* Analytics */}

          <Route path="/admin/analytics/business"element={<BusinessAnalytics/>} />
          <Route path="/admin/analytics/users"element={<UserAnalytics/>} />
          <Route path="/admin/analytics/growth"element={<GrowthMetrics/>} />

          {/* General Settings */}

          <Route path="/admin/settings"element={<GeneralSettings/>} />
          <Route path="/admin/security"element={<SecuritySettings/>} />
          <Route path="/admin/logs"element={<SystemLogs2/>} />


          <Route path="/admin/tools/whatsapp"element={<WhatsAppIntegration/>} />
          <Route path="/admin/tools/chat"element={<ChatManagement/>} />
          <Route path="/admin/tools/notifications"element={<CustomNotifications/>} />
          
          <Route path="/admin/forms/categories"element={<CategoryForms/>} />
          <Route path="/admin/forms/professionals"element={<ProfessionalForms/>} />
          <Route path="/admin/forms/quotes"element={<QuoteForms/>} />

          <Route path="/admin/pricing/quotes"element={<QuotePricing/>} />
          <Route path="/admin/pricing/subscriptions"element={<SubscriptionPlansadmin/>} />
          <Route path="/admin/pricing/regions"element={<RegionalPricing/>} />



          <Route path="/admin/scoring/metrics"element={<PerformanceMetrics/>} />

          <Route path="/admin/scoring/rankings"element={<Rankingsadmin/>} />

          
          <Route path="/admin/scoring/settings"element={<ScoringSettings/>} />


          <Route path="/admin/milestones/payments"element={<PaymentMilestones/>} />
          <Route path="/admin/milestones/commission"element={<CommissionSettings/>} />
          <Route path="/admin/milestones/deposits"element={<DepositRules/>} />

          <Route path="/admin/editor/terms"element={<TermsConditions/>} />
          <Route path="/admin/editor/news"element={<NewsManagement/>} />
          <Route path="/admin/editor/marketing"element={<MarketingPopups/>} />


          <Route path="/admin/international/regions"element={<RegionSettings/>} />
          <Route path="/admin/international/languages"element={<LanguageManager/>} />
          <Route path="/admin/international/currencies"element={<CurrencySettings/>} />



          


          





















          



          




          

          



          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
