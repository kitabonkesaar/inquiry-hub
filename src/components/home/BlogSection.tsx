import { useEffect, useState } from "react";
import { blogService } from "@/services/blogService";
import { settingsService } from "@/services/settingsService";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    enabled: true,
    title: "Latest from Our Blog",
    subtitle: "Stay updated with travel tips, bus reviews, and industry news.",
    limit: 3
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch settings first
        const sectionSettings = await settingsService.getBlogSettings();
        setSettings(sectionSettings);

        // If disabled, stop here (we won't render, but we need the state set first)
        if (!sectionSettings.enabled) {
            setLoading(false);
            return;
        }

        // 2. Fetch posts with the configured limit
        const { posts } = await blogService.getPublishedPosts(1, sectionSettings.limit);
        setPosts(posts);
      } catch (err) {
        console.error("Failed to fetch blog data", err);
        setError("Failed to load blog posts. Please check database connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
        </div>
      </section>
    );
  }

  if (error) {
      return (
        <section className="py-16 bg-muted/30" id="blog">
            <div className="container mx-auto px-4 text-center">
                <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20 max-w-lg mx-auto">
                    <p className="font-semibold">Blog Section Unavailable</p>
                    <p className="text-sm">{error}</p>
                    <p className="text-xs mt-2 opacity-80">Please ensure database migrations are applied.</p>
                </div>
            </div>
        </section>
      );
  }

  // Check visibility setting
  if (!settings.enabled) {
      return null;
  }

  return (
    <section className="py-16 bg-muted/30" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{settings.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {settings.subtitle}
          </p>
        </div>

        {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
            ))}
            </div>
        ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No blog posts found.</p>
                <Button asChild variant="outline" className="mt-4">
                    <Link to="/admin">Go to Admin to Create Posts</Link>
                </Button>
            </div>
        )}

        {posts.length > 0 && (
            <div className="text-center mt-12">
            <Button asChild variant="default" size="lg">
                <Link to="/blog">View All Posts</Link>
            </Button>
            </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
