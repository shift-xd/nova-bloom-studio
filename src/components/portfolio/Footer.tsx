import { motion } from "framer-motion";
import { Github, Instagram, Mail } from "lucide-react";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/_shift_xd_/", label: "Instagram" },
  { icon: Mail, href: "mailto:lastsurvivor857@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/shift-xd", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="py-12 border-t border-primary/10">
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
                className="w-11 h-11 rounded-full border border-primary/30 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
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
