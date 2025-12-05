'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function LayerPage() {
  const params = useParams()
  const router = useRouter()
  const layerParam = params?.layer as string
  
  // Redirect old layer routes to new static routes
  useEffect(() => {
    const routeMap: Record<string, string> = {
      'europeans': '/eu',
      'americans': '/us',
      'others': '/other'
    }
    
    if (layerParam && routeMap[layerParam]) {
      router.replace(routeMap[layerParam])
    } else {
      router.replace('/other') // Default fallback
    }
  }, [layerParam, router])
  
  // Show loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
  
  // Memoize content to avoid recalculation
  const content = useMemo(() => LAYER_CONTENT[layer], [layer])
  const [stats, setStats] = useState<LiveStat[]>([])
  const [isClient, setIsClient] = useState(false)

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', {
        cache: 'no-store', // Always fresh for client-side
      })
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }, [])

  useEffect(() => {
    setIsClient(true)
    loadStats()
  }, [loadStats])

  // Memoize layer colors
  const layerColors = useMemo(() => ({
    europeans: {
      gradient: 'from-blue-600 to-blue-800',
      accent: 'bg-blue-600',
      text: 'text-blue-600',
    },
    americans: {
      gradient: 'from-blue-600 to-blue-700',
      accent: 'bg-blue-600',
      text: 'text-blue-600',
    },
    others: {
      gradient: 'from-blue-600 to-blue-800',
      accent: 'bg-blue-600',
      text: 'text-blue-600',
    },
  }), [])

  const colors = useMemo(() => layerColors[layer], [layer, layerColors])


  // SEO Structured Data for Images
  const imageStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${layer === 'europeans' ? 'EU/EFTA' : layer === 'americans' ? 'US' : 'International'} Swiss Immigration Images`,
    description: `Visual guide for ${layer === 'europeans' ? 'EU/EFTA citizens' : layer === 'americans' ? 'US citizens' : 'international citizens'} immigrating to Switzerland`,
    image: [
      `/images/${layer}/hero-${layer === 'europeans' ? 'eu-freedom' : layer === 'americans' ? 'us-switzerland' : 'international'}.${layer === 'europeans' ? 'jpeg' : 'png'}`,
      `/images/${layer}/permits-${layer === 'europeans' ? 'eu-types' : layer === 'americans' ? 'quota-system' : 'international'}.${layer === 'europeans' ? 'png' : layer === 'americans' ? 'jpeg' : 'png'}`,
      `/images/${layer}/success-${layer === 'europeans' ? 'eu-family' : layer === 'americans' ? 'us-professional' : 'integration'}.${layer === 'europeans' ? 'jpeg' : 'png'}`,
      `/images/${layer}/lifestyle-${layer === 'europeans' ? 'city' : layer === 'americans' ? 'us-family' : 'integration'}.png`,
    ]
  }

  return (
    <div className="bg-white">
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageStructuredData) }}
      />

      {/* Hero Section - Simplified */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={`/images/${layer}/hero-${layer === 'europeans' ? 'eu-freedom' : layer === 'americans' ? 'us-switzerland' : 'international'}.${layer === 'europeans' ? 'jpeg' : 'png'}`}
            alt={layer === 'europeans' ? 'EU/EFTA Freedom of Movement to Switzerland - No Quotas Required' : layer === 'americans' ? 'American Professionals Moving to Switzerland - US to Swiss Immigration' : 'International Citizens Pathway to Switzerland - Non-EU Immigration Guide'}
            title={layer === 'europeans' ? 'EU/EFTA Freedom of Movement to Switzerland' : layer === 'americans' ? 'American Professionals Moving to Switzerland' : 'International Citizens Pathway to Switzerland'}
            className="w-full h-full object-cover"
            loading="eager"
            width={1920}
            height={1080}
            onError={(e) => {
              // Fallback to generic image if layer-specific image doesn't exist
              const target = e.target as HTMLImageElement
              target.src = '/images/environment/mountains-2982087_1280.jpg'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {layer === 'europeans' ? (
                <>
                  <NoTranslate>EU/EFTA</NoTranslate> Freedom of Movement
                </>
              ) : layer === 'americans' ? (
                <>
                  <NoTranslate>US</NoTranslate> & Canadian Pathway
                </>
              ) : (
                'International Pathway'
              )}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              {layer === 'europeans' 
                ? 'No quotas. Fast processing. Your direct path to Switzerland.' 
                : layer === 'americans'
                ? 'Specialized guidance for American professionals seeking Swiss residency.'
                : 'Comprehensive support for your Swiss immigration journey.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={`/${layer}/visas`} className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg">
                Explore Permits
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <Link href="/pricing" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-lg transition-colors border border-white/30">
                View Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation - Simplified */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${layer}/visas`} className="px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Permits
            </Link>
            <Link href={`/${layer}/process`} className="px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Process
            </Link>
            <Link href={`/${layer}/requirements`} className="px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Requirements
            </Link>
            <Link href={`/${layer}/resources`} className="px-6 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
              Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Permits Overview - Simplified */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Available Permits
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {layer === 'europeans' 
                ? 'Choose the right permit for your situation' 
                : 'Explore your permit options'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {content.visas.types.filter(v => v.applicable).slice(0, 4).map((visa, idx) => (
              <Link
                key={idx}
                href={`/${layer}/visas#${visa.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white border-2 border-blue-100 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="relative mb-4 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                  {(() => {
                    const name = visa.name.toLowerCase()
                    if (name.includes('b permit') || name.includes('residence')) {
                      return <Home className="w-16 h-16 text-blue-600" />
                    } else if (name.includes('l permit') || name.includes('short-term')) {
                      return <Briefcase className="w-16 h-16 text-blue-600" />
                    } else if (name.includes('g permit') || name.includes('cross-border')) {
                      return <Plane className="w-16 h-16 text-blue-600" />
                    } else if (name.includes('c permit') || name.includes('settlement')) {
                      return <Award className="w-16 h-16 text-blue-600" />
                    } else if (name.includes('blue card')) {
                      return <CreditCard className="w-16 h-16 text-blue-600" />
                    }
                    return <Shield className="w-16 h-16 text-blue-600" />
                  })()}
                </div>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                    {visa.name}
                  </h3>
                  {(() => {
                    const name = visa.name.toLowerCase()
                    if (name.includes('b permit') || name.includes('residence')) {
                      return <Home className="w-5 h-5 text-blue-600" />
                    } else if (name.includes('l permit') || name.includes('short-term')) {
                      return <Briefcase className="w-5 h-5 text-blue-600" />
                    } else if (name.includes('g permit') || name.includes('cross-border')) {
                      return <Plane className="w-5 h-5 text-blue-600" />
                    } else if (name.includes('c permit') || name.includes('settlement')) {
                      return <Award className="w-5 h-5 text-blue-600" />
                    } else if (name.includes('blue card')) {
                      return <CreditCard className="w-5 h-5 text-blue-600" />
                    }
                    return <Shield className="w-5 h-5 text-blue-600" />
                  })()}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{visa.description}</p>
                <div className="text-sm text-blue-600 font-medium">
                  {visa.timeline} • Learn more →
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/${layer}/visas`} className="text-blue-600 hover:underline font-semibold">
              View all permits →
            </Link>
          </div>
        </div>
      </section>

      {/* Image Section - Americans Only */}
      {layer === 'americans' && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                US to Switzerland Journey
              </h2>
              <p className="text-lg text-gray-600">
                Real stories from Americans who successfully moved to Switzerland
              </p>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/images/americans/hero-us-switzerland.png"
                alt="US to Switzerland Immigration Journey - Success Stories"
                title="US to Switzerland Immigration Journey - Success Stories"
                className="w-full h-auto"
                loading="lazy"
                width={1200}
                height={675}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {layer === 'europeans' 
                ? 'Real experiences from EU/EFTA citizens who made Switzerland home' 
                : layer === 'americans'
                ? 'American professionals who successfully immigrated to Switzerland'
                : 'International citizens who achieved their Swiss immigration goals'}
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img 
              src={`/images/${layer}/success-${layer === 'europeans' ? 'eu-family' : layer === 'americans' ? 'us-professional' : 'integration'}.${layer === 'europeans' ? 'jpeg' : 'png'}`}
              alt={`Success Story: ${layer === 'europeans' ? 'EU/EFTA Family' : layer === 'americans' ? 'US Professional' : 'International Integration'} - Swiss Immigration Success`}
              title={`Swiss Immigration Success - ${layer === 'europeans' ? 'EU/EFTA' : layer === 'americans' ? 'US' : 'International'} Success Stories`}
              className="w-full h-96 object-cover"
              loading="lazy"
              width={1200}
              height={600}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {layer === 'europeans' ? 'EU Family Successfully Relocated' : layer === 'americans' ? 'US Professional Achieved Swiss Residency' : 'International Citizen Obtained Permit'}
                </h3>
                <p className="text-lg opacity-90">
                  {layer === 'europeans' 
                    ? <>Learn how <NoTranslate>EU/EFTA</NoTranslate> citizens leveraged freedom of movement for a smooth transition</>
                    : layer === 'americans'
                    ? 'Discover how American professionals navigated the quota system and secured permits'
                    : 'See how international citizens overcame challenges to achieve their Swiss immigration goals'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={`/images/${layer}/lifestyle-${layer === 'europeans' ? 'city' : layer === 'americans' ? 'us-family' : 'integration'}.png`}
            alt={`Swiss Lifestyle for ${layer === 'europeans' ? 'EU/EFTA Citizens' : layer === 'americans' ? 'US Citizens' : 'International Citizens'} - Living in Switzerland`}
            title={`Swiss Lifestyle - ${layer === 'europeans' ? 'EU/EFTA' : layer === 'americans' ? 'US' : 'International'} Immigration Success`}
            className="w-full h-full object-cover"
            loading="lazy"
            width={1920}
            height={600}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get expert guidance and professional tools for your Swiss immigration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
            >
              View Plans
            </Link>
            <Link
              href={`/${layer}/visas`}
              className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors border-2 border-blue-200 shadow-sm"
            >
              Explore Permits
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
