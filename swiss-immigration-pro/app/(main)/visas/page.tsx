'use client'

import { FileText, Clock, MapPin, CheckCircle, Euro, Users, Building, TrendingUp, Shield, Badge, Award, FileCheck } from 'lucide-react'
import Link from 'next/link'

// Disable static generation for this client component - must be server-side rendered
export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default function VisasPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Swiss Visa Types & Requirements
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to all Swiss visa types and permit categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: 'L Permit (Short-term)',
              description: 'Temporary residence for up to 12 months',
              duration: '< 1 Year',
              icon: Shield,
              features: ['Job offer required', 'Quota-dependent', 'Renewable'],
              details: {
                quota: '4,000 total (2025)',
                processing: '4-8 weeks',
                salary: 'CHF 65k+ minimum',
                extendable: 'Yes, if < 12 months'
              }
            },
            {
              title: 'B Permit (Residence)',
              description: 'Long-term residence for employed persons',
              duration: '1-5 Years',
              icon: Badge,
              features: ['Annual renewal', 'EU/EFTA priority', 'Quota restrictions'],
              details: {
                quota: '4,500 total (2025)',
                processing: '8-12 weeks',
                salary: 'CHF 90k+ typical',
                extendable: 'Yes, annually'
              }
            },
            {
              title: 'G Permit (Cross-border)',
              description: 'For cross-border commuters',
              duration: 'Valid',
              icon: FileCheck,
              features: ['Live abroad, work in CH', 'Weekly return required', 'Special conditions'],
              details: {
                quota: 'Unlimited',
                processing: '4-6 weeks',
                salary: 'No minimum',
                extendable: 'Yes'
              }
            },
          ].map((visa, idx) => {
            const IconComponent = visa.icon
            return (
            <div
              key={visa.title}
              className="bg-white border-2 border-blue-100 rounded-xl p-8 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <IconComponent className="w-12 h-12 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {visa.duration}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {visa.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {visa.description}
              </p>
              <ul className="space-y-2 mb-6">
                {visa.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Details Box */}
              <div className="bg-blue-50 rounded-lg p-4 space-y-2 border border-blue-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Quota:</span>
                  <span className="text-gray-900 font-semibold">{visa.details.quota}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Processing:</span>
                  <span className="text-gray-900 font-semibold">{visa.details.processing}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Salary:</span>
                  <span className="text-gray-900 font-semibold">{visa.details.salary}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700 font-medium">Extendable:</span>
                  <span className="text-gray-900 font-semibold">{visa.details.extendable}</span>
                </div>
              </div>
            </div>
            )
          })}
        </div>


        {/* Additional Permit Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Other Permit Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
            {
              title: 'C Permit',
              subtitle: 'Settlement Permit',
              description: 'Permanent residence after 5-10 years',
              icon: Award
            },
            {
              title: 'EU Blue Card',
              subtitle: 'High-Quality Workers',
              description: 'Simplified process for highly qualified',
              icon: Badge
            },
            {
              title: 'N Permit',
              subtitle: 'Asylum Seekers',
              description: 'For refugees and asylum cases',
              icon: Shield
            },
            {
              title: 'CI Permit',
              subtitle: 'Diplomatic',
              description: 'For diplomats and international orgs',
              icon: FileCheck
            }
            ].map((perm, idx) => {
              const PermIcon = perm.icon
              return (
              <div
                key={perm.title}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:shadow-md transition-all"
              >
                <PermIcon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <div className="font-bold text-gray-900 mb-1">{perm.title}</div>
                <div className="text-sm text-blue-600 mb-2">{perm.subtitle}</div>
                <div className="text-xs text-gray-600">{perm.description}</div>
              </div>
              )
            })}
          </div>
        </div>

        {/* Application Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Application Process Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Secure Job Offer',
                description: 'Swiss employer must initiate application and prove no Swiss/EU candidate available',
                duration: '2-6 months'
              },
              {
                step: '2',
                title: 'Submit Documents',
                description: 'Complete package: passport, certificates, employment contract, CV, diplomas',
                duration: '1-2 weeks prep'
              },
              {
                step: '3',
                title: 'Cantonal Review',
                description: 'Canton checks quota availability, salary adequacy, labor market impact',
                duration: '4-8 weeks'
              },
              {
                step: '4',
                title: 'Federal SEM Approval',
                description: 'SEM reviews for immigration quota and national interest',
                duration: '2-4 weeks'
              },
              {
                step: '5',
                title: 'Embassy Interview',
                description: 'Attend visa appointment at Swiss embassy/consulate in home country',
                duration: '1-2 weeks'
              },
              {
                step: '6',
                title: 'Receive Permit',
                description: 'Collect visa sticker, enter Switzerland, register with local municipality',
                duration: '1-3 days'
              }
            ].map((item, idx) => (
              <div
                key={item.step}
                className="bg-white border border-gray-200 rounded-xl p-6 relative hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="absolute top-4 right-4 text-6xl font-bold text-blue-600 opacity-10">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    Step {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {item.description}
                  </p>
                  <div className="flex items-center text-blue-600 text-xs font-semibold">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Common Mistakes That Lead to Rejection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                mistake: 'Insufficient Salary',
                impact: '60% of rejections',
                solution: 'Research canton-specific salary thresholds. CHF 100k+ strongly recommended for non-EU.'
              },
              {
                mistake: 'Incomplete Documentation',
                impact: '30% of delays',
                solution: 'Use our comprehensive checklists. Every document must be certified and translated.'
              },
              {
                mistake: 'Wrong Canton',
                impact: 'Higher competition',
                solution: 'Choose cantons with better approval rates. Basel > Geneva for non-EU.'
              },
              {
                mistake: 'Weak Employer Justification',
                impact: 'Labor market test fails',
                solution: 'Employer must prove exhaustive search for Swiss/EU candidates with evidence.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-red-50 border border-red-200 rounded-lg p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-red-900 text-lg">
                    {item.mistake}
                  </h3>
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {item.impact}
                  </span>
                </div>
                <p className="text-red-700">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              Success Tips from 10,000+ Immigrants
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-gray-900 block mb-1">Negotiate Competitive Salary</strong>
                <p className="text-gray-700 text-sm">Higher salary eliminates many objections. Research benchmarks.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-gray-900 block mb-1">Prepare Complete Documentation</strong>
                <p className="text-gray-700 text-sm">Double-check every requirement. Missing docs = delays.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-gray-900 block mb-1">Start Language Learning Early</strong>
                <p className="text-gray-700 text-sm">Shows integration commitment. A2/B1 level recommended.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-gray-900 block mb-1">Choose Right Canton</strong>
                <p className="text-gray-700 text-sm">Canton selection is critical. Avoid over-subscribed areas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need Detailed Guidance?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upgrade to Immigration Pack for complete checklists, embassy contacts, and step-by-step guides
          </p>
          <Link 
            href="/pricing" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            prefetch={false}
          >
            View Pricing →
          </Link>
        </div>
      </div>
    </div>
  )
}

