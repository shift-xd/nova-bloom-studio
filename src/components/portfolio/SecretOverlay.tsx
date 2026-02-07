import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Unlock, Loader2, Shield, Eye } from "lucide-react";

// Obfuscated password check - not plaintext
const _k = [72,97,114,100,114,105,107,64,57,51,49,49];
const verify = (input: string): boolean => {
  if (input.length !== _k.length) return false;
  let match = true;
  for (let i = 0; i < _k.length; i++) {
    if (input.charCodeAt(i) !== _k[i]) match = false;
  }
  return match;
};

const GIST_ID = "f80ee0786bf0dd683ffc02569a1ead34";

interface SecretOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animated scanning line effect
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent pointer-events-none"
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
    />
  );
}

// Floating particle dots for the password screen
function VaultParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${10 + (i * 7) % 80}%`,
            top: `${15 + (i * 11) % 70}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function SecretOverlay({ isOpen, onClose }: SecretOverlayProps) {
  const [phase, setPhase] = useState<"password" | "loading" | "content">("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [gistContent, setGistContent] = useState<{ filename: string; content: string }[]>([]);
  const [shake, setShake] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && phase === "password") {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, phase]);

  useEffect(() => {
    if (!isOpen) {
      setPhase("password");
      setPassword("");
      setError(false);
      setGistContent([]);
      setShowPassword(false);
      setAttempts(0);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verify(password)) {
      setError(true);
      setShake(true);
      setAttempts(prev => prev + 1);
      setTimeout(() => setShake(false), 600);
      setPassword("");
      return;
    }

    setError(false);
    setPhase("loading");

    try {
      const res = await fetch(`https://api.github.com/gists/${GIST_ID}`);
      const data = await res.json();
      const files = Object.values(data.files) as { filename: string; content: string }[];
      setGistContent(files);
      setPhase("content");
    } catch {
      setGistContent([{ filename: "Error", content: "Failed to load content. Try again later." }]);
      setPhase("content");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop with animated gradient */}
          <motion.div
            className="absolute inset-0 backdrop-blur-2xl"
            style={{
              background: "radial-gradient(ellipse at center, hsla(30, 100%, 53%, 0.05) 0%, rgba(0,0,0,0.95) 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Ambient glow */}
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, hsla(30, 100%, 53%, 0.08) 0%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col"
            initial={{ scale: 0.85, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-card/90 border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-300 backdrop-blur-xl shadow-lg"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>

            {/* Password Phase */}
            <AnimatePresence mode="wait">
              {phase === "password" && (
                <motion.div
                  key="password"
                  className="relative rounded-3xl border border-white/10 bg-card/90 backdrop-blur-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6),_0_0_60px_hsla(30,100%,53%,0.08)]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <ScanLine />
                  <VaultParticles />

                  {/* Top decorative bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <div className="p-8 md:p-12">
                    <div className="flex flex-col items-center text-center gap-5">
                      {/* Animated vault icon */}
                      <motion.div
                        className="relative"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 15, delay: 0.2 }}
                      >
                        <motion.div
                          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center relative"
                          animate={{
                            boxShadow: [
                              "0 0 20px hsla(30, 100%, 53%, 0.05), inset 0 0 20px hsla(30, 100%, 53%, 0.03)",
                              "0 0 50px hsla(30, 100%, 53%, 0.15), inset 0 0 30px hsla(30, 100%, 53%, 0.08)",
                              "0 0 20px hsla(30, 100%, 53%, 0.05), inset 0 0 20px hsla(30, 100%, 53%, 0.03)",
                            ],
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <Shield className="text-primary" size={32} />
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-card border border-primary/30 flex items-center justify-center"
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Lock className="text-primary" size={10} />
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 tracking-tight">
                          Vault Access
                        </h2>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto leading-relaxed">
                          You've found a hidden area. Enter the passphrase to unlock classified content.
                        </p>
                      </motion.div>

                      <motion.form
                        onSubmit={handleSubmit}
                        className="w-full max-w-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <motion.div
                          animate={shake ? { x: [-14, 14, -10, 10, -5, 5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <input
                            ref={inputRef}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setError(false);
                            }}
                            placeholder="• • • • • • • •"
                            className={`w-full px-5 py-4 rounded-2xl bg-background/60 border ${
                              error ? "border-destructive/50 shadow-[0_0_20px_hsla(0,85%,55%,0.1)]" : "border-white/10 focus:border-primary/40"
                            } text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/15 transition-all text-center text-sm tracking-[0.3em] font-mono pr-12`}
                            autoComplete="off"
                            spellCheck={false}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-primary/60 transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        </motion.div>

                        {error && (
                          <motion.div
                            className="flex items-center justify-center gap-2 mt-3"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                            <p className="text-destructive/80 text-xs font-medium">
                              Access denied{attempts > 2 ? ` · ${attempts} failed attempts` : ""}
                            </p>
                          </motion.div>
                        )}

                        <motion.button
                          type="submit"
                          className="w-full mt-5 px-6 py-3.5 bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground font-semibold rounded-2xl transition-all duration-300 text-sm shadow-[0_15px_40px_hsla(30,100%,53%,0.2)] relative overflow-hidden group"
                          whileHover={{ scale: 1.01, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <Unlock size={16} />
                            Authenticate
                          </span>
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        </motion.button>
                      </motion.form>

                      {/* Security indicator */}
                      <motion.div
                        className="flex items-center gap-2 text-muted-foreground/40 text-[10px] tracking-wider uppercase"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="w-1 h-1 rounded-full bg-secondary animate-pulse" />
                        End-to-end encrypted
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom decorative bar */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </motion.div>
              )}

              {/* Loading Phase */}
              {phase === "loading" && (
                <motion.div
                  key="loading"
                  className="relative rounded-3xl border border-white/10 bg-card/90 backdrop-blur-2xl p-12 shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex flex-col items-center gap-6 overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  <ScanLine />

                  <motion.div className="relative">
                    <motion.div
                      className="w-16 h-16 rounded-2xl border-2 border-primary/30 flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="text-primary" size={28} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      animate={{
                        boxShadow: [
                          "0 0 15px hsla(30, 100%, 53%, 0.1)",
                          "0 0 40px hsla(30, 100%, 53%, 0.25)",
                          "0 0 15px hsla(30, 100%, 53%, 0.1)",
                        ],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </motion.div>

                  <div className="text-center">
                    <p className="text-foreground/80 text-sm font-medium mb-1">Decrypting vault...</p>
                    <motion.div className="flex items-center justify-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary/50"
                          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Content Phase */}
              {phase === "content" && (
                <motion.div
                  key="content"
                  className="rounded-3xl border border-white/10 bg-card/90 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.6),_0_0_60px_hsla(30,100%,53%,0.06)] overflow-hidden flex flex-col max-h-[90vh]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 shrink-0 bg-background/30">
                    <motion.div
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <Unlock className="text-primary" size={15} />
                    </motion.div>
                    <div>
                      <h3 className="text-sm font-heading font-semibold text-foreground">
                        Vault Unlocked
                      </h3>
                      <p className="text-[10px] text-muted-foreground/50 tracking-wider uppercase">
                        {gistContent.length} file{gistContent.length !== 1 ? "s" : ""} decrypted
                      </p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                      <span className="text-[10px] text-secondary/70 font-mono">LIVE</span>
                    </div>
                  </div>

                  {/* Scrollable content */}
                  <div className="overflow-y-auto p-6 flex-1 space-y-6">
                    {gistContent.map((file, index) => (
                      <motion.div
                        key={file.filename}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, type: "spring", damping: 20 }}
                      >
                        {/* File header */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 rounded-full bg-primary/50" />
                          <h4 className="text-xs font-mono text-primary/70 tracking-wider">
                            {file.filename}
                          </h4>
                          <div className="flex-1 h-px bg-gradient-to-r from-white/5 to-transparent" />
                        </div>

                        {/* File content */}
                        <div className="relative rounded-2xl bg-background/50 border border-white/5 p-5 overflow-x-auto group">
                          {/* Corner accents */}
                          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/15 rounded-tl-lg" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/15 rounded-br-lg" />

                          <p className="text-sm text-foreground/80 leading-[1.8] whitespace-pre-wrap break-words font-sans">
                            {file.content}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-3 border-t border-white/5 bg-background/20 shrink-0">
                    <p className="text-[10px] text-muted-foreground/30 text-center tracking-widest uppercase font-mono">
                      ◆ Classified Content ◆
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
