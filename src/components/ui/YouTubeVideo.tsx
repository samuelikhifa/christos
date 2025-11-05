import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  controls?: boolean;
  muted?: boolean;
  loop?: boolean;
  startTime?: number;
  endTime?: number;
  thumbnail?: string;
}

const YouTubeVideo = ({
  videoId,
  title = 'YouTube Video',
  className = '',
  autoplay = false,
  controls = true,
  muted = false,
  loop = false,
  startTime,
  endTime,
  thumbnail
}: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCustomControls, setShowCustomControls] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Construct YouTube URL with parameters
  const getYouTubeUrl = () => {
    const baseUrl = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams();
    
    if (autoplay) params.append('autoplay', '1');
    if (!controls) params.append('controls', '0');
    if (muted) params.append('mute', '1');
    if (loop) params.append('loop', '1');
    if (startTime) params.append('start', startTime.toString());
    if (endTime) params.append('end', endTime.toString());
    
    // Additional parameters for better performance and privacy
    params.append('rel', '0'); // Don't show related videos
    params.append('modestbranding', '1'); // Minimal YouTube branding
    params.append('playsinline', '1'); // Play inline on mobile
    params.append('enablejsapi', '1'); // Enable JavaScript API
    
    return `${baseUrl}?${params.toString()}`;
  };

  // Get thumbnail URL
  const getThumbnailUrl = () => {
    if (thumbnail) return thumbnail;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const togglePlay = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (isPlaying) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (isMuted) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      } else {
        iframe.contentWindow?.postMessage('{"event":"command","func":"mute","args":""}', '*');
      }
      setIsMuted(!isMuted);
    }
  };

  const openFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    }
  };

  // Listen for YouTube player messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'video-progress') {
          // Handle video progress updates
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div 
      className={`relative group ${className}`}
      onMouseEnter={() => setShowCustomControls(true)}
      onMouseLeave={() => setShowCustomControls(false)}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg z-10">
          <Loader className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      {/* YouTube Iframe */}
      <iframe
        ref={iframeRef}
        src={getYouTubeUrl()}
        title={title}
        className="w-full h-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        onLoad={handleIframeLoad}
        style={{ aspectRatio: '16/9' }}
      />

      {/* Custom Controls Overlay */}
      {showCustomControls && !controls && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-blue-400 transition-colors"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          <button
            onClick={openFullscreen}
            className="text-white hover:text-blue-400 transition-colors"
            aria-label="Enter fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Accessibility: Screen reader description */}
      <div className="sr-only">
        YouTube video: {title}. {isPlaying ? 'Currently playing' : 'Currently paused'}.
      </div>
    </div>
  );
};

export default YouTubeVideo;
