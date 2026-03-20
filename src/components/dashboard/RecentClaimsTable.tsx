import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground hover:bg-muted",
  "In Review": "bg-primary/10 text-primary hover:bg-primary/10",
  Final: "bg-success/10 text-success hover:bg-success/10",
  Disputed: "bg-destructive/10 text-destructive hover:bg-destructive/10",
};

const claims = [
  { id: "CLM-2024-0451", vehicle: "Maruti Swift VXI", insurer: "ICICI Lombard", status: "In Review", date: "18 Mar 2026" },
  { id: "CLM-2024-0450", vehicle: "Hyundai Creta SX", insurer: "HDFC ERGO", status: "Draft", date: "17 Mar 2026" },
  { id: "CLM-2024-0449", vehicle: "Tata Nexon EV", insurer: "Bajaj Allianz", status: "Final", date: "16 Mar 2026" },
  { id: "CLM-2024-0448", vehicle: "Mahindra XUV700", insurer: "New India Assurance", status: "Disputed", date: "15 Mar 2026" },
  { id: "CLM-2024-0447", vehicle: "Honda City ZX", insurer: "SBI General", status: "Final", date: "14 Mar 2026" },
];

export function RecentClaimsTable() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Recent Claims</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6">Claim ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead className="hidden md:table-cell">Insurer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="pr-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim, i) => (
              <motion.tr
                key={claim.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
                className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
              >
                <TableCell className="pl-6 font-medium text-foreground">{claim.id}</TableCell>
                <TableCell>{claim.vehicle}</TableCell>
                <TableCell className="hidden md:table-cell">{claim.insurer}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`rounded-sm text-xs font-medium ${statusStyles[claim.status]}`}>
                    {claim.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground">{claim.date}</TableCell>
                <TableCell className="pr-6 text-right">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    Open
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
