import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Sparkles, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Upload,
    title: "Upload Policy & Photos",
    desc: "Photograph the damaged vehicle and upload the policy document. Our system reads the insurer, policy number, and coverage automatically.",
    accent: "from-blue-500/20 to-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "AI Assesses Damage",
    desc: "Our AI identifies damaged parts from your photos and calculates IRDAI-compliant depreciation for each part automatically.",
    accent: "from-indigo-500/20 to-indigo-500/5",
    iconColor: "text-indigo-400",
  },
  {
    icon: FileText,
    title: "Generate Report",
    desc: "Download a professional PDF report formatted for the specific insurer — New India, Oriental, United India, or National.",
    accent: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-400",
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".step-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28" style={{ background: "#080B14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
          <p className="text-white/50 mt-2">Three steps to a complete survey report</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Dashed connector line (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-white/10" />

          {steps.map((step, i) => (
            <div
              key={step.title}
              className="step-card relative rounded-2xl p-6 space-y-4 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.16)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center`}>
                  <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                </div>
                <span className="text-xs font-bold text-white/30 uppercase tracking-wider">Step {i + 1}</span>
              </div>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
