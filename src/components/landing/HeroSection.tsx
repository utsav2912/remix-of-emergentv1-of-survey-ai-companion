import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shapesRef.current) {
      const shapes = shapesRef.current.querySelectorAll(".geo-shape");
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: `${20 + i * 5}`,
          x: `${10 + i * 3}`,
          rotation: 360,
          duration: 20 + i * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    if (h1Ref.current) {
      const words = h1Ref.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{ background: "#080B14" }}
    >
      {/* Animated gradient mesh blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-blob-float"
          style={{
            width: 600, height: 600,
            background: "radial-gradient(circle, #4F46E5 0%, #7C3AED 60%, transparent 100%)",
            top: -100, left: -100,
            filter: "blur(80px)",
            opacity: 0.55,
            animationDuration: "18s",
          }}
        />
        <div
          className="absolute rounded-full animate-blob-float"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(circle, #EC4899 0%, #BE185D 60%, transparent 100%)",
            top: 100, right: -80,
            filter: "blur(80px)",
            opacity: 0.55,
            animationDuration: "22s",
            animationDelay: "-8s",
          }}
        />
        <div
          className="absolute rounded-full animate-blob-float"
          style={{
            width: 400, height: 400,
            background: "radial-gradient(circle, #2563EB 0%, #1D4ED8 60%, transparent 100%)",
            bottom: -50, left: "30%",
            filter: "blur(80px)",
            opacity: 0.55,
            animationDuration: "20s",
            animationDelay: "-4s",
          }}
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none animate-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating geometric shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        <div className="geo-shape absolute top-[15%] left-[10%] w-32 h-32 rounded-full border border-white/[0.05]" />
        <div className="geo-shape absolute top-[60%] right-[15%] w-48 h-48 rounded-full border border-white/[0.06]" />
        <div className="geo-shape absolute top-[30%] right-[25%] w-20 h-20 rotate-45 border border-white/[0.05]" />
        <div className="geo-shape absolute bottom-[20%] left-[20%] w-24 h-24 border border-white/[0.07]"
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        />
        <div className="geo-shape absolute top-[45%] left-[60%] w-16 h-16 rounded-full border border-white/[0.08]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center relative z-10 w-full">
        {/* Left content */}
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium text-white/80"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              Built for Indian Motor Surveyors · IRDAI Compliant
            </div>
          </motion.div>

          <h1 ref={h1Ref} className="text-4xl md:text-5xl lg:text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-white">
            <span className="word inline-block mr-2">Insurance</span>
            <span className="word inline-block mr-2">Surveys.</span>
            <span className="word inline-block mr-2">Done</span>
            <span className="word inline-block mr-2">in</span>
            <span
              className="word inline-block"
              style={{
                background: "linear-gradient(135deg, #60A5FA, #818CF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              15&nbsp;Minutes.
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-white/60 max-w-[520px] leading-relaxed"
          >
            AI-powered damage assessment, automatic IRDAI-compliant depreciation calculations,
            and insurer-ready PDF reports — for licensed motor surveyors across India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/signup">
              <Button
                size="lg"
                className="h-12 px-8 rounded-xl text-white border-0 text-base transition-shadow"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                Start Free Trial
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-xl text-white text-base transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.20)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
            >
              <Play className="h-4 w-4 mr-1" /> Watch Demo
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-sm text-white/40 flex items-center gap-2"
          >
            No credit card <span className="text-white/20">·</span> 10 free claims <span className="text-white/20">·</span> Cancel anytime
          </motion.p>
        </div>

        {/* Right: Mockup Card */}
        <div className="hidden lg:flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="animate-float-card w-full max-w-sm"
          >
            <div
              className="rounded-2xl p-6 space-y-5"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 16,
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40 font-mono">SDA/2026/03/0042</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Review
                </span>
              </div>
              <div>
                <p className="text-xs text-white/40 mb-1">Vehicle</p>
                <p className="font-semibold text-white">2021 Maruti Suzuki Swift ZXI</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/40 text-xs">IDV</p>
                  <p className="font-medium text-white">₹5,20,000</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs">Net Payable</p>
                  <p className="font-medium text-emerald-400">₹39,872</p>
                </div>
              </div>
              <div className="border-t border-white/[0.08] pt-4 space-y-2">
                {["Front Bumper Assembly", "Hood / Bonnet", "Right Headlight"].map((p) => (
                  <div key={p} className="flex items-center justify-between text-xs">
                    <span className="text-white/60">{p}</span>
                    <span className="text-white/30">Replace</span>
                  </div>
                ))}
                <p className="text-xs text-white/25 pt-1">+ 3 more parts…</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
