import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogService } from "@/services/blogService";
import { BlogPost as BlogPostType } from "@/types/blog";
import { Loader2, CalendarDays, User, ArrowLeft, Tag as TagIcon } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to fetch post", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you are looking for does not exist.</p>
            <Button asChild>
                <Link to="/blog">Back to Blog</Link>
            </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <article className="container mx-auto px-4 max-w-4xl">
            <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
                <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
            </Button>

            {post.categories && post.categories.length > 0 && (
                <div className="flex gap-2 mb-4">
                    {post.categories.map((cat: any) => (
                        <Badge key={cat.id} variant="secondary">{cat.name}</Badge>
                    ))}
                </div>
            )}

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div className="flex flex-wrap items-center text-muted-foreground mb-8 gap-6 border-b pb-8">
                <div className="flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2" />
                    {post.published_at ? format(new Date(post.published_at), 'MMMM d, yyyy') : 'Draft'}
                </div>
                {post.author && (
                    <div className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        <span className="font-medium">{post.author.name}</span>
                    </div>
                )}
            </div>

            {post.featured_image && (
                <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
                    <img src={post.featured_image} alt={post.title} className="w-full object-cover max-h-[500px]" />
                </div>
            )}

            <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                    <div className="flex items-center gap-2 flex-wrap">
                        <TagIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold mr-2">Tags:</span>
                        {post.tags.map((tag: any) => (
                            <span key={tag.id} className="text-sm bg-muted px-2 py-1 rounded text-muted-foreground">
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
