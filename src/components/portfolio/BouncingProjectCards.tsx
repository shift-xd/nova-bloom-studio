import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Stethoscope, Zap, Shield, Bot, Wrench, Github } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const projects = [
  {
    icon: Stethoscope,
    title: "MediScanXD",
    description: "AI-powered medical image analysis",
    link: "https://mediscanxd.netlify.app",
    gradient: "from-emerald-500/20 to-teal-600/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: Zap,
    title: "FlashXD",
    description: "Lightning-fast file transfers",
    link: "https://flashxd.netlify.app",
    gradient: "from-amber-500/20 to-orange-600/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Shield,
    title: "Enclosure",
    description: "Secure data encryption system",
    link: "https://enclosure.netlify.app",
    gradient: "from-blue-500/20 to-indigo-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Bot,
    title: "Shift-GPT",
    description: "Custom AI chatbot interface",
    link: "https://shift-gpt.netlify.app",
    gradient: "from-purple-500/20 to-violet-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Wrench,
    title: "HackClub",
    description: "Blueprint project collection",
    link: "https://blueprint.hackclub.com/users/1267",
    gradient: "from-rose-500/20 to-pink-600/20",
    iconColor: "text-rose-400",
  },
];

export function BouncingProjectCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate for mobile stacked cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStackPosition = (index: number) => {
    const diff = (index - activeIndex + projects.length) % projects.length;
    const positions = [
      { rotate: 0, scale: 1, x: 0, y: 0, zIndex: 5, opacity: 1 },
      { rotate: 6, scale: 0.95, x: 20, y: 8, zIndex: 4, opacity: 0.9 },
      { rotate: 12, scale: 0.9, x: 40, y: 16, zIndex: 3, opacity: 0.7 },
      { rotate: -6, scale: 0.85, x: -20, y: 24, zIndex: 2, opacity: 0.5 },
      { rotate: -12, scale: 0.8, x: -40, y: 32, zIndex: 1, opacity: 0.3 },
    ];
    return positions[diff] || positions[4];
  };

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="My Projects"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </motion.div>

        {/* Desktop - Bouncing Cards */}
        <div className="hidden md:flex justify-center items-center relative h-[450px] mb-12">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const baseX = (index - 2) * 200;
            const rotation = (index - 2) * 8;
            
            return (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-[180px] aspect-square cursor-pointer gpu-accelerated"
                initial={{ opacity: 0, y: 100, rotate: rotation }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: isHovered ? -20 : Math.abs(index - 2) * 10,
                  rotate: isHovered ? 0 : rotation,
                  x: baseX,
                  scale: isHovered ? 1.15 : 1,
                  zIndex: isHovered ? 50 : 10 - Math.abs(index - 2),
                } : {}}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div 
                  className={`w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${project.gradient} backdrop-blur-xl`}
                  style={{
                    boxShadow: isHovered 
                      ? "0 25px 60px rgba(0,0,0,0.5), 0 0 40px hsla(355, 75%, 55%, 0.2)" 
                      : "0 10px 40px rgba(0,0,0,0.4)",
                  }}
                >
                  <div className="absolute inset-0 glass-card rounded-2xl" />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                    <motion.div
                      animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    >
                      <project.icon className={`w-12 h-12 ${project.iconColor} mb-3`} />
                    </motion.div>
                    <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-tight">
                      {project.description}
                    </p>
                    
                    <motion.div
                      className="absolute bottom-4 flex items-center gap-1 text-primary text-xs font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    >
                      <span>View Project</span>
                      <ExternalLink size={12} />
                    </motion.div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Mobile - Looping Stacked Cards */}
        <div className="md:hidden relative h-[320px] flex items-center justify-center mb-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const pos = getStackPosition(index);
              return (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute w-[200px] aspect-square cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    rotate: pos.rotate,
                    scale: pos.scale,
                    x: pos.x,
                    y: pos.y,
                    zIndex: pos.zIndex,
                    opacity: pos.opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  onClick={(e) => {
                    if (index !== activeIndex) {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div 
                    className={`w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br ${project.gradient} backdrop-blur-xl`}
                    style={{
                      boxShadow: index === activeIndex 
                        ? "0 20px 50px rgba(0,0,0,0.5), 0 0 30px hsla(355, 75%, 55%, 0.15)" 
                        : "0 8px 30px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div className="absolute inset-0 glass-card rounded-2xl" />
                    
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                      <project.icon className={`w-10 h-10 ${project.iconColor} mb-3`} />
                      <h3 className="font-heading font-bold text-base text-foreground mb-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-tight mb-2">
                        {project.description}
                      </p>
                      {index === activeIndex && (
                        <motion.div
                          className="flex items-center gap-1 text-primary text-xs font-medium"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <span>Tap to view</span>
                          <ExternalLink size={12} />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="https://github.com/shift-xd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-xl border border-primary/20 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} />
            <span className="font-medium">View All on GitHub</span>
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
