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
      setTimeout(() => setIsLoading(false), 1000);
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
      {/* Loading Spinner */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-background z-[9999] flex items-center justify-center"
          >
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
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

      {/* Video Controls */}
      {!hasError && (
        <div className="fixed bottom-5 right-5 z-50 flex gap-3">
          <motion.button
            onClick={toggleMute}
            className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
          <motion.button
            onClick={replayVideo}
            className="w-12 h-12 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-foreground hover:bg-primary/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Replay video"
          >
            <RotateCcw size={20} />
          </motion.button>
        </div>
      )}
    </>
  );
}
