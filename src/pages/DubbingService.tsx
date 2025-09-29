import React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Play, Volume2, Globe, Mic, Settings, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InteractiveDubbingPlayer from '../components/InteractiveDubbingPlayer';

export default function DubbingService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
              <Volume2 className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">Professional Voice Cloning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI Video{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Dubbing
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Transform your videos with professional-grade AI dubbing in 50+ languages. 
              Perfect lip-sync, voice cloning, and natural-sounding translations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Link 
                to="/playground" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Start Dubbing</span>
                <Volume2 className="w-5 h-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('demo-video')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Demo Video Section */}
            <div id="demo-video" className="mt-16 sm:mt-20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">AI Dubbing Demo</h3>
                  <p className="text-slate-400">Experience professional voice cloning and perfect lip-sync</p>
                </div>
                <InteractiveDubbingPlayer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Professional dubbing powered by advanced AI voice synthesis and lip-sync technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Upload & Analyze</h3>
              <p className="text-slate-400">Upload your video and select target languages. Our AI analyzes speech patterns and timing.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Voice Cloning</h3>
              <p className="text-slate-400">AI creates a perfect voice clone or selects from our library of professional voices.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Perfect Sync</h3>
              <p className="text-slate-400">Advanced lip-sync technology ensures perfect alignment between audio and visual elements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Volume2 className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Voice Cloning</h3>
              <p className="text-slate-400 text-sm">Create perfect voice replicas that maintain the original speaker's tone and style.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Globe className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">50+ Languages</h3>
              <p className="text-slate-400 text-sm">Support for major world languages with native-level pronunciation and intonation.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Mic className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Perfect Lip-Sync</h3>
              <p className="text-slate-400 text-sm">Advanced facial tracking ensures perfect synchronization between audio and lip movements.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Settings className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Emotion Preservation</h3>
              <p className="text-slate-400 text-sm">Maintain emotional nuances and speaking style across different languages.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Control</h3>
              <p className="text-slate-400 text-sm">AI-powered quality assurance ensures broadcast-ready audio output.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Star className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Batch Processing</h3>
              <p className="text-slate-400 text-sm">Process multiple videos simultaneously for efficient large-scale operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Perfect For
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Global Marketing</h3>
              <p className="text-slate-400 text-sm">Expand your reach with localized marketing content in multiple languages.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">E-Learning</h3>
              <p className="text-slate-400 text-sm">Create multilingual educational content for global training programs.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Play className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Entertainment</h3>
              <p className="text-slate-400 text-sm">Dub movies, shows, and content for international distribution.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Mic className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Corporate Communications</h3>
              <p className="text-slate-400 text-sm">Deliver consistent messaging across global teams and markets.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Go Global?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Start dubbing your content in multiple languages today. 
            Professional quality, fast turnaround, enterprise security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.open('https://calendly.com/aditya-vidsimplify/demo-call', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <Link 
              to="/#contact"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}