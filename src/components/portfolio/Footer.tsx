import { motion } from "framer-motion";
import { Github, Instagram, Mail, Sparkles } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/_shift_xd_/", label: "Instagram" },
  { icon: Mail, href: "mailto:lastsurvivor857@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/shift-xd", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="relative py-16 border-t border-primary/20 overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center gap-8">
          {/* Decorative element */}
          <motion.div
            className="flex items-center gap-3 text-primary/60"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/40" />
            <Sparkles size={16} className="text-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/40" />
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative w-12 h-12 rounded-full glass-card border border-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                <social.icon size={20} className="relative z-10" />
              </motion.a>
            ))}
          </div>

          {/* Tagline */}
          <motion.p
            className="text-sm text-muted-foreground/80 font-medium tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Crafting digital experiences with <span className="text-primary">passion</span>
          </motion.p>

          {/* Copyright with flair */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-muted-foreground/30" />
            <p className="text-muted-foreground text-sm text-center">
              © {new Date().getFullYear()} Hardrik Thomas Shaji
            </p>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-muted-foreground/30" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
