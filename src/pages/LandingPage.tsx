import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Sparkles,
  FileText,
  Shield,
  WifiOff,
  LayoutTemplate,
  Brain,
  Eye,
  Download,
  CheckCircle2,
} from "lucide-react";

const howItWorks = [
  { icon: Smartphone, title: "Capture Photos", desc: "Take 6-12 damage photos from your phone" },
  { icon: Sparkles, title: "AI Analyzes", desc: "AI identifies damaged parts and suggests repairs" },
  { icon: FileText, title: "Generate Report", desc: "Download insurer-ready PDF in minutes" },
];

const features = [
  { icon: Shield, title: "S-06 Compliance", desc: "Every deduction calculated per IRDAI rules" },
  { icon: WifiOff, title: "Offline Mode", desc: "Capture photos without internet, sync later" },
  { icon: LayoutTemplate, title: "Multi-Insurer Templates", desc: "New India, Oriental, United India, National" },
  { icon: Brain, title: "AI Parts Suggestion", desc: "Anthropic AI identifies parts from damage photos" },
  { icon: Eye, title: "Transparent Calculations", desc: "See the rule behind every rupee deducted" },
  { icon: Download, title: "Export Anywhere", desc: "PDF, Excel, or shareable link" },
];

const freeFeatures = [
  "10 claims included",
  "PDF export",
  "AI suggestions",
  "S-06 calculations",
  "Email support",
];

const proFeatures = [
  "Unlimited claims",
  "PDF & Excel export",
  "AI suggestions",
  "S-06 calculations",
  "Priority support",
  "Multi-insurer templates",
  "Offline mode",
  "Team sharing",
];

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="bg-[#0F2D4A] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-white font-bold text-lg">SurveyDamage AI</span>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">Start Free Trial</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0F2D4A] text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-white/10 text-white/90 border-white/20 hover:bg-white/15">
              Built for Indian Motor Surveyors
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Survey Reports in <span className="text-primary">15 Minutes</span>, Not 90
            </h1>
            <p className="text-lg text-white/70 max-w-lg">
              AI-powered S-06 calculations, automatic depreciation, and one-click PDF reports. Built for licensed motor surveyors in India.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                See How It Works
              </Button>
            </div>
            <p className="text-sm text-white/50">
              No credit card • 10 free claims • IRDAI-compliant reports
            </p>
          </div>

          {/* Mock report card */}
          <div className="hidden lg:block">
            <Card className="bg-white/10 backdrop-blur border-white/15 text-white shadow-2xl">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 font-mono">SDA/2026/03/0042</span>
                  <Badge className="bg-primary/20 text-primary border-primary/30">In Review</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-white/60">Vehicle</p>
                  <p className="font-semibold">2021 Maruti Suzuki Swift ZXI</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-white/50">IDV</p>
                    <p className="font-medium">₹5,20,000</p>
                  </div>
                  <div>
                    <p className="text-white/50">Net Payable</p>
                    <p className="font-medium text-green-400">₹39,872</p>
                  </div>
                </div>
                <div className="border-t border-white/10 pt-3 space-y-1.5">
                  {["Front Bumper Assembly", "Hood/Bonnet", "Right Headlight"].map((p) => (
                    <div key={p} className="flex items-center justify-between text-xs">
                      <span className="text-white/70">{p}</span>
                      <span className="text-white/50">Replace</span>
                    </div>
                  ))}
                  <p className="text-xs text-white/40 pt-1">+ 3 more parts...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-card border-b">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-center gap-6">
          <p className="text-sm text-muted-foreground shrink-0">Trusted by surveyors across India</p>
          <div className="flex items-center gap-4">
            {["New India Assurance", "Oriental Insurance", "United India"].map((name) => (
              <div
                key={name}
                className="px-4 py-2 rounded-lg border bg-muted/50 text-xs font-medium text-muted-foreground"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 text-center space-y-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-2">Three simple steps to a complete survey report</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <div key={item.title} className="space-y-4">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary">Step {i + 1}</div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-secondary/50">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
            <p className="text-muted-foreground mt-2">Purpose-built tools for motor surveyors</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="pt-6 space-y-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-card">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">Simple Pricing</h2>
            <p className="text-muted-foreground mt-2">Start free, upgrade when you need more</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <Card className="shadow-sm">
              <CardContent className="pt-8 pb-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Free Trial</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">₹0</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">10 claims, 7 days</p>
                </div>
                <div className="space-y-2.5">
                  {freeFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">Start Free</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro */}
            <Card className="shadow-md border-primary/30 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardContent className="pt-8 pb-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Pro</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-foreground">₹999</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Unlimited claims</p>
                </div>
                <div className="space-y-2.5">
                  {proFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-foreground">{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/signup">
                  <Button className="w-full">Start Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2D4A] text-white/70">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-white text-sm">SurveyDamage AI</span>
          <div className="flex items-center gap-6 text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <span className="text-xs">Made in India 🇮🇳</span>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
