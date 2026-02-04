import { motion } from "framer-motion";
import { Github, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { 
    icon: Github, 
    href: "https://github.com/shift-xd", 
    label: "GitHub",
  },
  { 
    icon: Instagram, 
    href: "https://www.instagram.com/_shift_xd_/", 
    label: "Instagram",
  },
  { 
    icon: Mail, 
    href: "mailto:lastsurvivor857@gmail.com", 
    label: "Email",
  },
];

export function SocialDock() {
  return (
    <motion.div 
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, type: "spring", damping: 25 }}
    >
      {/* Vertical line above */}
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-primary/60 mx-auto" />
      
      {/* Social icons */}
      <div className="flex flex-col gap-2">
        {socialLinks.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target={social.label !== "Email" ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full glass-card border border-white/10 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/40 transition-all duration-300"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.7 + index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ 
              scale: 1.15, 
              x: 5,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={social.label}
          >
            <social.icon size={18} />
          </motion.a>
        ))}
      </div>
      
      {/* Vertical line below */}
      <div className="w-px h-16 bg-gradient-to-t from-transparent via-white/20 to-primary/60 mx-auto" />
    </motion.div>
  );
}
