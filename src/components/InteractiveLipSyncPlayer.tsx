import React, { useState, useRef, useEffect } from 'react';
import { Play, Film, Target, Zap } from 'lucide-react';
import { Player, ControlBar, BigPlayButton, LoadingSpinner } from 'video-react';
import "video-react/dist/video-react.css"; // Import the CSS for the player

const demoVideos = [
  {
    id: 1,
    name: "Taylor & Jordan",
    thumbnail: 'https://i.ibb.co/nspMVyw/Screenshot-2025-09-14-at-8-40-29-PM.png',
    isInteractive: true,
    audioOptions: [
      { id: 'original', name: 'Taylor\'s Voice', icon: '🎤', videoUrl: 'https://storage.googleapis.com/vidsimplify/taylor_input.mp4' },
      { id: 'synced', name: 'Jordan\'s Voice', icon: '🔄', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-3naw7g%20(online-video-cutter.com)%20(1).mp4' }
    ]
  },
  {
    id: 2,
    name: "Trump & Journalist",
    thumbnail: 'https://i.ibb.co/Q79DCPkW/Screenshot-2025-09-14-at-7-49-22-PM.png',
    isInteractive: true,
    audioOptions: [
      { id: 'original', name: 'Trump\'s Voice', icon: '🎤', videoUrl: 'https://storage.googleapis.com/vidsimplify/drump_2_demo.mp4' },
      { id: 'synced', name: 'Journalist\'s Voice', icon: '🔄', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-3naw7g%20(online-video-cutter.com).mp4' }
    ]
  },
  {
    id: 3,
    name: "Mark & Sundar",
    thumbnail: 'https://i.ibb.co/QjC7vYmn/Screenshot-2025-09-14-at-7-19-39-PM.png',
    isInteractive: true,
    audioOptions: [
      { id: 'original', name: 'Mark\'s Voice', icon: '🎤', videoUrl: 'https://storage.googleapis.com/vidsimplify/mark_input.mp4' },
      { id: 'synced', name: 'Sunder Pichai\'s Voice', icon: '🔄', videoUrl: 'https://storage.googleapis.com/vidsimplify/vidsimplify-4n8y9k%20(online-video-cutter.com).mp4' }
    ]
  }
];


interface InteractiveLipSyncPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLipSyncPlayer({ isPreview = false }: InteractiveLipSyncPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedAudio, setSelectedAudio] = useState(demoVideos[0].audioOptions[0]);
  const playerRef = useRef(null);

  // When the main video is changed, reset the audio selection
  useEffect(() => {
    if (selectedVideo.isInteractive) {
      setSelectedAudio(selectedVideo.audioOptions[0]);
    }
  }, [selectedVideo]);

  // When the audio/video source changes, tell the player to load it
  useEffect(() => {
    if (playerRef.current && selectedVideo.isInteractive) {
      playerRef.current.load();
    }
  }, [selectedAudio]);

  return (
    <div className="space-y-6">
      {/* --- Video Selection section --- */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Video</h4>
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
        <h4 className="text-xl font-bold text-white mb-4">Lip-Sync Technology Demo</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto video-react-wrapper">
          <div className="aspect-video bg-black relative">
            {selectedVideo.isInteractive ? (
              <Player
                ref={playerRef}
                key={selectedAudio.videoUrl}
                poster={selectedVideo.thumbnail}
                playsInline
                autoPlay={true}
                muted={true} // Start muted for autoplay
                src={selectedAudio.videoUrl}
              >
                <LoadingSpinner />
                <BigPlayButton position="center" />
                <ControlBar autoHide={true} />
              </Player>
            ) : (
              <img src={selectedVideo.thumbnail} alt={selectedVideo.name} className="absolute inset-0 w-full h-full object-cover"/>
            )}
            
            {/* Custom Bottom Controls for Voice Selection */}
            <div className="absolute bottom-16 sm:bottom-4 left-4 right-4 z-20">
              {selectedVideo.isInteractive && (
                <div className="flex flex-wrap gap-2">
                    {selectedVideo.audioOptions.map((audio) => (
                        <button
                          key={audio.id}
                          onClick={() => !isPreview && setSelectedAudio(audio)}
                          className={`flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm ${
                              selectedAudio.id === audio.id 
                              ? 'bg-white text-black' 
                              : 'bg-black/50 text-white hover:bg-black/70'
                          }`}
                        >
                          <span>{audio.icon}</span>
                          <span className="font-medium">{audio.name}</span>
                        </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- Features Highlight section --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Film className="w-6 h-6 text-blue-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Real-Time Sync</p><p className="text-slate-400 text-xs">Instant processing</p></div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Target className="w-6 h-6 text-purple-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Precision Tracking</p><p className="text-slate-400 text-xs">Sub-pixel accuracy</p></div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Zap className="w-6 h-6 text-green-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Multi-Language</p><p className="text-slate-400 text-xs">Global compatibility</p></div>
      </div>
    </div>
  );
}