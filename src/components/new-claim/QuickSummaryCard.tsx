import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Part } from "./PartsTable";
import { LabourItem } from "./LabourTable";

interface QuickSummaryCardProps {
  parts: Part[];
  labour: LabourItem[];
}

export function QuickSummaryCard({ parts, labour }: QuickSummaryCardProps) {
  const fmt = (n: number) =>
    n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const grossParts = parts.reduce((s, p) => s + p.qty * p.unitRate, 0);
  const totalDepreciation = parts.reduce(
    (s, p) => s + p.qty * p.unitRate * (p.depreciation / 100),
    0
  );
  const netParts = grossParts - totalDepreciation;
  const totalLabour = labour.reduce((s, l) => s + l.amount, 0);
  const subtotal = netParts + totalLabour;
  const gst = subtotal * 0.18;
  const estimated = subtotal + gst;

  const rows: [string, number, boolean?][] = [
    ["Gross Parts", grossParts],
    ["Total Depreciation", totalDepreciation],
    ["Net Parts", netParts],
    ["Labour", totalLabour],
    ["Subtotal", subtotal],
    ["GST (18%)", gst],
  ];

  return (
    <Card className="shadow-sm sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Quick Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {rows.map(([label, value]) => (
          <div key={label as string} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label as string}</span>
            <span className="font-medium text-foreground">
              {(label as string).includes("Depreciation") ? "−" : ""}₹{fmt(value as number)}
            </span>
          </div>
        ))}
        <Separator className="my-2" />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Estimated Liability</span>
          <span className="text-lg font-bold text-primary">₹{fmt(estimated)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
