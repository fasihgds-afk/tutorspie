# Tutorspie frontend

A React 19 / TypeScript recreation of the PapersHelm homepage, adapted to Tutorspie branding. The reference layout, imagery, typography, and responsive stylesheet are stored locally. No reference-site scripts, analytics, form tokens, or backend endpoints are included.

## Run

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

The preview runs at `http://localhost:5173/`.

```sh
npm run build
npx tsc --noEmit
```

The static frontend is exported to `out/`. Publish that directory on a static host; it requires no application backend. Run `npm start` to serve the production export locally on port 5173. Next.js produces intermediate build files, which are not part of this site's static deployment.

## Features

- Reference homepage sections: hero and assignment selector, experts, benefits and bonuses, ordering process, testimonials, comparison, FAQs, services, and footer.
- Responsive desktop, laptop, tablet, and mobile styles.
- Mobile navigation, writer/review selectors, keyboard-operable FAQs, and accessible dialogs.
- An order preview with browser validation and a local confirmation. Data is neither transmitted nor persisted.
- Login and support dialogs explain their unavailable backend features.

## Editing

- `app/page.tsx`: frontend interactions, order preview, and dialogs.
- `components/sections/`: editable React section components.
- `public/tutorspie.css`: Tutorspie branding and responsive adjustments.
- `public/reference/`: reference design assets and base styles.
- `app/layout.tsx`: site metadata and font/style imports.

The optional `start_order_preview` WebMCP tool opens the same local order preview in supporting browsers. Its runtime validation was unavailable in this environment.

## Before public launch

Profiles, reviews, ratings, awards, service promises, and promotional prices are reference/sample content, identified as such in the preview. Replace them with verified Tutorspie content. Add actual contact details, service terms, privacy policy, authentication, order storage, payments, and live support when those backend features are requested. No payment collection, mail sending, accounts, or live chat are implemented.

The purchased `Tutorspie.com` domain has not been connected or modified.
