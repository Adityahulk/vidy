import React, { useState, useEffect } from 'react';
import { User, CreditCard, Clock, ArrowLeft, Mail, Calendar, Video, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../lib/supabase';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  subscription_tier: string;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  credits?: number;
}

interface Project {
  id: string;
  project_name: string;
  service_type: string;
  status: string;
  video_url?: string;
  result_url?: string;
  created_at: string;
}

interface CreditRequest {
  id: string;
  use_case: string;
  service: string;
  credits_needed: string;
  status: string;
  created_at: string;
}

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [creditRequests, setCreditRequests] = useState<CreditRequest[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingCreditRequests, setLoadingCreditRequests] = useState(true);
  const [showRequestCredits, setShowRequestCredits] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
      return;
    }

    if (user) {
      loadProfile();
      loadProjects();
      loadCreditRequests();
    }
  }, [user, loading, navigate]);

  const loadProfile = async () => {
    try {
      const { data, error } = await db.getProfile(user!.id);
      if (error) throw error;
      
      // Add credits field if not present (default to 0)
      const profileWithCredits = {
        ...data,
        credits: data.credits || 0
      };
      
      setProfile(profileWithCredits);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadProjects = async () => {
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

  const loadCreditRequests = async () => {
    try {
      const { data, error } = await db.getUserCreditRequests();
      if (error) throw error;
      setCreditRequests(data || []);
    } catch (error) {
      console.error('Error loading credit requests:', error);
    } finally {
      setLoadingCreditRequests(false);
    }
  };

  const handleRequestCredits = () => {
    setShowRequestCredits(true);
    // Here you would typically integrate with a payment system
    // For now, we'll just show a message
    setTimeout(() => {
      alert('Credit request submitted! Our team will contact you shortly.');
      setShowRequestCredits(false);
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'personality-clone':
        return <User className="w-4 h-4" />;
      case 'lip-sync':
        return <Video className="w-4 h-4" />;
      case 'dubbing':
        return <Video className="w-4 h-4" />;
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'processing':
        return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/10 border-red-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  if (loading || loadingProfile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-slate-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-slate-600"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {profile.full_name || 'User'}
                    </h1>
                    <div className="flex items-center space-x-4 text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>{profile.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDate(profile.created_at)}</span>
                      </div>
                    </div>
                    {profile.company && (
                      <p className="text-slate-300 mt-1">{profile.company}</p>
                    )}
                  </div>
                </div>

                {/* Credits Section */}
                <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    <span className="text-slate-300 font-medium">Credits</span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-3">
                    {profile.credits || 0}
                  </div>
                  {(profile.credits || 0) === 0 && (
                    <button
                      onClick={handleRequestCredits}
                      disabled={showRequestCredits}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                    >
                      {showRequestCredits ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Requesting...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Request Credits</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Processing History */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-blue-500" />
                <h2 className="text-2xl font-bold text-white">Processing History</h2>
              </div>

              {loadingProjects ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center py-12">
                  <Video className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Projects Yet</h3>
                  <p className="text-slate-500 mb-6">Start your first AI video project to see it here.</p>
                  <button
                    onClick={() => navigate('/playground')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Go to Playground
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-slate-900/50 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            {getServiceIcon(project.service_type)}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {project.project_name}
                            </h3>
                            <p className="text-slate-400 text-sm capitalize">
                              {project.service_type.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                          </div>
                          <p className="text-slate-500 text-xs mt-1">
                            {formatDate(project.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      {project.result_url && (
                        <div className="mt-4">
                          <a
                            href={project.result_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <Video className="w-4 h-4" />
                            <span>View Result</span>
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Credit Requests History */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 mt-8">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-white">Credit Requests</h2>
              </div>

              {loadingCreditRequests ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 text-purple-500 animate-spin" />
                </div>
              ) : creditRequests.length === 0 ? (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Credit Requests</h3>
                  <p className="text-slate-500">Your credit requests will appear here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {creditRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-slate-900/50 border border-slate-600 rounded-lg p-6 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {request.credits_needed} Credits Request
                            </h3>
                            <p className="text-slate-400 text-sm capitalize">
                              {request.service.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </div>
                          <p className="text-slate-500 text-xs mt-1">
                            {formatDate(request.created_at)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Use Case:</h4>
                        <p className="text-slate-300 text-sm">{request.use_case}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}