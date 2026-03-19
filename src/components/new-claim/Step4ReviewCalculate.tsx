import { ClaimSummaryCard } from "./ClaimSummaryCard";
import { CalculationBreakdownCard } from "./CalculationBreakdownCard";
import { ReviewSidebar } from "./ReviewSidebar";

export function Step4ReviewCalculate() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-6">
        <ClaimSummaryCard />
        <CalculationBreakdownCard />
      </div>
      <div className="lg:col-span-2">
        <ReviewSidebar />
      </div>
    </div>
  );
}
