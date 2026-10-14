# The Valuation & Consultants — Corporate (photo-led)

White, photo-led corporate layout inspired by JLL and Gordon Brothers: slim white header, full-bleed photo carousel hero with a bold headline, overlapping quick-link cards, structured sections on white / light grey.

One of several alternative design directions for the website of **The Valuation & Consultants Co., Ltd.**
(Thai-owned property valuation company, founded 1992). Next.js 14 (App Router) + TypeScript + Tailwind CSS. Thai / English.

## Run

```bat
npm install
npm run dev      :: http://localhost:3000
npm run build && npm start
```

> If the project folder path contains an `&` (for example `V&C web`), `npm run` breaks on Windows.
> Call node directly instead: `node node_modules/next/dist/bin/next dev` (or `build` / `start`),
> or use `start-dev.cmd` / `build.cmd` / `start.cmd`.

## Content

All copy lives in `src/lib/content.ts` (Thai + English) and comes from the live thevaluation.com site.
Nothing is invented: there are deliberately no client or project counts, testimonials, listings, news items or
opening hours, because the source site does not state them.

## Notes

- The Buy / Sell / Rent form is in-page and sends via `mailto:info@thevaluation.com` (there is no backend);
  the live site posted these forms to an external service.
- Motion is intentionally light (short fades, no parallax / tilt / blur) and respects `prefers-reduced-motion`.
