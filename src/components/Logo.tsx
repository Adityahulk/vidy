import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-16 h-16" }: LogoProps) {
  return (
    <div className={`${className} relative`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1159 1233"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <g
          transform="translate(0,1233) scale(0.1,-0.1)"
          fill="none"
          stroke="none"
        >
          {/* Main Black Shape */}
          <path
            d="M2431 11149 c-369 -42 -706 -280 -866 -613 -77 -162 -104 -271 -111
            -451 l-4 -120 577 -1645 578 -1645 3869 -3 3868 -2 -7 27 c-13 53 -84 193
            -136 268 -68 99 -215 237 -320 301 -46 28 -613 343 -1259 699 -646 357 -1299
            717 -1450 800 -151 84 -466 258 -700 387 -2756 1524 -3437 1897 -3507 1926
            -156 62 -360 90 -532 71z"
            fill="#10131A"
          />
          
          {/* Purple Top Shape */}
          <path
            d="M2677 5903 c-3 -5 -81 -258 -175 -563 -94 -305 -259 -841 -367 -1190
            -108 -349 -275 -891 -371 -1204 l-176 -570 11 -112 c6 -61 20 -146 31 -189 84
            -328 322 -604 638 -741 268 -116 594 -117 863 -3 68 29 434 247 2054 1224 709
            427 1244 750 1750 1052 l800 467 -3 22 c-2 12 -54 167 -117 345 l-114 323
            -2075 0 c-1141 0 -2077 -3 -2079 -7z"
            fill="#5B4EFF"
          />
        </g>
      </svg>
    </div>
  );
}
