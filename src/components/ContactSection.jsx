// src/components/ContactSection.jsx
"use client"

import { useState, useMemo, useCallback, memo } from "react"
import { MapPin, Phone, Mail, Instagram, AlertCircle, CheckCircle, Loader2, Star } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const API_URL = import.meta.env.VITE_API_URL

// Memoized contact info component
const ContactInfo = memo(() => {
  const contactDetails = useMemo(() => [
    {
      icon: MapPin,
      label: "Location",
      value: "Raipur, Chhattisgarh",
      href: null,
      ariaLabel: "Our location in Raipur, Chhattisgarh"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 87703 00818",
      href: "tel:+918770300818",
      ariaLabel: "Call us at +91 87703 00818"
    },
    {
      icon: Mail,
      label: "Email",
      value: "pramodvarsha7@gmail.com",
      href: "mailto:pramodvarsha7@gmail.com",
      ariaLabel: "Send email to pramodvarsha7@gmail.com"
    }
  ], [])

  const socialLinks = useMemo(() => [
    {
      icon: Instagram,
      href: "https://www.instagram.com/vidhi_photo_?igsh=MWhuZXZjZzdhMXNlNw==",
      label: "Follow us on Instagram",
      ariaLabel: "Visit our Instagram profile"
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/+918770300818",
      label: "Chat on WhatsApp",
      ariaLabel: "Contact us on WhatsApp"
    },
    {
      icon: Mail,
      href: "mailto:pramodvarsha7@gmail.com",
      label: "Send Email",
      ariaLabel: "Send us an email"
    }
  ], [])

  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div>
        <h3 className="text-2xl font-bold text-[#102C57] mb-6 flex items-center">
          Get In Touch
          <div className="h-px bg-gradient-to-r from-[#DAC0A3] to-transparent flex-1 ml-4"></div>
        </h3>
        <address className="not-italic space-y-4">
          {contactDetails.map((detail, index) => {
            const IconComponent = detail.icon
            const content = (
              <div className="flex items-center group">
                <div className="p-2 bg-[#DAC0A3]/20 rounded-lg mr-4 group-hover:bg-[#DAC0A3]/30 transition-colors duration-200">
                  <IconComponent className="h-5 w-5 text-[#DAC0A3]" />
                </div>
                <span className="text-[#102C57]/80 group-hover:text-[#102C57] transition-colors duration-200">
                  {detail.value}
                </span>
              </div>
            )

            return detail.href ? (
              <a
                key={index}
                href={detail.href}
                className="block hover:scale-105 transition-transform duration-200"
                aria-label={detail.ariaLabel}
              >
                {content}
              </a>
            ) : (
              <div key={index} className="block">
                {content}
              </div>
            )
          })}
        </address>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-lg font-semibold text-[#102C57] mb-4">Follow My Work</h4>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-gradient-to-r from-[#EADBC8] to-[#DAC0A3]/80 rounded-full hover:from-[#DAC0A3] hover:to-[#EADBC8] transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title={social.label}
                aria-label={social.ariaLabel}
              >
                <IconComponent className="h-5 w-5 text-[#102C57] group-hover:scale-110 transition-transform duration-200" />
              </a>
            )
          })}
        </div>
      </div>

      {/* Enhanced Map */}
      <div className="relative">
        <h4 className="text-lg font-semibold text-[#102C57] mb-4">Find Us</h4>
        <div className="relative bg-gradient-to-r from-[#EADBC8]/20 to-[#DAC0A3]/20 rounded-2xl p-1 hover:shadow-lg transition-all duration-300">
          <div className="bg-white rounded-2xl overflow-hidden h-64 relative">
            <iframe
              title="Vidhi Photo Studio Location - Raipur, Chhattisgarh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.202563760492!2d81.62253810000001!3d21.2634479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddf455ce7157%3A0x30ec8e43702cbccb!2sVidhi%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1753264267855!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
})

ContactInfo.displayName = 'ContactInfo'

// Memoized star rating component
const StarRating = memo(({ rating, onRatingChange, error }) => {
  return (
    <div>
      <span className="block text-sm font-medium text-[#102C57] mb-3">
        Rate your experience *
      </span>
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => onRatingChange(star)}
            className={`
              p-1 text-2xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] rounded
              ${rating >= star 
                ? "text-yellow-400 hover:text-yellow-500" 
                : "text-gray-300 hover:text-gray-400"
              }
            `}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            <Star className={`h-6 w-6 ${rating >= star ? "fill-current" : ""}`} />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <p className="text-sm text-[#102C57]/60 mb-2">
          You rated: {rating} star{rating > 1 ? "s" : ""}
        </p>
      )}
      {error && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
})

StarRating.displayName = 'StarRating'

export default function ContactSection() {
  const categories = useMemo(() => [
    "Baby shoot",
    "Maternity shoot",
    "Wedding / Pre-wedding shoot",
    "Corporate Photography",
    "Product Photography",
    "Collage photo frame design",
    "Videos",
    "Extras"
  ], [])

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: 0,
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState("")

  // Enhanced validation with better messages
  const validateForm = useCallback(() => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long"
    }
    
    if (!formData.category) {
      newErrors.category = "Please select a category for your shoot"
    }
    
    if (formData.rating === 0) {
      newErrors.rating = "Please rate your experience"
    }
    
    return newErrors
  }, [formData])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
    
    // Clear server error
    if (serverError) {
      setServerError("")
    }
  }, [errors, serverError])

  const handleRatingChange = useCallback((rating) => {
    setFormData(prev => ({ ...prev, rating }))
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: "" }))
    }
    if (serverError) {
      setServerError("")
    }
  }, [errors.rating, serverError])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setServerError("")
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

      const res = await fetch(`${API_URL}/api/feedback`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || `Server error (${res.status})`)
      }

      setIsSubmitted(true)
      setFormData({ name: "", category: "", rating: 0, message: "" })
      setErrors({})
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000)
      
    } catch (err) {
      if (err.name === 'AbortError') {
        setServerError("Request timed out. Please check your connection and try again.")
      } else {
        setServerError(err.message || "Something went wrong. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }, [formData, validateForm])

  const inputClasses = "w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent"

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-[#FEFAF6] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EADBC8]/10 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#DAC0A3]/10 to-transparent rounded-full transform -translate-x-48 translate-y-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-4">
            Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8]">Together</span>
          </h2>
          <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto">
            Share your experience or get in touch. We'd love to hear from you!
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8] rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <ContactInfo />

          {/* Right - Enhanced Feedback Form */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#DAC0A3]/20 to-[#EADBC8]/20 rounded-2xl blur-sm"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-[#EADBC8]/30 shadow-xl">
              <h3 className="text-2xl font-bold text-[#102C57] mb-6 flex items-center">
                Share Your Experience
                <div className="h-px bg-gradient-to-r from-[#DAC0A3] to-transparent flex-1 ml-4"></div>
              </h3>

              {/* Success Message */}
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">Thank you!</h4>
                    <p className="text-sm text-green-700">Your feedback has been submitted successfully.</p>
                  </div>
                </div>
              )}

              {/* Server Error */}
              {serverError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Error</h4>
                    <p className="text-sm text-red-700">{serverError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#102C57] mb-2">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.name ? "border-red-300 focus:ring-red-200" : "border-[#EADBC8]"}`}
                    placeholder="Enter your full name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[#102C57] mb-2">
                    Category of Shoot *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputClasses} ${errors.category ? "border-red-300 focus:ring-red-200" : "border-[#EADBC8]"}`}
                    aria-invalid={!!errors.category}
                    aria-describedby={errors.category ? "category-error" : undefined}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p id="category-error" className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.category}</span>
                    </p>
                  )}
                </div>

                {/* Star Rating */}
                <StarRating
                  rating={formData.rating}
                  onRatingChange={handleRatingChange}
                  error={errors.rating}
                />

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#102C57] mb-2">
                    Your Feedback <span className="text-[#102C57]/60">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} border-[#EADBC8] resize-none`}
                    placeholder="Tell us about your experience..."
                    disabled={isSubmitting}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`
                    w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform
                    ${isSubmitted 
                      ? "bg-green-600 text-white" 
                      : "bg-gradient-to-r from-[#102C57] to-[#1a3a6b] text-white hover:from-[#102C57]/90 hover:to-[#1a3a6b]/90 hover:scale-[1.02] active:scale-[0.98]"
                    }
                    ${isSubmitting || isSubmitted 
                      ? "opacity-70 cursor-not-allowed transform-none" 
                      : ""
                    }
                  `}
                >
                  {isSubmitting && <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />}
                  {isSubmitted && <CheckCircle className="inline-block w-4 h-4 mr-2" />}
                  {isSubmitted ? "Submitted!" : isSubmitting ? "Submitting..." : "Submit Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
