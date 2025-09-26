import React, { useState, useEffect } from 'react';
import { Menu, X, Play, User, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname === '/') {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">VidSimplify</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-white transition-colors text-sm xl:text-base">
              Services
            </button>
            <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white transition-colors text-sm xl:text-base">
              Features
            </button>
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors text-sm xl:text-base">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors text-sm xl:text-base">
              Contact
            </button>
            {user && (
              <button 
                onClick={signOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm xl:text-base flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-6 px-6 border-t border-slate-700 bg-slate-900/95 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('services')} className="text-slate-300 hover:text-white transition-colors text-left">
                Services
              </button>
              <button onClick={() => scrollToSection('features')} className="text-slate-300 hover:text-white transition-colors text-left">
                Features
              </button>
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white transition-colors text-left">
                About
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-slate-300 hover:text-white transition-colors text-left">
                Contact
              </button>
              {user && (
                <button 
                  onClick={signOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-left flex items-center space-x-2 w-full justify-center"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}