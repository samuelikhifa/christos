import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    
    { name: 'Events', path: '/events' },
    { name: 'Connect', path: '/connect' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Navigation Bar - Matching Image Design */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 py-4 sm:py-6"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div
            className={`${
              isDark 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
            } rounded-full px-6 sm:px-8 py-3 sm:py-4 shadow-md border transition-all duration-300 ease-in-out`}
          >
            <div className="flex items-center justify-between gap-4">
              {/* Logo / Brand Name - Left Side */}
              <Link
                to="/"
                onClick={handleLinkClick}
                className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                aria-label="Dr. Christos Etoka - Home"
              >
                <span className={`font-bold text-base sm:text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  CT
                </span>
              </Link>

              {/* Desktop Navigation Links - Center */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={`relative text-sm lg:text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 ${
                      isActive(link.path)
                        ? isDark ? 'text-white font-medium' : 'text-gray-900 font-medium'
                        : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <span className={`absolute left-0 right-0 -bottom-1 h-0.5 ${isDark ? 'bg-white' : 'bg-gray-900'}`} />
                    )}
                  </Link>
                ))}
              </div>

              {/* Theme Toggle & Mobile Menu - Right Side */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                  aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'hover:bg-gray-800 text-white'
                      : 'hover:bg-gray-100 text-gray-900'
                  }`}
                  aria-label="Toggle mobile menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer - Slide from Right */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 backdrop-blur-sm transition-opacity duration-300 ${
            isDark ? 'bg-black/80' : 'bg-black/40'
          } ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu backdrop"
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-64 sm:w-72 ${
            isDark ? 'bg-gray-900' : 'bg-white'
          } shadow-2xl transform transition-transform duration-300 overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute top-4 right-4 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'hover:bg-gray-800 text-white'
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Logo in Mobile Menu */}
            <div className="mb-10 pt-2">
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                DR. CHRISTOS
              </span>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isActive(link.path)
                      ? isDark 
                        ? 'bg-gray-800 text-white font-medium' 
                        : 'bg-gray-100 text-gray-900 font-medium'
                      : isDark
                      ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;