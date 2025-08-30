import React, { useState } from 'react';
import { Play, Pause, Volume2, Globe } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Business Presentation',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Professional business presentation'
  },
  {
    id: 2,
    title: 'Marketing Video',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Product marketing content'
  },
  {
    id: 3,
    title: 'Educational Content',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Training and educational material'
  }
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
];

export default function InteractiveDubbingPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
      <div className="flex">
        {/* Main Video Player */}
        <div className="flex-1">
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
            {/* Video Background */}
            <img 
              src={selectedVideo.thumbnail} 
              alt={selectedVideo.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            
            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center">
                <button
                  onClick={handlePlayPause}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110 mb-4"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-white" />
                  ) : (
                    <Play className="w-10 h-10 text-white ml-1" />
                  )}
                </button>
                <h4 className="text-xl font-semibold text-white mb-2">{selectedVideo.title}</h4>
                <p className="text-slate-300 text-sm">{selectedVideo.description}</p>
              </div>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handlePlayPause}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    )}
                  </button>
                  <Volume2 className="w-5 h-5 text-white" />
                </div>

                {/* Language Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-700/80 transition-colors"
                  >
                    <span className="text-lg">{selectedLanguage.flag}</span>
                    <span className="text-white text-sm font-medium">{selectedLanguage.name}</span>
                    <Globe className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Language Dropdown */}
                  {showLanguageDropdown && (
                    <div className="absolute bottom-full mb-2 right-0 bg-slate-800/95 backdrop-blur-sm border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-y-auto w-48 z-10">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            setSelectedLanguage(language);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left ${
                            selectedLanguage.code === language.code ? 'bg-blue-600/20 border-l-2 border-blue-500' : ''
                          }`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="text-white text-sm">{language.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: isPlaying ? '100%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Selection Sidebar */}
        <div className="w-80 bg-slate-900/50 border-l border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <h4 className="text-white font-semibold mb-2">Demo Videos</h4>
            <p className="text-slate-400 text-sm">Select a video to see dubbing in action</p>
          </div>
          
          <div className="p-4 space-y-3">
            {demoVideos.map((video) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-left ${
                  selectedVideo.id === video.id 
                    ? 'bg-blue-600/20 border border-blue-500/50' 
                    : 'bg-slate-800/30 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="relative">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-16 h-12 object-cover rounded"
                  />
                  {selectedVideo.id === video.id && (
                    <div className="absolute inset-0 bg-blue-500/20 rounded flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Play className="w-3 h-3 text-white ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-medium text-sm">{video.title}</h5>
                  <p className="text-slate-400 text-xs">{video.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Language Info */}
          <div className="p-4 border-t border-slate-700">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="text-white text-sm font-medium">Current Language</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedLanguage.flag}</span>
                <span className="text-slate-300 text-sm">{selectedLanguage.name}</span>
              </div>
              <p className="text-slate-400 text-xs mt-2">
                AI voice cloning with perfect lip-sync
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Features */}
      <div className="bg-slate-900/30 border-t border-slate-700 p-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Real-time voice cloning</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Perfect lip-sync</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>50+ languages</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span>Emotion preservation</span>
          </div>
        </div>
      </div>
    </div>