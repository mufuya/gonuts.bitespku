import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // Worker mode: "shared" untuk 1 instance (MVP), "server"/"worker" untuk 2 instance terpisah
    workerMode: (process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server") || "shared",
    // Redis untuk production (Upstash, dsb) — jika tidak di-set, Medusa pakai in-memory (dev only)
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    // Disable admin panel di worker instance (tidak perlu di shared mode)
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: [
    // ─── Fulfillment: Manual Provider (WhatsApp order) ──────────────────────
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/fulfillment-manual",
            id: "manual",
          }
        ]
      }
    },
    // ─── Redis Event Bus (production only) ──────────────────────────────────
    // Aktif hanya jika REDIS_URL di-set. Upstash pakai URL format: rediss://...
    ...(process.env.REDIS_URL ? [
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: {
            redisUrl: process.env.REDIS_URL,
          },
        },
      },
    ] : []),
  ]
})

