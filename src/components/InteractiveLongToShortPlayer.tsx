import React, { useState, useMemo, useEffect } from 'react';
import { Play, Pause, Clock, Target, Zap } from 'lucide-react';

// --- Demo Data (Unchanged) ---
const demoVideos = [
    { id: 1, title: 'Business Webinar', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '45:30', clips: [ { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:15', aspectRatio: '16:9', caption: 'The secret to scaling your business is not about working harder, it\'s about building systems that work for you 24/7.', platform: 'TikTok' }, { id: 4, title: 'Quick Growth Hack', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:18', aspectRatio: '16:9', caption: 'Try this marketing trick today! It increased our engagement by over 50%.', platform: 'Reels' }, { id: 15, title: 'Another Vertical Clip', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:22', aspectRatio: '16:9', caption: 'Here is another key takeaway for vertical platforms.', platform: 'Shorts' }, { id: 2, title: 'Best Quote', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:30', aspectRatio: '9:16', caption: 'Success is not about luck. It\'s the result of preparation, hard work, and learning from failure.', platform: 'YouTube' }, { id: 5, title: 'Data Deep Dive', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:55', aspectRatio: '9:16', caption: 'The numbers that matter most are not vanity metrics, but conversion rates.', platform: 'YouTube' }, { id: 3, title: 'Action Steps', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:45', aspectRatio: '1:1', caption: 'Here are 3 concrete steps to transform your strategy and see immediate results.', platform: 'Instagram' }, { id: 8, title: 'Top 3 Takeaways', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:50', aspectRatio: '1:1', caption: 'What you need to remember from our 45-minute talk, all in under a minute.', platform: 'Facebook' }, ] },
  { id: 1, title: 'Business Webinar', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '45:30', clips: [ { id: 1, title: 'Key Insight #1', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:15', aspectRatio: '16:9', caption: 'The secret to scaling your business is not about working harder, it\'s about building systems that work for you 24/7.', platform: 'TikTok' }, { id: 4, title: 'Quick Growth Hack', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:18', aspectRatio: '16:9', caption: 'Try this marketing trick today! It increased our engagement by over 50%.', platform: 'Reels' }, { id: 15, title: 'Another Vertical Clip', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:22', aspectRatio: '16:9', caption: 'Here is another key takeaway for vertical platforms.', platform: 'Shorts' }, { id: 2, title: 'Best Quote', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:30', aspectRatio: '9:16', caption: 'Success is not about luck. It\'s the result of preparation, hard work, and learning from failure.', platform: 'YouTube' }, { id: 5, title: 'Data Deep Dive', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:55', aspectRatio: '9:16', caption: 'The numbers that matter most are not vanity metrics, but conversion rates.', platform: 'YouTube' }, { id: 3, title: 'Action Steps', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:45', aspectRatio: '1:1', caption: 'Here are 3 concrete steps to transform your strategy and see immediate results.', platform: 'Instagram' }, { id: 8, title: 'Top 3 Takeaways', thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:50', aspectRatio: '1:1', caption: 'What you need to remember from our 45-minute talk, all in under a minute.', platform: 'Facebook' }, ] },
    { id: 2, title: 'Podcast Interview', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '1:20:15', clips: [ { id: 10, title: 'Viral Moment', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:12', aspectRatio: '9:16', caption: 'This one moment changed everything for me, and it might for you too.', platform: 'TikTok' }, { id: 11, title: 'Expert Advice', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:25', aspectRatio: '16:9', caption: 'Here\'s the biggest mistake most people make in this industry.', platform: 'YouTube' }, { id: 12, title: 'Personal Story', thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400', duration: '0:35', aspectRatio: '1:1', caption: 'My biggest failure taught me the most important lesson about resilience.', platform: 'Instagram' }, ] },
];

// --- CHANGE HIGHLIGHT #1 ---
// Added `mx-auto` back to center the vertical and square previews.
const ASPECT_RATIO_INFO = {
    '9:16': { label: 'Vertical (TikTok, Reels)', className: 'aspect-[9/16] max-w-[320px] mx-auto' },
    '1:1': { label: 'Square (Instagram, Facebook)', className: 'aspect-square max-w-[500px] mx-auto' },
    '16:9': { label: 'Widescreen (YouTube)', className: 'aspect-video' },
};

interface InteractiveLongToShortPlayerProps { isPreview?: boolean; }

export default function InteractiveLongToShortPlayer({ isPreview = false }: InteractiveLongToShortPlayerProps) {
    const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedClip, setSelectedClip] = useState(demoVideos[0].clips[0]);

    const groupedClips = useMemo(() => {
        const groups = { '16:9': [], '9:16': [], '1:1': [] }; // Pre-define order
        selectedVideo.clips.forEach(clip => {
            if (groups[clip.aspectRatio]) {
                groups[clip.aspectRatio].push(clip);
            }
        });
        return groups;
    }, [selectedVideo]);

    useEffect(() => {
        setSelectedClip(selectedVideo.clips[0] || null);
    }, [selectedVideo]);

    const handleVideoSelect = (video) => { if (isPreview) return; setSelectedVideo(video); setIsPlaying(false); };
    const handlePlayPause = () => { if (isPreview) return; setIsPlaying(!isPlaying); };

    return (
        <div className="space-y-12">
            {/* SECTION 1: Source Video Selection */}
            <div>
                <h4 className="text-2xl font-bold text-white mb-4">Source Video</h4>
                
                <div className="grid grid-cols-3 gap-4">
                    {demoVideos.map((video) => (
                        <button
                            key={video.id}
                            onClick={() => handleVideoSelect(video)}
                            disabled={isPreview}
                            className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                                selectedVideo.id === video.id 
                                    ? 'ring-2 ring-blue-500 scale-105' 
                                    : isPreview ? '' : 'hover:ring-1 hover:ring-white/50 hover:scale-102'
                            }`}
                        >
                            <img 
                                src={video.thumbnail} 
                                alt={video.title}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                <div className="p-3 w-full">
                                    <h5 className="text-white font-medium text-sm">{video.title}</h5>
                                    <p className="text-slate-300 text-xs">Duration: {video.duration}</p>
                                </div>
                            </div>
                            {selectedVideo.id === video.id && (
                                <div className="absolute top-2 right-2">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <Play className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Video Player */}
            <div>
                <h4 className="text-xl font-bold text-white mb-4">Selected Video</h4>
                <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 flex flex-col md:flex-row">
                    <div className="w-full"><div className="aspect-video bg-black relative">
                        <img src={selectedVideo.thumbnail} alt={selectedVideo.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2"><h5 className="text-white font-medium text-sm">{selectedVideo.title}</h5><p className="text-slate-300 text-xs">{selectedVideo.duration}</p></div>
                        <div className="absolute inset-0 flex items-center justify-center"><button onClick={handlePlayPause} className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300">{isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}</button></div>
                    </div></div>
                </div>
            </div>

            {/* SECTION 2: AI Generated Clips */}
            <div>
                <h4 className="text-2xl font-bold text-white mb-4">AI-Generated Clips</h4>
                {/* --- CHANGE HIGHLIGHT #2 ---
                  Reduced the gap from `gap-8` to `gap-6`.
                */}
                <div className="grid lg:grid-cols-[22rem_1fr] lg:items-start gap-6">
                    {/* Column 1: The "Smart Sidebar" Navigator */}
                    <aside className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 space-y-6">
                        {Object.entries(groupedClips).map(([ratio, clips]) => {
                            if (clips.length === 0) return null;
                            return (
                                <div key={ratio}>
                                    <h5 className="font-semibold text-white mb-3">{ASPECT_RATIO_INFO[ratio].label}</h5>
                                    <div className="flex space-x-3 overflow-x-auto pb-2">
                                        {clips.map(clip => (
                                            <button
                                                key={clip.id}
                                                onClick={() => setSelectedClip(clip)}
                                                disabled={isPreview}
                                                className={`relative shrink-0 w-28 h-20 rounded-md overflow-hidden outline-none transition-all duration-200 ${
                                                    selectedClip?.id === clip.id ? 'ring-2 ring-blue-500' : 'ring-1 ring-slate-700 hover:ring-slate-500'
                                                }`}
                                            >
                                                <img src={clip.thumbnail} alt={clip.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/30"></div>
                                                <div className="absolute bottom-1 right-1 bg-black/70 rounded px-1"><span className="text-white text-xs">{clip.duration}</span></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </aside>

                    {/* Column 2: The "Main Stage" Preview */}
                    <main>
                        {selectedClip ? (
                            <div className="space-y-6">
                                <div className={`relative shadow-2xl shadow-black rounded-lg overflow-hidden ${ASPECT_RATIO_INFO[selectedClip.aspectRatio].className}`}>
                                    <img src={selectedClip.thumbnail} alt={selectedClip.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300">
                                        <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30"><Play className="w-8 h-8 text-white ml-1" /></button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold text-white">{selectedClip.title}</h3>
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium inline-block">{selectedClip.platform}</div>
                                    <p className="text-slate-300 text-base leading-relaxed">"{selectedClip.caption}"</p>
                                </div>
                            </div>
                        ) : <div className="flex items-center justify-center h-full bg-slate-900/50 rounded-xl"><p>No clips generated for this video.</p></div>}
                    </main>
                </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Target className="w-6 h-6 text-blue-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Smart Scene Detection</p></div>
                <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Clock className="w-6 h-6 text-purple-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">AI-Powered Captions</p></div>
                <div className="bg-slate-800/30 rounded-lg p-4 text-center"><Zap className="w-6 h-6 text-green-500 mx-auto mb-2" /><p className="text-white text-sm font-medium">Multi-Platform Formatting</p></div>
            </div>
        </div>
    );
}