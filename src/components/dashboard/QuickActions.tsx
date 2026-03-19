import { Plus, Upload, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "New Claim",
    description: "Start a new survey report",
    icon: Plus,
    accent: "bg-primary/10 text-primary",
    border: "hover:border-primary/40",
    url: "/new-claim",
  },
  {
    title: "Upload Documents",
    description: "Add photos or policy docs",
    icon: Upload,
    accent: "bg-muted text-muted-foreground",
    border: "hover:border-muted-foreground/30",
    url: "#",
  },
  {
    title: "Generate Report",
    description: "Create PDF for a claim",
    icon: FileText,
    accent: "bg-success/10 text-success",
    border: "hover:border-success/40",
    url: "/reports",
  },
];

export function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {actions.map((action) => (
        <Card
          key={action.title}
          className={`shadow-sm cursor-pointer transition-colors ${action.border}`}
          onClick={() => navigate(action.url)}
        >
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`h-11 w-11 rounded-lg flex items-center justify-center shrink-0 ${action.accent}`}>
              <action.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
