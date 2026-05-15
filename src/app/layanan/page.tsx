import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import {
  Clock,
  MapPin,
  CircleHelp,
  Nut,
  Spotlight,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG, generateWhatsAppUrl } from "@/data/products";
import FAQAccordion from "@/components/layanan/FAQAccordion";
import { sdk, GONUTS_PRODUCT_HANDLE } from "@/lib/medusa";
import {
  extractFaqFromProduct,
  type FaqItem,
  type MedusaProduct,
} from "@/lib/medusa-types";

export const metadata: Metadata = {
  title: "Layanan & FAQ",
  description:
    "Pertanyaan umum seputar GoNuts Bites — kesegaran bahan, jam operasional, cara pesan, dan informasi layanan pelanggan.",
};

// ---- Fetch FAQ from Medusa product metadata ----

async function fetchFaqItems(): Promise<FaqItem[] | null> {
  noStore();
  try {
    const res = await sdk.store.product.list({
      handle: GONUTS_PRODUCT_HANDLE,
      fields: "metadata",
    } as Parameters<typeof sdk.store.product.list>[0]);

    const medusaProduct = (res.products as unknown as MedusaProduct[])[0];
    if (!medusaProduct) return null;

    return extractFaqFromProduct(medusaProduct);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[GoNuts] FAQ fetch FAILED → using static fallback. Reason: ${msg}`);
    return null;
  }
}


// ---- Page ----

export default async function LayananPage() {
  const contactUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Halo GoNuts Bites, saya memiliki pertanyaan mengenai produk/layanan kalian."
  )}`;
  const orderUrl = generateWhatsAppUrl("Gado-Gado Roll", "Original");

  // Fetch FAQ from Medusa (will fallback inside FAQAccordion if null)
  const dynamicFaqItems = await fetchFaqItems();

  return (
    <div className="min-h-screen bg-[var(--color-cream)] pt-24">
      {/* Page Header */}
      <div className="bg-white border-b border-[var(--color-cream-dark)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-turmeric)]/10 border border-[var(--color-turmeric)]/20 mb-4">
            <MessageCircle
              className="w-4 h-4 text-[var(--color-turmeric)]"
              strokeWidth={2}
            />
            <span className="text-sm font-semibold text-[var(--color-turmeric)]">
              Layanan Konsumen
            </span>
          </div>
          <h1 className="display-lg text-[#1a1a1a]">
            Ada yang bisa kami{" "}
            <span className="text-gradient-warm">bantu?</span>
          </h1>
          <p className="text-[#555] mt-3 max-w-xl text-lg">
            Temukan jawaban atas pertanyaan umum kamu, atau langsung hubungi
            kami via WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* FAQ Column */}
          <div className="lg:col-span-2">
            <h2 className="font-bold text-xl text-[#1a1a1a] mb-6 flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg gradient-leaf flex items-center justify-center text-white">
                <CircleHelp className="w-4 h-4" strokeWidth={2.5} />
              </span>
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqItems={dynamicFaqItems ?? undefined} />
          </div>

          {/* Contact Card Column */}
          <div className="space-y-4">
            {/* Direct Contact */}
            <div
              id="contact-card"
              className="glass-card rounded-3xl p-6 border border-[var(--color-leaf)]/10"
            >
              <h3 className="font-bold text-[#1a1a1a] mb-2">
                Pertanyaan lain?
              </h3>
              <p className="text-sm text-[#666] mb-5 leading-relaxed">
                Tim CS kami siap membantu kamu lewat WhatsApp. Respond cepat
                selama jam operasional!
              </p>
              <a
                href={contactUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-whatsapp-btn"
                className="btn-primary btn-whatsapp w-full text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat via WhatsApp
              </a>
            </div>

            {/* Operational Hours */}
            <div
              id="operational-hours-card"
              className="glass-card rounded-3xl p-6 border border-[var(--color-turmeric)]/10"
            >
              <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                <Clock
                  className="w-4 h-4 text-[var(--color-turmeric)]"
                  strokeWidth={2}
                />{" "}
                Jam Operasional
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-[var(--color-cream-dark)]">
                  <span className="text-sm text-[#555]">Senin – Sabtu</span>
                  <span className="text-sm font-bold text-[#1a1a1a]">
                    09.00 – 17.00
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-[#555]">Minggu</span>
                  <span className="text-sm font-bold text-red-400">Tutup</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2 p-2.5 bg-[var(--color-cream)] rounded-xl">
                <MapPin
                  className="w-4 h-4 text-[var(--color-leaf)] flex-shrink-0"
                  strokeWidth={2}
                />
                <p className="text-xs text-[#666]">{SITE_CONFIG.location}</p>
              </div>
            </div>

            {/* Instagram */}
            <div
              id="instagram-card"
              className="glass-card rounded-3xl p-6 border border-pink-100"
            >
              <h3 className="font-bold text-[#1a1a1a] mb-2 flex items-center gap-2">
                <Spotlight className="w-4 h-4 text-pink-500" strokeWidth={2} />{" "}
                Follow Kami
              </h3>
              <p className="text-sm text-[#666] mb-4">
                Update produk, promo, dan konten sehat ada di Instagram kami!
              </p>
              <a
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                id="instagram-follow-btn"
                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold text-sm hover:opacity-90 hover:-translate-y-0.5 transition-all"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {SITE_CONFIG.instagramHandle}
              </a>
            </div>

            {/* Quick Order */}
            <div className="gradient-leaf rounded-3xl p-6 text-white">
              <h3 className="font-bold mb-2 flex items-center gap-1.5">
                Sudah siap pesan? <Nut className="w-4 h-4" strokeWidth={2} />
              </h3>
              <p className="text-white/80 text-sm mb-4">
                Langsung order sekarang dan nikmati gado-gado roll segarmu!
              </p>
              <a
                href={orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="layanan-order-cta"
                className="btn-primary bg-white text-[var(--color-leaf)] font-black text-sm w-full justify-center"
              >
                Pesan Sekarang →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
