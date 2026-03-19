import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Home, FileText, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Home", icon: Home, url: "/dashboard" },
  { label: "Claims", icon: FileText, url: "/claims" },
  { label: "New", icon: Plus, url: "/new-claim", raised: true },
  { label: "Settings", icon: Settings, url: "/settings" },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-end justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = location.pathname === tab.url || (tab.url === "/claims" && location.pathname.startsWith("/claims/"));

          if (tab.raised) {
            return (
              <RouterNavLink
                key={tab.label}
                to={tab.url}
                className="flex flex-col items-center -mt-5"
              >
                <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform">
                  <Plus className="h-7 w-7" />
                </div>
                <span className="text-[10px] mt-0.5 text-primary font-medium">{tab.label}</span>
              </RouterNavLink>
            );
          }

          return (
            <RouterNavLink
              key={tab.label}
              to={tab.url}
              className="flex flex-col items-center justify-center min-h-[44px] min-w-[44px] gap-0.5"
            >
              <tab.icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("text-[10px]", active ? "text-primary font-medium" : "text-muted-foreground")}>
                {tab.label}
              </span>
            </RouterNavLink>
          );
        })}
      </div>
    </nav>
  );
}
