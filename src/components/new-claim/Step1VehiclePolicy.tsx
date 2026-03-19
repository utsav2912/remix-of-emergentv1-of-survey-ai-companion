import { VehicleDetailsCard } from "@/components/new-claim/VehicleDetailsCard";
import { PolicyDetailsCard } from "@/components/new-claim/PolicyDetailsCard";
import { CauseOfLossCard } from "@/components/new-claim/CauseOfLossCard";

interface Step1Props {
  data: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string, value: any) => void;
}

export function Step1VehiclePolicy({ data, errors, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VehicleDetailsCard data={data} errors={errors} onChange={onChange} />
        <PolicyDetailsCard data={data} errors={errors} onChange={onChange} />
      </div>
      <CauseOfLossCard data={data} errors={errors} onChange={onChange} />
    </div>
  );
}
