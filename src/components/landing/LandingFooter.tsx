const LandingFooter = () => (
  <footer style={{ background: "#0A1628", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div>
        <span className="font-bold text-white text-sm">SurveyDamage AI</span>
        <p className="text-xs text-white/40 mt-1">Agentic AI for Indian Motor Surveyors</p>
      </div>
      <div className="flex items-center gap-6 text-xs text-white/50">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
      <span className="text-xs text-white/40">Made in India 🇮🇳 · © 2026 SurveyDamage AI</span>
    </div>
  </footer>
);

export default LandingFooter;
