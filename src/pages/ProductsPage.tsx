import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, ChevronDown, Search, Leaf } from 'lucide-react';
import { useProducts, useCategories, useOrigins } from '@/hooks/useProducts';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';
import { CustomButton } from '@/components/ui/custom-button';

const priceRanges = [
  { id: 'all', name: 'Tất cả giá', min: 0, max: Infinity },
  { id: 'under200', name: 'Dưới 200.000đ', min: 0, max: 200000 },
  { id: '200-400', name: '200.000đ - 400.000đ', min: 200000, max: 400000 },
  { id: '400-600', name: '400.000đ - 600.000đ', min: 400000, max: 600000 },
  { id: 'over600', name: 'Trên 600.000đ', min: 600000, max: Infinity },
];

const categoryNames: Record<string, string> = {
  original: 'Trà nguyên chất',
  teabag: 'Trà túi lọc',
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedOrigin = searchParams.get('origin') || 'all';
  const selectedPrice = searchParams.get('price') || 'all';
  const sortBy = searchParams.get('sort') || 'featured';

  // Fetch data from Supabase
  const priceRange = priceRanges.find((p) => p.id === selectedPrice);
  const { data: products = [], isLoading } = useProducts({
    category: selectedCategory,
    origin: selectedOrigin,
    priceMin: priceRange?.min,
    priceMax: priceRange?.max,
    search: searchQuery,
  });
  const { data: categories = [] } = useCategories();
  const { data: origins = [] } = useOrigins();

  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Sort (filtering is done in the query)
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => {
          const dateA = new Date(a.created_at || 0).getTime();
          const dateB = new Date(b.created_at || 0).getTime();
          return dateB - dateA;
        });
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, sortBy]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedOrigin !== 'all' ||
    selectedPrice !== 'all';

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header with Background Image */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1920&auto=format&fit=crop"
            alt="Tea background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-tea-900/80 via-tea-900/70 to-tea-900/90" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary/30">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-decoration font-semibold text-white text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]">
              Sản Phẩm Trà
            </h1>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary/30">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
          </div>
          <p className="text-tea-100 text-center text-lg max-w-2xl mx-auto">
            Khám phá bộ sưu tập trà xanh nguyên chất từ Việt Nam và Nhật Bản
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-background border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sản phẩm trà xanh..."
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-accent rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg border border-border"
            >
              <Filter className="w-5 h-5" />
              Bộ lọc
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => updateFilter('sort', e.target.value)}
              className="px-4 py-2 bg-card rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="featured">Nổi bật</option>
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp đến cao</option>
              <option value="price-desc">Giá cao đến thấp</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>

          {/* Sidebar Filters */}
          <aside
            className={`lg:w-64 flex-shrink-0 ${
              showFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Bộ lọc</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center justify-between">
                  Loại trà
                  <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === 'all'}
                      onChange={() => updateFilter('category', 'all')}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">Tất cả</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => updateFilter('category', cat.id)}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {categoryNames[cat.id] || cat.name} ({cat.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Origin Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center justify-between">
                  Nguồn gốc
                  <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="origin"
                      checked={selectedOrigin === 'all'}
                      onChange={() => updateFilter('origin', 'all')}
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <span className="text-sm text-muted-foreground">Tất cả</span>
                  </label>
                  {origins.map((origin) => (
                    <label key={origin.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="origin"
                        checked={selectedOrigin === origin.id}
                        onChange={() => updateFilter('origin', origin.id)}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        {origin.name} ({origin.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-3 flex items-center justify-between">
                  Khoảng giá
                  <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPrice === range.id}
                        onChange={() => updateFilter('price', range.id)}
                        className="w-4 h-4 text-primary accent-primary"
                      />
                      <span className="text-sm text-muted-foreground">{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop Sort */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Hiển thị <span className="font-medium text-foreground">{filteredProducts.length}</span> sản phẩm
              </p>
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="px-4 py-2 bg-card rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Nổi bật</option>
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá thấp đến cao</option>
                <option value="price-desc">Giá cao đến thấp</option>
                <option value="rating">Đánh giá cao</option>
              </select>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">
                  Không tìm thấy sản phẩm phù hợp
                </p>
                <CustomButton onClick={clearFilters} variant="outline">
                  Xóa bộ lọc
                </CustomButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
