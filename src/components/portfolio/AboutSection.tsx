import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlurText from "@/components/ui/BlurText";

const stats = [
  { label: "Age", value: "18", suffix: "" },
  { label: "Projects Completed", value: "24", suffix: "+" },
  { label: "Coding Experience", value: "4", suffix: " Years" },
  { label: "3D Modeling", value: "2", suffix: " Years" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="About Me"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </motion.div>

        {/* Content Grid - Centered */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* About Text */}
          <motion.div
            className="flex-1 glass-card rounded-2xl p-6 md:p-8 border border-white/10 shimmer"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", damping: 25 }}
          >
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base text-center lg:text-left font-body">
              <p>
                Hello! I'm Hardrik, an 18-year-old developer and designer with a passion 
                for creating innovative digital experiences. My journey in technology 
                began with a curiosity about how things work, which evolved into a love 
                for coding, 3D modeling, and electronics.
              </p>
              <p>
                I believe in the power of functional design - creating solutions that 
                not only look good but also work effectively. Whether it's developing 
                a website, designing a 3D model, or creating a PCB layout, I approach 
                each project with attention to detail.
              </p>
              <p>
                My interests span across various domains, allowing me to bring a unique 
                perspective to each project. I'm constantly learning and exploring new 
                technologies to expand my skills.
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="w-full lg:w-auto grid grid-cols-2 gap-3 md:gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", damping: 25 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-card rounded-xl p-4 md:p-6 border border-white/10 text-center relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.4, type: "spring" }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: "hsla(355, 75%, 55%, 0.3)",
                }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <p className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1 relative z-10">
                  {stat.value}
                  <span className="text-lg md:text-xl">{stat.suffix}</span>
                </p>
                <p className="text-xs md:text-sm text-muted-foreground relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
