import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Accordion } from './Accordion'

const items = [
  { id: 'faq-1', question: 'Question one?', answer: 'Answer one.' },
  { id: 'faq-2', question: 'Question two?', answer: 'Answer two.' },
]

describe('Accordion', () => {
  it('renders every question, closed by default', () => {
    render(<Accordion items={items} />)

    for (const item of items) {
      const details = screen.getByText(item.question).closest('details')
      expect(details).not.toBeNull()
      expect(details).not.toHaveAttribute('open')
    }
  })

  it('opens an item on click, independently of the others', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    await user.click(screen.getByText('Question one?'))

    expect(screen.getByText('Question one?').closest('details')).toHaveAttribute('open')
    expect(screen.getByText('Question two?').closest('details')).not.toHaveAttribute('open')
  })

  it('places every <summary> in the natural tab order', () => {
    render(<Accordion items={items} />)

    for (const item of items) {
      const summary = screen.getByText(item.question)
      expect(summary.tagName).toBe('SUMMARY')
      expect(summary).not.toHaveAttribute('tabindex', '-1')
    }
  })
})
