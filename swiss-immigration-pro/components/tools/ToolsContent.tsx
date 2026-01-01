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
      {/* Enhanced Professional Header */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Refined Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 60%), radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 60%)",
              backgroundSize: "60% 60%, 40% 40%, 50% 50%"
            }}
          />
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        {/* Subtle Floating Elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-40 h-40 bg-blue-500/8 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/8 rounded-full blur-2xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8"
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm font-semibold text-blue-100 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>AI-Powered Professional Tools</span>
            </motion.div>

            {/* Refined Title with Better Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6 md:mb-8 tracking-tight leading-[1.1]"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-50 to-white drop-shadow-lg">
                Swiss
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-purple-400 drop-shadow-lg">
                Relocation
              </span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 drop-shadow-lg">
                Intelligence
              </span>
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-slate-200/95 max-w-3xl mx-auto font-normal leading-relaxed px-4"
            >
              Enterprise-grade analytics and intelligent planning tools designed for
              <span className="font-semibold text-white"> seamless relocation</span> to Switzerland
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 md:mt-12 max-w-4xl mx-auto px-4"
            >
              {[
                { icon: BarChart3, label: "Real-time Data", value: "Updated Daily", iconBg: "bg-blue-500/20", iconBorder: "border-blue-400/20", iconColor: "text-blue-300" },
                { icon: Clock, label: "Processing Times", value: "Live Tracking", iconBg: "bg-emerald-500/20", iconBorder: "border-emerald-400/20", iconColor: "text-emerald-300" },
                { icon: MapPin, label: "26 Cantons", value: "Full Coverage", iconBg: "bg-purple-500/20", iconBorder: "border-purple-400/20", iconColor: "text-purple-300" },
                { icon: Zap, label: "AI-Powered", value: "Smart Analysis", iconBg: "bg-amber-500/20", iconBorder: "border-amber-400/20", iconColor: "text-amber-300" }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center gap-2.5 bg-white/5 backdrop-blur-md rounded-2xl px-4 py-4 md:px-5 md:py-5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                >
                  <div className={`p-2.5 ${stat.iconBg} rounded-xl border ${stat.iconBorder}`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs md:text-sm font-semibold text-white leading-tight">{stat.label}</div>
                    <div className="text-[10px] md:text-xs text-slate-300/80 mt-1">{stat.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8 relative z-20">
        {/* Enhanced CV Editor Featured Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <Link href="/tools/cv-editor" className="block group">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 md:p-10 text-white overflow-hidden hover:shadow-3xl transition-all duration-500 cursor-pointer">
              {/* Animated Background Gradient */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 opacity-50"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
                  backgroundSize: "200% 200%"
                }}
              />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="flex items-start md:items-center space-x-5">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-white/20 backdrop-blur-md rounded-2xl p-5 border border-white/30 group-hover:bg-white/30 transition-all duration-300 shadow-lg"
                    >
                      <FileText className="w-8 h-8 md:w-10 md:h-10" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold mb-2.5">ATS-Optimized CV Editor</h2>
                      <p className="text-blue-50/95 text-base md:text-lg leading-relaxed max-w-2xl">
                        Create professional, ATS-friendly CVs with real-time optimization and multiple premium templates
                      </p>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3 text-base md:text-lg font-semibold bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 group-hover:bg-white/30 transition-all duration-300"
                  >
                    <span>Start Creating</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    "6 Professional Templates",
                    "Real-time ATS Analysis",
                    "PDF & Word Export",
                    "Better than Canva"
                  ].map((badge, idx) => (
                    <motion.span
                      key={badge}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * idx }}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
                    >
                      {badge}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Enhanced Professional Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-12 md:mb-16"
        >
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/8 via-purple-500/8 to-emerald-500/8 rounded-3xl blur-2xl -z-10"></div>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-200/60 p-2 md:p-2.5 flex flex-wrap justify-center gap-2 md:gap-2.5 sticky top-20 md:top-24 z-30 relative overflow-hidden">
            {/* Refined Animated Background for Active Tab */}
            <motion.div
              className="absolute top-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg"
              layoutId="activeTabBackground"
              transition={{
                type: "spring",
                stiffness: 600,
                damping: 40,
                mass: 0.5
              }}
              style={{
                width: `${[
                  { id: 'cost', width: 150 },
                  { id: 'timeline', width: 145 },
                  { id: 'canton', width: 155 },
                  { id: 'eligibility', width: 140 },
                ].find(tab => tab.id === activeTab)?.width || 150}px`,
                height: '48px',
                left: `${[
                  { id: 'cost', left: 10 },
                  { id: 'timeline', left: 170 },
                  { id: 'canton', left: 325 },
                  { id: 'eligibility', left: 490 },
                ].find(tab => tab.id === activeTab)?.left || 10}px`
              }}
            />

            {[
              { id: 'cost', label: 'Cost of Living', icon: Calculator, iconColor: 'text-blue-600', bgColor: 'bg-blue-50', hoverBg: 'bg-blue-100' },
              { id: 'timeline', label: 'Smart Timeline', icon: Clock, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50', hoverBg: 'bg-emerald-100' },
              { id: 'canton', label: 'Canton Explorer', icon: MapPin, iconColor: 'text-purple-600', bgColor: 'bg-purple-50', hoverBg: 'bg-purple-100' },
              { id: 'eligibility', label: 'AI Eligibility', icon: CheckCircle, iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50', hoverBg: 'bg-indigo-100' },
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.97 }}
                className={`relative flex items-center gap-2.5 md:gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-2xl font-bold transition-all duration-300 group text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                aria-label={`Switch to ${tab.label} tab`}
                aria-pressed={activeTab === tab.id}
              >
                {/* Icon with refined background */}
                <div className={`p-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/25'
                    : `${tab.bgColor} group-hover:${tab.hoverBg}`
                }`}>
                  <tab.icon className={`w-4 h-4 md:w-5 md:h-4 transition-colors ${
                    activeTab === tab.id
                      ? 'text-white'
                      : tab.iconColor
                  }`} />
                </div>

                {/* Label */}
                <span className="relative z-10">{tab.label}</span>

                {/* Subtle hover effect overlay */}
                {activeTab !== tab.id && (
                  <div className="absolute inset-0 bg-slate-100/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Subtle bottom shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-gradient-to-t from-slate-900/5 to-transparent rounded-full blur-sm"></div>
        </motion.div>

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
              {/* Professional Control Panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="lg:col-span-4 bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8 h-fit sticky top-40 backdrop-blur-sm"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xl md:text-2xl font-bold text-slate-900 mb-6 md:mb-8 flex items-center gap-3"
                >
                  <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                    <Search className="w-5 h-5 text-blue-600" />
                  </div>
                  <span>Calculation Parameters</span>
                </motion.h3>

                <div className="space-y-8">
                  {/* Refined Salary Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2.5">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Gross Annual Income</span>
                      <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full font-semibold border border-emerald-200">
                        CHF {salary.toLocaleString('fr-CH')}
                      </span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-base pointer-events-none">CHF</span>
                      <input
                        type="number"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full pl-14 pr-4 py-3.5 rounded-xl border-2 border-slate-200 focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-lg text-slate-900 bg-white transition-all duration-300 hover:border-slate-300"
                        aria-label="Gross annual income in Swiss francs"
                      />
                    </div>
                    <div className="relative mt-4">
                      <input
                        type="range"
                        min="50000"
                        max="300000"
                        step="5000"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 rounded-full appearance-none cursor-pointer accent-blue-600"
                        style={{
                          background: `linear-gradient(to right, rgb(191, 219, 254) 0%, rgb(96, 165, 250) ${((salary - 50000) / 250000) * 100}%, rgb(226, 232, 240) ${((salary - 50000) / 250000) * 100}%, rgb(226, 232, 240) 100%)`
                        }}
                        aria-label="Adjust salary range"
                      />
                      {/* Range Labels */}
                      <div className="flex justify-between text-xs text-slate-500 mt-2.5 font-medium">
                        <span>50k</span>
                        <span>175k</span>
                        <span>300k+</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Refined Canton & Lifestyle Selectors */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span>Canton</span>
                      </label>
                      <div className="relative">
                        <select
                          value={canton}
                          onChange={(e) => setCanton(e.target.value)}
                          className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-slate-200 focus:ring-3 focus:ring-purple-500/20 focus:border-purple-500 bg-white transition-all duration-300 hover:border-slate-300 appearance-none cursor-pointer font-medium text-slate-900"
                          aria-label="Select canton"
                        >
                          {cantons.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-600" />
                        <span>Lifestyle Budget</span>
                      </label>
                      <div className="relative">
                        <select
                          value={lifestyle}
                          onChange={(e) => setLifestyle(e.target.value)}
                          className="w-full px-4 py-3 pr-10 rounded-xl border-2 border-slate-200 focus:ring-3 focus:ring-amber-500/20 focus:border-amber-500 bg-white transition-all duration-300 hover:border-slate-300 appearance-none cursor-pointer font-medium text-slate-900"
                          aria-label="Select lifestyle budget"
                        >
                          <option value="frugal">💰 Frugal</option>
                          <option value="moderate">⚖️ Moderate</option>
                          <option value="expensive">✨ Lavish</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Refined Family Size Controls */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  >
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4 text-indigo-600" />
                        <span>Working Adults</span>
                      </label>
                      <div className="flex items-center bg-slate-50 rounded-xl p-2 border-2 border-slate-200">
                        <motion.button
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          aria-label="Decrease number of adults"
                        >
                          <span className="text-lg font-bold">−</span>
                        </motion.button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-black text-slate-900">{adults}</span>
                          <div className="text-xs text-slate-500 font-medium">adult{adults > 1 ? 's' : ''}</div>
                        </div>
                        <motion.button
                          onClick={() => setAdults(adults + 1)}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                          aria-label="Increase number of adults"
                        >
                          <span className="text-lg font-bold">+</span>
                        </motion.button>
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-600" />
                        <span>Children</span>
                      </label>
                      <div className="flex items-center bg-slate-50 rounded-xl p-2 border-2 border-slate-200">
                        <motion.button
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                          aria-label="Decrease number of children"
                          disabled={children === 0}
                        >
                          <span className="text-lg font-bold">−</span>
                        </motion.button>
                        <div className="flex-1 text-center">
                          <span className="text-2xl font-black text-slate-900">{children}</span>
                          <div className="text-xs text-slate-500 font-medium">child{children !== 1 ? 'ren' : ''}</div>
                        </div>
                        <motion.button
                          onClick={() => setChildren(children + 1)}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                          aria-label="Increase number of children"
                        >
                          <span className="text-lg font-bold">+</span>
                        </motion.button>
                      </div>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xs text-slate-500 mt-2.5 flex items-center gap-1.5"
                      >
                        <Info className="w-3.5 h-3.5 text-slate-400" />
                        <span>Children cost ~50% less per adult</span>
                      </motion.p>
                    </div>
                  </motion.div>

                  {/* Refined Housing Toggle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4 text-emerald-600" />
                      <span>Housing Type</span>
                    </label>
                    <div className="flex bg-slate-50 rounded-xl p-1.5 border-2 border-slate-200 gap-2">
                      <motion.button
                        onClick={() => setHousing('apartment')}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          housing === 'apartment'
                            ? 'bg-white shadow-md text-blue-600 ring-2 ring-blue-500/20'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                        }`}
                        aria-label="Select apartment housing type"
                        aria-pressed={housing === 'apartment'}
                      >
                        🏢 Apartment
                      </motion.button>
                      <motion.button
                        onClick={() => setHousing('house')}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                          housing === 'house'
                            ? 'bg-white shadow-md text-emerald-600 ring-2 ring-emerald-500/20'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-white/70'
                        }`}
                        aria-label="Select house housing type"
                        aria-pressed={housing === 'house'}
                      >
                        🏠 House
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Refined Bedroom Selector */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="group"
                  >
                    <label className="block text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2">
                      <Building className="w-4 h-4 text-violet-600" />
                      <span>Bedrooms / Rooms</span>
                      <span className="ml-auto text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full font-semibold border border-violet-200">
                        {bedrooms} room{bedrooms > 1 ? 's' : ''}
                      </span>
                    </label>
                    <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-2 border-2 border-slate-200">
                      <motion.button
                        onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        aria-label="Decrease number of bedrooms"
                        disabled={bedrooms === 1}
                      >
                        <span className="text-lg font-bold">−</span>
                      </motion.button>

                      <div className="flex-1 grid grid-cols-6 gap-1.5">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <motion.button
                            key={num}
                            onClick={() => setBedrooms(num)}
                            whileTap={{ scale: 0.95 }}
                            className={`py-2.5 rounded-lg text-sm font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20 ${
                              bedrooms === num
                                ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-md ring-2 ring-violet-500/30'
                                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                            }`}
                            aria-label={`Select ${num} bedroom${num > 1 ? 's' : ''}`}
                            aria-pressed={bedrooms === num}
                          >
                            {num}
                          </motion.button>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => setBedrooms(bedrooms + 1)}
                        whileTap={{ scale: 0.95 }}
                        className="p-2.5 hover:bg-white hover:shadow-sm rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
                        aria-label="Increase number of bedrooms"
                      >
                        <span className="text-lg font-bold">+</span>
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                        <span>More rooms = higher rent costs</span>
                      </p>
                      {bedrooms > 3 && (
                        <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                          Premium housing
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Professional Visualization Panel */}
              <div className="lg:col-span-8 space-y-6">
                {/* Refined Main Result Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl shadow-2xl p-8 md:p-10 text-white relative overflow-hidden"
                >
                  {/* Subtle Animated Background Elements */}
                  <motion.div
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 8, 0],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/8 to-transparent rounded-full blur-3xl -mr-24 -mt-24"
                  />
                  <motion.div
                    animate={{
                      scale: [1.3, 1, 1.3],
                      x: [0, 25, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                    className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-emerald-400/15 to-transparent rounded-full blur-2xl -ml-20 -mb-20"
                  />

                  <div className="grid md:grid-cols-2 gap-8 md:gap-10 relative z-10">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-center md:text-left"
                    >
                      <div className="text-blue-100 text-xs md:text-sm font-bold mb-3 uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Net Monthly Income</span>
                      </div>
                      <motion.div
                        key={costs.netIncome}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white"
                      >
                        CHF {costs.netIncome.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </motion.div>
                      <div className="text-xs md:text-sm bg-white/20 backdrop-blur-md inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-white/30">
                        <CheckCircle className="w-4 h-4" />
                        <span>After Tax & Social</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="text-center md:text-left"
                    >
                      <div className="text-emerald-100 text-xs md:text-sm font-bold mb-3 uppercase tracking-wider flex items-center justify-center md:justify-start gap-2">
                        <Calculator className="w-4 h-4" />
                        <span>Monthly Expenses</span>
                      </div>
                      <motion.div
                        key={costs.monthlyExpenses}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 text-white"
                      >
                        CHF {costs.monthlyExpenses.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </motion.div>
                      <div className="text-xs md:text-sm bg-emerald-500/25 backdrop-blur-md inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold border border-emerald-400/30">
                        <Layers className="w-4 h-4" />
                        <span>{lifestyle.charAt(0).toUpperCase() + lifestyle.slice(1)} lifestyle</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Enhanced Potential Savings Card */}
                {costs.savings > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-3xl shadow-2xl p-8 md:p-10 text-white relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/8 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                          <TrendingUp className="w-6 h-6 text-emerald-50" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">Potential Savings</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-5 md:gap-6 mb-6">
                        {[
                          { label: "Monthly Savings", value: costs.savings, sub: `Savings Rate: ${costs.savingsRate}%`, icon: Activity },
                          { label: "Annual Savings", value: costs.annualSavings, sub: "Per year", icon: Award },
                          { label: "5-Year Projection", value: costs.savings5Year, sub: "Potential accumulation", icon: Target }
                        ].map((item, idx) => (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-300"
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <item.icon className="w-4 h-4 text-emerald-100" />
                              <div className="text-emerald-50 text-xs md:text-sm font-semibold">{item.label}</div>
                            </div>
                            <div className="text-2xl md:text-3xl font-black mb-1">
                              CHF {item.value.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </div>
                            <div className="text-emerald-100/90 text-xs md:text-sm">{item.sub}</div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/25">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-emerald-50 text-sm md:text-base font-semibold mb-1">10-Year Projection</div>
                            <div className="text-2xl md:text-3xl font-black">
                              CHF {costs.savings10Year.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </div>
                          </div>
                          <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-emerald-200" />
                        </div>
                        <p className="text-emerald-100/80 text-xs mt-2">* Projections assume consistent savings rate</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Analytics Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Expense Breakdown Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8"
                  >
                    <h4 className="font-bold text-slate-900 mb-6 md:mb-8 flex items-center justify-between text-lg md:text-xl">
                      <span className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-blue-600" />
                        <span>Expense Breakdown</span>
                      </span>
                    </h4>
                    <div className="space-y-5">
                      {costs.breakdown.map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <div className="flex justify-between items-center text-sm font-semibold mb-2">
                            <span className="text-slate-700 flex items-center gap-2.5">
                              <span className="w-3.5 h-3.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                              {item.name}
                            </span>
                            <span className="text-slate-900 font-bold">CHF {item.value.toLocaleString('fr-CH', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(item.value / costs.monthlyGross) * 100}%` }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 * i }}
                              className="h-full rounded-full shadow-sm"
                              style={{ backgroundColor: item.color }}
                            ></motion.div>
                          </div>
                          <div className="text-xs text-slate-500 mt-1.5">
                            {((item.value / costs.monthlyGross) * 100).toFixed(1)}% of gross income
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Canton Insights Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8"
                  >
                    <h4 className="font-bold text-slate-900 mb-6 md:mb-8 flex items-center justify-between text-lg md:text-xl">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <span>Canton Insights: {cantons.find(c => c.id === canton)?.name}</span>
                      </span>
                      <Info className="w-5 h-5 text-slate-400" />
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Tax Burden', value: `${costs.taxRate}%`, sub: 'Effective Rate', icon: TrendingUp, bgColor: 'bg-red-50', iconColor: 'text-red-600', borderColor: 'border-red-100' },
                        { label: 'Tech Jobs', value: `${cantons.find(c => c.id === canton)?.tech}/100`, sub: 'Demand Score', icon: Briefcase, bgColor: 'bg-blue-50', iconColor: 'text-blue-600', borderColor: 'border-blue-100' },
                        { label: 'Quality of Life', value: `${cantons.find(c => c.id === canton)?.quality}/100`, sub: 'Index', icon: Heart, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600', borderColor: 'border-emerald-100' },
                        { label: 'Language', value: cantons.find(c => c.id === canton)?.lang, sub: 'Primary', icon: Globe, bgColor: 'bg-purple-50', iconColor: 'text-purple-600', borderColor: 'border-purple-100' },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-4 md:p-5 rounded-2xl ${stat.bgColor} border ${stat.borderColor} hover:shadow-md transition-all duration-300`}
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bgColor} border ${stat.borderColor}`}>
                            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                          </div>
                          <div className="text-xl md:text-2xl font-black text-slate-900 mb-1">{stat.value}</div>
                          <div className="text-xs text-slate-600 font-medium">{stat.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
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

        {/* Professional Floating CTA Bar */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-50 max-w-sm md:max-w-lg mx-auto md:mx-0"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-emerald-600/15 rounded-full blur-2xl -z-10"></div>

          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-5 md:px-8 py-4 md:py-5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 md:gap-6 border border-white/10 backdrop-blur-xl relative overflow-hidden">
            {/* Subtle Animated Background */}
            <motion.div
              animate={{
                x: [-200, 400],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: 1
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
            />

            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                animate={{
                  rotate: [0, 12, -12, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="text-2xl md:text-3xl"
              >
                🚀
              </motion.div>
              <div className="hidden sm:block">
                <div className="text-slate-300 text-xs md:text-sm font-medium">Ready for your move?</div>
                <div className="font-bold text-white text-sm md:text-base">Get a personalized plan</div>
              </div>
              <div className="sm:hidden">
                <div className="font-bold text-white text-sm">Get your plan</div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Link
                href={pricingLink}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm transition-all shadow-lg hover:shadow-blue-500/40 flex items-center gap-2 border border-white/20"
                aria-label="Unlock full access to all tools and features"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Unlock Access</span>
                <span className="sm:hidden">Unlock</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
