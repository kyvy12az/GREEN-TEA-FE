import { useCheckout } from '@/hooks/useCheckout';
import { ShippingForm } from '@/components/checkout/ShippingForm';
import { PaymentMethods } from '@/components/checkout/PaymentMethods';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { CheckoutSuccess } from '@/components/checkout/CheckoutSuccess';

const CheckoutPage = () => {
  const {
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
  } = useCheckout();

  if (isSuccess) {
    return <CheckoutSuccess />;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Thanh toán</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ShippingForm 
              formData={formData} 
              handleInputChange={handleInputChange} 
            />
            <PaymentMethods 
              paymentMethod={paymentMethod} 
              handlePaymentMethodChange={handlePaymentMethodChange} 
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              items={items}
              totalPrice={totalPrice}
              shippingFee={shippingFee}
              finalTotal={finalTotal}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
