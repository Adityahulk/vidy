import React from 'react';
import { Shield, Zap, Globe, BarChart3, Lock, Headphones } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption and advanced data protection.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process videos 10x faster than traditional methods with our optimized AI infrastructure.'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Deploy across multiple regions with 99.9% uptime and edge computing capabilities.'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed insights and performance metrics to optimize your video content strategy.'
  },
  {
    icon: Lock,
    title: 'Private Cloud',
    description: 'Dedicated infrastructure options for maximum security and customization.'
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated enterprise support team with guaranteed response times.'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Built for Enterprise
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-4 sm:px-0">
            Every feature designed with enterprise requirements in mind—security, 
            scalability, and reliability at the core.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group text-center p-6 sm:p-8 rounded-xl hover:bg-slate-800/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="mt-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-8">Powered by Advanced AI</h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
            <div className="text-slate-400 font-semibold text-sm sm:text-base">TensorFlow</div>
            <div className="text-slate-400 font-semibold text-sm sm:text-base">PyTorch</div>
            <div className="text-slate-400 font-semibold text-sm sm:text-base">OpenCV</div>
            <div className="text-slate-400 font-semibold text-sm sm:text-base">CUDA</div>
            <div className="text-slate-400 font-semibold text-sm sm:text-base">Kubernetes</div>
            <div className="text-slate-400 font-semibold text-sm sm:text-base">AWS</div>
          </div>
        </div>
      </div>
    </section>
  );
}