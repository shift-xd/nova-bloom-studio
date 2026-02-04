import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Stethoscope, Zap, Shield, Bot, Wrench, Github } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    icon: Stethoscope,
    title: "MediScanXD",
    description: "AI-powered medical image analysis for healthcare professionals",
    link: "https://mediscanxd.netlify.app",
  },
  {
    icon: Zap,
    title: "FlashXD",
    description: "Lightning-fast file transfers and data processing",
    link: "https://flashxd.netlify.app",
  },
  {
    icon: Shield,
    title: "Enclosure",
    description: "Secure data encryption and protection system",
    link: "https://enclosure.netlify.app",
  },
  {
    icon: Bot,
    title: "Shift-GPT",
    description: "Custom AI chatbot with enhanced capabilities",
    link: "https://shift-gpt.netlify.app",
  },
  {
    icon: Wrench,
    title: "HackClub",
    description: "Blueprint project collection and experiments",
    link: "https://blueprint.hackclub.com/users/1267",
  },
];

export function BouncingProjectCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/characters/raccoon-analyst.svg"
            alt="Raccoon analyst"
            className="mx-auto mb-4 w-20 sm:w-24 opacity-70"
            loading="lazy"
          />
          <BlurText
            text="My Projects"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto" />
        </motion.div>

        {/* Desktop - Stacked Bouncing Cards */}
        {!isMobile && (
          <div className="hidden md:flex justify-center items-center relative h-[400px] mb-12">
            {projects.map((project, index) => {
              const isHovered = hoveredIndex === index;
              const baseX = (index - 2) * 180;
              const rotation = (index - 2) * 6;
              
              return (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute w-[170px] aspect-square cursor-pointer gpu-accelerated"
                  initial={{ opacity: 0, y: 100, rotate: rotation }}
                  animate={isInView ? { 
                    opacity: 1, 
                    y: isHovered ? -15 : Math.abs(index - 2) * 8,
                    rotate: isHovered ? 0 : rotation,
                    x: baseX,
                    scale: isHovered ? 1.12 : 1,
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
                    className="w-full h-full rounded-2xl overflow-hidden glass-card border border-white/10"
                    style={{
                      boxShadow: isHovered 
                        ? "0 25px 50px rgba(0,0,0,0.5), 0 0 30px hsla(262, 90%, 64%, 0.2)" 
                        : "0 10px 30px rgba(0,0,0,0.4)",
                    }}
                  >
                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                      <motion.div
                        animate={isHovered ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                      >
                        <project.icon className="w-10 h-10 text-primary mb-3" />
                      </motion.div>
                      <h3 className="font-heading font-bold text-base text-foreground mb-1">
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
        )}

        {/* Mobile - Stacked Auto Carousel */}
        {isMobile && (
          <motion.div 
            className="md:hidden relative mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="stacked-cards-container mx-auto max-w-sm">
              {projects.map((project, index) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stacked-card w-[85%] glass-card rounded-2xl p-6 border border-white/10 h-[210px] flex flex-col"
                  style={{
                    animationDuration: "12s",
                    animationDelay: `${index * 2.4}s`,
                    animationIterationCount: "infinite",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.4, type: "spring" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4">
                    <span>View Project</span>
                    <ExternalLink size={14} />
                  </div>
                </motion.a>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground/80 mt-6">
              Auto-swiping through the stack — tap a card to open.
            </p>
          </motion.div>
        )}

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
            className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-white/10 text-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
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
