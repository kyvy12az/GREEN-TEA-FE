import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Product, ProductFilters } from '@/types/product';

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.category && filters.category !== 'all') {
        query = query.eq('category', filters.category);
      }

      if (filters?.origin && filters.origin !== 'all') {
        query = query.eq('origin', filters.origin);
      }

      if (filters?.priceMin !== undefined) {
        query = query.gte('price', filters.priceMin);
      }

      if (filters?.priceMax !== undefined && filters.priceMax !== Infinity) {
        query = query.lte('price', filters.priceMax);
      }

      if (filters?.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

      return (data || []) as Product[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      console.log('Searching for product with slug/id:', slug);
      
      // Strategy 1: Try to find by slug
      let { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .maybeSingle();

      console.log('Search by slug result:', { data, error });

      // Strategy 2: If not found by slug, try by ID
      if (!data && !error) {
        console.log('Trying to find by ID...');
        const result = await supabase
          .from('products')
          .select('*')
          .eq('id', slug)
          .eq('status', 'active')
          .maybeSingle();
        data = result.data;
        error = result.error;
        console.log('Search by ID result:', { data, error });
      }

      // Strategy 3: If still not found, get all products and match by generated slug from name
      if (!data && !error) {
        console.log('Trying to find by generated slug from name...');
        const allProductsResult = await supabase
          .from('products')
          .select('*')
          .eq('status', 'active');
        
        if (allProductsResult.data) {
          // Find product where generated slug matches
          data = allProductsResult.data.find(p => {
            const generatedSlug = p.name
              .toLowerCase()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd')
              .replace(/[^a-z0-9\s-]/g, '')
              .trim()
              .replace(/\s+/g, '-')
              .replace(/-+/g, '-');
            return generatedSlug === slug;
          }) || null;
          console.log('Search by generated slug result:', { found: !!data });
        }
      }

      if (error) {
        console.error('Error fetching product:', error);
        throw error;
      }

      if (!data) {
        console.error('Product not found with slug/id:', slug);
        return null;
      }

      return data as Product;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      // Count products per category
      const categoryCounts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(categoryCounts).map(([id, count]) => ({
        id,
        name: getCategoryName(id),
        count,
      }));
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useOrigins = () => {
  return useQuery({
    queryKey: ['origins'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('origin')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching origins:', error);
        throw error;
      }

      // Count products per origin
      const originCounts = data.reduce((acc: Record<string, number>, item) => {
        acc[item.origin] = (acc[item.origin] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(originCounts).map(([id, count]) => ({
        id,
        name: getOriginName(id),
        count,
      }));
    },
    staleTime: 10 * 60 * 1000,
  });
};

// Helper functions
const getCategoryName = (id: string): string => {
  const categoryMap: Record<string, string> = {
    'nguyen-la': 'Trà Nguyên Lá',
    'matcha': 'Matcha',
    'tui-loc': 'Trà Túi Lọc',
    'tra-nhat': 'Trà Nhật Bản',
  };
  return categoryMap[id] || id;
};

const getOriginName = (id: string): string => {
  return id === 'vietnam' ? 'Việt Nam' : 'Nhật Bản';
};
