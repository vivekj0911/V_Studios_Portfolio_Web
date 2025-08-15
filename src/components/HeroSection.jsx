"use client"

import { ChevronDown, Camera, Play } from "lucide-react"
import { useState, useEffect, useCallback, useRef } from "react"

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const heroRef = useRef(null)
  const parallaxRef = useRef(null)

  // Enhanced scroll to gallery with offset
  const scrollToGallery = useCallback(() => {
    const element = document.getElementById("gallery")
    if (element) {
      const offset = 80 // Account for fixed header if any
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.5
        parallaxRef.current.style.transform = `translate3d(0, ${rate}px, 0)`
      }
      
      // Update scroll state for dynamic effects
      setIsScrolled(window.pageYOffset > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Staggered content animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Handle image load with preloading
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true)
    // Preload other critical images
    const preloadImages = ['/covers/all-1920.webp', '/Profile.webp']
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Keyboard accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      scrollToGallery()
    }
  }, [scrollToGallery])

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      role="banner"
      aria-label="Hero section - Professional photography services"
    >
      {/* Enhanced Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Low-quality placeholder with better blur */}
        <div className="absolute inset-0">
          <img
            src="/hero-background-blur.webp"
            alt=""
            className="w-full h-full object-cover blur-3xl scale-110 opacity-80"
            aria-hidden="true"
          />
        </div>

        {/* High-resolution image with parallax */}
        <div 
          ref={parallaxRef}
          className="absolute inset-0 will-change-transform"
        >
          <picture>
            <source 
              srcSet="/hero-background-800.webp 800w, /hero-background-1920.webp 1920w, /hero-background-2560.webp 2560w"
              sizes="100vw"
            />
            <img
              src="/hero-background-1920.webp"
              alt="Professional photography studio with beautiful lighting and equipment"
              loading="eager"
              fetchPriority="high"
              className={`w-full h-full object-cover transition-all duration-1000 transform ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
              onLoad={handleImageLoad}
              width="1920"
              height="1080"
            />
          </picture>
        </div>

        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#102C57]/20 to-transparent"></div>
        
        {/* Dynamic overlay based on scroll */}
        <div className={`absolute inset-0 bg-black/10 transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
        {/* Main Heading with Adjusted Typography */}
        <div className={`transform transition-all duration-1000 delay-300 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Capturing Life's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EADBC8] via-[#DAC0A3] to-[#EADBC8] drop-shadow-lg">
              Beautiful Moments
            </span>
          </h1>
        </div>

        {/* Enhanced Description */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            Professional photographer based in <span className="text-[#EADBC8] font-semibold">Raipur</span>, 
            specializing in weddings, portraits, and lifestyle photography with 
            <span className="text-[#EADBC8] font-semibold"> 20+ years</span> of experience
          </p>
        </div>

        {/* Enhanced CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-700 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <button
            onClick={scrollToGallery}
            onKeyDown={handleKeyDown}
            className="group relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#EADBC8] to-[#DAC0A3] text-[#102C57] font-bold text-base rounded-full hover:from-[#DAC0A3] hover:to-[#EADBC8] transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#EADBC8] focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="View photography portfolio gallery"
          >
            <Camera className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            View Gallery
            <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold text-base rounded-full border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label="Learn more about our photography services"
          >
            <Play className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
            Learn More
          </button>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white transition-all duration-500 ${
        isScrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
      }`}>
        <button
          onClick={scrollToGallery}
          className="group flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-[#EADBC8] focus:ring-offset-2 focus:ring-offset-transparent rounded-lg p-2"
          aria-label="Scroll down to view gallery"
        >
          <span className="text-sm mb-3 text-gray-300 group-hover:text-[#EADBC8] transition-colors duration-300">
            Explore Gallery
          </span>
          <div className="p-2 border-2 border-white/30 rounded-full group-hover:border-[#EADBC8] transition-colors duration-300 animate-bounce">
            <ChevronDown className="h-5 w-5 group-hover:text-[#EADBC8] transition-colors duration-300" />
          </div>
        </button>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute top-4 right-4 z-30">
          <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
            <span className="text-white text-sm">Loading...</span>
          </div>
        </div>
      )}

      {/* Enhanced CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
