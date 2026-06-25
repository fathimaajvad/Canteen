import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "@/pages/Dashboard";
import { OrdersPage } from "@/pages/Orders";
import { MenuPerformancePage } from "@/pages/MenuPerformance";
import { PaymentsPage } from "@/pages/Payments";
import { RevenueAnalyticsPage } from "@/pages/RevenueAnalytics";
import { SettingsPage } from "@/pages/Settings";
import { NotFoundPage } from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/menu" element={<MenuPerformancePage />} />
      <Route path="/payments" element={<PaymentsPage />} />
      <Route path="/analytics" element={<RevenueAnalyticsPage />} />
      <Route path="/revenue" element={<Navigate to="/analytics" replace />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
