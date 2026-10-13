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
import { SEOHead } from "@/components/seo/SEOHead";

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
      <SEOHead
        title={`${post.title} | RentAnyBus Blog`}
        description={post.meta_description || post.excerpt || post.title}
        canonicalPath={`/blog/${post.slug}`}
        ogImage={post.featured_image || 'https://www.rentanybus.com/og-image.png'}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.meta_description || post.excerpt || post.title,
          image: post.featured_image || 'https://www.rentanybus.com/og-image.png',
          datePublished: post.published_at,
          author: {
            '@type': 'Person',
            name: post.author?.name || 'RentAnyBus Travel Desk',
          },
          publisher: {
            '@type': 'Organization',
            name: 'RentAnyBus',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.rentanybus.com/logo.png',
            },
          },
        }}
      />
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
                className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* In-Article Conversion Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-primary to-slate-900 text-white p-8 md:p-10 my-10 shadow-xl border border-white/10">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 bg-accent text-[#081829] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  Transparent Odisha Bus Charter
                </span>
                <h3 className="text-2xl md:text-3xl font-black mb-3">
                  Need a Verified Bus or Tempo Traveller for Your Trip?
                </h3>
                <p className="text-slate-300 mb-6 text-sm md:text-base leading-relaxed">
                  Rent directly from verified fleet owners across Bhubaneswar, Cuttack, Puri, and outstation Odisha. Get 100% itemized pricing with zero surprise charges.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="accent" size="lg" className="font-bold">
                    <Link to="/inquiry">Request All-Inclusive Quote</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                    <Link to="/vehicles">Browse 12–55 Seater Fleet</Link>
                  </Button>
                </div>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
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
