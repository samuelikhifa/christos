import { useState, useRef, useEffect } from 'react';
import { Loader } from 'lucide-react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder,
  blurDataURL,
  width,
  height,
  priority = false,
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate WebP and fallback sources
  const getOptimizedSrc = (originalSrc: string, format: 'webp' | 'original' = 'original') => {
    if (format === 'webp' && originalSrc.includes('.')) {
      const extension = originalSrc.split('.').pop();
      return originalSrc.replace(`.${extension}`, '.webp');
    }
    return originalSrc;
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-50"
              aria-hidden="true"
            />
          ) : (
            <Loader className="w-8 h-8 text-gray-400 animate-spin" />
          )}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}

      {/* Actual image with WebP support */}
      {isInView && !hasError && (
        <picture>
          <source srcSet={getOptimizedSrc(src, 'webp')} type="image/webp" />
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
