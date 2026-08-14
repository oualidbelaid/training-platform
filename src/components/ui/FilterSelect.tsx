import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

export interface FilterSelectOption {
  value: string
  label: string
}

export interface FilterSelectProps {
  /** Visible label above the trigger — same position as `Input`/`Select`'s `FormField` label. */
  label: string
  value: string
  onChange: (value: string) => void
  /**
   * The full selectable list, in display order. For filters with a "no
   * filter" state (category/format/level), include an explicit
   * `{ value: '', label: t('filters.allCategories') }` entry — unlike the
   * native `<select>`'s disabled placeholder `<option>`, it's a real,
   * clickable row here, so re-selecting it is how a user clears the
   * filter from the dropdown itself. Sort-style filters that always have
   * a real value (no empty state) simply omit an empty-value entry.
   */
  options: FilterSelectOption[]
  /** Fallback trigger text if `value` doesn't match any option (e.g. options still loading). */
  placeholder: string
  disabled?: boolean
  className?: string
}

const ESTIMATED_PANEL_HEIGHT = 260
const VIEWPORT_MARGIN = 12

/**
 * Custom accessible single-select "combobox button + listbox popover"
 * (M3 filter-refinement pass). Replaces the native `<select>` in the
 * Catalog's filter toolbar: a native select's closed box can be restyled
 * with CSS, but its **open** dropdown is rendered by the OS/browser and
 * cannot be — that's the native gray/magenta menu this component exists
 * to eliminate. `Select` (native) is unchanged and still exists for actual
 * form fields (RHF `register()`, OS picker UX on mobile is often
 * preferable there); `FilterSelect` is additive, for controlled
 * filter/toolbar use specifically.
 *
 * Same interaction pattern as `LanguageSwitcher` (kept independent rather
 * than extracted into a shared hook, deliberately — this pass is scoped to
 * the Catalog filters only): `role="listbox"`/`role="option"`, Arrow
 * Up/Down/Home/End rove focus, Escape and outside-click close and return
 * focus to the trigger, and the panel flips to open upward when there
 * isn't enough room below (measured on open).
 */
export function FilterSelect({ label, value, onChange, options, placeholder, disabled, className }: FilterSelectProps) {
  const prefersReducedMotion = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [placement, setPlacement] = useState<'below' | 'above'>('below')
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const listboxId = useId()
  const labelId = useId()

  const selectedIndex = Math.max(0, options.findIndex((option) => option.value === value))
  const selectedLabel = options.find((option) => option.value === value)?.label ?? placeholder

  useEffect(() => {
    if (!open || !triggerRef.current) return
    const rect = triggerRef.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    setPlacement(spaceBelow < ESTIMATED_PANEL_HEIGHT + VIEWPORT_MARGIN ? 'above' : 'below')
  }, [open])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (open) optionRefs.current[selectedIndex]?.focus()
    // Only re-run when the popover opens — refocusing on every value change would steal focus after selection.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function selectOption(optionValue: string) {
    onChange(optionValue)
    setOpen(false)
    triggerRef.current?.focus()
  }

  function handleOptionKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      optionRefs.current[(index + 1) % options.length]?.focus()
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      optionRefs.current[(index - 1 + options.length) % options.length]?.focus()
    } else if (event.key === 'Home') {
      event.preventDefault()
      optionRefs.current[0]?.focus()
    } else if (event.key === 'End') {
      event.preventDefault()
      optionRefs.current[options.length - 1]?.focus()
    } else if (event.key === 'Tab') {
      setOpen(false)
    }
  }

  const panel = (
    <div
      id={listboxId}
      role="listbox"
      aria-labelledby={labelId}
      className={cn(
        'absolute start-0 z-(--z-index-dropdown) w-full min-w-max rounded-lg border border-border bg-surface p-1 shadow-lg',
        placement === 'above' ? 'bottom-full mb-2' : 'top-full mt-2',
      )}
    >
      {options.map((option, index) => {
        const isSelected = option.value === value
        return (
          <button
            key={option.value}
            ref={(node) => {
              optionRefs.current[index] = node
            }}
            type="button"
            role="option"
            aria-selected={isSelected}
            tabIndex={-1}
            onClick={() => selectOption(option.value)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-start text-small transition-colors duration-(--duration-fast)',
              isSelected ? 'text-brand' : 'text-foreground hover:bg-surface-subtle',
            )}
          >
            <span className="truncate">{option.label}</span>
            {isSelected ? <Icon name="check" aria-hidden="true" className="shrink-0 text-small" /> : null}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span id={labelId} className="text-small font-medium text-foreground-muted">
        {label}
      </span>
      <div ref={containerRef} className="relative">
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-labelledby={`${labelId} ${listboxId}-value`}
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 rounded-md border bg-surface px-3 text-body text-neutral-900',
            'transition-colors duration-(--duration-fast)',
            'hover:border-neutral-400',
            'focus-visible:border-primary-500 focus-visible:outline-2 focus-visible:outline-primary-500',
            'disabled:pointer-events-none disabled:opacity-50',
            open ? 'border-primary-500' : 'border-neutral-300',
          )}
        >
          <span id={`${listboxId}-value`} className="truncate">
            {selectedLabel}
          </span>
          <Icon
            name="chevron-down"
            aria-hidden="true"
            className={cn('shrink-0 text-caption text-foreground-faint transition-transform duration-(--duration-fast)', open && 'rotate-180')}
          />
        </button>

        {prefersReducedMotion ? (
          open ? panel : null
        ) : (
          <AnimatePresence>
            {open ? (
              <motion.div
                initial={{ opacity: 0, y: placement === 'above' ? 4 : -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: placement === 'above' ? 4 : -4 }}
                transition={{ duration: 0.15 }}
              >
                {panel}
              </motion.div>
            ) : null}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
