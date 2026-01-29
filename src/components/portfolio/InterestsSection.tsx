import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Box, Cpu, Palette, Settings, Lightbulb } from "lucide-react";

const interests = [
  {
    icon: Code,
    title: "Coding",
    description:
      "Creating efficient and elegant solutions through programming. I enjoy working with various languages and frameworks to bring ideas to life.",
  },
  {
    icon: Box,
    title: "3D Modeling",
    description:
      "Designing and creating three-dimensional digital models for various applications, from visualization to 3D printing.",
  },
  {
    icon: Cpu,
    title: "PCB Designing",
    description:
      "Designing printed circuit boards that bring electronic projects to life with precision and functionality.",
  },
  {
    icon: Palette,
    title: "Creative Websites",
    description:
      "Building visually appealing and user-friendly websites that provide exceptional digital experiences.",
  },
  {
    icon: Settings,
    title: "Functional Design",
    description:
      "Creating designs that not only look good but also work effectively and efficiently for their intended purpose.",
  },
  {
    icon: Lightbulb,
    title: "Ideology",
    description:
      "Exploring and developing conceptual frameworks that drive innovation and creative problem-solving.",
  },
];

export function InterestsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="interests" className="py-24 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-4">
            My Interests
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        {/* Interests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary/50"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
              />

              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <interest.icon className="w-7 h-7 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                {interest.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {interest.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
