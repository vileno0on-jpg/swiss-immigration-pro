'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
import { CONFIG } from '@/lib/config'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">{CONFIG.app.name}</h3>
            <p className="text-gray-400 text-sm mb-4">
              Premium AI-Powered Swiss Immigration & Citizenship Mastery Platform
            </p>
            <p className="text-orange-500 text-xs font-semibold">
              ⚠️ {CONFIG.discord.disclaimer}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/visas" className="hover:text-blue-400 transition-colors">Visas</Link>
              </li>
              <li>
                <Link href="/employment" className="hover:text-blue-400 transition-colors">Employment</Link>
              </li>
              <li>
                <Link href="/citizenship" className="hover:text-blue-400 transition-colors">Citizenship</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/us-citizens" className="hover:text-blue-400 transition-colors">🇺🇸 For Americans</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-blue-400 transition-colors">🧮 Tools</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-blue-400 transition-colors">Guides & PDFs</Link>
              </li>
              <li>
                <Link href="/cv-templates" className="hover:text-blue-400 transition-colors">CV Templates</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@swissimmigrationpro.com" className="hover:text-blue-400 transition-colors">
                  info@swissimmigrationpro.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+41 XX XXX XX XX</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Alpine Legal Partners<br />Zurich, Switzerland</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Trust Signals Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">92%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">15,000+</div>
              <div className="text-xs text-gray-400">Happy Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">120+</div>
              <div className="text-xs text-gray-400">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">15</div>
              <div className="text-xs text-gray-400">Languages</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs text-gray-500">
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-green-400">✓</span>
              <span>No Credit Card Required (Free Tier)</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-green-400">✓</span>
              <span>Cancel Anytime</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-green-400">✓</span>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <span className="text-green-400">✓</span>
              <span>GDPR Compliant</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} {CONFIG.app.firm}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

