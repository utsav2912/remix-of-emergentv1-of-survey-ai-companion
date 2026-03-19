import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const causes = [
  "Accident",
  "Flood/Water",
  "Fire",
  "Theft",
  "Hail/Storm",
  "Others",
];

interface CauseOfLossCardProps {
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

export function CauseOfLossCard({ data, errors, onChange }: CauseOfLossCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Cause of Loss</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date of Loss */}
          <div className="space-y-1.5">
            <RequiredLabel>Date of Loss</RequiredLabel>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !data.dateOfLoss && "text-muted-foreground", errors.dateOfLoss && "border-destructive")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {data.dateOfLoss ? format(data.dateOfLoss, "dd MMM yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={data.dateOfLoss} onSelect={(d) => onChange("dateOfLoss", d)} initialFocus className="p-3 pointer-events-auto" />
              </PopoverContent>
            </Popover>
            {errors.dateOfLoss && <p className="text-xs text-destructive">{errors.dateOfLoss}</p>}
          </div>

          {/* Place of Loss */}
          <div className="space-y-1.5">
            <RequiredLabel>Place of Loss</RequiredLabel>
            <Input
              placeholder="e.g. Mumbai, Western Express Highway"
              value={data.placeOfLoss || ""}
              onChange={(e) => onChange("placeOfLoss", e.target.value)}
              className={cn(errors.placeOfLoss && "border-destructive")}
            />
            {errors.placeOfLoss && <p className="text-xs text-destructive">{errors.placeOfLoss}</p>}
          </div>

          {/* Cause of Loss */}
          <div className="space-y-1.5">
            <RequiredLabel>Cause of Loss</RequiredLabel>
            <Select value={data.causeOfLoss || ""} onValueChange={(v) => onChange("causeOfLoss", v)}>
              <SelectTrigger className={cn(errors.causeOfLoss && "border-destructive")}>
                <SelectValue placeholder="Select cause" />
              </SelectTrigger>
              <SelectContent>
                {causes.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.causeOfLoss && <p className="text-xs text-destructive">{errors.causeOfLoss}</p>}
          </div>
        </div>

        {/* Brief Description */}
        <div className="space-y-1.5 mt-4">
          <Label>Brief Description</Label>
          <Textarea
            rows={3}
            placeholder="Describe how the damage occurred..."
            value={data.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
