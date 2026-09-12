import { z } from 'zod'

/**
 * Single validated entry point for environment variables (spec §16, §28).
 * Never read `import.meta.env` directly elsewhere in the app.
 */
const envSchema = z.object({
  VITE_API_URL: z.url(),
  VITE_DOLIBARR_URL: z.url().optional().or(z.literal('')),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_USE_MOCK: z
    .string()
    .default('true')
    .transform((value) => value === 'true'),
  /** Production origin used for canonical URLs, hreflang, Open Graph, JSON-LD and the sitemap. No trailing slash. */
  VITE_SITE_URL: z.url().optional().or(z.literal('')),
})

const parsed = envSchema.safeParse(import.meta.env)

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`)
}

export const env = parsed.data
