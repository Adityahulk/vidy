import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Sparkles, Scissors, User, Volume2, Film, Zap, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    if (isPlaying) {
      const timer = setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % services.length);
        setIsPlaying(false); // Reset playing state for next video
      }, services[currentVideoIndex].videoDuration);

      return () => clearTimeout(timer);
    }
  }, [currentVideoIndex, isPlaying, services]);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + services.length) % services.length);
    setIsPlaying(false);
  };

  const handleNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % services.length);
    setIsPlaying(false);
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const currentService = services[currentVideoIndex];

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

          {/* Video Carousel Section */}
          <div id="demo-video" className="mt-16 sm:mt-20">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">See Our AI Solutions in Action</h3>
                <p className="text-slate-400">Experience each service with dedicated demo videos</p>
              </div>

              {/* Main Video Display */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden mb-6">
                {/* Video Area */}
                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative">
                  {/* Service Title Overlay */}
                  <div className="absolute top-4 left-4 right-4 z-10">
                    <div className="flex items-center space-x-3 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-slate-700">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <currentService.icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-white font-semibold text-sm">{currentService.title}</h4>
                        <p className="text-slate-400 text-xs">{currentService.description}</p>
                      </div>
                      {isPlaying && (
                        <div className="text-green-400 text-xs flex items-center ml-auto">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                          Playing
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      {isPlaying ? (
                        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Play className="w-10 h-10 text-white ml-1" />
                      )}
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-2">{currentService.videoTitle}</h4>
                    <p className="text-slate-400 text-sm">
                      {isPlaying ? 'Playing demo...' : 'Click to play demo'}
                    </p>
                  </div>
                  
                  {/* Play Button Overlay */}
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center"
                      onClick={handlePlayVideo}
                    >
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  {isPlaying && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-100"
                        style={{
                          width: '100%',
                          animation: `progress ${currentService.videoDuration}ms linear`
                        }}
                      ></div>
                    </div>
                  )}
                </div>

                {/* Navigation Controls */}
                <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
                  <button
                    onClick={handlePrevVideo}
                    className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                  <button
                    onClick={handleNextVideo}
                    className="w-10 h-10 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center text-white hover:bg-slate-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
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