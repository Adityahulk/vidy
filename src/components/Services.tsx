import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Scissors, User, Volume2, Zap, Film, Wand2, Building, ArrowRight, Users } from 'lucide-react';

const services = [
  {
    icon: User,
    title: 'Personality Clone',
    description: 'Clone your complete personality including face, voice, gestures, and natural movements. Generate unlimited personalized content from any script while maintaining your authentic presence.',
    features: ['Complete personality cloning', 'Voice & gesture replication', 'Unlimited content generation']
  },
  {
    icon: Film,
    title: 'AI Lip-Syncing',
    description: 'Perfect lip-sync alignment for dubbed content and avatar videos using advanced facial recognition and motion tracking.',
    features: ['Real-time sync', 'Multi-language support', 'Facial expression matching']
  },
  {
    icon: Volume2,
    title: 'AI Video Dubbing',
    description: 'Professional-grade voice cloning and dubbing in 50+ languages while maintaining perfect lip-sync accuracy.',
    features: ['Voice cloning', 'Lip-sync accuracy', '50+ languages']
  },
  {
    icon: Wand2,
    title: 'Custom Solutions',
    description: 'Tailored AI video solutions designed specifically for your enterprise needs and workflow requirements.',
    features: ['Custom integrations', 'API access', 'White-label options']
  },
  {
    icon: Users,
    title: 'AI Avatar Videos',
    description: 'Create professional videos with AI avatars. Choose from diverse avatars or create custom ones for any purpose.',
    features: ['Diverse avatar library', 'Custom avatars', 'Multi-language support']
  }
];

export default function Services() {
  const navigate = useNavigate();

  const handleServiceClick = (path: string) => {
    navigate(path);
  };

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            AI-Powered Video Solutions
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-4 sm:px-0">
            Transform your video content with our comprehensive suite of AI-driven tools, 
            designed specifically for enterprise-scale operations.
          </p>
        </div>

        {/* UPDATED LINE BELOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(
                index === 0 ? "/services/personality-clone" :
                index === 1 ? "/services/ai-lip-syncing" :
                index === 2 ? "/services/ai-video-dubbing" :
                index === 3 ? "/services/custom-solutions" :
                index === 4 ? "/services/avatar-videos" : "#"
              )}
              className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 lg:p-5 xl:p-6 hover:bg-slate-800/70 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer active:scale-95"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              <div className="flex flex-col items-start mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white">{service.title}</h3>
              </div>
              
              <p className="text-xs sm:text-sm lg:text-xs xl:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-1 sm:space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-xs sm:text-sm lg:text-xs xl:text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mr-2 sm:mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Bottom call-to-action */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-600/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-slate-400">Learn more</span>
                  <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                    <span className="text-xs sm:text-sm font-medium mr-1">Explore</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}