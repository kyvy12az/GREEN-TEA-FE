import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { formatOrderDate, formatCurrency } from '@/lib/orderUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { Package, Eye, ShoppingBag, Loader2 } from 'lucide-react';

const OrderHistoryPage = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
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
              unit_price
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Đang tải lịch sử đơn hàng...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Đơn hàng của tôi</h1>
        <p className="text-muted-foreground mt-1">Theo dõi và quản lý đơn hàng của bạn</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Chưa có đơn hàng nào</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa đặt đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!
          </p>
          <Button asChild>
            <Link to="/products">Mua sắm ngay</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground uppercase">{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">
                        Đặt ngày {formatOrderDate(order.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground mr-1">Trạng thái:</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="p-4">
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {order.order_items.slice(0, 3).map((item: any) => (
                      <div key={item.id} className="flex gap-3 min-w-[200px]">
                        <img
                          src={item.product_image}
                          alt={item.product_name}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0 border border-border"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {item.product_name}
                          </p>
                          <p className="text-xs text-muted-foreground">Số lượng: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary">{formatCurrency(item.unit_price)}</p>
                        </div>
                      </div>
                    ))}
                    {order.order_items.length > 3 && (
                      <div className="flex items-center min-w-[80px]">
                        <span className="text-sm text-muted-foreground bg-secondary/30 px-3 py-1 rounded-full">
                          +{order.order_items.length - 3} khác
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-t bg-muted/30">
                  <div className="mb-3 sm:mb-0">
                    <span className="text-muted-foreground text-sm">Tổng thanh toán: </span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/orders/${order.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      Xem chi tiết
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
