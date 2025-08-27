import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* White background circle */}
        <circle cx="256" cy="256" r="256" fill="white" />

        {/* Purple top section */}
        <path
          d="M130 90C130 90 420 60 470 210H130V90Z"
          fill="#5B4EFF"
        />

        {/* Black lower section (changed to dark gray for better visibility) */}
        <path
          d="M130 240L420 340L130 430L100 380L310 340L100 270L130 240Z"
          fill="#1F2937"
        />
      </svg>
    </div>
  );
}
