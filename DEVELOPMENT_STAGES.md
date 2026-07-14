# Smart Logistics Tracking Dashboard - Miniature Development Stages

## Overview

80+ granular stages organized by day, architectural layer, and feature. Each stage is a single, verifiable commit-worthy task.

---

## DAY 1: Foundation & Core Features

### Phase 1: Project Setup & Configuration (Stages 1-12)

| #   | Stage                                                                                                                           | Verification                                                 |
| --- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | Initialize Next.js 14+ project with App Router, TypeScript, pnpm                                                                | `pnpm create next-app@latest --ts --app --eslint --tailwind` |
| 2   | Configure pnpm workspace with exact versions in `package.json`                                                                  | `pnpm install` succeeds, lockfile committed                  |
| 3   | Install core dependencies: `@tanstack/react-query`, `zod`, `react-hook-form`, `framer-motion`, `@hookform/resolvers`            | All packages in `dependencies`, no peer conflicts            |
| 4   | Install dev dependencies: `eslint`, `prettier`, `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `ts-jest`, `msw` | `pnpm test` runs without config errors                       |
| 5   | Create `.env.example` with `NEXT_PUBLIC_API_BASE_URL`                                                                           | File exists with placeholder URL                             |
| 6   | Create `.env.local` with mock API base URL for development                                                                      | Local dev works against mock server                          |
| 7   | Configure TypeScript `tsconfig.json` with strict mode, path aliases (`@/*`)                                                     | `pnpm tsc --noEmit` passes                                   |
| 8   | Configure ESLint with Next.js, TypeScript, React hooks rules                                                                    | `pnpm lint` passes on empty project                          |
| 9   | Configure Prettier with Tailwind plugin                                                                                         | `pnpm format --check` passes                                 |
| 10  | Configure Jest with `ts-jest`, React Testing Library, `jest-environment-jsdom`                                                  | `pnpm test` runs sample test                                 |
| 11  | Configure MSW (Mock Service Worker) for API mocking                                                                             | Handler intercepts `/api/shipments` requests                 |
| 12  | Create folder structure per architecture: `src/{app,components,features,lib,providers,constants,styles,types}`                  | All directories exist with `.gitkeep`                        |

### Phase 2: Architecture Foundation (Stages 13-20)

| #   | Stage                                                                                                     | Verification                            |
| --- | --------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 13  | Create `providers/QueryProvider.tsx` wrapping app with TanStack Query Client                              | Provider renders without error          |
| 14  | Create `lib/query/queryClient.ts` with default options (staleTime, retry, refetchOnWindowFocus)           | QueryClient configured                  |
| 15  | Create `lib/api/http-client.ts` - thin fetch wrapper with base URL from env, timeout, error normalization | Reusable fetch wrapper with tests       |
| 16  | Create `constants/shipment-status.ts` - status enum, display labels, valid transitions map                | Single source of truth for status logic |
| 17  | Create `constants/shipment-priority.ts` - priority enum, display labels, sort order                       | Priority constants exported             |
| 18  | Create `types/domain.ts` - core domain interfaces (Shipment, Courier, TimelineEvent, ShipmentSummary)     | Domain types decoupled from API         |
| 19  | Create `types/api.ts` - transport layer interfaces matching API contract exactly                          | API types separate from domain          |
| 20  | Create `lib/utils/date.ts` - date formatting, relative time, ISO parsing utilities                        | Pure functions, tested                  |

### Phase 3: Domain Layer - Entities & Repository Contracts (Stages 21-28)

| #   | Stage                                                                                                                                                      | Verification                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| 21  | Create `features/shipment-tracking/domain/entities/shipment.ts` - Shipment entity with behavior methods (`canAdvance()`, `getNextStatus()`, `isDelayed()`) | Entity encapsulates business rules |
| 22  | Create `features/shipment-tracking/domain/entities/timeline-event.ts` - TimelineEvent entity with ordering                                                 | Entity sorts chronologically       |
| 23  | Create `features/shipment-tracking/domain/entities/courier.ts` - Courier value object                                                                      | Immutable value object             |
| 24  | Create `features/shipment-tracking/domain/repositories/shipment-repository.ts` - Repository interface (contract)                                           | Interface only, no implementation  |
| 25  | Create `features/shipment-tracking/domain/repositories/shipment-summary-repository.ts` - Summary repository interface                                      | Separate contract for summaries    |
| 26  | Create `features/shipment-tracking/domain/value-objects/tracking-number.ts` - Branded type for tracking numbers                                            | Type-safe tracking numbers         |
| 27  | Create `features/shipment-tracking/domain/value-objects/status-transition.ts` - Valid transition validator                                                 | Pure validation function           |
| 28  | Create `features/shipment-tracking/domain/errors/domain-errors.ts` - Custom error classes (NotFound, InvalidTransition, NetworkError)                      | Typed errors for each failure mode |

### Phase 4: Infrastructure Layer - API Schemas & Mapping (Stages 29-38)

| #   | Stage                                                                                                                                               | Verification                    |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| 29  | Create `features/shipment-tracking/infrastructure/api/schemas/shipment-schema.ts` - Zod schema for API shipment response                            | Validates illustrative response |
| 30  | Create `features/shipment-tracking/infrastructure/api/schemas/shipment-summary-schema.ts` - Zod schema for summary response                         | Validates summary shape         |
| 31  | Create `features/shipment-tracking/infrastructure/api/schemas/timeline-event-schema.ts` - Zod schema for events response                            | Validates events array          |
| 32  | Create `features/shipment-tracking/infrastructure/api/schemas/status-update-schema.ts` - Zod schema for mutation request/response                   | Validates payload and response  |
| 33  | Create `features/shipment-tracking/infrastructure/api/mappers/shipment-mapper.ts` - Map API → Domain Shipment                                       | Pure mapping function, tested   |
| 34  | Create `features/shipment-tracking/infrastructure/api/mappers/timeline-event-mapper.ts` - Map API → Domain TimelineEvent                            | Pure mapping function, tested   |
| 35  | Create `features/shipment-tracking/infrastructure/api/mappers/summary-mapper.ts` - Map API → Domain ShipmentSummary                                 | Pure mapping function, tested   |
| 36  | Create `features/shipment-tracking/infrastructure/api/endpoints.ts` - Endpoint constants with path builders                                         | No magic strings elsewhere      |
| 37  | Create `features/shipment-tracking/infrastructure/api/query-keys.ts` - TanStack Query key factory                                                   | Consistent keys, typed params   |
| 38  | Create `features/shipment-tracking/infrastructure/repositories/shipment-repository-impl.ts` - Repository implementation using http-client + mappers | Implements domain contract      |

### Phase 5: Application Layer - Use Cases (Stages 39-46)

| #   | Stage                                                                                                                                          | Verification                   |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| 39  | Create `features/shipment-tracking/application/use-cases/get-shipments.use-case.ts` - Fetch list with search/filter/sort params                | Returns Domain Shipment[]      |
| 40  | Create `features/shipment-tracking/application/use-cases/get-shipment.use-case.ts` - Fetch single shipment by tracking number                  | Returns Domain Shipment        |
| 41  | Create `features/shipment-tracking/application/use-cases/get-shipment-events.use-case.ts` - Fetch timeline events                              | Returns Domain TimelineEvent[] |
| 42  | Create `features/shipment-tracking/application/use-cases/get-shipment-summary.use-case.ts` - Fetch dashboard summary                           | Returns Domain ShipmentSummary |
| 43  | Create `features/shipment-tracking/application/use-cases/advance-shipment-status.use-case.ts` - Validate transition, call repo, return updated | Enforces business rules        |
| 44  | Create `features/shipment-tracking/application/use-cases/filter-shipments.use-case.ts` - Client-side filter/sort helpers                       | Pure functions, tested         |
| 45  | Create `features/shipment-tracking/application/use-cases/index.ts` - Barrel export for all use cases                                           | Clean imports                  |
| 46  | Write unit tests for status transition validation (valid, invalid, edge cases)                                                                 | `pnpm test` passes             |

---

## DAY 1 CONTINUED: Presentation Layer - Dashboard & List

### Phase 6: UI Primitives & Layout Components (Stages 47-56)

| #   | Stage                                                                                                  | Verification              |
| --- | ------------------------------------------------------------------------------------------------------ | ------------------------- |
| 47  | Create `components/ui/Button.tsx` - variants (primary, secondary, ghost, danger), sizes, loading state | Accessible, tested        |
| 48  | Create `components/ui/Input.tsx` - label, error, helper text, controlled/uncontrolled                  | Form-ready                |
| 49  | Create `components/ui/Select.tsx` - native select with options, placeholder, error state               | Keyboard accessible       |
| 50  | Create `components/ui/Badge.tsx` - status/priority variants, sizes, dot indicator                      | Color + text for a11y     |
| 51  | Create `components/ui/Table.tsx` - head, body, row, cell, sortable header, empty state                 | Responsive wrapper        |
| 52  | Create `components/ui/Card.tsx` - container, header, content, footer, hoverable variant                | Mobile card layout        |
| 53  | Create `components/ui/Skeleton.tsx` - skeleton variants for table rows, cards, stats                   | Matches real content      |
| 54  | Create `components/ui/Tooltip.tsx` - accessible tooltip with delay, portal                             | WCAG compliant            |
| 55  | Create `components/layout/PageHeader.tsx` - title, description, actions slot                           | Consistent page structure |
| 56  | Create `components/layout/Container.tsx` - responsive max-width, padding                               | Used by all pages         |

### Phase 7: TanStack Query Hooks (Stages 57-64)

| #   | Stage                                                                                                                      | Verification                |
| --- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 57  | Create `features/shipment-tracking/presentation/hooks/useShipments.ts` - Query hook with search/filter/sort params         | Integrates use case, typed  |
| 58  | Create `features/shipment-tracking/presentation/hooks/useShipment.ts` - Query hook for single shipment                     | Enabled by tracking number  |
| 59  | Create `features/shipment-tracking/presentation/hooks/useShipmentEvents.ts` - Query hook for timeline                      | Depends on shipment query   |
| 60  | Create `features/shipment-tracking/presentation/hooks/useShipmentSummary.ts` - Query hook for dashboard stats              | Independent query           |
| 61  | Create `features/shipment-tracking/presentation/hooks/useAdvanceShipmentStatus.ts` - Mutation hook with optimistic update  | Invalidates related queries |
| 62  | Create `features/shipment-tracking/presentation/hooks/useShipmentFilters.ts` - Local state for filters (URL sync optional) | Debounced search            |
| 63  | Create `features/shipment-tracking/presentation/hooks/useShipmentSort.ts` - Sort state with URL persistence                | Type-safe sort keys         |
| 64  | Create `features/shipment-tracking/presentation/hooks/index.ts` - Barrel export                                            | Clean imports               |

### Phase 8: Dashboard Summary Page (Stages 65-74)

| #   | Stage                                                                                                                                                   | Verification             |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 65  | Create `app/shipments/page.tsx` - Server component fetching summary + initial shipments                                                                 | SSR summary, client list |
| 66  | Create `app/shipments/loading.tsx` - Dashboard skeleton with stat cards + table skeleton                                                                | No layout shift          |
| 67  | Create `app/shipments/error.tsx` - Error boundary with retry button                                                                                     | Recovers on retry        |
| 68  | Create `features/shipment-tracking/presentation/components/DashboardStats.tsx` - 4 stat cards (Total, In Transit, Delayed, Out for Delivery, Delivered) | Animated count-up        |
| 69  | Create `features/shipment-tracking/presentation/components/StatCard.tsx` - Single stat with icon, label, value, trend                                   | Reusable, accessible     |
| 70  | Create `features/shipment-tracking/presentation/components/ShipmentTable.tsx` - Desktop table with columns, sorting, row selection                      | Keyboard navigable       |
| 71  | Create `features/shipment-tracking/presentation/components/ShipmentCard.tsx` - Mobile card layout with priority fields                                  | Stacks on mobile         |
| 72  | Create `features/shipment-tracking/presentation/components/ShipmentList.tsx` - Responsive switch: table ≥md, cards <md                                  | No horizontal scroll     |
| 73  | Create `features/shipment-tracking/presentation/components/EmptyState.tsx` - Empty list message + clear filters action                                  | Distinct from no results |
| 74  | Create `features/shipment-tracking/presentation/components/ErrorState.tsx` - Inline error with retry, dismiss                                           | Non-blocking             |

### Phase 9: Search, Filter, Sort Controls (Stages 75-84)

| #   | Stage                                                                                                                         | Verification          |
| --- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 75  | Create `features/shipment-tracking/presentation/components/SearchBar.tsx` - Debounced input, clear button, accessible label   | 300ms debounce        |
| 76  | Create `features/shipment-tracking/presentation/components/StatusFilter.tsx` - Multi-select badge pills, clear all            | Shows active count    |
| 77  | Create `features/shipment-tracking/presentation/components/PriorityFilter.tsx` - Radio group or multi-select                  | Keyboard accessible   |
| 78  | Create `features/shipment-tracking/presentation/components/DestinationFilter.tsx` - Select with destination options from data | Dynamic options       |
| 79  | Create `features/shipment-tracking/presentation/components/SortSelect.tsx` - Sort by estimated delivery / last updated        | URL sync optional     |
| 80  | Create `features/shipment-tracking/presentation/components/FilterBar.tsx` - Composed filter controls, mobile drawer           | Collapsible on mobile |
| 81  | Create `features/shipment-tracking/presentation/components/ActiveFilters.tsx` - Chips showing applied filters, removable      | Clear all action      |
| 82  | Wire filters to `useShipments` hook with proper query key serialization                                                       | Filters refetch       |
| 83  | Add "no results" state distinct from empty state                                                                              | Tests both states     |
| 84  | Ensure filter state persists on detail navigation and back                                                                    | History/URL based     |

---

## DAY 2: Detail, Mutations, Animation, Polish

### Phase 10: Shipment Detail Route (Stages 85-94)

| #   | Stage                                                                                                                                      | Verification         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| 85  | Create `app/shipments/[trackingNumber]/page.tsx` - Server component fetching shipment + events                                             | Direct URL works     |
| 86  | Create `app/shipments/[trackingNumber]/loading.tsx` - Detail skeleton (summary + timeline)                                                 | Matches content      |
| 87  | Create `app/shipments/[trackingNumber]/error.tsx` - Not found / error with back link                                                       | 404 handling         |
| 88  | Create `features/shipment-tracking/presentation/components/ShipmentDetailHeader.tsx` - Tracking, customer, status badge, priority, courier | All key info visible |
| 89  | Create `features/shipment-tracking/presentation/components/RouteInfo.tsx` - Origin → Destination, estimated delivery                       | Formatted dates      |
| 90  | Create `features/shipment-tracking/presentation/components/Timeline.tsx` - Chronological events with icons, timestamps                     | Ordered newest first |
| 91  | Create `features/shipment-tracking/presentation/components/TimelineEvent.tsx` - Single event with status dot, description, time            | Animation ready      |
| 92  | Create `features/shipment-tracking/presentation/components/StatusActionBar.tsx` - Advance button (disabled if invalid), loading            | Calls mutation hook  |
| 93  | Create `features/shipment-tracking/presentation/components/RouteProgressVisual.tsx` - Node path: completed/current/upcoming                | Animated progress    |
| 94  | Compose detail page with all sections, proper spacing, semantic HTML                                                                       | Lighthouse a11y >90  |

### Phase 11: Status Mutation & Feedback (Stages 95-102)

| #   | Stage                                                                                      | Verification           |
| --- | ------------------------------------------------------------------------------------------ | ---------------------- |
| 95  | Implement optimistic update in `useAdvanceShipmentStatus` - update cache immediately       | UI responds instantly  |
| 96  | Add mutation pending state - disable button, show spinner, prevent double-click            | No duplicate requests  |
| 97  | Add mutation success - toast/notification, invalidate queries, update summary              | Cache consistent       |
| 98  | Add mutation failure - toast with error, rollback optimistic update, retry option          | State restored         |
| 99  | Create `components/feedback/Toast.tsx` - Portal-based, auto-dismiss, action button         | Accessible live region |
| 100 | Create `components/feedback/ConfirmationDialog.tsx` - For destructive/irreversible actions | Focus trap, ESC close  |
| 101 | Handle invalid transition API error (400) with specific message                            | User understands why   |
| 102 | Handle network error with retry button in toast                                            | Offline resilient      |

### Phase 12: Route Progress Visual (Stages 103-108)

| #   | Stage                                                                                | Verification             |
| --- | ------------------------------------------------------------------------------------ | ------------------------ |
| 103 | Design progress node component: completed (check), current (pulse), upcoming (empty) | 3 visual states          |
| 104 | Create connecting line between nodes with progress fill animation                    | CSS/Framer Motion        |
| 105 | Add hover/focus tooltip on nodes showing stage name, timestamp                       | Keyboard accessible      |
| 106 | Implement reduced-motion variant (instant transitions)                               | `prefers-reduced-motion` |
| 107 | Make component responsive: horizontal ≥md, vertical <md                              | No overflow              |
| 108 | Add entrance animation: nodes stagger in, line draws                                 | Smooth 60fps             |

### Phase 13: Animation Implementation (Stages 109-118)

| # | Stage | Verification |
|---|
| Animate stat cards count-up on mount (Framer Motion `animate`) | ✓ Smooth, <1s |
| Animate timeline events stagger entrance (delay per index) | ✓ Staggered, not blocking |
| Animate route progress nodes: completed→current transition pulse | ✓ Communicates progress |
| Animate status badge change on mutation success (scale + color) | ✓ Clear feedback |
| Animate filter bar expand/collapse on mobile (height, opacity) | ✓ Smooth, accessible |
| Animate table row hover/focus (background, transform) | ✓ Subtle, 60fps |
| Animate toast slide-in/out (spring) | ✓ Non-blocking |
| Animate skeleton shimmer (CSS keyframes) | ✓ Perceived performance |
| Respect `prefers-reduced-motion` globally (disable all non-essential) | ✓ Media query hook |
| Test animations on mobile device / throttled CPU | ✓ No jank |

### Phase 14: Responsive Design & Accessibility (Stages 119-130)

| #   | Stage                                                                                  | Verification        |
| --- | -------------------------------------------------------------------------------------- | ------------------- |
| 119 | Verify mobile (<640px): cards, stacked filters, vertical progress, touch targets ≥44px | Device toolbar test |
| 120 | Verify tablet (640-1024px): 2-col stats, table with horizontal scroll if needed        | Viewport test       |
| 121 | Verify desktop (1024-1440px): full table, side-by-side filters, horizontal progress    | Viewport test       |
| 122 | Verify wide desktop (>1440px): max-width container, comfortable line lengths           | Container query     |
| 123 | Audit semantic HTML: landmarks, headings hierarchy, lists, buttons/links               | Axe-core scan       |
| 124 | Ensure all interactive elements have visible focus styles (ring, offset)               | Tab navigation test |
| 125 | Add ARIA labels to icon-only buttons (search clear, filter remove, sort)               | Screen reader test  |
| 126 | Ensure status/priority communicated via text + color (not color alone)                 | Color blindness sim |
| 127 | Verify contrast ratios ≥4.5:1 for text, ≥3:1 for UI elements                           | Lighthouse audit    |
| 128 | Test with screen reader (NVDA/VoiceOver): announcements, navigation                    | Manual test         |
| 129 | Ensure date formatting uses `toLocaleString` for user locale                           | Intl test           |
| 130 | Add skip-to-main-content link                                                          | Keyboard test       |

### Phase 15: Testing (Stages 131-138)

| #   | Stage                                                                              | Verification           |
| --- | ---------------------------------------------------------------------------------- | ---------------------- |
| 131 | Write test: Status transition rules - valid forward, invalid backward, same status | Domain logic test      |
| 132 | Write test: Shipment filter/sort helpers - combined filters, sort stability        | Pure function test     |
| 133 | Write test: API mapper - transforms transport → domain correctly                   | Mapper test            |
| 134 | Write test: Zod schemas - valid response passes, invalid fails with details        | Schema test            |
| 135 | Write integration test: Dashboard stats derive from shipments correctly            | React component test   |
| 136 | Write integration test: Status mutation updates UI and invalidates cache           | MSW + RTL test         |
| 137 | Write integration test: Detail page loads shipment + events, shows error on 404    | Route test             |
| 138 | Run full test suite, ensure ≥80% coverage on domain/application layers             | `pnpm test --coverage` |

### Phase 16: Production Build & Documentation (Stages 139-148)

| #   | Stage                                                                     | Verification       |
| --- | ------------------------------------------------------------------------- | ------------------ |
| 139 | Run `pnpm lint` - fix all warnings/errors                                 | Clean lint         |
| 140 | Run `pnpm build` - production build succeeds, no TypeScript errors        | Clean build        |
| 141 | Run `pnpm test` - all tests pass                                          | Green CI           |
| 142 | Create `.env.example` with all required variables documented              | Complete example   |
| 143 | Write README: Prerequisites, install, env config, commands                | New dev onboarding |
| 144 | Write README: Architecture overview with data flow diagram (text/mermaid) | Explains layers    |
| 145 | Write README: Animation decisions, reduced-motion approach                | Design rationale   |
| 146 | Write README: Assumptions, known limitations, future improvements         | Honest assessment  |
| 147 | Write README: Next.js blocker documentation (if React fallback used)      | N/A or documented  |
| 148 | Deploy preview (Vercel/Netlify), add link to README                       | Live URL works     |

### Phase 17: Final Polish & Submission (Stages 149-155)

| #   | Stage                                                         | Verification        |
| --- | ------------------------------------------------------------- | ------------------- |
| 149 | Review commit history - meaningful messages, logical grouping | `git log --oneline` |
| 150 | Remove console.logs, debug code, commented blocks             | Clean codebase      |
| 151 | Verify no secrets in repo (check .env.local not committed)    | `git status` clean  |
| 152 | Verify node_modules, .next, dist not committed                | .gitignore correct  |
| 153 | Run final `pnpm build && pnpm test && pnpm lint`              | All green           |
| 154 | Create submission checklist verification                      | All items ✓         |
| 155 | Tag release `v1.0.0-submission`                               | Git tag exists      |

---

## Summary by Category

| Category                | Stages  | Focus                                         |
| ----------------------- | ------- | --------------------------------------------- |
| Project Setup           | 1-12    | Tooling, config, structure                    |
| Architecture Foundation | 13-20   | Providers, query, constants, types            |
| Domain Layer            | 21-28   | Entities, repositories, value objects, errors |
| Infrastructure Layer    | 29-38   | API schemas, mappers, endpoints, repositories |
| Application Layer       | 39-46   | Use cases, business logic coordination        |
| UI Primitives           | 47-56   | Reusable accessible components                |
| Query Hooks             | 57-64   | TanStack Query integration                    |
| Dashboard & List        | 65-74   | Summary stats, responsive table/cards         |
| Search/Filter/Sort      | 75-84   | Composed filter controls, URL state           |
| Detail Route            | 85-94   | Dynamic route, timeline, progress visual      |
| Status Mutation         | 95-102  | Optimistic update, feedback, error handling   |
| Route Progress          | 103-108 | Animated node path, responsive                |
| Animations              | 109-118 | 3+ purposeful animations, reduced motion      |
| Responsive & A11y       | 119-130 | 4 breakpoints, WCAG AA                        |
| Testing                 | 131-138 | Unit + integration, behavior-focused          |
| Build & Docs            | 139-148 | Production ready, documented                  |
| Final Polish            | 149-155 | Clean repo, deployment, submission            |

**Total: ~155 stages** (can be combined/trimmed to 80-100 by merging related items)

---

## Suggested Daily Breakdown

### Day 1 Target (Stages 1-84)

- Morning: Setup (1-12), Architecture (13-20), Domain (21-28)
- Midday: Infrastructure (29-38), Application (39-46), UI Primitives (47-56)
- Afternoon: Query Hooks (57-64), Dashboard (65-74), Filters (75-84)
- **End of Day 1**: Working dashboard with list, filters, loading/empty/error states

### Day 2 Target (Stages 85-155)

- Morning: Detail Route (85-94), Mutations (95-102), Progress Visual (103-108)
- Midday: Animations (109-118), Responsive/A11y (119-130)
- Afternoon: Testing (131-138), Build/Docs (139-148), Polish (149-155)
- **End of Day 2**: Production build, deployed, documented, submitted
