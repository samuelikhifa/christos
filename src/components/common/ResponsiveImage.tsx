import { useState, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * ResponsiveImage Component
 * 
 * Automatically handles:
 * - Lazy loading
 * - Responsive srcset for different screen sizes
 * - WebP and AVIF format support with fallbacks
 * - Loading states with blur placeholder
 * - iOS and Retina display optimization
 * 
 * Usage:
 * <ResponsiveImage 
 *   src="/images/photo.jpg"
 *   alt="Description"
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   loading="lazy"
 * />
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '100vw',
  loading = 'lazy',
  priority = false,
  aspectRatio,
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');

  // Generate srcset for different widths
  const generateSrcSet = (baseSrc: string, format: 'webp' | 'avif' | 'jpg') => {
    const widths = [400, 800, 1200, 1600, 2000];
    const extension = baseSrc.split('.').pop();
    const basePath = baseSrc.replace(`.${extension}`, '');
    
    return widths
      .map(width => `${basePath}-${width}.${format} ${width}w`)
      .join(', ');
  };

  // Detect WebP and AVIF support
  useEffect(() => {
    const checkFormatSupport = async () => {
      // Check AVIF support
      const avifSupport = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';
      });

      // Check WebP support
      const webpSupport = await new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
      });

      if (avifSupport) {
        setCurrentSrc(src.replace(/\.(jpg|jpeg|png)$/i, '.avif'));
      } else if (webpSupport) {
        setCurrentSrc(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      } else {
        setCurrentSrc(src);
      }
    };

    checkFormatSupport();
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const containerStyle: React.CSSProperties = aspectRatio
    ? { aspectRatio }
    : {};

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {/* Blur placeholder while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      )}

      <picture>
        {/* AVIF format (best compression, modern browsers) */}
        <source
          type="image/avif"
          srcSet={generateSrcSet(src, 'avif')}
          sizes={sizes}
        />
        
        {/* WebP format (good compression, wide support) */}
        <source
          type="image/webp"
          srcSet={generateSrcSet(src, 'webp')}
          sizes={sizes}
        />
        
        {/* JPG fallback (universal support) */}
        <img
          src={currentSrc || src}
          srcSet={generateSrcSet(src, 'jpg')}
          sizes={sizes}
          alt={alt}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          className={`w-full h-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit,
            objectPosition: 'center',
          }}
          // iOS-specific optimizations
          {...(typeof window !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent) && {
            style: {
              ...{ objectFit, objectPosition: 'center' },
              WebkitBackfaceVisibility: 'hidden',
              WebkitTransform: 'translateZ(0)',
            },
          })}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
