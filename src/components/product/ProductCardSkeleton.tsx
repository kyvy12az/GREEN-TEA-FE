export const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-muted" />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted rounded" />
        <div className="h-5 w-full bg-muted rounded" />
        <div className="h-5 w-3/4 bg-muted rounded" />
        <div className="flex items-center gap-1">
          <div className="h-4 w-4 bg-muted rounded" />
          <div className="h-4 w-8 bg-muted rounded" />
        </div>
        <div className="h-6 w-24 bg-muted rounded" />
      </div>
    </div>
  );
};
