// ============================================================
// GoNuts Bites — Medusa v2 Type Definitions & Mappers
// Maps Medusa API response → existing Product types in products.ts
// ============================================================

import type {
  PortionVariant,
  SauceVariant,
  Product,
  FAQ_ITEMS,
} from "@/data/products";
import {
  PORTION_VARIANTS,
  SAUCE_VARIANTS,
  PRODUCTS,
  FAQ_ITEMS as STATIC_FAQ_ITEMS,
} from "@/data/products";

// ---- Medusa v2 minimal response types ----

export type MedusaOptionValue = {
  id: string;
  value: string;
};

export type MedusaOption = {
  id: string;
  title: string; // "Porsi" | "Level Pedas"
  values: MedusaOptionValue[];
};

export type MedusaVariantOption = {
  option_id: string;
  value: string;
};

export type MedusaVariant = {
  id: string;
  title: string; // e.g. "4 pcs / Original"
  options: MedusaVariantOption[];
  calculated_price?: {
    calculated_amount: number;
    currency_code: string;
  };
  prices?: Array<{ amount: number; currency_code: string }>;
};

export type MedusaFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type MedusaProduct = {
  id: string;
  title: string;
  handle: string;
  thumbnail: string | null;
  images?: Array<{ id: string; url: string }> | null;
  description: string | null;
  options: MedusaOption[];
  variants: MedusaVariant[];
  metadata?: {
    faq?: string; // JSON.stringify(MedusaFaqItem[])
    ingredients?: string; // JSON.stringify(string[])
    packaging?: string;
    tags?: string; // JSON.stringify(string[])
    shortDescription?: string;
    longDescription?: string;
  } | null;
};

export type MedusaRegion = {
  id: string;
  name: string;
  currency_code: string;
};

// ---- Mapped types for frontend ----

export type MappedVariant = PortionVariant & {
  medusaVariantId: string; // Medusa variant ID for cart ops
};

export type MappedSauceVariant = SauceVariant & {
  // sauce variants don't carry their own variant id;
  // variant is determined by combination of portion + sauce
};

export type MappedProduct = Omit<Product, "portionVariants"> & {
  portionVariants: MappedVariant[];
  medusaProductId: string;
  medusaOptions: MedusaOption[]; // raw options from Medusa for findVariantId
  allMedusaVariants: MedusaVariant[];
};

// ---- Helper: get IDR price from variant ----

function getIdrPrice(variant: MedusaVariant): number {
  // calculated_price is populated when currency_code is passed to the API
  if (variant.calculated_price?.currency_code === "idr") {
    return variant.calculated_price.calculated_amount;
  }
  // fallback: find in prices array
  const idrPrice = variant.prices?.find((p) => p.currency_code === "idr");
  if (idrPrice) return idrPrice.amount;
  return 0;
}

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// ---- Main mapper: Medusa product → MappedProduct ----

export function mapMedusaProduct(medusaProduct: MedusaProduct): MappedProduct {
  const porsiOption = medusaProduct.options?.find(
    (o) => o.title.toLowerCase() === "porsi"
  );
  const pedasOption = medusaProduct.options?.find(
    (o) =>
      o.title.toLowerCase() === "saus" ||
      o.title.toLowerCase() === "level pedas"
  );

  // Build portionVariants from unique Porsi values
  const portionVariants: MappedVariant[] = [];
  if (porsiOption && medusaProduct.variants) {
    const seenPorsi = new Set<string>();
    for (const variant of medusaProduct.variants) {
      const porsiVal = variant.options?.find(
        (o) => o.option_id === porsiOption.id
      )?.value;
      if (!porsiVal || seenPorsi.has(porsiVal)) continue;
      seenPorsi.add(porsiVal);

      const price = getIdrPrice(variant);
      const pcs = parseInt(porsiVal); // "4 pcs" → 4
      portionVariants.push({
        id: porsiVal.replace(/\s/g, "").toLowerCase(), // "4pcs"
        label: porsiVal,
        pcs,
        price,
        priceFormatted: price > 0 ? formatIdr(price) : porsiVal === "4 pcs" ? "Rp12.000" : "Rp15.000",
        medusaVariantId: variant.id, // representative variant id
      });
    }
  }

  // Build sauceVariants from Level Pedas option
  const sauceVariants: SauceVariant[] = pedasOption
    ? pedasOption.values.map((v) => ({
        id: v.value.toLowerCase(),
        label: v.value,
        emoji: v.value.toLowerCase() === "pedas" ? "🌶️" : "🥜",
        description:
          v.value.toLowerCase() === "pedas"
            ? "Saus kacang pedas dengan kick cabai yang bikin nagih."
            : "Saus kacang gurih khas gado-gado, lembut dan creamy.",
      }))
    : SAUCE_VARIANTS;

  // Parse metadata
  let ingredients: string[] = ["Kacang panjang","Kol","Selada","Tauge","Kentang","Timun","Tahu","Telur","Rice paper"];
  let packaging = "Paper box ramah lingkungan & mudah didaur ulang";
  let tags: string[] = ["healthy","vegan-friendly","fresh","no-preservatives"];
  let longDescription = medusaProduct.description || PRODUCTS[0].longDescription;
  let shortDescription = PRODUCTS[0].shortDescription;

  if (medusaProduct.metadata) {
    if (medusaProduct.metadata.packaging)
      packaging = String(medusaProduct.metadata.packaging);
    if (medusaProduct.metadata.longDescription)
      longDescription = String(medusaProduct.metadata.longDescription);
    if (medusaProduct.metadata.shortDescription)
      shortDescription = String(medusaProduct.metadata.shortDescription);

    if (medusaProduct.metadata.ingredients) {
      try {
        const parsed = JSON.parse(medusaProduct.metadata.ingredients);
        if (Array.isArray(parsed)) ingredients = parsed.map(String);
      } catch {
        ingredients = String(medusaProduct.metadata.ingredients).split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    if (medusaProduct.metadata.tags) {
      try {
        const parsed = JSON.parse(medusaProduct.metadata.tags);
        if (Array.isArray(parsed)) tags = parsed.map(String);
      } catch {
        tags = String(medusaProduct.metadata.tags).split(",").map(s => s.trim()).filter(Boolean);
      }
    }
  }

  return {
    id: medusaProduct.handle,
    name: medusaProduct.title,
    shortDescription,
    longDescription,
    ingredients,
    packaging,
    portionVariants: portionVariants.length > 0 ? portionVariants : PORTION_VARIANTS.map((p) => ({ ...p, medusaVariantId: "" })),
    sauceVariants: sauceVariants.length > 0 ? sauceVariants : SAUCE_VARIANTS,
    tags,
    isAvailable: true,
    image: medusaProduct.thumbnail || PRODUCTS[0].image,
    medusaProductId: medusaProduct.id,
    medusaOptions: medusaProduct.options || [],
    allMedusaVariants: medusaProduct.variants || [],
  };
}

// ---- FAQ mapper ----

export type FaqItem = { id: string; question: string; answer: string };

export function extractFaqFromProduct(
  medusaProduct: MedusaProduct
): FaqItem[] | null {
  try {
    if (medusaProduct.metadata?.faq) {
      const parsed = JSON.parse(medusaProduct.metadata.faq) as FaqItem[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

// ---- Find variant ID by selected portion + sauce ----

export function findVariantId(
  allVariants: MedusaVariant[],
  options: MedusaOption[],
  selectedPorsi: string,
  selectedSauce: string
): string | null {
  const porsiOptionId = options.find(
    (o) => o.title.toLowerCase() === "porsi"
  )?.id;
  const pedasOptionId = options.find(
    (o) =>
      o.title.toLowerCase() === "saus" ||
      o.title.toLowerCase() === "level pedas"
  )?.id;

  for (const variant of allVariants) {
    const porsiMatch = !porsiOptionId || variant.options.find(
      (o) => o.option_id === porsiOptionId && o.value === selectedPorsi
    );
    const sauceMatch = !pedasOptionId || variant.options.find(
      (o) => o.option_id === pedasOptionId && o.value === selectedSauce
    );
    if (porsiMatch && sauceMatch) return variant.id;
  }
  return null;
}
