import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractivePersonalityClonePlayer from './InteractivePersonalityClonePlayer';
import InteractiveDubbingPlayer from './InteractiveDubbingPlayer';
import InteractiveLipSyncPlayer from './InteractiveLipSyncPlayer';

export default function Hero() {
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const navigate = useNavigate();

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const demos = [
    {
      title: 'Personality Clone',
      description: 'Clone your complete personality - face, voice, gestures, and movements',
      component: <InteractivePersonalityClonePlayer isPreview={true} />,
      path: '/services/personality-clone'
    },
    {
      title: 'AI Lip-Syncing',
      description: 'Perfect audio-visual synchronization',
      component: <InteractiveLipSyncPlayer isPreview={true} />,
      path: '/services/ai-lip-syncing'
    },
    {
      title: 'AI Video Dubbing',
      description: 'Professional voice cloning in 50+ languages',
      component: <InteractiveDubbingPlayer isPreview={true} />,
      path: '/services/ai-video-dubbing'
    },
  ];

  // Auto-advance to next demo every 15 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % demos.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [demos.length]);

  const handlePrevDemo = () => {
    setCurrentDemoIndex((prev) => (prev - 1 + demos.length) % demos.length);
  };

  const handleNextDemo = () => {
    setCurrentDemoIndex((prev) => (prev + 1) % demos.length);
  };

  const currentDemo = demos[currentDemoIndex];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-slate-300 text-sm">Enterprise-Grade AI Video Solutions</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Videos with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
            Clone complete personalities, sync lips perfectly, and dub content globally. 
            Professional AI video solutions with voice cloning, facial replication, and seamless synchronization.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
            <button 
              onClick={scrollToContact}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <span>Start Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('demo-carousel')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Interactive Demo Carousel */}
          <div id="demo-carousel" className="mt-16 sm:mt-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Interactive AI Demos</h3>
                <p className="text-slate-400">Experience each service with hands-on interactive demonstrations</p>
              </div>

              {/* Demo Navigation */}
              <div className="flex items-center justify-center mb-8">
                <button
                  onClick={handlePrevDemo}
                  className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800/70 transition-all duration-300 mr-4"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <div className="flex items-center space-x-2">
                  {demos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDemoIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentDemoIndex 
                          ? 'bg-blue-500' 
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextDemo}
                  className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-800/70 transition-all duration-300 ml-4"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Current Demo Display */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-6">
                <div className="text-center mb-6">
                  <h4 className="text-xl font-bold text-white mb-2">{currentDemo.title}</h4>
                  <p className="text-slate-400">{currentDemo.description}</p>
                </div>
                
                {/* Demo Component */}
                <div className="transition-all duration-500 ease-in-out">
                  {React.cloneElement(currentDemo.component, { isPreview: false })}
                </div>
              </div>

              {/* Demo Indicators */}
              <div className="flex justify-center space-x-4 text-sm text-slate-400">
                <span>Demo {currentDemoIndex + 1} of {demos.length}</span>
                <span>•</span>
                <span>Auto-advancing every 15s</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-slate-700 px-4 sm:px-0">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400 text-sm sm:text-base">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10k+</div>
              <div className="text-slate-400 text-sm sm:text-base">Videos Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-slate-400 text-sm sm:text-base">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}