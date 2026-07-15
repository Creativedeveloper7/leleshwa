# Sanity CMS

## What's set up
- Studio schemas for accommodations, experiences, dining, gallery, events, about, and site settings
- Website fetches live content from Sanity (`th48chxn` / `production`)
- Falls back to `src/constants/*` when Sanity is empty or unreachable

## Run the Studio
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

## Seed existing site content
1. Create an API token with **Editor** permissions:
   https://www.sanity.io/manage/project/th48chxn/api
2. Copy `.env.example` → `.env` and set `SANITY_API_WRITE_TOKEN`
3. Run:
```bash
npm run seed:sanity
```

After seeding, edits in Studio will appear on the site on refresh.
