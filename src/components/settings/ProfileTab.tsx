import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { toast } from "sonner";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
];

export function ProfileTab() {
  const [form, setForm] = useState({
    fullName: "Ramesh Kumar",
    license: "SUR/MH/2021/00456",
    mobile: "+91 98765 43210",
    email: "ramesh@surveydossier.in",
    city: "Mumbai",
    state: "Maharashtra",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Card className="shadow-sm max-w-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label>IRDAI License Number</Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent><p className="text-xs">Your official surveyor license</p></TooltipContent>
              </Tooltip>
            </div>
            <Input value={form.license} onChange={(e) => update("license", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Mobile</Label>
            <Input value={form.mobile} onChange={(e) => update("mobile", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <div className="flex gap-2">
              <Input value={form.email} readOnly className="bg-muted/50 text-muted-foreground flex-1" />
              <Button variant="link" className="px-0 text-xs shrink-0">Change email</Button>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>City</Label>
            <Input value={form.city} onChange={(e) => update("city", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>State</Label>
            <Select value={form.state} onValueChange={(v) => update("state", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {indianStates.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="pt-2">
          <Button onClick={() => toast.success("Profile saved")}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}
