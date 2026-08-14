You are a Senior Software Architect, Senior Frontend Engineer, Senior UI/UX Designer, Design System Architect, Performance Engineer, SEO Specialist, Accessibility Specialist, and Creative Director.

You are responsible for designing and building a production-ready, enterprise-quality professional training website.

This is my first major commercial project and it will also represent my professional portfolio.

Therefore, the final result must not look like a beginner project, a generic React template, or an AI-generated website.

Think and work like a senior team consisting of:

- Product Designer
- UX Designer
- UI Designer
- Frontend Architect
- React Engineer
- Performance Engineer
- SEO Specialist
- Accessibility Specialist
- Security Engineer

==========================================================
1. PROJECT VISION
==========================================================

Build a premium professional Training & Learning website for a training company.

The website should be inspired by the quality, structure and professionalism of companies such as:

- Cegos
- Apple
- Stripe
- Linear
- Framer
- Vercel
- Awwwards-quality websites

IMPORTANT:

Do NOT copy the design of Cegos.

Use it only as inspiration for professionalism, structure, training presentation and user experience.

The website must have its own unique visual identity.

The primary purpose of the website is:

- Present professional training programs
- Help visitors discover training courses
- Build trust
- Present the company professionally
- Generate qualified leads
- Allow visitors to request information
- Allow visitors to request a quote
- Allow visitors to contact the company
- Allow visitors to register their interest in a training course

This is NOT an e-commerce website.

==========================================================
2. IMPORTANT BUSINESS RULES
==========================================================

There is NO:

- Login page
- User authentication
- User dashboard
- Shopping cart
- Checkout
- Wishlist
- Customer account area

The website is primarily a professional showcase and lead-generation platform.

Users should NOT purchase courses directly through a shopping cart.

Instead, users should be able to:

- Request information
- Request a quote
- Register their interest
- Contact an advisor
- Contact the company
- Request a consultation
- Submit their professional information
- Ask about a specific training
- Request a brochure

The conversion strategy should be based on contact and lead generation.

==========================================================
3. TARGET AUDIENCE
==========================================================

The website targets:

- Professionals
- Employees
- Managers
- HR departments
- Companies
- Organizations
- Training managers
- Decision makers
- Individuals looking for professional training

The visual identity must communicate:

- Professionalism
- Trust
- Expertise
- Innovation
- Quality
- Modernity
- Corporate credibility

==========================================================
4. TECHNOLOGY STACK
==========================================================

Use:

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Axios
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui
- Framer Motion
- GSAP
- GSAP ScrollTrigger
- i18next
- react-i18next
- React Helmet / React Helmet Async
- ESLint
- Prettier
- Husky
- Vitest

For advanced 3D scenes, use:

- React Three Fiber
- Drei

However, only use React Three Fiber when a real 3D experience adds value.

Do not add heavy 3D unnecessarily.

==========================================================
5. ARCHITECTURE
==========================================================

Use a clean, scalable and feature-oriented architecture.

The project must be easy to understand and maintain.

Suggested structure:

src/

    app/

    assets/

    components/

    config/

    constants/

    core/

    features/

    hooks/

    i18n/

    layouts/

    lib/

    mocks/

    pages/

    providers/

    repositories/

    routes/

    services/

    store/

    styles/

    types/

    utils/

Each folder must have a clear responsibility.

Avoid random files.

Avoid huge files.

Avoid components containing too much business logic.

Separate:

- UI
- Business logic
- Data access
- API communication
- State management
- Validation
- Types
- Configuration

Use reusable components.

Use feature-based organization where appropriate.

==========================================================
6. CLEAN ARCHITECTURE
==========================================================

The UI must never directly depend on Dolibarr.

Use:

UI

↓

Hooks

↓

Services

↓

Repositories

↓

Data Source

Initially:

Mock Repository

Later:

Dolibarr Repository

Architecture example:

components/
features/
services/
repositories/
mocks/

The UI must remain unchanged when switching from Mock API to Dolibarr.

==========================================================
7. DESIGN SYSTEM
==========================================================

Create ONE centralized Design System.

The entire website must use the same design language.

Define:

- Color tokens
- Typography
- Font sizes
- Font weights
- Line heights
- Spacing
- Border radius
- Shadows
- Elevation
- Breakpoints
- Containers
- Grid system
- Buttons
- Inputs
- Forms
- Cards
- Badges
- Modals
- Dropdowns
- Tabs
- Tooltips
- Toasts
- Navigation
- Icons
- Animation timings
- Easing functions

Do NOT hardcode random colors throughout components.

Do NOT create inconsistent spacing.

Everything should use reusable design tokens.

==========================================================
8. VISUAL IDENTITY
==========================================================

The design must feel:

- Premium
- Corporate
- Elegant
- Modern
- Innovative
- Professional
- Memorable

Avoid:

- Generic Bootstrap-like layouts
- Generic AI templates
- Excessive rounded cards
- Excessive gradients
- Excessive glassmorphism
- Excessive animations
- Poor typography
- Crowded sections
- Random colors
- Visual noise

Use:

- Strong typography
- Large headlines
- Generous whitespace
- Beautiful composition
- Editorial layouts
- Visual hierarchy
- Premium cards
- High-quality imagery
- Professional iconography
- Carefully designed CTAs
- Elegant section transitions

The design should immediately feel like a serious professional training company.

==========================================================
9. FIRST IMPRESSION
==========================================================

The first 5 seconds are extremely important.

The homepage Hero must immediately communicate:

What the company does.

Who it serves.

Why it is different.

What the visitor should do next.

The Hero should have:

- Strong headline
- Supporting text
- Primary CTA
- Secondary CTA
- Visual element
- Subtle animation
- Premium composition

Example CTA concepts:

"Explore our training"

"Find your training"

"Request information"

"Contact an advisor"

Do not use generic CTA placement.

==========================================================
10. PREMIUM 3D EXPERIENCE
==========================================================

Create a premium 3D browsing experience.

Use 3D carefully.

The purpose is to create depth and premium perception, not to distract users.

Possible effects:

- 3D hero objects
- Perspective cards
- Mouse parallax
- Layered depth
- Floating elements
- 3D card tilt
- Perspective transformations
- Floating geometric shapes
- Depth-based transitions
- Interactive visual elements
- Animated gradients
- Blur transitions
- Light effects
- Subtle particle systems

Use React Three Fiber / Drei only when appropriate.

Use CSS 3D transforms for simpler effects.

All 3D elements must have fallbacks.

==========================================================
11. ADVANCED SCROLL EXPERIENCE
==========================================================

Create a premium scrolling experience.

Use:

- Smooth scrolling
- Scroll-triggered animations
- Reveal animations
- Parallax
- Sticky sections
- Horizontal scrolling sections where appropriate
- Scroll progress indicator
- Section transitions
- Image scaling
- Text reveal
- Staggered animations
- Depth transitions
- 3D transforms
- Background movement

Use:

Framer Motion for normal UI animations.

GSAP + ScrollTrigger for advanced scroll choreography.

Do not use GSAP everywhere.

Choose the correct tool for each situation.

==========================================================
12. ANIMATION PHILOSOPHY
==========================================================

Animations must feel:

- Smooth
- Premium
- Natural
- Intentional
- Fast
- Elegant

Animations must never hurt usability.

Do not animate everything.

Every animation must have a purpose.

Prioritize:

1. UX
2. Performance
3. Accessibility
4. Readability
5. Visual quality

The website should feel premium, not distracting.

Respect:

prefers-reduced-motion

==========================================================
13. RESPONSIVE DESIGN
==========================================================

The website must be fully responsive.

Support:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop
- Ultra-wide screens

Do not simply shrink the desktop design.

Design mobile layouts intentionally.

Check:

- Navigation
- Hero
- Cards
- Forms
- Typography
- Images
- Spacing
- Tables
- Animations
- 3D
- Footer

on every breakpoint.

==========================================================
14. MOBILE EXPERIENCE
==========================================================

Mobile is a first-class experience.

Create:

- Mobile navigation
- Mobile menu
- Touch-friendly buttons
- Proper spacing
- Optimized images
- Reduced animation complexity
- Reduced 3D complexity
- Fast loading

Do not overload mobile devices with heavy effects.

==========================================================
15. INTERNATIONALIZATION
==========================================================

The website must support:

French

English

Arabic

French:

LTR

English:

LTR

Arabic:

RTL

The architecture must allow adding more languages later.

Use i18next.

Never hardcode user-facing text inside components.

All text must come from translation resources.

Structure:

i18n/

    locales/

        fr/

        en/

        ar/

Implement:

- Language switcher
- RTL support
- LTR support
- Direction-aware layouts
- Direction-aware icons
- Direction-aware animations
- Localized metadata
- Localized navigation
- Localized forms
- Localized validation messages

==========================================================
16. PAGES
==========================================================

Create the following pages:

HOME

TRAINING CATALOG

TRAINING DETAILS

TRAINING CATEGORIES

INDUSTRIES

SOLUTIONS FOR COMPANIES

ABOUT US

OUR TRAINERS

TESTIMONIALS

PARTNERS

SUCCESS STORIES

EVENTS

NEWS & ARTICLES

FAQ

SEARCH RESULTS

CONTACT

REQUEST INFORMATION

REQUEST A QUOTE

REGISTRATION / INTEREST FORM

LEGAL NOTICE

PRIVACY POLICY

COOKIE POLICY

404

==========================================================
17. HOME PAGE
==========================================================

Create a highly polished homepage.

Suggested sections:

Hero

Trust indicators

Featured training programs

Training categories

Why choose us

Company statistics

Corporate training solutions

Popular training programs

Learning methodology

Our trainers

Testimonials

Success stories

Partners / clients

Events

Latest articles

FAQ

Final CTA

Footer

Do not blindly follow this order.

Use UX reasoning to determine the best storytelling sequence.

==========================================================
18. TRAINING CATALOG
==========================================================

Create a professional training catalog.

Features:

- Search
- Categories
- Filters
- Sorting
- Pagination
- Featured courses
- Course cards
- Duration
- Level
- Format
- Category
- Target audience
- CTA

Example formats:

- In-person
- Online
- Hybrid

Make filtering intuitive.

==========================================================
19. TRAINING DETAILS
==========================================================

Each training page should include:

- Title
- Subtitle
- Description
- Objectives
- Target audience
- Prerequisites
- Program
- Duration
- Format
- Trainer
- Dates
- Location
- Related trainings
- Testimonials
- FAQ
- Brochure CTA
- Request information CTA
- Request quote CTA
- Registration interest CTA

Do NOT add Add-to-Cart.

Do NOT add checkout.

==========================================================
20. LEAD GENERATION
==========================================================

The website must be optimized for lead generation.

Create elegant forms for:

Request Information

Request a Quote

Contact Us

Register Interest

Book a Consultation

Speak with an Advisor

Download Brochure

Forms should collect only useful information.

Possible fields:

- First name
- Last name
- Email
- Phone
- Company
- Job title
- Training
- Message

Use React Hook Form + Zod.

Validate everything.

Provide clear validation messages.

Provide loading states.

Provide success states.

Provide error states.

==========================================================
21. CONTACT EXPERIENCE
==========================================================

Make contacting the company extremely easy.

Include:

- Contact form
- Phone
- Email
- Location
- Map
- Business hours
- WhatsApp CTA where appropriate
- Social links

Create a floating contact button on mobile where useful.

==========================================================
22. NAVIGATION
==========================================================

Create a premium navigation system.

Desktop:

Mega Menu where appropriate.

Mobile:

Professional drawer/menu.

Navigation must remain simple.

Do not overwhelm users.

Use:

- Sticky header
- Scroll-aware header
- Transparent hero state
- Solid state after scrolling
- Smooth transitions

==========================================================
23. COMPONENT LIBRARY
==========================================================

Create reusable components.

Examples:

Navbar

MegaMenu

Footer

Hero

Section

Container

Button

Card

TrainingCard

TrainerCard

PartnerLogo

Testimonial

Statistics

FAQ

SearchBar

Filter

Pagination

Breadcrumb

Modal

Drawer

Toast

Form

Input

Select

Textarea

DatePicker

CTA

Newsletter

Skeleton

EmptyState

ErrorState

LoadingState

==========================================================
24. MOCK DATA
==========================================================

The application must work completely without Dolibarr.

Create realistic mock data.

Include:

- Trainings
- Categories
- Trainers
- Companies
- Testimonials
- Events
- Articles
- FAQs
- Locations
- Training sessions

Use realistic French / English / Arabic content structures.

Do not use meaningless lorem ipsum everywhere.

==========================================================
25. DATA ARCHITECTURE
==========================================================

Use:

DTOs

Entities / Models

Repositories

Services

Mappers

Hooks

Mock data

API clients

Example:

TrainingRepository

MockTrainingRepository

DolibarrTrainingRepository

TrainingService

useTrainings()

useTraining(id)

The UI must only consume services/hooks.

==========================================================
26. DOLIBARR INTEGRATION
==========================================================

The final system will consume data from Dolibarr ERP.

Do NOT tightly couple the frontend to Dolibarr.

Create a dedicated integration layer.

Architecture:

React

↓

Hooks

↓

Services

↓

Repository

↓

Dolibarr API

Dolibarr will eventually provide data for:

- Trainings
- Training sessions
- Customers
- Companies
- Contacts
- Trainers
- Events
- Requests
- Leads
- Quotes

Initially use Mock repositories.

Later replace them with Dolibarr repositories.

The UI should require little or no modification.

==========================================================
27. API LAYER
==========================================================

Use Axios or an appropriate HTTP client.

Create:

API Client

Request interceptors

Response handling

Error handling

Timeout handling

Environment configuration

API types

DTOs

Mappers

Repositories

Do not expose secrets in the frontend.

==========================================================
28. ENVIRONMENT CONFIGURATION
==========================================================

Use environment variables.

Example:

VITE_API_URL

VITE_DOLIBARR_URL

VITE_APP_ENV

Never hardcode:

API URLs

Secrets

Tokens

Credentials

Environment-specific configuration

==========================================================
29. SECURITY
==========================================================

Apply production security best practices.

Protect against:

XSS

Unsafe HTML

Injection through user-generated content

Sensitive data exposure

Bad URL handling

Improper form validation

Never store secrets in frontend code.

Never expose private API keys.

Validate all external data.

Sanitize content when necessary.

==========================================================
30. ERROR HANDLING
==========================================================

Create:

Global Error Boundary

API Error handling

404

Network error

Empty states

Loading states

Form errors

Server errors

User-friendly error messages

Never leave users with a blank screen.

==========================================================
31. ACCESSIBILITY
==========================================================

Follow WCAG principles.

Include:

Semantic HTML

Keyboard navigation

Focus states

ARIA where necessary

Proper labels

Accessible forms

Color contrast

Screen reader support

Reduced motion support

Accessible navigation

Accessible dialogs

Accessible buttons

==========================================================
32. SEO
==========================================================

The website must be SEO-ready.

Implement:

Dynamic page titles

Meta descriptions

Open Graph

Twitter cards

Canonical URLs

Structured data

Schema.org

Organization schema

Course schema where appropriate

Breadcrumb schema

Article schema

Sitemap

Robots.txt

Semantic HTML

Localized metadata

Clean URLs

==========================================================
33. PERFORMANCE
==========================================================

Performance is critical.

Target:

Lighthouse Performance > 90

Optimize:

Images

Fonts

JavaScript

CSS

Animations

3D

API calls

Rendering

Use:

Lazy loading

Code splitting

Dynamic imports

Memoization only when useful

Image optimization

Caching

Prefetching where useful

Do not blindly optimize everything.

Measure before optimizing.

==========================================================
34. 3D PERFORMANCE
==========================================================

3D effects must degrade gracefully.

On mobile or low-power devices:

Reduce

- Particle count
- 3D complexity
- Animation frequency
- Blur
- Parallax

Respect:

prefers-reduced-motion

Never allow 3D to block page usability.

==========================================================
35. FORMS
==========================================================

All forms must use:

React Hook Form

Zod

Reusable form components

Validation schemas

Loading states

Success states

Error states

Accessible labels

Clear feedback

Avoid unnecessary fields.

==========================================================
36. STATE MANAGEMENT
==========================================================

Use Zustand only for real global state.

Use TanStack Query for server state.

Do not put everything into Zustand.

Keep local state local.

==========================================================
37. CACHING
==========================================================

Use TanStack Query for:

Training data

Categories

Trainers

Articles

Events

Testimonials

Configure:

staleTime

cacheTime / gcTime

retry

prefetching

where appropriate.

==========================================================
38. CODE QUALITY
==========================================================

Follow:

SOLID

DRY

KISS

Clean Code

Separation of Concerns

Single Responsibility

Composition over inheritance

Strong typing

Avoid any whenever possible.

No unnecessary abstractions.

No huge components.

No duplicated business logic.

==========================================================
39. TYPESCRIPT
==========================================================

Use strict TypeScript.

Avoid:

any

unknown without validation

implicit types

unsafe casts

Use:

interfaces

types

generics

DTOs

schemas

type guards

==========================================================
40. NAMING
==========================================================

Use consistent naming.

Components:

PascalCase

Hooks:

useSomething

Functions:

camelCase

Constants:

UPPER_SNAKE_CASE where appropriate

Files should follow a consistent convention.

==========================================================
41. DOCUMENTATION
==========================================================

Create:

/docs

PROJECT_RULES.md

ARCHITECTURE.md

ROADMAP.md

DESIGN_SYSTEM.md

COMPONENT_GUIDE.md

API_GUIDE.md

DOLIBARR_GUIDE.md

CODING_STANDARDS.md

RESPONSIVE_GUIDE.md

SEO_GUIDE.md

ACCESSIBILITY.md

TRANSLATION_GUIDE.md

ANIMATION_GUIDE.md

These documents are permanent project references.

==========================================================
42. CLAUDE CODE CONTEXT
==========================================================

Create a root-level:

CLAUDE.md

This file must contain the essential permanent project rules.

Every future development session must read:

CLAUDE.md

and the relevant files inside:

/docs

before modifying the project.

Never violate documented architecture without explicitly explaining why.

==========================================================
43. GIT
==========================================================

Prepare professional Git conventions.

Use meaningful commits.

Examples:

feat:

fix:

refactor:

style:

docs:

perf:

test:

chore:

Do not commit:

.env

secrets

credentials

build artifacts

==========================================================
44. TESTING
==========================================================

Use Vitest.

Create tests for important:

- Utilities
- Validation schemas
- Services
- Repositories
- Critical components
- Business logic

Focus testing on important behavior.

==========================================================
45. UI STATES
==========================================================

Every data-driven component should handle:

Loading

Success

Empty

Error

Partial data

Slow network

Mobile

Desktop

==========================================================
46. IMAGE AND MEDIA STRATEGY
==========================================================

Use optimized images.

Do not use huge images unnecessarily.

Use responsive images.

Provide alt text.

Use lazy loading.

Create graceful fallbacks.

==========================================================
47. CONTENT STRATEGY
==========================================================

The website must not look like a technical demo.

Use realistic professional training content.

Use professional copy.

Avoid excessive Lorem Ipsum.

Create meaningful:

Headlines

Subtitles

Descriptions

CTA

Training descriptions

Testimonials

Company information

==========================================================
48. UX PRINCIPLES
==========================================================

Always prioritize:

Clarity

Trust

Discoverability

Accessibility

Speed

Conversion

Consistency

Simplicity

The visitor should always understand:

Where am I?

What can I do?

What happens next?

==========================================================
49. NO E-COMMERCE
==========================================================

Absolutely do NOT create:

Shopping Cart

Checkout

Online payment

Wishlist

Customer dashboard

Login

User account

Instead use:

Contact

Request Information

Request Quote

Register Interest

Consultation

==========================================================
50. DEVELOPMENT PROCESS
==========================================================

Do NOT generate the entire project at once.

Work in controlled milestones.

Before implementing a milestone:

1. Read CLAUDE.md
2. Read relevant /docs files
3. Analyze dependencies
4. Explain the plan
5. Implement
6. Run tests
7. Run lint
8. Check TypeScript
9. Review responsive behavior
10. Review accessibility
11. Review performance
12. Update documentation

Never silently change architectural decisions.

==========================================================
51. INITIAL PROJECT PHASE
==========================================================

At the beginning:

DO NOT create application pages.

DO NOT create random components.

DO NOT start coding immediately.

First:

1. Analyze this entire specification.
2. Identify ambiguities.
3. Identify missing business requirements.
4. Propose the final architecture.
5. Propose the final folder structure.
6. Propose the design direction.
7. Propose the development roadmap.
8. Explain how Mock API will transition to Dolibarr.
9. Explain the i18n architecture.
10. Explain the 3D / animation architecture.
11. Explain performance strategy.

Then wait for approval.

==========================================================
52. IMPORTANT DEVELOPMENT RULE
==========================================================

Do not make assumptions that could affect the architecture.

If a requirement is ambiguous and materially affects implementation, ask before coding.

For minor implementation details, make reasonable professional decisions.

==========================================================
53. FINAL QUALITY STANDARD
==========================================================

The final website must look like:

A premium international training company website.

It must NOT look like:

- A student project
- A generic React template
- A Bootstrap website
- An AI-generated template
- An e-commerce store

It must feel:

Premium

Professional

Modern

Fast

Trustworthy

Innovative

Elegant

Memorable

Accessible

Responsive

SEO-ready

Production-ready

Scalable

Maintainable

==========================================================
54. FIRST TASK
==========================================================

Do NOT write application code yet.

First analyze this entire specification.

Then provide:

1. Architecture proposal

2. Folder structure proposal

3. Design direction

4. Design system proposal

5. Page architecture

6. Component architecture

7. Mock API architecture

8. Dolibarr integration architecture

9. i18n architecture

10. 3D / animation architecture

11. Security strategy

12. SEO strategy

13. Accessibility strategy

14. Performance strategy

15. Testing strategy

16. Development roadmap

17. Potential risks

18. Questions that require clarification

Do not implement anything until this analysis is complete and approved.