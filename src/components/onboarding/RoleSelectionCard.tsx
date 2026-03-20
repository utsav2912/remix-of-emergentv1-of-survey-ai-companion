import { Camera, Monitor } from "lucide-react";

interface RoleSelectionCardProps {
  selectedRole: string;
  onSelect: (role: string) => void;
}

const roles = [
  {
    id: "surveyor",
    icon: Camera,
    title: "Field Surveyor",
    description: "I visit accident sites, capture photos and submit on-spot assessments from my phone",
    tag: "Mobile-first · GPS enabled",
  },
  {
    id: "assistant",
    icon: Monitor,
    title: "Office Assistant",
    description: "I receive ILA submissions, review AI-generated reports and coordinate with insurers",
    tag: "Desktop · Full dashboard",
  },
];

export function RoleSelectionCard({ selectedRole, onSelect }: RoleSelectionCardProps) {
  return (
    <div className="space-y-3">
      <div className="text-center">
        <h3 className="text-base font-semibold text-foreground">How will you use SurveyDamage AI?</h3>
        <p className="text-xs text-muted-foreground mt-0.5">This sets your default interface</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {roles.map((role) => {
          const selected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <role.icon className={`h-8 w-8 mb-2 ${selected ? "text-primary" : "text-muted-foreground"}`} />
              <p className="font-semibold text-sm text-foreground">{role.title}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{role.description}</p>
              <span className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {role.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
