# 🎨 Design System – Aptitude Practice App (Minimal Dark)

---

# 🖤 1. Color System

## Backgrounds

```css
--bg-primary: #0A0A0A;        /* main background */
--bg-secondary: #111111;      /* cards / sections */
--bg-tertiary: #1A1A1A;       /* hover / elevated */
```

## Text Colors

```css
--text-primary: #FFFFFF;      /* headings */
--text-secondary: #A1A1AA;    /* descriptions */
--text-muted: #71717A;        /* labels */
```

## Semantic Colors

```css
--success: #22C55E;           /* correct answers */
--error: #EF4444;             /* incorrect answers */
--border: rgba(255,255,255,0.08);
```

---

# ✍️ 2. Typography

## Font Family

```css
font-family: 'Inter', sans-serif;
```

## Headings

```css
h1 {
  font-size: 44px;
  font-weight: 700;
  line-height: 1.2;
}

h2 {
  font-size: 28px;
  font-weight: 600;
}

h3 {
  font-size: 20px;
  font-weight: 600;
}
```

## Body

```css
body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

---

# 🧱 3. Layout & Spacing

## Spacing Scale

* 4px
* 8px
* 12px
* 16px
* 24px
* 32px

## Layout Rules

* Max width: 1200px
* Section padding: 60–80px vertical
* Container padding: 16–24px

---

# 📦 4. Cards / Containers

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 20px;
}
```

## Hover

```css
.card:hover {
  background: var(--bg-tertiary);
  transition: all 0.2s ease;
}
```

---

# 🔘 5. Buttons

## Primary Button

```css
.button-primary {
  background: #FFFFFF;
  color: #000000;
  border-radius: 10px;
  padding: 10px 16px;
  font-weight: 500;
}
```

## Secondary Button

```css
.button-secondary {
  background: transparent;
  border: 1px solid var(--border);
  color: white;
}
```

## Hover

```css
.button-primary:hover {
  opacity: 0.9;
}
```

---

# 🧾 6. Inputs

```css
.input {
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px;
  color: white;
}
```

---

# 🏷️ 7. Badges (Difficulty / Tags)

```css
.badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border);
}
```

---

# 📊 8. States (Important)

## Correct

```css
.correct {
  color: var(--success);
}
```

## Incorrect

```css
.incorrect {
  color: var(--error);
}
```

---

# 📐 9. Navigation

## Navbar

* Height: 60px
* Background: var(--bg-primary)
* Border bottom: subtle

## Sidebar (if used)

* Width: 240px
* Background: var(--bg-secondary)

---

# 🧠 10. Design Principles

* Minimal UI
* High readability
* No gradients
* Low contrast borders
* Soft hover states
* Focus on solving speed

---

# 🚫 Avoid

* Gradients
* Bright colors
* Heavy shadows
* Complex animations

---

# 🎯 Final Design Goal

A clean, distraction-free interface where:

* Content is primary
* Actions are fast
* UI stays invisible

---
