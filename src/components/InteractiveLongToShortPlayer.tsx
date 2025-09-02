import React, { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Business Webinar',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:30',
    clips: {
      '9:16': [
        { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:15', platform: 'TikTok' },
        { id: 2, title: 'Expert Tip', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:18', platform: 'Instagram Reels' }
      ],
      '16:9': [
        { id: 5, title: 'Full Explanation', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:45', platform: 'YouTube Shorts' },
        { id: 6, title: 'Case Study', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:38', platform: 'LinkedIn' }
      ],
      '1:1': [
        { id: 10, title: 'Instagram Post', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:25', platform: 'Instagram' }
      ]
    }
  },
  {
    id: 2,
    title: 'Podcast Interview',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '1:20:15',
    clips: {
      '9:16': [
        { id: 13, title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:12', platform: 'TikTok' }
      ],
      '16:9': [
        { id: 16, title: 'Expert Advice', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:55', platform: 'YouTube Shorts' }
      ],
      '1:1': [
        { id: 20, title: 'Quote Card', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:15', platform: 'Instagram' }
      ]
    }
  }
];

const aspectRatios = [
  { key: '9:16', label: 'Vertical (9:16)' },
  { key: '16:9', label: 'Horizontal (16:9)' },
  { key: '1:1', label: 'Square (1:1)' }
];

export default function PremiumDemoLayout() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAspect, setActiveAspect] = useState('9:16');

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const clips = selectedVideo.clips[activeAspect as keyof typeof selectedVideo.clips];

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      {/* Main Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden shadow-lg">
        <div className="aspect-video relative">
          <img
            src={selectedVideo.thumbnail}
            alt={selectedVideo.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayPause}
              className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70"
            >
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
          {selectedVideo.title} • {selectedVideo.duration}
        </div>
      </div>

      {/* Aspect Ratio Tabs */}
      <div className="flex space-x-4 justify-center border-b border-slate-700 pb-3">
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.key}
            onClick={() => setActiveAspect(ratio.key)}
            className={`pb-2 px-4 text-sm font-medium transition ${
              activeAspect === ratio.key ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            {ratio.label}
          </button>
        ))}
      </div>

      {/* Clip Carousel with Arrows */}
      <div className="relative">
        <div className="flex items-center">
          <button className="absolute left-0 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70">
            <ChevronLeft className="text-white w-6 h-6" />
          </button>
          <div className="flex overflow-x-auto space-x-4 px-10 scrollbar-hide">
            {clips.map((clip) => (
              <div key={clip.id} className="bg-slate-900 rounded-xl overflow-hidden min-w-[180px] shadow">
                <div className="relative aspect-[9/16] w-40">
                  <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40">
                      <Play className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-white text-sm font-medium">{clip.title}</p>
                  <p className="text-slate-400 text-xs">{clip.duration} • {clip.platform}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute right-0 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70">
            <ChevronRight className="text-white w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Video Thumbnails Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {demoVideos.map((video) => (
          <button
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className={`relative rounded-xl overflow-hidden shadow-lg hover:scale-105 transition ${
              selectedVideo.id === video.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img src={video.thumbnail} alt={video.title} className="w-full h-28 object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-end p-2 text-white text-xs font-medium">
              {video.title}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
