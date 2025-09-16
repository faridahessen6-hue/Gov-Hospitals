# Codebase Structure Cleanup Plan (Approval Draft)

This plan refines the previous proposal to match the confirmed goals and constraints. It focuses on cleaning duplication and enforcing a clear structure while preserving current behavior and UI 1:1. No functional or visual changes will be introduced by this plan—only refactoring for structure and maintainability.

## Goals (Confirmed)
- Keep the site buildless/static. Remove Node artifacts (`build.js`, `server.js`, `src/layouts/main.html`).
- Preserve current functionality and UI/theme exactly as-is.
- Introduce a clean, readable structure with separation of concerns.
- Eliminate duplicated header/footer creation and page bootstrapping.
- Consolidate duplicated booking logic into a single source of truth while providing thin shims for legacy routes.
- Use a single hospital template and centralize hospital/specialty data in `src/data/hospitals.js`.
- Ignore language/i18n refactors for now (keep current mixed content).

## Constraints
- No change to look-and-feel or runtime behavior. HTML structure, CSS, timing, and interactivity should remain effectively indistinguishable to users.
- Existing URLs should keep working. Where we unify pages, we will add thin shims that include the unified modules and pass the appropriate parameters.

## Findings: Header/Footer Duplication
The following files contain local header/footer builders and/or embedded `navbar navbar-expand-lg` logic (indicative list from repository scan):
- `about.js`
- `contact.js`
- `elgeldia-spec.js`
- `elhomiat-spec.js`
- `elkebd-spec.js`
- `elramad-spec.js`
- `elsader-spec.js`
- `spec-el3am.js`
- `teen.js`
- `middle.js`
- `old.js`
- `src/ui/header.js` (the shared, correct source)

Action: all pages should rely solely on the shared header/footer wrappers (`js/header.js`, `js/footer.js`) which delegate to `src/ui/header.js` and `src/ui/footer.js`.

## Proposed Folder Structure (Buildless)
- `/` (root)
  - `index.html` (home)
  - `hospitals.html`
  - `booking.html` (new unified booking page)
  - `ask.html`, `about.html`, `contact.html`, `login.html`, `review.html`, `password.html`, etc.
  - `hospital.html` (new single hospital template page; navigated via query params)
  - `favicon.ico`
  - `assets/`
    - `css/`
      - `main.css` (optional extraction of common inline styles; no visual change)
    - `js/` (optional light shells; not strictly required if `src/bootstrap.js` is kept)
  - `js/` (legacy wrappers kept for compatibility)
    - `header.js` (delegates to `src/ui/header.js`)
    - `footer.js` (delegates to `src/ui/footer.js`)
  - `src/`
    - `bootstrap.js` (page router using `data-page`)
    - `core/`
      - `dom.js`
      - `init.js` (if needed)
    - `data/`
      - `age-groups.js`
      - `hospitals.js` (new; centralized hospital and specialty data)
    - `ui/`
      - `header.js`
      - `footer.js`
      - `theme.js`
      - `loading.js`
      - `typewriter.js` (already present per prior plan)
      - `chat-core.js` (already present per prior plan)
    - `pages/`
      - `hospitals/`
        - `animation.js`
      - `booking/`
        - `booking-core.js` (shared booking logic)
      - `hospital-page.js` (reads query params, renders using `src/data/hospitals.js`)

Notes:
- We maintain `js/header.js` and `js/footer.js` wrappers so older HTML includes remain valid during migration.
- We keep `src/bootstrap.js` as the single page router; each HTML has `data-page` on the `<body>`.

## Unification Strategy (No-Behavior-Change)

1) Header/Footer
- Remove page-local header/footer creation from all pages that still have it.
- Ensure every HTML includes `js/header.js`, `js/footer.js`, then `src/bootstrap.js`.
- Guarantee active state highlighting remains consistent with current behavior.

2) Booking (single page + shims)
- Source of truth: `src/pages/booking/booking-core.js`.
- Unified page: `booking.html` that renders all booking UI exactly as today.
- Legacy routes kept as thin shims: `book.html`, `teen.html`, `midlle.html`, `old.html` remain as HTML files that:
  - include shared wrappers + `src/bootstrap.js`
  - set `data-page="booking"` (or use a small inline param bridge)
  - pass age-group parameter (via query string or small inline bootstrap) to the shared `booking-core`.
- Result: no visual change, existing links still work, code duplication removed.

3) Hospital Template (single page + data)
- Source of truth: `pages/hospital.html` + `src/pages/hospital-page.js` + `src/data/hospitals.js`.
- Access via `hospital.html?hospital=<id>&specialty=<id>`.
- Existing specialty pages (e.g., `elramad-spec.html`, etc.) kept as thin shims that forward to `hospital.html` with the correct params (or include the same module and call with a fixed config).
- `src/data/hospitals.js` structure (example sketch; not implementing now):
  ```js
  export const hospitals = [
    {
      id: 'elramad',
      name: 'Elramad Eye Hospital',
      specialties: [
        { id: 'conjunctivitis', title: 'Conjunctivitis', arTitle: 'التهاب الملتحمة', icon: 'eye', color: '#3498db' },
        // ...
      ]
    },
    // ...
  ];
  ```
- Result: single template, centralized data; same UI/UX as today.

4) Node/EJS artifacts removal
- With your approval (confirmed): remove `build.js`, `server.js`, and `src/layouts/main.html` to keep the project purely static.

## Phased Migration (Safe, Incremental)
- __Phase 1: Inventory and Shims__
  - Verify all pages include shared wrappers and `src/bootstrap.js`.
  - Add thin shims for legacy booking and specialty pages (no behavior change).

- __Phase 2: Header/Footer Dedup__
  - Remove local header/footer builders across pages (`about.js`, `contact.js`, `*-spec.js`, `teen.js`, `middle.js`, `old.js`).
  - Ensure shared header/footer render once and maintain the same appearance and behavior.

- __Phase 3: Booking Unification__
  - Confirm `booking.html` renders identical UI using `booking-core.js`.
  - Connect `book.html`, `teen.html`, `midlle.html`, `old.html` as shims to the unified flow.

- __Phase 4: Hospital Template + Data__
  - Introduce `src/data/hospitals.js` and update `hospital-page.js` to use it.
  - Convert `*-spec.html` into shims targeting `hospital.html`.

- __Phase 5: Cleanup__
  - Remove Node/EJS artifacts (`build.js`, `server.js`, `src/layouts/main.html`).
  - Remove dead or duplicate page-local scripts once verified unused (e.g., local header/footer builders).

Each phase includes a smoke test to ensure there is zero visible or behavioral change.

## Risks and Mitigations
- __Shim param passing errors__: introduce a simple test matrix for booking (all age groups) and for hospital/specialty combinations.
- __Hidden inline styles coupling__: when extracting styles to `assets/css/main.css`, keep the exact declarations and order; if risky, prefer to keep styles inline until after approvals.

## Acceptance Criteria
- Shared header/footer used consistently across all pages; no duplicate implementations remain.
- Single booking core used by all booking routes; legacy routes function via shims.
- Single hospital template with centralized data; specialty routes function via shims.
- No visual or behavioral differences detected by manual checks.
- Node/EJS files removed; the project is purely static.

## Open Questions (Please answer before we proceed)
1. __Legacy URLs__: Do any third-party links depend on exact filenames for specialty pages beyond those we saw? We will keep them as thin shims—please list any must-keep URLs.
2. __Booking parameters__: Prefer query string (e.g., `booking.html?group=teen`) or a page-level `data-age="teen"` attribute in shim pages? Both preserve behavior; query string is simpler.
3. __Hospital data authority__: Do you want to review the initial `src/data/hospitals.js` schema and seed values before we migrate specialty pages to the single template?
4. __File deletions checklist__: Besides `build.js`, `server.js`, and `src/layouts/main.html`, are there other Node/helper scripts (e.g., `update-html-files.js`) that we should keep or remove now?
5. __Linting/formatting__: Do you want a basic Prettier/ESLint config (run manually, no build step) for consistent formatting, or keep the current formatting untouched for now?

---
If you approve this plan, I will start with Phase 1 and Phase 2 (add shims, deduplicate header/footer) and provide a brief progress report and diffs for review before continuing to booking and hospital unification.
