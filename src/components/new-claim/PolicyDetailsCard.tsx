import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Button } from "@/components/ui/button";
import { CalendarIcon, Upload, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";

const insurers = [
  "New India Assurance",
  "Oriental Insurance",
  "United India",
  "National Insurance",
  "ICICI Lombard",
  "HDFC Ergo",
  "Bajaj Allianz",
  "Others",
];

interface PolicyDetailsCardProps {
  data: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

const detectInsurer = (filename: string) => {
  const name = filename.toLowerCase();
  if (name.includes('oriental') || name.includes('oi')) return 'Oriental Insurance';
  if (name.includes('new india') || name.includes('nia')) return 'New India Assurance';
  if (name.includes('united') || name.includes('uii')) return 'United India';
  if (name.includes('national') || name.includes('nic')) return 'National Insurance';
  if (name.includes('icici')) return 'ICICI Lombard';
  if (name.includes('hdfc')) return 'HDFC Ergo';
  if (name.includes('bajaj')) return 'Bajaj Allianz';
  return 'Unknown';
};

const mockPolicyData: Record<string, { policyNumber: string; idv: string }> = {
  'Oriental Insurance': { policyNumber: '311500/31/2026/000123', idv: '420000' },
  'New India Assurance': { policyNumber: '11010031250001234', idv: '520000' },
  'United India': { policyNumber: '1504003125000567', idv: '385000' },
  'National Insurance': { policyNumber: '210100312500089', idv: '450000' },
  'ICICI Lombard': { policyNumber: '4001/00/21/P/000456', idv: '510000' },
  'HDFC Ergo': { policyNumber: 'HDFC/2026/MOT/007890', idv: '475000' },
  'Bajaj Allianz': { policyNumber: 'OG-26-2801-1803-00001234', idv: '395000' },
};

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label>
      {children} <span className="text-destructive">*</span>
    </Label>
  );
}

export function PolicyDetailsCard({ data, errors, onChange }: PolicyDetailsCardProps) {
  const [detecting, setDetecting] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState<'idle' | 'success' | 'unknown'>('idle');
  const policyFileRef = useRef<HTMLInputElement>(null);
  const insurerFieldRef = useRef<HTMLDivElement>(null);

  const handlePolicyUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setDetecting(true);
    setDetectionStatus('idle');

    setTimeout(() => {
      const insurer = detectInsurer(file.name);
      setDetecting(false);

      if (insurer === 'Unknown') {
        setDetectionStatus('unknown');
        toast.warning("Could not detect insurer automatically. Please select from the dropdown.");
      } else {
        setDetectionStatus('success');
        const mock = mockPolicyData[insurer];
        if (!data.insurer) onChange("insurer", insurer);
        if (!data.policyNumber && mock) onChange("policyNumber", mock.policyNumber);
        if (!data.idv && mock) onChange("idv", mock.idv);

        const fmt = (n: string) => Number(n).toLocaleString("en-IN");
        toast.success(
          `Policy detected: ${insurer} · Policy No. ${mock?.policyNumber} · IDV ₹${fmt(mock?.idv || '0')}`,
          {
            action: {
              label: "Edit",
              onClick: () => insurerFieldRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
            },
          }
        );
      }
    }, 2000);

    // Reset file input
    e.target.value = '';
  };
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Policy Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Policy Document Upload */}
        <div className="space-y-2">
          <Label>Upload Policy Document</Label>
          <div
            onClick={() => policyFileRef.current?.click()}
            className="border-2 border-dashed border-border rounded-lg flex items-center justify-center gap-2 py-5 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
          >
            <Upload className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Click to upload policy PDF</span>
            <input
              ref={policyFileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handlePolicyUpload}
            />
          </div>
          {detecting && (
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 border border-primary/20 rounded-md px-3 py-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Reading policy document...</span>
            </div>
          )}
          {detectionStatus === 'unknown' && !detecting && (
            <div className="flex items-center gap-2 text-sm text-warning bg-warning/10 border border-warning/20 rounded-md px-3 py-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Could not detect insurer automatically. Please select from the dropdown.</span>
            </div>
          )}
        </div>

        {/* Policy Number */}
        <div className="space-y-1.5">
          <RequiredLabel>Policy Number</RequiredLabel>
          <Input
            placeholder="e.g. 2024/POL/001234"
            value={data.policyNumber || ""}
            onChange={(e) => onChange("policyNumber", e.target.value)}
            className={cn(errors.policyNumber && "border-destructive")}
          />
          {errors.policyNumber && <p className="text-xs text-destructive">{errors.policyNumber}</p>}
        </div>

        {/* Insurer */}
        <div className="space-y-1.5">
          <RequiredLabel>Insurer</RequiredLabel>
          <Select value={data.insurer || ""} onValueChange={(v) => onChange("insurer", v)}>
            <SelectTrigger className={cn(errors.insurer && "border-destructive")}>
              <SelectValue placeholder="Select insurer" />
            </SelectTrigger>
            <SelectContent>
              {insurers.map((ins) => (
                <SelectItem key={ins} value={ins}>{ins}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.insurer && <p className="text-xs text-destructive">{errors.insurer}</p>}
        </div>

        {/* IDV */}
        <div className="space-y-1.5">
          <RequiredLabel>IDV - Insured Declared Value</RequiredLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="e.g. 450000"
              value={data.idv || ""}
              onChange={(e) => onChange("idv", e.target.value)}
              className={cn("pl-7", errors.idv && "border-destructive")}
            />
          </div>
          <p className="text-xs text-muted-foreground">As shown in policy document</p>
          {errors.idv && <p className="text-xs text-destructive">{errors.idv}</p>}
        </div>

        {/* Policy Start Date */}
        <div className="space-y-1.5">
          <RequiredLabel>Policy Start Date</RequiredLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !data.policyStart && "text-muted-foreground", errors.policyStart && "border-destructive")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.policyStart ? format(data.policyStart, "dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={data.policyStart} onSelect={(d) => onChange("policyStart", d)} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          {errors.policyStart && <p className="text-xs text-destructive">{errors.policyStart}</p>}
        </div>

        {/* Policy End Date */}
        <div className="space-y-1.5">
          <RequiredLabel>Policy End Date</RequiredLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !data.policyEnd && "text-muted-foreground", errors.policyEnd && "border-destructive")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.policyEnd ? format(data.policyEnd, "dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={data.policyEnd} onSelect={(d) => onChange("policyEnd", d)} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          {errors.policyEnd && <p className="text-xs text-destructive">{errors.policyEnd}</p>}
        </div>

        {/* Zero Depreciation Add-on */}
        <div className="flex items-center justify-between rounded-md border border-border p-3">
          <div className="space-y-0.5">
            <Label className="text-sm font-medium">Zero Depreciation Add-on (Nil Dep)</Label>
            <p className="text-xs text-muted-foreground">Policy covers parts without depreciation deduction</p>
          </div>
          <Switch
            checked={data.nilDep || false}
            onCheckedChange={(v) => onChange("nilDep", v)}
          />
        </div>

        {/* Compulsory Excess */}
        <div className="space-y-1.5">
          <Label>Compulsory Excess</Label>
          <p className="text-xs text-muted-foreground -mt-1">(as per policy, typically ₹1,000–₹2,000)</p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="e.g. 1000"
              value={data.compulsoryExcess || ""}
              onChange={(e) => onChange("compulsoryExcess", e.target.value)}
              className="pl-7"
            />
          </div>
        </div>

        {/* Voluntary Excess */}
        <div className="space-y-1.5">
          <Label>Voluntary Excess</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <Input
              type="number"
              placeholder="0"
              value={data.voluntaryExcess ?? "0"}
              onChange={(e) => onChange("voluntaryExcess", e.target.value)}
              className="pl-7"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
