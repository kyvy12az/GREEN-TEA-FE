import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isResending, setIsResending] = useState(false);
    const [email, setEmail] = useState('');
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        // Lấy email từ state hoặc localStorage
        const emailFromState = (location.state as { email?: string })?.email;
        const emailFromStorage = localStorage.getItem('pendingVerificationEmail');
        
        if (emailFromState) {
            setEmail(emailFromState);
            localStorage.setItem('pendingVerificationEmail', emailFromState);
        } else if (emailFromStorage) {
            setEmail(emailFromStorage);
        } else {
            // Nếu không có email, redirect về register
            navigate('/register');
        }
    }, [location, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResendEmail = async () => {
        if (!email || countdown > 0) return;

        setIsResending(true);
        
        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: email,
            });

            if (error) throw error;

            toast.success('Email xác thực đã được gửi lại!', {
                description: `Vui lòng kiểm tra hộp thư ${email}`,
                duration: 5000,
            });
            setCountdown(60); // 60 giây countdown
        } catch (error: any) {
            console.error('Resend error:', error);
            toast.error('Không thể gửi lại email', {
                description: 'Vui lòng thử lại sau.',
            });
        } finally {
            setIsResending(false);
        }
    };

    const handleChangeEmail = () => {
        localStorage.removeItem('pendingVerificationEmail');
        navigate('/register');
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 md:p-10">
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="mx-auto w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6"
                    >
                        <Mail className="w-10 h-10 text-emerald-600" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-3xl font-serif font-semibold text-center text-foreground mb-3">
                        Xác thực email
                    </h1>

                    {/* Description */}
                    <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                        Chúng tôi đã gửi email xác thực đến
                    </p>

                    {/* Email Display */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                        <p className="text-center font-medium text-emerald-800 break-all">
                            {email}
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-2">Vui lòng làm theo các bước sau:</p>
                                <ol className="list-decimal list-inside space-y-1.5 text-blue-700">
                                    <li>Kiểm tra hộp thư email của bạn</li>
                                    <li>Tìm email từ VietNihon Tea</li>
                                    <li>Click vào link xác thực trong email</li>
                                    <li>Bạn sẽ được chuyển về trang đăng nhập</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    {/* Note */}
                    <p className="text-sm text-muted-foreground text-center mb-6 italic">
                        💡 Không tìm thấy email? Kiểm tra trong thư mục spam hoặc rác
                    </p>

                    {/* Resend Button */}
                    <CustomButton
                        variant="outline"
                        size="lg"
                        className="w-full mb-4"
                        onClick={handleResendEmail}
                        isLoading={isResending}
                        disabled={countdown > 0}
                    >
                        {countdown > 0 ? (
                            <>Gửi lại sau {countdown}s</>
                        ) : (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Gửi lại email xác thực
                            </>
                        )}
                    </CustomButton>

                    {/* Change Email */}
                    <button
                        onClick={handleChangeEmail}
                        className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors mb-6"
                    >
                        Sử dụng email khác?
                    </button>

                    <div className="border-t border-border pt-6">
                        <Link
                            to="/login"
                            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Quay lại đăng nhập</span>
                        </Link>
                    </div>
                </div>

                {/* Additional Help */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Cần hỗ trợ?{' '}
                        <Link to="/contact" className="text-primary hover:text-primary/80 font-medium">
                            Liên hệ với chúng tôi
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;
