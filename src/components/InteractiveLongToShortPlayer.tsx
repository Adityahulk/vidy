import React, { useState, useEffect } from 'react';
import { Play, Pause, Clock, Target, Zap, Download, Share2 } from 'lucide-react';

// --- Demo Data (Unchanged) ---
const demoVideos = [
    { id: 1, title: 'Business Webinar', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '45:30', clips: [ { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:15', aspectRatio: '9:16', caption: 'The secret to scaling your business is not about working harder, it\'s about building systems that work for you 24/7.', platform: 'TikTok' }, { id: 4, title: 'Quick Growth Hack', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:18', aspectRatio: '9:16', caption: 'Try this marketing trick today! It increased our engagement by over 50%.', platform: 'Reels' }, { id: 2, title: 'Best Quote', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:30', aspectRatio: '16:9', caption: 'Success is not about luck. It\'s the result of preparation, hard work, and learning from failure.', platform: 'YouTube' }, { id: 5, title: 'Data Deep Dive', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:55', aspectRatio: '16:9', caption: 'The numbers that matter most are not vanity metrics, but conversion rates.', platform: 'YouTube' }, { id: 3, title: 'Action Steps', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:45', aspectRatio: '1:1', caption: 'Here are 3 concrete steps to transform your strategy and see immediate results.', platform: 'Instagram' }, { id: 8, title: 'Top 3 Takeaways', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:50', aspectRatio: '1:1', caption: 'What you need to remember from our 45-minute talk, all in under a minute.', platform: 'Facebook' }, ] },
    { id: 2, title: 'Podcast Interview', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '1:20:15', clips: [ { id: 10, title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:12', aspectRatio: '9:16', caption: 'This one moment changed everything for me, and it might for you too.', platform: 'TikTok' }, { id: 11, title: 'Expert Advice', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:25', aspectRatio: '16:9', caption: 'Here\'s the biggest mistake most people make in this industry.', platform: 'YouTube' }, { id: 12, title: 'Personal Story', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:35', aspectRatio: '1:1', caption: 'My biggest failure taught me the most important lesson about resilience.', platform: 'Instagram' }, ] },
];

const getAspectRatioClass = (ratio) => {
  switch (ratio) {
    case '9:16': return 'aspect-[9/16] max-w-[300px]';
    case '1:1': return 'aspect-square max-w-[450px]';
    case '16:9': return 'aspect-video';
    default: return 'aspect-video';
  }
};

interface InteractiveLongToShortPlayerProps { isPreview?: boolean; }

export default function InteractiveLongToShortPlayer({ isPreview = false }: InteractiveLongToShortPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedClip, setSelectedClip] = useState(demoVideos[0].clips[0]);

  useEffect(() => {
    // When the source video changes, select the first clip from the new video
    if (selectedVideo?.clips?.length > 0) {
      setSelectedClip(selectedVideo.clips[0]);
    } else {
      setSelectedClip(null);
    }
  }, [selectedVideo]);

  const handleVideoSelect = (video) => { if (isPreview) return; setSelectedVideo(video); setIsPlaying(false); };
  const handlePlayPause = () => { if (isPreview) return; setIsPlaying(!isPlaying); };

  return (
    <div className="space-y-12">
      {/* SECTION 1: Source Video Selection */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">
            <span className="text-slate-500 font-normal">Step 1:</span> Select Your Long-Form Video
        </h4>
        <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 flex flex-col md:flex-row">
            <div className="flex-1"><div className="aspect-video bg-black relative">
                <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2"><h5 className="text-white font-medium text-sm">{selectedVideo.title}</h5><p className="text-slate-300 text-xs">{selectedVideo.duration}</p></div>
                <div className="absolute inset-0 flex items-center justify-center"><button onClick={handlePlayPause} className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300">{isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}</button></div>
            </div></div>
            <div className="w-full md:w-48 bg-black/80 flex flex-row md:flex-col md:space-y-2 p-2 border-t md:border-t-0 md:border-l border-slate-800 overflow-x-auto">
              {demoVideos.map((video) => (<button key={video.id} onClick={() => handleVideoSelect(video)} disabled={isPreview} className={`relative rounded-lg overflow-hidden transition-all duration-300 group shrink-0 w-32 md:w-full ${selectedVideo.id === video.id ? 'ring-2 ring-blue-500' : isPreview ? '' : 'hover:opacity-80'}`}><img src={video.thumbnail} alt={video.title} className="w-full h-20 object-cover" /><div className="absolute inset-0 bg-black/40" /><div className="absolute bottom-1 left-1 bg-black/70 rounded px-1 py-0.5"><span className="text-white text-xs">{video.duration}</span></div>{selectedVideo.id === video.id && (<div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center"><div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"><Play className="w-3 h-3 text-white ml-0.5" /></div></div>)}</button>))}
            </div>
        </div>
      </div>

      {/* SECTION 2: AI Generated Clips */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">
          <span className="text-slate-500 font-normal">Step 2:</span> Review Your AI-Generated Clips
        </h4>

        {/* Featured Clip "Stage" */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* The Main Preview */}
            <div className="lg:col-span-2 bg-slate-900/50 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
                {selectedClip ? (
                    <div className={`relative shadow-2xl shadow-black rounded-lg overflow-hidden mx-auto ${getAspectRatioClass(selectedClip.aspectRatio)}`}>
                        <img src={selectedClip.thumbnail} alt={selectedClip.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"><Play className="w-8 h-8 text-white ml-1" /></button>
                        </div>
                    </div>
                ) : <p>No clip selected.</p>}
            </div>

            {/* Clip Details & Actions */}
            <div className="space-y-4">
              {selectedClip ? (
                <>
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded text-sm font-medium inline-block">{selectedClip.platform}</div>
                  <h3 className="text-2xl font-bold text-white">{selectedClip.title}</h3>
                  <p className="text-slate-300 text-base leading-relaxed">"{selectedClip.caption}"</p>
                  <div className="flex space-x-4 pt-4">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"><Download className="w-4 h-4"/> Download</button>
                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"><Share2 className="w-4 h-4"/> Share</button>
                  </div>
                </>
              ) : <p>Select a clip below to see its details.</p>}
            </div>
        </div>

        {/* Filmstrip Navigator */}
        <div className="mt-8">
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {selectedVideo.clips.map(clip => (
                    <button
                        key={clip.id}
                        onClick={() => setSelectedClip(clip)}
                        disabled={isPreview}
                        className={`relative shrink-0 w-40 h-24 rounded-lg overflow-hidden outline-none transition-all duration-300 ${
                            selectedClip?.id === clip.id
                                ? 'ring-4 ring-blue-500'
                                : 'ring-2 ring-transparent hover:ring-slate-500/50'
                        }`}
                    >
                        <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40"></div>
                        <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1.5 py-0.5"><span className="text-white text-xs font-semibold">{clip.duration}</span></div>
                    </button>
                ))}
            </div>
        </div>
      </div>

       {/* Features Highlight (Unchanged) */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Target className="w-6 h-6 text-blue-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Smart Scene Detection</p></div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">AI-Powered Captions</p></div>
        <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Zap className="w-6 h-6 text-green-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Multi-Platform Formatting</p></div>
      </div>
    </div>
  );
}