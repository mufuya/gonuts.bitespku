// ============================================================
// GoNuts Bites — Halaman Produk (Server Component)
// Fetch dinamis dari Medusa v2, fallback ke data statis
// ============================================================

import Image from "next/image";
import type { Metadata } from "next";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { PRODUCTS } from "@/data/products";
import OrderForm from "@/components/produk/OrderForm";
import ProductSkeleton from "@/components/ui/ProductSkeleton";
import {
  Nut,
  Sprout,
  Flame,
  Recycle,
  Store,
  Zap,
  Salad,
  ChefHatIcon,
} from "lucide-react";
import { sdk, GONUTS_PRODUCT_HANDLE, INDONESIA_CURRENCY_CODE } from "@/lib/medusa";
import {
  mapMedusaProduct,
  type MappedProduct,
  type MedusaProduct,
  type MedusaRegion,
} from "@/lib/medusa-types";
import { SAUCE_VARIANTS, PORTION_VARIANTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Produk",
  description:
    "Gado-Gado Roll GoNuts Bites — sayuran segar dibungkus rice paper dengan saus kacang pilihan. Tersedia 4 pcs (Rp12.000) dan 6 pcs (Rp15.000).",
};


// ---- Data fetching ----

async function fetchProductFromMedusa(): Promise<{
  product: MappedProduct | null;
  regionId: string | null;
}> {
  // Bypass ALL Next.js fetch caching — every request gets live data from Medusa
  noStore();

  try {
    // 1. Fetch Indonesia region ID
    const regionsRes = await sdk.store.region.list();
    const indonesiaRegion = (regionsRes.regions as MedusaRegion[]).find(
      (r) => r.currency_code === INDONESIA_CURRENCY_CODE
    );
    const regionId = indonesiaRegion?.id ?? null;

    // 2. Fetch product with calculated prices
    const params: Record<string, string> = {
      handle: GONUTS_PRODUCT_HANDLE,
      fields: "*variants,*options,*options.values,+variants.calculated_price",
    };
    if (regionId) params.region_id = regionId;
    else params.currency_code = INDONESIA_CURRENCY_CODE;

    const productsRes = await sdk.store.product.list(
      params as Parameters<typeof sdk.store.product.list>[0]
    );
    const medusaProduct = (
      productsRes.products as unknown as MedusaProduct[]
    )[0];

    if (!medusaProduct) {
      console.warn("[GoNuts] Product 'gado-gado-roll' not found in Medusa response");
      return { product: null, regionId };
    }

    return { product: mapMedusaProduct(medusaProduct), regionId };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[GoNuts] Medusa fetch FAILED → using static fallback. Reason: ${msg}`);
    return { product: null, regionId: null };
  }
}

// ---- Fallback static product ----

function getStaticProduct(): MappedProduct {
  const base = PRODUCTS[0];
  return {
    ...base,
    portionVariants: PORTION_VARIANTS.map((p) => ({ ...p, medusaVariantId: "" })),
    medusaProductId: "",
    medusaOptions: [],
    allMedusaVariants: [],
  };
}

// ---- Product Content (inner async component) ----

async function ProductContent() {
  const { product: medusaProduct, regionId } = await fetchProductFromMedusa();
  const product = medusaProduct ?? getStaticProduct();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Product Detail — 3 cols */}
        <div className="lg:col-span-3 space-y-8">
          {/* Product Image */}
          <div
            id="product-image"
            className="relative rounded-3xl overflow-hidden shadow-xl border border-white aspect-[4/3]"
          >
            <Image
              src="/hero-product-4.png"
              alt="Gado-Gado Roll GoNuts Bites"
              fill
              loading="eager"
              className="object-cover"
            />
            {/* Available badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-[#1a1a1a]">
                Tersedia Sekarang
              </span>
            </div>
            {/* Medusa live badge */}
            {medusaProduct && (
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-[var(--color-leaf)]/90 backdrop-blur px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold text-white">Live</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div id="product-info" className="space-y-6">
            <div>
              <h2 className="display-md text-[#1a1a1a]">{product.name}</h2>
              <p className="text-[#555] mt-2 text-lg leading-relaxed">
                {product.longDescription}
              </p>
            </div>

            {/* Price badges */}
            <div className="flex flex-wrap gap-3" id="price-list">
              {product.portionVariants.map((pv) => (
                <div
                  key={pv.id}
                  className="glass-card rounded-2xl px-5 py-3 border border-[var(--color-leaf)]/15"
                >
                  <p className="text-xs text-[#888] uppercase tracking-wide">
                    {pv.label}
                  </p>
                  <p className="font-black text-[var(--color-leaf)] text-xl">
                    {pv.priceFormatted}
                  </p>
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <div id="ingredients-section">
              <h3 className="font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg gradient-leaf flex items-center justify-center text-white">
                  <Salad className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
                Bahan-Bahan Segar
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-3 py-1.5 bg-[var(--color-leaf)]/8 text-[var(--color-leaf-dark)] rounded-full text-sm font-medium border border-[var(--color-leaf)]/15"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Sauce info */}
            <div id="sauce-info-section">
              <h3 className="font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg gradient-warm flex items-center justify-center text-white">
                  <ChefHatIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                </span>
                Varian Saus Kacang
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.sauceVariants.map((sauce) => {
                  const SauceIcon =
                    sauce.id === "pedas" ? Flame : Nut;
                  const iconColor =
                    sauce.id === "pedas"
                      ? "text-orange-500"
                      : "text-[var(--color-turmeric)]";
                  const iconBg =
                    sauce.id === "pedas"
                      ? "bg-orange-50"
                      : "bg-[var(--color-turmeric)]/10";
                  return (
                    <div
                      key={sauce.id}
                      className="glass-card rounded-2xl p-4 flex items-start gap-3"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center flex-shrink-0`}
                      >
                        <SauceIcon
                          className={`w-5 h-5 ${iconColor}`}
                          strokeWidth={1.75}
                        />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1a1a1a]">
                          {sauce.label}
                        </p>
                        <p className="text-xs text-[#666] leading-snug mt-0.5">
                          {sauce.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Packaging */}
            <div
              id="packaging-info"
              className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100"
            >
              <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <Recycle className="w-6 h-6 text-green-600" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-bold text-sm text-[#1a1a1a]">
                  Kemasan Ramah Lingkungan
                </p>
                <p className="text-sm text-[#555]">{product.packaging}</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--color-bark)]/5 text-[var(--color-bark)] rounded-full text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Order Form — 2 cols, sticky on desktop */}
        <div className="lg:col-span-2 lg:sticky lg:top-28">
          <OrderForm product={product} regionId={regionId} />

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              {
                icon: (
                  <Sprout className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                ),
                bg: "bg-emerald-50",
                text: "No Pengawet",
              },
              {
                icon: (
                  <Store
                    className="w-4 h-4 text-[var(--color-turmeric)]"
                    strokeWidth={2}
                  />
                ),
                bg: "bg-[var(--color-turmeric)]/10",
                text: "Segar Hari Ini",
              },
              {
                icon: (
                  <Zap
                    className="w-4 h-4 text-[var(--color-leaf)]"
                    strokeWidth={2}
                  />
                ),
                bg: "bg-[var(--color-leaf)]/10",
                text: "Order Cepat",
              },
            ].map((badge) => (
              <div
                key={badge.text}
                className="glass-card rounded-xl p-2.5 flex flex-col items-center gap-1"
              >
                <div
                  className={`w-7 h-7 rounded-lg ${badge.bg} flex items-center justify-center`}
                >
                  {badge.icon}
                </div>
                <p className="text-xs font-medium text-[#666]">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Page ----

export default function ProdukPage() {
  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-24">
      {/* Page Header */}
      <div className="bg-white border-b border-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-leaf)]/10 border border-[var(--color-leaf)]/20 mb-4">
            <Nut className="w-4 h-4 text-[var(--color-leaf)]" strokeWidth={2} />
            <span className="text-sm font-semibold text-[var(--color-leaf)]">
              Menu Kami
            </span>
          </div>
          <h1 className="display-lg text-[#1a1a1a]">
            Pilihan{" "}
            <span className="text-gradient-leaf">Gado-Gado Roll</span>
          </h1>
          <p className="text-[#555] mt-3 max-w-xl text-lg">
            Satu produk, banyak pilihan. Customize porsi dan saus sesuai
            selera kamu!
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent />
      </Suspense>
    </div>
  );
}
