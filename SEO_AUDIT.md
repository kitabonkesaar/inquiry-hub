# COMPREHENSIVE TECHNICAL, ON-PAGE & LOCAL SEO AUDIT: RENTANYBUS.COM

**Target Domain:** `https://www.rentanybus.com`  
**Market:** Odisha, India (Bhubaneswar, Cuttack, Puri, Berhampur, Balasore, Rourkela, Sambalpur)  
**Niche:** Commercial bus rental, luxury coach hire, tempo traveller charter, pilgrimage / wedding / corporate group transport  
**Platform Stack:** Vite + React 18 SPA (TypeScript), TailwindCSS, Supabase Backend  
**Audit Date:** October 2026  
**Auditor:** Senior Technical SEO Engineer & Local-SEO Strategist  

---

## 1. EXECUTIVE SUMMARY & SEVERITY DASHBOARD

| Severity | Issues Identified | Core Impact |
| :--- | :---: | :--- |
| 🔴 **CRITICAL** | 4 | Search engine discovery blocked, missing sitemap, zero route-specific titles/metas, CSR indexing friction. |
| 🟠 **HIGH** | 5 | Total lack of Schema JSON-LD markup, missing canonical tags, broken social preview image, zero city landing hubs. |
| 🟡 **MEDIUM** | 4 | NAP phone number discrepancies across components, missing breadcrumb trails, uncompressed image payloads. |
| 🟢 **LOW** | 3 | Static meta keywords tag deprecation, missing alt text details on dynamic vehicle cards, favicon multi-resolution sizing. |

---

## 2. PAGE INVENTORY & CRAWL DATA

| Path | Current Title (Rendered) | Current Meta Description | H1 Heading | Canonical Tag | Indexability |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Generic Global Title (`index.html`) | Generic Global Description | "Odisha's Premier Bus & Traveller Rental Service" | ❌ None | Indexable (Default) |
| `/vehicles` | Generic Global Title (`index.html`) | Generic Global Description | "Our Fleet" / "Explore Fleet" | ❌ None | Indexable (Default) |
| `/vehicles/:id` | Generic Global Title (`index.html`) | Generic Global Description | `{vehicle.name}` | ❌ None | Indexable (Default) |
| `/inquiry` | Generic Global Title (`index.html`) | Generic Global Description | "Request a Custom Charter Quote" | ❌ None | Indexable (Default) |
| `/about` | Generic Global Title (`index.html`) | Generic Global Description | "About RentAnyBus" | ❌ None | Indexable (Default) |
| `/contact` | Generic Global Title (`index.html`) | Generic Global Description | "Contact Us" | ❌ None | Indexable (Default) |
| `/faqs` | Generic Global Title (`index.html`) | Generic Global Description | "Frequently Asked Questions" | ❌ None | Indexable (Default) |
| `/blog` | Generic Global Title (`index.html`) | Generic Global Description | "Our Blog" | ❌ None | Indexable (Default) |
| `/blog/:slug` | Generic Global Title (`index.html`) | Generic Global Description | `{post.title}` | ❌ None | Indexable (Default) |
| `/owner` | Generic Global Title (`index.html`) | Generic Global Description | "Partner With RentAnyBus" | ❌ None | Indexable (Default) |
| `/admin/*` | Generic Global Title (`index.html`) | Generic Global Description | "Admin Portal" | ❌ None | ⚠️ Should be `noindex` |

---

## 3. TECHNICAL SEO AUDIT FINDINGS

### 3.1. Crawlability & Indexation
* **Issue 1 (CRITICAL): Missing `sitemap.xml`**  
  * **Evidence:** `e:/RentAnyBus/inquiry-hub/public/sitemap.xml` does not exist.  
  * **Impact:** Googlebot and Bingbot cannot systematically discover all internal pages, dynamic vehicle profiles, or blog articles.  
  * **Fix:** Generate a dynamic XML sitemap containing all indexable static and dynamic routes (`/`, `/vehicles`, `/vehicles/:id`, `/about`, `/contact`, `/faqs`, `/blog`, `/blog/:slug`) with appropriate `<lastmod>` and `<changefreq>` tags.
* **Issue 2 (CRITICAL): Incomplete `robots.txt`**  
  * **Evidence:** `e:/RentAnyBus/inquiry-hub/public/robots.txt` contains only `Allow: /` for select bots without declaring `Sitemap: https://www.rentanybus.com/sitemap.xml` and without disallowing private routes (`/admin`, `/admin/*`, `/profile`).  
  * **Impact:** Waste of crawl budget on administrative login endpoints; lack of explicit sitemap directive delays search indexing.  
  * **Fix:** Update `robots.txt` with sitemap location, bot crawling rules, and disallow rules for `/admin*` and `/profile`.
* **Issue 3 (CRITICAL): Client-Side Single Page Application (SPA) Meta Blindness**  
  * **Evidence:** `index.html` lines 11–26 specify static metadata. React Router updates the DOM client-side without dynamically altering `<title>`, `<meta name="description">`, or OpenGraph tags in the `<head>`.  
  * **Impact:** Googlebot, web crawlers, WhatsApp, and social preview scrapers see the exact same generic title on every single URL.  
  * **Fix:** Implement a robust SEO component (`<SEOHead />`) using React standard DOM or React Helmet to inject unique titles, meta descriptions, canonical links, and Open Graph tags on every route.

### 3.2. Canonicals & URL Architecture
* **Issue 4 (HIGH): Missing Canonical Tags**  
  * **Evidence:** No `<link rel="canonical" ...>` tags exist in `index.html` or any page component.  
  * **Impact:** Potential duplicate content issues between `rentanybus.com`, `www.rentanybus.com`, trailing slash variants (`/vehicles/` vs `/vehicles`), and URL query parameters.  
  * **Fix:** Automatically inject canonical tags pointing to normalized HTTPS `https://www.rentanybus.com{pathname}` URLs.

### 3.3. Social Sharing & Media
* **Issue 5 (HIGH): Broken Open Graph Preview Image (`/og-image.png`)**  
  * **Evidence:** `index.html` specifies `<meta property="og:image" content="/og-image.png" />`, but `public/og-image.png` is nonexistent (404).  
  * **Impact:** Broken snippet previews on WhatsApp, Facebook, LinkedIn, and Twitter when links are shared.  
  * **Fix:** Deploy a high-resolution branded 1200x630 OpenGraph social card (`og-image.png`) to `public/`.

### 3.4. Structured Data (Schema JSON-LD)
* **Issue 6 (HIGH): Zero Schema Markup Detected**  
  * **Evidence:** Grep search for `application/ld+json` across the entire codebase returned 0 matches.  
  * **Impact:** Zero rich snippets in Google search results (no Star Ratings, no FAQ drop-downs, no Local Business Knowledge Graph panel, no Price / Breadcrumb snippets).  
  * **Fix:** Implement modular JSON-LD schemas:
    1. `LocalBusiness` / `AutomotiveBusiness` Schema (with geo-coordinates for Bhubaneswar, operating hours, phone, and rating).
    2. `BreadcrumbList` Schema across all secondary and tertiary pages.
    3. `Product` / `Offer` Schema on vehicle detail views (`/vehicles/:id`).
    4. `FAQPage` Schema on `/faqs` and service sections to dominate Google Question SERP real estate.

---

## 4. LOCAL SEO & NAP AUDIT

* **NAP Consistency:**
  * **Business Name:** RentAnyBus (Rent Any Bus)
  * **Phone Number:** Displayed as `+91 82495 29220` in Header/Contact, but mock data had references to `+91 94370 12345`. All customer-facing links must standardize on `+91 82495 29220`.
  * **Primary Operating Address:** Bhubaneswar, Odisha, India (PIN: 751024).
  * **Serving Cities:** Bhubaneswar, Cuttack, Puri, Khordha, Berhampur, Balasore, Rourkela, Sambalpur, Angul.
* **Google Business Profile (GBP) Integration:**
  * The site must link directly to its verified Google Maps location and review portal.
  * Local landing pages must be established for Bhubaneswar, Puri, and Cuttack.

---

## 5. COMPETITOR BENCHMARKING (ODISHA MARKET)

| Feature / Metric | RedBus Bus Hire | Savaari Bus Rental | Local Offline Operators | RentAnyBus (Current) | RentAnyBus (Target) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **City Landing Pages** | Dedicated programmatic hubs (`/bus-hire/bhubaneswar`) | Dedicated city hubs | None (word of mouth) | ❌ Only `/vehicles` | ✅ Dedicated `/bus-rental/[city]` hubs |
| **Route Specific Pages** | Extensive route inventory | Extensive intercity inventory | None | ❌ None | ✅ Hub-and-spoke routes (e.g. Bhubaneswar to Puri) |
| **Pricing Transparency** | Base rate + per-km calculator | Per-km estimate | Hidden until phone call | Partially visible per day | ✅ Transparent Per Day + Per Km + Dry Charter |
| **Schema Coverage** | Extensive JSON-LD | Product & FAQ Schema | None | ❌ None | ✅ Full LocalBusiness + FAQ + Breadcrumbs |
| **Local Fleet Variety** | Varies by broker | Partner aggregators | Local 1-2 buses | 150+ Odisha verified fleet | ✅ Verified Odisha fleet with 360 seat maps |

---

## 6. TOP 10 PRIORITY FIXES

1. **Deploy Dynamic Head & Metadata Management (`<SEOHead />`)**: Inject unique, keyword-rich titles (≤60 chars) and meta descriptions (≤155 chars) per page.
2. **Generate `public/sitemap.xml`**: Include all canonical URLs with priority and change frequency.
3. **Update `public/robots.txt`**: Add Sitemap directive and disallow crawling of `/admin*` and private routes.
4. **Deploy Missing `public/og-image.png`**: Add branded 1200×630px social card.
5. **Inject Organization & LocalBusiness JSON-LD Schema**: Establish Google Knowledge Graph authority in Bhubaneswar & Odisha.
6. **Inject FAQPage JSON-LD Schema**: Enable rich search result snippet expandable answers on Google SERPs.
7. **Inject Product / Offer JSON-LD Schema**: Add schema to vehicle fleet pages with pricing, seating capacity, and aggregate ratings.
8. **Build Programmatic Local City Hubs**: Create high-value city landing pages (`/bus-rental/bhubaneswar`, `/bus-rental/puri`, `/bus-rental/cuttack`).
9. **Build High-Volume Route Landing Pages**: Create dedicated route pages (`/routes/bhubaneswar-to-puri-bus-rental`, etc.).
10. **Implement Breadcrumbs & Internal Linking**: Hub-and-spoke internal linking architecture connecting home → cities → routes → vehicles → booking.
