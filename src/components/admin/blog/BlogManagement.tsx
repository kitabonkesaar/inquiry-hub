import { useEffect, useState } from "react";
import { blogService } from "@/services/blogService";
import { BlogPost } from "@/types/blog";
import BlogEditor from "./BlogEditor";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const BlogManagement = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { posts, count } = await blogService.getAllPosts(page);
      setPosts(posts);
      setTotalCount(count || 0);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch posts", err);
      setError("Failed to load blog posts. Database connection failed or tables missing.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load blog posts. Please check database setup.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
        await blogService.deletePost(id);
        toast({ title: "Post deleted" });
        fetchPosts();
    } catch (err) {
        toast({ title: "Failed to delete post", variant: "destructive" });
    }
  };

  if (isEditing) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{currentPost ? 'Edit Post' : 'Create New Post'}</h2>
            </div>
            <BlogEditor 
                post={currentPost} 
                onSave={() => { setIsEditing(false); fetchPosts(); }} 
                onCancel={() => setIsEditing(false)} 
            />
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold">Blog Management</h2>
            <p className="text-muted-foreground">Manage your blog posts, categories, and authors.</p>
        </div>
        <Button onClick={() => { setCurrentPost(undefined); setIsEditing(true); }}>
            <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      {error && (
        <div className="p-4 rounded-md bg-destructive/10 text-destructive border border-destructive/20">
            <p className="font-semibold">System Error</p>
            <p>{error}</p>
            <p className="text-sm mt-2 opacity-80">Please ensure the database migration has been run in Supabase SQL Editor.</p>
        </div>
      )}

      <div className="bg-card rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
                        </TableCell>
                    </TableRow>
                ) : posts.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                            No posts found. Create your first one!
                        </TableCell>
                    </TableRow>
                ) : (
                    posts.map(post => (
                        <TableRow key={post.id}>
                            <TableCell className="font-medium">{post.title}</TableCell>
                            <TableCell>
                                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                                    {post.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : '-'}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" asChild>
                                        <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                                            <Eye className="w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => { setCurrentPost(post); setIsEditing(true); }}>
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(post.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
      </div>
      
      {/* Simple pagination */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>Total {totalCount} posts</span>
          <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => setPage(p => p + 1)} disabled={posts.length < 10}>Next</Button>
          </div>
      </div>
    </div>
  );
};

export default BlogManagement;
