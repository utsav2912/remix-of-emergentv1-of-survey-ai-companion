import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { CreditCard, Zap, Users, Receipt, CheckCircle2, X, Download } from "lucide-react";
import { toast } from "sonner";

const paymentHistory = [
  { date: "Mar 2026", plan: "Pro", amount: "₹999", status: "Paid" },
  { date: "Feb 2026", plan: "Pro", amount: "₹999", status: "Paid" },
  { date: "Jan 2026", plan: "Pro", amount: "₹999", status: "Paid" },
];

const cardVariants = {
  rest: { y: 0, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
  hover: { y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" },
};

export function SubscriptionTab() {
  const [annual, setAnnual] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Current Plan Card */}
      <div
        className="rounded-2xl p-6 md:p-8"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
              <Badge className="mt-1 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
                Active
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              ₹999<span className="text-sm font-normal text-white/50">/month</span>
            </p>
            <p className="text-xs text-white/40">Renews on 19 Apr 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white bg-transparent hover:bg-white/10"
              onClick={() => toast.info("Subscription management coming soon")}
            >
              Manage
            </Button>
            <button
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
              onClick={() => toast.info("Cancel flow coming soon")}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Claims Used This Month</span>
            <span className="font-medium text-white">47 / Unlimited</span>
          </div>
          <div className="relative">
            <Progress value={30} className="h-2.5 bg-white/10" />
          </div>
        </div>
      </div>

      {/* Annual toggle */}
      <div className="flex items-center justify-center gap-3">
        <span className={`text-sm ${!annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>Monthly</span>
        <Switch checked={annual} onCheckedChange={setAnnual} />
        <span className={`text-sm ${annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          Annual <Badge variant="secondary" className="ml-1 text-xs bg-emerald-500/10 text-emerald-600 border-0">Save 20%</Badge>
        </span>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Free Trial */}
        <motion.div variants={cardVariants} initial="rest" whileHover="hover" transition={{ duration: 0.25 }}>
          <Card className="shadow-sm h-full">
            <CardContent className="pt-6 pb-6 space-y-5">
              <div>
                <h4 className="font-semibold text-lg text-foreground">Free Trial</h4>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ₹0<span className="text-sm font-normal text-muted-foreground"> / 7 days</span>
                </p>
              </div>
              <div className="space-y-2.5 text-sm">
                {["10 claims", "Basic PDF export", "All 4 insurer templates"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
                {["Priority support", "Unlimited claims"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-muted-foreground">
                    <X className="h-4 w-4 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" disabled>
                Downgrade
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pro */}
        <motion.div variants={cardVariants} initial="rest" whileHover="hover" transition={{ duration: 0.25 }}>
          <Card className="shadow-md h-full border-primary/40 ring-1 ring-primary/20">
            <CardContent className="pt-6 pb-6 space-y-5 relative">
              <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs">
                Current Plan
              </Badge>
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-lg text-foreground">Pro</h4>
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">
                  {annual ? "₹799" : "₹999"}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month{annual ? " (billed annually)" : ""}
                  </span>
                </p>
              </div>
              <div className="space-y-2.5 text-sm">
                {["Unlimited claims", "All insurer templates", "AI damage analysis", "Priority support", "CSV export"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={() => toast.info("You are already on the Pro plan")}>
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team */}
        <motion.div variants={cardVariants} initial="rest" whileHover="hover" transition={{ duration: 0.25 }}>
          <Card className="shadow-sm h-full opacity-70">
            <CardContent className="pt-6 pb-6 space-y-5 relative">
              <Badge variant="secondary" className="absolute top-3 right-3 text-xs">Coming Soon</Badge>
              <div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-semibold text-lg text-foreground">Team</h4>
                </div>
                <p className="text-3xl font-bold text-foreground mt-1">
                  ₹2,499<span className="text-sm font-normal text-muted-foreground">/month</span>
                </p>
              </div>
              <div className="space-y-2.5 text-sm">
                {["5 surveyors", "Shared claims", "Admin dashboard", "Everything in Pro"].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full" disabled>
                Notify Me
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment History */}
      <Card className="shadow-sm">
        <CardContent className="pt-6 pb-2">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            <h4 className="font-semibold text-foreground">Payment History</h4>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Receipt</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((row) => (
                <TableRow key={row.date}>
                  <TableCell className="font-medium text-foreground">{row.date}</TableCell>
                  <TableCell>{row.plan}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-0 text-xs">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      <Download className="h-3.5 w-3.5" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upgrade CTA (for non-Pro users) */}
      <div className="flex justify-center">
        <Button
          size="lg"
          className="gap-2"
          onClick={() => setShowPayment(true)}
        >
          <CreditCard className="h-4 w-4" /> Upgrade to Pro
        </Button>
      </div>

      {/* Razorpay Mock Dialog */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Pro</DialogTitle>
            <DialogDescription>
              You will be charged ₹{annual ? "9,588/year" : "999/month"} via Razorpay.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium text-foreground">Pro ({annual ? "Annual" : "Monthly"})</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium text-foreground">₹{annual ? "9,588" : "999"}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="font-medium text-foreground">Razorpay</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPayment(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setShowPayment(false);
                toast.info("Payment integration coming soon. You will be notified.");
              }}
            >
              Proceed to Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
