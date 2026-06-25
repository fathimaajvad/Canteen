import BottomNav from "../components/common/BottomNav";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {children}

      <BottomNav />
    </div>
  );
}