import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Eye, EyeOff, Leaf, Mail, Lock, User, Phone } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import teaImage from '@/assets/green-tea-leaves.jpg';

const RegisterPage = () => {
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Vui lòng nhập họ tên';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Họ tên phải có ít nhất 2 ký tự';
        }

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.phone) {
            newErrors.phone = 'Vui lòng nhập số điện thoại';
        } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(formData.phone)) {
            newErrors.phone = 'Số điện thoại không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = 'Bạn cần đồng ý với điều khoản sử dụng';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        const success = await register({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        });
        setIsLoading(false);
        if (success) {
            toast.success('Đăng ký thành công! Chào mừng bạn đến với Trà Xanh Việt!');
            navigate('/');
        } else {
            toast.error('Email này đã được sử dụng. Vui lòng thử email khác!');
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-20 bg-background overflow-y-auto">
                <div className="w-full max-w-md mx-auto">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-semibold font-serif text-foreground">
                            Trà Xanh <span className="text-primary italic">Việt</span>
                        </span>

                    </Link>

                    <h1 className="md:text-4xl text-3xl font-serif font-semibold text-foreground mb-2">
                        Tạo tài khoản mới
                    </h1>
                    <p className="text-muted-foreground italic font-serif text-xl mb-8">
                        Đăng ký để trải nghiệm mua sắm tốt hơn và nhận nhiều ưu đãi hấp dẫn.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Họ và tên
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${errors.name
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="Nguyễn Văn A"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${errors.email
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="example@email.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-2 text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                                Số điện thoại
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full pl-12 pr-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${errors.phone
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="0912345678"
                                />
                            </div>
                            {errors.phone && (
                                <p className="mt-2 text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                                Mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${errors.password
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                                Xác nhận mật khẩu
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full pl-12 pr-12 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${errors.confirmPassword
                                        ? 'border-destructive focus:ring-destructive/20'
                                        : 'border-input focus:ring-primary/20 focus:border-primary'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-destructive">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.agreeTerms}
                                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                                    className="w-4 h-4 mt-0.5 rounded border-input text-primary focus:ring-primary/20"
                                />
                                <span className="text-sm text-muted-foreground">
                                    Tôi đồng ý với{' '}
                                    <Link to="/terms" className="text-primary hover:underline">
                                        Điều khoản sử dụng
                                    </Link>{' '}
                                    và{' '}
                                    <Link to="/privacy" className="text-primary hover:underline">
                                        Chính sách bảo mật
                                    </Link>
                                </span>
                            </label>
                            {errors.agreeTerms && (
                                <p className="mt-2 text-sm text-destructive">{errors.agreeTerms}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <CustomButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Đăng ký
                        </CustomButton>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground italic font-serif text-lg">
                                Hoặc đăng ký với
                            </span>
                        </div>
                    </div>

                    {/* Social Register */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors">
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span className="font-medium text-foreground">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors">
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="font-medium text-foreground">Facebook</span>
                        </button>
                    </div>

                    {/* Login Link */}
                    <p className="mt-8 text-center text-muted-foreground font-serif text-xl">
                        Đã có tài khoản?{' '}
                        <Link
                            to="/login"
                            className="text-primary hover:text-primary/80 italic font-semibold transition-colors"
                        >
                            Đăng nhập
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block lg:w-1/2 xl:w-[55%] relative">
                <img
                    src={teaImage}
                    alt="Green tea leaves"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-tea-900/70 via-tea-800/50 to-tea-900/70" />
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center max-w-lg">
                        <Leaf className="w-16 h-16 text-tea-300 mx-auto mb-6" />
                        <h2 className="text-3xl xl:text-5xl italic font-serif font-semibold text-primary-foreground mb-4">
                            Gia nhập cộng đồng yêu trà
                        </h2>
                        <p className="text-xl font-serif italic text-tea-200 leading-relaxed">
                            Đăng ký ngay để nhận ưu đãi giảm 10% cho đơn hàng đầu tiên và cập nhật tin tức mới nhất về trà xanh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
