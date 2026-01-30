import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

// Jelly Triangle Loader Component
function JellyTriangleLoader() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Jelly Triangle Container */}
      <div 
        className="relative w-[60px] h-[60px]"
        style={{ 
          filter: 'url(#uib-jelly-triangle-ooze)',
        }}
      >
        {/* Dot */}
        <div 
          className="absolute w-[33%] h-[33%] bg-primary rounded-full"
          style={{
            top: '6%',
            left: '30%',
            animation: 'jelly-grow 1.75s ease infinite',
          }}
        />
        {/* Before pseudo (bottom right) */}
        <div 
          className="absolute w-[33%] h-[33%] bg-primary rounded-full"
          style={{
            bottom: '6%',
            right: '0',
            animation: 'jelly-grow 1.75s ease -1.167s infinite',
          }}
        />
        {/* After pseudo (bottom left) */}
        <div 
          className="absolute w-[33%] h-[33%] bg-primary rounded-full"
          style={{
            bottom: '6%',
            left: '0',
            animation: 'jelly-grow 1.75s ease -0.583s infinite',
          }}
        />
        {/* Traveler */}
        <div 
          className="absolute w-[33%] h-[33%] bg-primary rounded-full"
          style={{
            top: '6%',
            left: '30%',
            animation: 'jelly-triangulate 1.75s ease infinite',
          }}
        />
      </div>
      
      {/* Loading Text */}
      <motion.p
        className="text-primary/80 text-sm font-medium tracking-widest"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING
      </motion.p>
      
      {/* SVG Filter - Hidden */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id="uib-jelly-triangle-ooze">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setTimeout(() => setIsLoading(false), 1500);
    };

    const handleError = () => {
      console.error("Error loading video");
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <>
      {/* Loading Screen with Jelly Triangle */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 bg-background z-[9999] flex items-center justify-center"
          >
            {/* Background glow */}
            <div 
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at center, hsla(40, 65%, 55%, 0.08) 0%, transparent 60%)",
              }}
            />
            <JellyTriangleLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://raw.githubusercontent.com/shift-xd/my-webfolio/main/Hollow%20Knight%20Silksong%20-%20Grandmother%20Silk%20Final%20Boss%20Fight%20(PC%204K%2060FPS)%20(compressed).mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Video Overlay */}
      <div className="fixed inset-0 -z-10 bg-background/70 backdrop-blur-[3px]" />

      {/* Video Controls - Mobile optimized */}
      {!hasError && (
        <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 flex gap-2 md:gap-3">
          <motion.button
            onClick={toggleMute}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border border-primary/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
          <motion.button
            onClick={replayVideo}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border border-primary/40 flex items-center justify-center text-foreground hover:bg-primary/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Replay video"
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>
      )}
    </>
  );
}
