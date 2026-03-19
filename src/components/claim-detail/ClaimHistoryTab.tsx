import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface HistoryEntry {
  id: string;
  timestamp: string;
  user: string;
  initials: string;
  message: string;
  type: "edit" | "status" | "system";
}

const history: HistoryEntry[] = [
  { id: "1", timestamp: "19 Mar 2026, 2:45 PM", user: "Ramesh S.", initials: "RS", message: "Changed status from \"Draft\" to \"In Review\"", type: "status" },
  { id: "2", timestamp: "19 Mar 2026, 2:40 PM", user: "Ramesh S.", initials: "RS", message: "Changed Parts Line: Hood replacement rate from ₹10,000 to ₹12,000", type: "edit" },
  { id: "3", timestamp: "19 Mar 2026, 2:38 PM", user: "Ramesh S.", initials: "RS", message: "Added labour charge: Wheel alignment ₹800", type: "edit" },
  { id: "4", timestamp: "19 Mar 2026, 2:30 PM", user: "System", initials: "SY", message: "AI analysis completed — 8 parts identified from 6 photos", type: "system" },
  { id: "5", timestamp: "18 Mar 2026, 4:15 PM", user: "Ramesh S.", initials: "RS", message: "Uploaded 6 photos", type: "edit" },
  { id: "6", timestamp: "18 Mar 2026, 4:00 PM", user: "System", initials: "SY", message: "Claim created with reference SDA/2026/03/0042", type: "system" },
  { id: "7", timestamp: "18 Mar 2026, 3:55 PM", user: "Ramesh S.", initials: "RS", message: "Changed status from \"New\" to \"Draft\"", type: "status" },
];

const typeStyles: Record<string, { dot: string; border: string }> = {
  edit: { dot: "bg-primary", border: "border-primary/30" },
  status: { dot: "bg-[hsl(var(--success))]", border: "border-[hsl(var(--success))]/30" },
  system: { dot: "bg-muted-foreground", border: "border-border" },
};

export function ClaimHistoryTab() {
  return (
    <div className="max-w-3xl space-y-0">
      {history.map((entry, idx) => {
        const style = typeStyles[entry.type];
        return (
          <div key={entry.id} className="flex gap-4">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={cn("h-3 w-3 rounded-full shrink-0 mt-1.5", style.dot)} />
              {idx < history.length - 1 && <div className="w-px flex-1 bg-border" />}
            </div>

            {/* Content */}
            <div className={cn("pb-6 flex-1")}>
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">
                    {entry.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{entry.user}</span>
                <span className="text-xs text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">{entry.timestamp}</span>
              </div>
              <p className={cn(
                "text-sm rounded-lg px-3 py-2 border inline-block",
                style.border,
                entry.type === "system" ? "bg-muted/50 text-muted-foreground" : "bg-card text-foreground"
              )}>
                {entry.message}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
