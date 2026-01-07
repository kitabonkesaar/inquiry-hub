import { useEffect, useState } from "react";
import { settingsService } from "@/services/settingsService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const AdminSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Blog Section Settings State
  const [blogSettings, setBlogSettings] = useState({
    enabled: true,
    title: "",
    subtitle: "",
    limit: 3
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const settings = await settingsService.getBlogSettings();
      setBlogSettings(settings);
    } catch (error) {
      console.error("Failed to load settings", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load settings.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await settingsService.updateBlogSettings(blogSettings);
      toast({
        title: "Success",
        description: "Settings updated successfully.",
      });
    } catch (error) {
      console.error("Failed to save settings", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save settings.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <p className="text-muted-foreground">Manage global configuration for your website.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Homepage Blog Section</CardTitle>
          <CardDescription>
            Control the visibility and content of the blog section on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="blog-enabled" className="flex flex-col space-y-1">
              <span>Enable Blog Section</span>
              <span className="font-normal text-xs text-muted-foreground">
                When disabled, the blog section will be hidden from the homepage.
              </span>
            </Label>
            <Switch
              id="blog-enabled"
              checked={blogSettings.enabled}
              onCheckedChange={(checked) => setBlogSettings({ ...blogSettings, enabled: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-title">Section Title</Label>
            <Input
              id="blog-title"
              value={blogSettings.title}
              onChange={(e) => setBlogSettings({ ...blogSettings, title: e.target.value })}
              placeholder="e.g., Latest from Our Blog"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-subtitle">Section Subtitle</Label>
            <Input
              id="blog-subtitle"
              value={blogSettings.subtitle}
              onChange={(e) => setBlogSettings({ ...blogSettings, subtitle: e.target.value })}
              placeholder="e.g., Stay updated with..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blog-limit">Number of Posts to Show</Label>
            <Input
              id="blog-limit"
              type="number"
              min={1}
              max={12}
              value={blogSettings.limit}
              onChange={(e) => setBlogSettings({ ...blogSettings, limit: parseInt(e.target.value) || 3 })}
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSettings;
