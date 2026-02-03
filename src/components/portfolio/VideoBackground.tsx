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
      {/* Glass Blur Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1, backdropFilter: "blur(40px) saturate(180%)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px) saturate(100%)" }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[9999]"
            style={{
              background: "linear-gradient(135deg, hsla(40, 50%, 12%, 0.95) 0%, hsla(200, 30%, 8%, 0.98) 50%, hsla(40, 40%, 10%, 0.95) 100%)",
            }}
          >
            {/* Ambient glow orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(40, 65%, 55%, 0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full"
              style={{
                background: "radial-gradient(circle, hsla(200, 60%, 50%, 0.12) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            
            {/* Glass morphism center panel */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 1.1 }}
              exit={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="w-32 h-32 rounded-3xl"
                style={{
                  background: "linear-gradient(135deg, hsla(40, 50%, 50%, 0.08) 0%, hsla(200, 40%, 40%, 0.05) 100%)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid hsla(40, 50%, 50%, 0.1)",
                  boxShadow: "0 8px 32px hsla(0, 0%, 0%, 0.3), inset 0 1px 0 hsla(255, 255%, 255%, 0.05)",
                }}
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  borderRadius: ["24%", "40%", "24%", "40%", "24%"],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
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
