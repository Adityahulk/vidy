import React, { useState } from 'react';
import { Play, Pause, Clock, Target, Zap } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Business Webinar',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:30',
    clips: [
      {
        id: 1,
        title: 'Key Insight #1',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:15',
        aspectRatio: '9:16',
        caption: 'The secret to scaling your business...',
        platform: 'TikTok'
      },
      {
        id: 2,
        title: 'Best Quote',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:30',
        aspectRatio: '16:9',
        caption: 'Success is not about luck, it\'s about...',
        platform: 'YouTube Shorts'
      },
      {
        id: 3,
        title: 'Action Steps',
        thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:45',
        aspectRatio: '1:1',
        caption: '3 steps to transform your strategy',
        platform: 'Instagram'
      }
    ]
  },
  {
    id: 2,
    title: 'Podcast Interview',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '1:20:15',
    clips: [
      {
        id: 1,
        title: 'Viral Moment',
        thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:12',
        aspectRatio: '9:16',
        caption: 'This changed everything for me...',
        platform: 'TikTok'
      },
      {
        id: 2,
        title: 'Expert Advice',
        thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:25',
        aspectRatio: '16:9',
        caption: 'Here\'s what most people get wrong',
        platform: 'YouTube Shorts'
      },
      {
        id: 3,
        title: 'Personal Story',
        thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:35',
        aspectRatio: '1:1',
        caption: 'My biggest failure taught me...',
        platform: 'Instagram'
      }
    ]
  },
  {
    id: 3,
    title: 'Conference Talk',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '32:45',
    clips: [
      {
        id: 1,
        title: 'Opening Hook',
        thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:18',
        aspectRatio: '9:16',
        caption: 'What if I told you everything you know is wrong?',
        platform: 'TikTok'
      },
      {
        id: 2,
        title: 'Main Point',
        thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:40',
        aspectRatio: '16:9',
        caption: 'The future of technology is here',
        platform: 'YouTube Shorts'
      },
      {
        id: 3,
        title: 'Call to Action',
        thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
        duration: '0:22',
        aspectRatio: '1:1',
        caption: 'Start implementing this today',
        platform: 'Instagram'
      }
    ]
  }
];

export default function InteractiveLongToShortPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [selectedClip, setSelectedClip] = useState(selectedVideo.clips[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showClips, setShowClips] = useState(false);

  const handleVideoSelect = (video: typeof demoVideos[0]) => {
    setSelectedVideo(video);
    setSelectedClip(video.clips[0]);
    setShowClips(false);
    setIsPlaying(false);
  };

  const handleProcessVideo = () => {
    setShowClips(true);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case '9:16': return 'aspect-[9/16]';
      case '1:1': return 'aspect-square';
      case '16:9': return 'aspect-video';
      default: return 'aspect-video';
    }
  };

  return (
    <div className="space-y-8">
      {/* Original Video Selection */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">1. Select Your Long-Form Video</h4>
        <div className="relative bg-black rounded-xl overflow-hidden">
          <div className="flex">
            {/* Main Video Player */}
            <div className="flex-1">
              <div className="aspect-video bg-black relative overflow-hidden">
                <img 
                  src={selectedVideo.thumbnail} 
                  alt="Selected video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Video Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h5 className="text-white font-medium text-sm">{selectedVideo.title}</h5>
                  <p className="text-slate-300 text-xs">{selectedVideo.duration}</p>
                </div>

                {/* Play Button */}
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
              </div>
            </div>

            {/* Video Selection Sidebar */}
            <div className="w-32 bg-black/80 flex flex-col space-y-2 p-2">
              {demoVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
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
                  <div className="absolute bottom-1 left-1 bg-black/70 rounded px-1">
                    <span className="text-white text-xs">{video.duration}</span>
                  </div>
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

        {/* Process Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleProcessVideo}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
          >
            <Zap className="w-5 h-5" />
            <span>Generate Short Clips</span>
          </button>
        </div>
      </div>

      {/* Generated Clips */}
      {showClips && (
        <div>
          <h4 className="text-xl font-bold text-white mb-4">2. AI-Generated Short Clips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedVideo.clips.map((clip) => (
              <div key={clip.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                {/* Clip Video */}
                <div className={`bg-black relative ${getAspectRatioClass(clip.aspectRatio)}`}>
                  <img 
                    src={clip.thumbnail} 
                    alt="Clip thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Platform Badge */}
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {clip.platform}
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs">{clip.duration}</span>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </button>
                  </div>

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium text-center">"{clip.caption}"</p>
                  </div>
                </div>

                {/* Clip Info */}
                <div className="p-4">
                  <h5 className="text-white font-medium mb-2">{clip.title}</h5>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Aspect: {clip.aspectRatio}</span>
                    <span>{clip.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features Highlight */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Smart Scene Detection</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Auto Captions</p>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-4 text-center">
              <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-white text-sm font-medium">Multi-Platform Format</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}