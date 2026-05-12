import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const SHIPPING_THRESHOLD = 500000;
const SHIPPING_FEE = 30000;

export const useCheckout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  
  const totalPrice = getTotalPrice();
  const shippingFee = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const finalTotal = totalPrice + shippingFee;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    note: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate('/cart');
    }
  }, [items.length, isSuccess, navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (methodId: string) => {
    setPaymentMethod(methodId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          user_id: user?.id || null,
          customer_name: formData.fullName,
          customer_phone: formData.phone,
          customer_email: formData.email,
          shipping_address: formData.address,
          shipping_city: formData.city,
          payment_method: paymentMethod,
          subtotal: totalPrice,
          shipping_fee: shippingFee,
          total: finalTotal,
          note: formData.note,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        variant: item.variant,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      if (paymentMethod === 'momo' || paymentMethod === 'zalopay') {
        toast.info(`Đang chuyển hướng sang ${paymentMethod === 'momo' ? 'MoMo' : 'ZaloPay'}...`);
        
        const baseUrl = window.location.origin;
        const { data: payData, error: payError } = await supabase.functions.invoke('create-payment', {
          body: {
            orderId: order.id,
            method: paymentMethod,
            amount: finalTotal,
            orderNumber,
            momoReturnUrl: `${baseUrl}/payment/momo-return`,
            zalopayReturnUrl: `${baseUrl}/payment/zalopay-return`,
          }
        });

        if (payError) {
          if (payError.context && payError.context.status === 400) {
            try {
              const errorBody = await payError.context.json();
              if (errorBody && errorBody.error) {
                throw new Error(errorBody.error);
              }
            } catch (e) {
            }
          }
          throw payError;
        }

        if (payData && payData.payUrl) {
          window.location.href = payData.payUrl;
          return;
        } else {
          throw new Error('Không nhận được URL thanh toán từ server');
        }
      }

      clearCart();
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Lỗi đặt hàng:', error);
      toast.error(error.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items,
    totalPrice,
    shippingFee,
    finalTotal,
    formData,
    paymentMethod,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handlePaymentMethodChange,
    handleSubmit
  };
};
