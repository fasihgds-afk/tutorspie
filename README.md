# Tutorspie frontend

A React 19 / TypeScript recreation of the PapersHelm homepage, adapted to Tutorspie branding. The reference layout, imagery, typography, and responsive stylesheet are stored locally.

## Run

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

The site runs at `http://localhost:5173/`.

```sh
npm run build
npx tsc --noEmit
```

The static frontend is exported to `out/`. Publish that directory on a static host. Run `npm start` to serve the production export locally on port 5173.

## Features

- Homepage sections: hero and assignment selector, experts, benefits, ordering process, testimonials, comparison, FAQs, services, and footer.
- Working site navigation across Home, About, Services, FAQs, Contact, Order, Login, Sign Up, and User Area.
- Order flow with confirmation and account drafts stored in the browser.
- Responsive desktop, laptop, tablet, and mobile styles.

## Editing

- `app/page.tsx`: homepage interactions.
- `components/home-sections.tsx`: homepage section assembly.
- `components/sections/`: named homepage sections (header, hero, writers, benefits, FAQs, and more).
- `components/site-account.tsx`: header, footer, login, signup, and user area.
- `public/tutorspie.css`: Tutorspie branding and responsive adjustments.
- `public/reference/`: reference design assets and base styles.
- `app/layout.tsx`: site metadata and font/style imports.
