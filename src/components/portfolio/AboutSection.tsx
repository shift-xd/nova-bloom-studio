import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Age", value: "18" },
  { label: "Projects Completed", value: "24+" },
  { label: "Coding Experience", value: "4 Years" },
  { label: "3D Modeling", value: "2 Years" },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gradient-gold mb-4">
            About Me
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* About Text */}
          <motion.div
            className="lg:col-span-3 glass-card rounded-2xl p-8"
            variants={itemVariants}
          >
            <div className="space-y-5 text-foreground/80 leading-relaxed">
              <p>
                Hello! I'm Hardrik, an 18-year-old developer and designer with a passion 
                for creating innovative digital experiences. My journey in technology began 
                with a curiosity about how things work, which evolved into a love for coding, 
                3D modeling, and electronics.
              </p>
              <p>
                I believe in the power of functional design - creating solutions that not 
                only look good but also serve a purpose effectively. Whether it's developing 
                a website, designing a 3D model, or creating a PCB layout, I approach each 
                project with attention to detail and a focus on user experience.
              </p>
              <p>
                My interests span across various domains, allowing me to bring a unique 
                perspective to each project. I'm constantly learning and exploring new 
                technologies to expand my skills and create even better solutions.
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="lg:col-span-2 glass-card rounded-2xl p-8"
            variants={itemVariants}
          >
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-muted/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, backgroundColor: "hsla(43, 56%, 57%, 0.1)" }}
                >
                  <div className="text-2xl md:text-3xl font-heading font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
