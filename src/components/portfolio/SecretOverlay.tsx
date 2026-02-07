import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Unlock, Loader2 } from "lucide-react";

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

export function SecretOverlay({ isOpen, onClose }: SecretOverlayProps) {
  const [phase, setPhase] = useState<"password" | "loading" | "content">("password");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [gistContent, setGistContent] = useState<{ filename: string; content: string }[]>([]);
  const [shake, setShake] = useState(false);
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
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!verify(password)) {
      setError(true);
      setShake(true);
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
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute -top-3 -right-3 z-20 w-10 h-10 rounded-full bg-card border border-white/10 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/40 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={18} />
            </motion.button>

            {/* Password Phase */}
            <AnimatePresence mode="wait">
              {phase === "password" && (
                <motion.div
                  key="password"
                  className="rounded-3xl border border-white/10 bg-card/95 backdrop-blur-2xl p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex flex-col items-center text-center gap-6">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center"
                      animate={{
                        boxShadow: [
                          "0 0 20px hsla(30, 100%, 53%, 0.1)",
                          "0 0 40px hsla(30, 100%, 53%, 0.2)",
                          "0 0 20px hsla(30, 100%, 53%, 0.1)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Lock className="text-primary" size={28} />
                    </motion.div>

                    <div>
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                        Restricted Access
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        This content is protected. Enter the passphrase to continue.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-xs">
                      <motion.div
                        animate={shake ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <input
                          ref={inputRef}
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setError(false);
                          }}
                          placeholder="Enter passphrase..."
                          className={`w-full px-4 py-3 rounded-xl bg-background/80 border ${
                            error ? "border-destructive/60" : "border-white/10"
                          } text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-center text-sm tracking-widest`}
                          autoComplete="off"
                        />
                      </motion.div>

                      {error && (
                        <motion.p
                          className="text-destructive text-xs mt-2"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          Incorrect passphrase. Try again.
                        </motion.p>
                      )}

                      <motion.button
                        type="submit"
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl transition-all duration-300 text-sm shadow-[0_10px_30px_hsla(30,100%,53%,0.2)]"
                        whileHover={{ scale: 1.02, y: -1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Unlock size={16} />
                          Unlock
                        </span>
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* Loading Phase */}
              {phase === "loading" && (
                <motion.div
                  key="loading"
                  className="rounded-3xl border border-white/10 bg-card/95 backdrop-blur-2xl p-12 shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex flex-col items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="text-primary" size={32} />
                  </motion.div>
                  <p className="text-muted-foreground text-sm">Decrypting content...</p>
                </motion.div>
              )}

              {/* Content Phase */}
              {phase === "content" && (
                <motion.div
                  key="content"
                  className="rounded-3xl border border-white/10 bg-card/95 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Header */}
                  <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3 shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Unlock className="text-primary" size={14} />
                    </div>
                    <h3 className="text-sm font-heading font-semibold text-foreground">
                      Secret Content
                    </h3>
                  </div>

                  {/* Scrollable content */}
                  <div className="overflow-y-auto p-6 flex-1">
                    {gistContent.map((file, index) => (
                      <motion.div
                        key={file.filename}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="mb-6 last:mb-0"
                      >
                        <h4 className="text-xs font-mono text-primary/70 mb-3 tracking-wider uppercase">
                          {file.filename}
                        </h4>
                        <div className="rounded-xl bg-background/60 border border-white/5 p-4 overflow-x-auto">
                          <pre className="text-sm text-foreground/85 font-mono whitespace-pre-wrap break-words leading-relaxed">
                            {file.content}
                          </pre>
                        </div>
                      </motion.div>
                    ))}
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
