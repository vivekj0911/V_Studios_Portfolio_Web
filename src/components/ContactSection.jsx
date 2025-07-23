"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      // Handle form submission here
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    } else {
      setErrors(newErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-4">Let's Work Together</h2>
          <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto">
            Ready to capture your special moments? Get in touch to discuss your photography needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#102C57] mb-6">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-[#DAC0A3] mr-3" />
                  <span className="text-[#102C57]/80">Raipur, Chhattisgarh</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-[#DAC0A3] mr-3" />
                  <span className="text-[#102C57]/80">+91 87703 00818</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-[#DAC0A3] mr-3" />
                  <span className="text-[#102C57]/80">pramodvarsha7@gmail.com</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#102C57] mb-4">Follow My Work</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/vidhi_photo_?igsh=MWhuZXZjZzdhMXNlNw==" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3] transition-colors">
                  <Instagram className="h-5 w-5 text-[#102C57]" />
                </a>
                <a href="https://wa.me/8770300818" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3] transition-colors">
                  <FaWhatsapp className="h-5 w-5 text-[#102C57]" />
                </a>
                <a href="mailto:pramodvarsha7@gmail.com" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3] transition-colors">
                  <Mail className="h-5 w-5 text-[#102C57]" />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-[#EADBC8]/30 rounded-2xl h-64 overflow-hidden">
              <iframe
                title="Interactive Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.202563760492!2d81.62253810000001!3d21.2634479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddf455ce7157%3A0x30ec8e43702cbccb!2sVidhi%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1753264267855!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-[#FEFAF6] rounded-2xl p-8 border border-[#EADBC8]/30">
            <h3 className="text-2xl font-bold text-[#102C57] mb-6">Send a Message</h3>

            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                Thank you for your message! I'll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#102C57] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-colors ${errors.name ? "border-red-500" : "border-[#EADBC8]"
                    }`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#102C57] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-colors ${errors.email ? "border-red-500" : "border-[#EADBC8]"
                    }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#102C57] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] focus:border-transparent transition-colors resize-none ${errors.message ? "border-red-500" : "border-[#EADBC8]"
                    }`}
                  placeholder="Tell me about your photography needs, event date, and any specific requirements..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#102C57] text-white py-3 px-6 rounded-lg hover:bg-[#102C57]/90 transition-colors font-semibold"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
