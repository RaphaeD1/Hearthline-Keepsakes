# QA evidence — October 21, 2026

## Passed locally

- Node syntax checks and five automated test groups: corrupt/null storage, unknown products, bounded text and selection count; verified HTTPS checkout allowlist including hostile domains/credentials/schemes; fee math; catalog image existence; anchors and local resources.
- Browser: six products render; Home filter returns two; search “first” returns one; product dialog opens; literal `<test>` in personalization stays text; saving creates one selection and correct illustrative total; Tab from last dialog control wraps to Close; clearing removes selection and reload shows zero.
- Desktop at 1363px: no horizontal overflow; all six SVG images load; zero images without alt and zero unlabeled buttons in a limited DOM audit. This is not a full WCAG/axe audit.
- Operations calculator: default scenario yields $9.91.
- Original vector artwork and social image present. No external font request remains.
- Build copies an explicit allowlist to dist; source/docs/tests and local preview configuration are not deployed.

## Remaining verification

- Mobile device/viewport acceptance and full accessibility/contrast scan not completed in this session. Responsive CSS and reduced-motion handling are present, but are not proof of mobile acceptance.
- Supplier print samples, exact variants, personalized file validation, merchant checkout, payment, refund, cancellation, delivery and buyer messages cannot be tested without verified merchant/supplier accounts and explicit order approval.
- Contact delivery unavailable until a monitored support destination is authorized.
- Search Console verification, indexing and analytics integration not connected. No tracking is loaded; no consent banner is required for absent optional tracking.
- CI and Pages evidence recorded in the PR / final handoff after pushing. A prior main-branch Pages workflow succeeded; that alone does not verify this revision.

## Follow-up contrast check

A targeted computed-color check of visible paragraphs, buttons and headings found low contrast in eyebrow labels, hero notes and step descriptions. Darkened those colors in the follow-up fix. This targeted check does not replace a full accessibility audit.

## Automated desktop and mobile coverage

PR #4 adds 18 browser tests across desktop Chromium, Pixel 7 emulation and a narrow 320 × 640 screen. Coverage includes search/filter, literal personalization, persistence/deletion, malformed saved data, keyboard trapping/restoration, overflow, all catalog images, the calculator, and axe WCAG 2 A/AA and 2.1 AA scans of storefront, open dialogs, policies and operations. Reports/traces are retained in CI for seven days. The initial scans identified additional contrast defects in illustration text, step numbers and the product detail category; these were corrected. See PR checks for final run evidence. Automated scans and emulation do not replace screen-reader testing or real-device/print acceptance.

The daily planner and four-card note sheet SVGs were rendered and visually inspected. Physical actual-size printing, buyer download packaging and approved merchant listings remain pending.

## Demand-selected pilot changes

Catalog narrowed to three physical-print candidates. Planned prices are labeled, all supplier variant/quote fields remain null, and checkout remains disabled. The calculator now deducts entered personalization labor. Core tests cover the selected set and labor arithmetic; browser tests are updated for three designs and the $5.16 default assumed contribution. See the demand-selection PR for test/deployment evidence.
