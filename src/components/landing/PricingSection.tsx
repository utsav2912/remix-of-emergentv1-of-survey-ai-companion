import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X } from "lucide-react";

const free = [
  { text: "10 claims", included: true },
  { text: "All 4 insurer templates", included: true },
  { text: "AI suggestions", included: true },
  { text: "PDF export", included: true },
  { text: "Priority support", included: false },
  { text: "Unlimited claims", included: false },
];

const pro = [
  "Unlimited claims",
  "All insurer templates",
  "AI damage analysis",
  "Priority support",
  "CSV export",
  "Team access (coming soon)",
];

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-20 md:py-28" style={{ background: "#0A1628" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white">Simple Pricing</h2>
          <p className="text-white/50 mt-2">Start free, upgrade when you need more</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className={`text-sm ${!annual ? "text-white" : "text-white/40"}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className="relative h-7 w-12 rounded-full transition-colors"
            style={{ background: annual ? "hsl(224, 76%, 48%)" : "rgba(255,255,255,0.15)" }}
          >
            <motion.div
              className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white"
              animate={{ x: annual ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm ${annual ? "text-white" : "text-white/40"}`}>
            Annual <span className="text-emerald-400 text-xs font-medium">Save 20%</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free */}
          <div
            className="rounded-2xl p-8 space-y-6"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <div>
              <h3 className="text-xl font-bold text-white">Free Trial</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold text-white">₹0</span>
              </div>
              <p className="text-sm text-white/40 mt-1">7 days · 10 claims</p>
            </div>
            <div className="space-y-3">
              {free.map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 text-sm">
                  {f.included ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-white/20 shrink-0" />
                  )}
                  <span className={f.included ? "text-white/80" : "text-white/30"}>{f.text}</span>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <Button
                variant="outline"
                className="w-full border-white/20 text-white bg-transparent hover:bg-white/[0.06]"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div
            className="rounded-2xl p-8 space-y-6 relative"
            style={{
              background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))",
              border: "1px solid rgba(99,102,241,0.3)",
              boxShadow: "0 0 40px rgba(99,102,241,0.15)",
            }}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
                Most Popular
              </Badge>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={annual ? "annual" : "monthly"}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-4xl font-bold text-white"
                  >
                    {annual ? "₹799" : "₹999"}
                  </motion.span>
                </AnimatePresence>
                <span className="text-white/40">/month</span>
              </div>
              <p className="text-sm text-white/40 mt-1">
                {annual ? "Billed ₹9,588/year" : "Billed monthly"}
              </p>
            </div>
            <div className="space-y-3">
              {pro.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-white/80">{f}</span>
                </div>
              ))}
            </div>
            <Link to="/signup">
              <Button className="w-full bg-white text-[#0A1628] hover:bg-white/90 font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
