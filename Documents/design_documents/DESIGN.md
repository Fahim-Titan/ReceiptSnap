# Design System Strategy: The Precision Ledger

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Precision Ledger."** 

In the world of finance and receipt management, "clean" is often a synonym for "sterile." We are moving beyond that. This design system treats financial data with the reverence of a high-end editorial magazine. We reject the "template" look of standard accounting software in favor of a bespoke, architectural experience. 

The system utilizes **intentional asymmetry** and **tonal depth** to guide the eye. By leveraging a high-contrast typography scale (pairing the geometric authority of Manrope with the functional clarity of Inter), we create a sense of organized luxury. The interface should feel like a physical desk—layers of high-quality paper and frosted glass organized with surgical precision.

---

## 2. Colors: Depth Through Tone
Our palette is anchored in deep, authoritative teals and crisp, airy neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. To separate a receipt list from a dashboard summary, use `surface-container-low` (#f2f4f5) against a `surface` (#f8fafb) background. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface-container` tiers to create "nested" importance:
- **Level 0 (Base):** `surface` (#f8fafb) for the main application background.
- **Level 1 (Sectioning):** `surface-container-low` (#f2f4f5) for large layout blocks.
- **Level 2 (Interaction):** `surface-container-lowest` (#ffffff) for primary interactive cards or data entry fields.
- **Level 3 (Highlight):** `surface-container-high` (#e6e8e9) for subtle hover states or inactive tabs.

### The "Glass & Gradient" Rule
To escape the "flat" trap, use **Glassmorphism** for floating elements (like the mobile bottom navigation or batch-processing indicators). Apply `surface_container_lowest` with 80% opacity and a `backdrop-blur` of 16px to 24px.
- **Signature Gradients:** Use a subtle linear gradient for primary CTAs: `primary` (#004d64) to `primary_container` (#006684). This adds a "weighted" feel that feels premium and tactile.

---

## 3. Typography: The Editorial Edge
The type system is a dialogue between two distinct voices.

- **The Brand Voice (Manrope):** Used for `display` and `headline` roles. Manrope’s geometric shapes provide a modern, "fintech-forward" feel. Use `display-lg` for empty state headers or large balance displays to command attention.
- **The Functional Voice (Inter):** Used for `title`, `body`, and `label`. Inter is the workhorse. Its high x-height ensures that complex receipt data (merchants, VAT, dates) is legible even at `label-sm` (0.6875rem).

**Editorial Tip:** Use `headline-sm` for card titles, but pair it with `label-md` in all-caps (tracked out +10%) for category tags to create a sophisticated, "magazine-style" hierarchy.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than structural lines or heavy shadows.

- **The Layering Principle:** A white card (`surface-container-lowest`) on a light grey background (`surface-container-low`) provides enough contrast to be "lifted" without needing a border.
- **Ambient Shadows:** When a floating effect is required (e.g., a "Capture Receipt" FAB), use an extra-diffused shadow:
  - `box-shadow: 0 12px 32px -4px rgba(0, 77, 100, 0.08);` (Note the blue-tinted shadow using the `primary` hue).
- **The "Ghost Border" Fallback:** If a border is required for accessibility in data tables, use the `outline-variant` (#bfc8cd) at **15% opacity**. Never use a 100% opaque border.
- **Glassmorphism:** For the mobile batch workflow indicator, use a frosted glass container that allows the receipt cards to "scroll under" it with a blur, maintaining spatial awareness.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), roundedness `md` (0.375rem). Text should be `title-sm` in `on_primary` (#ffffff).
- **Secondary:** Surface-only. Use `secondary_container` (#d5e5f1) background with `on_secondary_container` (#576670) text. No border.
- **Tertiary:** Text-only in `primary` (#004d64), used for low-emphasis actions like "Add Note."

### Receipt Cards & Lists
- **The Rule:** No dividers. Separate items using `4px` or `8px` of vertical white space.
- **Layout:** Use a `surface-container-lowest` card. Place the merchant name in `title-md` and the price in `headline-sm` aligned to the right. Use `tertiary_container` for "Approved" status chips to provide a soft, professional green-teal accent.

### Input Fields
- **Styling:** Use `surface_container_highest` for the input background to create a "inset" look. 
- **States:** On focus, transition the background to `surface_container_lowest` and add a 2px "Ghost Border" of `primary`.
- **Labels:** Use `label-md` floating above the field, never inside it, to maintain a high-end data-entry feel.

### Batch Progress Indicators
- **Visual:** Use a "Linear-to-Circular" transition. A thin track of `primary_fixed` with a moving segment of `primary`. 
- **Context:** Place this inside a Glassmorphic bar at the bottom of the screen to signify an ongoing background process without blocking the UI.

---

## 6. Do's and Don'ts

### Do
- **Do** use whitespace as a separator. If you think you need a line, try adding 8px of padding instead.
- **Do** use `primary_fixed` (#bee9ff) for background highlights on selected receipt items; it provides a soft "financial highlight" feel.
- **Do** align numerical data to the right to ensure decimal points line up—essential for financial clarity.

### Don't
- **Don't** use pure black (#000000) for text. Always use `on_surface` (#191c1d) to maintain the sophisticated teal-tinted neutral palette.
- **Don't** use the `DEFAULT` or `sm` roundedness for large cards. Stick to `lg` (0.5rem) or `xl` (0.75rem) to keep the "Modern" brand promise.
- **Don't** use standard Android "Drop Shadows." They feel "out-of-the-box." Always use our tinted Ambient Shadows.