# Hearthline Keepsakes

Original static storefront starter for a personalized gifting and home décor brand. Built for low-cost hosting with GitHub Pages, Netlify or Vercel.

## What's implemented

- Responsive storefront with product categories and search
- Six **sample product concepts** (not current inventory or approved listings)
- Live on-page personalization preview
- Cart stored in the browser
- Order summary export (copy to clipboard)
- Marketplace checkout buttons activated only when a genuine listing URL is configured
- Basic SEO metadata and accessible navigation
- Automated GitHub Pages publishing workflow (requires Pages configuration)

**Not a transactional store yet.** No payment processor, customer accounts, automated fulfillment, supplier integrations or verified product photography are connected. Product prices and delivery expectations are illustrative and must be verified before selling.

## Customize

Edit `products.js` to set the product names, prices, descriptions, options, and genuine `buyUrl` listing links. A product with no `buyUrl` cannot be purchased from this starter.

Replace the abstract CSS product art with your own licensed photography/mockups. Review return policies, shipping/production timelines, taxes, intellectual-property rights, and marketplace restrictions before launch.

## Deploy free via GitHub Pages

1. In GitHub, open **Settings → Pages** for this repo.
2. Select **Build and deployment → Source: GitHub Actions**.
3. Push a change or run the **Deploy storefront to Pages** workflow.
4. Verify the resulting public URL. Do not advertise until checkout and fulfillment are connected.

Alternative: import this repository into a static hosting provider. No build command is needed.

## Marketplace fulfillment and payments

For physical products, select a print-on-demand supplier supported by your chosen marketplace and verify sample quality, policies, pricing and stock. Set `buyUrl` to real approved listings on Etsy or another platform. The storefront deliberately does not collect card details.

## Security

Do not put API keys, supplier passwords, Stripe secrets, customer addresses or private data in this public repository. Marketplace APIs, webhooks and checkout must use a protected backend.

## Launch checklist

- [ ] Select products and real suppliers
- [ ] Obtain sample/mockup rights and verify costs/margins
- [ ] Create marketplace listings and connect payments
- [ ] Configure genuine buy URLs
- [ ] Publish and test site
- [ ] Place a test order and verify fulfillment
- [ ] Add privacy, returns and shipping policies based on actual operations

## Launch work and verification

See [launch handoff](docs/LAUNCH.md), [draft listing copy](docs/LISTINGS.md) and [QA record](docs/QA.md). Open `operations.html` for the public readiness checklist and fee scenario calculator; it is not a real order dashboard.

Run `node --test tests/*.test.cjs` then `node scripts/build.mjs`. Deploy only `dist/`. PR checks cover storage normalization, checkout-link validation, margin arithmetic, catalog assets and page references. A genuine listing also requires `listingVerified: true`; simply setting buyUrl is insufficient. No storefront selection data is passed into marketplace checkout.
