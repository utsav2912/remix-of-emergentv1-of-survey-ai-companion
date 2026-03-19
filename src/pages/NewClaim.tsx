import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StepIndicator } from "@/components/new-claim/StepIndicator";
import { Step1VehiclePolicy } from "@/components/new-claim/Step1VehiclePolicy";
import { PhotoUploadStep } from "@/components/new-claim/PhotoUploadStep";
import { Step3PartsDamage } from "@/components/new-claim/Step3PartsDamage";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const step1RequiredFields: Record<string, string> = {
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
  const [currentStep, setCurrentStep] = useState(1);
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    for (const [field, label] of Object.entries(step1RequiredFields)) {
      const val = data[field];
      if (val === undefined || val === null || val === "") {
        newErrors[field] = `${label} is required`;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      } else {
        toast.error("Please fill in all required fields");
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      toast.success("Step 3 complete — proceeding to Review");
      // Future: setCurrentStep(4)
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/claims");
    }
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  const nextLabel =
    currentStep === 1
      ? "Next: Photos"
      : currentStep === 2
      ? "Next: Parts & Damage"
      : currentStep === 3
      ? "Next: Review"
      : "Submit";

  return (
    <AppLayout title="New Claim">
      <div className="space-y-6 max-w-6xl mx-auto">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && (
          <Step1VehiclePolicy data={data} errors={errors} onChange={handleChange} />
        )}

        {currentStep === 2 && <PhotoUploadStep />}

        {/* Footer */}
        <div className="flex items-center justify-between pb-6">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            {currentStep === 1 ? (
              "Cancel"
            ) : (
              <>
                <ArrowLeft className="h-4 w-4" /> Back
              </>
            )}
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>
              Save Draft
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {nextLabel} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewClaim;
