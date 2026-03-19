import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Eye } from "lucide-react";

interface Doc {
  id: string;
  filename: string;
  type: string;
  uploadDate: string;
  ocrStatus: "Processed" | "Pending" | "Failed";
}

const mockDocs: Doc[] = [
  { id: "1", filename: "Policy_NIA_2025.pdf", type: "Policy Document", uploadDate: "12 Mar 2026", ocrStatus: "Processed" },
  { id: "2", filename: "Repair_Estimate_SwiftZXI.pdf", type: "Repair Estimate", uploadDate: "15 Mar 2026", ocrStatus: "Processed" },
  { id: "3", filename: "RC_Book_MH02AB1234.jpg", type: "RC Book", uploadDate: "14 Mar 2026", ocrStatus: "Pending" },
];

const docTypes = ["Policy Document", "Repair Estimate", "RC Book", "Other"];

const ocrColors: Record<string, string> = {
  Processed: "bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border-[hsl(var(--success))]/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export function ClaimDocumentsTab() {
  const [docs, setDocs] = useState(mockDocs);
  const [uploadType, setUploadType] = useState("Policy Document");
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6">
      {/* Upload area */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            <div className="space-y-1.5 w-full sm:w-48">
              <label className="text-sm text-muted-foreground">Document Type</label>
              <Select value={uploadType} onValueChange={setUploadType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {docTypes.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div
              onClick={() => fileRef.current?.click()}
              className="flex-1 w-full border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 py-6 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <Upload className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Click to upload</span>
              <input ref={fileRef} type="file" className="hidden" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents list */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Uploaded Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{doc.filename}</p>
                    <p className="text-xs text-muted-foreground">{doc.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                  <Badge variant="outline" className={`text-xs ${ocrColors[doc.ocrStatus]}`}>
                    {doc.ocrStatus}
                  </Badge>
                  <Button variant="ghost" size="sm" className="gap-1 text-xs">
                    <Eye className="h-3.5 w-3.5" /> View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
