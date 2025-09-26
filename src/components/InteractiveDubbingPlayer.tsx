import React, { useState, useRef, useEffect } from 'react';
import { Play, Film, Target, Zap, Volume2, VolumeX, Loader, Globe, Mic } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    name: "Messi Speech",
    thumbnail: 'https://storage.googleapis.com/vidsimplify/Screenshot%202025-09-24%20at%2011.59.34%20PM.png',
    isInteractive: true,
    languageOptions: [
      { code: 'es', name: 'Spanish', flag: '🇪🇸', videoUrl: 'https://storage.googleapis.com/vidsimplify/messi_speaking.mp4' },
      { code: 'en', name: 'English', flag: '🇺🇸', videoUrl: 'https://storage.googleapis.com/vidsimplify/tmp45pbs4ml%20(online-video-cutter.com).mp4' }
    ]
  },
  {
    id: 2,
    name: "Trump's Speech",
    thumbnail: 'https://i.ibb.co/Q79DCPkW/Screenshot-2025-09-14-at-7-49-22-PM.png',
    isInteractive: true,
    languageOptions: [
      { code: 'en', name: 'English', flag: '🇺🇸', videoUrl: 'https://storage.googleapis.com/vidsimplify/drump_2_demo.mp4' },
      { code: 'pt', name: 'Portuguese', flag: '🇧🇷', videoUrl: 'https://storage.googleapis.com/vidsimplify/tmphy7lsz2b.mp4' }
    ]
  },
  {
    id: 3,
    name: "Putin's Announcement",
    thumbnail: 'https://storage.googleapis.com/vidsimplify/Screenshot%202025-09-25%20at%2012.20.51%20AM.png',
    isInteractive: true,
    languageOptions: [
      { code: 'ru', name: 'Russian', flag: '🇷🇺', videoUrl: 'https://storage.googleapis.com/vidsimplify/putin.mp4' },
      { code: 'en', name: 'English', flag: '🇺🇸', videoUrl: 'https://storage.googleapis.com/vidsimplify/tmp45pbs4ml%20(online-video-cutter.com)%20(1).mp4' }
    ]
  }
];


interface InteractiveDubbingPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveDubbingPlayer({ isPreview = false }: InteractiveDubbingPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(demoVideos[0].languageOptions[0]);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the main video is changed, reset the language selection and mute state
  useEffect(() => {
    if (selectedVideo.isInteractive) {
      setSelectedLanguage(selectedVideo.languageOptions[0]);
      setIsMuted(true); 
      setIsLoading(true);
    }
  }, [selectedVideo]);
  
  // Also reset loading state when language source changes
  useEffect(() => {
      setIsLoading(true);
  }, [selectedLanguage]);

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
      {/* --- Video Selection section (CENTERED) --- */}
      <div className="max-w-4xl mx-auto">
        <h4 className="text-xl font-bold text-white mb-4 text-center">Select Your Video</h4>
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
        <h4 className="text-xl font-bold text-white mb-4 text-center">AI Dubbing Technology Demo</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative">
            {selectedVideo.isInteractive ? (
              <>
                <video
                  ref={videoRef}
                  key={selectedLanguage.videoUrl}
                  src={selectedLanguage.videoUrl}
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
            
            {/* Custom Bottom Controls for Language Selection */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              {selectedVideo.isInteractive && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {selectedVideo.languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => !isPreview && setSelectedLanguage(lang)}
                          className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                              selectedLanguage.code === lang.code
                              ? 'bg-white text-black' 
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{lang.name}</span>
                            <span className={`text-xs ${selectedLanguage.code === lang.code ? 'text-gray-600' : 'text-gray-300'}`}>
                              {lang.label}
                            </span>
                          </div>
                        </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Features Highlight section (CENTERED) --- */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        </div>
      </div>
    </div>
  );
}
