// src/components/Footer.jsx
import { Camera, Instagram, Mail, ExternalLink } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"
import { memo, useMemo } from "react"

const Footer = memo(() => {
  // Memoize static data to prevent recreation on every render
  const socialLinks = useMemo(() => [
    {
      href: "https://www.instagram.com/vidhi_photo_?igsh=MWhuZXZjZzdhMXNlNw==",
      icon: Instagram,
      label: "Follow us on Instagram",
      ariaLabel: "Instagram profile"
    },
    {
      href: "https://wa.me/+918770300818",
      icon: FaWhatsapp,
      label: "Chat with us on WhatsApp",
      ariaLabel: "WhatsApp contact"
    },
    {
      href: "mailto:pramodvarsha7@gmail.com",
      icon: Mail,
      label: "Send us an email",
      ariaLabel: "Email contact"
    }
  ], [])

  const quickLinks = useMemo(() => [
    { href: "#home", label: "Home" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" }
  ], [])

  const services = useMemo(() => [
    "Pre-Wedding Photography",
    "Baby & Family Portraits", 
    "Maternity Shoot",
    "Product & Corporate Photography"
  ], [])

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="bg-gradient-to-br from-[#102C57] via-[#102C57] to-[#0f2347] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                <Camera className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl">Vidhi Digitals Photography</span>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
              Professional photographer capturing life's beautiful moments in Raipur and beyond. 
              Creating memories that last forever.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-white/5 hover:bg-white/15 rounded-lg transition-all duration-300 hover:scale-110"
                    title={social.label}
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
              <span>Quick Links</span>
              <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 ml-3"></div>
            </h4>
            
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="group flex items-center text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <span className="text-sm">{link.label}</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
              <span>Our Services</span>
              <div className="h-px bg-gradient-to-r from-white/20 to-transparent flex-1 ml-3"></div>
            </h4>
            
            <div className="space-y-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group flex items-start space-x-2"
                >
                  <div className="w-1.5 h-1.5 bg-gray-500 rounded-full mt-2 group-hover:bg-white transition-colors duration-300"></div>
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vidhi Digitals Photography. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Made with ❤️ in Raipur</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = 'Footer'

export default Footer
