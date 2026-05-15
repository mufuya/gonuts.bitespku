// ============================================================
// GoNuts Bites — Product Skeleton (Loading State)
// Glassmorphism skeleton matching the product page layout
// ============================================================

export default function ProductSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Product Detail — 3 cols */}
        <div className="lg:col-span-3 space-y-8">
          {/* Image skeleton */}
          <div className="glass-card rounded-3xl aspect-[4/3] bg-[var(--color-leaf)]/8" />

          {/* Info skeleton */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-8 w-2/3 bg-[var(--color-leaf)]/10 rounded-xl" />
              <div className="h-4 w-full bg-gray-100 rounded-lg" />
              <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
              <div className="h-4 w-4/6 bg-gray-100 rounded-lg" />
            </div>

            {/* Price badges skeleton */}
            <div className="flex gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl px-5 py-3 w-32 border border-[var(--color-leaf)]/15"
                >
                  <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
                  <div className="h-6 w-20 bg-[var(--color-leaf)]/15 rounded" />
                </div>
              ))}
            </div>

            {/* Ingredients skeleton */}
            <div>
              <div className="h-5 w-40 bg-gray-200 rounded-lg mb-3" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-20 bg-[var(--color-leaf)]/8 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Sauce skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-4 h-20" />
              ))}
            </div>
          </div>
        </div>

        {/* Order Form skeleton — 2 cols */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-[var(--color-leaf)]/10">
            {/* Title */}
            <div className="space-y-2">
              <div className="h-5 w-40 bg-gray-200 rounded-lg" />
              <div className="h-3 w-full bg-gray-100 rounded" />
            </div>
            {/* Portion options */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-[var(--color-cream-dark)] p-4 h-20"
                />
              ))}
            </div>
            {/* Sauce options */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-[var(--color-cream-dark)] p-4 h-24"
                />
              ))}
            </div>
            {/* Summary bar */}
            <div className="bg-[var(--color-cream-dark)] rounded-2xl p-4 h-16" />
            {/* CTA button skeleton */}
            <div className="h-14 rounded-full bg-[#25d366]/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
