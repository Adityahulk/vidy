import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Business Webinar',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:30',
    clips: {
      '9:16': [
        { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:15', caption: 'The secret to scaling your business...', platform: 'TikTok' },
        { id: 2, title: 'Expert Tip', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:18', caption: 'Most entrepreneurs miss this...', platform: 'Instagram Reels' }
      ],
      '16:9': [
        { id: 5, title: 'Full Explanation', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:45', caption: 'Complete business strategy breakdown', platform: 'YouTube Shorts' },
        { id: 6, title: 'Case Study', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:38', caption: 'Real client transformation', platform: 'LinkedIn' }
      ],
      '1:1': [
        { id: 10, title: 'Instagram Post', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:25', caption: 'Quick business tip', platform: 'Instagram' }
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
        { id: 13, title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:12', caption: 'This changed everything for me...', platform: 'TikTok' }
      ],
      '16:9': [
        { id: 16, title: 'Expert Advice', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:55', caption: 'Here\'s what most people get wrong', platform: 'YouTube Shorts' }
      ],
      '1:1': [
        { id: 20, title: 'Quote Card', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:15', caption: 'Wisdom in 15 seconds', platform: 'Instagram' }
      ]
    }
  }
];

const aspectRatios = [
  { key: '9:16', label: 'Vertical (9:16)' },
  { key: '16:9', label: 'Horizontal (16:9)' },
  { key: '1:1', label: 'Square (1:1)' }
];

export default function InteractiveLongToShortPlayer() {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeAspect, setActiveAspect] = useState('9:16');

  const handlePlayPause = () => setIsPlaying(!isPlaying);

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case '9:16': return 'aspect-[9/16] w-36';
      case '16:9': return 'aspect-video w-48';
      case '1:1': return 'aspect-square w-40';
      default: return 'aspect-video w-48';
    }
  };

  const clips = selectedVideo.clips[activeAspect as keyof typeof selectedVideo.clips];

  return (
    <div className="space-y-6">
      {/* Long Video Player */}
      <div className="relative bg-black rounded-xl overflow-hidden flex">
        <div className="flex-1">
          <div className="aspect-video relative">
            <img
              src={selectedVideo.thumbnail}
              alt="Selected video"
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
        </div>

        {/* Video Thumbnails Sidebar */}
        <div className="w-28 bg-black/80 flex flex-col space-y-2 p-2">
          {demoVideos.map((video) => (
            <button
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              className={`relative rounded overflow-hidden ${selectedVideo.id === video.id ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-white/50'}`}
            >
              <img src={video.thumbnail} alt="" className="w-full h-20 object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Aspect Ratio Tabs */}
      <div className="flex space-x-4 border-b border-slate-700 pb-2">
        {aspectRatios.map((ratio) => (
          <button
            key={ratio.key}
            onClick={() => setActiveAspect(ratio.key)}
            className={`pb-2 ${activeAspect === ratio.key ? 'text-blue-500 border-b-2 border-blue-500' : 'text-slate-400'}`}
          >
            {ratio.label}
          </button>
        ))}
      </div>

      {/* Clips Carousel */}
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
          {clips.map((clip) => (
            <div
              key={clip.id}
              className="bg-slate-800/50 rounded-xl overflow-hidden min-w-[10rem]"
            >
              <div className={`bg-black relative ${getAspectRatioClass(activeAspect)}`}>
                <img src={clip.thumbnail} alt="clip" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-white text-sm font-medium">{clip.title}</p>
                <p className="text-slate-400 text-xs">{clip.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
