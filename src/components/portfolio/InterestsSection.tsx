import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Box, Cpu, Palette, Settings, Lightbulb } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const interests = [
  {
    icon: Code,
    title: "Coding",
    description: "Creating efficient and elegant solutions through programming with various languages and frameworks.",
  },
  {
    icon: Box,
    title: "3D Modeling",
    description: "Designing three-dimensional digital models for visualization and 3D printing applications.",
  },
  {
    icon: Cpu,
    title: "PCB Designing",
    description: "Designing printed circuit boards that bring electronic projects to life with precision.",
  },
  {
    icon: Palette,
    title: "Creative Websites",
    description: "Building visually appealing and user-friendly websites with exceptional experiences.",
  },
  {
    icon: Settings,
    title: "Functional Design",
    description: "Creating designs that work effectively and efficiently for their intended purpose.",
  },
  {
    icon: Lightbulb,
    title: "Ideology",
    description: "Exploring conceptual frameworks that drive innovation and creative problem-solving.",
  },
];

export function InterestsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="interests" className="py-16 md:py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="My Interests"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Interests Grid - Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              className="glass-card rounded-xl md:rounded-2xl p-5 md:p-6 relative overflow-hidden group border border-primary/10 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, borderColor: "hsla(40, 65%, 55%, 0.3)" }}
            >
              {/* Accent bar */}
              <motion.div
                className="absolute left-0 top-0 w-1 h-full bg-primary/40"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="inline-flex p-3 rounded-xl bg-primary/10 mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <interest.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </motion.div>

              <h3 className="text-lg md:text-xl font-heading font-semibold text-primary mb-2 md:mb-3">
                {interest.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
