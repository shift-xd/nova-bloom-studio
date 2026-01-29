import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Stethoscope, Zap, Shield, Bot, Wrench, Github } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const projects = [
  {
    icon: Stethoscope,
    title: "MediScanXD",
    description:
      "A medical scanning application that helps in analyzing and diagnosing medical images with AI assistance.",
    link: "https://mediscanxd.netlify.app",
    linkText: "Live Demo",
  },
  {
    icon: Zap,
    title: "FlashXD",
    description:
      "A high-performance web application for lightning-fast file transfers and data processing.",
    link: "https://flashxd.netlify.app",
    linkText: "Live Demo",
  },
  {
    icon: Shield,
    title: "Enclosure",
    description:
      "A secure data enclosure system for protecting sensitive information with advanced encryption.",
    link: "https://enclosure.netlify.app",
    linkText: "Live Demo",
  },
  {
    icon: Bot,
    title: "Shift-GPT",
    description:
      "An AI-powered chatbot interface with custom functionality and enhanced response capabilities.",
    link: "https://shift-gpt.netlify.app",
    linkText: "Live Demo",
  },
  {
    icon: Wrench,
    title: "HackClub Blueprint",
    description:
      "Collection of projects from HackClub Blueprint, showcasing various coding and development skills.",
    link: "https://blueprint.hackclub.com/users/1267",
    linkText: "View Projects",
  },
  {
    icon: Github,
    title: "GitHub Repositories",
    description:
      "Various coding projects, experiments, and contributions hosted on my GitHub profile.",
    link: "https://github.com/shift-xd",
    linkText: "Visit GitHub",
  },
];

export function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="My Projects"
            className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="glass-card rounded-2xl overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Project Header with Icon */}
              <div className="h-40 bg-gradient-to-br from-secondary/40 to-muted/20 flex items-center justify-center relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
                    backgroundSize: '20px 20px',
                  }} />
                </div>
                
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <project.icon className="w-16 h-16 text-primary/70 group-hover:text-primary transition-colors" />
                </motion.div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {project.description}
                </p>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-primary/30 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {project.linkText}
                  <ExternalLink size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
