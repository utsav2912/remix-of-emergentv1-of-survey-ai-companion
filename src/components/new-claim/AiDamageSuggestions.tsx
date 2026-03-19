import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const initialAreas = [
  "Front Bumper",
  "Hood",
  "Right Headlight",
  "Windshield",
  "Right Fender",
];

export function AiDamageSuggestions() {
  const [areas, setAreas] = useState(initialAreas);
  const [analyzing, setAnalyzing] = useState(false);

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
        <div className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-foreground font-medium">
            {analyzing ? "Analyzing 6 photos..." : "8 parts identified"}
          </span>
        </div>

        {/* Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
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

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground">
          AI suggestions are a starting point. Review and edit all values before
          submitting.
        </p>
      </CardContent>
    </Card>
  );
}
