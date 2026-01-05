'use client'

import PolicyLayout from '@/components/policies/PolicyLayout'
import { CreditCard, Clock, AlertCircle, Mail, CheckCircle2, XCircle } from 'lucide-react'

const sections = [
  { id: 'overview', title: '1. Overview', level: 1 },
  { id: 'digital-products', title: '2. Digital Products & Services', level: 1 },
  { id: 'consultation-services', title: '3. Consultation Services', level: 1 },
  { id: 'refund-process', title: '4. Refund Request Process', level: 1 },
  { id: 'processing-time', title: '5. Processing Time', level: 1 },
  { id: 'non-refundable', title: '6. Non-Refundable Items', level: 1 },
  { id: 'exceptions', title: '7. Special Circumstances', level: 1 },
  { id: 'contact', title: '8. Contact Us', level: 1 },
]

export default function RefundPolicyPage() {
  return (
    <PolicyLayout
      title="Refund Policy"
      lastUpdated="January 2025"
      sections={sections}
      disclaimer={
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">
                Important Refund Information
              </h3>
              <p className="text-amber-800 leading-relaxed">
                Our services are primarily delivered digitally and are deemed "used" when accessed. 
                Refunds are generally not available after service access, but we review all requests on a case-by-case basis 
                within 14 days of purchase.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <section id="overview" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            1. Overview
          </h2>
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Swiss Immigration Pro ("we," "our," or "us") offers digital products and consultation services related to Swiss immigration guidance. 
          This Refund Policy outlines the terms and conditions under which refunds may be granted.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-blue-800 font-medium">
            We are committed to fair and transparent refund practices. All refund requests are reviewed individually within 14 days of purchase.
          </p>
        </div>
      </section>

      <section id="digital-products" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle2 className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            2. Digital Products & Services
          </h2>
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          Our digital products include subscription packs, downloadable guides, CV templates, and access to our AI-powered platform. 
          Due to the immediate and digital nature of these products:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong className="text-gray-900">14-Day Refund Window:</strong> Refund requests must be submitted within 14 days of purchase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong className="text-gray-900">Limited Access:</strong> Refunds are more likely if you have accessed less than 20% of the content.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong className="text-gray-900">Technical Issues:</strong> Full refunds are available if you experience technical problems preventing access.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">
                <strong className="text-gray-900">Subscription Cancellation:</strong> You may cancel your subscription at any time. Cancellation takes effect at the end of the current billing period.
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
          <p className="text-green-800">
            <strong>Pro Tip:</strong> Try our free tier first to ensure our platform meets your needs before purchasing a subscription.
          </p>
        </div>
      </section>

      <section id="consultation-services" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            3. Consultation Services
          </h2>
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          For paid consultation services (one-on-one sessions with immigration experts):
        </p>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="font-semibold text-gray-900">Cancellation Policy</div>
            </div>
            <div className="text-gray-600 text-sm">
              Cancel at least 48 hours before your scheduled consultation for a full refund. 
              Cancellations within 48 hours are non-refundable but may be rescheduled.
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <XCircle className="w-5 h-5 text-red-600" />
              <div className="font-semibold text-gray-900">No-Show Policy</div>
            </div>
            <div className="text-gray-600 text-sm">
              If you do not attend your scheduled consultation without prior notice, 
              the fee is non-refundable.
            </div>
          </div>
        </div>
      </section>

      <section id="refund-process" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          4. Refund Request Process
        </h2>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          To request a refund, please follow these steps:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-gray-700">
              <strong className="text-gray-900">Contact Us:</strong> Send an email to{' '}
              <a href="mailto:refunds@swissimmigrationpro.com" className="text-blue-600 hover:underline font-medium">
                refunds@swissimmigrationpro.com
              </a>{' '}
              with your purchase details.
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">Provide Information:</strong> Include your order number, purchase date, 
              and reason for the refund request.
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">Review Period:</strong> We will review your request within 5-7 business days 
              and respond via email.
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">Refund Processing:</strong> If approved, refunds will be processed to your original 
              payment method within 10-14 business days.
            </li>
          </ol>
        </div>
      </section>

      <section id="processing-time" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            5. Processing Time
          </h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Review Time:</strong>
                <span className="text-gray-700 ml-2">5-7 business days</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Refund Processing:</strong>
                <span className="text-gray-700 ml-2">10-14 business days after approval</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Bank Processing:</strong>
                <span className="text-gray-700 ml-2">Additional 3-5 business days depending on your bank</span>
              </div>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 mt-6 text-lg leading-relaxed">
          Total time from request to refund appearing in your account: typically 18-26 business days.
        </p>
      </section>

      <section id="non-refundable" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <XCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            6. Non-Refundable Items
          </h2>
        </div>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          The following items are generally non-refundable:
        </p>
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Services accessed more than 20% or used extensively</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Consultation services cancelled less than 48 hours before scheduled time</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Downloaded materials (PDFs, templates) that have been accessed</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Refund requests submitted more than 14 days after purchase</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Services purchased during promotional periods (unless otherwise stated)</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="exceptions" className="mb-12 scroll-mt-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          7. Special Circumstances
        </h2>
        <p className="text-gray-700 mb-6 text-lg leading-relaxed">
          We understand that exceptional circumstances may arise. We will consider refund requests beyond the standard policy for:
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-6">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Technical issues preventing access to services</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Duplicate purchases due to payment processing errors</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Unauthorized transactions (subject to verification)</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700">Medical emergencies or other documented hardships</span>
            </li>
          </ul>
        </div>
        <p className="text-gray-700 text-lg leading-relaxed">
          All special circumstance refunds are reviewed on a case-by-case basis and require documentation.
        </p>
      </section>

      <section id="contact" className="mb-12 scroll-mt-24">
        <div className="flex items-center gap-3 mb-6">
          <Mail className="w-6 h-6 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            8. Contact Us
          </h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">
            For refund requests or questions about this policy, please contact:
          </p>
          <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
            <p className="font-semibold text-gray-900 mb-2">Refund Department</p>
            <p className="text-gray-700">
              Email:{' '}
              <a href="mailto:refunds@swissimmigrationpro.com" className="text-blue-600 hover:underline font-medium">
                refunds@swissimmigrationpro.com
              </a>
            </p>
            <p className="text-gray-700 mt-2">
              Response Time: Within 24-48 hours during business days (Monday-Friday, 9 AM - 5 PM CET)
            </p>
          </div>
        </div>
      </section>
    </PolicyLayout>
  )
}
