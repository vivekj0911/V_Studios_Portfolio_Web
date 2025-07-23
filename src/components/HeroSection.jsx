"use client"

import { ChevronDown } from "lucide-react"

const HeroSection = () => {
  const scrollToGallery = () => {
    const element = document.getElementById("gallery")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./hero-background.JPG"
          alt="Professional photography background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Capturing Life's
          <span className="block text-[#EADBC8] ">Beautiful Moments</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
          Professional photographer based in Mumbai, specializing in weddings, portraits, and lifestyle photography
        </p>
        <button
          onClick={scrollToGallery}
          className="inline-flex items-center px-8 py-4 bg-[#EADBC8] text-[#102C57] font-semibold rounded-full hover:bg-[#DAC0A3] transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          View Gallery
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-gray-200">Scroll Down</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
