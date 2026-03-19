import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const summaryRows: [string, string][] = [
  ["Vehicle", "2021 Maruti Suzuki Swift ZXI"],
  ["Registration", "MH02AB1234"],
  ["Owner", "Ramesh Kumar"],
  ["Date of Loss", "14 Mar 2026"],
  ["Insurer", "New India Assurance"],
  ["Policy", "11010031250001234"],
  ["IDV", "₹5,20,000"],
  ["NIL Dep", "Yes ✓"],
  ["Compulsory Excess", "₹1,000"],
  ["Voluntary Excess", "₹0"],
];

export function ClaimSummaryCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Claim Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {summaryRows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-2 py-1 border-b border-border/50 last:border-0">
              <span className="text-sm text-muted-foreground shrink-0">{label}</span>
              <span className="text-sm font-semibold text-foreground text-right">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
