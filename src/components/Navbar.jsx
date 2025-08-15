import { useState, useEffect, useCallback, useMemo } from "react"
import { Camera, Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const navigate = useNavigate()
  const location = useLocation()

  // Memoized navigation links
  const navLinks = useMemo(() => [
    { href: "home", label: "Home" },
    { href: "gallery", label: "Gallery" },
    { href: "about", label: "About" },
    { href: "contact", label: "Contact" },
  ], [])

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setIsScrolled(scrollY > 50)
          
          // Update active section based on scroll position
          const sections = navLinks.map(link => link.href)
          let current = "home"
          
          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= 100 && rect.bottom >= 100) {
                current = section
                break
              }
            }
          }
          
          setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [navLinks])

  // Handle hash navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "")
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
      }
    }
  }, [location])

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen])

  // Optimized navigation handler
  const handleNavClick = useCallback((sectionId) => {
    if (location.pathname === "/") {
      // Already on home → just scroll
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = 80 // Account for fixed navbar
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    } else {
      // Navigate to home with hash → triggers scroll on load
      navigate(`/#${sectionId}`)
    }
    setIsMobileMenuOpen(false)
  }, [location.pathname, navigate])

  // Handle logo click
  const handleLogoClick = useCallback(() => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      navigate("/")
    }
    setIsMobileMenuOpen(false)
  }, [location.pathname, navigate])

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#EADBC8]/20" 
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Enhanced Logo */}
          <button
            onClick={handleLogoClick}
            className="group flex items-center space-x-3 text-[#102C57] hover:opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2 rounded-lg p-1"
            aria-label="Vidhi Digitals - Go to homepage"
          >
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isScrolled 
                ? "bg-gradient-to-r from-[#EADBC8]/20 to-[#DAC0A3]/20" 
                : "bg-white/10 backdrop-blur-sm"
            }`}>
              <Camera className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="font-bold text-lg lg:text-xl tracking-wide">
              Vidhi Digitals
            </span>
          </button>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2 ${
                  activeSection === link.href
                    ? "text-[#102C57] bg-gradient-to-r from-[#EADBC8]/30 to-[#DAC0A3]/30"
                    : "text-[#102C57] hover:text-[#102C57]/80 hover:bg-[#EADBC8]/20"
                }`}
                aria-current={activeSection === link.href ? "page" : undefined}
              >
                {link.label}
                {/* Active indicator */}
                {activeSection === link.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8] rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden relative p-2 text-[#102C57] hover:bg-[#EADBC8]/20 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#DAC0A3] focus:ring-offset-2"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                }`} 
              />
              <X 
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 rotate-180"
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-[#EADBC8]/30 rounded-b-2xl shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                    activeSection === link.href
                      ? "text-[#102C57] bg-gradient-to-r from-[#EADBC8]/40 to-[#DAC0A3]/40 scale-105"
                      : "text-[#102C57] hover:bg-[#EADBC8]/30 hover:translate-x-2"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeSection === link.href 
                        ? "bg-gradient-to-r from-[#DAC0A3] to-[#EADBC8]" 
                        : "bg-gray-300"
                    }`}></div>
                    <span>{link.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}

export default Navbar
