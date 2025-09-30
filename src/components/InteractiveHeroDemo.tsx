import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, FileText, File, Globe, Sparkles, Users, CheckCircle } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
];

const avatars = [
  { id: 1, name: 'Sarah', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: 2, name: 'David', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: 3, name: 'Maya', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: 4, name: 'Alex', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100' },
];

export default function InteractiveHeroDemo() {
  const [selectedSource, setSelectedSource] = useState('powerpoint');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [completedVideos] = useState(184);
  const [successRate] = useState(78);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Controls */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <p className="text-slate-300 mb-4">AI avatars. Available in 100+ languages. No editing skills required.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 mx-auto lg:mx-0">
              <Sparkles className="w-5 h-5" />
              <span>Generate a free video</span>
            </button>
          </div>

          {/* Generate From Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Generate from</span>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSelectedSource('powerpoint');
                    setShowDropdown(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedSource === 'powerpoint' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <span>PowerPoint</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedSource('pdf');
                    setShowDropdown(false);
                  }}
                  className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                    selectedSource === 'pdf' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
                    <File className="w-4 h-4 text-white" />
                  </div>
                  <span>PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Language</span>
            </div>
            <div className="space-y-2">
              {languages.slice(0, 2).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    selectedLanguage.code === lang.code
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {selectedLanguage.code === lang.code && (
                    <CheckCircle className="w-4 h-4 text-blue-600 ml-auto" />
                  )}
                </button>
              ))}
            </div>
            <button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Translate</span>
            </button>
          </div>
        </div>

        {/* Right Side - Video Preview */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="flex justify-end space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Completed</span>
              <span className="font-bold text-2xl text-gray-900">{completedVideos}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Success rate</span>
              <span className="font-bold text-2xl text-gray-900">{successRate}%</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative">
              {/* Mock Video Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 mx-auto">
                    <img 
                      src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200" 
                      alt="AI Avatar" 
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto">
                    <h3 className="font-semibold text-gray-800 mb-2">An easier way to create videos</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Upload your logo</span>
                    </div>
                    <div className="bg-orange-100 border-2 border-dashed border-orange-300 rounded-lg p-3 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-orange-500 text-2xl mb-1">✱</div>
                        <span className="text-sm font-medium text-gray-700">Logo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="absolute bottom-4 left-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-4 left-16 right-4">
                <div className="bg-black bg-opacity-30 rounded-full h-1">
                  <div className="bg-white rounded-full h-1 w-1/3"></div>
                </div>
              </div>

              {/* Interactive Elements */}
              <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Do you want to learn more?</p>
                  <div className="flex space-x-2">
                    <button className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors">
                      Yes
                    </button>
                    <button className="px-4 py-1 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-medium transition-colors">
                      No
                    </button>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar Selection */}
          <div className="flex justify-end">
            <div className="flex items-center space-x-2">
              {avatars.map((avatar, index) => (
                <div key={avatar.id} className="relative">
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  />
                  {index === avatars.length - 1 && (
                    <div className="absolute -right-2 -top-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                      +200
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}