import { useState } from 'react';
import { User, Mail, Phone, MapPin, FileText, Calendar, Camera } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { usePostStore } from '@/store/postStore';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const { getPostsByAuthor } = usePostStore();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    bio: user?.bio || '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userPosts = getPostsByAuthor(user.id);
  const publishedPosts = userPosts.filter(p => p.status === 'published').length;
  const memberSince = new Date(user.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      bio: formData.bio,
    });
    
    setIsLoading(false);
    toast.success('Cập nhật thông tin thành công!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    setIsLoading(false);
    toast.success('Đổi mật khẩu thành công!');
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
              {/* Avatar */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-primary flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-foreground">
                      {getInitials(user.name)}
                    </span>
                  </div>
                )}
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md hover:bg-accent/80 transition-colors">
                  <Camera className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* User Info */}
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <FileText className="w-4 h-4" />
                    <span className="font-bold">{publishedPosts}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Bài viết</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-primary mb-1">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-muted-foreground">{memberSince}</p>
                </div>
              </div>

              {/* Bio */}
              {user.bio && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground italic">"{user.bio}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
                  <TabsTrigger value="password">Đổi mật khẩu</TabsTrigger>
                  <TabsTrigger value="orders">Lịch sử đơn hàng</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Họ và tên
                        </label>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Nhập họ và tên"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </label>
                        <Input
                          value={user.email}
                          disabled
                          className="bg-muted"
                        />
                        <p className="text-xs text-muted-foreground">Email không thể thay đổi</p>
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Số điện thoại
                        </label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="Nhập số điện thoại"
                        />
                      </div>

                      {/* Address */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Địa chỉ
                        </label>
                        <Input
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="Nhập địa chỉ"
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Giới thiệu bản thân
                      </label>
                      <Textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        placeholder="Viết vài dòng giới thiệu về bạn..."
                        rows={4}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                      {isLoading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Password Tab */}
                <TabsContent value="password">
                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Mật khẩu hiện tại
                      </label>
                      <Input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        placeholder="Nhập mật khẩu hiện tại"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Mật khẩu mới
                      </label>
                      <Input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Xác nhận mật khẩu mới
                      </label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        placeholder="Nhập lại mật khẩu mới"
                      />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                    </Button>
                  </form>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Chưa có đơn hàng nào
                    </h3>
                    <p className="text-muted-foreground">
                      Bạn chưa thực hiện đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
