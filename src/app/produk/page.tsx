// ============================================================
// GoNuts Bites — Halaman Produk (Static)
// Data statis dari src/data/products.ts
// ============================================================

import Image from "next/image";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import OrderForm from "@/components/produk/OrderForm";
import {
  Nut,
  Recycle,
  Salad,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Produk",
  description:
    "Gado-Gado Roll GoNuts Bites — sayuran segar dibungkus rice paper dengan saus kacang pilihan. Tersedia 4 pcs (Rp12.000) dan 6 pcs (Rp15.000).",
};

export default function ProdukPage() {
  const product = PRODUCTS[0];

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
            <span className="text-[var(--color-leaf)]">Gado-Gado Roll</span>
          </h1>
          <p className="text-[#555] mt-3 max-w-xl text-lg">
            Satu produk, banyak pilihan. Pilih porsi dan saus sesuai selera
            kamu!
          </p>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Product Image & Info */}
          <div className="lg:col-span-3 space-y-8">
            <div
              id="product-image"
              className="relative rounded-3xl overflow-hidden shadow-sm border border-[var(--color-cream-dark)] aspect-[4/3]"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                loading="eager"
                className="object-cover"
              />
            </div>

            <div id="product-info" className="space-y-6">
              <div>
                <h2 className="display-md text-[#1a1a1a]">{product.name}</h2>
                <p className="text-[#555] mt-2 text-lg leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {/* Ingredients */}
              <div id="ingredients-section">
                <h3 className="font-bold text-[#1a1a1a] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[var(--color-leaf)] flex items-center justify-center text-white">
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

              {/* Packaging */}
              <div
                id="packaging-info"
                className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl border border-green-100"
              >
                <div className="w-11 h-11 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Recycle className="w-6 h-6 text-green-600" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#1a1a1a]">Kemasan Ramah Lingkungan</p>
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

          {/* Right Column: Order Form */}
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <OrderForm product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
