import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  image: string | null;
  author: string;
  status: 'draft' | 'published';
  tags: string[] | null;
  category: string | null;
  publish_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog_posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string | undefined) {
  return useQuery({
    queryKey: ['blog_post', slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      
      return data as BlogPost;
    },
    enabled: !!slug,
  });
}

export function useBlogPostsByCategory(category: string | null) {
  return useQuery({
    queryKey: ['blog_posts_by_category', category],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published');

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query
        .order('publish_date', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as BlogPost[];
    },
  });
}
