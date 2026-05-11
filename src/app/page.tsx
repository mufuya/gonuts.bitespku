import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Leaf, Zap, HeartPulse, Camera, LeafyGreen, CircleFadingPlus, Recycle, Nut, Utensils, Tag, Flame, Package, Sprout, Smartphone } from "lucide-react";
import { PRODUCTS, generateWhatsAppUrl } from "@/data/products";

export const metadata: Metadata = {
  title: "GoNuts Bites — Wrap-Dip-Enjoy",
  description:
    "Camilan sehat gado-gado roll yang segar, praktis, dan Instagramable untuk Gen Z Pekanbaru.",
};

export default function HomePage() {
  const product = PRODUCTS[0];
  const quickOrderUrl = generateWhatsAppUrl("Gado-Gado Roll 6 pcs", "Original");

  return (
    <>
      {/* =============================================
          HERO SECTION
          ============================================= */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-20"
      >
        {/* Decorative blobs */}
        <div
          className="blob absolute top-1/4 -left-24 w-72 h-72 bg-[var(--color-leaf)]"
          aria-hidden="true"
        />
        <div
          className="blob blob-delay-1 absolute bottom-1/4 -right-24 w-80 h-80 bg-[var(--color-turmeric)]"
          aria-hidden="true"
        />
        <div
          className="blob blob-delay-2 absolute top-3/4 left-1/3 w-56 h-56 bg-[var(--color-leaf-light)]"
          aria-hidden="true"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-leaf)]/10 border border-[var(--color-leaf)]/20">
              <span className="w-2 h-2 rounded-full bg-[var(--color-leaf)] animate-pulse" />
              <span className="text-sm font-semibold text-[var(--color-leaf)]">
                Healthy Veggie Snack
              </span>
            </div>

            {/* Headline */}
            <h1 className="display-xl text-[#1a1a1a]">
              <span className="text-gradient-leaf">Wrap.</span>
              <br />
              <span className="text-gradient-warm">Dip.</span>
              <br />
              Enjoy.
            </h1>

            <p className="text-lg text-[#555] max-w-md leading-relaxed animate-fade-up animate-delay-100">
              GoNuts Bites menghadirkan inovasi camilan sehat — perpaduan
              <strong className="text-[#1a1a1a]"> Vietnamese spring roll </strong>
              dengan cita rasa
              <strong className="text-[#1a1a1a]"> gado-gado khas Indonesia</strong>.
              Segar, praktis, dan pastinya Instagramable!
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 animate-fade-up animate-delay-200">
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
            <div className="flex flex-wrap gap-6 pt-4 animate-fade-up animate-delay-300">
              {[
                { value: "100%", label: "Bahan Segar" },
                { value: "2", label: "Varian Saus" },
                { value: "Rp12k", label: "Mulai dari" },
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
          <div className="relative flex items-center justify-center animate-fade-up animate-delay-200">
            {/* Decorative circle behind image */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[var(--color-leaf)]/8 blur-2xl" />
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-leaf)]/10 to-[var(--color-turmeric)]/10 blur-xl scale-90" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[var(--color-leaf)]/15 border border-white/60">
                <Image
                  src="/hero-product-3.png"
                  alt="Gado-Gado Roll GoNuts Bites — fresh veggie spring roll dengan saus kacang"
                  width={600}
                  height={600}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Floating tag cards — inside image on mobile, overhanging on sm+ */}
              <div className="absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
                <p className="text-xs text-[#888] font-medium">Mulai dari</p>
                <p className="font-black text-[var(--color-leaf)] text-base sm:text-lg">
                  Rp12.000
                </p>
              </div>
              <div className="absolute top-3 right-3 sm:-top-4 sm:-right-4 glass-card rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg">
                <p className="text-xs sm:text-sm font-bold text-[#1a1a1a] flex items-center gap-1">
                  <LeafyGreen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--color-leaf)]" strokeWidth={2} /> No Pengawet</p>
                <p className="text-xs text-[#888]">Segar setiap hari</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <p className="text-xs text-[#aaa] font-medium tracking-widest uppercase">
            Scroll
          </p>
          <svg
            className="w-4 h-4 text-[#aaa]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
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
              <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-[var(--color-leaf)]/8" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-[var(--color-turmeric)]/12" />
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[var(--color-cream-dark)]">
                <Image
                  src="/hero-product-4.png"
                  alt="Bahan-bahan segar GoNuts Bites — kacang panjang, kol, tauge, timun, tahu"
                  width={600}
                  height={500}
                  loading="eager"
                  className="object-cover w-full"
                />
              </div>
              {/* Eco badge */}
              <div className="absolute bottom-6 right-6 glass-card rounded-2xl px-4 py-3 text-center shadow-lg">
                <div className="flex justify-center mb-1">
                  <Recycle className="w-6 h-6 text-[var(--color-leaf)]" strokeWidth={1.75} />
                </div>
                <p className="text-xs font-bold text-[#1a1a1a]">
                  Eco Packaging
                </p>
                <p className="text-xs text-[#888]">Paper box</p>
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
                <strong className="text-[#1a1a1a]"> Vietnamese spring roll</strong> —
                yang ringan dan fresh — dengan cita rasa
                <strong className="text-[#1a1a1a]"> gado-gado khas Indonesia</strong> yang sudah dicintai jutaan orang.
              </p>

              <p className="text-[#555] leading-relaxed">
                Hasilnya? Camilan{" "}
                <em className="text-[var(--color-leaf)] font-semibold">
                  one-bite
                </em> yang segar,
                bergizi, dan cocok dinikmati kapan saja — sambil
                kuliah, kerja, atau nongkrong bareng teman. Dikemas dalam <strong className="text-[#1a1a1a]">paper box ramah lingkungan</strong>.
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
      <section id="why-gonuts-section" className="py-20 gradient-hero">
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
                desc: "Mulai Rp12.000 saja untuk 4 pcs. Sehat nggak harus mahal!",
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
                className="glass-card rounded-3xl p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
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
      </section>

      {/* =============================================
          CTA BANNER
          ============================================= */}
      <section
        id="cta-banner"
        className="py-16 gradient-leaf relative overflow-hidden"
      >
        <div
          className="blob absolute -top-12 -right-12 w-64 h-64 bg-white opacity-5"
          aria-hidden="true"
        />
        <div
          className="blob blob-delay-1 absolute -bottom-8 -left-8 w-48 h-48 bg-white opacity-5"
          aria-hidden="true"
        />
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
      </section>
    </>
  );
}
