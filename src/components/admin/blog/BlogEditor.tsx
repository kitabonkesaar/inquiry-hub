import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { blogService } from "@/services/blogService";
import { BlogPost, CreatePostDTO, Category, Tag, Author } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Image as ImageIcon, X } from "lucide-react";

interface BlogEditorProps {
  post?: BlogPost;
  onSave: () => void;
  onCancel: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onSave, onCancel }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  
  const [formData, setFormData] = useState<Partial<CreatePostDTO>>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_id: '',
    status: 'draft',
    category_ids: [],
    tag_ids: []
  });

  useEffect(() => {
    const fetchData = async () => {
        const [cats, auths] = await Promise.all([
            blogService.getCategories(),
            blogService.getAuthors()
        ]);
        setCategories(cats);
        setAuthors(auths);
    };
    fetchData();

    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || '',
        featured_image: post.featured_image || '',
        author_id: post.author_id || '',
        status: post.status,
        category_ids: post.categories?.map(c => c.id) || [],
        tag_ids: post.tags?.map(t => t.id) || []
      });
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ 
        ...prev, 
        title, 
        slug: !post ? generateSlug(title) : prev.slug // Only auto-gen slug on create
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
        setLoading(true);
        const url = await blogService.uploadImage(file);
        setFormData(prev => ({ ...prev, featured_image: url }));
        toast({ title: "Image uploaded successfully" });
    } catch (error) {
        console.error(error);
        toast({ title: "Failed to upload image", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
        toast({ title: "Please fill in all required fields", variant: "destructive" });
        return;
    }

    setLoading(true);
    try {
        const payload = formData as CreatePostDTO;
        if (post) {
            await blogService.updatePost(post.id, payload);
            toast({ title: "Post updated successfully" });
        } else {
            await blogService.createPost(payload);
            toast({ title: "Post created successfully" });
        }
        onSave();
    } catch (error) {
        console.error(error);
        toast({ title: "Failed to save post", variant: "destructive" });
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={formData.title} onChange={handleTitleChange} placeholder="Enter post title" required />
        </div>
        <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="post-url-slug" required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(val: any) => setFormData({...formData, status: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Select value={formData.author_id} onValueChange={(val) => setFormData({...formData, author_id: val})}>
                <SelectTrigger>
                    <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                    {authors.map(author => (
                        <SelectItem key={author.id} value={author.id}>{author.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>

        <div className="space-y-2">
            <Label htmlFor="category">Categories (Select one or more)</Label>
            {/* Simple multi-select workaround using native select for MVP, or just single select if UI lib is limited. 
                Radix Select is single value by default. I'll use a simple native select for multi for now or just single category for MVP. 
                Wait, user asked for 'categorization', plural implies multiple. 
                I will implement a simple list of checkboxes for categories. */}
            <div className="border rounded-md p-2 h-10 overflow-y-auto flex gap-2">
                 {categories.map(cat => (
                     <div key={cat.id} className="flex items-center space-x-2">
                        <input 
                            type="checkbox" 
                            id={cat.id}
                            checked={formData.category_ids?.includes(cat.id)}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setFormData(prev => ({
                                    ...prev,
                                    category_ids: checked 
                                        ? [...(prev.category_ids || []), cat.id]
                                        : (prev.category_ids || []).filter(id => id !== cat.id)
                                }));
                            }}
                        />
                        <label htmlFor={cat.id} className="text-sm">{cat.name}</label>
                     </div>
                 ))}
                 {categories.length === 0 && <span className="text-xs text-muted-foreground">No categories found.</span>}
            </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Featured Image</Label>
        <div className="flex items-center gap-4">
            {formData.featured_image && (
                <div className="relative w-32 h-20 rounded overflow-hidden border">
                    <img src={formData.featured_image} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                        type="button"
                        onClick={() => setFormData({...formData, featured_image: ''})}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            )}
            <div className="flex-1">
                <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={loading} />
            </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Input id="excerpt" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} placeholder="Short summary for cards" />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <div className="min-h-[300px] mb-12">
            <ReactQuill 
                theme="snow" 
                value={formData.content} 
                onChange={val => setFormData({...formData, content: val})} 
                className="h-[250px]"
            />
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default BlogEditor;
