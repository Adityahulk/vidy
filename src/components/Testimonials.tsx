import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Chen',
    position: 'CTO, TechCorp',
    company: 'Fortune 500 Technology Company',
    content: 'VideoAI Pro transformed our content workflow. We\'ve reduced video production time by 80% while maintaining broadcast quality. The ROI has been extraordinary.',
    rating: 5
  },
  {
    name: 'Michael Rodriguez',
    position: 'Head of Marketing',
    company: 'Global Media Agency',
    content: 'The AI dubbing feature alone has opened up international markets we never thought possible. The accuracy and natural voice quality is simply incredible.',
    rating: 5
  },
  {
    name: 'Emily Johnson',
    position: 'VP of Operations',
    company: 'Enterprise Training Solutions',
    content: 'The avatar creation tool has revolutionized our training programs. We can now deliver personalized content at scale with consistent quality.',
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto px-4 sm:px-0">
            Join hundreds of enterprises that have transformed their video workflows with our AI platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Quote className="w-8 h-8 text-blue-500 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-slate-700 pt-6">
                <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                <div className="text-blue-400 text-sm">{testimonial.position}</div>
                <div className="text-slate-500 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 mb-8 text-sm sm:text-base">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-40">
            <div className="text-slate-400 font-bold text-sm sm:text-lg">Microsoft</div>
            <div className="text-slate-400 font-bold text-sm sm:text-lg">Amazon</div>
            <div className="text-slate-400 font-bold text-sm sm:text-lg">Netflix</div>
            <div className="text-slate-400 font-bold text-sm sm:text-lg">Adobe</div>
            <div className="text-slate-400 font-bold text-sm sm:text-lg">IBM</div>
          </div>
        </div>
      </div>
    </section>
  );
}