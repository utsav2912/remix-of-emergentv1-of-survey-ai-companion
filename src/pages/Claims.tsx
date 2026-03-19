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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  SlidersHorizontal,
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

function FilterControls({
  search, setSearch, statusFilter, setStatusFilter,
  insurerFilter, setInsurerFilter, dateFrom, setDateFrom,
  dateTo, setDateTo, clearFilters, hasFilters,
}: {
  search: string; setSearch: (v: string) => void;
  statusFilter: string; setStatusFilter: (v: string) => void;
  insurerFilter: string; setInsurerFilter: (v: string) => void;
  dateFrom?: Date; setDateFrom: (v?: Date) => void;
  dateTo?: Date; setDateTo: (v?: Date) => void;
  clearFilters: () => void; hasFilters: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search claims..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 text-base"
        />
      </div>
      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="text-base min-h-[44px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="In Review">In Review</SelectItem>
          <SelectItem value="Final">Final</SelectItem>
          <SelectItem value="Disputed">Disputed</SelectItem>
        </SelectContent>
      </Select>
      <Select value={insurerFilter} onValueChange={setInsurerFilter}>
        <SelectTrigger className="text-base min-h-[44px]"><SelectValue placeholder="Insurer" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Insurers</SelectItem>
          <SelectItem value="New India">New India</SelectItem>
          <SelectItem value="Oriental">Oriental</SelectItem>
          <SelectItem value="United India">United India</SelectItem>
          <SelectItem value="National">National</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("flex-1 justify-start text-left font-normal min-h-[44px] text-base", !dateFrom && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "dd MMM yy") : "From"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("flex-1 justify-start text-left font-normal min-h-[44px] text-base", !dateTo && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "dd MMM yy") : "To"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>
      {hasFilters && (
        <Button variant="ghost" onClick={clearFilters} className="w-full text-primary min-h-[44px]">
          Clear All Filters
        </Button>
      )}
    </div>
  );
}

const Claims = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [insurerFilter, setInsurerFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const hasFilters = !!(search || statusFilter !== "all" || insurerFilter !== "all" || dateFrom || dateTo);

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
      if (next.has(id)) next.delete(id); else next.add(id);
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

  const filterProps = { search, setSearch, statusFilter, setStatusFilter, insurerFilter, setInsurerFilter, dateFrom, setDateFrom, dateTo, setDateTo, clearFilters, hasFilters };

  return (
    <AppLayout title="Claims">
      <div className="space-y-4 md:space-y-5">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div />
          <Button onClick={() => navigate("/new-claim")} className="gap-2 min-h-[44px]">
            <Plus className="h-4 w-4" /> New Claim
          </Button>
        </div>

        {/* Desktop filter bar */}
        <Card className="shadow-sm hidden md:block">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by vehicle, claim ID, or policy number..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 text-base" />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px] min-h-[44px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="In Review">In Review</SelectItem>
                  <SelectItem value="Final">Final</SelectItem>
                  <SelectItem value="Disputed">Disputed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={insurerFilter} onValueChange={setInsurerFilter}>
                <SelectTrigger className="w-[160px] min-h-[44px]"><SelectValue placeholder="Insurer" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Insurers</SelectItem>
                  <SelectItem value="New India">New India</SelectItem>
                  <SelectItem value="Oriental">Oriental</SelectItem>
                  <SelectItem value="United India">United India</SelectItem>
                  <SelectItem value="National">National</SelectItem>
                </SelectContent>
              </Select>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal min-h-[44px]", !dateFrom && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />{dateFrom ? format(dateFrom, "dd MMM yy") : "From"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-[140px] justify-start text-left font-normal min-h-[44px]", !dateTo && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />{dateTo ? format(dateTo, "dd MMM yy") : "To"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-primary active:underline whitespace-nowrap min-h-[44px] flex items-center">
                  Clear Filters
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mobile filter button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2 min-h-[44px] text-base">
                <SlidersHorizontal className="h-4 w-4" /> Filters
                {hasFilters && <Badge variant="secondary" className="ml-1 text-xs">Active</Badge>}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Claims</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <FilterControls {...filterProps} />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Bulk action bar */}
        {selected.size > 0 && (
          <Card className="shadow-sm border-primary/30 bg-primary/5">
            <CardContent className="p-3 flex items-center gap-4 flex-wrap">
              <span className="text-sm font-medium text-foreground">{selected.size} selected</span>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-primary min-h-[44px]">
                <FileDown className="h-4 w-4" /> Generate Reports
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-primary min-h-[44px]">
                <Download className="h-4 w-4" /> Export CSV
              </Button>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm text-destructive min-h-[44px]">
                <Trash2 className="h-4 w-4" /> Delete
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Empty state */}
        {filtered.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-16 md:py-20 gap-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">No claims found</p>
              <p className="text-sm text-muted-foreground text-center">Try adjusting your filters or create a new claim</p>
              <Button onClick={() => navigate("/new-claim")} className="gap-2 mt-2 min-h-[44px]">
                <Plus className="h-4 w-4" /> Create your first claim
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop table */}
            <Card className="shadow-sm hidden md:block">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[44px] pl-4">
                        <Checkbox checked={selected.size === filtered.length && filtered.length > 0} onCheckedChange={toggleAll} />
                      </TableHead>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Owner Name</TableHead>
                      <TableHead>Insurer</TableHead>
                      <TableHead className="text-right">IDV</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Report</TableHead>
                      <TableHead className="w-[48px]" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((claim) => (
                      <TableRow key={claim.id} className={cn(selected.has(claim.id) && "bg-primary/5")}>
                        <TableCell className="pl-4">
                          <Checkbox checked={selected.has(claim.id)} onCheckedChange={() => toggleSelect(claim.id)} />
                        </TableCell>
                        <TableCell
                          className="font-mono text-sm text-primary font-medium cursor-pointer active:underline"
                          onClick={() => navigate(`/claims/${claim.id}`)}
                        >
                          {claim.id}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">{claim.vehicle}</TableCell>
                        <TableCell>{claim.owner}</TableCell>
                        <TableCell>{claim.insurer}</TableCell>
                        <TableCell className="text-right font-medium tabular-nums">{formatINR(claim.idv)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("rounded-sm text-xs font-medium", statusStyles[claim.status])}>
                            {claim.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{claim.created}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={cn("rounded-sm text-xs font-medium", reportStyles[claim.report])}>
                            {claim.report}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px] text-muted-foreground">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="gap-2" onClick={() => navigate(`/claims/${claim.id}`)}><ExternalLink className="h-4 w-4" /> Open</DropdownMenuItem>
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

            {/* Mobile card list */}
            <div className="md:hidden space-y-3">
              {filtered.map((claim) => (
                <Card
                  key={claim.id}
                  className="shadow-sm active:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/claims/${claim.id}`)}
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-primary">{claim.id}</span>
                      <Badge variant="secondary" className={cn("rounded-sm text-xs font-medium", statusStyles[claim.status])}>
                        {claim.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground">{claim.vehicle}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{claim.created}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 text-xs min-h-[44px]"
                        onClick={(e) => { e.stopPropagation(); navigate(`/claims/${claim.id}`); }}
                      >
                        Open
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1–{filtered.length} of 47 claims
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="min-h-[44px]">Previous</Button>
              <Button variant="outline" size="sm" className="min-h-[44px]">Next</Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Claims;
