import { AppLayout } from "@/components/AppLayout";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { RecentClaimsTable } from "@/components/dashboard/RecentClaimsTable";
import { UpcomingDeadlines } from "@/components/dashboard/UpcomingDeadlines";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Index = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
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
      </div>
    </AppLayout>
  );
};

export default Index;
