import React, { useState, useRef, useEffect } from 'react';
import { Play, User, Palette, Video, Loader, Mic, Globe, Zap } from 'lucide-react';

const demoAvatars = [
  {
    id: 1,
    name: "Sarah - Business Professional",
    thumbnail: 'https://storage.googleapis.com/vidsimplify/Screenshot%202025-10-04%20at%202.06.02%20AM.png',
    category: "Business",
    isInteractive: true,
    videoOptions: [
      { id: 'intro', name: 'Company Introduction', icon: '🏢', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_business_intro.mp4' },
      { id: 'product', name: 'Product Demo', icon: '📱', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_product_demo.mp4' }
    ]
  },
  {
    id: 2,
    name: "David - Educator",
    thumbnail: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: "Education",
    isInteractive: true,
    videoOptions: [
      { id: 'lesson', name: 'Training Lesson', icon: '📚', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_training.mp4' },
      { id: 'welcome', name: 'Course Welcome', icon: '👋', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_welcome.mp4' }
    ]
  },
  {
    id: 3,
    name: "Maya - Creative",
    thumbnail: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: "Creative",
    isInteractive: true,
    videoOptions: [
      { id: 'marketing', name: 'Marketing Pitch', icon: '🎯', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_marketing.mp4' },
      { id: 'social', name: 'Social Media', icon: '📱', videoUrl: 'https://storage.googleapis.com/vidsimplify/avatar_social.mp4' }
    ]
  }
];

interface InteractiveAvatarPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveAvatarPlayer({ isPreview = false }: InteractiveAvatarPlayerProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(demoAvatars[0]);
  const [selectedVideo, setSelectedVideo] = useState(demoAvatars[0].videoOptions[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [customScript, setCustomScript] = useState("Welcome to our company! We're excited to show you how AI avatars can transform your video content creation process.");
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the main avatar is changed, reset the video selection and mute state
  useEffect(() => {
    if (selectedAvatar.isInteractive) {
      setSelectedVideo(selectedAvatar.videoOptions[0]);
      setIsMuted(true); 
      setIsLoading(true);
    }
  }, [selectedAvatar]);
  
  // Also reset loading state when video source changes
  useEffect(() => {
      setIsLoading(true);
  }, [selectedVideo]);

  // Function to toggle mute state
  const handleToggleMute = () => {
    if (isPreview) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if(videoRef.current) {
        videoRef.current.muted = nextMuted;
    }
  };

  const handleGenerateVideo = () => {
    if (isPreview) return;
    // Simulate video generation process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Video generated successfully! In the full version, this would create a custom video with your script.');
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Avatar Selection section */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-bold text-white mb-4 text-center">Choose Your Avatar</h4>
        <div className="grid grid-cols-3 gap-4">
          {demoAvatars.map((avatar) => (
            <button
              key={avatar.id}
              onClick={() => !isPreview && setSelectedAvatar(avatar)}
              disabled={isPreview}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                selectedAvatar.id === avatar.id 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : isPreview ? '' : 'hover:ring-1 hover:ring-white/50'
              }`}
            >
              <img src={avatar.thumbnail} alt={avatar.name} className="w-full h-32 object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm">{avatar.name}</h5>
                  <p className="text-slate-300 text-xs">{avatar.category}</p>
                </div>
              </div>
              {selectedAvatar.id === avatar.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Script Input Section */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-bold text-white mb-4 text-center">Enter Your Script</h4>
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <textarea
            value={customScript}
            onChange={(e) => !isPreview && setCustomScript(e.target.value)}
            disabled={isPreview}
            rows={4}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            placeholder="Enter your script here... The AI avatar will speak this text naturally with appropriate gestures and expressions."
          />
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGenerateVideo}
              disabled={isPreview || !customScript.trim()}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Generate Custom Video</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Video Player */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4 text-center">Avatar Video Demo</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative">
            {selectedAvatar.isInteractive ? (
              <>
                <video
                  ref={videoRef}
                  key={selectedVideo.videoUrl}
                  src={selectedVideo.videoUrl}
                  poster={selectedAvatar.thumbnail}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  onCanPlay={() => setIsLoading(false)}
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {isLoading && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20 pointer-events-none">
                        <Loader className="w-12 h-12 text-white animate-spin" />
                   </div>
                )}
                
                <button
                  onClick={handleToggleMute}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white text-sm font-medium hover:bg-black/70 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? 'Unmute' : 'Mute'}
                </button>
              </>
            ) : (
              <img src={selectedAvatar.thumbnail} alt={selectedAvatar.name} className="absolute inset-0 w-full h-full object-cover"/>
            )}
            
            {/* Custom Bottom Controls for Video Type Selection */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              {selectedAvatar.isInteractive && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {selectedAvatar.videoOptions.map((video) => (
                        <button
                          key={video.id}
                          onClick={() => !isPreview && setSelectedVideo(video)}
                          className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                              selectedVideo.id === video.id
                              ? 'bg-white text-black' 
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                        >
                          <span>{video.icon}</span>
                          <span className="font-medium">{video.name}</span>
                        </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight section */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <User className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Realistic Expressions</p>
                <p className="text-slate-400 text-xs">Micro-movements & emotions</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <Video className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Perfect Lip-Sync</p>
                <p className="text-slate-400 text-xs">Sub-frame accuracy</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <Globe className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">50+ Languages</p>
                <p className="text-slate-400 text-xs">Native pronunciation</p>
            </div>
        </div>
      </div>
    </div>
  );
}