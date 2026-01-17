import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  posts: UserPost[];
  addPost: (post: Omit<UserPost, 'id' | 'slug' | 'createdAt' | 'updatedAt'>) => UserPost;
  updatePost: (id: string, data: Partial<UserPost>) => void;
  deletePost: (id: string) => void;
  getPostsByAuthor: (authorId: string) => UserPost[];
  getPostById: (id: string) => UserPost | undefined;
}

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const usePostStore = create<PostState>()(
  persist(
    (set, get) => ({
      posts: [],

      addPost: (postData) => {
        const now = new Date().toISOString();
        const newPost: UserPost = {
          ...postData,
          id: crypto.randomUUID(),
          slug: generateSlug(postData.title) + '-' + Date.now(),
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          posts: [newPost, ...state.posts],
        }));

        return newPost;
      },

      updatePost: (id, data) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? {
                  ...post,
                  ...data,
                  slug: data.title ? generateSlug(data.title) + '-' + Date.now() : post.slug,
                  updatedAt: new Date().toISOString(),
                }
              : post
          ),
        }));
      },

      deletePost: (id) => {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id),
        }));
      },

      getPostsByAuthor: (authorId) => {
        return get().posts.filter((post) => post.authorId === authorId);
      },

      getPostById: (id) => {
        return get().posts.find((post) => post.id === id);
      },
    }),
    {
      name: 'user-posts-storage',
    }
  )
);
