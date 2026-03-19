import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, FileText, MoreVertical, Pencil, Copy, Trash2, Download } from "lucide-react";
import { ClaimOverviewTab } from "@/components/claim-detail/ClaimOverviewTab";
import { ClaimPartsLabourTab } from "@/components/claim-detail/ClaimPartsLabourTab";
import { ClaimPhotosTab } from "@/components/claim-detail/ClaimPhotosTab";
import { ClaimDocumentsTab } from "@/components/claim-detail/ClaimDocumentsTab";
import { ClaimHistoryTab } from "@/components/claim-detail/ClaimHistoryTab";

const ClaimDetail = () => {
  const { id: _id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout title="Claim Detail">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header Bar */}
        <div className="flex flex-col gap-3 bg-card rounded-lg border p-3 md:p-4">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate("/claims")}
              className="flex items-center gap-1 text-sm text-muted-foreground active:text-foreground transition-colors min-h-[44px]"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <span className="text-border hidden md:inline">|</span>
            <span className="font-mono text-sm font-semibold text-foreground">
              SDA/2026/03/0042
            </span>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              In Review
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 min-h-[44px]">
              <Pencil className="h-3.5 w-3.5" /> Edit
            </Button>
            <Button size="sm" className="gap-1.5 min-h-[44px]">
              <FileText className="h-3.5 w-3.5" /> <span className="hidden md:inline">Generate</span> PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 min-h-[44px] min-w-[44px]">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Download className="h-4 w-4" /> Export CSV
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Copy className="h-4 w-4" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <TabsList className="w-max md:w-full justify-start bg-muted/50 flex-nowrap">
              <TabsTrigger value="overview" className="min-h-[44px]">Overview</TabsTrigger>
              <TabsTrigger value="parts" className="min-h-[44px] whitespace-nowrap">Parts & Labour</TabsTrigger>
              <TabsTrigger value="photos" className="min-h-[44px]">Photos</TabsTrigger>
              <TabsTrigger value="documents" className="min-h-[44px]">Documents</TabsTrigger>
              <TabsTrigger value="history" className="min-h-[44px]">History</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-4">
            <ClaimOverviewTab />
          </TabsContent>
          <TabsContent value="parts" className="mt-4">
            <ClaimPartsLabourTab />
          </TabsContent>
          <TabsContent value="photos" className="mt-4">
            <ClaimPhotosTab />
          </TabsContent>
          <TabsContent value="documents" className="mt-4">
            <ClaimDocumentsTab />
          </TabsContent>
          <TabsContent value="history" className="mt-4">
            <ClaimHistoryTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ClaimDetail;
