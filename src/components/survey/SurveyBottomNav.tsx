import { ClipboardList, Clock, Bell, User } from "lucide-react";
import type { SurveyTab } from "@/pages/Survey";

const tabs: { id: SurveyTab; icon: typeof ClipboardList; label: string }[] = [
  { id: "assess", icon: ClipboardList, label: "Assess" },
  { id: "history", icon: Clock, label: "History" },
  { id: "alerts", icon: Bell, label: "Alerts" },
  { id: "profile", icon: User, label: "Profile" },
];

interface Props {
  activeTab: SurveyTab;
  onTabChange: (tab: SurveyTab) => void;
}

export function SurveyBottomNav({ activeTab, onTabChange }: Props) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-14 bg-white border-t border-border flex items-center justify-around"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      {tabs.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-0.5 transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
