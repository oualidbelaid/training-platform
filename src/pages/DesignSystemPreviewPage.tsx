import { useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Stack } from '@/components/layout/Stack'
import { Grid } from '@/components/layout/Grid'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Link } from '@/components/ui/Link'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardImage } from '@/components/ui/Card'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { Radio, RadioGroup } from '@/components/ui/Radio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Divider } from '@/components/ui/Divider'
import { Avatar } from '@/components/ui/Avatar'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { TiltCard } from '@/components/motion/TiltCard'
import { FloatingElement } from '@/components/motion/FloatingElement'

const primarySwatches = [
  'bg-primary-50',
  'bg-primary-100',
  'bg-primary-200',
  'bg-primary-300',
  'bg-primary-400',
  'bg-primary-500',
  'bg-primary-600',
  'bg-primary-700',
  'bg-primary-800',
  'bg-primary-900',
  'bg-primary-950',
]

const neutralSwatches = [
  'bg-neutral-50',
  'bg-neutral-100',
  'bg-neutral-200',
  'bg-neutral-300',
  'bg-neutral-400',
  'bg-neutral-500',
  'bg-neutral-600',
  'bg-neutral-700',
  'bg-neutral-800',
  'bg-neutral-900',
  'bg-neutral-950',
]

const accentSwatches = ['bg-accent-400', 'bg-accent-500', 'bg-accent-600']
const semanticSwatches = ['bg-success-600', 'bg-warning-600', 'bg-error-600', 'bg-info-600']

/**
 * Internal component gallery (M1) — not a business page. Exists to QA
 * every Design System primitive across breakpoints, languages/RTL, and
 * prefers-reduced-motion in one place. Deliberately noindex'd.
 */
export default function DesignSystemPreviewPage() {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Seo title="Design System" description="Internal component gallery (M1)." noIndex />
      <Container>
        <Section spacing="sm">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand">
            M1 — internal QA page, not a business page
          </p>
          <h1 className="mt-2 text-display text-foreground">Design System</h1>
        </Section>

        {/* Color */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Tokens" title="Color" />
          <Stack gap="lg" className="mt-8">
            <div>
              <p className="text-small text-foreground-muted">Brand (primary)</p>
              <div className="mt-2 flex overflow-hidden rounded-lg">
                {primarySwatches.map((swatch) => (
                  <div key={swatch} className={`h-12 flex-1 ${swatch}`} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-small text-foreground-muted">Neutral</p>
              <div className="mt-2 flex overflow-hidden rounded-lg">
                {neutralSwatches.map((swatch) => (
                  <div key={swatch} className={`h-12 flex-1 ${swatch}`} />
                ))}
              </div>
            </div>
            <div>
              <p className="text-small text-foreground-muted">Accent &amp; semantic</p>
              <div className="mt-2 flex gap-2">
                {[...accentSwatches, ...semanticSwatches].map((swatch) => (
                  <div key={swatch} className={`h-12 w-16 rounded-md ${swatch}`} />
                ))}
              </div>
            </div>
          </Stack>
        </Section>

        {/* Typography */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Tokens" title="Typography" />
          <Stack gap="sm" className="mt-8">
            <p className="text-display text-foreground">Display — training excellence</p>
            <p className="text-h1 text-foreground">H1 — Leadership programs</p>
            <p className="text-h2 text-foreground">H2 — Project management</p>
            <p className="font-display text-h3 text-foreground">Fraunces (opt-in editorial accent only)</p>
            <p className="text-h3 font-medium text-foreground">H3 — Course details</p>
            <p className="text-body-lg text-foreground">Body large — supporting hero copy sits here.</p>
            <p className="text-body text-foreground">Body — the default paragraph size for content.</p>
            <p className="text-small text-foreground-muted">Small — secondary metadata text.</p>
            <p className="text-caption uppercase tracking-wide text-foreground-faint">
              Caption — eyebrows and labels
            </p>
          </Stack>
        </Section>

        {/* Buttons & Links */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Components" title="Buttons, links & icon buttons" />
          <Stack gap="md" className="mt-8">
            <Stack direction="row" gap="sm" wrap>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" loading={loading} onClick={() => setLoading((v) => !v)}>
                {loading ? 'Loading…' : 'Toggle loading'}
              </Button>
            </Stack>
            <Stack direction="row" gap="sm" className="rounded-lg bg-neutral-900 p-4">
              <Button variant="inverse">Inverse on dark</Button>
              <IconButton aria-label="Close" variant="inverse">
                ×
              </IconButton>
            </Stack>
            <Stack direction="row" gap="md" align="center">
              <Link href="/">Internal link</Link>
              <Link href="https://example.com">External link</Link>
              <IconButton aria-label="Settings" variant="outline">
                ⚙
              </IconButton>
            </Stack>
          </Stack>
        </Section>

        {/* Badges */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Components" title="Badges" />
          <Stack direction="row" gap="sm" wrap className="mt-8">
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
          </Stack>
        </Section>

        {/* Cards */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Components" title="Cards & Glass" />
          <Grid cols={3} className="mt-8">
            <RevealOnScroll>
              <Card>
                <CardImage
                  src="/icons.svg"
                  alt=""
                  className="bg-primary-100 object-contain p-8"
                />
                <CardContent>
                  <p className="text-h3 font-medium text-foreground">Card title</p>
                  <p className="mt-2 text-body text-foreground-muted">
                    Surface, border, radius, shadow and hover depth — the primitive future
                    TrainingCard/TrainerCard components compose.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" variant="outline">
                    Action
                  </Button>
                </CardFooter>
              </Card>
            </RevealOnScroll>

            <RevealOnScroll>
              <TiltCard>
                <Card>
                  <CardContent>
                    <p className="text-h3 font-medium text-foreground">Tilt card</p>
                    <p className="mt-2 text-body text-foreground-muted">
                      Move your cursor over this card — CSS-perspective tilt, not R3F.
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="relative flex h-full min-h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-brand p-6">
                <FloatingElement className="absolute end-6 top-6 h-10 w-10 rounded-full bg-accent-400/80" />
                <GlassPanel className="p-6" tone="dark">
                  <p className="text-h3 font-medium text-neutral-0">Glass panel</p>
                  <p className="mt-1 text-small text-neutral-0/80">Restrained, one signature moment.</p>
                </GlassPanel>
              </div>
            </RevealOnScroll>
          </Grid>
        </Section>

        {/* Forms */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Components" title="Form controls" />
          <Grid cols={2} className="mt-8">
            <Stack gap="lg">
              <Input label="First name" placeholder="Sophie" required />
              <Input label="Email" type="email" placeholder="sophie@example.com" error="Enter a valid email address" />
              <Textarea label="Message" placeholder="How can we help?" hint="Optional — max 2000 characters" />
            </Stack>
            <Stack gap="lg">
              <Select
                label="Training format"
                placeholder="Select a format"
                options={[
                  { value: 'in-person', label: 'In-person' },
                  { value: 'online', label: 'Online' },
                  { value: 'hybrid', label: 'Hybrid' },
                ]}
              />
              <Checkbox label="Send me the brochure by email" />
              <RadioGroup legend="Preferred contact method">
                <Radio name="contact-method" label="Email" defaultChecked />
                <Radio name="contact-method" label="Phone" />
              </RadioGroup>
            </Stack>
          </Grid>
        </Section>

        {/* Misc primitives */}
        <Section spacing="sm">
          <SectionHeading eyebrow="Components" title="Avatar & Divider" />
          <Stack direction="row" gap="lg" align="center" className="mt-8">
            <Avatar name="Claire Dubois" size="lg" />
            <Avatar name="Karim El Amrani" size="md" />
            <Divider orientation="vertical" className="h-12" />
            <p className="text-body text-foreground-muted">Vertical divider — RTL-safe via logical border</p>
          </Stack>
          <Divider className="mt-8" />
        </Section>
      </Container>
    </>
  )
}
