# Nexora Web SaaS

An independent Nexora store-management demo and responsive product landing page. This project is separate from the Chester portfolio repository.

The home page includes feature, sample pricing, and contact sections. Starting or logging in opens
the existing browser-only workspace demo; accounts and workspace data are not backed by a server.
The prices are illustrative, and the contact form prepares a message in the visitor's email app
without sending it automatically. Replace the demo inbox (`hello@nexora.app`) before publishing.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages preview

The GitHub Actions workflow deploys this app to GitHub Pages whenever changes are pushed to `main`.
After the first successful deployment, the site is available at
`https://Chestergarcia.github.io/Nexora-Saas-Project/`.

## Case study (separate static page)

The bilingual English/Tagalog case study is plain HTML and CSS in `public/case-study/`, separate
from the SaaS app code. Open it at
`https://Chestergarcia.github.io/Nexora-Saas-Project/case-study/`.
It documents the product framing and scope, current color palette, typography, spacing and layout
tokens, components, responsive rules, feature map, and annotated user flow. Values observed in the
app are distinguished from recommended tokens; the prototype’s demo-only limits and unvalidated
research assumptions are called out explicitly.

Accounts, workspaces, orders, and products are stored in the current browser with local storage. Authentication and data are demo-only and are not backed by a server.
