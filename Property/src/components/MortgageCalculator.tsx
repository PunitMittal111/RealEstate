import React, { useState, useEffect } from "react";
import { Calculator, DollarSign, Percent, Calendar } from "lucide-react";

const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTax, setPropertyTax] = useState<number>(4800);
  const [insurance, setInsurance] = useState<number>(1200);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, interestRate, loanTerm, propertyTax, insurance]);

  const calculateMortgage = () => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal <= 0 || monthlyRate <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      return;
    }

    const monthlyPI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyTaxInsurance = (propertyTax + insurance) / 12;
    const totalMonthly = monthlyPI + monthlyTaxInsurance;
    const totalInterestPaid = monthlyPI * numberOfPayments - principal;

    setMonthlyPayment(totalMonthly);
    setTotalInterest(totalInterestPaid);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const downPaymentPercent = ((downPayment / homePrice) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">
          Mortgage Calculator
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Home Price
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ({downPaymentPercent}%)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="range"
              min="0"
              max={homePrice * 0.3}
              step="1000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Percent className="inline h-4 w-4 mr-1" />
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline h-4 w-4 mr-1" />
              Loan Term (years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={15}>15 years</option>
              <option value={20}>20 years</option>
              <option value={25}>25 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Property Tax
            </label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Insurance
            </label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Payment Breakdown
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Principal & Interest</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(
                    monthlyPayment - (propertyTax + insurance) / 12
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Property Tax</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(propertyTax / 12)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600">Insurance</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(insurance / 12)}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 bg-blue-100 rounded-md px-4">
                <span className="text-lg font-semibold text-blue-800">
                  Total Monthly Payment
                </span>
                <span className="text-xl font-bold text-blue-800">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Loan Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Loan Amount</span>
                <span className="font-semibold">
                  {formatCurrency(homePrice - downPayment)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest Paid</span>
                <span className="font-semibold">
                  {formatCurrency(totalInterest)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Payments</span>
                <span className="font-semibold">
                  {formatCurrency(homePrice - downPayment + totalInterest)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Affordability Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Monthly payment should be ≤28% of gross income</li>
              <li>• Consider a larger down payment to reduce monthly costs</li>
              <li>• Factor in HOA fees and maintenance costs</li>
              <li>• Get pre-approved to strengthen your offer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
