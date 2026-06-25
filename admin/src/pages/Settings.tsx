import { useState } from "react";
import { Save, Sun, Moon } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCanteen } from "@/context/CanteenContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export function SettingsPage() {
  const { settings, updateSettings } = useCanteen();
  const { theme, setTheme } = useTheme();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage canteen details and appearance preferences." />

      <Card className="max-w-3xl border-border">
        <CardHeader>
          <CardTitle className="text-base">Canteen Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Canteen Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="open">Opening Time</Label>
              <Input id="open" type="time" value={form.openingTime} onChange={(e) => setForm({ ...form, openingTime: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="close">Closing Time</Label>
              <Input id="close" type="time" value={form.closingTime} onChange={(e) => setForm({ ...form, closingTime: e.target.value })} />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save changes
            </Button>
            {saved ? <span className="text-sm text-success">Saved successfully</span> : null}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-3xl border-border">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
                theme === "light" ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-border hover:border-primary/40",
              )}
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Light Mode</div>
                <div className="text-xs text-muted-foreground">Bright and clean</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
                theme === "dark" ? "border-primary ring-2 ring-primary/30 bg-primary/5" : "border-border hover:border-primary/40",
              )}
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-muted">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-xs text-muted-foreground">Easy on the eyes</div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
