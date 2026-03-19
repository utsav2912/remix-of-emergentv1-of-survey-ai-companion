import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const deadlines = [
  { vehicle: "Maruti Swift VXI", claimId: "CLM-2024-0451", daysLeft: 2 },
  { vehicle: "Hyundai Creta SX", claimId: "CLM-2024-0450", daysLeft: 5 },
  { vehicle: "Tata Harrier XZ", claimId: "CLM-2024-0446", daysLeft: 9 },
  { vehicle: "Kia Seltos HTX", claimId: "CLM-2024-0445", daysLeft: 12 },
];

function getDaysColor(days: number) {
  if (days < 3) return "bg-destructive/10 text-destructive hover:bg-destructive/10";
  if (days < 7) return "bg-warning/10 text-warning hover:bg-warning/10";
  return "bg-success/10 text-success hover:bg-success/10";
}

export function UpcomingDeadlines() {
  return (
    <Card className="shadow-sm h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {deadlines.map((item) => (
          <div key={item.claimId} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.vehicle}</p>
              <p className="text-xs text-muted-foreground">{item.claimId}</p>
            </div>
            <Badge variant="secondary" className={`shrink-0 rounded-sm text-xs font-medium ${getDaysColor(item.daysLeft)}`}>
              {item.daysLeft}d left
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
