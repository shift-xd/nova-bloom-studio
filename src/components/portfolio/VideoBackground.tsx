import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, RotateCcw } from "lucide-react";

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
      {/* Glass Blur Overlay - Fades to reveal site */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999] pointer-events-none bg-black/50 backdrop-blur-[2px]"
          />
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

      {/* Simple blur overlay - no colors */}
      <div className="fixed inset-0 -z-10 bg-black/50 backdrop-blur-[2px]" />

      {/* Video Controls - Mobile optimized */}
      {!hasError && (
        <div className="fixed bottom-4 right-4 md:bottom-5 md:right-5 z-50 flex gap-2 md:gap-3">
          <motion.button
            onClick={toggleMute}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
          <motion.button
            onClick={replayVideo}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors"
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
