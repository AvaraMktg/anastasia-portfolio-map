
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-serif font-semibold">Anastasia Krasun</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              className={`nav-link ${isActive('/properties') ? 'active' : ''}`}
            >
              Properties
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`nav-link ${
                isActive('/contact') ? 'active' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Contact Button (Desktop) */}
          <div className="hidden md:block">
            <a 
              href="tel:+16464440474" 
              className="btn-primary"
            >
              (646) 444-0474
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4 bg-white/95 backdrop-blur-md shadow-lg">
          <Link
            to="/"
            className="block py-2 text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/properties"
            className="block py-2 text-base font-medium"
          >
            Properties
          </Link>
          <Link
            to="/about"
            className="block py-2 text-base font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-base font-medium"
          >
            Contact
          </Link>
          <div className="pt-4">
            <a
              href="tel:+16464440474"
              className="btn-primary inline-block w-full text-center"
            >
              Call: (646) 444-0474
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
