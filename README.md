# Savannah, The Garden Restaurant and Cafe - Production-Quality Demo Website

A modern, responsive, production-quality website built for **Savannah, The garden restaurant and cafe** located in Shivajinagar, Pune, Maharashtra, India.

---

## 🌿 Overview & Research Grounding

This website was built using verified, authentic details collected from Google Maps, municipal address records, and diner reviews:
- **Restaurant Name:** Savannah, The garden restaurant and cafe (Savannah Garden Restaurant & Cafe)
- **Full Address:** 1201/A/4, G.H. Patil Path, Near Kaysons Automobiles, Shivajinagar, Pune, Maharashtra 411004, India
- **Phone & WhatsApp:** +91 91728 15777
- **Google Maps Listing:** [View on Google Maps](https://www.google.com/maps/search/?api=1&query=Savannah%2C%20The%20garden%20restaurant%20and%20cafe&query_place_id=ChIJL8ECM9XBwjsRfZPOodvU6TU)
- **Rating:** 4.4 / 5.0 (380+ customer reviews)
- **Cuisine:** Continental, Gourmet Pizzas, Artisanal Pastas, All-Day Breakfast, Specialty Coffees & Desserts
- **Average Cost:** ₹800 – ₹1,000 for two people

---

## 🚀 Tech Stack

- **Framework:** React 18 + Vite (Plain JavaScript for reliable builds)
- **Styling:** Tailwind CSS (Custom botanical & earthy color palette: deep forest green, warm terracotta, cream, sage)
- **Routing:** React Router v6 (SPA with `/*` redirect rules for Netlify)
- **Icons:** Lucide React
- **Typography:** Playfair Display (Serif headings) & Plus Jakarta Sans (Clean modern body)
- **State Management:** React Context API + safe `localStorage` / `sessionStorage` persistence
- **Zero External Backend / Database Required:** Works out of the box with zero runtime dependencies.

---

## 🔑 Demo Owner Portal Credentials

Anyone evaluating the site can test the Owner Dashboard by navigating to `/owner-login` or clicking the "Owner Portal" link in the header/footer:

- **Login URL:** `/owner-login`
- **Username / Email:** `owner@demo.com`
- **Password:** `demo1234`
- *(A one-click "Auto-fill Demo Credentials" button is also provided directly on the login screen).*

---

## 🛠️ How to Run Locally

### 1. Prerequisites
- Node.js version 20+ (Node 20 or higher recommended, as specified in `.nvmrc`)
- npm

### 2. Installation
Clone or navigate to the project directory:
```bash
cd savannah-garden-restaurant
npm install
```

### 3. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production
To create an optimized production bundle:
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📝 How to Update Restaurant Information (Single Source of Truth)

All restaurant data is consolidated in **`src/data/restaurant.js`**. You do **NOT** need to edit individual components or pages.

In `src/data/restaurant.js`, you can edit:
1. **`restaurantInfo`**:
   - `name`, `tagline`, `description`
   - `address`, `landmark`, `city`, `postalCode`
   - `phone`, `whatsapp`, `email`
   - `operatingHours` (dynamically drives the "Open Now / Closed" indicator)
   - `socialLinks` (Instagram, Facebook, WhatsApp, Maps)
   - `ownerCredentials` (Username and password for owner dashboard)
2. **`categories`**: Menu categories and filter tabs.
3. **`menuItems`**: Names, descriptions, prices in ₹, dietary flags (`isVeg`), photos, and tags (`isPopular`, `isChefsSpecial`).
4. **`offers`**: Promotional banners and voucher discount codes.
5. **`reviews`**: Customer reviews, reviewer names, star ratings, and dates.
6. **`gallery`**: Photo URLs, titles, and categories for the interactive lightbox.
7. **`instagramPosts`**: Visual tiles and captions linking to Instagram.
8. **`faqs`**: Common customer questions and answers.
9. **`sampleOrders`**: Sample order items, amounts, and initial statuses.

---

## 🌐 How to Deploy to GitHub & Netlify

### Zero-Setup Netlify Deployment
This repository includes:
- `netlify.toml` configured with `command = "npm run build"`, `publish = "dist"`, and single-page application redirect `/* -> /index.html 200`.
- `public/_redirects` with `/* /index.html 200`.
- `.nvmrc` pinned to Node 20.

### Steps:
1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Savannah garden restaurant demo"
   git branch -M main
   git remote add origin https://github.com/<your-username>/savannah-garden-restaurant.git
   git push -u origin main
   ```
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **"Add new site"** &rarr; **"Import an existing project"** &rarr; choose your GitHub repo.
4. Netlify will auto-detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**. Your site will be live within seconds with full React Router routing support!
