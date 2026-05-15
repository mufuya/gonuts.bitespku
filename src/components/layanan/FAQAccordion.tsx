"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/medusa-types";
import { FAQ_ITEMS } from "@/data/products";

interface FAQAccordionProps {
  faqItems?: FaqItem[];
}

export default function FAQAccordion({ faqItems }: FAQAccordionProps) {
  const items = faqItems && faqItems.length > 0 ? faqItems : FAQ_ITEMS;
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3" id="faq-accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            id={item.id}
            className={`glass-card rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen
                ? "shadow-md border-[var(--color-leaf)]/20"
                : "border-transparent"
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 text-left gap-4 cursor-pointer"
            >
              <span
                className={`font-bold text-sm sm:text-base transition-colors ${
                  isOpen ? "text-[var(--color-leaf)]" : "text-[#1a1a1a]"
                }`}
              >
                {item.question}
              </span>
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                  isOpen
                    ? "bg-[var(--color-leaf)] rotate-45"
                    : "bg-[var(--color-cream-dark)]"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isOpen ? "text-white" : "text-[#666]"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5">
                <div className="h-px bg-[var(--color-cream-dark)] mb-4" />
                <p className="text-sm text-[#555] leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
