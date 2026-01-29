import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function FloatingParticles() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            boxShadow: `0 0 ${particle.size * 2}px hsla(40, 65%, 55%, 0.3)`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Larger soul orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
            width: 8 + i * 2,
            height: 8 + i * 2,
            background: `radial-gradient(circle, hsla(200, 70%, 50%, 0.4) 0%, transparent 70%)`,
            boxShadow: `0 0 20px hsla(200, 70%, 50%, 0.3)`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
