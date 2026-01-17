import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/store/cartStore';
import { CustomButton } from '@/components/ui/custom-button';
import { formatPrice, getProductSlug } from '@/lib/utils';

const categoryNames: Record<string, string> = {
  matcha: 'Matcha',
  original: 'Trà nguyên chất',
  teabag: 'Trà túi lọc',
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0] || '',
      variant: product.size || '100g',
    });
  };

  const productImage = product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop';
  const productSlug = getProductSlug(product);

  return (
    <Link
      to={`/product/${productSlug}`}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.discount && (
            <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full">
              -{product.discount}%
            </span>
          )}
          {product.stock === 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              Hết hàng
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
            {categoryNames[product.category] || product.category}
          </span>
        </div>  

        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <CustomButton
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="w-full"
          >
            <ShoppingBag className="w-4 h-4" />
            Thêm vào giỏ
          </CustomButton>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category */}
        <span className="text-xs font-medium text-primary uppercase tracking-wider mb-2">
          {product.origin === 'vietnam' ? 'Việt Nam' : 'Nhật Bản'}
        </span>

        {/* Name */}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 flex-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{product.rating || 5.0}</span>
          <span className="text-sm text-muted-foreground">({product.reviews || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};
