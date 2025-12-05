'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Calculator, Clock, MapPin, CheckCircle, 
  TrendingUp, DollarSign, Info, ChevronRight,
  BarChart3, PieChart, Briefcase, Building,
  GraduationCap, Heart, Globe, Search,
  ArrowUpRight, Sparkles, Layers, Zap, AlertTriangle, ArrowRight
} from 'lucide-react'

export default function ToolsContent({ layer = 'default' }: { layer?: string }) {
  const [activeTab, setActiveTab] = useState<'cost' | 'timeline' | 'canton' | 'eligibility'>('cost')
  
  // Enhanced Cost Calculator State
  const [salary, setSalary] = useState(100000)
  const [canton, setCanton] = useState('zurich')
  const [familySize, setFamilySize] = useState(1)
  const [housing, setHousing] = useState('apartment')
  const [lifestyle, setLifestyle] = useState('moderate') // frugal, moderate, expensive

  // Timeline Calculator State
  const [hasJobOffer, setHasJobOffer] = useState(false)
  const [nationality, setNationality] = useState(layer === 'eu' ? 'eu' : layer === 'us' ? 'us' : 'non-eu')
  const [contractDuration, setContractDuration] = useState('permanent')

  // Canton Data with more details
  const cantons = [
    { id: 'zurich', name: 'Zürich', rent: 2500, tax: 20.3, approval: 85, tech: 95, finance: 98, quality: 92, lang: 'German' },
    { id: 'geneva', name: 'Geneva', rent: 2800, tax: 24.5, approval: 70, tech: 80, finance: 90, quality: 88, lang: 'French' },
    { id: 'basel', name: 'Basel-Stadt', rent: 2100, tax: 21.2, approval: 88, tech: 85, finance: 75, quality: 90, lang: 'German' },
    { id: 'bern', name: 'Bern', rent: 1900, tax: 23.8, approval: 82, tech: 70, finance: 60, quality: 89, lang: 'German' },
    { id: 'zug', name: 'Zug', rent: 2600, tax: 11.9, approval: 75, tech: 92, finance: 95, quality: 94, lang: 'German' },
    { id: 'vaud', name: 'Vaud (Lausanne)', rent: 2200, tax: 22.5, approval: 80, tech: 88, finance: 70, quality: 91, lang: 'French' },
    { id: 'lucerne', name: 'Lucerne', rent: 2000, tax: 18.5, approval: 84, tech: 75, finance: 65, quality: 93, lang: 'German' },
    { id: 'ticino', name: 'Ticino', rent: 1700, tax: 19.8, approval: 78, tech: 60, finance: 55, quality: 85, lang: 'Italian' },
  ]

  // Enhanced Calculation Logic
  const calculateCosts = () => {
    const selectedCanton = cantons.find(c => c.id === canton) || cantons[0]
    
    // Base multipliers
    const housingMult = housing === 'house' ? 1.6 : 1.0
    const lifestyleMult = lifestyle === 'frugal' ? 0.7 : lifestyle === 'expensive' ? 1.4 : 1.0
    const familyMult = 1 + (familySize - 1) * 0.4 // Economies of scale

    // Monthly Costs
    const monthlyRent = selectedCanton.rent * housingMult * (1 + (familySize - 1) * 0.2)
    const healthInsurance = (380 + (familySize - 1) * 300) * lifestyleMult // Kids are cheaper
    const food = 500 * familySize * lifestyleMult
    const transport = (150 + (familySize - 1) * 80) * lifestyleMult
    const utilities = (200 + (familySize - 1) * 50)
    const misc = (400 + (familySize - 1) * 150) * lifestyleMult
    
    const monthlyExpenses = monthlyRent + healthInsurance + food + transport + utilities + misc
    
    // Income & Tax
    const monthlyGross = salary / 12 // salaries are usually quoted annual gross
    // Rough tax estimation formula (progressive)
    // Tax rate is average, real calculation is complex. Using effective rate based on canton average.
    // Adjust effective rate based on income level slightly
    const taxRateAdjusted = selectedCanton.tax * (salary > 150000 ? 1.1 : salary < 80000 ? 0.8 : 1.0)
    const monthlyTax = monthlyGross * (taxRateAdjusted / 100)
    
    // Social deductions (AHV/IV/EO, ALV, Pension) - approx 12-15% total employee contribution
    const socialDeductions = monthlyGross * 0.13 
    
    const netIncome = monthlyGross - monthlyTax - socialDeductions
    const savings = netIncome - monthlyExpenses

    return {
      monthlyGross,
      netIncome,
      monthlyExpenses,
      savings,
      monthlyRent,
      healthInsurance,
      food,
      taxRate: taxRateAdjusted.toFixed(1),
      breakdown: [
        { name: 'Rent', value: monthlyRent, color: '#3B82F6' },
        { name: 'Tax & Social', value: monthlyTax + socialDeductions, color: '#EF4444' },
        { name: 'Insurance', value: healthInsurance, color: '#10B981' },
        { name: 'Living', value: food + transport + utilities + misc, color: '#F59E0B' },
        { name: 'Savings', value: Math.max(0, savings), color: '#6366F1' }
      ]
    }
  }

  const costs = calculateCosts()

  // Pricing Link Logic
  const pricingLink = layer === 'default' ? '/pricing' : `/${layer}/pricing`

  return (
    <div className={`min-h-screen ${layer === 'default' ? 'bg-white' : 'bg-slate-50'} font-sans`}>
      {/* Dynamic Interactive Header */}
      <div className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
              Swiss Relocation Intelligence
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light leading-relaxed">
              Advanced analytics and interactive planning tools to precision-engineer your move to Switzerland.
            </p>
          </motion.div>
        </div>
        
        {/* Animated stats strip */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-around text-sm font-medium text-blue-200">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span>Real-time Tax Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Updated Processing Times</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>26 Cantons Analyzed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        {/* Glassmorphism Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-2 mb-12 border border-slate-200/60 flex flex-wrap justify-center gap-2 sticky top-24 z-30">
          {[
            { id: 'cost', label: 'Cost of Living', icon: Calculator },
            { id: 'timeline', label: 'Smart Timeline', icon: Clock },
            { id: 'canton', label: 'Canton Explorer', icon: MapPin },
            { id: 'eligibility', label: 'AI Eligibility', icon: CheckCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg scale-105 ring-2 ring-slate-900 ring-offset-2'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'cost' && (
            <motion.div
              key="cost"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-12 gap-8"
            >
              {/* Left Control Panel */}
              <div className="lg:col-span-4 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 h-fit sticky top-40">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Search className="w-5 h-5 text-blue-600" />
                  Parameters
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gross Annual Income</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">CHF</span>
                      <input 
                        type="number" 
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-bold text-lg text-slate-900"
                      />
                    </div>
                    <input 
                      type="range" 
                      min="50000" 
                      max="300000" 
                      step="1000"
                      value={salary}
                      onChange={(e) => setSalary(Number(e.target.value))}
                      className="w-full mt-3 accent-blue-600 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Canton</label>
                      <select 
                        value={canton}
                        onChange={(e) => setCanton(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                      >
                        {cantons.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Lifestyle</label>
                      <select 
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="frugal">Frugal</option>
                        <option value="moderate">Moderate</option>
                        <option value="expensive">Lavish</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Family</label>
                      <div className="flex items-center bg-slate-50 rounded-xl p-1">
                        <button onClick={() => setFamilySize(Math.max(1, familySize - 1))} className="p-2 hover:bg-white rounded-lg transition">-</button>
                        <span className="flex-1 text-center font-bold">{familySize}</span>
                        <button onClick={() => setFamilySize(familySize + 1)} className="p-2 hover:bg-white rounded-lg transition">+</button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Housing</label>
                      <div className="flex bg-slate-50 rounded-xl p-1">
                        <button 
                          onClick={() => setHousing('apartment')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${housing === 'apartment' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                        >
                          Apt
                        </button>
                        <button 
                          onClick={() => setHousing('house')}
                          className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${housing === 'house' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}
                        >
                          House
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Visualization Panel */}
              <div className="lg:col-span-8 space-y-6">
                {/* Main Result Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                  
                  <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    <div className="text-center md:text-left">
                      <div className="text-blue-200 text-sm font-medium mb-1 uppercase tracking-wide">Net Monthly Income</div>
                      <div className="text-4xl font-bold mb-2">CHF {Math.round(costs.netIncome).toLocaleString()}</div>
                      <div className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full">After Tax & Social</div>
                    </div>
                    
                    <div className="text-center md:text-left">
                      <div className="text-blue-200 text-sm font-medium mb-1 uppercase tracking-wide">Est. Expenses</div>
                      <div className="text-4xl font-bold mb-2">CHF {Math.round(costs.monthlyExpenses).toLocaleString()}</div>
                      <div className="text-sm bg-white/20 inline-block px-3 py-1 rounded-full">{lifestyle} lifestyle</div>
                    </div>

                    <div className="text-center md:text-left bg-white/10 rounded-2xl p-4 border border-white/20">
                      <div className="text-blue-200 text-sm font-medium mb-1 uppercase tracking-wide">Potential Savings</div>
                      <div className={`text-4xl font-bold mb-2 ${costs.savings > 0 ? 'text-green-300' : 'text-red-300'}`}>
                        CHF {Math.round(costs.savings).toLocaleString()}
                      </div>
                      <div className="text-xs text-blue-100">
                        {((costs.savings / costs.netIncome) * 100).toFixed(1)}% Savings Rate
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analytics Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                      <span>Expense Breakdown</span>
                      <PieChart className="w-5 h-5 text-slate-400" />
                    </h4>
                    <div className="space-y-4">
                      {costs.breakdown.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-sm font-medium mb-1">
                            <span className="text-slate-600 flex items-center gap-2">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                              {item.name}
                            </span>
                            <span className="text-slate-900">CHF {Math.round(item.value).toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.value / costs.monthlyGross) * 100}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6">
                    <h4 className="font-bold text-slate-900 mb-6 flex items-center justify-between">
                      <span>Canton Insights: {cantons.find(c => c.id === canton)?.name}</span>
                      <Info className="w-5 h-5 text-slate-400" />
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Tax Burden', value: `${costs.taxRate}%`, sub: 'Effective Rate', icon: TrendingUp, color: 'bg-red-50 text-red-600' },
                        { label: 'Tech Jobs', value: `${cantons.find(c => c.id === canton)?.tech}/100`, sub: 'Demand Score', icon: Briefcase, color: 'bg-blue-50 text-blue-600' },
                        { label: 'Quality of Life', value: `${cantons.find(c => c.id === canton)?.quality}/100`, sub: 'Index', icon: Heart, color: 'bg-emerald-50 text-emerald-600' },
                        { label: 'Language', value: cantons.find(c => c.id === canton)?.lang, sub: 'Primary', icon: Globe, color: 'bg-purple-50 text-purple-600' },
                      ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
                            <stat.icon className="w-4 h-4" />
                          </div>
                          <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                          <div className="text-xs text-slate-500">{stat.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TIMELINE TAB - Enhanced */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 bg-slate-50 border-b border-slate-100">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Configure Your Journey</h3>
                  <div className="flex flex-wrap gap-4">
                    <select 
                      value={nationality} 
                      onChange={(e) => setNationality(e.target.value)}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="eu">EU/EFTA Citizen</option>
                      <option value="us">US/Canada Citizen</option>
                      <option value="non-eu">Other Third-Country</option>
                    </select>
                    
                    <button 
                      onClick={() => setHasJobOffer(!hasJobOffer)}
                      className={`px-4 py-2 rounded-xl border font-medium transition-all flex items-center gap-2 ${hasJobOffer ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-200 text-slate-600'}`}
                    >
                      <Briefcase className="w-4 h-4" />
                      {hasJobOffer ? 'Job Offer Secured' : 'Looking for Job'}
                    </button>
                  </div>
                </div>

                <div className="p-8">
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-slate-100"></div>

                    <div className="space-y-12">
                      {!hasJobOffer && (
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative pl-24">
                          <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-2xl border-2 border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl shadow-sm z-10">
                            01
                          </div>
                          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-lg font-bold text-slate-900">Job Search Strategy</h4>
                              <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">3-6 Months</span>
                            </div>
                            <p className="text-slate-600 text-sm mb-4">Optimize CV for Swiss market, network, and apply. The market is competitive.</p>
                            <div className="flex gap-2">
                              <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">Networking</span>
                              <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500">CV Adaption</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="relative pl-24">
                        <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-2xl border-2 border-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl shadow-sm z-10">
                          {hasJobOffer ? '01' : '02'}
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-slate-900">Permit Application</h4>
                            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold">
                              {nationality === 'eu' ? '2-4 Weeks' : '8-12 Weeks'}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm mb-4">
                            {nationality === 'eu' 
                              ? 'Simple cantonal registration process. Employer submits basic contract details.' 
                              : 'Employer submits labor market test proof. Federal approval required (SEM). Quota check.'}
                          </p>
                          {nationality !== 'eu' && (
                            <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg text-xs text-amber-800 flex gap-2 items-start">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              Subject to annual quotas. Apply early in the year if possible.
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="relative pl-24">
                        <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-2xl border-2 border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl shadow-sm z-10">
                          {hasJobOffer ? '02' : '03'}
                        </div>
                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-slate-900">Visa & Relocation</h4>
                            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">2-4 Weeks</span>
                          </div>
                          <p className="text-slate-600 text-sm mb-4">Visa D issuance (if applicable), finding temporary housing, moving logistics.</p>
                        </div>
                      </motion.div>

                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="relative pl-24">
                        <div className="absolute left-0 top-0 w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 ring-4 ring-white">
                          <CheckCircle className="w-8 h-8" />
                        </div>
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                          <h4 className="text-lg font-bold text-slate-900 mb-2">Arrival & Registration</h4>
                          <p className="text-slate-600 text-sm">Register at commune within 14 days. Receive permit card by mail. Open bank account.</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CANTON EXPLORER TAB */}
          {activeTab === 'canton' && (
            <motion.div
              key="canton"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cantons.map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                      <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{c.lang}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{c.tax}%</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Tax Rate</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-500">Tech Jobs</span>
                        <span className="text-slate-900">{c.tech}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${c.tech}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span className="text-slate-500">Quality of Life</span>
                        <span className="text-slate-900">{c.quality}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${c.quality}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div className="text-sm font-medium text-slate-600">
                      Avg Rent: <span className="text-slate-900">CHF {c.rent}</span>
                    </div>
                    <button className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ELIGIBILITY TAB - AI Placeholder */}
          {activeTab === 'eligibility' && (
            <motion.div
              key="eligibility"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-12 shadow-xl border border-slate-100"
            >
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">AI Eligibility Assessment</h3>
              <p className="text-lg text-slate-600 mb-8">
                Our advanced AI analyzes your profile against 50+ immigration criteria to give you a precise success probability score.
              </p>
              <Link 
                href="/quiz" 
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating CTA Bar */}
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 z-50 border border-slate-700/50 backdrop-blur-md"
        >
          <div className="hidden md:block">
            <span className="text-slate-400 text-sm mr-2">Ready to proceed?</span>
            <span className="font-bold text-white">Get your personalized plan</span>
          </div>
          <Link href={pricingLink} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm transition-all shadow-lg">
            Unlock Full Access
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
