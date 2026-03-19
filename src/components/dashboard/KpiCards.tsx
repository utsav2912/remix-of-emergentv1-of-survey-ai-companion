import { ClipboardList, Clock, CheckCircle2, Timer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const kpis = [
  {
    title: "Claims Today",
    value: "3",
    subtitle: "+1 from yesterday",
    icon: ClipboardList,
    accent: "primary" as const,
  },
  {
    title: "Pending Reports",
    value: "7",
    subtitle: "Due within 15 days",
    icon: Clock,
    accent: "warning" as const,
  },
  {
    title: "Completed This Month",
    value: "24",
    subtitle: "vs 19 last month",
    icon: CheckCircle2,
    accent: "success" as const,
  },
  {
    title: "Avg Report Time",
    value: "18 min",
    subtitle: "Target: 15 min",
    icon: Timer,
    accent: "primary" as const,
  },
];

const accentStyles = {
  primary: "bg-primary/10 text-primary",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${accentStyles[kpi.accent]}`}>
                <kpi.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
