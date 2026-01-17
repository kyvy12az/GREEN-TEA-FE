import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, X, Save, Send } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import { useAuthStore } from '@/store/authStore';
import { usePostStore } from '@/store/postStore';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const categories = [
  'Kiến thức trà',
  'Sức khỏe',
  'Pha chế',
  'Văn hóa trà',
  'Tin tức',
  'Khác',
];

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef<any>(null);
  
  const { user, isAuthenticated } = useAuthStore();
  const { addPost, updatePost, getPostById } = usePostStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: '',
    coverImage: '',
    tags: '',
    content: '',
  });

  const isEditing = !!id;
  const existingPost = id ? getPostById(id) : null;

  useEffect(() => {
    if (isEditing && existingPost) {
      setFormData({
        title: existingPost.title,
        excerpt: existingPost.excerpt,
        category: existingPost.category,
        coverImage: existingPost.coverImage || '',
        tags: existingPost.tags.join(', '),
        content: existingPost.content,
      });
    }
  }, [isEditing, existingPost]);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (isEditing && existingPost && existingPost.authorId !== user.id) {
    return <Navigate to="/my-posts" replace />;
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title.trim()) {
      toast.error('Vui lòng nhập tiêu đề bài viết!');
      return;
    }

    if (!formData.category) {
      toast.error('Vui lòng chọn danh mục!');
      return;
    }

    const content = editorRef.current?.getContent() || formData.content;
    
    if (!content.trim() && status === 'published') {
      toast.error('Vui lòng nhập nội dung bài viết!');
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const postData = {
        title: formData.title,
        excerpt: formData.excerpt || formData.title,
        category: formData.category,
        coverImage: formData.coverImage,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        content,
        status,
        authorId: user.id,
        authorName: user.name,
      };

      if (isEditing && existingPost) {
        updatePost(existingPost.id, postData);
        toast.success(status === 'published' ? 'Cập nhật và đăng bài thành công!' : 'Đã lưu bản nháp!');
      } else {
        addPost(postData);
        toast.success(status === 'published' ? 'Đăng bài thành công!' : 'Đã lưu bản nháp!');
      }

      navigate('/my-posts');
    } catch {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-accent transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {isEditing ? 'Chỉnh sửa bài viết' : 'Viết bài mới'}
            </h1>
            <p className="text-muted-foreground text-sm">
              Chia sẻ kiến thức và trải nghiệm của bạn
            </p>
          </div>
        </div>

        {/* Form - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Post Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Category */}
            <div className="bg-card rounded-2xl p-6 shadow-sm space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tiêu đề <span className="text-destructive">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Nhập tiêu đề bài viết..."
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Danh mục <span className="text-destructive">*</span>
                </label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Tags
                </label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="trà xanh, sức khỏe, matcha..."
                />
                <p className="text-xs text-muted-foreground">Phân cách bằng dấu phẩy</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Mô tả ngắn
                </label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Tóm tắt nội dung bài viết..."
                  rows={4}
                />
              </div>
            </div>

            {/* Cover Image */}
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Ảnh bìa
              </label>
              {formData.coverImage ? (
                <div className="relative">
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, coverImage: '' })}
                    className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground text-sm mb-2">
                      Nhập URL ảnh bìa bên dưới
                    </p>
                  </div>
                  <Input
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                onClick={() => handleSubmit('published')}
                disabled={isLoading}
                className="gap-2 w-full"
              >
                <Send className="w-4 h-4" />
                {isLoading ? 'Đang xử lý...' : 'Đăng bài'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleSubmit('draft')}
                disabled={isLoading}
                className="gap-2 w-full"
              >
                <Save className="w-4 h-4" />
                Lưu nháp
              </Button>
            </div>
          </div>

          {/* Right Column - Editor */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              <label className="text-sm font-medium text-foreground mb-3 block">
                Nội dung bài viết <span className="text-destructive">*</span>
              </label>
              <Editor
                apiKey="jk2hgaik49pkplqmwcgod48z5rk78vicqlennbaiqm8jeonu"
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={formData.content}
                init={{
                  height: 600,
                  menubar: true,
                  plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                    'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                    'insertdatetime', 'media', 'table', 'help', 'wordcount'
                  ],
                  toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                  content_style: 'body { font-family: Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, sans-serif; font-size: 16px; line-height: 1.6; }',
                  branding: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
