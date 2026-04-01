# 🖥️ Frontend Architecture – Aptitude Practice App

---

# 🧠 1. Frontend Philosophy

* Minimal, fast, distraction-free
* Focus on solving questions
* Dark UI with subtle depth
* Layout-driven design (not decoration-heavy)

---

# 🧭 2. Routing Structure (Next.js)

```bash
/
├── /                → Landing Page
├── /login           → Login Page
├── /signup          → Signup Page
├── /practice        → Question List
├── /practice/[id]   → Solve Question
├── /dashboard       → Profile + Analytics
```

---

# 🧱 3. Tech Stack (Frontend)

* Next.js (App Router)
* Tailwind CSS
* recharts (charts)
* lucide-react (icons)
* react-calendar-heatmap (streak heatmap)

---

# 🏠 4. Landing Page

## Sections

### Navbar

* Logo (left)
* Links (center)
* Login + CTA (right)

### Behavior

* Sticky
* Subtle border
* Hover = color change only

---

### Hero Section

* Headline
* Description
* Primary CTA

---

### Bento Grid Section

* 1 large card + multiple smaller cards
* Each card = one feature
* Uneven layout but aligned

---

### How It Works

* Step 1: Choose topic
* Step 2: Solve
* Step 3: Track progress

---

### Features Section

* Practice
* Analytics
* Heatmap
* Filtering

---

### Footer

* Minimal links
* Credits

---

# 🔐 5. Authentication Pages

## Login / Signup

### Layout

* Centered card
* Clean inputs
* Minimal design

### Components

* Input fields
* Button
* Error messages

---

# 🧠 6. Practice Page (Core Page)

## Layout

### Sidebar (Left)

* Category filter
* Difficulty filter
* Tags

---

### Main Content

Question list:

Each item:

* Title
* Difficulty badge
* Tags
* Status (Solved / Unsolved)

---

## Features

* Filtering
* Pagination
* Click → open question

---

# ⚡ 7. Question Solving Page

## Layout

### Top

* Title
* Difficulty
* Tags

---

### Center

* Question content

---

### Bottom

* Options (MCQ) OR input
* Submit button

---

## After Submission

* Correct / Incorrect state
* Explanation
* Next question

---

# 📊 8. Dashboard Page (Profile + Analytics)

## Layout

### Left Panel

* Profile card

  * Name
  * Email

---

### Main Panel

#### Stats Cards

* Total solved
* Accuracy %
* Streak

---

#### Heatmap (IMPORTANT)

* Daily activity grid
* Shows streak consistency
* Use: react-calendar-heatmap

---

#### Charts (Basic)

* Category-wise performance (Bar chart)
* Use: recharts

---

#### Recent Activity

* List of recently solved questions

---

## Design Notes

* Heatmap is main visual focus
* Keep cards modular
* Clean spacing

---

# 🧩 9. Components

* Navbar
* Sidebar
* Card
* Button
* Input
* Badge (difficulty/tag)
* QuestionCard
* Heatmap
* StatsCard
* Chart (recharts)

---

# 📐 10. Layout Rules

* Max width: 1200px
* Spacing: 16 / 24 / 32px
* Border:

```css
border: 1px solid rgba(255,255,255,0.08);
border-radius: 14px;
```

---

# ✨ 11. Interaction Rules

* Hover = slight lift or color change
* No heavy animations
* Fast transitions (~0.2s)

---

# 🚫 12. Not Included (MVP)

* Leaderboards
* Community
* Bookmarks
* AI features
* Complex charts

---

# 🎯 Final UX Flow

Landing → Login → Practice → Solve → Dashboard

---

# 🧠 Final Note

* Keep UI invisible
* Focus on speed + clarity
* Content > design

---
