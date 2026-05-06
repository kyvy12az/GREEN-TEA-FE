export interface OrderItem {
  id: string;
  productName: string;
  productImage: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  paymentMethod: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  items: OrderItem[];
  createdAt: string;
  note?: string;
}

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-20260115-0001',
    userId: 'user-1',
    status: 'pending',
    customerName: 'NGUYỄN KỲ VỸ',
    customerPhone: '0901234567',
    customerEmail: 'vynk.24it@vku.udn.vn',
    shippingAddress: 'Cổ Thành, Triệu Phong',
    shippingCity: 'Quảng Trị',
    paymentMethod: 'cod',
    subtotal: 195000,
    shippingFee: 30000,
    total: 225000,
    items: [
      {
        id: 'item-1',
        productName: 'Trà Xanh Mộc Châu',
        productImage: 'https://jyledbngkrnzskamzngw.supabase.co/storage/v1/object/public/product-images/products/gurl3xbo63_1768332325299.png',
        variant: '100g',
        quantity: 2,
        unitPrice: 350000,
        totalPrice: 700000,
      },
    ],
    createdAt: '2026-05-06T08:50:00Z',
    note: 'Giao hàng giờ hành chính',
  },
  {
    id: '2',
    orderNumber: 'ORD-20260115-0002',
    userId: 'user-2',
    status: 'confirmed',
    customerName: 'Trần Thị Bình',
    customerPhone: '0912345678',
    customerEmail: 'binh.tran@email.com',
    shippingAddress: '456 Lê Lợi, Quận 3',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'bank_transfer',
    subtotal: 1250000,
    shippingFee: 0,
    total: 1250000,
    items: [
      {
        id: 'item-3',
        productName: 'Trà Ô Long Đài Loan',
        productImage: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcST-4KKjbLcxc9MySfXExL2eIQiwgARUlWUgP_krUFC8oAwGMPR7aNqdEoxIaJahD1omU7Ivj6ikAE1HjRaNHF4LBfDhad6UvzmTckOXtQttcoCBhs8rPSadG0TBuRCWLL5869csg&usqp=CAc',
        variant: '200g',
        quantity: 3,
        unitPrice: 280000,
        totalPrice: 840000,
      },
      {
        id: 'item-4',
        productName: 'Trà Lá Xanh Organic',
        productImage: '/src/assets/green-tea-leaves.jpg',
        variant: '100g',
        quantity: 2,
        unitPrice: 205000,
        totalPrice: 410000,
      },
    ],
    createdAt: '2026-01-15T14:15:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-20260114-0003',
    userId: 'user-3',
    status: 'processing',
    customerName: 'Lê Minh Cường',
    customerPhone: '0923456789',
    customerEmail: 'cuong.le@email.com',
    shippingAddress: '789 Điện Biên Phủ, Quận Bình Thạnh',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'momo',
    subtotal: 560000,
    shippingFee: 30000,
    total: 590000,
    items: [
      {
        id: 'item-5',
        productName: 'Trà Matcha Latte Mix',
        productImage: '/src/assets/matcha-product.jpg',
        variant: '250g',
        quantity: 2,
        unitPrice: 280000,
        totalPrice: 560000,
      },
    ],
    createdAt: '2026-01-14T09:00:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-20260114-0004',
    userId: 'user-1',
    status: 'shipping',
    customerName: 'Nguyễn Văn An',
    customerPhone: '0901234567',
    customerEmail: 'an.nguyen@email.com',
    shippingAddress: '123 Nguyễn Huệ, Quận 1',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'cod',
    subtotal: 720000,
    shippingFee: 30000,
    total: 750000,
    items: [
      {
        id: 'item-6',
        productName: 'Trà Sencha Premium',
        productImage: '/src/assets/sencha-tea.jpg',
        variant: '100g',
        quantity: 3,
        unitPrice: 240000,
        totalPrice: 720000,
      },
    ],
    createdAt: '2026-01-14T16:45:00Z',
    note: 'Gọi trước khi giao',
  },
];
