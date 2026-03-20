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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label>
      {children} <span className="text-destructive">*</span>
    </Label>
  );
}

export function PolicyDetailsCard({ data, errors, onChange }: PolicyDetailsCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Policy Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
