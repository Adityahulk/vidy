import React, { useState, useEffect } from 'react';
import { Play, Pause, User, Type, Wand2 } from 'lucide-react';

const demoPersonalities = [
  {
    id: 1,
    name: 'Sarah - CEO',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    voice: 'Professional, Confident',
    style: 'Corporate Executive'
  },
  {
    id: 2,
    name: 'Mike - Educator',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    voice: 'Warm, Engaging',
    style: 'Educational Speaker'
  },
  {
    id: 3,
    name: 'Emma - Creator',
    thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
    voice: 'Energetic, Friendly',
    style: 'Content Creator'
  }
];

const sampleScripts = [
  "Welcome to our quarterly business review. Today we'll discuss our achievements and future goals.",
  "In this lesson, we'll explore the fundamentals of artificial intelligence and machine learning.",
  "Hey everyone! Today I'm excited to share some amazing tips that will transform your workflow."
];

interface InteractivePersonalityClonePlayerProps {
  isPreview?: boolean;
}

export default function InteractivePersonalityClonePlayer({ isPreview = false }: InteractivePersonalityClonePlayerProps) {
  const [selectedPersonality, setSelectedPersonality] = useState(demoPersonalities[0]);
  const [currentScript, setCurrentScript] = useState(sampleScripts[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (isPreview) return; // Disable interaction in preview mode
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Select Personality */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Select Your Cloned Personality</h4>
        <div className="grid grid-cols-3 gap-4">
          {demoPersonalities.map((personality) => (
            <button
              key={personality.id}
              onClick={() => !isPreview && setSelectedPersonality(personality)}
              disabled={isPreview}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                selectedPersonality.id === personality.id 
                  ? 'ring-2 ring-blue-500 scale-105' 
                  : isPreview ? '' : 'hover:ring-1 hover:ring-white/50 hover:scale-102'
              }`}
            >
              <img 
                src={personality.thumbnail} 
                alt={personality.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="p-3 w-full">
                  <h5 className="text-white font-medium text-sm">{personality.name}</h5>
                  <p className="text-slate-300 text-xs">{personality.voice}</p>
                </div>
              </div>
              {selectedPersonality.id === personality.id && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Input Script */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Enter Your Script</h4>
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Type className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300 text-sm">Script Input</span>
          </div>
          <textarea
            value={currentScript}
            onChange={(e) => !isPreview && setCurrentScript(e.target.value)}
            disabled={isPreview}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
            rows={3}
            placeholder="Enter your script here..."
          />
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2">
              {sampleScripts.map((script, index) => (
                <button
                  key={index}
                  onClick={() => !isPreview && setCurrentScript(script)}
                  disabled={isPreview}
                  className="text-xs bg-slate-600 hover:bg-slate-500 text-slate-300 px-2 py-1 rounded transition-colors"
                >
                  Sample {index + 1}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-400">{currentScript.length} characters</span>
          </div>
        </div>
      </div>

      {/* Step 3: Generated Result - Always Visible */}
      <div>
        <h4 className="text-xl font-bold text-white mb-4">Your Generated Video</h4>
        <div className="relative bg-black rounded-xl overflow-hidden">
          <div className="aspect-video bg-black relative overflow-hidden">
            <img 
              src={selectedPersonality.thumbnail} 
              alt="Generated video"
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Play Controls */}
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

            {/* Generated Badge */}
            <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              AI Generated
            </div>

            {/* Script Preview */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white text-sm font-medium">"{currentScript.substring(0, 80)}..."</p>
              <p className="text-slate-300 text-xs mt-1">Speaking as {selectedPersonality.name}</p>
            </div>
          </div>
        </div>

        {/* Result Info */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-800/30 rounded-lg p-3">
            <User className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <p className="text-white text-sm font-medium">Voice Cloned</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <Wand2 className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <p className="text-white text-sm font-medium">Gestures Matched</p>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3">
            <Type className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-white text-sm font-medium">Script Delivered</p>
          </div>
        </div>
      </div>
    </div>
  );
}