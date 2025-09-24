# Rotaract Club of Bangalore JP Nagar — Website

This repo contains the public website for **Rotaract Club of Bangalore JP Nagar** (RCB JP Nagar).
Stack: pure HTML/CSS/JS + a few small vendor libs (Bootstrap, AOS, GLightbox, Papa Parse).

---

## Project structure

```
.
├── index.html
├── about.html
├── projects.html
├── team.html
├── brand-center.html
├── assets
│   ├── css
│   │   ├── main.css
│   │   ├── brand-center.css
│   │   └── projects.css
│   ├── js
│   │   ├── main.js
│   │   ├── brand-center.js
│   │   └── projects.js
│   ├── vendor
│   │   ├── bootstrap/…
│   │   ├── aos/…
│   │   └── glightbox/…
│   ├── img
│   │   ├── hero/hero-1.jpg
│   │   ├── logos/
│   │   │   ├── club/   (RaCJPN-*.png)
│   │   │   └── district/ (Rotaract3191-*.png)
│   │   └── projects/   (folders per project: /{slug}/cover.jpg, gallery-1.jpg …)
│   ├── downloads/      (ZIP brand kits, etc.)
│   ├── reports/        (Annual report PDFs)
│   └── data/
│       └── projects-2025-26.csv
└── README.md
```

---

## Pages

### 1) Home / About / Team

Regular static pages, sharing the same header/footer and AOS animations.

### 2) Brand Center (`brand-center.html`)

* Previews open in **GLightbox** (inline content).
* Download buttons link directly to PNG / ZIP files.
* Add or remove cards by copying an `<article class="brand-card">…</article>`.
* Place club logos in `assets/img/logos/club/` and district logos in `assets/img/logos/district/`.

> If a preview opens as a **blank white lightbox**, it usually means:
>
> * the `href="#modal-id"` doesn’t match the corresponding `<div id="modal-id" …>` block, or
> * GLightbox isn’t initialized (see **Scripts** below).

### 3) Projects (`projects.html`)

* **Annual Reports**: preview PDFs inline, download the files from `assets/reports/…`.
* **Current year** projects render from a **CSV** at `assets/data/projects-2025-26.csv`.

#### CSV schema

Header (exact names, order can vary):

```
Name,Avenues of Service,Status,Description,Start Date,Venue,Cover Photo,Photos
```

* **Avenues of Service** → category filter. Allowed (case-insensitive):
  `Community`, `Club`, `Professional`, `International`, `Fellowship`
* **Status** (case-insensitive): `Upcoming`, `Ongoing`, `Completed`
* **Cover Photo**: relative or absolute URL (recommended: `assets/img/projects/<slug>/cover.jpg`)
* **Photos**: optional; comma-separated URLs for gallery images

**Example row**

```
Smile Please,Community,Completed,Free screenings & hygiene kits,2025-08-09,JP Nagar,
assets/img/projects/smile/cover.jpg,
assets/img/projects/smile/gallery-1.jpg|assets/img/projects/smile/gallery-2.jpg
```

> **Tip:** To avoid typos, keep photo filenames lowercase and hyphenated; folders named with the project slug (e.g., `smile`, `belaku`).

#### Where to set the CSV path

In `projects.html`:

```html
<template id="projectsCsvPath">assets/data/projects-2025-26.csv</template>
```

Change this value when you rotate to a new Rotary year.

#### Filters

* Category buttons: `data-cat="community|club|professional|international|fellowship|all"`
* Status buttons: `data-status="upcoming|ongoing|completed|all"`
* The JS reads current values and shows/hides cards accordingly.

---

## Scripts you must keep

All pages use a shared pattern: vendor CSS in `<head>`, vendor JS at the bottom.

```html
<!-- Vendors -->
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/aos/aos.js"></script>
<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>

<!-- Projects page only -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
<script src="assets/js/projects.js"></script>

<!-- Brand Center page only -->
<script src="assets/js/brand-center.js"></script>

<!-- Sitewide helpers -->
<script src="assets/js/main.js"></script>
```

**GLightbox initialization** is handled in `brand-center.js` and `projects.js` (selector: `.glx`, `slideHTMLType: 'inline'`).
Do **not** remove the `.glightbox-desc` blocks — they’re the inline modal content.

---

## Images & performance

* Convert large images to **WebP** (or AVIF) where possible.
* Keep hero images ≤ \~300 KB. Projects gallery images: ≤ \~200 KB each.
* We lazy-load most images via `loading="lazy"`.
* Preload hero where used (optional):

```html
<link rel="preload" as="image" href="assets/img/hero/hero-1.jpg">
```

---

## SEO & social

Add these to each page (tune per page):

```html
<title>Rotaract Club of Bangalore JP Nagar — Projects</title>
<meta name="description" content="Current projects and the last 4 years of impact at RCB JP Nagar.">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:title" content="Rotaract Club of Bangalore JP Nagar">
<meta property="og:description" content="Service • Fellowship • Impact">
<meta property="og:image" content="https://YOUR_DOMAIN/assets/img/og/rcbjp-og.jpg">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
```

Create:

* `robots.txt`
* `sitemap.xml` (list your HTML pages)

---

## Accessibility

* Meaningful alt text on logos/photos.
* Good color contrast (especially on dark hero).
* Keyboard-friendly navigation; visible focus states.
* Respect `prefers-reduced-motion` (AOS can be disabled for users who prefer less motion).

---

## Deployment

Any static host works: **Netlify**, **Vercel**, **GitHub Pages**, shared hosting, etc.

Recommended:

* Enable Brotli/Gzip compression and long-lived caching for `/assets/**`.
* Use HTTPS.
* Optional: add a **Content-Security-Policy** header (tune domains to match your CDNs):

```
Content-Security-Policy:
  default-src 'self';
  img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net;
  font-src 'self' https://fonts.gstatic.com;
  script-src 'self' https://cdn.jsdelivr.net;
  frame-src 'self';
```

---

## Troubleshooting

**Blank (white) lightbox on Preview/Details**

* The anchor `href="#modal-id"` must match a real `<div id="modal-id" class="glightbox-desc">…</div>`.
* GLightbox CSS/JS must be loaded **before** your page script (`projects.js` / `brand-center.js`).
* The CSS includes:

  ```css
  .glightbox-desc { display:none; }
  .gslide-inline .gslide-inner-content .glightbox-desc { display:block !important; }
  ```

  Keep these rules.

**“Loading projects…” never goes away**

* Wrong CSV path or 404. Check the browser Network tab for `projects-2025-26.csv`.
* CSV must include the header row listed above.
* Ensure you’re running a local server (not `file:///`).

**PDF preview is blank**

* Path typo or not served; make sure the PDF exists in `/assets/reports/`.
* Some browsers block cross-origin PDFs; keep files on the same origin.

**Console error: `Failed to execute 'readAsText' on 'FileReader'`**

* That was from the old version that used a file input. The current code uses `fetch` + Papa Parse.
  Remove any legacy script tags you might have reintroduced.

---

## Maintenance

* When you rotate to a new Rotary year, copy the projects CSV to a new filename (e.g., `projects-2026-27.csv`), update the `<template id="projectsCsvPath">…</template>` in `projects.html`, and archive the previous CSV.
* Add new logo variants to Brand Center by duplicating a `brand-card` block and updating image paths & labels.
* Keep dependencies fresh (Bootstrap/AOS/GLightbox/PapaParse) by bumping versions annually.

---

## License / Credits

* © Rotaract Club of Bangalore JP Nagar.
* Logos and brand assets are © Rotary International and used under brand guidelines.
* Libraries: Bootstrap (MIT), AOS (MIT), GLightbox (MIT), Papa Parse (MIT).

---
