import { motion } from "framer-motion";
import { Github, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/_shift_xd_/", label: "Instagram" },
  { icon: Mail, href: "mailto:lastsurvivor857@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/shift-xd", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl glass-card border border-white/5 flex items-center justify-center text-foreground/50 hover:text-primary hover:border-primary/30 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Hardrik Thomas Shaji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
