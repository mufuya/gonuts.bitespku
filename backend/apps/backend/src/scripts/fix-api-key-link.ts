/**
 * GoNuts Bites — Fix API Key → Sales Channel Link
 *
 * Jalankan dengan:
 *   npx medusa exec ./src/scripts/fix-api-key-link.ts
 *
 * Masalah: Produk "Gado-Gado Roll" tidak muncul di Store API karena
 * publishable API key belum di-link ke Sales Channel "GoNuts Bites Store".
 *
 * Script ini:
 * 1. Temukan publishable API key yang ada
 * 2. Temukan Sales Channel "GoNuts Bites Store"
 * 3. Link keduanya agar produk GoNuts muncul di frontend
 */

import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { linkSalesChannelsToApiKeyWorkflow } from "@medusajs/medusa/core-flows";

export default async function fixApiKeyLink({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("🔧 Fixing API Key → Sales Channel link for GoNuts Bites...");

  // 1. Temukan semua publishable API keys
  const { data: apiKeys } = await query.graph({
    entity: "api_key",
    fields: ["id", "title", "type"],
  });

  logger.info(`Found ${apiKeys.length} API key(s):`);
  for (const key of apiKeys) {
    logger.info(`  - [${key.type}] ${key.title} (id: ${key.id})`);
  }

  const publishableKeys = apiKeys.filter((k: any) => k.type === "publishable");
  if (publishableKeys.length === 0) {
    logger.error("❌ No publishable API keys found!");
    return;
  }

  // 2. Temukan semua Sales Channels
  const { data: salesChannels } = await query.graph({
    entity: "sales_channel",
    fields: ["id", "name"],
  });

  logger.info(`Found ${salesChannels.length} sales channel(s):`);
  for (const sc of salesChannels) {
    logger.info(`  - ${sc.name} (id: ${sc.id})`);
  }

  // 3. Link SEMUA sales channels ke SEMUA publishable keys
  // (untuk memastikan semua produk visible di store API)
  const salesChannelIds = salesChannels.map((sc: any) => sc.id);

  for (const apiKey of publishableKeys) {
    logger.info(`\nLinking all sales channels to key: "${apiKey.title}" (${apiKey.id})`);
    await linkSalesChannelsToApiKeyWorkflow(container).run({
      input: {
        id: apiKey.id,
        add: salesChannelIds,
      },
    });
    logger.info(`✅ Done!`);
  }

  logger.info("\n🎉 Fix complete! All sales channels are now linked to all publishable API keys.");
  logger.info("   Coba refresh halaman produk di localhost:3001/produk");
}
