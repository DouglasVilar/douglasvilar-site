# CLAUDE.md — douglasvilar-site

## Project Overview

Personal/professional website for **Douglas Vilar**, a Brazilian lawyer (OAB/PR 47.278) specializing in Real Estate, Business, and Condominium Law. The site serves as a digital portfolio, contact hub, and showcase for his podcasts, lectures, and companies.

- **Live URL**: https://douglasvilar.com.br
- **Hosting**: GitHub Pages (CNAME file configures custom domain)
- **Language**: Brazilian Portuguese (pt-BR)
- **Stack**: Pure HTML5 + CSS3 + Vanilla JavaScript — no frameworks, no build tools, no package manager

---

## Repository Structure

```
/
├── index.html                    # The entire site — HTML, CSS, and JS in one file
├── CNAME                         # GitHub Pages custom domain (douglasvilar.com.br)
├── README.md                     # Minimal description
├── IMG-20250829-WA0004.jpg       # Hero image (PodConfra's studio)
├── 20220720_185959.jpg
├── 20230803_140747.jpg           # About section image (lecture)
├── 20241001_212757.jpg
├── 20241029_210722.jpg
├── 20241205_204727.jpg           # Company tab image (DV team)
├── 20250311_200603(0).jpg        # Company tab image (Lupy)
├── 20250410_181859(0).jpg        # Podcast card image (PodStart)
└── 20251021_114730(1).jpg        # Podcast card image (PodMI)
```

All images live in the root directory alongside `index.html`. Filenames are timestamp-based.

---

## Development Workflow

There is no build step. To work on the site:

1. Edit `index.html` directly
2. Open `index.html` in a browser to preview (no server required for most features)
3. Commit and push to `master` — GitHub Pages auto-deploys

```bash
git add index.html
git commit -m "Description of change"
git push origin master
```

To add images: copy them to the repo root and reference them by filename in `index.html`.

---

## index.html Architecture

The file is structured in three layers — all inside a single `index.html`:

1. **`<head>`** — Meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD, Google Fonts, and all CSS inside `<style>`
2. **`<body>`** — All HTML sections
3. **`<script>`** at the end of `<body>` — All JavaScript

### Page Sections (in order)

| Section | HTML `id` | Class | Description |
|---|---|---|---|
| Header | `header` | `.header` | Fixed nav bar, hamburger menu on mobile |
| Hero | `#home` | `.hero` | Name, title, CTA buttons, social links |
| Stats | _(none)_ | `.stats` | Animated counters (contracts, hearings, etc.) |
| About | `#sobre` | `.about` | Bio, highlights, team info |
| Photo Gallery | `#galeria` | `.gallery` | Grid layout with lightbox |
| OAB Commissions | `#oab` | `.oab-commissions` | Current (2025) and past commission memberships |
| Practice Areas | `#areas` | `.practice-areas` | 6 cards (Imobiliário, Empresarial, Condominial, etc.) |
| Companies | `#empresas` | `.companies` | Tabbed view of 3 companies |
| Podcasts | `#podcasts` | `.podcasts` | Cards for PodStart, PodConfra's, PodMI |
| Free Event | `#evento` | `.lectures` | Inline event promo (styled differently) |
| Lectures | `#palestras` | `.lectures` | Timeline of past talks |
| Testimonials | `#depoimentos` | `.testimonials` | 3 testimonial cards |
| Hire | `#contrate` | `.contrate` | 3 CTA cards for hiring |
| Contact | `#contato` | `.contact` | Address, phone, email, social |
| Footer | _(none)_ | `.footer` | Links + copyright |

---

## CSS Design System

All design tokens are defined as CSS custom properties in `:root`:

### Colors
```css
--color-primary:       #C41E24  /* Main brand red */
--color-primary-dark:  #9B1419
--color-primary-light: #E63946
--color-secondary:     #2D2D2D
--color-bg:            #FFFFFF
--color-bg-alt:        #F5F6F8  /* Used on alternating sections */
--color-bg-dark:       #2D2D2D  /* Footer background */
--color-surface:       #FFFFFF
--color-surface-alt:   #F0F1F3
--color-text:          #2D2D2D
--color-text-light:    #555555
--color-text-lighter:  #888888
--color-border:        #E0E2E6
```

### Typography
```css
--font-display: 'Playfair Display', serif  /* Headings (h1–h6) */
--font-body:    'Montserrat', sans-serif   /* All body text */
```

Heading sizes use `clamp()` for fluid scaling (e.g., `h1: clamp(2.5rem, 5vw, 4rem)`).

### Spacing
```css
--spacing-xs: 0.5rem
--spacing-sm: 1rem
--spacing-md: 2rem
--spacing-lg: 4rem
--spacing-xl: 6rem
```

### Shadows
```css
--shadow-sm:  0 2px 8px rgba(0,0,0,0.06)
--shadow-md:  0 4px 16px rgba(0,0,0,0.08)
--shadow-lg:  0 8px 32px rgba(0,0,0,0.12)
--shadow-xl:  0 12px 48px rgba(0,0,0,0.16)
```

### Border Radii
```css
--radius-sm: 8px
--radius-md: 12px
--radius-lg: 16px
--radius-xl: 24px
```

### Transitions
```css
--transition-fast:   0.2s ease
--transition-medium: 0.3s ease
--transition-slow:   0.5s ease
```

### Layout
```css
--container-width: 1200px
--header-height:   80px  (70px on mobile)
```

### Responsive Breakpoints
```css
@media (max-width: 1024px) { ... }   /* Tablet landscape */
@media (max-width: 768px)  { ... }   /* Tablet portrait / mobile */
@media (max-width: 480px)  { ... }   /* Small mobile */
```

---

## HTML/CSS Conventions

### Section structure
Every content section follows this pattern:
```html
<section class="section-name" id="anchor-id">
    <div class="container">
        <div class="section-header" data-animate>
            <p class="section-label">Label Text</p>
            <h2 class="section-title">Section Title</h2>
            <p class="section-description">Optional subtitle</p>
        </div>
        <!-- Section-specific content -->
    </div>
</section>
```

Alternating sections use `background: var(--color-bg-alt)` for visual separation.

### Buttons
Two button variants using the `.btn` base class:
```html
<a href="..." class="btn btn-primary">Primary Action</a>
<a href="..." class="btn btn-secondary">Secondary Action</a>
```

### Animation
Add `data-animate` attribute to any element that should fade in on scroll:
```html
<div data-animate>...</div>
```
The IntersectionObserver in the `<script>` block handles adding the `.animated` class.

### Animated stat counters
Add `data-target="NUMBER"` to a `.stat-number` element inside a `.stat-item`:
```html
<div class="stat-item" data-animate>
    <div class="stat-number" data-target="16000">0</div>
    <div class="stat-label">Label</div>
</div>
```

### Cards
Most cards follow a hover pattern of `translateY(-5px)` + `box-shadow` elevation. This is applied via `.class-name:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }`.

---

## JavaScript Features

All JS lives in a single `<script>` tag at the bottom of `<body>`. It uses compact/minified style with `const`/`let` and arrow functions.

| Feature | Trigger | Implementation |
|---|---|---|
| Header scroll effect | `window scroll` | Adds `.scrolled` to `#header` when `pageYOffset > 100` |
| Back-to-top button | `window scroll` | Adds `.visible` to `#backToTop` when `pageYOffset > 500` |
| Mobile hamburger | `click` on `#menuToggle` | Toggles `.active` on `#nav` and `#menuToggle`, locks body scroll |
| Smooth scroll | `click` on `a[href^="#"]` | `scrollTo()` with 80px header offset |
| Stat counter animation | IntersectionObserver | Counts from 0 to `data-target` over 2000ms |
| Scroll animations | IntersectionObserver | Adds `.animated` to `[data-animate]` elements at threshold 0.1 |
| Company tabs | `click` on `.tab-btn` | Shows/hides `.tab-panel` by `data-tab` attribute |
| Photo lightbox | `click` on `.gallery-item` | `openLightbox(index)`, keyboard: Escape/←/→ |
| Active nav highlight | `window scroll` | Tracks `section[id]` positions, adds `.active` to matching `.nav-link` |

### Lightbox image array
When adding images to the gallery, the `galleryImages` array in the script must be kept in sync:
```javascript
const galleryImages = [
    'IMG-20250829-WA0004.jpg',
    '20251021_114730(1).jpg',
    // ... (order matches gallery-item onclick index)
];
```

---

## Contact & External Links

| Type | Value |
|---|---|
| WhatsApp | +55 41 98421-6639 |
| Email | douglas@vilar.adv.br |
| Instagram | @douglasvilar |
| LinkedIn | /in/douglas-vilar-2445a53b/ |
| YouTube | @douglasvilaradv |
| Spotify | PodConfra's show |
| Consultation form | Google Forms |
| Lecture booking | Google Forms |
| Podcast application | Google Forms |
| Address | Av. Getúlio Vargas, 1928, Água Verde, Curitiba/PR, CEP 82240-040 |

---

## Companies

| Company | ID | Description |
|---|---|---|
| Douglas Vilar Advogado | CNPJ 43.136.843/0001-22 | Full-service law firm |
| VSM Consultoria | CNPJ 55.569.878/0001-34 | Lectures, training, professional development |
| LUPY Administradora | lupyadm.com.br | Condominium management |

---

## Key Guidelines for AI Assistants

1. **No build tools exist** — do not suggest npm, webpack, vite, or any build system unless refactoring the entire project.
2. **All code is in one file** — when making changes, locate the exact section in `index.html` rather than suggesting new files.
3. **Use CSS custom properties** — never hardcode colors or spacing values; always reference the variables defined in `:root`.
4. **Preserve responsive design** — test changes against all three breakpoints (1024px, 768px, 480px).
5. **Language is Brazilian Portuguese** — all user-facing content must be in pt-BR.
6. **Keep JS compact** — the existing script style uses arrow functions and compact formatting; match that style.
7. **Images in root** — new images should go to the root directory; reference them by filename only (no path prefix).
8. **Section alternation** — maintain the alternating `--color-bg` / `--color-bg-alt` background pattern for readability.
9. **Lightbox sync** — when adding/removing gallery items, update both the HTML `onclick="openLightbox(N)"` index AND the `galleryImages` array in the script.
10. **No inline styles for new features** — use classes and the existing CSS custom properties system; inline `style=""` is only used in the free event section for one-off overrides.
11. **Schema.org data** — the JSON-LD structured data block in `<head>` should be kept up to date when contact info or business details change.
12. **OAB compliance context** — this is a law firm website in Brazil; avoid suggesting any content that could violate OAB advertising regulations (e.g., result guarantees, price comparisons, superlatives about being "the best").
