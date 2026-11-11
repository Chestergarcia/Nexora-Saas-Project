# Nexora Web SaaS

An independent Nexora store-management demo. This project is separate from the Chester portfolio repository.

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
The repository should be named `nexora-web-saas`; after the first successful deployment, the site is
available at `https://<your-github-username>.github.io/nexora-web-saas/`.

Accounts, workspaces, orders, and products are stored in the current browser with local storage. Authentication and data are demo-only and are not backed by a server.
