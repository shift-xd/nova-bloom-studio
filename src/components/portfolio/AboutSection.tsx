import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import BlurText from "@/components/ui/BlurText";
import { Flag, Tag, Stars } from "lucide-react";

const stats = [
  { label: "Age", value: "18", suffix: "" },
  { label: "Projects Completed", value: "24", suffix: "+" },
  { label: "Coding Experience", value: "4", suffix: " Years" },
  { label: "3D Modeling", value: "2", suffix: " Years" },
];

const characters = [
  {
    name: "Orpheus",
    description: "Hack Club mascot energy, front and center.",
    image: "/characters/orpheus.svg",
  },
  {
    name: "Raccoon Analyst",
    description: "Charts, data, and curious breakthroughs.",
    image: "/characters/raccoon-analyst.svg",
  },
  {
    name: "Dreamer",
    description: "Big ideas, bigger plans.",
    image: "/characters/dreamer.svg",
  },
  {
    name: "Cool Shade",
    description: "Low-key vibes with high confidence.",
    image: "/characters/cool-shades.svg",
  },
  {
    name: "Curious Raccoon",
    description: "Always in the loop, always exploring.",
    image: "/characters/curious-raccoon.svg",
  },
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
            <div className="mt-6 flex items-center justify-center lg:justify-start">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs md:text-sm text-foreground/80">
                <img
                  src="https://assets.hackclub.com/icon-rounded.svg"
                  alt="Hack Club logo"
                  className="h-6 w-6"
                  loading="lazy"
                />
                Proud member of Hack Club
              </div>
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
                  borderColor: "hsla(30, 100%, 53%, 0.35)",
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

        {/* Hack Club Member Highlight */}
        <motion.div
          className="mt-12 md:mt-16 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-5">
                <img
                  src="https://assets.hackclub.com/icon-rounded.svg"
                  alt="Hack Club logo"
                  className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 drop-shadow-[0_0_30px_rgba(236,55,80,0.45)]"
                  loading="lazy"
                />
                <div>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
                    Hack Club Member
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Building with the community, flying the flag, and sharing bold ideas.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 md:ml-auto">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs md:text-sm text-foreground/80">
                  <Flag className="h-4 w-4 text-primary" />
                  Flag bearer
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs md:text-sm text-foreground/80">
                  <Tag className="h-4 w-4 text-primary" />
                  Community builder
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs md:text-sm text-foreground/80">
                  <Stars className="h-4 w-4 text-primary" />
                  Hack Club spirit
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Character Gallery */}
        <motion.div
          className="mt-10 md:mt-14"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.6 }}
        >
          <div className="text-center mb-6 md:mb-8">
            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">
              The Crew &amp; Orpheus
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mt-2">
              Bringing the characters into the story with a clean, playful lineup.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                className="character-card glass-card rounded-2xl p-4 border border-white/10 text-center flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.08, duration: 0.4, type: "spring" }}
                whileHover={{ y: -4, borderColor: "hsla(262, 90%, 64%, 0.4)" }}
              >
                <div className="character-illustration rounded-2xl bg-white/5 border border-white/10 p-3">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-24 w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground">{character.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{character.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
