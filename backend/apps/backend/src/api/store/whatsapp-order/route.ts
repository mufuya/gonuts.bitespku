/**
 * GoNuts Bites — Custom API Route
 * POST /store/whatsapp-order
 *
 * Menerima data pesanan dari frontend Next.js dan mengembalikan
 * URL WhatsApp (wa.me) yang sudah terformat dengan rincian pesanan.
 *
 * Request body:
 * {
 *   "items": [
 *     {
 *       "title": "Gado-Gado Roll",
 *       "variant_title": "4 pcs – Original",
 *       "quantity": 2,
 *       "unit_price": 12000
 *     }
 *   ],
 *   "customer_name": "Budi Santoso",       (opsional)
 *   "delivery_address": "Jl. Diponegoro No. 5, Pekanbaru",  (opsional)
 *   "delivery_option": "COD",              (opsional: "COD" | "Standard")
 *   "notes": "Tolong pisahkan sausnya"     (opsional)
 * }
 *
 * Response:
 * {
 *   "whatsapp_url": "https://wa.me/6281261468048?text=...",
 *   "message_preview": "Halo GoNuts Bites, ..."
 * }
 */

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"

interface OrderItem {
  title: string
  variant_title: string
  quantity: number
  unit_price: number
}

interface WhatsAppOrderRequestBody {
  items: OrderItem[]
  customer_name?: string
  delivery_address?: string
  delivery_option?: string
  notes?: string
}

const WHATSAPP_ADMIN = process.env.WHATSAPP_ADMIN_NUMBER || "6281261468048"

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as WhatsAppOrderRequestBody

  // ── Validasi ───────────────────────────────────────────────────────────────
  if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({
      error: "Request body harus berisi field 'items' berupa array yang tidak kosong.",
    })
  }

  for (const item of body.items) {
    if (!item.title || !item.variant_title || !item.quantity || item.unit_price === undefined) {
      return res.status(400).json({
        error: "Setiap item harus memiliki: title, variant_title, quantity, dan unit_price.",
      })
    }
  }

  // ── Susun baris pesanan ───────────────────────────────────────────────────
  const orderLines = body.items
    .map((item) => {
      const subtotal = item.unit_price * item.quantity
      return `• ${item.title} – ${item.variant_title} (${item.quantity}x) = ${formatRupiah(subtotal)}`
    })
    .join("\n")

  const grandTotal = body.items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  )

  // ── Susun pesan WhatsApp ──────────────────────────────────────────────────
  const greetingName = body.customer_name
    ? `, nama saya *${body.customer_name}*`
    : ""

  const deliveryLine = body.delivery_address
    ? `\n📍 *Alamat Pengiriman:* ${body.delivery_address}`
    : ""

  const deliveryOptionLine = body.delivery_option
    ? `\n🚚 *Metode:* ${body.delivery_option}`
    : ""

  const notesLine = body.notes
    ? `\n📝 *Catatan:* ${body.notes}`
    : ""

  const now = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "long",
    timeStyle: "short",
  })

  const message = [
    `Halo GoNuts Bites! 🥜`,
    ``,
    `Saya ingin memesan${greetingName}:`,
    ``,
    `🛒 *Detail Pesanan:*`,
    orderLines,
    ``,
    `💰 *Total:* ${formatRupiah(grandTotal)}`,
    deliveryLine,
    deliveryOptionLine,
    notesLine,
    ``,
    `📅 ${now}`,
    ``,
    `Mohon konfirmasinya, terima kasih! 🙏`,
  ]
    .filter((line) => line !== undefined)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n") // normalisasi baris kosong berlebih

  const whatsappUrl = `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(message)}`

  // ── Log untuk audit ───────────────────────────────────────────────────────
  console.log(`[GoNuts Bites] WhatsApp order generated — ${now}`)
  console.log(`  Customer : ${body.customer_name ?? "Anonymous"}`)
  console.log(`  Items    : ${body.items.length} item(s)`)
  console.log(`  Total    : ${formatRupiah(grandTotal)}`)

  return res.json({
    success: true,
    whatsapp_url: whatsappUrl,
    message_preview: message,
    total: grandTotal,
    total_formatted: formatRupiah(grandTotal),
  })
}
