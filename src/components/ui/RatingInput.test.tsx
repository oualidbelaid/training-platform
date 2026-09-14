import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { RatingInput } from './RatingInput'

const starLabel = (value: number, max: number) => `${value} star out of ${max}`

function ControlledRatingInput({ initial = 0 }: { initial?: number }) {
  const [value, setValue] = useState(initial)
  return <RatingInput value={value} onChange={setValue} label="Your rating" starLabel={starLabel} />
}

describe('RatingInput', () => {
  it('renders 5 stars by default, none checked when value is 0', () => {
    render(<ControlledRatingInput />)

    const stars = screen.getAllByRole('radio')
    expect(stars).toHaveLength(5)
    for (const star of stars) {
      expect(star).toHaveAttribute('aria-checked', 'false')
    }
  })

  it('checks only the clicked star', async () => {
    const user = userEvent.setup()
    render(<ControlledRatingInput />)

    await user.click(screen.getByRole('radio', { name: '3 star out of 5' }))

    expect(screen.getByRole('radio', { name: '3 star out of 5' })).toHaveAttribute(
      'aria-checked',
      'true',
    )
    expect(screen.getByRole('radio', { name: '4 star out of 5' })).toHaveAttribute(
      'aria-checked',
      'false',
    )
  })

  it('is grouped under a single accessible label', () => {
    render(<ControlledRatingInput />)

    expect(screen.getByRole('radiogroup', { name: 'Your rating' })).toBeInTheDocument()
  })

  it('renders the error message with role="alert" when provided', () => {
    render(
      <RatingInput
        value={0}
        onChange={() => {}}
        label="Your rating"
        starLabel={starLabel}
        error="Please select a rating."
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Please select a rating.')
  })

  it('every star remains individually focusable', () => {
    render(<ControlledRatingInput />)

    for (const star of screen.getAllByRole('radio')) {
      expect(star).not.toHaveAttribute('tabindex', '-1')
    }
  })
})
