import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import NewHero from './NewHero';

interface ResponsiveHeroProps {
  onCategoryChange: (category: string) => void;
}

const ResponsiveHero: React.FC<ResponsiveHeroProps> = ({ onCategoryChange }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // モバイルでは旧Hero、デスクトップでは新Hero
  return isMobile ? (
    <Hero onCategoryChange={onCategoryChange} />
  ) : (
    <NewHero onCategoryChange={onCategoryChange} />
  );
};

export default ResponsiveHero;