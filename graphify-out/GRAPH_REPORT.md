# Graph Report - .  (2026-06-02)

## Corpus Check
- 35 files · ~290,495 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 121 nodes · 118 edges · 20 communities (11 shown, 9 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.91)
- Token cost: 33,185 input · 33,185 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Page Components & UI|Page Components & UI]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Project Identity & Branding|Project Identity & Branding]]
- [[_COMMUNITY_Layout & Fonts|Layout & Fonts]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_Package Scripts|Package Scripts]]
- [[_COMMUNITY_Vital AI Mobile App|Vital AI Mobile App]]
- [[_COMMUNITY_Footer Navigation|Footer Navigation]]
- [[_COMMUNITY_How It Works Flow|How It Works Flow]]
- [[_COMMUNITY_Agent Configuration|Agent Configuration]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_README Overview|README Overview]]
- [[_COMMUNITY_File Icon|File Icon]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]
- [[_COMMUNITY_Window Icon|Window Icon]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `dependencies` - 11 edges
3. `devDependencies` - 9 edges
4. `scripts` - 5 edges
5. `VitalNow Next.js Project` - 5 edges
6. `Vital AI Health Assistant` - 5 edges
7. `WaitlistForm()` - 4 edges
8. `paths` - 2 edges
9. `CtaSection()` - 2 edges
10. `Faq()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `VitalNow Logo - Heartbeat Pulse with Molecular Nodes` --conceptually_related_to--> `VitalNow Next.js Project`  [INFERRED]
  public/images/logo.png → README.md
- `Hero Background - DNA Double Helix` --conceptually_related_to--> `VitalNow Next.js Project`  [INFERRED]
  public/images/hero-bg.png → README.md
- `Next.js Logo SVG` --conceptually_related_to--> `Next.js Framework`  [INFERRED]
  public/next.svg → README.md
- `Vercel Logo SVG` --conceptually_related_to--> `Vercel Deployment Platform`  [INFERRED]
  public/vercel.svg → README.md
- `CLAUDE.md Project Configuration` --references--> `Next.js Breaking Changes Warning`  [EXTRACTED]
  CLAUDE.md → AGENTS.md

## Hyperedges (group relationships)
- **Vital AI Quick Actions Feature Set** — vital_ai_assistant, blood_report_analysis, browse_treatments, book_ondemand_doctor, book_ondemand_nurse [EXTRACTED 1.00]
- **Phone Mockup Image Composition** — phone_frame, phone_mockup_vital_ai, phone_screen_blank [INFERRED 0.85]
- **Hero Section Visual Assets** — hero_bg_dna_helix, hero_overlay_dna_helix, vitalnow_logo [INFERRED 0.75]

## Communities (20 total, 9 thin omitted)

### Community 0 - "Page Components & UI"
Cohesion: 0.12
Nodes (11): CtaSection(), Faq(), questions, features, Hero(), Navbar(), stats, timeline (+3 more)

### Community 1 - "TypeScript Configuration"
Cohesion: 0.1
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, animejs, lenis, motion, next, @phosphor-icons/react, react, react-dom (+3 more)

### Community 3 - "Project Identity & Branding"
Cohesion: 0.22
Nodes (9): Geist Font Family, Hero Background - DNA Double Helix, Hero Overlay - DNA Double Helix, Next.js Logo SVG, Next.js Framework, Vercel Deployment Platform, Vercel Logo SVG, VitalNow Logo - Heartbeat Pulse with Molecular Nodes (+1 more)

### Community 4 - "Layout & Fonts"
Cohesion: 0.25
Nodes (6): geistMono, geistSans, inter, metadata, montaga, SmoothScroll()

### Community 5 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 6 - "Package Scripts"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 7 - "Vital AI Mobile App"
Cohesion: 0.29
Nodes (8): Analyse Blood Report Feature, Book On-Demand Doctor Feature, Book On-Demand Nurse Feature, Browse Treatments Feature, iPhone Frame Mockup Shell, Phone Mockup - Vital AI App Interface, Phone Screen - Blank White Content Area, Vital AI Health Assistant

### Community 8 - "Footer Navigation"
Cohesion: 0.5
Nodes (3): Footer(), mainLinks, resourceLinks

## Knowledge Gaps
- **70 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+65 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Package Scripts`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `VitalNow Next.js Project` (e.g. with `VitalNow Logo - Heartbeat Pulse with Molecular Nodes` and `Hero Background - DNA Double Helix`) actually correct?**
  _`VitalNow Next.js Project` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _70 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Components & UI` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._
- **Should `TypeScript Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._