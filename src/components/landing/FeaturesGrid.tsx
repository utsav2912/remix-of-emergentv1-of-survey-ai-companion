import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, LayoutTemplate, Brain, FileSearch, History, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Shield, title: "IRDAI S-06 Compliant", desc: "Every depreciation follows official IRDAI schedules" },
  { icon: LayoutTemplate, title: "Multi-Insurer Templates", desc: "Report formats for New India, Oriental, United India, National" },
  { icon: Brain, title: "AI Parts Identification", desc: "AI reads damage photos and suggests parts & repair types" },
  { icon: FileSearch, title: "Auto Policy Reading", desc: "Upload policy PDF; insurer and IDV extracted automatically" },
  { icon: History, title: "Audit Trail", desc: "Every edit logged with timestamp for dispute resolution" },
  { icon: Download, title: "PDF Export", desc: "Download insurer-ready survey reports in seconds" },
];

const FeaturesGrid = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".feat-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section ref={ref} className="bg-card py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-foreground">Everything You Need</h2>
          <p className="text-muted-foreground mt-2">Purpose-built tools for motor surveyors</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Card
              key={f.title}
              className="feat-card shadow-sm rounded-2xl hover:-translate-y-1 transition-transform duration-300 cursor-default"
            >
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
  );
};

export default FeaturesGrid;
