# LP-M3 — Visual design and implementation handoff

Prepared 2026-09-06. **Status: design package complete and ready for owner review.** LP-M3 screens are proposed final designs, not yet owner-approved. This milestone adopts the LP-M2 content/structure as approved by the LP-M3 request. No runtime website or workspace functionality is included.

## Deliverable index

| Task | Deliverable |
| --- | --- |
| LP-M3-T1 | [Visual direction board](design/direction-board.png) and rationale below |
| LP-M3-T2 | Token specification below and [machine-readable tokens](design/tokens.json) |
| LP-M3-T3 | [Header and hero](design/header-hero.png), using the approved headline and CTAs |
| LP-M3-T4 | [Complete desktop design, 1440px](design/desktop.png) |
| LP-M3-T5 | [Complete mobile design, 390px](design/mobile.png), [complete tablet design, 768px](design/tablet.png), and responsive annotations below |
| LP-M3-T6 | [Component states](design/component-states.png), [narrow-screen expanded states](design/mobile-expanded.png), and state matrix below |
| LP-M3-T7 | Motion and reduced-motion specification below |
| LP-M3-T8 | Review checklist, resolved findings, and comprehension walkthrough below |
| LP-M3-T9 | Source, asset, behavior, and acceptance handoff below |

The full-page images use actual Capriola text and all seven approved sections. FAQ answers are collapsed in the default page designs; the state sheet demonstrates expanded answer treatment, and LP-M2 retains the complete six-answer copy. The expanded mobile artifact is a component specimen, not a replacement page order. [Overview](design/overview.png) is a thumbnail contact sheet only; use individual screens at full size to assess text.

## LP-M3-T1 — Visual direction

**Direction: quiet precision, with human judgment visible.** Blue Eclipse provides a calm dark field. Capriola softens the presentation without making it playful. Text leads the hero; there is no simulated app window competing with the product message. A solid accent-filled primary action appears before an outlined secondary action.

The original bracket-and-dot mark evokes a piece of reviewable material. A restrained line with three dots closes the hero. These are decorative identity elements, not a workflow diagram, certification seal, product screenshot, or loading indicator. Both can be reproduced using CSS borders and pseudo-elements inside the three-file implementation.

Numbered section labels help scanning. Benefits and audience groups use thin dividers and proximity rather than boxed cards. Workflow examples use surfaces because each input/output pair is a distinct unit. Product status uses explicit words and a short rule beside each entry. Its placement outside disclosures makes maturity easy to inspect.

NEAR remains inspiration in restraint and hierarchy only. No particular reference page was supplied or analyzed for this milestone, and no NEAR graphics, brand elements, copy, or composition were reused. All layouts and decorative geometry in this package were authored for QAEOps.

## LP-M3-T2 — Design tokens

Token names are ready to translate into `:root` custom properties in `styles.css`. `tokens.json` is a design artifact, not a fourth runtime source file. Values below refine LP-M2's starting sizes; its copy, section order, and behavior remain authoritative.

### Colors

| CSS variable | Value | Role and restrictions |
| --- | --- | --- |
| `--color-background` | `#0F0E47` | Main page, secondary CTA fill |
| `--color-surface` | `#272757` | Workflow cards; expanded FAQ state surface |
| `--color-surface-secondary` | `#505081` | Decorative dividers and numbered step fills; never a required control boundary on a dark surface |
| `--color-accent` | `#8686AC` | Primary CTA fill; supporting labels on main background; control borders on main/card surfaces |
| `--color-text` | `#F7F7FC` | All main copy, headings, card labels, navigation, FAQ text |
| `--color-text-on-accent` | background token | Primary CTA text; do not use near-white here |
| `--color-border-control` | accent token | Required boundaries against background/surface only |
| `--color-border-control-on-secondary` | text token | Required boundary if a control is placed on secondary surface |
| `--color-focus` | text token | Immediate, offset focus ring outside controls |
| `--color-divider` | secondary token | Decorative rules; meaning also supplied by labels, spacing, and structure |

No opacity reduction for text or required indicators. No gradients behind copy. No separate success/error colors because this page has no transactional status. “Documented” and “Planned” are text, not color codes.

### Type, space, and geometry

| Token | Value / application |
| --- | --- |
| `--font-primary` | `"Capriola", sans-serif` for all UI text and controls |
| `--font-weight` | 400, normal style; `font-synthesis: none` |
| `--font-code` | monospace; reserved for actual code/logs, none required here |
| `--text-display` | 2.125rem mobile; 3rem at 42rem; 3.75rem at 64rem; line-height 1.16 |
| `--text-heading` | 1.75rem mobile; 2.375rem at 42rem; line-height 1.27 |
| `--text-subheading` | 1.25rem; line-height 1.4 (workflow steps 1.125rem) |
| `--text-body` | 1rem mobile; 1.0625rem at 42rem; line-height 1.65 (hero 1.7) |
| `--text-supporting` | 0.875rem; line-height 1.6 |
| `--text-label` | 0.75rem; line-height 1.5; short labels only |
| `--text-button` | 0.9375rem; line-height 1.5 |
| `--space-1` through `--space-8` | .25rem, .5rem, .75rem, 1rem, 1.5rem, 2rem, 3rem, 4rem |
| `--width-page` | 72rem maximum; centered |
| `--width-reading` | min(100%, 47.5rem); paragraph line length also capped at 65ch |
| `--width-hero-title` | min(100%, 51.25rem); natural wrapping, no forced line breaks |
| `--width-hero-copy` | min(100%, 43.125rem) |
| `--gutter` | 1rem mobile, 1.5rem tablet, 2rem minimum desktop |
| `--gap-grid` | 1.5rem |
| `--padding-card` | 1.5rem; may reduce to 1rem at 320px if needed |
| `--space-section` | 3rem mobile, 4rem tablet/desktop |
| `--radius-control` | .5rem |
| `--radius-card` | 1rem |
| `--radius-circle` | 50% for noninteractive step labels |
| `--border-width` | 1px; decorative lines and identifiable control boundaries |
| `--focus-width`, `--focus-offset` | 3px, 3px; never animate or clip |
| `--shadow` | none; grouping relies on surface, spacing, and hierarchy |
| `--target-min` | 44px minimum both dimensions for main controls; CTA design min-height 56px |
| `--duration-feedback` | 120ms linear, optional underline color feedback only |

Sizes in rem must remain responsive to user font preferences. Screen images are reference compositions, not fixed-height templates. Content determines section, card, and control heights. Do not copy pixel y coordinates from the render script into website CSS. Equal-height workflow cards may stretch within each grid row; never hide overflow to force equality.

### Contrast evidence

The numerical checks use the WCAG sRGB relative-luminance formula on opaque color pairs. [Contrast evidence](design/contrast-report.json) records every pair, unrounded values, and pass/fail thresholds. Numbers below are rounded for reading, not threshold decisions.

| Meaningful use | Pair | Ratio | Result |
| --- | --- | --- | --- |
| Body, heading, navigation, FAQ on page | near-white / background | 16.749:1 | Normal text PASS |
| Workflow labels/body, expanded answer | near-white / surface | 12.988:1 | Normal text PASS |
| Step number | near-white / secondary | 7.009:1 | Normal text PASS |
| Supporting label, setup/footer link, FAQ +/- | accent / background | 5.127:1 | Normal text and indicator PASS |
| Primary CTA text | background / accent | 5.127:1 | Normal text PASS |
| Primary fill and secondary/menu border against page | accent / background | 5.127:1 | Control indicator PASS |
| Menu border or indicator on card surface | accent / surface | 3.976:1 | Control indicator PASS; do not use for small text |
| Focus ring surrounding control on page/card | near-white / background or surface | 16.749 / 12.988:1 | PASS |
| Required boundary on secondary surface, if introduced | near-white / secondary | 7.009:1 | PASS |

Excluded pairings: near-white text on accent (3.267:1); accent small text on surface (3.976:1); accent boundary on secondary (2.146:1); secondary boundary on background (2.390:1) or surface (1.853:1). Low-contrast rules in screenshots are purely decorative; the FAQ plus/minus, text, and controls carry their own compliant contrast. Hover/active retain the same foreground/background pairs. Underlines use the existing text color.

Thresholds follow [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). This verifies selected design colors, not full WCAG conformance of an unimplemented page.

## LP-M3-T3–T5 — Screen and responsive annotations

| Surface | Desktop 1440px | Tablet 768px | Mobile 390px and narrower |
| --- | --- | --- | --- |
| Header | 1152px content span, text brand and four nav links; normal document flow | Brand and 44px Menu disclosure | Same; expanded links push hero down; no sticky header |
| Hero | Text-led, title max 820px, body max 690px; two actions in a row | 48px H1, same source order, actions wrap if needed | 34px H1, full-width stacked CTAs; status remains before actions |
| Introduction | Narrow readable paragraphs aligned with section title | Full available width, capped reading measure | One column, no illustration replacing explanation |
| Benefits | Three equal groups | Two columns then the third in source order | Three stacked groups; heading stays with supporting paragraph |
| Workflow steps | Three columns | Three columns at 768px; each at least 13rem | Vertical ordered list; number remains beside its associated content |
| Workflow examples | Two columns, fifth item on following row | Same, with natural text wraps | One column; label, input, output order unchanged |
| Audience use cases | Three columns | Two columns then third | Three stacked; never hidden in tabs or a selector |
| FAQ/status | Centered 760px column; status visible, six closed questions | Same capped reading column | Full width; reserve 40px beside summary text for disclosure indicator |
| Closing/footer | Repeat approved CTAs in same order; small readable footer | Actions wrap | CTAs stack and fill width; footer wraps |

Use 42rem and 64rem as initial content breakpoints; adjust only when actual text fit requires it. At 672px, workflow steps may remain stacked until three 13rem columns plus gaps fit. Use the same DOM across widths; never change reading order with CSS. Keep essential copy and all actions on every size. Large images in this package are design references only and must not become page backgrounds or screenshots of text.

The original mark is 28 × 24px and does not scale with viewport width. The decorative trace rule fills available width; its three dots remain 8px and decorative. Hide the trace under forced colors if it adds noise. No photo, video, or conceptual workspace preview is required. Workflow input/output examples have the visible label “These are illustrative examples, not captured product results.”

## LP-M3-T6 — Components and state matrix

| Component | Default | Hover | Focus | Active / expanded | Disabled |
| --- | --- | --- | --- | --- | --- |
| Primary CTA anchor | Accent fill, dark text, 8px radius | Text-color underline | 3px near-white outline, 3px offset | Underline retained during press; no move/scale | Not applicable: no unavailable link rendered |
| Secondary CTA anchor | Dark fill, accent border, near-white text | Near-white underline | Same offset outline | Same underline during press | Not applicable |
| Navigation/brand link | Near-white, native anchor | Underline | Outline around whole link target | Follows section hash; no persistent selected state or scrollspy | Not applicable |
| Setup/footer link | Accent on background, always underlined | Underline thickens to 2px | Near-white outline | Native hash navigation | Not applicable |
| Menu button | Visible “Menu”, accent outline | Underline | Near-white outline | `aria-expanded=true`; links displayed inline; optional decorative minus | Not used; native disabled treatment needed only if scope later changes |
| FAQ summary | Near-white label and accent plus; minimum 44px hit height | Underline question | Near-white outline around summary | Minus replaces plus; answer appears immediately below on surface, with 24px padding; multiple open allowed | Not used |
| Workflow card / benefit group | Static content | No hover animation or pointer cursor | Not focusable | No selected or expanded state | Not applicable |
| Status item | Visible label, paragraph, decorative left rule | No change | Only a hash destination may receive programmatic focus | No color-only state | Not applicable |

State sheet demonstrates treatments, not interactive controls. For the implementation, use native anchors for navigation, native button for Menu, and native details/summary for FAQ. Planned capability is a description, never a disabled “Launch” control. No speculative disabled controls are added to the design.

Preserve all LP-M2 focus rules: skip link first; normal Tab order; nonmodal menu without a focus trap; Escape returns focus to Menu; activating a nav link closes menu and focuses destination; hash navigation reveals the containing setup disclosure before focus. Modified clicks retain browser behavior. Resizing cannot leave focus inside hidden navigation. No-JS leaves header links visible and native FAQ disclosures usable. Focused headings/main may use `tabindex="-1"`, never positive tabindex.

## LP-M3-T7 — Motion

No entry reveals, parallax, looping graphics, smooth anchor scrolling, height animation, moving buttons, or staggered content. All essential content is visible immediately. Menu and FAQ open/close instantly, allowing the document to reflow predictably. Focus appears immediately.

Optional 120ms linear transition is limited to text-decoration-color feedback on hover; choose both endpoints from the permitted text colors, with no foreground fading. Underline thickness/state itself may change instantly. No animation communicates whether content exists. Under `prefers-reduced-motion: reduce`, set this transition duration to 0s and retain all visual states. No JavaScript animation library or timing state is needed.

## LP-M3-T8 — Review and resolved findings

### Observed design checks

| Check | Result / evidence |
| --- | --- |
| Full-page section coverage | PASS — mobile, tablet, desktop show hero, introduction, benefits, workflows, audiences, FAQ/status, closing/footer |
| Approved message and CTA labels | PASS — LP-M2 copy loaded into renderer; hero and repeated informational CTAs preserved |
| Font | PASS — official Capriola file loaded, rendered at 400; no synthesized bold; font file and OFL license included for reproducibility |
| Actual design contrast | PASS — all used meaningful combinations listed above; excluded combinations prohibited |
| Wrapping and geometry | PASS — renderer checks every text line against its assigned width and overall canvas; full-page compositions visually inspected |
| State coverage | PASS — default/hover/focus/active actions, open FAQ and menu, and disabled applicability documented |
| Content visibility | PASS — status and review limitation never collapsed; no hover-only information |
| CTA hierarchy | PASS — one filled primary, one outlined secondary; same labels and order at hero and closing |
| Reading order | PASS in design — groups read left-to-right then down; mobile follows source sequence |
| Browser accessibility | NOT YET TESTED — static design artifacts do not prove keyboard behavior, browser font reflow, screen-reader output, or WCAG conformance |
| Observed audience feedback | NONE — no participant sessions or customer feedback were conducted |

Resolved findings from this design pass:

1. Workflow input/output labels initially used 11px. Increased to 12px with full near-white contrast; longer labels wrap naturally.
2. Expanded menu specimen initially visually joined the wordmark and Menu text. Separated the button and brand into distinct aligned targets.
3. Expanded FAQ indicator was part of a spacing-dependent text run. Positioned it in a dedicated trailing area; implementation uses flex alignment, not spaces.
4. Accent text on a card would fail normal-text AA. Card labels and copy use near-white; accent small text is confined to the main background.
5. Required boundaries cannot use the secondary palette color on dark surfaces. Actual control boundaries use accent; secondary rules remain decorative.

### Heuristic comprehension walkthrough — assumptions, not participant evidence

| Perspective | Expected answer from the design | Evidence in screen | Remaining validation |
| --- | --- | --- | --- |
| Business evaluator | “It assists QA preparation; engineers review it. The web interface is planned.” | Hero description/status, benefits, visible product status | Ask a business evaluator to identify maturity and one relevant workflow |
| Individual QA professional | “I can inspect test drafts and automation starting points. The action shows workflows.” | Exact primary CTA, input/output examples, setup question | Ask a QA practitioner what the primary CTA will do before clicking |
| General visitor | “This is for people testing software, using a terminal-based assistant.” | Hero audience, introduction defining QA and CLI | Ask a newcomer to explain the product after reading hero and introduction |

Do not report these expected answers as observed comprehension. If a participant expects a live web app, revise the hierarchy of the existing status line rather than adding an unsupported availability claim.

## LP-M3-T9 — Implementation handoff

### Files and assets

- `index.html`: all approved LP-M2 copy, semantic landmarks/headings, one shared navigation, native CTA anchors and FAQ disclosures. The small mark/trace can use decorative spans; no image is required. Screen PNGs are reference only.
- `styles.css`: all styling, imported Capriola 400 with `display=swap`, semantic tokens, reusable components, responsive grids, and state/reduced-motion/forced-color rules. No inline styles.
- `script.js`: menu enhancement, viewport reconciliation, and shared hash destination reveal/focus handling only. No inline handlers, frameworks, API calls, or workspace behavior.

Exactly these three files are the authored runtime source. The design folder, renderer, JSON reports, licensed font, and PNGs are development handoff artifacts and must not be copied wholesale into the runtime package. Continue LP-M2's external Google Fonts loading plan with `sans-serif` fallback. Bundled Capriola is for design reproduction; self-hosting it at runtime would require an agreed asset allowance. External font loading means the web page makes external requests; do not advertise the page as offline-only.

Official font source: [Google Fonts Capriola](https://github.com/google/fonts/tree/main/ofl/capriola); local assets retain [OFL license](design/assets/OFL.txt). Metadata in the downloaded font is included in the rendering report. The original bracket graphic is specified as a 28 × 24px decorative mark: left/right 10px arms, 2px stroke, centered 4px dot; left/text stroke near-white, right stroke accent. CSS implementation needs no additional asset file.

### Required destinations

| Label | Destination | Effect |
| --- | --- | --- |
| Skip to content | `#main-content` | Focus main content |
| QAEOps / Back to top | `#top` | Navigate to top/hero |
| What it is | `#product` | Product introduction |
| Workflows / Explore CLI workflows | `#cli-workflows` | Workflow heading and examples |
| Who it's for | `#audiences` | Three audience use cases |
| FAQ | `#faq` | FAQ/status section |
| View product status | `#product-status` | Visible product-status heading |
| What setup do I need? | `#faq-setup` | Reveal and focus setup summary with JS; native summary remains usable without JS |

No download, trial, signup, sales, social, workspace, or execution action is implied. Apply the original status date as supplied in approved copy; refresh evidence before publication rather than automatically substituting the current date.

### Implementation verification gate

Use LP-M2's acceptance scenarios and additionally compare the implemented page with the three full-size designs. Test 320/390/768/1440px, 200% text enlargement, 400% browser zoom at a 1280px viewport, user text-spacing overrides, blocked font loading, forced colors, reduced motion, and keyboard-only navigation. Verify every default/hover/focus/active color pairing in rendered CSS. Controls must meet minimum target geometry after text wrapping. Decorative graphics receive `aria-hidden="true"`; content remains text, never a screenshot. Screen readers must announce headings, landmarks, Menu expanded state, and FAQ state correctly.

No approval or conformance claim is inferred from this handoff. LP-M3 design work is complete for review; runtime implementation and its tests remain the next development phase.
