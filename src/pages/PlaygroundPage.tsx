import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Play, User, Film, Volume2, Wand2, CheckCircle, AlertCircle, Loader, Globe, Mic, Zap, Brain, Code, Settings, Activity, Cpu, Database, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

type ServiceType = 'personality-clone' | 'lip-sync' | 'dubbing' | 'custom';

interface UploadState {
  video: File | null;
  audio: File | null;
  script: string;
  language: string;
  enableLipSync: boolean;
  isProcessing: boolean;
  progress: number;
  result: string | null;
  error: string | null;
  processingStage: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' }
];

const services = [
  {
    id: 'personality-clone' as ServiceType,
    title: 'Personality Clone',
    icon: User,
    description: 'Clone your complete personality with face, voice, and gestures',
    color: 'blue',
    gradient: 'from-blue-500 to-purple-600',
    bgGlow: 'from-blue-500/20 to-purple-500/20'
  },
  {
    id: 'lip-sync' as ServiceType,
    title: 'AI Lip-Syncing',
    icon: Film,
    description: 'Perfect lip-sync alignment for any audio-video combination',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    bgGlow: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'dubbing' as ServiceType,
    title: 'AI Video Dubbing',
    icon: Volume2,
    description: 'Professional dubbing in 50+ languages with voice cloning',
    color: 'green',
    gradient: 'from-green-500 to-blue-600',
    bgGlow: 'from-green-500/20 to-blue-500/20'
  }
];

const processingStages = {
  'personality-clone': [
    'Analyzing facial features...',
    'Extracting voice patterns...',
    'Training personality model...',
    'Generating synthetic video...',
    'Finalizing output...'
  ],
  'lip-sync': [
    'Processing video frames...',
    'Analyzing audio phonemes...',
    'Mapping lip movements...',
    'Synchronizing audio-visual...',
    'Rendering final video...'
  ],
  'dubbing': [
    'Extracting original audio...',
    'Cloning voice patterns...',
    'Translating content...',
    'Generating dubbed audio...',
    'Syncing with video...'
  ]
};

export default function PlaygroundPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>('personality-clone');
  const [uploadState, setUploadState] = useState<UploadState>({
    video: null,
    audio: null,
    script: '',
    language: 'en',
    enableLipSync: true,
    isProcessing: false,
    progress: 0,
    result: null,
    error: null,
    processingStage: ''
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const currentService = services.find(s => s.id === selectedService)!;
  const IconComponent = currentService.icon;

  // Animated background particles
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setParticles(newParticles);
  }, []);

  const handleFileUpload = (type: 'video' | 'audio', file: File) => {
    setUploadState(prev => ({
      ...prev,
      [type]: file,
      error: null
    }));
  };

  const resetForm = () => {
    setUploadState({
      video: null,
      audio: null,
      script: '',
      language: 'en',
      enableLipSync: true,
      isProcessing: false,
      progress: 0,
      result: null,
      error: null,
      processingStage: ''
    });
  };

  const handleServiceChange = (serviceId: ServiceType) => {
    setSelectedService(serviceId);
    resetForm();
  };

  const handleProcess = async () => {
    const stages = processingStages[selectedService];
    setUploadState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null,
      processingStage: stages[0]
    }));

    // Simulate processing with stages
    for (let i = 0; i < stages.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setUploadState(prev => ({
        ...prev,
        progress: ((i + 1) / stages.length) * 100,
        processingStage: i < stages.length - 1 ? stages[i + 1] : stages[i]
      }));
    }

    // Complete processing
    setTimeout(() => {
      setUploadState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        result: `Your ${currentService.title.toLowerCase()} has been processed successfully! Check your email for the download link.`,
        processingStage: 'Processing complete!'
      }));
    }, 500);
  };

  const canProcess = () => {
    switch (selectedService) {
      case 'personality-clone':
        return uploadState.video && uploadState.script.trim();
      case 'lip-sync':
        return uploadState.video && uploadState.audio;
      case 'dubbing':
        return uploadState.video && uploadState.language;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      <Header />
      
      {/* Advanced Background with Animated Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`
            }}
          ></div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Circuit Pattern */}
        <div className="absolute top-20 right-20 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" fill="none" strokeWidth="1"/>
            <circle cx="20" cy="20" r="3" fill="currentColor"/>
            <circle cx="80" cy="20" r="3" fill="currentColor"/>
            <circle cx="80" cy="80" r="3" fill="currentColor"/>
            <circle cx="20" cy="80" r="3" fill="currentColor"/>
            <path d="M50,20 L50,80" stroke="currentColor" strokeWidth="1"/>
            <path d="M20,50 L80,50" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
        <div className="relative container mx-auto px-6">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <div className="max-w-6xl mx-auto text-center">
            {/* Tech Badge */}
            <div className="inline-flex items-center space-x-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-6 py-3 mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
              <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-slate-300 font-medium">AI Neural Processing Lab</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI Video{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Playground
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Advanced neural networks at your fingertips. Choose your AI service and transform videos with 
              cutting-edge machine learning algorithms.
            </p>

            {/* Tech Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-bold text-lg">99.9%</span>
                </div>
                <p className="text-slate-400 text-xs">Processing Accuracy</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-400 font-bold text-lg">10x</span>
                </div>
                <p className="text-slate-400 text-xs">Faster Processing</p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Database className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-bold text-lg">50+</span>
                </div>
                <p className="text-slate-400 text-xs">AI Models</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Status Dashboard - Fills the void */}
        <div className="container mx-auto px-6 pb-4">
          <div className="max-w-6xl mx-auto">
            {/* Live AI System Status */}
            <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 mb-4 relative overflow-hidden">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(147, 51, 234, 0.1) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(147, 51, 234, 0.1) 75%)
                  `,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                }}></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">AI System Status</h3>
                      <p className="text-slate-400 text-sm">Real-time neural network monitoring</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500/20 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">All Systems Operational</span>
                  </div>
                </div>

                {/* System Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/30 rounded-lg p-4 text-center border border-slate-700/50">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
                      <span className="text-blue-400 font-bold text-lg">98.7%</span>
                    </div>
                    <p className="text-slate-400 text-xs">GPU Efficiency</p>
                  </div>
                  <div className="bg-slate-900/30 rounded-lg p-4 text-center border border-slate-700/50">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                      <span className="text-purple-400 font-bold text-lg">47</span>
                    </div>
                    <p className="text-slate-400 text-xs">Active Models</p>
                  </div>
                  <div className="bg-slate-900/30 rounded-lg p-4 text-center border border-slate-700/50">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-green-400 animate-pulse" />
                      <span className="text-green-400 font-bold text-lg">2.3s</span>
                    </div>
                    <p className="text-slate-400 text-xs">Avg Response</p>
                  </div>
                  <div className="bg-slate-900/30 rounded-lg p-4 text-center border border-slate-700/50">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Database className="w-4 h-4 text-orange-400 animate-pulse" />
                      <span className="text-orange-400 font-bold text-lg">12.4GB</span>
                    </div>
                    <p className="text-slate-400 text-xs">Memory Pool</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 text-sm">Neural Networks: Online</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                    <span className="text-slate-300 text-sm">Processing Queue: Ready</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                    <span className="text-slate-300 text-sm">Cloud Sync: Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Playground Interface */}
      <section className="py-4 sm:py-6 lg:py-8 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* AI Service Neural Network Selector */}
            <div className="mb-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                  <Brain className="w-8 h-8 text-blue-400 animate-pulse" />
                  <span>Neural Network Selection</span>
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">Choose your AI processing pipeline and configure parameters for optimal results</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service.id)}
                    className={`group relative p-6 lg:p-8 rounded-xl border-2 transition-all duration-500 text-left overflow-hidden ${
                    className={`group relative p-6 sm:p-6 lg:p-5 xl:p-6 rounded-xl border-2 transition-all duration-500 text-left overflow-hidden ${
                      selectedService === service.id
                        ? `border-${service.color}-500 bg-gradient-to-br ${service.bgGlow} shadow-2xl scale-105`
                        : 'border-slate-700 bg-slate-800/30 hover:border-slate-600 hover:scale-102'
                    }`}
                  >
                    {/* Animated Background */}
                    {selectedService === service.id && (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 animate-pulse"></div>
                    )}
                    
                    {/* Neural Network Pattern */}
                    <div className="absolute top-2 right-2 opacity-20">
                      <div className="w-8 h-8 grid grid-cols-3 gap-1">
                        {Array.from({length: 9}).map((_, i) => (
                          <div key={i} className={`w-1 h-1 bg-${service.color}-400 rounded-full animate-pulse`} style={{animationDelay: `${i * 100}ms`}}></div>
                        ))}
                      </div>
                    </div>

                    <div className={`relative z-10 w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 text-sm lg:text-base mb-4 leading-relaxed">{service.description}</p>
                    <h3 className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm lg:text-xs xl:text-sm mb-4 leading-relaxed">{service.description}</p>
                    
                    {/* Status Indicator */}
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${selectedService === service.id ? `bg-${service.color}-400 animate-pulse` : 'bg-slate-600'}`}></div>
                      <span className="text-xs text-slate-500">
                        {selectedService === service.id ? 'Active' : 'Ready'}
                      </span>
                    </div>

                    {selectedService === service.id && (
                      <div className="absolute top-3 right-3">
                        <div className={`w-6 h-6 bg-${service.color}-500 rounded-full flex items-center justify-center animate-pulse`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Processing Interface */}
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
              {/* Tech Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${currentService.gradient} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                      <span>{currentService.title}</span>
                      <Code className="w-5 h-5 text-blue-400" />
                    </h3>
                    <p className="text-slate-400 text-sm">Neural processing pipeline configured</p>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 bg-slate-900/50 rounded-lg px-3 py-2">
                    <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-medium">System Online</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Video Upload - Required for all services */}
                <div>
                  <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                    <Film className="w-4 h-4" />
                    <span>Primary Video Input</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                      uploadState.video 
                        ? `border-${currentService.color}-500 bg-gradient-to-br ${currentService.bgGlow}`
                        : `border-slate-600 hover:border-${currentService.color}-500 hover:bg-slate-800/50`
                    }`}
                  >
                    {/* Tech Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    <div className="relative z-10">
                      <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      {uploadState.video ? (
                        <div className="space-y-2">
                          <p className="text-white font-medium flex items-center justify-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span>{uploadState.video.name}</span>
                          </p>
                          <p className="text-slate-400 text-sm">{(uploadState.video.size / 1024 / 1024).toFixed(2)} MB • Ready for processing</p>
                          <div className="flex items-center justify-center space-x-2 text-xs text-green-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>File validated</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <p className="text-white mb-2 font-medium">Upload Video File</p>
                          <p className="text-slate-400 text-sm">MP4, MOV, AVI • Max 500MB • HD Quality Recommended</p>
                          <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 mt-4">
                            <span>• Neural analysis ready</span>
                            <span>• GPU acceleration enabled</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('video', e.target.files[0])}
                    className="hidden"
                  />
                </div>

                {/* Service-specific inputs */}
                {selectedService === 'personality-clone' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                        <Brain className="w-4 h-4" />
                        <span>Neural Script Input</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          value={uploadState.script}
                          onChange={(e) => setUploadState(prev => ({ ...prev, script: e.target.value }))}
                          rows={6}
                          className="w-full px-6 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none font-mono text-sm"
                          placeholder="Enter the script for your AI personality clone to speak...

Example:
Hello, I'm excited to demonstrate this AI technology. This clone will replicate my voice, facial expressions, and natural gestures to deliver any message authentically."
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                          {uploadState.script.length}/2000 characters
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm mt-2 flex items-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>AI will analyze speech patterns and generate natural delivery</span>
                      </p>
                    </div>
                  </div>
                )}

                {selectedService === 'lip-sync' && (
                  <div>
                    <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                      <Volume2 className="w-4 h-4" />
                      <span>Audio Synchronization Input</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <div 
                      onClick={() => audioInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                        uploadState.audio 
                          ? 'border-purple-500 bg-gradient-to-br from-purple-500/10 to-pink-500/10'
                          : 'border-slate-600 hover:border-purple-500 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="relative z-10">
                        <Volume2 className="w-16 h-16 text-slate-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                        {uploadState.audio ? (
                          <div className="space-y-2">
                            <p className="text-white font-medium flex items-center justify-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span>{uploadState.audio.name}</span>
                            </p>
                            <p className="text-slate-400 text-sm">{(uploadState.audio.size / 1024 / 1024).toFixed(2)} MB • Audio analyzed</p>
                            <div className="flex items-center justify-center space-x-2 text-xs text-purple-400">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                              <span>Phoneme mapping ready</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-white mb-2 font-medium">Upload Audio File</p>
                            <p className="text-slate-400 text-sm">MP3, WAV, AAC • Max 100MB • High Quality Audio</p>
                            <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 mt-4">
                              <span>• Phoneme detection active</span>
                              <span>• Lip-sync algorithms loaded</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      ref={audioInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload('audio', e.target.files[0])}
                      className="hidden"
                    />
                  </div>
                )}

                {selectedService === 'dubbing' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                        <Globe className="w-4 h-4" />
                        <span>Target Language Configuration</span>
                        <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={uploadState.language}
                        onChange={(e) => setUploadState(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-6 py-4 bg-slate-900/50 border border-slate-600 rounded-xl text-white focus:border-green-500 focus:outline-none transition-colors"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code} className="bg-slate-800">
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="bg-slate-900/30 rounded-xl p-6 border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            id="lipSync"
                            checked={uploadState.enableLipSync}
                            onChange={(e) => setUploadState(prev => ({ ...prev, enableLipSync: e.target.checked }))}
                            className="w-5 h-5 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                          />
                          <label htmlFor="lipSync" className="text-slate-300 font-medium flex items-center space-x-2">
                            <Mic className="w-4 h-4" />
                            <span>Advanced Lip-Sync Adjustment</span>
                          </label>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          uploadState.enableLipSync ? 'bg-green-500/20 text-green-400' : 'bg-slate-600/20 text-slate-400'
                        }`}>
                          {uploadState.enableLipSync ? 'Enabled' : 'Disabled'}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm mt-2 ml-8">
                        Neural facial tracking for perfect audio-visual synchronization
                      </p>
                    </div>
                  </div>
                )}


                {/* Advanced Process Button */}
                <div className="pt-8">
                  <button
                    onClick={handleProcess}
                    disabled={!canProcess() || uploadState.isProcessing}
                    className={`w-full px-8 py-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 text-lg relative overflow-hidden ${
                      canProcess() && !uploadState.isProcessing
                        ? `bg-gradient-to-r ${currentService.gradient} text-white hover:scale-105 transform shadow-2xl`
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {uploadState.isProcessing ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        <span>Neural Processing Active...</span>
                        <div className="absolute right-4 text-sm opacity-75">
                          {uploadState.progress.toFixed(0)}%
                        </div>
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6" />
                        <span>Initialize {currentService.title}</span>
                        <Code className="w-5 h-5 opacity-75" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Progress Interface */}
            {uploadState.isProcessing && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8 relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${currentService.gradient} rounded-xl flex items-center justify-center`}>
                        <Loader className="w-6 h-6 text-white animate-spin" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Neural Processing Active</h4>
                        <p className="text-slate-400">{uploadState.processingStage}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">{uploadState.progress.toFixed(0)}%</div>
                      <div className="text-slate-400 text-sm">Processing</div>
                    </div>
                  </div>
                  
                  {/* Advanced Progress Bar */}
                  <div className="relative">
                    <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`bg-gradient-to-r ${currentService.gradient} h-3 rounded-full transition-all duration-500 relative`}
                        style={{ width: `${uploadState.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Processing Stages */}
                    <div className="flex justify-between mt-4 text-xs">
                      {processingStages[selectedService].map((stage, index) => (
                        <div key={index} className={`flex items-center space-x-1 ${
                          index <= (uploadState.progress / 100) * processingStages[selectedService].length - 1
                            ? `text-${currentService.color}-400` 
                            : 'text-slate-500'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            index <= (uploadState.progress / 100) * processingStages[selectedService].length - 1
                              ? `bg-${currentService.color}-400` 
                              : 'bg-slate-600'
                          }`}></div>
                          <span className="hidden sm:inline">{stage.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <Activity className="w-5 h-5 text-blue-400 mx-auto mb-1 animate-pulse" />
                      <p className="text-xs text-slate-400">GPU Utilization</p>
                      <p className="text-sm font-bold text-white">87%</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <Cpu className="w-5 h-5 text-purple-400 mx-auto mb-1 animate-pulse" />
                      <p className="text-xs text-slate-400">Neural Layers</p>
                      <p className="text-sm font-bold text-white">24/32</p>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3">
                      <Database className="w-5 h-5 text-green-400 mx-auto mb-1 animate-pulse" />
                      <p className="text-xs text-slate-400">Memory Usage</p>
                      <p className="text-sm font-bold text-white">2.1GB</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Result */}
            {uploadState.result && (
              <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 animate-pulse"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-green-400 mb-1">Processing Complete!</h4>
                      <p className="text-slate-300">Neural processing finished successfully</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/30 rounded-xl p-6 mb-6">
                    <p className="text-slate-300 leading-relaxed">{uploadState.result}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={resetForm}
                      className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Process Another Video</span>
                    </button>
                    <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Download Result</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Error State */}
            {uploadState.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-400 font-medium">Processing Error</span>
                </div>
                <p className="text-slate-300">{uploadState.error}</p>
              </div>
            )}

            {/* Service Features Tech Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {selectedService === 'personality-clone' && (
                <>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <User className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Facial Neural Mapping</p>
                    <p className="text-slate-400 text-xs mb-3">Advanced facial recognition and replication</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">Active</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <Mic className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Voice Synthesis Engine</p>
                    <p className="text-slate-400 text-xs mb-3">Neural voice cloning and generation</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      <span className="text-xs text-purple-400">Ready</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-green-500/50 transition-colors">
                    <Brain className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Gesture Intelligence</p>
                    <p className="text-slate-400 text-xs mb-3">Natural movement pattern analysis</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                      <span className="text-xs text-green-400">Learning</span>
                    </div>
                  </div>
                </>
              )}

              {selectedService === 'lip-sync' && (
                <>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <Film className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Real-Time Sync Engine</p>
                    <p className="text-slate-400 text-xs mb-3">Instant phoneme-to-viseme mapping</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">Processing</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <Target className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Precision Tracking</p>
                    <p className="text-slate-400 text-xs mb-3">Sub-pixel facial landmark detection</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      <span className="text-xs text-purple-400">Calibrated</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-green-500/50 transition-colors">
                    <Globe className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Multi-Language Core</p>
                    <p className="text-slate-400 text-xs mb-3">Global phonetic compatibility</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                      <span className="text-xs text-green-400">Loaded</span>
                    </div>
                  </div>
                </>
              )}

              {selectedService === 'dubbing' && (
                <>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <Volume2 className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Voice Cloning Matrix</p>
                    <p className="text-slate-400 text-xs mb-3">Perfect voice pattern replication</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">Analyzing</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <Globe className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Global Language AI</p>
                    <p className="text-slate-400 text-xs mb-3">50+ languages with native fluency</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                      <span className="text-xs text-purple-400">Ready</span>
                    </div>
                  </div>
                  <div className="bg-slate-800/30 rounded-xl p-6 text-center border border-slate-700 hover:border-green-500/50 transition-colors">
                    <Mic className="w-8 h-8 text-green-500 mx-auto mb-3" />
                    <p className="text-white text-sm font-medium mb-2">Sync Optimization</p>
                    <p className="text-slate-400 text-xs mb-3">Neural lip-sync synchronization</p>
                    <div className="flex items-center justify-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
                      <span className="text-xs text-green-400">Optimized</span>
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}