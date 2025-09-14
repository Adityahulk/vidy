import React, { useState, useRef, useEffect } from 'react';
import { Play, Film, Target, Zap, Volume2, VolumeX } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    thumbnail: 'https://i.ibb.co/QjC7vYmn/Screenshot-2025-09-14-at-7-19-39-PM.png',
    isInteractive: true,
    audioOptions: [
      { id: 'original', name: 'Mark\'s Voice', icon: '🎤', videoUrl: 'https://storage.cloud.google.com/vidsimplify/mark_input.mp4' },
      { id: 'synced', name: 'Sunder Pichai\'s Voice', icon: '🔄', videoUrl: 'https://storage.cloud.google.com/vidsimplify/vidsimplify-4n8y9k%20(online-video-cutter.com).mp4' }
    ]
  },
  {
    id: 2, // New Demo Video
    thumbnail: 'https://i.ibb.co/dD3s811/trump-thumb.png',
    isInteractive: true,
    audioOptions: [
      { id: 'original', name: 'Trump\'s Voice', icon: '🎤', videoUrl: 'https://storage.cloud.google.com/vidsimplify/drump_2_demo.mp4' },
      { id: 'synced', name: 'Journalist\'s Voice', icon: '🔄', videoUrl: 'https://storage.cloud.google.com/vidsimplify/vidsimplify-3naw7g%20(online-video-cutter.com).mp4' }
    ]
  },
  { id: 3, thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' }
];


interface InteractiveLipSyncPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLipSyncPlayer({ isPreview = false }: InteractiveLipSyncPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedAudio, setSelectedAudio] = useState(demoVideos[0].audioOptions[0]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // When the main video is changed, reset the audio selection
  useEffect(() => {
    if (selectedVideo.isInteractive) {
      setSelectedAudio(selectedVideo.audioOptions[0]);
    }
  }, [selectedVideo]);

  // Effect to sync the video element's muted property with our state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, selectedAudio]); // Also re-apply when audio source changes

  const handleToggleMute = () => {
    if (isPreview) return;
    setIsMuted(!isMuted);
  };

  return (
    <div className="space-y-6">
      {/* --- Video Selection section --- */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Video</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {demoVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => {
                if (!isPreview) {
                  setSelectedVideo(video);
                  setIsMuted(true);
                }
              }}
              disabled={isPreview}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                selectedVideo.id === video.id 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : isPreview ? '' : 'hover:ring-1 hover:ring-white/50'
              }`}
            >
              <img src={video.thumbnail} alt="Video thumbnail" className="w-full h-32 object-cover"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm">Demo Video {video.id}</h5>
                  <p className="text-slate-300 text-xs">Ready for lip-sync</p>
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
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative overflow-hidden">
            {selectedVideo.isInteractive ? (
              <video
                ref={videoRef}
                key={selectedAudio.videoUrl}
                src={selectedAudio.videoUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                title="Lip-Sync Demo"
              ></video>
            ) : (
              <img src={selectedVideo.thumbnail} alt="Video" className="absolute inset-0 w-full h-full object-cover"/>
            )}
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              {selectedVideo.isInteractive && (
                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        {selectedVideo.audioOptions.map((audio) => (
                            <button
                              key={audio.id}
                              onClick={() => !isPreview && setSelectedAudio(audio)}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
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
                    
                    <button
                        onClick={handleToggleMute}
                        className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
                    </button>
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