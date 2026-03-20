import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Submission {
  id: string;
  claim_ref_no: string;
  status: string;
  created_at: string;
  registration_number: string;
  cause_of_loss: string;
  preliminary_estimate: number | null;
  location_address: string | null;
  visible_damage: string[];
  vehicle_driveable: string;
  scene_notes: string | null;
  towing_required: boolean;
  towing_company: string | null;
  towing_amount: number | null;
}

interface Props {
  userId: string;
}

export function SurveyHistory({ userId }: Props) {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    (async () => {
      const { data } = await supabase
        .from("ila_submissions" as any)
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      setItems((data as any as Submission[]) || []);
      setLoading(false);
    })();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center pt-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="text-center text-muted-foreground pt-20 text-sm">No submissions yet</div>;
  }

  const statusColor = (s: string) => {
    if (s === "pending") return "bg-amber-100 text-amber-700";
    if (s === "processed") return "bg-green-100 text-green-700";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-bold text-foreground">My Submissions</h2>
      {items.map((item) => {
        const isOpen = expanded === item.id;
        return (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setExpanded(isOpen ? null : item.id)}
              className="w-full p-4 text-left flex items-center justify-between min-h-[44px]"
            >
              <div>
                <p className="text-sm font-bold text-foreground">{item.claim_ref_no}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.registration_number} · {item.cause_of_loss}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-[10px] px-1.5 py-0 rounded-sm ${statusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("en-IN")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.preliminary_estimate && (
                  <span className="text-sm font-semibold text-foreground">
                    ₹{Number(item.preliminary_estimate).toLocaleString("en-IN")}
                  </span>
                )}
                {isOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-2 text-sm border-t border-border pt-3">
                    {item.location_address && (
                      <div><span className="text-muted-foreground">Location:</span> {item.location_address}</div>
                    )}
                    <div><span className="text-muted-foreground">Driveable:</span> {item.vehicle_driveable}</div>
                    {item.visible_damage?.length > 0 && (
                      <div>
                        <span className="text-muted-foreground">Damage areas:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.visible_damage.map((d) => (
                            <span key={d} className="text-xs bg-muted px-2 py-0.5 rounded-full">{d}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.towing_required && (
                      <div><span className="text-muted-foreground">Towing:</span> {item.towing_company || "Yes"} {item.towing_amount ? `· ₹${item.towing_amount}` : ""}</div>
                    )}
                    {item.scene_notes && (
                      <div><span className="text-muted-foreground">Notes:</span> {item.scene_notes}</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
