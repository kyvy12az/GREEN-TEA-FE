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
    createdAt: '2026-01-15T10:30:00Z',
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
        productImage: '/src/assets/tea-bags.jpg',
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
  {
    id: '5',
    orderNumber: 'ORD-20260113-0005',
    userId: 'user-4',
    status: 'delivered',
    customerName: 'Phạm Thị Dung',
    customerPhone: '0934567890',
    customerEmail: 'dung.pham@email.com',
    shippingAddress: '321 Cách Mạng Tháng 8, Quận 10',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'bank_transfer',
    subtotal: 1500000,
    shippingFee: 0,
    total: 1500000,
    items: [
      {
        id: 'item-7',
        productName: 'Trà Matcha Ceremonial Grade',
        productImage: '/src/assets/matcha-product.jpg',
        variant: '200g',
        quantity: 2,
        unitPrice: 650000,
        totalPrice: 1300000,
      },
      {
        id: 'item-8',
        productName: 'Trà Túi Lọc Xanh',
        productImage: '/src/assets/tea-bags.jpg',
        variant: '20 túi',
        quantity: 2,
        unitPrice: 100000,
        totalPrice: 200000,
      },
    ],
    createdAt: '2026-01-13T11:20:00Z',
  },
  {
    id: '6',
    orderNumber: 'ORD-20260112-0006',
    userId: 'user-5',
    status: 'cancelled',
    customerName: 'Hoàng Văn Em',
    customerPhone: '0945678901',
    customerEmail: 'em.hoang@email.com',
    shippingAddress: '654 Võ Văn Tần, Quận 3',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'cod',
    subtotal: 380000,
    shippingFee: 30000,
    total: 410000,
    items: [
      {
        id: 'item-9',
        productName: 'Trà Lá Xanh Organic',
        productImage: '/src/assets/green-tea-leaves.jpg',
        variant: '150g',
        quantity: 1,
        unitPrice: 380000,
        totalPrice: 380000,
      },
    ],
    createdAt: '2026-01-12T08:30:00Z',
    note: 'Khách hủy do thay đổi địa chỉ',
  },
  {
    id: '7',
    orderNumber: 'ORD-20260116-0007',
    userId: 'user-6',
    status: 'pending',
    customerName: 'Võ Thị Hương',
    customerPhone: '0956789012',
    customerEmail: 'huong.vo@email.com',
    shippingAddress: '987 Nguyễn Thị Minh Khai, Quận 1',
    shippingCity: 'TP. Hồ Chí Minh',
    paymentMethod: 'momo',
    subtotal: 950000,
    shippingFee: 0,
    total: 950000,
    items: [
      {
        id: 'item-10',
        productName: 'Trà Ô Long Đài Loan Premium',
        productImage: '/src/assets/tea-bags.jpg',
        variant: '300g',
        quantity: 2,
        unitPrice: 400000,
        totalPrice: 800000,
      },
      {
        id: 'item-11',
        productName: 'Trà Sencha Nhật Bản',
        productImage: '/src/assets/sencha-tea.jpg',
        variant: '50g',
        quantity: 1,
        unitPrice: 150000,
        totalPrice: 150000,
      },
    ],
    createdAt: '2026-01-16T07:00:00Z',
  },
];
