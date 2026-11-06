# Manchi Panulu Sewa Foundation Website

A premium, modern, fully responsive web application for **Manchi Panulu Sewa Foundation**, inspired by the visual elegance and ecological aesthetic of the Envarn reference design.

> **Motto:** *"Good Deeds Today, A Better Tomorrow."*  
> **Core Ethos:** **Protect Nature. Serve Humanity. Preserve the Environment.**

---

## 🌿 Design Reference & Visual Theme

The website implements an **Envarn-inspired aesthetic**:
- **Outer Shell:** Deep forest-green framed background (`#081B12`) providing a bespoke editorial border on desktop viewports.
- **Inner Canvas:** Clean light sage-green background (`#F6FAF6` to `#EEF5EE`) with generous whitespace, organic cards, and emerald-to-lime accents (`#78C953`, `#E2B357`).
- **Typography:** Premium editorial serif display headings (**Fraunces**) paired with high-legibility geometric sans-serif body copy (**Plus Jakarta Sans**).
- **Interactions:** Animated statistics counters, responsive photo/video lightbox gallery, interactive project modals, bilingual preview notice (Telugu & Hindi), functional form validations, and celebratory confetti effects.

---

## 🏛️ Four Core Pillars of Service

1. **PILLAR 01 — TREE & NATURE PROTECTION: Vruksha Sewa**
   - *Rooting Hope, Greening Tomorrow*
   - Dedicated to afforestation, indigenous tree plantation, sapling distribution, and nurturing green landscapes.
   - High-density Miyawaki urban forestation & native species conservation.

2. **PILLAR 02 — HUMANITARIAN & SOCIAL SERVICE: Manava Sewa**
   - *Compassion in Action, Humanity at Heart*
   - Providing nutritious meals, clothing, educational assistance, disaster relief, and compassionate support for elderly and vulnerable individuals.
   - Daily wholesome food relief (*Annadhanam*) outside public hospitals.

3. **PILLAR 03 — ENVIRONMENTAL CONSERVATION: Prakruthi Sewa**
   - *Restoring Nature, Sustaining Life*
   - Revitalizing water bodies, organizing cleanliness drives, reducing plastic pollution, and promoting sustainable, zero-waste communities.
   - Urban lake revival (*Jal Punarjeevana*) & community plog runs.

4. **PILLAR 04 — POVERTY RELIEF & EMPOWERMENT: Aashraya Sewa**
   - *Restoring Dignity, Empowering Lives*
   - Supporting economically disadvantaged families through essential supplies, emergency medical assistance, livelihood opportunities, and self-reliance initiatives.
   - Monthly dry ration kits, thermal winter blankets, and vocational tool donations.

---

## 🚀 Technology Stack

- **Framework:** React 19 with Vite 8
- **Routing:** React Router DOM v7
- **Icons:** Lucide React & Custom SVG Brand Emblems
- **Animations:** Custom CSS3 Keyframes & Canvas-Confetti
- **Styling:** Custom CSS3 Architecture with Design System Tokens (`variables.css`, `main.css`, `components.css`, `pages.css`)

---

## 📂 Project Architecture

```
manchi-panulu-seva-foundation/
├── public/
│   ├── favicon.svg              # Custom leaf-sprout foundation favicon
│   └── ...
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Reusable pill and outline buttons
│   │   ├── Navbar.jsx           # Responsive sticky header with language switch & mobile drawer
│   │   ├── Footer.jsx           # Comprehensive footer with disclaimers & newsletter
│   │   ├── Hero.jsx             # Nature-inspired hero section with floating badges
│   │   ├── ServiceCard.jsx      # 3 Pillars showcase cards
│   │   ├── ProjectCard.jsx      # Filterable project card with progress metrics
│   │   ├── ProjectDetailModal.jsx # Project deep-dive modal
│   │   ├── GalleryModal.jsx     # Responsive lightbox modal for photos/videos
│   │   ├── BlogModal.jsx        # Article reader modal with tags & author details
│   │   ├── StatsCounter.jsx     # Animated counters with audit disclaimers
│   │   ├── LanguageNoticeModal.jsx # Telugu & Hindi preview modal
│   │   └── ScrollToTop.jsx      # Automatic scroll restoration on navigation
│   ├── pages/
│   │   ├── HomePage.jsx         # Complete landing page with all 10 core sections
│   │   ├── AboutPage.jsx        # History, Mission, Vision, Values & Leadership
│   │   ├── ServicesPage.jsx     # Deep-dive into 3 pillars & Request Seva modal
│   │   ├── ProjectsPage.jsx     # Searchable & filterable ongoing/completed initiatives
│   │   ├── GalleryPage.jsx      # Photo & video gallery with interactive lightbox
│   │   ├── BlogPage.jsx         # Articles, guides, and stories of change
│   │   ├── VolunteerPage.jsx    # Volunteer registration form with validation & confetti
│   │   ├── DonatePage.jsx       # Domestic (UPI/Bank) vs International (FCRA compliant)
│   │   └── ContactPage.jsx      # Inquiries desk, location placeholders & interactive FAQ
│   ├── styles/
│   │   ├── variables.css        # CSS custom properties & color palettes
│   │   ├── main.css             # Base reset, layout shell & framed canvas
│   │   ├── components.css       # Nav, footer, buttons, cards, lightbox styles
│   │   └── pages.css            # Specialized page layouts, forms, tabs & modals
│   ├── data/
│   │   ├── servicesData.js      # Structured services data
│   │   ├── projectsData.js      # Structured projects data
│   │   ├── galleryData.js       # Curated high-res imagery & video items
│   │   ├── blogData.js          # In-depth editorial articles
│   │   ├── statsData.js         # Animated counter values & compliance info
│   │   └── faqData.js           # Comprehensive FAQ entries
│   ├── App.jsx                  # Main routing configuration
│   └── main.jsx                 # Entry point with BrowserRouter
├── index.html                   # SEO tags & Google Font links
└── package.json
```

---

## 🏃 Running the Application Locally

1. Navigate to the project directory:
   ```bash
   cd manchi-panulu-seva-foundation
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

3. Build for production:
   ```bash
   npm run build
   ```

---

## ⚖️ Compliance & International Visitor Note

- **Domestic Donations:** Support UPI QR code and NEFT/IMPS bank transfer with placeholder 80G tax acknowledgment vouchers.
- **International Inquiries:** In full compliance with Indian statutory guidelines under the Foreign Contribution Regulation Act (FCRA), direct online overseas transactions are kept transparent, providing an international partnership inquiry channel without making unauthorized claims.
