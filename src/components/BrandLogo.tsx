import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  accentColor?: string;
  themeMode?: 'monochrome' | 'themed';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  accentColor = '#ffffff',
  themeMode = 'monochrome',
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const textSizes = {
    sm: 'text-xs tracking-wider',
    md: 'text-sm tracking-widest',
    lg: 'text-lg tracking-widest',
    xl: 'text-2xl tracking-[0.2em]',
  };

  const isMono = themeMode === 'monochrome';
  const primaryStroke = isMono ? '#ffffff' : accentColor;
  const secondaryStroke = isMono ? '#e5e5e5' : '#ffffff';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      {/* Emblem SVG inspired by the official Varsity Life HUB crest */}
      <div className={`relative ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Mortarboard Cap */}
          <path
            d="M50 16 L84 28 L50 40 L16 28 Z"
            fill="currentColor"
            className={isMono ? "text-white" : "text-white"}
          />
          {/* Cap Base under mortarboard */}
          <path
            d="M32 35 L50 41 L68 35 V42 C68 47 60 51 50 51 C40 51 32 47 32 42 Z"
            fill="currentColor"
            className="text-neutral-300"
          />
          {/* Cap Tassel */}
          <path
            d="M20 29.5 L18 42 C17 44 19 46 21 46 C23 46 25 44 24 42 L22 29.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-neutral-300"
          />
          <circle cx="21" cy="44" r="2.5" fill="currentColor" className="text-white" />

          {/* Shield Outline Body */}
          <path
            d="M25 42 C25 66 38 78 50 84 C62 78 75 66 75 42"
            stroke={primaryStroke}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Dynamic "V" Checkmark & Crest Layer */}
          <path
            d="M35 52 L50 71 L88 28"
            stroke={primaryStroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 56 L42 45 M50 56 L58 45"
            stroke={secondaryStroke}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="text-center mt-2">
          <span className={`block font-extrabold uppercase text-white font-display ${textSizes[size]}`}>
            Varsity Life
          </span>
          <span
            className={`block font-bold tracking-[0.25em] ${
              isMono ? 'text-neutral-300' : 'text-neutral-200'
            } text-[10px] md:text-xs uppercase`}
          >
            HUB
          </span>
        </div>
      )}
    </div>
  );
};
