import { useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/orders": "Orders",
  "/menu": "Menu Performance",
  "/payments": "Payments",
  "/analytics": "Revenue Analytics",
  "/revenue": "Revenue Analytics",
  "/settings": "Settings",
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Dashboard";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-64">
        <Navbar pageTitle={title} onMenuClick={() => setOpen(true)} />
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
