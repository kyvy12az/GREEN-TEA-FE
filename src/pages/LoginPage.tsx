import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { Eye, EyeOff, Leaf, Mail, Lock } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import teaImage from '@/assets/hero-tea-plantation.jpg';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, loginWithOAuth } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        
        try {
            const success = await login(formData.email, formData.password);
            setIsLoading(false);

            if (success) {
                toast.success('Đăng nhập thành công!');
                const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
                navigate(from);
            } else {
                toast.error('Email hoặc mật khẩu không chính xác!');
            }
        } catch (error: any) {
            setIsLoading(false);
            if (error.message === 'EMAIL_NOT_CONFIRMED') {
                toast.error('Email chưa được xác thực!', {
                    description: 'Bạn cần xác thực email trước khi đăng nhập.',
                    duration: 3000,
                });
                // Chuyển đến trang verify-email
                setTimeout(() => {
                    navigate('/verify-email', { 
                        state: { email: formData.email } 
                    });
                }, 1500);
            } else {
                toast.error('Email hoặc mật khẩu không chính xác!');
            }
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
        try {
            await loginWithOAuth(provider);
            // Supabase sẽ redirect đến OAuth provider
        } catch (error) {
            toast.error(`Không thể đăng nhập bằng ${provider === 'google' ? 'Google' : 'Facebook'}`);
        }
    };

    return (
        <div className="min-h-screen flex">
            <div className="flex-1 flex flex-col justify-center px-6 py-6 lg:px-12 xl:px-20 bg-background">
                <div className="w-full max-w-md mx-auto">
                    <Link to="/" className="flex items-center gap-3.5 mb-10 group">
                        <motion.div
                            whileHover={{ scale: 1.08, rotate: 3 }}
                            className="relative w-12 h-12"
                        >
                            <div className="absolute inset-0 rounded-full blur-xl bg-emerald-500/20 group-hover:bg-emerald-400/35 transition-all duration-500" />
                            <div className="relative w-full h-full rounded-full border border-emerald-300/40 bg-emerald-50/10 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-md transition-all group-hover:shadow-emerald-500/20">
                                <img
                                    src="/logo2.png"
                                    alt="VietNihon Tea"
                                    className="w-8 h-8 object-contain drop-shadow-md transition-all group-hover:scale-110"
                                />
                            </div>
                        </motion.div>

                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-serif font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-emerald-700">
                                Viet<span className="text-emerald-600 italic">Nihon</span> Tea
                            </span>
                            <span className="text-[10px] tracking-widest uppercase text-emerald-500/70 mt-0.5">
                                Pure Harmony
                            </span>
                        </div>
                    </Link>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-foreground mb-3 leading-tight"
                    >
                        Chào mừng trở lại
                    </motion.h1>

                    <p className="text-muted-foreground mb-10 text-base md:text-lg italic font-serif leading-relaxed max-w-md">
                        Đăng nhập để tiếp tục khám phá tinh hoa trà xanh Việt – Nhật và theo dõi hành trình của bạn.
                    </p>


                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                                    className="w-4 h-4 rounded border-input text-primary focus:ring-primary/20"
                                />
                                <span className="text-sm text-muted-foreground">Ghi nhớ đăng nhập</span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <CustomButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Đăng nhập
                        </CustomButton>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-background text-muted-foreground font-serif italic text-lg">
                                Hoặc đăng nhập với
                            </span>

                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button 
                            type="button"
                            onClick={() => handleOAuthLogin('google')}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors"
                        >
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
                        <button 
                            type="button"
                            onClick={() => handleOAuthLogin('facebook')}
                            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-input bg-background hover:bg-accent transition-colors"
                        >
                            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="font-medium text-foreground">Facebook</span>
                        </button>
                    </div>

                    <p className="mt-8 text-center text-muted-foreground font-serif text-xl">
                        Chưa có tài khoản?{' '}
                        <Link
                            to="/register"
                            className="text-primary italic font-semibold hover:text-primary/80 transition-colors"
                        >
                            Đăng ký ngay
                        </Link>
                    </p>

                </div>
            </div>

            <div className="hidden lg:block lg:w-1/2 xl:w-[55%] relative overflow-hidden">
                <img
                    src={teaImage}
                    alt="VietNihon Tea Plantation"
                    className="absolute inset-0 w-full h-full object-cover scale-105 transition-transform duration-[12000ms] ease-in-out"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/75 via-emerald-900/55 to-emerald-950/75" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center p-8 xl:p-12 text-center"
                >
                    <div className="max-w-xl space-y-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative mx-auto w-24 h-24"
                        >
                            <div className="absolute inset-0 rounded-full blur-2xl bg-emerald-400/30" />
                            <Leaf className="w-full h-full text-emerald-300/90 drop-shadow-2xl" />
                        </motion.div>

                        {/* Heading - Lớn hơn, thanh lịch hơn */}
                        <h2 className="md:text-5xl text-4xl font-serif font-semibold italic text-white leading-tight drop-shadow-2xl">
                            Hương vị tinh hoa Việt – Nhật
                        </h2>

                        {/* Description - Ngắn gọn, thơ mộng, font light */}
                        <p className="md:text-xl text-lg text-emerald-100/90 font-light italic leading-relaxed drop-shadow-md max-w-2xl mx-auto">
                            Sự hòa quyện hoàn hảo giữa trà xanh tươi tốt từ đồi Việt Nam và sự thanh tịnh tinh khiết của matcha Nhật Bản.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginPage;
