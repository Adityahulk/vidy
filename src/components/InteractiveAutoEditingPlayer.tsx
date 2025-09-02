import React, { useState } from 'react';
import { Play, Pause, Scissors, Zap, Wand2 } from 'lucide-react';

const demoVideos = [
  {
    id: 1,
    title: 'Raw Interview Footage',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '25:30',
    type: 'raw',
    editedResults: {
      title: 'Professional Interview',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '8:45',
      improvements: [
        'Removed awkward pauses',
        'Added smooth transitions',
        'Color correction applied',
        'Audio levels balanced'
      ]
    }
  },
  {
    id: 2,
    title: 'Webinar Recording',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:15',
    type: 'raw',
    editedResults: {
      title: 'Engaging Webinar Highlights',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '12:20',
      improvements: [
        'Key moments highlighted',
        'Slide transitions synced',
        'Background noise removed',
        'Professional pacing'
      ]
    }
  },
  {
    id: 3,
    title: 'Conference Presentation',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '32:45',
    type: 'raw',
    editedResults: {
      title: 'Polished Presentation',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      duration: '15:30',
      improvements: [
        'Dynamic camera angles',
        'Audience reactions included',
        'Graphics overlay added',
        'Perfect timing achieved'
      ]
    }
  }
];

interface InteractiveAutoEditingPlayerProps {
  isPreview?: boolean;
}

export default function InteractiveAutoEditingPlayer({ isPreview = false }: InteractiveAutoEditingPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState(demoVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: typeof demoVideos[0]) => {
    if (isPreview) return; // Disable interaction in preview mode
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (isPreview) return; // Disable interaction in preview mode
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-8">
      {/* Original Video Selection */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Raw Footage</h4>
        
        {/* Video Selection Grid */}
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
        <h4 className="text-xl font-bold text-white mb-4">Selected Raw Footage</h4>
        <div className="relative bg-black rounded-xl overflow-hidden">
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

            {/* Raw Footage Badge */}
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Raw Footage
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
      </div>

      {/* AI-Edited Result - Always Visible */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">AI-Edited Result</h4>
        <div className="relative bg-black rounded-xl overflow-hidden">
          <div className="aspect-video bg-black relative overflow-hidden">
            <img 
              src={selectedVideo.editedResults.thumbnail} 
              alt="Edited video"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Video Info Overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
              <h5 className="text-white font-medium text-sm">{selectedVideo.editedResults.title}</h5>
              <p className="text-slate-300 text-xs">{selectedVideo.editedResults.duration}</p>
            </div>

            {/* AI Edited Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              AI Edited
            </div>

                disabled={isPreview}
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-16 h-16 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white ml-1" />
                )}
              </button>
            </div>

            {/* Improvements Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium mb-2">AI Improvements Applied:</p>
              <div className="grid grid-cols-2 gap-1">
                {selectedVideo.editedResults.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center text-xs text-slate-300">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                    {improvement}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Before/After Comparison */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-800/30 rounded-lg p-3">
            <p className="text-orange-500 text-sm font-medium">Before: {selectedVideo.duration}</p>
            <p className="text-slate-400 text-xs">Raw footage</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <p className="text-green-500 text-sm font-medium">After: {selectedVideo.editedResults.duration}</p>
            <p className="text-slate-400 text-xs">AI edited</p>
          </div>
        </div>

        {/* AI Features Highlight */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-4 text-center">
            <Scissors className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Smart Cuts</p>
            <p className="text-slate-400 text-xs">Removes dead time</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 text-center">
            <Zap className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Auto Transitions</p>
            <p className="text-slate-400 text-xs">Professional flow</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-4 text-center">
            <Wand2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-white text-sm font-medium">Color & Audio</p>
            <p className="text-slate-400 text-xs">Enhanced quality</p>
          </div>
        </div>
      </div>
    </div>
  );
}