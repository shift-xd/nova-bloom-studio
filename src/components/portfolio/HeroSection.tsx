import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowDown, Github, Instagram, Mail } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const socialLinks = [
  { icon: Github, href: "https://github.com/shift-xd", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/_shift_xd_/", label: "Instagram" },
  { icon: Mail, href: "mailto:lastsurvivor857@gmail.com", label: "Email" },
];

const SECRET_URL = "https://gist.github.com/shift-xd/f80ee0786bf0dd683ffc02569a1ead34";
const REQUIRED_CLICKS = 30;
const RESET_TIME = 3000;

export function HeroSection() {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTimeRef = useRef(0);

  const handleProfileClick = () => {
    const currentTime = Date.now();
    
    if (currentTime - lastClickTimeRef.current > RESET_TIME) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    lastClickTimeRef.current = currentTime;

    if (clickCount + 1 >= REQUIRED_CLICKS) {
      setClickCount(0);
      window.location.href = SECRET_URL;
    }
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      
      {/* Glowing orb effect */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, hsla(43, 56%, 57%, 0.15) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-2 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-primary font-medium mb-3 md:mb-4 tracking-wider text-xs md:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              WELCOME TO MY PORTFOLIO
            </motion.p>

            <BlurText
              text="Hardrik Thomas Shaji"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 md:mb-6 leading-tight text-foreground flex flex-wrap justify-center lg:justify-start"
              delay={100}
              animateBy="words"
              direction="top"
            />

            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-primary font-medium mb-4 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Developer • Designer • Creator
            </motion.p>

            <motion.p
              className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 mb-6 md:mb-8 leading-relaxed px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              An 18-year-old passionate about coding, 3D modeling, PCB designing, 
              and creating innovative digital experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                onClick={() => scrollToSection("#contact")}
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px hsla(43, 56%, 57%, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border border-primary/30 text-foreground font-semibold rounded-lg hover:bg-primary/10 transition-colors text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3 md:gap-4 mt-8 md:mt-10 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/60 transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, hsla(43, 56%, 57%, 0.3), hsla(213, 45%, 45%, 0.2))",
                  filter: "blur(40px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Image container with click counter */}
              <motion.div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-primary/40 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 1.03 }}
                onClick={handleProfileClick}
                style={{
                  boxShadow: "0 0 60px hsla(40, 65%, 55%, 0.25)",
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/206735051?v=4"
                  alt="Hardrik Thomas Shaji"
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <button
            onClick={() => scrollToSection("#about")}
            className="text-primary/60 hover:text-primary transition-colors"
            aria-label="Scroll to About"
          >
            <ArrowDown size={28} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
