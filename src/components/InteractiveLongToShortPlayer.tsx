import React, { useState, useMemo, useEffect } from 'react';
import YouTube from 'react-youtube'; // Import the YouTube component
import { Clock, Target, Zap } from 'lucide-react';

// --- Data Updated to use videoId ---
// I've replaced videoUrl with the 11-character ID from the YouTube URL.
const demoVideos = [
    { 
        id: 1, 
        title: 'Business Webinar',
        videoId: '2c-b_5_t_gM', // Example Video ID
        clips: [ 
            { id: 1, title: 'Key Insight #1', videoId: '2c-b_5_t_gM', aspectRatio: '16:9', caption: 'The secret to scaling your business is about building systems that work for you 24/7.', platform: 'TikTok' }, 
            { id: 2, title: 'Best Quote', videoId: '2c-b_5_t_gM', aspectRatio: '9:16', caption: 'Success is the result of preparation, hard work, and learning from failure.', platform: 'YouTube' }, 
            { id: 3, title: 'Action Steps', videoId: '2c-b_5_t_gM', aspectRatio: '1:1', caption: 'Here are 3 concrete steps to transform your strategy and see immediate results.', platform: 'Instagram' },
        ] 
    },
    { 
        id: 2, 
        title: 'Podcast Interview', 
        videoId: 'HAnw1682g0g', // Example Video ID
        clips: [ 
            { id: 10, title: 'Viral Moment', videoId: 'HAnw1682g0g', aspectRatio: '9:16', caption: 'This one moment changed everything for me, and it might for you too.', platform: 'TikTok' }, 
            { id: 11, title: 'Expert Advice', videoId: 'HAnw1682g0g', aspectRatio: '16:9', caption: 'Here\'s the biggest mistake most people make in this industry.', platform: 'YouTube' },
        ] 
    },
    { 
      id: 3, 
      title: 'YouTube Livestream', 
      videoId: 'sBws8MSXN_I', // The ID for the video you wanted
      clips: [ 
        { id: 20, title: 'Stream Highlight #1', videoId: 'sBws8MSXN_I', aspectRatio: '16:9', caption: 'A key highlight from our recent livestream event about market trends.', platform: 'YouTube' }, 
        { id: 22, title: 'Vertical Stream Cut', videoId: 'sBws8MSXN_I', aspectRatio: '9:16', caption: 'A powerful quote from the stream, perfect for Reels.', platform: 'Reels' }
      ] 
    },
];

const ASPECT_RATIO_INFO = {
    '9:16': { label: 'Vertical (TikTok, Reels)', className: 'aspect-[9/16] max-w-[320px] mx-auto', thumbnailClass: 'w-20 h-36' },
    '1:1': { label: 'Square (Instagram, Facebook)', className: 'aspect-square max-w-[500px] mx-auto', thumbnailClass: 'w-24 h-24' },
    '16:9': { label: 'Widescreen (YouTube)', className: 'aspect-video', thumbnailClass: 'w-28 h-20' },
};

export default function InteractiveLongToShortPlayer({ isPreview = false }) {
    const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
    const [selectedClip, setSelectedClip] = useState(demoVideos[0].clips[0]);

    const groupedClips = useMemo(() => {
        const groups = { '16:9': [], '9:16': [], '1:1': [] };
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

    const handleVideoSelect = (video) => { 
        if (isPreview) return; 
        setSelectedVideo(video); 
    };

    const handleClipSelect = (clip) => {
        if (isPreview) return;
        setSelectedClip(clip);
    };
    
    // YouTube player options
    const playerOptions = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1, // Autoplay the video
            controls: 1, // Show player controls
        },
    };

    // Helper to get thumbnail URL from video ID
    const getYouTubeThumbnail = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <div className="space-y-12">
            {/* SECTION 1: Source Video Selection */}
            <div>
                <h4 className="text-2xl font-bold text-white mb-4">Source Video</h4>
                <div className="grid grid-cols-3 gap-4">
                    {demoVideos.map((video) => (
                        <button key={video.id} onClick={() => handleVideoSelect(video)} disabled={isPreview} className={`relative rounded-xl overflow-hidden transition-all duration-300 ${ selectedVideo.id === video.id ? 'ring-2 ring-blue-500 scale-105' : isPreview ? '' : 'hover:ring-1 hover:ring-white/50 hover:scale-102' }`}>
                            <img src={getYouTubeThumbnail(video.videoId)} alt={video.title} className="w-full h-32 object-cover"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                                <div className="p-3 w-full">
                                    <h5 className="text-white font-medium text-sm">{video.title}</h5>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Video Player */}
            <div>
                <h4 className="text-xl font-bold text-white mb-4">Selected Video</h4>
                <div className="relative bg-black rounded-xl overflow-hidden border border-slate-800 aspect-video">
                    <YouTube
                        videoId={selectedVideo.videoId}
                        opts={playerOptions}
                        className="absolute top-0 left-0 w-full h-full"
                        key={selectedVideo.id} // Add key to force re-render on video change
                    />
                </div>
            </div>

            {/* SECTION 2: AI Generated Clips */}
            <div>
                <h4 className="text-2xl font-bold text-white mb-4">AI-Generated Clips</h4>
                <div className="flex flex-col lg:grid lg:grid-cols-[22rem_1fr] lg:items-start gap-6">
                    <aside className="bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-800 space-y-4 sm:space-y-6">
                        {Object.entries(groupedClips).map(([ratio, clips]) => {
                            if (clips.length === 0) return null;
                            return (
                                <div key={ratio}>
                                    <h5 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{ASPECT_RATIO_INFO[ratio].label}</h5>
                                    <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2">
                                        {clips.map(clip => (
                                            <button key={clip.id} onClick={() => handleClipSelect(clip)} disabled={isPreview} className={`relative shrink-0 rounded-md overflow-hidden outline-none transition-all duration-200 ${ASPECT_RATIO_INFO[clip.aspectRatio].thumbnailClass} ${ selectedClip?.id === clip.id ? 'ring-2 ring-blue-500' : 'ring-1 ring-slate-700 hover:ring-slate-500' }`}>
                                                <img src={getYouTubeThumbnail(clip.videoId)} alt={clip.title} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/30"></div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </aside>

                    <main>
                        {selectedClip ? (
                            <div className="space-y-4 sm:space-y-6">
                                <div className={`relative shadow-2xl shadow-black rounded-lg overflow-hidden ${ASPECT_RATIO_INFO[selectedClip.aspectRatio].className}`}>
                                    <YouTube
                                        videoId={selectedClip.videoId}
                                        opts={playerOptions}
                                        className="absolute top-0 left-0 w-full h-full"
                                        key={selectedClip.id}
                                    />
                                </div>
                                <div className="space-y-2 sm:space-y-3 px-2 sm:px-0">
                                    <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedClip.title}</h3>
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium inline-block">{selectedClip.platform}</div>
                                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">"{selectedClip.caption}"</p>
                                </div>
                            </div>
                        ) : <div className="flex items-center justify-center h-32 sm:h-full bg-slate-900/50 rounded-xl"><p className="text-sm sm:text-base text-slate-400">No clips generated for this video.</p></div>}
                    </main>
                </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4">
                <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4 text-center"><Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mx-auto mb-2" /><p className="text-white text-xs sm:text-sm font-medium">Smart Scene Detection</p></div>
                <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4 text-center"><Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mx-auto mb-2" /><p className="text-white text-xs sm:text-sm font-medium">AI-Powered Captions</p></div>
                <div className="bg-slate-800/30 rounded-lg p-3 sm:p-4 text-center"><Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto mb-2" /><p className="text-white text-xs sm:text-sm font-medium">Multi-Platform Formatting</p></div>
            </div>
        </div>
    );
}