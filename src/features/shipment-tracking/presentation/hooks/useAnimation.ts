import { useEffect, useState, useSyncExternalStore } from 'react';

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );
}

export function useCountUp(
  endValue: number,
  duration: number = 1,
  prefersReducedMotion: boolean = false
): number {
  const [count, setCount] = useState(() =>
    prefersReducedMotion || endValue === 0 ? endValue : 0
  );
  const [prev, setPrev] = useState({ endValue, prefersReducedMotion });

  if (prev.endValue !== endValue || prev.prefersReducedMotion !== prefersReducedMotion) {
    setPrev({ endValue, prefersReducedMotion });
    setCount(prefersReducedMotion || endValue === 0 ? endValue : 0);
  }

  useEffect(() => {
    if (prefersReducedMotion || endValue === 0) {
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * endValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration, prefersReducedMotion]);

  return count;
}