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
