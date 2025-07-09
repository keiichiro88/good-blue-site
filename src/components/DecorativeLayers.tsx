import React from 'react';

export const WaveLayer: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-x-0 overflow-hidden ${className}`}>
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className="relative block w-[calc(100%+1.3px)] h-[80px]"
    >
      <path 
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
        className="fill-good-blue-cream"
      />
    </svg>
  </div>
);

export const FloralPattern: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute -top-10 -right-10 w-60 h-60 opacity-5">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M40.7,-69.8C52.3,-62.5,60.9,-50.2,67.6,-36.8C74.3,-23.4,79.1,-8.9,78.7,5.7C78.3,20.3,72.7,35,63.1,46.9C53.5,58.8,40,67.9,24.8,73.2C9.7,78.5,-7.1,80,-23.1,76.3C-39.1,72.6,-54.3,63.7,-65.3,51.2C-76.3,38.7,-83.1,22.6,-84.5,5.8C-85.9,-11,-81.9,-28.5,-73.3,-43.3C-64.7,-58.1,-51.5,-70.2,-36.8,-75.8C-22.1,-81.4,-5.9,-80.5,8.8,-74.9C23.5,-69.3,29.1,-77.1,40.7,-69.8Z" 
          transform="translate(100 100)" 
          className="fill-good-blue-gold"
        />
      </svg>
    </div>
    <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-5">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M43.5,-76.7C55.8,-68.5,65,-55.7,71.8,-41.8C78.5,-27.9,82.8,-12.9,82.3,2.3C81.8,17.5,76.5,33.5,68.1,47.2C59.7,60.9,48.2,72.3,34.1,78.8C20,85.3,3.3,86.9,-13.5,84.4C-30.3,81.9,-47.2,75.3,-60.7,64.5C-74.2,53.7,-84.3,38.7,-88.6,21.8C-92.9,4.9,-91.4,-13.9,-85.3,-30.8C-79.2,-47.7,-68.5,-62.7,-54.5,-70C-40.5,-77.3,-23.2,-76.9,-7.2,-71.6C8.8,-66.3,31.2,-84.9,43.5,-76.7Z" 
          transform="translate(100 100)" 
          className="fill-good-blue-brown"
        />
      </svg>
    </div>
  </div>
);

export const GeometricPattern: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
    <div className="absolute inset-0" style={{
      backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 35px,
        rgba(139, 115, 85, 0.02) 35px,
        rgba(139, 115, 85, 0.02) 70px
      )`
    }} />
  </div>
);

export const CircleDecoration: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 rounded-full bg-good-blue-gold/10 animate-pulse" />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-good-blue-gold/20 to-transparent" />
    </div>
  </div>
);