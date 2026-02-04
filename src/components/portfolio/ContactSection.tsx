import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Instagram, Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BlurText from "@/components/ui/BlurText";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "lastsurvivor857@gmail.com",
    href: "mailto:lastsurvivor857@gmail.com",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@_shift_xd_",
    href: "https://www.instagram.com/_shift_xd_/",
    gradient: "from-violet-500/15 to-cyan-500/10",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "shift-xd",
    href: "https://github.com/shift-xd",
    gradient: "from-slate-500/20 to-white/5",
  },
];

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:lastsurvivor857@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    toast({
      title: "Opening email client...",
      description: "Your message is ready to send!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="Get In Touch"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto" />
        </motion.div>

        {/* Contact Grid - Centered */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Contact Methods */}
          <motion.div
            className="flex-1 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, type: "spring", damping: 25 }}
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`flex items-center gap-4 glass-card rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-300 group bg-gradient-to-br ${method.gradient}`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4, type: "spring" }}
                whileHover={{ x: 8, scale: 1.02 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  <method.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm md:text-base">
                    {method.label}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm">{method.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex-1 glass-card rounded-2xl p-5 md:p-6 border border-white/10"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", damping: 25 }}
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all duration-300 text-sm"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all duration-300 text-sm"
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all duration-300 text-sm"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:bg-white/10 transition-all duration-300 resize-none text-sm"
                required
              />
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl transition-all duration-300 text-sm md:text-base btn-premium"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                Send Message
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
