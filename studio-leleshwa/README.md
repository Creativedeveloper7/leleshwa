# Sanity CMS

## What's set up
- Studio schemas for accommodations, experiences, dining, gallery, events, about, and site settings
- Image fields support **Upload** and **Select from device** via Sanity assets + Media Library
- Website fetches live content from Sanity (`th48chxn` / `production`)
- Falls back to `src/constants/*` when Sanity is empty or unreachable

## Run the Studio locally
```bash
cd studio-leleshwa
npx sanity login
npm run dev
```
Studio opens at http://localhost:3333

Or from the repo root:
```bash
npm run studio
```

## Deploy the live Studio (required after schema changes)
**Pushing to GitHub does not update Sanity Studio.** The live CMS is hosted separately by Sanity.

After changing schemas, plugins, or upload behaviour, deploy from the repo root:

```bash
npm run studio:deploy
```

Or from `studio-leleshwa/`:
```bash
npx sanity deploy
```

Your live Studio URL: **https://leleshwa.sanity.studio**

Sign in with the same Sanity account that has **Editor** (or Admin) access on project `th48chxn`.

### If uploads still fail on the live Studio
1. Confirm you ran `npm run studio:deploy` after the latest git pull
2. Hard-refresh https://leleshwa.sanity.studio (Ctrl+Shift+R)
3. Check you are signed in (top-right avatar)
4. Open browser DevTools → Console while uploading and note any red errors
5. In [Sanity Manage → API → CORS](https://www.sanity.io/manage/project/th48chxn/api), ensure your origins include:
   - `http://localhost:3333` (local)
   - Your website URL if you embed Studio elsewhere (e.g. `https://www.leleshwa.co.ke`) with **Allow credentials** enabled

## Seed existing site content
1. Create an API token with **Editor** permissions:
   https://www.sanity.io/manage/project/th48chxn/api
2. Copy `.env.example` → `.env` and set `SANITY_API_WRITE_TOKEN`
3. Run:
```bash
npm run seed:sanity
```

**Document `_id` values must not contain dots** (use `accommodation-luxury-suites`, not `accommodation.luxury-suites`). This project's public ACL matches single-segment IDs (`_id in path("*")`), so dotted IDs are invisible to the live website.

After seeding, open each document in Studio and **upload hero/gallery images** (seeded path strings are legacy placeholders).

## Live content on the website
1. Edit a document in Studio → fill **Name** + **ID** (slug) → **Publish**
2. Hard-refresh the site (Ctrl+Shift+R)
3. In DevTools Console you should see `[content] Loaded Sanity CMS content` with counts

The site reads the **published** perspective with CDN off, so publishes show on the next page load. If the console shows static fallback instead, check publish status and that document IDs are not dotted.

CORS origins that must allow credentials for Studio/API from browsers:
- `http://localhost:3333` (Studio local)
- `http://localhost:5173` (Vite local)
- `https://www.leleshwa.co.ke`
- `https://leleshwa.co.ke`
- `https://leleshwagetaway.vercel.app`
