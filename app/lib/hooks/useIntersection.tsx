import { useEffect, useRef } from 'react';

const useIntersection = (past: number, enable: () => void, disable: () => void) => {
  const toWatch = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].boundingClientRect.y < 0) {
        enable();
      } else {
        disable();
      }
    });
    observer.observe(toWatch.current as HTMLDivElement);
  }, []);

  return (
    <div
      ref={toWatch}
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        top: `${past}px`,
        left: '0',
      }}
    />
  );
};

export default useIntersection;
