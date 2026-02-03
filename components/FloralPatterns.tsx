import React from 'react';

export const FlowerCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={`pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M100 200C100 150 150 150 150 100C150 50 100 50 100 0" className="animate-[dash_5s_linear_infinite]" strokeDasharray="200" />
    <path d="M100 200C100 160 60 160 60 120C60 80 100 80 100 40" strokeDasharray="180" />
    <circle cx="150" cy="100" r="4" fill="currentColor" className="opacity-60" />
    <circle cx="60" cy="120" r="3" fill="currentColor" className="opacity-60" />
    <path d="M150 100C170 80 190 100 200 90" />
    <path d="M60 120C40 100 20 120 10 110" />
    {/* Petals */}
    <path d="M150 100 Q 170 70 190 100 T 150 100" />
    <path d="M150 100 Q 130 130 150 160 T 150 100" />
    <path d="M60 120 Q 80 90 100 120 T 60 120" />
    <path d="M60 120 Q 40 150 60 180 T 60 120" />
  </svg>
);

export const FlowerWatermark: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`absolute pointer-events-none mix-blend-screen ${className}`}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-brand opacity-30">
             <path d="M50 100 V 50 M50 50 Q 20 20 50 0 M50 50 Q 80 20 50 0 M50 50 Q 20 80 0 50 M50 50 Q 80 80 100 50" />
             <path d="M50 50 C 30 40 30 60 50 70 C 70 60 70 40 50 50" />
        </svg>
    </div>
);