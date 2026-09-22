# DESIGN-SPEC — davidecattaneo.it (home, IT locale)

Captured with Playwright (Chromium headless, 1440×900 desktop + 390×844 mobile), computed styles + stylesheet rules. Values at 1440 px unless noted. `vh` below = `--v-height` = `100svh` (900 px in capture).

Stack signals: Next.js (pages router), Tailwind v4 tokens, Lenis smooth scroll (`html.lenis`), GSAP ScrollTrigger (`.pin-spacer` wrappers), SplitText-style char/word spans, `<canvas>` data-viz, CookieConsent v3 (`#cc-main`). Credits: Studio Zerotredici.

---

## 1. Global system

### 1.1 Colors (tokens)
| Token | Hex | Use |
|---|---|---|
| `--color-black` | `#000000` | Hero background |
| `--color-dark-black` | `#0c0c0c` | Loader background |
| `--color-deep-black` | `#11120d` | Body bg, data-viz, services, dark text on light |
| `--color-smoke-black` | `#181914` | Call section bg, text on light sections |
| `--color-silver` | `#a3a3a3` | Stat labels (case pages) |
| `--color-smoke-white` | `#f7f7f7` | Light section bg (About, Case histories), text on dark |
| `--color-white` | `#ffffff` | Nav text, menu panel bg |
| `--color-tech-green` | `#51e076` | Single accent: highlights, pins, icons, menu hover fills, About panel |
| hover green | `#22bf4c` | `.button--icon:hover` border |

Opacity tiers used as color: 0.1 (row dividers), 0.15 (card borders/labels), 0.2 (media borders), 0.3 (idle case rows), 0.35 (menu button dashed border), 0.5 (secondary text, `em` in hero, loader labels, footer links), 0.6 (nav-spy idle), 0.8 (nav-spy hover), 0.9 (canvas veil).
Glow: `text-shadow: 0 0 10px rgba(81,224,118,.92)` on green words; `box-shadow: 0 0 9px rgba(81,224,118,.5)` on green pins/dots.

### 1.2 Typography
Families:
- **Sans:** `neue-haas-grotesk-display` (Adobe Fonts) → ui-sans-serif. All display & body.
- **Mono:** `basicallyAMono`. All eyebrows, labels, indexes in brackets, legal links, contact values. Always uppercase.

Fluid scale — every size is `clamp(min, min + Δ·((100vw − 402px)/1518), max)` i.e. linear from 402 px → 1920 px viewport:

| Class | Range (402→1920) | @1440 | Weight | Line-height | Use |
|---|---|---|---|---|---|
| `t-3xl` | 75 → 145 | ~123 px | 450 | 1.1 | Case page hero titles |
| `t-2xl` | 40 → 88 | 72.8 px | 450 | 1.1 (80.1 px) | H1 hero, section titles, call title |
| `t-half-xl` | 40 → 63 | ~56 px | 450 | 1.15 | — |
| `t-xl` | 25 → 45 | 38.7 px | 450 | 1.15 (44.5 px) | About statement, menu/footer nav items, case row titles |
| `t-2lg` | 36 → 40 | 38.7 px | 450 | 1.15 | Service card titles, data-viz center title |
| `t-lg` | 18 → 32 | 27.6 px | 450 (hero desc 350) | 1.15 (31.7 px) | Hero description, data-viz caption |
| `t-md` | 15 → 20 | 18.4 px | 450 | 1.4 (25.8 px) | Paragraph copy |
| `t-sm` | 13 → 17 | 15.7 px | 450 | 1.4 | Footer label |
| `t-eye-sm` | 13 → 17 | 15.7 px | 700 mono | 1 | Case row year/type |
| `t-xs` | 11 px | — | 450 | 1.4 | Legal |
| `t-eye-xs` | 11 px | — | 700 mono | 1 | "SCROLLA PER ESPLORARE" |
| misc | 13 px / 300 | | light | 1 | Menu info titles ("Connect") |
| misc | 10 px mono | | 400 | 1 | Menu info values |
| misc | 9 px mono bold | | 700 | 1.5 | Service card `[001]` label |
| Marquee | `10.573vw` | 152 px | 400 | 1.5 | Footer "Lavora con me" |

Weights present: 300, 350, 400, 450 (dominant display weight), 700 (mono only).
Letter-spacing: `normal` everywhere (no tracking adjustments). Body base 16/24.
Text-transform: uppercase only on mono.

### 1.3 Spacing
- Base unit `--spacing: .25rem` (4 px); values are multiples, commonly: 10, 12, 14, 20, 24, 28, 36, 40, 48, 56, 64, 96, 176 px.
- `--padding`: fluid 20 → 60 px (47.35 px @1440). Global page gutter; also used as section inner padding.
- `--padding-lg`: 20 → 120 px.
- Vertical rhythm is expressed in **viewport fractions** rather than px: `vh × .07/.1/.1176/.28/.091/.0852`, pin lengths in multiples of vh (1.5, 2.5, 7.5).
- Paddings on grid: 3.25% viewport side offset for nav-spy and case hero infos (≈47 px, matches `--padding`).

### 1.4 Grid & containers
- No centered max-width wrapper on the home page: sections are full-bleed 100vw with `--padding` gutters (content width = 100vw − 2·47 = 1345 px @1440). Several sections report `max-width: 1440px`.
- Tailwind `.container` breakpoints exist (40/48/64/80/96 rem) but not used for layout here.
- Text measure caps: `--container-sm` 384 px (call text), `--container-lg` 512 px (data-viz titles), `30em` (services text ≈ 552 px), `10em` (services title), `75%` (hero title), `80%` (about title).
- Layouts are flex `space-between` pairs: **big title left / small paragraph right-aligned right**. This pairing repeats in Services head, Case histories head, Hero (description top-right, title bottom-left).
- Only true grid: Services cards `repeat(3, 1fr)` gap 48 px (2 cols at tablet, 1 col mobile).
- Breakpoints: 40rem (640), 48rem (768 — desktop layout switch), 64rem, 80rem, 96rem (1536 — nav offsets increase).

### 1.5 Radii & borders
- Radius: **5 px** everywhere interactive (menu button, menu panel, nav-spy, buttons, green fill of toggle). Everything else 0 (cards, media, rows are square).
- Borders: characteristically **1 px dashed** (menu button 0.8 px dashed white/35%, menu panel dashed green, service cards dashed 15%, case row separators 2 px dashed 10%, primary button dashed deep-black, case info dividers dashed 30%). Solid 1 px only on service media frame and label.
- Pins: 8×8 px green squares with glow placed at −6 px on all four corners of service cards; loader has 4 identical dots at 54 px / 64 px from viewport corners.

### 1.6 Easing & timing tokens
`--ease-power4: cubic-bezier(.215,.61,.355,1)` (default for UI), plus elastic, snappy, cubic-snap, bounce, soft, snap. Durations: 0.3 s (opacity), 0.34–0.42 s (icon slide / toggle), 0.64 s (fills, dividers). Stagger delays 0.2 s / 0.22 s / 0.4 s / 0.5 s / 0.64 s.

### 1.7 Z-index layers
loader 100 · nav 90 · menu 89 · menu backdrop 88 · nav-spy 85 · about/services 20 · data-viz 10 · hero 9 · footer 8 (fixed underneath, revealed at end).

---

## 2. Page structure & section order (scroll timeline)

Total document height ≈ **16 898 px ≈ 18.8 vh** at 900 px viewport.

| # | Section | Doc range (px) | Scroll length | Behavior |
|---|---|---|---|---|
| 0 | Loader | fixed overlay | on load | Intro, then removed |
| 1 | Hero `header.main-hero` | 0 – 900 | 1 vh | Pinned (pin-spacer), black |
| 2 | About intro `.about-section` | 900 – 3150 | 2.5 vh | Pinned; green panel + light pixel grid |
| 3 | Data-viz `.data-viz-section` | 3150 – 9900 | 7.5 vh (`min(10000px, 750svh)`) | Pinned full-screen canvas story |
| 4 | Services `.services-section` | 9900 – 12248 | ~2.6 vh | Pixel pattern transition then card grid |
| 5 | Case histories `.case-histories` | 12698 – 13598 | 1 vh + 176 px | Light list, overlaps services tail |
| 6 | Call to action `.call-section` | 13598 – 15998 | pin 2.67 vh (1500 px pad) | Pinned, centered CTA |
| 7 | Footer `.footer` | fixed | last 1 vh | Fixed behind content, revealed as call section scrolls away |

Persistent overlays: navbar (fixed top), nav-spy (fixed bottom-left, desktop ≥768), menu panel (fixed top-right, on demand), cookie banner.

`.js-section-spy` marks About, Services, Case histories, Contact for the nav-spy active state.

---

## 3. Persistent UI

### 3.1 Navbar (`nav.navbar`, fixed)
- Top offset: 24 px mobile → 36 px ≥768 → 64 px ≥1536. Full width, inner padding-inline `--padding`. Height 54 px.
- Left: logo SVG, height 54 px (≈47 px wide), white fill + smoke-white stroke; an inner rect fades in on dark variant.
- Right (`navbar__actions`, gap 28 px): locale switcher `IT | EN` (14 px, uppercase, gap 4 px, inactive at reduced opacity → 1 on hover) + toggle (gap 12 px): label "Menu" 11 px tech-green, and 38×38 button, 5 px radius, 0.8 px dashed white/35%.
- Toggle icon: two white bars 14×3.5 px (top 11 px / 17 px) + one short green bar 5×3.5 px right-aligned (top 23 px) — a "text-lines" glyph. Bars scale from right with 0.38 s power4, delay 0.64 s.
- `navbar--dark` variant over light sections: text/logo/bars switch to smoke-black, border smoke-black.
- Navbar translates up (`translateY(-98px)`) when hidden — hides on scroll-down, returns on scroll-up (observed transform at end of page).

### 3.2 Menu panel (`nav.navmenu`, fixed)
- Anchored top-right: top 20 px → 48 px (≥1536), right = `--padding`; width 479 px (max 119.75×4), mobile 65%. Height ≈ 568 px. Padding `--padding`. Radius 5 px.
- Background layer: white, 1 px dashed tech-green border, `transform-origin: 100% 0` (grows from the top-right corner, where the toggle is).
- Page backdrop: deep-black 50% + `backdrop-filter: blur(7px)`, fades 0.3 s.
- Toggle morphs to "close": green 5 px-radius square scales in (`scale(1) translateY(0)`, 0.38 s, delay 0.4 s), white cross bars rotate in (0.42 s).
- List: margin-top 128 px (96 mobile), bottom 64 px; items gap 10 px. Each link: `t-xl` 38.7 px/450, index "01" (50 px wide, margin-right 40 px) + label; padding 7 px 11 px 7 px 6 px; idle opacity 0.5.
- Entrance: links rise from `translateY(~61px)` (masked), info values rise ~10–14 px, staggered.
- Info block (gap 20 px): "Connect" / "Cellulare" 13 px light, values 10 px mono uppercase at 0.5.

### 3.3 Nav-spy (`nav.nav-spy`, fixed, ≥768 only)
- Bottom 40 px, left 3.25%. 172×154 px, padding 14 px 20 px, radius 5 px, `backdrop-filter: blur(5px)`, no fill.
- Vertical list gap 10 px: ABOUT / SERVIZI / CASE HISTORY / CONTATTI, mono 17 px bold uppercase.
- Idle links white 60% → hover 80%; active 100%. On light sections (`is-active--about-intro`, `is-active--case-histories`) colors switch to smoke-black 60/80/100%.
- Hidden (`is-hidden`, opacity 0, 0.4 s power4) over hero and at footer.

### 3.4 Buttons
- Primary (`.button--primary.button--regular`): 303×65 px, padding 16 px 25 px, radius 5 px, 1 px dashed deep-black, mono uppercase label, text smoke-white; green fill via `::before`. Contains dual icons: on hover front icon slides out `translate(100%)`, back icon slides in from `translate(-100%)→0`; `::before` overlay opacity → 1.
- `button--inverted` reverses slide direction.

### 3.5 Loader
Full-screen `#0c0c0c`. Four 8 px green glowing dots at top/bottom 54 px, left/right 64 px. Top label "DAVIDE CATTANEO", bottom label "PERSONAL WEBSITE" — mono 11 px, smoke-white 50%, centered horizontally at the same 54 px insets. Center logo 196 px wide. Exits before hero reveal.

---

## 4. Sections (desktop 1440×900)

### 4.1 Hero — "Consulente di Automazione e Ottimizzazione."
- Frame: 100vw × 100svh, bg `#000`, padding `--padding` (47 px), flex column centered, text smoke-white.
- **Media:** looping video `loop_desktop.mp4` (1080×1080 native), container `aspect-ratio 1/1`, `height: 100%` of viewport, anchored top-right → occupies right 900×900 px (x 540→1440). `object-fit: cover`, center. Left 37.5% of viewport is pure black, so the video's dark edges blend into the bg.
- **Description (top-right):** `t-lg` 27.6/31.7 px weight 350, right-aligned, 517 px wide, top at ~402 px from viewport top (≈45% vh), right edge at gutter. Text: "Dai dati alle strategie: semplifico processi / complessi e ottimizzo il …". Words wrapped in `<em>` rendered at 50% opacity (not italic).
- **Title (bottom-left):** H1 `t-2xl` 72.8/80.1 px, weight 450, max 75% width (805 px observed, 2 lines), baseline block bottom at gutter (≈ bottom 47 px).
- **Scroll cue (bottom-right):** "SCROLLA PER ESPLORARE" `t-eye-xs` 11 px mono bold + green 12 px arrow icon, gap 12 px, aligned to title's bottom.
- Hierarchy: video (visual mass right) → H1 (bottom-left, largest type) → description (top-right, secondary) → scroll cue (micro).
- Hero is pinned for 1 vh; about section slides over it.

### 4.2 About intro — "Mi occupo di trasformare dati complessi in soluzioni pratiche…"
- Section `height: 100svh`, padding-top 1 vh, padding-bottom 1.5 vh (pin 2.5 vh total), bg smoke-white, z 20 (covers hero).
- **Transition in:** `interactive-grid--light` — a full-screen grid of square cells (225×225 px, 1 px gaps, ~6.4 cols × 4 rows at 1440, overflowing edges) in smoke-white over deep-black, plus a pixel-pattern SVG (aspect 1.89/1, height 100svh). Cells/pixels reveal/flip to wipe from hero (dark) to the green panel. A radial background blob (720×450, full radius) follows the pointer, opacity 0 idle — hover-reactive grid.
- **Panel:** `.about-section__container` absolute, 100vw × 100svh, bg **tech-green**, padding ≈ 75 px, flex column centered, gap 40 px.
- **Title:** H2 `t-xl` 38.7/44.5 px, weight 450, smoke-black, max 80% (≈1210 px), vertically centered (y ≈ 361 px of 900), left at 75 px. 4 lines.
- **Image:** absolute, `top: 25%`, `right: 9.1vw`, width 515 px, aspect `1/1.0546` (≈515×543). Image `object-fit: cover`, inner image width 458 px; an SVG pixel pattern overlays it (z 10), dissolving the portrait in pixel blocks as you scroll. Image overlaps the title's right portion.
- Mobile: image centered, width 93.75%, max 40svh.

### 4.3 Data-viz — "Il tuo successo inizia Ora."
- Section height `min(10000px, 750svh)` = 6750 px; container 100vw×100svh pinned for the entire length. bg deep-black.
- **Canvas:** full viewport (1440×900) custom 2D/WebGL canvas (data-point / chart animation driven by scroll).
- **Veil:** gradient `to right`, deep-black 90% → transparent, darkening the left side for legibility.
- **Center block:** absolute, `top: 59.8%`, `left: 50%`, `translateY(-50%)`, padding `--padding`, gap 20 px. Title `t-2lg` 38.7/44.5, max 512 px; **last word "Ora." tech-green with glow**. Text below max 370 px. Left edge at viewport center.
- **Bottom-right caption:** absolute right 0, bottom 8.52% vh, right-aligned, `t-lg` 27.6/31.7 weight 450, max 512 px: "Trasformo dati complessi in visualizzazioni intuitive…".
- Text blocks enter by translating up (caption observed at `translateY(95px)` before reveal) and char-split fades.

### 4.4 Services — "Offro servizi mirati e personalizzati."
- bg deep-black, z 20, padding-bottom 1.5 vh. Enters with **dark pixel-pattern wipe** (SVG aspect 1.89/1, smoke-white pixels) — mirrors the About wipe but inverted.
- Container: padding 47 px 47 px 96 px; flex column. Inner content inset ≈ 95 px from edges (padding + card grid padding).
- **Head row** (flex row, gap 56 px, align center, margin-bottom 11.76% vh ≈ 106 px): title left `t-2xl` 72.8 px, line-height 1, max 10em, 2 lines, **"personalizzati." in tech-green**; text right `t-md` 18.4/25.8, right-aligned, max 30em (542 px).
- **Card grid:** 3 × 385 px columns, gap 48 px, total 1251 px, card height ≈ 460 px.
- **Service card (dark variant):** 1 px dashed smoke-white/15% border, padding 28 px 24 px, flex column gap 20 px, square corners, four green 8 px glowing pins at corners (offset −6 px).
  - Media frame: full width (335 px), `aspect-ratio 1/0.502` (≈2:1), bg deep-black, 1 px solid smoke-white/20%; video (568×286 native) `object-fit: contain`, centered — never cropped.
  - Head: flex space-between gap 8 px — title `t-2lg` 38.7/44.5 (2 lines, 275 px) + label `[001]` mono 9 px bold green, padding 10 px, 1 px border 15%, top-aligned.
  - Text `t-md` 18.4/25.8.
  - Cards: Consulenze continuative [001] / Progetti a scadenza [002] / Formazione ed Training [003].
  - Hover/active: `.service-card__bg` fades in — a rotating conic-gradient (transparent → green → transparent 30%) behind a 1 px-inset fill = animated green light tracing the border.

### 4.5 Case histories — "Selected works over the years."
- bg smoke-white, text smoke-black, min-height 100svh, padding-bottom 176 px; slides over services' tail (`translateY` ≈ 450 px offset while entering).
- Container padding `--padding`.
- **Head** (flex row, space-between, margin-bottom 10% vh): title `t-2xl` left, **"over the years." green**; text right `t-md`, right-aligned, 322 px, with a span at 50% opacity.
- **List:** full content width 1345 px; rows 94 px tall, padding-block 24 px, flex align-center; rows 2+ have 2 px dashed smoke-black/10% top border.
  - Columns: index `t-xl` (min 69 px, padding-left 28 px, margin-right 80 px) · title `t-xl` (min 37.2% ≈ 500 px) · year `[2026]` `t-eye-sm` 15.7 px mono bold (≈303 px col) · type `t-eye-sm` (e.g. FORMAZIONE-POWER-BI) · action (flex 1, right-aligned, padding-right 28 px, circular/square arrow link).
  - All row content idle at **opacity 0.3**.
  - Hover: opacity → 1 (0.3 s ease-in-out); top border (and next row's top border) → solid smoke-black; a **pattern of 40 vertical green bars** (`width 2.5%` each, full row height) scales/sweeps in behind content; the action link fills smoke-white with deep-black arrow after 0.5 s delay.
- Rows include: 03 Comunità di Imprese [2026], 04 Dashboard Centro Termale [2025], etc.

### 4.6 Call section — "Make your business fly"
- Pin-spacer 2400 px (1 vh section + 1500 px pin). Section 100vw×100svh, bg smoke-black, flex centered.
- **Pattern:** square SVG, `height: 100%` (desktop) centered via translate(−50%,−50%) — 1440 px square behind content.
- **Content:** centered column, gap 36 px, padding-inline `--padding`, 752 px wide block centered at ~(720, 550).
  - Title `t-2xl` 72.8/80.1 px white, one line, **"fly" green with glow**.
  - Text `t-md` max 384 px, centered.
  - CTA primary button "PRENOTA UNA CHIAMATA", 303×65, centered, `overflow: clip` wrapper.
- As pinning ends, the section moves up (observed translateY 1500) revealing the fixed footer underneath.

### 4.7 Footer (fixed reveal)
- `position: fixed`, top 0, 100vw × 100svh, z 8 — sits beneath all content; exposed as the last section scrolls up (curtain reveal). `footer--dark` (bg shows deep-black body).
- **Marquee:** "Lavora con me" at `10.573vw` (152 px) weight 400 smoke-white, infinite horizontal scroll right-to-left, items gap 64 px, separated by green icon 7.604vw (109 px). Row height 228 px, placed with margin-bottom 28% vh, top-anchored at viewport top area (content column justify center).
- **Infos row** (bottom, padding-bottom 9.1% vh ≈ 82 px, padding-inline gutter, flex row space-between, align flex-end, gap 40 px):
  - Left: "INFORMAZIONI DI CONTATTO" `t-sm` mono bold 17 px; below (gap 12 px) email + phone 16/24.
  - Right: nav (305 px) — same `t-xl` indexed links as menu (01 Servizi / 02 Case History / 03 Contatti), 58 px rows, idle 0.5.
- **End bar:** padding 40 px 0, top border, flex space-between: left PRIVACY POLICY · COOKIE POLICY · GESTISCI PREFERENZE (mono 11 px, 0.5 → 1 hover); right "CREDITS: STUDIO ZEROTREDICI" (0.5).

---

## 5. Interactions summary

### Scroll
- Lenis smooth scrolling (inertial) across the whole page.
- GSAP pinning: Hero (1 vh), About (2.5 vh), Data-viz (7.5 vh), Call (≈1.67 vh extra). Sections stack by z-index so each next section **slides over** the pinned previous one.
- Transitions between sections: (1) Hero → About: light square-cell / pixel grid wipe to green panel; (2) About → Data-viz: data-viz is below (z 10) and revealed as About panel leaves; (3) Data-viz → Services: dark pixel-pattern wipe; (4) Services → Case histories: light section slides up over dark (overlap via services' 1.5 vh bottom padding); (5) Case → Call: dark call section follows, pinned; (6) Call → Footer: curtain lift revealing fixed footer.
- Scroll-scrubbed: about image pixel dissolve, data-viz canvas, text translateY reveals.
- Navbar hides on scroll-down, shows on scroll-up; switches to dark variant over light sections. Nav-spy active item follows `.js-section-spy`.

### Entrance
- Loader → hero: H1/description split into chars/words, masked upward reveal (lines translateY from ~100% → 0) with stagger; video fades in.
- Section titles (`.js-title`, `.js-text`) reveal per word/char on enter.
- Case info dividers draw left→right (`scaleX(0→1)`, 0.64 s power4) when visible.

### Hover
- Menu/footer nav links: green bg bar `scaleX(0→1)` from left (0.64 s power4), text 0.5 → 1 (0.3 s, 0.2 s delay), green arrow slides in from right `translate(100%→0)` (0.34 s, 0.22 s delay). Footer version also turns text smoke-black.
- Buttons: dual-icon slide swap + `::before` fade.
- Case rows: opacity, dashed→solid border, green bar sweep, action fill.
- Service cards: conic-gradient border light.
- About grid: pointer-following soft blob over cells.
- Text links: opacity 0.5 → 1 (0.3 s power4).
- Only applied under `@media (hover: hover)`.

---

## 6. Media & crop rules
| Element | Ratio | Fit | Crop |
|---|---|---|---|
| Hero video | 1:1 (full vh height, right-anchored) | cover, 50% 50% | Cropped by viewport height only |
| About portrait | 1 : 1.0546 (≈ 0.948 portrait) | cover | Pixel-pattern SVG mask on top |
| Service media | 1 : 0.502 (≈ 2:1) | contain | Never cropped, letterboxed in deep-black frame |
| Data-viz canvas | viewport | — | Full bleed |
| Pixel patterns | 1.89 : 1 | height 100svh (desktop: width 100vw) | Overflow hidden |
| Call pattern | 1:1 | height 100% | Centered, sides cropped |
| Grid cells | 1:1 | — | 225 px @1440 |

---

## 7. Mobile (390×844) deltas
- `--padding` 20 px; type at clamp minimums (t-2xl 40 px, t-xl 25 px, t-lg 18 px, t-md 15 px).
- Navbar top 24 px; menu panel width 65%, list margin-top 96 px.
- Nav-spy hidden.
- Hero: title full width (block), media still right-anchored square at full height; footer stacks.
- Head rows stack (column, gap 20 px); services 1 column; case rows lose fixed index margins; footer infos `column-reverse`; marquee margin-top 15%.
- About image centered, 93.75% width, max 40svh.
