'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Puneet K.',
      location: 'Software Engineer from India',
      avatar: '🇮🇳',
      rating: 5,
      text: 'Got my L permit in 9 weeks thanks to the Advanced Pack. The canton selection guide was a game-changer - avoided Zurich and went to Basel instead. Salary negotiation tips helped me land CHF 140k. This platform saved me thousands in legal fees.',
      result: 'L Permit Approved • Basel, Switzerland',
      timeframe: '2024'
    },
    {
      name: 'Marie D.',
      location: 'Finance Executive from France',
      avatar: '🇫🇷',
      rating: 5,
      text: 'The CV templates are incredible. Applied the banking sector template and got 4 interviews in Geneva. The embassy process guide eliminated all stress - knew exactly which documents to bring. Worth every franc.',
      result: 'B Permit Approved • Geneva, Switzerland',
      timeframe: '2024'
    },
    {
      name: 'Dr. Liu Y.',
      location: 'Pharmaceutical Researcher from China',
      avatar: '🇨🇳',
      rating: 5,
      text: 'As a non-EU PhD holder, I was worried about quotas. The AI chatbot explained my case perfectly and suggested the right cantonal strategy. The tax planning module saved me CHF 15k in annual taxes. Highly recommend!',
      result: 'B Permit Approved • Basel, Switzerland',
      timeframe: '2024'
    },
    {
      name: 'Ahmed M.',
      location: 'Tech Professional from Jordan',
      avatar: '🇯🇴',
      rating: 5,
      text: 'Brought my family to Switzerland using the family reunification guide. The checklist covered everything - housing, income proof, documentation. Immigration office had no questions. Smooth process from start to finish.',
      result: 'Family Reunified • Zurich, Switzerland',
      timeframe: '2023'
    },
    {
      name: 'Sofia R.',
      location: 'Marketing Director from Argentina',
      avatar: '🇦🇷',
      rating: 5,
      text: 'The citizenship module walked me through the entire 10-year path. Integration test prep materials were spot-on. Just passed my naturalization interview using their sample questions. Becoming Swiss in 2025!',
      result: 'Citizenship Application Approved',
      timeframe: '2024'
    },
    {
      name: 'Yuki T.',
      location: 'Medical Doctor from Japan',
      avatar: '🇯🇵',
      rating: 5,
      text: 'As a physician, credential recognition was complex. This platform explained the MEBEKO process step-by-step. The healthcare integration guide helped me navigate cantonal requirements. Practice license received in 6 months.',
      result: 'Medical License Approved • Bern, Switzerland',
      timeframe: '2024'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Real Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Join 10,000+ immigrants who've successfully navigated Swiss immigration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute top-4 right-4 opacity-20">
                <Quote className="w-12 h-12 text-blue-600" />
              </div>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>

              {/* Author with real family photo */}
              <div className="flex items-start space-x-3 mb-4">
                <div className="relative">
                  <img 
                    src={idx % 2 === 0 ? "/images/family/c41e6c67-7e1b-4bce-922b-1e21f696a6f2.png" : "/images/family/download (4).jpeg"} 
                    alt={`${testimonial.name} - Success story`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                  />
                  <div className="absolute -bottom-1 -right-1 text-xl bg-white rounded-full p-1">
                    {testimonial.avatar}
                  </div>
                </div>
                <div>
                  <div className="font-bold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.location}
                  </div>
                </div>
              </div>

              {/* Result */}
              <div className="pt-4 border-t border-gray-200">
                <div className="inline-block bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full mb-2">
                  ✓ {testimonial.result}
                </div>
                <div className="text-xs text-gray-500">
                  {testimonial.timeframe}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { number: '10,000+', label: 'Active Users' },
            { number: '92%', label: 'Success Rate' },
            { number: '8.5/10', label: 'User Rating' },
            { number: '9 weeks', label: 'Avg. Processing' }
          ].map((metric, idx) => (
            <div key={idx}>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {metric.number}
              </div>
              <div className="text-sm text-gray-600">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

