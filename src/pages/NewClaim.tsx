import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StepIndicator } from "@/components/new-claim/StepIndicator";
import { VehicleDetailsCard } from "@/components/new-claim/VehicleDetailsCard";
import { PolicyDetailsCard } from "@/components/new-claim/PolicyDetailsCard";
import { CauseOfLossCard } from "@/components/new-claim/CauseOfLossCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const requiredFields: Record<string, string> = {
  regNumber: "Registration Number",
  make: "Make",
  model: "Model",
  year: "Year",
  policyNumber: "Policy Number",
  insurer: "Insurer",
  idv: "IDV",
  policyStart: "Policy Start Date",
  policyEnd: "Policy End Date",
  dateOfLoss: "Date of Loss",
  placeOfLoss: "Place of Loss",
  causeOfLoss: "Cause of Loss",
};

const NewClaim = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Record<string, any>>({ voluntaryExcess: "0" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback((field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    for (const [field, label] of Object.entries(requiredFields)) {
      const val = data[field];
      if (val === undefined || val === null || val === "") {
        newErrors[field] = `${label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      toast.success("Step 1 complete — proceeding to Photos");
      // Future: navigate to step 2
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  return (
    <AppLayout title="New Claim">
      <div className="space-y-6 max-w-6xl mx-auto">
        <StepIndicator currentStep={1} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VehicleDetailsCard data={data} errors={errors} onChange={handleChange} />
          <PolicyDetailsCard data={data} errors={errors} onChange={handleChange} />
        </div>

        <CauseOfLossCard data={data} errors={errors} onChange={handleChange} />

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pb-6">
          <Button variant="ghost" onClick={() => navigate("/claims")}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button onClick={handleNext} className="gap-2">
            Next: Photos <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewClaim;
