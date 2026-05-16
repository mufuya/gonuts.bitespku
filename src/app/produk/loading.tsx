import ProductSkeleton from "@/components/ui/ProductSkeleton";

// Next.js route-level loading UI — shown while ProductContent async component resolves
export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-24">
      {/* Match the header section height */}
      <div className="bg-white border-b border-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-28 bg-[var(--color-leaf)]/10 rounded-full" />
            <div className="h-12 w-72 bg-gray-200 rounded-xl" />
            <div className="h-5 w-80 bg-gray-100 rounded-lg" />
          </div>
        </div>
      </div>
      <ProductSkeleton />
    </div>
  );
}
