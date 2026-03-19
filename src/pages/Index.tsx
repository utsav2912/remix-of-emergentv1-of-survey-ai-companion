import { AppLayout } from "@/components/AppLayout";

const Index = () => {
  return (
    <AppLayout title="Dashboard">
      <div className="flex items-center justify-center h-full min-h-[60vh]">
        <p className="text-muted-foreground text-lg">Dashboard will load here</p>
      </div>
    </AppLayout>
  );
};

export default Index;
