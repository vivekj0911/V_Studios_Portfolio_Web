// src/components/AboutSection.jsx
import { Star, Quote, Camera, Award, TrendingUp, Heart } from "lucide-react"
import { useState, useEffect, useCallback, useMemo, memo } from "react"

const API_URL = import.meta.env.VITE_API_URL

// Memoized skeleton component
const SkeletonCard = memo(() => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#EADBC8]/20 animate-pulse">
    <div className="h-8 w-8 bg-gradient-to-r from-[#EADBC8]/40 to-[#EADBC8]/20 rounded mb-4"></div>
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-[#EADBC8]/30 rounded"></div>
      <div className="h-4 bg-[#EADBC8]/20 rounded w-3/4"></div>
      <div className="h-4 bg-[#EADBC8]/25 rounded w-1/2"></div>
    </div>
    <div className="flex space-x-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-4 w-4 bg-yellow-200/60 rounded-full"></div>
      ))}
    </div>
    <div className="h-4 bg-[#EADBC8]/40 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-[#EADBC8]/30 rounded w-1/2"></div>
  </div>
))

SkeletonCard.displayName = 'SkeletonCard'

// Enhanced animated stats card component
const StatCard = memo(({ stat, index, isVisible }) => {
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const IconComponent = stat.icon
  const targetValue = parseInt(stat.value.replace(/\D/g, ''))

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 2000
        const steps = 60
        const increment = targetValue / steps
        let current = 0

        const counter = setInterval(() => {
          current += increment
          if (current >= targetValue) {
            setCount(targetValue)
            clearInterval(counter)
          } else {
            setCount(Math.floor(current))
          }
        }, duration / steps)

        return () => clearInterval(counter)
      }, index * 200)

      return () => clearTimeout(timer)
    }
  }, [isVisible, targetValue, index])

  return (
    <div
      className="group relative bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#EADBC8]/30 hover:shadow-xl hover:border-[#DAC0A3]/50 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#DAC0A3]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#EADBC8]/10 to-transparent rounded-full transform -translate-x-4 translate-y-4 group-hover:scale-150 transition-transform duration-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-all duration-500 ${isHovered
            ? "bg-gradient-to-r from-[#102C57] to-[#1a3a6b] scale-110 rotate-12"
            : "bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8]"
          }`}>
          <IconComponent className={`w-8 h-8 transition-colors duration-300 ${isHovered ? "text-white" : "text-[#102C57]"
            }`} />
        </div>

        <div className="space-y-2">
          <div className={`font-bold text-3xl lg:text-4xl transition-all duration-300 ${isHovered
              ? "text-transparent bg-clip-text bg-gradient-to-r from-[#102C57] to-[#DAC0A3] scale-110"
              : "text-[#102C57]"
            }`}>
            {count}{stat.value.replace(/\d/g, '').replace(/\+/g, '')}+
          </div>

          <div className={`text-sm lg:text-base font-semibold transition-colors duration-300 ${isHovered ? "text-[#102C57]" : "text-[#102C57]/70"
            }`}>
            {stat.label}
          </div>
        </div>

        {/* Hover effect indicator */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-[#102C57]/5 to-[#DAC0A3]/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
          }`}></div>
      </div>
    </div>
  )
})

StatCard.displayName = 'StatCard'

// Memoized testimonial card component
const TestimonialCard = memo(({ testimonial, index }) => {
  const stars = useMemo(() => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 transition-colors duration-200 ${i < testimonial.rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
          }`}
      />
    ))
  }, [testimonial.rating])

  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#EADBC8]/20 hover:shadow-xl hover:border-[#EADBC8]/40 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#EADBC8]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>

      <div className="relative z-10">
        <Quote className="h-8 w-8 text-[#DAC0A3] mb-4 group-hover:scale-110 transition-transform duration-300" />

        <p className="text-[#102C57]/80 mb-6 italic leading-relaxed text-sm">
          "{testimonial.message}"
        </p>

        <div className="flex items-center mb-3">
          {stars}
          <span className="ml-2 text-xs text-[#102C57]/60 font-medium">
            ({testimonial.rating}/5)
          </span>
        </div>

        <div className="border-t border-[#EADBC8]/20 pt-4">
          <p className="font-semibold text-[#102C57] text-sm">{testimonial.name}</p>
          <p className="text-xs text-[#102C57]/60 capitalize">{testimonial.category}</p>
        </div>
      </div>
    </div>
  )
})

TestimonialCard.displayName = 'TestimonialCard'

const AboutSection = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statsVisible, setStatsVisible] = useState(false)

  // Enhanced stats data with better icons
  const stats = useMemo(() => [
    { icon: Camera, value: "20+", label: "Years Experience" },
    { icon: Heart, value: "500+", label: "Happy Clients" },
    { icon: Award, value: "1000+", label: "Projects Completed" },
    { icon: TrendingUp, value: "50+", label: "Events Covered" }
  ], [])

  const fetchTestimonials = useCallback(async (skipTimeout = fals) => {
    try {
      setError(null)
      const controller = new AbortController()
      let timeoutId

      if (!skipTimeout) {
        timeoutId = setTimeout(() => controller.abort(), 15000)
      }

      const res = await fetch(`${API_URL}/api/feedback/top3`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      })

      if (timeoutId) clearTimeout(timeoutId)

      if (!res.ok) {
        throw new Error(`Failed to fetch testimonials: ${res.status} ${res.statusText}`)
      }

      const data = await res.json()
      if (Array.isArray(data)) {
        setTestimonials(data)
      } else {
        throw new Error('Invalid data format received')
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('Request timed out. Please check your connection.')
      } else {
        setError(err.message || 'Failed to load testimonials')
      }
      console.error("Failed to fetch testimonials:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials(true)
  }, [fetchTestimonials])

  // Intersection observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    const statsElement = document.getElementById('stats-section')
    if (statsElement) {
      observer.observe(statsElement)
    }

    return () => observer.disconnect()
  }, [])

  const handleRetry = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchTestimonials()
  }, [fetchTestimonials])

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-[#FEFAF6] to-[#F5F1E8] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[#EADBC8]/10 to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#DAC0A3]/10 to-transparent rounded-full transform translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* About Content - Better Layout Balance */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center mb-20">
          {/* Profile Photo - Better Sized Container */}
          <div className="lg:col-span-2 relative group">
            <div className="absolute -inset-6 bg-gradient-to-r from-[#DAC0A3]/20 to-[#EADBC8]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative max-w-md mx-auto">
              <picture>
                <source srcSet="/Profile.webp" type="image/webp" />
                <img
                  src="/Profile.JPG"
                  alt="Pramod Dhamgaye - Professional Photographer with 20+ years experience"
                  className="rounded-2xl aspect-[4/5] shadow-2xl w-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </picture>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#102C57] to-[#1a3a6b] text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center space-x-2">
                  <Camera className="h-4 w-4" />
                  <span className="text-sm font-bold">20+ Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Content - Expanded Space */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#102C57] mb-6 leading-tight">
                About Us – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#102C57] to-[#DAC0A3]">Vidhi Digitals</span>
              </h2>
              <div className="h-1.5 w-24 bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8] rounded-full"></div>
            </div>

            <div className="space-y-6 text-lg lg:text-xl text-[#102C57]/80 leading-relaxed">
              <p>
                <strong className="text-[#102C57] text-xl lg:text-2xl">Capturing Emotions for Over 20 Years</strong><br />
                At Vidhi Digital, photography is not just our profession – it's our passion. With over two decades of experience in the art of photography, we have been turning precious moments into timeless memories since the very beginning.
              </p>
              <p>
                Whether it's the joy of a wedding, the innocence of childhood, the elegance of a fashion shoot, or the precision of product photography – we bring every frame to life with creativity, clarity, and emotion.
              </p>
              <p>
                <em className="text-[#DAC0A3] font-semibold text-xl">Every photo we take tells a story — your story.</em><br />
                If you're looking for a photography partner who understands the value of your special moments, Vidhi Digital is here for you.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Interactive Stats Section */}
        <div id="stats-section" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-[#102C57] mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8]">Achievements</span>
            </h3>
            <p className="text-xl text-[#102C57]/70">Numbers that speak for our dedication</p>
            <div className="h-1 w-16 bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8] rounded-full mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                stat={stat}
                index={index}
                isVisible={statsVisible}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-[#102C57] mb-4">
            What Our Clients Say
          </h3>
          <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto">
            Trusted by couples, families, and businesses across Raipur
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8] rounded-full mx-auto mt-4"></div>
        </div>

        {/* Testimonials Content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
              <Quote className="h-8 w-8 text-red-400 mx-auto mb-4" />
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={handleRetry}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white/50 backdrop-blur-sm border border-[#EADBC8]/20 rounded-xl p-8 max-w-md mx-auto">
              <Quote className="h-12 w-12 text-[#EADBC8] mx-auto mb-4" />
              <p className="text-[#102C57]/70 text-lg font-medium mb-2">No testimonials available yet</p>
              <p className="text-[#102C57]/50 text-sm">Be the first to share your experience with us!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AboutSection
