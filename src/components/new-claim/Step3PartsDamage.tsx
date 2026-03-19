import { useState } from "react";
import { AiDamageSuggestions } from "./AiDamageSuggestions";
import { PartsTable, Part, initialParts } from "./PartsTable";
import { LabourTable, LabourItem, initialLabour } from "./LabourTable";
import { QuickSummaryCard } from "./QuickSummaryCard";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

export function Step3PartsDamage() {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [labour, setLabour] = useState<LabourItem[]>(initialLabour);

  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const grossParts = parts.reduce((s, p) => s + p.qty * p.unitRate, 0);
  const totalDep = parts.reduce((s, p) => s + p.qty * p.unitRate * (p.depreciation / 100), 0);
  const netParts = grossParts - totalDep;
  const totalLabour = labour.reduce((s, l) => s + l.amount, 0);
  const subtotal = netParts + totalLabour;
  const gst = subtotal * 0.18;
  const estimated = subtotal + gst;

  return (
    <div className="space-y-6">
      <AiDamageSuggestions />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3 space-y-6">
          <PartsTable parts={parts} onPartsChange={setParts} />
          <LabourTable items={labour} onItemsChange={setLabour} />
        </div>
        <div className="hidden md:block md:col-span-1">
          <QuickSummaryCard parts={parts} labour={labour} />
        </div>
      </div>

      {/* Mobile fixed summary bar */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-card border-t border-border p-3 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Est. Liability</p>
            <p className="text-lg font-bold text-primary">₹{fmt(estimated)}</p>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1 min-h-[44px]">
                Show Details <ChevronUp className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[70vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Quick Summary</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <QuickSummaryCard parts={parts} labour={labour} />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
