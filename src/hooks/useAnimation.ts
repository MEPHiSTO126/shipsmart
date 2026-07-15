import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

export function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollPosition;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit,
): IntersectionObserverEntry | null {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return entry;
}

export function useStaggeredAnimation(
  count: number,
  baseDelay = 0.1,
  prefersReducedMotion = false,
): { delay: number }[] {
  if (prefersReducedMotion) {
    return Array.from({ length: count }, () => ({ delay: 0 }));
  }

  return Array.from({ length: count }, (_, i) => ({
    delay: i * baseDelay,
  }));
}

export function useSpringConfig(prefersReducedMotion: boolean) {
  return prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 300, damping: 30 };
}

export function useCountUp(
  end: number,
  duration = 1,
  prefersReducedMotion = false,
): number {
  const [count, setCount] = useState(() =>
    prefersReducedMotion || end === 0 ? end : 0,
  );
  const [prev, setPrev] = useState({ end, prefersReducedMotion });

  if (prev.end !== end || prev.prefersReducedMotion !== prefersReducedMotion) {
    setPrev({ end, prefersReducedMotion });
    setCount(prefersReducedMotion || end === 0 ? end : 0);
  }

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || end === 0) {
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, prefersReducedMotion]);

  return count;
}
