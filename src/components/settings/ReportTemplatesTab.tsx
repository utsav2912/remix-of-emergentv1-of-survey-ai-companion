import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const templates = [
  { id: "new-india", label: "New India Assurance Standard", isDefault: true },
  { id: "oriental", label: "Oriental Insurance Standard", isDefault: false },
  { id: "united", label: "United India Standard", isDefault: false },
  { id: "national", label: "National Insurance Standard", isDefault: false },
  { id: "generic", label: "Generic IRDAI Format", isDefault: false },
];

export function ReportTemplatesTab() {
  const [selected, setSelected] = useState("new-india");

  return (
    <Card className="shadow-sm max-w-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Report Templates</CardTitle>
        <p className="text-sm text-muted-foreground">Choose a default template for new reports.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup value={selected} onValueChange={setSelected} className="space-y-3">
          {templates.map((t) => (
            <div
              key={t.id}
              className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => setSelected(t.id)}
            >
              <RadioGroupItem value={t.id} id={t.id} />
              <Label htmlFor={t.id} className="flex-1 cursor-pointer text-sm font-medium">
                {t.label}
              </Label>
              {t.isDefault && (
                <Badge variant="secondary" className="text-xs">Default</Badge>
              )}
            </div>
          ))}
        </RadioGroup>
        <Button onClick={() => toast.success("Default template saved")}>
          Save Default Template
        </Button>
      </CardContent>
    </Card>
  );
}
