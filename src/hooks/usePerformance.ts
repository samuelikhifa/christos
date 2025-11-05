import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export const usePerformance = () => {
  const measurePerformance = useCallback((): PerformanceMetrics => {
    const metrics: PerformanceMetrics = {};

    // Get navigation timing
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      metrics.ttfb = navigation.responseStart - navigation.requestStart;
    }

    // Get paint timing
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-contentful-paint') {
        metrics.fcp = entry.startTime;
      }
    });

    return metrics;
  }, []);

  const preloadCriticalResources = useCallback(() => {
    // Preload critical fonts
    const fontPreloads = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap'
    ];

    fontPreloads.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });

    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://www.youtube.com',
      'https://img.youtube.com'
    ];

    preconnectDomains.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  const optimizeImages = useCallback(() => {
    // Add loading="lazy" to images that don't have it
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img) => {
      if (img.getBoundingClientRect().top > window.innerHeight) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }, []);

  const enableServiceWorker = useCallback(async () => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      try {
        await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully');
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }, []);

  const measureWebVitals = useCallback(() => {
    // Measure Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with web-vitals library
      // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
    }
  }, []);

  const optimizeForMobile = useCallback(() => {
    // Add viewport meta tag if not present
    if (!document.querySelector('meta[name="viewport"]')) {
      const viewport = document.createElement('meta');
      viewport.name = 'viewport';
      viewport.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(viewport);
    }

    // Optimize touch events
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
  }, []);

  const prefetchNextPage = useCallback((href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  }, []);

  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: number;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
    };
  }, []);

  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  useEffect(() => {
    // Initialize performance optimizations
    preloadCriticalResources();
    optimizeImages();
    enableServiceWorker();
    optimizeForMobile();
    measureWebVitals();

    // Cleanup function
    return () => {
      // Remove any event listeners or cleanup
    };
  }, []);

  return {
    measurePerformance,
    preloadCriticalResources,
    optimizeImages,
    enableServiceWorker,
    measureWebVitals,
    optimizeForMobile,
    prefetchNextPage,
    debounce,
    throttle
  };
};
