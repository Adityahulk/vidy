import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, Play, User, Film, Volume2, Wand2, CheckCircle, AlertCircle, Loader, Globe, Mic } from 'lucide-react';
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
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'lip-sync' as ServiceType,
    title: 'AI Lip-Syncing',
    icon: Film,
    description: 'Perfect lip-sync alignment for any audio-video combination',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'dubbing' as ServiceType,
    title: 'AI Video Dubbing',
    icon: Volume2,
    description: 'Professional dubbing in 50+ languages with voice cloning',
    color: 'green',
    gradient: 'from-green-500 to-blue-600'
  },
  {
    id: 'custom' as ServiceType,
    title: 'Custom Solutions',
    icon: Wand2,
    description: 'Tailored AI processing for your specific needs',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  }
];

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
    error: null
  });

  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const currentService = services.find(s => s.id === selectedService)!;
  const IconComponent = currentService.icon;

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
      error: null
    });
  };

  const handleServiceChange = (serviceId: ServiceType) => {
    setSelectedService(serviceId);
    resetForm();
  };

  const handleProcess = async () => {
    setUploadState(prev => ({
      ...prev,
      isProcessing: true,
      progress: 0,
      error: null,
      result: null
    }));

    // Simulate processing with progress
    const progressInterval = setInterval(() => {
      setUploadState(prev => {
        if (prev.progress >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return { ...prev, progress: prev.progress + 10 };
      });
    }, 500);

    // Simulate API call
    setTimeout(() => {
      clearInterval(progressInterval);
      setUploadState(prev => ({
        ...prev,
        isProcessing: false,
        progress: 100,
        result: `Your ${currentService.title.toLowerCase()} has been processed successfully! Check your email for the download link.`
      }));
    }, 6000);
  };

  const canProcess = () => {
    switch (selectedService) {
      case 'personality-clone':
        return uploadState.video && uploadState.script.trim();
      case 'lip-sync':
        return uploadState.video && uploadState.audio;
      case 'dubbing':
        return uploadState.video && uploadState.language;
      case 'custom':
        return uploadState.video;
      default:
        return false;
    }
  };

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

          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full px-4 py-2 mb-8">
              <IconComponent className={`w-4 h-4 text-${currentService.color}-400`} />
              <span className="text-slate-300 text-sm">AI Video Playground</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              AI Video{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0">
              Choose your AI service and transform your videos with cutting-edge technology. 
              All tools in one powerful playground.
            </p>
          </div>
        </div>
      </section>

      {/* Service Selection */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Service Selector */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Choose Your AI Service</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service.id)}
                    className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedService === service.id
                        ? `border-${service.color}-500 bg-${service.color}-500/10`
                        : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-4`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-slate-400 text-sm">{service.description}</p>
                    {selectedService === service.id && (
                      <div className="absolute top-2 right-2">
                        <div className={`w-6 h-6 bg-${service.color}-500 rounded-full flex items-center justify-center`}>
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Interface */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sm:p-8 mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <IconComponent className={`w-8 h-8 text-${currentService.color}-400`} />
                <h3 className="text-2xl font-bold text-white">{currentService.title}</h3>
              </div>
              
              <div className="space-y-6">
                {/* Video Upload - Required for all services */}
                <div>
                  <label className="block text-slate-300 mb-3 font-medium">
                    Video File <span className="text-red-400">*</span>
                  </label>
                  <div 
                    onClick={() => videoInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                      uploadState.video 
                        ? `border-${currentService.color}-500 bg-${currentService.color}-500/5`
                        : `border-slate-600 hover:border-${currentService.color}-500`
                    }`}
                  >
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    {uploadState.video ? (
                      <div>
                        <p className="text-white font-medium">{uploadState.video.name}</p>
                        <p className="text-slate-400 text-sm">{(uploadState.video.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-white mb-2">Click to upload video</p>
                        <p className="text-slate-400 text-sm">MP4, MOV, AVI up to 500MB</p>
                      </div>
                    )}
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
                  <div>
                    <label className="block text-slate-300 mb-3 font-medium">
                      Script <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      value={uploadState.script}
                      onChange={(e) => setUploadState(prev => ({ ...prev, script: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      placeholder="Enter the script you want your personality clone to speak..."
                    />
                    <p className="text-slate-400 text-sm mt-2">Enter the text you want your cloned personality to speak</p>
                  </div>
                )}

                {selectedService === 'lip-sync' && (
                  <div>
                    <label className="block text-slate-300 mb-3 font-medium">
                      Audio File <span className="text-red-400">*</span>
                    </label>
                    <div 
                      onClick={() => audioInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        uploadState.audio 
                          ? 'border-purple-500 bg-purple-500/5'
                          : 'border-slate-600 hover:border-purple-500'
                      }`}
                    >
                      <Volume2 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      {uploadState.audio ? (
                        <div>
                          <p className="text-white font-medium">{uploadState.audio.name}</p>
                          <p className="text-slate-400 text-sm">{(uploadState.audio.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-white mb-2">Click to upload audio</p>
                          <p className="text-slate-400 text-sm">MP3, WAV, AAC up to 100MB</p>
                        </div>
                      )}
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
                  <>
                    <div>
                      <label className="block text-slate-300 mb-3 font-medium">
                        Target Language <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={uploadState.language}
                        onChange={(e) => setUploadState(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.flag} {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="lipSync"
                        checked={uploadState.enableLipSync}
                        onChange={(e) => setUploadState(prev => ({ ...prev, enableLipSync: e.target.checked }))}
                        className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                      />
                      <label htmlFor="lipSync" className="text-slate-300">
                        Enable lip-sync adjustment
                      </label>
                    </div>
                  </>
                )}

                {selectedService === 'custom' && (
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Custom Processing Options</h4>
                    <p className="text-slate-400 text-sm mb-4">
                      Your video will be processed using our custom AI pipeline. Additional options and parameters 
                      can be configured based on your specific requirements.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <Wand2 className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Custom AI</p>
                      </div>
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <Film className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Advanced Processing</p>
                      </div>
                      <div className="text-center p-3 bg-slate-800/50 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
                        <p className="text-white text-sm font-medium">Quality Assured</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Process Button */}
                <div className="pt-6">
                  <button
                    onClick={handleProcess}
                    disabled={!canProcess() || uploadState.isProcessing}
                    className={`w-full px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      canProcess() && !uploadState.isProcessing
                        ? `bg-gradient-to-r ${currentService.gradient} text-white hover:scale-105 transform`
                        : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {uploadState.isProcessing ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Processing... {uploadState.progress}%</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Start {currentService.title}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {uploadState.isProcessing && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Loader className={`w-5 h-5 text-${currentService.color}-500 animate-spin`} />
                  <span className="text-white font-medium">Processing your {currentService.title.toLowerCase()}...</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${currentService.gradient} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${uploadState.progress}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-2">This may take a few minutes depending on your file size</p>
              </div>
            )}

            {/* Result */}
            {uploadState.result && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-green-400 font-medium">Processing Complete!</span>
                </div>
                <p className="text-slate-300">{uploadState.result}</p>
                <button
                  onClick={resetForm}
                  className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Process Another Video
                </button>
              </div>
            )}

            {/* Error */}
            {uploadState.error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                  <span className="text-red-400 font-medium">Processing Error</span>
                </div>
                <p className="text-slate-300">{uploadState.error}</p>
              </div>
            )}

            {/* Service Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {selectedService === 'personality-clone' && (
                <>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <User className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Facial Cloning</p>
                    <p className="text-slate-400 text-xs">Perfect replication</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Mic className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Voice Synthesis</p>
                    <p className="text-slate-400 text-xs">Authentic voice cloning</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Wand2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Natural Gestures</p>
                    <p className="text-slate-400 text-xs">Contextual movements</p>
                  </div>
                </>
              )}

              {selectedService === 'lip-sync' && (
                <>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Film className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Real-Time Sync</p>
                    <p className="text-slate-400 text-xs">Instant processing</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Precision Tracking</p>
                    <p className="text-slate-400 text-xs">Sub-pixel accuracy</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Globe className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Multi-Language</p>
                    <p className="text-slate-400 text-xs">Global compatibility</p>
                  </div>
                </>
              )}

              {selectedService === 'dubbing' && (
                <>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Volume2 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Voice Cloning</p>
                    <p className="text-slate-400 text-xs">Perfect voice replication</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Globe className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">50+ Languages</p>
                    <p className="text-slate-400 text-xs">Global reach</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Mic className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Perfect Lip-Sync</p>
                    <p className="text-slate-400 text-xs">Natural synchronization</p>
                  </div>
                </>
              )}

              {selectedService === 'custom' && (
                <>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Wand2 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Custom AI</p>
                    <p className="text-slate-400 text-xs">Tailored processing</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <CheckCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Enterprise Grade</p>
                    <p className="text-slate-400 text-xs">Professional quality</p>
                  </div>
                  <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                    <Film className="w-6 h-6 text-green-500 mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Flexible Output</p>
                    <p className="text-slate-400 text-xs">Multiple formats</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}