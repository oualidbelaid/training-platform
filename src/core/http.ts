import axios, { AxiosError } from 'axios'
import { env } from '@/config/env'

/**
 * Shared HTTP client foundation (spec §27). Every repository that talks to
 * a real backend (e.g. a future DolibarrXRepository) goes through this
 * instance instead of importing axios directly — this is the single place
 * request/response handling, timeouts and auth headers are configured.
 */
export const httpClient = axios.create({
  baseURL: env.VITE_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalized = {
      message: error.message ?? 'Unexpected network error',
      status: error.response?.status,
      code: error.code,
    }
    return Promise.reject(normalized)
  },
)
