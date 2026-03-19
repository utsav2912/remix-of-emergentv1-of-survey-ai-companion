import { useState } from "react";
import { PartsTable, Part, initialParts } from "@/components/new-claim/PartsTable";
import { LabourTable, LabourItem, initialLabour } from "@/components/new-claim/LabourTable";
import { CalculationBreakdownCard } from "@/components/new-claim/CalculationBreakdownCard";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ClaimPartsLabourTab() {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [labour, setLabour] = useState<LabourItem[]>(initialLabour);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePartsChange = (newParts: Part[]) => {
    setParts(newParts);
    setHasChanges(true);
  };

  const handleLabourChange = (newLabour: LabourItem[]) => {
    setLabour(newLabour);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6 relative pb-16">
      <PartsTable parts={parts} onPartsChange={handlePartsChange} />
      <LabourTable items={labour} onItemsChange={handleLabourChange} />
      <CalculationBreakdownCard />

      {hasChanges && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-warning/10 border-t border-warning/30 px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Unsaved changes
            </div>
            <Button
              size="sm"
              className="bg-warning text-warning-foreground hover:bg-warning/90"
              onClick={() => setHasChanges(false)}
            >
              Recalculate & Save
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
