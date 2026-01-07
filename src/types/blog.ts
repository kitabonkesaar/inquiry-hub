export interface Author {
  id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  author_id: string | null;
  published_at: string | null;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  author?: Author;
  categories?: Category[];
  tags?: Tag[];
}

export interface CreatePostDTO {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  author_id?: string;
  status: 'draft' | 'published' | 'archived';
  category_ids: string[];
  tag_ids: string[];
}
