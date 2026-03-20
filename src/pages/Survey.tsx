import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyTopBar } from "@/components/survey/SurveyTopBar";
import { SurveyBottomNav } from "@/components/survey/SurveyBottomNav";
import { SurveyForm } from "@/components/survey/SurveyForm";
import { SurveySuccess } from "@/components/survey/SurveySuccess";
import { SurveyHistory } from "@/components/survey/SurveyHistory";

export type SurveyTab = "assess" | "history" | "alerts" | "profile";

const Survey = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<SurveyTab>("assess");
  const [submitted, setSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("");
  const [submittedTime, setSubmittedTime] = useState("");

  const handleSubmitSuccess = (ref: string) => {
    setSubmittedRef(ref);
    setSubmittedTime(new Date().toLocaleString("en-IN"));
    setSubmitted(true);
  };

  const handleNewAssessment = () => {
    setSubmitted(false);
    setSubmittedRef("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <SurveyTopBar onAvatarClick={() => navigate("/settings")} />

      <div className="flex-1 overflow-y-auto pt-14 pb-16">
        <AnimatePresence mode="wait">
          {activeTab === "assess" && !submitted && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SurveyForm userId={user?.id || ""} onSuccess={handleSubmitSuccess} />
            </motion.div>
          )}
          {activeTab === "assess" && submitted && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <SurveySuccess
                claimRef={submittedRef}
                submittedAt={submittedTime}
                onNewAssessment={handleNewAssessment}
                onViewHistory={() => setActiveTab("history")}
              />
            </motion.div>
          )}
          {activeTab === "history" && (
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SurveyHistory userId={user?.id || ""} />
            </motion.div>
          )}
          {activeTab === "alerts" && (
            <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="p-4 text-center text-muted-foreground pt-20">No alerts yet</div>
            </motion.div>
          )}
          {activeTab === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="p-4 text-center text-muted-foreground pt-20">
                <button onClick={() => navigate("/settings")} className="text-primary underline">Go to Settings</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SurveyBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Survey;
