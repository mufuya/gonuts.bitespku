/**
 * GoNuts Bites — Order Placed Subscriber
 *
 * Mencatat (log) setiap pesanan baru ke terminal sebelum proses 
 * diteruskan ke WhatsApp. Event ini di-trigger oleh Medusa saat
 * sebuah order berhasil dibuat via checkout standar Medusa.
 *
 * Untuk alur WhatsApp-only (tanpa checkout Medusa), gunakan log
 * langsung di API route /store/whatsapp-order.
 */

import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import type { IOrderModuleService } from "@medusajs/framework/types"

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)

  try {
    const order = await orderModuleService.retrieveOrder(data.id, {
      relations: ["items", "shipping_address"],
    })

    const now = new Date().toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      dateStyle: "long",
      timeStyle: "short",
    })

    // ── Log ringkasan pesanan ─────────────────────────────────────────────
    logger.info("═══════════════════════════════════════════════════")
    logger.info("🥜 GoNuts Bites — PESANAN BARU MASUK!")
    logger.info(`   📅 Waktu    : ${now}`)
    logger.info(`   🆔 Order ID : ${order.id}`)
    logger.info(`   👤 Customer : ${order.email ?? "Guest"}`)

    if (order.shipping_address) {
      const addr = order.shipping_address
      logger.info(
        `   📍 Alamat   : ${addr.address_1 ?? ""} ${addr.city ?? ""} ${addr.province ?? ""}`.trim()
      )
    }

    logger.info(`   🛒 Items    :`)
    for (const item of order.items ?? []) {
      const subtotal = (item.unit_price ?? 0) * (item.quantity ?? 0)
      logger.info(
        `      • ${item.title} – ${item.variant_title ?? ""} (${item.quantity}x) = Rp${subtotal.toLocaleString("id-ID")}`
      )
    }

    logger.info(`   💰 Total    : Rp${Number(order.total ?? 0).toLocaleString("id-ID")}`)
    logger.info("   📲 Selanjutnya: teruskan ke WhatsApp Admin")
    logger.info("═══════════════════════════════════════════════════")
  } catch (err) {
    logger.error(`[GoNuts Bites] Gagal memproses event order.placed: ${String(err)}`)
  }
}

// ── Konfigurasi Subscriber ─────────────────────────────────────────────────
export const config: SubscriberConfig = {
  event: "order.placed",
}
