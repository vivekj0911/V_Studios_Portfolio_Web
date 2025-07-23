import { Camera, Instagram, Mail } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#102C57] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="h-6 w-6" />
              <span className="font-semibold text-lg">Vidhi Digitals Photography</span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional photographer capturing life's beautiful moments in Raipur and beyond.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/vidhi_photo_?igsh=MWhuZXZjZzdhMXNlNw==" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/8770300818" className="text-gray-400 hover:text-white transition-colors">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <a href="mailto:pramodvarsha7@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Pre-Wedding Photography</span>
              </li>
              <li>
                <span className="text-gray-400">Baby & Family Portraits</span>
              </li>
              <li>
                <span className="text-gray-400">Maternity Shoot</span>
              </li>
              <li>
                <span className="text-gray-400">Product & Corporate Photography</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Vidhi Digitals Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
