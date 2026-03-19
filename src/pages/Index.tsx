import { AppLayout } from "@/components/AppLayout";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { RecentClaimsTable } from "@/components/dashboard/RecentClaimsTable";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ClipboardList, Camera, FileText, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const { data: claimsCount, isLoading } = useQuery({
    queryKey: ["claims-count", user?.id],
    queryFn: async () => {
      const { count } = await supabase
        .from("claims")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      return count ?? 0;
    },
    enabled: !!user,
  });

  const isNewUser = !isLoading && claimsCount === 0;
  const displayName = profile?.full_name || user?.user_metadata?.full_name || "Surveyor";

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        {isLoading ? (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-5 w-32" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        ) : isNewUser ? (
          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardContent className="py-10 text-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Welcome, {displayName}! Let's start your first survey.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {[
                  { step: 1, icon: ClipboardList, label: "Create claim", desc: "Enter vehicle & policy details" },
                  { step: 2, icon: Camera, label: "Add photos", desc: "Capture damage from all angles" },
                  { step: 3, icon: FileText, label: "Generate report", desc: "One-click insurer-ready PDF" },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center gap-2">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{item.step}. {item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Button size="lg" onClick={() => navigate("/new-claim")} className="gap-2">
                Create Your First Claim <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <KpiCards />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <RecentClaimsTable />
              </div>
              <div className="lg:col-span-2">
                <UpcomingDeadlines />
              </div>
            </div>
            <QuickActions />
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
