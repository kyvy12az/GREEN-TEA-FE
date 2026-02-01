import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, LinkIcon, ChevronRight, Tag, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { getCategoryName } from '@/lib/categoryUtils';
import { CustomButton } from '@/components/ui/custom-button';
import { useBlogPost, useBlogPostsByCategory } from '@/hooks/useBlogPosts';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const { data: blog, isLoading } = useBlogPost(slug);
  const { data: relatedPosts = [] } = useBlogPostsByCategory(blog?.category || null);

  // Tính thời gian đọc từ content
  const getReadTime = (content: string | null) => {
    if (!content) return 5;
    return Math.ceil(content.length / 1000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Bài viết không tồn tại</h1>
          <Link to="/blog">
            <CustomButton variant="primary">Quay lại Blog</CustomButton>
          </Link>
        </div>
      </div>
    );
  }

  // Lọc bài viết liên quan (loại trừ bài hiện tại)
  const filteredRelatedPosts = relatedPosts.filter(post => post.id !== blog.id).slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src={blog.image || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop'}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-tea-900/90 via-tea-900/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pb-12 pt-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-tea-200 mb-6">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Trang chủ</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-primary-foreground transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-foreground truncate max-w-[200px]">{blog.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {blog.category && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {getCategoryName(blog.category)}
              </span>
            )}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2">
                {blog.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-tea-800/60 text-tea-100 text-xs backdrop-blur-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-decoration font-semibold text-primary-foreground leading-tight mb-6 max-w-4xl">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-tea-200">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDate(blog.publish_date || blog.created_at)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{getReadTime(blog.content)} phút đọc</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {/* Excerpt */}
              <p className="text-xl font-decoration leading-relaxed mb-8 font-medium">
                {blog.excerpt}
              </p>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80"
                dangerouslySetInnerHTML={{ __html: blog.content || '' }}
              />

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-semibold text-foreground flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Chia sẻ bài viết:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-3 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-3 rounded-full bg-muted text-foreground hover:bg-accent transition-colors"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-8">
                <button
                  onClick={() => navigate('/blog')}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Quay lại danh sách bài viết
                </button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Author Card */}
                <div className="bg-card rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-4">Tác giả</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{blog.author}</p>
                      <p className="text-sm text-muted-foreground">Chuyên gia trà xanh</p>
                    </div>
                  </div>
                </div>

                {/* Related Posts */}
                {filteredRelatedPosts.length > 0 && (
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Bài viết liên quan</h3>
                    <div className="space-y-4">
                      {filteredRelatedPosts.map((post) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug || post.id}`}
                          className="flex gap-4 group"
                        >
                          <img
                            src={post.image || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop'}
                            alt={post.title}
                            className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {post.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {getReadTime(post.content)} phút đọc
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="bg-card rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-sm text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      {filteredRelatedPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-accent">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              Có thể bạn quan tâm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredRelatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug || post.id}`}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop'}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    {post.category && (
                      <span className="inline-block px-3 py-1 rounded-full bg-accent text-xs font-medium text-primary mb-3">
                        {getCategoryName(post.category)}
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {formatDate(post.publish_date || post.created_at)} · {getReadTime(post.content)} phút đọc
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetailPage;
