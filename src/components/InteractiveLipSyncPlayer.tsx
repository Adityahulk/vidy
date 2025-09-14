import React, { useState } from 'react';
import { Play, Film, Target, Zap } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    thumbnail: 'https://i.vimeocdn.com/video/1858548179-6b809805445c99e9851e360439d56417531c3b1e33c7f66e01a4e1531e2d7877-d?mw=400&mh=225',
  },
  { id: 2, thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400' }
];

const audioOptions = [
  { id: 'original', name: 'Mark\'s Voice', icon: '🎤', videoId: '1118495258' },
  { id: 'synced', name: 'Sunder Pichai\'s voice', icon: '🔄', videoId: '1118499959' }
];

// Vimeo player options
const vimeoOptions = "?badge=0&autoplay=1&loop=1&autopause=0&player_id=0&app_id=58479";

interface InteractiveLipSyncPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLipSyncPlayer({ isPreview = false }: InteractiveLipSyncPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedAudio, setSelectedAudio] = useState(audioOptions[0]);

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
            {selectedVideo.id === 1 ? (
              <iframe
                // The KEY is crucial. When it changes, React replaces the iframe.
                key={selectedAudio.videoId}
                src={`https://player.vimeo.com/video/${selectedAudio.videoId}${vimeoOptions}`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                title="Vimeo Lip-Sync Demo"
              ></iframe>
            ) : (
              // Fallback for other non-Vimeo videos
              <img src={selectedVideo.thumbnail} alt="Video" className="absolute inset-0 w-full h-full object-cover"/>
            )}
            
            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              {selectedVideo.id === 1 && (
                <div className="flex space-x-2 mt-4">
                  {audioOptions.map((audio) => (
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

