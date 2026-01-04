'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import { 
  Calculator, Clock, MapPin, CheckCircle, 
  TrendingUp, DollarSign, Info, ChevronRight,
  BarChart3, PieChart, Briefcase, Building,
  GraduationCap, Heart, Globe, Search,
  ArrowUpRight, Sparkles, Layers, Zap, AlertTriangle, ArrowRight,
  FileText, Target, Award, TrendingDown, Activity, Users
} from 'lucide-react'

export default function ToolsContent({ layer = 'default' }: { layer?: string }) {
  const [activeTab, setActiveTab] = useState<'cost' | 'timeline' | 'canton' | 'eligibility'>('cost')
  
  // Enhanced Cost Calculator State
  const [salary, setSalary] = useState(100000)
  const [canton, setCanton] = useState('zurich')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [housing, setHousing] = useState('apartment')
  const [bedrooms, setBedrooms] = useState(1) // 1, 2, 3, 4, etc.
  const [lifestyle, setLifestyle] = useState('moderate') // frugal, moderate, expensive

  // Timeline Calculator State
  const [hasJobOffer, setHasJobOffer] = useState(false)
  const [nationality, setNationality] = useState(layer === 'eu' ? 'eu' : layer === 'us' ? 'us' : 'non-eu')
  const [contractDuration, setContractDuration] = useState('permanent')

  // Canton Data with more details (reduced base rent prices and tax rates)
  const cantons = [
    { id: 'zurich', name: 'Zürich', rent: 1500, tax: 12.5, approval: 85, tech: 95, finance: 98, quality: 92, lang: 'German' },
    { id: 'geneva', name: 'Geneva', rent: 1650, tax: 15.0, approval: 70, tech: 80, finance: 90, quality: 88, lang: 'French' },
    { id: 'basel', name: 'Basel-Stadt', rent: 1250, tax: 13.5, approval: 88, tech: 85, finance: 75, quality: 90, lang: 'German' },
    { id: 'bern', name: 'Bern', rent: 1150, tax: 14.5, approval: 82, tech: 70, finance: 60, quality: 89, lang: 'German' },
    { id: 'zug', name: 'Zug', rent: 1600, tax: 7.5, approval: 75, tech: 92, finance: 95, quality: 94, lang: 'German' },
    { id: 'vaud', name: 'Vaud (Lausanne)', rent: 1350, tax: 14.0, approval: 80, tech: 88, finance: 70, quality: 91, lang: 'French' },
    { id: 'lucerne', name: 'Lucerne', rent: 1200, tax: 11.5, approval: 84, tech: 75, finance: 65, quality: 93, lang: 'German' },
    { id: 'ticino', name: 'Ticino', rent: 1000, tax: 13.0, approval: 78, tech: 60, finance: 55, quality: 85, lang: 'Italian' },
  ]

  // Enhanced Calculation Logic with useMemo for proper reactivity
  const costs = useMemo(() => {
    const selectedCanton = cantons.find(c => c.id === canton) || cantons[0]
    
    // Calculate effective family size (children count as 0.5x for most costs)
    const totalFamilySize = adults + children
    const effectiveFamilySize = adults + (children * 0.5) // Children cost ~50% of adults
    
    // Base multipliers
    const housingMult = housing === 'house' ? 1.6 : 1.0
    const lifestyleMult = lifestyle === 'frugal' ? 0.7 : lifestyle === 'expensive' ? 1.4 : 1.0
    
    // Bedroom multiplier: base rent increases with more bedrooms
    // 1 bedroom = 1.0x, 2 bedrooms = 1.4x, 3 bedrooms = 1.8x, 4 bedrooms = 2.2x, etc.
    const bedroomMult = 1.0 + (bedrooms - 1) * 0.4

    // Monthly Costs
    // Ensure rent starts at minimum 1000 CHF for cost of living
    // Rent only depends on housing type and number of bedrooms, not family size
    const monthlyRent = Math.max(1000, selectedCanton.rent * housingMult * bedroomMult)
    
    // Health insurance: first adult 380, additional adults 300, children 200 (cheaper)
    const healthInsurance = (380 + (adults - 1) * 300 + children * 200) * lifestyleMult
    
    // Food: adults 500, children 250 (50% of adult cost)
    const food = (500 * adults + 250 * children) * lifestyleMult
    
    // Transport: base 150, additional adults 80, children 40 (50% of adult cost)
    const transport = (150 + (adults - 1) * 80 + children * 40) * lifestyleMult
    
    // Utilities: base 200, additional adults 50, children 25 (50% of adult cost)
    const utilities = (200 + (adults - 1) * 50 + children * 25)
    
    // Misc: base 400, additional adults 150, children 75 (50% of adult cost)
    const misc = (400 + (adults - 1) * 150 + children * 75) * lifestyleMult
    
    const monthlyExpenses = monthlyRent + healthInsurance + food + transport + utilities + misc
    
    // Income & Tax
    const monthlyGross = salary / 12
    // Reduced tax rate adjustments (less aggressive multipliers)
    const taxRateAdjusted = selectedCanton.tax * (salary > 150000 ? 1.05 : salary < 80000 ? 0.85 : 1.0)
    const monthlyTax = monthlyGross * (taxRateAdjusted / 100)
    
    // Social deductions (AHV/IV/EO, ALV, Pension) - reduced to 7%
    const socialDeductions = monthlyGross * 0.07 
    
    const netIncome = monthlyGross - monthlyTax - socialDeductions
    const baseSavings = netIncome - monthlyExpenses
    const savings = Math.max(baseSavings, 0)
    const annualSavings = savings * 12
    const savingsRate = netIncome > 0 ? (savings / netIncome) * 100 : 0
    const savings5Year = annualSavings * 5
    const savings10Year = annualSavings * 10

    return {
      monthlyGross: Number(monthlyGross.toFixed(2)),
      netIncome: Number(netIncome.toFixed(2)),
      monthlyExpenses: Number(monthlyExpenses.toFixed(2)),
      savings: Number(savings.toFixed(2)),
      annualSavings: Number(annualSavings.toFixed(2)),
      savingsRate: Number(savingsRate.toFixed(1)),
      savings5Year: Number(savings5Year.toFixed(2)),
      savings10Year: Number(savings10Year.toFixed(2)),
      monthlyRent: Number(monthlyRent.toFixed(2)),
      healthInsurance: Number(healthInsurance.toFixed(2)),
      food: Number(food.toFixed(2)),
      transport: Number(transport.toFixed(2)),
      utilities: Number(utilities.toFixed(2)),
      misc: Number(misc.toFixed(2)),
      taxRate: taxRateAdjusted.toFixed(1),
      breakdown: [
        { name: 'Rent', value: Number(monthlyRent.toFixed(2)), color: '#3B82F6' },
        { name: 'Tax & Social', value: Number((monthlyTax + socialDeductions).toFixed(2)), color: '#EF4444' },
        { name: 'Insurance', value: Number(healthInsurance.toFixed(2)), color: '#10B981' },
        { name: 'Living', value: Number((food + transport + utilities + misc).toFixed(2)), color: '#F59E0B' },
        { name: 'Savings', value: Number(savings.toFixed(2)), color: '#10B981' }
      ]
    }
  }, [salary, canton, adults, children, housing, bedrooms, lifestyle])

  // Pricing Link Logic
  const pricingLink = layer === 'default' ? '/pricing' : `/${layer}/pricing`

  return (
    <div className={`min-h-screen ${layer === 'default' ? 'bg-white' : 'bg-slate-50'} font-sans`}>
      {/* Simplified Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Swiss Relocation Tools
            </h1>
            <p className="text-lg text-slate-600">
              Professional calculators and planning tools for your move to Switzerland
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Simplified Featured Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/tools/cv-editor" className="group">
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">CV Editor</h3>
                  <p className="text-sm text-slate-600 mb-4">Create ATS-optimized CVs with professional templates</p>
                  <span className="text-sm text-blue-600 font-medium group-hover:underline inline-flex items-center gap-1">
                    Start creating <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/apartment-finder" className="group">
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <Building className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Apartment Finder</h3>
                  <p className="text-sm text-slate-600 mb-4">Find apartments across Switzerland</p>
                  <span className="text-sm text-emerald-600 font-medium group-hover:underline inline-flex items-center gap-1">
                    Browse listings <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tools/dossier-generator" className="group">
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">Dossier Generator</h3>
                  <p className="text-sm text-slate-600 mb-4">Generate professional application packages</p>
                  <span className="text-sm text-purple-600 font-medium group-hover:underline inline-flex items-center gap-1">
                    Create dossier <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Simplified Tab Navigation */}
        <div className="mb-8 border-b border-slate-200">
          <div className="flex flex-wrap gap-1">
            {[
              { id: 'cost', label: 'Cost of Living', icon: Calculator },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'canton', label: 'Canton Explorer', icon: MapPin },
              { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
                aria-label={`Switch to ${tab.label} tab`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'cost' && (
            <div key="cost" className="grid lg:grid-cols-12 gap-8">
              {/* Simplified Control Panel */}
              <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-6 h-fit sticky top-24">
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  Parameters
                </h3>

                <div className="space-y-6">
                  {/* Salary Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Gross Annual Income
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">CHF</span>
                      <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
                        aria-label="Gross annual income in Swiss francs"
                      />
                    </div>
                    <div className="mt-3">
                      <input
                        type="range"
                        min="50000"
                        max="300000"
                        step="5000"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                        aria-label="Adjust salary range"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>50k</span>
                        <span>175k</span>
                        <span>300k+</span>
                      </div>
                    </div>
                  </div>

                  {/* Canton & Lifestyle Selectors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Canton
                      </label>
                      <select
                        value={canton}
                        onChange={(e) => setCanton(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
                        aria-label="Select canton"
                      >
                        {cantons.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Lifestyle
                      </label>
                      <select
                        value={lifestyle}
                        onChange={(e) => setLifestyle(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-slate-900"
                        aria-label="Select lifestyle budget"
                      >
                        <option value="frugal">Frugal</option>
                        <option value="moderate">Moderate</option>
                        <option value="expensive">Lavish</option>
                      </select>
                    </div>
                  </div>

                  {/* Family Size Controls */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Adults
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="p-2 hover:bg-slate-50 text-slate-600"
                          aria-label="Decrease number of adults"
                        >
                          −
                        </button>
                        <div className="flex-1 text-center py-2">
                          <span className="text-lg font-semibold text-slate-900">{adults}</span>
                        </div>
                        <button
                          onClick={() => setAdults(adults + 1)}
                          className="p-2 hover:bg-slate-50 text-slate-600"
                          aria-label="Increase number of adults"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Children
                      </label>
                      <div className="flex items-center border border-slate-300 rounded-lg">
                        <button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="p-2 hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                          aria-label="Decrease number of children"
                          disabled={children === 0}
                        >
                          −
                        </button>
                        <div className="flex-1 text-center py-2">
                          <span className="text-lg font-semibold text-slate-900">{children}</span>
                        </div>
                        <button
                          onClick={() => setChildren(children + 1)}
                          className="p-2 hover:bg-slate-50 text-slate-600"
                          aria-label="Increase number of children"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Housing Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Housing Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setHousing('apartment')}
                        className={`py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                          housing === 'apartment'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Apartment
                      </button>
                      <button
                        onClick={() => setHousing('house')}
                        className={`py-2.5 px-4 rounded-lg text-sm font-medium border transition-colors ${
                          housing === 'house'
                            ? 'bg-blue-50 border-blue-500 text-blue-700'
                            : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        House
                      </button>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Bedrooms
                    </label>
                    <div className="flex items-center border border-slate-300 rounded-lg">
                      <button
                        onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                        className="p-2 hover:bg-slate-50 text-slate-600 disabled:opacity-50"
                        disabled={bedrooms === 1}
                      >
                        −
                      </button>
                      <div className="flex-1 text-center py-2">
                        <span className="text-lg font-semibold text-slate-900">{bedrooms}</span>
                      </div>
                      <button
                        onClick={() => setBedrooms(bedrooms + 1)}
                        className="p-2 hover:bg-slate-50 text-slate-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simplified Results Panel */}
              <div className="lg:col-span-8 space-y-6">
                {/* Main Results */}
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Net Monthly Income</div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">
                        CHF {costs.netIncome.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-slate-500">After tax & social security</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Monthly Expenses</div>
                      <div className="text-3xl font-bold text-slate-900 mb-1">
                        CHF {costs.monthlyExpenses.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <div className="text-xs text-slate-500 capitalize">{lifestyle} lifestyle</div>
                    </div>
                  </div>
                </div>

                {/* Savings */}
                {costs.savings > 0 && (
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Savings</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Monthly</div>
                        <div className="text-xl font-semibold text-slate-900">
                          CHF {costs.savings.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">{costs.savingsRate}% savings rate</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Annual</div>
                        <div className="text-xl font-semibold text-slate-900">
                          CHF {costs.annualSavings.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-600 mb-1">5-Year Projection</div>
                        <div className="text-xl font-semibold text-slate-900">
                          CHF {costs.savings5Year.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Analytics Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Expense Breakdown */}
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Expense Breakdown</h4>
                    <div className="space-y-4">
                      {costs.breakdown.map((item, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center text-sm mb-1.5">
                            <span className="text-slate-700 flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                              {item.name}
                            </span>
                            <span className="text-slate-900 font-semibold">CHF {item.value.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ width: `${(item.value / costs.monthlyGross) * 100}%`, backgroundColor: item.color }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {((item.value / costs.monthlyGross) * 100).toFixed(1)}% of gross income
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canton Insights */}
                  <div className="bg-white border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Canton: {cantons.find(c => c.id === canton)?.name}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Tax Rate', value: `${costs.taxRate}%` },
                        { label: 'Tech Jobs', value: `${cantons.find(c => c.id === canton)?.tech}/100` },
                        { label: 'Quality of Life', value: `${cantons.find(c => c.id === canton)?.quality}/100` },
                        { label: 'Language', value: cantons.find(c => c.id === canton)?.lang },
                      ].map((stat, i) => (
                        <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="text-lg font-semibold text-slate-900 mb-1">{stat.value}</div>
                          <div className="text-xs text-slate-600">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TIMELINE TAB - Modernized */}
          {activeTab === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 30, scale: 0.95 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
                delayChildren: 0.1
              }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
                <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-white border-b border-slate-200">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <Clock className="w-7 h-7 text-blue-600" />
                    <span>Configure Your Journey</span>
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    <select 
                      value={nationality} 
                      onChange={(e) => setNationality(e.target.value)}
                      className="px-5 py-3 rounded-xl border-2 border-slate-200 bg-white font-semibold text-slate-700 focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 hover:border-slate-300"
                      aria-label="Select your nationality"
                    >
                      <option value="eu">EU/EFTA Citizen</option>
                      <option value="us">US/Canada Citizen</option>
                      <option value="non-eu">Other Third-Country</option>
                    </select>
                    
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setHasJobOffer(!hasJobOffer)}
                      className={`px-5 py-3 rounded-xl border-2 font-semibold transition-all flex items-center gap-2.5 ${
                        hasJobOffer 
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm' 
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                      aria-label={hasJobOffer ? 'Job offer secured' : 'Looking for job'}
                      aria-pressed={hasJobOffer}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span>{hasJobOffer ? 'Job Offer Secured' : 'Looking for Job'}</span>
                    </motion.button>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="relative">
                    {/* Enhanced Vertical Line */}
                    <div className="absolute left-6 md:left-8 top-4 bottom-4 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-emerald-200 rounded-full"></div>

                    <div className="space-y-10 md:space-y-12">
                      {!hasJobOffer && (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }} 
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5 }}
                          className="relative pl-20 md:pl-24"
                        >
                          <div className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border-2 border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg md:text-xl shadow-md z-10 ring-2 ring-blue-100">
                            01
                          </div>
                          <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-lg md:text-xl font-bold text-slate-900">Job Search Strategy</h4>
                              <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold border border-blue-200">3-6 Months</span>
                            </div>
                            <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">Optimize CV for Swiss market, network, and apply. The market is competitive.</p>
                            <div className="flex gap-2 flex-wrap">
                              <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 font-medium">Networking</span>
                              <span className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg text-slate-600 font-medium">CV Adaptation</span>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.1, duration: 0.5 }} 
                        className="relative pl-20 md:pl-24"
                      >
                        <div className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border-2 border-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-lg md:text-xl shadow-md z-10 ring-2 ring-indigo-100">
                          {hasJobOffer ? '01' : '02'}
                        </div>
                        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-indigo-200">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg md:text-xl font-bold text-slate-900">Permit Application</h4>
                            <span className="bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold border border-indigo-200">
                              {nationality === 'eu' ? '2-4 Weeks' : '8-12 Weeks'}
                            </span>
                          </div>
                          <p className="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                            {nationality === 'eu' 
                              ? 'Simple cantonal registration process. Employer submits basic contract details.' 
                              : 'Employer submits labor market test proof. Federal approval required (SEM). Quota check.'}
                          </p>
                          {nationality !== 'eu' && (
                            <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-xl text-xs md:text-sm text-amber-800 flex gap-3 items-start">
                              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
                              <span>Subject to annual quotas. Apply early in the year if possible.</span>
                            </div>
                          )}
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.2, duration: 0.5 }} 
                        className="relative pl-20 md:pl-24"
                      >
                        <div className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl border-2 border-emerald-200 flex items-center justify-center text-emerald-600 font-bold text-lg md:text-xl shadow-md z-10 ring-2 ring-emerald-100">
                          {hasJobOffer ? '02' : '03'}
                        </div>
                        <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="text-lg md:text-xl font-bold text-slate-900">Visa & Relocation</h4>
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200">2-4 Weeks</span>
                          </div>
                          <p className="text-slate-600 text-sm md:text-base leading-relaxed">Visa D issuance (if applicable), finding temporary housing, moving logistics.</p>
                        </div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, x: -20 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.3, duration: 0.5 }} 
                        className="relative pl-20 md:pl-24"
                      >
                        <div className="absolute left-0 top-0 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg z-10 ring-4 ring-white">
                          <CheckCircle className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-300 shadow-md">
                          <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Arrival & Registration</h4>
                          <p className="text-slate-600 text-sm md:text-base leading-relaxed">Register at commune within 14 days. Receive permit card by mail. Open bank account.</p>
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.05,
                delayChildren: 0.1
              }}
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
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: 15 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
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

      </div>
    </div>
  )
}
