import { useEffect, useState } from "react";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { posts, count } = await blogService.getPublishedPosts(page, limit);
        setPosts(posts);
        if (count) setTotalPages(Math.ceil(count / limit));
      } catch (err) {
        console.error("Failed to fetch blog posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover stories, tips, and guides for your next journey.
            </p>
          </div>

          {loading ? (
             <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
             </div>
          ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
                </div>

                {totalPages > 1 && (
                    <div className="flex justify-center gap-4">
                        <Button 
                            variant="outline" 
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        <span className="flex items-center text-muted-foreground">
                            Page {page} of {totalPages}
                        </span>
                        <Button 
                            variant="outline" 
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogList;
