import React, { useState } from 'react';
import {
  Wallet, CreditCard, History, 
  ArrowUpRight, ArrowDownLeft, Plus,
  DollarSign, Shield, AlertCircle,
  Filter, ChevronDown, Download,
  CheckCircle, Calendar, Clock,
  CreditCardIcon, Bank, X, User, MoreHorizontal,
  BanknoteIcon
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader5 from '../Headers/SharedHeader5';
import SharedFooter2 from '../Footer/SharedFooter2';

const ClientWalletPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState('transactions');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addFundsModal, setAddFundsModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Mock data for wallet info
  const walletInfo = {
    balance: 1250.00,
    currency: 'USD',
    holdBalance: 150.00,
    lastUpdated: '2024-01-20T15:30:00Z'
  };

  // Mock data for payment methods
  const paymentMethods = [
    {
      id: 'pm_1',
      type: 'card',
      cardBrand: 'visa',
      last4: '4242',
      expMonth: '12',
      expYear: '25',
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'bank_account',
      bankName: 'Chase',
      last4: '9876',
      accountType: 'checking',
      isDefault: false
    }
  ];

  // Mock data for transactions
  const transactions = [
    {
      id: 'txn_1',
      type: 'payment',
      amount: -350.00,
      currency: 'USD',
      description: 'Payment for Plumbing Service',
      status: 'completed',
      date: '2024-01-19T14:30:00Z',
      orderId: 'ORD-2024-001',
      recipient: 'Mike Wilson Plumbing',
      transactionFee: 10.50
    },
    {
      id: 'txn_2',
      type: 'deposit',
      amount: 500.00,
      currency: 'USD',
      description: 'Added funds via Credit Card',
      status: 'completed',
      date: '2024-01-18T10:15:00Z',
      paymentMethod: '**** 4242'
    },
    {
      id: 'txn_3',
      type: 'hold',
      amount: -150.00,
      currency: 'USD',
      description: 'Hold for Electrical Service',
      status: 'pending',
      date: '2024-01-20T09:45:00Z',
      orderId: 'ORD-2024-002',
      recipient: 'John\'s Electrical'
    }
  ];

  // Function to format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Transaction Card Component
  const TransactionCard = ({ transaction }) => {
    const isDeposit = transaction.type === 'deposit';
    const isHold = transaction.type === 'hold';
    const isPending = transaction.status === 'pending';

    return (
      <div className="p-3 md:p-4 border-b last:border-b-0">
        <div className="flex flex-col md:flex-row items-start justify-between gap-3 md:gap-4">
          <div className="flex items-start gap-3 w-full md:w-auto">
            <div className={`p-2 rounded-lg ${
              isDeposit ? 'bg-green-100' : 
              isHold ? 'bg-yellow-100' : 
              'bg-blue-100'
            }`}>
              {isDeposit ? (
                <ArrowDownLeft className={`h-4 w-4 md:h-5 md:w-5 ${
                  isDeposit ? 'text-green-600' :
                  isHold ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              ) : (
                <ArrowUpRight className={`h-4 w-4 md:h-5 md:w-5 ${
                  isDeposit ? 'text-green-600' :
                  isHold ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{transaction.description}</h4>
                  <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-600 mt-1">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                    {new Date(transaction.date).toLocaleDateString()}
                    <span>•</span>
                    {transaction.orderId && (
                      <>
                        <span className="truncate">{transaction.orderId}</span>
                        <span>•</span>
                      </>
                    )}
                    <Badge className={`
                      text-xs md:text-sm px-2 py-0.5
                      ${isPending ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                    `}>
                      {isPending ? 'Pending' : 'Completed'}
                    </Badge>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto">
                  <div className={`font-medium text-sm md:text-base ${
                    isDeposit ? 'text-green-600' :
                    isHold ? 'text-yellow-600' :
                    'text-gray-900'
                  }`}>
                    {isDeposit ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                  {transaction.transactionFee && (
                    <div className="text-xs md:text-sm text-gray-500">
                      Fee: {formatCurrency(transaction.transactionFee)}
                    </div>
                  )}
                </div>
              </div>
              
              {(transaction.recipient || transaction.paymentMethod) && (
                <div className="mt-2 text-xs md:text-sm text-gray-600">
                  {transaction.recipient && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      {transaction.recipient}
                    </div>
                  )}
                  {transaction.paymentMethod && (
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
                      {transaction.paymentMethod}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Payment Method Card Component
  const PaymentMethodCard = ({ method }) => {
    const isCard = method.type === 'card';

    return (
      <Card className={`p-3 md:p-4 ${method.isDefault ? 'border-blue-200' : ''}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            {isCard ? (
              <CreditCardIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-600" />
            ) : (
              <BanknoteIcon className="h-6 w-6 md:h-8 md:w-8 text-gray-600" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-sm md:text-base">
                  {isCard ? (
                    `${method.cardBrand.toUpperCase()} **** ${method.last4}`
                  ) : (
                    `${method.bankName} **** ${method.last4}`
                  )}
                </h4>
                {method.isDefault && (
                  <Badge className="text-xs md:text-sm bg-blue-100 text-blue-800">Default</Badge>
                )}
              </div>
              <p className="text-xs md:text-sm text-gray-600">
                {isCard ? (
                  `Expires ${method.expMonth}/${method.expYear}`
                ) : (
                  `${method.accountType.charAt(0).toUpperCase() + method.accountType.slice(1)} Account`
                )}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-1 md:p-2">
            <MoreHorizontal className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </Card>
    );
  };

  // Add Funds Modal
  const AddFundsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold">Add Funds to Wallet</h3>
            <button onClick={onClose} className="p-1">
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount to Add
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm md:text-base"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <div className="space-y-2">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-2 md:p-3 border rounded-lg cursor-pointer ${
                      selectedPaymentMethod === method.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      {method.type === 'card' ? (
                        <CreditCardIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                      ) : (
                        <BanknoteIcon className="h-4 w-4 md:h-5 md:w-5 text-gray-600" />
                      )}
                      <div className="text-xs md:text-sm">
                        {method.type === 'card' ? (
                          `${method.cardBrand.toUpperCase()} **** ${method.last4}`
                        ) : (
                          `${method.bankName} **** ${method.last4}`
                        )}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={selectedPaymentMethod === method.id}
                      onChange={() => setSelectedPaymentMethod(method.id)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full text-sm md:text-base">Add Funds</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ textAlign: 'left' }}>
      <SharedHeader5 />
      
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Wallet</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your funds and payment methods</p>
          </div>
        </div>

        {/* Wallet Balance Card */}
        <Card className="mb-6">
          <div className="p-4 md:p-6 border-b">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="text-sm text-gray-600 mb-1">Available Balance</div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">
                  {formatCurrency(walletInfo.balance)}
                </div>
                <div className="text-xs md:text-sm text-gray-500 mt-1">
                  Last updated: {new Date(walletInfo.lastUpdated).toLocaleString()}
                </div>
              </div>
              {walletInfo.holdBalance > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="text-xs md:text-sm text-yellow-800">On Hold</div>
                  <div className="text-sm md:text-base font-medium text-yellow-900">
                    {formatCurrency(walletInfo.holdBalance)}
                  </div>
                </div>
              )}
              <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                <Button
                  onClick={() => setAddFundsModal(true)}
                  className="flex items-center gap-2 text-sm md:text-base w-full md:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add Funds
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x">
            <div className="p-4 md:p-6">
              <div className="text-xs md:text-sm text-gray-600">This Month Spent</div>
              <div className="text-lg md:text-xl font-semibold mt-1">$750.00</div>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-xs md:text-sm text-gray-600">Active Orders</div>
              <div className="text-lg md:text-xl font-semibold mt-1">3</div>
            </div>
            <div className="p-4 md:p-6">
              <div className="text-xs md:text-sm text-gray-600">Pending Payments</div>
              <div className="text-lg md:text-xl font-semibold mt-1">$150.00</div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-4 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-3 md:px-4 py-2 border-b-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                activeTab === 'transactions'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('payment-methods')}
              className={`px-3 md:px-4 py-2 border-b-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                activeTab === 'payment-methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment Methods
            </button>
          </div>

          {/* Content */}
          {activeTab === 'transactions' ? (
            <div>
              {/* Transactions List */}
              <Card>
                {/* Header with filters */}
                <div className="p-4 border-b">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <h3 className="font-semibold text-sm md:text-base">Transaction History</h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full sm:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs md:text-sm w-full sm:w-auto"
                        onClick={() => setFilterOpen(!filterOpen)}
                      >
                        <Filter className="h-3 w-3 md:h-4 md:w-4" />
                        Filter
                        <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 text-xs md:text-sm w-full sm:w-auto"
                      >
                        <Download className="h-3 w-3 md:h-4 md:w-4" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {/* Filter Panel */}
                  {filterOpen && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Type
                          </label>
                          <select className="w-full p-2 border rounded-lg text-xs md:text-sm">
                            <option value="all">All Types</option>
                            <option value="payment">Payments</option>
                            <option value="deposit">Deposits</option>
                            <option value="hold">Holds</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Status
                          </label>
                          <select className="w-full p-2 border rounded-lg text-xs md:text-sm">
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Date Range
                          </label>
                          <select className="w-full p-2 border rounded-lg text-xs md:text-sm">
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                            <option value="last-3-months">Last 3 Months</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                            Amount Range
                          </label>
                          <select className="w-full p-2 border rounded-lg text-xs md:text-sm">
                            <option value="all">All Amounts</option>
                            <option value="under-100">Under $100</option>
                            <option value="100-500">$100 - $500</option>
                            <option value="over-500">Over $500</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" className="mr-2 text-xs md:text-sm">
                          Reset
                        </Button>
                        <Button className="text-xs md:text-sm">Apply</Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Transactions List */}
                <div className="divide-y">
                  {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                      <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  ) : (
                    <div className="p-4 md:p-6 text-center">
                      <History className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
                        No Transactions
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        You haven't made any transactions yet.
                      </p>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {transactions.length > 0 && (
                  <div className="p-4 border-t">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-xs md:text-sm text-gray-600 w-full sm:w-auto text-center sm:text-left">
                        Showing 1 to {transactions.length} of {transactions.length} transactions
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="text-xs md:text-sm">
                          Previous
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs md:text-sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payment Methods List */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="font-semibold text-sm md:text-base">Payment Methods</h3>
                <Button className="flex items-center gap-2 text-xs md:text-sm w-full sm:w-auto">
                  <Plus className="h-3 w-3 md:h-4 md:w-4" />
                  Add Payment Method
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.id} method={method} />
                ))}
              </div>

              {/* Payment Method Info */}
              <Card className="p-4 md:p-6 bg-blue-50 border-blue-200">
                <div className="flex gap-3">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm md:text-base text-blue-900">Secure Payment Processing</h4>
                    <p className="text-xs md:text-sm text-blue-700 mt-1">
                      All payment information is encrypted and securely stored. We never share your financial details with service providers.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Add Funds Modal */}
      <AddFundsModal 
        isOpen={addFundsModal}
        onClose={() => setAddFundsModal(false)}
      />

      {/* Spacer for footer */}
      <div className="h-16 md:h-32"></div>

      <SharedFooter2 />
    </div>
  );
};

export default ClientWalletPage;