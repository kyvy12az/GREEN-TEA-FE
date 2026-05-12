import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { CustomButton } from '@/components/ui/custom-button';

export const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Đặt hàng thành công!
        </h1>
        <p className="text-muted-foreground mb-6">
          Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ xác nhận đơn hàng trong thời gian sớm nhất.
        </p>
        <Link to="/">
          <CustomButton variant="primary">
            Về trang chủ
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};
