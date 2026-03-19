import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, FileText, Download, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function ReviewSidebar() {
  const [notes, setNotes] = useState("");
  const [template, setTemplate] = useState("new-india");
  const [reportDate, setReportDate] = useState<Date>(new Date());
  const [refNumber] = useState("SDA/2026/03/0042");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2500);
  };

  return (
    <div className="space-y-5">
      {/* Surveyor Notes */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Surveyor Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            rows={4}
            placeholder="Enter final observations and recommendations..."
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 500))}
          />
          <p className="text-xs text-muted-foreground text-right">
            {notes.length}/500
          </p>
        </CardContent>
      </Card>

      {/* Report Settings */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Report Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-sm">Report Template</Label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="new-india">New India Assurance Standard</SelectItem>
                <SelectItem value="oriental">Oriental Standard</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Report Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(reportDate, "dd MMM yyyy")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={reportDate}
                  onSelect={(d) => d && setReportDate(d)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1.5">
            <Label className="text-sm">Reference Number</Label>
            <Input value={refNumber} readOnly className="bg-muted/50 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>

      {/* Generate Report */}
      <Card className="shadow-none border-0 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="pt-6 pb-6 text-center space-y-4">
          <FileText className="h-10 w-10 mx-auto opacity-90" />
          <div>
            <h3 className="font-bold text-lg">Ready to Generate Report</h3>
            <p className="text-sm opacity-80 mt-1">
              All calculations verified. Click below to create your insurer-ready PDF.
            </p>
          </div>
          <Button
            size="lg"
            variant="secondary"
            className="w-full gap-2 font-semibold"
            disabled={generating}
            onClick={handleGenerate}
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Generate PDF Report
              </>
            )}
          </Button>
          <div className="flex items-center justify-center gap-4 text-xs opacity-70">
            <button className="underline hover:opacity-100">Save as Draft</button>
            <span>|</span>
            <button className="underline hover:opacity-100">Export as Excel</button>
          </div>
        </CardContent>
      </Card>

      {/* Warning */}
      <Alert className="border-warning/30 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertDescription className="text-sm text-foreground">
          Please review all values. The surveyor is responsible for the accuracy of this report.
        </AlertDescription>
      </Alert>
    </div>
  );
}
