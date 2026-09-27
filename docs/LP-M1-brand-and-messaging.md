# LP-M1 — Brand and Messaging

Status: Deliverables complete; recommended direction ready for owner review.
Update 2026-09-06: LP-M2 adopts this messaging as approved. Its supplied palette values and requirement for Capriola across all interface text supersede the earlier visual-input gaps and body-font proposal below. See `LP-M2-content-and-ux.md` for the current implementation contract.
Date: 2026-09-06
Scope: QAEOps public landing-page identity and messaging, before layout planning.

## Evidence and scope

The web workspace was empty at review. Product context was checked against `D:\Project Agent\QAEOps\QAEOps v.0\README.md` on the date above. That README describes a local-first command-line quality engineering assistant, lists CLI workflows as released, and marks Web UI and cloud-model support as planned. It also makes package-index installation conditional on publication.

This is a messaging review, not runtime or release verification. “Documented in the CLI” below means reported by the current local README; it does not establish public availability, production readiness, or passing release gates. Historical CLI-first planning informed the direction but was not used as proof of delivered features. QAEOps (Web) is treated here as the public website for that product, with a future browser interface kept distinct.

## LP-M1-T1 — Audience matrix

Audience needs are working hypotheses for copy, not findings from customer interviews.

| Audience | Motivation | Questions to answer | Information needed | Concrete benefit to communicate |
| --- | --- | --- | --- | --- |
| Businesses: QA leads, engineering managers, evaluators | Evaluate assistance for repetitive QA preparation while preserving review responsibility | What work does it support? Where does processing happen? What setup is needed? Is it ready for our team? | Workflow examples, local model requirements, honest maturity/status, output review expectations, verified distribution details when available | Structured drafts give a team a common starting point for reviewing requirements and tests |
| Individual QA professionals: manual testers, automation engineers, SDETs | Prepare tests and automation starting points without repeatedly drafting everything from scratch | What can I do with it? Do I need coding or AI experience? Does it run in a browser? What hardware/software is required? | Plain workflow descriptions, CLI explanation, prerequisites, example outputs, limitations | Draft test cases, synthetic data, and Playwright scaffolding provide material the engineer can inspect and adapt |
| General visitors: learners, collaborators, curious readers | Understand the product and whether it is relevant | What is QAEOps? What does QA mean? Who uses it? Is it a service or an app? | Immediate category and audience, short example, current product status, plain definitions | Understand where AI assistance fits into software testing and who remains responsible |

## LP-M1-T2 — Positioning

**Positioning statement:** For QA professionals and software teams preparing software tests, QAEOps is a local-first command-line assistant that supports requirements analysis, test drafting, and automation preparation with AI assistance, while keeping review and decisions with the engineer.

**Plain-language description:** QAEOps helps people who test software prepare their work. Its command-line tools support analyzing requirements, drafting test cases, creating synthetic test data, scaffolding Playwright automation, and reviewing bug reports. It uses LM Studio for local AI assistance. Engineers review and adapt the results before using them. A browser-based interface is planned.

**Problem:** Preparing test inputs, cases, and automation starting points involves repeated drafting and interpretation. QAEOps aims to assist that preparation without presenting generated output as a finished quality decision.

## LP-M1-T3 — Value proposition and pillars

**Value proposition:** Move from software requirements to reviewable testing materials with local AI assistance and engineering judgment at every step.

| Pillar | Supporting benefit | Example copy | Claim boundary |
| --- | --- | --- | --- |
| Practical help with QA preparation | Individuals get drafts to adapt; teams get structured material to review | “Prepare test cases, test data, and automation starting points.” | No guaranteed time savings, coverage, defect detection, or production-ready code |
| Local-first operation | Evaluators can consider a workflow built around local model execution | “Use LM Studio for local AI assistance.” | Local-first describes architecture, not a security certification or an absolute promise that data can never leave a device |
| Engineer-led review | People retain responsibility for interpreting requirements and deciding what to test | “Review the output. Apply your judgment. Decide what comes next.” | No autonomous end-to-end QA, replacement of QA roles, or guaranteed correctness |

### Capability and claim register

| Capability or claim | Evidence status | Permitted wording / treatment |
| --- | --- | --- |
| Requirements analysis, test-case generation, synthetic test data, Playwright scaffolding, bug review | Documented in the CLI README as released; not executed in this milestone | “The CLI supports…” in descriptive copy; use “draft” and “scaffold” where applicable |
| LM Studio integration and workspace initialization | Documented in the CLI README | Describe local setup; do not imply zero setup or universal hardware compatibility |
| Browser-based product interface | Planned in the README | “Browser-based interface — planned”; keep separate from CLI capability lists |
| Cloud-model support | Planned in the README | Omit from hero; label “planned” if included in roadmap content |
| Public package, download, hosted demo, signup, sales service | Not verified | No availability claims or action buttons for these destinations |
| Team collaboration, integrations beyond verified scope, managed service, autonomous execution | Not established here | Omit; do not invent a roadmap commitment |
| Performance, ROI, customer adoption, security/compliance certification | No supporting evidence reviewed | No statistics, testimonials, customer logos, superiority claims, or certification badges |

“Planned” means intended direction, with no promised delivery date. Do not mix planned items with current CLI descriptions without a visible status label. AI-generated results can be incomplete or incorrect; include a concise review expectation near workflow descriptions. Do not reuse absolute README claims such as “your data never leaves your machine” or imply AI outputs are deterministic.

## LP-M1-T4 — Voice and terminology

Personality: clear, capable, thoughtful, and grounded. Explain useful work before technology. Be welcoming to newcomers and precise enough for technical evaluators.

- Write short, active sentences. Prefer concrete verbs: analyze, draft, review, create, scaffold.
- Use **QAEOps** consistently; use **QAEOps (Web)** only as the internal website project name.
- Expand **quality assurance (QA)** on first use in introductory explanatory content. Explain **command-line interface (CLI)** as tools run from a terminal.
- Use **AI-assisted**, **local-first**, and **reviewable** with a concrete explanation, rather than stacking them as slogans.
- Use **Playwright scaffolding** or **automation starting points**, not “fully automated testing.”
- Use **synthetic test data**, not “safe data” or “anonymized customer data.”
- Reserve **available**, **released**, **free**, and **open source** for a verified distribution, price, or license claim. Source access alone is not a license claim.
- Avoid “revolutionary,” “best,” “enterprise-grade,” “effortless,” “zero bugs,” and “replace your QA team.”

| Context | Sample copy |
| --- | --- |
| Business benefit | “Give your QA team structured test drafts to review and adapt.” |
| Individual benefit | “Start with a test-case draft, then refine it for your application.” |
| General explanation | “QAEOps assists people who check whether software works as intended.” |
| Limitation | “AI-generated output needs review before use.” |
| Product status | “QAEOps currently takes a CLI-first approach. A browser-based interface is planned.” |

## LP-M1-T5 — Hero options

### Option 1 — Recommended: direct product clarity

**Headline:** Local AI assistance for QA professionals and software teams.

**Subheadline:** QAEOps is a command-line assistant for analyzing requirements, drafting test cases, and preparing automation starting points. You review the results and decide what comes next.

**Status line:** CLI-first product. Browser-based interface planned.

Rationale: Identifies the audience, category, practical work, and review responsibility immediately. It gives businesses and individuals the same credible product story without suggesting a live web application.

### Option 2 — Workflow emphasis

**Headline:** Turn requirements into testing starting points.

**Subheadline:** QAEOps helps QA professionals and software teams analyze requirements, draft test cases, and scaffold Playwright automation through a local-first command-line workflow.

**Status line:** Review and adapt generated output before use. Browser-based interface planned.

Rationale: More task-focused, but the headline needs its supporting description to identify the product and audience.

### Option 3 — Human judgment emphasis

**Headline:** AI-assisted test preparation. Engineer-led decisions.

**Subheadline:** QAEOps is a local-first command-line assistant for QA professionals and software teams, supporting requirements analysis, test drafts, and automation preparation.

**Status line:** Generated output needs review. Browser-based interface planned.

Rationale: Clearly communicates responsibility, but is less immediately concrete than Option 1.

## LP-M1-T6 — CTA specification

Use informational, same-page links until a real public product destination is verified. These are implementation contracts for the future page; no live page or anchors exist yet.

| Priority | Exact label | Destination | Required content and behavior |
| --- | --- | --- | --- |
| Primary | Explore CLI workflows | `#cli-workflows` | Navigate to text describing the five documented workflows, sample input/output types, prerequisites, and review expectations. No execution, signup, or download implied. |
| Secondary | View product status | `#product-status` | Navigate to a dated summary separating documented CLI functionality, planned Web UI/cloud support, and distribution status. |

Implement as semantic anchor links, in the same tab, usable with keyboard and without JavaScript. Destination headings must remain visible below any fixed header. If scripted navigation is added, preserve focus and respect reduced-motion preferences. Each target must exist before its link is displayed.

Do not show “Launch app,” “Try now,” “Get started,” “Download,” “Book a demo,” or “Join the waitlist” without a verified destination that fulfills that action. Future CTA changes require a destination check, not merely a label change.

## LP-M1-T7 — Visual identity constraints

| Requirement | Fixed constraint and implementation guidance |
| --- | --- |
| Blue Eclipse | Fixed palette direction. Exact swatches/hex values were not supplied or found in this workspace; do not invent an authoritative palette. Obtain the reference before final color-token approval. Assign background, surface, text, accent, border, and focus roles only after contrast checks. |
| Capriola | Fixed brand typeface. Use for the QAEOps identity and display headings. Proposed supporting treatment: a readable system sans-serif for body copy and monospace for commands. Verify actual font files, licensing, available weights, loading, and fallback before implementation. |
| Original QAEOps expression | Build the visual language around understandable QA artifacts: requirements, test drafts, review decisions, and traceable outputs. Use original typography composition, iconography, copy, and illustrations. No implied customer or certification marks. |
| NEAR inspiration | Inspiration only. No specific NEAR page was supplied or inspected. Do not claim a precise reference analysis, copy its wording, logo, artwork, or distinctive composition. Translate any later reference into general qualities such as clear hierarchy and purposeful spacing. |
| Accessibility | Target WCAG 2.2 AA; compliance is a future implementation verification, not an achieved brand claim. |

Accessibility requirements: at least 4.5:1 contrast for normal text and 3:1 for qualifying large text; at least 3:1 for required interface/state visuals. Do not communicate status through color alone. Provide visible keyboard focus, meaningful link labels, semantic headings, and appropriate alternative text. Support 200% text resizing and reflow at 320 CSS pixels where applicable. Use at least 24 × 24 CSS-pixel pointer targets subject to WCAG exceptions; prefer 44 × 44 for main CTAs. Avoid flashing and decorative autoplay; respect reduced motion. Test actual color pairs and rendered Capriola readability across mobile and desktop. These requirements follow [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## LP-M1-T8 — Completed editorial review

This checklist evaluates the proposed brief, not a built page or audience usability study.

| Check | Result | Evidence / boundary |
| --- | --- | --- |
| Product and audience clear in hero | PASS | Option 1 names QA professionals/software teams and describes a command-line assistant |
| Business benefits concrete | PASS | Structured drafts and shared review starting points; no ROI or enterprise-readiness promise |
| Individual benefits concrete | PASS | Requirements, test drafts, synthetic data, and automation starting points |
| General visitors can understand the category | PASS | Plain-language description explains people testing software; introductory copy defines QA/CLI |
| Current and proposed capability separated | PASS | Capability register and explicit planned browser-interface status |
| No invented social proof or metrics | PASS | No testimonials, customer logos, metrics, or certifications proposed |
| CTA labels describe their actions | PASS — specification | Two informational anchor links; target existence must be checked during implementation |
| Brand naming and tone consistent | PASS | QAEOps spelling, concrete verbs, engineer review throughout |
| Blue Eclipse and Capriola fixed | PASS — documented | Exact palette reference remains an input for visual design |
| NEAR remains inspiration | PASS | Original expression required; no reference-specific claims or copied assets |
| Accessibility requirements documented | PASS — specification | WCAG target and measurable checks; rendered conformance not yet tested |
| One recommended direction | PASS | Option 1 with the two informational CTAs |

**Review recommendation:** Adopt Option 1, the three pillars, and the informational CTAs as the LP-M1 messaging direction. All eight deliverables are prepared for owner review; owner approval is pending. Before final visual design, resolve the exact Blue Eclipse reference. Before publication, recheck feature claims against the release being presented, verify any public destination, and test the implemented accessibility requirements. No layout, deployment, or release certification is included in this milestone.
