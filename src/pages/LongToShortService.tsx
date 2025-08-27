import React from 'react';
import { ArrowLeft, Play, Clock, Target, Zap, BarChart3, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function LongToShortService() {
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
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">AI-Powered Content Extraction</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Long-Form to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Short Clips
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Transform hours of content into engaging short clips automatically. 
              Our AI identifies the most compelling moments and creates perfect social media content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center">
                <span>Start Free Trial</span>
                <Play className="w-5 h-5" />
              </button>
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">See It In Action</h3>
                  <p className="text-slate-400">Watch how our AI transforms long-form content into engaging short clips</p>
                </div>
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Scissors className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">Long-to-Short Demo</h4>
                      <p className="text-slate-400 text-sm">See how we extract perfect clips from long videos</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors cursor-pointer flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
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
              Our AI analyzes your long-form content and automatically creates engaging short clips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Upload Your Video</h3>
              <p className="text-slate-400">Upload your long-form content - webinars, podcasts, interviews, or any video content.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">AI Analysis</h3>
              <p className="text-slate-400">Our AI identifies key moments, highlights, and engaging segments automatically.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Get Your Clips</h3>
              <p className="text-slate-400">Receive perfectly formatted clips optimized for different social media platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Target className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Smart Scene Detection</h3>
              <p className="text-slate-400 text-sm">AI identifies the most engaging moments and natural break points in your content.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Zap className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Automatic Highlights</h3>
              <p className="text-slate-400 text-sm">Automatically extract key quotes, reactions, and memorable moments.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <BarChart3 className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Platform Optimization</h3>
              <p className="text-slate-400 text-sm">Generate clips in different formats for YouTube Shorts, TikTok, Instagram Reels, and more.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quality Assurance</h3>
              <p className="text-slate-400 text-sm">AI ensures each clip has proper audio levels, clear visuals, and engaging content.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Clock className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Custom Duration</h3>
              <p className="text-slate-400 text-sm">Set specific clip lengths for different platforms - 15s, 30s, 60s, or custom durations.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Star className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Brand Consistency</h3>
              <p className="text-slate-400 text-sm">Maintain your brand colors, fonts, and style across all generated clips.</p>
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
                <Play className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Podcasts</h3>
              <p className="text-slate-400 text-sm">Turn podcast episodes into shareable clips for social media promotion.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Webinars</h3>
              <p className="text-slate-400 text-sm">Extract key insights and actionable tips from educational webinars.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Interviews</h3>
              <p className="text-slate-400 text-sm">Highlight the best quotes and moments from interviews and conversations.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Live Streams</h3>
              <p className="text-slate-400 text-sm">Capture the best moments from live streams and events automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Start creating engaging short clips from your long-form content today. 
            No setup required, results in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
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