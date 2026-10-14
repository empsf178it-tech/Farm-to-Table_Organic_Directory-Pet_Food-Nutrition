# Farm-to-Table Organic Directory – Pet Food & Nutrition

A modern, responsive, multi-page web platform connecting pet guardians with verified organic pet food products, whole food treats, human-grade fresh meals, sustainable ranches, and holistic nutrition resources.

---

## 🌿 Technology Stack

This project is built strictly following the core specifications:
- **HTML5**: Clean, accessible semantic structure.
- **CSS3**: Vanilla custom properties (tokens), responsive grids, smooth animations, glassmorphism, and strict media queries. (Zero Bootstrap or Tailwind).
- **Vanilla JavaScript**: Modular ES6+ client-side scripts for modals, search/filtering, favorites sync, and dashboard persistence. (Zero jQuery or frameworks).

---

## 📁 Project Structure

```
├── index.html                    # Home landing page with hero, categories, featured products & suppliers
├── about.html                    # About page detailing our story, mission, sourcing standards & team
├── services.html                 # Complete directory with search, live filters, sorting & details modal
├── dashboard.html                # User dashboard with tabs, saved favorites, suppliers & settings
├── contact.html                  # Contact form with validation, office cards & FAQ accordion
├── css/
│   ├── style.css                 # Master design system, color palette, buttons, cards & modals
│   └── responsive.css            # Strict hamburger navigation (<=1024px) & mobile responsive rules
├── js/
│   ├── main.js                   # Shared navigation, hamburger drawer, toasts, newsletter, FAQ & helpers
│   ├── auth.js                   # Demo login/signup modals, validation, and session simulation
│   ├── products.js               # Product catalog dataset, search, live filters, sorting & details modal
│   └── dashboard.js              # Dashboard tab switching, profile editing, and favorites sync
├── assets/
│   └── images/                   # All 50 categorized, locally saved high-resolution images
└── README.md                     # Project documentation & instructions
```

---

## 🎨 Color Palette & Design System

- **Primary Green**: `#2E7D32`
- **Dark Forest Green**: `#174D35`
- **Light Green Accent**: `#E8F5E9`
- **Warm Cream Background**: `#FFFDF5`
- **White Background**: `#FFFFFF`
- **Dark Text**: `#26332B`
- **Muted Text**: `#718078`
- **Accent Warm Orange**: `#F4A340`

Typography: Google Fonts **Outfit** (headings) & **Plus Jakarta Sans** (body text).

---

## 📱 Strict Responsive Navigation Requirement

- **Desktop Viewport (> 1024px)**: Full desktop navbar displays all links (Home, About, Services, Dashboard, Contact) and authentication buttons (Log In, Sign Up).
- **Mobile & Tablet Viewports (≤ 1024px)**:
  - Desktop navigation links and action buttons are strictly hidden (`display: none !important;`).
  - Hamburger toggle button is displayed.
  - Clicking the hamburger opens an off-canvas drawer with all page links and auth actions.
  - Backdrop tap, link tap, or pressing the `Escape` key closes the menu.
  - Tested and verified at **1024px, 992px, 768px, 600px, 480px, 375px, and 320px**.

---

## 📷 Image Manifest & Assets (50 Local Images)

All 50 images are organized in `assets/images/` and mapped to descriptive filenames:
1. `organic-dog-food.jpg` (Dog Food formulas)
2. `organic-cat-food.jpg` (Cat Food pouches)
3. `fresh-pet-food-bowls.jpg` (Steamed whole meal bowls)
4. `natural-pet-treats.jpg` (Single-ingredient treats)
5. `healthy-dog-meals.jpg` (Balanced dog dinners)
6. `organic-pet-food-packaging.jpg` (Sustainable packaging)
7. `grain-free-pet-food.jpg` (Grain-free kibble)
8. `fresh-meat-ingredients.jpg` (Human-grade meats)
9. `pet-safe-vegetables.jpg` (Organic farm veggies)
10. `pet-nutrition.jpg` (Nutrition research)
11. `dry-dog-food.jpg` (Oven-baked kibble)
12. `wet-cat-food.jpg` (Moisture-dense cat meal)
13. `salmon-omega-ingredients.jpg` (Omega oil & wild catch)
14. `balanced-dog-meals.jpg` (Nutritional ratios)
15. `pumpkin-sweet-potato.jpg` (Fiber & digestion)
16. `puppy-nutrition.jpg` (Growth formulas)
17. `senior-pet-nutrition.jpg` (Joint & senior vitality)
18. `freeze-dried-pet-food.jpg` (Freeze-dried raw bites)
19. `pet-nutrition-supplements.jpg` (Herbal botanical powders)
20. `nutrition-consultations.jpg` (Dietician guidance)
21. `healthy-golden-retrievers.jpg` (Active companions)
22. `kittens-cat-nutrition.jpg` (Feline wellness)
23. `homemade-dog-meals.jpg` (Artisanal cooking)
24. `crunchy-dog-treats.jpg` (Dental biscuits)
25. `fresh-protein-sources.jpg` (Pasture meats)
26. `pet-food-superfoods.jpg` (Bone broth & chia)
27. `eco-friendly-packaging.jpg` (Compostable pouches)
28. `cat-feeding.jpg` (Obligate carnivore bowls)
29. `fresh-meal-preparation.jpg` (Gentle steaming)
30. `healthy-pets.jpg` (Vibrant pets)
31. `chicken-protein.jpg` (Pastured poultry)
32. `salmon.jpg` (Wild Alaskan salmon)
33. `fresh-vegetables.jpg` (Heirloom carrots & greens)
34. `fruit-based-pet-treats.jpg` (Blueberry chews)
35. `natural-dry-food.jpg` (Raw coated dry)
36. `fresh-meal-packs.jpg` (Chilled vacuum packs)
37. `organic-cat-food-products.jpg` (Canned wet feast)
38. `dental-treats.jpg` (Kelp & spearmint chews)
39. `veterinary-nutrition.jpg` (Testing standards)
40. `farm-to-table-ingredients.jpg` (Direct pasture cuts)
41. `premium-organic-dog-food.jpg` (Gently baked recipes)
42. `healthy-cat-meals.jpg` (Savory broths)
43. `nutritious-homemade-meals.jpg` (Whole food bowls)
44. `natural-dog-treats.jpg` (Tendon chews)
45. `fresh-farm-produce.jpg` (Organic harvest)
46. `pet-wellness.jpg` (Companion health)
47. `organic-product-collections.jpg` (Product suites)
48. `puppy-healthcare.jpg` (Puppy wellness)
49. `dogs-and-cats-together.jpg` (Companion harmony)
50. `organic-farm-landscape.jpg` (Regenerative farm landscape)

---

## 🚀 How to Run Locally

You can preview the website locally using any standard static file server or directly opening `index.html` in your web browser:

### Option A: Python HTTP Server (Built-in)
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

### Option B: Node.js (npx serve or live-server)
```bash
npx -y serve .
```

---

## 🔒 Demonstration & Medical Disclaimer

- **Frontend-Only Authentication**: Login, signup, password changes, and favorites are simulated in `localStorage` for frontend evaluation. No plaintext credentials are saved to external databases.
- **Non-Veterinary Disclaimer**: This directory connects pet guardians with organic whole food suppliers and informational guides. It does not provide licensed veterinary diagnoses or replace medical treatment prescribed by a licensed veterinarian.
