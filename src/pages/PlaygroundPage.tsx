import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Play, User, Film, Volume2, Wand2, CheckCircle, AlertCircle, Loader, Globe, Mic, Zap, Brain, Code, Settings, Activity, Cpu, Database, Target, Calendar, CreditCard, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import AuthModal from '../components/AuthModal';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCreditsDialog, setShowCreditsDialog] = useState(false);
  const [showCreditRequest, setShowCreditRequest] = useState(false);
  const [creditRequestData, setCreditRequestData] = useState({
    useCase: '',
    service: '',
    creditsNeeded: ''
  });
  
  const { user } = useAuth();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
    // Check if user is authenticated
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    // Create project in database
    const stages = processingStages[selectedService];
    setUploadState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null,
      processingStage: stages[0]
    }));
    setShowCreditsDialog(false);

    const steps = [
      'Analyzing video content...',
      'Processing facial features...',
      'Generating AI model...',
      'Optimizing quality...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setUploadState(prev => ({
        ...prev,
        processingStage: steps[i],
        progress: ((i + 1) / steps.length) * 100
      }));
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // After processing, set credits to 0 and show credits dialog
    await db.updateUserCredits(user!.id, 0);
    
    setUploadState(prev => ({
      ...prev,
      isProcessing: false,
      processingStage: 'Processing stopped - Insufficient credits',
      progress: 100
    }));
    setShowCreditsDialog(true);

    // Create project in database with failed status
    try {
      await db.createProject({
        project_name: `${currentService.title} - ${new Date().toLocaleDateString()}`,
        service_type: selectedService,
        video_url: uploadState.video ? URL.createObjectURL(uploadState.video) : undefined,
        status: 'failed'
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
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

  const handleCheckDemo = () => {
    // This will redirect to a dynamic URL like /demo/personality-clone
    switch (selectedService) {
      case 'personality-clone':
        navigate(`/services/personality-clone`);
        break;
      case 'lip-sync':
        navigate(`/services/ai-lip-syncing`);
        break;
      case 'dubbing':
        navigate(`/services/ai-video-dubbing`);
        break;
      default:
        navigate(`/services/personality-clone`);
        break;
    }
  };

  const handleBookDemo = () => {
    window.open('https://calendly.com/aditya-vidsimplify/demo-call', '_blank');
  };

  const handleRequestCredits = () => {
    setShowCreditsDialog(false);
    setShowCreditRequest(true);
  };

  const handleSubmitCreditRequest = () => {
    try {
      const { data, error } = await db.createCreditRequest({
        use_case: creditRequestData.useCase,
        service: creditRequestData.service,
        credits_needed: creditRequestData.creditsNeeded,
      });

      if (error) throw error;

      alert('Credit request submitted successfully! Our team will contact you shortly.');
      setShowCreditRequest(false);
      setCreditRequestData({ useCase: '', service: '', creditsNeeded: '' });
    } catch (error) {
      console.error('Error submitting credit request:', error);
      alert('Failed to submit credit request. Please try again.');
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
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service.id)}
                    className={`group relative p-6 rounded-xl border-2 transition-all duration-500 text-left overflow-hidden ${
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
                    
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                    
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
                          className="w-full px-6 py-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                          placeholder="Enter your script here... The AI will generate a video of your personality speaking this text naturally."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedService === 'lip-sync' && (
                  <div>
                    <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                      <Mic className="w-4 h-4" />
                      <span>Audio Input for Lip-Sync</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <div 
                      onClick={() => audioInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer group ${
                        uploadState.audio 
                          ? `border-${currentService.color}-500 bg-gradient-to-br ${currentService.bgGlow}`
                          : `border-slate-600 hover:border-${currentService.color}-500 hover:bg-slate-800/50`
                      }`}
                    >
                      <div className="relative z-10">
                        <Volume2 className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                        {uploadState.audio ? (
                          <div className="space-y-2">
                            <p className="text-white font-medium flex items-center justify-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span>{uploadState.audio.name}</span>
                            </p>
                            <p className="text-slate-400 text-sm">{(uploadState.audio.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-white mb-2">Upload Audio File</p>
                            <p className="text-slate-400 text-sm">MP3, WAV, M4A • Max 100MB</p>
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
                  <div>
                    <label className="block text-slate-300 mb-4 font-medium flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>Target Language</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={uploadState.language}
                      onChange={(e) => setUploadState(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Processing Button */}
                <div className="pt-6 border-t border-slate-700">
                  <button
                    onClick={handleProcess}
                    disabled={!canProcess() || uploadState.isProcessing}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-3 ${
                      canProcess() && !uploadState.isProcessing
                        ? `bg-gradient-to-r ${currentService.gradient} hover:scale-105 shadow-lg`
                        : 'bg-slate-600 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {uploadState.isProcessing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Neural Processing...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        <span>
                          {selectedService === 'personality-clone' ? 'Initialize Video Cloning' :
                           selectedService === 'lip-sync' ? 'Initialize AI Lip-Sync' :
                           selectedService === 'dubbing' ? 'Initialize AI Dubbing' :
                           'Start AI Processing'}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Processing Status */}
                {uploadState.isProcessing && (
                  <div className="relative bg-slate-900/50 rounded-xl p-8 border border-slate-700 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                          <Brain className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">AI Neural Processing Engine</h4>
                          <p className="text-slate-400 text-sm">{uploadState.processingStage}</p>
                        </div>
                      </div>
                      
                      {/* Enhanced Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-300 font-medium">Processing Progress</span>
                          <span className="text-blue-400 font-bold text-lg">{Math.round(uploadState.progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-3 rounded-full bg-gradient-to-r ${currentService.gradient} transition-all duration-500 relative`}
                            style={{ width: `${uploadState.progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* System Status Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-600/50">
                          <div className="text-blue-400 font-bold text-lg mb-1">98.7%</div>
                          <div className="text-slate-400 text-xs">GPU Utilization</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-600/50">
                          <div className="text-purple-400 font-bold text-lg mb-1">2.3GB/s</div>
                          <div className="text-slate-400 text-xs">Network Speed</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-slate-600/50">
                          <div className="text-green-400 font-bold text-lg mb-1">47</div>
                          <div className="text-slate-400 text-xs">Active Models</div>
                        </div>
                      </div>
                      
                      {/* Status Indicators */}
                      <div className="flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-slate-300 text-sm">Neural Networks: Active</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                          <span className="text-slate-300 text-sm">Cloud Sync: Connected</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-slate-800/50 rounded-lg px-3 py-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-200"></div>
                          <span className="text-slate-300 text-sm">Processing Queue: Running</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {uploadState.error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <div>
                        <h4 className="text-red-400 font-semibold">Processing Error</h4>
                        <p className="text-red-300 text-sm">{uploadState.error}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credits Dialog */}
      {showCreditsDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md relative border border-slate-700">
            <button
              onClick={() => setShowCreditsDialog(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Insufficient Credits</h2>
              <p className="text-slate-400">You have 0 credits remaining. Get more credits to continue processing.</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleBookDemo}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Demo Call to Get Free Credits</span>
              </button>
              
              <button
                onClick={handleRequestCredits}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Request Credits</span>
              </button>

              <button
                onClick={handleCheckDemo} // Use the new handler
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" /> {/* Better icon */}
                <span>Check Demo</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credit Request Dialog */}
      {showCreditRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-lg relative border border-slate-700">
            <button
              onClick={() => setShowCreditRequest(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Request Credits</h2>
              <p className="text-slate-400">Tell us about your use case and we'll provide the credits you need.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-slate-300 mb-2 text-sm">Use Case Description</label>
                <textarea
                  value={creditRequestData.useCase}
                  onChange={(e) => setCreditRequestData(prev => ({ ...prev, useCase: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Describe how you plan to use our AI video services..."
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm">Service Needed</label>
                <select
                  value={creditRequestData.service}
                  onChange={(e) => setCreditRequestData(prev => ({ ...prev, service: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="personality-clone">Personality Clone</option>
                  <option value="lip-sync">AI Lip-Syncing</option>
                  <option value="dubbing">AI Video Dubbing</option>
                  <option value="all">All Services</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-2 text-sm">Credits Needed</label>
                <select
                  value={creditRequestData.creditsNeeded}
                  onChange={(e) => setCreditRequestData(prev => ({ ...prev, creditsNeeded: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select amount</option>
                  <option value="10">10 Credits</option>
                  <option value="25">25 Credits</option>
                  <option value="50">50 Credits</option>
                  <option value="100">100 Credits</option>
                  <option value="custom">Custom Amount</option>
                </select>
              </div>

              <button
                onClick={handleSubmitCreditRequest}
                disabled={!creditRequestData.useCase || !creditRequestData.service || !creditRequestData.creditsNeeded}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Submit Credit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="signin"
      />

      <Footer />
    </div>
  );
}