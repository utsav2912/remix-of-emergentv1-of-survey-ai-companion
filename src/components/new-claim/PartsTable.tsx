import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Sparkles, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Part {
  id: string;
  name: string;
  category: string;
  action: "Repair" | "Replace";
  qty: number;
  unitRate: number;
  depreciation: number;
  aiSuggested?: boolean;
}

const categories = ["Plastic/Nylon", "Metal Body", "Glass", "Rubber", "Electrical", "Labour"];

const initialParts: Part[] = [
  { id: "1", name: "Front Bumper Assembly", category: "Plastic/Nylon", action: "Replace", qty: 1, unitRate: 8500, depreciation: 50, aiSuggested: true },
  { id: "2", name: "Hood/Bonnet", category: "Metal Body", action: "Replace", qty: 1, unitRate: 12000, depreciation: 25, aiSuggested: true },
  { id: "3", name: "Right Headlight Unit", category: "Plastic/Nylon", action: "Replace", qty: 1, unitRate: 6200, depreciation: 50, aiSuggested: true },
  { id: "4", name: "Windshield Glass", category: "Glass", action: "Replace", qty: 1, unitRate: 9800, depreciation: 30, aiSuggested: true },
  { id: "5", name: "Right Front Fender", category: "Metal Body", action: "Repair", qty: 1, unitRate: 3500, depreciation: 0 },
  { id: "6", name: "Paint - Front Panel", category: "Labour", action: "Repair", qty: 1, unitRate: 4200, depreciation: 0 },
];

interface PartsTableProps {
  parts: Part[];
  onPartsChange: (parts: Part[]) => void;
  nilDep?: boolean;
}

export function PartsTable({ parts, onPartsChange, nilDep = false }: PartsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<Part | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const fmt = (n: number) =>
    n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const netAmount = (p: Part) =>
    nilDep ? p.qty * p.unitRate : p.qty * p.unitRate * (1 - p.depreciation / 100);

  const startEdit = (part: Part) => {
    setEditingId(part.id);
    setEditDraft({ ...part });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft(null);
  };

  const saveEdit = () => {
    if (!editDraft) return;
    onPartsChange(parts.map((p) => (p.id === editDraft.id ? editDraft : p)));
    setSavedId(editDraft.id);
    setTimeout(() => setSavedId(null), 1000);
    cancelEdit();
  };

  const confirmDelete = (id: string) => {
    onPartsChange(parts.filter((p) => p.id !== id));
    setDeletingId(null);
  };

  const addPart = () => {
    const newPart: Part = {
      id: crypto.randomUUID(),
      name: "",
      category: "Metal Body",
      action: "Replace",
      qty: 1,
      unitRate: 0,
      depreciation: 0,
    };
    onPartsChange([...parts, newPart]);
    startEdit(newPart);
  };

  // Empty state
  if (parts.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Parts Assessment</h3>
        </div>
        <div className="border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3 py-12">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No parts added yet</p>
          <p className="text-xs text-muted-foreground">Add parts manually or let AI suggest from photos</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={addPart} className="gap-1.5">
              <Plus className="h-4 w-4" /> Add Part
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5">
              <Sparkles className="h-4 w-4" /> Let AI Suggest
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Parts Assessment</h3>
        <Button size="sm" onClick={addPart} className="gap-1.5">
          <Plus className="h-4 w-4" /> Add Part
        </Button>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="min-w-[180px]">Part Name</TableHead>
              <TableHead className="min-w-[120px]">Category</TableHead>
              <TableHead className="min-w-[100px]">Repair/Replace</TableHead>
              <TableHead className="w-[60px] text-center">Qty</TableHead>
              <TableHead className="min-w-[110px] text-right">Unit Rate (₹)</TableHead>
              <TableHead className="w-[90px] text-right">Dep. %</TableHead>
              <TableHead className="min-w-[110px] text-right">Net Amt (₹)</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => {
              const isEditing = editingId === part.id;
              const isDeleting = deletingId === part.id;
              const isSaved = savedId === part.id;
              const draft = isEditing ? editDraft! : part;

              return (
                <TableRow
                  key={part.id}
                  className={cn(
                    "transition-colors duration-500",
                    part.action === "Replace" && !isEditing && "bg-destructive/5",
                    isEditing && "bg-primary/5",
                    isSaved && "bg-[hsl(var(--success))]/10"
                  )}
                >
                  <TableCell>
                    {isEditing ? (
                      <Input
                        value={draft.name}
                        onChange={(e) => setEditDraft({ ...draft, name: e.target.value })}
                        className="h-8 text-sm"
                      />
                    ) : (
                      <div className="flex items-center gap-1.5">
                        {part.aiSuggested && (
                          <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                        )}
                        <span className="text-sm font-medium">{part.name}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Select value={draft.category} onValueChange={(v) => setEditDraft({ ...draft, category: v })}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="text-sm text-muted-foreground">{part.category}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {isEditing ? (
                      <Select value={draft.action} onValueChange={(v) => setEditDraft({ ...draft, action: v as "Repair" | "Replace" })}>
                        <SelectTrigger className="h-8 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Repair">Repair</SelectItem>
                          <SelectItem value="Replace">Replace</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className={cn(
                        "text-sm font-medium px-2 py-0.5 rounded",
                        part.action === "Replace"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      )}>
                        {part.action}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={draft.qty}
                        onChange={(e) => setEditDraft({ ...draft, qty: Number(e.target.value) })}
                        className="h-8 text-sm text-center w-16"
                      />
                    ) : (
                      <span className="text-sm">{part.qty}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={draft.unitRate}
                        onChange={(e) => setEditDraft({ ...draft, unitRate: Number(e.target.value) })}
                        className="h-8 text-sm text-right w-24"
                      />
                    ) : (
                      <span className="text-sm">₹{fmt(part.unitRate)}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        value={draft.depreciation}
                        onChange={(e) => setEditDraft({ ...draft, depreciation: Number(e.target.value) })}
                        className="h-8 text-sm text-right w-20"
                        disabled={nilDep}
                      />
                    ) : (
                      <span className={cn("text-sm", nilDep && "line-through text-muted-foreground")}>
                        {part.depreciation}%
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold">₹{fmt(netAmount(isEditing ? draft : part))}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {isDeleting ? (
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <span className="text-destructive">Delete?</span>
                        <button onClick={() => confirmDelete(part.id)} className="text-destructive font-medium hover:underline">Yes</button>
                        <button onClick={() => setDeletingId(null)} className="text-muted-foreground hover:underline">Cancel</button>
                      </div>
                    ) : isEditing ? (
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={saveEdit} className="p-1 rounded hover:bg-primary/10 text-primary"><Check className="h-4 w-4" /></button>
                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-destructive/10 text-destructive"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => startEdit(part)} className="p-1 rounded hover:bg-muted text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => setDeletingId(part.id)} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { initialParts };
