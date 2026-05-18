# FinSight — Smart Family Finance Tracker

> A full-stack AI-powered personal and family finance management platform built with React, Node.js, MongoDB, and JWT authentication. Features real-time analytics, smart savings goals, family parenting controls, and a fully customizable theme system.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Theme System](#theme-system)
- [Financial Logic](#financial-logic)
- [Database Models](#database-models)
- [Screenshots](#screenshots)
- [License](#license)

---

## Overview

FinSight is a production-ready finance tracker that goes beyond simple expense logging. It implements a complete financial flow:

```
Income → Expenses → Emergency/Goal Savings Reserve → Remaining Balance
```

Users get a real-time picture of their financial health through a dynamic scoring system, smart savings goals with auto-contribution tracking, category-wise budget planning, and rich Recharts-powered analytics — all wrapped in a futuristic fintech UI with 9 switchable themes.

---

## Tech Stack

### Frontend

| Technology       | Version   | Purpose                              |
|------------------|-----------|--------------------------------------|
| React            | 19.x      | UI framework                         |
| Vite             | 8.x       | Build tool & dev server              |
| Tailwind CSS     | 3.x       | Utility-first styling                |
| Framer Motion    | 12.x      | Animations & transitions             |
| Recharts         | 3.x       | Charts & data visualizations         |
| React Router DOM | 7.x       | Client-side routing                  |
| Lucide React     | 1.x       | Icon library                         |
| Context API      | —         | Global state (Auth, Theme)           |

### Backend

| Technology   | Version | Purpose                          |
|--------------|---------|----------------------------------|
| Node.js      | 18+     | Runtime                          |
| Express      | 5.x     | HTTP server & routing            |
| MongoDB Atlas| —       | Cloud database                   |
| Mongoose     | 9.x     | ODM for MongoDB                  |
| JWT          | 9.x     | Authentication tokens            |
| bcryptjs     | 3.x     | Password hashing                 |
| dotenv       | 17.x    | Environment variable management  |
| cors         | 2.x     | Cross-origin resource sharing    |

---

## Features

### Authentication & Security
- Email + password registration and login
- JWT-based authentication with 7-day token expiry
- Passwords hashed with bcrypt (12 salt rounds)
- Protected routes — unauthenticated users redirected to login
- Role-based access control: `admin` (Family Lead) and `member`
- Persistent login sessions via `localStorage`

### Dashboard
- 4 dynamic stat cards: **Income**, **Total Expenses**, **Savings Reserve**, **Balance**
- Real-time computed balance: `Income − Expenses − Monthly Goal Contributions`
- Savings Reserve card shows total monthly goal contributions (future reserve)
- Income set by user via modal, persisted in `localStorage`
- Glow effects and animated card transitions

### Transactions
- Full CRUD: create, read, update, delete
- Categories: Shopping, Food, Travel, Entertainment
- Category icons and color-coded badges
- Inline edit modal with pre-filled values
- Instant UI updates without page reload
- Mini stat strip on the Transactions page

### Budget Planner
- Per-category budget limits (Food, Travel, Shopping, Entertainment)
- Inline edit — click pencil, type, press Enter or confirm
- Real-time progress bars driven by actual transaction data
- Over-budget detection with red highlight and warning label
- Budget limits persisted in `localStorage`

### Savings Goals
- Maximum **5 active goals** per user
- **8 goal categories**: Education, Child Future, Emergency, Home, Vehicle, Retirement, Medical, Personal
- Smart auto-calculation: `monthlyContribution = target / months` (minimum ₹1,000/month)
- Timeline tracking with start date, target date, and estimated days remaining
- Auto-save toggle per goal (pause/resume contributions)
- Manual contribution modal with suggested amount
- Financial risk validation before goal creation:
  - `over-budget` — contribution would cause negative balance
  - `low-balance` — balance drops below 50% of total goal contributions
  - `risky` — expenses already exceed 80% of income
- Goal statuses: `pending` → `on-track` → `completed` | `paused`
- Warning banners displayed on goal cards

### Analytics
- **Daily** (last 30 days), **Weekly** (last 8 weeks), **Monthly** (last 6 months) tabs
- Area chart for spending trends
- Stacked bar chart: Expenses vs Goal Savings vs Remaining Balance
- Monthly comparison bar chart
- Category breakdown pie chart with percentages
- **Goal Progress Tracker** — all goals with progress bars, months remaining, target dates
- **Financial Health Score** (0–100) with SVG arc gauge
- **Financial Flow card** — visual breakdown of Income → Expenses → Goals → Balance
- **Smart Insights panel** — color-coded check items explaining the health score

#### Financial Health Score Algorithm

| Factor                        | Max Impact | Logic                                      |
|-------------------------------|------------|--------------------------------------------|
| Expense ratio (income vs spend)| −30 pts   | Deducts up to 30 if expenses ≥ income      |
| Balance after goals           | −20 pts    | Deducts if balance < 0 or < 10% of income |
| Goal health                   | −20 pts    | Deducts per warning/paused goal            |
| Spending consistency          | −10 pts    | Checks coefficient of variation            |
| Savings rate                  | −10 pts    | Deducts if saving < 10% of income          |

**Status labels:** Excellent (80+) · Stable (65+) · Risky (45+) · Critical (<45)

### Family / Parenting Control System
- Admin (Family Lead) can invite and manage family members
- Each member has a fully isolated account and dashboard
- Admin-only **Family Dashboard** with:
  - Member list with individual spend totals
  - Remove member functionality
  - All family transactions table (filterable by member)
  - Family goals summary grouped by category
  - 4 analytics charts: daily line, monthly bar, category pie, per-member horizontal bar
- Members can only access their own data
- Role badge displayed in sidebar for admins

### Theme System
- **9 built-in themes** with full CSS custom property coverage
- Quick theme switcher in the Topbar (Palette icon)
- Full theme picker in Settings with color swatch previews
- Custom accent color picker with 8 presets + free color input
- Theme and accent color saved to MongoDB and restored on login
- Smooth animated transitions on all theme switches

| Theme Key   | Name             | Accent Color |
|-------------|------------------|--------------|
| `default`   | Default Dark     | #8B5CF6      |
| `neon`      | Neon Purple      | #BF00FF      |
| `ocean`     | Ocean Blue       | #0EA5E9      |
| `emerald`   | Emerald Green    | #10B981      |
| `sunset`    | Sunset Orange    | #F97316      |
| `rose`      | Rose Pink        | #F43F5E      |
| `midnight`  | Midnight Black   | #6366F1      |
| `cyberpunk` | Cyberpunk        | #FACC15      |
| `glass`     | Glassmorphism    | #38BDF8      |
| `minimal`   | Minimal White    | #6366F1      |

### Profile & Settings
- Update display name and email address
- Upload profile avatar (base64, max 500KB) with live preview
- Change password with current password verification
- Account details panel: role, session info, account ID
- Secure sign out

---

## Project Structure

```
finsight/
├── src/                          # React frontend
│   ├── App.jsx                   # Root router + providers
│   ├── main.jsx                  # React entry point
│   ├── index.css                 # Tailwind + CSS custom properties
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       # User auth state, login/logout
│   │   └── ThemeContext.jsx      # Theme state, CSS var injection, 9 themes
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main shell, all page routing
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Register page with role selection
│   │   ├── Analytics.jsx         # Personal analytics + health score
│   │   ├── AdminDashboard.jsx    # Family admin panel
│   │   └── ProfileSettings.jsx  # Profile, theme, password settings
│   │
│   └── components/
│       ├── Sidebar.jsx           # Navigation + profile card
│       ├── Topbar.jsx            # Header + theme quick-picker
│       ├── StatCard.jsx          # Animated summary cards
│       ├── Transactions.jsx      # Transaction list + edit modal
│       ├── AddTransaction.jsx    # Add transaction modal
│       ├── SavingsGoal.jsx       # Goal cards + edit/contribute modals
│       ├── AddGoal.jsx           # Add goal modal with smart preview
│       ├── BudgetPlanner.jsx     # Category budget tracker
│       └── ExpenseChart.jsx      # Donut chart by category
│
└── server/                       # Node.js backend
    ├── index.js                  # Express app + transaction/goal routes
    ├── .env                      # Environment variables
    │
    ├── models/
    │   ├── User.js               # User schema (auth + profile + theme)
    │   ├── Transaction.js        # Transaction schema
    │   └── Goal.js               # Goal schema with smart fields
    │
    ├── routes/
    │   ├── auth.js               # Register, login, me, profile, password
    │   ├── family.js             # Family management + admin analytics
    │   └── analytics.js          # Personal analytics + health score
    │
    └── middleware/
        └── auth.js               # JWT verification + adminOnly guard
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB Atlas account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/finsight.git
cd finsight
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create `server/.env`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/finsight?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### 5. Start the backend

```bash
# from the server/ directory
node index.js
```

You should see:
```
Server on port 5000
MongoDB Connected
```

### 6. Start the frontend

```bash
# from the project root
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Environment Variables

| Variable    | Required | Description                                      |
|-------------|----------|--------------------------------------------------|
| `MONGO_URI` | ✅       | MongoDB Atlas connection string                  |
| `JWT_SECRET`| ✅       | Secret key for signing JWT tokens (min 32 chars) |
| `PORT`      | ❌       | Server port (defaults to `5000`)                 |

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth Routes — `/auth`

| Method | Endpoint           | Auth | Description                          |
|--------|--------------------|------|--------------------------------------|
| POST   | `/auth/register`   | ❌   | Register new user                    |
| POST   | `/auth/login`      | ❌   | Login and receive JWT                |
| GET    | `/auth/me`         | ✅   | Get current user profile             |
| PUT    | `/auth/profile`    | ✅   | Update name, email, avatar, theme    |
| PUT    | `/auth/password`   | ✅   | Change password                      |

#### POST `/auth/register`
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "password": "secret123",
  "role": "admin"
}
```

#### PUT `/auth/profile`
```json
{
  "name": "Priya",
  "email": "priya@example.com",
  "avatar": "data:image/png;base64,...",
  "theme": "ocean",
  "accentColor": "#0EA5E9"
}
```

---

### Transaction Routes

| Method | Endpoint                | Auth | Description              |
|--------|-------------------------|------|--------------------------|
| GET    | `/transactions`         | ✅   | Get all user transactions|
| POST   | `/transactions`         | ✅   | Create transaction       |
| PUT    | `/transactions/:id`     | ✅   | Update transaction       |
| DELETE | `/transactions/:id`     | ✅   | Delete transaction       |

#### POST `/transactions`
```json
{
  "title": "Zomato Order",
  "amount": 450,
  "category": "Food",
  "source": "manual"
}
```

---

### Goal Routes

| Method | Endpoint                    | Auth | Description                    |
|--------|-----------------------------|------|--------------------------------|
| GET    | `/goals`                    | ✅   | Get all user goals             |
| POST   | `/goals`                    | ✅   | Create goal with validation    |
| PUT    | `/goals/:id`                | ✅   | Update goal + recalculate      |
| POST   | `/goals/:id/contribute`     | ✅   | Add contribution to goal       |
| DELETE | `/goals/:id`                | ✅   | Delete goal                    |

#### POST `/goals`
```json
{
  "title": "Child Education Fund",
  "description": "For college in 2030",
  "category": "Education",
  "target": 500000,
  "months": 60,
  "saved": 10000,
  "income": 80000
}
```

**Response includes `warning` field if financially risky:**
```json
{
  "message": "Goal Saved",
  "data": { ... },
  "warning": "low-balance"
}
```

---

### Analytics Routes

| Method | Endpoint              | Auth | Description                          |
|--------|-----------------------|------|--------------------------------------|
| GET    | `/analytics/user`     | ✅   | Personal analytics + health score    |

**Query params:** `?income=80000` (optional, improves health score accuracy)

**Response shape:**
```json
{
  "daily":            [...],
  "weekly":           [...],
  "monthly":          [...],
  "byCategory":       [...],
  "goals":            [...],
  "health":           { "score": 78, "status": "Stable", "checks": [...] },
  "expenseVsSavings": [...],
  "financialFlow":    { "income": 80000, "expenses": 32000, "goalSavings": 8000, "balance": 40000 }
}
```

---

### Family Routes — Admin Only

| Method | Endpoint                  | Auth  | Description                        |
|--------|---------------------------|-------|------------------------------------|
| GET    | `/family/members`         | Admin | List all linked members            |
| POST   | `/family/invite`          | Admin | Create and link a new member       |
| DELETE | `/family/members/:id`     | Admin | Remove a member                    |
| GET    | `/family/expenses`        | Admin | All family transactions            |
| GET    | `/family/goals`           | Admin | All family goals                   |
| GET    | `/family/analytics`       | Admin | Aggregated family analytics        |

---

## Theme System

Themes are managed via CSS custom properties injected on `:root`. Every component reads from these variables, so switching themes updates the entire UI instantly.

### CSS Custom Properties

```css
:root {
  --bg-page:      /* Page background      */
  --bg-sidebar:   /* Sidebar background   */
  --bg-card:      /* Card background      */
  --bg-input:     /* Input background     */
  --border:       /* Border color         */
  --text-primary: /* Primary text         */
  --text-muted:   /* Secondary/muted text */
  --accent:       /* Primary accent color */
  --accent-hover: /* Accent hover state   */
  --accent-glow:  /* Accent glow/shadow   */
  --glow-color:   /* Page glow effect     */
}
```

### Utility Classes

```css
.theme-muted    /* color: var(--text-muted)   */
.theme-accent   /* color: var(--accent)       */
.theme-card     /* background + border vars   */
.theme-input    /* input background + border  */
```

### Adding a Custom Theme

Add an entry to `THEMES` in `src/context/ThemeContext.jsx`:

```js
myTheme: {
  label: "My Theme",
  preview: ["#hex1", "#hex2", "#hex3"],   // 3 swatch colors
  vars: {
    "--bg-page":      "#...",
    "--bg-sidebar":   "#...",
    "--bg-card":      "#...",
    "--bg-input":     "#...",
    "--border":       "rgba(...)",
    "--text-primary": "#...",
    "--text-muted":   "#...",
    "--accent":       "#...",
    "--accent-hover": "#...",
    "--accent-glow":  "rgba(...)",
    "--glow-color":   "rgba(...)",
  },
},
```

---

## Financial Logic

### Balance Formula

```
Balance = Income − Total Expenses − Monthly Goal Contributions
```

- **Income** — set manually by user, persisted in `localStorage`
- **Total Expenses** — sum of all transaction amounts
- **Monthly Goal Contributions** — sum of `monthlyMin` across all active, non-paused goals
- **Savings Reserve** (stat card) — equals Monthly Goal Contributions (future-reserved funds)

### Goal Monthly Contribution

```
monthlyContribution = max(ceil(target / months), 1000)
```

Minimum contribution is always ₹1,000/month regardless of target or timeline.

### Warning Thresholds

| Warning        | Condition                                              |
|----------------|--------------------------------------------------------|
| `over-budget`  | `income − expenses − totalGoalContributions < 0`      |
| `low-balance`  | Balance < 50% of total monthly goal contributions     |
| `risky`        | Total expenses > 80% of income                        |

---

## Database Models

### User

```js
{
  name:          String,   // required
  email:         String,   // unique, lowercase
  password:      String,   // bcrypt hashed
  role:          String,   // "admin" | "member"
  familyId:      ObjectId, // ref: User (admin's ID)
  linkedAdminId: ObjectId, // ref: User (admin's ID)
  avatar:        String,   // base64 image or URL
  theme:         String,   // theme key (default: "default")
  accentColor:   String,   // hex color
  createdAt:     Date,
  updatedAt:     Date
}
```

### Transaction

```js
{
  userId:    ObjectId, // ref: User
  title:     String,
  amount:    Number,
  category:  String,   // Shopping | Food | Travel | Entertainment
  source:    String,   // default: "manual"
  createdAt: Date
}
```

### Goal

```js
{
  userId:          ObjectId, // ref: User
  title:           String,
  description:     String,
  category:        String,   // Education | Child Future | Emergency | Home | Vehicle | Retirement | Medical | Personal
  target:          Number,
  saved:           Number,
  remainingAmount: Number,
  months:          Number,   // timeline in months
  monthlyMin:      Number,   // auto-calculated: max(ceil(target/months), 1000)
  startDate:       Date,
  targetDate:      Date,
  autoSaveEnabled: Boolean,
  lastAutoSave:    Date,
  status:          String,   // pending | on-track | completed | paused
  warningStatus:   String,   // none | low-balance | over-budget | risky
  createdAt:       Date,
  updatedAt:       Date
}
```

---

## Scripts

### Frontend

```bash
npm run dev       # Start development server (localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check
```

### Backend

```bash
node index.js     # Start server (localhost:5000)
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <p>Built with ❤️ using React · Node.js · MongoDB · Tailwind CSS</p>
</div>
