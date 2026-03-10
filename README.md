# Umer Mansoor — Portfolio (React + Vite)

## 📁 Folder Structure

```
umermansoorportfolio/
├── index.html               ← ROOT level (Vite requirement)
├── vite.config.js
├── eslint.config.js
├── package.json
└── src/
    ├── main.jsx             ← Entry point
    ├── App.jsx
    ├── styles/
    │   └── globals.css
    └── components/
        ├── Cursor.jsx / .css
        ├── Navbar.jsx / .css
        ├── Hero.jsx / .css
        ├── Marquee.jsx / .css
        ├── Stats.jsx / .css
        ├── About.jsx / .css
        ├── Skills.jsx / .css
        ├── Projects.jsx / .css
        ├── projectsData.js
        ├── Contact.jsx / .css
        └── Footer.jsx / .css
```

## 🚀 Chalane ka Tarika

```bash
# 1. Folder mein jao
cd umermansoorportfolio

# 2. Dependencies install karo
npm install

# 3. Dev server start karo
npm run dev
```

Browser mein `http://localhost:5173` pe khul jayega! ✅

## ⚠️ Important Note
- Vite mein `npm start` nahi chalta — `npm run dev` use karo
- `index.html` ROOT mein hona chahiye, `public/` mein nahi

## 🌐 Deploy

**Vercel:**
```bash
npm run build
# dist/ folder Vercel pe upload karo
```
