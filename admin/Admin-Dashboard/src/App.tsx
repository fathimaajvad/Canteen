import { ThemeProvider } from "@/context/ThemeContext";
import { CanteenProvider } from "@/context/CanteenContext";
import { AppLayout } from "@/layouts/AppLayout";
import { AppRoutes } from "@/routes/AppRoutes";

export default function App() {
  return (
    <ThemeProvider>
      <CanteenProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </CanteenProvider>
    </ThemeProvider>
  );
}
