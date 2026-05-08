// ============================================================
// GoNuts Bites — Product Data Config
// This file is the single source of truth for all product data.
// Designed to be easily swappable with MedusaJS API responses.
// ============================================================

export const SITE_CONFIG = {
  name: "GoNuts Bites",
  tagline: "Wrap-Dip-Enjoy",
  description:
    "Inovasi camilan sehat bergaya Vietnamese spring roll dengan cita rasa gado-gado khas Indonesia.",
  instagram: "https://www.instagram.com/gonuts.bitespku",
  instagramHandle: "@gonuts.bitespku",
  // TODO: Replace with real WhatsApp number before going live
  whatsappNumber: "6281261468048",
  location: "Pekanbaru, Riau",
  email: "hello@gonutsbites.id",
  operationalHours: "Senin – Sabtu, 09.00 – 17.00 WIB",
};

export type PortionVariant = {
  id: string;
  label: string;
  pcs: number;
  price: number; // in IDR
  priceFormatted: string;
};

export type SauceVariant = {
  id: string;
  label: string;
  emoji: string;
  description: string;
};

export type Product = {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  ingredients: string[];
  packaging: string;
  portionVariants: PortionVariant[];
  sauceVariants: SauceVariant[];
  tags: string[];
  isAvailable: boolean;
};

export const SAUCE_VARIANTS: SauceVariant[] = [
  {
    id: "original",
    label: "Original",
    emoji: "🥜",
    description: "Saus kacang gurih khas gado-gado, lembut dan creamy.",
  },
  {
    id: "pedas",
    label: "Pedas",
    emoji: "🌶️",
    description: "Saus kacang pedas dengan kick cabai yang bikin nagih.",
  },
];

export const PORTION_VARIANTS: PortionVariant[] = [
  {
    id: "4pcs",
    label: "4 pcs",
    pcs: 4,
    price: 12000,
    priceFormatted: "Rp12.000",
  },
  {
    id: "6pcs",
    label: "6 pcs",
    pcs: 6,
    price: 15000,
    priceFormatted: "Rp15.000",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "gado-gado-roll",
    name: "Gado-Gado Roll",
    shortDescription:
      "Sayuran segar dibungkus rice paper, disajikan dengan saus kacang pilihan.",
    longDescription:
      "Perpaduan inovatif antara Vietnamese spring roll dan cita rasa gado-gado Indonesia yang autentik. Setiap gigitan menghadirkan kesegaran sayuran rebus berkualitas yang dibungkus rapi dalam rice paper, dinikmati bersama saus kacang spesial kami.",
    ingredients: [
      "Kacang panjang",
      "Kol",
      "Selada",
      "Tauge",
      "Kentang",
      "Timun",
      "Tahu",
      "Telur",
      "Rice paper",
    ],
    packaging: "Paper box ramah lingkungan & mudah didaur ulang",
    portionVariants: PORTION_VARIANTS,
    sauceVariants: SAUCE_VARIANTS,
    tags: ["healthy", "vegan-friendly", "fresh", "no-preservatives"],
    isAvailable: true,
  },
];

export const FAQ_ITEMS = [
  {
    id: "faq-1",
    question: "Apakah bahan-bahan GoNuts Bites segar?",
    answer:
      "Ya! Kami menggunakan 100% sayuran segar tanpa pengawet yang dibeli langsung dari pasar setiap harinya. Karena itu produk kami sebaiknya dikonsumsi di hari yang sama untuk menjaga kualitas dan kesegaran.",
  },
  {
    id: "faq-2",
    question: "Berapa jam operasional GoNuts Bites?",
    answer:
      "Kami buka Senin – Sabtu, pukul 09.00 – 17.00 WIB. Pesanan di luar jam operasional akan diproses pada hari berikutnya.",
  },
  {
    id: "faq-3",
    question: "Bagaimana cara memesan?",
    answer:
      'Kamu bisa memesan langsung melalui tombol "Pesan Sekarang" di halaman produk yang akan mengarahkan kamu ke WhatsApp kami. Pilih porsi (4 pcs atau 6 pcs) dan varian saus (Original/Pedas), lalu konfirmasi pesananmu.',
  },
  {
    id: "faq-4",
    question: "Apakah GoNuts Bites melayani pengiriman?",
    answer:
      "Saat ini kami melayani pemesanan dan pengambilan di area Pekanbaru. Untuk pertanyaan pengiriman, silakan hubungi kami melalui WhatsApp.",
  },
  {
    id: "faq-5",
    question: "Apakah ada pilihan untuk alergi tertentu?",
    answer:
      "Produk kami mengandung kacang (pada saus) dan telur. Jika kamu memiliki alergi spesifik, silakan informasikan saat memesan melalui WhatsApp agar kami dapat membantu.",
  },
  {
    id: "faq-6",
    question: "Berapa lama produk bisa disimpan?",
    answer:
      "GoNuts Bites dibuat segar setiap hari dan sebaiknya dikonsumsi dalam waktu 4–6 jam setelah pembuatan untuk kualitas terbaik. Simpan di tempat sejuk jika belum dikonsumsi.",
  },
];

// Helper: Generate WhatsApp order URL
export function generateWhatsAppUrl(
  portionLabel: string,
  sauceLabel: string
): string {
  const message = encodeURIComponent(
    `Halo GoNuts Bites, saya ingin memesan menu ${portionLabel} dengan varian saus ${sauceLabel}.`
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
}

// Helper: Format price to Indonesian Rupiah
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
