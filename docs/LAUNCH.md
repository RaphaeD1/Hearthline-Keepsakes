# Hearthline Keepsakes launch handoff

Status: preview, NOT accepting orders. No subscriptions purchased, accounts opened, listings published, payouts activated, or orders placed. Issue #1 remains open until commercial gates pass.

## Recommended low-cost path

Start with original unframed wall prints, not generic dropship merchandise. Evaluate Printify Free with a Pop-Up Store first: no upfront inventory payment, hosted checkout, printing and shipping. Seller eligibility and Stripe identity verification are required; the seller remains merchant of record. Its personalization tooling supports text/images on Pop-Up, Etsy and Shopify. Validate each selected SKU in the actual account before promising automatic personalization. Etsy + Printify Free is a secondary discovery channel, with listing fees and working-capital requirements. Defer Shopify's recurring subscription until demand justifies it.

Printful Free is the fallback for wall prints and Etsy integration. Compare actual samples, delivered cost and defect handling before choosing a provider. No provider has been selected contractually.

## Official research checked October 21, 2026

- Printify Free has no monthly subscription: https://printify.com/pricing/
- Pop-Up collects customer payment and deducts fulfillment costs; seller is merchant of record: https://help.printify.com/hc/en-us/articles/12051129478417-What-is-Printify-Pop-Up-Store
- Pop-Up onboarding requires Stripe verification: https://help.printify.com/hc/en-us/articles/12051515136529-How-can-I-create-a-Pop-Up-Store
- Personalization channel differences: https://help.printify.com/hc/en-us/articles/28903711308177-What-is-product-personalization-on-Printify
- Automated Etsy personalization mapping: https://help.printify.com/hc/en-us/articles/40720228428433-How-do-I-set-up-automated-personalization-for-Etsy
- Standard channel billing requires supplier payment separately from marketplace receipts: https://help.printify.com/hc/en-us/articles/4483638068241-What-happens-when-an-order-comes-in
- Poster candidate, not approved inventory: https://printify.com/app/products/282/generic-brand/matte-vertical-posters
- Public poster catalog advertises prices starting at $5.73 for one poster range; this is NOT a selected size/provider/destination landed quote: https://printify.com/app/products/home-and-living/posters
- Printful free entry: https://help.printful.com/hc/en-us/articles/50261163157905-How-much-does-Printful-cost
- Printful poster candidate; prices vary by size and destination: https://www.printful.com/custom/wall-art/posters/enhanced-matte-paper-poster-in
- Etsy US base fees: $0.20 listing, 6.5% transaction, 3% + $0.25 processing; additional fees may apply: https://www.etsy.com/sell and https://www.etsy.com/legal/fees/
- Shopify Basic: $39 monthly or $29/month billed yearly; not activated: https://www.shopify.com/pricing

## Economics: scenarios, not verified supplier margins

For a $32 item with free buyer shipping, assumed $12 production and $5 shipping, US Etsy base fees are $3.49. A 5% reserve adds $1.60. Contribution is $9.91 before labor, tax, currency conversion and overhead. With a 15% attributed advertising fee it falls to $5.11. Ten orders would require $170 of supplier funding before marketplace payout under these assumptions. The operations calculator reproduces this scenario. Do not apply Etsy fees to Pop-Up; obtain its current account-specific fee breakdown first.

Record actual provider ID, blueprint/SKU, size, material, finish, production location, destination quote, shipping method, tax, currency, date, base cost, fulfillment cost and margin for EACH variant before approval. Current concept prices remain illustrative. Reliable real unit economics cannot be verified from a generic catalog starting price.

## Product files

Six original SVG source designs live in assets/. They are vector illustrations, not finished-product photographs. No external stock artwork or embedded third-party font files. Fonts use local generic fallbacks; outline/rasterize final text after font choice and check exact glyphs, margins and supplier template requirements. The 2400 × 3000 canvas is a 4:5 design basis, not a guarantee of suitability for every size. Export final personalized files at the selected supplier's required resolution/bleed and approve a proof. Social-preview PNG is an original brand graphic. Paper goods remain concepts pending actual printable layouts; do not sell the illustration as a complete planner/card pack.

## Identity and authorization gates

1. Owner chooses Printify Pop-Up or an owned Etsy shop; completes identity, tax, bank and terms directly with the provider. Never paste passwords or payment credentials into chat or GitHub.
2. Establish a monitored support mailbox. Contact-form delivery is intentionally absent until a verified address and authorized processor exist. No fake submissions.
3. Confirm supplier SKU/variant/costs, proof process, original design rights and mockup accuracy. Owner authorizes any sample cost before ordering.
4. Approve final returns, shipping, personalization, privacy and support policies against actual provider/marketplace terms. Current drafts must not be treated as active promises.
5. Supply genuine authorized listing URL and verify listing content and routing. Only then set `listingVerified: true` and `buyUrl` in products.js. Supported links: Etsy listing URLs and Printify Pop-Up product URLs. Browser selection text DOES NOT transfer to those checkouts; buyer re-enters it there.
6. Explicit approval for a sandbox/live purchase is required. Test paid state, proof hold, supplier acceptance, dispatch, tracking/delivery, cancellation, refund and buyer messages. No live order placed here.
7. Re-check public deployment, submit sitemap through verified Search Console and confirm indexing. No indexing claim until verified. No paid ads or domain purchase without approval.

## Secure integration design

Prefer hosted supplier/marketplace checkout and native fulfillment. This static site cannot securely receive orders or webhooks. No payment/customer address data is stored in browser storage. The only browser storage is design IDs and preview text, cleared from Saved.

For a later backend: keep API credentials in environment secrets; verify webhook signatures on raw request bytes; persist event IDs with unique constraints to deduplicate retries; verify captured payment and exact SKU/amount server-side; create a held supplier order, never production-ready by default for personalization; use an order-ID idempotency key; retry transient failures with bounded backoff and alert on dead-letter events. Use explicit refund/cancel states and reconcile supplier acceptance before refund promises. A browser success redirect must never mark payment as paid. Customer records belong in protected merchant storage, not this public repo or operations.html.

## Operations

operations.html contains a public readiness checklist and scenario calculator, NOT a private admin system or real sales dashboard. Review actual order/exception queues in provider dashboards daily. Reconcile marketplace gross, supplier charges, fees, refunds and bank payouts weekly. Track paid-to-proof, proof-to-production, overdue dispatch, failed payment, duplicate import, delivery issue and refund states. Do not place personal data in public issue comments.

## Verification

Run `node --test tests/*.test.cjs`, `node --check app.js`, and `node scripts/build.mjs`. Public deployment publishes only dist/, excluding tests/docs/source-control files. PR checks run on feature branches. Browser QA observations and remaining limitations are recorded in docs/QA.md.
