import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Home, ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { supabase } from "@/lib/supabase";

export default function MomoReturnPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [orderUpdated, setOrderUpdated] = useState(false);

  const resultCode = searchParams.get("resultCode");
  const orderId = searchParams.get("orderId");  // MoMo orderId = MM_xxx
  const amount = searchParams.get("amount");
  const message = searchParams.get("message");

  const clearCart = useCartStore((state) => state.clearCart);
  const isSuccess = resultCode === "0";

  useEffect(() => {
    const updateOrderStatus = async () => {
      if (isSuccess && orderId && !orderUpdated) {
        try {
          // Tìm giao dịch theo provider_transaction_id (MoMo orderId)
          const { data: tx } = await supabase
            .from('payment_transactions')
            .select('order_id')
            .eq('provider_transaction_id', orderId)
            .maybeSingle();

          if (tx?.order_id) {
            // Cập nhật trạng thái giao dịch
            await supabase
              .from('payment_transactions')
              .update({ status: 'success', updated_at: new Date().toISOString() })
              .eq('provider_transaction_id', orderId);

            // Cập nhật trạng thái đơn hàng
            await supabase
              .from('orders')
              .update({ status: 'processing', updated_at: new Date().toISOString() })
              .eq('id', tx.order_id);
          }
          setOrderUpdated(true);
        } catch (err) {
          console.warn('Could not update order status:', err);
        }
      }
    };

    if (isSuccess) {
      clearCart();
      updateOrderStatus();
    }

    const timer = setInterval(() => setCountdown((p) => p - 1), 1000);
    const redirect = setTimeout(() => navigate(isSuccess ? "/" : "/cart"), 10000);
    return () => { clearInterval(timer); clearTimeout(redirect); };
  }, [isSuccess, clearCart, navigate, orderId, orderUpdated]);

  const formatCurrency = (value: string | null) => {
    if (!value) return "0đ";
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
      >
        <div className={`p-8 flex flex-col items-center ${isSuccess ? "bg-green-50" : "bg-red-50"}`}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className={`rounded-full p-3 mb-4 ${isSuccess ? "bg-green-100" : "bg-red-100"}`}
          >
            {isSuccess
              ? <CheckCircle className="w-12 h-12 text-green-600" />
              : <XCircle className="w-12 h-12 text-red-600" />}
          </motion.div>
          <h1 className={`text-2xl font-bold text-center mb-2 ${isSuccess ? "text-green-700" : "text-red-700"}`}>
            {isSuccess ? "Thanh toán MoMo thành công!" : "Thanh toán MoMo thất bại"}
          </h1>
          <p className="text-gray-500 text-center text-sm px-4">
            {isSuccess
              ? "Cảm ơn bạn đã mua hàng. Đơn hàng đang được xử lý."
              : "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."}
          </p>
        </div>

        <div className="p-8 space-y-4">
          <div className="space-y-3 text-sm">
            {orderId && (
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <span className="text-gray-500">Mã giao dịch</span>
                <span className="font-mono font-medium text-gray-900 text-xs">{orderId}</span>
              </div>
            )}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-gray-500">Phương thức</span>
              <span className="font-medium text-pink-600">Ví MoMo</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-900 font-semibold">Tổng thanh toán</span>
              <span className={`text-xl font-bold ${isSuccess ? "text-green-600" : "text-gray-900"}`}>
                {formatCurrency(amount)}
              </span>
            </div>
          </div>

          {!isSuccess && message && (
            <div className="bg-red-50 p-3 rounded-lg text-xs text-red-600 border border-red-100">
              Lý do: {message}
            </div>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate(isSuccess ? "/products" : "/cart")}
              className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors ${
                isSuccess
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              {isSuccess ? <ShoppingCart size={18} /> : <ArrowRight size={18} />}
              {isSuccess ? "Tiếp tục mua sắm" : "Thử lại thanh toán"}
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-100 font-medium transition-colors"
            >
              <Home size={18} /> Về trang chủ
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Tự động chuyển hướng sau <span className="font-bold text-gray-600">{countdown}s</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
