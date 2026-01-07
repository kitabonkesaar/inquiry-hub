import { supabase } from "@/integrations/supabase/client";
import { BlogPost, CreatePostDTO, Category, Tag, Author } from "@/types/blog";

export const blogService = {
  // Public methods
  async getPublishedPosts(page = 1, limit = 6) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:blog_authors(*),
        blog_post_categories(blog_categories(*)),
        blog_post_tags(blog_tags(*))
      `, { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to);

    if (error) throw error;
    
    // Transform to match BlogPost interface
    const posts = data.map((post: any) => ({
        ...post,
        categories: post.blog_post_categories?.map((c: any) => c.blog_categories) || [],
        tags: post.blog_post_tags?.map((t: any) => t.blog_tags) || []
    })) as BlogPost[]; 

    return { posts, count }; 
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:blog_authors(*),
        blog_post_categories(blog_categories(*)),
        blog_post_tags(blog_tags(*))
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    
    // Flatten the data structure
    const post = {
        ...data,
        categories: data.blog_post_categories.map((item: any) => item.blog_categories),
        tags: data.blog_post_tags.map((item: any) => item.blog_tags)
    };

    return post as BlogPost;
  },

  // Admin methods
  async getAllPosts(page = 1, limit = 10) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:blog_authors(*),
        blog_post_categories(blog_categories(*)),
        blog_post_tags(blog_tags(*))
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    // Transform to match BlogPost interface
    const posts = data.map((post: any) => ({
        ...post,
        categories: post.blog_post_categories?.map((c: any) => c.blog_categories) || [],
        tags: post.blog_post_tags?.map((t: any) => t.blog_tags) || []
    })) as BlogPost[];

    return { posts, count };
  },

  async createPost(post: CreatePostDTO) {
    // 1. Create Post
    const { data: newPost, error } = await supabase
      .from("blog_posts")
      .insert({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt,
        featured_image: post.featured_image,
        author_id: post.author_id || null, // Convert empty string to null
        status: post.status,
        published_at: post.status === 'published' ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) throw error;

    // 2. Insert Categories
    if (post.category_ids.length > 0) {
      const categoryInserts = post.category_ids.map(id => ({
        post_id: newPost.id,
        category_id: id
      }));
      const { error: catError } = await supabase
        .from("blog_post_categories")
        .insert(categoryInserts);
      if (catError) console.error("Error adding categories", catError);
    }

    // 3. Insert Tags
    if (post.tag_ids.length > 0) {
        const tagInserts = post.tag_ids.map(id => ({
          post_id: newPost.id,
          tag_id: id
        }));
        const { error: tagError } = await supabase
          .from("blog_post_tags")
          .insert(tagInserts);
        if (tagError) console.error("Error adding tags", tagError);
    }

    return newPost;
  },

  async updatePost(id: string, post: Partial<CreatePostDTO>) {
     // Update basic fields
     const { error } = await supabase
        .from("blog_posts")
        .update({
            title: post.title,
            slug: post.slug,
            content: post.content,
            excerpt: post.excerpt,
            featured_image: post.featured_image,
            author_id: post.author_id || null, // Convert empty string to null for UUID field
            status: post.status,
            published_at: post.status === 'published' ? new Date().toISOString() : undefined // Only update if explicitly published
        })
        .eq('id', id);
    
    if (error) throw error;

    // Update categories (Delete all and re-insert is easiest for now)
    if (post.category_ids) {
        await supabase.from("blog_post_categories").delete().eq("post_id", id);
        if (post.category_ids.length > 0) {
            await supabase.from("blog_post_categories").insert(
                post.category_ids.map(catId => ({ post_id: id, category_id: catId }))
            );
        }
    }
    
    // Update tags
    if (post.tag_ids) {
        await supabase.from("blog_post_tags").delete().eq("post_id", id);
        if (post.tag_ids.length > 0) {
            await supabase.from("blog_post_tags").insert(
                post.tag_ids.map(tagId => ({ post_id: id, tag_id: tagId }))
            );
        }
    }
  },

  async deletePost(id: string) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) throw error;
  },

  // Helpers
  async getCategories() {
    const { data, error } = await supabase.from("blog_categories").select("*");
    if (error) throw error;
    return data as Category[];
  },
  
  async getAuthors() {
    const { data, error } = await supabase.from("blog_authors").select("*");
    if (error) throw error;
    return data as Author[];
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images') // Ensure this bucket exists!
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
    return data.publicUrl;
  }
};
