/**
 * GoNuts Bites — Update Metadata Script
 *
 * Jalankan dengan:
 *   npx medusa exec ./src/scripts/update-metadata.ts
 *
 * Script ini update metadata produk Gado-Gado Roll yang sudah ada
 * dengan menambahkan FAQ, ingredients, tags sebagai JSON string.
 */

import { ExecArgs, IProductModuleService } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function updateGoNutsMetadata({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService: IProductModuleService = container.resolve(
    Modules.PRODUCT
  );

  logger.info("🔄 Updating GoNuts Bites product metadata...");

  const products = await productModuleService.listProducts({
    handle: "gado-gado-roll",
  });

  if (products.length === 0) {
    logger.warn("❌ Product gado-gado-roll not found. Run seed first.");
    return;
  }

  const product = products[0];
  logger.info(`Found product: ${product.title} (id: ${product.id})`);

  await productModuleService.updateProducts(product.id, {
    metadata: {
      slogan: "Wrap-Dip-Enjoy",
      brand: "GoNuts Bites",
      location: "Pekanbaru, Riau",
      shortDescription:
        "Sayuran segar dibungkus rice paper, disajikan dengan saus kacang pilihan.",
      longDescription:
        "Perpaduan inovatif antara Vietnamese spring roll dan cita rasa gado-gado Indonesia yang autentik. Setiap gigitan menghadirkan kesegaran sayuran rebus berkualitas yang dibungkus rapi dalam rice paper, dinikmati bersama saus kacang spesial kami.",
      packaging: "Paper box ramah lingkungan & mudah didaur ulang",
      ingredients: JSON.stringify([
        "Kacang panjang",
        "Kol",
        "Selada",
        "Tauge",
        "Kentang",
        "Timun",
        "Tahu",
        "Telur",
        "Rice paper",
      ]),
      tags: JSON.stringify([
        "healthy",
        "vegan-friendly",
        "fresh",
        "no-preservatives",
      ]),
      faq: JSON.stringify([
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
            "Kamu bisa memesan langsung melalui tombol Pesan Sekarang di halaman produk yang akan mengarahkan kamu ke WhatsApp kami. Pilih porsi (4 pcs atau 6 pcs) dan varian saus (Original/Pedas), lalu konfirmasi pesananmu.",
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
      ]),
    },
  });

  logger.info("✅ Metadata updated successfully!");
  logger.info("   - FAQ (6 items)");
  logger.info("   - ingredients (JSON array)");
  logger.info("   - tags (JSON array)");
  logger.info("   - shortDescription & longDescription");
}
