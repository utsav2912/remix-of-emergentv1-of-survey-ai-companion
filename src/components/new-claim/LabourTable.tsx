import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";

export interface LabourItem {
  id: string;
  description: string;
  amount: number;
}

const initialLabour: LabourItem[] = [
  { id: "l1", description: "Panel beating", amount: 2500 },
  { id: "l2", description: "Denting & painting", amount: 3800 },
  { id: "l3", description: "Wheel alignment", amount: 800 },
];

interface LabourTableProps {
  items: LabourItem[];
  onItemsChange: (items: LabourItem[]) => void;
}

export function LabourTable({ items, onItemsChange }: LabourTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LabourItem | null>(null);

  const fmt = (n: number) => n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const startEdit = (item: LabourItem) => { setEditingId(item.id); setDraft({ ...item }); };
  const cancelEdit = () => { setEditingId(null); setDraft(null); };
  const saveEdit = () => { if (!draft) return; onItemsChange(items.map((i) => (i.id === draft.id ? draft : i))); cancelEdit(); };
  const deleteItem = (id: string) => onItemsChange(items.filter((i) => i.id !== id));

  const addItem = () => {
    const newItem: LabourItem = { id: crypto.randomUUID(), description: "", amount: 0 };
    onItemsChange([...items, newItem]);
    startEdit(newItem);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Labour Charges</h3>
        <Button size="sm" variant="outline" onClick={addItem} className="gap-1.5">
          <Plus className="h-4 w-4" /> Add Labour
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Labour Description</TableHead>
              <TableHead className="w-[140px] text-right">Amount (₹)</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const isEditing = editingId === item.id;
              const d = isEditing ? draft! : item;
              return (
                <TableRow key={item.id} className={isEditing ? "bg-primary/5" : undefined}>
                  <TableCell>
                    {isEditing ? (
                      <Input value={d.description} onChange={(e) => setDraft({ ...d, description: e.target.value })} className="h-8 text-sm" />
                    ) : (
                      <span className="text-sm">{item.description}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input type="number" value={d.amount} onChange={(e) => setDraft({ ...d, amount: Number(e.target.value) })} className="h-8 text-sm text-right w-28" />
                    ) : (
                      <span className="text-sm font-medium">₹{fmt(item.amount)}</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={saveEdit} className="p-1 rounded hover:bg-primary/10 text-primary"><Check className="h-4 w-4" /></button>
                        <button onClick={cancelEdit} className="p-1 rounded hover:bg-destructive/10 text-destructive"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1">
                        <button onClick={() => startEdit(item)} className="p-1 rounded hover:bg-muted text-muted-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                        <button onClick={() => deleteItem(item.id)} className="p-1 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
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

export { initialLabour };
