import React, { useState, useMemo, useEffect } from 'react';
import { Play, Pause, Clock, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Expanded Demo Data ---
const demoVideos = [
  {
    id: 1,
    title: 'Business Webinar',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:30',
    clips: [
      // 9:16 Clips (TikTok, Reels)
      { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:15', aspectRatio: '9:16', caption: 'The secret to scaling your business...', platform: 'TikTok' },
      { id: 4, title: 'Quick Growth Hack', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:18', aspectRatio: '9:16', caption: 'Try this marketing trick today!', platform: 'TikTok' },
      // 16:9 Clips (YouTube Shorts)
      { id: 2, title: 'Best Quote', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:30', aspectRatio: '16:9', caption: 'Success is not about luck...', platform: 'YouTube' },
      { id: 5, title: 'Data Deep Dive', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:55', aspectRatio: '16:9', caption: 'The numbers that matter most.', platform: 'YouTube' },
      { id: 6, title: 'Core Concept', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:42', aspectRatio: '16:9', caption: 'Understanding the customer journey.', platform: 'YouTube' },
      { id: 7, title: 'Mistakes to Avoid', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:38', aspectRatio: '16:9', caption: 'Don\'t fall into these common traps.', platform: 'YouTube' },
      // 1:1 Clips (Instagram, Facebook)
      { id: 3, title: 'Action Steps', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:45', aspectRatio: '1:1', caption: '3 steps to transform your strategy.', platform: 'Instagram' },
      { id: 8, title: 'Top 3 Takeaways', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:50', aspectRatio: '1:1', caption: 'What you need to remember.', platform: 'Instagram' },
      { id: 9, title: 'Interactive Poll', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:20', aspectRatio: '1:1', caption: 'What is your biggest challenge?', platform: 'Instagram' },
    ]
  },
  {
    id: 2,
    title: 'Podcast Interview',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '1:20:15',
    clips: [
        { id: 1, title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:12', aspectRatio: '9:16', caption: 'This changed everything for me...', platform: 'TikTok' },
        { id: 2, title: 'Expert Advice', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:25', aspectRatio: '16:9', caption: 'Here\'s what most people get wrong.', platform: 'YouTube' },
        { id: 3, title: 'Personal Story', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:35', aspectRatio: '1:1', caption: 'My biggest failure taught me...', platform: 'Instagram' },
        { id: 4, title: 'Controversial Opinion', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:28', aspectRatio: '16:9', caption: 'An unpopular but true statement.', platform: 'YouTube' }
    ]
  },
  {
    id: 3,
    title: 'Conference Talk',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '32:45',
    clips: [
        { id: 1, title: 'Opening Hook', thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:18', aspectRatio: '9:16', caption: 'What if I told you everything...', platform: 'TikTok' },
        { id: 2, title: 'Main Point', thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:40', aspectRatio: '16:9', caption: 'The future of technology is here.', platform: 'YouTube' },
        { id: 3, title: 'Call to Action', thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300', duration: '0:22', aspectRatio: '1:1', caption: 'Start implementing this today.', platform: 'Instagram' }
    ]
  }
];

const getAspectRatioClass = (ratio) => {
  switch (ratio) {
    case '9:16': return 'aspect-[9/16]';
    case '1:1': return 'aspect-square';
    case '16:9': return 'aspect-video';
    default: return 'aspect-video';
  }
};

// --- Reusable Clip Card Component ---
const ClipCard = ({ clip }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
    <div className={`bg-black relative ${getAspectRatioClass(clip.aspectRatio)}`}>
      <img
        src={clip.thumbnail}
        alt="Clip thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
        {clip.platform}
      </div>
      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
        <span className="text-white text-xs">{clip.duration}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
          <Play className="w-6 h-6 text-white ml-0.5" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <p className="text-white text-sm font-medium text-center">"{clip.caption}"</p>
      </div>
    </div>
    <div className="p-4">
      <h5 className="text-white font-medium mb-2 truncate">{clip.title}</h5>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Aspect: {clip.aspectRatio}</span>
        <span>{clip.duration}</span>
      </div>
    </div>
  </div>
);

interface InteractiveLongToShortPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLongToShortPlayer({ isPreview = false }: InteractiveLongToShortPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [clipIndices, setClipIndices] = useState({ '9:16': 0, '16:9': 0, '1:1': 0 });

  // Reset clip pagination when the main video changes
  useEffect(() => {
    setClipIndices({ '9:16': 0, '16:9': 0, '1:1': 0 });
  }, [selectedVideo.id]);

  const handleVideoSelect = (video) => {
    if (isPreview) return;
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPreview) return;
    setIsPlaying(!isPlaying);
  };

  // Group clips by aspect ratio
  const groupedClips = useMemo(() => {
    return selectedVideo.clips.reduce((acc, clip) => {
      const { aspectRatio } = clip;
      if (!acc[aspectRatio]) {
        acc[aspectRatio] = [];
      }
      acc[aspectRatio].push(clip);
      return acc;
    }, {});
  }, [selectedVideo]);

  const itemsPerPage = { '9:16': 1, '16:9': 3, '1:1': 2 };

  const handleClipNavigation = (aspectRatio, direction) => {
    if (isPreview) return;
    const clips = groupedClips[aspectRatio] || [];
    const perPage = itemsPerPage[aspectRatio];
    const pageCount = Math.ceil(clips.length / perPage);

    setClipIndices(prev => {
      const currentIndex = prev[aspectRatio];
      let newIndex = currentIndex;
      if (direction === 'next') {
        newIndex = Math.min(currentIndex + 1, pageCount - 1);
      } else {
        newIndex = Math.max(currentIndex - 1, 0);
      }
      return { ...prev, [aspectRatio]: newIndex };
    });
  };

  const ratioMetadata = {
    '9:16': { title: 'TikTok & Reels' },
    '16:9': { title: 'YouTube' },
    '1:1': { title: 'Instagram & Facebook' },
  };

  return (
    <div className="space-y-8">
      {/* Original Video Selection */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Long-Form Video</h4>
        <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800">
          <div className="flex">
            {/* Main Video Player */}
            <div className="flex-1">
              <div className="aspect-video bg-black relative overflow-hidden">
                <img
                  src={selectedVideo.thumbnail}
                  alt="Selected video"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                  <h5 className="text-white font-medium text-sm">{selectedVideo.title}</h5>
                  <p className="text-slate-300 text-xs">{selectedVideo.duration}</p>
                </div>
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
            <div className="w-40 bg-black/80 flex flex-col space-y-2 p-2 border-l border-slate-800">
              {demoVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  disabled={isPreview}
                  className={`relative rounded-lg overflow-hidden transition-all duration-300 group ${
                    selectedVideo.id === video.id
                      ? 'ring-2 ring-blue-500'
                      : isPreview ? '' : 'hover:ring-1 hover:ring-white/50'
                  }`}
                >
                  <img
                    src={video.thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-20 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute bottom-1 left-1 bg-black/70 rounded px-1 py-0.5">
                    <span className="text-white text-xs">{video.duration}</span>
                  </div>
                  {selectedVideo.id === video.id && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
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
      </div>

      {/* Generated Clips */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">AI-Generated Short Clips</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(ratioMetadata).map((ratio) => {
            const clips = groupedClips[ratio] || [];
            if (clips.length === 0) return <div key={ratio} />; // Render empty div to maintain grid structure
            
            const perPage = itemsPerPage[ratio];
            const currentIndex = clipIndices[ratio];
            const pageCount = Math.ceil(clips.length / perPage);
            const visibleClips = clips.slice(currentIndex * perPage, (currentIndex + 1) * perPage);
            
            return (
              <div key={ratio}>
                <div className="flex justify-between items-center mb-4 min-h-[2rem]">
                  <h5 className="text-lg font-semibold text-white">{ratioMetadata[ratio].title}</h5>
                  {pageCount > 1 && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleClipNavigation(ratio, 'prev')}
                        disabled={currentIndex === 0 || isPreview}
                        className="p-1.5 rounded-full bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handleClipNavigation(ratio, 'next')}
                        disabled={currentIndex >= pageCount - 1 || isPreview}
                        className="p-1.5 rounded-full bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {visibleClips.map((clip) => (
                    <ClipCard key={clip.id} clip={clip} />
                  ))}
                </div>
              </div>
            );
          })}
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
    </div>
  );
}