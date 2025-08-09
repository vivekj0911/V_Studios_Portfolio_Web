"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Instagram } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  "Baby shoot",
  "Maternity shoot",
  "Wedding / Pre-wedding shoot",
  "Corporate Photography",
  "Product Photography",
  "Collage photo frame design",
  "Videos",
  "Extras"
]

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    rating: 0,
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (formData.rating === 0) newErrors.rating = "Rating is required"
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors)

    const res = await fetch(`${API_URL}/api/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      setIsSubmitted(true)
      setFormData({ name: "", category: "", rating: 0, message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#102C57] mb-4">Let's Work Together</h2>
          <p className="text-xl text-[#102C57]/70 max-w-2xl mx-auto">
            Share your experience or get in touch. We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section */}
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

            {/* Social */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-[#102C57] mb-4">Follow My Work</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/vidhi_photo_?igsh=MWhuZXZjZzdhMXNlNw==" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3]">
                  <Instagram className="h-5 w-5 text-[#102C57]" />
                </a>
                <a href="https://wa.me/+918770300818" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3]">
                  <FaWhatsapp className="h-5 w-5 text-[#102C57]" />
                </a>
                <a href="mailto:pramodvarsha7@gmail.com" className="p-3 bg-[#EADBC8] rounded-full hover:bg-[#DAC0A3]">
                  <Mail className="h-5 w-5 text-[#102C57]" />
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-[#EADBC8]/30 rounded-2xl h-64 overflow-hidden">
              <iframe
                title="Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.202563760492!2d81.62253810000001!3d21.2634479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddf455ce7157%3A0x30ec8e43702cbccb!2sVidhi%20Photo%20Studio!5e0!3m2!1sen!2sin!4v1753264267855!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} loading="lazy" className="rounded-2xl"
              ></iframe>
            </div>
          </div>

          {/* Right Section (Feedback Form) */}
          <div className="bg-[#FEFAF6] rounded-2xl p-8 border border-[#EADBC8]/30">
            <h3 className="text-2xl font-bold text-[#102C57] mb-6">Share Your Experience</h3>

            {isSubmitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
                Thank you for your feedback!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#102C57] mb-2">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] ${errors.name ? "border-red-500" : "border-[#EADBC8]"}`}
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#102C57] mb-2">
                  Category of Shoot *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] ${errors.category ? "border-red-500" : "border-[#EADBC8]"}`}
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-[#102C57] mb-2">
                  Rate your experience *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                      className={`text-2xl ${formData.rating >= star ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#102C57] mb-2">
                  Your Feedback (optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#DAC0A3] border-[#EADBC8] resize-none"
                  placeholder="Write something if you'd like..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#102C57] text-white py-3 px-6 rounded-lg hover:bg-[#102C57]/90 transition-colors font-semibold"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
