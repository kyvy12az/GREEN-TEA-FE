import { Link } from 'react-router-dom';
import { Plus, FileText, Edit, Trash2, Eye, Clock, CheckCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { usePostStore } from '@/store/postStore';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const MyPostsPage = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { getPostsByAuthor, deletePost } = usePostStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userPosts = getPostsByAuthor(user.id);

  const handleDeletePost = (postId: string) => {
    deletePost(postId);
    toast.success('Đã xóa bài viết thành công!');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Bài viết của tôi</h1>
            <p className="text-muted-foreground mt-1">
              Quản lý và theo dõi các bài viết bạn đã tạo
            </p>
          </div>
          <Link to="/create-post">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Viết bài mới
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        {userPosts.length === 0 ? (
          <div className="bg-card rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Chưa có bài viết nào
            </h3>
            <p className="text-muted-foreground mb-6">
              Bạn chưa viết bài nào. Hãy bắt đầu chia sẻ kiến thức của bạn!
            </p>
            <Link to="/create-post">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Viết bài đầu tiên
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-card rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Thumbnail */}
                  {post.coverImage && (
                    <div className="w-full md:w-48 h-32 flex-shrink-0">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant={post.status === 'published' ? 'default' : 'secondary'}
                            className="gap-1"
                          >
                            {post.status === 'published' ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Đã đăng
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                Bản nháp
                              </>
                            )}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2 truncate">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Tạo: {formatDate(post.createdAt)}</span>
                        {post.updatedAt !== post.createdAt && (
                          <span>Cập nhật: {formatDate(post.updatedAt)}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {post.status === 'published' && (
                          <Link to={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">Xem</span>
                            </Button>
                          </Link>
                        )}
                        <Link to={`/edit-post/${post.id}`}>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Edit className="w-4 h-4" />
                            <span className="hidden sm:inline">Sửa</span>
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                              <span className="hidden sm:inline">Xóa</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xác nhận xóa bài viết?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Hành động này không thể hoàn tác. Bài viết sẽ bị xóa vĩnh viễn.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsPage;
