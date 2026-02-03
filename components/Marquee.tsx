import React from 'react';

interface MarqueeProps {
  text: string[];
  className?: string;
  direction?: 'left' | 'right';
  speed?: number;
  rotate?: boolean;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  text, 
  className = "", 
  direction = 'left', 
  speed = 20,
  rotate = false
}) => {
  return (
    <div className={`relative overflow-hidden py-6 bg-brand text-bg-900 z-30 border-y border-bg-900 ${rotate ? '-rotate-1 shadow-xl scale-105 origin-center' : ''} ${className}`}>
      <div className="flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className={`flex animate-marquee ${direction === 'right' ? 'animate-reverse' : ''}`}
            style={{ animationDuration: `${speed}s` }}
          >
            {text.map((item, index) => (
              <span key={index} className="mx-8 text-4xl md:text-6xl font-serif italic font-bold tracking-tighter uppercase flex items-center">
                {item}
                <span className="w-3 h-3 bg-bg-900 rounded-full ml-8 inline-block"></span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;