import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="section-divider max-w-2xl mx-auto" />
    </motion.div>
  );
}
