import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, X, BookOpen, Loader2, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getCategoryName } from '@/lib/categoryUtils';
import { useState, useMemo } from 'react';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: blogPosts = [], isLoading } = useBlogPosts();

  // Lọc bài viết theo search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    
    const query = searchQuery.toLowerCase();
    return blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query)) ||
        (post.category && post.category.toLowerCase().includes(query)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [blogPosts, searchQuery]);

  // Tính thời gian đọc từ content
  const getReadTime = (content: string | null) => {
    if (!content) return 5;
    return Math.ceil(content.length / 1000);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header with Background Image */}
      <div className="relative py-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&auto=format&fit=crop"
            alt="Blog background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-tea-900/80 via-tea-900/70 to-tea-900/90" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary/30">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-decoration font-semibold text-white text-center [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]">
              Blog & Kiến Thức
            </h1>
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center border-2 border-primary/30">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
          </div>
          <p className="text-tea-100 text-center text-lg max-w-2xl mx-auto">
            Khám phá thế giới trà xanh qua những bài viết hữu ích
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
              placeholder="Tìm kiếm bài viết..."
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

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              Không tìm thấy bài viết phù hợp với "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary hover:underline font-medium"
            >
              Xóa tìm kiếm
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden bg-cream">
                <img
                  src={post.image || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {getCategoryName(post.category)}
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Tag className="w-3 h-3" />
                      <span>{post.tags.slice(0, 2).join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link to={`/blog/${post.slug || post.id}`}>{post.title}</Link>
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.publish_date || post.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {getReadTime(post.content)} phút đọc
                    </span>
                  </div>
                </div>

                {/* Read More */}
                <Link
                  to={`/blog/${post.slug || post.id}`}
                  className="inline-flex items-center gap-1 text-primary font-medium mt-4 group-hover:gap-2 transition-all"
                >
                  Đọc thêm
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
