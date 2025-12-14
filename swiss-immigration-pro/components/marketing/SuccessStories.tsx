'use client'

import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle, ArrowRight } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  location: string
  role: string
  image: string
  rating: number
  text: string
  result: string
  pack: string
  beforeAfter?: {
    before: string
    after: string
  }
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    location: 'Zurich',
    role: 'Software Engineer from Singapore',
    image: '/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png',
    rating: 5,
    text: 'I was rejected twice before finding Swiss Immigration Pro. Their AI assistant helped me identify critical document issues I never would have caught. Approved in 8 weeks with the Advanced Pack guidance.',
    result: 'L Permit approved in 8 weeks',
    pack: 'Advanced Pack',
    beforeAfter: {
      before: '2 rejections, 14 months wasted',
      after: 'L Permit, CHF 120k salary'
    }
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    location: 'Basel',
    role: 'Pharma Researcher from USA',
    image: '/images/family/download (4).jpeg',
    rating: 5,
    text: 'The cantonal strategy module was a game-changer. I was targeting Zurich but switched to Basel after learning about their pharma focus. Got approved in 6 weeks when my colleagues waited 16+ weeks for Zurich.',
    result: 'B Permit approved in 6 weeks',
    pack: 'Citizenship Pro',
    beforeAfter: {
      before: 'Wrong canton, 85% rejection risk',
      after: 'Basel B Permit, 6 weeks'
    }
  },
  {
    id: '3',
    name: 'Priya Patel',
    location: 'Geneva',
    role: 'Finance Professional from India',
    image: '/images/environment/image_1044945_20250813_ob_936fbe_adobestock-380240715-lac-leman.jpeg',
    rating: 5,
    text: 'The salary negotiation scripts saved me CHF 25,000 annually. The CV optimization got me 3 interviews in 2 weeks. Worth every franc.',
    result: 'CHF 145k salary, B Permit',
    pack: 'Immigration Pack',
    beforeAfter: {
      before: 'CHF 105k offer, no interviews',
      after: 'CHF 145k, B Permit approved'
    }
  },
  {
    id: '4',
    name: 'David Kim',
    location: 'Zug',
    role: 'Tech Entrepreneur from South Korea',
    image: '/images/environment/download (7).jpeg',
    rating: 5,
    text: 'I almost gave up after my first rejection. The citizenship roadmap gave me a clear 10-year path. Now I have my C permit and am 2 years away from citizenship application. Life-changing.',
    result: 'C Permit, citizenship path clear',
    pack: 'Citizenship Pro',
    beforeAfter: {
      before: 'Rejected, ready to give up',
      after: 'C Permit, 2 years to citizenship'
    }
  },
  {
    id: '5',
    name: 'Emma Thompson',
    location: 'Bern',
    role: 'Marketing Director from UK',
    image: '/images/environment/mountains-2982087_1280.jpg',
    rating: 5,
    text: 'As a UK citizen post-Brexit, I needed expert guidance. The platform walked me through every step. The AI assistant answered all my questions 24/7. Approved in 10 weeks.',
    result: 'B Permit approved in 10 weeks',
    pack: 'Advanced Pack',
    beforeAfter: {
      before: 'Confused, Brexit complications',
      after: 'B Permit, smooth transition'
    }
  },
  {
    id: '6',
    name: 'James Okafor',
    location: 'Lausanne',
    role: 'Academic Researcher from Nigeria',
    image: '/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png',
    rating: 5,
    text: 'The visa timeline planner helped me coordinate everything perfectly. From job search to permit approval in 4 months. The integration guide made settling in so much easier.',
    result: 'Full immigration in 4 months',
    pack: 'Advanced Pack',
    beforeAfter: {
      before: 'Unclear process, months of confusion',
      after: 'Organized timeline, 4 months total'
    }
  }
]

export default function SuccessStories() {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Real Success Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Join 18,500+ Successful Applicants
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real people, real results. See how our platform transformed their Swiss immigration journey.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
            >
              {/* Before/After Badge */}
              {testimonial.beforeAfter && (
                <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-green-50 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-red-600 font-semibold">
                      <span className="text-xs">Before:</span> {testimonial.beforeAfter.before}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className="text-green-600 font-semibold">
                      <span className="text-xs">After:</span> {testimonial.beforeAfter.after}
                    </div>
                  </div>
                </div>
              )}

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <Quote className="w-8 h-8 text-blue-600/30 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Result Badge */}
              <div className="mb-6 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-sm">{testimonial.result}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 mr-4 overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-xs text-blue-600 font-medium mt-1">{testimonial.location}</div>
                </div>
              </div>

              {/* Pack Badge */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">Used:</span>
                <span className="ml-2 text-sm font-semibold text-blue-600">{testimonial.pack}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h3>
          <p className="text-xl mb-8 opacity-95">
            Join thousands who achieved their Swiss dream. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/pricing"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl"
            >
              View Pricing Plans
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/auth/register"
              className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Start Free Trial
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
