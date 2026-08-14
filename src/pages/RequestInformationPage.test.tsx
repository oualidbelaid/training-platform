import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import i18n, { defaultLanguage } from '@/i18n'
import { SIMULATE_FAILURE_EMAIL } from '@/repositories/lead/mock-lead.repository'
import RequestInformationPage from './RequestInformationPage'

function renderPage(initialEntries: string[] = ['/request-information']) {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } })
  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </QueryClientProvider>
    )
  }
  return render(<RequestInformationPage />, { wrapper: Wrapper })
}

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>, email = 'jane.doe@example.com') {
  await user.type(screen.getByLabelText(/prénom/i), 'Jane')
  await user.type(screen.getByLabelText(/^nom\b/i), 'Doe')
  await user.type(screen.getByLabelText(/e-mail professionnel/i), email)
  await user.click(screen.getByLabelText(/j'accepte/i))
}

describe('RequestInformationPage', () => {
  beforeEach(async () => {
    await i18n.changeLanguage(defaultLanguage)
  })

  afterEach(async () => {
    await i18n.changeLanguage(defaultLanguage)
  })

  it('shows validation errors and does not submit when required fields are empty', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: /envoyer la demande/i }))

    expect(await screen.findAllByRole('alert')).not.toHaveLength(0)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('preselects the training from the ?training=<slug> query param', async () => {
    renderPage(['/request-information?training=leadership-nouveaux-managers'])

    await waitFor(() => {
      const select = screen.getByLabelText(/formation concernée/i) as HTMLSelectElement
      expect(select.value).not.toBe('')
    })
  })

  it('shows a success confirmation after a valid submission', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillRequiredFields(user)
    await user.click(screen.getByRole('button', { name: /envoyer la demande/i }))

    const success = await screen.findByRole('status', {}, { timeout: 3000 })
    expect(within(success).getByText(/merci pour votre demande/i)).toBeInTheDocument()
  })

  it('shows a retryable error state on submission failure, keeping entered data', async () => {
    const user = userEvent.setup()
    renderPage()

    await fillRequiredFields(user, SIMULATE_FAILURE_EMAIL)
    await user.click(screen.getByRole('button', { name: /envoyer la demande/i }))

    expect(await screen.findByRole('button', { name: /réessayer/i }, { timeout: 3000 })).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail professionnel/i)).toHaveValue(SIMULATE_FAILURE_EMAIL)
  })
})
