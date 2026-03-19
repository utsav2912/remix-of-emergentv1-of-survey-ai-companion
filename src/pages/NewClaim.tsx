import { useState, useCallback } from "react";
import { AppLayout } from "@/components/AppLayout";
import { StepIndicator } from "@/components/new-claim/StepIndicator";
import { Step1VehiclePolicy } from "@/components/new-claim/Step1VehiclePolicy";
import { PhotoUploadStep } from "@/components/new-claim/PhotoUploadStep";
import { Step3PartsDamage } from "@/components/new-claim/Step3PartsDamage";
import { Step4ReviewCalculate } from "@/components/new-claim/Step4ReviewCalculate";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<Record<string, any>>({ voluntaryExcess: "0" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

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

  const submitClaim = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("claims").insert({
        user_id: user.id,
        registration_number: data.regNumber,
        vehicle_make: data.make,
        vehicle_model: data.model,
        vehicle_year: data.year ? parseInt(data.year) : null,
        policy_number: data.policyNumber,
        insurer: data.insurer,
        idv: data.idv ? parseFloat(data.idv) : null,
        nil_dep: data.nilDep === true,
        voluntary_excess: data.voluntaryExcess ? parseFloat(data.voluntaryExcess) : 0,
        cause_of_loss: data.causeOfLoss,
        loss_date: data.dateOfLoss || null,
        status: "Draft",
      });
      if (error) throw error;
      toast.success("Claim submitted successfully!");
      navigate("/claims");
    } catch (err: any) {
      toast.error(err.message || "Failed to save claim");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
      else toast.error("Please fill in all required fields");
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      submitClaim();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate("/claims");
  };

  const handleSaveDraft = async () => {
    if (!user) return;
    try {
      const { error } = await supabase.from("claims").insert({
        user_id: user.id,
        registration_number: data.regNumber || null,
        vehicle_make: data.make || null,
        vehicle_model: data.model || null,
        vehicle_year: data.year ? parseInt(data.year) : null,
        policy_number: data.policyNumber || null,
        insurer: data.insurer || null,
        idv: data.idv ? parseFloat(data.idv) : null,
        cause_of_loss: data.causeOfLoss || null,
        loss_date: data.dateOfLoss || null,
        status: "Draft",
      });
      if (error) throw error;
      toast.success("Draft saved successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to save draft");
    }
  };

  const nextLabel =
    currentStep === 1 ? "Next: Photos"
    : currentStep === 2 ? "Next: Parts & Damage"
    : currentStep === 3 ? "Next: Review"
    : "Submit";

  return (
    <AppLayout title="New Claim">
      <div className="space-y-6 max-w-6xl mx-auto">
        <StepIndicator currentStep={currentStep} />

        {currentStep === 1 && <Step1VehiclePolicy data={data} errors={errors} onChange={handleChange} />}
        {currentStep === 2 && <PhotoUploadStep />}
        {currentStep === 3 && <Step3PartsDamage />}
        {currentStep === 4 && <Step4ReviewCalculate />}

        <div className="flex items-center justify-between pb-6">
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            {currentStep === 1 ? "Cancel" : <><ArrowLeft className="h-4 w-4" /> Back</>}
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleSaveDraft}>Save Draft</Button>
            <Button onClick={handleNext} className="gap-2" disabled={submitting}>
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin mr-1" /> Submitting...</> : <>{nextLabel} <ArrowRight className="h-4 w-4" /></>}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewClaim;
