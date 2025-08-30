import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

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

const audioOptions = [
  { id: 'original', name: 'Original Audio', icon: '🎤' },
  { id: 'synced', name: 'Synced Audio', icon: '🔄' }
];

export default function InteractiveLipSyncPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedAudio, setSelectedAudio] = useState(audioOptions[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden max-w-4xl mx-auto">
      <div className="flex">
        {/* Main Video Player */}
        <div className="flex-1">
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

              {/* Audio Selector */}
              <div className="flex space-x-2 mt-4">
                {audioOptions.map((audio) => (
                  <button
                    key={audio.id}
                    onClick={() => setSelectedAudio(audio)}
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
            </div>
          </div>
        </div>

        {/* Video Selection Sidebar */}
        <div className="w-32 bg-black/80 flex flex-col space-y-2 p-2">
          {demoVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`relative rounded overflow-hidden transition-all duration-300 ${
                selectedVideo.id === video.id 
                  ? 'ring-2 ring-blue-500' 
                  : 'hover:ring-1 hover:ring-white/50'
              }`}
            >
              <img 
                src={video.thumbnail} 
                alt="Video thumbnail"
                className="w-full h-20 object-cover"
              />
              {selectedVideo.id === video.id && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Play className="w-3 h-3 text-white ml-0.5" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}