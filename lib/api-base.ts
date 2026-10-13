// Base URL of the Cloudflare Worker that handles checkout, the Stripe webhook,
// download-link validation, and session status lookups. Baked in at build
// time via NEXT_PUBLIC_API_BASE (see worker/wrangler.toml for the deployed
// Worker's actual URL once known).
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? 'https://kalaseriet-api.workers.dev'
