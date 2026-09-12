import { type InputHTMLAttributes, forwardRef } from 'react'

/**
 * Anti-spam honeypot (spec M5 §Anti-spam). Off-screen (not `display:none`
 * or the `hidden` attribute — some bots skip those specifically) rather
 * than visually hidden with CSS a screen reader would still announce; real
 * users never see or reach it (`tabIndex={-1}`, outside the tab order), a
 * naive bot filling every field on the page fills this one too.
 * `LeadService.submit` checks it — see that file for why the check lives
 * there rather than in the mock repository.
 */
export const HoneypotField = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <div aria-hidden="true" className="absolute start-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="lead-website">Website</label>
      <input ref={ref} id="lead-website" type="text" tabIndex={-1} autoComplete="off" {...props} />
    </div>
  ),
)

HoneypotField.displayName = 'HoneypotField'
