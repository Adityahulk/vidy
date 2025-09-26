import React from 'react';
import { useEffect } from 'react';
import { ArrowLeft, Play, Wand2, Code, Cog, Settings, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CustomSolutionsService() {
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
              <Wand2 className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">Tailored AI Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Custom{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Tailored AI video solutions designed specifically for your enterprise needs. 
              Custom integrations, white-label options, and bespoke workflow automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Link 
                to="/playground" 
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Try Custom Solutions</span>
                <Wand2 className="w-5 h-5" />
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
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Custom Solutions Demo</h3>
                  <p className="text-slate-400">See how we build tailored AI solutions for enterprises</p>
                </div>
                
                {/* Interactive Solutions Showcase */}
                <div className="relative bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-8 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                    <div className="absolute top-4 left-4 w-32 h-32 border border-blue-500/30 rounded-full"></div>
                    <div className="absolute bottom-4 right-4 w-24 h-24 border border-purple-500/30 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-slate-500/20 rounded-full"></div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="relative z-10">
                    <div className="text-center mb-12">
                      <div className="inline-flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Wand2 className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-white">Enterprise Solutions Architecture</h4>
                      </div>
                      <p className="text-slate-400 max-w-2xl mx-auto">
                        Discover how we integrate AI video capabilities into your existing infrastructure
                      </p>
                    </div>

                    {/* Solution Types Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="group bg-slate-900/50 border border-slate-600/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-4">
                          <Code className="w-8 h-8 text-blue-500" />
                          <h5 className="text-lg font-semibold text-white">API Integration</h5>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">RESTful APIs and SDKs for seamless integration into your existing systems.</p>
                        <div className="flex items-center text-blue-400 text-sm">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          Real-time processing
                        </div>
                      </div>

                      <div className="group bg-slate-900/50 border border-slate-600/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-4">
                          <Settings className="w-8 h-8 text-purple-500" />
                          <h5 className="text-lg font-semibold text-white">Workflow Automation</h5>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">Custom workflows that automate your video processing pipeline end-to-end.</p>
                        <div className="flex items-center text-purple-400 text-sm">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                          Automated triggers
                        </div>
                      </div>

                      <div className="group bg-slate-900/50 border border-slate-600/50 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-4">
                          <Wand2 className="w-8 h-8 text-green-500" />
                          <h5 className="text-lg font-semibold text-white">White-Label Platform</h5>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">Complete platform deployment under your brand with custom UI/UX.</p>
                        <div className="flex items-center text-green-400 text-sm">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                          Your branding
                        </div>
                      </div>

                      <div className="group bg-slate-900/50 border border-slate-600/50 rounded-lg p-6 hover:border-orange-500/50 transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-4">
                          <Cog className="w-8 h-8 text-orange-500" />
                          <h5 className="text-lg font-semibold text-white">Private Cloud</h5>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">Dedicated infrastructure with enterprise-grade security and compliance.</p>
                        <div className="flex items-center text-orange-400 text-sm">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                          Dedicated resources
                        </div>
                      </div>
                    </div>

                    {/* Integration Flow */}
                    <div className="bg-slate-900/30 border border-slate-600/30 rounded-lg p-6">
                      <h5 className="text-lg font-semibold text-white mb-4 text-center">Integration Process</h5>
                      <div className="flex items-center justify-between">
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">1</span>
                          </div>
                          <p className="text-slate-400 text-xs">Analysis</p>
                        </div>
                        <div className="flex-1 h-px bg-slate-600 mx-2"></div>
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">2</span>
                          </div>
                          <p className="text-slate-400 text-xs">Development</p>
                        </div>
                        <div className="flex-1 h-px bg-slate-600 mx-2"></div>
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">3</span>
                          </div>
                          <p className="text-slate-400 text-xs">Deployment</p>
                        </div>
                        <div className="flex-1 h-px bg-slate-600 mx-2"></div>
                        <div className="text-center flex-1">
                          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                            <span className="text-white font-bold text-sm">4</span>
                          </div>
                          <p className="text-slate-400 text-xs">Support</p>
                        </div>
                      </div>
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
              Our Process
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              From consultation to deployment, we work closely with your team to deliver the perfect solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Discovery & Analysis</h3>
              <p className="text-slate-400">Deep dive into your requirements, existing workflows, and technical infrastructure.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Custom Development</h3>
              <p className="text-slate-400">Build tailored solutions using our AI platform and your specific requirements.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Deploy & Support</h3>
              <p className="text-slate-400">Seamless deployment with ongoing support and optimization for your team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              What We Offer
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Code className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Custom Integrations</h3>
              <p className="text-slate-400 text-sm">Seamlessly integrate our AI capabilities into your existing systems and workflows.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Wand2 className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">White-Label Solutions</h3>
              <p className="text-slate-400 text-sm">Deploy our technology under your brand with complete customization options.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Cog className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">API Development</h3>
              <p className="text-slate-400 text-sm">Custom APIs designed for your specific use cases and technical requirements.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Settings className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Workflow Automation</h3>
              <p className="text-slate-400 text-sm">Automate complex video processing workflows tailored to your business processes.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <CheckCircle className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Dedicated Support</h3>
              <p className="text-slate-400 text-sm">24/7 dedicated support team with guaranteed response times and SLAs.</p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
              <Star className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Training & Onboarding</h3>
              <p className="text-slate-400 text-sm">Comprehensive training programs for your team and stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Success Stories by Industry
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Real implementations delivering measurable results across diverse industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Media & Entertainment</h3>
              <p className="text-slate-400 text-sm mb-3">Streaming platforms processing 10,000+ hours monthly with automated dubbing and content localization.</p>
              <div className="text-xs text-blue-400 font-medium">85% cost reduction</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Enterprise Training</h3>
              <p className="text-slate-400 text-sm mb-3">Fortune 500 companies using AI avatars for consistent global training delivery across 50+ countries.</p>
              <div className="text-xs text-purple-400 font-medium">90% faster deployment</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wand2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Marketing Agencies</h3>
              <p className="text-slate-400 text-sm mb-3">Top agencies using white-label solutions to deliver personalized video campaigns for 500+ clients simultaneously.</p>
              <div className="text-xs text-green-400 font-medium">300% client capacity increase</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cog className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">SaaS Platforms</h3>
              <p className="text-slate-400 text-sm mb-3">Leading CRM platforms integrating AI video generation for personalized customer communications at scale.</p>
              <div className="text-xs text-orange-400 font-medium">60% higher engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Proven ROI
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Our custom solutions deliver measurable business impact from day one
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">85%</div>
              <div className="text-blue-400 font-semibold mb-2">Cost Reduction</div>
              <div className="text-slate-400 text-sm">Average savings on video production costs across all enterprise clients</div>
            </div>

            <div className="text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">10x</div>
              <div className="text-purple-400 font-semibold mb-2">Faster Delivery</div>
              <div className="text-slate-400 text-sm">Speed improvement in content creation and deployment timelines</div>
            </div>

            <div className="text-center bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="text-4xl font-bold text-white mb-2">99.9%</div>
              <div className="text-green-400 font-semibold mb-2">Uptime SLA</div>
              <div className="text-slate-400 text-sm">Enterprise-grade reliability with guaranteed service level agreements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-y border-blue-500/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Custom?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Let's discuss your unique requirements and create a solution that perfectly fits your needs. 
            Enterprise-grade, scalable, and fully customizable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
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