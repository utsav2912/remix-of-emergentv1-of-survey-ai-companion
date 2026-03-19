import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { X, Plus, Sparkles, Loader2 } from "lucide-react";

const initialAreas = [
  "Front Bumper",
  "Hood",
  "Right Headlight",
  "Windshield",
  "Right Fender",
];

export function AiDamageSuggestions() {
  const [areas, setAreas] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!analyzing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          setAreas(initialAreas);
          return 100;
        }
        return p + Math.random() * 12 + 3;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [analyzing]);

  const removeArea = (area: string) => {
    setAreas((prev) => prev.filter((a) => a !== area));
  };

  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm">
      <CardContent className="pt-5 pb-4 space-y-3">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">AI Suggested Parts</h3>
          <span className="text-sm text-muted-foreground">
            Based on photos uploaded
          </span>
        </div>

        {/* Status */}
        {analyzing ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Loader2 className="h-4 w-4 text-primary animate-spin" />
              <span className="text-foreground font-medium">Analyzing 6 photos...</span>
              <span className="text-muted-foreground">{Math.min(Math.round(progress), 100)}%</span>
            </div>
            <Progress value={Math.min(progress, 100)} className="h-1.5" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            <span className="text-foreground font-medium">8 parts identified</span>
          </div>
        )}

        {/* Chips */}
        {!analyzing && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 animate-fade-in">
            {areas.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="shrink-0 gap-1.5 pl-3 pr-2 py-1.5 text-sm bg-background border border-border hover:bg-muted"
              >
                {area}
                <button
                  onClick={() => removeArea(area)}
                  className="rounded-full hover:bg-muted-foreground/20 p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="shrink-0 gap-1 pl-2 pr-3 py-1.5 text-sm cursor-pointer hover:bg-primary/10 border-dashed border-primary/40 text-primary"
            >
              <Plus className="h-3 w-3" /> Add Area
            </Badge>
          </div>
        )}

        {/* Disclaimer */}
        {!analyzing && (
          <p className="text-xs text-muted-foreground">
            AI suggestions are a starting point. Review and edit all values before
            submitting.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
