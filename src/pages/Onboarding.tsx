import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const insurers = [
  "New India Assurance",
  "Oriental Insurance",
  "United India Insurance",
  "National Insurance",
  "ICICI Lombard",
  "HDFC Ergo",
  "Bajaj Allianz",
  "Others",
];

const templates = [
  { id: "new-india", label: "New India Assurance Standard" },
  { id: "oriental", label: "Oriental Insurance Standard" },
  { id: "united", label: "United India Standard" },
  { id: "national", label: "National Insurance Standard" },
];

const experienceOptions = ["<1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"];

const Onboarding = () => {
  const navigate = useNavigate();
  const { user, profile, loading, refreshProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [license, setLicense] = useState("");
  const [experience, setExperience] = useState("");
  const [city, setCity] = useState("");
  const [insurer, setInsurer] = useState("");
  const [template, setTemplate] = useState("new-india");
  const fileRef = useRef<HTMLInputElement>(null);

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-[480px] shadow-lg rounded-xl">
        <CardContent className="pt-8 pb-8 px-8 space-y-6">
          {/* Progress dots */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step ? "w-8 bg-primary" : s < step ? "w-2 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Tell us about yourself</h2>
                <p className="text-sm text-muted-foreground mt-1">Help us customize your experience</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label>IRDAI License Number</Label>
                  <Input placeholder="SLA-XXXX-XXXXXXXX" value={license} onChange={(e) => setLicense(e.target.value)} />
                  <p className="text-xs text-muted-foreground">Format: SLA-XXXX-XXXXXXXX</p>
                </div>
                <div className="space-y-1.5">
                  <Label>Years of Experience</Label>
                  <Select value={experience} onValueChange={setExperience}>
                    <SelectTrigger><SelectValue placeholder="Select experience" /></SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Primary City</Label>
                  <Input placeholder="e.g. Mumbai" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Primary Insurer</Label>
                  <Select value={insurer} onValueChange={setInsurer}>
                    <SelectTrigger><SelectValue placeholder="Select insurer" /></SelectTrigger>
                    <SelectContent>
                      {insurers.map((i) => (
                        <SelectItem key={i} value={i}>{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={nextStep} className="w-full gap-2">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold text-foreground">Set up your first report template</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose a default format for your reports</p>
              </div>

              <div className="space-y-4">
                <RadioGroup value={template} onValueChange={setTemplate} className="space-y-2">
                  {templates.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => setTemplate(t.id)}
                    >
                      <RadioGroupItem value={t.id} id={`onb-${t.id}`} />
                      <Label htmlFor={`onb-${t.id}`} className="cursor-pointer text-sm font-medium flex-1">
                        {t.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="space-y-1.5">
                  <Label>Upload Signature <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 py-6 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
                  >
                    <Upload className="h-6 w-6 text-primary" />
                    <p className="text-sm text-muted-foreground">Click to upload signature image</p>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={prevStep} className="gap-1.5">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button onClick={nextStep} className="flex-1 gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto h-20 w-20 rounded-full bg-[hsl(var(--success))]/10 flex items-center justify-center animate-in zoom-in-50 duration-500">
                <CheckCircle2 className="h-10 w-10 text-[hsl(var(--success))]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground">You're ready!</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Your free trial: <span className="font-semibold text-foreground">10 claims, 7 days</span>
                </p>
              </div>

              <Button onClick={() => navigate("/")} className="w-full" size="lg">
                Go to Dashboard
              </Button>

              <button onClick={prevStep} className="text-xs text-muted-foreground hover:text-foreground">
                ← Go back
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
