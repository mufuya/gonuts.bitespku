import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { Leaf, Zap, HeartPulse, LeafyGreen, CircleFadingPlus, Recycle, Nut, Utensils, Tag, Flame, Package, Sprout, Smartphone } from "lucide-react";
import { PRODUCTS, generateWhatsAppUrl, SITE_CONFIG } from "@/data/products";
import { sdk, GONUTS_PRODUCT_HANDLE, INDONESIA_CURRENCY_CODE } from "@/lib/medusa";
import { type MedusaProduct, type MedusaRegion } from "@/lib/medusa-types";

export const metadata: Metadata = {
  title: "GoNuts Bites — Wrap-Dip-Enjoy",
  description:
    "Camilan sehat gado-gado roll yang segar, praktis, dan Instagramable untuk Gen Z Pekanbaru.",
};

// ── Tipe data yang diambil dari Medusa untuk halaman beranda ──
type HomeData = {
  productTitle: string;
  minPrice: number;        // harga varian termurah (IDR)
  sauceCount: number;      // jumlah pilihan saus
  heroImage: string;       // images[0] dari Medusa → hero section
  brandImage: string;      // images[1] dari Medusa → brand story section
  fromMedusa: boolean;
};

// ── Ambil data dari Medusa ──
async function fetchHomeData(): Promise<HomeData> {
  noStore();

  const fallback: HomeData = {
    productTitle: PRODUCTS[0]?.name ?? "Gado-Gado Roll",
    minPrice: 12000,
    sauceCount: 2,
    heroImage: "/hero-product-3.png",
    brandImage: "/hero-product-4.png",
    fromMedusa: false,
  };

  try {
    // 1. Cari region Indonesia untuk harga IDR
    const regionsRes = await sdk.store.region.list();
    const idRegion = (regionsRes.regions as MedusaRegion[]).find(
      (r) => r.currency_code === INDONESIA_CURRENCY_CODE
    );

    // 2. Fetch produk dengan harga kalkulasi
    const params: Record<string, string> = {
      handle: GONUTS_PRODUCT_HANDLE,
      fields: "title,*images,*variants,*options,*options.values,+variants.calculated_price",
    };
    if (idRegion?.id) params.region_id = idRegion.id;
    else params.currency_code = INDONESIA_CURRENCY_CODE;

    const productsRes = await sdk.store.product.list(
      params as Parameters<typeof sdk.store.product.list>[0]
    );
    const product = (productsRes.products as unknown as MedusaProduct[])[0];

    if (!product) return fallback;

    // Harga minimum dari semua varian
    const prices: number[] = product.variants.flatMap((v) => {
      const calcPrice = (v as unknown as Record<string, unknown>).calculated_price as { calculated_amount?: number } | undefined;
      if (calcPrice?.calculated_amount) return [calcPrice.calculated_amount];
      return v.prices?.map((p) => p.amount) ?? [];
    });
    const minPrice = prices.length > 0 ? Math.min(...prices) : fallback.minPrice;

    // Jumlah varian saus
    const sauceOption = product.options.find(
      (o) => o.title.toLowerCase() === "saus" || o.title.toLowerCase() === "level pedas"
    );
    const sauceCount = sauceOption?.values?.length ?? fallback.sauceCount;

    const images = (product as unknown as { images?: { url: string }[] }).images ?? [];

    return {
      productTitle: product.title,
      minPrice,
      sauceCount,
      heroImage: images[0]?.url || fallback.heroImage,
      brandImage: images[1]?.url || fallback.brandImage,
      fromMedusa: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[GoNuts/Home] Medusa fetch failed → static fallback. ${msg}`);
    return fallback;
  }
}

// ── Utilitas format harga IDR ──
function formatPrice(amount: number): string {
  if (amount >= 1000) return `Rp${(amount / 1000).toFixed(0)}k`;
  return `Rp${amount}`;
}

export default async function HomePage() {
  const { productTitle, minPrice, sauceCount, heroImage, brandImage, fromMedusa } = await fetchHomeData();

  const quickOrderUrl = generateWhatsAppUrl(`${productTitle} 6 pcs`, "Original");
  const formattedMin = formatPrice(minPrice);
  const formattedMinFull = `Rp${minPrice.toLocaleString("id-ID")}`;

  return (
    <>
      {/* =============================================
          HERO SECTION
          ============================================= */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center bg-[var(--color-cream)] pt-20"
      >

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-leaf)]/10 border border-[var(--color-leaf)]/20">
              <span className="text-sm font-semibold text-[var(--color-leaf)]">
                Healthy Veggie Snack
              </span>
            </div>

            {/* Headline */}
            <h1 className="display-xl text-[#1a1a1a]">
              <span className="text-[var(--color-leaf)]">Wrap.</span>
              <br />
              <span className="text-[var(--color-turmeric)]">Dip.</span>
              <br />
              Enjoy.
            </h1>

            <p className="text-lg text-[#555] max-w-md leading-relaxed">
              GoNuts Bites menghadirkan inovasi camilan sehat dengan perpaduan
              <strong className="text-[#1a1a1a]"> Vietnamese spring roll </strong>
              dan
              <strong className="text-[#1a1a1a]"> gado-gado khas Indonesia</strong>.
              Segar, praktis, dan pastinya Instagramable!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={quickOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-primary"
                className="btn-primary btn-whatsapp text-base"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan Sekarang
              </a>
              <Link
                href="/produk"
                id="hero-cta-secondary"
                className="btn-primary btn-outline text-base"
              >
                Lihat Menu →
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { value: "100%", label: "Bahan Segar" },
                { value: `${sauceCount}`, label: "Varian Saus" },
                { value: formattedMin, label: "Mulai dari" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-black text-2xl text-[var(--color-leaf)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#888] font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex items-center justify-center">
            {/* Simple image container without floating elements */}
            <div className="relative w-full max-w-lg aspect-square">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[var(--color-cream-dark)] h-full w-full">
                <Image
                  src={heroImage}
                  alt="Gado-Gado Roll GoNuts Bites — fresh veggie spring roll dengan saus kacang"
                  width={600}
                  height={600}
                  priority
                  unoptimized={heroImage.startsWith("http")}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          BRAND STORY SECTION
          ============================================= */}
      <section
        id="brand-story-section"
        className="py-20 sm:py-28 bg-white overflow-hidden"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[var(--color-cream-dark)]">
                <Image
                  src={brandImage}
                  alt="Bahan-bahan segar GoNuts Bites — kacang panjang, kol, tauge, timun, tahu"
                  width={600}
                  height={500}
                  loading="eager"
                  unoptimized={brandImage.startsWith("http")}
                  className="object-cover w-full"
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-turmeric)]/10 border border-[var(--color-turmeric)]/20">
                <span className="text-sm font-semibold text-[var(--color-turmeric)]">
                  Brand Story
                </span>
              </div>

              <h2 className="display-md text-[#1a1a1a]">
                Inovasi Camilan Sehat{" "}
                {/* <span className="text-gradient-leaf">untuk Gen Z</span> */}
              </h2>

              <p className="text-[#555] leading-relaxed">
                GoNuts Bites lahir dari keresahan: kenapa camilan sehat susah
                banget dikonsumsi dengan praktis? Kami menggabungkan konsep
                <strong className="text-[#1a1a1a]"> Vietnamese spring roll</strong> yang ringan dan fresh dengan cita rasa
                <strong className="text-[#1a1a1a]"> gado-gado khas Indonesia</strong> yang sudah dicintai jutaan orang.
              </p>

              <p className="text-[#555] leading-relaxed">
                Hasilnya? Camilan{" "}
                <em className="text-[var(--color-leaf)] font-semibold">
                  one-bite
                </em> yang segar,
                bergizi, dan cocok dinikmati kapan saja. Dikemas dalam <strong className="text-[#1a1a1a]">paper box ramah lingkungan</strong>.
              </p>

              {/* Values */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  {
                    icon: <Leaf className="w-5 h-5 text-[var(--color-leaf)]" strokeWidth={2} />,
                    title: "Sayuran Segar",
                    desc: "Tanpa pengawet",
                  },
                  {
                    icon: <Zap className="w-5 h-5 text-[var(--color-turmeric)]" strokeWidth={2} />,
                    title: "Super Praktis",
                    desc: "Makan one-bite",
                  },
                  {
                    icon: <HeartPulse className="w-5 h-5 text-[var(--color-leaf)]" strokeWidth={2} />,
                    title: "Peduli Sehat",
                    desc: "Bergizi seimbang",
                  },
                  {
                    icon: <CircleFadingPlus className="w-5 h-5 text-[var(--color-bark)]" strokeWidth={2} />,
                    title: "Instagramable",
                    desc: "Aesthetic & kekinian",
                  },
                ].map((val) => (
                  <div
                    key={val.title}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--color-cream)] hover:bg-[var(--color-cream-dark)] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[var(--color-cream-dark)] flex-shrink-0">
                      {val.icon}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#1a1a1a]">
                        {val.title}
                      </p>
                      <p className="text-xs text-[#888]">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/produk"
                id="brand-story-cta"
                className="btn-primary btn-leaf inline-flex mt-2"
              >
                Cek Menu Kami →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          WHY GONUTS SECTION
          ============================================= */}
      {/* <section id="why-gonuts-section" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-[var(--color-leaf)]/20 mb-4">
            <span className="text-sm font-semibold text-[var(--color-leaf)]">
              Kenapa GoNuts Bites?
            </span>
          </div>
          <h2 className="display-md text-[#1a1a1a] mb-4">
            Beda dari yang Lain
          </h2>
          <p className="text-[#555] max-w-xl mx-auto mb-12">
            Gado-gado tradisional disajikan ulang dalam format modern yang cocok
            banget buat gaya hidup aktif.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Utensils className="w-6 h-6 text-[var(--color-leaf)]" strokeWidth={1.75} />,
                bg: "bg-[var(--color-leaf)]/10",
                title: "Bentuk Roll",
                desc: "Bukan gado-gado piring biasa. Dikemas dalam rice paper, mudah digenggam dan dinikmati.",
              },
              {
                icon: <Tag className="w-6 h-6 text-[var(--color-turmeric)]" strokeWidth={1.75} />,
                bg: "bg-[var(--color-turmeric)]/10",
                title: "Harga Terjangkau",
                desc: `Mulai ${formattedMinFull} saja untuk 4 pcs. Sehat nggak harus mahal!`,
              },
              {
                icon: <Flame className="w-6 h-6 text-orange-500" strokeWidth={1.75} />,
                bg: "bg-orange-50",
                title: "2 Varian Saus",
                desc: "Saus kacang Original yang gurih atau Pedas yang nendang — pilih sesuai mood.",
              },
              {
                icon: <Package className="w-6 h-6 text-[var(--color-leaf)]" strokeWidth={1.75} />,
                bg: "bg-[var(--color-leaf)]/10",
                title: "Eco Packaging",
                desc: "Paper box ramah lingkungan. Praktis dibawa ke mana saja, mudah didaur ulang.",
              },
              {
                icon: <Sprout className="w-6 h-6 text-emerald-600" strokeWidth={1.75} />,
                bg: "bg-emerald-50",
                title: "No Pengawet",
                desc: "Dibuat segar setiap hari dari sayuran pilihan. Konsumsi di hari yang sama.",
              },
              {
                icon: <Smartphone className="w-6 h-6 text-[var(--color-bark)]" strokeWidth={1.75} />,
                bg: "bg-[var(--color-bark)]/8",
                title: "Order via WA",
                desc: "Pesan mudah dan cepat lewat WhatsApp. Nggak perlu aplikasi tambahan.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[var(--color-cream-dark)] rounded-3xl p-6 text-left shadow-sm"
              >
                <div className={`w-11 h-11 rounded-2xl ${item.bg} flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* =============================================
          CTA BANNER
          ============================================= */}
      {/* <section
        id="cta-banner"
        className="py-16 bg-[var(--color-leaf)] relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <h2 className="display-md text-white mb-4 flex items-center justify-center gap-2">
            Siap Wrap-Dip-Enjoy? <Nut className="w-8 h-8 opacity-90" strokeWidth={1.75} />
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Pesan sekarang lewat WhatsApp dan dapatkan gado-gado roll segar
            kesukaanmu!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={quickOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="cta-banner-order"
              className="btn-primary bg-white text-[var(--color-leaf)] hover:bg-[var(--color-cream)] font-black text-base px-8"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pesan via WhatsApp
            </a>
            <Link
              href="/layanan"
              id="cta-banner-faq"
              className="btn-primary border-2 border-white text-white hover:bg-white hover:text-[var(--color-leaf)] font-bold text-base px-8"
            >
              Tanya Dulu
            </Link>
          </div>
        </div>
      </section> */}
    </>
  );
}
