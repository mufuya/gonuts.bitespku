"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  SAUCE_VARIANTS,
  PORTION_VARIANTS,
  SITE_CONFIG,
} from "@/data/products";
import { sdk } from "@/lib/medusa";
import {
  findVariantId,
  type MappedProduct,
} from "@/lib/medusa-types";

// ---- Props ----

interface OrderFormProps {
  product?: MappedProduct;
  regionId?: string | null;
}

// ---- WhatsApp message builder ----

function buildWhatsAppMessage(
  productName: string,
  portionLabel: string,
  sauceLabel: string,
  priceFormatted: string,
  cartId?: string
): string {
  const refLine = cartId
    ? `\n🆔 Ref: CART-${cartId.slice(-8).toUpperCase()}`
    : "";
  return (
    `Halo GoNuts Bites! 🌿\n\n` +
    `Saya ingin memesan:\n` +
    `📦 ${productName} ${portionLabel}\n` +
    `🥜 Saus: ${sauceLabel}\n` +
    `💰 Total: ${priceFormatted}` +
    refLine
  );
}

// ---- Component ----

export default function OrderForm({ product, regionId }: OrderFormProps) {
  // Derive portion & sauce arrays from product prop or fallback to statics
  const portionVariants = product?.portionVariants ?? PORTION_VARIANTS.map((p) => ({ ...p, medusaVariantId: "" }));
  const sauceVariants = product?.sauceVariants ?? SAUCE_VARIANTS;

  const [selectedPortion, setSelectedPortion] = useState(portionVariants[0]);
  const [selectedSauce, setSelectedSauce] = useState(sauceVariants[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const productName = product?.name ?? "Gado-Gado Roll";

  const handleOrder = useCallback(async () => {
    setIsSubmitting(true);
    setError(null);

    let cartId: string | undefined;

    try {
      // ── Step 1: Temukan Medusa variant ID ──
      const variantId = product?.allMedusaVariants?.length && product?.medusaOptions
        ? findVariantId(
            product.allMedusaVariants,
            product.medusaOptions,
            selectedPortion.label,
            selectedSauce.label
          )
        : null;

      // ── Step 2: Buat Cart di Medusa ──
      const cartPayload: Record<string, unknown> = {};
      if (regionId) cartPayload.region_id = regionId;

      const { cart } = await (sdk.store.cart as any).create(cartPayload);
      cartId = cart.id as string;

      // Simpan ke localStorage untuk session tracking
      if (typeof window !== "undefined") {
        localStorage.setItem("gonuts_cart_id", cartId);
      }

      // ── Step 3: Tambah line item jika variant ID tersedia ──
      if (variantId && cartId) {
        await (sdk.store.cart as any).lineItems.create(cartId, {
          variant_id: variantId,
          quantity: 1,
        });
      }
    } catch (err) {
      // Cart gagal dibuat — tetap lanjutkan ke WhatsApp (graceful degradation)
      if (process.env.NODE_ENV === "development") {
        console.warn("[GoNuts] Cart creation failed, proceeding without cart:", err);
      }
    }

    // ── Step 4: Redirect ke WhatsApp ──
    const message = buildWhatsAppMessage(
      productName,
      selectedPortion.label,
      selectedSauce.label,
      selectedPortion.priceFormatted,
      cartId
    );
    const waUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setIsSubmitting(false);
  }, [selectedPortion, selectedSauce, product, regionId, productName, portionVariants, sauceVariants]);

  return (
    <div
      id="order-form"
      className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-[var(--color-leaf)]/10"
    >
      <div>
        <h3 className="font-bold text-lg text-[#1a1a1a] mb-1">
          Pilih Pesananmu
        </h3>
        <p className="text-sm text-[#666]">
          Customise porsi dan saus sesuai selera, lalu langsung pesan via
          WhatsApp!
        </p>
      </div>

      {/* Portion Selector */}
      <div>
        <p className="text-sm font-bold text-[#1a1a1a] mb-3 uppercase tracking-wide">
          Pilih Porsi
        </p>
        <div className="grid grid-cols-2 gap-3" id="portion-selector">
          {portionVariants.map((portion) => {
            const isSelected = selectedPortion.id === portion.id;
            return (
              <button
                key={portion.id}
                id={`portion-option-${portion.id}`}
                onClick={() => setSelectedPortion(portion)}
                className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[var(--color-leaf)] bg-[var(--color-leaf)]/5 shadow-sm"
                    : "border-[var(--color-cream-dark)] hover:border-[var(--color-leaf)]/40 bg-white/50"
                }`}
              >
                <p
                  className={`font-bold text-lg ${
                    isSelected ? "text-[var(--color-leaf)]" : "text-[#1a1a1a]"
                  }`}
                >
                  {portion.label}
                </p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${
                    isSelected
                      ? "text-[var(--color-turmeric)]"
                      : "text-[#666]"
                  }`}
                >
                  {portion.priceFormatted}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sauce Selector */}
      <div>
        <p className="text-sm font-bold text-[#1a1a1a] mb-3 uppercase tracking-wide">
          Pilih Saus
        </p>
        <div className="grid grid-cols-2 gap-3" id="sauce-selector">
          {sauceVariants.map((sauce) => {
            const isSelected = selectedSauce.id === sauce.id;
            return (
              <button
                key={sauce.id}
                id={`sauce-option-${sauce.id}`}
                onClick={() => setSelectedSauce(sauce)}
                className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[var(--color-leaf)] bg-[var(--color-leaf)]/5 shadow-sm"
                    : "border-[var(--color-cream-dark)] hover:border-[var(--color-leaf)]/40 bg-white/50"
                }`}
              >
                <p
                  className={`font-bold text-sm mt-1 ${
                    isSelected ? "text-[var(--color-leaf)]" : "text-[#1a1a1a]"
                  }`}
                >
                  {sauce.label}
                </p>
                <p className="text-xs text-[#888] mt-0.5 leading-snug">
                  {sauce.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-[var(--color-cream-dark)] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#888] uppercase tracking-wide">
            Pesananmu
          </p>
          <p className="font-bold text-[#1a1a1a] text-sm mt-0.5">
            {productName} {selectedPortion.label} — Saus {selectedSauce.label}
          </p>
        </div>
        <p className="font-black text-[var(--color-leaf)] text-lg">
          {selectedPortion.priceFormatted}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="glass-card rounded-xl px-4 py-3 border border-red-200 bg-red-50/80">
          <p className="text-xs text-red-600 font-medium">{error}</p>
        </div>
      )}

      {/* CTA Button */}
      <button
        onClick={handleOrder}
        disabled={isSubmitting}
        id="order-whatsapp-cta"
        className={`btn-primary btn-whatsapp w-full text-base py-4 relative overflow-hidden ${
          isSubmitting ? "opacity-80 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? (
          <>
            {/* Loading spinner */}
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Memproses pesanan...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Pesan Sekarang via WhatsApp
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#aaa]">
        Pesanan diproses melalui WhatsApp ·{" "}
        <Link href="/layanan" className="underline hover:text-[var(--color-leaf)]">
          Lihat FAQ
        </Link>
      </p>
    </div>
  );
}
