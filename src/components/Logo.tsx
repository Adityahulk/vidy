import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        
        {/* Main circle background */}
        <circle
          cx="16"
          cy="16"
          r="15"
          fill="url(#logoGradient)"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
        />
        
        {/* Play button triangle for video theme */}
        <path
          d="M12 10L12 22L22 16L12 10Z"
          fill="white"
          opacity="0.9"
        />
        
        {/* Small accent dots for AI/tech feel */}
        <circle cx="8" cy="8" r="1.5" fill="rgba(255,255,255,0.6)" />
        <circle cx="24" cy="8" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="8" cy="24" r="1" fill="rgba(255,255,255,0.4)" />
        <circle cx="24" cy="24" r="1.5" fill="rgba(255,255,255,0.6)" />
      </svg>
    </div>
  );
}