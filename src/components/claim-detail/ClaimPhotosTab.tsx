import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Camera, X, MapPin, Clock, Car, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface Photo {
  id: string;
  label: string;
  hasGps: boolean;
  timestamp: string;
}

const mockPhotos: Photo[] = [
  { id: "1", label: "Front view", hasGps: true, timestamp: "14 Mar, 10:32 AM" },
  { id: "2", label: "Rear view", hasGps: true, timestamp: "14 Mar, 10:33 AM" },
  { id: "3", label: "Driver side", hasGps: false, timestamp: "14 Mar, 10:34 AM" },
  { id: "4", label: "Dashboard", hasGps: true, timestamp: "14 Mar, 10:35 AM" },
  { id: "5", label: "Damaged panel", hasGps: true, timestamp: "14 Mar, 10:36 AM" },
  { id: "6", label: "Close-up damage", hasGps: false, timestamp: "14 Mar, 10:37 AM" },
];

export function ClaimPhotosTab() {
  const [photos, setPhotos] = useState(mockPhotos);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const removePhoto = (id: string) => setPhotos((p) => p.filter((x) => x.id !== id));

  return (
    <div className="space-y-5">
      {/* Upload zone */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 py-8 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
      >
        <Camera className="h-8 w-8 text-primary" />
        <p className="text-sm font-medium text-foreground">Add more photos</p>
        <p className="text-xs text-muted-foreground">JPG, PNG up to 10MB</p>
        <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, idx) => (
          <div
            key={photo.id}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/60 group cursor-pointer"
            onMouseEnter={() => setHovered(photo.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setLightbox(photo.id)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Car className="h-10 w-10 text-muted-foreground/40" />
            </div>

            {hovered === photo.id && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                  className="absolute top-2 right-2 h-7 w-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md z-10"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm rounded px-2 py-1 flex items-center gap-1 text-xs text-foreground z-10">
                  <ZoomIn className="h-3 w-3" /> View Full Size
                </div>
              </>
            )}

            <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm px-2.5 py-1.5 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-white bg-white/20 px-1.5 py-0.5 rounded">
                  {idx + 1}/{photos.length}
                </span>
                <span className={cn("flex items-center gap-1 text-[11px] font-medium", photo.hasGps ? "text-green-400" : "text-amber-400")}>
                  <MapPin className="h-3 w-3" />
                  {photo.hasGps ? "GPS ✓" : "No GPS"}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/70">
                <Clock className="h-2.5 w-2.5" /> {photo.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!lightbox} onOpenChange={() => setLightbox(null)}>
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
