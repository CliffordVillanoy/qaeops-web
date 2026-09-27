# LP-M2 — Content and UX Structure

Prepared 2026-09-06. Status: specification and editorial review complete; ready for owner review. Implementation and browser acceptance remain a later step.

This document adopts LP-M1 Option 1 as approved by the LP-M2 instruction. The supplied Blue Eclipse values resolve the earlier palette input. Capriola now applies to all interface text, superseding LP-M1's proposed system body font. Landing page only: no workspace, login, project creation, model controls, execution, uploads, or dashboards.

## LP-M2-T1 — Journeys and priorities

| Audience | Questions in order | Intended journey | Successful outcome |
| --- | --- | --- | --- |
| Business evaluator | What is it? What work can it support? Who reviews results? What exists today? What setup is required? | Hero → benefits → workflows → business use case → product status/setup FAQ | Can identify a relevant preparation task and assess maturity without assuming a hosted or enterprise service |
| Individual QA professional | Does this help my work? What inputs and outputs are involved? Do I need a terminal? Can I use it in a browser? | Hero primary CTA → workflow examples → individual use case → setup and availability FAQ | Understands the CLI workflow, review responsibility, and planned web interface |
| General visitor | What does QA mean? Who is this for? What does the assistant actually do? | Hero → introduction → illustrative workflow → visitor use case → FAQ | Can explain QAEOps as an assistant for people testing software |

Priority 1: category, audience, concrete tasks, CLI status, engineer review. Priority 2: examples, local setup, current/planned distinctions. Priority 3: supporting explanations in FAQ. These journeys are editorial hypotheses, not results of user testing. No audience selection gate or hidden audience tabs.

## LP-M2-T2 — Annotated content map

DOM and visual reading order must match this sequence at every width.

| Order / target | Purpose and content | Audience / next step |
| --- | --- | --- |
| Header | QAEOps home anchor; What it is, Workflows, Who it's for, FAQ navigation | All; direct routes without making visitors read every section |
| 1. Hero `#top` | One H1; approved description, visible planned-interface line, primary and secondary CTA | All; identify category and choose workflows or status |
| 2. Introduction `#product` | H2; explain QA, terminal-based CLI, and local AI assistance | General visitors; understand vocabulary before detailed benefits |
| 3. Benefits `#benefits` | H2; three H3 pillars with concrete benefits | Businesses and individuals; why these tasks matter |
| 4. Workflows `#cli-workflows` | H2; three-stage conceptual flow, five input/output examples, visible review expectation | All; understand preparation rather than autonomous execution |
| 5. Audiences `#audiences` | H2; three H3 use cases, all visible | Each audience; recognize a relevant use |
| 6. FAQ `#faq` | H2; visible status subsection `#product-status` with H3, followed by native question disclosures | Evaluators; current/planned status and practical questions |
| 7. Closing `#next-step` | H2; brief invitation and repeated two CTAs | All; return to meaningful information |
| Footer | QAEOps descriptor; Back to top | All; simple return path, no invented contact/social links |

Product status stays expanded outside FAQ disclosures so the secondary CTA always lands on visible content. Section grouping uses spacing and headings; do not turn every paragraph into a card. No testimonials, counters, customer logos, pricing, or simulated product screenshot.

## LP-M2-T3 — Copy deck

The text in this section is page-ready copy. Headings are indicated for implementation; annotations elsewhere are not public copy.

### Header and metadata

- Page title: QAEOps — Local AI assistance for QA
- Description: Meet QAEOps, a local-first command-line assistant for requirements analysis, test-case drafts, and automation preparation, with engineers reviewing the results.
- Brand link: QAEOps → `#top`
- Navigation: What it is → `#product`; Workflows → `#cli-workflows`; Who it's for → `#audiences`; FAQ → `#faq`
- Skip link: Skip to content → `#main-content`
- Mobile disclosure button: Menu; accessible expanded state communicates whether it is open.

### 1. Hero

H1: **Local AI assistance for QA professionals and software teams.**

QAEOps is a command-line assistant for analyzing requirements, drafting test cases, and preparing automation starting points. You review the results and decide what comes next.

CLI-first product. Browser-based interface planned.

Primary: **Explore CLI workflows** → `#cli-workflows`

Secondary: **View product status** → `#product-status`

### 2. Introduction

H2: **An assistant for the people who test software.**

Quality assurance (QA) helps teams assess whether software works as intended. QAEOps supports the preparation behind that work, from interpreting requirements to drafting testing materials.

Its command-line interface (CLI) runs from a terminal. QAEOps uses LM Studio for local AI assistance, and engineers review and adapt the output before using it.

### 3. Benefits

H2: **Practical support for test preparation.**

H3: **Start with a draft.**

Prepare test cases, synthetic test data, and automation starting points that you can inspect and adapt to your application.

H3: **Work with local AI assistance.**

Use LM Studio to run a local model for supported QA tasks. Choose a model that fits your device and review its output for your needs.

H3: **Keep engineering judgment central.**

Give your team structured material to review. Decide what to refine, what to test, and whether the results are suitable for use.

### 4. Workflows

H2: **Explore the CLI workflows.**

The CLI supports requirements analysis, test-case drafting, synthetic test data, Playwright scaffolding, and bug-report review.

Conceptual steps (an ordered list, not a claim of one automatic pipeline):

1. **Prepare your input.** Choose a QA task and provide the relevant requirements, report, or data specification.
2. **Create a starting point.** Use the corresponding CLI workflow to prepare analysis or draft material.
3. **Review and adapt.** Check the output against your application before using it in testing.

H3: **Examples of inputs and starting points.**

These are illustrative examples, not captured product results.

| Workflow label | Example input | Starting point to review |
| --- | --- | --- |
| Requirements analysis | A password-reset requirement | Analysis to review for unclear rules and missing acceptance criteria |
| Test-case drafting | Acceptance criteria for password reset | Draft test cases to refine against the expected behavior |
| Synthetic test data | A specification for fictional user records | Generated records to inspect against the specification |
| Playwright scaffolding | A description of a browser test | Automation code to adapt and validate against your application |
| Bug-report review | A report describing a failed password reset | Review suggestions to check before updating the report |

AI-generated output can be incomplete or incorrect. Review drafts, data, and code before use.

Setup note: These workflows use the CLI. AI-assisted tasks require LM Studio and a suitable local model. See **What setup do I need?** → `#faq-setup`.

### 5. Audience use cases

H2: **Find where QAEOps fits your work.**

H3: **For software teams.**

Use structured test drafts as a shared starting point for review. Evaluate how the supported workflows fit your existing QA process and local setup.

H3: **For individual QA professionals.**

Prepare a test-case draft or automation scaffold, then refine it with your knowledge of the application. Keep the decisions about coverage and correctness with you.

H3: **For curious visitors.**

See how AI can assist the preparation behind software testing, and why people still need to review the results.

### 6. FAQ and status

H2: **Questions before you go further.**

H3 (`#product-status`): **Product status**

Status reviewed: 6 September 2026.

- **Documented CLI functionality:** Requirements analysis, test-case drafting, synthetic test data, Playwright scaffolding, and bug-report review.
- **Planned:** A browser-based interface and cloud-model support. No delivery date is announced here.
- **Access:** This page explains the product. A public download or hosted app is not linked here.

The CLI functionality above is described in the project's current documentation. This page does not establish production readiness.

Disclosure questions and answers:

1. **What setup do I need?** (`#faq-setup`) QAEOps runs from a terminal. AI-assisted workflows use LM Studio and a downloaded model suitable for your device's memory and storage. Model requirements vary. Check the installation requirements for the release you intend to use.
2. **Can I use QAEOps in my browser?** The product's browser-based interface is planned. This website introduces QAEOps; it does not run QA workflows.
3. **Does QAEOps replace a QA engineer?** No. It supports preparation tasks. People still interpret requirements, review output, decide coverage, and assess results.
4. **Does local-first mean my data can never leave my device?** Local-first describes the intended model workflow. It is not a guarantee for every configuration or connected tool. Review your setup and data-handling requirements before use.
5. **Is the generated output ready to use without review?** No. Test drafts, synthetic records, analysis, and generated code need review and validation for your application.
6. **Where can I download or try it?** This page does not yet provide a verified public download or hosted trial. Refer to the product status above for what is described today and what is planned.

### 7. Closing and footer

H2: **See where QAEOps could fit your testing work.**

Explore the documented CLI workflows and check the product's current direction before deciding what to evaluate next.

**Explore CLI workflows** → `#cli-workflows`; **View product status** → `#product-status`.

Footer: **QAEOps — Local AI assistance for test preparation.**

**Back to top** → `#top`.

## LP-M2-T4 — Interaction specification

| Element | Pointer / keyboard behavior | Focus and fallback |
| --- | --- | --- |
| Section links and CTAs | Native `<a href="#…">`; Enter activates. Keep fragment/history behavior and modified clicks native. No action executes QA tools. | Give destination headings `tabindex="-1"` for scripted focus; normal Tab order contains controls only. Enhancement focuses valid target after activation without suppressing native navigation. Browser back/forward honors hash. No-JS links still navigate. |
| Skip link | First focusable element, visible on focus; points to `<main id="main-content" tabindex="-1">` | Focus main; next Tab reaches hero controls. Never obscure the focused target. |
| Narrow navigation | Nonmodal inline disclosure under the header; native button with `aria-controls="primary-navigation"`, `aria-expanded`; Enter/Space toggles | Keep focus on button when opened. Tab enters links then continues into page; no trap, overlay, or scroll lock. Escape inside nav closes and returns focus to Menu. Activating a nav link closes and focuses destination. |
| Navigation enhancement | Base HTML shows links and hides the Menu button. After listeners are ready, narrow mode reveals button and collapses nav using `hidden`. | No JS or failed initialization leaves all links visible. Closed links must not be focusable. Wider mode removes `hidden`, hides button; if it had focus, move to first nav link. Narrowing while focus is inside nav leaves it open; otherwise collapse. |
| FAQ | Native `<details><summary>`; Enter/Space toggles; multiple answers may remain open. Default closed. Entire summary has comfortable target area. | Focus stays on summary. No custom ARIA role or duplicated expanded state. Content works without JS. Setup target ID lives on its summary; anchor handler opens containing details before focusing. On initial hash/hashchange also reveal containing details. Native no-JS navigation reaches the visible summary, which can be expanded. |
| Focus and hover | Underline text links; buttons have shape and explicit labels. Preserve focus in all states. | Three-pixel near-white outline with three-pixel offset on dark surfaces; no animation necessary. No hover-only information. |

Header remains in normal document flow, including on mobile. Use a 1rem scroll margin on target headings. Use instant anchor movement; no smooth scrolling or decorative motion. If motion is later added, reduced-motion disables it. Do not hijack Space or arrow keys globally. No scrollspy, carousel, modal, cookie UI, analytics, form, or persistent state is needed.

## LP-M2-T5 — Responsive wireframes

See [mobile](wireframes/mobile.svg), [tablet](wireframes/tablet.svg), and [desktop](wireframes/desktop.svg). Grayscale diagrams show content grouping and source order, not final font/color rendering or pixel-exact page height. Numbers correspond to the content map. Each full-page drawing includes all seven sections and the footer. Menu and FAQ alternate states are called out below.

| Rule | Mobile / 390px reference | Tablet / 768px reference | Desktop / 1440px reference |
| --- | --- | --- | --- |
| Container | 1rem gutters, flexible width | 1.5rem gutters | Centered, max 72rem; 2rem minimum gutters |
| Header | Brand plus Menu; expanded links below in one column | Same disclosure until nav fits | Brand and four links in one wrapping row |
| Hero | Single column; H1, description, status, stacked full-width CTAs | Single column, reading measure capped; CTAs wrap in one row | Broad text-led hero, max 20ch H1 and 65ch body; no fake app panel |
| Benefits | Three vertically stacked groups | Two columns, third on next row | Three equal columns |
| Conceptual steps | Ordered vertical list | Three columns when each has at least 13rem | Three columns |
| Five workflow examples | One column; label → input → output per item | Two columns, fifth on next row | Two columns, fifth on next row; no dense five-column strip |
| Audiences | Three stacked groups | Two columns, third on next row | Three columns |
| Status and FAQ | Status then six questions, one column | Same; max 65ch text | Same; centered reading column |
| Closing / footer | Stacked CTAs; footer wraps | Wrapping action row | Action row and compact footer |

Initial content-driven breakpoints: 42rem permits two columns with readable text; 64rem permits full navigation and three benefit/audience columns. Treat these as starting values to verify with Capriola and text zoom, not device detection. Grid uses `minmax(0, 1fr)` and children `min-width: 0`; all content can wrap. Never reorder via CSS `order`. Use auto-height sections, not viewport-height heroes.

Proximity: heading and explanation form a unit; space between units exceeds space within them. Repeated workflow items always use the same label/input/output sequence. Hierarchy: single H1, section H2, group H3, body. Progressive disclosure is limited to FAQ and narrow navigation; product identity, status, benefits, and review limitations remain visible. Mobile menu expanded state adds a link stack between header and hero; open FAQ inserts its answer below the question and pushes later content downward.

## LP-M2-T6 — Prototype implementation contract

Exactly three authored runtime source files at project root: `index.html`, `styles.css`, `script.js`. Documentation and SVG wireframes under `docs/` are planning artifacts, not runtime dependencies. LP-M2 does not create the implemented prototype.

| File | Contract |
| --- | --- |
| `index.html` | `lang="en"`, charset, viewport, title/description; external CSS and deferred external JS. Semantic header/nav/main/section/footer, one H1, logical H2/H3, real anchors/buttons, native details/summary. Essential copy is present in HTML. Text brand; no required image assets. If images are added later, meaningful alt for informative images and empty alt for purely decorative images. |
| `styles.css` | All styles here, including any font loading. Mobile-first, semantic custom properties, reusable `.container`, `.section`, `.action-group`, `.button`, `.workflow-item` classes. No inline styles. Flexible grid/flex, responsive type, content-driven breakpoints, visible focus, reduced motion, print and forced-color legibility. |
| `script.js` | Small focused functions: initialize navigation, set navigation state, reconcile viewport mode, reveal/focus hash target. One shared anchor handler and one media-query listener. One `menuOpen` state where needed; native details owns FAQ state. No framework, DOM-injected essential copy, inline handler, API call, storage, or unnecessary abstraction. |

Two-space indentation; kebab-case CSS classes/custom properties, camelCase JS functions/variables. Use `const` by default and explicit accessible state updates. Centralize spacing, type, widths, color, focus, and breakpoint rationale. Comments explain intent or focus edge cases rather than narrating syntax. Avoid duplicated mobile/desktop navigation markup. No dependencies or build system needed for behavior.

### Semantic palette and measured contrast

```css
:root {
  --color-background: #0F0E47;
  --color-surface: #272757;
  --color-surface-secondary: #505081;
  --color-accent: #8686AC;
  --color-text: #F7F7FC;
  --color-text-on-accent: var(--color-background);
  --color-border-control: var(--color-accent);
  --color-focus: var(--color-text);
  --font-primary: "Capriola", sans-serif;
  --font-code: monospace;
}
```

Calculated using WCAG sRGB relative luminance, `(Llighter + .05) / (Ldarker + .05)`, with no opacity or gradients. Ratios displayed to three decimals; thresholds evaluated before rounding.

| Pair | Ratio | Decision |
| --- | --- | --- |
| Near-white / main background | 16.749:1 | Normal text passes |
| Near-white / surface | 12.988:1 | Normal text passes |
| Near-white / secondary surface | 7.009:1 | Normal text passes |
| Accent / main background | 5.127:1 | Text and meaningful boundaries pass |
| Accent / surface | 3.976:1 | Boundary passes; normal text fails, so use near-white text |
| Accent / secondary surface | 2.146:1 | Required boundary fails; use near-white boundary here |
| Near-white / accent | 3.267:1 | Normal text fails; accent-filled CTA must use main-background text |
| Secondary surface / main background | 2.390:1 | Not a sufficient required boundary |
| Secondary surface / surface | 1.853:1 | Not a sufficient required boundary |
| Surface / main background | 1.290:1 | Decorative grouping only; spacing/headings carry structure |

Primary CTA: accent fill, main-background text, on main/surface only. Secondary CTA: near-white text, accent border, dark background. Keep these pairings on hover/active and add underline or another non-color cue. Near-white offset focus ring contrasts with the surrounding dark surface. Secondary surfaces use near-white boundaries for controls. No lowered text opacity. Status uses visible words “Documented” and “Planned,” not red/green dots. No functional status colors are needed for this informational page.

Contrast requirements follow [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html). AA target: normal text 4.5:1, qualifying large text 3:1, required UI/state visuals 3:1. Calculated colors do not establish whole-page conformance.

### Typography and sizing

Capriola for headings, navigation, body, buttons, and any future forms; `sans-serif` fallback. Apply inherited font to controls. Use weight 400 for all prototype text; no synthetic bold/italic (`font-synthesis: none`). Hierarchy comes from size, spacing, and color. Current [Google Fonts metadata](https://github.com/google/fonts/blob/main/ofl/capriola/METADATA.pb) identifies Capriola Regular at 400 and a variable weight axis from 300–700; verified 2026-09-06. Do not assume older static distributions contain additional weights.

Load Capriola 400 using a Google Fonts CSS import at the start of `styles.css` with `display=swap`; this is an external font dependency, not an extra authored source file. No other external resources needed. If font loading is blocked or offline, content must remain usable with sans-serif. Recheck the delivered font in the implemented prototype. Do not make a page-wide “no external requests” claim. Self-hosting would require a separately agreed asset allowance beyond the strict three-file package.

Starting tokens: body 1rem/1.65; small supporting text 0.875rem/1.6; H1 `clamp(2rem, 1.2rem + 3vw, 4rem)`/1.15; H2 `clamp(1.5rem, 1.2rem + 1.3vw, 2.5rem)`/1.25; H3 1.125rem/1.4. Body measure at most 65ch. Space scale .5, 1, 1.5, 2, 3, 4rem; section spacing grows from 3 to 4rem. Controls at least 44px tall with wrapping labels, never fixed height. Test browser text-spacing overrides and 200% text enlargement. Reserve monospace only for actual code/logs; none required in this copy deck.

NEAR remains general inspiration only. QAEOps uses its own text-led hero, QA input/output examples, section grouping, and original copy. No copied assets or layout reconstruction.

## LP-M2-T7 — Review and revised specification

| Review item | Result and evidence |
| --- | --- |
| Audience questions and routes | PASS — three journeys mapped to visible sections and meaningful outcomes |
| Section purpose and copy | PASS — all seven required sections have a purpose, heading, and drafted content |
| M1 consistency | PASS — approved hero/CTAs retained; exact palette and all-text Capriola explicitly supersede earlier proposals |
| Capability accuracy | PASS — documented CLI vs planned browser/cloud separated; no invented release or production-readiness claim. Inherits M1's local README evidence; runtime was not retested. |
| Destinations | PASS — every proposed link is mapped; setup hash targets a visible summary; product status is never collapsed |
| Responsive structure | PASS — three SVG wireframes plus breakpoint, reading order, and open-state rules |
| Keyboard/no-JS specification | PASS — native links/details, progressive menu enhancement, focus and Escape handling specified |
| Palette review | PASS — ten pairs computed; unsafe boundary/text pairings explicitly excluded |
| Typography review | PASS — current primary font metadata checked; 400 selected and fallback defined |
| Scope and originality | PASS — landing page only, original expression, no workspace controls |
| Rendered accessibility and interactions | PENDING IMPLEMENTATION — no claim of browser-tested conformance |
| Audience usability validation | PENDING — editorial walkthrough only, not participant research |

Revisions made during review: kept status outside disclosures; selected near-white body text instead of low-contrast accent text; excluded `#505081` as a required boundary on dark surfaces; replaced the earlier system body-font proposal with Capriola; made illustrative workflows explicitly conceptual rather than an automatic pipeline.

### Implementation acceptance scenarios

1. At 390, 768, and 1440 CSS pixels, all seven sections appear in source order; also test 320px reflow and 1280px at 400% zoom. No unintended horizontal page scroll, clipped labels, overlap, or fixed-height text loss.
2. Disable JS: all navigation links remain visible, anchor destinations work, FAQ expands natively, all essential copy remains readable.
3. With keyboard only: skip link → header links/menu → hero CTAs → workflow setup link → FAQ → closing CTAs → footer. Closed menu links are skipped; Escape returns focus correctly; no traps.
4. Open/close Menu and resize across breakpoint while focus is on the button and inside the nav. Focus never lands in a hidden element.
5. Follow both CTAs from hero and closing; URL hash and focus reach the intended visible heading. Follow setup link and load its direct URL hash; answer opens with JS and summary remains operable without it. Back/forward hash navigation works.
6. Open multiple FAQ answers; answers push content downward. Enter/Space work, summary retains focus, no content is available only on hover.
7. Verify actual font load/weight and blocked-font fallback; test 200% text enlargement, text-spacing overrides, reduced motion, keyboard focus, forced colors, and a screen reader's landmark/heading/control announcements.
8. Audit exactly three runtime source files, all style/behavior separation, every internal target, no unavailable CTA, and actual default/hover/focus contrast. Refresh dated product claims before publication.
