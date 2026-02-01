import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';

const AuthCallback = () => {
    const navigate = useNavigate();
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Lấy session từ URL fragments
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                if (data.session) {
                    // Khởi tạo lại auth state
                    await initializeAuth();

                    // Xóa pending email nếu có
                    localStorage.removeItem('pendingVerificationEmail');

                    // Kiểm tra xem đây có phải là email verification callback không
                    const urlParams = new URLSearchParams(window.location.search);
                    const type = urlParams.get('type');

                    if (type === 'signup' || type === 'email') {
                        toast.success('Email đã được xác thực thành công!', {
                            description: 'Chào mừng bạn đến với VietNihon Tea',
                            duration: 4000,
                        });
                    } else {
                        toast.success('Đăng nhập thành công!');
                    }

                    navigate('/', { replace: true });
                } else {
                    toast.error('Đăng nhập thất bại');
                    navigate('/login', { replace: true });
                }
            } catch (error) {
                console.error('Auth callback error:', error);
                toast.error('Có lỗi xảy ra khi đăng nhập');
                navigate('/login', { replace: true });
            }
        };

        handleCallback();
    }, [navigate, initializeAuth]);

    return (
        <div className="bg-background flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <img src="/logo2.png" alt="Logo" className="w-10 h-10" />
                    </div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <span className="mt-4 text-muted-foreground">
                    Đang xử lý đăng nhập...
                </span>
            </div>
        </div>
    );
};

export default AuthCallback;
