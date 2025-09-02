import React, { useState } from 'react';
import { Play, Pause, Clock, Target, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Business Webinar',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:30',
    clips: {
      '9:16': [
        {
          id: 1,
          title: 'Key Insight #1',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:15',
          caption: 'The secret to scaling your business...',
          platform: 'TikTok'
        },
        {
          id: 2,
          title: 'Expert Tip',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:18',
          caption: 'Most entrepreneurs miss this...',
          platform: 'Instagram Reels'
        },
        {
          id: 3,
          title: 'Success Story',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:22',
          caption: 'How we grew 300% in 6 months',
          platform: 'TikTok'
        },
        {
          id: 4,
          title: 'Common Mistake',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:16',
          caption: 'Avoid this costly error...',
          platform: 'YouTube Shorts'
        }
      ],
      '16:9': [
        {
          id: 5,
          title: 'Full Explanation',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:45',
          caption: 'Complete business strategy breakdown',
          platform: 'YouTube Shorts'
        },
        {
          id: 6,
          title: 'Case Study',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:38',
          caption: 'Real client transformation',
          platform: 'LinkedIn'
        },
        {
          id: 7,
          title: 'Q&A Highlight',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:52',
          caption: 'Answering the tough questions',
          platform: 'YouTube Shorts'
        },
        {
          id: 8,
          title: 'Action Steps',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:41',
          caption: 'What to do next',
          platform: 'Facebook'
        },
        {
          id: 9,
          title: 'Key Takeaway',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:35',
          caption: 'The most important lesson',
          platform: 'LinkedIn'
        }
      ],
      '1:1': [
        {
          id: 10,
          title: 'Instagram Post',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:25',
          caption: 'Quick business tip',
          platform: 'Instagram'
        },
        {
          id: 11,
          title: 'Social Quote',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:20',
          caption: 'Motivational moment',
          platform: 'Instagram'
        },
        {
          id: 12,
          title: 'Behind Scenes',
          thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:30',
          caption: 'Personal insight',
          platform: 'Instagram'
        }
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
        {
          id: 13,
          title: 'Viral Moment',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:12',
          caption: 'This changed everything for me...',
          platform: 'TikTok'
        },
        {
          id: 14,
          title: 'Life Lesson',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:19',
          caption: 'What I wish I knew at 25',
          platform: 'Instagram Reels'
        },
        {
          id: 15,
          title: 'Career Advice',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:21',
          caption: 'How to find your passion',
          platform: 'TikTok'
        }
      ],
      '16:9': [
        {
          id: 16,
          title: 'Expert Advice',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:55',
          caption: 'Here\'s what most people get wrong',
          platform: 'YouTube Shorts'
        },
        {
          id: 17,
          title: 'Deep Dive',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:48',
          caption: 'The psychology behind success',
          platform: 'LinkedIn'
        },
        {
          id: 18,
          title: 'Industry Insight',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:42',
          caption: 'Future of the industry',
          platform: 'YouTube Shorts'
        },
        {
          id: 19,
          title: 'Personal Story',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:39',
          caption: 'My biggest failure taught me...',
          platform: 'Facebook'
        }
      ],
      '1:1': [
        {
          id: 20,
          title: 'Quote Card',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:15',
          caption: 'Wisdom in 15 seconds',
          platform: 'Instagram'
        },
        {
          id: 21,
          title: 'Quick Tip',
          thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:18',
          caption: 'Daily motivation',
          platform: 'Instagram'
        }
      ]
    }
  },
  {
    id: 3,
    title: 'Conference Talk',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '32:45',
    clips: {
      '9:16': [
        {
          id: 22,
          title: 'Opening Hook',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:18',
          caption: 'What if I told you everything you know is wrong?',
          platform: 'TikTok'
        },
        {
          id: 23,
          title: 'Mind Blown',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:14',
          caption: 'This will change your perspective',
          platform: 'Instagram Reels'
        }
      ],
      '16:9': [
        {
          id: 24,
          title: 'Main Point',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:40',
          caption: 'The future of technology is here',
          platform: 'YouTube Shorts'
        },
        {
          id: 25,
          title: 'Demo Highlight',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:35',
          caption: 'Live demonstration',
          platform: 'LinkedIn'
        },
        {
          id: 26,
          title: 'Audience Reaction',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:28',
          caption: 'The crowd goes wild',
          platform: 'YouTube Shorts'
        }
      ],
      '1:1': [
        {
          id: 27,
          title: 'Key Quote',
          thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          duration: '0:12',
          caption: 'Innovation starts with imagination',
          platform: 'Instagram'
        }
      ]
    }
  }
];

interface InteractiveLongToShortPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveLongToShortPlayer({ isPreview = false }: InteractiveLongToShortPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPages, setCurrentPages] = useState({
    '9:16': 0,
    '16:9': 0,
    '1:1': 0
  });

  const handleVideoSelect = (video: typeof demoVideos[0]) => {
    if (isPreview) return;
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentPages({ '9:16': 0, '16:9': 0, '1:1': 0 });
  };

  const handlePlayPause = () => {
    if (isPreview) return;
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

  const getClipsPerPage = (ratio: string) => {
    switch (ratio) {
      case '9:16': return 1;
      case '16:9': return 2;
      case '1:1': return 2;
      default: return 1;
    }
  };

  const getGridClass = (ratio: string) => {
    switch (ratio) {
      case '9:16': return 'flex justify-center';
      case '16:9': return 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto';
      case '1:1': return 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto';
      default: return 'flex justify-center';
    }
  };

  const handlePageChange = (ratio: string, direction: 'prev' | 'next') => {
    if (isPreview) return;
    
    const clips = selectedVideo.clips[ratio as keyof typeof selectedVideo.clips];
    const clipsPerPage = getClipsPerPage(ratio);
    const totalPages = Math.ceil(clips.length / clipsPerPage);
    
    setCurrentPages(prev => ({
      ...prev,
      [ratio]: direction === 'next' 
        ? Math.min(prev[ratio as keyof typeof prev] + 1, totalPages - 1)
        : Math.max(prev[ratio as keyof typeof prev] - 1, 0)
    }));
  };

  const getPaginatedClips = (ratio: string) => {
    const clips = selectedVideo.clips[ratio as keyof typeof selectedVideo.clips];
    const clipsPerPage = getClipsPerPage(ratio);
    const currentPage = currentPages[ratio as keyof typeof currentPages];
    const startIndex = currentPage * clipsPerPage;
    return clips.slice(startIndex, startIndex + clipsPerPage);
  };

  const getTotalPages = (ratio: string) => {
    const clips = selectedVideo.clips[ratio as keyof typeof selectedVideo.clips];
    const clipsPerPage = getClipsPerPage(ratio);
    return Math.ceil(clips.length / clipsPerPage);
  };

  const getTotalClips = () => {
    return Object.values(selectedVideo.clips).reduce((total, clips) => total + clips.length, 0);
  };

  return (
    <div className="space-y-8">
      {/* Original Video Selection */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Long-Form Video</h4>
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
            <div className="w-24 sm:w-28 lg:w-32 bg-black/80 flex flex-col space-y-2 p-2">
              {demoVideos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSelect(video)}
                  disabled={isPreview}
                  className={`relative rounded overflow-hidden transition-all duration-300 ${
                    selectedVideo.id === video.id 
                      ? 'ring-2 ring-blue-500' 
                      : isPreview ? '' : 'hover:ring-1 hover:ring-white/50'
                  }`}
                >
                  <img 
                    src={video.thumbnail} 
                    alt="Video thumbnail"
                    className="w-full h-16 sm:h-18 lg:h-20 object-cover"
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
      </div>

      {/* Generated Clips by Aspect Ratio */}
      <div>
        <h4 className="text-xl font-bold text-white mb-6">AI-Generated Short Clips ({getTotalClips()} total clips)</h4>
        
        {/* 9:16 Vertical Clips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-white">Vertical Clips (9:16) - {selectedVideo.clips['9:16'].length} clips</h5>
            {getTotalPages('9:16') > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange('9:16', 'prev')}
                  disabled={isPreview || currentPages['9:16'] === 0}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-slate-400 text-sm">
                  {currentPages['9:16'] + 1} / {getTotalPages('9:16')}
                </span>
                <button
                  onClick={() => handlePageChange('9:16', 'next')}
                  disabled={isPreview || currentPages['9:16'] === getTotalPages('9:16') - 1}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
          <div className={getGridClass('9:16')}>
            {getPaginatedClips('9:16').map((clip) => (
              <div key={clip.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 w-80 max-w-sm">
                <div className={`bg-black relative ${getAspectRatioClass('9:16')}`}>
                  <img 
                    src={clip.thumbnail} 
                    alt="Clip thumbnail"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {clip.platform}
                  </div>

                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs">{clip.duration}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium text-center">"{clip.caption}"</p>
                  </div>
                </div>

                <div className="p-3">
                  <h6 className="text-white font-medium mb-2">{clip.title}</h6>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>9:16</span>
                    <span>{clip.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 16:9 Horizontal Clips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-white">Horizontal Clips (16:9) - {selectedVideo.clips['16:9'].length} clips (2 per page)</h5>
            {getTotalPages('16:9') > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange('16:9', 'prev')}
                  disabled={isPreview || currentPages['16:9'] === 0}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-slate-400 text-sm">
                  {currentPages['16:9'] + 1} / {getTotalPages('16:9')}
                </span>
                <button
                  onClick={() => handlePageChange('16:9', 'next')}
                  disabled={isPreview || currentPages['16:9'] === getTotalPages('16:9') - 1}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
          <div className={getGridClass('16:9')}>
            {getPaginatedClips('16:9').map((clip) => (
              <div key={clip.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className={`bg-black relative ${getAspectRatioClass('16:9')}`}>
                  <img 
                    src={clip.thumbnail} 
                    alt="Clip thumbnail"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {clip.platform}
                  </div>

                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs">{clip.duration}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium text-center">"{clip.caption}"</p>
                  </div>
                </div>

                <div className="p-3">
                  <h6 className="text-white font-medium mb-2">{clip.title}</h6>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>16:9</span>
                    <span>{clip.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1:1 Square Clips */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold text-white">Square Clips (1:1) - {selectedVideo.clips['1:1'].length} clips</h5>
            {getTotalPages('1:1') > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange('1:1', 'prev')}
                  disabled={isPreview || currentPages['1:1'] === 0}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="text-slate-400 text-sm">
                  {currentPages['1:1'] + 1} / {getTotalPages('1:1')}
                </span>
                <button
                  onClick={() => handlePageChange('1:1', 'next')}
                  disabled={isPreview || currentPages['1:1'] === getTotalPages('1:1') - 1}
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
          </div>
          <div className={getGridClass('1:1')}>
            {getPaginatedClips('1:1').map((clip) => (
              <div key={clip.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
                <div className={`bg-black relative ${getAspectRatioClass('1:1')}`}>
                  <img 
                    src={clip.thumbnail} 
                    alt="Clip thumbnail"
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                    {clip.platform}
                  </div>

                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                    <span className="text-white text-xs">{clip.duration}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-6 h-6 text-white ml-0.5" />
                    </button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <p className="text-white text-sm font-medium text-center">"{clip.caption}"</p>
                  </div>
                </div>

                <div className="p-3">
                  <h6 className="text-white font-medium mb-2">{clip.title}</h6>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>1:1</span>
                    <span>{clip.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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