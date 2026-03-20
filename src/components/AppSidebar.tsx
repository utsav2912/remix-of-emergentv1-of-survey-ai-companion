import { Car, LayoutDashboard, FileText, FilePlus, BarChart3, Settings, ArrowLeftRight } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Claims", url: "/claims", icon: FileText },
  { title: "New Claim", url: "/new-claim", icon: FilePlus },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  const displayName = profile?.full_name || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const isPro = profile?.subscription_tier === "pro";
  const isSurveyor = profile?.role === "surveyor";

  const handleSwitchMode = async () => {
    if (!user) return;
    const newRole = isSurveyor ? "assistant" : "surveyor";
    await supabase
      .from("profiles")
      .update({ role: newRole } as any)
      .eq("user_id", user.id);
    await refreshProfile();
    toast.success(`Switched to ${newRole === "surveyor" ? "Survey" : "Desktop"} mode`);
    navigate(newRole === "surveyor" ? "/survey" : "/dashboard");
  };

  return (
    <Sidebar collapsible="icon" className="border-none">
      <div className="flex items-center gap-2.5 px-4 py-5">
        <Car className="h-6 w-6 shrink-0 text-sidebar-foreground" />
        {!collapsed && (
          <span className="text-base font-bold text-sidebar-foreground tracking-tight whitespace-nowrap">
            SurveyDamage AI
          </span>
        )}
      </div>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        end
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
                        activeClassName="bg-sidebar-accent text-sidebar-foreground"
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-foreground text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-sidebar-foreground truncate">
                {displayName}
              </span>
              {user?.email && (
                <span className="text-[11px] text-sidebar-muted truncate">{user.email}</span>
              )}
              <div className="flex items-center gap-1 mt-0.5">
                <Badge className={`w-fit text-[10px] px-1.5 py-0 rounded-sm ${
                  isPro ? "bg-primary text-primary-foreground" : "bg-sidebar-accent text-sidebar-muted"
                }`}>
                  {isPro ? "Pro" : "Free Trial"}
                </Badge>
                <Badge className="w-fit text-[10px] px-1.5 py-0 rounded-sm bg-sidebar-accent text-sidebar-muted">
                  {isSurveyor ? "Surveyor" : "Assistant"}
                </Badge>
              </div>
            </div>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={handleSwitchMode}
            className="flex items-center gap-1.5 mt-2 text-[11px] text-sidebar-muted hover:text-sidebar-foreground transition-colors"
          >
            <ArrowLeftRight className="h-3 w-3" />
            {isSurveyor ? "Switch to Desktop Mode" : "Switch to Survey Mode"}
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
