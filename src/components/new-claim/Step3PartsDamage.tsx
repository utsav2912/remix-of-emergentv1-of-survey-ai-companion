import { useState } from "react";
import { AiDamageSuggestions } from "./AiDamageSuggestions";
import { PartsTable, Part, initialParts } from "./PartsTable";
import { LabourTable, LabourItem, initialLabour } from "./LabourTable";
import { QuickSummaryCard } from "./QuickSummaryCard";

export function Step3PartsDamage() {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [labour, setLabour] = useState<LabourItem[]>(initialLabour);

  return (
    <div className="space-y-6">
      <AiDamageSuggestions />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <PartsTable parts={parts} onPartsChange={setParts} />
          <LabourTable items={labour} onItemsChange={setLabour} />
        </div>
        <div className="lg:col-span-1">
          <QuickSummaryCard parts={parts} labour={labour} />
        </div>
      </div>
    </div>
  );
}
