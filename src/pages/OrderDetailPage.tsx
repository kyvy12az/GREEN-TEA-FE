import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { formatOrderDate, formatCurrency, getPaymentMethodLabel } from '@/lib/orderUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, User, MapPin, Package, CreditCard, FileText, Loader2 } from 'lucide-react';

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (!orderId) return;

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items (
              id,
              product_name,
              product_image,
              quantity,
              unit_price,
              total_price
            )
          `)
          .eq('id', orderId)
          .single();

        if (error) throw error;
        setOrder(data);
      } catch (error) {
        console.error('Error fetching order detail:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Đang tải chi tiết đơn hàng...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="text-center py-16">
          <Package className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Không tìm thấy đơn hàng</h2>
          <p className="text-muted-foreground mb-6">
            Đơn hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Button asChild>
            <Link to="/orders">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại đơn hàng
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/orders">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại đơn hàng của tôi
        </Link>
      </Button>

      {/* Order Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground uppercase">{order.order_number}</h1>
          <p className="text-muted-foreground">
            Đặt ngày {formatOrderDate(order.created_at)}
          </p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm text-muted-foreground">Trạng thái:</span>
           <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-primary" />
                Sản phẩm ({order.order_items?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {order.order_items?.map((item: any, index: number) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-20 h-20 object-cover rounded-md flex-shrink-0 border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{item.product_name}</h4>
                      <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(item.unit_price)} × {item.quantity}
                        </span>
                        <span className="font-semibold text-foreground">
                          {formatCurrency(item.total_price || (item.unit_price * item.quantity))}
                        </span>
                      </div>
                    </div>
                  </div>
                  {index < order.order_items.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg">Tóm tắt đơn hàng</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(order.shipping_fee)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Customer Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-primary" />
                Thông tin nhận hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Tên khách hàng</p>
                <p className="font-medium text-foreground">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Số điện thoại</p>
                <p className="text-foreground">{order.customer_phone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Email</p>
                <p className="text-foreground">{order.customer_email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5 text-primary" />
                Địa chỉ giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-foreground font-medium">{order.shipping_address}</p>
              <p className="text-muted-foreground mt-1">{order.shipping_city}</p>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CreditCard className="h-5 w-5 text-primary" />
                Thanh toán
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-foreground font-medium">{getPaymentMethodLabel(order.payment_method)}</p>
              <p className={`text-xs mt-2 ${order.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                Trạng thái: {order.payment_status === 'paid' ? 'Đã thanh toán' : 'Chờ thanh toán'}
              </p>
            </CardContent>
          </Card>

          {/* Note */}
          {order.note && (
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Ghi chú
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-foreground text-sm italic">"{order.note}"</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
