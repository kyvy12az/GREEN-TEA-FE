import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockOrders } from '@/data/orders';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { formatOrderDate, formatCurrency } from '@/lib/orderUtils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { Package, Eye, ShoppingBag } from 'lucide-react';

const OrderHistoryPage = () => {
  const { user } = useAuthStore();

  // In real app, filter by user.id - for demo, show first 4 orders
  const userOrders = useMemo(() => {
    return mockOrders.slice(0, 4);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Đơn hàng của tôi</h1>
        <p className="text-muted-foreground mt-1">Theo dõi và quản lý đơn hàng của bạn</p>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Chưa có đơn hàng nào</h2>
          <p className="text-muted-foreground mb-6">
            Bạn chưa đặt đơn hàng nào. Hãy khám phá các sản phẩm của chúng tôi!
          </p>
          <Button asChild>
            <a href="/products">Mua sắm ngay</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-3 mb-2 sm:mb-0">
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        Đặt ngày {formatOrderDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>

                {/* Order Items Preview */}
                <div className="p-4">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex gap-3 min-w-[200px]">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {item.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">{item.variant}</p>
                          <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center min-w-[80px]">
                        <span className="text-sm text-muted-foreground">
                          +{order.items.length - 3} sản phẩm
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-t bg-muted/30">
                  <div className="mb-3 sm:mb-0">
                    <span className="text-muted-foreground text-sm">Tổng tiền: </span>
                    <span className="text-lg font-bold text-primary">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                  <Button variant="outline" asChild>
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
