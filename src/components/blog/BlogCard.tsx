import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User } from "lucide-react";
import { Link } from "react-router-dom";
import { BlogPost } from "@/types/blog";
import { format } from "date-fns";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.featured_image || "/placeholder.svg"}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {post.categories && post.categories.length > 0 && (
            <div className="absolute top-2 right-2 flex gap-1">
                {post.categories.slice(0, 1).map((cat: any) => (
                     // Handle nested structure from join if raw, or flat if processed.
                     // Service currently returns raw nested for list: blog_post_categories: [{ blog_categories: {...} }]
                     // Wait, my service for `getPublishedPosts` returned `data` directly.
                     // I need to fix the service to flatten it or handle it here.
                     // Let's assume I fix the service or handle it safely.
                     <Badge key={cat.id || Math.random()} variant="secondary" className="bg-white/90 text-primary hover:bg-white">
                        {cat.name || cat.blog_categories?.name}
                     </Badge>
                ))}
            </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center text-sm text-muted-foreground mb-2 space-x-4">
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-1" />
            {post.published_at ? format(new Date(post.published_at), 'MMM d, yyyy') : 'Draft'}
          </div>
          {post.author && (
             <div className="flex items-center">
               <User className="w-4 h-4 mr-1" />
               {post.author.name}
             </div>
          )}
        </div>
        <h3 className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">
          {post.excerpt || post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...'}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link to={`/blog/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
