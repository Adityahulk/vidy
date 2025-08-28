import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Scissors, User, Volume2, Film, Zap, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      icon: Scissors,
      title: 'Long-Form to Short Clips',
      description: 'AI extracts the most engaging moments from long videos',
      videoTitle: 'Smart Content Extraction Demo',
      videoDuration: 8000 // 8 seconds demo
    },
    {
      icon: User,
      title: 'AI Avatar Creation',
      description: 'Generate lifelike avatars with natural expressions',
      videoTitle: 'Photorealistic Avatar Demo',
      videoDuration: 10000 // 10 seconds demo
    },
    {
      icon: Volume2,
      title: 'AI Video Dubbing',
      description: 'Professional voice cloning in 50+ languages',
      videoTitle: 'Multilingual Dubbing Demo',
      videoDuration: 12000 // 12 seconds demo
    },
    {
      icon: Film,
      title: 'AI Lip-Syncing',
      description: 'Perfect audio-visual synchronization',
      videoTitle: 'Precision Lip-Sync Demo',
      videoDuration: 9000 // 9 seconds demo
    },
    {
      icon: Zap,
      title: 'Automated Editing',
      description: 'Intelligent editing with professional decisions',
      videoTitle: 'Smart Editing Demo',
      videoDuration: 11000 // 11 seconds demo
    },
    {
      icon: Wand2,
      title: 'Custom Solutions',
      description: 'Tailored AI solutions for enterprise needs',
      videoTitle: 'Enterprise Integration Demo',
      videoDuration: 7000 // 7 seconds demo
    }
  ];

  // Auto-advance to next video after current video completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % services.length);
    }, services[currentVideoIndex].videoDuration + 100); // Small buffer for smooth transition

    return () => clearTimeout(timer);
  }, [currentVideoIndex, services]);

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % services.length);
  };

  const getPrevIndex = () => (currentVideoIndex - 1 + services.length) % services.length;
  const getNextIndex = () => (currentVideoIndex + 1) % services.length;

  const currentService = services[currentVideoIndex];
  const prevService = services[getPrevIndex()];
  const nextService = services[getNextIndex()];

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
            Revolutionize your content strategy with our enterprise AI platform. 
            Create short clips, avatars, dubbing, and more, all powered by cutting-edge artificial intelligence.
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
              onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Horizontal Sliding Video Carousel */}
          <div id="demo-video" className="mt-16 sm:mt-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">See Our AI Solutions in Action</h3>
                <p className="text-slate-400">Experience each service with dedicated demo videos</p>
              </div>

              {/* Horizontal Carousel Container */}
              <div className="relative overflow-hidden rounded-xl">
                <div className="flex items-center justify-center">
                  
                  {/* Previous Video (Left Side) */}
                  <div className="w-1/6 opacity-40 transform scale-75 transition-all duration-700 ease-in-out">
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                        <div className="absolute top-2 left-2 right-2">
                          <div className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-sm rounded-md p-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <prevService.icon className="w-2 h-2 text-white" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-white font-medium text-xs">{prevService.title}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <prevService.icon className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-slate-400 text-xs">Previous</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Video (Center) */}
                  <div className="w-2/3 mx-2 transform scale-100 transition-all duration-700 ease-in-out">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                        {/* Video Content */}
                        <div className="text-center">
                          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-slate-700">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100 rounded-full"
                            style={{
                              animation: `progress ${currentService.videoDuration}ms linear forwards`
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Video (Right Side) */}
                  <div className="w-1/6 opacity-40 transform scale-75 transition-all duration-700 ease-in-out">
                    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                        <div className="absolute top-2 left-2 right-2">
                          <div className="flex items-center space-x-2 bg-slate-900/60 backdrop-blur-sm rounded-md p-2">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              <nextService.icon className="w-2 h-2 text-white" />
                            </div>
                            <div className="text-left">
                              <h4 className="text-white font-medium text-xs">{nextService.title}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <nextService.icon className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-slate-400 text-xs">Next</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Navigation Controls */}
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                  <button
                    onClick={handlePrevVideo}
                    className="w-14 h-14 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                  <button
                    onClick={handleNextVideo}
                    className="w-14 h-14 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center mt-8">
                <p className="text-slate-400 mb-4">Ready to transform your video workflow?</p>
                <button 
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                </button>
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
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400 text-sm sm:text-base">Enterprise Clients</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}