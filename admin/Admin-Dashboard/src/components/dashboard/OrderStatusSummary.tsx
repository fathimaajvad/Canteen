import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChefHat, CheckCircle2, PackageCheck } from "lucide-react";
import type { Order } from "@/types";
import { cn } from "@/lib/utils";

interface OrderStatusSummaryProps {
  orders: Order[];
}

export function OrderStatusSummary({ orders }: OrderStatusSummaryProps) {
  const total = orders.length || 1;
  const preparing = orders.filter((o) => o.status === "Preparing").length;
  const ready = orders.filter((o) => o.status === "Ready").length;
  const completed = orders.filter((o) => o.status === "Completed").length;

  const items = [
    { label: "Preparing", count: preparing, icon: ChefHat, color: "text-warning", bar: "bg-warning" },
    { label: "Ready", count: ready, icon: PackageCheck, color: "text-chart-2", bar: "bg-chart-2" },
    { label: "Completed", count: completed, icon: CheckCircle2, color: "text-success", bar: "bg-success" },
  ];

  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <div className="mb-4">
          <h3 className="text-base font-semibold">Order Status</h3>
          <p className="text-xs text-muted-foreground">Live distribution across kitchen</p>
        </div>
        <div className="space-y-4">
          {items.map((it) => {
            const pct = Math.round((it.count / total) * 100);
            return (
              <div key={it.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <it.icon className={cn("h-4 w-4", it.color)} />
                    <span className="font-medium">{it.label}</span>
                  </div>
                  <span className="text-muted-foreground">{it.count} ({pct}%)</span>
                </div>
                <Progress value={pct} className="h-1.5" indicatorClassName={it.bar} />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
