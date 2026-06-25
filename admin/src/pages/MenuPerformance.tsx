import { Flame } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { menuItems } from "@/data/menuPerformance";
import { formatINR } from "@/utils/format";

export function MenuPerformancePage() {
  const top5 = [...menuItems].sort((a, b) => b.quantitySold - a.quantitySold).slice(0, 5);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Menu Performance"
        description="Track which dishes are loved and where you're earning most."
      />

      <div>
        <div className="mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-warning" />
          <h3 className="text-lg font-semibold">Top 5 Best Selling Today</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {top5.map((m, idx) => (
            <Card key={m.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="rounded-md border-primary/20 bg-primary/10 text-primary">
                    #{idx + 1}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{m.category}</span>
                </div>
                <div className="mt-3 truncate text-base font-semibold">{m.name}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {m.quantitySold} sold
                </div>
                <div className="mt-3 text-lg font-semibold text-primary">
                  {formatINR(m.revenue)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold">All Items</h3>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Quantity Sold</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead className="text-right">Avg Daily Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">{m.category}</TableCell>
                    <TableCell className="text-right">{formatINR(m.price)}</TableCell>
                    <TableCell className="text-right">{m.quantitySold}</TableCell>
                    <TableCell className="text-right font-medium">{formatINR(m.revenue)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">{m.averageDailySales}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
