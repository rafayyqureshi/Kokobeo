import React, { useState } from 'react';
import { 
  CreditCard, ArrowUp, ArrowDown, Search, Filter,
  DollarSign, Clock, Wallet, ArrowRight, ChevronDown,
  BarChart4, Calendar, Download, Zap, AlertTriangle
} from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/badge';
import SharedHeader4 from '../Headers/SharedHeader4';
import SharedFooter2 from '../Footer/SharedFooter2';
import SharedHeader from '../Headers/SharedHeader';

const TransactionRow = ({ transaction }) => {
  const isCredit = transaction.type === 'credit';
  const isEmergency = transaction.isEmergency;
  
  return (
    <div className="py-4 flex items-center justify-between hover:bg-gray-50 p-4 rounded-lg transition-colors"  style={{ textAlign: 'left' }}>
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-lg ${
          isCredit 
            ? isEmergency ? 'bg-red-50' : 'bg-green-50'
            : 'bg-blue-50'
        }`}>
          {isCredit ? (
            <ArrowUp className={`h-5 w-5 ${isEmergency ? 'text-red-500' : 'text-green-500'}`} />
          ) : (
            <ArrowDown className="h-5 w-5 text-blue-500" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900">{transaction.description}</p>
            {isEmergency && (
              <Badge variant="destructive" className="text-xs">Emergency</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${
          isCredit 
            ? isEmergency ? 'text-red-600' : 'text-green-600'
            : 'text-blue-600'
        }`}>
          {isCredit ? '+' : '-'}{transaction.amount} credits
        </p>
        <p className="text-sm text-gray-500">${transaction.cost}</p>
      </div>
    </div>
  );
};

const CreditPackage = ({ package: pkg, onSelect, isEmergency = false }) => {
  return (
    <Card className={`p-6 hover:shadow-lg transition-all cursor-pointer ${
      isEmergency ? 'border-red-200' : ''
    }`} onClick={onSelect}  style={{ textAlign: 'left' }}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
          isEmergency ? 'bg-red-50' : 'bg-blue-50'
        }`}>
          {isEmergency ? (
            <AlertTriangle className="h-5 w-5 text-red-500" />
          ) : (
            <Wallet className="h-5 w-5 text-blue-500" />
          )}
        </div>
        {pkg.popular && (
          <Badge className={isEmergency ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
            Popular
          </Badge>
        )}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.credits} Credits</h3>
      <p className="text-sm text-gray-500 mb-4">{pkg.description}</p>
      
      <div className="flex items-baseline mb-6">
        <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
        <span className="text-sm text-gray-500 ml-2">
          (${(pkg.price / pkg.credits).toFixed(2)}/credit)
        </span>
      </div>

      <Button className={`w-full ${
        isEmergency ? 'bg-red-600 hover:bg-red-700' : ''
      }`}>
        Select Package
      </Button>
    </Card>
  );
};

const CreditsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [creditType, setCreditType] = useState('regular');

  // Updated credit packages to match plans.js pricing
  const regularCreditPackages = [
    {
      credits: 50,
      price: 49,
      description: "Perfect for small businesses",
      popular: false
    },
    {
      credits: 120,
      price: 99,
      description: "Most popular for professionals",
      popular: true
    },
    {
      credits: 300,
      price: 199,
      description: "Best value for active users",
      popular: false
    }
  ];

  const emergencyCreditPackages = [
    {
      credits: 50,
      price: 99,
      description: "Basic emergency coverage",
      popular: false
    },
    {
      credits: 120,
      price: 199,
      description: "Recommended for emergency services",
      popular: true
    },
    {
      credits: 300,
      price: 299,
      description: "Full emergency coverage",
      popular: false
    }
  ];

  const transactions = [
    {
      type: 'credit',
      description: 'Emergency Credit Package',
      amount: 50,
      cost: 99.00,
      date: 'Today, 2:30 PM',
      isEmergency: true
    },
    {
      type: 'credit',
      description: 'Regular Credit Package',
      amount: 120,
      cost: 99.00,
      date: 'Today, 1:15 PM',
      isEmergency: false
    },
    {
      type: 'debit',
      description: 'Emergency Quote Purchase',
      amount: 1,
      cost: 2.00,
      date: 'Yesterday, 4:15 PM',
      isEmergency: true
    },
    {
      type: 'debit',
      description: 'Regular Quote Purchase',
      amount: 1,
      cost: 1.00,
      date: 'Dec 25, 2024',
      isEmergency: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SharedHeader/>
      <br></br>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Credits</h1>
          <p className="text-gray-600">Manage your regular and emergency credits</p>
        </div>

        {/* Credit Balance & Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <CreditCard className="h-6 w-6" />
              </div>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                View Details
              </Button>
            </div>
            <h2 className="text-3xl font-bold mb-1">248 Credits</h2>
            <p className="text-blue-100">Regular Credits Balance</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-red-500 to-red-600 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-white/10 rounded-lg">
                <Zap className="h-6 w-6" />
              </div>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                View Details
              </Button>
            </div>
            <h2 className="text-3xl font-bold mb-1">75 Credits</h2>
            <p className="text-red-100">Emergency Credits Balance</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Credit Expiry</h3>
                <p className="text-sm text-gray-500">Next expiry in 45 days</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              View Expiry Details
            </Button>
          </Card>
        </div>

        {/* Buy Credits Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Buy Credits</h2>
            <div className="flex gap-2">
              <Button 
                variant={creditType === 'regular' ? 'default' : 'outline'}
                onClick={() => setCreditType('regular')}
              >
                Regular Credits
              </Button>
              <Button 
                variant={creditType === 'emergency' ? 'default' : 'outline'}
                className={creditType === 'emergency' ? 'bg-red-600 hover:bg-red-700' : ''}
                onClick={() => setCreditType('emergency')}
              >
                <Zap className="h-4 w-4 mr-2" />
                Emergency Credits
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(creditType === 'regular' ? regularCreditPackages : emergencyCreditPackages).map((pkg, index) => (
              <CreditPackage
                key={index}
                package={pkg}
                isEmergency={creditType === 'emergency'}
                onSelect={() => console.log('Selected package:', pkg)}
              />
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>

            {/* Filters */}
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select 
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="month">This Month</option>
                  <option value="week">This Week</option>
                </select>

                <select
                  className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="regular">Regular Credits</option>
                  <option value="emergency">Emergency Credits</option>
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {transactions.map((transaction, index) => (
              <TransactionRow key={index} transaction={transaction} />
            ))}
          </div>

          <div className="p-6 border-t">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Showing 4 of 24 transactions
              </p>
              <div className="flex gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      {/* Footer Actions - Mobile Only */}
      <SharedFooter2/>
    </div>
  );
};

export default CreditsPage;