import React, { useEffect } from 'react';
import { ArrowLeft, Play, Globe, Users, Video, BookOpen, Award, CheckCircle, Star, Languages, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const useCases = [
  {
    id: 1,
    title: 'AI-Powered Training Video Generation',
    description: 'Convert PPTs, training modules, and manuals into AI-narrated avatar videos instantly',
    icon: Video,
    benefit: 'Save time in trainer recording; ensure consistency across countries',
    solution: 'Avatar-based Video Creation',
    link: '/services/avatar-videos',
    color: 'from-blue-500 to-purple-600',
    examples: [
      'Convert existing PPTs to engaging video lessons',
      'Create quick multilingual versions (13+ languages)',
      'Maintain consistency across 410+ cities'
    ]
  },
  {
    id: 2,
    title: 'Local Language Dubbing & Lip-Sync',
    description: 'Automatically translate and sync training videos in different languages',
    icon: Languages,
    benefit: 'Scale 350+ local language trainers faster; maintain content quality',
    solution: 'AI Video Dubbing + Lip-Syncing',
    link: '/services/ai-video-dubbing',
    color: 'from-green-500 to-blue-600',
    examples: [
      'Dub existing videos in 13+ languages',
      'Perfect lip-sync for authentic delivery',
      'No need to re-record for each language'
    ]
  },
  {
    id: 3,
    title: 'Personalized Brand Training Videos',
    description: 'Create brand-specific AI videos with different avatars, tone, and visuals',
    icon: Briefcase,
    benefit: 'Rapid onboarding for 60+ partner brands with brand-specific tone',
    solution: 'Avatar Videos + Corporate eLearning',
    link: '/services/corporate-elearning',
    color: 'from-purple-500 to-pink-600',
    examples: [
      'Customize for Taco Bell, Starbucks, Taj Hotels',
      'Same module, different brand identity',
      'Maintain SOPs across all partners'
    ]
  },
  {
    id: 4,
    title: 'Avatar-based Role Play Simulations',
    description: 'Generate AI avatar videos that simulate real-life hospitality scenarios',
    icon: Users,
    benefit: 'Interactive "Learn by doing" without staging mock sessions',
    solution: 'AI Avatar Videos',
    link: '/services/avatar-videos',
    color: 'from-orange-500 to-red-600',
    examples: [
      'Guest check-in simulations',
      'Complaint handling scenarios',
      'Upselling practice modules'
    ]
  },
  {
    id: 5,
    title: 'Internal Communication Videos',
    description: 'AI avatar videos for employee communication and certification announcements',
    icon: Award,
    benefit: 'Keep teams engaged with minimal manual video creation',
    solution: 'Avatar Videos + Corporate Solutions',
    link: '/services/corporate-elearning',
    color: 'from-teal-500 to-cyan-600',
    examples: [
      'Trainer of the month announcements',
      'Certification result videos',
      'Company-wide communications'
    ]
  },
  {
    id: 6,
    title: 'SOP to Explainer Video Automation',
    description: 'Convert training SOPs, checklists, and reports into structured explainer videos',
    icon: BookOpen,
    benefit: 'Reinforces procedural understanding visually',
    solution: 'Avatar Videos + eLearning',
    link: '/services/corporate-elearning',
    color: 'from-indigo-500 to-purple-600',
    examples: [
      'SOP document visualization',
      'Checklist walkthrough videos',
      'Feedback report summaries'
    ]
  }
];

const stats = [
  { label: 'Languages Supported', value: '13+', icon: Globe },
  { label: 'Partner Brands', value: '60+', icon: Briefcase },
  { label: 'Cities Covered', value: '410+', icon: TrendingUp },
  { label: 'Training Modules', value: '1000+', icon: BookOpen }
];

export default function HospitalityTrainingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
              <Award className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300 text-sm">Hospitality Training Industry Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI Video Solutions for{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                HTI
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Scale your hospitality training across 13+ languages, 60+ brands, and 410+ cities
              with AI-powered video solutions — without needing to record manually every time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 sm:px-0">
              <Link
                to="/playground"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <span>Try Solutions</span>
                <Play className="w-5 h-5" />
              </Link>
              <button
                onClick={() => window.open('https://calendly.com/aditya-vidsimplify/demo-call', '_blank')}
                className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-slate-800/70 transition-all duration-300 flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <Award className="w-5 h-5" />
                <span>Book Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center">
                  <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Tailored AI Video Use Cases for HTI
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              From multilingual training to brand-specific content — discover how AI video
              solutions can transform your hospitality training operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {useCases.map((useCase) => (
              <div key={useCase.id} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <useCase.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                    <p className="text-slate-400 text-sm">{useCase.description}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-green-400 font-medium text-sm mb-1">Key Benefit</p>
                        <p className="text-green-300 text-sm">{useCase.benefit}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-300 font-medium text-sm">Examples:</p>
                    {useCase.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Star className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-slate-400 text-sm">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-xs mb-1">Solution</p>
                      <p className="text-blue-400 font-medium text-sm">{useCase.solution}</p>
                    </div>
                    <Link
                      to={useCase.link}
                      className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all group-hover:scale-105"
                    >
                      <span>Learn More</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why HTI Should Choose Our AI Video Solutions
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Since HTI already leads in hospitality training and operates in 13+ languages across 60+ brands,
                our AI tools help you scale training videos effortlessly — in multiple languages, formats,
                and with consistent quality — without needing to record manually every time.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-blue-400 mb-2">10x</div>
                  <p className="text-slate-300 text-sm">Faster Video Production</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-purple-400 mb-2">80%</div>
                  <p className="text-slate-300 text-sm">Cost Reduction</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-6">
                  <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                  <p className="text-slate-300 text-sm">Consistency Across Brands</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://calendly.com/aditya-vidsimplify/demo-call', '_blank')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Award className="w-5 h-5" />
                  <span>Schedule a Demo Call</span>
                </button>
                <Link
                  to="/playground"
                  className="bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>Try Solutions Now</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Our Solutions for HTI
            </h2>
            <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive AI video tools designed specifically for hospitality training needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Link
              to="/services/avatar-videos"
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group text-center"
            >
              <Video className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">AI Avatar Videos</h3>
              <p className="text-slate-400 text-sm mb-4">Create professional training videos with realistic AI avatars</p>
              <span className="text-blue-400 text-sm font-medium">Learn More →</span>
            </Link>

            <Link
              to="/services/ai-lip-syncing"
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group text-center"
            >
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">AI Lip-Syncing</h3>
              <p className="text-slate-400 text-sm mb-4">Perfect lip-sync alignment for any audio-video combination</p>
              <span className="text-purple-400 text-sm font-medium">Learn More →</span>
            </Link>

            <Link
              to="/services/ai-video-dubbing"
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 group text-center"
            >
              <Languages className="w-12 h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">AI Video Dubbing</h3>
              <p className="text-slate-400 text-sm mb-4">Professional dubbing in 50+ languages with voice cloning</p>
              <span className="text-green-400 text-sm font-medium">Learn More →</span>
            </Link>

            <Link
              to="/services/corporate-elearning"
              className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 group text-center"
            >
              <BookOpen className="w-12 h-12 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-white mb-2">Corporate eLearning</h3>
              <p className="text-slate-400 text-sm mb-4">Comprehensive training solutions for enterprise needs</p>
              <span className="text-orange-400 text-sm font-medium">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
