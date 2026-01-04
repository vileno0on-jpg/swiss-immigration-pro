'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Linkedin, 
  ArrowRight, Shield
} from 'lucide-react'
import { CONFIG } from '@/lib/config'

export default function Footer() {
  const [logoError, setLogoError] = useState(false)
  const [bottomLogoError, setBottomLogoError] = useState(false)

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.12, 0.08],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8 mb-12 sm:mb-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              {logoError ? (
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🇨🇭</span>
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                  <img
                    src="/images/logo-removebg.png"
                    alt="Swiss Immigration Pro Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                    onError={() => setLogoError(true)}
                  />
                </div>
              )}
              <div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  {CONFIG.app.name}
                </h3>
                <p className="text-xs text-slate-400">Expert Guidance</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Premium AI-Powered Swiss Immigration & Citizenship Mastery Platform
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800/50 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all backdrop-blur-sm border border-slate-700/50 hover:border-blue-500"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-slate-300 hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/lawyer', label: '⚖️ Virtual Lawyer' },
                { href: '/employment', label: 'Employment' },
                { href: '/citizenship', label: 'Citizenship' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/tools', label: '🧮 Tools' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-200 py-1 min-h-[44px] touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              Resources
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm">
              {[
                { href: '/faq', label: 'FAQs' },
                { href: '/about', label: 'About Us' },
                { href: '/resources', label: 'Guides & PDFs' },
                { href: '/cv-templates', label: 'CV Templates' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/consultation', label: 'Book Consultation' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-all duration-200 py-1 min-h-[44px] touch-manipulation"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Contact
            </h4>
            <ul className="space-y-3 sm:space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3 group">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="mailto:info@swissimmigrationpro.com" 
                  className="hover:text-blue-400 transition-colors break-all touch-manipulation min-h-[44px] flex items-center"
                >
                  info@swissimmigrationpro.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="flex items-center min-h-[44px]">+41 XX XXX XX XX</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                <span className="flex flex-col justify-center min-h-[44px]">
                  <strong className="text-white">{CONFIG.app.firm}</strong>
                  <span className="text-slate-400">Zurich, Switzerland</span>
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-700/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              {bottomLogoError ? (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-xl">🇨🇭</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg overflow-hidden bg-white/10 backdrop-blur-sm">
                  <img
                    src="/images/logo-removebg.png"
                    alt="SIP Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                    onError={() => setBottomLogoError(true)}
                  />
                </div>
              )}
              <p className="text-slate-400 text-sm">
                © {new Date().getFullYear()} <span className="text-white font-semibold">SIP</span>. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookie-policy', label: 'Cookie Policy' },
                { href: '/refund-policy', label: 'Refund Policy' },
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/accessibility', label: 'Accessibility' },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-slate-400 hover:text-blue-400 transition-colors relative group py-2 px-1 touch-manipulation min-h-[44px] flex items-center"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

