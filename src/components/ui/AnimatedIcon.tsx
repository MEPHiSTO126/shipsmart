'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useAnimation';
import { forwardRef } from 'react';

interface AnimatedIconProps extends Omit<HTMLMotionProps<'svg'>, 'children'> {
  children: React.ReactNode;
  animateOnHover?: boolean;
  animateOnMount?: boolean;
  hoverScale?: number;
  rotateOnHover?: boolean;
}

export const AnimatedIcon = forwardRef<SVGSVGElement, AnimatedIconProps>(
  ({ 
    children, 
    animateOnHover = true, 
    animateOnMount = true,
    hoverScale = 1.1,
    rotateOnHover = false,
    className = '',
    style,
    ...props 
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    const initial = animateOnMount && !prefersReducedMotion ? { scale: 0, rotate: -180 } : false;
    const animate = animateOnMount && !prefersReducedMotion ? { scale: 1, rotate: 0 } : undefined;
    const transition = { type: 'spring', stiffness: 300, damping: 20, duration: 0.5 };

    const whileHover = animateOnHover && !prefersReducedMotion 
      ? { 
          scale: hoverScale,
          rotate: rotateOnHover ? 12 : 0,
          transition: { type: 'spring', stiffness: 400, damping: 17 }
        }
      : undefined;

    const whileTap = animateOnHover && !prefersReducedMotion 
      ? { scale: 0.95 }
      : undefined;

    return (
      <motion.svg
        ref={ref}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        whileTap={whileTap}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </motion.svg>
    );
  }
);

AnimatedIcon.displayName = 'AnimatedIcon';