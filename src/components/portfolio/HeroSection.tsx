import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowDown, Github, Instagram, Mail } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import RotatingText from "@/components/ui/RotatingText";

const socialLinks = [
  { icon: Github, href: "https://github.com/shift-xd", label: "GitHub" },
  { icon: Instagram, href: "https://www.instagram.com/_shift_xd_/", label: "Instagram" },
  { icon: Mail, href: "mailto:lastsurvivor857@gmail.com", label: "Email" },
];

const SECRET_URL = "https://gist.github.com/shift-xd/f80ee0786bf0dd683ffc02569a1ead34";
const REQUIRED_CLICKS = 30;
const RESET_TIME = 3000;
const floatingImages = [
  {
    src: "/characters/orpheus.svg",
    alt: "Orpheus",
    className: "top-10 left-6 w-16 sm:w-20 md:w-24 opacity-70",
  },
  {
    src: "/characters/curious-raccoon.svg",
    alt: "Curious raccoon",
    className: "top-24 right-6 w-14 sm:w-16 md:w-20 opacity-60",
  },
  {
    src: "/characters/dreamer.svg",
    alt: "Dreamer",
    className: "bottom-10 left-10 w-12 sm:w-14 md:w-16 opacity-50",
  },
];

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
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden px-4">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_hsla(262,90%,64%,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_hsla(196,90%,60%,0.14),_transparent_60%)]" />
      {floatingImages.map((image, index) => (
        <motion.img
          key={image.alt}
          src={image.src}
          alt={image.alt}
          className={`absolute hidden sm:block floating-character ${image.className}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6 + index, repeat: Infinity, ease: "easeInOut" }}
          loading="lazy"
        />
      ))}
      
      {/* Glowing orb effect */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] md:w-[640px] h-[320px] md:h-[640px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, hsla(262, 90%, 64%, 0.16) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
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
            className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.p
              className="text-primary/80 font-medium mb-3 md:mb-4 tracking-[0.3em] text-xs md:text-sm uppercase"
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

            <motion.div
              className="text-lg md:text-xl lg:text-2xl text-primary font-semibold mb-4 md:mb-6 flex items-center gap-2 justify-center lg:justify-start flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-foreground/70">Passionate about</span>
              <RotatingText
                texts={["3D Modeling", "Coding", "PCB Designing", "Web Design", "Electronics"]}
                mainClassName="text-primary font-bold"
                staggerFrom="first"
                staggerDuration={0.025}
                rotationInterval={2500}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.div>

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
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-full transition-all duration-300 text-sm md:text-base btn-premium shadow-[0_20px_50px_hsla(262,90%,64%,0.25)]"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.button>

              <motion.button
                onClick={() => scrollToSection("#projects")}
                className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 border border-white/10 text-foreground font-semibold rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 text-sm md:text-base"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
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
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-card border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring", damping: 25 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full md:hidden"
                style={{
                  background: "radial-gradient(circle, hsla(196, 90%, 60%, 0.2) 0%, transparent 65%)",
                  filter: "blur(30px)",
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(135deg, hsla(262, 90%, 64%, 0.25), hsla(196, 90%, 60%, 0.12))",
                  filter: "blur(50px)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Image container with click counter */}
              <motion.div
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border border-white/15 cursor-pointer"
                whileHover={{ scale: 1.02, borderColor: "hsla(262, 90%, 64%, 0.45)" }}
                whileTap={{ scale: 1.03 }}
                onClick={handleProfileClick}
                style={{
                  boxShadow: "0 0 80px hsla(262, 90%, 64%, 0.2)",
                }}
              >
                <img
                  src="https://avatars.githubusercontent.com/u/206735051?v=4"
                  alt="Hardrik Thomas Shaji"
                  className="w-full h-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <button
            onClick={() => scrollToSection("#about")}
            className="text-primary/50 hover:text-primary transition-colors duration-300"
            aria-label="Scroll to About"
          >
            <ArrowDown size={28} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
