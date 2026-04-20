# CampusEventUI 🎓

**Prof Elective 3 – Advanced Web Development: Front End 2**  
Final Lab Examination | ISPSC | 2nd Semester A.Y. 2025–2026

---

## ✅ Checklist Coverage

| Step | Feature | Status |
|------|---------|--------|
| 1 | React + Vite project | ✅ |
| 2 | Organized folder structure | ✅ |
| 3 | All required pages (Home, Events, EventDetails, Dashboard, Login) | ✅ |
| 4 | React Router with BrowserRouter, Routes, Route, dynamic :id | ✅ |
| 5 | Layout with Navbar + Outlet | ✅ |
| 6 | Protected Route (Dashboard) | ✅ |
| 7 | State Management with useReducer + Context (Add, Delete, Toggle) | ✅ |
| 8 | API Integration (jsonplaceholder) with loading + error handling | ✅ |
| 9 | Event Details page with useParams() | ✅ |
| 10 | Real-time: auto-refresh every 30s + "Last Updated" + "Data Updated" msg | ✅ |
| 11 | Lazy loading with React.lazy() + Suspense | ✅ |
| 12 | Clean UI — Navbar, event cards, event details, dashboard layout | ✅ |
| 13 | Student Touch: dark mode, search, category filter, hover effects, badges, animations | ✅ |
| 14–15 | Ready for GitHub + Vercel/Netlify deployment | ✅ |

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## 🔐 Demo Login
- **Username:** any (e.g. `student01`)
- **Password:** `student123`

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx         # Navigation with dark mode toggle
│   ├── Layout.jsx         # Wraps pages with Navbar + Outlet
│   └── ProtectedRoute.jsx # Guards /dashboard
├── context/
│   └── AppContext.jsx     # useReducer + Auth + Dark mode
├── pages/
│   ├── Home.jsx           # Hero, features, stats
│   ├── Events.jsx         # API data, search, filter, auto-refresh
│   ├── EventDetails.jsx   # useParams(), event info
│   ├── Dashboard.jsx      # Protected, CRUD events
│   └── Login.jsx          # Auth form
├── App.jsx                # Routes + Suspense + lazy()
├── main.jsx
└── index.css
```

## 🌟 Student Enhancements
1. **Dark Mode** — Toggle in navbar, persists across pages
2. **Search + Category Filter** — On Events page
3. **Hover Effects + Animations** — Cards lift on hover, fade-in entrance
4. **Status Badges + Tags** — Active/inactive with color coding
5. **Data Updated Notification** — Toast on auto-refresh
