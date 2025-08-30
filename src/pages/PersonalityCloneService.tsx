import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, User, Settings, CheckCircle, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PersonalityCloneService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20">
        {/* Back Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
              <User className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Personality Clone
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Clone your complete personality including face, voice, gestures, and movements to generate unlimited authentic video content from any script
            </p>
          </div>

          {/* Demo Video */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video flex items-center justify-center">
                <button className="flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              How Personality Cloning Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Personality Capture</h3>
                <p className="text-gray-600">
                  Upload reference videos to capture your facial features, voice patterns, speaking style, and natural gestures
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. AI Clone Creation</h3>
                <p className="text-gray-600">
                  Our AI analyzes and creates a comprehensive digital clone of your personality, voice, and mannerisms
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Play className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Generate Content</h3>
                <p className="text-gray-600">
                  Input any script and generate authentic videos featuring your cloned personality speaking naturally
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Complete Personality Replication
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Facial Cloning</h3>
                <p className="text-gray-600">Perfect facial replication with natural expressions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Play className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Synthesis</h3>
                <p className="text-gray-600">Authentic voice replication with natural intonation</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
                  <Settings className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Hand Gestures</h3>
                <p className="text-gray-600">Natural hand movements that match speaking patterns</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Body Language</h3>
                <p className="text-gray-600">Complete movement patterns and mannerisms</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Perfect for Content Creation
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Branding</h3>
                <p className="text-gray-600">
                  Scale your personal presence across multiple platforms with authentic video content
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advertisement Campaigns</h3>
                <p className="text-gray-600">
                  Create compelling ads featuring yourself without the need for constant filming
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Marketing</h3>
                <p className="text-gray-600">
                  Generate unlimited marketing videos with your authentic personality and presence
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Pricing Plans
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter Clone</h3>
                <div className="text-3xl font-bold text-gray-900 mb-6">$299<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Basic personality clone</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>10 videos per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>720p resolution</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional Clone</h3>
                <div className="text-3xl font-bold text-gray-900 mb-6">$599<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Advanced personality clone</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>50 videos per month</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>1080p resolution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Custom backgrounds</span>
                  </li>
                </ul>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Get Started
                </button>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise Clone</h3>
                <div className="text-3xl font-bold text-gray-900 mb-6">$1,299<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Premium personality clone</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited videos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>4K resolution</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <button className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16">
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "The personality clone is incredibly authentic. My audience can't tell the difference between my real videos and the AI-generated ones!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                  <div>
                    <h4 className="text-white font-semibold">Sarah Johnson</h4>
                    <p className="text-gray-400">Content Creator</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "This technology has revolutionized our marketing campaigns. We can create personalized content at scale."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-600 rounded-full mr-4"></div>
                  <div>
                    <h4 className="text-white font-semibold">Michael Chen</h4>
                    <p className="text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Clone Your Personality?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start creating unlimited authentic video content today
            </p>
            <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
              Start Your Clone
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}