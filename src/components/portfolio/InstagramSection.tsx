import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

export function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.instgrm) {
        // @ts-ignore
        window.instgrm.Embeds.process();
      }
      setEmbedLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <section 
      id="instagram" 
      className="py-16 md:py-24 relative overflow-hidden" 
      ref={ref}
    >
      {/* Gradient Merge Effect - Top */}
      <div 
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background)) 20%, transparent 100%)",
        }}
      />
      
      {/* Fun playful gradient background */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: "linear-gradient(135deg, hsla(330, 85%, 60%, 0.3) 0%, hsla(270, 60%, 60%, 0.2) 30%, hsla(175, 80%, 45%, 0.2) 70%, hsla(30, 90%, 60%, 0.3) 100%)",
        }}
      />
      
      {/* Floating blob decorations */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 blob opacity-20"
        style={{ background: "linear-gradient(135deg, hsl(330, 85%, 60%), hsl(270, 60%, 60%))" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-48 h-48 blob opacity-20"
        style={{ background: "linear-gradient(135deg, hsl(175, 80%, 45%), hsl(200, 70%, 50%))" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {/* Gradient Merge Effect - Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background)) 20%, transparent 100%)",
        }}
      />

      {/* Fog/Vignette effect on sides - curvy gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 30%, hsl(var(--background)) 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-20">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="✨ Instagram Feed ✨"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base px-4 font-body">
            Follow my journey and see what I'm working on! 🚀
          </p>
        </motion.div>

        {/* Profile Card - Curvy and Fun */}
        <motion.div
          className="max-w-md mx-auto mb-8 glass-card p-6 border-2 border-primary/30 gradient-border-animated"
          initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div 
              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-primary/50 blob"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img
                src="https://avatars.githubusercontent.com/u/206735051?v=4"
                alt="Instagram Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-elegant text-xl text-foreground">@_shift_xd_</h3>
              <p className="text-muted-foreground text-sm font-body">Hardrik Thomas Shaji</p>
            </div>
            <motion.a
              href="https://www.instagram.com/_shift_xd_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white squish"
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <Instagram size={20} />
            </motion.a>
          </div>
          
          {/* Stats with fun styling */}
          <div className="flex justify-around text-center border-t-2 border-primary/20 pt-4 rounded-lg">
            {[
              { value: "24+", label: "Posts", emoji: "📸" },
              { value: "500+", label: "Followers", emoji: "💖" },
              { value: "200+", label: "Following", emoji: "👀" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-bold text-foreground text-lg">{stat.emoji} {stat.value}</p>
                <p className="text-muted-foreground text-xs font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actual Instagram Embed */}
        <motion.div
          className="max-w-lg mx-auto relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Gradient fog border */}
          <div 
            className="absolute -inset-6 rounded-[3rem] pointer-events-none z-10"
            style={{
              background: `
                radial-gradient(ellipse at top, hsla(330, 85%, 60%, 0.4) 0%, transparent 50%),
                radial-gradient(ellipse at bottom, hsla(175, 80%, 45%, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at left, hsla(270, 60%, 60%, 0.3) 0%, transparent 50%),
                radial-gradient(ellipse at right, hsla(30, 90%, 60%, 0.3) 0%, transparent 50%)
              `,
              filter: "blur(20px)",
            }}
          />
          
          {/* Instagram Embed Container */}
          <div className="relative bg-card rounded-[2rem] overflow-hidden border-2 border-primary/20 shadow-xl">
            {/* Instagram profile embed - using blockquote for actual embed */}
            <div className="p-4 min-h-[450px] flex items-center justify-center">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/_shift_xd_/"
                data-instgrm-version="14"
                style={{
                  background: 'transparent',
                  border: 0,
                  borderRadius: '2rem',
                  boxShadow: 'none',
                  margin: '0 auto',
                  maxWidth: '100%',
                  minWidth: '280px',
                  padding: 0,
                  width: '100%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href="https://www.instagram.com/_shift_xd_/" 
                    style={{
                      background: 'hsl(var(--card))',
                      lineHeight: 0,
                      padding: 0,
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1rem'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/30 mx-auto mt-4">
                      <img
                        src="https://avatars.githubusercontent.com/u/206735051?v=4"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-foreground font-bold text-lg">@_shift_xd_</p>
                    <p className="text-muted-foreground text-sm">View Instagram Profile</p>
                    <div className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold mt-2">
                      Open Instagram
                    </div>
                  </a>
                </div>
              </blockquote>
            </div>

            {/* Direct link to Instagram profile */}
            <a
              href="https://www.instagram.com/_shift_xd_/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 text-center text-primary hover:text-primary/80 text-sm font-semibold transition-colors border-t-2 border-primary/10 bg-muted/30"
            >
              <span className="inline-flex items-center gap-2">
                View full profile on Instagram 
                <ExternalLink size={14} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* Fun Follow Button */}
        <motion.div
          className="text-center mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="https://www.instagram.com/_shift_xd_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-full text-lg squish shadow-lg"
            whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={22} />
            Follow me! 💖
            <ExternalLink size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
