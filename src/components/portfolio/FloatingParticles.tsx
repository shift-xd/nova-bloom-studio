import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'orange' | 'sage' | 'cream';
}

interface SoulOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: 'orange' | 'sage' | 'cream';
}

export function FloatingParticles() {
  // Reduced particle count for mobile performance
  const particles = useMemo<Particle[]>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 15 : 25;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1.5,
      duration: Math.random() * 12 + 18,
      delay: Math.random() * 8,
      type: ['orange', 'sage', 'cream'][i % 3] as 'orange' | 'sage' | 'cream',
    }));
  }, []);

  // Soul orbs - floating ambient lights
  const soulOrbs = useMemo<SoulOrb[]>(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobile ? 4 : 8;
    
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      size: 40 + Math.random() * 60,
      delay: i * 1.5,
      color: ['orange', 'sage', 'cream'][i % 3] as 'orange' | 'sage' | 'cream',
    }));
  }, []);

  const getParticleColor = (type: string) => {
    switch (type) {
      case 'orange': return 'hsla(30, 100%, 53%, 0.4)';
      case 'sage': return 'hsla(102, 18%, 70%, 0.35)';
      case 'cream': return 'hsla(71, 35%, 85%, 0.3)';
      default: return 'hsla(30, 100%, 53%, 0.3)';
    }
  };

  const getOrbGradient = (color: string) => {
    switch (color) {
      case 'orange': return 'radial-gradient(circle, hsla(30, 100%, 53%, 0.12) 0%, hsla(30, 100%, 53%, 0.02) 50%, transparent 70%)';
      case 'sage': return 'radial-gradient(circle, hsla(102, 18%, 70%, 0.1) 0%, hsla(102, 18%, 70%, 0.02) 50%, transparent 70%)';
      case 'cream': return 'radial-gradient(circle, hsla(71, 35%, 85%, 0.08) 0%, hsla(71, 35%, 85%, 0.01) 50%, transparent 70%)';
      default: return 'radial-gradient(circle, hsla(30, 100%, 53%, 0.1) 0%, transparent 70%)';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden gpu-accelerated">
      {/* Large ambient orbs - smooth blob-like movement */}
      {soulOrbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full gpu-accelerated"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: getOrbGradient(orb.color),
            filter: 'blur(20px)',
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -40, 20, -30, 0],
            scale: [1, 1.15, 0.95, 1.1, 1],
            opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
          }}
          transition={{
            duration: 20 + orb.id * 3,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full gpu-accelerated"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: getParticleColor(particle.type),
            boxShadow: `0 0 ${particle.size * 3}px ${getParticleColor(particle.type)}`,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 15, -10, 0],
            opacity: [0, 0.7, 0.4, 0],
            scale: [0.8, 1.2, 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Warm tendrils - subtle warm wisps */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`tendril-${i}`}
          className="absolute gpu-accelerated"
          style={{
            left: `${20 + i * 30}%`,
            bottom: '0%',
            width: 2,
            height: 150,
            background: 'linear-gradient(to top, hsla(30, 100%, 53%, 0.2), transparent)',
            filter: 'blur(3px)',
            transformOrigin: 'bottom center',
          }}
          animate={{
            scaleY: [1, 1.3, 0.8, 1],
            rotate: [-5, 5, -3, -5],
            opacity: [0.2, 0.4, 0.25, 0.2],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
