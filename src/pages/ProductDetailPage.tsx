import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useCartStore } from '@/store/cartStore';
import { ProductCard } from '@/components/product/ProductCard';
import { CustomButton } from '@/components/ui/custom-button';
import { formatPrice } from '@/lib/utils';
import { ProductCardSkeleton } from '@/components/product/ProductCardSkeleton';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading } = useProduct(slug || '');
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link to="/products">
            <CustomButton variant="primary">
              <ArrowLeft className="w-4 h-4" />
              Quay lại cửa hàng
            </CustomButton>
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = product.price;
  const productImages = product.image ? [product.image] : (product.images || []);
  const defaultImage = 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop';
  const displayImages = productImages.length > 0 ? productImages : [defaultImage];
  
  // Parse sizes from comma-separated string
  const sizes = product.size ? product.size.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  // Set default size when product loads
  if (sizes.length > 0 && !selectedSize) {
    setSelectedSize(sizes[0]);
  }
selectedSize || sizes[0]
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: currentPrice,
        image: displayImages[0],
        variant: product.size || '100g',
      });
    }
  };

  const tabs = [
    { id: 'description', name: 'Mô tả' },
    { id: 'brewing', name: 'Cách pha' },
    { id: 'ingredients', name: 'Thành phần' },
    { id: 'reviews', name: `Đánh giá (${product.reviews || 0})` },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Trang chủ
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/products" className="text-muted-foreground hover:text-primary">
            Sản phẩm
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-cream">
              <img
                src={displayImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {displayImages.length > 1 && (
              <div className="flex gap-4">
                {displayImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.discount && (
                <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
                  -{product.discount}%
                </span>
              )}
              {product.status === 'out_of_stock' && (
                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full">
                  Hết hàng
                </span>
              )}
            </div>

            {/* Category */}
            <span className="text-primary font-medium uppercase tracking-wider text-sm">
              {product.origin === 'vietnam' ? 'Việt Nam' : 'Nhật Bản'}
            </span>

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating || 5)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="font-medium">{product.rating || 5.0}</span>
              <span className="text-muted-foreground">({product.reviews || 0} đánh giá)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(currentPrice)}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.short_description}
            </p>

            {/* Size */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-3">Kích cỡ</h3>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground hover:border-primary/50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium text-foreground mb-3">Số lượng</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <CustomButton
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              className="w-full mb-6"
            >
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ hàng
            </CustomButton>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-accent rounded-xl">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Miễn phí ship từ 500K</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Cam kết chính hãng</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Đổi trả 7 ngày</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="flex gap-6 border-b border-border mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <div className="max-w-3xl">
            {activeTab === 'description' && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}
            {activeTab === 'brewing' && (
              <p className="text-muted-foreground leading-relaxed">
                {product.brewing_instructions || 'Pha với nước 80-85°C, ngâm 2-3 phút. Có thể pha lại 2-3 lần.'}
              </p>
            )}
            {activeTab === 'ingredients' && (
              <p className="text-muted-foreground leading-relaxed">
                {product.ingredients || '100% lá trà xanh nguyên chất'}
              </p>
            )}
            {activeTab === 'reviews' && (
              <p className="text-muted-foreground">
                Hiện chưa có đánh giá nào cho sản phẩm này.
              </p>
            )}
          </div>
        </div>

        {/* Related Products - Removed for now, can be added back with proper query */}
      </div>
    </div>
  );
};

export default ProductDetailPage;