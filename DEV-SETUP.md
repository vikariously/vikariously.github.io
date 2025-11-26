# Local Development Setup

This project uses Jekyll for static site generation and Vite for local development server with hot reloading.

## Quick Start

### Start the development server:
```bash
npm run dev
```

This will:
1. Start Jekyll in watch mode (rebuilds when you edit files)
2. Start Vite dev server at http://localhost:3000
3. Auto-refresh the browser when files change

### Individual commands:

```bash
# Just build Jekyll once
npm run jekyll:build

# Watch Jekyll (auto-rebuild on changes)
npm run jekyll:watch

# Just run Vite dev server (serves _site directory)
npm run vite:dev

# Production build (Jekyll + Vite)
npm run build
```

## Workflow

1. Edit markdown files in `_recipes/` or modify layouts/includes
2. Jekyll detects changes and rebuilds to `_site/`
3. Vite detects `_site/` changes and refreshes browser
4. See changes instantly!

## Troubleshooting

### SSL Certificate Error with Jekyll
If you see SSL errors when running Jekyll, it's trying to fetch the remote theme. The existing `_site` folder will still work with Vite. To fix the Jekyll SSL issue, you may need to update your Ruby SSL certificates.

### Port already in use
If port 3000 is busy, edit `vite.config.js` and change the port number.
