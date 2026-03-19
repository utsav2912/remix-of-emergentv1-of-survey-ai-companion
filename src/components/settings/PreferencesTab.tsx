import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export function PreferencesTab() {
  const [autoSave, setAutoSave] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);
  const [currencyFormat, setCurrencyFormat] = useState("indian");

  const toggles: { label: string; desc: string; checked: boolean; onChange: (v: boolean) => void; disabled?: boolean }[] = [
    { label: "Dark mode", desc: "Coming soon", checked: false, onChange: () => {}, disabled: true },
    { label: "Auto-save drafts every 2 minutes", desc: "Automatically saves your work", checked: autoSave, onChange: setAutoSave },
    { label: "Show AI suggestions by default", desc: "Display AI-generated part suggestions", checked: aiSuggestions, onChange: setAiSuggestions },
    { label: "Email me when report is ready", desc: "Get notified when PDF generation completes", checked: emailNotify, onChange: setEmailNotify },
  ];

  return (
    <Card className="shadow-sm max-w-2xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {toggles.map((t) => (
          <div
            key={t.label}
            className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0"
          >
            <div className="space-y-0.5">
              <Label className={t.disabled ? "text-muted-foreground" : "text-foreground"}>
                {t.label}
              </Label>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </div>
            <Switch
              checked={t.checked}
              onCheckedChange={t.onChange}
              disabled={t.disabled}
            />
          </div>
        ))}

        <div className="space-y-1.5 pt-2">
          <Label>Default Currency Format</Label>
          <Select value={currencyFormat} onValueChange={setCurrencyFormat}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="indian">Indian: ₹1,00,000</SelectItem>
              <SelectItem value="international">International: ₹100,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-2">
          <Button onClick={() => toast.success("Preferences saved")}>Save Preferences</Button>
        </div>
      </CardContent>
    </Card>
  );
}
