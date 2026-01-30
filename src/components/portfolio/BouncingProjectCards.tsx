import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Stethoscope, Zap, Shield, Bot, Wrench, Github } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const projects = [
  {
    icon: Stethoscope,
    title: "MediScanXD",
    description: "AI-powered medical image analysis",
    link: "https://mediscanxd.netlify.app",
    color: "from-emerald-500/30 to-teal-600/30",
    rotation: -15,
    translateY: 0,
  },
  {
    icon: Zap,
    title: "FlashXD",
    description: "Lightning-fast file transfers",
    link: "https://flashxd.netlify.app",
    color: "from-yellow-500/30 to-amber-600/30",
    rotation: -8,
    translateY: 20,
  },
  {
    icon: Shield,
    title: "Enclosure",
    description: "Secure data encryption system",
    link: "https://enclosure.netlify.app",
    color: "from-blue-500/30 to-indigo-600/30",
    rotation: 0,
    translateY: 30,
  },
  {
    icon: Bot,
    title: "Shift-GPT",
    description: "Custom AI chatbot interface",
    link: "https://shift-gpt.netlify.app",
    color: "from-purple-500/30 to-violet-600/30",
    rotation: 8,
    translateY: 20,
  },
  {
    icon: Wrench,
    title: "HackClub",
    description: "Blueprint project collection",
    link: "https://blueprint.hackclub.com/users/1267",
    color: "from-rose-500/30 to-pink-600/30",
    rotation: 15,
    translateY: 0,
  },
];

export function BouncingProjectCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedView, setExpandedView] = useState(false);

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
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Bouncing Cards Container - Desktop */}
        <div className="hidden md:flex justify-center items-center relative h-[450px] mb-12">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const baseX = (index - 2) * 180;
            
            return (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute w-[200px] aspect-square rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  boxShadow: isHovered 
                    ? "0 20px 50px rgba(0,0,0,0.4), 0 0 30px hsla(40, 65%, 55%, 0.3)" 
                    : "0 8px 30px rgba(0,0,0,0.3)",
                }}
                initial={{ 
                  opacity: 0, 
                  y: 100,
                  rotate: project.rotation,
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: project.translateY,
                  rotate: isHovered ? 0 : project.rotation,
                  x: baseX,
                  scale: isHovered ? 1.15 : 1,
                  zIndex: isHovered ? 50 : 10 - Math.abs(index - 2),
                } : {}}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                {/* Card Border */}
                <div className="absolute inset-0 border-4 border-white/20 rounded-2xl z-10 pointer-events-none" />
                
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                
                {/* Glass overlay */}
                <div className="absolute inset-0 glass-card" />
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                  <motion.div
                    animate={isHovered ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <project.icon className="w-12 h-12 text-primary mb-3" />
                  </motion.div>
                  <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-xs leading-tight">
                    {project.description}
                  </p>
                  
                  {/* Hover indicator */}
                  <motion.div
                    className="absolute bottom-3 flex items-center gap-1 text-primary text-xs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  >
                    <span>View Project</span>
                    <ExternalLink size={12} />
                  </motion.div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Mobile Cards Grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {projects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              <div className="absolute inset-0 glass-card" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-3 text-center">
                <project.icon className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-heading font-bold text-sm text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-[10px] leading-tight">
                  {project.description}
                </p>
              </div>
            </motion.a>
          ))}
          
          {/* GitHub Card */}
          <motion.a
            href="https://github.com/shift-xd"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/10 col-span-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50" />
            <div className="absolute inset-0 glass-card" />
            
            <div className="relative z-10 h-full flex items-center justify-center gap-4 p-4">
              <Github className="w-10 h-10 text-primary" />
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">GitHub</h3>
                <p className="text-muted-foreground text-xs">View all repositories</p>
              </div>
              <ExternalLink className="w-5 h-5 text-primary" />
            </div>
          </motion.a>
        </div>

        {/* Desktop GitHub Link */}
        <motion.div
          className="hidden md:block text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="https://github.com/shift-xd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full border border-primary/30 text-foreground hover:text-primary hover:border-primary/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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