import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileTab } from "@/components/settings/ProfileTab";
import { SubscriptionTab } from "@/components/settings/SubscriptionTab";
import { ReportTemplatesTab } from "@/components/settings/ReportTemplatesTab";
import { PreferencesTab } from "@/components/settings/PreferencesTab";

const SettingsPage = () => (
  <AppLayout title="Settings">
    <div className="max-w-5xl mx-auto">
      <Tabs defaultValue="profile">
        <TabsList className="w-full justify-start bg-muted/50 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile"><ProfileTab /></TabsContent>
        <TabsContent value="subscription"><SubscriptionTab /></TabsContent>
        <TabsContent value="templates"><ReportTemplatesTab /></TabsContent>
        <TabsContent value="preferences"><PreferencesTab /></TabsContent>
      </Tabs>
    </div>
  </AppLayout>
);

export default SettingsPage;
