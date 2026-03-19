import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:flex">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <AppHeader title={title} />
          <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">{children}</main>
        </div>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
}
