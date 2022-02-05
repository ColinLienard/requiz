import { useEffect, useState } from 'react';

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleIsMobile = () => {
    setIsMobile(window.screen.width <= 480);
  };

  useEffect(() => {
    handleIsMobile();

    window.addEventListener('resize', handleIsMobile);

    return () => {
      window.removeEventListener('resize', handleIsMobile);
    };
  }, []);

  return isMobile;
};

export default useMobile;
