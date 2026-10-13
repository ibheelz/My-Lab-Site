# Site Layout Reference — Home Page (`/`)

Cloned from Framer project. Desktop-first (1200px canvas), Tablet (810px) and Phone (390px) breakpoints exist.

---

## Design Tokens

### Colors
| Token | Value |
|---|---|
| Background / Dark | `rgb(9, 9, 11)` — near black |
| Page background | `rgb(11, 17, 13)` — very dark greenish-black |
| Surface | `rgb(29, 32, 37)` — dark card background |
| Neon Green | `rgb(0, 255, 106)` — primary accent, borders, highlights |
| Cyan | `rgb(0, 255, 255)` — section heading typewriter text |
| Blue | `rgb(168, 215, 231)` — body info text |
| Light Blue | `rgb(120, 181, 255)` |
| Purple | `rgb(192, 132, 252)` |
| Yellow | `rgb(250, 204, 21)` |
| Red | `rgb(248, 113, 113)` |

### Typography
Font: **JetBrains Mono** throughout (regular & medium weights).

| Style | Size | Weight | Line Height |
|---|---|---|---|
| Heading 1 | 36px | Regular | 1.1em |
| Heading 2 | 26px | Medium | 1.4em |
| Heading 3 | 24px | Regular | 1.4em |
| Heading 3b | 22px | Regular | 1.4em |
| Heading 4 | 18px | Medium | 1.4em |
| Heading 5 | 16px | Medium | 1.4em |
| Heading 6 | 14px | Medium | 1.4em |
| Body L | 18px | Medium | 1.6em |
| Body M | 16px | Medium | 1.6em |
| Body S | 14px | Medium | 1.8em |
| Body XS | 12px | Medium | 1.3em |

---

## Page Structure

```
Navigation/Header (global, sticky)
│
├── [1] Hero Section
├── [2] Introduction + Featured Project Section
└── [3] Blog Section
```

---

## Section 1 — Hero

**Padding:** `120px 40px 0px 40px`  
**Layout:** horizontal stack, centered, content max-width 1200px

### 1a — ASCII Word Art Block
- Outer wrapper: horizontal stack
- Inner box (`Art`):
  - Border: `5px double` Neon Green
  - Padding: `30px`
  - Vertical stack, gap `20px`, centered
  - **ASCII Art Header** (code component `WordArtGenerator`):
    - Text: name (e.g. "ALEX CHEN")
    - Style: `gradient`, character: `backslash`
    - Primary color: Neon Green `rgb(0, 255, 106)`
    - Font size: 13, letter spacing: 2.5, line height: 1
    - Background: transparent
  - **Subtitle text** below art: `Body M`, e.g. "Senior Web3 Developer's Portfolio"

### 1b — Portfolio Information
**Layout:** horizontal stack, gap `30px`

**Left column — Info stack** (vertical, gap `10px`):
- Typewriter heading: `"Portfolio Information:"` — Cyan, `h1`, cursor visible
- Below: typewriter lines (`h5`, Blue color, `hideCursorWhenDone: true`), staggered `delayStart`:
  - `"Name: [Name]"` — delay 1s
  - `"Based in: [Location]"` — delay 1.2s
  - `"Profession: [Title]"` — delay 1.4s
  - `"Availability: [Status]"` — delay 1.7s

**Right column — Profile Picture** component (fit-content)

---

## Section 2 — Introduction + Featured Project

**Padding:** `40px` all sides  
**Layout:** horizontal stack, centered, content max-width 1200px  
**Inner gap:** 60px vertical

### 2a — Intro Text
- **Welcome line** (Body L): e.g. "Welcome to [Name]'s Developer Portfolio!"
- **Description** (Body M, max-width 800px): 1–2 sentence bio

### 2b — Featured Project Card
- Border: `1px solid` Neon Green, `border-radius: 8px`, padding `30px`
- Layout: horizontal stack, gap `100px`

**Left — Details column** (vertical stack, gap `30px`):
- Label: `"Featured Project:"` — Body M
- Project name — Heading 3
- **Category pills** (horizontal stack, gap `10px`): colored pill tags (e.g. DeFi in Neon Green, Security in Yellow)
- Short description — Body S
- **Buttons row** (horizontal, wraps):
  - Primary button: "Live Demo" (links to live URL, opens in new tab)
  - Secondary button: "Code" (links to GitHub, opens in new tab)

**Right — Stats grid** (2×2 grid, gap `10px`, minmax columns):
Each stat card:
- Background: Surface `rgb(29, 32, 37)`, `border-radius: 5px`, padding `10px`
- Vertical stack, centered
- **Value** — Body L (large number/amount)
- **Label** — Body S (e.g. TVL, APY, Users, Exploits)

Example stats: `$2.3M TVL` / `15.6% APY` / `1,252 Users` / `0 Exploits`

---

## Section 3 — Blog

**Padding:** `40px 40px 200px 40px` (extra bottom padding)  
**Layout:** horizontal stack, centered, content max-width 1200px  
**Inner gap:** 60px vertical

### 3a — Header
- **Section title** (Typewriter, `h1`, Cyan, cursor visible): `"Latest Blog Posts"`
- **Description** (Body M): 2–3 sentence summary of the blog's topics

### 3b — Articles Grid
- 3-column grid, gap `40px`, `gridColumnWidthType: minmax`
- Each cell: **Blog Card** component
  - Props: link, title, excerpt, read time (minutes)

---

## Animation Details

### GradientScanner (background effect)
A full-page vertical scan line that loops continuously — gives the site a CRT/terminal feel.

- **What it does:** A semi-transparent gradient band moves from top to bottom of the page on an infinite loop
- **Motion:** `y: -300px → calc(100% + 300px)`, easing `[0.4, 0, 0.6, 1]` (ease-in-out cubic)
- **Library:** Framer Motion `<motion.div>`
- **Default values used on the site:**
  - Scan color: `#22CC66` (green, close to Neon Green)
  - Background: `#000000`
  - Scan width: `20%` of container height
  - Speed: `2s` per pass
  - Opacity: `0.8`
- **Gradient shape:** `linear-gradient(180deg, transparent 0%, scanColor 50%, transparent 100%)` — feathered edges so it fades in/out smoothly
- **Position:** `absolute`, `width: 100%`, layered over the page background
- **Static renderer fallback:** renders a static linear gradient instead of animating

```tsx
// Key animation
animate={{ y: ["-300px", "calc(100% + 300px)"] }}
transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
initial={{ y: "-300px" }}
```

---

### Typewriter (text animation)
Per-character typing animation with blinking cursor. Used on all section headings and info lines.

- **How it works:** `setTimeout` chain, reveals one character at a time at `typingSpeed` interval
- **Cursor:** A `<span>` with `width: cursorThicknessXpx`, `height: 0.9em`, `backgroundColor: cursorColor` — acts as a block cursor. Blinks via `setInterval` at **530ms** toggling opacity 1→0
- **Cursor transition:** `opacity 0.1s ease-in-out`
- **Loop:** After completing, waits 2s then resets `currentText` to `""` and restarts
- **`hideCursorWhenDone`:** hides cursor once typing finishes (used on info lines, not headings)
- **`delayStart`:** delays the first character via `setTimeout(delayStart * 1000)`

**Values used on home page:**
| Element | Color | Level | Speed | Delay | Loop | Hide cursor |
|---|---|---|---|---|---|---|
| "Portfolio Information:" | Cyan | h1 | 0.02s | 0s | no | no (cursor stays) |
| "Name: …" | Blue | h5 | 0.04s | 1.0s | no | yes |
| "Based in: …" | Blue | h5 | 0.04s | 1.2s | no | yes |
| "Profession: …" | Blue | h5 | 0.04s | 1.4s | no | yes |
| "Availability: …" | Blue | h5 | 0.04s | 1.7s | no | yes |
| "Latest Blog Posts" | Cyan | h1 | 0.02s | 0s | no | no (cursor stays) |

---

### ASCII Word Art (WordArtGenerator)
Renders text as a 5×7 grid ASCII art banner using a `<pre>` tag with `Courier New` font.

- **No animation** — static render, but the `gradient` style creates a visual gradient effect across rows
- **`gradient` style logic:** maps each of the 7 rows to a character from `['░', '▒', '▓', char]` — bottom rows are denser/bolder
- **Character used:** `backslash` → `\\`
- **Font:** `Courier New, monospace`, size `13px`, letter-spacing `2.5px`, line-height `1`
- **Color:** Neon Green `rgb(0, 255, 106)`
- **Background:** transparent (`rgba(255,255,255,0)`)
- **Container:** `overflow: auto`, `borderRadius: 8px`

The visual result: a name rendered as stacked rows of `\` characters that go from sparse (░) at the top to solid at the bottom.

---

## Global Components

### Navigation/Header
- Component: `Navigation/Header` (reusable across all pages)
- Contains: `Navigation/Menu Item` sub-components

### Footer
- Component: `Footer/Social Icon` sub-components

---

## Reusable Components Reference

| Component | Usage |
|---|---|
| `Typewriter Title` (code: `Typewriter_Code.tsx`) | Animated typing text — configurable color, cursor, speed, delay, loop |
| `WordArtGenerator` (code: `WordArtGenerator.tsx`) | ASCII art banner with gradient style |
| `GradientScanner` (code: `GradientScanner.tsx`) | Background visual effect |
| `Buttons/Primary` | Solid Neon Green button with link + new-tab props |
| `Buttons/Secondary` | Outlined button variant |
| `Blogs/Category Pill` | Small colored tag with label + color props |
| `Blog/Blog Card` | Card with title, excerpt, read time, link |
| `Cards/Project Card` | Project showcase card |
| `Pills/Tech Stack` | Technology tag pill |
| `Profile Picture` | Avatar image component |
| `About/Proficiency Card` | Skill indicator card |
| `Testimonial Card` | Testimonial with stars |
| `Footer/Social Icon` | Social link icon |

---

## Notes

- The ASCII word art (`WordArtGenerator`) is a code component — will need a custom React implementation.
- Typewriter effect (`Typewriter_Code.tsx`) uses per-character delay with configurable `typingSpeed`, `delayStart`, cursor blink, and optional loop.
- `GradientScanner` appears to be a full-page animated background overlay (already present in the old codebase too).
- All section headings use the **Cyan typewriter** pattern — this is a consistent design motif.
- The "double border" style on the ASCII art box is a key visual signature of the design.
