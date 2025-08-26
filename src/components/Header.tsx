import React, { useState, useEffect } from 'react';
import { Menu, X, Play } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
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
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Play className="w-4 h-4 text-white" fill="currentColor" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">VideoAI Pro</span>
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
            <button 
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 xl:px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 text-sm xl:text-base"
            >
              Get Started
            </button>
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
          <div className="lg:hidden mt-4 py-4 border-t border-slate-700">
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
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-left"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}