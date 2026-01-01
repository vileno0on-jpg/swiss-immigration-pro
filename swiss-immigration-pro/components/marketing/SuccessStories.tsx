'use client'

import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle, ArrowRight, Heart, Rocket, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-5">
        <Image
          src="/images/environment/swiss-landscape-river-stream-houses-breathtaking-rocks-alps-background-sunny-summer-day-39554165.webp"
          alt="Swiss landscape background"
          fill
          className="object-cover"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 border-2 border-blue-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wider">
              Real Stories, Real People
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6">
            Join 18,500+ Successful Applicants
          </h2>
          <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Real people who made Switzerland home. See how our platform transformed their immigration journey.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, type: 'spring' }}
              whileHover={{ 
                y: -12, 
                scale: 1.03,
                rotateY: 5
              }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-300 h-full backdrop-blur-sm">
                {/* Before/After Badge */}
                {testimonial.beforeAfter && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.2 }}
                    className="mb-6 p-4 bg-gradient-to-r from-red-50 via-yellow-50 to-green-50 rounded-2xl border-2 border-gray-200 shadow-md"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-xs font-bold text-red-600 mb-1 flex items-center gap-1">
                          <span>Before</span>
                        </div>
                        <div className="text-sm font-semibold text-red-700">{testimonial.beforeAfter.before}</div>
                      </div>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      </motion.div>
                      <div className="flex-1 text-right">
                        <div className="text-xs font-bold text-green-600 mb-1 flex items-center justify-end gap-1">
                          <span>After</span>
                        </div>
                        <div className="text-sm font-semibold text-green-700">{testimonial.beforeAfter.after}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Rating */}
                <motion.div
                  className="flex items-center mb-4"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.3 }}
                >
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.3 + i * 0.1, type: 'spring' }}
                      whileHover={{ scale: 1.3, rotate: 360 }}
                    >
                      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.4 }}
                  className="mb-6"
                >
                  <Quote className="w-10 h-10 text-blue-600/30 mb-4" />
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg italic font-medium">
                    "{testimonial.text}"
                  </p>
                </motion.div>

                {/* Result Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.5 }}
                  className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 shadow-md"
                >
                  <div className="flex items-center gap-3 text-green-700">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <span className="font-extrabold text-base">{testimonial.result}</span>
                  </div>
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.6 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-0.5 shadow-lg">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white p-0.5">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <div className="font-extrabold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-600 font-medium">{testimonial.role}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-blue-600 font-bold">{testimonial.location}</span>
                    </div>
                  </div>
                </motion.div>

                {/* Pack Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 + 0.7 }}
                  className="mt-6 pt-6 border-t-2 border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-semibold uppercase">Used:</span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-extrabold rounded-full shadow-md">
                      {testimonial.pack}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/environment/mountains-2982087_1280.jpg"
              alt="Swiss mountains"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/95 via-purple-600/95 to-indigo-600/95" />
          </div>

          <div className="relative z-10">
            <motion.h3
              className="text-4xl md:text-5xl font-extrabold mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Ready to Write Your Success Story?
            </motion.h3>
            <p className="text-2xl mb-10 opacity-95 font-medium">
              Join thousands who achieved their Swiss dream. Your story could be next!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                href="/pricing"
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-10 py-5 bg-white text-blue-600 font-extrabold text-lg rounded-2xl hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 relative overflow-hidden"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                <span className="relative z-10">View Pricing Plans</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform relative z-10" />
              </motion.a>
              <motion.a
                href="/auth/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-10 py-5 bg-white/20 backdrop-blur-md border-2 border-white text-white font-extrabold text-lg rounded-2xl hover:bg-white/30 transition-all shadow-xl"
              >
                <Rocket className="w-5 h-5 mr-3" />
                Start Free Trial
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
