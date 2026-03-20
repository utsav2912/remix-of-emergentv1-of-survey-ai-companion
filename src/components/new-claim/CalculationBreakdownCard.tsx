import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calculator, HelpCircle, CheckCircle2 } from "lucide-react";

const partsBreakdown = [
  { name: "Front Bumper Assembly", rate: 8500, dep: 50, depAmt: 4250 },
  { name: "Hood/Bonnet", rate: 12000, dep: 25, depAmt: 3000 },
  { name: "Right Headlight Unit", rate: 6200, dep: 50, depAmt: 3100 },
  { name: "Windshield Glass", rate: 9800, dep: 30, depAmt: 2940 },
  { name: "Right Front Fender", rate: 3500, dep: 0, depAmt: 0 },
  { name: "Paint - Front Panel", rate: 4200, dep: 0, depAmt: 0 },
];

const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const grossParts = 44200;
const totalDep = 16510;
const netParts = 27690;
const labour = 7100;
const subtotal = 34790;
const compExcess = 1000;
const taxable = 33790;
const gst = 6082;
const netPayable = 39872;
const idv = 520000;
const ctlPercent = ((netPayable / idv) * 100).toFixed(1);

export function CalculationBreakdownCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Loss Assessment Breakdown</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Based on IRDAI Motor Survey Loss Assessment Schedule</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent className="space-y-0">
        <Accordion type="multiple" className="w-full">
          {/* Gross Parts */}
          <AccordionItem value="gross" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-2">
                <span className="text-sm font-medium">Gross Parts Value</span>
                <span className="text-sm font-semibold">₹{fmt(grossParts)}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2 pl-4">
              <div className="space-y-1">
                {partsBreakdown.map((p) => (
                  <div key={p.name} className="flex justify-between text-xs text-muted-foreground">
                    <span>{p.name}</span>
                    <span className="font-mono">₹{fmt(p.rate)}</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Depreciation */}
          <AccordionItem value="dep" className="border-b-0">
            <AccordionTrigger className="py-2.5 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-2">
                <span className="text-sm font-medium">Total Depreciation</span>
                <span className="text-sm font-semibold text-destructive">−₹{fmt(totalDep)}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-2 pl-4">
              <div className="space-y-1.5">
                {partsBreakdown.filter((p) => p.dep > 0).map((p) => (
                  <div key={p.name} className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>{p.name}</span>
                      <span className="font-mono">−₹{fmt(p.depAmt)}</span>
                    </div>
                    <span className="font-mono text-[11px] text-muted-foreground/70">
                      {p.dep}% × ₹{fmt(p.rate)} | Vehicle age: 5 yrs
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Static lines */}
        <div className="space-y-2 pt-1">
          {[
            ["Net Parts Value", `₹${fmt(netParts)}`],
            ["Labour Charges", `₹${fmt(labour)}`],
            ["Subtotal", `₹${fmt(subtotal)}`],
            ["Less: Compulsory Excess (as per policy)", `−₹${fmt(compExcess)}`],
            ["Taxable Amount", `₹${fmt(taxable)}`],
            ["GST (18%)", `+₹${fmt(gst)}`],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between text-sm py-1">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        {/* Net Payable */}
        <div className="flex items-center justify-between py-1">
          <span className="text-base font-bold text-foreground">NET PAYABLE</span>
          <span className="text-xl font-bold text-[hsl(var(--success))]">₹{fmt(netPayable)}</span>
        </div>

        {/* CTL Check */}
        <div className="flex items-center gap-1.5 mt-2 text-xs text-[hsl(var(--success))]">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>
            ₹{fmt(netPayable)} / IDV ₹{fmt(idv)} = {ctlPercent}% — NOT a constructive total loss
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
