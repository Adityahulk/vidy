import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-8 h-8" }: LogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Purple top section */}
        <path
          d="M96 64C96 64 352 0 448 160H96V64Z"
          fill="#5B4EFF"
        />
        {/* Black lower section */}
        <path
          d="M96 192L384 320L96 448L64 384L288 320L64 256L96 192Z"
          fill="#10131A"
        />
      </svg>
    </div>
  );
}
