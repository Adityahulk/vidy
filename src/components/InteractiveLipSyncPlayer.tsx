import React, { useState } from 'react';
import { Play, Pause, Volume2, Film, Target, Zap } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    // This thumbnail will be used for selection and as a poster for the Vimeo video.
    thumbnail: 'https://i.vimeocdn.com/video/1858548179-6b809805445c99e9851e360439d56417531c3b1e33c7f66e01a4e1531e2d7877-d?mw=400&mh=225',
  },
  {
    id: 2,
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Updated audio option names
const audioOptions = [
  { id: 'original', name: 'Mark\'s Voice', icon: '🎤' },
  { id: 'synced', name: 'Sunder Pichai\'s voice', icon: '🔄' }
];

// Vimeo video URLs
const vimeoOriginalUrl = "https://player.vimeo.com/video/1118495258?badge=0&autoplay=1&loop=1&autopause=0&player_id=0&app_id=58479";
const vimeoSyncedUrl = "https://player.vimeo.com/video/1118495279?badge=0&autoplay=1&loop=1&autopause=0&player_id=0&app_id=58479";

<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1118495279?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="vidsimplify-4n8y9k"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
interface InteractiveLipSyncPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLipSyncPlayer({ isPreview = false }: InteractiveLipSyncPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedAudio, setSelectedAudio] = useState(audioOptions[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPreview) return; // Disable interaction in preview mode
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Video Selection */}
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
              <img 
                src={video.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm">Demo Video {video.id}</h5>
                  <p className="text-slate-300 text-xs">Ready for lip-sync</p>
                </div>
              </div>
              {selectedVideo.id === video.id && (
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

      {/* Main Video Player */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Lip-Sync Technology Demo</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative overflow-hidden">
            {/* Conditional Player: Vimeo or Image */}
            {selectedVideo.id === 1 ? (
              <iframe
                key={selectedAudio.id} // Re-mounts the iframe when the source changes
                src={selectedAudio.id === 'original' ? vimeoOriginalUrl : vimeoSyncedUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title={selectedAudio.id === 'original' ? 'mark_input' : 'vidsimplify-output'}
              ></iframe>
            ) : (
              <>
                <img 
                  src={selectedVideo.thumbnail} 
                  alt="Video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
                  </button>
                </div>
              </>
            )}
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                 {/* Hide controls for Vimeo player, show for others */}
                {selectedVideo.id !== 1 && (
                    <div className="flex items-center space-x-3">
                        <button
                        onClick={handlePlayPause}
                        className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-white" />
                        ) : (
                            <Play className="w-4 h-4 text-white ml-0.5" />
                        )}
                        </button>
                        <Volume2 className="w-5 h-5 text-white" />
                    </div>
                )}
              </div>

              {/* Audio Selector - Only shown for the interactive Vimeo video */}
              {selectedVideo.id === 1 && (
                <div className="flex space-x-2 mt-4">
                  {audioOptions.map((audio) => (
                    <button
                      key={audio.id}
                      onClick={() => !isPreview && setSelectedAudio(audio)}
                      disabled={isPreview}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedAudio.id === audio.id 
                          ? 'bg-white text-black' 
                          : 'bg-black/50 text-white hover:bg-black/70'
                      }`}
                    >
                      <span className="text-sm">{audio.icon}</span>
                      <span className="text-sm font-medium">{audio.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/30 rounded-lg p-4 text-center">
          <Film className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Real-Time Sync</p>
          <p className="text-slate-400 text-xs">Instant processing</p>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center">
          <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Precision Tracking</p>
          <p className="text-slate-400 text-xs">Sub-pixel accuracy</p>
        </div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-white text-sm font-medium">Multi-Language</p>
          <p className="text-slate-400 text-xs">Global compatibility</p>
        </div>
      </div>
    </div>
  );
}