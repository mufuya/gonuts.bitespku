"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS, SAUCE_VARIANTS, PORTION_VARIANTS, generateWhatsAppUrl } from "@/data/products";

export default function OrderForm() {
  const product = PRODUCTS[0]; // Gado-Gado Roll
  const [selectedPortion, setSelectedPortion] = useState(PORTION_VARIANTS[0]);
  const [selectedSauce, setSelectedSauce] = useState(SAUCE_VARIANTS[0]);

  const waUrl = generateWhatsAppUrl(
    `${product.name} ${selectedPortion.label}`,
    selectedSauce.label
  );

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
          {PORTION_VARIANTS.map((portion) => {
            const isSelected = selectedPortion.id === portion.id;
            return (
              <button
                key={portion.id}
                id={`portion-option-${portion.id}`}
                onClick={() => setSelectedPortion(portion)}
                className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 cursor-pointer ${isSelected
                  ? "border-[var(--color-leaf)] bg-[var(--color-leaf)]/5 shadow-sm"
                  : "border-[var(--color-cream-dark)] hover:border-[var(--color-leaf)]/40 bg-white/50"
                  }`}
              >
                <p
                  className={`font-bold text-lg ${isSelected ? "text-[var(--color-leaf)]" : "text-[#1a1a1a]"
                    }`}
                >
                  {portion.label}
                </p>
                <p
                  className={`text-sm font-semibold mt-0.5 ${isSelected
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
          {SAUCE_VARIANTS.map((sauce) => {
            const isSelected = selectedSauce.id === sauce.id;
            return (
              <button
                key={sauce.id}
                id={`sauce-option-${sauce.id}`}
                onClick={() => setSelectedSauce(sauce)}
                className={`rounded-2xl border-2 p-4 text-left transition-all duration-200 cursor-pointer ${isSelected
                  ? "border-[var(--color-leaf)] bg-[var(--color-leaf)]/5 shadow-sm"
                  : "border-[var(--color-cream-dark)] hover:border-[var(--color-leaf)]/40 bg-white/50"
                  }`}
              >
                {/* <span className="text-2xl">{sauce.emoji}</span> */}
                <p
                  className={`font-bold text-sm mt-1 ${isSelected ? "text-[var(--color-leaf)]" : "text-[#1a1a1a]"
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
            {product.name} {selectedPortion.label} — Saus {selectedSauce.label}
          </p>
        </div>
        <p className="font-black text-[var(--color-leaf)] text-lg">
          {selectedPortion.priceFormatted}
        </p>
      </div>

      {/* CTA Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="order-whatsapp-cta"
        className="btn-primary btn-whatsapp w-full text-base py-4"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Pesan Sekarang via WhatsApp
      </a>

      <p className="text-center text-xs text-[#aaa]">
        Pesanan diproses melalui WhatsApp ·{" "}
        <Link href="/layanan" className="underline hover:text-[var(--color-leaf)]">
          Lihat FAQ
        </Link>
      </p>
    </div>
  );
}
