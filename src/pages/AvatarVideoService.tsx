import React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Play, User, Palette, Video, Zap, CheckCircle, Star, Users, Globe, Briefcase, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InteractiveAvatarPlayer from '../components/InteractiveAvatarPlayer';

export default function AvatarVideoService() {
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
              <User className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">AI Avatar Video Creation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Avatar
              </span>{' '}
              Videos
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Create professional videos with AI avatars. Choose from diverse avatars or create custom ones. 
              Perfect for presentations, training, marketing, and social media content.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Link 
                to="/playground" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Create Avatar Video</span>
                <User className="w-5 h-5" />
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">AI Avatar Demo</h3>
                  <p className="text-slate-400">Select an avatar, enter your script, and watch AI create professional videos</p>
                </div>
                <InteractiveAvatarPlayer />
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
              Create professional avatar videos in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Choose Your Avatar</h3>
              <p className="text-slate-400">Select from our diverse library of professional avatars or create a custom avatar that matches your brand.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Input Your Script</h3>
              <p className="text-slate-400">Type or paste your script. Our AI will analyze the content and generate natural speech patterns and gestures.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Generate & Download</h3>
              <p className="text-slate-400">AI creates your professional video with natural movements, expressions, and perfect lip-sync in minutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Avatar Types */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Diverse Avatar Library
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Choose from hundreds of professional avatars representing different ethnicities, ages, and styles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Business Professional</h3>
              <p className="text-slate-400 text-sm">Corporate presenters, executives, and business professionals for formal content.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Educators & Trainers</h3>
              <p className="text-slate-400 text-sm">Friendly instructors and educators perfect for training and educational content.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Diverse Representation</h3>
              <p className="text-slate-400 text-sm">Avatars representing different ethnicities, ages, and backgrounds for inclusive content.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Custom Avatars</h3>
              <p className="text-slate-400 text-sm">Create personalized avatars that match your brand identity and specific requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Advanced Features
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <User className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Realistic Expressions</h3>
              <p className="text-slate-400 text-sm">Natural facial expressions and micro-movements that match the content and tone.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Video className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Perfect Lip-Sync</h3>
              <p className="text-slate-400 text-sm">Precise lip synchronization with natural speech patterns and timing.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Palette className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Customizable Appearance</h3>
              <p className="text-slate-400 text-sm">Adjust clothing, backgrounds, and styling to match your brand requirements.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Globe className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Language Support</h3>
              <p className="text-slate-400 text-sm">Generate videos in 50+ languages with native pronunciation and accents.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Zap className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Fast Generation</h3>
              <p className="text-slate-400 text-sm">Create professional videos in minutes, not hours or days.</p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">HD Quality Output</h3>
              <p className="text-slate-400 text-sm">Professional-grade video quality suitable for any platform or presentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Perfect For Every Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <Briefcase className="w-12 h-12 text-blue-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Corporate Communications</h3>
              <p className="text-slate-400 mb-6">Create professional presentations, company announcements, and internal communications with consistent branding.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Executive presentations
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Company announcements
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Internal communications
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-green-500/50 transition-all duration-300">
              <GraduationCap className="w-12 h-12 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Training & Education</h3>
              <p className="text-slate-400 mb-6">Develop engaging educational content and training materials with consistent instructor presence.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Online courses
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Employee training
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Product tutorials
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-orange-500/50 transition-all duration-300">
              <Video className="w-12 h-12 text-orange-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Marketing & Sales</h3>
              <p className="text-slate-400 mb-6">Scale your marketing efforts with personalized video content and sales presentations.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Product demonstrations
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Sales pitches
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Social media content
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300">
              <Users className="w-12 h-12 text-purple-500 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Customer Support</h3>
              <p className="text-slate-400 mb-6">Provide consistent customer support with helpful avatar-based tutorials and FAQs.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  How-to guides
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  FAQ videos
                </li>
                <li className="flex items-center text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                  Onboarding tutorials
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose AI Avatars?
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Transform your video content strategy with the power of AI avatars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">90%</div>
              <div className="text-blue-400 font-semibold mb-2">Cost Reduction</div>
              <div className="text-slate-400 text-sm">Compared to traditional video production with actors and studios</div>
            </div>

            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-purple-400 font-semibold mb-2">Availability</div>
              <div className="text-slate-400 text-sm">Create videos anytime without scheduling actors or studios</div>
            </div>

            <div className="text-center bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-green-400 font-semibold mb-2">Consistency</div>
              <div className="text-slate-400 text-sm">Maintain brand consistency across all your video content</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Avatar Videos?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Start creating professional avatar videos today. 
            Choose from hundreds of avatars or create your own custom avatar.
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