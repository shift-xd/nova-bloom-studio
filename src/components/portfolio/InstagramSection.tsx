import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, ExternalLink, Heart, MessageCircle, Users } from "lucide-react";
import BlurText from "@/components/ui/BlurText";

const instagramPosts = [
  {
    id: 1,
    type: "image",
    placeholder: "🎮 Gaming Setup",
    likes: 142,
    comments: 23,
  },
  {
    id: 2,
    type: "image",
    placeholder: "💻 Code Session",
    likes: 256,
    comments: 45,
  },
  {
    id: 3,
    type: "image",
    placeholder: "🎨 3D Artwork",
    likes: 189,
    comments: 31,
  },
  {
    id: 4,
    type: "image",
    placeholder: "⚡ PCB Design",
    likes: 324,
    comments: 67,
  },
  {
    id: 5,
    type: "image",
    placeholder: "🎯 New Project",
    likes: 412,
    comments: 89,
  },
  {
    id: 6,
    type: "image",
    placeholder: "✨ Late Night",
    likes: 198,
    comments: 42,
  },
];

export function InstagramSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="instagram" 
      className="py-16 md:py-24 relative overflow-hidden" 
      ref={ref}
    >
      {/* Gradient Merge Effect - Top */}
      <div 
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, hsl(var(--background)), transparent)",
        }}
      />
      
      {/* Instagram-style gradient background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)",
        }}
      />
      
      {/* Hollow Knight themed overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsla(40, 65%, 55%, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Gradient Merge Effect - Bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <BlurText
            text="Instagram Feed"
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary mb-4 justify-center flex flex-wrap"
            delay={80}
            animateBy="characters"
          />
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base px-4">
            Follow my journey and see what I'm working on
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          className="max-w-md mx-auto mb-12 glass-card rounded-2xl p-6 border border-primary/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/40">
              <img
                src="https://avatars.githubusercontent.com/u/206735051?v=4"
                alt="Instagram Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-bold text-lg text-foreground">@_shift_xd_</h3>
              <p className="text-muted-foreground text-sm">Hardrik Thomas Shaji</p>
            </div>
            <motion.a
              href="https://www.instagram.com/_shift_xd_/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram size={20} />
            </motion.a>
          </div>
          
          {/* Stats */}
          <div className="flex justify-around text-center border-t border-primary/10 pt-4">
            <div>
              <p className="font-bold text-foreground text-lg">24+</p>
              <p className="text-muted-foreground text-xs">Posts</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">500+</p>
              <p className="text-muted-foreground text-xs">Followers</p>
            </div>
            <div>
              <p className="font-bold text-foreground text-lg">200+</p>
              <p className="text-muted-foreground text-xs">Following</p>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/_shift_xd_/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square glass-card rounded-lg md:rounded-xl overflow-hidden group border border-primary/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 to-muted/40 flex items-center justify-center">
                <span className="text-2xl md:text-4xl">{post.placeholder.split(" ")[0]}</span>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-1 text-white text-xs md:text-sm">
                  <Heart size={14} fill="white" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-white text-xs md:text-sm">
                  <MessageCircle size={14} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow Button */}
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={18} />
            Follow on Instagram
            <ExternalLink size={14} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}