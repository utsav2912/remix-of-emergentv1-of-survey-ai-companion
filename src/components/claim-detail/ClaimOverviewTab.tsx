import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

const sections = [
  {
    title: "Vehicle Details",
    rows: [
      ["Vehicle", "2021 Maruti Suzuki Swift ZXI"],
      ["Registration", "MH02AB1234"],
      ["Engine No.", "K12MN7654321"],
      ["Chassis No.", "MA3FJEB1S00123456"],
      ["Odometer", "34,200 km"],
    ],
  },
  {
    title: "Policy Details",
    rows: [
      ["Insurer", "New India Assurance"],
      ["Policy No.", "11010031250001234"],
      ["IDV", "₹5,20,000"],
      ["NIL Dep", "Yes ✓"],
      ["Compulsory Excess", "₹1,000"],
      ["Voluntary Excess", "₹0"],
      ["Policy Period", "01 Apr 2025 – 31 Mar 2026"],
    ],
  },
  {
    title: "Cause of Loss",
    rows: [
      ["Date of Loss", "14 Mar 2026"],
      ["Place of Loss", "Mumbai, Western Express Highway"],
      ["Cause", "Accident"],
      ["Description", "Vehicle collided with divider during heavy rain. Front and right side damaged."],
    ],
  },
];

export function ClaimOverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {sections.map((section) => (
        <Card key={section.title} className="shadow-sm">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-base">{section.title}</CardTitle>
            <button className="p-1 rounded hover:bg-muted text-muted-foreground">
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {section.rows.map(([label, value]) => (
                <div key={label} className="flex items-baseline justify-between gap-3 py-1 border-b border-border/50 last:border-0">
                  <span className="text-sm text-muted-foreground shrink-0">{label}</span>
                  <span className="text-sm font-medium text-foreground text-right">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
