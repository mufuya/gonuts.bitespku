/**
 * GoNuts Bites — Database Seed Script
 *
 * Jalankan dengan:
 *   npx medusa exec ./src/scripts/seed.ts
 *
 * Script ini akan:
 * 1. Membuat Sales Channel default
 * 2. Membuat Region Indonesia (IDR)
 * 3. Membuat produk Gado-Gado Roll dengan semua varian
 * 4. Membuat Shipping Profile & opsi pengiriman manual Pekanbaru
 */

import {
  ExecArgs,
  IProductModuleService,
  ISalesChannelModuleService,
  IRegionModuleService,
  IFulfillmentModuleService,
  IPricingModuleService,
} from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

export default async function seedGoNutsBites({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const productModuleService: IProductModuleService = container.resolve(Modules.PRODUCT)
  const salesChannelModuleService: ISalesChannelModuleService = container.resolve(Modules.SALES_CHANNEL)
  const regionModuleService: IRegionModuleService = container.resolve(Modules.REGION)
  const fulfillmentModuleService: IFulfillmentModuleService = container.resolve(Modules.FULFILLMENT)
  const pricingModuleService: IPricingModuleService = container.resolve(Modules.PRICING)

  logger.info("🌱 Starting GoNuts Bites seed...")

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Sales Channel
  // ─────────────────────────────────────────────────────────────────────────────
  logger.info("Creating Sales Channel...")
  const salesChannels = await salesChannelModuleService.listSalesChannels({ name: "GoNuts Bites Store" })
  let salesChannel = salesChannels[0]
  if (!salesChannel) {
    salesChannel = await salesChannelModuleService.createSalesChannels({
      name: "GoNuts Bites Store",
      description: "Toko resmi GoNuts Bites – Pekanbaru, Riau",
      is_disabled: false,
    })
    logger.info("✅ Sales Channel created")
  } else {
    logger.info("⏩ Sales Channel already exists, skipping")
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Region Indonesia
  // ─────────────────────────────────────────────────────────────────────────────
  logger.info("Creating Region Indonesia...")
  const regions = await regionModuleService.listRegions({ name: "Indonesia" })
  let region = regions[0]
  if (!region) {
    region = await regionModuleService.createRegions({
      name: "Indonesia",
      currency_code: "idr",
      countries: ["id"],
    })
    logger.info("✅ Region Indonesia created")
  } else {
    logger.info("⏩ Region Indonesia already exists, skipping")
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Produk: Gado-Gado Roll
  // ─────────────────────────────────────────────────────────────────────────────
  logger.info("Creating product: Gado-Gado Roll...")
  const existingProducts = await productModuleService.listProducts({ title: "Gado-Gado Roll" })

  if (existingProducts.length === 0) {
    // Gunakan Workflow untuk membuat produk (lebih aman & otomatis link ke price/inventory di v2)
    const { createProductsWorkflow } = require("@medusajs/medusa/core-flows")

    const { result } = await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "Gado-Gado Roll",
            handle: "gado-gado-roll",
            subtitle: "Sayuran segar dibungkus rice paper, disajikan dengan saus kacang pilihan.",
            description:
              "Perpaduan inovatif antara Vietnamese spring roll dan cita rasa gado-gado Indonesia yang autentik. " +
              "Setiap gigitan menghadirkan kesegaran sayuran rebus berkualitas yang dibungkus rapi dalam rice paper, " +
              "dinikmati bersama saus kacang spesial kami.",
            status: "published",
            sales_channels: [{ id: salesChannel.id }],
            metadata: {
              slogan: "Wrap-Dip-Enjoy",
              brand: "GoNuts Bites",
              location: "Pekanbaru, Riau",
              shortDescription: "Sayuran segar dibungkus rice paper, disajikan dengan saus kacang pilihan.",
              longDescription: "Perpaduan inovatif antara Vietnamese spring roll dan cita rasa gado-gado Indonesia yang autentik. Setiap gigitan menghadirkan kesegaran sayuran rebus berkualitas yang dibungkus rapi dalam rice paper, dinikmati bersama saus kacang spesial kami.",
              packaging: "Paper box ramah lingkungan & mudah didaur ulang",
              ingredients: JSON.stringify(["Kacang panjang","Kol","Selada","Tauge","Kentang","Timun","Tahu","Telur","Rice paper"]),
              tags: JSON.stringify(["healthy","vegan-friendly","fresh","no-preservatives"]),
              faq: JSON.stringify([
                { id: "faq-1", question: "Apakah bahan-bahan GoNuts Bites segar?", answer: "Ya! Kami menggunakan 100% sayuran segar tanpa pengawet yang dibeli langsung dari pasar setiap harinya. Karena itu produk kami sebaiknya dikonsumsi di hari yang sama untuk menjaga kualitas dan kesegaran." },
                { id: "faq-2", question: "Berapa jam operasional GoNuts Bites?", answer: "Kami buka Senin – Sabtu, pukul 09.00 – 17.00 WIB. Pesanan di luar jam operasional akan diproses pada hari berikutnya." },
                { id: "faq-3", question: "Bagaimana cara memesan?", answer: "Kamu bisa memesan langsung melalui tombol Pesan Sekarang di halaman produk yang akan mengarahkan kamu ke WhatsApp kami. Pilih porsi (4 pcs atau 6 pcs) dan varian saus (Original/Pedas), lalu konfirmasi pesananmu." },
                { id: "faq-4", question: "Apakah GoNuts Bites melayani pengiriman?", answer: "Saat ini kami melayani pemesanan dan pengambilan di area Pekanbaru. Untuk pertanyaan pengiriman, silakan hubungi kami melalui WhatsApp." },
                { id: "faq-5", question: "Apakah ada pilihan untuk alergi tertentu?", answer: "Produk kami mengandung kacang (pada saus) dan telur. Jika kamu memiliki alergi spesifik, silakan informasikan saat memesan melalui WhatsApp agar kami dapat membantu." },
                { id: "faq-6", question: "Berapa lama produk bisa disimpan?", answer: "GoNuts Bites dibuat segar setiap hari dan sebaiknya dikonsumsi dalam waktu 4–6 jam setelah pembuatan untuk kualitas terbaik. Simpan di tempat sejuk jika belum dikonsumsi." },
              ]),
            },
            options: [
              { title: "Porsi", values: ["4 pcs", "6 pcs"] },
              { title: "Saus", values: ["Original", "Pedas"] },
            ],
            variants: [
              {
                title: "4 pcs – Original",
                sku: "GNB-4PCS-ORI",
                manage_inventory: false,
                options: { Porsi: "4 pcs", Saus: "Original" },
                prices: [{ amount: 12000, currency_code: "idr" }],
              },
              {
                title: "4 pcs – Pedas",
                sku: "GNB-4PCS-PDS",
                manage_inventory: false,
                options: { Porsi: "4 pcs", Saus: "Pedas" },
                prices: [{ amount: 12000, currency_code: "idr" }],
              },
              {
                title: "6 pcs – Original",
                sku: "GNB-6PCS-ORI",
                manage_inventory: false,
                options: { Porsi: "6 pcs", Saus: "Original" },
                prices: [{ amount: 15000, currency_code: "idr" }],
              },
              {
                title: "6 pcs – Pedas",
                sku: "GNB-6PCS-PDS",
                manage_inventory: false,
                options: { Porsi: "6 pcs", Saus: "Pedas" },
                prices: [{ amount: 15000, currency_code: "idr" }],
              },
            ],
          }
        ]
      }
    })

    const product = result[0]
    logger.info(`✅ Product created via workflow: ${product.title} (id: ${product.id})`)
    logger.info(`   Variants & Prices configured successfully!`)

  } else {
    logger.info("⏩ Product Gado-Gado Roll already exists, skipping")
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Shipping Profile & Options (Manual – Area Pekanbaru)
  // ─────────────────────────────────────────────────────────────────────────────
  logger.info("Creating shipping profile and options for Pekanbaru...")

  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({ name: "GoNuts Bites Delivery" })
  let shippingProfile = shippingProfiles[0]

  if (!shippingProfile) {
    shippingProfile = await fulfillmentModuleService.createShippingProfiles({
      name: "GoNuts Bites Delivery",
      type: "default",
    })
    logger.info("✅ Shipping profile created")
  } else {
    logger.info("⏩ Shipping profile already exists, skipping")
  }

  // Cari fulfillment provider "manual"
  const providers = await fulfillmentModuleService.listFulfillmentProviders({ id: ["manual"] })
  const manualProvider = providers[0]

  if (!manualProvider) {
    logger.warn("⚠️  Manual fulfillment provider not found. Ensure medusa-config.ts includes the manual provider, then re-run migrations.")
  } else {
    // Pastikan service zone ada sebelum membuat shipping option
    const serviceZones = await fulfillmentModuleService.listServiceZones({ name: "Pekanbaru" })

    if (serviceZones.length === 0) {
      logger.info("Creating service zone & shipping options for Pekanbaru...")

      const serviceZone = await fulfillmentModuleService.createServiceZones({
        name: "Pekanbaru",
        fulfillment_set_id: shippingProfile.id,
        geo_zones: [
          {
            type: "country",
            country_code: "id",
          },
        ],
      })

      // Opsi 1: Flat Rate Pekanbaru
      await fulfillmentModuleService.createShippingOptions({
        name: "Pengiriman Area Pekanbaru",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: "manual",
        price_type: "flat",
        type: {
          label: "Standard",
          description: "Pengiriman manual area Pekanbaru",
          code: "standard",
        },
        rules: [],
      })

      // Opsi 2: COD
      await fulfillmentModuleService.createShippingOptions({
        name: "COD – Bayar di Tempat (Pekanbaru)",
        service_zone_id: serviceZone.id,
        shipping_profile_id: shippingProfile.id,
        provider_id: "manual",
        price_type: "flat",
        type: {
          label: "COD",
          description: "Bayar di tempat – hanya area Pekanbaru",
          code: "cod",
        },
        rules: [],
      })

      logger.info("✅ Shipping options created (Flat Rate + COD Pekanbaru)")
    } else {
      logger.info("⏩ Service zone Pekanbaru already exists, skipping")
    }
  }

  logger.info("")
  logger.info("🎉 GoNuts Bites seed completed successfully!")
  logger.info("   Produk  : Gado-Gado Roll (4 varian)")
  logger.info("   Region  : Indonesia (IDR)")
  logger.info("   Shipping: Manual Pekanbaru (Flat Rate + COD)")
  logger.info("   Metadata: slogan=Wrap-Dip-Enjoy")
}
