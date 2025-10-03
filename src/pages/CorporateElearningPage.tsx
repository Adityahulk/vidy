import React, { useEffect, useRef  } from 'react';
import { ArrowLeft, ArrowRight, Play, Globe, DollarSign, Clock, Users, CheckCircle, Star, Building, Target, Zap, Shield, BarChart3, Award, User, Volume2, Wand2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InteractiveHeroDemo from '../components/InteractiveHeroDemo';
import InteractiveDubbingPlayer from '../components/InteractiveDubbingPlayer';

export default function CorporateElearningPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollAmount = 408; // Card width (w-96 = 384px) + gap (space-x-6 = 24px)

      if (direction === 'left') {
        // If at the beginning, scroll to the end
        if (scrollLeft < 1) {
          scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      } else { // 'right'
        // If at (or near) the end, scroll to the beginning
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-green-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 mb-8">
              <Building className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300 font-medium">Enterprise Training Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Corporate Training
              </span>{' '}
              with AI Precision
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Transform documents, PPTs, and wikis into engaging avatar-based training videos. 
              Create personalized learning experiences with AI avatars, voice cloning, and multi-language support.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">90%</div>
                <div className="text-slate-400 text-sm">Faster Creation</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-400 text-sm">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-slate-400 text-sm">Availability</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <button 
                onClick={scrollToContact}
                className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Request a Pilot</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Interactive Demo Component */}
            <div className="mt-16 sm:mt-20">
              <InteractiveHeroDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Traditional Training Challenges
            </h2>
            <p className="text-lg sm:text-xl text-slate-400">
              Organizations face multiple barriers in creating effective, scalable training content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
              <DollarSign className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Expensive Production</h3>
              <p className="text-slate-400 text-sm">Professional video production costs $5,000-50,000 per training module</p>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
              <Clock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Long Development</h3>
              <p className="text-slate-400 text-sm">Traditional video creation takes 6-12 weeks from concept to delivery</p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Boring Content</h3>
              <p className="text-slate-400 text-sm">Static presentations and documents fail to engage modern learners</p>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center">
              <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Update Challenges</h3>
              <p className="text-slate-400 text-sm">Updating training content requires complete re-production cycles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Training Demo Section */}
      <section id="demo-section" className="py-16 sm:py-20 lg:py-24 bg-slate-800 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Modern Training for Every Team & Every Need
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Transform your documents, PPTs, and wikis into engaging avatar-based training videos
            </p>
          </div>

          {/* Horizontal Scrolling Demo Videos */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button onClick={() => handleScroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={() => handleScroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full flex items-center justify-center hover:bg-slate-700/80 transition-all duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Scrolling Container */}
            <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Employee Onboarding Demo */}
              <div className="flex-shrink-0 w-96 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <video
                  controls
                  className="w-full aspect-video"
                  poster="https://storage.googleapis.com/vidsimplify/Screenshot%202025-10-03%20at%202.58.51%20AM.png"
                >
                  <source src="https://storage.googleapis.com/vidsimplify/Employee%20onboarding.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">Employee Onboarding</h3>
                </div>
              </div>

              {/* Compliance & InfoSec Demo */}
              <div className="flex-shrink-0 w-96 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <video
                  controls
                  className="w-full aspect-video"
                  poster="https://storage.googleapis.com/vidsimplify/Screenshot%202025-10-02%20at%2010.22.47%20PM.png"
                >
                  <source src="https://storage.googleapis.com/vidsimplify/Compliance%20at%20workplace.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">Compliance Training</h3>
                </div>
              </div>

              {/* Internal Upskilling Demo */}
              <div className="flex-shrink-0 w-96 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <video
                  controls
                  className="w-full aspect-video"
                  poster="https://storage.googleapis.com/vidsimplify/Screenshot%202025-10-02%20at%2010.22.47%20PM.png"
                >
                  <source src="https://storage.googleapis.com/vidsimplify/infosec%20training.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">Internal Upskilling</h3>
                </div>
              </div>

              {/* Product Training Demo */}
              <div className="flex-shrink-0 w-96 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-orange-100 to-red-100">
                  <img
                    src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Product Training Demo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Product
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">Product Explainers</h3>
                </div>
              </div>

              {/* Safety Training Demo */}
              <div className="flex-shrink-0 w-96 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="relative aspect-video bg-gradient-to-br from-yellow-100 to-orange-100">
                  <img
                    src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Safety Training Demo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-gray-800 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Safety
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900">Safety Training</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete AI Training Suite */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Complete AI Training Suite
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              All 4 AI technologies working together for comprehensive corporate training solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* AI Avatar Training */}
            <div 
              onClick={() => navigate('/services/avatar-videos')}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-6">
                <User className="w-12 h-12 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">👤 AI Avatar Training</h3>
                  <p className="text-slate-400">Document to video conversion</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Transform your existing documents, PPTs, and wikis into engaging avatar-based training videos. 
                Upload content and watch AI create professional training materials instantly.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>PPT/PDF/Wiki to video conversion</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Professional avatar selection</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Automatic script generation</span>
                </div>
                <div className="mt-6 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors duration-300 flex items-center">
                  <span>Click to know more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Personality Cloning */}
            <div 
              onClick={() => navigate('/services/personality-clone')}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-6">
                <User className="w-12 h-12 text-purple-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">🧬 Personality Cloning</h3>
                  <p className="text-slate-400">CEO/expert cloning for consistency</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Clone your CEO, subject matter experts, or key trainers to deliver consistent messaging 
                across all training content while maintaining their authentic presence.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Complete personality replication</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Voice & gesture cloning</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Unlimited content generation</span>
                </div>
                <div className="mt-6 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300 flex items-center">
                  <span>Click to know more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* AI Dubbing & Localization */}
            <div 
              onClick={() => navigate('/services/ai-video-dubbing')}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-6">
                <Volume2 className="w-12 h-12 text-green-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">🎤 AI Dubbing & Localization</h3>
                  <p className="text-slate-400">50+ language voice cloning</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Instantly localize your training content into 50+ languages while maintaining the original 
                speaker's voice characteristics and emotional tone.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Voice cloning in 50+ languages</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Perfect lip-sync technology</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Cultural adaptation</span>
                </div>
                <div className="mt-6 text-sm font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-300 flex items-center">
                  <span>Click to know more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Custom AI Solutions */}
            <div 
              onClick={() => navigate('/services/custom-solutions')}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center mb-6">
                <Wand2 className="w-12 h-12 text-orange-500 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-white">🪄 Custom AI Solutions</h3>
                  <p className="text-slate-400">LMS integration & white-label</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6">
                Seamlessly integrate with your existing LMS, HR systems, and training platforms. 
                White-label solutions available for training companies.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>LMS & HR system integration</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>White-label platform</span>
                </div>
                <div className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  <span>Custom workflow automation</span>
                </div>
                <div className="mt-6 text-sm font-semibold text-orange-400 group-hover:text-orange-300 transition-colors duration-300 flex items-center">
                  <span>Click to know more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Perfect for Every Training Need
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              From onboarding to compliance, transform all your corporate training content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <Users className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Employee Onboarding</h3>
              <p className="text-slate-400 mb-6">Welcome new hires in their native language with consistent company messaging and culture introduction.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Company culture videos
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Role-specific training
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Benefits explanation
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300">
              <Shield className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Compliance Training</h3>
              <p className="text-slate-400 mb-6">Ensure regulatory compliance across all global offices with up-to-date, localized training content.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  GDPR & data privacy
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Anti-harassment policies
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Industry regulations
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300">
              <Target className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Safety Training</h3>
              <p className="text-slate-400 mb-6">Critical safety information delivered clearly in every employee's preferred language.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Workplace safety protocols
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Emergency procedures
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Equipment operation
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <Award className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Product Training</h3>
              <p className="text-slate-400 mb-6">Keep global teams updated on product features, updates, and best practices.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Feature demonstrations
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Sales enablement
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Technical documentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Calculate Your Savings
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              See how much you can save by switching from traditional dubbing to AI localization
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Traditional Method */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Traditional Dubbing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">10 hours of content</span>
                    <span className="text-red-400 font-bold">$15,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">5 languages</span>
                    <span className="text-red-400 font-bold">$75,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Timeline</span>
                    <span className="text-red-400 font-bold">20 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Updates (per change)</span>
                    <span className="text-red-400 font-bold">$15,000</span>
                  </div>
                  <hr className="border-red-500/20" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total Annual Cost</span>
                    <span className="text-red-400">$150,000+</span>
                  </div>
                </div>
              </div>

              {/* AI Method */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">AI Localization</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">10 hours of content</span>
                    <span className="text-green-400 font-bold">$2,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">5 languages</span>
                    <span className="text-green-400 font-bold">$10,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Timeline</span>
                    <span className="text-green-400 font-bold">2 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Updates (per change)</span>
                    <span className="text-green-400 font-bold">$500</span>
                  </div>
                  <hr className="border-green-500/20" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-white">Total Annual Cost</span>
                    <span className="text-green-400">$15,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Summary */}
            <div className="mt-12 text-center bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">Your Annual Savings</h3>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mb-4">
                $135,000+
              </div>
              <p className="text-slate-300 text-lg">90% cost reduction with 10x faster delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise-Grade Features
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Built for the security, scalability, and reliability demands of Fortune 500 companies
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Shield className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SOC 2 Compliance</h3>
              <p className="text-slate-400 text-sm">Enterprise-grade security with end-to-end encryption and audit trails</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Users className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Team Management</h3>
              <p className="text-slate-400 text-sm">Role-based access control and team collaboration features</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Analytics Dashboard</h3>
              <p className="text-slate-400 text-sm">Track usage, engagement, and ROI across all training content</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Globe className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">API Integration</h3>
              <p className="text-slate-400 text-sm">Seamless integration with your existing LMS and HR systems</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Clock className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-slate-400 text-sm">Dedicated enterprise support with guaranteed response times</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Target className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Custom Workflows</h3>
              <p className="text-slate-400 text-sm">Tailored automation workflows for your specific training processes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Trusted by Global Leaders
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              See how industry leaders are transforming their training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <h4 className="text-white font-bold">Global Tech Corp</h4>
                  <p className="text-slate-400 text-sm">Fortune 100 Technology</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 italic">
                "Reduced our training localization costs by 85% while improving delivery speed by 10x. 
                Our global teams now receive consistent, high-quality training in their native languages."
              </p>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-bold">85%</div>
                  <div className="text-slate-500">Cost Savings</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">50+</div>
                  <div className="text-slate-500">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">10k+</div>
                  <div className="text-slate-500">Employees</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <h4 className="text-white font-bold">Manufacturing Giant</h4>
                  <p className="text-slate-400 text-sm">Global Manufacturing</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 italic">
                "Safety training compliance across 30 countries is now seamless. 
                We can update critical safety protocols and have them localized within hours."
              </p>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-bold">30</div>
                  <div className="text-slate-500">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">24hrs</div>
                  <div className="text-slate-500">Update Time</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">100%</div>
                  <div className="text-slate-500">Compliance</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <Building className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <h4 className="text-white font-bold">Financial Services</h4>
                  <p className="text-slate-400 text-sm">Global Banking</p>
                </div>
              </div>
              <p className="text-slate-300 mb-6 italic">
                "Compliance training is critical in our industry. AI localization ensures 
                consistent messaging while meeting regulatory requirements in every market."
              </p>
              <div className="flex space-x-4 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-bold">25</div>
                  <div className="text-slate-500">Markets</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">100%</div>
                  <div className="text-slate-500">Regulatory</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-bold">90%</div>
                  <div className="text-slate-500">Time Saved</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500/10 to-green-500/10 border-y border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Training?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join Fortune 500 companies already saving millions on training localization. 
            Get a personalized demo and ROI analysis for your organization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => window.open('https://calendly.com/aditya-vidsimplify/demo-call', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Schedule Enterprise Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link 
              to="/playground"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300"
            >
              Try Free Demo
            </Link>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Enterprise Sales</h4>
              <p className="text-slate-400 text-sm">support@vidsimplify.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Quick Response</h4>
              <p className="text-slate-400 text-sm">&lt; 2 hours response time</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold mb-2">Enterprise Ready</h4>
              <p className="text-slate-400 text-sm">SOC 2 & GDPR compliant</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}