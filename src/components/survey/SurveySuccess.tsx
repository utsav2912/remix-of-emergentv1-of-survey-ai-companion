import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Props {
  claimRef: string;
  submittedAt: string;
  onNewAssessment: () => void;
  onViewHistory: () => void;
}

export function SurveySuccess({ claimRef, submittedAt, onNewAssessment, onViewHistory }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </motion.div>

      <h2 className="text-2xl font-bold text-green-700 mb-2">Assessment Submitted!</h2>
      <p className="text-muted-foreground mb-4">Sent to your office team for processing</p>

      <div className="bg-muted rounded-lg px-4 py-3 font-mono text-sm mb-2">{claimRef}</div>
      <p className="text-xs text-muted-foreground mb-8">Submitted at: {submittedAt}</p>

      <div className="w-full max-w-xs space-y-3">
        <Button onClick={onNewAssessment} className="w-full h-12 rounded-xl">Start New Assessment</Button>
        <Button onClick={onViewHistory} variant="outline" className="w-full h-12 rounded-xl">View My Submissions</Button>
      </div>
    </div>
  );
}
