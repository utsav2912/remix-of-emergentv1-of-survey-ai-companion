import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, X, MapPin, Info, Loader2, Car } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockPhoto {
  id: string;
  label: string;
  hasGps: boolean;
}

const initialMockPhotos: MockPhoto[] = [
  { id: "1", label: "Front view", hasGps: true },
  { id: "2", label: "Rear view", hasGps: true },
  { id: "3", label: "Driver side", hasGps: false },
  { id: "4", label: "Dashboard", hasGps: true },
  { id: "5", label: "Damaged panel", hasGps: true },
  { id: "6", label: "Close-up damage", hasGps: false },
];

const checklistItems = [
  "Front view (wide)",
  "Rear view (wide)",
  "Driver side (full)",
  "Passenger side (full)",
  "Dashboard & odometer",
  "Engine bay (if damaged)",
  "Close-up: each damaged panel",
  "Registration plate visible",
];

export function PhotoUploadStep() {
  const [photos, setPhotos] = useState<MockPhoto[]>(initialMockPhotos);
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set([0, 1, 3, 4]));
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedCount = checkedItems.size;
  const progressPercent = (completedCount / checklistItems.length) * 100;

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <Alert className="border-primary/30 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm text-foreground">
          Capture 6–12 photos covering all damaged areas. Include wide shots and close-ups of each damaged panel.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Upload Area - 2/3 width */}
        <div className="lg:col-span-2 space-y-5">
          {/* Upload Drop Zone */}
          <div
            onClick={handleFileInput}
            className={cn(
              "border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5",
              photos.length > 0 ? "py-8" : "py-16"
            )}
          >
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="h-7 w-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Tap to take photos or upload from gallery
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports JPG, PNG up to 10MB each
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              capture="environment"
              className="hidden"
            />
          </div>

          {/* Photo Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/60 cursor-pointer group"
                  onMouseEnter={() => setHoveredPhoto(photo.id)}
                  onMouseLeave={() => setHoveredPhoto(null)}
                  onClick={() => setLightboxPhoto(photo.id)}
                >
                  {/* Placeholder car damage icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="h-10 w-10 text-muted-foreground/40" />
                  </div>

                  {/* Delete button on hover */}
                  {hoveredPhoto === photo.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePhoto(photo.id);
                      }}
                      className="absolute top-2 right-2 h-7 w-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md z-10 hover:bg-destructive/90 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}

                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-white bg-white/20 px-1.5 py-0.5 rounded">
                      {index + 1}/{photos.length}
                    </span>
                    <span className={cn(
                      "flex items-center gap-1 text-[11px] font-medium",
                      photo.hasGps ? "text-green-400" : "text-amber-400"
                    )}>
                      <MapPin className="h-3 w-3" />
                      {photo.hasGps ? "GPS ✓" : "No GPS"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checklist Sidebar */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Required Shots Checklist</CardTitle>
              <p className="text-sm text-muted-foreground">
                {completedCount}/{checklistItems.length} completed
              </p>
              <Progress value={progressPercent} className="h-2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-3">
              {checklistItems.map((item, index) => (
                <label
                  key={index}
                  className="flex items-start gap-2.5 cursor-pointer group"
                >
                  <Checkbox
                    checked={checkedItems.has(index)}
                    onCheckedChange={() => toggleCheck(index)}
                    className="mt-0.5"
                  />
                  <span
                    className={cn(
                      "text-sm transition-colors",
                      checkedItems.has(index)
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    )}
                  >
                    {item}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Offline Notice Banner */}
      <Alert className="border-warning/30 bg-warning/5">
        <Loader2 className="h-4 w-4 text-warning animate-spin" />
        <AlertDescription className="text-sm text-foreground">
          Photos will sync automatically when connected.{" "}
          <span className="font-medium">2 photos pending upload.</span>
        </AlertDescription>
      </Alert>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxPhoto} onOpenChange={() => setLightboxPhoto(null)}>
        <DialogContent className="max-w-2xl p-2">
          <DialogTitle className="sr-only">Photo preview</DialogTitle>
          <div className="aspect-[4/3] rounded-md bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
            <Car className="h-20 w-20 text-muted-foreground/30" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
