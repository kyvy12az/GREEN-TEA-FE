export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  category: 'nguyen-la' | 'matcha' | 'tui-loc' | 'tra-nhat';
  origin: 'vietnam' | 'japan';
  images: string[];
  variants: { size: string; price: number }[];
  brewing: string;
  ingredients: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
  discount?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Trà Xanh Thái Nguyên Đặc Biệt',
    slug: 'tra-xanh-thai-nguyen-dac-biet',
    price: 280000,
    originalPrice: 350000,
    description: 'Trà xanh Thái Nguyên được hái từ những búp trà non đầu mùa, mang hương thơm đặc trưng của vùng đất trà nổi tiếng. Lá trà được chế biến thủ công theo phương pháp truyền thống, giữ nguyên hương vị tinh túy.',
    shortDescription: 'Trà xanh búp non, hương thơm đặc trưng vùng Thái Nguyên',
    category: 'nguyen-la',
    origin: 'vietnam',
    images: ['https://tradaigia.vn/wp-content/uploads/2019/05/Tra-xanh-Thai-Nguyen-dac-biet-500g.jpg'],
    variants: [
      { size: '100g', price: 280000 },
      { size: '250g', price: 650000 },
      { size: '500g', price: 1200000 },
    ],
    brewing: 'Pha với nước 80-85°C, ngâm 2-3 phút. Có thể pha lại 2-3 lần.',
    ingredients: '100% lá trà xanh nguyên chất từ Thái Nguyên',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
    discount: 20,
  },
  {
    id: '2',
    name: 'Matcha Uji Premium',
    slug: 'matcha-uji-premium',
    price: 450000,
    description: 'Matcha cao cấp từ vùng Uji, Kyoto - nơi sản xuất matcha nổi tiếng nhất Nhật Bản. Bột mịn, màu xanh tươi đẹp, vị ngọt tự nhiên không đắng.',
    shortDescription: 'Matcha cao cấp từ Uji, Kyoto - vị ngọt thanh tự nhiên',
    category: 'matcha',
    origin: 'japan',
    images: ['https://static.wixstatic.com/media/f4b464_2845c038ab79412bacf80a39b26631c1~mv2.png/v1/fill/w_520,h_578,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f4b464_2845c038ab79412bacf80a39b26631c1~mv2.png'],
    variants: [
      { size: '30g', price: 450000 },
      { size: '50g', price: 720000 },
      { size: '100g', price: 1350000 },
    ],
    brewing: 'Rây 1-2g matcha vào chén, thêm 70ml nước 70-80°C, đánh đều bằng chasen.',
    ingredients: '100% bột trà xanh matcha nguyên chất từ Uji, Nhật Bản',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    isNew: true,
  },
  {
    id: '3',
    name: 'Trà Xanh Túi Lọc Hữu Cơ',
    slug: 'tra-xanh-tui-loc-huu-co',
    price: 120000,
    description: 'Trà xanh túi lọc tiện lợi từ lá trà hữu cơ. Mỗi túi chứa đúng liều lượng, cho hương vị đậm đà và tiện dụng mọi lúc mọi nơi.',
    shortDescription: 'Trà túi lọc hữu cơ tiện lợi, 25 túi/hộp',
    category: 'tui-loc',
    origin: 'vietnam',
    images: ['https://product.hstatic.net/1000282430/product/290005493000_9a8327f0eed44e6fb95e8a30cc2e7a6a_master.jpg'],
    variants: [
      { size: '25 túi', price: 120000 },
      { size: '50 túi', price: 220000 },
      { size: '100 túi', price: 400000 },
    ],
    brewing: 'Ngâm túi trà trong nước 85°C trong 2-3 phút. Có thể thêm mật ong.',
    ingredients: '100% lá trà xanh hữu cơ',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Sencha Nhật Bản Organic',
    slug: 'sencha-nhat-ban-organic',
    price: 380000,
    originalPrice: 420000,
    description: 'Sencha là loại trà xanh phổ biến nhất tại Nhật Bản, với hương vị tươi mát, cân bằng giữa ngọt và đắng nhẹ. Được trồng hữu cơ tại Shizuoka.',
    shortDescription: 'Sencha hữu cơ từ Shizuoka, hương tươi mát',
    category: 'tra-nhat',
    origin: 'japan',
    images: ['https://m.media-amazon.com/images/I/91Fm8I-AGEL._SL1500_.jpg'],
    variants: [
      { size: '100g', price: 380000 },
      { size: '200g', price: 720000 },
    ],
    brewing: 'Pha với nước 70-80°C, ngâm 1-2 phút. Không nên dùng nước sôi.',
    ingredients: '100% lá trà xanh Sencha hữu cơ từ Shizuoka, Nhật Bản',
    rating: 4.7,
    reviews: 67,
    inStock: true,
    discount: 10,
  },
  {
    id: '5',
    name: 'Trà Shan Tuyết Cổ Thụ',
    slug: 'tra-shan-tuyet-co-thu',
    price: 520000,
    description: 'Trà Shan Tuyết từ những cây trà cổ thụ hàng trăm năm tuổi trên vùng núi cao Hà Giang. Hương vị đậm đà, độc đáo, mang đậm bản sắc núi rừng.',
    shortDescription: 'Trà cổ thụ Hà Giang, hương vị núi rừng đậm đà',
    category: 'nguyen-la',
    origin: 'vietnam',
    images: ['https://pos.nvncdn.com/35ab07-173722/ps/Tra-Shan-Tuyet-Co-Thu-Hop-200G-Loai-1.jpeg?v=1742359134'],
    variants: [
      { size: '100g', price: 520000 },
      { size: '250g', price: 1200000 },
    ],
    brewing: 'Pha với nước 90-95°C, ngâm 3-5 phút. Có thể pha lại nhiều lần.',
    ingredients: '100% lá trà Shan Tuyết cổ thụ từ Hà Giang',
    rating: 4.9,
    reviews: 45,
    inStock: true,
    featured: true,
  },
  {
    id: '6',
    name: 'Matcha Latte Mix',
    slug: 'matcha-latte-mix',
    price: 180000,
    description: 'Hỗn hợp matcha và sữa bột tiện lợi, chỉ cần thêm nước nóng là có ngay ly matcha latte thơm ngon. Thích hợp cho người bận rộn.',
    shortDescription: 'Matcha latte tiện lợi, 15 gói/hộp',
    category: 'matcha',
    origin: 'japan',
    images: ['https://www.jadeleafmatcha.com/cdn/shop/files/Jade_Leaf_Original_Matcha_Latte_Mix_-_Front_ae8c622a-34e7-4d5a-bb37-33a4785cbdd6.png?v=1763749146&width=1445'],
    variants: [
      { size: '15 gói', price: 180000 },
      { size: '30 gói', price: 340000 },
    ],
    brewing: 'Hòa 1 gói với 200ml nước nóng hoặc sữa ấm, khuấy đều.',
    ingredients: 'Bột matcha, sữa bột, đường mía',
    rating: 4.5,
    reviews: 178,
    inStock: true,
    isNew: true,
  },
  {
    id: '7',
    name: 'Trà Xanh Mộc Châu',
    slug: 'tra-xanh-moc-chau',
    price: 195000,
    description: 'Trà xanh từ cao nguyên Mộc Châu, nơi có khí hậu mát mẻ quanh năm. Lá trà non mềm, hương thơm nhẹ nhàng, vị thanh mát.',
    shortDescription: 'Trà xanh cao nguyên, vị thanh mát dịu dàng',
    category: 'nguyen-la',
    origin: 'vietnam',
    images: ['https://tamchau.com/wp-content/uploads/2022/10/TRA-XANH-MOC-goi-250-g-1.png'],
    variants: [
      { size: '100g', price: 195000 },
      { size: '250g', price: 450000 },
    ],
    brewing: 'Pha với nước 80-85°C, ngâm 2-3 phút.',
    ingredients: '100% lá trà xanh từ Mộc Châu, Sơn La',
    rating: 4.6,
    reviews: 92,
    inStock: true,
  },
  {
    id: '8',
    name: 'Gyokuro Nhật Bản',
    slug: 'gyokuro-nhat-ban',
    price: 680000,
    description: 'Gyokuro là loại trà xanh cao cấp nhất Nhật Bản, được che nắng 3 tuần trước thu hoạch tạo nên vị umami đậm đà, ngọt sâu và ít đắng.',
    shortDescription: 'Trà xanh cao cấp nhất Nhật Bản, vị umami đặc biệt',
    category: 'tra-nhat',
    origin: 'japan',
    images: ['https://fujiocha.com/wp-content/uploads/2019/02/tra-gyokuro-nhat-ban.jpg'],
    variants: [
      { size: '50g', price: 680000 },
      { size: '100g', price: 1280000 },
    ],
    brewing: 'Pha với nước 50-60°C, ngâm 2 phút. Nước càng mát, vị càng ngọt.',
    ingredients: '100% lá trà xanh Gyokuro từ Uji, Kyoto',
    rating: 5.0,
    reviews: 23,
    inStock: true,
    featured: true,
  },
];

export const categories = [
  { id: 'nguyen-la', name: 'Trà Nguyên Lá', count: 3 },
  { id: 'matcha', name: 'Matcha', count: 2 },
  { id: 'tui-loc', name: 'Trà Túi Lọc', count: 1 },
  { id: 'tra-nhat', name: 'Trà Nhật Bản', count: 2 },
];

export const origins = [
  { id: 'vietnam', name: 'Việt Nam', count: 4 },
  { id: 'japan', name: 'Nhật Bản', count: 4 },
];

export const getFeaturedProducts = () => products.filter(p => p.featured);

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);

export const getRelatedProducts = (productId: string, limit = 4) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && (p.category === product.category || p.origin === product.origin))
    .slice(0, limit);
};
