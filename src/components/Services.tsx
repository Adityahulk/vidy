import React from 'react';
import { Scissors, User, Volume2, Zap, Film, Wand2 } from 'lucide-react';

const services = [
  {
    icon: Scissors,
    title: 'Long-Form to Short Clips',
    description: 'AI-powered content extraction that identifies the most engaging moments from long videos and creates perfect short clips for social media.',
    features: ['Smart scene detection', 'Automatic highlights', 'Multi-platform optimization']
  },
  {
    icon: User,
    title: 'AI Avatar Creation',
    description: 'Generate lifelike avatars with natural hand gestures and expressions, perfect for corporate training and presentations.',
    features: ['Realistic hand gestures', 'Custom avatar design', 'Multi-language support']
  },
  {
    icon: Volume2,
    title: 'AI Video Dubbing',
    description: 'Professional-grade voice cloning and dubbing in 50+ languages while maintaining perfect lip-sync accuracy.',
    features: ['Voice cloning', 'Lip-sync accuracy', '50+ languages']
  },
  {
    icon: Film,
    title: 'AI Lip-Syncing',
    description: 'Perfect lip-sync alignment for dubbed content and avatar videos using advanced facial recognition and motion tracking.',
    features: ['Real-time sync', 'Multi-language support', 'Facial expression matching']
  },
  {
    icon: Zap,
    title: 'Automated Editing',
    description: 'Intelligent video editing that understands context, pacing, and narrative flow for seamless content creation.',
    features: ['Smart transitions', 'Auto-pacing', 'Template generation']
  },
  {
    icon: Wand2,
    title: 'Custom Solutions',
    description: 'Tailored AI video solutions designed specifically for your enterprise needs and workflow requirements.',
    features: ['Custom integrations', 'API access', 'White-label options']
  }
];

export default function Services() {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8 hover:bg-slate-800/70 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{service.title}</h3>
              </div>
              
              <p className="text-sm sm:text-base text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm sm:text-base text-slate-300">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}