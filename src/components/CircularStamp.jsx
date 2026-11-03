import React from 'react';

export default function CircularStamp({
  size = 140,
  text = "PROTECT NATURE • SERVE HUMANITY • PRESERVE THE ENVIRONMENT • ",
  className = ""
}) {
  return (
    <div
      className={`circular-stamp-wrapper ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
      title="Manchi Panulu Seva Foundation - Core Covenant"
    >
      {/* Outer Rotating Text SVG */}
      <svg
        viewBox="0 0 200 200"
        style={{
          width: '100%',
          height: '100%',
          animation: 'rotateStamp 24s linear infinite',
          transformOrigin: 'center center'
        }}
      >
        <defs>
          <path
            id="stampCirclePath"
            d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
          />
        </defs>

        {/* Outer subtle circular border ring */}
        <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />

        {/* Curved Circular Text */}
        <text
          fill="currentColor"
          fontSize="11.5"
          fontWeight="600"
          letterSpacing="0.22em"
          style={{ textTransform: 'uppercase' }}
        >
          <textPath href="#stampCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Sprout Emblem */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg width={size * 0.28} height={size * 0.28} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central Stem */}
          <path d="M12 21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Left Leaf */}
          <path d="M12 13C8.5 13 6 10.5 6 7C9.5 7 12 9.5 12 13Z" fill="currentColor" />
          {/* Right Leaf */}
          <path d="M12 16C15.5 16 18 13.5 18 10C14.5 10 12 12.5 12 16Z" fill="currentColor" />
          {/* Top Seed Sprout */}
          <path d="M12 9C10.5 6.5 12 3 12 3C12 3 13.5 6.5 12 9Z" fill="currentColor" opacity="0.75" />
        </svg>
      </div>
    </div>
  );
}

