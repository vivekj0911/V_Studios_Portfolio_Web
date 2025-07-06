import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Framer Motion animation variants
const navbarVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
};

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/#gallery" },
  { name: "About", path: "/#about" },
  { name: "Contact", path: "/#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 w-full z-50 bg-beige/90 backdrop-blur-md shadow-sm transition-colors duration-300"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-3xl font-heading text-heading"
          aria-label="Vidhi Digitals homepage"
        >
          <img
            src="/camera.png"
            alt="Vidhi Digitals Logo"
            className="h-10 w-auto object-contain transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-3"
            loading="eager"
            width={40}
            height={40}
          />
          <span className="tracking-tight">Vidhi Digitals</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 font-body text-lg text-body-text">
          {navLinks.map(({ name, path }, index) => (
            <motion.div
              key={name}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative group transition duration-300 pb-1 ${isActive
                    ? "text-heading font-semibold"
                    : "text-body-text hover:text-accent"
                  }`
                }
              >
                {name}
                <span className="absolute left-0 -bottom-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-body-text focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-beige px-4 pb-4 pt-2 space-y-2 overflow-hidden"
          >
            {navLinks.map(({ name, path }, index) => (
              <motion.div
                key={name}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <NavLink
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 font-medium text-lg text-body-text hover:text-accent relative group transition"
                >
                  {name}
                  <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                </NavLink>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
