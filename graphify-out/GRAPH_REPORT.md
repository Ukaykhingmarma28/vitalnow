# Graph Report - .  (2026-06-04)

## Corpus Check
- 37 files · ~294,220 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 122 nodes · 122 edges · 19 communities (10 shown, 9 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Landing Page Components|Landing Page Components]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Package Scripts & Metadata|Package Scripts & Metadata]]
- [[_COMMUNITY_Dev Dependencies & Tooling|Dev Dependencies & Tooling]]
- [[_COMMUNITY_Project Docs & Next.js Setup|Project Docs & Next.js Setup]]
- [[_COMMUNITY_Hero & App Mockup Imagery|Hero & App Mockup Imagery]]
- [[_COMMUNITY_FAQ Section|FAQ Section]]
- [[_COMMUNITY_Claude Code Permissions|Claude Code Permissions]]
- [[_COMMUNITY_How It Works Section|How It Works Section]]
- [[_COMMUNITY_Brand Logo Assets|Brand Logo Assets]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Generic UI Icons|Generic UI Icons]]
- [[_COMMUNITY_Next.jsVercel Branding|Next.js/Vercel Branding]]
- [[_COMMUNITY_Globe Icon|Globe Icon]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `scripts` - 5 edges
3. `WaitlistForm()` - 4 edges
4. `VitalNow Project README` - 4 edges
5. `Next.js Agent Rules (Modified Next.js)` - 3 edges
6. `Phone Mockup - Vital AI App Home Screen` - 3 edges
7. `permissions` - 2 edges
8. `CtaSection()` - 2 edges
9. `Faq()` - 2 edges
10. `features` - 2 edges

## Surprising Connections (you probably didn't know these)
- `Next.js Agent Rules (Modified Next.js)` --conceptually_related_to--> `Next.js Project (create-next-app)`  [INFERRED]
  AGENTS.md → README.md
- `CLAUDE.md AGENTS.md Include` --references--> `Next.js Agent Rules (Modified Next.js)`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `VitalNow Logo Icon (PNG)` --semantically_similar_to--> `VitalNow Logo Lockup (Dark Wordmark SVG)`  [INFERRED] [semantically similar]
  public/images/logo.png → public/images/logo-dark.svg
- `VitalNow Logo Icon (PNG)` --semantically_similar_to--> `VitalNow Logo Lockup (Light Wordmark SVG)`  [INFERRED] [semantically similar]
  public/images/logo.png → public/images/logo.svg
- `VitalNow Logo Lockup (Light Wordmark SVG)` --semantically_similar_to--> `VitalNow Logo Lockup (Dark Wordmark SVG)`  [INFERRED] [semantically similar]
  public/images/logo.svg → public/images/logo-dark.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **VitalNow brand logo asset family (cyan gradient diamond pulse mark)** — images_logo, images_logo_svg, images_logo_dark [INFERRED 0.85]
- **Phone visual composite (frame + screen + mockup)** —  [INFERRED 0.85]
- **Next.js Starter Boilerplate Icons** —  [INFERRED 0.85]

## Communities (19 total, 9 thin omitted)

### Community 0 - "Landing Page Components"
Cohesion: 0.12
Nodes (13): CtaSection(), features, Footer(), mainLinks, resourceLinks, Hero(), links, Navbar() (+5 more)

### Community 1 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 2 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, animejs, lenis, motion, next, @phosphor-icons/react, react, react-dom (+3 more)

### Community 3 - "Root Layout & Fonts"
Cohesion: 0.25
Nodes (6): geistMono, geistSans, inter, metadata, montaga, SmoothScroll()

### Community 4 - "Package Scripts & Metadata"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "Dev Dependencies & Tooling"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 6 - "Project Docs & Next.js Setup"
Cohesion: 0.29
Nodes (8): Next.js Agent Rules (Modified Next.js), Next.js Bundled Docs Reference, CLAUDE.md AGENTS.md Include, app/page.tsx Entry Page, next/font Geist Optimization, Next.js Project (create-next-app), Vercel Deployment, VitalNow Project README

### Community 7 - "Hero & App Mockup Imagery"
Cohesion: 0.50
Nodes (5): Hero Background - DNA Double Helix, Hero Overlay - DNA Double Helix (WebP), iPhone Frame Mockup (Empty Screen), Phone Mockup - Vital AI App Home Screen, Phone Screen Content Layer (Transparent)

### Community 11 - "Brand Logo Assets"
Cohesion: 1.00
Nodes (3): VitalNow Logo Icon (PNG), VitalNow Logo Lockup (Dark Wordmark SVG), VitalNow Logo Lockup (Light Wordmark SVG)

## Knowledge Gaps
- **67 isolated node(s):** `allow`, `eslintConfig`, `nextConfig`, `name`, `version` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Runtime Dependencies` to `Package Scripts & Metadata`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies & Tooling` to `Package Scripts & Metadata`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **What connects `allow`, `eslintConfig`, `nextConfig` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Landing Page Components` be split into smaller, more focused modules?**
  _Cohesion score 0.11666666666666667 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._