# Graph Report - .  (2026-08-09)

## Corpus Check
- 100 files · ~116,514 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 377 nodes · 531 edges · 36 communities (28 shown, 8 thin omitted)
- Extraction: 91% EXTRACTED · 8% INFERRED · 1% AMBIGUOUS · INFERRED: 44 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Applications Navigation & Events
- Application & Apply Flow
- Marketplace & Cart
- TypeScript Compiler Config
- Runtime Dependencies
- Build Tooling & ESLint
- Header, Footer & Auth Modal
- AIBO Wave Brand & Philosophy
- Hero Carousel & Gallery Images
- Seller Dashboard & Admin
- Product Creation Form
- Gallery Page Components
- About & Vision Pages
- Album Management
- Become a Seller Wizard
- Events Pages
- Societies Pages
- Stories Pages
- AIBOW Brand Banner
- OpenCode Plugin Config
- Default Avatar Assets
- Gallery Brand Banner
- ESLint Core Web Vitals
- Graphify Plugin Hook
- Values Component
- Next Config
- AIBO Logo Assets
- Unanalyzed Gallery Image
- Zustand Cart State

## God Nodes (most connected - your core abstractions)
1. `useAuth()` - 41 edges
2. `compilerOptions` - 16 edges
3. `Button` - 14 edges
4. `useCartStore` - 13 edges
5. `AIBO Wave Next.js App` - 13 edges
6. `SellerLayout()` - 8 edges
7. `Header()` - 7 edges
8. `scripts` - 5 edges
9. `Product` - 5 edges
10. `LeftNavigation` - 5 edges

## Surprising Connections (you probably didn't know these)
- `AIBOW App Logo Artboard (Artboard 1@2x-8.png)` --conceptually_related_to--> `Header()`  [AMBIGUOUS]
  Artboard 1@2x-8.png → components/Header.tsx
- `AIBOW Artboard Logo (public/artboard-logo.png)` --conceptually_related_to--> `Header()`  [AMBIGUOUS]
  Artboard 1@2x-8.png → components/Header.tsx
- `Applications` --semantically_similar_to--> `Admin Vendor Approval`  [INFERRED] [semantically similar]
  components/dashboard/README.md → TEST_CASES.md
- `Echoes of the Heart (AIBO Companion)` --conceptually_related_to--> `Echoes of the Heart Card`  [INFERRED]
  graphify-out/transcripts/Echoes_of_Heart.txt → public/Card - Echoes of the Heart.pdf
- `Header()` --references--> `AIBOW Logo (public/aibow-logo.png)`  [EXTRACTED]
  components/Header.tsx → Artboard 1@2x-8.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Dashboard Section System** — components_dashboard_readme_leftnavigation, components_dashboard_readme_profile, components_dashboard_readme_applications, components_dashboard_readme_overview, components_dashboard_readme_settings [EXTRACTED 1.00]
- **Seller Role Test Flow** — test_cases_seller_flow, test_cases_admin_vendor_approval, test_cases_seller_dashboard, test_cases_wallet_withdrawals, test_cases_commission, test_cases_minimum_payout [INFERRED 0.85]
- **AIBO Wave Brand Identity** — readme_aibo_wave_app, content_mission, content_vision, content_philosophy, content_core_values, content_societies [INFERRED 0.85]
- **AIBO Wave Philosophy Pillars** — aibow_2x_aibo_wave, aibow_2x_artistry_interplay, aibow_2x_beacon_o_wave [INFERRED 0.75]
- **AIBOW Brand Logo Assets** — artboard_1_2x_8_logo, public_aibow_logo_logo, public_artboard_logo_logo [INFERRED 0.85]
- **AIBO Wave Brand Asset Set (symbol + wordmark + brand identity)** — public_artboard_logo_logo, public_aibow_logo_logo, aibo_wave_brand_identity [INFERRED 0.85]
- **Default Avatar Design Elements** — public_default_avatar_defaultavatar, public_default_avatar_personsilhouette, public_default_avatar_bluegradient, public_default_avatar_roundedavatarshape [EXTRACTED 1.00]
- **Hero Fallback Carousel Image Set** — public_gallery_1, public_gallery_2, public_gallery_3, public_gallery_4, public_gallery_5 [INFERRED 0.85]
- **Home Hero Fallback Carousel Images** — public_gallery_1, public_gallery_3, public_gallery_4 [INFERRED 0.75]
- **Hero Carousel Fallback Images** — public_gallery_1, public_gallery_2, public_gallery_3, public_gallery_4, public_gallery_5 [EXTRACTED 1.00]
- **AIBO Wave Brand Banner (Artistry Interplay / Beacon O Wave)** — public_gallery_7, artistry_interplay, beacon_o_wave [INFERRED 0.85]

## Communities (36 total, 8 thin omitted)

### Community 0 - "Applications Navigation & Events"
Cohesion: 0.07
Nodes (41): ApplicationRecord, Applications(), TabType, Event, Events(), Registration, LeftNavigation(), LeftNavigationProps (+33 more)

### Community 1 - "Application & Apply Flow"
Cohesion: 0.08
Nodes (21): ApplicationModal(), ApplicationModalProps, ApplicationTypes(), ApplyHero(), FAQ(), ProfileFormData, CallToAction(), MemberBenefits() (+13 more)

### Community 2 - "Marketplace & Cart"
Cohesion: 0.13
Nodes (16): ProductCard(), Props, ProductFilters(), Props, CartPage(), Props, ProductDetailPage(), Props (+8 more)

### Community 3 - "TypeScript Compiler Config"
Cohesion: 0.08
Nodes (25): dom, dom.iterable, esnext, next-env.d.ts, node_modules, **/*.ts, **/*.tsx, compilerOptions (+17 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.08
Nodes (23): lucide-react, next, dependencies, lucide-react, next, qrcode.react, react, react-dom (+15 more)

### Community 5 - "Build Tooling & ESLint"
Cohesion: 0.10
Nodes (21): autoprefixer, eslint, eslint-config-next, devDependencies, autoprefixer, eslint, eslint-config-next, postcss (+13 more)

### Community 6 - "Header, Footer & Auth Modal"
Cohesion: 0.14
Nodes (14): AIBO Wave Brand Identity, Responsive Logo Strategy (symbol for mobile, wordmark for desktop), AIBOW App Logo Artboard (Artboard 1@2x-8.png), AuthModal(), AuthModalProps, initialLoginState, initialRegisterState, Footer() (+6 more)

### Community 7 - "AIBO Wave Brand & Philosophy"
Cohesion: 0.11
Nodes (19): Graphify Workflow Rules, Core Values (Inclusivity, Sustainability, Community, Innovation), AIBO Wave Mission, AIBO Wave Philosophy, AIBO Wave Societies, AIBO Wave Vision, Echoes of the Heart (AIBO Companion), Echoes of the Heart Card (+11 more)

### Community 8 - "Hero Carousel & Gallery Images"
Cohesion: 0.17
Nodes (15): Carousel(), CarouselProps, FALLBACK_IMAGES, fetchFirst5(), Hero(), IMAGE_EXTENSIONS, isImageKey(), Gallery Image 1 (+7 more)

### Community 9 - "Seller Dashboard & Admin"
Cohesion: 0.22
Nodes (13): Applications, LeftNavigation, Overview, Profile, Settings, Dashboard Shared Dependencies (AuthContext, Toast, Tailwind), Admin Vendor Approval, 10% Platform Commission (+5 more)

### Community 10 - "Product Creation Form"
Cohesion: 0.18
Nodes (10): Category, emptyForm(), FormState, ImageEntry, ImageUploaderProps, NewProductPage(), Size, SizeVariant (+2 more)

### Community 11 - "Gallery Page Components"
Cohesion: 0.29
Nodes (5): fetchGalleryImages(), GalleryGrid(), IMAGE_EXTENSIONS, isImageKey(), GalleryHero()

### Community 12 - "About & Vision Pages"
Cohesion: 0.31
Nodes (4): AboutHero(), philosophies, Philosophy(), Vision()

### Community 13 - "Album Management"
Cohesion: 0.33
Nodes (6): AlbumCard(), fetchAlbumMeta(), IMAGE_EXTENSIONS, isImageKey(), Album, ALBUMS

### Community 14 - "Become a Seller Wizard"
Cohesion: 0.25
Nodes (6): BecomeSellerPage(), FormData, INITIAL, STEPS, StoreDetailsStep(), toSlug()

### Community 15 - "Events Pages"
Cohesion: 0.36
Nodes (3): DetailedProgram(), EventsHero(), QuickFacts()

### Community 16 - "Societies Pages"
Cohesion: 0.36
Nodes (3): SocietiesHero(), SocietiesInfo(), SocietiesList()

### Community 18 - "AIBOW Brand Banner"
Cohesion: 1.00
Nodes (4): AIBO Wave (Brand), Artistry Interplay (Philosophy Pillar), Beacon O Wave (Philosophy Pillar), AIBOW Brand Banner (Wordmark)

### Community 19 - "OpenCode Plugin Config"
Cohesion: 0.50
Nodes (3): plugin, $schema, .opencode/plugins/graphify.js

### Community 20 - "Default Avatar Assets"
Cohesion: 0.67
Nodes (4): Soft Blue Gradient Background, Default Avatar, Person Silhouette Iconography, Rounded-Corner Avatar Shape

### Community 21 - "Gallery Brand Banner"
Cohesion: 1.00
Nodes (3): Artistry Interplay (brand), Beacon O Wave (brand), Gallery 7 (AIBO Wave brand banner)

## Ambiguous Edges - Review These
- `Header()` → `AIBOW App Logo Artboard (Artboard 1@2x-8.png)`  [AMBIGUOUS]
  Artboard 1@2x-8.png · relation: conceptually_related_to
- `Header()` → `AIBOW Artboard Logo (public/artboard-logo.png)`  [AMBIGUOUS]
  public/artboard-logo.png · relation: conceptually_related_to
- `AIBO Wave Logo` → `AIBO Companion Brand Identity`  [AMBIGUOUS]
  public/aibow-logo.png · relation: semantically_similar_to
- `Gallery Image 6 (AIBO Companion Lifestyle Shot)` → `Gallery Image Content (Unanalyzed - No Vision Access)`  [AMBIGUOUS]
  public/gallery-6.jpeg · relation: conceptually_related_to

## Knowledge Gaps
- **124 isolated node(s):** `extends`, `next/core-web-vitals`, `$schema`, `.opencode/plugins/graphify.js`, `ApplicationModalProps` (+119 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Header()` and `AIBOW App Logo Artboard (Artboard 1@2x-8.png)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Header()` and `AIBOW Artboard Logo (public/artboard-logo.png)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `AIBO Wave Logo` and `AIBO Companion Brand Identity`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._
- **What is the exact relationship between `Gallery Image 6 (AIBO Companion Lifestyle Shot)` and `Gallery Image Content (Unanalyzed - No Vision Access)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `useAuth()` connect `Applications Navigation & Events` to `Application & Apply Flow`, `Marketplace & Cart`, `Header, Footer & Auth Modal`, `Product Creation Form`, `Become a Seller Wizard`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `Button` connect `Application & Apply Flow` to `Applications Navigation & Events`, `Societies Pages`, `Header, Footer & Auth Modal`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `useCartStore` connect `Marketplace & Cart` to `Applications Navigation & Events`, `Header, Footer & Auth Modal`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._