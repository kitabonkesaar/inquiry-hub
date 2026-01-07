import { supabase } from "@/integrations/supabase/client";

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
}

export const settingsService = {
  async getSetting(key: string) {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", key)
      .single();

    if (error) {
        // If not found, return null (handled by caller) or throw
        if (error.code === 'PGRST116') return null;
        throw error;
    }
    return data as SiteSetting;
  },

  async updateSetting(key: string, value: any) {
    const { data, error } = await supabase
      .from("site_settings")
      .update({ value })
      .eq("key", key)
      .select()
      .single();

    if (error) throw error;
    return data as SiteSetting;
  },
  
  // Helper specifically for blog section
  async getBlogSettings() {
      try {
        const setting = await this.getSetting('blog_section');
        if (!setting) {
            // Return defaults if not in DB
            return {
                enabled: true,
                title: "Latest from Our Blog",
                subtitle: "Stay updated with travel tips, bus reviews, and industry news.",
                limit: 3
            };
        }
        return setting.value;
      } catch (err) {
        // If table doesn't exist or other error, return defaults to avoid crash
        console.warn("Using default blog settings due to error:", err);
        return {
            enabled: true,
            title: "Latest from Our Blog",
            subtitle: "Stay updated with travel tips, bus reviews, and industry news.",
            limit: 3
        };
      }
  },

  async updateBlogSettings(settings: { enabled: boolean; title: string; subtitle: string; limit: number }) {
      return this.updateSetting('blog_section', settings);
  }
};
