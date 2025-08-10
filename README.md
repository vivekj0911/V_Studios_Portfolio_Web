# 📸 V-Digitals – Photographer Portfolio (Frontend)

This is the **frontend** for *V-Digitals*, a modern and fully responsive photographer portfolio website.  
Built with **React (Vite)** and styled using **Tailwind CSS v4.1**, it showcases photography & videography work with smooth animations, category-based galleries, and a secure admin dashboard for managing content.

Live Site: [https://vidhidigitals.vercel.app](https://vidhidigitals.vercel.app)

---

## 🚀 Tech Stack
- **React 18** (with Vite for fast builds)
- **Tailwind CSS v4.1** (Custom light theme)
- **React Router v6** (Routing & nested layouts)
- **Axios** (API integration)
- **Lucide React** (Icons)
- **@vercel/analytics** (Traffic analytics)
- **Framer Motion / GSAP-inspired animations** (Smooth UI transitions)

---

## 📂 Folder Structure
```
Directory structure:
└── vivekj0911-v_studios_portfolio_web/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.mjs
    ├── vercel.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── main.jsx
        ├── components/
        │   ├── AboutSection.jsx
        │   ├── AdminLayout.jsx
        │   ├── ContactSection.jsx
        │   ├── Footer.jsx
        │   ├── GallerySection.jsx
        │   ├── HeroSection.jsx
        │   ├── Layout.jsx
        │   ├── Lightbox.jsx
        │   ├── Navbar.jsx
        │   ├── ProtectedRoute.jsx
        │   └── TermsModal.jsx
        └── pages/
            ├── GalleryDetailPage.jsx
            ├── Home.jsx
            └── admin/
                ├── AdminDashboard.jsx
                ├── AdminLogin.jsx
                ├── AdminManage.jsx
                └── AdminUpload.jsx

```

---

## ⚙️ Installation & Setup
```bash
# 1️⃣ Clone the repository
git clone https://github.com/vivekj0911/V_Studios_Portfolio_Web.git

# 2️⃣ Navigate into the project folder
cd frontend

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start development server
npm run dev
```

---

## 🔑 Environment Variables
Create a `.env` file in the root with:

```env
VITE_API_URL=your_backend_url
```

> ⚠️ Make sure you do **NOT** commit `.env` files to GitHub (add it to `.gitignore`).

---

## 📌 Features
- **Elegant Landing Page** – High-impact hero section & CTA
- **Dynamic Gallery** – Filter by categories (Images + Videos)
- **Lazy Loading** – Efficient media loading for better performance
- **Terms & Conditions Modal** – Privacy before viewing gallery
- **Admin Panel** – Secure login, media upload & management
- **Responsive Design** – Works seamlessly on all devices
- **Smooth Animations** – Inspired by GSAP/Framer Motion
- **Vercel Analytics** – Track visits and engagement

---

## 🌐 Deployment
The frontend is deployed on **Vercel**.  
To deploy your own:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🔗 Backend Repository
The backend is available here:  
[https://github.com/vivekj0911/Photographer_portfolio_backend](https://github.com/vivekj0911/Photographer_portfolio_backend)

---

## 📜 License
This project is licensed under the **MIT License** – you’re free to use, modify, and distribute with attribution.

---

## ✨ Author
Developed by **Vivek Janbandhu**  
📷 Photographer: **Vidhi Digitals**
