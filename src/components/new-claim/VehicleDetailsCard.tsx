import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const makes = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata",
  "Honda",
  "Toyota",
  "Mahindra",
  "Kia",
  "Others",
];

const years = Array.from({ length: 11 }, (_, i) => String(2025 - i));

interface VehicleDetailsCardProps {
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

export function VehicleDetailsCard({ data, errors, onChange }: VehicleDetailsCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Vehicle Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Registration Number */}
        <div className="space-y-1.5">
          <RequiredLabel>Registration Number</RequiredLabel>
          <Input
            placeholder="MH02AB1234"
            value={data.regNumber || ""}
            onChange={(e) => onChange("regNumber", e.target.value.toUpperCase())}
            className={cn(errors.regNumber && "border-destructive")}
          />
          {errors.regNumber && <p className="text-xs text-destructive">{errors.regNumber}</p>}
        </div>

        {/* Make */}
        <div className="space-y-1.5">
          <RequiredLabel>Make</RequiredLabel>
          <Select value={data.make || ""} onValueChange={(v) => onChange("make", v)}>
            <SelectTrigger className={cn(errors.make && "border-destructive")}>
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.make && <p className="text-xs text-destructive">{errors.make}</p>}
        </div>

        {/* Model */}
        <div className="space-y-1.5">
          <RequiredLabel>Model</RequiredLabel>
          <Input
            placeholder="e.g. Swift, Creta, Nexon"
            value={data.model || ""}
            onChange={(e) => onChange("model", e.target.value)}
            className={cn(errors.model && "border-destructive")}
          />
          {errors.model && <p className="text-xs text-destructive">{errors.model}</p>}
        </div>

        {/* Year */}
        <div className="space-y-1.5">
          <RequiredLabel>Year</RequiredLabel>
          <Select value={data.year || ""} onValueChange={(v) => onChange("year", v)}>
            <SelectTrigger className={cn(errors.year && "border-destructive")}>
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-xs text-destructive">{errors.year}</p>}
        </div>

        {/* Variant */}
        <div className="space-y-1.5">
          <Label>Variant</Label>
          <Input
            placeholder="VXI, ZXI, Petrol etc."
            value={data.variant || ""}
            onChange={(e) => onChange("variant", e.target.value)}
          />
        </div>

        {/* Registration Date */}
        <div className="space-y-1.5">
          <Label>Registration Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !data.regDate && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.regDate ? format(data.regDate, "dd MMM yyyy") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={data.regDate} onSelect={(d) => onChange("regDate", d)} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
        </div>

        {/* Engine Number */}
        <div className="space-y-1.5">
          <Label>Engine Number</Label>
          <Input
            placeholder="Engine number"
            value={data.engineNumber || ""}
            onChange={(e) => onChange("engineNumber", e.target.value)}
          />
        </div>

        {/* Chassis Number */}
        <div className="space-y-1.5">
          <Label>Chassis Number</Label>
          <Input
            placeholder="Chassis number"
            value={data.chassisNumber || ""}
            onChange={(e) => onChange("chassisNumber", e.target.value)}
          />
        </div>

        {/* Odometer Reading */}
        <div className="space-y-1.5">
          <Label>Odometer Reading</Label>
          <div className="relative">
            <Input
              type="number"
              placeholder="e.g. 45000"
              value={data.odometer || ""}
              onChange={(e) => onChange("odometer", e.target.value)}
              className="pr-10"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">km</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
