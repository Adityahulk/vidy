import React, { useState, useRef, useEffect } from 'react';
import { Play, User, Brain, Mic, Video, Loader } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    name: "Sydney Sweeney - Founder's Crush",
    thumbnail: 'https://storage.googleapis.com/vidsimplify/Screenshot%202025-09-23%20at%2011.20.31%20PM.png',
    isInteractive: true,
    personalityOptions: [
      { id: 'original', name: 'Original Sydney', icon: '👨‍🏫', videoUrl: 'https://storage.googleapis.com/vidsimplify/sydney%20(online-video-cutter.com).mp4' },
      { id: 'clone', name: 'Sydney Clone', icon: '🤖', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-6tqi5v%20(online-video-cutter.com).mp4' }
    ]
  },
  {
    id: 2,
    name: "Dwayne - The Rock",
    thumbnail: 'https://storage.googleapis.com/vidsimplify/Screenshot%202025-09-23%20at%2010.16.51%20PM.png',
    isInteractive: true,
    personalityOptions: [
      { id: 'original', name: 'Original Video', icon: '👩‍💼', videoUrl: 'https://storage.googleapis.com/vidsimplify/rock_dummy.mp4' },
      { id: 'clone', name: 'Cloned Video', icon: '🤖', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-63qems%20(online-video-cutter.com).mp4' }
    ]
  },
  {
    id: 3,
    name: "Emma - Creator",
    thumbnail: 'https://i.ibb.co/QjC7vYmn/Screenshot-2025-09-14-at-7-19-39-PM.png',
    isInteractive: true,
    personalityOptions: [
      { id: 'original', name: 'Original Emma', icon: '👩‍🎨', videoUrl: 'https://storage.googleapis.com/vidsimplify/mark_input.mp4' },
      { id: 'clone', name: 'Emma Clone', icon: '🤖', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-4n8y9k%20(online-video-cutter.com).mp4' }
    ]
  }
];

interface InteractivePersonalityClonePlayerProps {
  isPreview?: boolean;
}

export default function InteractivePersonalityClonePlayer({ isPreview = false }: InteractivePersonalityClonePlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedPersonality, setSelectedPersonality] = useState(demoVideos[0].personalityOptions[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the main video is changed, reset the personality selection and mute state
  useEffect(() => {
    if (selectedVideo.isInteractive) {
      setSelectedPersonality(selectedVideo.personalityOptions[0]);
      setIsMuted(true); 
      setIsLoading(true);
    }
  }, [selectedVideo]);
  
  // Also reset loading state when personality source changes
  useEffect(() => {
      setIsLoading(true);
  }, [selectedPersonality]);

  // Function to toggle mute state
  const handleToggleMute = () => {
    if (isPreview) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if(videoRef.current) {
        videoRef.current.muted = nextMuted;
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Selection section */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-bold text-white mb-4 text-center">Select Your Personality</h4>
        <div className="grid grid-cols-3 gap-4">
          {demoVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => !isPreview && setSelectedVideo(video)}
              disabled={isPreview}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                selectedVideo.id === video.id 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : isPreview ? '' : 'hover:ring-1 hover:ring-white/50'
              }`}
            >
              <img src={video.thumbnail} alt={video.name} className="w-full h-32 object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm">{video.name}</h5>
                </div>
              </div>
              {selectedVideo.id === video.id && (
                <div className="absolute top-2 right-2"><div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Play className="w-3 h-3 text-white" /></div></div>
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Main Video Player */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4 text-center"> Check their VidSimplify cloned adv.</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative">
            {selectedVideo.isInteractive ? (
              <>
                <video
                  ref={videoRef}
                  key={selectedPersonality.videoUrl}
                  src={selectedPersonality.videoUrl}
                  poster={selectedVideo.thumbnail}
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
              <img src={selectedVideo.thumbnail} alt={selectedVideo.name} className="absolute inset-0 w-full h-full object-cover"/>
            )}
            
            {/* Custom Bottom Controls for Personality Selection */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              {selectedVideo.isInteractive && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {selectedVideo.personalityOptions.map((personality) => (
                        <button
                          key={personality.id}
                          onClick={() => !isPreview && setSelectedPersonality(personality)}
                          className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                              selectedPersonality.id === personality.id
                              ? 'bg-white text-black' 
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                        >
                          <span>{personality.icon}</span>
                          <span className="font-medium">{personality.name}</span>
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
                <p className="text-white text-sm font-medium">Facial Cloning</p>
                <p className="text-slate-400 text-xs">Perfect replication</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <Mic className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Voice Synthesis</p>
                <p className="text-slate-400 text-xs">Authentic voice cloning</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
                <Brain className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-white text-sm font-medium">Natural Gestures</p>
                <p className="text-slate-400 text-xs">Contextual movements</p>
            </div>
        </div>
      </div>
    </div>
  );
}