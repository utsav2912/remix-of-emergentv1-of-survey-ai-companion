import { Car } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface SurveyTopBarProps {
  onAvatarClick: () => void;
}

export function SurveyTopBar({ onAvatarClick }: SurveyTopBarProps) {
  const { user, profile } = useAuth();
  const initials = (profile?.full_name || user?.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-14 bg-white border-b border-border flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Car className="h-5 w-5 text-slate-800" />
        <span className="text-sm font-semibold text-slate-800">SurveyDamage AI</span>
      </div>
      <span className="text-base font-bold text-foreground">New Assessment</span>
      <button onClick={onAvatarClick} className="min-h-[44px] min-w-[44px] flex items-center justify-center">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{initials}</AvatarFallback>
        </Avatar>
      </button>
    </div>
  );
}
