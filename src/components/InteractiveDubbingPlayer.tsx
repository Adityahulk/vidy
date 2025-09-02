import React, { useState } from 'react';
import { Play, Pause, Volume2, Globe, Mic } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
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

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Brazilian Portuguese', flag: '🇧🇷' }
];

interface InteractiveDubbingPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveDubbingPlayer({ isPreview = false }: InteractiveDubbingPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
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
                  <p className="text-slate-300 text-xs">Ready for dubbing</p>
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
        <h4 className="text-xl font-bold text-white mb-4">AI Dubbing Demo</h4>
        <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
          <div className="aspect-video bg-black relative overflow-hidden">
            {/* Video Background */}
            <img 
              src={selectedVideo.thumbnail} 
              alt="Video"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
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
              </div>

              {/* Language Selector */}
              <div className="flex space-x-2 mt-4">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => !isPreview && setSelectedLanguage(language)}
                    disabled={isPreview}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedLanguage.code === language.code 
                        ? 'bg-white text-black' 
                        : 'bg-black/50 text-white hover:bg-black/70'
                    }`}
                  >
                    <span className="text-sm">{language.flag}</span>
                    <span className="text-sm font-medium">{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
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
  );
}