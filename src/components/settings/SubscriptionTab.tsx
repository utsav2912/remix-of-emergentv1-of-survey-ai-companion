import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Zap } from "lucide-react";
import { toast } from "sonner";

const features = [
  "Unlimited claims",
  "PDF export",
  "AI suggestions",
  "Priority support",
];

const teamFeatures = [
  "Everything in Pro",
  "Up to 5 team members",
  "Shared templates",
  "Admin dashboard",
  "Bulk PDF export",
];

export function SubscriptionTab() {
  return (
    <div className="space-y-6 max-w-2xl">
      {/* Current Plan */}
      <Card className="border-0 shadow-none bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="pt-6 pb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Current Plan</p>
              <h3 className="text-2xl font-bold">Pro Plan</h3>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹999<span className="text-sm font-normal opacity-80">/month</span></p>
              <p className="text-xs opacity-70">Active until 19 Apr 2026</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="opacity-80">Usage this month</span>
              <span className="font-medium">47 / unlimited claims</span>
            </div>
            <Progress value={47} className="h-2 bg-primary-foreground/20" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="h-4 w-4 opacity-80 shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => toast.info("Razorpay portal will open here")}
          >
            Manage Subscription
          </Button>
        </CardContent>
      </Card>

      {/* Upgrade Card */}
      <Card className="shadow-sm">
        <CardContent className="pt-6 pb-6 space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg text-foreground">Team Plan</h3>
          </div>
          <p className="text-2xl font-bold text-foreground">
            ₹2,499<span className="text-sm font-normal text-muted-foreground">/month</span>
          </p>
          <div className="space-y-2">
            {teamFeatures.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full" onClick={() => toast.info("Upgrade flow coming soon")}>
            Upgrade to Team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
