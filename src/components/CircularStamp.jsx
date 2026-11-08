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
      title="Manchi Panulu Sewa Foundation - Core Covenant"
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

      {/* Center Official Foundation Emblem */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${size * 0.44}px`,
          height: `${size * 0.44}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <img
          src="/logo.jpg"
          alt="Manchi Panulu Sewa Foundation Emblem"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        />
      </div>
    </div>
  );
}

