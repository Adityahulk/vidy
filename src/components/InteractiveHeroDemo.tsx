import React, { useState, useRef } from 'react';
import { Play, Pause, FileText, File, Globe, Sparkles, Users, CheckCircle } from 'lucide-react';

// --- Data Arrays ---
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
];

const avatars = [
  { id: 1, name: 'Sarah', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 2, name: 'David', image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 3, name: 'Maya', image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { id: 4, name: 'Alex', image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function InteractiveHeroDemo() {
  // --- State Management ---
  const [selectedSource, setSelectedSource] = useState('powerpoint');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [videoTopic, setVideoTopic] = useState('Annual Compliance Training');
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedVideos] = useState(184);
  const [successRate] = useState(78);
  const videoRef = useRef < HTMLVideoElement > (null);

  // --- Handlers ---
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side - Controls */}
        <div className="space-y-4">
          <div className="text-center lg:text-left">
            <p className="text-slate-300 mb-4">AI avatars. Available in 50+ languages. No editing skills required.</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 mx-auto lg:mx-0">
              <Sparkles className="w-5 h-5" />
              <span>Generate a free video</span>
            </button>
          </div>
          
          {/* Corrected Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            {/* Generate From Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Generate from</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedSource('powerpoint')}
                  className={`px-3 py-2 flex flex-col items-center justify-center space-y-2 rounded-lg transition-colors ${
                    selectedSource === 'powerpoint' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">PowerPoint</span>
                </button>
                <button
                  onClick={() => setSelectedSource('pdf')}
                   className={`px-3 py-2 flex flex-col items-center justify-center space-y-2 rounded-lg transition-colors ${
                    selectedSource === 'pdf' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'hover:bg-gray-50 text-gray-700 border border-transparent'
                  }`}
                >
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">PDF</span>
                </button>
              </div>
            </div>

            {/* Video Topic Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">What is this video about?</span>
              </div>
              <textarea
                  value={videoTopic}
                  onChange={(e) => setVideoTopic(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="e.g., Annual Compliance Training"
              />
            </div>
            
             {/* Avatar Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">Choose an Avatar</span>
              </div>
              <div className="flex items-center justify-around space-x-2">
                {avatars.map((avatar) => (
                  <button key={avatar.id} onClick={() => setSelectedAvatar(avatar)} className="relative">
                    <img
                      src={avatar.image}
                      alt={avatar.name}
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-4 transition-all duration-200 ${
                        selectedAvatar.id === avatar.id ? 'border-blue-500' : 'border-transparent hover:border-blue-200'
                      }`}
                    />
                  </button>
                ))}
              </div>
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
            </div>
          </div>
        </div>

        {/* Right Side - Video Preview */}
        <div className="space-y-6 sticky top-8">
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
          <div className="relative bg-gray-100 rounded-xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-blue-100 relative">
              {/* Mock Video Content */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center mb-4 mx-auto">
                    <img
                      src={selectedAvatar.image}
                      alt={selectedAvatar.name}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-lg max-w-xs mx-auto">
                    <h3 className="font-semibold text-gray-800 mb-2 truncate">{videoTopic || 'Video Topic'}</h3>
                    <div className="flex items-center justify-center space-x-2 mb-3">
                       <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                       <span className="text-sm text-gray-600">Based on your {selectedSource}</span>
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
                className="absolute bottom-4 left-4 w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 transition-colors z-10"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}