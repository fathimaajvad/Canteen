import { ShoppingBag, IndianRupee, Clock, Trophy } from "lucide-react";
import { StatCard } from "@/components/common/StatCard";
import { PageHeader } from "@/components/common/PageHeader";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusSummary } from "@/components/dashboard/OrderStatusSummary";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { orders } from "@/data/orders";
import { formatINR } from "@/utils/format";

export function DashboardPage() {
  const todaysOrders = orders.length;
  const todaysRevenue = orders.reduce((s, o) => s + o.amount, 0);
  const pendingOrders = orders.filter((o) => o.status !== "Completed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Welcome back, Admin"
        description="Here's a quick look at what's happening at your canteen today."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's Orders" value={todaysOrders.toString()} icon={ShoppingBag} trend={8} accent="primary" />
        <StatCard label="Today's Revenue" value={formatINR(todaysRevenue)} icon={IndianRupee} trend={12} accent="blue" />
        <StatCard label="Pending Orders" value={pendingOrders.toString()} icon={Clock} trend={-4} accent="amber" />
        <StatCard label="Best Selling Item" value="Masala Chai" icon={Trophy} hint="312 sold this week" accent="violet" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <OrderStatusSummary orders={orders} />
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
        </div>
        <OrdersTable data={orders.slice(0, 24)} pageSize={6} />
      </div>
    </div>
  );
}
