import React from 'react';
import { Users, Award, Target, Rocket } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Leading the Future of 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> AI Video</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 mb-6 sm:mb-8 leading-relaxed">
              Founded by AI researchers from Stanford and MIT, we've dedicated our careers to 
              solving the most complex challenges in video processing and artificial intelligence.
            </p>
            <p className="text-base sm:text-lg text-slate-400 mb-6 sm:mb-8 leading-relaxed">
              Our mission is to democratize advanced video AI technology for enterprises, 
              making it accessible, reliable, and scalable for organizations of all sizes.
            </p>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">5+</div>
                <div className="text-slate-400 text-sm">Years of Research</div>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-slate-400 text-sm">AI Engineers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 lg:mt-0">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Users className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Expert Team</h3>
              <p className="text-slate-400 text-sm">World-class AI researchers and engineers</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Award className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Award Winning</h3>
              <p className="text-slate-400 text-sm">Recognized for innovation in AI video processing</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Target className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Enterprise Focus</h3>
              <p className="text-slate-400 text-sm">Built specifically for enterprise requirements</p>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Rocket className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Rapid Innovation</h3>
              <p className="text-slate-400 text-sm">Continuous R&D and product advancement</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}