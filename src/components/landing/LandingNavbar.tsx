import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";

const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(8, 11, 20, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <Car className="h-5 w-5 text-blue-400" />
          </motion.div>
          <span className="text-white font-bold text-lg">SurveyDamage AI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="text-white border-0 transition-shadow"
              style={{
                background: "linear-gradient(135deg, #3B82F6, #6366F1)",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
              }}
            >
              Start Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
