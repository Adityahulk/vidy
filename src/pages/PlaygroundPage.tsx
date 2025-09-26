import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Play, Download, Loader, User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import UserMenu from '../components/UserMenu';

interface Project {
  id: string;
  project_name: string;
  service_type: string;
  status: string;
  video_url?: string;
  result_url?: string;
  created_at: string;
}

export default function PlaygroundPage() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [selectedService, setSelectedService] = useState('personality-clone');
  const [projectName, setProjectName] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Load user projects when authenticated
  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const { data, error } = await db.getUserProjects();
      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleProcessVideo = async () => {
    // Check authentication first
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (!projectName || !videoFile) {
      alert('Please provide a project name and upload a video file.');
      return;
    }

    setIsProcessing(true);
    try {
      // Create project in database
      const { data, error } = await db.createProject({
        project_name: projectName,
        service_type: selectedService,
        video_url: `temp_${Date.now()}_${videoFile.name}`, // Temporary URL
      });

      if (error) throw error;

      // Simulate processing (replace with actual API call)
      setTimeout(() => {
        setIsProcessing(false);
        setProjectName('');
        setVideoFile(null);
        loadProjects(); // Refresh projects list
        alert('Video processing started! Check your projects below.');
      }, 2000);

    } catch (error) {
      console.error('Error creating project:', error);
      setIsProcessing(false);
      alert('Error starting video processing. Please try again.');
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    // After successful auth, automatically process the video if form is complete
    if (projectName && videoFile) {
      handleProcessVideo();
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      {/* Main Content */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-6">
          {/* Header with User Menu */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            
            {user && <UserMenu />}
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AI Video{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Playground
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-12 leading-relaxed">
              Transform your videos with cutting-edge AI technology. 
              Choose your service, upload your content, and let AI do the magic.
            </p>

            {/* Service Selection */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Choose Your AI Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 'personality-clone', name: 'Personality Clone', icon: '👤' },
                  { id: 'lip-sync', name: 'AI Lip-Sync', icon: '🎬' },
                  { id: 'dubbing', name: 'AI Dubbing', icon: '🎤' },
                  { id: 'custom', name: 'Custom Solution', icon: '⚡' }
                ].map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      selectedService === service.id
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-slate-600 bg-slate-700/50 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{service.icon}</div>
                    <div className="font-medium text-sm">{service.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Project Configuration */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Project Configuration</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2 text-left">Project Name</label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Enter a name for your project"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2 text-left">Upload Video</label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-slate-500 transition-colors">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-300 mb-2">
                        {videoFile ? videoFile.name : 'Click to upload or drag and drop'}
                      </p>
                      <p className="text-slate-500 text-sm">MP4, MOV, AVI up to 100MB</p>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleProcessVideo}
                  disabled={isProcessing || !projectName || !videoFile}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Start AI Processing</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Projects History - Only show if user is authenticated */}
            {user && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Your Projects</h3>
                
                {loadingProjects ? (
                  <div className="text-center py-8">
                    <Loader className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Loading projects...</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-400">No projects yet. Create your first AI video above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between">
                        <div className="text-left">
                          <h4 className="text-white font-medium">{project.project_name}</h4>
                          <p className="text-slate-400 text-sm capitalize">{project.service_type.replace('-', ' ')}</p>
                          <p className="text-slate-500 text-xs">{new Date(project.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            project.status === 'completed' 
                              ? 'bg-green-500/20 text-green-400'
                              : project.status === 'failed'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {project.status}
                          </span>
                          {project.result_url && (
                            <button className="text-blue-400 hover:text-blue-300 transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode={authMode}
      />
    </div>
  );
}