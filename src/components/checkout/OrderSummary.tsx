import { Link } from 'react-router-dom';
import { CustomButton } from '@/components/ui/custom-button';
import { formatPrice } from '@/lib/utils';

interface OrderSummaryProps {
  items: any[];
  totalPrice: number;
  shippingFee: number;
  finalTotal: number;
  isSubmitting: boolean;
}

export const OrderSummary = ({ items, totalPrice, shippingFee, finalTotal, isSubmitting }: OrderSummaryProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm sticky top-24">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Đơn hàng của bạn
      </h2>

      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.variant}`}
            className="flex gap-3"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-foreground line-clamp-1">
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {item.variant} x {item.quantity}
              </p>
              <p className="text-sm font-medium text-primary">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t border-border pt-4 mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Tạm tính</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Phí vận chuyển</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-primary">Miễn phí</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>
        <div className="border-t border-border pt-3">
          <div className="flex justify-between text-lg font-bold text-foreground">
            <span>Tổng cộng</span>
            <span className="text-primary">{formatPrice(finalTotal)}</span>
          </div>
        </div>
      </div>

      <CustomButton
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
      >
        Đặt hàng
      </CustomButton>

      <Link
        to="/cart"
        className="block text-center text-primary hover:underline mt-4 text-sm"
      >
        Quay lại giỏ hàng
      </Link>
    </div>
  );
};
