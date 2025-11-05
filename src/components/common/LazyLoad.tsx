import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  className?: string;
  once?: boolean;
}

/**
 * LazyLoad Component
 * 
 * Lazy loads components and content when they enter the viewport
 * Uses IntersectionObserver for optimal performance
 * 
 * Features:
 * - Reduces initial bundle size
 * - Improves page load performance
 * - Customizable loading threshold
 * - Optional placeholder content
 * - iOS Safari optimized
 * 
 * Usage:
 * <LazyLoad threshold={0.1} rootMargin="50px">
 *   <HeavyComponent />
 * </LazyLoad>
 */
export const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
  className = '',
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      setIsVisible(true);
      setHasBeenVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              setHasBeenVisible(true);
              observer.unobserve(element);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, once]);

  const shouldRender = once ? (isVisible || hasBeenVisible) : isVisible;

  return (
    <div ref={elementRef} className={className}>
      {shouldRender ? children : (placeholder || <div className="min-h-[200px]" />)}
    </div>
  );
};

export default LazyLoad;
