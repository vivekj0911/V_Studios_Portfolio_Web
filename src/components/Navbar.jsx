import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  // Initial theme setup
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const systemTheme = saved || (prefersDark ? "dark" : "light");
    setTheme(systemTheme);
    document.documentElement.classList.toggle("dark", systemTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-almond/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto  px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-heading text-heading dark:text-dun">
          MyLens
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-body-text dark:text-dark-text font-body text-lg">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `relative group transition duration-300 ${
                  isActive
                    ? "text-heading dark:text-tan font-semibold"
                    : "hover:text-chamoisee dark:hover:text-tan"
                }`
              }
            >
              {name}
              <span className="block h-0.5 bg-heading dark:bg-tan scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </NavLink>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1 rounded border text-sm text-body-text dark:text-dun border-body-text dark:border-dun hover:bg-body-text/10 dark:hover:bg-dun/10 transition"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-3xl text-body-text dark:text-dun focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-almond dark:bg-dark-bg px-4 pb-4 pt-2 space-y-2"
          >
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                className="block py-2 text-body-text dark:text-dun font-medium text-lg hover:text-heading dark:hover:text-tan transition"
                onClick={() => setIsOpen(false)}
              >
                {name}
              </NavLink>
            ))}

            {/* Theme Toggle in Mobile */}
            <button
              onClick={toggleTheme}
              className="mt-2 px-3 py-1 rounded border text-sm text-body-text dark:text-dun border-body-text dark:border-dun hover:bg-body-text/10 dark:hover:bg-dun/10 transition"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
