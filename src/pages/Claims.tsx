import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Plus,
  Search,
  MoreHorizontal,
  CalendarIcon,
  FileText,
  Pencil,
  Trash2,
  ExternalLink,
  FileDown,
  Download,
  ClipboardList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type ClaimStatus = "Draft" | "In Review" | "Final" | "Disputed";
type ReportStatus = "Generated" | "Pending";

interface Claim {
  id: string;
  vehicle: string;
  owner: string;
  insurer: string;
  idv: number;
  status: ClaimStatus;
  created: string;
  report: ReportStatus;
}

const mockClaims: Claim[] = [
  { id: "CLM-2024-0451", vehicle: "Maruti Swift VXI", owner: "Rajesh Kumar", insurer: "New India", idv: 450000, status: "In Review", created: "18 Mar 2026", report: "Pending" },
  { id: "CLM-2024-0450", vehicle: "Hyundai Creta SX", owner: "Priya Sharma", insurer: "Oriental", idv: 1250000, status: "Draft", created: "17 Mar 2026", report: "Pending" },
  { id: "CLM-2024-0449", vehicle: "Tata Nexon EV Max", owner: "Amit Patel", insurer: "United India", idv: 1650000, status: "Final", created: "16 Mar 2026", report: "Generated" },
  { id: "CLM-2024-0448", vehicle: "Mahindra XUV700 AX7", owner: "Sunita Devi", insurer: "National", idv: 2100000, status: "Disputed", created: "15 Mar 2026", report: "Generated" },
  { id: "CLM-2024-0447", vehicle: "Honda City ZX CVT", owner: "Vikram Singh", insurer: "New India", idv: 1350000, status: "Final", created: "14 Mar 2026", report: "Generated" },
  { id: "CLM-2024-0446", vehicle: "Tata Harrier XZ+", owner: "Deepak Gupta", insurer: "Oriental", idv: 1800000, status: "In Review", created: "13 Mar 2026", report: "Pending" },
  { id: "CLM-2024-0445", vehicle: "Maruti Baleno Alpha", owner: "Neha Agarwal", insurer: "United India", idv: 780000, status: "Draft", created: "12 Mar 2026", report: "Pending" },
  { id: "CLM-2024-0444", vehicle: "Hyundai Venue S+", owner: "Arjun Reddy", insurer: "National", idv: 920000, status: "Final", created: "11 Mar 2026", report: "Generated" },
];

const statusStyles: Record<ClaimStatus, string> = {
  Draft: "bg-muted text-muted-foreground hover:bg-muted",
  "In Review": "bg-primary/10 text-primary hover:bg-primary/10",
  Final: "bg-success/10 text-success hover:bg-success/10",
  Disputed: "bg-destructive/10 text-destructive hover:bg-destructive/10",
};

const reportStyles: Record<ReportStatus, string> = {
  Generated: "bg-success/10 text-success hover:bg-success/10",
  Pending: "bg-muted text-muted-foreground hover:bg-muted",
};

function formatINR(val: number) {
  return "₹" + val.toLocaleString("en-IN");
}

const Claims = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [insurerFilter, setInsurerFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const hasFilters = search || statusFilter !== "all" || insurerFilter !== "all" || dateFrom || dateTo;

  const filtered = useMemo(() => {
    return mockClaims.filter((c) => {
      if (search) {
        const q = search.toLowerCase();
        if (!c.id.toLowerCase().includes(q) && !c.vehicle.toLowerCase().includes(q) && !c.owner.toLowerCase().includes(q)) return false;
      }
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (insurerFilter !== "all" && c.insurer !== insurerFilter) return false;
      return true;
    });
  }, [search, statusFilter, insurerFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setInsurerFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((c) => c.id)));
    }
  };

  return (
    <AppLayout title="Claims">
      <div className="space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div />
          <Button onClick={() => navigate("/new-claim")} className="gap-2">
            <Plus className="h-4 w-4" /> New Claim
          </Button>
        </div>

        {/* Filter bar */}
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by vehicle, claim ID, or policy number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                  <SelectItem value="Disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={insurerFilter} onValueChange={setInsurerFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Insurer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Insurers</SelectItem>
                  <SelectItem value="New India">New India</SelectItem>
                  <SelectItem value="Oriental">Oriental</SelectItem>
                  <SelectItem value="United India">United India</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                </SelectContent>
              </Select>

              {/* Date From */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd MMM yy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>

              {/* Date To */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal", !dateTo && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd MMM yy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>

              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-primary hover:underline whitespace-nowrap">
                  Clear Filters
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <Card className="shadow-sm border-primary/30 bg-primary/5">
            <CardContent className="p-3 flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">{selected.size} selected</span>
              <span className="text-border">—</span>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-primary">
                <FileDown className="h-4 w-4" /> Generate Reports
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-primary">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-destructive">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Table or Empty */}
        {filtered.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No claims found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or create a new claim</p>
              <Button onClick={() => navigate("/new-claim")} className="gap-2 mt-2">
                <Plus className="h-4 w-4" /> Create your first claim
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[44px] pl-4">
                      <Checkbox
                        checked={selected.size === filtered.length && filtered.length > 0}
                        onCheckedChange={toggleAll}
                      />
                    </TableHead>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead className="hidden md:table-cell">Owner Name</TableHead>
                    <TableHead className="hidden lg:table-cell">Insurer</TableHead>
                    <TableHead className="hidden lg:table-cell text-right">IDV</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Created</TableHead>
                    <TableHead className="hidden md:table-cell">Report</TableHead>
                    <TableHead className="w-[48px]" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((claim) => (
                    <TableRow key={claim.id} className={cn(selected.has(claim.id) && "bg-primary/5")}>
                      <TableCell className="pl-4">
                        <Checkbox
                          checked={selected.has(claim.id)}
                          onCheckedChange={() => toggleSelect(claim.id)}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm text-primary font-medium cursor-pointer hover:underline">
                        {claim.id}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{claim.vehicle}</TableCell>
                      <TableCell className="hidden md:table-cell">{claim.owner}</TableCell>
                      <TableCell className="hidden lg:table-cell">{claim.insurer}</TableCell>
                      <TableCell className="hidden lg:table-cell text-right font-medium tabular-nums">{formatINR(claim.idv)}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn("rounded-sm text-xs font-medium", statusStyles[claim.status])}>
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{claim.created}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary" className={cn("rounded-sm text-xs font-medium", reportStyles[claim.report])}>
                          {claim.report}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2"><ExternalLink className="h-4 w-4" /> Open</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><Pencil className="h-4 w-4" /> Edit</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2"><FileText className="h-4 w-4" /> Generate PDF</DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1–{filtered.length} of 47 claims
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Claims;
