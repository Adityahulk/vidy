import React from 'react';
import { Play, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Logo className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">VidSimplify</span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 mb-6 max-w-md">
              Transforming enterprise video workflows with cutting-edge AI technology. 
              Trusted by Fortune 500 companies worldwide.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="https://www.instagram.com/vidsimplify?igsh=MWhnbXl5ZDVjNXZhMA==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href="https://www.linkedin.com/company/vidsimplify" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href="https://www.youtube.com/@VidSimplify/videos" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              </a>
              <a href="mailto:support@vidsimplify.com" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                <Mail className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/personality-clone" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Personality Clone</a></li>
              <li><a href="/services/ai-lip-syncing" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">AI Lip-Syncing</a></li>
              <li><a href="/services/ai-video-dubbing" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">AI Video Dubbing</a></li>
              <li><a href="/services/custom-solutions" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Custom Solutions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('about')} className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">About</button></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Press</a></li>
              <li><a href="https://vidsimplify.hashnode.dev/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Blog</a></li>
              <li><button onClick={() => scrollToSection('contact')} className="text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Contact</button></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 VidSimplify. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}