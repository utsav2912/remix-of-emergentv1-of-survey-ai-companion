import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function RouteLoadingBar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-primary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0.85 }}
          exit={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
