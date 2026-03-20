import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Loader2, MapPin, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const causesOfLoss = [
  "Accident", "Flood", "Water Damage", "Fire", "Theft",
  "Hail or Storm", "Hit and Run", "Self Accident", "Other",
];

const damageAreas = [
  "Front Bumper", "Rear Bumper", "Hood or Bonnet", "Left Fender",
  "Right Fender", "Left Front Door", "Right Front Door", "Left Rear Door",
  "Right Rear Door", "Windshield", "Rear Glass", "Roof", "Underbody",
  "Engine Bay", "Interior", "Left Mirror", "Right Mirror", "Headlights", "Tail Lights",
];

const driveableOptions = ["Yes", "Partially", "No"];

interface Props {
  userId: string;
  onSuccess: (ref: string) => void;
}

export function SurveyForm({ userId, onSuccess }: Props) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  // Form fields
  const [claimRef, setClaimRef] = useState("");
  const [surveyDatetime, setSurveyDatetime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [regNo, setRegNo] = useState("");
  const [causeOfLoss, setCauseOfLoss] = useState("");
  const [selectedDamage, setSelectedDamage] = useState<string[]>([]);
  const [driveable, setDriveable] = useState("");
  const [towingRequired, setTowingRequired] = useState(false);
  const [towingCompany, setTowingCompany] = useState("");
  const [towingAmount, setTowingAmount] = useState("");
  const [estimate, setEstimate] = useState("");
  const [notes, setNotes] = useState("");

  // GPS
  const [gpsLat, setGpsLat] = useState<number | null>(null);
  const [gpsLng, setGpsLng] = useState<number | null>(null);
  const [gpsAddress, setGpsAddress] = useState("");
  const [gpsLoading, setGpsLoading] = useState(true);
  const [gpsError, setGpsError] = useState(false);

  const fetchGps = () => {
    setGpsLoading(true);
    setGpsError(false);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setGpsLat(latitude);
        setGpsLng(longitude);
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          setGpsAddress(data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        } catch {
          setGpsAddress(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        }
        setGpsLoading(false);
      },
      () => {
        setGpsError(true);
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => { fetchGps(); }, []);

  const toggleDamage = (area: string) => {
    setSelectedDamage((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const canSubmit = claimRef && regNo && causeOfLoss && selectedDamage.length > 0 && driveable;

  const handleSubmit = async () => {
    if (!canSubmit || !userId) return;
    setSubmitting(true);

    const { data, error } = await supabase
      .from("ila_submissions" as any)
      .insert({
        user_id: userId,
        claim_ref_no: claimRef,
        survey_datetime: surveyDatetime,
        location_lat: gpsLat,
        location_lng: gpsLng,
        location_address: gpsAddress || null,
        registration_number: regNo.toUpperCase(),
        cause_of_loss: causeOfLoss,
        visible_damage: selectedDamage,
        vehicle_driveable: driveable,
        towing_required: towingRequired,
        towing_company: towingCompany || null,
        towing_amount: towingAmount ? Number(towingAmount) : null,
        preliminary_estimate: estimate ? Number(estimate) : null,
        scene_notes: notes || null,
        status: "pending",
      } as any)
      .select()
      .single();

    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }

    // Create draft claim linked to submission
    await supabase.from("claims").insert({
      user_id: userId,
      ila_id: (data as any).id,
      status: "Draft",
      registration_number: regNo.toUpperCase(),
      cause_of_loss: causeOfLoss,
    } as any);

    setSubmitting(false);
    onSuccess(claimRef);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Card 1 — Claim Details */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-primary">
        <h3 className="text-base font-bold text-foreground mb-3">Claim Details</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm">Claim Reference No. *</Label>
            <Input
              value={claimRef}
              onChange={(e) => setClaimRef(e.target.value)}
              placeholder="INS/2026/CLM/XXXXX"
              className="mt-1 min-h-[48px] text-base"
            />
            <p className="text-xs text-muted-foreground mt-1">Assigned by insurer on claim allocation</p>
          </div>

          <div>
            <Label className="text-sm">Survey Date and Time</Label>
            <Input
              type="datetime-local"
              value={surveyDatetime}
              onChange={(e) => setSurveyDatetime(e.target.value)}
              className="mt-1 min-h-[48px] text-base"
            />
          </div>

          <div>
            <Label className="text-sm">Vehicle Location (GPS)</Label>
            <div className="mt-1 p-3 bg-muted/30 rounded-lg min-h-[48px] flex items-start gap-2">
              {gpsLoading ? (
                <div className="flex items-center gap-2 text-primary">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Detecting GPS location...</span>
                </div>
              ) : gpsError ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-amber-600">GPS unavailable</span>
                  <button onClick={fetchGps} className="text-sm text-primary flex items-center gap-1">
                    <RotateCcw className="h-3 w-3" /> Retry
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground leading-snug">{gpsAddress}</span>
                  </div>
                  {gpsLat && gpsLng && (
                    <p className="text-[11px] text-muted-foreground mt-1 ml-5.5">
                      lat: {gpsLat.toFixed(4)}, lng: {gpsLng.toFixed(4)}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <Label className="text-sm">Registration Number *</Label>
            <Input
              value={regNo}
              onChange={(e) => setRegNo(e.target.value.toUpperCase())}
              placeholder="MH02AB1234"
              className="mt-1 min-h-[48px] text-base uppercase"
            />
          </div>

          <div>
            <Label className="text-sm">Cause of Loss *</Label>
            <Select value={causeOfLoss} onValueChange={setCauseOfLoss}>
              <SelectTrigger className="mt-1 min-h-[48px] text-base">
                <SelectValue placeholder="Select cause" />
              </SelectTrigger>
              <SelectContent>
                {causesOfLoss.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Card 2 — Visible Damage */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="text-base font-bold text-foreground">Visible Damage</h3>
        <p className="text-xs text-muted-foreground mb-3">Select all damaged areas</p>
        <div className="grid grid-cols-3 gap-2">
          {damageAreas.map((area) => {
            const selected = selectedDamage.includes(area);
            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleDamage(area)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors min-h-[36px] ${
                  selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card 3 — Quick Assessment */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h3 className="text-base font-bold text-foreground mb-3">Assessment Details</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-sm">Vehicle Driveable? *</Label>
            <div className="flex gap-2 mt-1.5">
              {driveableOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setDriveable(opt)}
                  className={`flex-1 rounded-full py-2 text-sm font-medium transition-colors min-h-[44px] ${
                    driveable === opt ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm">Towing Required?</Label>
            <Switch checked={towingRequired} onCheckedChange={setTowingRequired} />
          </div>

          <AnimatePresence>
            {towingRequired && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-3"
              >
                <div>
                  <Label className="text-sm">Towing Company</Label>
                  <Input value={towingCompany} onChange={(e) => setTowingCompany(e.target.value)} className="mt-1 min-h-[48px] text-base" />
                </div>
                <div>
                  <Label className="text-sm">Towing Amount</Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
                    <Input type="number" value={towingAmount} onChange={(e) => setTowingAmount(e.target.value)} className="pl-7 min-h-[48px] text-base" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <Label className="text-sm">Preliminary Estimate</Label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
              <Input type="number" value={estimate} onChange={(e) => setEstimate(e.target.value)} className="pl-7 min-h-[48px] text-base" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Rough estimate only — AI calculates final amount</p>
          </div>

          <div>
            <Label className="text-sm">Spot Notes</Label>
            <Textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe accident circumstances, visible damage, road conditions, any witness information..."
              className="mt-1 text-base"
            />
          </div>
        </div>
      </div>

      {/* Card 4 — Photos */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-foreground">Damage Photos</h3>
          <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">0 photos</span>
        </div>
        <button
          type="button"
          onClick={() => toast.info("Photo capture coming soon")}
          className="w-full h-[110px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-1.5 hover:border-primary/40 hover:bg-primary/5 transition-colors"
        >
          <Camera className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium text-foreground">Capture Damage Photos</span>
          <span className="text-xs text-muted-foreground">Tap for guided photo sequence</span>
        </button>
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || submitting}
        className="w-full h-14 rounded-xl text-base font-semibold"
      >
        {submitting ? (
          <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting...</>
        ) : (
          "Submit Assessment"
        )}
      </Button>
    </div>
  );
}
