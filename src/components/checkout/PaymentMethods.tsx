import { Truck, CreditCard, Wallet } from 'lucide-react';

const paymentMethodsList = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: Truck },
  { id: 'bank', name: 'Chuyển khoản ngân hàng', icon: CreditCard },
  { id: 'momo', name: 'Ví MoMo', icon: Wallet },
  { id: 'zalopay', name: 'Ví ZaloPay', icon: Wallet },
];

interface PaymentMethodsProps {
  paymentMethod: string;
  handlePaymentMethodChange: (methodId: string) => void;
}

export const PaymentMethods = ({ paymentMethod, handlePaymentMethodChange }: PaymentMethodsProps) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Phương thức thanh toán
      </h2>

      <div className="space-y-3">
        {paymentMethodsList.map((method) => (
          <label
            key={method.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={() => handlePaymentMethodChange(method.id)}
              className="w-5 h-5 text-primary accent-primary"
            />
            <method.icon className="w-6 h-6 text-primary" />
            <span className="font-medium">{method.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
